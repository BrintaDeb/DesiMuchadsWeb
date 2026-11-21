"use client";

import React from "react";

export function IndianArtBackgroundOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full max-w-full overflow-hidden contain-paint"
      style={{
        maxWidth: "100vw",
        maxHeight: "100vh",
      }}
    >
      {/* 1. Authentic Indian Architectural Jaali & Traditional Heritage Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage: "url('/art/indian-art-jaali-pattern.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "360px 360px",
        }}
      />

      {/* 2. Soft Ambient Warm Heritage Halos to enhance Indian Art linework on Matte Black */}
      <div className="absolute -top-32 -left-32 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-[#FFC400]/[0.025] blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 sm:-right-40 w-[320px] sm:w-[700px] h-[320px] sm:h-[700px] rounded-full bg-[#F36700]/[0.02] blur-[100px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[360px] sm:w-[800px] h-[360px] sm:h-[800px] rounded-full bg-[#0e164c]/[0.045] blur-[120px] sm:blur-[180px] pointer-events-none" />
    </div>
  );
}
