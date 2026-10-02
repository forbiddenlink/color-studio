# Competitor feature research for Color Studio

Snapshot: 2026-10-02, desktop 1440x900. Screenshots in `screenshots/competitors/`. Features are limited to what appeared on the page text or screenshot I loaded. A dash in the matrix means "not observed", not "confirmed absent": most tools hide features behind hover or login. All competitor pages loaded (none blocked). Realtime Colors' `/app` route returned a 404; its tool is the toolbar on the home page.

Color Studio (current) column is taken from the live page text and screenshot (`colorstudio-live.png`) plus the product brief.

## Per-competitor observations

**Coolors** (coolors.co; `coolors-home.png`, `coolors-generate.png`, `coolors-export.png`). Spacebar generates 5-color palettes; hex plus a color name per swatch; toolbar with undo/redo, View, Export, Save; Export dialog offers URL, Share, PDF, Image, CSS, ASE, SVG, Code, Tailwind, Embed, X, Pinterest. Home copy claims image extraction, accessibility checks, preview on real designs, projects, and an AI "Color Bot". Page carries ads and sign-up prompts.

**Adobe Color** (color.adobe.com; `adobe-color.png`). Three entry modes: base color, image, color wheel. Harmony picker with several wheel geometries, Generate random, undo/redo, accessibility and color-blind icons, palette name, share, download, copy, "Create with my color palette". Sign-in for libraries. Related tools listed: contrast checker, extract gradient, extract palette.

**Realtime Colors** (realtimecolors.com; `realtimecolors.png`). Role-based toolbar: Text, Background, Primary, Secondary, Accent; light/dark toggle, randomize, undo/redo, export (zip, png, CSS, SCSS listed), Fonts picker, Figma plugin, templates. Applies colors to a whole realistic site.

**UI Colors** (uicolors.app; `uicolors.png`). One brand color to a 50-950 scale (hex per step); add secondary scale; Neutral and Status tabs; random with Spacebar; harmony settings; contrast matrix; color info; Export; Save/My palettes; Fonts tab; dark-mode toggle. Live preview tabs: Cards, Website, Branding, Dashboard, Components, Shadcn/ui, Apps, Charts, Gradients, Logos, Headings. Figma plugins. Paid tier.

**tints.dev** (tints.dev; `tints.png`). 11-step 50-950 scale with name, base value and anchor-stop selector; hue/saturation/lightness min and max; Perceived vs Linear toggle; lightness-distribution slider plus hue-shift and saturation-shift graphs; multiple palettes; output as Tailwind v3 or v4, in oklch, hex, p3 or hsl; copy URL; API.

**Huemint** (huemint.com; `huemint-app.png`). Machine-learning generation in modes: Brand (1, 2, 3 colors, Intersection), Website, Gradient, Gradient + Background, Illustration, Bootstrap, Upload image. Lock swatches so later generations respect them; link share; settings. Output is previewed on brand/web/illustration compositions.

**oklch.com** (oklch.com; `oklch-com.png`). OKLCH/LCH picker with L, C, H, alpha sliders drawn over gamut graphs; shows hex, rgb, hsl, display-p3, lch, lab, oklab, linear RGB, Figma P3; toggles for 3D, graphs, P3, Rec2020 gamut; paste any hex/rgb/hsl to convert. No palette building.

**Leonardo** (leonardocolor.io; `leonardo-theme.png`). Contrast-ratio-targeted scales (each swatch labelled with its ratio against the background, e.g. 1.45:1 to 10.86:1); add color; extract from image; sort; Chromaticity, Lightness and 3D-model analysis tabs; adaptive themes with brightness/contrast/saturation (dark mode in seconds); dataviz color generator; download as SVG; share; JS API.

**Atmos** (atmos.style; `atmos-generator.png`). Generator that returns Neutral, Primary and semantic Success/Caution/Danger/Info colors from one base; Random, Meaning, Color family, Color style filters; color wheel with adjustable angles, all harmony modes side by side; shade generator; fullscreen. Ads present on the page. Account required for the full suite.

**ColorBox** (colorbox.io; `colorbox.png`). Per-color scale builder with step count, HSV or OKLCH mode, hue/saturation/brightness start-end values and easing curves, major/minor steps, lock colors, contrast markers between steps (3:1, 4.5:1 against white), Dark Mode section, Import and Export, zoomable canvas.

Also loaded, outside the matrix: **Khroma** (`khroma-generator.png`: AI trained on 50 chosen colors, view as typography/gradient/palette, search, save, WCAG rating per pair) and **Radix Colors** (`radix-colors.png`: fixed 12-step semantic scales with purpose labels, light/dark, custom palette tool).

## Feature matrix

Y = observed. - = not observed. Columns: Co Coolors, Ad Adobe Color, RT Realtime Colors, UI UI Colors, Ti tints.dev, Hu Huemint, OK oklch.com, Le Leonardo, At Atmos, CB ColorBox, **CS Color Studio (current)**.

