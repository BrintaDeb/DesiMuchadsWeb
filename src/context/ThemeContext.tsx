"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore, useCallback } from "react";

type ThemeMode = "raat" | "din";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "raat",
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = "desi_theme";
const THEME_EVENT = "dm-theme-change";

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "raat";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "din" || saved === "raat") return saved;
  } catch {
    // Ignore storage access errors in restricted contexts
  }
  return "raat";
}

function subscribeTheme(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function applyThemeToDocument(targetTheme: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", targetTheme);
  if (targetTheme === "din") {
    root.classList.add("theme-din");
    root.classList.remove("dark");
  } else {
    root.classList.remove("theme-din");
    root.classList.add("dark");
  }

  // Synchronize <meta name="color-scheme"> per modern-web-guidance
  const scheme = targetTheme === "din" ? "light" : "dark";
  let meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = "color-scheme";
    document.head.appendChild(meta);
  }
  meta.content = scheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore<ThemeMode>(subscribeTheme, readStoredTheme, () => "raat");

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (event?: React.MouseEvent) => {
      const nextTheme: ThemeMode = theme === "raat" ? "din" : "raat";
      const commitTheme = () => {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch {
          // Persist failed; still apply theme dynamically in DOM
        }
        applyThemeToDocument(nextTheme);
        window.dispatchEvent(new Event(THEME_EVENT));
      };

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Circular expanding clip-path View Transition when supported & motion permitted
      if (
        !prefersReducedMotion &&
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        event
      ) {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        const transition = (
          document as unknown as {
            startViewTransition: (cb: () => void) => { ready: Promise<void> };
          }
        ).startViewTransition(commitTheme);

        transition.ready
          .then(() => {
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
          })
          .catch(() => {});
      } else {
        commitTheme();
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
