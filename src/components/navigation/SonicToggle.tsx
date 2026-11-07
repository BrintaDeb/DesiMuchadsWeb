"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Sparkles } from "lucide-react";

export function SonicToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(sound.getStatus());
  }, []);

  const handleToggle = () => {
    const newState = sound.toggle();
    setEnabled(newState);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 ${
        enabled
          ? "border-white/30 bg-white/10 text-white hover:border-white/60"
          : "border-white/10 bg-white/5 text-zinc-500 hover:text-white"
      }`}
      title={enabled ? "Mute Sonic Masala UI" : "Enable Sonic Masala UI"}
      aria-label="Toggle Sonic Masala Audio Effects"
    >
      {/* 4 Animated Equalizer Bars */}
      <div className="flex items-end gap-[2.5px] h-3 w-3">
        <span
          className={`w-[2px] rounded-full transition-all duration-200 ${
            enabled
              ? "h-3 bg-white animate-pulse"
              : "h-1 bg-white/30"
          }`}
          style={{ animationDuration: "0.5s" }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-200 ${
            enabled
              ? "h-2 bg-white animate-pulse"
              : "h-1.5 bg-white/30"
          }`}
          style={{ animationDuration: "0.3s" }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-200 ${
            enabled
              ? "h-3 bg-white animate-pulse"
              : "h-1 bg-white/30"
          }`}
          style={{ animationDuration: "0.7s" }}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-200 ${
            enabled
              ? "h-1.5 bg-white animate-pulse"
              : "h-1 bg-white/30"
          }`}
          style={{ animationDuration: "0.4s" }}
        />
      </div>

      <span className="hidden xl:inline text-[10px] uppercase tracking-wider font-semibold">
        {enabled ? "Sonic Masala: ON" : "Sonic: OFF"}
      </span>
    </button>
  );
}

