import { expect, it, vi } from 'vitest'
import { readLibrary, removeFromLibrary, saveToLibrary } from '../lib/palette-tools.js'

const original = JSON.stringify([{ id: 'keep', name: 'Original', colors: ['#112233'] }])
const added = { id: 'new', name: 'New', colors: ['#ffffff'] }
it.each(['save', 'delete'])(
  'does not %s when reading fails even if writes would succeed',
  (action) => {
    let blocked = true
    let stored = original
    const store = {
      getItem: () => {
        if (blocked) throw new Error('synthetic read failure')
        return stored
      },
      setItem: vi.fn((key, value) => {
        stored = value
      }),
    }
    const mutate = () =>
      action === 'save' ? saveToLibrary(store, added) : removeFromLibrary(store, 'keep')
    expect(readLibrary(store)).toEqual([])
    expect(mutate).toThrow()
    expect(store.setItem).not.toHaveBeenCalled()
    expect(stored).toBe(original)
    blocked = false
    mutate()
    expect(readLibrary(store).map((p) => p.id)).toEqual(action === 'save' ? ['new', 'keep'] : [])
  }
)
it.each([
  '{invalid',
  '{}',
  JSON.stringify([{ id: 'keep', name: 'Original', colors: ['#112233'] }, { id: 'incomplete' }]),
])('does not overwrite unreadable stored content: %s', (raw) => {
  const store = { getItem: () => raw, setItem: vi.fn() }
  expect(() => saveToLibrary(store, added)).toThrow()
  expect(() => removeFromLibrary(store, 'keep')).toThrow()
  expect(store.setItem).not.toHaveBeenCalled()
})
it('allows a genuinely new library', () => {
  const store = { getItem: () => null, setItem: vi.fn() }
  expect(saveToLibrary(store, added)).toEqual([added])
  expect(store.setItem).toHaveBeenCalledTimes(1)
})
