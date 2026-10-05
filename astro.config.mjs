import { defineConfig } from 'astro/config';

// Set `site` to the real domain once one is chosen (used for canonical URLs and the sitemap).
export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'ignore',
  // Guides moved to /blog/ on 2026-10-05; keep old links working.
  redirects: {
    '/guides': '/blog',
    '/guides/[slug]': '/blog/[slug]',
  },
});
