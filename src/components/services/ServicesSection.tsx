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
    const iconClass = "w-6 h-6 transition-transform duration-300 group-hover:scale-110";
    switch (name) {
      case "Search":
        return <Search className={`${iconClass} text-[#FFC400]`} />;
      case "Rocket":
        return <Rocket className={`${iconClass} text-[#F36700]`} />;
      case "Magnet":
        return <Magnet className={`${iconClass} text-[#38BDF8]`} />;
      case "Share2":
        return <Share2 className={`${iconClass} text-[#EC4899]`} />;
      case "ShoppingBag":
        return <ShoppingBag className={`${iconClass} text-[#34D399]`} />;
      case "Zap":
        return <Zap className={`${iconClass} text-[#FBBF24]`} />;
      case "Code2":
        return <Code2 className={`${iconClass} text-[#818CF8]`} />;
      case "Package":
        return <Package className={`${iconClass} text-[#F59E0B]`} />;
      default:
        return <Sparkles className={`${iconClass} text-[#FFC400]`} />;
    }
  };

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 bg-[#0e164c] text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36700]/10 border border-[#F36700]/30 text-[#F36700] font-royal text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-STACK ROYAL GROWTH SUITE • 8 CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Capabilities
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl font-sans">
            We love digital. We’re experts in brand building experiences, full-funnel customer acquisition, quick-commerce velocity, and results-driven performance marketing.
          </p>
        </div>

        {/* 8 Capabilities Cards 4x2 Responsive Grid */}
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
                className={`group relative rounded-2xl p-7 bg-[#142161]/60 border transition-all duration-300 backdrop-blur-sm flex flex-col justify-between cursor-pointer scroll-mt-32 ${
                  isHovered
                    ? "border-[#F36700] bg-[#142161]/90 shadow-[0_15px_40px_rgba(243,103,0,0.18)] -translate-y-1.5"
                    : "border-white/10 hover:border-[#F36700]/50 hover:bg-[#142161]/80"
                }`}
              >
                <div>
                  {/* Top Row: Icon Badge & Arrow */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10 flex items-center justify-center shadow-inner`}
                    >
                      {getServiceIcon(item.iconName)}
                    </div>
                    <span className="text-xl text-white/40 group-hover:text-[#F36700] group-hover:translate-x-1 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Metric Pill */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/40 border border-[#FFC400]/30 text-[10px] font-metric tracking-wider text-[#FFC400] uppercase font-bold">
                      {item.metric}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-xl tracking-tight text-white uppercase leading-snug group-hover:text-[#F36700] transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Reference Image Short Subtitle */}
                  <p className="text-xs text-[#FFC400]/90 font-medium leading-relaxed font-sans mb-3">
                    {item.shortDesc}
                  </p>

                  {/* Expanded Detail Description */}
                  <p className="text-xs text-white/70 leading-relaxed font-normal font-sans">
                    {item.fullDesc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#F36700] tracking-wider uppercase group-hover:underline flex items-center gap-1 font-sans">
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
            className="px-8 py-4 rounded-xl bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-sm font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-orange-500/25 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
          >
            <span>LET&apos;S TALK ABOUT YOUR GROWTH</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
