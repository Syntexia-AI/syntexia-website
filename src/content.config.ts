import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Les articles du blog, un fichier markdown par article dans
// src/content/posts. L'identifiant d'un article est le nom de son fichier,
// et devient son adresse : /posts/<nom>.
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
