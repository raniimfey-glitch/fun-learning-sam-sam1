const CACHE_NAME = "ranimfay-cache-v2";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.svg",
  "/icon-512.svg",
  "/icon-maskable-192.svg",
  "/icon-maskable-512.svg",
  "/icon.svg",
  "/favicon.svg",
  "/data.json"
];

// Install Event - Precache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("Precache failed for some assets:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Handle offline access with appropriate strategies
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle HTTP/HTTPS requests and same-origin (or specific CDN/fonts)
  if (!request.url.startsWith("http")) return;

  // Ignore cross-origin iframe embedded apps (they have their own origin)
  if (url.origin !== self.location.origin && !url.hostname.includes("fonts.googleapis.com") && !url.hostname.includes("fonts.gstatic.com")) {
    return;
  }

  // Navigation requests (HTML) -> NetworkFirst with offline cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          const fallback = await caches.match("/index.html");
          if (fallback) return fallback;
          return new Response(
            `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>غير متصل بالإنترنت</title><style>body{font-family:sans-serif;text-align:center;padding:50px;background:#f2f8f6;color:#1e293b}h1{color:#3b82f6}</style></head><body><h1>📡 أنت غير متصل بالإنترنت</h1><p>يرجى التحقق من اتصالك بالإنترنت لإعادة تحميل المنصة.</p></body></html>`,
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        })
    );
    return;
  }

  // Static Assets (JS, CSS, images, JSON) -> Stale While Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
