"use client";

import React from "react";
import { Zap, Target, Users, BarChart3, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface WhyChooseUsSectionProps {
  onOpenKundli: () => void;
}

export function WhyChooseUsSection({ onOpenKundli }: WhyChooseUsSectionProps) {
  const pillars = [
    {
      id: "quick-results",
      icon: Zap,
      title: "QUICK RESULTS",
      desc: "No 6-month ramp-up lag. We launch rapid 7-day creative and media sprints to generate measurable orders and revenue from week one.",
    },
    {
      id: "easy-roi",
      icon: BarChart3,
      title: "EASY TO MEASURE ROI",
      desc: "We are ruthlessly ROI oriented. Every single Rupee deployed is mapped to verified revenue, blended ROAS, and bottom-line margins.",
    },
    {
      id: "broad-targeting",
      icon: Target,
      title: "BROAD AUDIENCE TARGETING OPTIONS",
      desc: "Leveraging sophisticated algorithmic broad and lookalike targeting to systematically discover and capture high-intent purchasers.",
    },
    {
      id: "partnership",
      icon: Users,
      title: "WE WORK WITH YOU, NOT SIMPLY FOR YOU",
      desc: "True partnership. Shared Slack/WhatsApp channels, daily live dashboards, transparent reporting, and zero agency ghosting.",
    },
  ];

  const stats = [
    { label: "EXPERIENCE", value: "8+ Years" },
    { label: "HAPPY CLIENTS", value: "200+" },
    { label: "NET REVENUE SCALED", value: "₹140Cr+" },
    { label: "AVERAGE BLENDED ROAS", value: "4.8x" },
  ];

  return (
    <section id="why-us" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden select-none font-display border-t border-white/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
            Why Performance Marketing?<br />Why Desi Muchads?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed font-sans">
            We don’t guess. We deploy disciplined e-commerce growth strategies engineered to scale compounding bottom-line returns.
          </p>
        </div>

        {/* 4 Pillars Highlighted Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <SpotlightCard
                key={p.id}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                borderColor="rgba(255, 255, 255, 0.4)"
                onMouseEnter={() => sound.playPluck(130 + idx * 20)}
                className="group rounded-2xl p-8 sm:p-10 bg-[#121215] border border-white/10 border-t-white/20 hover:border-white/35 hover:bg-[#18181d] shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase leading-tight mb-3">
                    {p.title}
                  </h3>

                  <p className="text-sm text-zinc-300 font-normal leading-relaxed font-sans">
                    {p.desc}
                  </p>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Highlighted Stats Panel with iOS Glassmorphism */}
        <div className="rounded-2xl ios-glass-panel p-5 sm:p-10 mb-16 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <div className="font-metric font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-400 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anti-AI Performance Engineering Manifesto with iOS Glassmorphism */}
        <div className="rounded-3xl ios-glass-panel p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.03] blur-[140px] pointer-events-none" />
          
          <div className="relative max-w-4xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>THE ANTI-AI CREATIVE ENGINEERING MANIFESTO</span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight mb-4">
              Why 95% of Automated AI Web Agencies Burn Client Capital
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed font-sans mb-8">
              Generic AI generators produce bland, soulless templates that score 42 on Google PageSpeed, vomit repetitive adjectives that convert at 0.8%, and collapse during festive flash sales. At Desi Muchads, our senior growth architects handcraft bespoke Shopify Liquid and Next.js headless architectures, write high-conversion copy rooted in raw Indian consumer psychology, and audit unit economics down to the last rupee of GST and gateway fees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-left">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold block">
                  01 · The AI Sludge Problem
                </span>
                <h4 className="text-white font-bold text-sm uppercase">Cookie-Cutter Themes</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Slow boilerplate templates packed with unused scripts, layout shifts (CLS &gt; 0.25), and zero custom checkout friction optimization.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                  02 · Desi Muchads Standard
                </span>
                <h4 className="text-white font-bold text-sm uppercase">Sub-Second Precision</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  99 Google PageSpeed scores, sub-600ms LCP, custom CAPI server-side tracking, and frictionless Razorpay / UPI 1-click checkout engines.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-white uppercase tracking-widest font-bold block">
                  03 · Operational Depth
                </span>
                <h4 className="text-white font-bold text-sm uppercase">Real P&amp;L Accountability</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Audited ₹140Cr+ GMV scaled. Physical Delhi NCR studio (Connaught Place &amp; Okhla Phase III). Daily Slack war rooms with senior technologists.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <span>LET&apos;S TALK</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
