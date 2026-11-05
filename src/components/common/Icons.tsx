"use client";

import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Authentic Twirled Indian Moustache ("Muchhad")
 * Features elegant upward curls, symmetrical center dip, and royal sharpness.
 */
export function MoustacheSVG({
  className = "w-24 h-12 text-[#D4AF37]",
  strokeWidth = 2,
  animated = false,
  ...props
}: SVGProps & { strokeWidth?: number; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M 120 48 
           C 105 32, 75 18, 42 22 
           C 20 25, 4 38, 2 54 
           C 0 70, 16 84, 34 82 
           C 52 80, 68 62, 86 52 
           C 100 44, 114 47, 120 53 
           C 126 47, 140 44, 154 52 
           C 172 62, 188 80, 206 82 
           C 224 84, 240 70, 238 54 
           C 236 38, 220 25, 198 22 
           C 165 18, 135 32, 120 48 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        className={animated ? "transition-all duration-300" : ""}
      />
      {/* Decorative center twirl filigree */}
      <path
        d="M 120 54 Q 120 62 120 66"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Line-art Path version of Moustache for GSAP stroke-dashoffset drawing
 */
export function MoustachePathSVG({
  className = "w-full h-full text-[#D4AF37]",
  pathRef,
  ...props
}: SVGProps & { pathRef?: React.Ref<SVGPathElement> }) {
  return (
    <svg
      viewBox="0 0 240 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        ref={pathRef}
        d="M 120 50 
           C 105 30, 75 16, 42 20 
           C 20 23, 4 36, 2 52 
           C 0 68, 16 82, 34 80 
           C 52 78, 68 60, 86 50 
           C 100 42, 114 45, 120 50 
           C 126 45, 140 42, 154 50 
           C 172 60, 188 78, 206 80 
           C 224 82, 240 68, 238 52 
           C 236 36, 220 23, 198 20 
           C 165 16, 135 30, 120 50 Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="50" r="3" fill="currentColor" />
    </svg>
  );
}

/**
 * Ornate Rajasthani / Mughal Scalloped Jharokha Arch
 */
export function JharokhaArchSVG({
  className = "w-full h-full text-[#D4AF37]",
  strokeWidth = 2,
  ...props
}: SVGProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      {...props}
    >
      {/* Outer 7-scallop Jharokha arch */}
      <path
        d="M 20 480 
           L 20 180 
           Q 20 140 50 140 
           Q 80 140 95 110 
           Q 110 80 135 80 
           Q 160 80 175 55 
           Q 190 30 200 20 
           Q 210 30 225 55 
           Q 240 80 265 80 
           Q 290 80 305 110 
           Q 320 140 350 140 
           Q 380 140 380 180 
           L 380 480 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pinnacle Kalash tip */}
      <circle cx="200" cy="14" r="3.5" fill="currentColor" />
    </svg>
  );
}

/**
 * 8-Fold Rotating Royal Mandala / Chakra Stamp
 */
export function MandalaStamp({
  className = "w-20 h-20 text-[#D4AF37]",
  ...props
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      
      {/* 8 radiating lotus petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M 50 28 C 45 35 45 42 50 44 C 55 42 55 35 50 28 Z"
            fill="currentColor"
            opacity="0.8"
          />
          <line x1="50" y1="10" x2="50" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="50" cy="8" r="1.5" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Brass Filigree Corner Bracket for Royal Glassmorphic Cards
 */
export function FiligreeCorner({
  className = "w-6 h-6 text-[#D4AF37]",
  position = "top-left",
}: {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const rotationMap = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  };

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationMap[position]}`}
    >
      <path
        d="M 2 38 L 2 8 C 2 4.7 4.7 2 8 2 L 38 2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M 8 18 C 8 12.5 12.5 8 18 8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * Authentic Cutting Chai Glass SVG
 */
export function ChaiCupIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

