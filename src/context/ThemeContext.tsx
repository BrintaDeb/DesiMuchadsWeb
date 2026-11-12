"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "raat" | "din";

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: (event?: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "raat",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("desi_theme") as ThemeMode | null;
      if (saved === "din" || saved === "raat") return saved;
    }
    return "raat";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "din") {
      document.documentElement.classList.add("theme-din");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("theme-din");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent) => {
    const nextTheme: ThemeMode = theme === "raat" ? "din" : "raat";

    // Circular expanding clip-path transition if supported
    if (
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

      const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
        setTheme(nextTheme);
        localStorage.setItem("desi_theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        if (nextTheme === "din") {
          document.documentElement.classList.add("theme-din");
          document.documentElement.classList.remove("dark");
        } else {
          document.documentElement.classList.remove("theme-din");
          document.documentElement.classList.add("dark");
        }
      });

      transition.ready.then(() => {
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
      });
    } else {
      setTheme(nextTheme);
      localStorage.setItem("desi_theme", nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      if (nextTheme === "din") {
        document.documentElement.classList.add("theme-din");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.remove("theme-din");
        document.documentElement.classList.add("dark");
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

