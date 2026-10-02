// Pure palette helpers: no DOM access, so they are unit-tested directly.
import { clampChroma, converter, formatHex, inGamut, interpolate, parse } from 'culori'

const toOklch = converter('oklch')
const inSrgb = inGamut('rgb')
const inP3 = inGamut('p3')

export const MAX_PALETTE = 10
export const MIN_PALETTE = 2

// ---------------------------------------------------------------------------
// Basic color helpers
// ---------------------------------------------------------------------------

// Any CSS color string -> '#rrggbb' (out-of-gamut colors are mapped into sRGB), or null
export function toHex(value) {
  const color = typeof value === 'string' ? parse(value.trim()) : value
  if (!color) return null
  const fitted = inSrgb(color) ? color : clampChroma(color, 'oklch')
  return formatHex(fitted)
}

function oklchHex(l, c, h) {
  return toHex({ mode: 'oklch', l, c, h })
}

// WCAG 2 relative luminance from '#rrggbb'
function luminance(hex) {
  const n = Number.parseInt(hex.slice(1), 16)
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}

export function wcagRatio(fgHex, bgHex) {
  const a = luminance(fgHex)
  const b = luminance(bgHex)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export function wcagLevel(ratio) {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}

// APCA-W3 0.0.98G-4g lightness contrast (Lc). Positive = dark text on light
// background, negative = light text on dark background.
export function apcaContrast(textHex, bgHex) {
  const y = (hex) => {
    const n = Number.parseInt(hex.slice(1), 16)
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => (v / 255) ** 2.4)
    return 0.2126729 * r + 0.7151522 * g + 0.072175 * b
  }
  // biome-ignore lint/suspicious/noApproximativeNumericConstant: APCA's blkClmp exponent is 1.414 exactly, not sqrt(2)
  const clampBlack = (v) => (v > 0.022 ? v : v + (0.022 - v) ** 1.414)
  const txt = clampBlack(y(textHex))
  const bg = clampBlack(y(bgHex))
  if (Math.abs(bg - txt) < 0.0005) return 0
  if (bg > txt) {
    const sapc = (bg ** 0.56 - txt ** 0.57) * 1.14
    return sapc < 0.1 ? 0 : (sapc - 0.027) * 100
  }
  const sapc = (bg ** 0.65 - txt ** 0.62) * 1.14
  return sapc > -0.1 ? 0 : (sapc + 0.027) * 100
}

// Every text/background pairing in the palette, for the contrast grid
export function contrastMatrix(hexes) {
  return hexes.map((fg) =>
    hexes.map((bg) => {
      const ratio = wcagRatio(fg, bg)
      return { fg, bg, ratio, level: wcagLevel(ratio), apca: apcaContrast(fg, bg) }
    })
  )
}

