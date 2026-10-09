import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Les articles du blog, un fichier markdown par article dans
// src/content/posts. L'identifiant d'un article est le nom de son fichier,
// et devient son adresse : /posts/<nom>.
//
// topic, ajouté le 2026-10-09 : le sujet de l'article, affiché à côté de sa
// date sur l'accueil, sur /blog et en tête de l'article. La liste est fermée
// pour qu'un sujet mal orthographié casse le build au lieu d'apparaître.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    topic: z.enum(['Automation', 'Voice', 'Practice', 'Audit', 'Legal']),
  }),
});

export const collections = { posts };
