import { describe, expect, it } from 'vitest'
import {
  apcaContrast,
  contrastMatrix,
  ensureContrast,
  gamutInfo,
  generateSemanticTheme,
  LIBRARY_KEY,
  MAX_PALETTE,
  midpointColor,
  moveItem,
  nextColorAfter,
  parsePaletteInput,
  readLibrary,
  removeFromLibrary,
  resizePalette,
  saveToLibrary,
  THEME_ROLES,
  themeToCss,
  themeToDtcg,
  toHex,
  wcagLevel,
  wcagRatio,
} from '../lib/palette-tools.js'

describe('wcagRatio / wcagLevel', () => {
  it('matches the WCAG extremes', () => {
    expect(wcagRatio('#000000', '#ffffff')).toBeCloseTo(21, 5)
    expect(wcagRatio('#777777', '#777777')).toBeCloseTo(1, 5)
  })
  it('grades ratios', () => {
    expect(wcagLevel(7.2)).toBe('AAA')
    expect(wcagLevel(4.6)).toBe('AA')
    expect(wcagLevel(3.1)).toBe('AA Large')
    expect(wcagLevel(2)).toBe('Fail')
  })
})

describe('apcaContrast', () => {
  // Reference values from the APCA-W3 0.0.98G-4g test suite
  it('black on white is about Lc 106', () => {
    expect(apcaContrast('#000000', '#ffffff')).toBeCloseTo(106.04, 1)
  })
  it('white on black is about Lc -108', () => {
    expect(apcaContrast('#ffffff', '#000000')).toBeCloseTo(-107.88, 1)
  })
  it('#888 on #fff is about Lc 63', () => {
    expect(apcaContrast('#888888', '#ffffff')).toBeCloseTo(63.06, 1)
  })
  it('identical colors are 0', () => {
    expect(apcaContrast('#123456', '#123456')).toBe(0)
  })
})

describe('contrastMatrix', () => {
  it('pairs every color with every color', () => {
    const m = contrastMatrix(['#000000', '#ffffff', '#888888'])
    expect(m).toHaveLength(3)
    expect(m[0]).toHaveLength(3)
    expect(m[0][1].fg).toBe('#000000')
    expect(m[0][1].bg).toBe('#ffffff')
    expect(m[0][1].level).toBe('AAA')
    expect(m[1][1].ratio).toBeCloseTo(1, 5)
  })
})

