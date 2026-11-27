"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
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
import {
  WeichieCurvedCarousel3D,
  WeichieCurvedCarouselHandle,
  CurvedSlideItem,
} from "@/components/common/WeichieCurvedCarousel3D";

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
  const carouselRef = useRef<WeichieCurvedCarouselHandle>(null);

  const total = founders.length;
  const safeActiveIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;

  const slideItems: CurvedSlideItem[] = useMemo(
    () =>
      founders.map((f) => ({
        id: f.id,
        title: f.name,
        subtitle: f.role,
        badge: f.badge,
        image: f.avatar,
        accentHex: "#F3E5AB",
        alignTop: true,
      })),
    [founders]
  );

  const navigateTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      carouselRef.current?.scrollToItem(nextIndex);
      sound.playPluck(180);
      haptics.selection();
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    navigateTo(safeActiveIndex - 1);
  }, [safeActiveIndex, navigateTo]);

  const handleNext = useCallback(() => {
    navigateTo(safeActiveIndex + 1);
  }, [safeActiveIndex, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (total === 0) return null;
  const activeFounder = founders[safeActiveIndex] || founders[0];

  return (
    <div className="w-full relative flex flex-col items-center overflow-x-clip">
      {/* 1. Exact Weichie.com 3D Curved Panorama WebGL Stage for Executive Founders */}
      <WeichieCurvedCarousel3D
        ref={carouselRef}
        items={slideItems}
        activeIndex={safeActiveIndex}
        onActiveChange={(idx) => setActiveIndex(idx)}
        planeWidth={1.38}
        planeHeight={1.78}
        borderRadius={0.08}
        bendAmount={0.12}
        carouselRadius={4.3}
        carouselTiltDeg={-13}
        autoRotateSpeed={-0.04}
        heightClassName="h-[285px] sm:h-[400px] md:h-[490px]"
        ariaLabel="3D Curved Carousel of Desi Muchads Executive Founders"
      />

      {/* 2. Weichie-style Synchronized Executive Roster Selector + Prev/Next */}
      <div className="flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible scrollbar-none gap-2.5 sm:gap-x-6 sm:gap-y-2 w-full px-4 mt-1 mb-4 pb-1 sm:pb-0">
        {founders.map((founder, fIdx) => {
          const isActive = fIdx === safeActiveIndex;
          return (
            <button
              key={founder.id}
              type="button"
              onClick={() => navigateTo(fIdx)}
              className={`inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer py-1.5 px-3 sm:px-0 rounded-full sm:rounded-none border sm:border-0 whitespace-nowrap shrink-0 ${isActive
                ? "text-white font-bold bg-white/10 sm:bg-transparent border-white/30"
                : "text-zinc-300 hover:text-white bg-white/[0.04] sm:bg-transparent border-white/15"
                }`}
            >
              <span
                aria-hidden="true"
                className={`w-2 h-2 rounded-full transition-transform duration-300 ${isActive
                  ? "bg-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.85)]"
                  : "bg-white/25 scale-90"
                  }`}
              />
              <span>
                {founder.name} · {founder.role}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full max-w-sm mt-1 mb-6 px-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Founder"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            {founders.map((f, dotIdx) => (
              <button
                key={f.id}
                type="button"
                onClick={() => navigateTo(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}: ${f.name}`}
                className="transition-all duration-300 rounded-full cursor-pointer min-h-[24px] px-1 flex items-center"
              >
                <span
                  aria-hidden="true"
                  className={`block h-1.5 rounded-full transition-all duration-300 ${dotIdx === safeActiveIndex
                    ? "w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    : "w-2 bg-white/25 hover:bg-white/50"
                    }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
            0{safeActiveIndex + 1} / 0{total} · Drag to spin
          </span>
        </div>

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
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[11px] font-mono text-[#F3E5AB] font-bold uppercase">
                    {activeFounder.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-1">
                  {activeFounder.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {activeFounder.socials.linkedin && (
                  <a
                    href={activeFounder.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${activeFounder.name} LinkedIn Profile`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
                    title="LinkedIn Profile"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                    </svg>
                  </a>
                )}
                {activeFounder.socials.email && (
                  <a
                    href={activeFounder.socials.email}
                    aria-label={`Email ${activeFounder.name}`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
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
                    aria-label={`${activeFounder.name} Engineering Portfolio`}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all shadow-sm"
                    title="Engineering Portfolio"
                  >
                    <Globe className="w-4 h-4 text-white" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              {activeFounder.bio}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider block mb-2 font-bold">
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
