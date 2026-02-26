# Color Studio

A modern color manipulation tool for designers and developers. Create, modify, and export colors in real-time.

## Features

- **Color Input** — HEX input with validation, native color picker, 8 quick presets
- **Color Manipulation** — Brightness, saturation, and hue controls with real-time preview
- **Color Schemes** — Generate complementary, analogous, and triadic palettes
- **Export** — Copy as CSS, SCSS, or JSON with one click
- **History** — Automatic color history with localStorage persistence
- **Accessibility** — WCAG contrast ratio display, dark mode support, reduced motion support

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
