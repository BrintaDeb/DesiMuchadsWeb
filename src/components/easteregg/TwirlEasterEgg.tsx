"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "@/lib/sound";

interface TwirlEasterEggProps {
  onOpenKundli: () => void;
}

export function TwirlEasterEgg({ onOpenKundli }: TwirlEasterEggProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [dragCount, setDragCount] = useState(0);

  const handleDragEnd = () => {
    sound.playPluck(220);
    const newCount = dragCount + 1;
    setDragCount(newCount);

    if (newCount >= 1 && !unlocked) {
      setUnlocked(true);
      sound.playChime();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.7 },
          colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
        });
      } catch {}
    }
  };

  return (
    <div className="relative py-16 px-4 max-w-4xl mx-auto my-12 text-center">
      <div className="relative rounded-3xl p-8 sm:p-12 bg-[#121215] border border-white/15 border-t-white/30 shadow-2xl overflow-hidden">
        {/* Filigree corner brackets */}
        <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
          <FiligreeCorner className="w-5 h-5 text-white" position="top-left" />
        </div>
        <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
          <FiligreeCorner className="w-5 h-5 text-white" position="top-right" />
        </div>

        <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold block mb-2">
          INTERACTIVE MUCHHAD PHYSICS EASTER EGG
        </span>
        <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
          Twirl the Muchh (Tension Check)
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-8">
          Flick or pull the moustache with your cursor/finger. Test our spring physics and see what secret gift the Raja has in store.
        </p>

        {/* Draggable Spring-Physics Moustache */}
        <div className="flex justify-center my-6">
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.65}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 12 }}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-grab active:cursor-grabbing p-4 rounded-3xl bg-white/5 border border-white/20 hover:border-white transition-colors"
          >
            <MoustacheSVG className="w-48 sm:w-64 h-24 sm:h-32 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]" />
          </motion.div>
        </div>

        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block">
          {unlocked ? "✦ Elastic Tension Unlocked!" : "← Drag and release to twirl →"}
        </span>

        {/* UNLOCKED VIP REWARD BADGE */}
        {unlocked && (
          <div className="mt-8 p-6 rounded-2xl bg-[#18181c] border-2 border-white animate-in zoom-in-95 duration-400 max-w-lg mx-auto shadow-[0_0_30px_rgba(255,255,255,0.12)]">
            <div className="flex items-center justify-center gap-2 mb-2 text-white">
              <Gift className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">
                VIP SECRET REWARD UNLOCKED
              </span>
            </div>
            <h4 className="font-display font-bold text-lg sm:text-xl text-white mb-2">
              Shabaash! You unlocked a Free Creative Audit + 1 Bonus Ad Concept.
            </h4>
            <p className="text-xs text-zinc-300 mb-5 leading-relaxed">
              Show this secret badge to our founders on WhatsApp to claim your complimentary creative teardown and bespoke ad angle wireframe.
            </p>
            <button
              onClick={onOpenKundli}
              className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-zinc-200 transition-colors"
            >
              Claim Bonus Ad Concept Now 〰️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

