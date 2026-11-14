"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner } from "../common/Icons";
import { SpotlightCard } from "../common/SpotlightCard";
import {
  BarChart3,
  Kanban,
  Gauge,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Download,
  Flame,
  X,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/sound";
import confetti from "canvas-confetti";

export function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "kanban" | "speed" | "billing">("telemetry");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "q3">("30d");
  const [metricMode, setMetricMode] = useState<"blended" | "first_order" | "contribution">("blended");
  const [scriptApproved, setScriptApproved] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<"invoice" | "brief" | null>(null);

  const tabs = [
    { id: "telemetry", label: "Live ROAS & Funnel Telemetry", icon: BarChart3 },
    { id: "kanban", label: "Reels Approval Pipeline", icon: Kanban },
    { id: "speed", label: "Web Speed & SEO Rank Tracker", icon: Gauge },
    { id: "billing", label: "GST Billing & Strategy Logs", icon: Receipt },
  ];

  // Dynamic telemetry data based on selected time range
  const telemetryData = {
    "7d": {
      spend: "₹1,15,000",
      rev: "₹6,90,000",
      roas: "6.0x Blended",
      cac: "₹320",
      cacDiff: "-34% vs Target",
      orders: "359 Orders",
      convRate: "4.1%",
      weeks: [
        { label: "Day 1-2", spend: 28, rev: 68 },
        { label: "Day 3-4", spend: 32, rev: 78 },
        { label: "Day 5-6", spend: 35, rev: 88 },
        { label: "Today", spend: 38, rev: 95 },
      ],
    },
    "30d": {
      spend: "₹4,50,000",
      rev: "₹23,40,000",
      roas: "5.2x Blended",
      cac: "₹380",
      cacDiff: "-28% vs Target",
      orders: "1,184 Orders",
      convRate: "3.8%",
      weeks: [
        { label: "Week 1", spend: 35, rev: 70 },
        { label: "Week 2", spend: 42, rev: 85 },
        { label: "Week 3", spend: 48, rev: 95 },
        { label: "Week 4", spend: 50, rev: 100 },
      ],
    },
    "q3": {
      spend: "₹14,20,000",
      rev: "₹80,94,000",
      roas: "5.7x Blended",
      cac: "₹345",
      cacDiff: "-32% vs Target",
      orders: "4,115 Orders",
      convRate: "3.9%",
      weeks: [
        { label: "Month 1", spend: 30, rev: 65 },
        { label: "Month 2", spend: 45, rev: 88 },
        { label: "Month 3", spend: 55, rev: 100 },
        { label: "Q4 Pace", spend: 60, rev: 110 },
      ],
    },
  };

  const currentMetrics = telemetryData[timeRange];

  const handleApproveScript = () => {
    sound.playChime();
    setScriptApproved(true);
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
      });
    } catch {}
  };

  return (
    <section id="portal" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[160px] pointer-events-none" />

      <SectionDivider label="INSIDE THE DARBAR" sublabel="CLIENT PORTAL PREVIEW" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-zinc-300 mb-4">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>RADICAL TRANSPARENCY • NO HIDDEN AGENCY MARGINS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white">
            Zero Ghosting.{" "}
            <span className="text-gradient-silver block mt-1">
              100% Hisab-Kitab.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Every client gets 24/7 access to our custom Darbar portal. Track ad metrics in real time, approve scripts in one click, and see exactly where every Rupee goes.
          </p>

          {/* 4 Tabs Selector */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 p-1.5 rounded-2xl bg-[#121215] border border-white/15 max-w-2xl mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.playPluck(150);
                    setActiveTab(tab.id as typeof activeTab);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Portal Mockup Window with iOS 3D Tilt Glassmorphism */}
        <SpotlightCard maxTilt={3} className="ios-glass-panel rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-right" />
          </div>

          {/* Window Top Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-4 border-b border-white/10 font-mono text-xs text-zinc-400 gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-zinc-300">darbar.desimuchads.com/client-portal</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Interactive Time Horizon Switcher */}
              <div className="flex items-center gap-1 bg-[#18181c] p-1 rounded-lg border border-white/10">
                {(["7d", "30d", "q3"] as const).map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => {
                      sound.playPluck(130);
                      setTimeRange(range);
                    }}
                    className={`px-3 py-1 rounded text-xs transition-all ${
                      timeRange === range
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "Q3 Pace"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Telemetry Stream Ticker */}
          <div className="mb-6 p-2.5 sm:p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wider shrink-0">
                LIVE STREAM
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400 truncate text-[11px]">
                Order #DM-9428 placed · ₹3,499 via UPI · 6.2x ROAS · South Delhi Hub #04
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 ml-2">
              ⚡ Live SLA
            </span>
          </div>

          {/* TAB 1: Live ROAS & Funnel Telemetry */}
          {activeTab === "telemetry" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Metric Type Filters */}
              <div className="flex items-center justify-end gap-2 text-[11px] font-mono">
                <span className="text-zinc-500 mr-2">Metric Mode:</span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("blended");
                  }}
                  className={`px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    metricMode === "blended"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Blended Topline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("first_order");
                  }}
                  className={`px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    metricMode === "first_order"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  First-Order CAC
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setMetricMode("contribution");
                  }}
                  className={`px-2.5 py-1 rounded-md border text-xs transition-colors ${
                    metricMode === "contribution"
                      ? "border-white bg-white/10 text-white font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  Contribution Margin
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Ad Spend ({timeRange.toUpperCase()})</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.spend}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ 99.8% Paced Target</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Net Attributed Revenue</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.rev}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ {currentMetrics.roas}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Customer Acq. Cost (CAC)</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.cac}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ {currentMetrics.cacDiff}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Qualified Purchases</span>
                  <div className="text-2xl font-display font-extrabold text-white mt-1">
                    {currentMetrics.orders}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ {currentMetrics.convRate} Conversion</span>
                </div>
              </div>

              {/* Dynamic Animated Chart Bars */}
              <div className="p-6 rounded-2xl bg-[#18181c] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block">
                    Attributed Revenue vs. Ad Spend Trajectory
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Live API Sync</span>
                </div>
                <div className="h-44 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-white/10">
                  {currentMetrics.weeks.map((w, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center gap-2 h-32">
                        <div
                          className="w-4 sm:w-8 bg-zinc-700 rounded-t-md transition-all duration-500 hover:bg-zinc-600"
                          style={{ height: `${w.spend}%` }}
                          title={`Spend: ${w.spend}%`}
                        />
                        <div
                          className="w-4 sm:w-8 bg-white rounded-t-md transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-zinc-100"
                          style={{ height: `${w.rev}%` }}
                          title={`Revenue: ${w.rev}%`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">{w.label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 font-mono text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-zinc-700" />
                    <span>Ad Spend</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-white" />
                    <span>Attributed Revenue</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Creative & Reels Approval Pipeline */}
          {activeTab === "kanban" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {/* Column 1: Ideation */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                <span className="font-mono text-xs text-zinc-300 font-bold block">
                  1. IDEATION (3)
                </span>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">Reel Script</span>
                  <p className="font-bold text-white">&ldquo;5 Wedding Saree Mistakes NRI Brides Make&rdquo;</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">Meta Static</span>
                  <p className="font-bold text-white">&ldquo;Before vs After Pure Katan Silk Texture&rdquo;</p>
                </div>
              </div>

              {/* Column 2: Shooting */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                <span className="font-mono text-xs text-zinc-300 font-bold block">
                  2. SHOOTING (2)
                </span>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">Studio Shoot</span>
                  <p className="font-bold text-white">&ldquo;Varanasi Loom Documentary B-Roll 4K&rdquo;</p>
                </div>
              </div>

              {/* Column 3: Ready for Client Review (Interactive Approval) */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/30 space-y-3">
                <span className="font-mono text-xs text-white font-bold block">
                  3. READY FOR REVIEW (1)
                </span>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/20 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-300">
                      {scriptApproved ? "Status: Live" : "Needs Your Thumbs-Up"}
                    </span>
                    <Flame className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="font-bold text-white">&ldquo;Dilli Street Roast Viral Hook Cut v3&rdquo;</p>
                  
                  {scriptApproved ? (
                    <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono flex items-center gap-1.5 animate-in zoom-in-95 duration-200">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Approved! Pushed to Production Studio</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleApproveScript}
                      type="button"
                      className="btn-luxury-shine w-full py-2 rounded-lg bg-white text-black text-[11px] font-mono font-bold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Approve Script (One-Click)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Column 4: Live & Scaling */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 space-y-3">
                <span className="font-mono text-xs text-zinc-300 font-bold block">
                  4. LIVE & SCALING (4)
                </span>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">✦ 5.4x ROAS</span>
                  <p className="font-bold text-white">&ldquo;Bridal Kundli Quiz Funnel Hook&rdquo;</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400">✦ 4.9x ROAS</span>
                  <p className="font-bold text-white">&ldquo;Organic Chaiwala Street Drama&rdquo;</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Web Speed & SEO Rank Tracker */}
          {activeTab === "speed" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">Core Web Vitals Speed</span>
                  <div className="text-4xl font-display font-extrabold text-white">99/100</div>
                  <span className="text-xs font-mono text-zinc-400 mt-2 block">LCP 0.6s • FID 12ms</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">Top 3 Google Rankings</span>
                  <div className="text-4xl font-display font-extrabold text-white">42 Keywords</div>
                  <span className="text-xs font-mono text-zinc-400 mt-2 block">+18 Climbed This Month</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#18181c] border border-white/15 text-center">
                  <span className="font-mono text-xs text-zinc-400 block mb-2">AI GEO Engine Visibility</span>
                  <div className="text-4xl font-display font-extrabold text-white">88% Share</div>
                  <span className="text-xs font-mono text-zinc-400 mt-2 block">Recommended in Perplexity</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Transparent Billing & Reports */}
          {activeTab === "billing" && (
            <div className="space-y-4 animate-in fade-in duration-300 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white font-bold block text-sm">Tax Invoice: DM-2026-NOV-042 (GST Compliant)</span>
                  <span className="text-zinc-400 text-[11px]">Monthly Shahi Growth Retainer • ₹1,75,000 + 18% GST (SAC: 998311)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Paid
                  </span>
                  <button
                    onClick={() => {
                      sound.playPluck(170);
                      setActiveModal("invoice");
                    }}
                    type="button"
                    className="px-3 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/5 flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-white font-bold block text-sm">Weekly Strategy War-Room Briefing (PDF)</span>
                  <span className="text-zinc-400 text-[11px]">November Week 1 • Prepared by Principal Creative Technologist</span>
                </div>
                <button
                  onClick={() => {
                    sound.playPluck(170);
                    setActiveModal("brief");
                  }}
                  type="button"
                  className="px-3 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/5 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open Strategy Dossier</span>
                </button>
              </div>
            </div>
          )}
        </SpotlightCard>
      </div>

      {/* Interactive Invoice / Strategy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-[#101013] border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <h3 className="font-display font-extrabold text-base uppercase text-white">
                  {activeModal === "invoice" ? "GST Tax Invoice Preview" : "Strategy War-Room Brief"}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeModal === "invoice" ? (
              <div className="py-6 space-y-4 font-mono text-xs text-zinc-300">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-white font-bold block">DESI MUCHADS DIGITAL LLP</span>
                    <span className="text-[11px] text-zinc-500">GSTIN: 07AAECD5582M1ZX</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold block">Invoice #DM-2026-NOV-042</span>
                    <span className="text-[11px] text-zinc-500">Date: 01 Nov 2026</span>
                  </div>
                </div>

                <div className="space-y-2 py-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Performance Architecture Retainer (SAC 998311)</span>
                    <span className="text-white">₹1,75,000.00</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>IGST (18%)</span>
                    <span className="text-white">₹31,500.00</span>
                  </div>
                  <div className="flex justify-between text-white font-bold border-t border-white/10 pt-2 text-sm">
                    <span>Total Paid</span>
                    <span>₹2,06,500.00</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-white/10">
                  <span>Digitally Signed &amp; Bank Verified</span>
                  <button
                    onClick={() => {
                      sound.playChime();
                      window.print();
                    }}
                    type="button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black font-bold hover:bg-zinc-200"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-4 text-xs font-sans text-zinc-300">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-400">
                  <span className="text-white font-bold block mb-1">Key Action Directives (Nov W1):</span>
                  1. Scaling Meta ASC+ campaign budget from ₹15,000 to ₹25,000/day after 5.4x ROAS stability.<br />
                  2. Deployed 4 new vernacular Hinglish hook edits for Diwali gift hamper collection.<br />
                  3. Reduced Shopify checkout JS payloads, bringing Mobile LCP to 0.7 seconds.
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveModal(null)}
                    type="button"
                    className="px-4 py-2 rounded-xl bg-white text-black font-bold font-mono text-xs"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
