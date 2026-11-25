"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Globe,
  Award,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

export interface Founder {
  id: number;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  avatar: string;
  tileBgClass?: string;
  badge: string;
  disciplines: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    email?: string;
    portfolio?: string;
  };
}

interface FounderSlideCarouselProps {
  founders: Founder[];
}

export function FounderSlideCarousel({ founders }: FounderSlideCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = founders.length;

  const navigateTo = useCallback(
    (index: number) => {
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      sound.playPluck(180);
      haptics.selection();
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    navigateTo(activeIndex - 1);
  }, [activeIndex, navigateTo]);

  const handleNext = useCallback(() => {
    navigateTo(activeIndex + 1);
  }, [activeIndex, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null) {
      const delta = touchDeltaXRef.current;
      if (delta > 45) {
        handlePrev();
      } else if (delta < -45) {
        handleNext();
      }
      touchStartXRef.current = null;
      touchDeltaXRef.current = 0;
    }
  };

  const activeFounder = founders[activeIndex];

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* 1. Main Aller Studio Style 3D Sliding Picture Stage */}
      <div
        className="relative w-full h-[400px] sm:h-[450px] md:h-[480px] flex items-center justify-center overflow-hidden sm:overflow-visible select-none touch-pan-y my-4"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Ambient Depth Light behind active card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 rounded-full bg-white/[0.04] blur-[100px] pointer-events-none" />

        {founders.map((founder, i) => {
          // Calculate offset (-1, 0, 1) relative to activeIndex for 3 items
          let offset = (i - activeIndex) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;

          // Aller Studio exact transform calculations
          const xDistance = isMobile ? 180 : 275;
          const translateX = offset * xDistance;
          const scale = isCenter ? 1 : 0.8;
          const opacity = isCenter ? 1 : 0.72;
          const blur = isCenter ? "none" : "blur(2.5px)";
          const zIndex = isCenter ? 10 : 8;

          return (
            <button
              key={founder.id}
              type="button"
              onClick={() => {
                if (!isCenter) navigateTo(i);
              }}
              tabIndex={isCenter ? 0 : -1}
              aria-label={`View ${founder.name}`}
              className={`absolute top-1/2 left-1/2 block rounded-3xl overflow-hidden cursor-pointer group focus:outline-none transition-all ${isCenter ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]" : "shadow-xl"
                }`}
              style={{
                width: isMobile ? "240px" : "290px",
                height: isMobile ? "350px" : "415px",
                zIndex,
                opacity,
                filter: blur,
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                transition:
                  "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Card Container Frame */}
              <div
                className={`relative w-full h-full ${founder.tileBgClass || "bg-[#0d0d12]"
                  } border border-white/20 rounded-3xl overflow-hidden group-hover:border-white/40 transition-colors`}
              >
                <img
                  src={founder.avatar}
                  alt={founder.name}
                  draggable={false}
                  style={{ height: "100%", blockSize: "100%" }}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Cinematic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 pointer-events-none" />

                {/* Top Badge: Executive Role */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] font-mono font-bold tracking-wider text-white uppercase shadow-lg">
                    {founder.badge}
                  </span>
                </div>

                {/* Bottom Overlay Label on Card */}
                <div className="absolute bottom-4 inset-x-4 z-20 text-left">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block uppercase tracking-wider mb-0.5">
                    {founder.role}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-none drop-shadow-md">
                    {founder.name}
                  </h3>
                </div>

                {/* Ambient Soft Bottom Glow (Aller Studio Detail) */}
                {isCenter && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-3 -bottom-4 h-8 bg-white/20 blur-lg transition-opacity duration-700 opacity-60"
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Navigation Controls & Pagination */}
      <div className="flex items-center justify-between w-full max-w-sm mt-3 mb-6 px-4">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Founder"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Pagination Indicator (01 / 03) with Segmented Dots */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            {founders.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => navigateTo(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${dotIdx === activeIndex
                  ? "w-7 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "w-2 h-1.5 bg-white/25 hover:bg-white/50"
                  }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Founder"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 3. Synchronized Detailed Founder Profile Dossier */}
      <div className="w-full max-w-2xl px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFounder.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md shadow-2xl text-left space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    {activeFounder.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                    {activeFounder.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                  {activeFounder.tagline}
                </p>
              </div>

              {/* Direct Social / Connect Links */}
              <div className="flex items-center gap-2 shrink-0">
                {activeFounder.socials.linkedin && (
                  <a
                    href={activeFounder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                    </svg>
                  </a>
                )}
                {activeFounder.socials.email && (
                  <a
                    href={activeFounder.socials.email}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
                    title="Direct Email"
                  >
                    <Mail className="w-4 h-4 text-white" />
                  </a>
                )}
                {activeFounder.socials.portfolio && (
                  <a
                    href={activeFounder.socials.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
                    title="Engineering Portfolio"
                  >
                    <Globe className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>
            </div>

            {/* Strategic Bio */}
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {activeFounder.bio}
            </p>

            {/* Core Disciplines Badges */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2 font-bold">
                CORE TECHNICAL &amp; STRATEGIC DISCIPLINES
              </span>
              <div className="flex flex-wrap gap-2">
                {activeFounder.disciplines.map((d, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1.5"
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{d}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
