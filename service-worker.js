const CACHE_NAME = "tic-tac-toe-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/privacy.html",
  "/terms.html",
  "/legal.css",
  "/style.css",
  "/script.js",
  "/images/favicon.ico",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/tic-tac-toe-192x192.png",
  "/images/tic-tac-toe-512x512.png",
  "/images/preview.png",
  "/images/tic-tac-toe.png",
  "/offline.html",
  "/ads.txt",
  "/manifest.json",
  "/offline.html",
  "/sitemap-2025.xml",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((response) => {
        return response || caches.match("/offline.html");
      })
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});
