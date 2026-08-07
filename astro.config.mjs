import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.imagile.dev',
  output: 'static',
  build: {
    assets: 'assets'
  },
  integrations: [mdx(), sitemap()]
});
