"use client";

import React from "react";
import { ThreeHeroCenterpiece } from "./ThreeHeroCenterpiece";
import { TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  onOpenKundli: () => void;
}

export function HeroSection({ onOpenKundli }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] pt-28 sm:pt-40 pb-16 sm:pb-20 flex items-center overflow-hidden bg-[#0e164c] text-white font-display">
      {/* Subtle Starry Night Particle Accents (Pure CSS, No Media) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/6 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-[#FFC400] rounded-full shadow-[0_0_10px_#FFC400]" />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-1/5 right-1/4 w-1.5 h-1.5 bg-[#FFC400] rounded-full shadow-[0_0_10px_#FFC400]" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full" />
        <div className="absolute top-1/6 right-1/6 w-1 h-1 bg-white rounded-full" />
      </div>

      {/* Ambient Deep Blue & Gold Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#142161]/50 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#F36700]/10 blur-[140px] pointer-events-none" />

      {/* Authentic Indian Cultural Pichwai & Kalamkari Artistry Drawing Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.09] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Indian Cultural Heritage Artistry"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e164c] via-transparent to-[#0e164c]/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Hero Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Badge with Brand Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
              <div className="w-4 h-4 rounded-full overflow-hidden border border-[#FFC400] bg-[#0e164c] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-royal font-bold uppercase tracking-widest text-[#FFC400]">
                E-COMMERCE &amp; D2C GROWTH
              </span>
            </div>

            {/* Giant Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.08]">
              Performance marketing agency for e-commerce growth
            </h1>

            {/* Subhead Paragraph */}
            <p className="text-sm sm:text-base md:text-lg text-white/80 font-normal leading-relaxed max-w-xl">
              We love digital. We’re experts in brand-building experiences and results-driven marketing — turning ambitious consumer brands into category kings.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                type="button"
                className="px-8 py-3.5 sm:py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 group active:scale-95 min-h-[48px]"
              >
                <span>LET&apos;S TALK</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">&gt;</span>
              </button>

              <a
                href="#karname"
                className="px-8 py-3.5 sm:py-4 rounded border border-white/20 hover:border-white/50 text-white font-display text-xs sm:text-sm font-bold tracking-wider uppercase transition-all hover:bg-white/5 flex items-center justify-center min-h-[48px]"
              >
                OUR WORK
              </a>
            </div>

            {/* Trust Proof Checklist */}
            <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/70 font-medium tracking-wide">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0" />
                <span>8+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0" />
                <span>200+ Happy Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFC400] shrink-0" />
                <span>₹140Cr+ Scaled</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Feathered Moustache Centerpiece on Deep Navy */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-4 lg:mt-0">
            <div className="w-full max-w-sm sm:max-w-lg relative flex items-center justify-center">
              {/* Subtle halo ring behind 3D object */}
              <div className="absolute inset-4 rounded-full bg-[#142161] blur-2xl opacity-60 pointer-events-none" />
              <ThreeHeroCenterpiece />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
