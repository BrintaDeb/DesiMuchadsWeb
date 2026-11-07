"use client";

import React from "react";

export function IndianArtBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden"
    >
      {/* 1. Subtle Monochrome Architectural Jaali Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen grayscale"
        style={{
          backgroundImage: "url('/art/indian-art-jaali-pattern.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "360px 360px",
        }}
      />

      {/* 2. Soft Ambient Radial Monochrome Halos */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-white/[0.01] blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[800px] h-[800px] rounded-full bg-black/40 blur-[180px] pointer-events-none" />
    </div>
  );
}
