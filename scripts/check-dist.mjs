// Contrôle du site construit, sans dépendance.
//
//   npm run build && node scripts/check-dist.mjs
//
// Vérifie, page par page, dans dist/ :
//   1. aucun script exécutable en ligne (la CSP impose script-src 'self') ;
//   2. aucun gestionnaire d'événement en attribut (onclick=…) ;
//   3. aucun script, feuille de style, police ou image chargé d'un autre
//      domaine (font-src, img-src et style-src sont limités à 'self') ;
//   4. aucun lien interne ni fichier local manquant (href, src, srcset) ;
//   5. aucun identifiant en double, aucune image sans attribut alt ;
//   6. chaque bloc JSON-LD est du JSON valide.
//
// Sort en code 1 au premier problème trouvé, après les avoir tous listés.

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (entry.name.endsWith('.html')) out.push(p);
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
  return (await exists(base)) && !(await stat(base)).isDirectory()
    ? true
    : (await exists(join(base, 'index.html'))) || (await exists(`${base}.html`));
}

const problems = [];
const report = (file, msg) => problems.push(`${relative(DIST, file)}: ${msg}`);

const files = await walk(DIST);
if (!files.length) {
  console.error('dist/ ne contient aucune page. Lancer npm run build avant.');
  process.exit(1);
}

for (const file of files) {
  const html = await readFile(file, 'utf8');

  // 1. Scripts en ligne exécutables.
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
    if (m[2].trim()) report(file, 'script en ligne, bloqué par la CSP script-src \'self\'');
  }

  // 2. Gestionnaires d'événement en attribut.
  for (const m of html.matchAll(/<[a-z][^>]*\s(on[a-z]+)\s*=/gi)) {
    report(file, `attribut ${m[1]}, bloqué par la CSP`);
  }

  // 3. Ressources tierces.
  for (const m of html.matchAll(/<(script|img|source|link)\b[^>]*>/gi)) {
    const tag = m[0];
    const isLink = m[1].toLowerCase() === 'link';
    if (isLink && !/\brel\s*=\s*["'](stylesheet|preload|icon|apple-touch-icon|manifest|modulepreload)["']/i.test(tag)) continue;
    const url = (tag.match(/\b(?:src|href)\s*=\s*["']([^"']+)["']/i) || [])[1];
    if (url && /^(https?:)?\/\//i.test(url)) report(file, `ressource tierce : ${url}`);
  }

  // 4. Liens et fichiers locaux.
  const refs = new Set();
  for (const m of html.matchAll(/\b(?:href|src)\s*=\s*["'](\/[^"'/][^"']*|\/)["']/gi)) refs.add(m[1]);
  for (const m of html.matchAll(/\bsrcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url.startsWith('/') && !url.startsWith('//')) refs.add(url);
    }
  }
  for (const ref of refs) {
    if (!(await resolves(ref))) report(file, `lien ou fichier introuvable : ${ref}`);
  }

  // Ancres internes vers un id absent de la page.
  const ids = [...html.matchAll(/\sid\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
  const idSet = new Set(ids);
  for (const m of html.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/gi)) {
    if (!idSet.has(m[1])) report(file, `ancre sans cible : #${m[1]}`);
  }

  // 5. Identifiants en double, images sans alt.
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) report(file, `id en double : ${id}`);
    seen.add(id);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/.test(m[0])) report(file, `image sans alt : ${m[0].slice(0, 80)}`);
  }
}

console.log(`${files.length} pages contrôlées.`);
if (problems.length) {
  console.error(`${problems.length} problème(s) :`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('Aucun problème.');
