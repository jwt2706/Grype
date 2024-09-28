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
} else {
  console.log(`Workbox didn't load`);
}