# Reviews Mosaic — Masonry Grid Spec

**Purpose**

Document the recommended implementation for the reviews screenshots mosaic: a masonry-style layout that preserves each screenshot's full height (no cropping), keeps a tidy visual grid, preserves left→right ordering where possible, and remains performant.

---

## Goals

- Display screenshots in full (no cropping), allowing varied heights.
- Maintain a visually tidy mosaic with consistent gaps.
- Preserve left→right reading order as much as possible.
- Keep initial page weight reasonable (lazy load, limit initial items from 100+ total screenshots).
- Add visual polish with shadows, hover effects, and smooth scroll transitions.

---

## Chosen approach (summary)

Use **CSS Grid** with a fixed `grid-auto-rows` baseline and a small JavaScript helper that measures each image's rendered height and assigns a `grid-row: span N` to its wrapper. This produces a masonry-like layout without adding a heavy external dependency and preserves left→right flow.

Why this approach:

- Visual quality: images are shown uncropped with natural heights.
- Ordering: keeps a predictable left→right reading order better than CSS columns.
- Complexity: small, contained JS helper only for measuring and spanning.
- Performance: supports lazy-loading and incremental 'load more' batches.

---

## Files to add / update

- Update: `vacation-rental-toolkit-landing.html` — add grid container markup and hook classes/IDs, include the helper script (inline or external). Keep the toolkit CTAs intact.
- Keep or use: `property_reviews/images_list.json` (or inline the list for `file://` preview). Either method works — inline is more resilient for local previews.
- Optional add: `property_reviews/optimized/` — directory with resized WebP/JPEG derivatives created via `scripts/batch_resize.py` or similar.
- Optional: create `js/reviews-masonry.js` if externalization preferred.

---

## Markup (structure outline)

- Section wrapper (semantic):

  - `<section id="reviews-mosaic" class="reviews-mosaic-section container" aria-labelledby="reviews-mosaic-heading">`
  - `<h2 id="reviews-mosaic-heading">See what our clients' guests are saying.</h2>`
  - `<div class="reviews-masonry" role="list">` (grid container)
  - Child items: `<div class="masonry-item" role="listitem"><img ...></div>`
  - Controls: `Load more` button and the second toolkit CTA below the grid.

Note: images are screenshots only — no captions or overlay text per screenshot.

---

## CSS (conceptual)

- Grid container

  - `display: grid;`
  - `grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));` (tune min width)
  - `grid-auto-rows: 16px;` (baseline row height used to compute spans)
  - `gap: 12px;`

- Item wrapper

  - Will receive inline style `grid-row: span <n>` set by JS.
  - Box shadow: subtle shadow (e.g., `box-shadow: 0 2px 8px rgba(0,0,0,0.1);`)
  - Border radius: slight rounding (e.g., `border-radius: 4px;` or 8px)
  - Transition: smooth transform and shadow on hover (e.g., `transition: transform 0.2s ease, box-shadow 0.2s ease;`)
  - Hover state: subtle lift effect (e.g., `transform: translateY(-4px);` and enhanced shadow `box-shadow: 0 8px 16px rgba(0,0,0,0.15);`)
  - Overflow hidden to respect border radius on images

- Image

  - `width: 100%; height: auto; display: block;` (preserves full screenshot)
  - Smooth opacity transition on load

- Scroll animations

  - Items fade in and slide up as they enter viewport using Intersection Observer
  - Stagger animation delays for cascading effect (e.g., delay based on item index)
  - Animation: `opacity: 0` → `opacity: 1` and `transform: translateY(20px)` → `translateY(0)`
  - Transition: `opacity 0.4s ease, transform 0.4s ease`

- Responsive tuning: adjust `minmax` and breakpoints at ~480px, 768px, 1100px to improve column count and balance.

- Fallback: provide a columns or stacked layout if JS is disabled.

---

## JavaScript helper (algorithm — no code here)

1. Obtain the image list (prefer inline data for local previews; otherwise fetch JSON).
2. Optionally dedupe and shuffle the list.
3. Limit initial render (e.g., 24), provide a `Load more` button to append further batches.
4. For each image to render:
   - Create a wrapper element `.masonry-item` and an `<img loading="lazy">` child.
   - Initialize wrapper with `opacity: 0` and scroll animation state.
   - Append to the grid container so it participates in layout.
5. After image load (or using `requestAnimationFrame`), measure the image's rendered height.
6. Compute spans using the grid baseline: `span = Math.ceil((renderedHeight + gap) / gridAutoRowHeight)`.
7. Set `wrapper.style.gridRow = 'span ' + span;`.
8. Use `ResizeObserver` (if available) to watch images and recompute spans if their size changes; otherwise listen to `window.resize` (debounced).
9. Set up `IntersectionObserver` to watch items as they enter viewport:
   - When an item becomes visible, add animation class or set inline styles to trigger fade-in and slide-up.
   - Apply staggered delays based on item index for cascading effect.

Batch measurements where possible to avoid forced synchronous layouts; prefer using `requestAnimationFrame` and grouping reads/writes.

---

## Image assets and optimization

- Generate resized derivatives at build-time with `scripts/batch_resize.py` or similar.
  - Suggested sizes: 480, 800 (in-grid display at various viewport widths).
  - Prefer WebP with JPEG fallback.
- Use `srcset` + `sizes` for in-grid `<img>` elements so browsers pick optimal files.
- If generating derivatives is not possible immediately, still use lazy-loading and limit initial count.

---

## UX & performance recommendations

- Lazy-load images using `loading="lazy"` and show a lightweight placeholder (e.g., CSS background color or blurred tiny inline SVG) while each image loads.
- Limit initial number of screenshots shown (e.g., 24) and provide `Load more` to append batches.
- Debounce resize recalculations (e.g., 150–250ms) to avoid thrashing.

---

## Accessibility

- If screenshots are purely decorative, set `alt=""`. If a screenshot contains important text that must be conveyed, provide a short accessible summary elsewhere.
- Respect `prefers-reduced-motion` media query: disable scroll animations and hover transforms for users who prefer reduced motion.

---

## Testing checklist

- Visual: varied-height images render uncropped across small→large viewports; shadows and hover effects display correctly.
- Functional: lazy-load works; load more appends; scroll animations trigger smoothly with staggered delays.
- Performance: initial payload under acceptable threshold (tunable by generating derivatives and reducing initial count); animations perform smoothly without jank.
- Accessibility: test with keyboard-only navigation and a screen reader; ensure animations respect `prefers-reduced-motion`.

---

## Acceptance criteria

- Screenshots display fully (no cropping) with variable heights preserved.
- Layout is tidy with consistent gaps and no visual overlap.
- Initial load shows configured count (e.g., 24) and `Load more` appends more from the 100+ total screenshot collection.
- Items have subtle shadows, smooth hover effects (lift + shadow enhancement), and fade-in/slide-up animations on scroll.
- Animations respect `prefers-reduced-motion` and perform smoothly without jank.

---

## Rollout & effort estimate

- Implement on a feature branch and generate optimized assets for the 100+ screenshot collection.
- Estimated effort:
  - Spec + assets generation: 1–2 hours (assets may take longer given 100+ volume).
  - Implementation (CSS + JS + scroll animations): 2–4 hours.
  - QA and adjustments: 1–2 hours.

---

If you want, I can now implement this spec (CSS + JS + scroll animations + optimized asset generation) or break the implementation into smaller pull-request-sized steps. Tell me how you'd like to proceed.


