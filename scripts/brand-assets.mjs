// Rend les images de marque à partir de leurs sources, avec les tokens et
// les polices du site :
//
//   design/og-image.html         -> public/og-image.png (1200 x 630)
//   public/syntexia-mark-dark.svg -> public/apple-touch-icon.png (180 x 180)
//                                 -> public/favicon.ico (32 et 48)
//
//   npx playwright install chromium   (une fois)
//   npm run assets
//
// Les fichiers du dépôt sont servis sous une origine fictive interceptée par
// Playwright : aucun serveur à lancer, et Chromium charge les polices, ce
// qu'il refuse en file://. Seul Playwright est requis, déjà là pour les
// captures.

import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../', import.meta.url);
const ORIGIN = 'https://assets.local';
const TYPES = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  svg: 'image/svg+xml',
  woff2: 'font/woff2',
};

// /fonts/… est le chemin public des polices (tokens.css), servi depuis
// public/fonts. Tout le reste se lit depuis la racine du dépôt.
function fileFor(pathname) {
  const rel = pathname.startsWith('/fonts/') ? `public${pathname}` : pathname.slice(1);
  return new URL(rel, ROOT);
}

// Un fichier .ico qui embarque des PNG, ce que lisent tous les navigateurs
// actuels : un en-tête, une entrée de 16 octets par taille, puis les images.
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const entry = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(png.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.png)]);
}

const browser = await chromium.launch();

async function render(path, width, height) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.route(`${ORIGIN}/**`, async (route) => {
    const { pathname } = new URL(route.request().url());
    try {
      const body = await readFile(fileFor(pathname));
      await route.fulfill({ body, contentType: TYPES[pathname.split('.').pop()] ?? 'application/octet-stream' });
    } catch {
      await route.fulfill({ status: 404, body: 'Not found' });
    }
  });
  await page.goto(`${ORIGIN}${path}`);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ clip: { x: 0, y: 0, width, height }, omitBackground: true });
  await page.close();
  return png;
}

// Le SVG du mark, posé à la taille voulue dans une page vide et transparente.
async function mark(size) {
  const svg = await readFile(new URL('public/syntexia-mark-dark.svg', ROOT), 'utf8');
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(
    `<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`
  );
  const png = await page.screenshot({ clip: { x: 0, y: 0, width: size, height: size }, omitBackground: true });
  await page.close();
  return png;
}

const out = (name) => fileURLToPath(new URL(`public/${name}`, ROOT));

await writeFile(out('og-image.png'), await render('/design/og-image.html', 1200, 630));
await writeFile(out('apple-touch-icon.png'), await mark(180));
await writeFile(out('favicon.ico'), ico([{ size: 32, png: await mark(32) }, { size: 48, png: await mark(48) }]));

await browser.close();
console.log('public/og-image.png, public/apple-touch-icon.png, public/favicon.ico');
