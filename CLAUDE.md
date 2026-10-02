# color-studio

Vanilla HTML/CSS/JS palette tool for designers and developers: harmony schemes,
50-950 scales, contrast checking, color vision simulation, image color extraction,
and export to CSS/SCSS/JSON/Tailwind v3+v4/shadcn/DaisyUI/Bootstrap. No framework,
no backend.
Live at https://color-studio-mu.vercel.app.

## Stack

- Vanilla JavaScript (ES6+), single entry `index.js`, no framework
- Webpack 5 + Babel for the production/dev build (NOT Vite, despite `vite`/`vitest`
  being devDependencies)
- Vitest (jsdom environment) for unit tests
- Biome 2.5.14 for lint/format (`design-research/` is excluded in `biome.json`)
- `culori` for color math, `posthog-js` for analytics
- pnpm (see `packageManager: pnpm@10.34.5`)

## Commands

- `pnpm start` - webpack-dev-server on port 3000 (per `webpack.config.js`)
- `pnpm watch` - webpack in watch mode
- `pnpm build` - production build to `dist/`
- `pnpm test` / `pnpm test:watch` - vitest
- `pnpm check` - biome check + test + build
- `pnpm biome:check` / `pnpm biome:fix` / `pnpm biome:format`
- `pnpm audit` / `pnpm security` - `pnpm audit --audit-level high`

## Layout

- `index.js` - app logic and DOM wiring (color math, export, history, palette
  editing, library, contrast grid), ~199K
- `lib/palette-tools.js` - pure helpers with no DOM access (import parser, APCA,
  contrast matrix, semantic theme, DTCG output, gamut checks, library storage),
  tested in `tests/palette-tools.test.js`. Put new pure logic here, not in index.js
- `index.html` - app shell: masthead, palette stage, numbered chapters
  (01 Adjust, 02 Scale, 03 Contrast, 04 In use, 05 Gradient, 06 From an image),
  export `<dialog>`
- `index.css` - design tokens (light, `[data-theme=dark]`, prefers-color-scheme)
  then numbered sections per panel
- `design-research/` - redesign research, plan, report, Lighthouse JSON and
  before/after screenshots (Oct 2026). Reference only; not shipped
- `tests/color-math.test.js`, `tests/setup.js`
- No `public/` directory; static files (favicon, manifest, sitemap, robots.txt,
  service-worker.js) live at repo root and are copied into `dist/` by the
  Vercel build command

## Env vars

- `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` - read from `.env.local`
  by `webpack.config.js` via `dotenv`, then injected as `process.env.POSTHOG_KEY`
  / `process.env.POSTHOG_HOST` via webpack `DefinePlugin`. `index.js` reads
  `process.env.POSTHOG_KEY` / `process.env.POSTHOG_HOST` (the webpack-injected
  names), not the `NEXT_PUBLIC_*` names directly.

## State model

Much app state lives in the DOM, not in JS objects:
- Palette = `.band.history-color` elements in `#schemeColors`; the source of truth
  for each color is `dataset.originalHex` (read by exports, color vision
  simulation and mockups).
- Brightness direction = class `toggled` on `#toggleBtn`.
- URL state: `color`, `brightness`, `saturation`, `hue`, `mode`, plus `p`
  (palette hexes joined by `-`) and `lock` (locked indexes joined by `.`).
- Set palette-derived text with `textContent`, never by interpolating into
  `innerHTML` (CodeQL flags it, and the `p` URL param is user input).
- `displayColorScheme(colors, locks, { animate: false })` for in-place edits
  (reorder, recolor, undo); omit the option for a new palette so bands roll in.
- Saved palettes: localStorage key `cs-library`, validated on read by
  `readLibrary` (bad entries are dropped).

## Gotchas

- `vercel.json`'s `buildCommand` invokes the build via npm, not pnpm, even
  though the repo is pnpm-locked.
- `vercel.json`'s CSP sets `connect-src 'self'` with no PostHog host allowed.
  Production currently ships no PostHog key, so nothing is blocked today; add the
  exact PostHog host to `connect-src` if a key is ever set.
- The same `connect-src 'self'` applies to `fetch()` inside the service worker.
  `service-worker.js` must ignore cross-origin requests (Google Fonts); proxying
  them returned a 503 and gave returning visitors system fonts.
- `index.js` and `index.css` have no content hash. The service worker is
  network-first for all same-origin requests (cache = offline fallback only);
  cache-first paired new HTML with old JS after a deploy. `index.html` loads them
  with `?v=<n>` matching `CACHE_NAME`; bump both together when the worker changes.
- No regex lookbehind (`(?<=`, `(?<!`): Babel does not transpile it and it is a
  syntax error in Safari before 16.4, which would break the whole bundle.
- Local screenshots and Lighthouse: use the production bundle in `dist/`, not
  `pnpm start`. The dev server live-reloads when files in the repo change.
- The `dist/` output is produced by copying static files after `webpack
  --mode production`, per the `buildCommand` in `vercel.json`, not by
  webpack alone.
