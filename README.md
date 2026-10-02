# Color Studio

Build a color palette, check it for contrast and color vision, and export it as code for
CSS, Tailwind, shadcn/ui and more. Runs entirely in the browser.

**[Open Color Studio](https://color-studio-mu.vercel.app)**

## Features

- **Palette stage**: six harmony schemes (complementary, analogous, triadic, split,
  square, compound) plus Shuffle. Each color shows its name, hex and OKLCH value.
- **Edit the palette**: drag bands to reorder them, add a color with the + band, and open any
  band to tune it in OKLCH, move it, or remove it. The editor flags colors outside sRGB and
  Display P3.
- **Locks**: lock any palette color to keep it through Shuffle, or lock the base color.
- **Adjust**: brightness, saturation and hue, with the original and modified color side by side.
- **Scales**: an 11-step 50-950 ramp of the base color and a matching neutral, with contrast
  ratios against white and black. Click a step to copy it.
- **Contrast checker**: WCAG 2 AA and AAA results, and a button that suggests a passing text color.
- **Contrast grid**: every text and background pairing in the palette (plus white and black),
  scored with WCAG 2 or APCA. Select a cell to load the pair into the checker.
- **Color vision simulation**: protanopia, deuteranopia and tritanopia, applied to the palette, the adjust swatches and the previews.
- **In use**: the palette on a dashboard card, a hero, a mobile screen and a small UI kit, with
  contrast, harmony and WCAG scores.
- **Gradients**: linear, radial and conic CSS from the palette, plus an animated shader preview.
- **From an image**: drop a photo to extract its dominant colors and use them as the palette.
  The image never leaves your browser.
- **Export**: CSS, SCSS, JSON, Tailwind v4, Tailwind v3, shadcn/ui, DaisyUI and Bootstrap, in hex
  or OKLCH. Copy the code or download the file. Also PNG and SVG swatches.
- **Semantic theme**: the palette mapped to UI roles (background, foreground, card, muted, border,
  primary, accent, ring) for light and dark, with every text pair at 4.5:1 or better. Export it as
  CSS custom properties or as W3C Design Tokens JSON for Style Dictionary and Tokens Studio.
- **Library and import**: save palettes in your browser, and import from hex codes, CSS colors or
  a Coolors link. Pasting several colors into the hex field imports them too.
- **Eyedropper**: pick a color from anywhere on screen (Chrome and Edge on desktop).
- **Share**: the URL holds the base color, adjustments, full palette and locks.
- **Undo and redo**, recent colors, light and dark themes, and reduced-motion support.

### Keyboard shortcuts

| Key | Action |
|---|---|
| Space | Shuffle the palette |
| L | Lock or unlock the base color |
| C | Copy the modified color |
| E | Open Export |
| Ctrl Z / Ctrl Shift Z | Undo / redo |

## Getting started

Prerequisites: Node.js 18+ and pnpm.

```bash
git clone https://github.com/forbiddenlink/color-studio.git
cd color-studio
pnpm install
pnpm start   # http://localhost:3000
```

### Scripts

```bash
pnpm build        # production bundle in dist/
pnpm watch        # webpack in watch mode
pnpm test         # vitest
pnpm test:watch
pnpm check        # biome check + test + build
pnpm biome:check / pnpm biome:fix / pnpm biome:format
pnpm audit / pnpm security   # pnpm audit --audit-level high
```

`pnpm build` alone does not copy the static files (favicon, manifest, service worker). The
Vercel build command in `vercel.json` does that.

### Env vars (optional)

`NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` in `.env.local` turn on PostHog
analytics. Without them, PostHog never starts. See `CLAUDE.md` for how they are wired through
webpack.

## Design

The interface follows a "specimen book" direction: near-neutral paper and ink chrome so the
palette you build is the only color on the page.

| Aspect | Choice |
|---|---|
| Framework | Vanilla HTML, CSS and JavaScript (ES6+) |
| Build | Webpack 5 + Babel |
| Color math | [culori](https://culorijs.org), OKLCH throughout |
| Tokens | CSS custom properties in `index.css`, light and dark |
| Type | Instrument Serif (names, headings), Geist (interface), Geist Mono (values) |
| Offline | Service worker caches the app shell |

Design research, references and before/after screenshots are in `design-research/`.

## Browser support

Latest Chrome, Edge, Firefox and Safari.

## License

MIT
