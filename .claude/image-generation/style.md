# Imagile — image style guide (Workbench direction)

Everything in this file is appended to every image prompt verbatim. The
brand direction is "Workbench": an engineering drafting board, not a SaaS
brochure. Every asset should look like it belongs on a spec sheet or a
technical drawing, not a stock marketing site.

## Palette

These are the shipped site tokens from `src/styles/global.css` ("Workbench,
refined" — warm editorial). Match them exactly.

| Role | Name | Hex | RGB |
|------|------|-----|-----|
| Ink (dark ground / linework) | Warm Ink | `#1c1915` | rgb(28, 25, 21) |
| Surface (light ground) | Ivory Paper | `#faf8f4` | rgb(250, 248, 244) |
| Card surface | Warm White | `#fffefb` | rgb(255, 254, 251) |
| Accent | Terracotta | `#c25d33` | rgb(194, 93, 51) |
| Accent (dark-mode variant) | Terracotta Light | `#e08356` | rgb(224, 131, 86) |
| Muted line / annotation | Warm Slate | `#6b6459` | rgb(107, 100, 89) |
| Grid line (near-invisible) | Warm Ink at 5% | `rgba(28,25,21,0.05)` | — |

Use Warm Ink or Ivory Paper as the dominant ground depending on requested
mode. Terracotta is the ONLY color allowed to pop, and only for the one
element that matters most in the frame (under 10% of the frame's area) —
treat it like a highlighter mark or a single dimension-line callout, never
as a fill for large shapes.

## Illustration style

- Precise line art: thin, consistent stroke weight (equivalent to a 0.5pt
  technical pen), like an engineering drawing or a patent diagram
- Fine drafting grid faintly visible in the background (Graphite at ~5–6%
  opacity), aligned and regular, never decorative or wavy
- Annotation marks are welcome and on-brand: crosshair registration marks,
  dimension lines with small arrowheads, tick marks, corner brackets —
  used the way a blueprint uses them, to indicate measurement or precision,
  never as random decoration
- Flat and 2D. No gradients, no glassmorphism, no bevels, no drop shadows,
  no glossy 3D renders, no glowing neon
- Geometric, restrained, a little cold — precision over warmth
- Generous negative space; the subject should feel measured and placed,
  not crammed

## Composition

- Square/icon assets: subject fills roughly 60–70% of the frame, centered
  or aligned to the grid, with clear margins
- Wide/banner assets: subject or mark weighted to one side, the opposite
  side left as clean drafting-paper or graphite space for overlaid text
- Favor asymmetry over centered symmetry when the format is wide — this is
  an editorial-technical layout, not a poster

## Never

- Purple-to-blue gradients, or any gradient mesh
- Emoji as iconography, or anything that reads as a sticker/mascot
- Generic neural-network / glowing orb "AI" imagery (exception: the official
  Imagile circuit-brain logomark — `public/images/imagile-mark.png` — is the
  corporate logo and is reproduced deliberately, never reinvented)
- Stock-photo people, handshake photos, laptop-with-code-on-screen clichés
- Photorealism (this is a diagram/drafting language, not a photograph)
- Lens flares, bevels, drop shadows, glossy 3D
- Text baked into the image — real text is added in the page layout, not
  the artwork
- Off-palette colors, especially a second competing accent hue
- Rounded "friendly SaaS" blob shapes or soft rounded-rectangle cards
