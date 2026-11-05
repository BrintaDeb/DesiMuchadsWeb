"use client";

import React from "react";
import { MandalaStamp, JharokhaArchSVG } from "../common/Icons";
import { ThreeHeroCenterpiece } from "./ThreeHeroCenterpiece";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  onOpenKundli: () => void;
}

export function HeroSection({ onOpenKundli }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col justify-between items-center overflow-hidden">
      {/* Background Royal Indigo Depth & Ambient Vignette */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-radial from-[#141829]/70 via-[#0D0C12] to-[#07070A]" />
      
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#E11D48]/10 blur-[130px] pointer-events-none" />

      {/* Rotating corner mandala stamps */}
      <div className="absolute top-24 left-8 sm:left-16 opacity-15 pointer-events-none animate-spin-slow hidden md:block">
        <MandalaStamp className="w-28 h-28 text-[#D4AF37]" />
      </div>
      <div className="absolute top-24 right-8 sm:right-16 opacity-15 pointer-events-none animate-spin-slow hidden md:block" style={{ animationDirection: "reverse" }}>
        <MandalaStamp className="w-28 h-28 text-[#D4AF37]" />
      </div>

      {/* Main Jharokha Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-auto text-center flex flex-col items-center">
        {/* Subtle Jharokha arch SVG outline in background */}
        <div className="absolute inset-0 -top-6 -bottom-6 pointer-events-none opacity-20 -z-10 flex items-center justify-center">
          <JharokhaArchSVG className="w-full h-full max-w-2xl text-[#D4AF37]" />
        </div>

        {/* Top Badges */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            INDIA&apos;S PREMIER HIGH-ROAS MARKETING DARBAR
          </span>
          <span className="font-mono text-xs text-[#F5DE88]">✦</span>
        </div>

        {/* 3D Interactive Moustache Centerpiece (React Three Fiber / Three.js) */}
        <ThreeHeroCenterpiece />

        {/* Monumental Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#F7F1E5] max-w-4xl mx-auto mt-2">
          Unapologetic Desi Roots.{" "}
          <span className="brass-gradient-text block mt-1">
            Ruthless Global ROI.
          </span>
        </h1>

        {/* Value Proposition Subtitle */}
        <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-[#F7F1E5]/80 font-normal leading-relaxed">
          More than just a proud moustache—we bring <strong className="text-[#D4AF37] font-semibold">MUCH ADS</strong>,
          razor-sharp branding, and cultural dominance to brands ready to rule the market with swagger.
        </p>

        {/* Live Metrics Quick Stat Ribbon */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-xs text-[#F7F1E5]/90">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0D9488]" />
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base">₹140Cr+</span>
            <span className="text-white/60">Revenue Scaled</span>
          </div>
          <div className="hidden sm:block text-[#D4AF37]/30">✦</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base">4.8x</span>
            <span className="text-white/60">Average ROAS</span>
          </div>
          <div className="hidden sm:block text-[#D4AF37]/30">✦</div>
          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] text-sm">〰️</span>
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base">100%</span>
            <span className="text-white/60">Shuddh Strategy</span>
          </div>
        </div>

        {/* Dual Conversion Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none">
          {/* Primary CTA */}
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            onMouseEnter={() => sound.playPluck(150)}
            type="button"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#C84B31] to-[#E11D48] text-[#F7F1E5] font-bold text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(225,29,72,0.5)] hover:shadow-[0_0_40px_rgba(225,29,72,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>Get Your Free Brand Kundli (Audit)</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <a
            href="#karname"
            onMouseEnter={() => sound.playPluck(120)}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[#D4AF37]/50 bg-[#0D0C12]/80 hover:bg-[#D4AF37]/15 text-[#D4AF37] hover:text-[#F5DE88] font-semibold text-sm sm:text-base transition-all duration-300 backdrop-blur-md"
          >
            <span>Explore Our Karname</span>
            <span className="w-6 h-6 rounded-full border border-[#D4AF37]/60 flex items-center justify-center group-hover:rotate-45 transition-transform">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Infinite Kinetic Marquee Ribbon (Angled at -2deg Indian Truck-Art Style) */}
      <div className="w-full mt-16 sm:mt-24 overflow-hidden -rotate-2 bg-gradient-to-r from-[#D4AF37] via-[#F5DE88] to-[#D4AF37] text-[#0D0C12] py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(212,175,55,0.25)] border-y-2 border-[#0D0C12]">
        <div className="animate-marquee flex items-center whitespace-nowrap font-display font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase select-none">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-6 mx-4">
              <span>PERFORMANCE MARKETING</span>
              <span className="text-[#C84B31]">✦</span>
              <span>DESI BRANDING & PACKAGING</span>
              <span className="text-[#C84B31]">✦</span>
              <span>VIRAL REELS & CONTENT</span>
              <span className="text-[#C84B31]">✦</span>
              <span>3D WEB EXPERIENCES</span>
              <span className="text-[#C84B31]">✦</span>
              <span>SEO & GEO SEARCH DOMINANCE</span>
              <span className="text-[#C84B31]">✦</span>
              <span>INFLUENCER DARBAR</span>
              <span className="text-[#C84B31]">✦</span>
              <span>HIGH ROAS FUNNELS</span>
              <span className="text-[#C84B31]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

