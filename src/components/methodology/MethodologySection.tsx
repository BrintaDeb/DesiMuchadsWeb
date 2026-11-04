"use client";

import React from "react";
import { SectionDivider } from "../common/SectionDivider";
import { ChaiCupIcon, MoustacheSVG } from "../common/Icons";
import { Sparkles, Rocket, TrendingUp, Layers } from "lucide-react";

export function MethodologySection() {
  const steps = [
    {
      num: "01",
      title: "Chai & Charcha",
      sub: "Discovery & Brand Kundli",
      icon: ChaiCupIcon,
      hindi: "चाय और चर्चा",
      desc: "We sit down (virtually or over authentic cutting chai) to dissect your unit economics, profit margins, competitor blind spots, and customer psychology.",
      deliverable: "Comprehensive 40-Point Brand Kundli & Unit Economics Audit",
    },
    {
      num: "02",
      title: "Masala & Blueprint",
      sub: "Strategy & Creative Architecture",
      icon: Layers,
      hindi: "मसाला और ब्लूप्रिंट",
      desc: "Our creative directors engineer scroll-stopping Hinglish hooks, custom angle frameworks, and frictionless conversion funnels mapped to every temperature of traffic.",
      deliverable: "High-ROAS Media Blueprint & Creative Matrix",
    },
    {
      num: "03",
      title: "Dhamaka Launch",
      sub: "Full-Throttle Execution",
      icon: Rocket,
      hindi: "धमाका लॉन्च",
      desc: "We deploy aggressive multi-channel ad architectures across Meta, Google, and YouTube, alongside high-speed landing pages that load in under 800 milliseconds.",
      deliverable: "Live Dynamic Campaigns & Pixel Telemetry",
    },
    {
      num: "04",
      title: "Badshah Scaling",
      sub: "CRO & Profit Maximization",
      icon: TrendingUp,
      hindi: "बादशाह स्केलिंग",
      desc: "Daily rapid creative refresh cycles, ruthless budget reallocation into winning ads, and systematic conversion rate optimization to scale your brand like royalty.",
      deliverable: "Predictable, Compounding Monthly Revenue Scaling",
    },
  ];

  return (
    <section id="methodology" className="relative py-28 sm:py-36 bg-[#0D0C12] text-[#F7F1E5] overflow-hidden">
      {/* Background Subtle Gradient Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />

      <SectionDivider label="THE PARAMPARA" sublabel="CHAI TO CONVERSION METHODOLOGY" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F7F1E5]">
            From First Chai to{" "}
            <span className="brass-gradient-text block mt-1">
              Market Hukumat.
            </span>
          </h2>
          <p className="mt-5 text-[#F7F1E5]/70 text-base sm:text-lg">
            No endless theory decks. Our battle-tested 4-step framework takes your brand from baseline to market dominance with speed, clarity, and ruthless execution.
          </p>
        </div>

        {/* 4-Step Grid with Connecting Golden Thread */}
        <div className="relative">
          {/* Continuous Golden Thread (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-12 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37] to-[#D4AF37]/10 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.num}
                  className="group relative rounded-3xl p-6 sm:p-8 bg-[#141829]/70 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)]"
                >
                  {/* Top Step Pill with Moustache icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-2xl font-extrabold text-[#D4AF37] tracking-tight">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37]/20 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Hindi & Title */}
                  <div className="mb-4">
                    <span className="font-royal text-xs text-[#D4AF37] tracking-widest block mb-1">
                      {step.hindi}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#F7F1E5] group-hover:text-[#F5DE88] transition-colors">
                      {step.title}
                    </h3>
                    <span className="font-mono text-[11px] text-[#F7F1E5]/60 uppercase tracking-wider block mt-1">
                      {step.sub}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#F7F1E5]/75 leading-relaxed mb-6 font-normal">
                    {step.desc}
                  </p>

                  {/* Deliverable Badge */}
                  <div className="pt-4 border-t border-[#D4AF37]/15">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/70 block mb-1">
                      Key Deliverable:
                    </span>
                    <span className="text-xs font-mono font-medium text-[#F7F1E5]">
                      ✦ {step.deliverable}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
