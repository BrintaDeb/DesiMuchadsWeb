"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export type DensityMode = "compact" | "comfortable" | "spacious";

export function ThemeToggle() {
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

  return (
    <button
      onClick={cycleDensity}
      type="button"
      className="group flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] rounded-full border border-white/20 bg-[#121215]/80 hover:border-white/50 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono interactive-scale-tap touch-hit-expand"
      title={`Visual Density: ${density} (Click to switch)`}
      aria-label={`Switch visual layout density, currently ${density}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
      <span className="hidden sm:inline uppercase text-[10px] tracking-wider font-semibold">
        {density}
      </span>
    </button>
  );
}
