"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { AGENCY_SERVICES, ServiceItem } from "@/data/servicesData";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [expandedSpecs, setExpandedSpecs] = useState<Record<string, boolean>>({});
  const [selectedStage, setSelectedStage] = useState<"all" | "early" | "scale" | "omnichannel">("all");

  const stageConfigs: Record<string, { label: string; ids: string[]; badge: string }> = {
    all: {
      label: "All 8 Capabilities",
      ids: AGENCY_SERVICES.map((s) => s.id),
      badge: "FULL STACK",
    },
    early: {
      label: "Seed to Early D2C (₹0–₹10L/mo)",
      ids: ["seo-sem", "social-media", "web-development"],
      badge: "FOUNDATION CORE",
    },
    scale: {
      label: "Growth & Scale (₹10L–₹50L/mo)",
      ids: ["performance-marketing", "ecommerce-services", "lead-generation"],
      badge: "VELOCITY DRIVER",
    },
    omnichannel: {
      label: "Omnichannel & Monopoly (₹50L+/mo)",
      ids: ["quick-commerce", "packaging-label", "performance-marketing", "ecommerce-services"],
      badge: "CATEGORY MONOPOLY",
    },
  };

  const activeStageConfig = stageConfigs[selectedStage];

  const toggleSpecs = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPluck(190);
    setExpandedSpecs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getServiceIcon = (name: ServiceItem["iconName"]) => {
    const iconClass =
      "w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110";
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
        <div className="max-w-3xl mb-14 sm:mb-18 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-white font-royal text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FULL-STACK PERFORMANCE SUITE • 8 CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Capabilities
          </h2>
          <p className="mt-5 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl font-sans">
            We love digital. We’re experts in brand building experiences, full-funnel customer acquisition, quick-commerce velocity, and results-driven performance marketing with deep technical specifications.
          </p>

          {/* Dynamic Brand Stage Filter Selector */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 mr-1">Filter by Stage:</span>
            {(Object.keys(stageConfigs) as (keyof typeof stageConfigs)[]).map((stageKey) => {
              const cfg = stageConfigs[stageKey];
              const isSelected = selectedStage === stageKey;
              return (
                <button
                  key={stageKey}
                  type="button"
                  onClick={() => {
                    sound.playPluck(150);
                    setSelectedStage(stageKey as typeof selectedStage);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                    isSelected
                      ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                      : "bg-[#121215] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 Capabilities Cards 4x2 Highlighted Panels Grid with Specular Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENCY_SERVICES.map((item, idx) => {
            const isHovered = activeCard === item.id;
            const isExpanded = !!expandedSpecs[item.id];
            const elementId = item.anchor.replace("#", "");
            const isStageMatch = activeStageConfig.ids.includes(item.id);

            return (
              <SpotlightCard
                key={item.id}
                id={elementId}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                borderColor="rgba(255, 255, 255, 0.45)"
                onMouseEnter={() => {
                  sound.playPluck(130 + idx * 15);
                  setActiveCard(item.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                className={`group shimmer-card rounded-2xl p-6 sm:p-7 ios-glass-card cursor-pointer scroll-mt-32 transition-all duration-300 ${
                  isHovered
                    ? "border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.08)]"
                    : selectedStage !== "all" && isStageMatch
                    ? "border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.06)]"
                    : selectedStage !== "all"
                    ? "opacity-50 hover:opacity-100 hover:border-white/30"
                    : "border-white/15 hover:border-white/30"
                }`}
              >
                <div>
                  {/* Top Row: Icon Badge & Metric with 3D Parallax Depth */}
                  <div className="flex items-center justify-between mb-4 ios-layer-floating">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                      {getServiceIcon(item.iconName)}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] font-metric tracking-wider text-white uppercase font-bold">
                        {item.metric}
                      </span>
                      {selectedStage !== "all" && isStageMatch && (
                        <span className="inline-block px-2 py-0.5 rounded-md bg-white text-black text-[8px] font-mono tracking-wider uppercase font-extrabold animate-pulse">
                          {activeStageConfig.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white uppercase leading-snug transition-colors mb-2">
                    {item.title}
                  </h3>

                  {/* Short Subtitle */}
                  <p className="text-xs text-zinc-300 font-medium leading-relaxed font-sans mb-3">
                    {item.shortDesc}
                  </p>

                  {/* Turnaround Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-zinc-300 font-mono mb-4">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{item.specs.turnaround}</span>
                  </div>

                  {/* Core Deliverables Checklist Specification */}
                  <div className="space-y-2 mb-4 pt-3 border-t border-white/10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block font-semibold">
                      KEY DELIVERABLES & SCOPE
                    </span>
                    <ul className="space-y-1.5">
                      {item.specs.deliverables.slice(0, isExpanded ? 4 : 2).map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-tight">
                          <CheckCircle2 className="w-3 h-3 text-white/70 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Technical Specifications Drawer */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-white/10 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* Tech Stack & Tooling */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block mb-1.5 font-semibold">
                          TOOLS & ARCHITECTURE
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {item.specs.tools.map((tool, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Best For / Ideal Target */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5 font-semibold">
                          IDEAL CLIENT PROFILE
                        </span>
                        <p className="text-[11px] text-zinc-300 leading-normal font-sans">
                          {item.specs.bestFor}
                        </p>
                      </div>

                      {/* Full description */}
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans pt-1">
                        {item.fullDesc}
                      </p>
                    </div>
                  )}

                  {/* Toggle Scope Specifications Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleSpecs(item.id, e)}
                    className="mt-2 text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>{isExpanded ? "Collapse Scope" : "View Full Scope & Stack"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>

                  {/* Dedicated Page Link */}
                  <div className="mt-3 pt-2">
                    <Link
                      href={`/services/${item.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-mono font-bold text-white hover:text-zinc-300 flex items-center gap-1 group/slink transition-colors"
                    >
                      <span>Explore Dedicated Page</span>
                      <ArrowRight className="w-3 h-3 group-hover/slink:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase group-hover:underline flex items-center gap-1 font-sans">
                    <span>GET AUDIT & SPECS</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs text-white/30 group-hover:text-white transition-colors">
                    ✦
                  </span>
                </div>
              </SpotlightCard>
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
            <span>DISCUSS CUSTOM SPECS FOR YOUR BRAND</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
