# imagile.dev rebrand — implementation notes

Running log of decisions, deviations from the original brief, and state. Not
part of the public site; lives in this repo so the record travels with the
code. Update this file as work proceeds — don't let it go stale.

## Status: design direction locked, asset generation underway, site build not started

## Key decisions

- **Design direction: Workbench**, chosen from three mockups shown side by
  side (`docs/rebrand/design-directions.html`, also published as a Claude
  Artifact). Engineering-drafting aesthetic: fine grid, IBM Plex Mono
  annotations/labels, IBM Plex Sans/body, sharp corners, orange recalibrated
  from the current site's neon `#FF6B00` to a technical-marker
  `#E85D04` (light) / `#FF7A26` (dark).
  - **Amendment:** buttons/CTAs use **Archivo** (borrowed from the Signal
    direction) instead of Plex Mono — mono reads cold for a clickable
    action; Archivo is friendlier while everything else (labels, nav,
    annotations) stays mono. See `.wb .p-btn` in the mockup file.
- **Pricing: $300/hr anchor**, published openly, plus a fixed menu of
  productized offerings (Strategy Intensive $900, Discovery Sprint $8,500,
  workshops $3–5k, cohort from $15k, retainer $6k/mo, fractional leadership
  from $10k/mo) — all grounded in independent-AI-consultant market research
  the user supplied, not invented. Full table lives in conversation history;
  reproduce it into `/services/*` pages when they're built, don't
  re-derive it.
- **Solo, named outright**: "Imagile is Sunny Kolattukudy." About-page arc:
  medicine (Case Western / Cleveland Clinic Lerner) → co-founded thrash band
  Deadiron → decade of engineering, Columbus/Lewis Center OH.
- **Analytics: kept Azure App Insights** (brief suggested Plausible; user
  overrode — no new paid service).
- **Lead pipeline is issue-based, not a direct webhook.** The contact form
  already POSTs to an existing, fully-built `/api/intake/contact` endpoint
  in **imagile-app** (Turnstile + honeypot + rate limit + durable Azure
  Table capture — this was NOT built by this project, it pre-existed).
  What's being added: `IntakeService` creates a `lead`-labeled GitHub issue
  in **imagile-app** (private repo — PII can't go to the public
  imagile-dotcom repo), and a pncli-style `discord-notify.yml` workflow
  (ported from `kolatts/pncli`) posts a rich embed when that issue opens.
- **Context Overflow cross-promotion**: site links to
  https://context-overflow.dev as the "start understanding AI" self-serve
  path, with a referral org code **`IMAGILE`** for attribution. The code
  must be seeded into Context Overflow's `Orgs` Azure Table
  (`beyondboringprodstorage`, resource group `beyondboring-prod`,
  PartitionKey `ORG`, RowKey `IMAGILE`) — this repo has no Azure access, so
  that's a manual step for the user:
  ```
  az storage entity insert --auth-mode login \
    --account-name beyondboringprodstorage --table-name Orgs \
    --entity PartitionKey=ORG RowKey=IMAGILE \
    DisplayName="Imagile (imagile.dev)" \
    IsActive=true IsActive@odata.type=Edm.Boolean
  ```
- **Motion: parallax + subtle scroll-reveal, deliberately, not just a
  "scroll-reveal only" minimalism.** User asked for "a little flashiness...
  make it look sexy." Precedent already exists in the user's own
  `kolatts.github.io` (a tiny vanilla-JS `data-parallax` scroll listener,
  no framework, `requestAnimationFrame`-throttled, fully gated behind
  `prefers-reduced-motion`). Reuse that exact pattern rather than pulling in
  a scroll library — keeps INP/above-the-fold JS near the brief's zero-JS
  budget. Apply it to the hero (portrait/rails-equivalent — here, a drafting
  compass illustration + grid lines at different depths) and let
  section-level content fade/rise on scroll via IntersectionObserver, one
  shared small script, no per-component JS.

## Credentials / manual steps still owed to the user

These need real Azure/GitHub/Cloudflare access this environment doesn't
have or shouldn't hold:

