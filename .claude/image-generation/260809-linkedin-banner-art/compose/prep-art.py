"""Prepare the generated drafting art for multiply-blending into the banner.

gpt-image-2 renders its own ivory paper ground (~252,249,243) and a faint
baked-in grid. Dropped straight onto the banner with `mix-blend-mode: multiply`
that ground darkens the ivory underneath it, leaving a visible warm rectangle,
and its grid double-exposes with the banner's real one.

So: normalize the paper to pure white (multiply becomes a no-op there), clip the
near-white residue so only the banner's own grid survives, then deepen the
linework, which is about to be downscaled ~5x into a 191px-tall strip.

Run from the repo root.
"""

from PIL import Image
import numpy as np

RUN = ".claude/image-generation/260809-linkedin-banner-art"

src = Image.open(f"{RUN}/linkedin-banner-art-1.png").convert("RGB")
a = np.asarray(src).astype(np.float32)

paper = a[10:120, 10:200].reshape(-1, 3).mean(axis=0)  # clean patch, no linework
a = a * (255.0 / paper)
a[a > 243] = 255.0
a = 255.0 * np.clip(a / 255.0, 0, 1) ** 1.9

out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
out = out.crop((300, 8, 1440, 736))  # instruments + the tail of the construction arc
out.save(f"{RUN}/banner-art-prepped.png")
print("prepped", out.size)
