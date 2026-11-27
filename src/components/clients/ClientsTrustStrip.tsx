"use client";

import React, { useEffect, useRef } from "react";
import { sound } from "@/lib/sound";
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
      className="relative py-16 sm:py-28 lg:py-32 bg-transparent text-white overflow-hidden select-none font-display border-t border-white/10"
    >
      {/* Subtle obsidian vignette backdrop for editorial typography contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(9,9,11,0.82)_0%,transparent_72%)]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-white uppercase leading-[0.96]">
            Trusted by Category <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ leaders.</span>
          </h2>
        </div>

        {/* Light Velocity Marquee */}
        <div className="relative w-full max-w-full overflow-hidden contain-paint py-3 my-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            ref={marqueeRef}
            className="transition-transform will-change-transform flex gap-6 sm:gap-10 animate-marquee motion-reduce:animate-none whitespace-nowrap"
          >
            {[...clients, ...clients].map((c, idx) => (
              <div
                key={idx}
                onMouseEnter={() => sound.playPluck(150 + (idx % 8) * 15)}
                className="inline-flex items-center gap-2.5 py-2 transition-opacity cursor-pointer group shrink-0 opacity-70 hover:opacity-100"
              >
                <span className="w-1 h-1 rounded-full bg-[#D4AF37]/70" />
                <span className="font-display font-bold text-sm sm:text-base tracking-wider text-zinc-200 group-hover:text-white uppercase">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Hairline 6-Column Partner Archive Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-10 border-t border-l border-white/[0.07]">
          {clients.map((c, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playPluck(140 + idx * 10)}
              className="p-5 sm:p-6 border-r border-b border-white/[0.07] bg-transparent hover:bg-white/[0.025] flex flex-col items-center justify-center text-center aspect-[5/3] cursor-pointer transition-colors group"
            >
              <span className="font-display font-bold text-sm tracking-wider text-zinc-200 group-hover:text-white uppercase leading-none transition-colors">
                {c.name}
              </span>
              <span className="mt-2 text-[9.5px] font-mono tracking-wider text-zinc-500 uppercase">
                {c.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <BreydaqsButton href="/work" variant="white">
            VIEW ALL WORK
          </BreydaqsButton>
        </div>
      </div>
    </section>
  );
}
