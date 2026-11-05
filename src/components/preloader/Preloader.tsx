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
        <div className="fixed inset-0 z-[999] flex flex-col justify-between p-6 sm:p-12 pointer-events-auto bg-[#0e164c] overflow-hidden select-none font-display">
          {/* Subtle starry ambient glow particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#142161] blur-[100px]" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#F36700]/15 blur-[120px]" />
          </div>

          {/* Top Bar: Brand Status */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#FFC400]">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F36700] animate-ping" />
              DESI MUCHADS
            </span>
            <span className="text-white/60">PERFORMANCE MARKETING</span>
          </div>

          {/* Centerpiece: Header Logo & Official Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
            {/* Ambient rotating subtle mandala behind logo */}
            <div className="absolute -z-10 w-72 h-72 sm:w-96 sm:h-96 opacity-10 animate-spin-slow text-[#FFC400]">
              <MandalaStamp className="w-full h-full" />
            </div>

            {/* Official Header Brand Logo Badge */}
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#FFC400] shadow-[0_0_40px_rgba(255,196,0,0.4)] mb-5 bg-[#0e164c] transform-gpu hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-logo.jpg"
                alt="Desi Muchads Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Official Header Wordmark (MUCHADS Together) */}
            <div className="font-display font-black text-2xl sm:text-4xl tracking-wider text-white uppercase flex items-center gap-2 leading-none mb-1">
              <span>DESI</span>
              <span>
                <span className="text-[#F36700]">MUCH</span>ADS
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#FFC400] uppercase mb-6 font-bold">
              PERFORMANCE MARKETING AGENCY
            </span>

            {/* Cycling Status Text */}
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-xl font-sans font-medium tracking-wide text-white/90"
            >
              {statusText}
            </motion.p>
          </div>

          {/* Bottom Bar: Progress Counter & Track */}
          <div className="relative z-10">
            <div className="flex items-end justify-between mb-3 font-mono">
              <span className="text-xs uppercase tracking-widest text-white/60">
                SCALING E-COMMERCE POTENTIAL
              </span>
              <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FFC400] font-mono">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>

            {/* Orange to Gold Line Progress Bar */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F36700] via-[#FFC400] to-[#F36700] transition-all duration-75"
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
            className="w-1/2 h-full bg-[#0e164c] border-r border-[#F36700]/30 relative"
          >
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FFC400]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#F36700]" />
            </div>
          </motion.div>

          {/* Right Door Curtain */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#0e164c] border-l border-[#F36700]/30 relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#FFC400]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#F36700]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

