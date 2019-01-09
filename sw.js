const version = 'slasho';
const staticCache = `static-${version}`;
const dynamicCache = 'dynamic'
const files = [
  'index.htm',
  'about/index.htm',
  'projects/index.htm',
  'talks/index.htm',
  'Acme.ttf',
  'fac.png',
  'github.svg',
  'insta.png',
  'linkedin.png',
  'Lob.ttf',
  'manifest.json',
  'mono.ttf',
  'slasho.css',
  'slasho.js',
  'slasho.json',
  'slasho.png',
  'slso.png',
  'slasho.ttf',
  'slso144.png',
  'slso512.png',
  'spin.gif',
  'talks.json',
  'twit.png'
]

addEventListener('install', (event) => {
  skipWaiting();
  event.waitUntil(async function () {
    const cache = await caches.open(staticCache);
    await cache.addAll(files);
  }());
});

addEventListener('activate', (event) => {
  event.waitUntil(async function () {
    // Remove old caches
    for (const cacheName of await caches.keys()) {
      if (!cacheName.startsWith('podcast-') && cacheName !== staticCache && cacheName !== dynamicCache) {
        await caches.delete(cacheName);
      }
    }

    // A pretty harsh way to handle updates, but it's just a demo.
    for (const client of await clients.matchAll()) {
      client.navigate(client.url);
    }
  }());
});

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Skip the service worker for the feed. The page handles the caching.
  if (url.origin === location.origin && url.pathname === '/feed') return;
  event.respondWith(async function () {
    // Offline first:
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
  }());
});
