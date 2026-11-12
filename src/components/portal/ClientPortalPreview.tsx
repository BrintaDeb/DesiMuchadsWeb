"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import {
  BarChart3,
  Kanban,
  Gauge,
  Receipt,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Download,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import { sound } from "@/lib/sound";

export function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "kanban" | "speed" | "billing">("telemetry");

  const tabs = [
    { id: "telemetry", label: "Live ROAS & Funnel Telemetry", icon: BarChart3 },
    { id: "kanban", label: "Reels Approval Pipeline", icon: Kanban },
    { id: "speed", label: "Web Speed & SEO Rank Tracker", icon: Gauge },
    { id: "billing", label: "GST Billing & Strategy Logs", icon: Receipt },
  ];

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

        {/* The Portal Mockup Window */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-[#121215] border border-white/15 border-t-white/30 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white" position="top-right" />
          </div>

          {/* Window Top Controls Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-zinc-600" />
              <span className="w-3 h-3 rounded-full bg-zinc-600" />
              <span className="w-3 h-3 rounded-full bg-zinc-600" />
              <span className="ml-3 text-zinc-300">darbar.desimuchads.com/client-portal</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE TELEMETRY SYNCED</span>
            </div>
          </div>

          {/* TAB 1: Live ROAS & Funnel Telemetry */}
          {activeTab === "telemetry" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Monthly Ad Spend</span>
                  <div className="text-2xl font-display font-extrabold text-white">₹4,50,000</div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ 99.8% Paced</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Net Tracked Revenue</span>
                  <div className="text-2xl font-display font-extrabold text-white">₹23,40,000</div>
                  <span className="text-[10px] font-mono text-zinc-300">✦ 5.2x Blended ROAS</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Customer Acq. Cost</span>
                  <div className="text-2xl font-display font-extrabold text-white">₹380</div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ -28% vs Target</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400 block">Qualified Purchases</span>
                  <div className="text-2xl font-display font-extrabold text-white">1,184 Orders</div>
                  <span className="text-[10px] font-mono text-zinc-400">✦ 3.8% Conversion</span>
                </div>
              </div>

              {/* Simulated Chart Bars */}
              <div className="p-6 rounded-2xl bg-[#18181c] border border-white/10">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block mb-4">
                  Weekly Revenue vs. Ad Spend Trajectory (Last 4 Weeks)
                </span>
                <div className="h-44 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-white/10">
                  {[
                    { week: "Week 1", spend: 35, rev: 70 },
                    { week: "Week 2", spend: 42, rev: 85 },
                    { week: "Week 3", spend: 48, rev: 95 },
                    { week: "Week 4", spend: 50, rev: 100 },
                  ].map((w, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex items-end justify-center gap-2 h-32">
                        <div
                          className="w-4 sm:w-8 bg-zinc-700 rounded-t-md transition-all duration-500"
                          style={{ height: `${w.spend}%` }}
                          title={`Spend: ${w.spend}%`}
                        />
                        <div
                          className="w-4 sm:w-8 bg-white rounded-t-md transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                          style={{ height: `${w.rev}%` }}
                          title={`Revenue: ${w.rev}%`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">{w.week}</span>
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

              {/* Column 3: Ready for Client Review */}
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/30 space-y-3">
                <span className="font-mono text-xs text-white font-bold block">
                  3. READY FOR REVIEW (1)
                </span>
                <div className="p-3 rounded-xl bg-[#121215] border border-white/20 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-300">Needs Your Thumbs-Up</span>
                    <Flame className="w-3.5 h-3.5 text-white" />
                  </div>
                  <p className="font-bold text-white">&ldquo;Dilli Street Roast Viral Hook Cut v3&rdquo;</p>
                  <button className="w-full py-1.5 rounded-lg bg-white text-black text-[10px] font-mono font-bold hover:bg-zinc-200 transition-colors">
                    Approve Script (One-Click)
                  </button>
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
              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Tax Invoice: DM-2026-NOV-042 (GST Compliant)</span>
                  <span className="text-zinc-400 text-[11px]">Monthly Shahi Growth Retainer • ₹1,75,000 + 18% GST</span>
                </div>
                <span className="inline-flex items-center gap-1 text-white font-bold">
                  <CheckCircle2 className="w-4 h-4 text-white" /> Paid
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#18181c] border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Weekly Strategy War-Room Briefing (PDF)</span>
                  <span className="text-zinc-400 text-[11px]">November Week 1 • Prepared by Principal Creative Technologist</span>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/5 flex items-center gap-1.5 transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brief</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

