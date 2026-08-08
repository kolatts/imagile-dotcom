---
model: gpt-image-2
size: 1024x1024
quality: medium
background: auto
n: 2
generated: 2026-08-07T18:59:29
style_file: .claude/image-generation/style.md
outputs:
  - logomark-1.png
  - logomark-2.png
---

A minimal technical logomark for a software consultancy: a drafting compass / dividers instrument, one leg terminating in a precise point, rendered as thin flat vector linework that also reads as a geometric letter I. Perfectly centered on a square canvas with generous margin, aligned to an implied grid, technical-pen line weight throughout, no fill except the single orange accent tip.

Style guidance (follow exactly):
# Imagile — image style guide (Workbench direction)

Everything in this file is appended to every image prompt verbatim. The
brand direction is "Workbench": an engineering drafting board, not a SaaS
brochure. Every asset should look like it belongs on a spec sheet or a
technical drawing, not a stock marketing site.

## Palette

| Role | Name | Hex | RGB |
|------|------|-----|-----|
| Ink (dark ground) | Graphite | `#17191B` | rgb(23, 25, 27) |
| Surface (light ground) | Drafting Paper | `#F6F7F6` | rgb(246, 247, 246) |
| Accent | Marker Orange | `#E85D04` | rgb(232, 93, 4) |
| Accent (dark-mode variant) | Marker Orange Bright | `#FF7A26` | rgb(255, 122, 38) |
| Muted line / annotation | Slate | `#5C6670` | rgb(92, 102, 112) |
| Grid line (near-invisible) | Graphite at 5% | `rgba(23,25,27,0.06)` | — |

Use Graphite or Drafting Paper as the dominant ground depending on requested
mode. Marker Orange is the ONLY color allowed to pop, and only for the one
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
- Generic neural-network / circuit-brain / glowing orb "AI" imagery
- Stock-photo people, handshake photos, laptop-with-code-on-screen clichés
- Photorealism (this is a diagram/drafting language, not a photograph)
- Lens flares, bevels, drop shadows, glossy 3D
- Text baked into the image — real text is added in the page layout, not
  the artwork
- Off-palette colors, especially a second competing accent hue
- Rounded "friendly SaaS" blob shapes or soft rounded-rectangle cards
