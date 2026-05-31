/* ── SERVICE WORKER — Cache-first for static shell ─────────────────── */
const CACHE_NAME = 'ag-portfolio-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/js/i18n.js',
  '/images/IMG_9858.webp',
  '/images/nike shoes.webp',
  '/images/photo.webp',
  '/manifest.json'
];

/* Install: pre-cache all shell assets */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

/* Activate: delete old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch: cache-first for same-origin, network-only for 3rd party */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (fonts, CDN scripts)
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Only cache successful GET responses
        if (!response || response.status !== 200 || request.method !== 'GET') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    }).catch(() => {
      // Offline fallback — return cached index.html
      if (request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});
