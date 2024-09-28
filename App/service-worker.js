importScripts('https://cdn.jsdelivr.net/npm/workbox-sw@5.1.4/build/workbox-sw.min.js');

if (workbox) {
  console.log(`Workbox is loaded`);

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/'),
    new workbox.strategies.CacheFirst()
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.html'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.css') || url.pathname.endsWith('.js'),
    new workbox.strategies.StaleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg'),
    new workbox.strategies.CacheFirst()
  );

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
} else {
  console.log(`Workbox didn't load`);
}