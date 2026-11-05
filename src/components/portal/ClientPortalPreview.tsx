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
    <section id="portal" className="relative py-28 sm:py-36 bg-[#0A0D18] text-[#F7F1E5] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[160px] pointer-events-none" />

      <SectionDivider label="INSIDE THE DARBAR" sublabel="CLIENT PORTAL PREVIEW" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0D9488]/40 bg-[#0D9488]/10 text-xs font-mono text-[#14B8A6] mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>RADICAL TRANSPARENCY • NO HIDDEN AGENCY MARGINS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F7F1E5]">
            Zero Ghosting.{" "}
            <span className="brass-gradient-text block mt-1">
              100% Hisab-Kitab.
            </span>
          </h2>
          <p className="mt-4 text-[#F7F1E5]/70 text-sm sm:text-base">
            Every client gets 24/7 access to our custom Darbar portal. Track ad metrics in real time, approve scripts in one click, and see exactly where every Rupee goes.
          </p>

          {/* 4 Tabs Selector */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 p-1.5 rounded-2xl bg-[#0D0C12] border border-[#D4AF37]/30 max-w-2xl mx-auto">
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
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                      : "text-white/60 hover:text-white"
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
        <div className="relative rounded-3xl p-6 sm:p-10 bg-[#0D0C12]/95 border-2 border-[#D4AF37]/40 shadow-[0_20px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-right" />
          </div>

          {/* Window Top Controls Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D4AF37]/15 font-mono text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-[#D4AF37]">darbar.desimuchads.com/client-portal</span>
            </div>
            <div className="flex items-center gap-2 text-[#0D9488]">
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
              <span>LIVE TELEMETRY SYNCED</span>
            </div>
          </div>

          {/* TAB 1: Live ROAS & Funnel Telemetry */}
          {activeTab === "telemetry" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#141829]/70 border border-[#D4AF37]/20">
                  <span className="text-[11px] font-mono text-white/60 block">Monthly Ad Spend</span>
                  <div className="text-2xl font-display font-extrabold text-[#F7F1E5]">₹4,50,000</div>
                  <span className="text-[10px] font-mono text-green-400">✦ 99.8% Paced</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#141829]/70 border border-[#D4AF37]/20">
                  <span className="text-[11px] font-mono text-white/60 block">Net Tracked Revenue</span>
                  <div className="text-2xl font-display font-extrabold text-[#F5DE88]">₹23,40,000</div>
                  <span className="text-[10px] font-mono text-[#0D9488]">✦ 5.2x Blended ROAS</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#141829]/70 border border-[#D4AF37]/20">
                  <span className="text-[11px] font-mono text-white/60 block">Customer Acq. Cost</span>
                  <div className="text-2xl font-display font-extrabold text-[#F7F1E5]">₹380</div>
                  <span className="text-[10px] font-mono text-green-400">✦ -28% vs Target</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#141829]/70 border border-[#D4AF37]/20">
                  <span className="text-[11px] font-mono text-white/60 block">Qualified Purchases</span>
                  <div className="text-2xl font-display font-extrabold text-[#F7F1E5]">1,184 Orders</div>
                  <span className="text-[10px] font-mono text-[#F59E0B]">✦ 3.8% Conversion</span>
                </div>
              </div>

              {/* Simulated Chart Bars */}
              <div className="p-6 rounded-2xl bg-[#141829]/40 border border-[#D4AF37]/15">
                <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider block mb-4">
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
                          className="w-4 sm:w-8 bg-[#C84B31] rounded-t-md transition-all duration-500"
                          style={{ height: `${w.spend}%` }}
                          title={`Spend: ${w.spend}%`}
                        />
                        <div
                          className="w-4 sm:w-8 bg-gradient-to-t from-[#D4AF37] to-[#F5DE88] rounded-t-md transition-all duration-500"
                          style={{ height: `${w.rev}%` }}
                          title={`Revenue: ${w.rev}%`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/60">{w.week}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 font-mono text-xs text-white/60">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#C84B31]" />
                    <span>Ad Spend</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#D4AF37]" />
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
              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-white/10 space-y-3">
                <span className="font-mono text-xs text-[#D4AF37] font-bold block">
                  1. IDEATION (3)
                </span>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-[#0D9488]">Reel Script</span>
                  <p className="font-bold text-white">"5 Wedding Saree Mistakes NRI Brides Make"</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-[#E11D48]">Meta Static</span>
                  <p className="font-bold text-white">"Before vs After Pure Katan Silk Texture"</p>
                </div>
              </div>

              {/* Column 2: Shooting */}
              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-white/10 space-y-3">
                <span className="font-mono text-xs text-[#F59E0B] font-bold block">
                  2. SHOOTING (2)
                </span>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-white/10 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-[#F59E0B]">Studio Shoot</span>
                  <p className="font-bold text-white">"Varanasi Loom Documentary B-Roll 4K"</p>
                </div>
              </div>

              {/* Column 3: Ready for Client Review */}
              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-[#D4AF37]/50 space-y-3">
                <span className="font-mono text-xs text-[#F5DE88] font-bold block">
                  3. READY FOR REVIEW (1)
                </span>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-[#D4AF37] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#D4AF37]">Needs Your Thumbs-Up</span>
                    <Flame className="w-3.5 h-3.5 text-[#E11D48]" />
                  </div>
                  <p className="font-bold text-white">"Dilli Street Roast Viral Hook Cut v3"</p>
                  <button className="w-full py-1.5 rounded-lg bg-[#0D9488] text-white text-[10px] font-mono font-bold">
                    Approve Script (One-Click)
                  </button>
                </div>
              </div>

              {/* Column 4: Live & Scaling */}
              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-[#0D9488]/40 space-y-3">
                <span className="font-mono text-xs text-[#0D9488] font-bold block">
                  4. LIVE & SCALING (4)
                </span>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-[#0D9488]/30 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-green-400">✦ 5.4x ROAS</span>
                  <p className="font-bold text-white">"Bridal Kundli Quiz Funnel Hook"</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0C12] border border-[#0D9488]/30 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-green-400">✦ 4.9x ROAS</span>
                  <p className="font-bold text-white">"Organic Chaiwala Street Drama"</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Web Speed & SEO Rank Tracker */}
          {activeTab === "speed" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#141829]/60 border border-[#0D9488]/40 text-center">
                  <span className="font-mono text-xs text-white/60 block mb-2">Core Web Vitals Speed</span>
                  <div className="text-4xl font-display font-extrabold text-[#0D9488]">99/100</div>
                  <span className="text-xs font-mono text-green-400 mt-2 block">LCP 0.6s • FID 12ms</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#141829]/60 border border-[#D4AF37]/40 text-center">
                  <span className="font-mono text-xs text-white/60 block mb-2">Top 3 Google Rankings</span>
                  <div className="text-4xl font-display font-extrabold text-[#F5DE88]">42 Keywords</div>
                  <span className="text-xs font-mono text-[#D4AF37] mt-2 block">+18 Climbed This Month</span>
                </div>
                <div className="p-6 rounded-2xl bg-[#141829]/60 border border-[#E11D48]/40 text-center">
                  <span className="font-mono text-xs text-white/60 block mb-2">AI GEO Engine Visibility</span>
                  <div className="text-4xl font-display font-extrabold text-[#E11D48]">88% Share</div>
                  <span className="text-xs font-mono text-white/80 mt-2 block">Recommended in Perplexity</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Transparent Billing & Reports */}
          {activeTab === "billing" && (
            <div className="space-y-4 animate-in fade-in duration-300 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Tax Invoice: DM-2026-NOV-042 (GST Compliant)</span>
                  <span className="text-white/60 text-[11px]">Monthly Shahi Growth Retainer • ₹1,75,000 + 18% GST</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[#0D9488] font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Paid
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#141829]/60 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Weekly Strategy War-Room Briefing (PDF)</span>
                  <span className="text-white/60 text-[11px]">November Week 1 • Prepared by Principal Creative Technologist</span>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center gap-1.5">
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

