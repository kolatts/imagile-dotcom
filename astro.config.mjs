import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://www.imagile.dev',
  output: 'static',
  build: {
    assets: 'assets'
  },
  integrations: [mdx()]
});