1. Context Overflow `IMAGILE` org code — az command above.
2. Turnstile **secret key** (`0x4AAAAAAED2hpAAG7uvl8gipeZMH7Hss20`) → prod
   Key Vault as `TurnstileSecretKey` — check whether it already exists
   first (the intake endpoint is already live in prod). Never commit this
   value anywhere.
3. `gh secret set DISCORD_WEBHOOK -R kolatts/imagile-app` once a Discord
   webhook exists.
4. Fine-grained PAT (imagile-app, Issues R/W) → Key Vault secret
   `GitHubIssuesToken`, once the issue-creation code lands.
5. Turnstile dashboard: confirm allowed hostnames include both
   `www.imagile.dev` and `imagile.dev`.

Turnstile **site key** `0x4AAAAAAED2hq95425ROypd` is public-by-design and
will be committed directly as the default for `PUBLIC_TURNSTILE_SITE_KEY`.

## Image assets

`.claude/image-generation/style.md` defines the Workbench visual language
for the `imagile-dev-tools:image-generation` skill (drafting-paper /
graphite grounds, technical-pen linework, the same recalibrated orange,
faint 5% grid, annotation marks used the way a blueprint uses them). Two
runs generated so far:

- `260807-logomark/` — a drafting-compass mark, two variants. Too detailed
  to reduce to a 16px favicon; earmarked as hero/About illustration
  material instead. The actual favicon should be a hand-authored SVG (a
  simplified compass-point geometry), not an AI raster, so it stays crisp
  at tiny sizes — that's still open work.
