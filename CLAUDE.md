# CLAUDE.md

Astro static site for imagile.dev (marketing site, deployed to GitHub Pages).

## Commands

```bash
npm run dev
```

```bash
npm run build
```

The dev server usually already runs on `localhost:4321` — attach rather than spawning a second one (`.claude/launch.json` has a url-only "dotcom" config).

## Copy rules

**Pricing: no dollar figures in site copy. Anywhere.** No hourly rate, day rate,
workshop fee, cohort fee, sprint fee, pilot range, or retainer minimum — not on
the services pages, not on the service cards, not in structured data.

Describe the *shape* of the pricing instead of the number: "hourly, rate quoted up
front", "flat fee per session", "fixed fee against a written scope", "scoped after
discovery", "monthly retainer". The promise is that the number is agreed in writing
before work starts and doesn't move mid-engagement — not that it's posted publicly.
Avoid "real numbers, not a contact form" style headings, and avoid `priceRange`
figures in JSON-LD (`src/layouts/Layout.astro` uses `$$$`).

The internal rate card in `docs/rebrand/implementation-notes.md` is a reference for
quoting engagements, not published copy — keep it out of the site.

Blog posts may cite third-party costs (cloud bills, tool budgets) as illustration;
those are not Imagile's prices and are exempt from this rule.

**Audience voice.** Only the developer-training path reads technical. The
business-owner and founder paths stay plain-English — no jargon, no stack names
unless they're doing work in the sentence.
