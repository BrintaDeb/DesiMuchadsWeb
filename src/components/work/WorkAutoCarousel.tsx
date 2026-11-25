"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowRight,
  Sparkles,
  RotateCw,
  TrendingUp,
  Cpu,
  Target,
  CheckCircle2,
} from "lucide-react";
import { ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface WorkAutoCarouselProps {
  projects: ProjectItem[];
  onOpenPreview: (project: ProjectItem) => void;
  className?: string;
  autoPlayInterval?: number; // ms, default: 4500
}

/**
 * 3D Cylindrical Auto-Slide Carousel with Interactive Info Flipping & Physics
 * Engineered for mobile devices (iOS & Android) and high-end desktop displays.
 * Features:
 * - True 3D perspective space (perspective: 1200px) with cylindrical rotateY and translateZ.
 * - Interactive 3D Card Flip: Click "Specs / ROI" to spin card 180° for deep architectural breakdown.
 * - Speed presets: 3.0s (Fast) · 4.5s (Balanced) · 6.0s (Relaxed).
 * - Interactive 3D mouse tilt physics on desktop.
 * - iOS Safari & Android touch gesture navigation (touch-action: pan-y).
 * - High-accessibility 44px minimum tap targets.
 */
export function WorkAutoCarousel({
  projects,
  onOpenPreview,
  className = "",
  autoPlayInterval = 4500,
}: WorkAutoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Responsive mobile breakpoint check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = projects.length;

  // Safe navigation
  const navigateTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      setTilt({ x: 0, y: 0 });
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

  // Toggle 3D Card Flip for Info Specs vs Visual Mode
  const toggleCardFlip = (projectId: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playPluck(220);
    haptics.heavy();
    setFlippedCards((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

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

  // Touch swipe handling (optimized for iOS & Android)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    if (touchStartXRef.current !== null) {
      const delta = touchDeltaXRef.current;
      if (delta > 35) {
        handlePrev();
      } else if (delta < -35) {
        handleNext();
      }
      touchStartXRef.current = null;
      touchDeltaXRef.current = 0;
    }
  };

  // 3D Mouse Tilt on Desktop Center Card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Max 10 deg tilt
    const tiltX = -(y / (rect.height / 2)) * 8;
    const tiltY = (x / (rect.width / 2)) * 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeaveStage = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Auto-play timer (pauses on hover/drag and honors reduced-motion preference)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || isHovered || isDraggingRef.current || total <= 1) {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setTimeout(() => {
      handleNext();
    }, autoPlayInterval);

    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [isHovered, activeIndex, autoPlayInterval, total, handleNext]);

  if (total === 0) {
    return null;
  }

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div
      className={`w-full max-w-full relative flex flex-col items-center overflow-x-clip select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeaveStage}
    >
      {/* Main 3D Cylindrical Perspective Stage */}
      <div
        className="relative w-full h-[510px] sm:h-[560px] md:h-[600px] flex items-center justify-center my-2 touch-pan-y"
        style={{
          perspective: isMobile ? "900px" : "1200px",
          perspectiveOrigin: "center center",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic Ambient Glow Behind Active Card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-96 rounded-full bg-white/[0.04] blur-[130px] pointer-events-none" />

        {projects.map((proj, i) => {
          let offset = (i - activeIndex) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const isFlipped = Boolean(flippedCards[proj.id]);

          // Responsive 3D positioning calculations
          const xSpacing = isMobile ? 180 : 360;
          const translateX = offset * xSpacing;

          let rotateY = 0;
          let translateZ = 0;
          let scale = 1;
          let opacity = 1;
          let filter = "none";
          let zIndex = 30;

          if (isCenter) {
            rotateY = isMobile ? 0 : tilt.y;
            translateZ = 0;
            scale = 1;
            opacity = 1;
            filter = "none";
            zIndex = 40;
          } else if (absOffset === 1) {
            rotateY = offset > 0 ? -32 : 32;
            translateZ = isMobile ? -100 : -140;
            scale = isMobile ? 0.85 : 0.82;
            opacity = 0.65;
            filter = "blur(1px)";
            zIndex = 25;
          } else if (absOffset === 2) {
            rotateY = offset > 0 ? -48 : 48;
            translateZ = isMobile ? -200 : -260;
            scale = isMobile ? 0.72 : 0.68;
            opacity = 0.3;
            filter = "blur(3px)";
            zIndex = 15;
          } else {
            rotateY = offset > 0 ? -60 : 60;
            translateZ = -400;
            scale = 0.5;
            opacity = 0;
            filter = "blur(6px)";
            zIndex = 1;
          }

          // Active card tilt
          const rotateX = isCenter && !isMobile ? tilt.x : 0;

          return (
            <div
              key={proj.id}
              ref={isCenter ? cardRef : undefined}
              onClick={() => {
                if (!isCenter) navigateTo(i);
              }}
              tabIndex={isCenter ? 0 : -1}
              role="group"
              aria-label={`Project: ${proj.client}`}
              className={`absolute top-1/2 left-1/2 block rounded-3xl cursor-pointer group focus:outline-none transition-all duration-500 ease-out select-none ${
                isCenter
                  ? "shadow-[0_25px_70px_-10px_rgba(0,0,0,0.98)] ring-1 ring-white/25"
                  : "shadow-xl opacity-60"
              }`}
              style={{
                width: isMobile ? "295px" : "380px",
                height: isMobile ? "490px" : "550px",
                zIndex,
                opacity,
                filter,
                transformStyle: "preserve-3d",
                transform: `translate3d(calc(-50% + ${translateX}px), -50%, ${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`,
              }}
            >
              {/* 3D FLIPPABLE INNER CONTAINER */}
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* ============================================================== */}
                {/* FRONT FACE: CINEMATIC VISUAL + ESSENTIAL METRICS                */}
                {/* ============================================================== */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#121215] border border-white/20 rounded-3xl overflow-hidden flex flex-col justify-between"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* Media Thumbnail Section */}
                  <div className="relative w-full h-[52%] overflow-hidden bg-black/70">
                    <img
                      src={proj.thumbnail}
                      alt={proj.client}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-black/25 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-200 truncate max-w-[170px]">
                        {proj.category}
                      </span>

                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[9.5px] font-mono font-bold text-emerald-300">
                        {proj.year || "2026"}
                      </span>
                    </div>

                    {/* Interactive Inspect Button Overlay */}
                    {isCenter && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPreview(proj);
                        }}
                        className="absolute bottom-3 right-3 py-1.5 px-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/25 text-white hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 cursor-pointer flex items-center gap-1.5 text-[11px] font-mono z-10"
                        title="Open Interactive Fullscreen Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    )}

                    {/* Flip Hint Glyph on Top Right of Card Image */}
                    {isCenter && (
                      <button
                        type="button"
                        onClick={(e) => toggleCardFlip(proj.id, e)}
                        className="absolute bottom-3 left-3 py-1.5 px-2.5 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-1 text-[10.5px] font-mono font-bold z-10"
                        title="Click to Flip Card for ROI Breakdown"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Specs &amp; ROI ⟲</span>
                      </button>
                    )}
                  </div>

                  {/* Content Dossier Section */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-left space-y-2.5">
                    <div>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-tight leading-tight line-clamp-1 drop-shadow-md">
                        {proj.client}
                      </h3>
                      <p className="font-sans text-xs text-zinc-300 line-clamp-2 mt-1 leading-snug">
                        {proj.tagline}
                      </p>
                    </div>

                    {/* Verified Impact Metric */}
                    {proj.heroStat && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-300">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{proj.heroStat}</span>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {proj.techStack.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCenter) {
                            onOpenPreview(proj);
                          } else {
                            navigateTo(i);
                          }
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono uppercase tracking-wider text-center transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>

                      <Link
                        href={`/work/${proj.slug}`}
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault();
                            navigateTo(i);
                          }
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-black uppercase tracking-wider text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 min-h-[44px]"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ============================================================== */}
                {/* BACK FACE: OPERATIONAL ARCHITECTURAL SPECS & ROI DOSSIER        */}
                {/* ============================================================== */}
                <div
                  className="absolute inset-0 w-full h-full bg-[#0c0c0e] border border-emerald-500/40 rounded-3xl p-5 sm:p-6 flex flex-col justify-between text-left overflow-y-auto scrollbar-none shadow-[inset_0_0_40px_rgba(16,185,129,0.06)]"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="space-y-4">
                    {/* Header with Close / Flip Button */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/15">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                          OPERATIONAL SPECS &amp; ROI
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleCardFlip(proj.id, e)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                        title="Return to Visual Mode"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Visual ⟲</span>
                      </button>
                    </div>

                    {/* Client & Discipline */}
                    <div>
                      <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">
                        {proj.client}
                      </h4>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        Category: {proj.category} • Year: {proj.year}
                      </p>
                    </div>

                    {/* Hero Metric Highlight Card */}
                    {proj.heroStat && (
                      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                          Verified Growth Multiplier:
                        </span>
                        <div className="flex items-center gap-2 text-emerald-300 font-display font-black text-lg">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span>{proj.heroStat}</span>
                        </div>
                      </div>
                    )}

                    {/* Problem Solved & Strategy */}
                    <div className="space-y-1.5 font-sans">
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Core Architectural Deliverables:</span>
                      </span>
                      <ul className="space-y-1 text-xs text-zinc-300">
                        {proj.deliverables.slice(0, 3).map((d, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-tight">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Complete Tech Stack */}
                    <div className="space-y-1.5">
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Tech &amp; Ad Stack:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[9.5px] font-mono text-zinc-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions on Back Face */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/15">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPreview(proj);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono uppercase tracking-wider text-center transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>

                    <Link
                      href={`/work/${proj.slug}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-display font-black uppercase tracking-wider text-center transition-all shadow-lg active:scale-95 flex items-center justify-center gap-1.5 min-h-[44px]"
                    >
                      <span>Full Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Ambient Bottom Reflection on Active Card */}
              {isCenter && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 bg-white/25 blur-md opacity-70"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Interactive Navigation Controls & Dot Scrubber */}
      <div className="flex items-center justify-between w-full max-w-md mt-2 mb-6 px-4">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Project Slide"
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg min-w-[44px] min-h-[44px]"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Scrubbable Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] px-2 py-1 scrollbar-none">
          {projects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => navigateTo(dotIdx)}
              aria-label={`Slide to project ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                dotIdx === activeIndex
                  ? "w-7 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "w-2 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Project Slide"
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg min-w-[44px] min-h-[44px]"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 4. Synchronized Minimal Focus Dossier Card */}
      <div className="w-full max-w-3xl px-4 sm:px-6">
        <SpotlightCard
          isGlass={true}
          className="rounded-2xl p-5 sm:p-6 border border-white/15 bg-[#121215]/90 shadow-xl transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left">
            <div className="space-y-2.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  ACTIVE CASE STUDY · 0{activeIndex + 1}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {activeProject.category}
                </span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight truncate">
                {activeProject.client}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {activeProject.desc}
              </p>

              {/* Minimal Deliverable Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.deliverables.slice(0, 3).map((deliv, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10.5px] font-mono text-zinc-300"
                  >
                    {deliv}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex sm:flex-col items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenPreview(activeProject)}
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick Inspect</span>
              </button>

              <Link
                href={`/work/${activeProject.slug}`}
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Read Full Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
