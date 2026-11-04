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
      {/* Horizontal decorative brass lines with diamond accents */}
      <div className="flex items-center justify-center w-full gap-4">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
        
        {/* Diamond seal */}
        <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/20" />
        
        {/* Center Moustache emblem */}
        <div className="relative flex items-center justify-center px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0D0C12]/90 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <MoustacheSVG className="w-8 h-4 text-[#D4AF37]" />
          {label && (
            <span className="ml-2 font-mono text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              {label}
            </span>
          )}
        </div>

        {/* Diamond seal */}
        <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/20" />

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]" />
      </div>

      {sublabel && (
        <p className="mt-2 text-xs font-mono text-[#D4AF37]/70 tracking-widest uppercase text-center">
          {sublabel}
        </p>
      )}
    </div>
  );
}
