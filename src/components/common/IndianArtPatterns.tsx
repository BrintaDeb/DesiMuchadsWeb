"use client";

import React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Handcrafted 16-Petal Royal Indian Lotus Mandala
 * Features precision geometric Jaali latticework, radiating Kamal petals,
 * and delicate pearl stippling in matte gold and ivory linework.
 */
export function RoyalLotusMandala({ className = "w-64 h-64 text-[#dfb76c]", ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Outer Pearl Beaded Ring */}
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 3.5" opacity="0.6" />
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" opacity="0.5" />

      {/* 16 Radiating Royal Lotus Petals (Kamal) */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg, i) => (
        <g key={`petal-${i}`} transform={`rotate(${deg} 100 100)`}>
          {/* Outer Tier Petal */}
          <path
            d="M 100 8 C 94 28 84 46 100 60 C 116 46 106 28 100 8 Z"
            fill="currentColor"
            fillOpacity="0.06"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.85"
          />
          {/* Inner Petal Spine Line */}
          <line x1="100" y1="12" x2="100" y2="48" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
          <circle cx="100" cy="6" r="1.5" fill="currentColor" opacity="0.9" />

          {/* Secondary Interstitial Leaf Accent */}
          <path
            d="M 100 60 C 97 70 95 78 100 84 C 105 78 103 70 100 60 Z"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </g>
      ))}

      {/* Middle Sacred Geometric Octagram / Jaali Ring */}
      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.7" />

      {/* 8-Pointed Star Jaali Latticework */}
      {[0, 45, 90, 135].map((deg, i) => (
        <g key={`star-${i}`} transform={`rotate(${deg} 100 100)`}>
          <rect x="66" y="66" width="68" height="68" stroke="currentColor" strokeWidth="0.7" opacity="0.3" fill="none" />
        </g>
      ))}

      {/* Inner Sanctum Rosette */}
      <circle cx="100" cy="100" r="32" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1.5 2.5" opacity="0.6" />
      <circle cx="100" cy="100" r="4" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

/**
 * Handcrafted Indian Royal Paisley (Kalka / Boteh) Corner Ornament
 * Intricate curving teardrop leaf with royal floral tendrils,
 * designed for ornate luxury framing in matte gold and white.
 */
