import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { afterEach, expect, it, vi } from 'vitest'
import { LIBRARY_KEY, readLibrary, removeFromLibrary } from '../lib/palette-tools.js'

// Execute only the actual library renderer, never app startup or analytics.
const source = readFileSync('index.js', 'utf8')
const renderer = source.slice(
  source.indexOf('function renderLibraryList() {'),
  source.indexOf('\nfunction openLibrary()')
)
afterEach(() => {
  document.body.replaceChildren()
  vi.restoreAllMocks()
})
it.each(['read', 'write'])(
  'keeps a palette visible on failed %s, explains failure, and supports retry',
  (failure) => {
    document.body.innerHTML = '<ul id="libraryList"></ul><p id="libraryEmpty"></p>'
    const original = JSON.stringify([
      { id: 'a', name: 'Synthetic palette', colors: ['#112233', '#ffffff'] },
    ])
    let stored = original
    let blocked = false
    const store = {
      getItem: () => {
        if (blocked && failure === 'read') throw new Error('synthetic read failure')
        return stored
      },
      setItem: (key, value) => {
        expect(key).toBe(LIBRARY_KEY)
        if (blocked && failure === 'write') throw new Error('synthetic quota')
        stored = value
      },
    }
    const showToast = vi.fn()
    const errors = []
    const onError = (event) => {
      errors.push(event.error)
      event.preventDefault()
    }
    window.addEventListener('error', onError)
    try {
      runInNewContext(renderer + '\nrenderLibraryList()', {
        document,
        getLibraryStore: () => store,
        readLibrary,
        removeFromLibrary,
        showToast,
      })
      const button = document.querySelector('[aria-label="Delete Synthetic palette"]')
      blocked = true
      button.click()
      expect(errors).toEqual([])
      expect(stored).toBe(original)
      expect(document.querySelector('[aria-label="Delete Synthetic palette"]')).toBe(button)
      expect(showToast).toHaveBeenLastCalledWith(
        'Could not delete: library is unreadable or browser storage is full or blocked'
      )
      expect(showToast).not.toHaveBeenCalledWith('Deleted Synthetic palette')
      blocked = false
      button.click()
      expect(JSON.parse(stored)).toEqual([])
      expect(document.querySelector('#libraryList').children).toHaveLength(0)
      expect(showToast).toHaveBeenLastCalledWith('Deleted Synthetic palette')
    } finally {
      window.removeEventListener('error', onError)
    }
  }
)
