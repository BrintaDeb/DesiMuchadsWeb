"use client";

import React, { useState, useRef, useCallback } from "react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { TrendingDown, TrendingUp, Sparkles, SlidersHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  className?: string;
}

export function BeforeAfterSlider({ className = "" }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 15-85
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const lastHapticPos = useRef<number>(50);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(15, Math.min(85, (x / rect.width) * 100));
    setSliderPos(pct);

    // Subtle tactile tick when crossing 10% thresholds
    if (Math.abs(pct - lastHapticPos.current) >= 12) {
      haptics.light();
      lastHapticPos.current = pct;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    haptics.light();
    sound.playPluck(150);
    handleMove(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    haptics.selection();
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 border-b border-white/10 pb-4 sm:pb-6">
        <div>
          <h3 className="font-display font-black text-xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight">
            Generic Advertising vs. Desi Muchads Engine
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
          Drag horizontally or tap below to compare generic ad spend against our engineered performance framework.
        </p>
      </div>

      {/* Touch-Friendly Quick Switcher for Mobile & Desktop */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4 font-mono text-[10px] sm:text-xs">
        <button
          type="button"
          onClick={() => {
            haptics.selection();
            sound.playPluck(140);
            setSliderPos(80);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-[0.2rem] border transition-all ${
            sliderPos > 55
              ? "bg-red-500/20 border-red-500/50 text-red-300 font-bold shadow-sm"
              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          GENERIC ADS (1.2X)
        </button>
        <button
          type="button"
          onClick={() => {
            haptics.selection();
            sound.playPluck(160);
            setSliderPos(50);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-[0.2rem] border transition-all ${
            sliderPos >= 45 && sliderPos <= 55
              ? "bg-white/20 border-white/40 text-white font-bold shadow-sm"
              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          50/50 SPLIT
        </button>
        <button
          type="button"
          onClick={() => {
            haptics.selection();
            sound.playPluck(180);
            setSliderPos(20);
          }}
          className={`px-2.5 sm:px-3 py-1.5 rounded-[0.2rem] border transition-all ${
            sliderPos < 45
              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold shadow-sm"
              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
          }`}
        >
          DESI MUCHADS (5.4X)
        </button>
      </div>

      {/* Main Interactive Split Container: Side-by-Side Panels with moving divider */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        data-cursor="drag"
        className="relative h-[490px] sm:h-[490px] w-full rounded-[0.25rem] overflow-hidden border border-[rgba(232,232,227,0.18)] select-none shadow-[0_25px_80px_rgba(0,0,0,0.95)] cursor-ew-resize touch-none bg-[#080807] flex"
      >
        {/* =========================================================================
            LEFT PANEL: GENERIC AGENCY AD SPEND (0% to sliderPos%)
            Completely distinct container: words will NEVER overlap or collide!
            ========================================================================= */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="relative h-full bg-[#130707] flex flex-col justify-between p-3.5 sm:p-8 overflow-hidden select-none shrink-0"
        >
          {/* Ambient red glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-red-500/20 pb-2.5 sm:pb-3 gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-[0.2rem] bg-red-500/15 border border-red-400/40 text-red-300 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate">
              <TrendingDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-red-400 shrink-0" />
              <span className="truncate">Generic (1.2X)</span>
            </span>

            <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-red-500/20 text-red-300 font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
              ₹480 CPA
            </span>
          </div>

          {/* Body Content */}
          <div className="relative z-10 my-auto py-2 sm:py-4 space-y-2 sm:space-y-3 min-w-0 w-full sm:min-w-[240px] max-w-md">
            <div className="flex items-center gap-1.5 text-red-400 font-mono text-[10px] sm:text-[11px] font-bold">
              <TrendingDown className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
              <span className="truncate">68% DROP-OFF IN FIRST 2S</span>
            </div>

            <h4 className="font-display font-black text-base sm:text-2xl text-zinc-300 uppercase tracking-tight line-through opacity-80 leading-tight">
              Generic Stock Creative
            </h4>

            <p className="text-[11px] sm:text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
              Stock templates with &ldquo;Buy Now 20% Off&rdquo;. Zero cultural hook, slow third-party Shopify apps, and bleeding customer acquisition costs.
            </p>

            <div className="pt-1.5 sm:pt-2 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-red-500/25 border border-red-400/30 text-red-300 text-[10px] sm:text-[11px] font-mono font-bold">
                ROAS: 1.2X
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-white/5 text-zinc-500 text-[10px] sm:text-[11px] font-mono">
                High Bounce
              </span>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="relative z-10 border-t border-red-500/20 pt-2.5 sm:pt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
            <span className="text-zinc-500 truncate">Status: Bleeding Spend</span>
            <span className="text-red-400 font-bold shrink-0">CM3: -8%</span>
          </div>
        </div>

        {/* =========================================================================
            RIGHT PANEL: DESI MUCHADS PERFORMANCE WINNER (sliderPos% to 100%)
            Completely distinct container: words will NEVER overlap or collide!
            ========================================================================= */}
        <div
          style={{ width: `${100 - sliderPos}%` }}
          className="relative h-full bg-[#07130b] flex flex-col justify-between p-3.5 sm:p-8 overflow-hidden select-none shrink-0"
        >
          {/* Ambient emerald glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2.5 sm:pb-3 gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-[0.2rem] bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider truncate">
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Desi Engine (5.4X)</span>
            </span>

            <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-emerald-500/20 text-emerald-300 font-mono text-[9px] sm:text-[10px] font-bold shrink-0">
              ₹95 CPA
            </span>
          </div>

          {/* Body Content */}
          <div className="relative z-10 my-auto py-2 sm:py-4 space-y-2 sm:space-y-3 min-w-0 w-full sm:min-w-[240px] max-w-md">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] sm:text-[11px] font-bold">
              <TrendingUp className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
              <span className="truncate">89% RETENTION</span>
            </div>

            <h4 className="font-display font-black text-base sm:text-2xl text-white uppercase tracking-tight leading-tight">
              High-Retention Hook
            </h4>

            <p className="text-[11px] sm:text-xs text-zinc-300 font-sans leading-relaxed line-clamp-3">
              First 1.5s arrests the thumb with high-context storytelling, native motion typography, macro product proofs, and 1-tap checkout.
            </p>

            <div className="pt-1.5 sm:pt-2 flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 text-[10px] sm:text-[11px] font-mono font-bold">
                ROAS: 5.4X
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-white/10 text-white text-[10px] sm:text-[11px] font-mono">
                Sub-1.2s
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-[0.2rem] bg-white/10 text-white text-[10px] sm:text-[11px] font-mono">
                12k+ Orders
              </span>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="relative z-10 border-t border-emerald-500/20 pt-2.5 sm:pt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
            <span className="text-zinc-400 truncate">Production: Active</span>
            <span className="text-emerald-400 font-bold shrink-0">CM3: +62%</span>
          </div>
        </div>

        {/* =========================================================================
            THE SLIDER SCRUB HANDLE & DIVIDER SEAM
            ========================================================================= */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute inset-y-0 -ml-px w-0.5 bg-gradient-to-b from-white via-white/90 to-white pointer-events-none z-30"
        >
          {/* Circular Metallic Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.9)] border-2 border-black/40">
            <SlidersHorizontal className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Bottom Percentage Readout Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-[0.2rem] bg-black/90 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 z-30 pointer-events-none">
          <span>DRAG TO REVEAL • {Math.round(sliderPos)}%</span>
        </div>
      </div>
    </div>
  );
}
