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
import { BreydaqsButton } from "./BreydaqsButton";

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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      onClick={onClick}
      className={`relative cursor-pointer select-none inline-flex items-center justify-center ${className}`}
      title="Desi Muchads"
    >
      <img
        src="/desi-muchads-logo-white-transparent.png"
        alt="Desi Muchads Logo"
        className="w-48 sm:w-60 h-auto max-w-full object-contain filter drop-shadow-[0_4px_24px_rgba(255,255,255,0.22)]"
      />
    </motion.div>
  );
}

export function WinterExpansionDiscountModal({
  onOpenKundli,
}: WinterExpansionDiscountModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const couponCode = "GROWTH20";

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

  // Automatic entrance after 3.2s on initial visit
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

  // Listen for custom trigger event
  useEffect(() => {
    const handleOpen = () => {
      sound.playChime();
      setIsOpen(true);
    };
    window.addEventListener("open-winter-sale", handleOpen);
    return () => window.removeEventListener("open-winter-sale", handleOpen);
  }, []);

  // Logo tap trigger
  const handleLogoTap = () => {
    sound.playChime();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.45 },
        colors: ["#ffffff", "#e8e8e3", "#10b981", "#d4312b"],
      });
    } catch {
      // fallback
    }
  };

  // Copy Promo Code handler
  const handleCopyCode = async () => {
    sound.playPluck(200);
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e8e8e3", "#10b981"],
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // WhatsApp claim handler
  const handleClaimWhatsApp = () => {
    sound.playChime();

    const whatsappMessage =
      `Hello Desi Muchads! 👋\n\n` +
      `I am claiming the Winter Expansion 20% DISCOUNT for my brand using promo code: [${couponCode}].\n\n` +
      `Please apply this 20% reduction to our Growth Retainer and let's schedule our 15-Minute Strategy Session!`;

    const url = `https://wa.me/919180252831?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  const handleClose = () => {
    sound.playPluck(140);
    setIsOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          DYNAMIC 20% DISCOUNT POPUP MODAL (Breydaqs Design Theory)
          ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="discountModalTitle"
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) handleClose();
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg max-h-[94dvh] overflow-y-auto overscroll-contain rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.22)] p-6 sm:p-8 text-[#e8e8e3] shadow-[0_30px_100px_rgba(0,0,0,0.95)] select-none text-left"
            >
              {/* Monospace Header & Close */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                  PRIVILEGE [ 20% WINTER SCALE ]
                </span>

                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-[0.2rem] border border-white/15 text-zinc-400 hover:text-white hover:border-white/50 transition-all font-mono text-xs"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Clean Transparent Brand Logo */}
              <div className="flex justify-center py-2 mb-4">
                <BrandLogoDisplay onClick={handleLogoTap} />
              </div>

              {/* Main Headline with Breydaqs Editorial Serif Accent */}
              <div className="space-y-2 mb-4 text-center">
                <h3
                  id="discountModalTitle"
                  className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight"
                >
                  FLAT 20% OFF ALL <span className="font-editorial text-[#e8e8e3]">Growth Retainers</span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono tracking-wide uppercase">
                  National Expansion Milestone · New Delhi · Mumbai · Bengaluru
                </p>
              </div>

              {/* Narrative description */}
              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed text-center mb-6">
                We are inaugurating dedicated performance pods across Mumbai and Bengaluru alongside our New Delhi headquarters. To celebrate this expansion, we are granting an exclusive <strong className="text-white">20% winter reduction</strong> for the next 15 challenger brands onboarding this season.
              </p>

              {/* Real-time Limited Allocation Bar */}
              <div className="mb-5 p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-300" />
                  <span>Allocation Closes In:</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span className="px-1.5 py-0.5 rounded-[0.2rem] bg-black border border-white/10">
                    {timeLeft.days}d
                  </span>
                  <span>:</span>
                  <span className="px-1.5 py-0.5 rounded-[0.2rem] bg-black border border-white/10">
                    {String(timeLeft.hours).padStart(2, "0")}h
                  </span>
                  <span>:</span>
                  <span className="px-1.5 py-0.5 rounded-[0.2rem] bg-black border border-white/10">
                    {String(timeLeft.minutes).padStart(2, "0")}m
                  </span>
                  <span>:</span>
                  <span className="px-1.5 py-0.5 rounded-[0.2rem] bg-black border border-white/10 text-emerald-400">
                    {String(timeLeft.seconds).padStart(2, "0")}s
                  </span>
                </div>
              </div>

              {/* Interactive Coupon Box */}
              <div className="mb-6 p-4 rounded-[0.2rem] bg-[#141412] border border-[rgba(232,232,227,0.2)] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
                    OFFICIAL PROMO CODE:
                  </span>
                  <div className="font-mono font-black text-2xl tracking-widest text-white">
                    {couponCode}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-[0.2rem] bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>APPLIED (20% OFF)</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY CODE</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons Row with Breydaqs Buttons */}
              <div className="space-y-3">
                <BreydaqsButton
                  onClick={handleClaimWhatsApp}
                  variant="white"
                  className="w-full py-3 text-xs"
                >
                  CLAIM 20% DISCOUNT ON WHATSAPP
                </BreydaqsButton>

                <BreydaqsButton
                  onClick={() => {
                    handleClose();
                    onOpenKundli();
                  }}
                  variant="dark"
                  className="w-full py-2.5 text-xs text-zinc-400"
                >
                  APPLY TO FREE GROWTH AUDIT
                </BreydaqsButton>
              </div>

              {/* Trust Footer */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Applicable to Foundation, Dominance &amp; Sovereign retainers.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