describe('parsePaletteInput', () => {
  it('reads a Coolors palette URL', () => {
    const r = parsePaletteInput('https://coolors.co/palette/264653-2a9d8f-e9c46a-f4a261-e76f51')
    expect(r.colors).toEqual(['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'])
  })
  it('reads a short Coolors URL', () => {
    expect(parsePaletteInput('coolors.co/ff0000-00ff00').colors).toEqual(['#ff0000', '#00ff00'])
  })
  it('reads CSS variables in mixed notations, in order', () => {
    const css = `:root {
      --a: #f00;
      --b: rgb(0 128 0);
      --c: oklch(0.6 0.1 250);
      --d: hsl(200 50% 50%);
    }`
    const { colors } = parsePaletteInput(css)
    expect(colors[0]).toBe('#ff0000')
    expect(colors[1]).toBe('#008000')
    expect(colors).toHaveLength(4)
    for (const c of colors) expect(c).toMatch(/^#[0-9a-f]{6}$/)
  })
  it('does not treat words as hex', () => {
    expect(parsePaletteInput('a bad decade, beaded cafe').colors).toEqual([])
  })
  it('dedupes and caps the palette', () => {
    const many = Array.from(
      { length: 14 },
      (_, i) => `#${(i * 17).toString(16).padStart(2, '0')}0000`
    )
    const r = parsePaletteInput(`${many.join(' ')} #000000`)
    expect(r.colors).toHaveLength(MAX_PALETTE)
    expect(r.ignored).toBeGreaterThan(0)
    expect(parsePaletteInput('#abc #aabbcc').colors).toEqual(['#aabbcc'])
  })
  it('maps out-of-gamut colors into sRGB', () => {
    const { colors } = parsePaletteInput('oklch(0.7 0.4 150)')
    expect(colors).toHaveLength(1)
    expect(colors[0]).toMatch(/^#[0-9a-f]{6}$/)
  })
  it('handles empty input', () => {
    expect(parsePaletteInput('')).toEqual({ colors: [], ignored: 0 })
    expect(parsePaletteInput(null)).toEqual({ colors: [], ignored: 0 })
  })
})

describe('palette editing helpers', () => {
  it('moves items without mutating', () => {
    const list = ['a', 'b', 'c']
    expect(moveItem(list, 0, 2)).toEqual(['b', 'c', 'a'])
    expect(moveItem(list, 2, 0)).toEqual(['c', 'a', 'b'])
    expect(moveItem(list, 5, 0)).toEqual(list)
    expect(list).toEqual(['a', 'b', 'c'])
  })
  it('creates a new, different color after a given one', () => {
    const next = nextColorAfter('#3a5a9b')
    expect(next).toMatch(/^#[0-9a-f]{6}$/)
    expect(next).not.toBe('#3a5a9b')
  })
  it('finds a midpoint between two colors', () => {
    expect(midpointColor('#000000', '#ffffff')).toMatch(/^#[0-9a-f]{6}$/)
  })
  it('reports gamut membership', () => {
    expect(gamutInfo(0.6, 0.05, 250)).toMatchObject({ srgb: true, p3: true })
    const vivid = gamutInfo(0.7, 0.32, 145)
    expect(vivid.srgb).toBe(false)
    expect(vivid.hex).toMatch(/^#[0-9a-f]{6}$/)
    expect(gamutInfo(0.7, 0.5, 145).p3).toBe(false)
  })
  it('toHex returns null for garbage', () => {
    expect(toHex('not a color')).toBeNull()
  })
})

describe('resizePalette', () => {
  const five = ['#111111', '#222222', '#333333', '#444444', '#555555']
  it('keeps five as-is', () => {
    expect(resizePalette(five, 5, 2)).toEqual({ colors: five, baseIndex: 2 })
  })
  it('shrinks around the base', () => {
    for (const n of [2, 3, 4]) {
      const r = resizePalette(five, n, 2)
      expect(r.colors).toHaveLength(n)
      expect(r.colors[r.baseIndex]).toBe('#333333')
    }
  })
  it('extends past five up to the maximum', () => {
    const r = resizePalette(five, 8, 2)
    expect(r.colors).toHaveLength(8)
    expect(r.colors.slice(0, 5)).toEqual(five)
    expect(r.baseIndex).toBe(2)
    expect(resizePalette(five, 50, 2).colors).toHaveLength(MAX_PALETTE)
  })
})

describe('ensureContrast', () => {
  it('returns the color unchanged when it already passes', () => {
    expect(ensureContrast('#000000', '#ffffff', 4.5)).toBe('#000000')
  })
  it('darkens on a light background until it passes', () => {
    const out = ensureContrast('#9fc3ff', '#ffffff', 4.5)
    expect(wcagRatio(out, '#ffffff')).toBeGreaterThanOrEqual(4.5)
  })
  it('lightens on a dark background until it passes', () => {
    const out = ensureContrast('#334466', '#111111', 4.5)
    expect(wcagRatio(out, '#111111')).toBeGreaterThanOrEqual(4.5)
  })
})

describe('generateSemanticTheme', () => {
  const palettes = [
    ['#eef5e2', '#ede2b7', '#c6d5ac', '#8eb396', '#4a5535'],
    ['#ffe5ef', '#de9bf6', '#e97eb0', '#c95b52', '#580536'],
    ['#ffff00', '#00ffff'],
    ['#000000', '#ffffff'],
  ]
  for (const palette of palettes) {
    it(`gives readable pairs for ${palette.join(' ')}`, () => {
      const theme = generateSemanticTheme(palette, palette[Math.floor(palette.length / 2)])
      for (const mode of ['light', 'dark']) {
        const t = theme[mode]
        for (const role of THEME_ROLES) expect(t[role]).toMatch(/^#[0-9a-f]{6}$/)
        expect(wcagRatio(t.foreground, t.background)).toBeGreaterThanOrEqual(7)
        expect(wcagRatio(t['card-foreground'], t.card)).toBeGreaterThanOrEqual(4.5)
        expect(wcagRatio(t['muted-foreground'], t.muted)).toBeGreaterThanOrEqual(4.5)
        expect(wcagRatio(t['primary-foreground'], t.primary)).toBeGreaterThanOrEqual(4.5)
        expect(wcagRatio(t['accent-foreground'], t.accent)).toBeGreaterThanOrEqual(4.5)
        expect(wcagRatio(t.ring, t.background)).toBeGreaterThanOrEqual(3)
      }
    })
  }
})

describe('theme output', () => {
  const theme = generateSemanticTheme(['#3a5a9b', '#e4572e'], '#3a5a9b')
  it('writes CSS with light, system-dark and forced-dark blocks', () => {
    const css = themeToCss(theme)
    expect(css).toContain(':root {')
    expect(css).toContain('@media (prefers-color-scheme: dark)')
    expect(css).toContain('[data-theme="dark"]')
    expect(css.match(/--primary:/g)).toHaveLength(3)
  })
  it('writes valid DTCG JSON', () => {
    const json = JSON.parse(
      themeToDtcg(theme, {
        palette: [{ hex: '#3a5a9b', name: 'Cobalt' }],
        primary: { 500: '#3a5a9b' },
        neutral: { 500: '#777777' },
      })
    )
    expect(json.color.palette['palette-1']).toEqual({
      $type: 'color',
      $value: '#3a5a9b',
      $description: 'Cobalt',
    })
    expect(json.theme.dark.background.$type).toBe('color')
    expect(Object.keys(json.theme.light)).toEqual(THEME_ROLES)
  })
})

describe('library storage', () => {
  const memory = () => {
    const data = {}
    return { getItem: (k) => data[k] ?? null, setItem: (k, v) => (data[k] = v), data }
  }
  it('saves newest first, replaces by id, and removes', () => {
    const store = memory()
    saveToLibrary(store, { id: '1', name: 'One', colors: ['#000000'], savedAt: 1 })
    saveToLibrary(store, { id: '2', name: 'Two', colors: ['#ffffff'], savedAt: 2 })
    saveToLibrary(store, { id: '1', name: 'One again', colors: ['#111111'], savedAt: 3 })
    expect(readLibrary(store).map((p) => p.name)).toEqual(['One again', 'Two'])
    expect(removeFromLibrary(store, '2').map((p) => p.id)).toEqual(['1'])
  })
  it('ignores corrupt or tampered data', () => {
    const store = memory()
    store.setItem(LIBRARY_KEY, '{nope')
    expect(readLibrary(store)).toEqual([])
    store.setItem(
      LIBRARY_KEY,
      JSON.stringify([
        { id: 'x', name: 'ok', colors: ['#000000'] },
        { id: 'y', name: 'bad', colors: ['<img src=x onerror=alert(1)>'] },
      ])
    )
    expect(readLibrary(store).map((p) => p.id)).toEqual(['x'])
  })
})
