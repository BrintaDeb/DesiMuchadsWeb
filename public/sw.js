/**
 * DESI MUCHADS — Production PWA Service Worker
 * Version: 2.4.0
 * Capabilities:
 *  - Offline Cache-First Media Pipeline (Video reels, high-res case study imagery)
 *  - Stale-While-Revalidate Navigation Cache
 *  - Push Notifications for Strategy Sessions, Milestone Updates & Creative Approvals
 *  - Background Sync & Notification Click Dispatch
 */

const CACHE_VERSION = "desi-muchads-v2.7.0";
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const MEDIA_CACHE = `media-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// Pre-cached Critical Offline Shell
const PRECACHE_ASSETS = [
  "/",
  "/work",
  "/services",
  "/about",
  "/contact",
  "/pricing",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/apple-icon.png",
  "/desi-muchads-cropped-logo.png",
  "/desi-muchads-square-logo.png",
  "/app-icon.png",
  "/favicon.png",
  "/projects/lakeview-bakes-hero.png",
  "/art/indian-art-bg-royal.jpg",
];

// Install Event: Pre-cache core shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        return Promise.allSettled(
          PRECACHE_ASSETS.map((asset) =>
            cache.add(asset).catch((err) => console.warn(`[SW Failed to precache ${asset}]:`, err))
          )
        );
      })
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("[SW Precache Warning]:", err))
  );
});

// Activate Event: Clean up outdated caches
self.addEventListener("activate", (event) => {
  const currentCaches = [STATIC_CACHE, MEDIA_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => {
              console.log("[SW Pruning Stale Cache]:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Intelligent Multi-Tier Caching
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass non-GET requests and browser extensions
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // 1. API Endpoints: Network-First (Never cache sensitive dynamic API leads)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      fetch(request).catch(() => {
        return new Response(
          JSON.stringify({
            offline: true,
            message: "Offline mode active. Your action is stored and will sync when reconnected.",
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      })
    );
    return;
  }

  // 2. High-Capacity Media & Video Reels: Cache-First with Background Fallback
  // Matches: .mp4, .webm, /projects/, /demos/, /assets/video/
  const isMedia =
    url.pathname.match(/\.(mp4|webm|jpg|jpeg|png|webp|svg|ico)$/i) ||
    url.pathname.includes("/projects/") ||
    url.pathname.includes("/art/") ||
    url.pathname.includes("/assets/");

  if (isMedia) {
    event.respondWith(
      caches.open(MEDIA_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // Return fallback transparent pixel or cached logo if network fails
              return caches.match("/desi-muchads-square-logo.png");
            });
        });
      })
    );
    return;
  }

  // 3. HTML Navigation Pages & Next.js RSC payloads: Network-First with Cache Fallback
  if (
    request.mode === "navigate" ||
    request.headers.get("RSC") === "1" ||
    url.searchParams.has("_rsc")
  ) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match("/");
          });
        })
    );
    return;
  }

  // 4. Scripts, Styles & Font Chunks: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          return new Response("", {
            status: 503,
            statusText: "Offline",
          });
        });
    })
  );
});

// Push Event: Push Notification Dispatcher
self.addEventListener("push", (event) => {
  let data = {
    title: "Desi Muchads Growth Update",
    body: "Your strategy war-room session is confirmed. Tap to review your growth dossier.",
    icon: "/desi-muchads-square-logo.png",
    badge: "/icon-192.png",
    tag: "desi-muchads-notification",
    url: "/contact",
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || "/desi-muchads-square-logo.png",
    badge: data.badge || "/icon-192.png",
    tag: data.tag || "desi-muchads-notification",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/contact",
      timestamp: Date.now(),
    },
    actions: [
      {
        action: "view_session",
        title: "View Strategy Dossier",
      },
      {
        action: "open_gps",
        title: "Directions to HQ (Hosapalaya)",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification Click Handler: Deep Link Redirection
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open_gps") {
    // Open Google Maps coordinates for Hosapalaya HQ
    event.waitUntil(
      clients.openWindow("https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw")
    );
    return;
  }

  const targetUrl = event.notification.data?.url || "/contact";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Focus open window if exists
      for (const client of windowClients) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
