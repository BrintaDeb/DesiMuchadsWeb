"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const capabilities = [
    {
      id: 1,
      title: "SOCIAL MEDIA MARKETING",
      summary:
        "Tell engaging stories to your target audience to create a buzz around your brand. We’ll get you heard out there.",
      metric: "+477% Engagement Lift",
      href: "#karname",
    },
    {
      id: 2,
      title: "PERFORMANCE MARKETING",
      summary:
        "Developing unique, proven media buying strategies to profitably scale business through Facebook and Google Ads.",
      metric: "5.2x Blended ROAS",
      href: "#karname",
    },
    {
      id: 3,
      title: "EMAIL & SMS MARKETING",
      summary:
        "Setting up all necessary automations, sequences, and workflows is the first step in maximizing our clients ROI.",
      metric: "32% Net Flow Revenue",
      href: "#karname",
    },
    {
      id: 4,
      title: "AD CREATIVE PRODUCTION",
      summary:
        "Using data to guide the creativity behind these winning ads is our “not-so” secret sauce.",
      metric: "First 1.5s Hook Mastery",
      href: "#karname",
    },
    {
      id: 5,
      title: "CRO & ECOMMERCE SOLUTIONS",
      summary:
        "Carefully crafted and professionally developed ecommerce website and CRO to improve conversions.",
      metric: "<0.8s Store Speed",
      href: "#karname",
    },
    {
      id: 6,
      title: "INVESTMENTS",
      summary:
        "We invest in e-commerce and retail businesses where we see huge potential.",
      metric: "Equity & Scale Partner",
      href: "#karname",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 bg-[#0e164c] text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Capabilities
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl">
            We love digital. We’re experts in brand building experiences and results-driven marketing.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item) => {
            const isHovered = activeCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  sound.playPluck(130 + item.id * 15);
                  setActiveCard(item.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                className={`relative group rounded-xl p-8 sm:p-10 bg-[#142161]/60 border transition-all duration-300 backdrop-blur-sm flex flex-col justify-between cursor-pointer ${
                  isHovered
                    ? "border-[#F36700] bg-[#142161]/90 shadow-[0_15px_40px_rgba(243,103,0,0.15)] -translate-y-1.5"
                    : "border-white/10 hover:border-[#F36700]/50"
                }`}
              >
                <div>
                  {/* Top Row: Metric & Arrow */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-metric tracking-widest text-[#FFC400] uppercase font-bold">
                      {item.metric}
                    </span>
                    <span className="text-xl text-white/40 group-hover:text-[#F36700] group-hover:translate-x-1 transition-all">
                      &gt;
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-extrabold text-2xl tracking-tight text-white uppercase leading-tight group-hover:text-[#F36700] transition-colors mb-4">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/75 leading-relaxed font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F36700] tracking-wider uppercase group-hover:underline">
                    EXPLORE CAPABILITY
                  </span>
                  <span className="text-xs text-white/40 group-hover:text-white transition-colors">
                    ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="px-8 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105 active:scale-95"
          >
            LET&apos;S TALK ABOUT YOUR GROWTH &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