// ---------------------------------------------------------------------------
// Import: pull colors out of pasted text
// ---------------------------------------------------------------------------
const FUNCTION_RE = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\([^)]*\)/gi
// '#abc', '#aabbcc' anywhere; bare 6-digit hex only between separators
// (Coolors URLs, comma lists), so words like "bad" or "decade" never match
// (no lookbehind: it is a syntax error in Safari before 16.4 and would break the bundle)
const HEX_RE = /(#[0-9a-f]{6}|#[0-9a-f]{3})(?![0-9a-z])|(^|[^0-9a-z#])([0-9a-f]{6})(?![0-9a-z])/gi

// A bare code made only of a-f letters ("decade", "facade") is usually a word.
// Accept it when it has a digit, or sits in a dash/slash list like a Coolors URL.
function isLikelyBareHex(code, before, after) {
  return /\d/.test(code) || before === '-' || before === '/' || after === '-'
}

export function parsePaletteInput(text) {
  if (!text || typeof text !== 'string') return { colors: [], ignored: 0 }
  const found = []
  let ignored = 0
  const withoutFunctions = text.replace(FUNCTION_RE, (match, offset) => {
    found.push({ offset, value: match })
    return ' '.repeat(match.length)
  })
  for (const m of withoutFunctions.matchAll(HEX_RE)) {
    if (m[1]) found.push({ offset: m.index, value: m[1] })
    else if (isLikelyBareHex(m[3], m[2], withoutFunctions[m.index + m[0].length])) {
      found.push({ offset: m.index + m[2].length, value: `#${m[3]}` })
    }
  }
  found.sort((a, b) => a.offset - b.offset)
  const colors = []
  for (const { value } of found) {
    const hex = toHex(value)
    if (!hex) {
      ignored++
      continue
    }
    if (!colors.includes(hex)) colors.push(hex)
  }
  if (colors.length > MAX_PALETTE) {
    ignored += colors.length - MAX_PALETTE
    colors.length = MAX_PALETTE
  }
  return { colors, ignored }
}

// ---------------------------------------------------------------------------
// Palette editing
// ---------------------------------------------------------------------------
export function moveItem(list, from, to) {
  const next = list.slice()
  if (from < 0 || from >= next.length || to < 0 || to >= next.length) return next
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

// A new color that sits naturally after `hex`: same lightness and chroma, hue
// rotated, so adding a band extends the scheme instead of repeating a color
export function nextColorAfter(hex, step = 32) {
  const o = toOklch(parse(hex))
  return oklchHex(o.l, o.c || 0.04, ((o.h || 0) + step) % 360)
}

// Midpoint of two colors in OKLCH (shortest hue path)
export function midpointColor(a, b) {
  return toHex(interpolate([a, b], 'oklch')(0.5))
}

// Where a color sits relative to the sRGB and Display P3 gamuts
export function gamutInfo(l, c, h) {
  const color = { mode: 'oklch', l, c, h }
  return { srgb: inSrgb(color), p3: inP3(color), hex: toHex(color) }
}

// ---------------------------------------------------------------------------
// Semantic theme: palette -> light and dark UI roles
// ---------------------------------------------------------------------------
export const THEME_ROLES = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'muted',
  'muted-foreground',
  'border',
  'primary',
  'primary-foreground',
  'accent',
  'accent-foreground',
  'ring',
]

function hueDistance(a, b) {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

// Move `hex` along lightness (keeping hue/chroma) until it reaches `min`
// contrast against `against`. Direction is away from the other color.
export function ensureContrast(hex, against, min) {
  if (wcagRatio(hex, against) >= min) return hex
  const o = toOklch(parse(hex))
  const target = luminance(against) > 0.18 ? -1 : 1
  let l = o.l
  for (let i = 0; i < 100; i++) {
    l = Math.min(1, Math.max(0, l + target * 0.01))
    const candidate = oklchHex(l, o.c || 0, o.h || 0)
    if (wcagRatio(candidate, against) >= min) return candidate
    if (l === 0 || l === 1) return candidate
  }
  return oklchHex(l, o.c || 0, o.h || 0)
}

// A filled role (button, badge) plus readable text on it. Prefers keeping the
// color as picked and choosing the text color; nudges lightness only when
// neither near-white nor near-black text reaches 4.5:1.
function filledRole(hex, lightInk, darkInk, prefer) {
  const onLight = wcagRatio(darkInk, hex)
  const onDark = wcagRatio(lightInk, hex)
  if (Math.max(onLight, onDark) >= 4.5) {
    return { fill: hex, ink: onDark >= onLight ? lightInk : darkInk }
  }
  const ink = prefer === 'light' ? lightInk : darkInk
  return { fill: ensureContrast(hex, ink, 4.5), ink }
}

export function generateSemanticTheme(palette, baseHex) {
  const base = toHex(baseHex) || palette[0]
  const b = toOklch(parse(base))
  const hue = b.h || 0
  const tint = Math.min(b.c || 0, 0.02)

  // Accent: the palette color furthest in hue from the base with real chroma
  let accent = null
  let best = 0
  for (const hex of palette) {
    const o = toOklch(parse(hex))
    if ((o.c || 0) < 0.03) continue
    const d = hueDistance(o.h || 0, hue)
    if (d > best && d >= 30) {
      best = d
      accent = hex
    }
  }
  if (!accent) accent = oklchHex(b.l, Math.max(b.c || 0, 0.08), (hue + 150) % 360)

  const build = (dark) => {
    const n = (l, c = tint) => oklchHex(l, c, hue)
    const background = dark ? n(0.17, tint * 0.8) : n(0.985, tint * 0.3)
    const card = dark ? n(0.21, tint * 0.8) : n(1, 0)
    const muted = dark ? n(0.27) : n(0.95, tint * 0.6)
    const foreground = ensureContrast(dark ? n(0.96, tint * 0.4) : n(0.2), background, 7)
    const lightInk = n(0.985, tint * 0.3)
    const darkInk = n(0.18)
    const primary = filledRole(base, lightInk, darkInk, dark ? 'dark' : 'light')
    const acc = filledRole(accent, lightInk, darkInk, dark ? 'dark' : 'light')
    return {
      background,
      foreground,
      card,
      'card-foreground': foreground,
      muted,
      'muted-foreground': ensureContrast(dark ? n(0.72) : n(0.48), muted, 4.5),
      border: dark ? n(0.32) : n(0.89),
      primary: primary.fill,
      'primary-foreground': primary.ink,
      accent: acc.fill,
      'accent-foreground': acc.ink,
      ring: ensureContrast(base, background, 3),
    }
  }

  return { light: build(false), dark: build(true) }
}

export function themeToCss(theme, format = (hex) => hex) {
  const block = (roles, indent) =>
    THEME_ROLES.map((r) => `${indent}--${r}: ${format(roles[r])};`).join('\n')
  return [
    '/* Semantic theme: light by default, dark by system setting or data-theme="dark" */',
    ':root {',
    block(theme.light, '  '),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    block(theme.dark, '    '),
    '  }',
    '}',
    '',
    '[data-theme="dark"] {',
    block(theme.dark, '  '),
    '}',
  ].join('\n')
}

// W3C Design Tokens Community Group format (works with Style Dictionary and
// Tokens Studio for Figma)
export function themeToDtcg(theme, primitives, format = (hex) => hex) {
  const token = (hex, description) => ({
    $type: 'color',
    $value: format(hex),
    ...(description ? { $description: description } : {}),
  })
  const scale = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, token(v)]))
  const roles = (set) => Object.fromEntries(THEME_ROLES.map((r) => [r, token(set[r])]))
  return JSON.stringify(
    {
      color: {
        palette: Object.fromEntries(
          primitives.palette.map((p, i) => [`palette-${i + 1}`, token(p.hex, p.name)])
        ),
        primary: scale(primitives.primary),
        neutral: scale(primitives.neutral),
      },
      theme: { light: roles(theme.light), dark: roles(theme.dark) },
    },
    null,
    2
  )
}

// ---------------------------------------------------------------------------
// Saved palettes (storage-agnostic, so tests pass a fake store)
// ---------------------------------------------------------------------------
export const LIBRARY_KEY = 'cs-library'
export const LIBRARY_LIMIT = 50

export function readLibrary(store) {
  try {
    const raw = JSON.parse(store.getItem(LIBRARY_KEY) || '[]')
    if (!Array.isArray(raw)) return []
    return raw.filter(
      (p) =>
        p &&
        typeof p.id === 'string' &&
        typeof p.name === 'string' &&
        Array.isArray(p.colors) &&
        p.colors.every((c) => /^#[0-9a-f]{6}$/.test(c))
    )
  } catch {
    return []
  }
}

export function saveToLibrary(store, entry) {
  const list = [entry, ...readLibrary(store).filter((p) => p.id !== entry.id)].slice(
    0,
    LIBRARY_LIMIT
  )
  store.setItem(LIBRARY_KEY, JSON.stringify(list))
  return list
}

export function removeFromLibrary(store, id) {
  const list = readLibrary(store).filter((p) => p.id !== id)
  store.setItem(LIBRARY_KEY, JSON.stringify(list))
  return list
}
