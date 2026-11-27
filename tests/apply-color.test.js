import { beforeEach, describe, expect, it } from 'vitest'
import {
  applyColor,
  displayColorScheme,
  generateDefaultPalette,
  getPaletteHexes,
} from '../index.js'
import { keepLockedBands } from '../lib/palette-tools.js'

describe('keepLockedBands', () => {
  it('keeps locked bands from the previous palette and replaces the rest', () => {
    const next = ['#111111', '#222222', '#333333']
    const previous = ['#aaaaaa', '#bbbbbb', '#cccccc']
    expect(keepLockedBands(next, previous, [true, false, true])).toEqual([
      '#aaaaaa',
      '#222222',
      '#cccccc',
    ])
  })

  it('falls back to the new color when a locked band has no previous color', () => {
    expect(keepLockedBands(['#111111', '#222222'], ['#aaaaaa'], [true, true])).toEqual([
      '#aaaaaa',
      '#222222',
    ])
  })
})

describe('Apply regenerates the palette from the new base', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
    document.getElementById('hexInput').value = '#3a5a9b'
    displayColorScheme(generateDefaultPalette('#3a5a9b'))
  })

  it('rebuilds all five bands around the typed hex and updates p= in the URL', () => {
    document.getElementById('hexInput').value = '#00aa55'
    applyColor()
    const bands = getPaletteHexes()
    expect(bands).toEqual(generateDefaultPalette('#00aa55'))
    expect(bands).toContain('#00aa55')
    const p = new URLSearchParams(window.location.search).get('p')
    expect(p).toBe(bands.map((h) => h.replace('#', '')).join('-'))
    expect(new URLSearchParams(window.location.search).get('color')).toBe('00aa55')
  })

  it('keeps locked bands when applying a new base', () => {
    const before = getPaletteHexes()
    displayColorScheme(before, [true, false, false, false, false])
    document.getElementById('hexInput').value = '#00aa55'
    applyColor()
    const after = getPaletteHexes()
    expect(after[0]).toBe(before[0])
    expect(after.slice(1)).toEqual(generateDefaultPalette('#00aa55').slice(1))
  })
})
