"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Micro Compact Sonic Toggle
 * Minimized to a sleek, micro icon button for seamless header elegance.
 */
export function SonicToggle({ className = "" }: { className?: string }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const unsubMute = sound.subscribe((muted) => setIsMuted(muted));
    const unsubPlayback = sound.onPlayback(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 250);
    });
    return () => {
      unsubMute();
      unsubPlayback();
    };
  }, []);

  const handleToggle = () => {
    haptics.medium();
    sound.toggle();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-200 select-none group active:scale-90 cursor-pointer ${
        isMuted
          ? "border-white/15 bg-white/5 text-zinc-400 hover:border-white/30 hover:text-white"
          : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.35)] hover:border-emerald-400"
      } ${className}`}
      title={isMuted ? "Enable Sound" : "Mute Sound"}
      aria-label={isMuted ? "Enable Sound" : "Mute Sound"}
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span
            className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 transition-transform ${
              isPulsing ? "scale-150" : "scale-100"
            }`}
          />
        </>
      )}
    </button>
  );
}
