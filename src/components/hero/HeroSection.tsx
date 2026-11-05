"use client";

import React, { useState } from "react";
import { MandalaStamp, JharokhaArchSVG } from "../common/Icons";
import { ThreeHeroCenterpiece } from "./ThreeHeroCenterpiece";
import { ArrowRight, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface HeroSectionProps {
  onOpenKundli: () => void;
}

export function HeroSection({ onOpenKundli }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      eyebrow: "PERFORMANCE MARKETING AGENCY FOR E-COMMERCE GROWTH",
      mainTitle: "HIGH-ROAS MARKETING",
      subTitle: "INDIAN STYLE",
      desc: "We love digital. We’re experts in brand-building experiences and results-driven marketing — combining authentic cultural storytelling with ruthless multi-channel media buying.",
    },
    {
      eyebrow: "UNSHAKABLE TRUST • MEASURABLE DOMINANCE",
      mainTitle: "WHERE DESI SWAGGER",
      subTitle: "MEETS RUTHLESS ROI",
      desc: "We don't sell vanity metrics. Every Rupee deployed across Meta, Google, and YouTube is engineered like a disciplined investment to print compounding returns.",
    },
    {
      eyebrow: "WE WORK WITH YOU, NOT SIMPLY FOR YOU",
      mainTitle: "MORE THAN AN AGENCY",
      subTitle: "A GROWTH PARTNER",
      desc: "From bespoke brand packaging granth to ultra-fast Next.js 3D web storefronts, we build the digital infrastructure for ambitious consumer brands to rule the market.",
    },
  ];

  const handleNextSlide = () => {
    sound.playPluck(160);
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    sound.playPluck(140);
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[activeSlide];

  return (
    <section className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col justify-between items-center overflow-hidden bg-[#1C1815] text-[#EFE7DA]">
      {/* Background Deep Roasted Espresso Gradient & Vignette */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#14110E] via-[#1C1815] to-[#14110E]" />

      {/* Ambient warm amber glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#C84B31]/10 blur-[140px] pointer-events-none" />

      {/* Rotating corner mandala stamps */}
      <div className="absolute top-24 left-8 sm:left-16 opacity-15 pointer-events-none animate-spin-slow hidden md:block">
        <MandalaStamp className="w-28 h-28 text-[#D4AF37]" />
      </div>
      <div className="absolute top-24 right-8 sm:right-16 opacity-15 pointer-events-none animate-spin-slow hidden md:block" style={{ animationDirection: "reverse" }}>
        <MandalaStamp className="w-28 h-28 text-[#D4AF37]" />
      </div>

      {/* Main Jharokha Container */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 my-auto text-center flex flex-col items-center">
        {/* Jharokha arch background outline */}
        <div className="absolute inset-0 -top-6 -bottom-6 pointer-events-none opacity-20 -z-10 flex items-center justify-center">
          <JharokhaArchSVG className="w-full h-full max-w-2xl text-[#D4AF37]" />
        </div>

        {/* Top Eyebrow Tagline & Official Crest Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(239,231,218,0.25)] bg-[rgba(239,231,218,0.05)] backdrop-blur-md mb-4 shadow-sm">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-[#D4AF37] shadow-sm bg-[#10223D] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand-logo.jpg"
              alt="Desi Muchads Emblem"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-body text-[10.5px] uppercase tracking-[0.22em] text-[#EFE7DA] font-medium">
            {current.eyebrow}
          </span>
          <span className="text-[#D4AF37]">✦</span>
        </div>

        {/* 3D Interactive Moustache Centerpiece (React Three Fiber / Three.js) */}
        <ThreeHeroCenterpiece />

        {/* Monumental Desi Vibes Cormorant Garamond Heading */}
        <div className="my-2 max-w-4xl mx-auto">
          <h1 className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.03em] uppercase leading-[0.92] text-[#EFE7DA]">
            {current.mainTitle}{" "}
            <span className="block italic font-normal text-[#D4AF37] mt-1 font-display">
              {current.subTitle}
            </span>
          </h1>
        </div>

        {/* Desi Vibes Poppins Subtitle */}
        <p className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base md:text-lg text-[#EFE7DA]/80 font-body font-light leading-relaxed">
          {current.desc}
        </p>

        {/* Live Metrics Quick Stat Ribbon */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-body text-xs text-[#EFE7DA]/90">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0D9488]" />
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base font-mono">₹140Cr+</span>
            <span className="text-[#EFE7DA]/60 uppercase tracking-wider text-[11px]">Revenue Scaled</span>
          </div>
          <div className="hidden sm:block text-[#D4AF37]/30">✦</div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base font-mono">4.8x</span>
            <span className="text-[#EFE7DA]/60 uppercase tracking-wider text-[11px]">Blended ROAS</span>
          </div>
          <div className="hidden sm:block text-[#D4AF37]/30">✦</div>
          <div className="flex items-center gap-2">
            <span className="text-[#C84B31] text-sm">〰️</span>
            <span className="text-[#D4AF37] font-bold text-sm sm:text-base font-mono">100%</span>
            <span className="text-[#EFE7DA]/60 uppercase tracking-wider text-[11px]">Shuddh Strategy</span>
          </div>
        </div>

        {/* Minimalist Circular Outline Slide Indicators (Desi Vibes Style) */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={handlePrevSlide}
            className="w-9 h-9 rounded-full border border-[rgba(239,231,218,0.4)] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#EFE7DA] transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  sound.playPluck(150);
                  setActiveSlide(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === i
                    ? "w-7 h-2 bg-[#D4AF37]"
                    : "w-2 h-2 border border-[rgba(239,231,218,0.5)] bg-transparent hover:bg-white/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNextSlide}
            className="w-9 h-9 rounded-full border border-[rgba(239,231,218,0.4)] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center text-[#EFE7DA] transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
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
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-[#EFE7DA] font-body font-semibold text-xs tracking-widest uppercase shadow-[0_0_30px_rgba(200,75,49,0.5)] hover:shadow-[0_0_40px_rgba(200,75,49,0.8)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span>Buzz Us Now (Let&apos;s Talk)</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <a
            href="#karname"
            onMouseEnter={() => sound.playPluck(120)}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-[rgba(239,231,218,0.35)] bg-[rgba(28,24,21,0.6)] hover:bg-[#D4AF37]/15 text-[#EFE7DA] hover:text-[#D4AF37] font-body font-medium text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md"
          >
            <span>Explore Karname (Work)</span>
            <span className="w-6 h-6 rounded-full border border-[rgba(239,231,218,0.4)] flex items-center justify-center group-hover:rotate-45 transition-transform text-xs">
              ↗
            </span>
          </a>
        </div>
      </div>

      {/* Infinite Kinetic Marquee Ribbon (Angled at -2deg Indian Truck-Art Style) */}
      <div className="w-full mt-16 sm:mt-24 overflow-hidden -rotate-2 bg-gradient-to-r from-[#D4AF37] via-[#F5DE88] to-[#D4AF37] text-[#1C1815] py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(212,175,55,0.25)] border-y-2 border-[#1C1815]">
        <div className="animate-marquee flex items-center whitespace-nowrap font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase select-none">
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
