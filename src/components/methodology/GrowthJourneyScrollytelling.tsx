"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import {
  AlertTriangle,
  Cpu,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { BreydaqsButton } from "../common/BreydaqsButton";

interface GrowthJourneyScrollytellingProps {
  onOpenKundli: () => void;
  className?: string;
}

const STAGES = [
  {
    id: "stage-1",
    num: "STAGE 01",
    title: "The Diagnostic & Revenue Bleed",
    subtitle: "Where Challenger Brands Silently Lose Capital",
    icon: AlertTriangle,
    accentColor: "#ef4444",
    accentBg: "bg-red-500/15 border-red-500/30 text-red-400",
    summary:
      "Most growing e-commerce brands burn ₹3L–₹15L/month on generic agency retainers. The agency reports vanity 4x ROAS on dashboard metrics, but once return-to-origin (RTO), gateway cuts, and inventory carrying costs are calculated, net profit is negative.",
    leaks: [
      "Bloated 6+ second page loads causing 68% mobile checkout abandonment",
      "Creative ad fatigue: consumers scroll past generic template banners within 0.8s",
      "Blind bid algorithms optimizing for cheap clicks rather than high-LTV repeat buyers",
      "Third-party marketplaces taking 18–25% commission while holding customer data hostage",
    ],
    telemetry: {
      headline: "DIAGNOSTIC AUDIT",
      roas: "1.2X Real",
      speed: "6.4s TTFB",
      cvr: "0.9% CVR",
      rto: "34% High RTO",
    },
  },
  {
    id: "stage-2",
    num: "STAGE 02",
    title: "The Performance Architecture",
    subtitle: "Sub-Second Edge Infrastructure & High-Hook Storytelling",
    icon: Cpu,
    accentColor: "#3b82f6",
    accentBg: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    summary:
      "We replace bloated templates with bespoke Next.js Edge infrastructure and deploy culturally resonant creative angles that arrest user attention in the first 1.5 seconds. Every single marketing rupee is tied to Contribution Margin (CM3).",
    leaks: [
      "Sub-400ms progressive WebP streaming with zero Cumulative Layout Shift (CLS)",
      "High-retention 3-second psychological hook formulas scripted for regional cultural resonance",
      "Dynamic 1-tap instant checkout eliminating multi-step form drop-offs",
      "Data-driven bid orchestration feeding verified offline purchase signals back to Meta/Google pixels",
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
    id: "stage-3",
    num: "STAGE 03",
    title: "Sovereign Market Scale",
    subtitle: "Category Dominance & Mathematical Compounding",
    icon: TrendingUp,
    accentColor: "#10b981",
    accentBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-400",
    summary:
      "Your brand transitions from an ambitious label to a category-defining powerhouse. We sustain 4.8x–6.2x blended ROAS, unlock 10-minute Quick Commerce dark store velocity, and turn first-time buyers into loyal brand advocates.",
    leaks: [
      "4.8x–6.2x verified blended ROAS with daily transparent contribution margin tracking",
      "Predictable retention: 90-day repeat subscription rates exceeding 78%",
      "Omnichannel expansion into Blinkit, Zepto, and Instamart dark stores in 14 days",
      "Enterprise brand valuation lift backed by auditable first-party customer cohorts",
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
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const activeStage = STAGES[activeStageIndex];

  return (
    <section className={`relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 ${className}`}>
      {/* Header with Breydaqs Monospace Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
            How We Turn Bleeding Ad Spend Into Category Dominance
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-sans">
          Explore our operational playbook across three progressive stages of e-commerce brand engineering.
        </p>
      </div>

      {/* 3-Stage Selector Tabs (Breydaqs Micro-Radii) */}
      <div className="flex items-center gap-2 mb-8 p-1 rounded-[0.2rem] bg-[#121211] border border-[rgba(232,232,227,0.18)] max-w-xl">
        {STAGES.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => {
                sound.playPluck(140 + idx * 20);
                setActiveStageIndex(idx);
              }}
              className={`flex-1 py-2 sm:py-2.5 px-3 rounded-[0.2rem] text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{stg.num}</span>
              <span className="hidden sm:inline">• {stg.title.split(" ")[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Container */}
      <SpotlightCard
        isGlass={true}
        className="p-6 sm:p-10 lg:p-12 rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.18)] shadow-2xl relative overflow-hidden transition-all duration-500"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Deliverables */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-[0.2rem] text-xs font-mono font-bold uppercase border ${activeStage.accentBg}`}
              >
                {activeStage.num}
              </span>
              <span className="text-xs font-mono text-zinc-400">{activeStage.subtitle}</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
              {activeStage.title}
            </h3>

            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
              {activeStage.summary}
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {activeStage.leaks.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {activeStageIndex === 0 ? (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        activeStageIndex === 1 ? "text-blue-400" : "text-emerald-400"
                      }`}
                    />
                  )}
                  <span className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Kinetic Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <BreydaqsButton
                onClick={onOpenKundli}
                variant="white"
                className="py-3 px-6 text-xs w-full sm:w-auto"
              >
                REQUEST GROWTH AUDIT
              </BreydaqsButton>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(180);
                  setActiveStageIndex((prev) => (prev + 1) % STAGES.length);
                }}
                className="min-h-[44px] px-4 py-2.5 rounded-[0.2rem] border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-zinc-300 hover:text-white transition-all uppercase tracking-wider cursor-pointer w-full sm:w-auto"
              >
                Next Phase ({((activeStageIndex + 1) % STAGES.length) + 1}/{STAGES.length}) →
              </button>
            </div>
          </div>

          {/* Right Column: Live Campaign Performance HUD */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-[0.25rem] bg-[#121211] border border-white/10 sm:backdrop-blur-xl shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  {activeStage.telemetry.headline}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>0{activeStageIndex + 1}/0{STAGES.length}</span>
                </span>
              </div>

              {/* Interactive System Flow Progress Segmented Bar */}
              <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="System maturity progress">
                {STAGES.map((st, idx) => {
                  const isPassed = idx <= activeStageIndex;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        sound.playPluck(150 + idx * 25);
                        setActiveStageIndex(idx);
                      }}
                      className="text-left group cursor-pointer focus:outline-none"
                    >
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden mb-1.5">
                        <div
                          className="h-full w-full rounded-full transition-transform duration-500 origin-left"
                          style={{
                            transform: `scaleX(${isPassed ? 1 : 0})`,
                            backgroundColor: isPassed ? activeStage.accentColor : "transparent",
                          }}
                        />
                      </div>
                      <span
                        className={`block text-[9px] font-mono uppercase tracking-wider transition-colors ${
                          idx === activeStageIndex ? "text-white font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {st.num}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Measured Metric */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400">MEASURED BENCHMARK</span>
                <div
                  className="font-metric font-black text-4xl sm:text-5xl tracking-tight transition-colors duration-500"
                  style={{ color: activeStage.accentColor }}
                >
                  {activeStage.telemetry.roas}
                </div>
              </div>

              {/* Grid of Micro Signals with Visual Efficiency Meters */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                {[
                  {
                    label: "SPEED",
                    val: activeStage.telemetry.speed,
                    pct: activeStageIndex === 0 ? 0.22 : activeStageIndex === 1 ? 0.86 : 0.99,
                  },
                  {
                    label: "CVR",
                    val: activeStage.telemetry.cvr,
                    pct: activeStageIndex === 0 ? 0.18 : activeStageIndex === 1 ? 0.72 : 0.95,
                  },
                  {
                    label: "RTO RISK",
                    val: activeStage.telemetry.rto,
                    pct: activeStageIndex === 0 ? 0.34 : activeStageIndex === 1 ? 0.76 : 0.94,
                  },
                ].map((sig) => (
                  <div
                    key={sig.label}
                    className="p-3 rounded-[0.2rem] bg-black/40 border border-white/10 text-center flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 block mb-0.5">{sig.label}</span>
                      <span className="font-metric font-bold text-xs text-white block">
                        {sig.val}
                      </span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full transition-transform duration-500 origin-left"
                        style={{
                          transform: `scaleX(${sig.pct})`,
                          backgroundColor: activeStage.accentColor,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-[0.2rem] bg-black/20 border border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed text-left">
                ✦ Real-time operational data modeled from 50 verified e-commerce cohort studies.
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
