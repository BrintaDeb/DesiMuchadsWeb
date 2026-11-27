"use client";

import React from "react";

export function SectionDivider({
  label,
  sublabel,
}: {
  label?: string;
  sublabel?: string;
}) {
  return (
    <div
      aria-hidden={!label && !sublabel}
      className="relative py-5 sm:py-7 flex flex-col items-center justify-center overflow-hidden w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-center w-full gap-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/[0.09] to-white/[0.14]" />

        {label ? (
          <span className="font-mono text-[10px] tracking-[0.26em] text-zinc-500 uppercase">
            {label}
          </span>
        ) : (
          <span className="w-1 h-1 rounded-full bg-[#D4AF37]/45 shrink-0" />
        )}

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/[0.09] to-white/[0.14]" />
      </div>

      {sublabel && (
        <p className="mt-2 text-[11px] font-mono text-zinc-500 tracking-widest uppercase text-center">
          {sublabel}
        </p>
      )}
    </div>
  );
}
