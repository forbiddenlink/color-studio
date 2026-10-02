// Service Worker for Color Studio PWA
// Version: 1.0.0

const CACHE_NAME = 'color-studio-v4'
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

  // Pages: network first, so a new deploy shows on the next visit instead of
  // one visit late; the cached copy is the offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse?.status === 200) {
            const copy = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy))
          }
          return networkResponse
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        // Optionally update cache in background for non-critical assets
        if (url.origin === self.location.origin) {
          updateCacheInBackground(request)
        }
        return cachedResponse
      }

      // Not in cache - fetch from network
      return fetch(request)
        .then((networkResponse) => {
          // Don't cache non-successful responses
          if (networkResponse?.status !== 200) {
            return networkResponse
          }

          // Clone the response before caching (response can only be consumed once)
          const responseToCache = networkResponse.clone()

          // Cache the fetched resource
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })

          return networkResponse
        })
        .catch((error) => {
          console.error('[ServiceWorker] Fetch failed:', error)

          // Return offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html')
          }

          // For other requests, return a simple offline response
          return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          })
        })
    })
  )
})

// Helper function to update cache in background (stale-while-revalidate pattern)
function updateCacheInBackground(request) {
  fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, response)
        })
      }
    })
    .catch(() => {
      // Silently fail - we already served from cache
    })
}

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
