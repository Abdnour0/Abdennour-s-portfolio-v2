/* ── SERVICE WORKER — Cache-first for static shell ─────────────────── */
const SW_VERSION = '2026-06-01-1';
const CACHE_NAME = 'ag-portfolio-' + SW_VERSION;

/* Install: just take control, no pre-cache (Vite hashes filenames) */
self.addEventListener('install', event => {
  self.skipWaiting();
});

/* Activate: delete old caches and claim clients */
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

/* Fetch: cache-first for same-origin, network-only for 3rd party */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin) return;
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      });
    }).catch(() => {
      if (request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});
