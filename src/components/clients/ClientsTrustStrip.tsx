"use client";

import React from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "../common/SpotlightCard";
import { ArrowRight } from "lucide-react";

export function ClientsTrustStrip() {
  const clients = [
    { name: "PET-FIRST", category: "Wellness & Pet Care" },
    { name: "YOU & ME", category: "Cinematic Photography" },
    { name: "LIONELP", category: "Gourmet & Hospitality" },
    { name: "FRESHEATS", category: "Organic Food Storefront" },
    { name: "NESTSERVICES", category: "Concierge & Living Hub" },
    { name: "MCDONALD'S", category: "QSR & Retail" },
    { name: "FROSCH", category: "Eco-Friendly Living" },
    { name: "ATEA", category: "Enterprise IT & Cloud" },
    { name: "TRANSFERGO", category: "Fintech & Payments" },
    { name: "CROCS", category: "Global Footwear" },
    { name: "DESI D2C", category: "Direct-to-Consumer" },
    { name: "ROYAL MASALA", category: "Heritage Spices" },
  ];

  return (
    <section id="clients" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden select-none font-display border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
            Some friends we’ve made<br />in the process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed font-sans">
            From multinational household names to emerging category disruptors.
          </p>
        </div>

        {/* 12-Brand Responsive Clean Highlighted Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {clients.map((c, idx) => (
            <SpotlightCard
              key={idx}
              maxTilt={9}
              onMouseEnter={() => sound.playPluck(140 + idx * 10)}
              className="rounded-xl p-6 ios-glass-card shadow-lg flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer"
            >
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-white transition-colors uppercase leading-none">
                {c.name}
              </span>
              <span className="mt-2 text-[9px] font-mono tracking-wider text-zinc-400 group-hover:text-zinc-200 uppercase transition-colors">
                {c.category}
              </span>
            </SpotlightCard>
          ))}
        </div>

        {/* Center Bottom Action Button */}
        <div className="mt-16 text-center">
          <a
            href="#karname"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95"
          >
            <span>MORE CLIENTS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
