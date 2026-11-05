"use client";

import React from "react";
import { Zap, Target, Users, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import { MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { sound } from "@/lib/sound";

interface WhyChooseUsSectionProps {
  onOpenKundli: () => void;
}

export function WhyChooseUsSection({ onOpenKundli }: WhyChooseUsSectionProps) {
  const pillars = [
    {
      id: "quick-results",
      icon: Zap,
      badge: "DAY 1 VELOCITY",
      title: "QUICK RESULTS",
      subtitle: "7-Day Rapid Sprint Architecture",
      desc: "No 6-month ramp-up lag. We launch rapid 7-day creative and media sprints to validate winning hooks and generate profitable orders from week one.",
      color: "from-[#F59E0B]/20 to-transparent",
      borderColor: "border-[#F59E0B]/40",
      iconColor: "text-[#F59E0B]",
    },
    {
      id: "easy-roi",
      icon: BarChart3,
      badge: "100% ATTRIBUTION",
      title: "EASY TO MEASURE ROI",
      subtitle: "Every Single Rupee Accounted For",
      desc: "We are ruthlessly ROI-oriented. Every Rupee deployed across Meta and Google is tracked to exact blended ROAS, CAC, and net profit margins on live dashboards.",
      color: "from-[#0D9488]/20 to-transparent",
      borderColor: "border-[#0D9488]/40",
      iconColor: "text-[#0D9488]",
    },
    {
      id: "true-partnership",
      icon: Users,
      badge: "TRUE ALLY",
      title: "WE WORK WITH YOU, NOT FOR YOU",
      subtitle: "Shared Channels • Zero Ghosting",
      desc: "We don't hide behind monthly email summaries. You get dedicated strategists in your shared Slack/WhatsApp, weekly deep-dives, and complete strategic alignment.",
      color: "from-[#C84B31]/20 to-transparent",
      borderColor: "border-[#C84B31]/40",
      iconColor: "text-[#C84B31]",
    },
    {
      id: "data-creative",
      icon: Target,
      badge: "WINNING SAUCE",
      title: "DATA-GUIDED CREATIVE SAUCE",
      subtitle: "Where Culture Meets Math",
      desc: "Using hard audience retention data to guide the creativity behind winning ads is our secret sauce. We engineer the first 1.5s hook to stop the scroll every time.",
      color: "from-[#D4AF37]/20 to-transparent",
      borderColor: "border-[#D4AF37]/40",
      iconColor: "text-[#D4AF37]",
    },
  ];

  const metrics = [
    { label: "COMBINED EXPERIENCE", value: "8+ Years" },
    { label: "BRANDS SCALED", value: "200+" },
    { label: "NET ATTRIBUTED REVENUE", value: "₹140Cr+" },
    { label: "AVERAGE BLENDED ROAS", value: "4.8x" },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#1C1815] text-[#EFE7DA] overflow-hidden select-none font-body border-t border-[rgba(239,231,218,0.12)]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-36 w-96 h-96 rounded-full bg-[#C84B31]/10 blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[rgba(239,231,218,0.2)] bg-[rgba(239,231,218,0.05)] backdrop-blur-md mb-4 shadow-sm">
            <MoustacheSVG className="w-5 h-2.5 text-[#D4AF37]" />
            <span className="font-body text-[11px] uppercase tracking-[0.22em] text-[#EFE7DA] font-medium">
              THE DARBAR PROMISE
            </span>
            <span className="text-[#D4AF37]">✦</span>
          </div>

          <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#EFE7DA] uppercase leading-[0.95]">
            WHY PERFORMANCE MARKETING?{" "}
            <span className="block italic font-normal text-[#D4AF37] mt-1 font-display">
              WHY DESI MUCHADS?
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#EFE7DA]/75 font-body font-light leading-relaxed max-w-xl mx-auto">
            Broad audience targeting, quick tangible results, and ruthless ROI orientation. Here is how we engineer category dominance for ambitious consumer brands.
          </p>
        </div>

        {/* 4 Pillars Grid (BeeMarketing Framework) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onMouseEnter={() => sound.playPluck(130 + idx * 20)}
                className={`relative rounded-3xl p-8 sm:p-10 border bg-gradient-to-b ${p.color} bg-[#14110E]/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${p.borderColor}`}
              >
                {/* Filigree Corner Accent */}
                <div className="absolute top-3 right-3 opacity-30 hover:opacity-100 transition-opacity">
                  <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-right" />
                </div>

                {/* Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${p.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-white/15 bg-white/5 text-[#EFE7DA]/80">
                    {p.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#F5EFEB] uppercase leading-tight mb-1">
                  {p.title}
                </h3>
                <h4 className="font-body text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-4">
                  {p.subtitle}
                </h4>

                {/* Description */}
                <p className="font-body text-xs sm:text-sm text-[#EFE7DA]/70 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hard Telemetry Numbers Banner */}
        <div className="rounded-3xl border border-[rgba(239,231,218,0.15)] bg-[#14110E] p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[rgba(239,231,218,0.1)]">
            {metrics.map((m, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6 md:pt-0" : ""}>
                <div className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-[#D4AF37] tracking-tight leading-none mb-2">
                  {m.value}
                </div>
                <div className="font-body text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#EFE7DA]/60 uppercase">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Callout Action */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5DE88] to-[#D4AF37] text-[#1C1815] font-body text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>Buzz Us Now (Claim Free Strategy Session)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

