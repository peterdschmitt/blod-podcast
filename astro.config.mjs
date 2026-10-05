import { defineConfig } from 'astro/config';

// Set `site` to the real domain once one is chosen (used for canonical URLs and the sitemap).
export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'ignore',
});
