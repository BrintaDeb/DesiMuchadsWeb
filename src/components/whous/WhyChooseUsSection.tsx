"use client";

import React from "react";
import { Zap, Target, Users, BarChart3 } from "lucide-react";
import { sound } from "@/lib/sound";

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
      desc: "We are ruthlessly ROI (return on investment) oriented. Every single Rupee deployed is mapped to verified revenue, blended ROAS, and margins.",
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
    <section id="why-us" className="relative py-28 sm:py-36 bg-[#0e164c] text-white overflow-hidden select-none font-display border-t border-white/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
            Why Performance Marketing?<br />Why Desi Muchads?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80 font-normal leading-relaxed">
            We don’t guess. We deploy disciplined e-commerce growth strategies engineered to scale compounding bottom-line returns.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onMouseEnter={() => sound.playPluck(130 + idx * 20)}
                className="relative rounded-xl p-8 sm:p-10 bg-[#142161]/60 border border-white/10 hover:border-[#F36700] hover:bg-[#142161]/90 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded bg-[#0e164c] border border-white/10 flex items-center justify-center text-[#F36700] mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase leading-tight mb-3">
                  {p.title}
                </h3>

                <p className="text-sm text-white/75 font-normal leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="rounded-xl border border-white/10 bg-[#142161]/40 p-8 sm:p-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6 md:pt-0" : ""}>
                <div className="font-metric font-black text-4xl sm:text-5xl text-[#FFC400] tracking-tight leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[10px] sm:text-xs font-mono tracking-widest text-white/60 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
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
            className="px-8 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105 active:scale-95"
          >
            LET&apos;S TALK &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
