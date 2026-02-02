const CACHE_NAME = 'biz-scan-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // GASのAPIリクエストはキャッシュしない（常にネットワークへ）
  if (event.request.url.includes('script.google.com')) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュがあればそれを返す、なければネットワークへ
        return response || fetch(event.request);
      })
  );
});