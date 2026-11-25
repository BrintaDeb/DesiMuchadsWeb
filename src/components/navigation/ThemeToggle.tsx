"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { Sparkles, Moon, Sun } from "lucide-react";
import { sound } from "@/lib/sound";
import { useTheme } from "@/context/ThemeContext";

export type DensityMode = "compact" | "comfortable" | "spacious";

const DENSITY_STORAGE_KEY = "dm-density";
const DENSITY_EVENT = "dm-density-change";

function readDensity(): DensityMode {
  if (typeof window === "undefined") return "comfortable";
  try {
    const saved = localStorage.getItem(DENSITY_STORAGE_KEY) as DensityMode | null;
    if (saved && ["compact", "comfortable", "spacious"].includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }
  return "comfortable";
}

function subscribeDensity(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const onStorage = (e: StorageEvent) => {
    if (e.key === DENSITY_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(DENSITY_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(DENSITY_EVENT, callback);
  };
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const density = useSyncExternalStore<DensityMode>(
    subscribeDensity,
    readDensity,
    () => "comfortable"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-density", density);
  }, [density]);

  const cycleDensity = () => {
    sound.playPluck(150);
    const nextDensity: DensityMode =
      density === "comfortable"
        ? "compact"
        : density === "compact"
        ? "spacious"
        : "comfortable";
    try {
      localStorage.setItem(DENSITY_STORAGE_KEY, nextDensity);
    } catch {
      // Ignore storage write errors
    }
    document.documentElement.setAttribute("data-density", nextDensity);
    window.dispatchEvent(new Event(DENSITY_EVENT));
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
