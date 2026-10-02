// Captures avant et après, 1440 et 390, de chaque route.
// « Avant » se prend sur la production actuelle, en lecture seule.
// « Après » se prend sur le serveur local.
//
//   node scripts/shots.mjs after   http://localhost:4321
//   node scripts/shots.mjs before  https://www.syntexia.ai
//
// Sortie : docs/shots/<phase>/<route>-<largeur>.png

import { chromium } from 'playwright';
import { mkdir, readdir } from 'node:fs/promises';

const phase = process.argv[2] || 'after';
const origin = process.argv[3] || 'http://localhost:4321';

// Tous les articles du blog, lus dans src/content/posts : un article ajouté
// est capturé sans toucher à ce script.
const POSTS = (await readdir(new URL('../src/content/posts/', import.meta.url)))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.slice(0, -3))
  .sort();

const ROUTES_AFTER = [
  ['home', '/'],
  ['about', '/about'],
  ['team', '/team'],
  ['blog', '/blog'],
  ['security', '/security'],
  ...POSTS.map((slug) => [`post-${slug}`, `/posts/${slug}`]),
  ['legal', '/legal'],
  ['404', '/404'],
];

// L'ancien site n'avait que ces pages. On ne demande à « before » que ce qui
// existait, pour ne pas produire des captures de page d'erreur.
const BEFORE = ['/', '/about', '/team', '/blog', '/posts/precedent-meets-pace', '/posts/the-quiet-revolution-coming-to-audit'];
const ROUTES_BEFORE = ROUTES_AFTER.filter(([, path]) => BEFORE.includes(path));

const routes = phase === 'before' ? ROUTES_BEFORE : ROUTES_AFTER;
const WIDTHS = [1440, 390];

const out = `docs/shots/${phase}`;
await mkdir(out, { recursive: true });

// Mouvement réduit : les démonstrations s'affichent dans leur état final,
// et une capture pleine page ne fige jamais une animation en cours.
const browser = await chromium.launch();
const results = [];

for (const [name, path] of routes) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: width === 1440 ? 900 : 844 },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    const file = `${out}/${name}-${width}.png`;
    try {
      const res = await page.goto(origin + path, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      // L'ancien site rendait la home en React après transpilation Babel dans
      // le navigateur : sans cette attente, la capture « avant » est vide.
      if (phase === 'before') await page.waitForTimeout(2500);
      await page.screenshot({ path: file, fullPage: true });
      results.push({ name, width, status: res ? res.status() : 0, file });
    } catch (e) {
      results.push({ name, width, status: 'ERREUR', file, error: e.message.slice(0, 90) });
    }
    await ctx.close();
  }
}

await browser.close();

console.log(`phase: ${phase}   origine: ${origin}`);
for (const r of results) {
  console.log(
    `  ${String(r.status).padEnd(7)} ${r.name.padEnd(24)} ${String(r.width).padEnd(5)} ${r.file}${r.error ? '  ' + r.error : ''}`
  );
}
const bad = results.filter((r) => r.status === 'ERREUR');
console.log(`\n${results.length} captures, ${bad.length} en erreur.`);
