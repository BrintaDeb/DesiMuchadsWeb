"use client";

import React from "react";

interface WatchDialVisualizerProps {
  dialName: string;
  caseText: string;
  strapName: string;
  brandName: string;
}

export function WatchDialVisualizer({
  dialName,
  caseText,
  strapName,
  brandName,
}: WatchDialVisualizerProps) {
  const dn = dialName.toLowerCase();
  const sn = strapName.toLowerCase();

  const dialBg = dn.includes("blue")
    ? "#0E294B"
    : dn.includes("ivory") || dn.includes("silver")
    ? "#EAE2D0"
    : dn.includes("rose")
    ? "#2A1815"
    : dn.includes("titanium")
    ? "#2E343D"
    : "#0B0D12";

  const isLightDial = dn.includes("ivory") || dn.includes("silver");
  const numeralColor = isLightDial
    ? "#1E1914"
    : dn.includes("rose")
    ? "#F3D3B8"
    : "#E5C158";
  const caseColor = dn.includes("rose")
    ? "#C68B6B"
    : dn.includes("matte")
    ? "#2A2E37"
    : "#9CA3AF";
  const caseInner = dn.includes("rose")
    ? "#8B573C"
    : dn.includes("matte")
    ? "#14171D"
    : "#D1D5DB";

  const isSteelStrap = sn.includes("steel") || sn.includes("oyster");
  const isMeshStrap = sn.includes("milanese") || sn.includes("mesh");
  const strapColor = isSteelStrap
    ? "#4B5563"
    : isMeshStrap
    ? "#6B7280"
    : "#1E1916";

  return (
    <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-black/40 border border-white/10">
      <div className="w-44 h-56 flex items-center justify-center relative">
        <svg
          viewBox="0 0 180 230"
          className="w-full h-full drop-shadow-[0_18px_36px_rgba(0,0,0,0.85)]"
          role="img"
          aria-label={`${brandName} ${dialName} on ${strapName}`}
        >
          {/* Top Strap */}
          <rect x="60" y="6" width="60" height="58" rx="6" fill={strapColor} />
          {isSteelStrap && (
            <g stroke="#1F2937" strokeWidth="1.5">
              <line x1="60" y1="22" x2="120" y2="22" />
              <line x1="60" y1="38" x2="120" y2="38" />
              <line x1="78" y1="6" x2="78" y2="64" />
              <line x1="102" y1="6" x2="102" y2="64" />
            </g>
          )}
          {isMeshStrap && (
            <g stroke="#374151" strokeWidth="1">
              <line x1="60" y1="16" x2="120" y2="16" />
              <line x1="60" y1="26" x2="120" y2="26" />
              <line x1="60" y1="36" x2="120" y2="36" />
              <line x1="60" y1="46" x2="120" y2="46" />
            </g>
          )}
          {!isSteelStrap && !isMeshStrap && (
            <g stroke="#9CA3AF" strokeOpacity="0.35" strokeDasharray="3 3" strokeWidth="1">
              <line x1="67" y1="10" x2="67" y2="56" />
              <line x1="113" y1="10" x2="113" y2="56" />
            </g>
          )}

          {/* Bottom Strap */}
          <rect x="60" y="166" width="60" height="58" rx="6" fill={strapColor} />
          {isSteelStrap && (
            <g stroke="#1F2937" strokeWidth="1.5">
              <line x1="60" y1="184" x2="120" y2="184" />
              <line x1="60" y1="202" x2="120" y2="202" />
              <line x1="78" y1="166" x2="78" y2="224" />
              <line x1="102" y1="166" x2="102" y2="224" />
            </g>
          )}
          {!isSteelStrap && !isMeshStrap && (
            <g stroke="#9CA3AF" strokeOpacity="0.35" strokeDasharray="3 3" strokeWidth="1">
              <line x1="67" y1="172" x2="67" y2="218" />
              <line x1="113" y1="172" x2="113" y2="218" />
            </g>
          )}

          {/* Crown */}
          <rect x="155" y="106" width="9" height="18" rx="3" fill={caseColor} />

          {/* Watch Outer Case & Bezel */}
          <circle cx="90" cy="115" r="68" fill={caseColor} />
          <circle cx="90" cy="115" r="64" fill={caseInner} />
          <circle cx="90" cy="115" r="59" fill={dialBg} />

          {/* Chapter Ring Markers */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const angle = (idx * 30 * Math.PI) / 180;
            const x1 = 90 + Math.sin(angle) * 51;
            const y1 = 115 - Math.cos(angle) * 51;
            const x2 = 90 + Math.sin(angle) * 55;
            const y2 = 115 - Math.cos(angle) * 55;
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={numeralColor}
                strokeWidth={idx % 3 === 0 ? "2.4" : "1.2"}
                strokeLinecap="round"
              />
            );
          })}

          {/* Dial Typography */}
          <text
            x="90"
            y="88"
            textAnchor="middle"
            fill={numeralColor}
            fontSize="7"
            fontWeight="700"
            letterSpacing="1.8"
          >
            DARBAR
          </text>
          <text
            x="90"
            y="148"
            textAnchor="middle"
            fill={numeralColor}
            fillOpacity="0.7"
            fontSize="5"
            letterSpacing="1.2"
          >
            CHRONOMETER · SWISS
          </text>

          {/* Sub-Seconds Dial */}
          <circle
            cx="90"
            cy="132"
            r="11"
            fill="none"
            stroke={numeralColor}
            strokeOpacity="0.3"
            strokeWidth="0.9"
          />

          {/* Watch Hands (10:10 iconic horology pose) */}
          <line
            x1="90"
            y1="115"
            x2="66"
            y2="101"
            stroke={numeralColor}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="115"
            x2="122"
            y2="92"
            stroke={numeralColor}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <line
            x1="90"
            y1="115"
            x2="112"
            y2="146"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="90" cy="115" r="3.5" fill={numeralColor} />
        </svg>
      </div>
      <div className="text-center mt-2 space-y-0.5">
        <div className="text-xs font-semibold text-white">{dialName}</div>
        <div className="text-[10px] font-mono text-zinc-400">
          {caseText} · {strapName}
        </div>
      </div>
    </div>
  );
}
