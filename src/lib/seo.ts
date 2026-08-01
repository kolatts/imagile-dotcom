// One canonical-URL rule for the whole site. Before this, the <link rel="canonical">
// in Layout.astro and the <link> hrefs in rss.xml.ts disagreed on trailing slashes
// (`/blog/foo` vs `/blog/foo/`). This is the single source of truth going forward.

import { site } from './site';

/**
 * Builds the canonical, absolute URL for a given pathname.
 * Every route except the root always carries a trailing slash.
 */
export function canonical(pathname: string): URL {
  let normalized = pathname;
  if (normalized !== '/' && !normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }
  return new URL(normalized, site.url);
}
