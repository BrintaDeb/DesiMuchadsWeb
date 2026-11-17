"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import {
  AlertTriangle,
  Cpu,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface GrowthJourneyScrollytellingProps {
  onOpenKundli: () => void;
  className?: string;
}

const ACTS = [
  {
    id: "act-1",
    num: "ACT 01",
    title: "The Bleed (Mushkil)",
    subtitle: "Where Challenger Brands Silently Lose Capital",
    icon: AlertTriangle,
    accentColor: "#ef4444",
    accentBg: "bg-red-500/15 border-red-500/30 text-red-400",
    summary:
      "Most Indian D2C brands burn ₹3L–₹15L/mo on generic agency retainers. The agency reports vanity 4x ROAS on platform dashboards, but once RTO (returns), gateway cuts, and inventory carrying costs are calculated, the founder is bleeding cash.",
    leaks: [
      "Bloated 6+ second page loads causing 68% mobile checkout abandonment",
      "Creative ad fatigue: audiences scroll past generic Canva banners within 0.8s",
      "Blind bid algorithms optimizing for cheap clicks rather than high-LTV repeat buyers",
      "Third-party marketplaces taking 18–25% commission while holding customer data hostage",
    ],
    telemetry: {
      headline: "DIAGNOSTIC TELEMETRY",
      roas: "1.2X Real",
      speed: "6.4s TTFB",
      cvr: "0.9% CVR",
      rto: "34% High RTO",
    },
  },
  {
    id: "act-2",
    num: "ACT 02",
    title: "The Architecture (Jugaad)",
    subtitle: "Engineering Sub-Second Speed & Vernacular Swagger",
    icon: Cpu,
    accentColor: "#3b82f6",
    accentBg: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    summary:
      "We replace bloated templates with bespoke Next.js Edge infrastructure and deploy street-smart Hinglish creative angles that arrest the thumb in the first 1.5 seconds. Every single rupee is mapped to Contribution Margin (CM3).",
    leaks: [
      "Sub-400ms progressive WebP streaming with 0 Cumulative Layout Shift (CLS)",
      "Vernacular 3-second psychological hook formulas scripted for regional cultural pride",
      "Dynamic 1-tap UPI and Instant WhatsApp checkout eliminating 4 form steps",
      "Algorithmic bid orchestration feeding real offline purchase signals back to Meta/Google pixels",
    ],
    telemetry: {
      headline: "ENGINEERING RECONSTRUCTION",
      roas: "3.8X Lift",
      speed: "0.4s Edge",
      cvr: "3.8% CVR",
      rto: "14% Low RTO",
    },
  },
  {
    id: "act-3",
    num: "ACT 03",
    title: "The Sovereign Scale (Nateeja)",
    subtitle: "Category Dominance & Mathematical Compounding",
    icon: TrendingUp,
    accentColor: "#10b981",
    accentBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-400",
    summary:
      "Your brand scales from a challenger label to a category defining powerhouse. We lock in consistent 4.8x–6.2x blended ROAS, unlock 10-minute Quick Commerce dark store velocity, and turn first-time buyers into loyal brand evangelists.",
    leaks: [
      "4.8x–6.2x verified blended ROAS with daily transparent contribution margin tracking",
      "Zero customer drift: 90-day repeat subscription retention exceeding 78%",
      "Omnichannel expansion into Blinkit, Zepto, and Instamart dark stores in 14 days",
      "Brand enterprise valuation lift with clean, auditable first-party customer cohort data",
    ],
    telemetry: {
      headline: "SOVEREIGN COMPOUNDING",
      roas: "5.4X Blended",
      speed: "99 PageSpeed",
      cvr: "5.2% CVR",
      rto: "8% Minimal",
    },
  },
];

export function GrowthJourneyScrollytelling({
  onOpenKundli,
  className = "",
}: GrowthJourneyScrollytellingProps) {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const activeAct = ACTS[activeActIndex];

  return (
    <section className={`relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2">
          THE ANATOMY OF GROWTH (3-ACT METHODOLOGY)
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
          How We Turn Bleeding Ad Spend Into Category Dominance
        </h2>
        <p className="mt-3 text-xs sm:text-base text-zinc-400 font-sans leading-relaxed">
          Explore our operational playbook across the three progressive phases of brand transformation.
        </p>

        {/* 3-Act Selector Pills */}
        <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-lg mx-auto">
          {ACTS.map((act, idx) => {
            const isActive = idx === activeActIndex;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  sound.playPluck(140 + idx * 20);
                  setActiveActIndex(idx);
                }}
                className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg scale-[1.02]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{act.num}</span>
                <span className="hidden sm:inline">• {act.title.split(" ")[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <SpotlightCard
        isGlass={true}
        className="p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden transition-all duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Specific Deliverables (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${activeAct.accentBg}`}
              >
                {activeAct.num}
              </span>
              <span className="text-xs font-mono text-zinc-400">{activeAct.subtitle}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              {activeAct.title}
            </h3>

            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
              {activeAct.summary}
            </p>

            {/* Pillar Points Checklist */}
            <div className="space-y-3 pt-2">
              {activeAct.leaks.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {activeActIndex === 0 ? (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        activeActIndex === 1 ? "text-blue-400" : "text-emerald-400"
                      }`}
                    />
                  )}
                  <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="pt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-lg active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Audit My Brand Kundli</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(180);
                  setActiveActIndex((prev) => (prev + 1) % ACTS.length);
                }}
                className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                Next Phase →
              </button>
            </div>
          </div>

          {/* Right Column: Live Telemetry Instrument HUD (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-black/80 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  {activeAct.telemetry.headline}
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              {/* Big Metric Dial */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400">MEASURED OUTCOME</span>
                <div
                  className="font-metric font-black text-4xl sm:text-5xl tracking-tight transition-colors duration-500"
                  style={{ color: activeAct.accentColor }}
                >
                  {activeAct.telemetry.roas}
                </div>
              </div>

              {/* Grid of Micro Signals */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">SPEED</span>
                  <span className="font-metric font-bold text-xs text-white block">
                    {activeAct.telemetry.speed}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">CVR</span>
                  <span className="font-metric font-bold text-xs text-white block">
                    {activeAct.telemetry.cvr}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">RTO RISK</span>
                  <span className="font-metric font-bold text-xs text-white block">
                    {activeAct.telemetry.rto}
                  </span>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed text-left">
                ✦ Real-time operational data modeled from 50 verified Indian D2C cohort studies.
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
