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
      viewBox="0 0 240 90"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Main contoured body with feather bays */}
      <path
        d="M 11.6,40.9 L 13.0,48.6 L 17.2,57.7 L 21.5,63.2 L 26.7,68.2 L 35.6,74.1 L 46.5,78.1 L 55.9,80.0 L 70.5,80.0 L 80.9,78.1 L 90.3,75.0 L 96.0,72.2 L 104.0,67.3 L 112.5,59.5 L 117.2,53.2 L 120.9,45.5 L 122.4,39.6 L 122.8,33.2 L 124.7,27.7 L 126.1,25.5 L 131.3,20.0 L 137.0,16.8 L 141.2,15.5 L 144.5,15.0 L 151.6,15.5 L 156.8,16.8 L 161.5,19.1 L 166.2,22.3 L 175.6,31.4 L 183.2,39.6 L 189.8,44.5 L 194.5,46.8 L 201.6,48.6 L 206.7,48.6 L 212.9,47.3 L 220.4,43.6 L 219.5,46.4 L 217.6,49.1 L 211.9,54.1 L 204.9,56.8 L 196.4,57.3 L 189.3,55.4 L 182.2,51.8 L 178.5,49.1 L 160.5,31.4 L 155.4,27.7 L 151.6,25.9 L 147.3,25.0 L 141.7,25.0 L 135.6,27.3 L 131.8,30.9 L 129.9,35.5 L 132.3,33.2 L 137.4,30.9 L 146.4,30.5 L 149.7,31.4 L 154.9,34.1 L 176.1,54.5 L 185.5,60.0 L 190.7,61.8 L 195.4,62.7 L 203.4,62.7 L 212.9,60.4 L 209.1,64.1 L 205.3,66.8 L 198.3,70.4 L 192.1,72.7 L 182.7,74.5 L 170.4,74.5 L 166.7,74.1 L 154.4,70.9 L 145.5,66.8 L 134.6,59.1 L 129.0,52.7 L 126.6,48.6 L 123.8,54.1 L 123.8,55.4 L 127.5,60.0 L 137.0,68.2 L 146.4,73.6 L 153.0,76.3 L 161.0,78.6 L 169.0,80.0 L 184.1,80.0 L 193.5,78.1 L 201.1,75.4 L 205.8,73.2 L 211.5,69.5 L 219.5,61.8 L 225.1,52.7 L 226.5,49.1 L 228.0,41.8 L 228.0,35.9 L 227.0,30.9 L 224.2,24.6 L 222.3,22.3 L 222.8,23.2 L 221.4,31.8 L 219.0,35.9 L 215.2,39.6 L 211.5,41.8 L 208.2,42.7 L 203.0,43.2 L 195.9,41.4 L 189.3,37.3 L 172.3,20.0 L 164.8,14.6 L 159.1,11.9 L 149.7,9.6 L 140.3,10.0 L 134.1,11.9 L 127.5,15.5 L 122.8,20.0 L 119.1,26.4 L 117.6,30.5 L 116.7,35.0 L 116.7,38.2 L 114.8,45.5 L 112.5,50.0 L 109.2,54.5 L 101.6,61.8 L 92.7,67.7 L 86.5,70.4 L 79.5,72.7 L 69.6,74.5 L 57.3,74.5 L 49.3,73.2 L 40.3,70.0 L 33.7,66.3 L 27.1,60.4 L 28.1,60.0 L 29.5,60.9 L 36.6,62.7 L 44.6,62.7 L 52.1,60.9 L 58.7,57.7 L 63.4,54.5 L 84.2,34.6 L 88.9,31.8 L 93.6,30.5 L 100.2,30.5 L 105.9,32.3 L 108.7,34.1 L 109.6,35.5 L 108.7,32.3 L 106.3,29.1 L 104.0,27.3 L 97.8,25.0 L 92.2,25.0 L 86.1,26.8 L 82.8,28.7 L 76.6,33.6 L 69.6,41.4 L 60.1,50.0 L 55.4,53.2 L 50.7,55.4 L 46.0,56.8 L 37.0,57.3 L 31.8,55.9 L 28.1,54.1 L 21.9,48.6 L 19.6,44.5 L 20.1,43.2 L 23.8,45.9 L 30.4,48.2 L 38.4,48.6 L 42.7,47.7 L 47.4,45.9 L 53.1,42.3 L 62.0,34.1 L 64.8,30.5 L 72.9,22.7 L 78.0,19.1 L 81.8,17.3 L 91.2,15.0 L 98.3,15.5 L 106.3,18.7 L 110.6,21.8 L 112.9,24.6 L 115.3,20.0 L 115.3,19.1 L 112.5,15.9 L 105.4,11.9 L 99.3,10.0 L 89.8,9.6 L 80.4,11.9 L 74.7,14.6 L 69.6,18.2 L 60.1,27.3 L 55.4,32.7 L 49.3,38.2 L 42.7,41.8 L 36.6,43.2 L 30.9,42.7 L 28.1,41.8 L 24.3,39.6 L 20.5,35.9 L 17.7,30.0 L 17.2,22.3 L 13.5,28.7 L 12.0,33.2 Z"
      />
      {/* Left inner feather quill */}
      <path
        d="M 104.0,40.5 L 102.6,39.1 L 99.7,39.1 L 94.1,45.9 L 88.4,51.4 L 83.2,55.4 L 77.6,59.1 L 69.6,63.2 L 63.9,65.4 L 60.1,66.3 L 68.1,65.9 L 74.7,64.5 L 80.9,62.3 L 87.0,59.1 L 91.7,55.9 L 100.2,47.7 L 104.0,42.7 Z"
      />
      {/* Right inner feather quill */}
      <path
        d="M 136.5,39.6 L 136.0,42.7 L 137.9,45.9 L 147.3,55.4 L 153.5,59.5 L 160.1,62.7 L 165.3,64.5 L 171.9,65.9 L 179.9,66.3 L 173.3,64.5 L 162.0,59.1 L 153.5,53.2 L 147.8,48.2 L 140.3,39.1 Z"
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

