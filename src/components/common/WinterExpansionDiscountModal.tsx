"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";
import {
  Snowflake,
  Copy,
  Check,
  X,
  ArrowRight,
  MessageCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { FiligreeCorner } from "./Icons";

interface WinterExpansionDiscountModalProps {
  onOpenKundli: () => void;
}

/**
 * Clean Authentic Desi Muchads Logo Component
 * Pure transparent white logo (moustache + DESI MUCHADS) with NO background,
 * NO square container border, and NO extraneous stars/sparkles.
 */
function BrandLogoDisplay({
  onClick,
  className = "",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      onClick={onClick}
      className={`relative cursor-pointer select-none inline-flex items-center justify-center ${className}`}
      title="Desi Muchads"
    >
      <img
        src="/desi-muchads-logo-white-transparent.png"
        alt="Desi Muchads Logo"
        className="w-52 sm:w-64 h-auto max-w-full object-contain filter drop-shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
      />
    </motion.div>
  );
}

export function WinterExpansionDiscountModal({
  onOpenKundli,
}: WinterExpansionDiscountModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = "MUCHHAD20";

  // Real-time Countdown timer for winter expansion allocation
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Gentle automatic entrance after 3.2s on initial visit
  useEffect(() => {
    const sessionKey = "dm_winter_discount_seen";
    const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(sessionKey);
    if (!alreadySeen) {
      const timeout = setTimeout(() => {
        sound.playChime();
        setIsOpen(true);
        sessionStorage.setItem(sessionKey, "true");
      }, 3200);
      return () => clearTimeout(timeout);
    }
  }, []);

  // Handle Copy Coupon Code
  const handleCopyCode = () => {
    sound.playPluck(220);
    navigator.clipboard.writeText(couponCode);
    setCopied(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#fbbf24", "#ffffff", "#38bdf8", "#d97706"],
      });
    } catch {}

    setTimeout(() => setCopied(false), 3000);
  };

  // Handle Logo tap Easter egg
  const handleLogoTap = () => {
    sound.playPluck(180);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.45 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa"],
      });
    } catch {}
  };

  // Claim on WhatsApp
  const handleClaimWhatsApp = () => {
    sound.playChime();

    // CRM Lead Dispatch
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "winter_expansion_popup",
        name: "Winter Expansion Challenger Brand",
        service: "Growth Retainer (20% OFF)",
        message: `Claimed Winter 20% Discount with coupon code [${couponCode}] during business expansion.`,
      }),
    }).catch(() => {});

    const whatsappMessage =
      `Pranam Desi Muchads! 🙏\n\n` +
      `I am claiming the Winter Expansion 20% DISCOUNT for my brand using coupon code: [${couponCode}].\n\n` +
      `Please apply this 20% reduction to our Growth Retainer / Marketing Thali and let's schedule our 15-Minute Strategy Baithak!`;

    const url = `https://wa.me/919180252831?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  // Close Modal handler
  const handleClose = () => {
    sound.playPluck(140);
    setIsOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          PERSISTENT FLOATING RE-OPENER BADGE
          Positioned bottom-left with Clean Transparent Logo & Winter Styling
          ========================================================================= */}
      <div className="fixed bottom-6 left-6 z-40 select-none animate-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => {
            sound.playChime();
            setIsOpen(true);
          }}
          data-cursor="flame"
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full ios-glass-panel border border-amber-400/40 bg-black/85 text-white shadow-[0_15px_40px_rgba(245,158,11,0.25)] hover:border-amber-300 hover:scale-105 active:scale-95 transition-all group"
          title="Open 20% Winter Expansion Discount"
        >
          {/* Transparent Brand Logo Icon */}
          <div className="w-7 h-5 flex items-center justify-center shrink-0">
            <img
              src="/desi-muchads-logo-white-transparent.png"
              alt="Desi Muchads Logo"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="flex flex-col text-left pr-1">
            <div className="flex items-center gap-1.5">
              <Snowflake className="w-3 h-3 text-cyan-300 animate-spin-slow" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-amber-300">
                WINTER SALE
              </span>
            </div>
            <span className="font-mono text-[10px] text-zinc-300 group-hover:text-white transition-colors">
              Code: <strong className="text-white font-mono">{couponCode}</strong>
            </span>
          </div>

          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </button>
      </div>

      {/* =========================================================================
          DYNAMIC 20% DISCOUNT WINTER EXPANSION POPUP MODAL
          ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="discountModalTitle"
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            {/* Modal Card Frame */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xl max-h-[94dvh] overflow-y-auto overscroll-contain rounded-3xl ios-glass-panel border-2 border-amber-400/40 p-6 sm:p-9 text-white shadow-[0_25px_90px_rgba(245,158,11,0.25)] text-center select-none"
            >
              {/* Corner Filigree Ornaments */}
              <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
                <FiligreeCorner className="w-5 h-5 text-amber-300" position="top-left" />
              </div>
              <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
                <FiligreeCorner className="w-5 h-5 text-amber-300" position="top-right" />
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/20 text-zinc-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all touch-hit-expand z-20"
                aria-label="Close winter sale modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Clean Transparent Brand Logo (No background, No border square, No star glints) */}
              <div className="flex justify-center pt-2 pb-1 sm:pt-4 sm:pb-2">
                <BrandLogoDisplay onClick={handleLogoTap} />
              </div>

              {/* Big Discount Value Headline */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-center gap-2 font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                    FLAT 20% OFF
                  </span>
                </div>
                <h3
                  id="discountModalTitle"
                  className="font-display font-bold text-base sm:text-lg text-zinc-200 uppercase tracking-wide"
                >
                  As We Expand Operations Across India
                </h3>
              </div>

              {/* Narrative description */}
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-lg mx-auto mb-5">
                Desi Muchads is inaugurating physical media-buying pods in Mumbai and Bengaluru alongside our Delhi-NCR headquarters. To celebrate this milestone, we are releasing an exclusive{" "}
                <strong className="text-white font-semibold">20% winter discount</strong> for the next 15 challenger brands scaling this quarter.
              </p>

              {/* Real-time Limited Allocation Bar */}
              <div className="mb-5 p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Winter Allocation Closes In:</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15">
                    {timeLeft.days}d
                  </span>
                  <span>:</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15">
                    {String(timeLeft.hours).padStart(2, "0")}h
                  </span>
                  <span>:</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15">
                    {String(timeLeft.minutes).padStart(2, "0")}m
                  </span>
                  <span>:</span>
                  <span className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-amber-300">
                    {String(timeLeft.seconds).padStart(2, "0")}s
                  </span>
                </div>
              </div>

              {/* Interactive Coupon Box */}
              <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#18181f] via-[#1f1a14] to-[#18181f] border-2 border-dashed border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-amber-300/80 uppercase tracking-widest block font-bold">
                    OFFICIAL WINTER PROMO CODE:
                  </span>
                  <div className="font-mono font-black text-2xl sm:text-3xl tracking-widest text-white">
                    {couponCode}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  data-cursor="flame"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>COPIED (20% APPLIED!)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>COPY CODE [20% OFF]</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons Row */}
              <div className="space-y-2.5">
                {/* Primary WhatsApp Dispatch with 20% discount pre-filled */}
                <button
                  type="button"
                  onClick={handleClaimWhatsApp}
                  data-cursor="chai"
                  className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer group"
                >
                  <MessageCircle className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                  <span>CLAIM 20% DISCOUNT ON WHATSAPP &gt;</span>
                </button>

                {/* Secondary: Lock in Strategy Baithak */}
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onOpenKundli();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Code to Free Brand Kundli Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trust Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Applicable to Seed Sanchalan, Growth Darbar &amp; Marketing Thali retainers.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
