"use client";

import React, { useEffect, useState } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

export function SonicToggle() {
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
    sound.toggle();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[0.2rem] border transition-all text-[11px] font-mono select-none group ${
        isMuted
          ? "border-white/10 text-zinc-500 hover:border-white/30 hover:text-zinc-300 bg-white/[0.02]"
          : "border-emerald-500/40 text-emerald-300 bg-emerald-500/10 hover:border-emerald-400"
      }`}
      title={isMuted ? "Enable Tactile Audio Feedback" : "Mute Audio"}
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? (
        <>
          <VolumeX className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300" />
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-semibold">
            SOUND OFF
          </span>
        </>
      ) : (
        <>
          <Volume2 className="w-3 h-3 text-emerald-400" />
          <div className="flex items-end gap-0.5 h-2.5 w-3 shrink-0">
            <span
              className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${
                isPulsing ? "h-2.5" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${
                isPulsing ? "h-3" : "h-2"
              }`}
            />
            <span
              className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-150 ${
                isPulsing ? "h-2" : "h-1.5"
              }`}
            />
          </div>
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase font-semibold">
            SOUND ON
          </span>
        </>
      )}
    </button>
  );
}