export function RoyalPaisleyCorner({
  className = "w-16 h-16 text-[#dfb76c]",
  position = "top-left",
  ...props
}: SVGProps & { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const rotationMap = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-[-1]",
  };

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationMap[position]}`}
      {...props}
    >
      {/* Outer framing double border lines */}
      <path d="M 0 0 L 76 0 M 0 0 L 0 76" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      <path d="M 6 6 L 68 6 M 6 6 L 6 68" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />

      {/* Ornate Corner Finial Star */}
      <circle cx="6" cy="6" r="3" fill="currentColor" opacity="0.8" />
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />

      {/* Royal Paisley (Boteh) Body */}
      <path
        d="M 12 12 C 28 10, 48 18, 52 34 C 54 44, 46 52, 36 50 C 26 48, 20 38, 26 28 C 30 22, 38 24, 38 28 C 38 32, 34 32, 32 30"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.05"
        opacity="0.85"
      />

      {/* Inner Paisley Flourish Hatching & Dots */}
      <path
        d="M 18 18 C 28 18, 40 26, 42 36 C 43 42, 38 46, 32 44"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="1.5 2.5"
        opacity="0.6"
      />

      {/* Radiating Floral Vines & Petal Buds */}
      <path d="M 52 6 C 54 12, 60 16, 68 16" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <circle cx="68" cy="16" r="1.5" fill="currentColor" opacity="0.75" />

      <path d="M 6 52 C 12 54, 16 60, 16 68" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <circle cx="16" cy="68" r="1.5" fill="currentColor" opacity="0.75" />

      {/* Micro Floral Stippling */}
      <circle cx="28" cy="14" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="44" cy="20" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="14" cy="28" r="1.2" fill="currentColor" opacity="0.6" />
      <circle cx="20" cy="44" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

/**
 * Classical Indian Royal Jharokha (Arch / Architrave) Silhouettes
 * Multi-foil scalloped arch with kalash finial and heritage borders.
 */
export function RoyalJharokhaArch({ className = "w-full h-auto text-[#dfb76c]", ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 320 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Central Kalash / Lotus Finial */}
      <path
        d="M 160 4 C 158 8, 155 12, 160 16 C 165 12, 162 8, 160 4 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="160" cy="2" r="1.5" fill="currentColor" />

      {/* Upper Architectural Cornice */}
      <line x1="20" y1="18" x2="300" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="40" y1="22" x2="280" y2="22" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />

      {/* Main Scalloped Arch (9-Foil Royal Jharokha Arch) */}
      <path
        d="M 40 76 L 40 46
           C 50 44, 60 42, 70 48
           C 80 40, 92 38, 104 44
           C 114 34, 128 32, 140 38
           C 148 26, 154 24, 160 22
           C 166 24, 172 26, 180 38
           C 192 32, 206 34, 216 44
           C 228 38, 240 40, 250 48
           C 260 42, 270 44, 280 46
           L 280 76"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Inner Echo Scallop Line */}
      <path
        d="M 50 76 L 50 50
           C 60 48, 68 46, 76 52
           C 84 46, 94 44, 106 50
           C 116 42, 126 40, 138 46
           C 146 34, 152 32, 160 30
           C 168 32, 174 34, 182 46
           C 194 40, 204 42, 214 50
           C 226 44, 236 46, 244 52
           C 252 46, 260 48, 270 50
           L 270 76"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.5"
      />

      {/* Little Pearl drops at cusps */}
      {[70, 104, 140, 160, 180, 216, 250].map((cx, i) => (
        <circle key={i} cx={cx} cy={cx === 160 ? 25 : 42} r="1.5" fill="currentColor" opacity="0.8" />
      ))}
    </svg>
  );
}

/**
 * Royal Toran Floral Garland Divider
 * Traditional Indian doorway garland featuring mango leaves (amra pallava)
 * and marigold floral pips for auspicious beginnings.
 */
export function RoyalToranDivider({ className = "w-full h-6 text-[#dfb76c]", ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Continuous Top Thread Line */}
      <line x1="10" y1="4" x2="390" y2="4" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="20" y1="7" x2="380" y2="7" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.35" />

      {/* Repeating Mango Leaf & Marigold Droplets */}
      {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((cx, i) => (
        <g key={i}>
          {/* Festoon Scallop connecting previous to this */}
          {i > 0 && (
            <path
              d={`M ${cx - 40} 4 Q ${cx - 20} 14 ${cx} 4`}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity="0.4"
            />
          )}
          {/* Mango Leaf Shape */}
          <path
            d={`M ${cx} 4 C ${cx - 5} 10, ${cx - 6} 16, ${cx} 22 C ${cx + 6} 16, ${cx + 5} 10, ${cx} 4 Z`}
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.75"
          />
          {/* Marigold / Pearl Drop */}
          <circle cx={cx} cy={22} r="1.5" fill="currentColor" opacity="0.85" />
        </g>
      ))}

      {/* Centerpiece Auspicious Diamond */}
      <polygon points="200,1 204,5 200,9 196,5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/**
 * Handcrafted Indian Floral Arabesque & Lotus Flourish
 * Pichwai & Rajasthani royal court inspired symmetrical lotus vines,
 * designed to flank the iconic brand mark with organic elegance.
 */
export function IndianFloralFlourish({ className = "w-48 h-12 text-[#dfb76c]", ...props }: SVGProps) {
  return (
    <svg
      viewBox="0 0 240 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Central Auspicious Lotus Bud */}
      <path
        d="M 120 4 C 114 12, 112 22, 120 30 C 128 22, 126 12, 120 4 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="120" cy="18" r="2" fill="currentColor" opacity="0.85" />

      {/* Left S-Curve Vine with Blooming Petals */}
      <path
        d="M 112 24 C 95 24, 80 12, 60 16 C 45 19, 32 30, 15 26"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Left Side Petal Buds */}
      <path
        d="M 85 16 C 82 10, 75 8, 72 13 C 76 17, 81 18, 85 16 Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <path
        d="M 52 18 C 50 12, 43 11, 41 16 C 45 20, 49 20, 52 18 Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <circle cx="15" cy="26" r="2" fill="currentColor" opacity="0.9" />

      {/* Right S-Curve Vine with Blooming Petals (Symmetric Mirror) */}
      <path
        d="M 128 24 C 145 24, 160 12, 180 16 C 195 19, 208 30, 225 26"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Right Side Petal Buds */}
      <path
        d="M 155 16 C 158 10, 165 8, 168 13 C 164 17, 159 18, 155 16 Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <path
        d="M 188 18 C 190 12, 197 11, 199 16 C 195 20, 191 20, 188 18 Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <circle cx="225" cy="26" r="2" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/**
 * Royal Palatial Jaali Latticework Background Pattern
 * Repeating geometric star & hexagonal tessellation in delicate matte gold/white linework,
 * providing rich palatial texture similar to the homepage background.
 */
export function RoyalPalatialJaaliTapestry({ className = "absolute inset-0 w-full h-full text-[#c5a059]" }: SVGProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.12 }}
    >
      <defs>
        <pattern
          id="royal-jaali-pattern"
          x="0"
          y="0"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Outer Grid Wireframe */}
          <rect x="0" y="0" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

          {/* Central 8-Pointed Star Jaali Motif */}
          <polygon
            points="40,16 46,28 58,28 48,36 52,48 40,40 28,48 32,36 22,28 34,28"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.75"
          />

          {/* Inner Lotus Rosette in Star */}
          <circle cx="40" cy="34" r="3.5" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
          <circle cx="40" cy="34" r="1.2" fill="currentColor" opacity="0.8" />

          {/* 4 Corner 8-Point Star Fragments */}
          <polygon
            points="0,6 4,12 10,12 5,16 7,22 0,18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />
          <polygon
            points="80,6 76,12 70,12 75,16 73,22 80,18"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />
          <polygon
            points="0,74 4,68 10,68 5,64 7,58 0,62"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />
          <polygon
            points="80,74 76,68 70,68 75,64 73,58 80,62"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.5"
          />

          {/* Diagonal Interlacing Connector Bands */}
          <line x1="0" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
          <line x1="40" y1="0" x2="40" y2="80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#royal-jaali-pattern)" />
    </svg>
  );
}
