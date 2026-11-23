import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Une réalisation = un fichier Markdown dans src/content/realisations/
// Voir le README, section « Ajouter une réalisation ».
const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(170, 'Description courte : 170 caractères maximum (utilisée pour le SEO).'),
      categories: z.array(z.enum(['silos', 'sechoirs', 'manutention', 'metallerie'])).min(1),
      cover: image(),
      coverAlt: z.string().min(5, 'Le texte alternatif de la photo est obligatoire.'),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      lieu: z.string().optional(),
      annee: z.string().optional(),
      client: z.string().optional(),
      order: z.number().default(100),
      draft: z.boolean().default(false),
    }),
});

export const collections = { realisations };
