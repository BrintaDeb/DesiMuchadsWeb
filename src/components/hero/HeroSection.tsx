"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ThreeHeroCenterpiece } from "./ThreeHeroCenterpiece";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { BreydaqsButton } from "../common/BreydaqsButton";

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
  const [isDominateHovered, setIsDominateHovered] = useState(false);
  const lastConfettiTime = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % ROTATING_KEYWORDS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleDominateHover = (e: React.MouseEvent) => {
    sound.playPluck(220);
    haptics.selection();
    setIsDominateHovered(true);

    const now = Date.now();
    if (now - lastConfettiTime.current > 1600) {
      lastConfettiTime.current = now;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 55,
        startVelocity: 22,
        origin: { x, y },
        colors: ["#D4AF37", "#F3E5AB", "#DFB76C", "#FFFFFF", "#C5A059"],
        ticks: 100,
        gravity: 0.8,
        scalar: 0.8,
      });
    }
  };

  const handleDominateClick = (e: React.MouseEvent) => {
    sound.playChime();
    haptics.heavy();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { x, y },
      colors: ["#D4AF37", "#F3E5AB", "#DFB76C", "#FFFFFF", "#C5A059"],
    });
  };

  return (
    <section className="relative min-h-[90vh] pt-20 sm:pt-32 lg:pt-40 pb-12 sm:pb-24 lg:pb-28 flex items-center overflow-hidden bg-transparent text-[#e8e8e3] font-display">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Monumental Breydaqs Headline & Proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            {/* Monumental Headline with Editorial Italic Accent */}
            <h1 className="font-display font-black text-[28px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.035em] text-white uppercase leading-[1.0] sm:leading-[0.92]">
              WE ENGINEER BRANDS THAT{" "}
              <Link
                href="/contact"
                onMouseEnter={handleDominateHover}
                onMouseLeave={() => setIsDominateHovered(false)}
                onClick={handleDominateClick}
                aria-label="dominate - Click to Contact Us"
                className="group relative inline-block cursor-pointer select-none font-editorial font-normal lowercase tracking-normal transition-all duration-300"
              >
                {/* Floating Holographic Telemetry Pill on Hover */}
                <span
                  className={`absolute -top-7 sm:-top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-[0.2rem] bg-[#0c0c0b]/95 border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] backdrop-blur-md font-mono text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap pointer-events-none transition-all duration-200 flex items-center gap-1.5 ${
                    isDominateHovered
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-2 scale-95"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                  <span className="text-[#F3E5AB] font-black">CONTACT US</span>
                  <span className="text-zinc-400">→ SCHEDULE CALL ↗</span>
                </span>

                {/* Kinetic Matte Gold Arrow */}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2.5 text-[#D4AF37] group-hover:text-[#F3E5AB] mr-1 sm:mr-2">
                  →
                </span>

                {/* Matte Gold Text with Velvet Luster Glow */}
                <span className="relative inline-block transition-all duration-300 group-hover:scale-[1.04] bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#C5A059] group-hover:from-[#FFF2B2] group-hover:via-[#F3E5AB] group-hover:to-[#DFB76C] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_0_35px_rgba(212,175,55,0.75)]">
                  dominate.
                </span>

                {/* Bottom Matte Gold Kinetic Underline */}
                <span
                  className={`absolute bottom-1 sm:bottom-2 left-0 w-full h-[2px] sm:h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B38F39] transition-all duration-300 origin-left ${
                    isDominateHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  }`}
                />
              </Link>
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
            <p className="text-xs sm:text-base md:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl font-sans">
              Desi Muchads engineers ruthless performance marketing architectures, viral digital storytelling, sub-second web platforms, and hyper-growth Quick Commerce campaigns for ambitious global brands.
            </p>

            {/* Breydaqs Kinetic Double-Slide Action Buttons */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full">
              <BreydaqsButton
                onClick={onOpenKundli}
                variant="white"
                className="w-full sm:w-auto py-3.5 px-6 sm:px-7 text-xs sm:text-sm min-h-[48px]"
              >
                REQUEST GROWTH AUDIT
              </BreydaqsButton>

              <BreydaqsButton
                href="#work"
                variant="dark"
                className="w-full sm:w-auto py-3.5 px-6 sm:px-7 text-xs sm:text-sm min-h-[48px]"
              >
                SELECTED WORKS
              </BreydaqsButton>
            </div>

            {/* Breydaqs Monospace Technical Specifications Grid */}
            <div className="pt-4 sm:pt-6 border-t border-[rgba(232,232,227,0.12)] grid grid-cols-3 gap-1.5 sm:gap-4 font-mono text-[9px] sm:text-xs text-center sm:text-left">
              <div className="min-w-0">
                <span className="text-zinc-500 text-[8px] sm:text-[10px] block uppercase font-bold truncate">
                  PORTFOLIO GMV
                </span>
                <span className="text-white font-bold text-[11px] sm:text-base block truncate">
                  ₹140Cr+ Scaled
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-zinc-500 text-[8px] sm:text-[10px] block uppercase font-bold truncate">
                  AVERAGE ROAS
                </span>
                <span className="text-emerald-400 font-bold text-[11px] sm:text-base block truncate">
                  5.4X Blended
                </span>
              </div>
              <div className="min-w-0">
                <span className="text-zinc-500 text-[8px] sm:text-[10px] block uppercase font-bold truncate">
                  ACTIVE BRANDS
                </span>
                <span className="text-white font-bold text-[11px] sm:text-base block truncate">
                  200+ Partners
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece on Matte Carbon */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-1 sm:mt-4 lg:mt-0 max-w-full">
            <div className="w-full max-w-xs sm:max-w-lg relative flex flex-col items-center justify-center">
              <ThreeHeroCenterpiece />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
