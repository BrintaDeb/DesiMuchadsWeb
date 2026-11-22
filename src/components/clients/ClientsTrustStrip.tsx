"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "../common/SpotlightCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { BreydaqsButton } from "../common/BreydaqsButton";

export function ClientsTrustStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const targetSkew = useRef(0);
  const currentSkew = useRef(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Limit skew between -7deg and 7deg based on scroll velocity
      targetSkew.current = Math.max(-7, Math.min(7, delta * 0.12));

      if (!ticking) {
        ticking = true;
        const tick = () => {
          currentSkew.current += (targetSkew.current - currentSkew.current) * 0.08;
          targetSkew.current *= 0.92; // smooth decay to 0

          if (marqueeRef.current) {
            marqueeRef.current.style.transform = `skewX(${currentSkew.current.toFixed(2)}deg)`;
          }

          if (Math.abs(currentSkew.current) > 0.02 || Math.abs(targetSkew.current) > 0.02) {
            animFrame.current = requestAnimationFrame(tick);
          } else {
            if (marqueeRef.current) marqueeRef.current.style.transform = "skewX(0deg)";
            ticking = false;
          }
        };
        animFrame.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  const clients = [
    { name: "PET-FIRST", category: "Wellness & Pet Care", metric: "6.2X ROAS" },
    { name: "YOU & ME", category: "Cinematic Photography", metric: "₹1.4Cr GMV" },
    { name: "LIONELP", category: "Gourmet & Hospitality", metric: "+480% Orders" },
    { name: "FRESHEATS", category: "Organic Storefront", metric: "Sub-1s LCP" },
    { name: "NESTSERVICES", category: "Concierge Hub", metric: "8.1X ROAS" },
    { name: "VEDAROOTS", category: "Single-Estate Ayurveda", metric: "₹92 Target CPA" },
    { name: "FROSCH", category: "Eco-Friendly Living", metric: "14k+ Customers" },
    { name: "ATEA", category: "Enterprise IT & Cloud", metric: "+320% Leads" },
    { name: "TRANSFERGO", category: "Fintech & Payments", metric: "Zero Drop" },
    { name: "DARBAR", category: "Fine Horology", metric: "₹380k AOV" },
    { name: "DESI D2C", category: "Direct-to-Consumer", metric: "5.8X Blended" },
    { name: "ROYAL MASALA", category: "Heritage Spices", metric: "24k+ Jars Sold" },
  ];

  return (
    <section
      id="clients"
      className="relative py-28 sm:py-36 bg-transparent text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-3">
            [ 04 / PROVEN PARTNERSHIPS ]
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] text-white uppercase leading-[0.92]">
            Category Leaders Built to <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ scale.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed font-sans">
            From emerging national disruptors to established sovereign brands across India.
          </p>
        </div>

        {/* Velocity-Skewed Kinetic Marquee Ribbon */}
        <div className="relative w-full max-w-full overflow-hidden contain-paint py-4 my-8">
          <div
            ref={marqueeRef}
            className="transition-transform will-change-transform flex gap-4 sm:gap-6 animate-marquee whitespace-nowrap"
          >
            {[...clients, ...clients].map((c, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.playPluck(150 + (idx % 8) * 15)}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-[0.25rem] bg-[#0f0f0e] border border-[rgba(232,232,227,0.15)] hover:border-white/40 transition-all cursor-pointer group shrink-0"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  <span className="font-display font-black text-sm tracking-wider text-white uppercase">
                    {c.name}
                  </span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  {c.category}
                </span>
                <span className="px-2 py-0.5 rounded-[0.2rem] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  {c.metric}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 12-Brand Responsive Clean Highlighted Tiles with Liquid Specular Bevels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mt-12">
          {clients.map((c, idx) => (
            <SpotlightCard
              key={idx}
              maxTilt={7}
              onMouseEnter={() => sound.playPluck(140 + idx * 10)}
              className="rounded-[0.25rem] p-5 bg-[#0c0c0b] border border-[rgba(232,232,227,0.15)] shadow-lg flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer hover:border-white/50 transition-all"
            >
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-white transition-colors uppercase leading-none">
                {c.name}
              </span>
              <span className="mt-2 text-[9px] font-mono tracking-wider text-zinc-400 uppercase transition-colors">
                {c.category}
              </span>
              <span className="mt-2 text-[9px] font-mono text-emerald-400 font-bold">
                {c.metric}
              </span>
            </SpotlightCard>
          ))}
        </div>

        {/* Center Bottom Action Button with Magnetic Hover */}
        <div className="mt-16 text-center">
          <BreydaqsButton href="/work" variant="white">
            EXPLORE ALL 50 PARTNER ARCHIVES
          </BreydaqsButton>
        </div>
      </div>
    </section>
  );
}
