# Redesign plan

Written against `e2f8e39` (design/upgrade, 2026-10-02). Frozen once Phase 4 starts; live state goes in `progress.md`.

## Design direction: "Specimen"

**Point of view:** Color Studio is a specimen book for the user's colors. The interface is uncolored paper and ink. The only color on the page is the palette being built. Every color is shown big, named, and labelled with its values like a pigment card or a type specimen.

The current UI does the opposite: indigo and green buttons of equal weight compete with the user's colors. A color tool that paints its own chrome makes the user's judgement harder. That is the one thing this direction fixes everywhere.

### Drawn from

| Idea | Reference (see `references.md`) |
|---|---|
| Full-bleed color bands with tone-on-tone labels derived from the band's own color | Commercial Type (#9) |
| Neutral ground so one object carries all the color | Klim (#8), MoMA (#13), Boc.Studio (#7) |
| Monospace small-caps metadata, label/value rows, visible key hints | Artemii Lebedev (#5), Visual Society (#2) |
| Hairline rules instead of boxed cards; label column + content column | Grilli Type (#10), bleibtgleich (#6) |
| One emphasized word set in an italic serif inside a grotesk headline | This (#1) |
| Single black pill for the one primary action (Export) | Inter (#11), Linear (#15) |
| Evocative color names as first-class labels | Farrow & Ball (#14) |
| Numbered chapters instead of marketing sections | Are.na lettered intro (#12) |

### Type system

- **Display:** Instrument Serif (Google Fonts), regular + italic. Used only for chapter titles, the wordmark's "Studio", and color names on the palette bands. A serif for names makes each color read as a named pigment, not a hex code.
- **UI text:** Geist 400/500/600 (Google Fonts). Neutral, slightly technical grotesk; replaces Inter, which reads as default.
- **Values:** Geist Mono 400/500 for every hex, oklch, ratio and keyboard hint.
- **Scale (1.25 ratio, 16px base):** 12 / 13 / 14 / 16 / 20 / 25 / 31 / 39 / 49 / 61px. Chapter titles 39-49px serif. Labels 12px mono uppercase, +0.06em tracking.

### Color

All UI color is near-zero chroma OKLCH. Two themes, system default plus a manual toggle.

| Token | Light ("paper") | Dark ("ink") |
|---|---|---|
| `--paper` | `oklch(0.975 0.004 85)` | `oklch(0.17 0.004 85)` |
| `--paper-raised` | `oklch(0.99 0.002 85)` | `oklch(0.21 0.004 85)` |
| `--ink` | `oklch(0.2 0.01 85)` | `oklch(0.95 0.005 85)` |
| `--ink-soft` | `oklch(0.45 0.008 85)` | `oklch(0.72 0.006 85)` |
| `--rule` | `oklch(0.87 0.005 85)` | `oklch(0.32 0.005 85)` |
| `--signal` (fail only) | `oklch(0.55 0.2 28)` | `oklch(0.7 0.17 28)` |

- No accent color. The primary action is ink on paper (black pill in light, paper pill in dark).
- `--active` is set from JS to the user's current base color and is used in exactly three places: the swatch chip in the header input, the focus ring, and the selected-tab underline. The chrome follows the user's color instead of a brand color.
- Pass/fail is never signalled by color alone: "Pass" is a filled ink tag with a check glyph, "Fail" is an outlined `--signal` tag with a cross glyph.

### Spacing and layout

- 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Page max width 1440px, 24px gutters (16px on phones).
- **Stage first:** the palette is a full-width band directly under the header and fills most of the first viewport on desktop. Tools follow below as numbered chapters, each a two-column row: a narrow label column (number, serif title, one line of help) and a wide content column, separated by hairline rules.
- On phones the bands stack vertically as rows; chapters become single column; nothing scrolls sideways.
- Radius: 2px on swatches and inputs, pill only for buttons. No drop shadows except the export sheet.

### Imagery

No stock imagery or illustrations. The palette is the image. Mockups and the shader are rendered from the palette.

### Motion

- 160ms ease-out for hover and state; 240ms for band resizing when the palette changes size.
- Palette regeneration: bands crossfade color (background-color transition), no sliding.
- Toast slides 8px up and fades.
- Everything respects `prefers-reduced-motion` (transitions off, shader paused by default).

## Features

Ranked by impact on the main action (build a palette, export it into code). None needs a CMS or database; all are client-side.

| # | Feature | Why | Peer evidence | Approval |
|---|---|---|---|---|
| F1 | **Palette as the working object**: every swatch shows name, hex, oklch; per-swatch copy, lock, and "use as base"; Space regenerates and keeps locked swatches | The palette is the product; today scheme swatches are unlabeled 60px squares | Coolors, Huemint | no |
| F2 | **Export sheet**: one dialog with format tabs (CSS vars, SCSS, JSON, Tailwind v3, Tailwind v4 `@theme`, shadcn/ui, DaisyUI, Bootstrap), color mode (hex / oklch), live code preview, Copy, Download file | Exports are copied blind today; DaisyUI + Bootstrap exporters exist but are unreachable | tints.dev, Coolors | no |
| F3 | **Exports include the whole palette** (each swatch as a token), not just base + modified | Current CSS/SCSS/JSON drop the scheme entirely | all code-export peers | no |
| F4 | **50-950 scale chapter** for the base color plus a matching neutral scale, each step with its contrast vs white and black and click-to-copy | Most-requested dev target; `generateColorScale` already exists but is only visible inside Tailwind export | UI Colors, tints.dev, ColorBox, Leonardo, Atmos | no |
| F5 | **Light and dark UI themes** with system default and a toggle | Colors read differently on light vs dark; designers need both | Realtime Colors, UI Colors | no |
| F6 | **Recent colors actually record** applied / picked colors | Today only image-extracted colors reach history | bug fix | no |
| F7 | **Readable feedback**: fix blank toast, inline invalid-hex message announced to screen readers | Defects seen in Phase 1 | bug fix | no |
| F8 | **Sane default**: brightness starts at 0, so the first view is not "white, FAIL" | First impression currently looks broken | bug fix | no |
| F9 | **Square scheme** button, full scheme names | Handler exists without a button; abbreviations hurt scanning | Adobe Color, Atmos | no |
| F10 | **SVG palette download** | Gives designers a vector file for Figma/Illustrator without a plugin | Coolors, Leonardo | no |
| F11 | **Palette in the share URL** (`p=` param, additive) so shared links restore the full palette, not just one color | Share today only restores the base color | Coolors, tints.dev | no (additive param, old links keep working) |

Considered and not planned: saved palette library with accounts (needs a backend, conflicts with no-signup), AI generation (needs a paid API key, listed in needs-approval), font pairing preview (off the main job), Figma plugin (separate product).

## Page-by-page (panel-by-panel) plan

Single route `/`. Template IDs from `profile.md`.

| ID | Panel | Change |
|---|---|---|
| T1 | App shell | Replace 3-column fixed-height grid with: sticky header, full-bleed stage, numbered chapters. Body scrolls normally. Side panels removed as containers; their tools move into chapters. Theme toggle in header. |
| T2 | Color input | Moves into header: active-color chip (native picker), hex field with inline error, Apply. Quick colors move under the field as a small row. Undo/redo stay as icon buttons with labels for screen readers. |
| T3 | Export bar | Replaced by one primary "Export" pill in the header opening the export sheet (F2). Link and Image move into the sheet as "Share link" / "PNG" / "SVG". |
| T4 | Original vs Modified | Chapter 01 "Adjust": two large swatches side by side with specimen-style value rows; sliders (from T11) sit directly under them so cause and effect are adjacent. |
| T5 | Schemes | The stage: full-bleed bands (F1). Scheme picker is a row of text tabs above the bands with full names, plus "Shuffle" with a Space hint. |
| T6 | Contrast checker | Chapter 03 "Contrast": large live sample on the chosen BG, ratio set huge in mono, four pass/fail tags, suggest button. Vision simulation (T13) sits in the same chapter as a segmented control. |
| T7 | Gradient | Chapter 05 "Gradient & shader": wide preview strip, type tabs, angle slider, code line with copy. |
| T8 | Shader | Same chapter, below gradient; preset tabs instead of 7 pills; pauses when off-screen and under reduced motion. |
| T9 | Mockups | Chapter 04 "In use": three mockups on a neutral ground, consistent frame, harmony gauges (T10) beside them as a compact score row. |
| T10 | Harmony gauges | Restyled as ink rings with mono numbers, part of chapter 04. |
| T11 | Adjustment sliders | Into chapter 01. Lighten/darken becomes a two-option segmented control (was an unlabeled L/D switch). Custom slider styling with the track showing the actual color ramp. |
| T12 | Image extract | Chapter 06 "From an image": large drop zone with dashed rule, thumbnail of the uploaded image next to extracted swatches; "Use all as palette" action. Empty, loading and error (non-image file) states. |
| T13 | Vision simulation | Segmented control in chapter 03; also applies to the stage. |
| T14 | UI preview | Folded into chapter 04 mockups (the small card duplicates the dashboard mockup). Element IDs kept so JS keeps working. |
| T15 | Quick + recent colors | Quick colors under the header input; recent colors as a strip at the top of chapter 01 with clear button and an empty state. |
| T16 | Toast + key hints | Toast fixed (ink pill). Key hints move to the footer and the stage toolbar. New footer: short about line, GitHub link, shortcuts, version. |
| new | Scale chapter (F4) | Chapter 02 "Scale". |
| new | Export sheet (F2) | `<dialog>` with focus trap via native modal behavior, Esc to close. |

## Verification per phase

- After each change: `pnpm test`, `pnpm biome:check`, `pnpm build`.
- Browser: desktop 1440x900 and mobile 390x844 screenshots via Playwright into `screenshots/after/`, plus a check that `scrollWidth == innerWidth` on mobile.
- Rubric (1-5): point of view, typography, layout and rhythm, color and imagery, motion, audience fit, memorability, craft. Anything under 4 is reworked.
