# Color Studio: site profile

Snapshot as of 2026-10-02. Written against `6782783` (origin/main), branch `design/upgrade`.

## What it is

A free, no-signup, client-side web tool for building a color palette and exporting it straight into code (CSS, SCSS, JSON, Tailwind, shadcn/ui).

There is no business behind it in the repo: no pricing, no accounts, no backend, no CMS, no database. It is an open-source (MIT) tool deployed on Vercel at https://color-studio-mu.vercel.app.

## Audience and main action

- **Who:** front-end developers and UI designers who need a working palette in code. The export targets (Tailwind scales, shadcn/ui CSS variables, OKLCH values) point at developers on modern React/Tailwind stacks.
- **Main action:** pick or generate a base color, shape it into a palette, check it is accessible, then copy the export into a codebase. Secondary: share a link to the palette, download it as an image.

## Routes and templates

The site is a single route (`/`, `index.html`). There are no other pages. "Templates" in this redesign therefore means the views and panels of the one page:

| # | View / panel | Where now | Notes |
|---|---|---|---|
| T1 | App shell (header, left sidebar, center canvas, right tools panel) | `index.html` `.app-layout` | 3-column grid, `100vh`, each column scrolls |
| T2 | Color input bar (picker, hex, Apply, Copy, Undo, Redo) | `.top-bar` | |
| T3 | Export bar (CSS, SCSS, JSON, Tailwind, shadcn/ui, Link, Image) | `.export-buttons` | DaisyUI + Bootstrap exporters exist in JS (`generateDaisyUIExport`, `generateBootstrapExport`) but have **no buttons**, so they are unreachable |
| T4 | Original vs Modified color display | `.color-display` | name, HEX/RGB/HSL/OKLCH, contrast vs original, WCAG badge |
| T5 | Color schemes (Comp, Analog, Triadic, Split-C, Compound, Random) | `.tool-section` | `squareBtn` handler exists, no button |
| T6 | Contrast checker | `.contrast-checker-section` | FG/BG, ratio, 4 badges, preview, suggest |
| T7 | Gradient generator | `.gradient-section` | linear/radial/conic, angle, copy CSS |
| T8 | Shader background (WebGL) | `.shader-section` | 7 presets, speed, PNG download |
| T9 | Palette preview mockups | `.mockup-section` | dashboard card, landing hero, mobile screen |
| T10 | Harmony analysis gauges | `.harmony-section` | contrast / harmony / WCAG / overall |
| T11 | Adjustments (brightness L/D toggle, saturation, hue) | right `.controls-section` | OKLCH math |
| T12 | Image color extraction | `.image-extract-section` | drag-drop or browse, median-cut, 5+ swatches |
| T13 | Vision simulation | `.colorblind-section` | normal / protan / deutan / tritan |
| T14 | UI preview | `.ui-preview-section` | tiny card + nav |
| T15 | Sidebar: quick colors + recent colors | `.sidebar` | history in `localStorage`, max 20 |
| T16 | Toast + keyboard hints | `#toast`, `.keyboard-hints` | |

States that exist: history empty, history filled, invalid hex (border turns red, nothing else), image not loaded / extracted, color locked, URL-loaded ("Palette loaded from shared link" toast), copy success (button text swap), service-worker update toast.

## Design tokens (current, `index.css:1-61`)

- Dark-only UI: `--bg-base #101014`, surfaces `#18181d`..`#2a2a32`, borders `#272730`/`#3f3f4e`.
- Accent indigo `#6366f1` (Tailwind indigo-500), success `#10b981`, error `#ef4444`, warning `#f59e0b`.
- Type: Inter 400-700 + JetBrains Mono (Google Fonts), h1 1.5rem, h3 0.875rem.
- Spacing 4/8/12/16/24px. Radius 4/8/12/pill. Shadows: generic float stack.
- normalize.css from cdnjs. A `prefers-color-scheme: dark` block exists but the base is already dark, so there is no light theme.

## Content types

None in a CMS sense. Content is static UI copy plus a ~1,800-entry color names table inside `index.js` (Name That Color list).

## Current features (observed in code + browser)

Color input (picker / hex), OKLCH brightness/saturation/hue adjustments, color naming, 6 scheme generators + random, harmony scoring, WCAG contrast checker with auto-suggest, gradient generator, WebGL shader backgrounds with PNG export, three palette mockups, image extraction, colorblind simulation, 5 visible export formats (+2 hidden), share link (query string state), PNG palette card export, undo/redo (50 steps), color lock, keyboard shortcuts (Space/L/C/Ctrl+Z), recent history, PWA (manifest + service worker), PostHog analytics (only when key set).

## User journeys

1. **Generate:** land, press Space or Random, get a 5-color scheme, click a swatch to make it the base.
2. **Tune a brand color:** paste hex, Apply, adjust sliders, read contrast, copy hex.
3. **Ship to code:** build scheme, click Tailwind or shadcn/ui, paste.
4. **Check accessibility:** contrast checker, suggest passing FG, vision simulation.
5. **From an image:** drop image, get extracted colors, click one.
6. **Share:** Link (URL params) or Image (1200x630 PNG).

## Problems observed in the browser (before screenshots in `screenshots/before/`)

- **No point of view.** Generic dark dashboard; every action is a saturated indigo or green pill of equal weight, so the eye has no entry point. The user's colors compete with UI chrome colors.
- **The default state looks broken.** Brightness starts at 20% lighten, so the initial "Modified" color for `#c6d5ac` is pure white with a red FAIL bar (`desktop-default-viewport.png`).
- **Toast renders as an empty light box** with invisible text (`desktop-random-palette.png`, bottom center).
- **Scheme output is not a palette.** Swatches have no hex labels and no copy per swatch; exports only use base + modified, not the generated scheme (CSS export, `generateCssExport`).
- **Mobile:** 7,535px tall single column; the sidebar (quick colors, empty history) comes first, so the tool itself starts below the fold; export buttons stack full-width one per row (`mobile-default-full.png`).
- Export codes are copied blind. No preview of what gets copied.
- Hidden features: DaisyUI and Bootstrap exporters, Square scheme.
- Abbreviated labels ("Comp", "Analog", "Split-C", "Unlck") hurt scanability.
- Invalid hex only changes a border color (no message, not announced to screen readers).

## Unknowns

- Whether there are real traffic numbers or a known primary use (PostHog key is env-gated; not checked).
- Whether a brand/logo exists beyond the favicon and OG image.
- Whether the owner wants a marketing landing section or a pure tool. Best reading: pure tool, with a small amount of orientation copy, because there is nothing to sell.
