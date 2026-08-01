// Tag curation. Raw frontmatter tags stay as-written (they're useful, specific
// signal on a post itself) but 24 of the 32 tags on the original 11 posts were
// used exactly once — routing each straight to its own page would fill the
// sitemap with thin, near-duplicate pages. TAG_ALIASES folds true synonyms into
// one canonical tag; anything not listed here just becomes its own canonical
// tag, so new tags (e.g. "git", "startups") work with zero config.

import { slugifyTag } from './paths';

const TAG_ALIASES: Record<string, string> = {
  'machine-learning': 'ai',
  genai: 'ai',
  claude: 'ai',
  'github-copilot': 'developer-tools',
  'github-actions': 'developer-tools',
  'software-engineering': 'engineering-principles',
  engineering: 'engineering-principles',
  dry: 'engineering-principles',
  collaboration: 'team-structure',
  'knowledge-transfer': 'mentorship',
  platform: 'announcements',
};

export interface TagMeta {
  label: string;
  description: string;
}

const TAG_META: Record<string, TagMeta> = {
  ai: { label: 'AI', description: 'How AI actually works, and how to work with it well.' },
  'agentic-ai': { label: 'Agentic AI', description: 'Agents, autonomy, and where the human still belongs in the loop.' },
  'claude-code': { label: 'Claude Code', description: 'Notes from building with Claude Code day to day.' },
  llm: { label: 'LLMs', description: 'How large language models behave, and where that behavior surprises people.' },
  'context-management': { label: 'Context Management', description: 'What goes in the context window, and what it costs to put it there.' },
  'developer-tools': { label: 'Developer Tools', description: 'The tools that make delegated work safe, fast, or neither.' },
  security: { label: 'Security', description: 'Attack surface, permissions, and what "safe by default" actually requires.' },
  mcp: { label: 'MCP', description: 'The Model Context Protocol, its tradeoffs, and its costs.' },
  'engineering-principles': { label: 'Engineering Principles', description: 'Opinions on how software should be built, argued from first principles.' },
  architecture: { label: 'Architecture', description: 'System design, module boundaries, and when to extract a service.' },
  azure: { label: 'Azure', description: 'Building and running production systems on Azure.' },
  dotnet: { label: '.NET', description: 'Delivery patterns and opinions from the .NET stack.' },
  cloud: { label: 'Cloud', description: 'Cloud-native design and what actually breaks in a migration.' },
  migration: { label: 'Migration', description: 'Moving systems forward without breaking the business that runs on them.' },
  'developer-training': { label: 'Developer Training', description: 'What makes AI training programs work, and why most don’t.' },
  'continuous-learning': { label: 'Continuous Learning', description: 'Building the habits and conditions that make people better over time.' },
  'team-structure': { label: 'Team Structure', description: 'How roles, ownership, and decision-making shift under AI.' },
  'product-engineering': { label: 'Product Engineering', description: 'Where product and engineering decisions actually meet.' },
  mentorship: { label: 'Mentorship', description: 'Passing on judgment, not just answers.' },
  creativity: { label: 'Creativity', description: 'Taste, judgment, and the parts of the job construction speed doesn’t touch.' },
  git: { label: 'Git', description: 'Version control as a safety net for work you didn’t personally review line by line.' },
  startups: { label: 'Startups', description: 'Technology decisions for teams that can’t afford to get them wrong twice.' },
  announcements: { label: 'Announcements', description: 'What’s new at Imagile.' },
};

/** Maps a raw frontmatter tag to its canonical routable slug. */
export function getCanonicalTag(rawTag: string): string {
  const slug = slugifyTag(rawTag);
  return TAG_ALIASES[slug] ?? slug;
}

/** Deduplicated, canonicalized tag slugs for a post's raw tag list. */
export function getCanonicalTags(rawTags: string[]): string[] {
  return Array.from(new Set(rawTags.map(getCanonicalTag)));
}

function humanize(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getTagMeta(canonicalSlug: string): TagMeta {
  return (
    TAG_META[canonicalSlug] ?? {
      label: humanize(canonicalSlug),
      description: `Posts tagged “${humanize(canonicalSlug)}.”`,
    }
  );
}

/** Minimum number of posts a canonical tag needs before its page is indexed. */
export const MIN_INDEXABLE_TAG_COUNT = 2;
