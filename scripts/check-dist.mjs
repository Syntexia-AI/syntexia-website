// Contrôle du site construit, sans dépendance.
//
//   npm run build && node scripts/check-dist.mjs
//
// Vérifie, dans dist/ :
//   1. aucun script exécutable en ligne (la CSP impose script-src 'self') ;
//   2. aucun gestionnaire d'événement en attribut (onclick=…) ;
//   3. aucune ressource chargée d'un autre domaine : script, feuille de
//      style, image, srcset, ni url() ou @import dans le CSS, polices
//      comprises (font-src, img-src et style-src sont limités à 'self') ;
//   4. aucun lien interne ni fichier local manquant (href, src, srcset,
//      url() du CSS), et aucune ancre vers un id absent, sur la page même
//      (#contact) comme sur une autre (/#contact) ;
//   5. aucun identifiant en double, aucune image sans attribut alt, aucune
//      référence (aria-labelledby, aria-describedby, aria-controls, for) vers
//      un identifiant absent ;
//   6. chaque bloc JSON-LD est du JSON valide, et aucune balise échappée
//      n'apparaît en texte (&lt;em…), ce que produirait un HTML refusé par
//      le moteur Markdown ;
//   7. le plan du site couvre exactement les pages indexables, et chacune de
//      ses adresses existe.
//
// Liste tous les problèmes trouvés, puis sort en code 1 s'il y en a.

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SITE = 'https://www.syntexia.ai';
const EXTERNAL = /^(https?:)?\/\//i;

async function walk(dir, ext) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p, ext)));
    else if (entry.name.endsWith(ext)) out.push(p);
  }
  return out;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

// Un chemin du site existe s'il correspond à un fichier, à un dossier avec
// index.html (build.format 'directory'), ou à un fichier .html.
async function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (clean === '' || clean === '/') return exists(join(DIST, 'index.html'));
  const base = join(DIST, clean);
  if ((await exists(base)) && !(await stat(base)).isDirectory()) return true;
  return (await exists(join(base, 'index.html'))) || (await exists(`${base}.html`));
}

