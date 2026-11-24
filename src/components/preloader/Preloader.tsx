"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RoyalLotusMandala,
  RoyalPaisleyCorner,
  RoyalJharokhaArch,
  RoyalToranDivider,
  IndianFloralFlourish,
  RoyalPalatialJaaliTapestry,
} from "../common/IndianArtPatterns";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { Sparkles } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

const CULTURAL_STAGES = [
  {
    threshold: 25,
    title: "LIGHTING THE SACRED LAMPS OF HERITAGE",
    sanskrit: "दीप प्रज्वलन · दीपज्योतिर्नमोऽस्तुते",
    description: "Invoking timeless Indian artistic traditions and classical aesthetic mastery...",
  },
  {
    threshold: 50,
    title: "WEAVING ROYAL MOTIFS & ARTISANAL CRAFT",
    sanskrit: "शिल्प एवं सृजन · कला संस्कृति",
    description: "Curating bespoke vector craftsmanship and regal Indian visual identities...",
  },
  {
    threshold: 75,
    title: "HARMONIZING TIMELESS DESIGN & MODERN SCALE",
    sanskrit: "सौन्दर्य एवं उत्कृष्टता · विजयते",
    description: "Uniting classical heritage artistry with contemporary digital presence...",
  },
  {
    threshold: 100,
    title: "PRESENTING DESI MUCHADS DIGITAL ATELIER",
    sanskrit: "शुभ स्वागतम् · आनंदम्",
    description: "Welcome to the digital headquarters of Desi Muchads...",
  },
];

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hasSkipped, setHasSkipped] = useState(false);
  const audioMilestoneRef = useRef<number>(0);

  // Fast-Forward to 100% instantly on click, tap, or Space key
  const fastForward = useCallback(() => {
    if (isDone || hasSkipped) return;
    setHasSkipped(true);
    setProgress(100);
    sound.playChime();
    haptics.success();
    setTimeout(() => {
      setIsDone(true);
      setTimeout(onComplete, 850);
    }, 200);
  }, [isDone, hasSkipped, onComplete]);

  // Keyboard shortcut listener (Space, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter" || e.key === "Escape") {
        e.preventDefault();
        fastForward();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fastForward]);

  // Main calibration simulation loop (2.4s graceful royal pacing)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2400;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      // Acoustic milestone chimes at 25%, 50%, 75%
      if (currentProgress >= 25 && audioMilestoneRef.current < 1) {
        audioMilestoneRef.current = 1;
        sound.playPluck(180);
        haptics.light();
      } else if (currentProgress >= 50 && audioMilestoneRef.current < 2) {
        audioMilestoneRef.current = 2;
        sound.playPluck(220);
        haptics.light();
      } else if (currentProgress >= 75 && audioMilestoneRef.current < 3) {
        audioMilestoneRef.current = 3;
        sound.playPluck(260);
        haptics.medium();
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        sound.playChime();
        haptics.success();
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 850);
        }, 320);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Current cultural stage
  const currentStage =
    CULTURAL_STAGES.find((s) => progress <= s.threshold) || CULTURAL_STAGES[CULTURAL_STAGES.length - 1];

  return (
    <AnimatePresence>
      {!isDone ? (
        <div
          onClick={fastForward}
          className="fixed inset-0 z-[999] flex flex-col justify-between pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] px-6 sm:px-12 pointer-events-auto bg-[#070709] overflow-hidden select-none min-h-[100dvh] cursor-pointer"
        >
          {/* Layer 1: Palatial Jaali Latticework Tapestry (Matte Gold & Ivory Latticework) */}
          <div className="absolute inset-0 pointer-events-none">
            <RoyalPalatialJaaliTapestry className="absolute inset-0 w-full h-full text-[#c5a059]" />
            {/* Subtle Vignette Gradient to focus center */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/60 to-[#070709]/95" />
          </div>

          {/* Layer 2: Ambient Matte Gold & Ivory Radiance Halos */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#c5a059]/[0.05] blur-[140px]" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-[#dfb76c]/[0.035] blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-white/[0.025] blur-[160px]" />
          </div>

          {/* Layer 3: Floating Golden Stardust (Echoing Homepage Constellations) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[
              { top: "15%", left: "12%", size: 3, delay: 0 },
              { top: "25%", left: "84%", size: 2, delay: 1.2 },
              { top: "72%", left: "18%", size: 2.5, delay: 0.8 },
              { top: "68%", left: "80%", size: 3, delay: 2.1 },
              { top: "45%", left: "8%", size: 2, delay: 1.7 },
              { top: "52%", left: "92%", size: 2.5, delay: 0.4 },
              { top: "82%", left: "48%", size: 2, delay: 2.5 },
            ].map((star, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                  y: [-4, 4, -4],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: star.delay,
                }}
                className="absolute rounded-full bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}
          </div>

          {/* Layer 4: Authentic Handcrafted Indian Paisley Corners in Matte Gold */}
          <div className="pointer-events-none absolute inset-3 sm:inset-5">
            <div className="absolute top-0 left-0 text-[#dfb76c]/40">
              <RoyalPaisleyCorner position="top-left" className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute top-0 right-0 text-[#dfb76c]/40">
              <RoyalPaisleyCorner position="top-right" className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute bottom-0 left-0 text-[#dfb76c]/40">
              <RoyalPaisleyCorner position="bottom-left" className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute bottom-0 right-0 text-[#dfb76c]/40">
              <RoyalPaisleyCorner position="bottom-right" className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
          </div>

          {/* Top Bar: Royal Inscription & Discreet Skip Pill */}
          <header className="relative z-10 flex items-center justify-between text-xs tracking-wider">
            {/* Brand Title in Matte Gold & White */}
            <div className="flex items-center gap-2.5 text-white">
              <span className="w-2 h-2 rounded-full bg-[#dfb76c] shadow-[0_0_10px_rgba(223,183,108,0.9)] animate-pulse" />
              <span className="font-display font-black tracking-[0.25em] text-sm uppercase text-[#faf9f5]">
                DESI MUCHADS
              </span>
            </div>

            {/* Cultural Sanskrit Invocation (Center - Desktop) */}
            <div className="hidden md:flex items-center gap-2 text-[#dfb76c]/70 text-xs font-serif tracking-widest">
              <span>✦</span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#faf9f5]/85">
                कला · शौर्य · सृजन
              </span>
              <span>✦</span>
            </div>

            {/* Elegant Skip Button in Matte Gold Border */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fastForward();
              }}
              className="px-3.5 py-1.5 rounded-full bg-[#c5a059]/10 hover:bg-[#c5a059]/20 border border-[#dfb76c]/35 text-[11px] text-[#faf9f5] hover:text-[#dfb76c] flex items-center gap-2 transition-all shadow-[0_0_14px_rgba(197,160,89,0.2)] cursor-pointer"
              title="Enter directly"
            >
              <Sparkles className="w-3 h-3 text-[#dfb76c]" />
              <span className="tracking-wider uppercase font-medium">SKIP INTRO</span>
              <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-white/10 text-[9px] font-mono text-[#dfb76c]/90">
                SPACE
              </kbd>
            </button>
          </header>

          {/* Centerpiece: Handcrafted Royal Indian Jharokha, Lotus Mandala, Floral Arabesque & Illuminated Logo */}
          <main className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4 max-w-xl mx-auto">
            {/* Royal Jharokha Scalloped Arch Accent (Matte Gold & Ivory) */}
            <div className="w-64 sm:w-80 text-[#dfb76c]/35 mb-2 pointer-events-none">
              <RoyalJharokhaArch />
            </div>

            {/* Sacred Concentric Rotating Lotus Mandala */}
            <div className="relative mb-3 sm:mb-4 flex flex-col items-center justify-center">
              {/* Outer 16-Petal Lotus Mandala (Clockwise Serene Spin) in Matte Gold */}
              <div className="absolute -z-10 w-72 h-72 sm:w-[380px] sm:h-[380px] text-[#dfb76c]/20 animate-spin-slow pointer-events-none flex items-center justify-center">
                <RoyalLotusMandala className="w-full h-full" />
              </div>

              {/* Inner Counter-Rotating Beaded Star Ring in Ivory White */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 44, ease: "linear", repeat: Infinity }}
                className="absolute -z-10 w-52 h-52 sm:w-72 sm:h-72 rounded-full border border-dashed border-white/20 pointer-events-none flex items-center justify-center"
              >
                <span className="absolute top-1 text-[7px] text-[#dfb76c]/50">✦</span>
                <span className="absolute right-1 text-[7px] text-[#dfb76c]/50">✦</span>
                <span className="absolute bottom-1 text-[7px] text-[#dfb76c]/50">✦</span>
                <span className="absolute left-1 text-[7px] text-[#dfb76c]/50">✦</span>
              </motion.div>

              {/* Warm Volumetric Matte Gold & White Diya Halo */}
              <div className="absolute inset-0 bg-[#c5a059]/15 blur-3xl rounded-full scale-125 pointer-events-none animate-pulse" />
              <div className="absolute inset-0 bg-white/15 blur-2xl rounded-full scale-110 pointer-events-none" />

              {/* The Iconic White Moustache Brand Logo */}
              <motion.img
                src="/desi-muchads-cropped-logo.png"
                srcSet="/desi-muchads-cropped-logo.png 1x, /desi-muchads-cropped-logo@2x.png 2x"
                alt="Desi Muchads Official Brand Mark"
                animate={{ scale: [0.985, 1.015, 0.985] }}
                transition={{ duration: 2.6, ease: "easeInOut", repeat: Infinity }}
                className="relative z-10 w-44 sm:w-56 h-auto max-w-full object-contain filter drop-shadow-[0_0_24px_rgba(255,255,255,0.95)] drop-shadow-[0_0_48px_rgba(223,183,108,0.5)]"
              />
            </div>

            {/* Handcrafted Indian Floral Arabesque Flourish Under Logo */}
            <div className="w-48 sm:w-56 text-[#dfb76c]/40 mb-3 pointer-events-none">
              <IndianFloralFlourish className="w-full h-8" />
            </div>

            {/* Brand Title & Royal Identity */}
            <div className="space-y-1.5 mb-4 sm:mb-5">
              <h1 className="font-display font-black text-2xl sm:text-3xl tracking-[0.35em] uppercase text-[#faf9f5] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                DESI MUCHADS
              </h1>
              <p className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#dfb76c] uppercase font-semibold">
                ARTISANAL CREATIVE AGENCY &bull; BENGALURU
              </p>
            </div>

            {/* Cultural Stage Progression Text */}
            <div className="min-h-[56px] flex flex-col items-center justify-center max-w-md">
              <motion.div
                key={currentStage.title}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-wider text-[#faf9f5]">
                  <span className="text-[#dfb76c]">✦</span>
                  <span className="font-serif tracking-widest">{currentStage.title}</span>
                  <span className="text-[#dfb76c]">✦</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#d1d0c5] font-sans tracking-wide">
                  {currentStage.description}
                </p>
              </motion.div>
            </div>
          </main>

          {/* Bottom Bar: Royal Toran Pattern & Artisanal Progress Gauge */}
          <footer className="relative z-10 space-y-3 max-w-xl mx-auto w-full">
            {/* Auspicious Toran Pattern Garland Accent */}
            <div className="w-full text-[#dfb76c]/30 pointer-events-none flex justify-center">
              <RoyalToranDivider className="w-full max-w-md h-5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs tracking-wider">
                <span className="text-[11px] text-[#dfb76c]/80 font-serif tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb76c]" />
                  <span>CRAFTED WITH PRIDE &bull; EST. 2024</span>
                </span>

                {/* Elegant Numerical Counter in Matte Gold & White */}
                <div className="flex items-baseline gap-1 font-serif">
                  <span className="text-2xl sm:text-3xl font-bold text-[#faf9f5] drop-shadow-[0_0_12px_rgba(223,183,108,0.35)]">
                    {progress}
                  </span>
                  <span className="text-xs text-[#dfb76c] font-medium">%</span>
                </div>
              </div>

              {/* Artisanal Matte Gold Foil Progress Track */}
              <div className="w-full h-1 sm:h-1.5 bg-[#1b1710] rounded-full overflow-hidden border border-[#dfb76c]/25 relative p-[1px]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#96742a] via-[#f7e8ba] to-[#c5a059] transition-all duration-75 relative shadow-[0_0_12px_rgba(223,183,108,0.7)]"
                  style={{ width: `${progress}%` }}
                >
                  {/* Leading Ivory Pearl Bead */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        /* Royal Palace Door Curtain Parting in Matte Gold */
        <div className="fixed inset-0 z-[999] pointer-events-none flex">
          {/* Subtle Warm Matte Gold Light Seam */}
          <motion.div
            initial={{ opacity: 1, scaleY: 1 }}
            animate={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-transparent via-[#f7e8ba] to-transparent shadow-[0_0_30px_rgba(223,183,108,1)] z-50 pointer-events-none"
          />

          {/* Left Palace Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#070709] border-r-2 border-[#dfb76c]/40 relative shadow-[20px_0_60px_rgba(0,0,0,0.95)]"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#dfb76c]/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#f7e8ba] shadow-[0_0_8px_#dfb76c]" />
            </div>
          </motion.div>

          {/* Right Palace Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#070709] border-l-2 border-[#dfb76c]/40 relative shadow-[-20px_0_60px_rgba(0,0,0,0.95)]"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#dfb76c]/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#f7e8ba] shadow-[0_0_8px_#dfb76c]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
