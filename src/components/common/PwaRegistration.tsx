"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/pwa";

export function PwaRegistration() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    if (document.readyState === "complete") {
      registerServiceWorker();
    } else {
      window.addEventListener("load", () => registerServiceWorker(), { once: true });
    }
  }, []);

  return null;
}
