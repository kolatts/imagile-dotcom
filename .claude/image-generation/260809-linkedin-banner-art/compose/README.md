# LinkedIn banner + logo — compositing step

The generated art (`../linkedin-banner-art-*.png`) is only the drafting-instrument
drawing. Per `style.md`, real text is never baked in by the image model — it is set
in the actual brand fonts here and rendered pixel-exact, the same way
`public/og-default.png` was produced.

## Pipeline

1. `uv run <image-generation skill>/scripts/generate_image.py --prompt-file ../prompt.md`
   → `../linkedin-banner-art-1.png` (variant 1 is the keeper — crisper instrument detail)
2. `python compose/prep-art.py` → `../banner-art-prepped.png`
   (whitens the model's paper ground so multiply-blending leaves no seam)
3. `npm i playwright && npx playwright install chromium`, then from this folder:

   ```bash
   node shoot.mjs '[["banner.html","linkedin-banner.png",1128,191,2],["logo.html","linkedin-logo.png",400,400,2],["logo-dark.html","linkedin-logo-dark.png",400,400,2]]'
   ```

4. Palette-optimize the logo (quantizing to 128 colors is visually lossless here —
   max channel delta 4) and copy into `public/images/`.

## Shipped output

| File | Size | Where |
|---|---|---|
| `public/images/linkedin-banner.png` | 2256×382 | LinkedIn company page cover (1128×191 @2x) |
| `public/images/linkedin-logo.png` | 800×800 | LinkedIn company logo (300×300 recommended) |
| `../linkedin-logo-dark-alt.png` | 800×800 | Ink-ground alternate, unshipped |

## Notes

- The logomark is **not** regenerated — `style.md` calls it the corporate logo,
  reproduced deliberately and never reinvented. Both files composite the real
  `public/images/imagile-mark.png`.
- Logo framing matches `public/apple-touch-icon.png` (ink fills ~72–76% of the
  frame, plain ivory ground, no grid — the grid turns to moiré at LinkedIn's 48px
  feed size).
- The banner keeps its left ~18% clear because LinkedIn's own logo tile overlaps
  the cover's bottom-left corner.
- `@font-face` and `<img>` in the HTML use absolute `file:///C:/Code/imagile-dotcom/…`
  paths — fix those up if the repo lives somewhere else.
