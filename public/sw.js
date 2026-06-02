const SW_VERSION = '2026-06-02-5';
const CACHE_NAME = 'ag-portfolio-' + SW_VERSION;

// Only cache these static assets that never change (hashed filenames from Vite)
const IMMUTABLE_PATTERNS = [/\/css\/style\.[a-z0-9]+\.css$/, /\/js\/.+\.[a-z0-9]+\.js$/];

self.addEventListener('install', event => {
  // Immediately take control — don't wait for old SW to die
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('ag-portfolio-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (request.method !== 'GET') return;

  // For HTML documents: ALWAYS fetch from network, fall back to cache
  if (request.destination === 'document' || url.pathname === '/') {
    event.respondWith(
      fetch(request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => caches.match(request))
    );
    return;
  }

  // For Vite-hashed assets (immutable): cache-first
  const isImmutable = IMMUTABLE_PATTERNS.some(p => p.test(url.pathname));
  if (isImmutable) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // For everything else: network-first, fall back to cache
  event.respondWith(
    fetch(request).then(response => {
      if (response && response.status === 200) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
      }
      return response;
    }).catch(() => caches.match(request).then(cached => cached || new Response('', { status: 408 })))
  );
});
