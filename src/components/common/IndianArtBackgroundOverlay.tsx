"use client";

import React from "react";
import { ConstellationCanvas } from "@/components/hero/ConstellationCanvas";

/**
 * Authentic Royal Indian Cultural Artistry & Architecture Background
 * Renders globally across all sections and pages:
 * 1. Authentic Pichwai & Kalamkari Palace Royal Artistry (/art/indian-art-bg-royal.jpg)
 * 2. Interactive Micro-Star Constellation Canvas
 * 3. Atmospheric Heritage Radiance Glows
 */
export function IndianArtBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full max-w-full overflow-hidden select-none"
    >
      {/* 1. Authentic Indian Cultural Pichwai & Kalamkari Artistry Drawing Watermark */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.085] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Authentic Indian Cultural Heritage Artistry"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-transparent to-[#080807]/80" />
      </div>

      {/* 2. Interactive Micro-Star Constellation Canvas */}
      <ConstellationCanvas />

      {/* 3. Atmospheric Heritage Radiance Halos */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-white/[0.025] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-white/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.015] blur-[180px] pointer-events-none" />
    </div>
  );
}
