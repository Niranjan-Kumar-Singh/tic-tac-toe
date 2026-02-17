const CACHE_NAME = "tic-tac-toe-cache-v3";
const urlsToCache = [
  "/", // default page
  "/index.html",
  "/about.html",
  "/contact.html",
  "/tips.html",
  "/updates.html",
  "/privacy.html",
  "/terms.html",
  "/disclaimer.html",
  "/offline.html",
  "/ads.txt",
  "/manifest.json",
  "/robots.txt",

  // Styles and scripts
  "/style.css",
  "/script.js",
  "/layout.js",

  // Images
  "/images/favicon.ico",
  "/images/favicon-16x16.png",
  "/images/favicon-32x32.png",
  "/images/preview.png",
  "/images/tic-tac-toe-192x192.png",
  "/images/tic-tac-toe-512x512.png",
  "/images/tic-tac-toe.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests and skip external/unwanted domains
  if (
    event.request.method !== "GET" ||
    event.request.url.includes("csp.withgoogle.com") ||
    event.request.url.includes("adtrafficquality.google") ||
    event.request.url.includes("googlesyndication.com")
  ) {
    return;
  }

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
