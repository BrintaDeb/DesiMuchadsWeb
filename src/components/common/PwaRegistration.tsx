"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/pwa";

export function PwaRegistration() {
  useEffect(() => {
    // Register service worker after initial window load for maximum performance
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        registerServiceWorker();
      });
    }
  }, []);

  return null;
}
