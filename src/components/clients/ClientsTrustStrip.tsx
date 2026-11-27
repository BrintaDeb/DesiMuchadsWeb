"use client";

import React, { useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "../common/SpotlightCard";
import { BreydaqsButton } from "../common/BreydaqsButton";

export function ClientsTrustStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const targetSkew = useRef(0);
  const currentSkew = useRef(0);
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    { name: "PET-FIRST", category: "Wellness & Pet Care" },
    { name: "YOU & ME", category: "Cinematic Photography" },
    { name: "LIONELP", category: "Gourmet & Hospitality" },
    { name: "FRESHEATS", category: "Organic Storefront" },
    { name: "NESTSERVICES", category: "Concierge Hub" },
    { name: "VEDAROOTS", category: "Single-Estate Ayurveda" },
    { name: "FROSCH", category: "Eco-Friendly Living" },
    { name: "ATEA", category: "Enterprise IT & Cloud" },
    { name: "TRANSFERGO", category: "Fintech & Payments" },
    { name: "DARBAR", category: "Fine Horology" },
    { name: "DESI D2C", category: "Direct-to-Consumer" },
    { name: "ROYAL MASALA", category: "Heritage Spices" },
  ];

  return (
    <section
      id="clients"
      className="relative py-28 sm:py-36 bg-transparent text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      {/* Subtle obsidian vignette backdrop for editorial typography contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(9,9,11,0.82)_0%,transparent_72%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] text-white uppercase leading-[0.92]">
            Category Leaders Built to <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ scale.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed font-sans">
            From emerging national disruptors to established sovereign brands across India.
          </p>
        </div>

        {/* Velocity-Skewed Kinetic Marquee Ribbon */}
        <div className="relative w-full max-w-full overflow-hidden contain-paint py-4 my-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            ref={marqueeRef}
            className="transition-transform will-change-transform flex gap-4 sm:gap-6 animate-marquee motion-reduce:animate-none whitespace-nowrap"
          >
            {[...clients, ...clients].map((c, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.playPluck(150 + (idx % 8) * 15)}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-[0.25rem] bg-[#0f0f0e]/95 border border-[rgba(232,232,227,0.15)] border-t-white/25 hover:border-[#D4AF37]/60 transition-all cursor-pointer group shrink-0 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span className="font-display font-black text-sm tracking-wider text-white uppercase">
                    {c.name}
                  </span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {c.category}
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
              className="rounded-[0.25rem] p-5 bg-[#0c0c0b]/95 border border-[rgba(232,232,227,0.14)] border-t-white/22 shadow-lg flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer hover:border-[#D4AF37]/60 transition-all"
            >
              <span className="font-display font-black text-base sm:text-lg tracking-wider text-white transition-colors uppercase leading-none">
                {c.name}
              </span>
              <span className="mt-2.5 text-[11px] font-mono tracking-wider text-zinc-400 uppercase transition-colors">
                {c.category}
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
