"use client";

import React from "react";

export function IndianArtBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full overflow-hidden"
    >
      {/* 1. Rich Authentic Indian Architectural Jaali & Mandala Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.085] mix-blend-screen"
        style={{
          backgroundImage: "url('/art/indian-art-jaali-pattern.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "380px 380px",
        }}
      />

      {/* 2. Warm Indian Heritage Golden Radial Halos */}
      <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-[#FFC400]/[0.045] blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[750px] h-[750px] rounded-full bg-[#F36700]/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] rounded-full bg-[#FFC400]/[0.035] blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[850px] h-[850px] rounded-full bg-[#142161]/[0.08] blur-[180px] pointer-events-none" />
    </div>
  );
}

