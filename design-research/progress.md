# Design upgrade progress

Worktree: `/Volumes/LizsDisk/_wt/color-studio-design-upgrade` (branch `design/upgrade`, from `origin/main` `6782783`).
The main checkout at `/Volumes/LizsDisk/color-studio` was left untouched (its untracked older `CLAUDE.md` draft would have blocked a checkout there).
Screenshots use the production bundle, not the dev server (the dev server watches the repo root and live-reloads whenever a screenshot is written). Rebuild with the Vercel-equivalent build (`pnpm build` + copy static files into `dist/`), serve with `python3 -m http.server 3124` from `dist/`, and unregister the service worker before each capture.

## Phases

- [x] Phase 1: Understand the site (`profile.md`, `screenshots/before/`)
- [x] Phase 2: Research (`references.md`, `features.md`)
- [x] Phase 3: Decide (`plan.md`, `needs-approval.md`)
- [x] Phase 4: Foundation + homepage
- [x] Phase 5: Roll out to every template
- [x] Phase 6: Verify
- [x] Phase 7: Report (`report.md`). Stopped here; not merged.

## Template tracker

Scores: POV / Type / Layout / Color / Motion / Fit / Memorable / Craft. Screenshots in `screenshots/after/`.

| ID | Template | Status | Scores | States checked | Evidence |
|---|---|---|---|---|---|
| T1 | App shell + masthead | done | 5/4/4/5/4/4/4/4 | light, dark (manual toggle), mobile 390 no overflow | `r3-desktop-dark.png`, `r3-mobile-viewport.png` |
| T2 | Color input | done | 4/4/4/5/4/5/4/4 | invalid hex (inline error, `aria-invalid`, `role=alert`), Enter applies, error clears | `p5-state-invalid-hex.png` |
| T3 | Export sheet (replaces export bar) | done | 5/4/4/4/4/5/4/4 | open/close (Esc, backdrop, button), 8 formats, hex/oklch, copy, download (`tailwind.config.js` verified), mobile scrollable tabs | `r4-desktop-export.png`, `r4-mobile-export.png` |
| T4 | Adjust: original vs modified | done | 4/4/4/4/4/4/4/4 | unchanged state message instead of FAIL badge | `r2-desktop-adjust.png`, `p5-mobile-adjust.png` |
| T5 | Stage / schemes | done | 5/5/4/5/4/5/4/4 | 6 schemes, Shuffle, band lock kept across Shuffle, base lock, reveal mid-frame | `r4-desktop-band-reveal-midframe.png`, `p5-state-band-locked.png` |
| T6 | Contrast checker | done | 4/5/4/5/4/5/4/4 | defaults to base bg + best palette text; pass and fail tags | `r2-desktop-contrast.png`, `p5-mobile-contrast.png` |
| T7 | Gradient | done | 4/4/4/5/4/4/4/4 | linear/radial/conic, long code line no longer overflows mobile | `r2-desktop-gradient.png` |
| T8 | Shader | done | 4/4/4/5/4/4/4/4 | renders when in view; paused off-screen (existing IntersectionObserver) | `r2-desktop-gradient.png` |
| T9 | Mockups | done | 4/4/4/4/4/4/4/4 | 2x2 desktop, stacked mobile | `p5-desktop-preview.png`, `p5-mobile-preview.png` |
| T10 | Harmony gauges | done | 4/4/4/4/4/4/4/4 | low score uses signal color, otherwise ink | `p5-desktop-preview.png` |
| T11 | Sliders | done | 4/4/4/4/4/4/4/4 | lighten/darken segmented (`aria-pressed`), hue track shows the wheel | `r2-desktop-adjust.png` |
| T12 | Image extract | done | 4/4/4/4/4/5/4/4 | empty, loaded (thumbnail + swatches), "Use as palette", non-image drop toast (existing) | `p5-desktop-image.png`, `p5-desktop-image-loaded.png` |
| T13 | Vision simulation | done | 4/4/4/4/4/5/4/4 | applies to stage; stage shows "Simulating ..." notice | `p5-state-deuteranopia-stage.png` |
| T14 | UI preview | done | 4/4/4/4/4/4/4/4 | merged into mockup grid as fourth frame | `p5-desktop-preview.png` |
| T15 | Quick + recent colors | done | 4/4/4/5/4/4/4/4 | empty state; history now records apply/picker/preset/band | journey check: 1 entry after Enter |
| T16 | Toast + key hints + colophon | done | 4/4/4/4/4/4/4/4 | toast readable (ink pill); shortcuts list incl. new `E` | `r3-desktop-shuffle.png`, `p5-mobile-colophon.png` |
| new | Scale chapter | done | 5/4/5/5/4/5/4/4 | desktop 11-up, mobile rows | `p5-desktop-scale.png`, `p5-mobile-scale.png` |
| new | PNG export | done | 4/4/4/5/-/4/4/4 | downloaded and viewed | `p5-export-palette.png` |

