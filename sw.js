const CACHE_NAME = "uhr-cache-v1";

const OFFLINE_FILES = [
  "/uhr/",
  "/uhr/index.html",
  "/uhr/manifest.json",
  "/uhr/sw.js",
  "/uhr/icons/icon-192.png",
  "/uhr/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(OFFLINE_FILES))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
