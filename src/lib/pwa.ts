"use client";

/**
 * PWA & Push Notification Client Controller
 * Manages Service Worker lifecycle, Push API subscriptions, and local offline sync.
 */

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    console.log("[PWA] Service Worker registered successfully with scope:", registration.scope);

    // Check for updates
    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("[PWA] New content is available; please refresh.");
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.warn("[PWA] Service Worker registration failed:", error);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.warn("[PWA] Notification permission request error:", error);
    return "denied";
  }
}

export async function triggerSessionNotification(details: {
  title: string;
  body: string;
  url?: string;
}) {
  if (typeof window === "undefined" || !("Notification" in window)) return;

  if (Notification.permission === "granted") {
    if ("serviceWorker" in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        reg.showNotification(details.title, {
          body: details.body,
          icon: "/desi-muchads-square-logo.png",
          badge: "/icon-192.png",
          data: { url: details.url || "/contact" },
        });
        return;
      }
    }

    new Notification(details.title, {
      body: details.body,
      icon: "/desi-muchads-square-logo.png",
    });
  }
}
