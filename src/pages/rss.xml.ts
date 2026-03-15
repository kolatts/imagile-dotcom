import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort((a, b) => 
    new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()
  );

  return rss({
    title: 'Imagile Blog',
    description: 'Insights, tutorials, and updates from the Imagile team on AI-powered development, cloud solutions, and software engineering best practices.',
    site: context.site || 'https://imagile.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      author: post.data.author,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
