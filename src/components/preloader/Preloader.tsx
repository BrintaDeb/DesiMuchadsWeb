"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MandalaStamp } from "../common/Icons";
import { haptics } from "@/lib/haptics";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Calibrating Performance Architecture...");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // 3.2s theatrical loading simulation
    const startTime = Date.now();
    const duration = 2800; // ms to reach 100%

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusText("Calibrating Performance Architecture...");
      } else if (currentProgress < 65) {
        setStatusText("Engineering High-ROAS Systems...");
      } else if (currentProgress < 99) {
        setStatusText("Deploying Sub-Second Platform...");
      } else {
        setStatusText("Honor & Performance.");
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        haptics.selection();
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 850); // Allow curtain split animation to finish
        }, 300);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone ? (
        <div className="fixed inset-0 z-[999] flex flex-col justify-between pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))] px-5 sm:px-12 pointer-events-auto bg-[#09090b] overflow-hidden select-none font-display min-h-[100dvh]">
          {/* Subtle ambient glow particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-white/[0.05] blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-white/[0.05] blur-[120px]" />
          </div>

          {/* Top Bar: Brand Status with Safe Mobile Alignment */}
          <div className="relative z-10 flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-wider sm:tracking-[0.25em] text-zinc-400">
            <span className="flex items-center gap-2 text-white font-bold whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              DESI MUCHADS
            </span>
            <span className="text-zinc-500 text-[10px] sm:text-xs tracking-widest whitespace-nowrap">
              <span className="hidden sm:inline">PERFORMANCE MARKETING</span>
              <span className="sm:hidden">[ STUDIO ]</span>
            </span>
          </div>

          {/* Centerpiece: Clean Transparent White Logo & Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
            {/* Ambient rotating subtle mandala behind logo */}
            <div className="absolute -z-10 w-64 h-64 sm:w-96 sm:h-96 opacity-5 animate-spin-slow text-white pointer-events-none">
              <MandalaStamp className="w-full h-full" />
            </div>

            {/* Official Clean Transparent White Brand Logo with Ambient Glow */}
            <div className="relative mb-4 sm:mb-6 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-125 pointer-events-none" />
              <img
                src="/desi-muchads-logo-white-transparent.png"
                alt="Desi Muchads Logo"
                className="relative z-10 w-44 sm:w-64 h-auto max-w-full object-contain filter drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
              />
            </div>

            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4 sm:mb-6 font-bold">
              PERFORMANCE MARKETING AGENCY
            </span>

            {/* Cycling Status Text */}
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm sm:text-lg font-sans font-medium tracking-wide text-zinc-300 max-w-xs sm:max-w-md"
            >
              {statusText}
            </motion.p>
          </div>

          {/* Bottom Bar: Progress Counter & Track with Mobile Safety */}
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-2.5 sm:mb-3 font-mono">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-zinc-400 truncate mr-3">
                SCALING E-COMMERCE POTENTIAL
              </span>
              <span className="text-2xl sm:text-5xl font-bold tracking-tight text-white font-mono shrink-0">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* White Monochrome Line Progress Bar */}
            <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Stage 3: Split-Curtain Reveal */
        <div className="fixed inset-0 z-[999] pointer-events-none flex">
          {/* Left Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#09090b] border-r border-white/20 relative"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </motion.div>

          {/* Right Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#09090b] border-l border-white/20 relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