// Adresse publique d'une page construite : dist/about/index.html -> /about.
function pathOf(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

const problems = [];
const report = (file, msg) => problems.push(`${relative(DIST, file).replace(/\\/g, '/')}: ${msg}`);

// Les url() et @import d'une feuille de style : tiers interdits, locaux
// vérifiés. base est le chemin public de la feuille, pour les url relatives.
async function checkCss(file, css, base) {
  for (const m of css.matchAll(/@import\s+(?:url\()?\s*["']?([^"')\s;]+)/gi)) {
    if (EXTERNAL.test(m[1])) report(file, `@import tiers : ${m[1]}`);
  }
  for (const m of css.matchAll(/url\(\s*["']?([^"')]+?)["']?\s*\)/gi)) {
    const url = m[1].trim();
    if (url.startsWith('data:') || url.startsWith('#')) continue;
    if (EXTERNAL.test(url)) {
      report(file, `url() tierce dans le CSS : ${url}`);
      continue;
    }
    const target = url.startsWith('/') ? url : new URL(url, `${SITE}${base}`).pathname;
    if (!(await resolves(target))) report(file, `fichier introuvable dans le CSS : ${url}`);
  }
}

const files = await walk(DIST, '.html');
if (!files.length) {
  console.error('dist/ ne contient aucune page. Lancer npm run build avant.');
  process.exit(1);
}

// Premier passage : le contenu et les identifiants de chaque page, pour
// vérifier ensuite les ancres d'une page vers une autre.
const pages = new Map();
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const ids = [...html.matchAll(/\sid\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
  pages.set(pathOf(file), { file, html, ids, idSet: new Set(ids) });
}

const indexable = new Set();

for (const [path, { file, html, ids, idSet }] of pages) {
  // 1 et 6. Scripts en ligne exécutables, JSON-LD.
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const attrs = m[1];
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1];
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (type === 'application/ld+json') {
      try {
        JSON.parse(m[2]);
      } catch (e) {
        report(file, `JSON-LD invalide (${e.message})`);
      }
      continue;
    }
    if (m[2].trim()) report(file, "script en ligne, bloqué par la CSP script-src 'self'");
  }

  // 6, suite. Balises échappées, donc affichées telles quelles.
  for (const m of html.matchAll(/&lt;\/?[a-z][a-z0-9-]*(?=[\s>&\/])/gi)) {
    report(file, `balise échappée, affichée en texte : ${m[0]}`);
  }

  // 2. Gestionnaires d'événement en attribut.
  for (const m of html.matchAll(/<[a-z][^>]*\s(on[a-z]+)\s*=/gi)) {
    report(file, `attribut ${m[1]}, bloqué par la CSP`);
  }

  // 3. Ressources tierces : balises, srcset, styles en ligne.
  for (const m of html.matchAll(/<(script|img|source|link)\b[^>]*>/gi)) {
    const tag = m[0];
    const isLink = m[1].toLowerCase() === 'link';
    if (isLink && !/\brel\s*=\s*["'](stylesheet|preload|icon|apple-touch-icon|manifest|modulepreload)["']/i.test(tag)) continue;
    const url = (tag.match(/\b(?:src|href)\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (url && EXTERNAL.test(url)) report(file, `ressource tierce : ${url}`);
  }
  const srcsets = [...html.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)].flatMap((m) =>
    m[1].split(',').map((part) => part.trim().split(/\s+/)[0])
  );
  for (const url of srcsets) {
    if (EXTERNAL.test(url)) report(file, `ressource tierce dans srcset : ${url}`);
  }
  for (const m of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) await checkCss(file, m[1], path);
  for (const m of html.matchAll(/\sstyle\s*=\s*"([^"]*)"/gi)) await checkCss(file, m[1], path);

  // 4. Liens et fichiers locaux, puis ancres.
  const refs = new Set(srcsets.filter((url) => url.startsWith('/') && !url.startsWith('//')));
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*["'](\/[^"'/][^"']*|\/)["']/gi)) refs.add(m[1]);
  for (const ref of refs) {
    if (!(await resolves(ref))) {
      report(file, `lien ou fichier introuvable : ${ref}`);
      continue;
    }
    const [target, hash] = ref.split('#');
    if (hash === undefined) continue;
    const page = pages.get(target.replace(/\/$/, '') || '/');
    if (page && !page.idSet.has(decodeURIComponent(hash))) report(file, `ancre sans cible : ${ref}`);
  }
  for (const m of html.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/gi)) {
    if (!idSet.has(decodeURIComponent(m[1]))) report(file, `ancre sans cible : #${m[1]}`);
  }

  // 5. Identifiants en double, images sans alt, références ARIA.
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) report(file, `id en double : ${id}`);
    seen.add(id);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(m[0])) report(file, `image sans alt : ${m[0].slice(0, 80)}`);
  }
  for (const m of html.matchAll(/\s(aria-labelledby|aria-describedby|aria-controls|for)\s*=\s*["']([^"']+)["']/gi)) {
    for (const ref of m[2].split(/\s+/)) {
      if (!idSet.has(ref)) report(file, `${m[1]} vers un id absent : ${ref}`);
    }
  }

  if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html)) indexable.add(path);
}

// 3 et 4, suite. Les feuilles de style construites.
const sheets = await walk(DIST, '.css');
for (const sheet of sheets) {
  const publicPath = `/${relative(DIST, sheet).replace(/\\/g, '/')}`;
  await checkCss(sheet, await readFile(sheet, 'utf8'), publicPath);
}

// 7. Plan du site.
let sitemap = '';
try {
  sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
} catch {
  problems.push('sitemap.xml absent de dist/');
}
if (sitemap) {
  const listed = new Set();
  for (const m of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = m[1];
    if (!loc.startsWith(SITE)) {
      problems.push(`sitemap.xml : adresse hors du site : ${loc}`);
      continue;
    }
    const path = loc.slice(SITE.length) || '/';
    listed.add(path);
    if (!(await resolves(path))) problems.push(`sitemap.xml : page introuvable : ${path}`);
  }
  for (const path of indexable) {
    if (!listed.has(path)) problems.push(`sitemap.xml : page indexable absente : ${path}`);
  }
  for (const path of listed) {
    if (!indexable.has(path)) problems.push(`sitemap.xml : page non indexable listée : ${path}`);
  }
}

console.log(`${files.length} pages et ${sheets.length} feuilles de style contrôlées.`);
if (problems.length) {
  console.error(`${problems.length} problème(s) :`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('Aucun problème.');
