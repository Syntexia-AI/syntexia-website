import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { securityIsLinked } from '../facts';

// Le plan du site, généré au build : un article ajouté y entre tout seul, et
// scripts/check-dist.mjs vérifie qu'il couvre toutes les pages indexables.
//
// Pas de lastmod. Les moteurs ignorent une date approximative, et une date
// fausse leur fait plus de tort qu'une date absente.
const PAGES = ['/', '/about', '/team', '/blog', ...(securityIsLinked ? ['/security'] : []), '/legal'];

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts');
  const base = site ?? new URL('https://www.syntexia.ai');
  const urls = [...PAGES, ...posts.map((post) => `/posts/${post.id}`)]
    .map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
