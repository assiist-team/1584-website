## Mobile‑first refactor plan (optional future improvement)

This document outlines a safe, incremental path to convert the site to mobile‑first CSS using min‑width breakpoints and fluid grids (repeat(auto-fit, minmax(...))). It also includes an image optimization plan for fast loading.

### 📈 Current Status

**✅ Phase 1 Complete** - Image pipeline and directory structure
- Generated 900+ optimized WebP derivatives across all source images
- Created `images_optimized/` with proper category organization (logos, hero, portfolio/gallery, cards)
- Optimized 111 portfolio images + logos + hero images + about images

**✅ Phase 2 Complete** - Responsive images in markup
- Updated HTML across all pages to use `<picture>` elements with `srcset`
- Set appropriate `sizes` attributes for layout breakpoints
- Added `width`/`height` attributes to prevent layout shifts
- Added `loading="lazy"` and `decoding="async"` for performance
- Used `fetchpriority="high"` for LCP hero image

**⏳ Phase 3 Ready** - Page-by-page verification and QA
- All responsive image markup implemented and tested
- Ready for Lighthouse testing and performance verification

**⏳ Phase 4 Pending** - Mobile-first CSS conversion (do this last)
- Convert media queries to min-width breakpoints
- Replace fixed grids with `repeat(auto-fit, minmax(...))`
- Implement `clamp()` for fluid typography and spacing

### Goals
- **Mobile‑first CSS**: invert media queries to min‑width and make the base styles mobile.
- **Fluid grids**: replace fixed column counts/widths with repeat(auto-fit, minmax(...)).
- **Responsive images**: serve smaller assets to mobile, larger to desktop via `srcset`/`sizes`.
- **Incremental, low risk**: refactor page-by-page without breaking unrelated areas.

### Outcomes
- Leaner CSS, fewer overrides, better cascade.
- Faster LCP/CLS by right‑sizing and preloading key images.
- Consistent spacing and typography across breakpoints.

## Phased rollout

### Phase 0 — Inventory and freeze
- Catalog where CSS lives now (inline in `index.html`, `about.html`, `portfolio.html`, and any shared styles/scripts).
- List all grid/column layouts and fixed widths that will move to `repeat(auto-fit, minmax(...))`.
- Identify all large images by page/section and desired target sizes (below).
- Freeze unrelated changes during the refactor to keep diffs reviewable.

### Phase 1 — Image pipeline and directory structure
- Introduce an optimized image tree alongside existing `images/` so we can migrate safely:

- Scope: Only generate optimized derivatives for images currently referenced by production pages (`index.html`, `portfolio.html`, `about.html`). Exclude `page_concepts/`, inspiration assets, and any images not referenced on these pages.

```
images/
  (originals ...)
images_optimized/
  hero/
    <basename>/
      <basename>-320.webp
      <basename>-640.webp
      <basename>-960.webp
      <basename>-1280.webp
      <basename>-1600.webp
      <basename>-1920.webp
  portfolio/
    cards/
      <basename>-320.webp
      <basename>-480.webp
      <basename>-640.webp
      <basename>-768.webp
    gallery/
      <basename>-640.webp
      <basename>-1024.webp
      <basename>-1536.webp
      <basename>-1920.webp
  about/
    <basename>-480.webp
    <basename>-768.webp
    <basename>-1024.webp
```

- Keep original JPEGs in `images/` as fallback; generate WebP first (optionally AVIF later). For maximum compatibility, keep a high‑quality JPEG at the largest size per asset.
- Set conventional target widths by use‑case:
  - **Thumbnails/cards**: 320, 480, 640, 768.
  - **Content/galleries**: 640, 1024, 1536, 1920.
  - **Hero/banner**: 960, 1280, 1600, 1920 (optionally 2560 for 2x retina desktop).
- Ensure each derivative encodes with visual quality 60–75 (WebP) and 70–85 (JPEG), strip metadata.

