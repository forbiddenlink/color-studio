import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { afterEach, expect, it, vi } from 'vitest'
import { readLibrary, removeFromLibrary, saveToLibrary } from '../lib/palette-tools.js'

const source = readFileSync('index.js', 'utf8')
const renderer = source.slice(
  source.indexOf('function renderLibraryList() {'),
  source.indexOf('\nfunction openLibrary()')
)
const initializer = source.slice(
  source.indexOf('function initLibrary() {'),
  source.indexOf("\ndocument.addEventListener('DOMContentLoaded', initLibrary)")
)
afterEach(() => document.body.replaceChildren())
it('keeps prior rows visible and distinguishes read failure from an empty library, then recovers', () => {
  document.body.innerHTML = '<ul id="libraryList"></ul><p id="libraryEmpty">Nothing saved yet.</p>'
  let blocked = false,
    raw = JSON.stringify([{ id: 'a', name: 'Synthetic', colors: ['#112233'] }])
  const store = {
    getItem: () => {
      if (blocked) throw new Error('synthetic read failure')
      return raw
    },
    setItem: vi.fn(),
  }
  const context = {
    document,
    getLibraryStore: () => store,
    readLibrary,
    removeFromLibrary,
    showToast: vi.fn(),
  }
  const render = () => runInNewContext(renderer + '\nrenderLibraryList()', context)
  render()
  const item = document.querySelector('#libraryList li')
  blocked = true
  render()
  const status = document.getElementById('libraryEmpty')
  expect(status.hidden).toBe(false)
  expect(status.getAttribute('role')).toBe('status')
  expect(status.textContent).toContain('Could not refresh')
  expect(document.querySelector('#libraryList li')).toBe(item)
  expect(store.setItem).not.toHaveBeenCalled()
  blocked = false
  raw = '[]'
  render()
  expect(status.textContent).toBe('Nothing saved yet.')
  expect(document.querySelector('#libraryList').children).toHaveLength(0)
})
it('shows an unavailable-storage error instead of an empty-library claim', () => {
  document.body.innerHTML = '<ul id="libraryList"></ul><p id="libraryEmpty">Nothing saved yet.</p>'
  runInNewContext(renderer + '\nrenderLibraryList()', {
    document,
    getLibraryStore: () => null,
    readLibrary,
    removeFromLibrary,
    showToast: vi.fn(),
  })
  expect(document.getElementById('libraryEmpty').textContent).toContain('Could not refresh')
})
it('reports unavailable storage on save, retains the name, and can save on retry', () => {
  document.body.innerHTML =
    '<div id="libraryDialog"></div><form id="librarySaveForm"><input id="librarySaveName" value="Synthetic name"></form><ul id="libraryList"></ul><p id="libraryEmpty">Nothing saved yet.</p>'
  let blocked = true,
    raw = null
  const store = {
    getItem: () => raw,
    setItem: vi.fn((key, value) => {
      raw = value
    }),
  }
  const showToast = vi.fn()
  runInNewContext(renderer + '\n' + initializer + '\ninitLibrary()', {
    document,
    getLibraryStore: () => (blocked ? null : store),
    readLibrary,
    removeFromLibrary,
    saveToLibrary,
    showToast,
    openLibrary: () => {},
    hexInput: document.createElement('input'),
    getPaletteHexes: () => ['#112233', '#ffffff'],
    paletteLocks: [],
    currentColor: { hex: '#112233' },
  })
  const submit = () =>
    document
      .getElementById('librarySaveForm')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  submit()
  expect(showToast).toHaveBeenLastCalledWith(
    'Could not save: browser storage is unavailable. Your palette has not been saved.'
  )
  expect(store.setItem).not.toHaveBeenCalled()
  expect(document.getElementById('librarySaveName').value).toBe('Synthetic name')
  blocked = false
  submit()
  expect(store.setItem).toHaveBeenCalledTimes(1)
  expect(showToast).toHaveBeenLastCalledWith('Saved Synthetic name')
})

it('does not deny a successful save when the following refresh read fails', () => {
  document.body.innerHTML =
    '<div id="libraryDialog"></div><form id="librarySaveForm"><input id="librarySaveName" value="Saved despite refresh failure"></form><ul id="libraryList"></ul><p id="libraryEmpty">Nothing saved yet.</p>'
  let raw = '[]',
    failRead = false
  const store = {
    getItem: () => {
      if (failRead) throw new Error('synthetic refresh failure')
      return raw
    },
    setItem: vi.fn((key, value) => {
      raw = value
      failRead = true
    }),
  }
  const showToast = vi.fn()
  runInNewContext(renderer + '\n' + initializer + '\ninitLibrary()', {
    document,
    getLibraryStore: () => store,
    readLibrary,
    removeFromLibrary,
    saveToLibrary,
    showToast,
    openLibrary: () => {},
    hexInput: document.createElement('input'),
    getPaletteHexes: () => ['#112233', '#ffffff'],
    paletteLocks: [],
    currentColor: { hex: '#112233' },
  })
  document
    .getElementById('librarySaveForm')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  expect(JSON.parse(raw)[0].name).toBe('Saved despite refresh failure')
  expect(showToast).toHaveBeenLastCalledWith('Saved Saved despite refresh failure')
  const message = document.getElementById('libraryEmpty').textContent
  expect(message).toContain('Could not refresh saved palettes')
  expect(message).not.toContain('No library changes were made')
})
it('does not deny a successful delete when its refresh read fails', () => {
  document.body.innerHTML = '<ul id="libraryList"></ul><p id="libraryEmpty">Nothing saved yet.</p>'
  let raw = JSON.stringify([{ id: 'a', name: 'Synthetic', colors: ['#112233'] }]),
    failRead = false
  const store = {
    getItem: () => {
      if (failRead) throw new Error('synthetic refresh failure')
      return raw
    },
    setItem: vi.fn((key, value) => {
      raw = value
      failRead = true
    }),
  }
  const showToast = vi.fn()
  runInNewContext(renderer + '\nrenderLibraryList()', {
    document,
    getLibraryStore: () => store,
    readLibrary,
    removeFromLibrary,
    showToast,
  })
  document.querySelector('[aria-label="Delete Synthetic"]').click()
  expect(JSON.parse(raw)).toEqual([])
  expect(showToast).toHaveBeenLastCalledWith('Deleted Synthetic')
  expect(document.getElementById('libraryEmpty').textContent).toContain(
    'Could not refresh saved palettes'
  )
  expect(document.getElementById('libraryEmpty').textContent).not.toContain(
    'No library changes were made'
  )
})
