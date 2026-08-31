import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Les deux articles existants. L'arborescence est prête pour pt et fr,
// aucune traduction n'est fournie.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
  }),
});

export const collections = { posts };
