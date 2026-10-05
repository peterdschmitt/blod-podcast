import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    titleEm: z.string().optional(), // trailing part of the title set in italics
    dek: z.string(),
    category: z.string(),
    categorySlug: z.string(),
    readMinutes: z.number(),
    author: z.string(),
    reviewer: z.string().optional(),
    mathReviewer: z.string().optional(),
    lastReviewed: z.coerce.date(),
    heroColor: z.enum(['lilac', 'sage', 'butter', 'coral', 'white']).default('lilac'),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    // Page-level disclosure (strategy section 8, item 4). Leave unset when the guide names no specific product.
    namesProducts: z.boolean().default(false),
    disclosure: z.string().optional(),
    summary: z.array(z.string()).default([]),
    evidence: z.object({
      level: z.number().min(1).max(4),
      label: z.string(),
      note: z.string(),
    }),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      grade: z.enum(['Primary source', 'Independent research', 'Independent analysis', 'Independent actuarial', 'Vendor-funded', 'Vendor-reported', 'Anecdotal']),
    })),
    next: z.string().optional(), // slug of the next guide
  }),
});

export const collections = { guides };
