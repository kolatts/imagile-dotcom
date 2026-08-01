import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { postHref } from '../lib/paths';
import { getCanonicalTags, getTagMeta } from '../lib/tags';

export async function GET(context) {
  const posts = await getCollection('blog', (entry) => !entry.data.draft);
  const sortedPosts = posts.sort((a, b) =>
    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'Imagile Blog',
    description: 'AI training and transformation, .NET and Azure software delivery, and technology coaching for startups.',
    site: context.site || 'https://www.imagile.dev',
    xmlns: { atom: 'https://www.w3.org/2005/Atom' },
    customData: [
      '<language>en-us</language>',
      `<atom:link href="${new URL('/rss.xml', context.site)}" rel="self" type="application/rss+xml"/>`,
    ].join(''),
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      author: post.data.author,
      link: postHref(post.id),
      categories: getCanonicalTags(post.data.tags).map((tag) => getTagMeta(tag).label),
    })),
  });
}
