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
    // The news story this post responds to, shown under the title: the publication, a short
    // verbatim quote from the article, and why it matters to the reader. Required so every post
    // names another publication in its header. Verify it the same way as the headline lead.
    respondingTo: z.object({
      lede: z.string(), // the post's headline, in our conversational voice: names the outlet and its news, then turns to the reader. Varies post to post, never a fixed template
      outlet: z.string(),
      headline: z.string(),
      url: z.string().url(),
      date: z.coerce.date(),
      quote: z.string(),
      quoteBy: z.string().optional(), // the person quoted, when the quote isn't the outlet's own words
      impact: z.string(), // one or two sentences, to "you", on how this will likely affect the reader
    }).optional(), // required on classic posts; optional ("Why this matters today") on new-format posts with a snapshot
    // New format (docs/daily-post/post-outline.md). A post with `snapshot` uses the new page top:
    // title as the headline, dek, byline with audience, stat strip, snapshot, optional news box.
    audience: z.string().optional(), // who the post is for, shown in the byline
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]), // 2 to 4 numbers, each sourced in the body
    statsNote: z.string().optional(), // where the numbers come from
    snapshot: z.array(z.object({ label: z.string(), text: z.string() })).default([]),
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
  }).refine((d) => d.snapshot.length > 0 || d.respondingTo, {
    message: 'Classic posts need respondingTo; new-format posts need a snapshot (see docs/daily-post/post-outline.md)',
  }),
});

// Podcast episodes. `status: planned` shows as a clearly marked upcoming episode with no player.
const episodes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/episodes' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    summary: z.string(),
    status: z.enum(['planned', 'published']).default('planned'),
    date: z.coerce.date().optional(),
    minutes: z.number().optional(),
    audioUrl: z.string().url().optional(),
    guests: z.array(z.string()).default([]),
    relatedGuide: z.string().optional(), // slug of a blog post
  }),
});

export const collections = { guides, episodes };
