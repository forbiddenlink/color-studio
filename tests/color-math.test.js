import { describe, expect, it } from 'vitest'
import {
  alterChromaOklch,
  alterHueOklch,
  alterLightnessOklch,
  applyColorblindTransform,
  calculateContrastRatio,
  calculateLuminance,
  convertHexToRGB,
  convertRGBToHex,
  formatOklchString,
  generateDerivedColor,
  generateHarmoniousPalette,
  getAnalogousColorsOklch,
  getColorName,
  getComplementaryColorOklch,
  getCompoundColorsOklch,
  getContrastColor,
  getReadableTextColor,
  getSplitComplementaryColorsOklch,
  getSquareColorsOklch,
  getTriadicColorsOklch,
  getWCAGBadge,
  hexToOklch,
  hexToRGB,
  hslToHex,
  hslToRGB,
  isValidHex,
  oklchToHex,
  rgbToHex,
  rgbToHSL,
} from '../index.js'

// ---------------------------------------------------------------------------
// Hex <-> RGB conversions
// ---------------------------------------------------------------------------
describe('hexToRGB', () => {
  it('converts 6-digit hex to RGB', () => {
    expect(hexToRGB('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('converts 3-digit shorthand hex', () => {
    expect(hexToRGB('#f00')).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('handles hex without # prefix', () => {
    expect(hexToRGB('00ff00')).toEqual({ r: 0, g: 255, b: 0 })
  })

  it('converts black', () => {
    expect(hexToRGB('#000000')).toEqual({ r: 0, g: 0, b: 0 })
  })

  it('converts white', () => {
    expect(hexToRGB('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })
})

describe('convertRGBToHex', () => {
  it('converts RGB to 6-digit hex with # prefix', () => {
    expect(convertRGBToHex(255, 0, 0)).toBe('#ff0000')
  })

  it('pads single-digit hex values', () => {
    expect(convertRGBToHex(0, 0, 0)).toBe('#000000')
  })

  it('converts white', () => {
    expect(convertRGBToHex(255, 255, 255)).toBe('#ffffff')
  })
})

describe('rgbToHex', () => {
  it('converts rgb() string to hex', () => {
    expect(rgbToHex('rgb(255, 0, 0)')).toBe('#ff0000')
  })

  it('passes through a hex string unchanged', () => {
    expect(rgbToHex('#abcdef')).toBe('#abcdef')
  })
})

describe('convertHexToRGB', () => {
  it('returns an object with r, g, b keys', () => {
    expect(convertHexToRGB('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
  })
})

// ---------------------------------------------------------------------------
// RGB <-> HSL conversions
// ---------------------------------------------------------------------------
describe('rgbToHSL', () => {
  it('converts pure red', () => {
    expect(rgbToHSL(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 })
  })

  it('converts pure green', () => {
    expect(rgbToHSL(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 })
  })

  it('converts pure blue', () => {
    expect(rgbToHSL(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 })
  })

  it('converts achromatic gray', () => {
    const hsl = rgbToHSL(128, 128, 128)
    expect(hsl.s).toBe(0)
  })

  it('converts white to l=100', () => {
    expect(rgbToHSL(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 })
  })
})

describe('hslToRGB', () => {
  it('converts pure red HSL back to RGB', () => {
    expect(hslToRGB(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('converts achromatic (gray)', () => {
    const rgb = hslToRGB(0, 0, 50)
    expect(rgb.r).toBe(rgb.g)
    expect(rgb.g).toBe(rgb.b)
  })

  it('clamps saturation above 100', () => {
    const rgb = hslToRGB(0, 150, 50)
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 })
  })

  it('handles negative hue by wrapping', () => {
    const rgb = hslToRGB(-120, 100, 50)
    expect(rgb).toEqual(hslToRGB(240, 100, 50))
  })
})

describe('hslToHex', () => {
  it('converts HSL to hex via intermediate RGB', () => {
    expect(hslToHex(0, 100, 50)).toBe('#ff0000')
  })
})

// ---------------------------------------------------------------------------
// Roundtrip consistency
// ---------------------------------------------------------------------------
describe('roundtrip conversions', () => {
  it('hex -> RGB -> hex preserves value', () => {
    const hex = '#3a7bd5'
    const rgb = hexToRGB(hex)
    expect(convertRGBToHex(rgb.r, rgb.g, rgb.b)).toBe(hex)
  })

  it('RGB -> HSL -> RGB preserves value (within rounding tolerance)', () => {
    const r = 100,
      g = 150,
      b = 200
    const hsl = rgbToHSL(r, g, b)
    const back = hslToRGB(hsl.h, hsl.s, hsl.l)
    // HSL integers lose precision, allow +/-2
    expect(Math.abs(back.r - r)).toBeLessThanOrEqual(2)
    expect(Math.abs(back.g - g)).toBeLessThanOrEqual(2)
    expect(Math.abs(back.b - b)).toBeLessThanOrEqual(2)
  })
})

// ---------------------------------------------------------------------------
// OKLCH conversions
// ---------------------------------------------------------------------------
describe('hexToOklch / oklchToHex', () => {
  it('converts hex to OKLCH and back (approximately)', () => {
    const hex = '#3a7bd5'
    const oklch = hexToOklch(hex)
    expect(oklch.l).toBeGreaterThan(0)
    expect(oklch.l).toBeLessThan(1)
    const backHex = oklchToHex(oklch.l, oklch.c, oklch.h)
    // Allow slight rounding differences
    const rgb1 = hexToRGB(hex)
    const rgb2 = hexToRGB(backHex)
    expect(Math.abs(rgb1.r - rgb2.r)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb1.g - rgb2.g)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb1.b - rgb2.b)).toBeLessThanOrEqual(2)
  })

  it('returns black for invalid hex', () => {
    const oklch = hexToOklch('not-a-color')
    expect(oklch).toEqual({ l: 0, c: 0, h: 0 })
  })
})

describe('formatOklchString', () => {
  it('formats OKLCH as CSS oklch() string', () => {
    const str = formatOklchString({ l: 0.85, c: 0.05, h: 120 })
    expect(str).toBe('oklch(85.0% 0.050 120.0)')
  })
})

// ---------------------------------------------------------------------------
// OKLCH manipulation
// ---------------------------------------------------------------------------
describe('alterLightnessOklch', () => {
  const base = { l: 0.5, c: 0.1, h: 180 }

  it('lightens by percentage', () => {
    const result = alterLightnessOklch(base, 20, 'lighten')
    expect(result.l).toBeCloseTo(0.7)
  })

  it('darkens by percentage', () => {
    const result = alterLightnessOklch(base, 20, 'darken')
    expect(result.l).toBeCloseTo(0.3)
  })

  it('clamps lightness to 1', () => {
    const result = alterLightnessOklch(base, 80, 'lighten')
    expect(result.l).toBeLessThanOrEqual(1)
  })

  it('clamps lightness to 0', () => {
    const result = alterLightnessOklch(base, 80, 'darken')
    expect(result.l).toBeGreaterThanOrEqual(0)
  })
})

describe('alterChromaOklch', () => {
  it('increases chroma', () => {
    const base = { l: 0.5, c: 0.1, h: 180 }
    const result = alterChromaOklch(base, 50)
    expect(result.c).toBeGreaterThan(0.1)
  })

  it('clamps chroma to 0', () => {
    const base = { l: 0.5, c: 0.01, h: 180 }
    const result = alterChromaOklch(base, -500)
    expect(result.c).toBe(0)
  })
})

describe('alterHueOklch', () => {
  it('shifts hue by degrees', () => {
    const base = { l: 0.5, c: 0.1, h: 100 }
    const result = alterHueOklch(base, 60)
    expect(result.h).toBeCloseTo(160)
  })

  it('wraps hue past 360', () => {
    const base = { l: 0.5, c: 0.1, h: 350 }
    const result = alterHueOklch(base, 30)
    expect(result.h).toBeCloseTo(20)
  })

  it('wraps negative hue', () => {
    const base = { l: 0.5, c: 0.1, h: 10 }
    const result = alterHueOklch(base, -30)
    expect(result.h).toBeCloseTo(340)
  })
})

// ---------------------------------------------------------------------------
// Color scheme generation (OKLCH)
// ---------------------------------------------------------------------------
describe('color scheme generators (OKLCH)', () => {
  const base = { l: 0.6, c: 0.15, h: 90 }

  it('getComplementaryColorOklch returns a hex string', () => {
    const result = getComplementaryColorOklch(base)
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('getAnalogousColorsOklch returns 2 colors', () => {
    const result = getAnalogousColorsOklch(base)
    expect(result).toHaveLength(2)
    for (const c of result) {
      expect(c).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('getTriadicColorsOklch returns 2 colors', () => {
    const result = getTriadicColorsOklch(base)
    expect(result).toHaveLength(2)
  })

  it('getSplitComplementaryColorsOklch returns 2 colors', () => {
    const result = getSplitComplementaryColorsOklch(base)
    expect(result).toHaveLength(2)
  })

  it('getSquareColorsOklch returns 3 colors', () => {
    const result = getSquareColorsOklch(base)
    expect(result).toHaveLength(3)
  })

  it('getCompoundColorsOklch returns 3 colors', () => {
    const result = getCompoundColorsOklch(base)
    expect(result).toHaveLength(3)
  })
})

// ---------------------------------------------------------------------------
// Luminance & contrast
// ---------------------------------------------------------------------------
describe('calculateLuminance', () => {
  it('returns 0 for black', () => {
    expect(calculateLuminance(0, 0, 0)).toBe(0)
  })

  it('returns 1 for white', () => {
    expect(calculateLuminance(255, 255, 255)).toBeCloseTo(1, 4)
  })

  it('green has higher luminance than blue', () => {
    const greenL = calculateLuminance(0, 255, 0)
    const blueL = calculateLuminance(0, 0, 255)
    expect(greenL).toBeGreaterThan(blueL)
  })
})

describe('calculateContrastRatio', () => {
  it('returns 21 for black vs white', () => {
    const ratio = calculateContrastRatio({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 })
    expect(ratio).toBeCloseTo(21, 0)
  })

  it('returns 1 for same color', () => {
    const ratio = calculateContrastRatio({ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 })
    expect(ratio).toBeCloseTo(1, 4)
  })

  it('is symmetric (order-independent)', () => {
    const a = { r: 255, g: 0, b: 0 }
    const b = { r: 0, g: 0, b: 255 }
    expect(calculateContrastRatio(a, b)).toBe(calculateContrastRatio(b, a))
  })
})

// ---------------------------------------------------------------------------
// WCAG badge
// ---------------------------------------------------------------------------
describe('getWCAGBadge', () => {
  it('returns AAA for ratio >= 7', () => {
    expect(getWCAGBadge(7.0).level).toBe('AAA')
  })

  it('returns AA for ratio >= 4.5', () => {
    expect(getWCAGBadge(4.5).level).toBe('AA')
  })

  it('returns AA Large for ratio >= 3', () => {
    expect(getWCAGBadge(3.0).level).toBe('AA Large')
  })

  it('returns Fail for ratio < 3', () => {
    expect(getWCAGBadge(2.5).level).toBe('Fail')
  })
})

// ---------------------------------------------------------------------------
// Contrast / readable text color
// ---------------------------------------------------------------------------
describe('getContrastColor', () => {
  it('returns black for light backgrounds', () => {
    expect(getContrastColor('#ffffff')).toBe('#000000')
  })

  it('returns white for dark backgrounds', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff')
  })
})

describe('getReadableTextColor', () => {
  it('returns dark text for light backgrounds', () => {
    expect(getReadableTextColor('#ffffff')).toBe('#1a1a1a')
  })

  it('returns white text for dark backgrounds', () => {
    expect(getReadableTextColor('#000000')).toBe('#ffffff')
  })
})

// ---------------------------------------------------------------------------
// Hex validation
// ---------------------------------------------------------------------------
describe('isValidHex', () => {
  it('accepts 6-digit hex with #', () => {
    expect(isValidHex('#ff0000')).toBe(true)
  })

  it('accepts 3-digit hex with #', () => {
    expect(isValidHex('#f00')).toBe(true)
  })

  it('accepts hex without #', () => {
    expect(isValidHex('ff0000')).toBe(true)
  })

  it('rejects invalid characters', () => {
    expect(isValidHex('#gggggg')).toBe(false)
  })

  it('rejects wrong length', () => {
    expect(isValidHex('#ffff')).toBe(false)
  })

  it('rejects null/empty', () => {
    expect(isValidHex('')).toBe(false)
    expect(isValidHex(null)).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// Color name lookup
// ---------------------------------------------------------------------------
describe('getColorName', () => {
  it('returns exact name for known hex', () => {
    expect(getColorName('#000000')).toBe('Black')
  })

  it('returns exact name for pure blue', () => {
    expect(getColorName('#0000ff')).toBe('Blue')
  })

  it('returns closest name for unknown hex', () => {
    const name = getColorName('#ff0001')
    expect(typeof name).toBe('string')
    expect(name.length).toBeGreaterThan(0)
  })

  it('handles 3-digit hex', () => {
    const name = getColorName('#000')
    expect(name).toBe('Black')
  })
})

// ---------------------------------------------------------------------------
// Derived color generation
// ---------------------------------------------------------------------------
describe('generateDerivedColor', () => {
  it('returns a valid hex string', () => {
    const result = generateDerivedColor('#3a7bd5', 30, 10, -10)
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('no shifts returns roughly the same color', () => {
    const hex = '#3a7bd5'
    const result = generateDerivedColor(hex, 0, 0, 0)
    // Allow minor rounding from HSL roundtrip
    const rgb1 = hexToRGB(hex)
    const rgb2 = hexToRGB(result)
    expect(Math.abs(rgb1.r - rgb2.r)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb1.g - rgb2.g)).toBeLessThanOrEqual(2)
    expect(Math.abs(rgb1.b - rgb2.b)).toBeLessThanOrEqual(2)
  })
})

// ---------------------------------------------------------------------------
// Harmonious palette
// ---------------------------------------------------------------------------
describe('generateHarmoniousPalette', () => {
  it('returns exactly 5 colors', () => {
    const palette = generateHarmoniousPalette(200, 70, 50)
    expect(palette).toHaveLength(5)
  })

  it('all palette entries are valid hex', () => {
    const palette = generateHarmoniousPalette(200, 70, 50)
    for (const c of palette) {
      expect(c).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

// ---------------------------------------------------------------------------
// Colorblind simulation
// ---------------------------------------------------------------------------
describe('applyColorblindTransform', () => {
  it('returns unchanged RGB when matrix is null', () => {
    const rgb = { r: 128, g: 64, b: 32 }
    expect(applyColorblindTransform(rgb, null)).toEqual(rgb)
  })

  it('applies protanopia matrix and returns valid RGB', () => {
    const matrix = [
      [0.567, 0.433, 0],
      [0.558, 0.442, 0],
      [0, 0.242, 0.758],
    ]
    const result = applyColorblindTransform({ r: 255, g: 0, b: 0 }, matrix)
    expect(result.r).toBeGreaterThanOrEqual(0)
    expect(result.r).toBeLessThanOrEqual(255)
    expect(result.g).toBeGreaterThanOrEqual(0)
    expect(result.b).toBeGreaterThanOrEqual(0)
    // Red channel should be reduced for protanopia
    expect(result.r).toBeLessThan(255)
  })
})
