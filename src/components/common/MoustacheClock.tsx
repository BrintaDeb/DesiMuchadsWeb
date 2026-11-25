"use client";

import React, { useState, useEffect, useId, useSyncExternalStore } from "react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface MoustacheClockProps {
  size?: "xs" | "sm" | "md" | "lg" | number;
  timeZone?: string;
  showDigital?: boolean;
  label?: string;
  className?: string;
  dialTheme?: "dark" | "light" | "stone";
}

/**
 * Authentic Moustache Analog Clock (Vector SVG Engine)
 * Guarantees mathematical centering of hour, minute, and second hands at (50, 50).
 * Features live ticking IST (Asia/Kolkata), textured dial, 1-12 numerals,
 * the official white moustache logo, and interactive tactile click/hover features.
 */
export function MoustacheClock({
  size = "md",
  timeZone = "Asia/Kolkata",
  showDigital = false,
  label,
  className = "",
  dialTheme = "dark",
}: MoustacheClockProps) {
  const uid = useId().replace(/:/g, "");
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  }>({
    hours: 10,
    minutes: 10,
    seconds: 30,
    formatted: "10:10:30 AM",
  });

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
      });

      const parts = formatter.formatToParts(now);
      let h = 0;
      let m = 0;
      let s = 0;

      parts.forEach((part) => {
        if (part.type === "hour") h = parseInt(part.value, 10) % 24;
        if (part.type === "minute") m = parseInt(part.value, 10);
        if (part.type === "second") s = parseInt(part.value, 10);
      });

      const time12Str = new Intl.DateTimeFormat("en-IN", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      setTime({
        hours: h,
        minutes: m,
        seconds: s,
        formatted: time12Str,
      });
    };

    const initRaf = requestAnimationFrame(updateTime);
    const interval = setInterval(updateTime, 1000);
    return () => {
      cancelAnimationFrame(initRaf);
      clearInterval(interval);
    };
  }, [timeZone]);

  // Dimension mapping
  let pixelSize = 96;
  if (typeof size === "number") {
    pixelSize = size;
  } else {
    switch (size) {
      case "xs":
        pixelSize = 24;
        break;
      case "sm":
        pixelSize = 48;
        break;
      case "md":
        pixelSize = 100;
        break;
      case "lg":
        pixelSize = 180;
        break;
    }
  }

  // Exact rotation angles (0-360)
  const secondAngle = (time.seconds / 60) * 360;
  const minuteAngle = ((time.minutes + time.seconds / 60) / 60) * 360;
  const hourAngle =
    (((time.hours % 12) + time.minutes / 60 + time.seconds / 3600) / 12) * 360;

  // 12 Hour Numerals positioned at 30° intervals
  const numerals = [
    { num: "12", angle: 0 },
    { num: "1", angle: 30 },
    { num: "2", angle: 60 },
    { num: "3", angle: 90 },
    { num: "4", angle: 120 },
    { num: "5", angle: 150 },
    { num: "6", angle: 180 },
    { num: "7", angle: 210 },
    { num: "8", angle: 240 },
    { num: "9", angle: 270 },
    { num: "10", angle: 300 },
    { num: "11", angle: 330 },
  ];

  const isMini = pixelSize <= 32;
  const isLightOrStone = dialTheme === "light" || dialTheme === "stone";

  const handleClick = () => {
    sound.playPluck(190);
    haptics.medium();
    setShowTooltip((prev) => !prev);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none group cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      title={`Desi Muchads Studio Horology · Live IST: ${time.formatted}`}
      aria-label={`Live Indian Standard Time: ${time.formatted}`}
    >
      {/* SVG Analog Clock Face */}
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        className="transition-transform duration-300 group-hover:scale-105 active:scale-95 drop-shadow-xl overflow-visible"
      >
        <defs>
          {/* Dial Gradient */}
          <radialGradient id={`clockGrad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isLightOrStone ? "#f4f4f0" : "#1a1a1e"} />
            <stop offset="85%" stopColor={isLightOrStone ? "#deded8" : "#111114"} />
            <stop offset="100%" stopColor={isLightOrStone ? "#c5c5be" : "#08080a"} />
          </radialGradient>

          {/* Dial Outer Bezel Gradient */}
          <linearGradient id={`bezelGrad-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLightOrStone ? "#ffffff" : "rgba(255,255,255,0.3)"} />
            <stop offset="50%" stopColor={isLightOrStone ? "#999990" : "rgba(255,255,255,0.08)"} />
            <stop offset="100%" stopColor={isLightOrStone ? "#555550" : "rgba(255,255,255,0.2)"} />
          </linearGradient>
        </defs>

        {/* Outer Shadow Ring */}
        <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />

        {/* Outer Bezel Rim */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill={`url(#clockGrad-${uid})`}
          stroke={`url(#bezelGrad-${uid})`}
          strokeWidth="2.5"
        />

        {/* Subtle Inner Dial Ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke={isLightOrStone ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"}
          strokeWidth="0.8"
        />

        {/* Hour Tick Marks (Every 30 degrees) */}
        {!isMini &&
          [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="50"
              y1="6"
              x2="50"
              y2={deg % 90 === 0 ? "10" : "8"}
              stroke={
                isLightOrStone
                  ? deg % 90 === 0
                    ? "#111111"
                    : "#666666"
                  : deg % 90 === 0
                  ? "#ffffff"
                  : "rgba(255,255,255,0.4)"
              }
              strokeWidth={deg % 90 === 0 ? "1.4" : "0.8"}
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
            />
          ))}

        {/* 12 Hour Numerals (Rendered if size > 32px) */}
        {!isMini &&
          numerals.map(({ num, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const rOffset = 36.5;
            const x = 50 + rOffset * Math.sin(rad);
            const y = 50 - rOffset * Math.cos(rad);
            const fontSize = Math.max(6, Math.min(8.5, 7.5));

            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={fontSize}
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill={isLightOrStone ? "#111111" : "#ffffff"}
                opacity={0.92}
                className="select-none pointer-events-none"
              >
                {num}
              </text>
            );
          })}

        {/* CENTER LOGO: Authentic Desi Muchads White Moustache */}
        {/* Exactly centered at (50, 50) */}
        <g transform="translate(50, 50)">
          <image
            href="/desi-muchads-cropped-logo.png"
            x={isMini ? "-15" : "-19"}
            y={isMini ? "-8" : "-10"}
            width={isMini ? "30" : "38"}
            height={isMini ? "16" : "20"}
            preserveAspectRatio="xMidYMid meet"
            className={
              isLightOrStone
                ? "invert brightness-0 opacity-90"
                : "opacity-95 filter drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
            }
          />
        </g>

        {/* ROTATING CLOCK HANDS (Origin: exactly (50, 50)) */}

        {/* 1. Hour Hand (Length: 22 units, Width: 2.8 units) */}
        <rect
          x="48.6"
          y="28"
          width="2.8"
          height="22"
          rx="1.4"
          fill={isLightOrStone ? "#181818" : "#ffffff"}
          transform={`rotate(${mounted ? hourAngle : 310} 50 50)`}
          className="transition-transform duration-300 ease-out"
        />

        {/* 2. Minute Hand (Length: 34 units, Width: 1.8 units) */}
        <rect
          x="49.1"
          y="16"
          width="1.8"
          height="34"
          rx="0.9"
          fill={isLightOrStone ? "#2a2a2a" : "#e4e4e7"}
          transform={`rotate(${mounted ? minuteAngle : 55} 50 50)`}
          className="transition-transform duration-300 ease-out"
        />

        {/* 3. Second Hand (Emerald Needle with Counterweight Tail) */}
        {!isMini && (
          <g transform={`rotate(${mounted ? secondAngle : 180} 50 50)`} className="transition-transform duration-150 ease-linear">
            {/* Needle Body */}
            <line
              x1="50"
              y1="58"
              x2="50"
              y2="10"
              stroke="#34d399"
              strokeWidth="0.85"
              strokeLinecap="round"
            />
            {/* Counterweight Tail Circle */}
            <circle cx="50" cy="54" r="1.5" fill="#34d399" />
          </g>
        )}

        {/* 4. Center Pinion Cap (Rivet / Axis Anchor) */}
        <circle
          cx="50"
          cy="50"
          r="2.8"
          fill="#ffffff"
          stroke="#000000"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="50" r="1" fill="#000000" />
      </svg>

      {/* Interactive Hover Tooltip */}
      {showTooltip && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg bg-black/90 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] whitespace-nowrap shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>IST: {time.formatted}</span>
          </div>
          <span className="text-[9px] text-zinc-400 block mt-0.5">
            Bengaluru HQ (GMT+5:30)
          </span>
        </div>
      )}

      {/* Optional Digital Readout & Label */}
      {(showDigital || label) && (
        <div className="mt-2 text-center pointer-events-none">
          {label && (
            <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              {label}
            </span>
          )}
          {showDigital && (
            <span className="font-mono text-xs font-bold text-white tracking-wider flex items-center justify-center gap-1.5 mt-0.5">
              <span>{time.formatted}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
