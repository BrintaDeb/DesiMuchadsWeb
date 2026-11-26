"use client";

import React, { useEffect } from "react";

/**
 * Scroll-linked reading progress hairline pinned to the header's bottom edge.
 * Uses native CSS Scroll-Driven Animations (`animation-timeline: scroll()`) where supported
 * and falls back to `--scroll-progress` updates via rAF only in unsupported browsers.
 */
export function ReadingProgressBar() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    if (
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline", "scroll()")
    ) {
      return;
    }

    const root = document.documentElement;
    let rafId = 0;
    let lastValue = "";

    const updateProgress = () => {
      rafId = 0;
      if (document.hidden) return;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
      const formatted = progress.toFixed(4);
      if (formatted !== lastValue) {
        lastValue = formatted;
        root.style.setProperty("--scroll-progress", formatted);
      }
    };

    const scheduleUpdate = () => {
      if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    document.addEventListener("visibilitychange", scheduleUpdate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      document.removeEventListener("visibilitychange", scheduleUpdate);
    };
  }, []);

  return <div aria-hidden="true" className="dm-reading-progress" />;
}
