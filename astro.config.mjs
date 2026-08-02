import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.imagile.dev',
  output: 'static',
  build: {
    assets: 'assets'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },
  integrations: [
    mdx(),
    sitemap({
      // Mockups are dev-only design review pages and must never be indexed.
      // Thin tag pages (<2 posts) are handled by a per-page noindex meta tag
      // instead of a sitemap exclusion -- search engines are explicit that a
      // noindexed URL in a sitemap is fine, and duplicating the tag-count
      // logic here would mean maintaining it in two places.
      filter: (page) => !page.includes('/mockups/')
    })
  ]
});
