const CACHE_NAME = "tic-tac-toe-cache-v2"; // incremented version
const urlsToCache = [
  "/", // default page
  "/index.html",
  "/about.html",
  "/privacy.html",
  "/terms.html",
  "/offline.html",
  "/ads.txt",
  "/manifest.json",
  "/robots.txt",
  "/sitemap-2026.xml",
  "/LICENSE",
  "/README.md",

  // Game-related pages
  "/advanced-tactics.html",
  "/beginner-guide.html",
  "/community.html",
  "/game-theory.html",
  "/mobile-app.html",
  "/printable-boards.html",
  "/strategy-guide.html",
  "/tips.html",
  "/updates.html",
  "/variations.html",

  // Styles and scripts
  "/style.css",
  "/layout.css",
  "/legal.css",
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
