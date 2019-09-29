const CACHE_NAME = 'com.gmzcodes.cache.v3';

const CACHE_WHITELIST = [CACHE_NAME];

const CACHE_URLS = [
  '/',
  '/main.js',
  '/manifest.json',
  '/favicon.ico',
  '/static/gmzcodes-t-e-16.png',
  '/static/gmzcodes-t-e-32.png',
  '/static/gmzcodes-t-e-48.png',
  '/static/gmzcodes-t-e-64.png',
  'https://fonts.googleapis.com/css?family=Cardo:700|Josefin+Sans&display=swap',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();

  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => Promise.all(
      CACHE_URLS.map((url) => cache.add(url).catch((reason) => console.log(`${ url } failed to cache: ${ String(reason) }`)))
    )),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => cachedResponse || fetch(e.request).then((response) => {
      // Check if we received a valid response (we will cache other origins as well):
      if(!response || response.status !== 200 /* || response.type !== 'basic' */ ) {
        return response;
      }

      // IMPORTANT: Clone the response. A response is a stream
      // and because we want the browser to consume the response
      // as well as the cache consuming the response, we need
      // to clone it so we have two streams.

      const responseToCache = response.clone();

      caches.open(CACHE_NAME).then(cache => cache.put(e.request, responseToCache));

      return response;
    })),
  );
});

self.addEventListener('activate', e => e.waitUntil(caches
  .keys().then((cacheNames) => Promise.all(cacheNames.map(cacheName => CACHE_WHITELIST.indexOf(cacheName) === -1 ? caches.delete(cacheName) : null)))));