Journey checks (Playwright, production bundle): hex error announce, history records, band lock survives Shuffle, share URL restores palette + lock, image -> palette (6 bands), PNG/SVG/`tailwind.config.js` downloads. 0 page errors.

## Log

- 2026-10-02: Phase 1 done. Before screenshots: desktop + mobile default, random palette, invalid hex, image extracted, live production.
- 2026-10-02: Phase 2 done (15 references, 10 competitors, 1 blocked: Kremer 403). Phase 3 done: direction "Specimen", features F1-F11.

## Phase 4 rubric: homepage (masthead + stage), 1-5

| Criterion | Round 1 (`r1-*`) | Round 2 (`r3-*`, `r4-*`) | Fix between rounds |
|---|---|---|---|
| Point of view | 4 | 5 | - |
| Typography | 4 | 4 | - |
| Layout and rhythm | 3 | 4 | Adjust swatches overlapped (grid min-content); specimen meta misaligned |
| Color and imagery | 4 | 5 | Contrast checker defaulted to a failing pair; now base as background, best palette color as text |
| Motion | 2 | 4 | Bands now roll in with a 45ms stagger (`band-in`); off under reduced motion |
| Audience fit | 4 | 4 | - |
| Memorability | 3 | 4 | Paint-chip reveal, serif color names |
| Craft (mobile, a11y, perf) | 2 | 4 | Mobile overflow 710px -> 390px (gradient code nowrap); export dialog was pinned top-left (reset removed dialog auto margin); export tabs scroll instead of wrapping on phones |

Lighthouse not run yet (Phase 6).

## Phase 6 verification

- `pnpm test`: 71/71 pass. `pnpm biome:check`: 0 errors, 0 warnings (1 info: biome schema version). `pnpm build`: compiles (3 pre-existing webpack size warnings). No TypeScript in this repo, so no typecheck step.
- Lighthouse 12 (JSON in `lighthouse/`), production bundle served gzip-compressed (`npx serve dist`), vs the live site:

| | Perf | A11y | Best pr. | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Live, mobile | 83 | 84 | 100 | 100 | 3.7 s | 0 | 0 ms |
| New, mobile | 97 | 100 | 100 | 100 | 2.1 s | 0.003 | 60 ms |
| Live, desktop | 99 | 89 | 100 | 100 | 0.7 s | 0.042 | 0 ms |
| New, desktop | 100 | 100 | 100 | 100 | 0.5 s | 0.003 | 0 ms |

  Regressions found and fixed on the way: CLS 0.28 (empty palette section on phones, now reserves height), TBT 430 ms (WebGL shader compiled at startup, now compiled when its section nears the viewport; script now `defer`), 4 low-contrast labels (opacity on band/scale metadata), scale buttons whose aria-label hid their visible text.
  Mobile runs vary 89-97 across 3 runs.
- Journeys clicked in the browser: generate (Space, 6 schemes), lock a band then Shuffle, lock base, apply hex (valid/invalid), recent colors, adjust sliders, contrast suggest defaults, vision simulation, image upload -> use as palette, export sheet (8 formats, hex/oklch, copy, download), PNG + SVG downloads, share link restores palette + locks, undo/redo across palette changes, theme toggle, keyboard (skip link first, `E` opens export, Esc closes, focus moves into dialog). 0 page errors.
