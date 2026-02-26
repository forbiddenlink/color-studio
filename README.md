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

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/color-studio.git
cd color-studio
npm install
```

### Development

```bash
npm start
```

Open `http://localhost:8080` in your browser.

### Production Build

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Usage

1. **Input a color** — Enter a HEX code, use the color picker, or click a preset
2. **Adjust** — Use sliders to modify brightness, saturation, and hue
3. **Generate schemes** — Click Complementary, Analogous, or Triadic
4. **Export** — Copy in your preferred format (CSS/SCSS/JSON)

## Technical Details

| Aspect | Implementation |
|--------|---------------|
| Framework | Vanilla JavaScript (ES6+) |
| Build Tool | Webpack 5 |
| Styling | CSS with custom properties |
| Typography | Montserrat (Google Fonts) |
| State | localStorage for history |

### Design System

The UI is built on a consistent design system:

- **Typography Scale** — 1.25 ratio (H1 → Small)
- **Spacing** — 8pt grid (4/8/16/24/32px)
- **Colors** — Semantic tokens (primary, success, error, warning)
- **Surfaces** — 3-tier radius system (4/8/12px)

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT
