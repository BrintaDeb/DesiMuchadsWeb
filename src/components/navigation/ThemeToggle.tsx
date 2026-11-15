"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Moon, Sun } from "lucide-react";
import { sound } from "@/lib/sound";
import { useTheme } from "@/context/ThemeContext";

export type DensityMode = "compact" | "comfortable" | "spacious";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [density, setDensity] = useState<DensityMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dm-density") as DensityMode | null;
      if (saved && ["compact", "comfortable", "spacious"].includes(saved)) {
        return saved;
      }
    }
    return "comfortable";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-density", density);
      localStorage.setItem("dm-density", density);
    }
  }, [density]);

  const cycleDensity = () => {
    sound.playPluck(150);
    setDensity((prev) =>
      prev === "comfortable"
        ? "compact"
        : prev === "compact"
        ? "spacious"
        : "comfortable"
    );
  };

  const isDin = theme === "din";

  return (
    <div
      className="flex items-center p-0.5 rounded-full border border-white/20 bg-[#121215]/80 backdrop-blur-md shadow-sm shrink-0 whitespace-nowrap"
      style={{ whiteSpace: "nowrap" }}
    >
      {/* 1. Theme Mode Switcher (Raat / Din with View Transition) */}
      <button
        onClick={(e) => {
          sound.playPluck(170);
          toggleTheme(e);
        }}
        type="button"
        className="group flex items-center gap-1 px-2.5 py-1 min-h-[32px] rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono interactive-scale-tap"
        title={`Theme Mode: ${isDin ? "Din (Palace Ivory)" : "Raat (Obsidian Night)"} • Click to switch`}
        aria-label={`Current theme is ${theme}. Click to switch theme mode.`}
      >
        {isDin ? (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin-slow" />
            <span className="hidden 2xl:inline uppercase text-[10px] tracking-wider font-bold text-amber-300">
              Din
            </span>
          </>
        ) : (
          <>
            <Moon className="w-3.5 h-3.5 text-zinc-300 group-hover:text-white shrink-0" />
            <span className="hidden 2xl:inline uppercase text-[10px] tracking-wider font-semibold text-zinc-300">
              Raat
            </span>
          </>
        )}
      </button>

      {/* Subtle Divider */}
      <span className="w-px h-3.5 bg-white/15 my-auto" />

      {/* 2. Visual Density Switcher (Compact / Comfortable / Spacious) */}
      <button
        onClick={cycleDensity}
        type="button"
        className="group flex items-center gap-1 px-2.5 py-1 min-h-[32px] rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono interactive-scale-tap"
        title={`Visual Density: ${density} • Click to cycle (Compact / Comfortable / Spacious)`}
        aria-label={`Current visual density is ${density}. Click to cycle.`}
      >
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
        <span className="hidden xl:inline uppercase text-[10px] tracking-wider font-semibold text-zinc-300">
          {density}
        </span>
      </button>
    </div>
  );
}
