import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.imagile.dev',
  output: 'static',
  build: {
    assets: 'assets'
  },
  integrations: [
    mdx(),
    sitemap({
      // Mockups are dev-only design review pages and must never be indexed.
      // Thin tag pages get excluded here too once src/lib/tags.ts lands (Phase 1/6).
      filter: (page) => !page.includes('/mockups/')
    })
  ]
});