#### Automation (preferred)
- If using ImageMagick:

```bash
# install (macOS)
brew install imagemagick

# example: generate common widths to WebP
for w in 320 480 640 768 960 1024 1280 1536 1600 1920; do \
  magick input.jpg -resize ${w} -strip -quality 75 output-${w}.webp; \
done
```

- If you prefer a Python workflow (uses `Pillow`):

```bash
python3 -m venv .venv && source .venv/bin/activate
python3 -m pip install pillow
```

```python
# batch_resize.py
from pathlib import Path
from PIL import Image

TARGET_WIDTHS = [320, 480, 640, 768, 960, 1024, 1280, 1536, 1600, 1920]
QUALITY_WEBP = 75

def resize_to_width(src: Path, dest_dir: Path, widths=TARGET_WIDTHS):
    dest_dir.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = im.convert("RGB")
        for w in widths:
            ratio = w / im.width
            h = int(im.height * ratio)
            resized = im.resize((w, h), resample=Image.LANCZOS)
            out = dest_dir / f"{src.stem}-{w}.webp"
            resized.save(out, format="WEBP", quality=QUALITY_WEBP, method=6)

if __name__ == "__main__":
    originals = Path("images/portfolio")  # adjust per batch
    for img in originals.rglob("*.jpg"):
        dest = Path("images_optimized") / img.relative_to("images").with_suffix("")
        resize_to_width(img, dest)
```

### Phase 2 — Responsive images in markup

1) Replace `<img>` with `<picture>`/`<source>` as needed.
2) Add `srcset` and accurate `sizes` that reflect current layout (pre‑CSS‑flip).
3) Add `width` and `height` to all `<img>` to prevent CLS.
4) Use `loading="lazy"` and `decoding="async"` on non‑critical images.
5) Use `fetchpriority="high"` only for the primary LCP hero image.

### Phase 3 — Page‑by‑page verification and QA

- Validate pages after markup changes and before the CSS flip.
- Where safe, modernize isolated grids to fluid patterns without breaking current styles.
- Run Lighthouse and fix any regressions.
- Use `<picture>` with modern formats, then WebP, then JPEG fallback:

```html
<picture>
  <source type="image/avif" srcset="/images_optimized/hero/DSC07461/DSC07461-1280.avif 1280w, /images_optimized/hero/DSC07461/DSC07461-1920.avif 1920w" sizes="100vw" />
  <source type="image/webp" srcset="/images_optimized/hero/DSC07461/DSC07461-960.webp 960w, /images_optimized/hero/DSC07461/DSC07461-1280.webp 1280w, /images_optimized/hero/DSC07461/DSC07461-1600.webp 1600w, /images_optimized/hero/DSC07461/DSC07461-1920.webp 1920w" sizes="100vw" />
  <img src="/images/DSC07461.jpg" alt="Room hero" width="1920" height="1080" fetchpriority="high" />
  <!-- width/height prevent CLS; fetchpriority only for the LCP image -->
 </picture>
```

- For grid cards, set `sizes` to your layout intent:

```html
<img
  src="/images/portfolio_category_cards/DSC06420-HDR.jpg"
  srcset="/images_optimized/portfolio/cards/DSC06420-HDR-320.webp 320w, /images_optimized/portfolio/cards/DSC06420-HDR-480.webp 480w, /images_optimized/portfolio/cards/DSC06420-HDR-640.webp 640w, /images_optimized/portfolio/cards/DSC06420-HDR-768.webp 768w"
  sizes="(min-width: 80rem) 20vw, (min-width: 48rem) 33vw, 90vw"
  loading="lazy" decoding="async" alt="Portfolio card" width="768" height="512"
/>
```

### Phase 4 — Mobile‑first CSS conversion (finalize)

