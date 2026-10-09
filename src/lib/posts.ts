import type { CollectionEntry } from 'astro:content';

/** Les articles du plus récent au plus ancien ; à date égale, par titre,
 *  pour que l'ordre ne dépende pas de celui des fichiers. Partagé par
 *  l'accueil (trois derniers) et /blog (tous). */
export function sortPosts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
  return [...posts].sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || a.data.title.localeCompare(b.data.title)
  );
}
