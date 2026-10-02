# Color Studio redesign: report

Snapshot as of 2026-10-02. Branch `design/upgrade` (worktree `/Volumes/LizsDisk/_wt/color-studio-design-upgrade`), based on `origin/main` `6782783`. Not merged, not pushed, not deployed.

## Summary

The tool is now a "specimen book" for the user's colors: paper-and-ink chrome, a full-bleed palette stage with named bands, and numbered chapters for each tool. The only color on the page is the palette being built.

- Lighthouse mobile went from 83 / 84 / 100 / 100 to 97 / 100 / 100 / 100 (performance / accessibility / best practices / SEO).
- 11 planned features shipped. None needed a database, CMS or paid service.
- Every JavaScript hook ID from the old page still exists. Old share links (`?color=&brightness=&saturation=&hue=&mode=`) still load; the new `p=` and `lock=` parameters are additive.

Commits on the branch:

| Commit | Phase |
|---|---|
| `459ff67` | 1: profile + before screenshots |
| `e2f8e39` | 2: references + competitor features |
| `37139ce` | 3: plan + needs-approval |
| `c1c6b85` | 4: design system, shell, palette stage, export sheet |
| `d7bf0bf` | 5: every panel, scale chapter, PNG export, SW cache |
| `cf57c1d` | 6: Lighthouse fixes, undo restores palette |

## Before and after

All screenshots are real Playwright captures. Before = `screenshots/before/`, after = `screenshots/after/`.

| Template | Before | After |
|---|---|---|
| Whole page, desktop first view | `before/desktop-default-viewport.png` | `after/final-desktop-viewport.png` |
| Whole page, desktop full | `before/desktop-default-full.png` | `after/final-desktop-full.png` |
| Whole page, mobile first view | `before/mobile-default-viewport.png` | `after/final-mobile-viewport.png` |
| Whole page, mobile full | `before/mobile-default-full.png` | `after/final-mobile-full.png` |
| Palette / schemes (T5) | `before/desktop-random-palette.png` | `after/r3-desktop-shuffle.png`, `after/r4-desktop-triadic.png` |
| Invalid hex (T2) | `before/desktop-invalid-hex.png` | `after/p5-state-invalid-hex.png` |
| Image extraction (T12) | `before/desktop-image-extracted.png` | `after/p5-desktop-image.png`, `after/p5-desktop-image-loaded.png` |
| Adjust (T4, T11) | inside `before/desktop-default-full.png` | `after/r2-desktop-adjust.png`, `after/p5-mobile-adjust.png` |
| Scale (new) | did not exist | `after/p5-desktop-scale.png`, `after/p5-mobile-scale.png` |
| Contrast + vision (T6, T13) | inside `before/desktop-default-full.png` | `after/r2-desktop-contrast.png`, `after/p5-mobile-contrast.png`, `after/p5-state-deuteranopia-stage.png` |
| In use: mockups + scores (T9, T10, T14) | inside `before/desktop-default-full.png` | `after/p5-desktop-preview.png`, `after/p5-mobile-preview.png` |
| Gradient + shader (T7, T8) | inside `before/desktop-default-full.png` | `after/final-desktop-gradient.png` |
| Export (T3) | button row, `before/desktop-default-viewport.png` | `after/r4-desktop-export.png`, `after/r4-mobile-export.png`, `after/r3-desktop-dark-export.png` |
| Dark theme (T1) | dark only | `after/r3-desktop-dark.png` |
| PNG export | dark card (old code) | `after/p5-export-palette.png` |
| Footer / shortcuts (T16) | key hints in right panel | `after/p5-mobile-colophon.png` |

## Design direction

"Specimen", drawn from Commercial Type's tone-on-tone bands, Klim/MoMA's neutral ground, Artemii Lebedev's mono metadata, Grilli Type's hairline structure and This's serif-in-grotesk emphasis (details in `plan.md` and `references.md`).

- Type: Instrument Serif (names, chapter titles), Geist (UI), Geist Mono (values). Replaces Inter + JetBrains Mono.
- Color: near-zero-chroma OKLCH paper and ink, light and dark. No brand accent; the user's base color drives the wordmark dot, focus ring and selection.
- Motion: bands roll in left to right (45 ms stagger); everything off under `prefers-reduced-motion`.

## Features added

