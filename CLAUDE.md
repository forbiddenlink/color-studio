# color-studio

Vanilla HTML/CSS/JS color manipulation tool for designers and developers: color
schemes, image color extraction, colorblind simulation, WCAG contrast badges,
export to CSS/SCSS/JSON/Tailwind. No framework, no backend.
Live at https://color-studio-mu.vercel.app.

## Stack

- Vanilla JavaScript (ES6+), single entry `index.js`, no framework
- Webpack 5 + Babel for the production/dev build (NOT Vite, despite `vite`/`vitest`
  being devDependencies)
- Vitest (jsdom environment) for unit tests
- Biome 2.5.13 for lint/format
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

- `index.js` - entire app logic (color math, DOM wiring, export, history), ~157K
- `index.html`, `index.css` - app shell and design tokens
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

## Gotchas

- `vercel.json`'s `buildCommand` invokes the build via npm, not pnpm, even
  though the repo is pnpm-locked.
- `vercel.json`'s CSP sets `connect-src 'self'` with no PostHog host allowed;
  if PostHog is configured, its network calls may be blocked by this CSP.
- The `dist/` output is produced by copying static files after `webpack
  --mode production`, per the `buildCommand` in `vercel.json`, not by
  webpack alone.
