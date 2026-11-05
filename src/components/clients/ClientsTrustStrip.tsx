"use client";

import React from "react";
import { MoustacheSVG } from "../common/Icons";

export function ClientsTrustStrip() {
  const clients = [
    { name: "GARMIN", category: "Global GPS & Wearables" },
    { name: "MCDONALD'S", category: "QSR & Quick Commerce" },
    { name: "CROCS", category: "Global Footwear & D2C" },
    { name: "TRANSFERGO", category: "Fintech & Cross-Border" },
    { name: "DADU", category: "FMCG Dairy & Ice Cream" },
    { name: "FROSCH", category: "Eco-Friendly Homecare" },
    { name: "NEMATEKAS", category: "Food Processing Giant" },
    { name: "ATEA", category: "Enterprise IT & Cloud" },
    { name: "ZALGIRIO ARENA", category: "Sports & Live Entertainment" },
    { name: "TIKETA", category: "Ticketing & Event Tech" },
  ];

  return (
    <section className="relative py-20 bg-[#14110E] text-[#EFE7DA] border-y border-[rgba(239,231,218,0.1)] overflow-hidden select-none font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(239,231,218,0.2)] bg-white/5 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-semibold mb-3">
            <MoustacheSVG className="w-4 h-2 text-[#D4AF37]" />
            <span>GLOBAL & ENTERPRISE TRUST</span>
          </div>

          <h3 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#EFE7DA] uppercase leading-tight">
            SOME FRIENDS WE’VE MADE{" "}
            <span className="italic text-[#D4AF37] font-normal font-display">
              IN THE PROCESS
            </span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#EFE7DA]/60 font-light">
            From multinational giants to hyper-growth D2C brands, we deploy performance media that scales compounding revenue.
          </p>
        </div>

        {/* 10-Brand Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
          {clients.map((c, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl p-6 border border-[rgba(239,231,218,0.1)] bg-[#1C1815]/80 hover:bg-[#1C1815] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(212,175,55,0.15)]"
            >
              <span className="font-display font-bold text-xl sm:text-2xl tracking-[0.08em] text-[#EFE7DA]/50 group-hover:text-[#F5DE88] transition-colors uppercase leading-none">
                {c.name}
              </span>
              <span className="mt-2 text-[9px] font-mono tracking-wider text-[#EFE7DA]/40 group-hover:text-[#D4AF37]/80 uppercase transition-colors">
                {c.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