- `260807-og-banner-compass/` — wide (1600×832) asymmetric composition,
  compass weighted right, calm grid space left for the real wordmark/
  tagline. **Selected: `og-banner-compass-1.png`** (tighter, more legible
  than variant 2's swept-arc version). Text is NOT baked in — compositing
  the actual "Imagile" wordmark + tagline onto this background (via the
  self-hosted display font) is still open work for `public/og-default.png`.

Pre-existing, unrelated: `.claude/image-generation/260802-default-og/` is a
stray photorealistic compass photo from before this project (dated Aug 2,
no `prompt.md`, off-brand — photographic, not on the drafting-diagram
language). Left in place, not used, not deleted (not this project's file to
remove without asking).

## Site build: foundation shipped, content in progress

Committed to `claude/imagile-rebrand-tggl17` (imagile-dotcom):

- Design tokens, self-hosted fonts (@fontsource: IBM Plex Sans, IBM Plex
  Mono, Archivo — Archivo used only for `.btn`, per the font-fix
  amendment), `@astrojs/sitemap`, hand-authored theme-aware favicon.svg
  + rasterized fallbacks, robots.txt, 404 page.
- `Layout.astro`: RSS autodiscovery, `ProfessionalService` + `BlogPosting`
  JSON-LD, shared `motion.js` (parallax + scroll-reveal, gated on
  `prefers-reduced-motion`, reused pattern from kolatts.github.io).
- New shared components: SiteHeader, SiteFooter, Hero, PathPicker,
  ServiceCard, ProofItem, CtaBand, PostCard, Prose, ContactForm.
- Blog migrated to Astro 5 content-layer API; fixed the dead
  `?tag=`/`?page=` filtering with real static routes
  (`blog/page/[page]`, `blog/tag/[tag]`). **Verified byte-identical**
  to all 11 existing `/blog/<slug>` URLs on `main` (mechanical diff, not
  just eyeballed).
- Homepage written directly (hero, villain framing, path picker, 3
  services, honest proof strip, engagement steps, latest posts, Context
  Overflow cross-promo with org code `IMAGILE`, CTA band).
- `npm run build` verified clean at each checkpoint.

Remaining pages (services × 4, work, about, contact) and 7 blog backfill
posts were fanned out via a Workflow (14 parallel/pipelined subagents) —
see the workflow's own results for exact files written; review each
before treating as final, especially the blog posts' voice and the
service pages' pricing-row accuracy against the menu below.

## Pricing (decided, real numbers — not TODO placeholders)

$300/hr anchor, publicly stated, plus a fixed price menu grounded in
independent-AI-consultant market research the user supplied:

| Offering | Price |
|---|---|
| Advisory / hands-on hourly | $300/hr |
| Remote day rate | $2,000/day |
| On-site day rate | $2,400/day + travel at cost |
| Strategy Intensive (front door) | $900, credits toward anything next |
| AI Readiness / Discovery Sprint | $8,500 |
| Half-day team workshop (≤12) | $3,000 |
| Full-day team workshop (≤12) | $5,000 |
| 4-week team enablement cohort (≤12) | from $15,000 |
| Agentic workflow pilot (4–8 wks) | typically $25,000–$50,000, scoped |
| Production build with integrations | typically $50,000–$100,000, scoped |
| Ongoing retainer (~20 hrs/mo, 3-mo min) | $6,000/month |
| Fractional AI leadership (≤3 days/wk) | from $10,000/month, scoped |

Each service page shows only its relevant subset (see the workflow prompts
for the exact split); a shared philosophy paragraph appears on each page
rather than a separate `/pricing` page, to avoid a cross-page dependency
during parallel content generation.

## imagile-app: lead pipeline shipped

Branch `feature/intake-github-lead-issues`, off `main` (NOT off
`kolatts/60-sunny-contact`, which had unrelated pre-existing uncommitted
work — see below). Full solution builds clean, all 55 predeployment
tests pass (4 new for `GitHubLeadIssueService`).

- `GitHubLeadIssueService`: creates a `lead`-labeled GitHub issue in
  imagile-app itself (private — not the public imagile-dotcom, since
  leads carry PII) via a scoped PAT, with a fenced ` ```json ` block in
  the issue body for the Discord workflow to parse. Best-effort,
  disabled by default (`GitHubIssues.Enabled=false`), same
  never-fail-the-visitor semantics as the existing email path.
- `IntakeService.cs`: calls it after the durable table write, in its own
  try/catch (sibling of the existing email try/catch).
- `.github/workflows/discord-notify.yml`: ported from
  `kolatts/pncli`'s pattern, filtered to the `lead` label, richer embed
  (name/company/email/service-line fields + message).
- `Program.cs`: added `UseForwardedHeaders()` (ForwardLimit 1, no
  configured proxies/networks) so the intake rate limiter and Turnstile's
  `remoteip` key on the real visitor IP behind Container Apps ingress,
  not the ingress proxy's IP.
- `appsettings.prod.json`: added apex `https://imagile.dev` to
  `Cors.MarketingOrigins` (only `www` was allowed before).
- Found and worked around a real serialization gotcha: System.Text.Json's
  default encoder escapes backticks as ``` in the wire JSON — not a
  bug (GitHub decodes it back to a literal backtick when it parses the
  issue body), but the test originally asserted against the raw wire
  string instead of the parsed `.body` field. Fixed to parse-then-assert.

**Found the user's own in-progress work** on `kolatts/60-sunny-contact`
(uncommitted, unrelated: swapping `hello@imagile.dev` → `sunny@imagile.dev`
across legal pages). Stashed it safely, built this feature from `main` on
its own branch, and restored the user's stash exactly afterward — verified
via diff-stat before and after. Nothing of theirs was touched or lost.

Manual steps still owed to the user before this does anything in prod:
1. Fine-grained PAT (imagile-app only, Issues: Read & Write) → Key Vault
   secret `GitHubIssuesToken`.
2. `DISCORD_WEBHOOK` Actions secret on imagile-app.
3. A `lead` label needs to exist on imagile-app (one `gh label create`).
4. Confirm Turnstile's Cloudflare dashboard allows both `www.imagile.dev`
   and `imagile.dev` as hostnames.

## Design-system note: minor observation, out of scope

`appsettings.prod.json` in imagile-app has `LocalAuth.Enabled: true` with
seeded demo credentials (`superadmin@example.com` / `Super1234!`, etc.)
— this looks like it may be live in production, not just local/qa. Not
touched, not investigated further; flagging only because it's the kind
of thing worth a second look. Outside this task's scope.
