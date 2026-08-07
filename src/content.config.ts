import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Reserved slugs: a post filename of "page" or "tag" would collide with
// the static routes at src/pages/blog/page/[page].astro and
// src/pages/blog/tag/[tag].astro. The blog-writer automation slugs from
// issue titles, so the odds are near zero, but don't use either as a slug.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
