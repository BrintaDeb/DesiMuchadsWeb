"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Activity, X, ChevronRight, ShieldCheck, Zap } from "lucide-react";

interface LiveActivityPillProps {
  onOpenKundli: () => void;
}

const ACTIVITIES = [
  {
    tag: "LIVE AUDIT",
    text: "Founder in Indiranagar, Bengaluru ran Brand Kundli",
    time: "2m ago",
    metric: "+65% Lift",
  },
  {
    tag: "SENTINEL HEALTH",
    text: "100% Platform Uptime verified (avg 38ms TTFB)",
    time: "Just now",
    metric: "4/4 Healthy",
  },
  {
    tag: "SCALE WINNER",
    text: "D2C Fashion client unlocked 4.8X ROAS milestone",
    time: "14m ago",
    metric: "₹18.5L GMV",
  },
  {
    tag: "BAITHAK BOOKED",
    text: "Strategy Call scheduled for South Delhi D2C founder",
    time: "28m ago",
    metric: "Chai Ready",
  },
];

export function LiveActivityPill({ onOpenKundli }: LiveActivityPillProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [isDismissed, isHovered]);

  if (isDismissed) return null;

  const current = ACTIVITIES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-3 p-2.5 pr-3 rounded-full ios-glass-panel shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-white/20 select-none animate-in slide-in-from-bottom-4 duration-500 max-w-md group"
    >
      {/* Live Pulsing Beacon */}
      <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/40 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="absolute w-4 h-4 rounded-full border border-emerald-400/40 animate-ping pointer-events-none" />
      </div>

      {/* Activity Ticker Content */}
      <div
        onClick={() => {
          sound.playChime();
          onOpenKundli();
        }}
        className="flex flex-col min-w-0 cursor-pointer pr-1"
        title="Click to run your brand's Kundli audit"
      >
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
            {current.tag}
          </span>
          <span className="text-[9px] font-mono text-zinc-500">• {current.time}</span>
        </div>
        <p className="text-xs font-sans text-zinc-200 truncate font-medium group-hover:text-white transition-colors">
          {current.text}
        </p>
      </div>

      {/* Metric Badge */}
      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white shrink-0 hidden lg:inline">
        {current.metric}
      </span>

      {/* Quick Action arrow */}
      <button
        type="button"
        onClick={() => {
          sound.playChime();
          onOpenKundli();
        }}
        className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors shrink-0"
        title="Audit My Brand"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          sound.playPluck(120);
          setIsDismissed(true);
        }}
        className="p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors shrink-0"
        title="Dismiss activity updates"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
