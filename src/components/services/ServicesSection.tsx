"use client";

import React, { useState } from "react";
import {
  Search,
  Rocket,
  Magnet,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { AGENCY_SERVICES, ServiceItem } from "@/data/servicesData";

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const getServiceIcon = (name: ServiceItem["iconName"]) => {
    const iconClass = "w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110";
    switch (name) {
      case "Search":
        return <Search className={iconClass} />;
      case "Rocket":
        return <Rocket className={iconClass} />;
      case "Magnet":
        return <Magnet className={iconClass} />;
      case "Share2":
        return <Share2 className={iconClass} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconClass} />;
      case "Zap":
        return <Zap className={iconClass} />;
      case "Code2":
        return <Code2 className={iconClass} />;
      case "Package":
        return <Package className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-white font-royal text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-STACK PERFORMANCE SUITE • 8 CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Capabilities
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl font-sans">
            We love digital. We’re experts in brand building experiences, full-funnel customer acquisition, quick-commerce velocity, and results-driven performance marketing.
          </p>
        </div>

        {/* 8 Capabilities Cards 4x2 Highlighted Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENCY_SERVICES.map((item, idx) => {
            const isHovered = activeCard === item.id;
            const elementId = item.anchor.replace("#", "");

            return (
              <div
                key={item.id}
                id={elementId}
                onMouseEnter={() => {
                  sound.playPluck(130 + idx * 15);
                  setActiveCard(item.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                className={`group relative rounded-2xl p-7 bg-[#121215] border border-white/10 border-t-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between cursor-pointer scroll-mt-32 ${
                  isHovered
                    ? "border-white/40 bg-[#18181d] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06)] -translate-y-1.5"
                    : "hover:border-white/25 hover:bg-[#16161a]"
                }`}
              >
                <div>
                  {/* Top Row: Icon Badge & Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                      {getServiceIcon(item.iconName)}
                    </div>
                    <span className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Metric Pill */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[10px] font-metric tracking-wider text-white uppercase font-bold">
                      {item.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl tracking-tight text-white uppercase leading-snug transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Reference Image Short Subtitle */}
                  <p className="text-xs text-zinc-300 font-medium leading-relaxed font-sans mb-3">
                    {item.shortDesc}
                  </p>

                  {/* Expanded Detail Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal font-sans">
                    {item.fullDesc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase group-hover:underline flex items-center gap-1 font-sans">
                    <span>GET AUDIT</span>
                    <span className="text-xs font-bold">&gt;</span>
                  </span>
                  <span className="text-xs text-white/30 group-hover:text-white transition-colors">
                    ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-sm font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <span>LET&apos;S TALK ABOUT YOUR GROWTH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
