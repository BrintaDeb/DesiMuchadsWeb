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
      className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0D0C12]/80 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-xs font-mono text-[#D4AF37]"
      title={`Switch to ${theme === "raat" ? "Din (Khadi Parchment)" : "Raat (Night Obsidian)"}`}
      aria-label="Toggle Raat / Din Theme"
    >
      {theme === "raat" ? (
        <>
          <Moon className="w-3.5 h-3.5 text-[#F5DE88] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">
            रात (Night)
          </span>
        </>
      ) : (
        <>
          <Sun className="w-3.5 h-3.5 text-[#F59E0B] group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider text-[#C84B31]">
            दिन (Khadi)
          </span>
        </>
      )}
    </button>
  );
}
