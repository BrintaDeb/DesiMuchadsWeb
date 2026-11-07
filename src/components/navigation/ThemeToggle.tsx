"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { sound } from "@/lib/sound";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    sound.playPluck(180);
    toggleTheme(e);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => sound.playPluck(120)}
      type="button"
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 bg-[#121215]/80 hover:border-white/50 hover:bg-white/10 transition-all duration-300 text-xs font-mono text-zinc-300 hover:text-white"
      title={`Switch to ${theme === "raat" ? "Din (Light Mode)" : "Raat (Obsidian Mode)"}`}
      aria-label="Toggle Raat / Din Theme"
    >
      {theme === "raat" ? (
        <>
          <Moon className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-white">
            रात (Night)
          </span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-white group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-white">
            दिन (Light)
          </span>
        </>
      )}
    </button>
  );
}

