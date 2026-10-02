# Design upgrade progress

Worktree: `/Volumes/LizsDisk/_wt/color-studio-design-upgrade` (branch `design/upgrade`, from `origin/main` `6782783`).
The main checkout at `/Volumes/LizsDisk/color-studio` was left untouched (its untracked older `CLAUDE.md` draft would have blocked a checkout there).
Screenshots use the production bundle, not the dev server (the dev server watches the repo root and live-reloads whenever a screenshot is written). Rebuild with the Vercel-equivalent build (`pnpm build` + copy static files into `dist/`), serve with `python3 -m http.server 3124` from `dist/`, and unregister the service worker before each capture.

## Phases

- [x] Phase 1: Understand the site (`profile.md`, `screenshots/before/`)
- [x] Phase 2: Research (`references.md`, `features.md`)
- [x] Phase 3: Decide (`plan.md`, `needs-approval.md`)
- [x] Phase 4: Foundation + homepage
- [→] Phase 5: Roll out to every template
- [ ] Phase 6: Verify
- [ ] Phase 7: Report

## Template tracker

(see `profile.md` for T1-T16)

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
