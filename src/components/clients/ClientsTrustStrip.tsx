"use client";

import React from "react";
import { sound } from "@/lib/sound";

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
    <section id="clients" className="relative py-28 sm:py-36 bg-[#f8f9fa] text-[#0e164c] overflow-hidden select-none font-display border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0e164c] uppercase leading-tight">
            Some friends we’ve made<br />in the process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#676767] font-normal leading-relaxed">
            From multinational household names to emerging category disruptors.
          </p>
        </div>

        {/* 12-Brand Responsive Clean Tiles (Pure CSS, No External Media) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {clients.map((c, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playPluck(140 + idx * 10)}
              className="group relative rounded-lg p-6 bg-white border border-gray-200 hover:border-[#F36700] hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer"
            >
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-[#676767] group-hover:text-[#0e164c] transition-colors uppercase leading-none">
                {c.name}
              </span>
              <span className="mt-2 text-[9px] font-mono tracking-wider text-gray-400 group-hover:text-[#F36700] uppercase transition-colors">
                {c.category}
              </span>
            </div>
          ))}
        </div>

        {/* Center Bottom Action Button */}
        <div className="mt-16 text-center">
          <a
            href="#karname"
            className="inline-block px-8 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105 active:scale-95"
          >
            MORE CLIENTS &gt;
          </a>
        </div>
      </div>
    </section>
  );
}
