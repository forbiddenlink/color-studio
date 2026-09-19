# Color Studio

A modern color manipulation tool for designers and developers. Create, modify, and export colors in real-time.

**[Live Demo →](https://color-studio-mu.vercel.app)**

## Features

- **Color Input** — HEX input with validation, native color picker, 8 quick presets
- **Color Manipulation** — Brightness, saturation, and hue controls with real-time preview
- **Color Schemes** — Complementary, analogous, triadic, and random palette generation
- **Keyboard Shortcuts** — Space=random palette, L=lock/unlock, C=copy color
- **Image Extraction** — Drag-drop images to extract dominant colors (median-cut algorithm)
- **UI Preview** — See colors applied to card and nav components in real-time
- **Colorblind Simulation** — Protanopia, deuteranopia, tritanopia visualization
- **URL Sharing** — Share palettes via URL state persistence
- **Export** — CSS, SCSS, JSON, Tailwind config, or shareable link
- **1500+ Color Names** — Semantic names using Name That Color algorithm
- **History** — Automatic color history with localStorage persistence
- **Accessibility** — WCAG AA/AAA badges, dark mode, reduced motion support

## Getting started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
git clone https://github.com/forbiddenlink/color-studio.git
cd color-studio
pnpm install
```

### Development

```bash
pnpm start
```

Open `http://localhost:3000` in your browser.

### Production build

```bash
pnpm build
```

Output is generated in the `dist/` directory.

### Other scripts

```bash
pnpm watch       # webpack in watch mode
pnpm test        # vitest run
pnpm test:watch
pnpm check       # biome check + test + build
pnpm biome:check / pnpm biome:fix / pnpm biome:format
pnpm audit / pnpm security   # pnpm audit --audit-level high
```

### Env vars (optional)

`NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` in `.env.local` enable PostHog
analytics. See `CLAUDE.md` for how these get wired through webpack.

## Usage

1. **Input a color** — Enter a HEX code, use the color picker, or click a preset
2. **Adjust** — Use sliders to modify brightness, saturation, and hue
3. **Generate schemes** — Click Complementary, Analogous, or Triadic
4. **Export** — Copy in your preferred format (CSS/SCSS/JSON)

## Technical Details

| Aspect | Implementation |
|--------|---------------|
| Framework | Vanilla HTML/CSS/JS (ES6+) |
| Build Tool | Webpack 5 |
| Styling | CSS with custom properties (Tokens) |
| Typography | Inter & JetBrains Mono (Google Fonts) |
| State | localStorage for history |

### Design System

The UI is built on a premium, dark-mode design system tailored for professional creators:

- **Theme** — Cinematic dark mode (`#101014` base) with high-signal Indigo accents
- **Layout** — Responsive 100vw/100vh app shell (Sidebar, Main Canvas, Tools Panel)
- **Typography** — Inter for fluid UI copy, JetBrains Mono for technical hex/rgb outputs
- **Surfaces** — Elevated tool panels with inset shadows and edge-to-edge fluid color bleeds
- **Spacing** — Dense 4pt rhythm system for a compact, utility-first feel

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT
