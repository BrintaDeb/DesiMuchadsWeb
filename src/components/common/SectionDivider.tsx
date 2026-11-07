"use client";

import React from "react";
import { MoustacheSVG } from "./Icons";

export function SectionDivider({
  label,
  sublabel,
}: {
  label?: string;
  sublabel?: string;
}) {
  return (
    <div className="relative py-12 flex flex-col items-center justify-center overflow-hidden w-full max-w-7xl mx-auto px-4">
      {/* Horizontal decorative crisp silver lines with diamond accents */}
      <div className="flex items-center justify-center w-full gap-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/30" />
        
        {/* Diamond seal */}
        <div className="w-2 h-2 rotate-45 border border-white/40 bg-white/10" />
        
        {/* Center Moustache emblem */}
        <div className="relative flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 border-t-white/35 bg-[#121215]/95 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <MoustacheSVG className="w-8 h-4 text-white" />
          {label && (
            <span className="ml-2 font-mono text-[11px] tracking-[0.25em] text-zinc-300 uppercase font-semibold">
              {label}
            </span>
          )}
        </div>

        {/* Diamond seal */}
        <div className="w-2 h-2 rotate-45 border border-white/40 bg-white/10" />

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/30" />
      </div>

      {sublabel && (
        <p className="mt-2 text-xs font-mono text-zinc-400 tracking-widest uppercase text-center">
          {sublabel}
        </p>
      )}
    </div>
  );
}

