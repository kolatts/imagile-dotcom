// Reading time computed from raw markdown source, not rendered HTML. The old
// implementation rendered the post to HTML first and word-counted the markup
// itself (tags included), which both inflates the count and costs an extra
// render pass per post. Operating on entry.body avoids both problems.

const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(markdownBody: string): number {
  // Strip code fences and inline code so counted words reflect prose, not syntax.
  const prose = markdownBody
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ');
  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
