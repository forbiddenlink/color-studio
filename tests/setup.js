/**
 * Vitest setup: scaffold minimal DOM elements that index.js expects at import time.
 * This runs before each test file so the top-level getElementById calls return
 * real (if empty) elements instead of null.
 */

const elementIds = [
  'hexInput',
  'inputColor',
  'alteredColor',
  'alteredColorText',
  'slider',
  'sliderText',
  'lightenText',
  'darkenText',
  'toggleBtn',
  'saturationSlider',
  'saturationText',
  'hueSlider',
  'hueText',
  'copyButton',
  'applyButton',
  'colorHistory',
  'colorPicker',
  'inputColorHex',
  'inputColorRgb',
  'inputColorHsl',
  'alteredColorHex',
  'alteredColorRgb',
  'alteredColorHsl',
  'inputColorOklch',
  'alteredColorOklch',
  'colorName',
  'modifiedColorName',
  'clearHistory',
  'complementaryBtn',
  'analogousBtn',
  'triadicBtn',
  'splitComplementaryBtn',
  'squareBtn',
  'compoundBtn',
  'schemeColors',
  'exportCss',
  'exportScss',
  'exportJson',
  'historyEmpty',
  'exportTailwind',
  'exportShadcn',
  'exportDaisyui',
  'exportBootstrap',
  'gradientPreview',
  'gradientCode',
  'linearGradientBtn',
  'radialGradientBtn',
  'gradientAngle',
  'gradientAngleText',
  'gradientAngleControl',
  'copyGradientBtn',
  'randomPaletteBtn',
  'lockIndicator',
  'toast',
  'wcagBadge',
  'imageDropZone',
  'imageInput',
  'uploadBtn',
  'imageCanvas',
  'extractedColors',
  'previewCard',
  'previewButton',
  'previewNav',
  'copyLink',
  'contrastRatio',
]

for (const id of elementIds) {
  if (!document.getElementById(id)) {
    const el = document.createElement('div')
    el.id = id
    // Some elements need a value property (inputs/sliders)
    if (
      id.includes('Slider') ||
      id === 'hexInput' ||
      id === 'colorPicker' ||
      id.includes('Angle')
    ) {
      const input = document.createElement('input')
      input.id = id
      input.value = ''
      document.body.appendChild(input)
    } else if (id === 'imageCanvas') {
      const canvas = document.createElement('canvas')
      canvas.id = id
      document.body.appendChild(canvas)
    } else {
      document.body.appendChild(el)
    }
  }
}

// Mock localStorage
if (!globalThis.localStorage) {
  const store = {}
  globalThis.localStorage = {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => {
      store[key] = String(value)
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      for (const key of Object.keys(store)) delete store[key]
    },
  }
}

// Stub navigator.serviceWorker so registerServiceWorker() doesn't crash
if (!navigator.serviceWorker) {
  Object.defineProperty(navigator, 'serviceWorker', {
    value: {
      register: () => Promise.resolve({ scope: '/' }),
      addEventListener: () => {},
    },
    writable: true,
  })
}
