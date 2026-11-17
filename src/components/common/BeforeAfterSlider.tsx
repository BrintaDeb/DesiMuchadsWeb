"use client";

import React, { useState, useRef, useCallback } from "react";
import { sound } from "@/lib/sound";
import { TrendingDown, TrendingUp, Sparkles, SlidersHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  className?: string;
}

export function BeforeAfterSlider({ className = "" }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
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
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className={`relative w-full max-w-5xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-1">
          CREATIVE ARCHITECTURE TEARDOWN
        </span>
        <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
          Generic Ads vs. Desi Muchads Engine
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans">
          Slide horizontally to inspect the anatomical difference between generic agency ad spend vs. our high-conversion vernacular performance framework.
        </p>
      </div>

      {/* Main Interactive Split Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        data-cursor="drag"
        className="relative h-[480px] sm:h-[500px] w-full rounded-3xl overflow-hidden border border-white/20 select-none shadow-[0_25px_80px_rgba(0,0,0,0.9)] cursor-ew-resize touch-none bg-[#090a0d]"
      >
        {/* =========================================================================
            RIGHT LAYER: DESI MUCHADS VERNACULAR HIGH-ROAS WINNER (Base Layer)
            All content is anchored strictly to the RIGHT half so words never collide.
            ========================================================================= */}
        <div className="absolute inset-0 w-full h-full bg-[#07130c] flex flex-col justify-between p-5 sm:p-8 select-none">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Placed strictly on the RIGHT side */}
          <div className="flex items-center justify-end z-10 gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                +420% REVENUE LIFT
              </span>
              <span className="text-[11px] text-zinc-400 font-mono">₹95 Target CPA</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Desi Muchads Engine (5.4X)</span>
            </span>
          </div>

          {/* Center Card: Anchored strictly to the RIGHT */}
          <div className="my-auto z-10 w-full flex justify-end">
            <div className="w-full max-w-[340px] sm:max-w-[420px] p-5 sm:p-6 rounded-2xl bg-[#0b1c12] border border-emerald-500/40 shadow-2xl space-y-2 text-right">
              <div className="flex items-center justify-end gap-1.5 text-emerald-400 font-bold text-xs font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>89% HOOK RETENTION RATE</span>
              </div>
              <h4 className="font-display font-black text-lg sm:text-2xl text-white uppercase tracking-tight">
                Hinglish Cultural Hook
              </h4>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                First 1.5 seconds arrests the thumb with vernacular street-pride. Motion typography, macro-shots, and 1-tap checkout.
              </p>
              <div className="pt-2 flex items-center justify-end gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                  ROAS: 5.4X
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono">
                  Sub-1s Load
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono">
                  0% Drop
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Strip: Placed strictly on the RIGHT side */}
          <div className="flex items-center justify-end z-10 border-t border-emerald-500/20 pt-3">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-zinc-400 hidden sm:inline">Verified 12,000+ Orders</span>
              <span className="text-emerald-400 font-bold">Net Margin: +62%</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LEFT LAYER: GENERIC AGENCY AD (Clipped with CSS clip-path)
            All content is anchored strictly to the LEFT half so words never collide.
            ========================================================================= */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          className="absolute inset-0 w-full h-full bg-[#140808] flex flex-col justify-between p-5 sm:p-8 select-none z-20 pointer-events-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row: Placed strictly on the LEFT side */}
          <div className="flex items-center justify-start z-10 gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 font-mono text-xs font-bold uppercase shadow-lg">
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              <span>Generic Competitor Ad (1.2X)</span>
            </span>

            <div className="text-left hidden sm:block">
              <span className="text-[10px] font-mono text-red-400 font-bold block">
                BLEEDING AD SPEND
              </span>
              <span className="text-[11px] text-zinc-500 font-mono">₹480 Bloated CPA</span>
            </div>
          </div>

          {/* Center Card: Anchored strictly to the LEFT */}
          <div className="my-auto z-10 w-full flex justify-start">
            <div className="w-full max-w-[340px] sm:max-w-[420px] p-5 sm:p-6 rounded-2xl bg-[#1c0c0c] border border-red-500/40 shadow-2xl space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs font-mono">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>68% DROP-OFF IN FIRST 2 SECONDS</span>
              </div>
              <h4 className="font-display font-black text-lg sm:text-2xl text-zinc-300 uppercase tracking-tight line-through opacity-80">
                Generic Stock Creative
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Generic Canva templates with &ldquo;Buy Now 20% Off&rdquo;. Weak opening hooks, no cultural resonance, 6+ second slow Shopify theme.
              </p>
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-mono font-bold">
                  ROAS: 1.2X
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 text-[10px] font-mono">
                  6.2s Load
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-500 text-[10px] font-mono">
                  High Bounce
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Strip: Placed strictly on the LEFT side */}
          <div className="flex items-center justify-start z-10 border-t border-red-500/20 pt-3">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-zinc-500 hidden sm:inline">Unconverted Clicks</span>
              <span className="text-red-400 font-bold">Net Margin: -8%</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            THE SLIDER SCRUB HANDLE & DIVIDER LINE
            ========================================================================= */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute inset-y-0 -ml-px w-0.5 bg-gradient-to-b from-white via-white/90 to-white pointer-events-none z-30"
        >
          {/* Circular Metallic Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-black/40">
            <SlidersHorizontal className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Bottom Percentage Readout Pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 z-30 pointer-events-none">
          <span>DRAG TO REVEAL • {Math.round(sliderPos)}%</span>
        </div>
      </div>
    </div>
  );
}