Order of operations (repeat per page/section):
1) Establish baseline mobile styles (no media queries) so default is 320–480px.
2) Convert media queries to min‑width breakpoints.
3) Convert grids to `repeat(auto-fit, minmax(...))`.
4) Introduce fluid typography/spacing with `clamp()` tokens.
5) Replace width‑restricted containers with max‑width + fluid padding.
6) Optional: container queries for components in narrow columns.

Suggested sequence:
- `index.html` (hero, any featured grids) → biggest LCP win first.
- `portfolio.html` (category grid and gallery views).
- `about.html` (content images and any two‑column layouts).

## Breakpoint and grid guidance

### Breakpoints (min‑width)
- `30rem` (480px): small tweaks (2‑column grids instead of 1).
- `48rem` (768px): tablet landscape, nav layout changes.
- `64rem` (1024px): desktop grid expansion.
- `80rem` (1280px): large desktop polish, max‑widths.

### Grid minmax baselines
- Cards: `minmax(14rem, 1fr)` to `minmax(18rem, 1fr)` depending on card width needs.
- Galleries: `minmax(12rem, 1fr)` on mobile; bump to `minmax(16rem, 1fr)` ≥768px.
- Spacing: gap via `clamp(0.75rem, 2.5vw, 2rem)`.

## Performance checklist

- Add `width` and `height` on all `<img>` to eliminate layout shifts.
- Use `fetchpriority="high"` only for the single LCP hero image on the landing page.
- Use `loading="lazy"` + `decoding="async"` for non‑critical images.
- Preload critical CSS if it grows; consider inlining minimal critical CSS for the hero.
- Compress text assets (gzip/brotli via hosting/CDN settings).
- Cache optimized images aggressively with far‑future headers; keep file names immutable.

## Guardrails while CSS is deferred

- Add `width` and `height` on every `<img>` now to eliminate CLS early.
- Choose conservative `sizes` values based on the current layout; revisit after CSS flip.
- Avoid deleting existing CSS; stage the CSS flip in section‑scoped blocks and remove only after visual QA.
- Introduce breakpoint tokens early (even if unused) so `sizes` choices align with upcoming breakpoints:

```css
:root {
  --bp-sm: 30rem;   /* 480px */
  --bp-md: 48rem;   /* 768px */
  --bp-lg: 64rem;   /* 1024px */
  --bp-xl: 80rem;   /* 1280px */
}
```

- Limit changes to layout‑critical CSS before Phase 4; fix only high‑severity mobile bugs.
- Keep file paths stable in `images_optimized/` to maximize caching.

## Acceptance criteria

- No visual regressions ≤480px compared to current site; improvements allowed at larger sizes.
- All grids use `repeat(auto-fit, minmax(...))`; no fixed column counts remain.
- Media queries are min‑width based; no `max-width`‑only responsive logic.
- Key pages (`index.html`, `portfolio.html`, `about.html`) deliver ≤100KB of images to a 390px‑wide viewport on first load (excluding hero where applicable).
- Lighthouse: Mobile Performance ≥ 85, CLS ≤ 0.05, LCP ≤ 2.5s on a throttled 4G profile.

## Notes on safe rollout

- Keep existing styles during conversion behind comments or section‑scoped classes; remove only after verification.
- Where inline styles exist, move repeated rules to a shared `<style>` block or a small `.css` file to avoid duplication as we add breakpoints.
- Align with `mobile-fixes-documentation.md` for any known device quirks while converting.

## Optional enhancements (after core refactor)

- Add `AVIF` derivatives where supported by your tooling for ~20–30% smaller payloads versus WebP.
- Consider a simple build step that rewrites `<img>` paths to `images_optimized/` if a matching derivative exists.
- Introduce a tiny utility class set for grids and spacing (e.g., `.grid-auto`, `.gap-sm/md/lg`) to reduce repetition.

---

If you want, I can start with `index.html` hero and featured grids: create optimized hero derivatives, switch markup to `<picture>`, and convert those grids to `repeat(auto-fit, minmax(...))` with min‑width queries, then proceed page‑by‑page.


