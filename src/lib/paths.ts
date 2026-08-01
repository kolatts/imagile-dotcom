// Canonical URL builders for every blog route. Nothing outside this file should
// ever hand-write a /blog/... href — that discipline is what makes the old
// `/blog?tag=x` dead-link pattern structurally impossible to reintroduce.

export const BLOG_PAGE_SIZE = 12;

/** /blog for page 1, /blog/page/N/ for everything after. */
export function blogPageHref(page: number): string {
  return page <= 1 ? '/blog/' : `/blog/page/${page}/`;
}

/** Turns a raw tag string into a URL-safe slug (lowercase, hyphenated). */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagHref(tag: string): string {
  return `/blog/tags/${slugifyTag(tag)}/`;
}

export const tagsIndexHref = '/blog/tags/';

export function postHref(id: string): string {
  return `/blog/${id}/`;
}
