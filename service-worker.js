// Service Worker for Color Studio PWA
// Version: 1.0.0

const CACHE_NAME = 'color-studio-v5'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/index.js',
  '/index.css',
  '/favicon.png',
  '/manifest.json',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching static assets')
        // Same-origin only: the CSP's connect-src 'self' blocks fetch() to font hosts
        // from inside the worker, so third-party assets are left to the browser
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[ServiceWorker] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim()
      })
  )
})

// Fetch event - cache-first strategy for performance
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET requests
  if (request.method !== 'GET') {
    return
  }

  // Leave cross-origin requests (Google Fonts) to the browser. Proxying them
  // through the worker fails under connect-src 'self' and served a 503, which
  // made returning visitors fall back to system fonts.
  if (url.origin !== self.location.origin) {
    return
  }

  // Network first for everything same-origin. index.js and index.css have no
  // content hash, so serving them from cache while the page came from the
  // network paired new HTML with old code after a deploy. The cache is only the
  // offline fallback (ignoreSearch so versioned URLs still match offline).
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse?.status === 200) {
          const copy = networkResponse.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
        }
        return networkResponse
      })
      .catch(async () => {
        const cached = await caches.match(request, { ignoreSearch: true })
        if (cached) return cached
        if (request.mode === 'navigate') return caches.match('/index.html')
        return new Response('Offline content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({ 'Content-Type': 'text/plain' }),
        })
      })
  )
})

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('[ServiceWorker] Cache cleared')
    })
  }
})
