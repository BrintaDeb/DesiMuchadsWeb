"use client";

import React from "react";
import { ConstellationCanvas } from "@/components/hero/ConstellationCanvas";

/**
 * Authentic Royal Indian Cultural Artistry & Architecture Background
 * Renders globally across all sections and pages:
 * 1. Mobile View (< 768px):
 *    - Seamless, high-visibility vertical pattern tiling (440px width)
 *    - Elevated 24% opacity with rich gold contrast
 *    - Displays full lotus motifs and peacock feathers across phone screens
 * 2. Desktop View (>= 768px):
 *    - Full panoramic high-fidelity cover with 14% opacity
 * 3. Interactive Micro-Star Constellation Canvas
 * 4. Atmospheric Heritage Radiance Glows
 */
export function IndianArtBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full max-w-full overflow-hidden select-none bg-[#080807]"
    >
      {/* 1. Mobile Portrait Dedicated Background (Vibrant, Repeating, High Visibility) */}
      <div
        className="block sm:hidden absolute inset-0 opacity-[0.24] mix-blend-screen"
        style={{
          backgroundImage: "url('/art/indian-art-bg-royal.jpg')",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
          backgroundSize: "440px auto",
          filter: "contrast(135%) brightness(115%)",
        }}
      />

      {/* 2. Desktop Landscape Panoramic Background */}
      <div className="hidden sm:block absolute inset-0 overflow-hidden opacity-[0.14] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Authentic Indian Cultural Heritage Artistry"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/60 via-transparent to-[#080807]/50" />
      </div>

      {/* 3. Subtle Mobile & Desktop Vignette Edge Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080807]/40 via-transparent to-[#080807]/60 pointer-events-none" />

      {/* 4. Interactive Micro-Star Constellation Canvas */}
      <ConstellationCanvas />

      {/* 5. Atmospheric Heritage Radiance Halos */}
      <div className="absolute top-1/4 -left-32 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-white/[0.035] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-white/[0.03] blur-[140px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-[#D4AF37]/[0.025] blur-[160px] pointer-events-none" />
    </div>
  );
}