| Feature | Co | Ad | RT | UI | Ti | Hu | OK | Le | At | CB | **CS** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Random / spacebar generate | Y | Y | Y | Y | - | Y | - | - | Y | - | **Y** (random) |
| Harmony schemes (comp, analog, triadic...) | - | Y | - | Y | - | - | - | - | Y | - | **Y** |
| OKLCH-based editing | - | - | - | - | Y | - | Y | Y | - | Y | **Y** |
| 50-950 tint/shade scale from one color | - | - | - | Y | Y | - | - | Y | Y | Y | **-** |
| Multiple colors / scales in one workspace | Y | Y | Y | Y | Y | Y | - | Y | Y | Y | **-** |
| Perceptual lightness / hue / saturation curves | - | - | - | - | Y | - | - | Y | - | Y | **-** |
| Contrast-targeted generation | - | - | - | - | - | - | - | Y | - | Y | **-** |
| WCAG contrast checker | Y | Y | - | Y | - | - | - | Y | - | Y | **Y** |
| Suggest a passing color | - | - | - | - | - | - | - | Y (by construction) | - | - | **Y** |
| Live preview on realistic UI | Y | - | Y | Y | - | Y | - | - | - | - | **Y** (3 mockups) |
| Role-based palette (text/bg/primary/accent) | - | - | Y | Y | - | - | - | - | Y | - | **-** |
| Semantic status colors (success/warn/danger) | - | - | - | Y | - | - | - | - | Y | - | **-** |
| Neutral scale generation | - | - | Y | Y | - | - | - | - | Y | - | **-** |
| Dark/light variant generation | - | - | Y | - | - | - | - | Y | - | Y | **-** |
| Image color extraction | Y | Y | - | - | - | Y | - | Y | - | - | **Y** |
| Colorblind simulation | - | Y | - | - | - | - | - | - | - | - | **Y** |
| Gradient generator | - | - | - | Y | - | Y | - | - | - | - | **Y** |
| Font pairing preview | - | - | Y | Y | - | - | - | - | - | - | **-** |
| Code export (CSS vars, Tailwind, etc.) | Y | - | Y | Y | Y | - | Y | - | Y | Y | **Y** (CSS/SCSS/JSON/Tailwind/shadcn) |
| Tailwind v3 and v4 output choice | - | - | - | - | Y | - | - | - | - | - | **-** |
| Output color mode choice (oklch/hex/p3/hsl) | - | - | - | - | Y | - | Y | - | - | - | **-** |
| Design-file export (ASE, SVG, PDF, Figma plugin) | Y | Y | Y | Y | - | - | - | Y (SVG) | - | - | **-** |
| Palette image export (PNG) | Y | - | Y | - | - | - | - | - | - | - | **Y** |
| Shareable URL | Y | Y | - | - | Y | Y | - | Y | - | - | **Y** |
| Undo / redo | Y | Y | Y | - | - | - | - | - | - | - | **Y** |
| Saved palettes / library | Y | Y | - | Y | - | - | - | - | - | - | **-** (recent colors only) |
| AI-assisted generation | Y | - | - | - | - | Y | - | - | - | - | **-** |
| Wide-gamut (P3/Rec2020) display or output | - | - | - | - | Y | - | Y | - | - | - | **-** |
| 3D color-space view | - | - | - | - | - | - | Y | Y | - | - | **-** |
| Public API | - | - | - | - | Y | - | - | Y | - | - | **-** |
| WebGL shader backgrounds | - | - | - | - | - | - | - | - | - | - | **Y** (unique) |
| Harmony scoring gauges | - | - | - | - | - | - | - | - | - | - | **Y** (unique) |
| No ads seen in first viewport | - | Y | Y | Y | Y | Y | Y | Y | - | Y | **Y** |

Notes on the Color Studio column: Tailwind export exists, but I did not open it, so what it emits (single color vs a scale) is unverified. The live page logged 2 console errors on load; I did not investigate them. Default first-load state is a contrast FAIL (1.55:1) with all-indigo buttons, visible in `colorstudio-live.png`.

## Gaps

Features at least two strong peers show that Color Studio lacks, ranked by my estimate of impact on "build a palette and export it into code".

1. **50-950 scale from the chosen color** (UI Colors, tints.dev, ColorBox, Leonardo, Atmos). Front-end devs need a ramp, not one swatch, to fill `--color-primary-50..950`. This is the most common code target for the stated audience.
2. **Multiple colors/scales in one workspace** (all other nine except oklch.com). Brand, secondary and neutral live together; a single-color flow forces repeated runs.
3. **Dark/light variant generation** (Realtime Colors, Leonardo, ColorBox). Shipping tokens usually need both modes; generating them together avoids a manual second pass.
4. **Semantic status and neutral scales** (UI Colors, Atmos). Success/warning/danger/info plus grays are required in every product UI and are tedious to derive by hand.
5. **Perceptual curve control and contrast-targeted steps** (tints.dev, ColorBox, Leonardo). Fits the existing OKLCH and contrast checker strengths and makes the scale defensible for accessibility.
6. **Output format and color-mode choice** (tints.dev: Tailwind v3/v4, oklch/hex/p3/hsl; oklch.com: many spaces). Cheap to add, and it removes a post-copy conversion step.
7. **Role-based palette (text, background, primary, accent) previewed on a realistic page** (Realtime Colors, UI Colors). Color Studio has mockups but roles were not observed; roles map directly onto the exported tokens.
8. **Design-file export: SVG, ASE, Figma plugin** (Coolors, Adobe, Realtime Colors, UI Colors, Leonardo). Helps the designer half of the audience; Color Studio currently ends at PNG. Lower priority than code gaps.

Lower priority, listed so they are not rediscovered: saved palette library (Coolors, Adobe, UI Colors) conflicts with the no-signup positioning unless kept in local storage; font pairing preview (Realtime Colors, UI Colors) is adjacent to the job; AI generation (Coolors, Huemint) and 3D/gamut views (oklch.com, Leonardo, tints.dev P3) add polish more than build-and-export speed.

Unique to Color Studio, worth keeping visible: WebGL palette shaders, harmony scoring gauges, suggest-passing-color, and the colorblind simulation combined with a no-ads, no-signup page.
