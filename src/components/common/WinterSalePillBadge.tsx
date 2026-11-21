"use client";

import React from "react";
import { Snowflake, Flame } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface WinterSalePillBadgeProps {
  onClick?: () => void;
  className?: string;
  size?: "default" | "compact";
}

/**
 * Winter Scale • National Expansion Sale Pill Badge
 * Recreated accurately from visual brand specifications:
 * - Rounded capsule pill with golden amber border and ambient glow
 * - Matte dark obsidian background
 * - Cyan ice snowflake icon (left)
 * - Bold uppercase gold typography with middle bullet separator
 * - Radiant amber flame icon (right)
 * - Tactile mobile haptic feedback & chime audio on interaction
 */
export function WinterSalePillBadge({
  onClick,
  className = "",
  size = "default",
}: WinterSalePillBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    haptics.medium();
    sound.playChime();

    if (onClick) {
      onClick();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-winter-sale"));
    }
  };

  const isCompact = size === "compact";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Open Winter Scale and National Expansion 20% Discount Sale"
      className={`group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full select-none cursor-pointer transition-all duration-300 active:scale-95 ${
        isCompact
          ? "px-3 py-1.5 text-[10px] sm:text-[11px]"
          : "px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs md:text-sm"
      } bg-[#0c100e]/95 hover:bg-[#141b18] border border-[#d97706]/70 hover:border-[#f59e0b] shadow-[0_0_16px_rgba(217,119,6,0.25)] hover:shadow-[0_0_24px_rgba(245,158,11,0.45)] text-white backdrop-blur-md ${className}`}
    >
      {/* Subtle Inner Warm Glow */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/[0.04] via-amber-500/[0.08] to-orange-500/[0.04] pointer-events-none"
        aria-hidden="true"
      />

      {/* Left Icon: Cyan Snowflake */}
      <Snowflake
        className={`${
          isCompact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
        } text-[#38bdf8] shrink-0 stroke-[2.5] group-hover:rotate-45 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(56,189,248,0.6)]`}
        aria-hidden="true"
      />

      {/* Center Label: Bold Gold Typography */}
      <span className="font-display font-black uppercase tracking-[0.08em] sm:tracking-wider text-[#f59e0b] sm:text-amber-400 group-hover:text-amber-300 transition-colors drop-shadow-[0_1px_8px_rgba(245,158,11,0.3)] whitespace-nowrap">
        WINTER SCALE <span className="text-[#d97706] mx-0.5">•</span> NATIONAL EXPANSION SALE
      </span>

      {/* Right Icon: Radiant Amber Flame */}
      <Flame
        className={`${
          isCompact ? "w-3 h-3" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
        } text-[#f97316] fill-[#f97316]/30 shrink-0 stroke-[2.5] group-hover:scale-115 transition-transform duration-300 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]`}
        aria-hidden="true"
      />
    </button>
  );
}
