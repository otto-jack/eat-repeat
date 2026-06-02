const CACHE_NAME = 'eat-repeat-cache-19';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './src/app.js',
  './src/app.js?v=20260602s',
  './src/data.js',
  './src/data.js?v=20260602s',
  './src/storage.js',
  './src/storage.js?v=20260602s',
  './src/styles.css',
  './src/styles.css?v=20260602s',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match('./index.html')))
  );
});
