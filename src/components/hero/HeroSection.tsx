"use client";

import React, { useState, useEffect } from "react";
import { ThreeHeroCenterpiece } from "./ThreeHeroCenterpiece";
import { ConstellationCanvas } from "./ConstellationCanvas";
import { sound } from "@/lib/sound";
import { BreydaqsButton } from "../common/BreydaqsButton";
import { WinterSalePillBadge } from "../common/WinterSalePillBadge";

interface HeroSectionProps {
  onOpenKundli: () => void;
}

const ROTATING_KEYWORDS = [
  "HIGH-ROAS PERFORMANCE",
  "NEXT.JS 16 WEB PLATFORMS",
  "QUICK COMMERCE ENGINES",
  "VIRAL VISUAL IDENTITY",
  "ENTERPRISE AUTOMATIONS",
];

export function HeroSection({ onOpenKundli }: HeroSectionProps) {
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 sm:pb-28 flex items-center overflow-hidden bg-[#080807] text-[#e8e8e3] font-display border-b border-[rgba(232,232,227,0.12)]">
      {/* Authentic Indian Cultural Pichwai & Kalamkari Artistry Drawing Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Authentic Indian Cultural Heritage Artistry"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-transparent to-[#080807]/80" />
      </div>

      {/* Interactive Micro-Star Constellation Canvas */}
      <ConstellationCanvas />

      {/* Atmospheric Carbon Radiance */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/[0.025] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-white/[0.02] blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Winter Scale National Expansion Pill Badge & Stage 01 Indicator */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
          <WinterSalePillBadge />
          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="text-zinc-600">—</span>
            <span className="text-white font-bold tracking-widest uppercase">
              [ 01 / ARCHITECTURE ]
            </span>
            <span className="text-zinc-600">—</span>
            <span className="tracking-wider uppercase text-zinc-400">
              SYSTEMS BUILT TO → <span className="text-white font-bold">SCALE</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Monumental Breydaqs Headline & Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Monumental Headline with Editorial Italic Accent */}
            <h1 className="font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.035em] text-white uppercase leading-[0.95] sm:leading-[0.92]">
              WE ENGINEER BRANDS THAT <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ dominate.</span>
            </h1>

            {/* Kinetic Rotating Focus Reel */}
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-zinc-300">
              <span className="text-zinc-500 uppercase tracking-widest font-bold">
                FOCUS:
              </span>
              <div className="h-6 overflow-hidden relative inline-flex items-center">
                <span
                  key={keywordIndex}
                  className="font-bold tracking-wider text-emerald-400 uppercase animate-in slide-in-from-bottom-2 duration-300"
                >
                  {ROTATING_KEYWORDS[keywordIndex]}
                </span>
              </div>
            </div>

            {/* Subhead Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl font-sans">
              Desi Muchads engineers ruthless performance marketing architectures, viral digital storytelling, sub-second web platforms, and hyper-growth Quick Commerce campaigns for ambitious global brands.
            </p>

            {/* Breydaqs Kinetic Double-Slide Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <BreydaqsButton
                onClick={onOpenKundli}
                variant="white"
                className="w-full sm:w-auto py-3.5 px-7 text-xs sm:text-sm min-h-[48px]"
              >
                REQUEST GROWTH AUDIT
              </BreydaqsButton>

              <BreydaqsButton
                href="#work"
                variant="dark"
                className="w-full sm:w-auto py-3.5 px-7 text-xs sm:text-sm min-h-[48px]"
              >
                SELECTED WORKS
              </BreydaqsButton>
            </div>

            {/* Breydaqs Monospace Technical Specifications Grid */}
            <div className="pt-6 border-t border-[rgba(232,232,227,0.12)] grid grid-cols-3 gap-2 sm:gap-4 font-mono text-[10px] sm:text-xs">
              <div className="min-w-0">
                <span className="text-zinc-500 text-[9px] sm:text-[10px] block uppercase font-bold truncate">
                  PORTFOLIO GMV
                </span>
                <span className="text-white font-bold text-xs sm:text-base block truncate">
                  ₹140Cr+ Scaled
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-zinc-500 text-[9px] sm:text-[10px] block uppercase font-bold truncate">
                  AVERAGE ROAS
                </span>
                <span className="text-emerald-400 font-bold text-xs sm:text-base block truncate">
                  5.4X Blended
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-zinc-500 text-[9px] sm:text-[10px] block uppercase font-bold truncate">
                  ACTIVE BRANDS
                </span>
                <span className="text-white font-bold text-xs sm:text-base block truncate">
                  200+ Partners
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece on Matte Carbon */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-4 lg:mt-0 overflow-hidden max-w-full">
            <div className="w-full max-w-sm sm:max-w-lg relative flex flex-col items-center justify-center overflow-hidden">
              {/* Rotating subtle architectural halo ring */}
              <div
                className="absolute inset-0 rounded-full border border-white/10 animate-spin-slow opacity-25 pointer-events-none"
                style={{ animationDuration: "50s" }}
              />
              <div className="absolute inset-4 rounded-full bg-white/5 blur-3xl opacity-30 pointer-events-none" />
              {/* Radial Pedestal Glow */}
              <div className="absolute -bottom-4 w-3/4 h-8 bg-white/10 blur-xl rounded-full pointer-events-none" />
              <ThreeHeroCenterpiece />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