| # | Feature | Verified how |
|---|---|---|
| F1 | Palette bands with name, hex, OKLCH, copy, lock, "use as base"; locked bands survive Shuffle | Playwright: band 1 kept after lock + Space |
| F2 | Export sheet: CSS, SCSS, JSON, Tailwind v4 (new), Tailwind v3, shadcn/ui, DaisyUI and Bootstrap (both were unreachable before); hex/oklch; Copy; Download file | Tailwind v4 oklch output read back; `tailwind.config.js` download captured |
| F3 | CSS/SCSS/JSON/Tailwind exports include every palette color plus primary and neutral 50-950 scales (before: base + modified only) | Code preview in `r4-desktop-export.png` |
| F4 | Scale chapter: 50-950 base + matching neutral, ratios vs white/black, click to copy | `p5-desktop-scale.png` |
| F5 | Light/dark theme with system default and a saved toggle | `r3-desktop-dark.png` |
| F6 | Recent colors now record applied, picked, preset and band colors (before: only image clicks) | 1 history entry after Enter |
| F7 | Readable toast (was a blank box); inline, announced hex error | `p5-state-invalid-hex.png` |
| F8 | Default view no longer shows "white, FAIL": brightness starts at 0 and the modified panel says "Same as original" | `r2-desktop-adjust.png` |
| F9 | Square scheme exposed; full scheme names | stage tabs |
| F10 | SVG swatch download | `color-studio-palette.svg` download captured |
| F11 | Share link carries the full palette and locks (`p=`, `lock=`) | reload of the shared URL restored both |

Also: contrast checker now defaults to the base color as background with the best-reading palette color as text; image colors can become the palette in one click; vision simulation shows a notice on the stage; Undo/Redo include the palette; `E` opens Export; service worker cache bumped to `color-studio-v3` with the new font URL; normalize.css CDN dropped for an in-file reset.

## Rubric scores

Per template, all criteria scored 4 or 5 after rework. Full table in `progress.md` (Template tracker). The homepage went through two scored rounds (`progress.md`, "Phase 4 rubric"): the first round had layout 3, motion 2, memorability 3, craft 2; each was fixed and rescored at 4 or above.

## Verification

- `pnpm test` 71/71, `pnpm biome:check` clean, `pnpm build` compiles (3 webpack size warnings that existed before). No TypeScript, so no typecheck.
- Lighthouse 12 JSON in `lighthouse/`:

| | Perf | A11y | Best pr. | SEO |
|---|---|---|---|---|
| Live, mobile | 83 | 84 | 100 | 100 |
| New, mobile | 97 | 100 | 100 | 100 |
| Live, desktop | 99 | 89 | 100 | 100 |
| New, desktop | 100 | 100 | 100 | 100 |

  Mobile performance varied 89-97 across three runs. The new build was served locally with gzip via `npx serve`, not from Vercel.

## Not tested or limited

- Chromium only. Not checked in Safari or Firefox, or on a real phone.
- Dark theme was checked visually only; Lighthouse ran on the light theme.
- Drag-and-drop of a file was not simulated; uploads were tested through the file input. The "Please drop an image file" path is old code and was not exercised.
- DaisyUI, Bootstrap and shadcn/ui output content was not changed or reviewed for correctness, only exposed.
- The service-worker "new version available" toast and offline mode were not tested.
- Print styles were not checked.
- The mockups in chapter 04 can look low-contrast with very light palettes. That is a faithful preview of the palette, not a bug, but the mobile mockup's list dots are hard to see with pale colors.

## Content changes to review

- The eight "Start from" presets changed from pure RGB primaries (#ff0000, #00ff00 ...) to eight curated colors (vermilion, saffron, sage, teal, cobalt, plum, bone, ink). Nothing was deleted, but this is a content decision. Reverting is a one-line edit per button in `index.html`.
- The hero line "Build a palette, ship it as code." and the chapter ledes are new copy.

## Needs approval

Copied from `needs-approval.md`. Nothing on this list was done.

| # | Change | Why it needs approval |
|---|---|---|
| A1 | AI palette generation | Paid model API key and a server route |
| A2 | Synced palette library | Accounts and a database |
| A3 | Remove PostHog analytics | Removing a feature (recommend keeping) |
| A4 | Allow the PostHog host in the CSP `connect-src` (`vercel.json`) | Production security header; PostHog calls are likely blocked today when a key is set |
| A5 | Merge `design/upgrade` into `main` and deploy | Production change |
