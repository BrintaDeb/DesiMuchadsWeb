"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MandalaStamp } from "../common/Icons";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Twirling the Muchh...");
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
        setStatusText("Twirling the Muchh...");
      } else if (currentProgress < 65) {
        setStatusText("Brewing High-ROAS Masala...");
      } else if (currentProgress < 99) {
        setStatusText("Summoning the Ad Gods...");
      } else {
        setStatusText("Shaan Bhi. Strategy Bhi.");
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 850); // Allow curtain split animation to finish
        }, 300);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  // SVG stroke-dash calculations for 600px path length
  const pathTotalLength = 600;
  const strokeOffset = pathTotalLength - (pathTotalLength * progress) / 100;

  return (
    <AnimatePresence>
      {!isDone ? (
        <div className="fixed inset-0 z-[999] flex flex-col justify-between p-6 sm:p-12 pointer-events-auto bg-[#0D0C12] overflow-hidden select-none">
          {/* Subtle brass dust ambient particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#D4AF37]/10 blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#E11D48]/10 blur-[120px]" />
          </div>

          {/* Top Bar: Royal Header */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37]/80">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-ping" />
              DESI MUCHADS DARBAR
            </span>
            <span>MUMBAI • DELHI • BENGALURU</span>
          </div>

          {/* Centerpiece: Self-Drawing Golden Twirled Moustache & Cycling Copy */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
            {/* Ambient rotating subtle mandala behind moustache */}
            <div className="absolute -z-10 w-64 h-64 sm:w-80 sm:h-80 opacity-15 animate-spin-slow text-[#D4AF37]">
              <MandalaStamp className="w-full h-full" />
            </div>

            {/* Moustache Stroke SVG */}
            <div className="relative w-48 sm:w-72 h-24 sm:h-36 mb-6">
              <svg
                viewBox="0 0 240 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
              >
                {/* Background ghost track */}
                <path
                  d="M 120 50 
                     C 105 30, 75 16, 42 20 
                     C 20 23, 4 36, 2 52 
                     C 0 68, 16 82, 34 80 
                     C 52 78, 68 60, 86 50 
                     C 100 42, 114 45, 120 50 
                     C 126 45, 140 42, 154 50 
                     C 172 60, 188 78, 206 80 
                     C 224 82, 240 68, 238 52 
                     C 236 36, 220 23, 198 20 
                     C 165 16, 135 30, 120 50 Z"
                  stroke="#D4AF37"
                  strokeOpacity="0.15"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Animated Drawing Path */}
                <path
                  d="M 120 50 
                     C 105 30, 75 16, 42 20 
                     C 20 23, 4 36, 2 52 
                     C 0 68, 16 82, 34 80 
                     C 52 78, 68 60, 86 50 
                     C 100 42, 114 45, 120 50 
                     C 126 45, 140 42, 154 50 
                     C 172 60, 188 78, 206 80 
                     C 224 82, 240 68, 238 52 
                     C 236 36, 220 23, 198 20 
                     C 165 16, 135 30, 120 50 Z"
                  stroke="url(#preloaderGoldGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: pathTotalLength,
                    strokeDashoffset: strokeOffset,
                    transition: "stroke-dashoffset 40ms linear",
                  }}
                />

                {/* Gold Gradient */}
                <defs>
                  <linearGradient
                    id="preloaderGoldGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F5DE88" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Cycling Hinglish Status Text */}
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-lg sm:text-2xl font-serif tracking-wide text-[#F7F1E5]"
            >
              {statusText}
            </motion.p>
          </div>

          {/* Bottom Bar: Desi Odometer & Progress Line */}
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-3 font-mono">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37]/60">
                UNAPOLOGETIC ROOTS ✦ RUTHLESS ROI
              </span>
              <span className="text-4xl sm:text-6xl font-bold tracking-tight text-[#D4AF37] font-mono">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* Brass Line Progress Bar */}
            <div className="w-full h-1 bg-[#D4AF37]/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F5DE88] to-[#E11D48] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Stage 3: Palace Doors Split-Curtain Reveal */
        <div className="fixed inset-0 z-[999] pointer-events-none flex">
          {/* Left Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#0D0C12] border-r border-[#D4AF37]/40 relative"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </div>
          </motion.div>

          {/* Right Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#0D0C12] border-l border-[#D4AF37]/40 relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

