"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sound } from "@/lib/sound";

export function SutraProgressMeter() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections = [
    { id: "hero", name: "01", eng: "Vision & Architecture" },
    { id: "services", name: "02", eng: "Disciplines & Services" },
    { id: "work", name: "03", eng: "Selected Works & Art" },
    { id: "clients", name: "04", eng: "Client Trust Proof" },
    { id: "pricing", name: "05", eng: "4-Tier Service Pricing" },
    { id: "contact", name: "06", eng: "Strategy Session" },
  ];

  const handleSectionClick = (id: string) => {
    sound.playChime();
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      if (id === "pricing") router.push("/pricing");
      else if (id === "services") router.push("/services");
      else if (id === "work") router.push("/work");
      else if (id === "contact") router.push("/contact");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      aria-label="Scroll progress sutra"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none pointer-events-auto"
    >
      {/* Top Diamond Pinnacle */}
      <div className="w-2.5 h-2.5 rotate-45 border border-white/60 bg-white/20 mb-2" />

      {/* Sutra Track with Dynamic Glowing White Fill */}
      <div className="relative w-[3px] h-64 sm:h-80 bg-white/15 rounded-full overflow-hidden">
        <div
          className="w-full bg-white shadow-[0_0_10px_white] transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* 6 Checkpoint Dots & Hindi Transliterated Tooltips */}
      <div className="absolute inset-y-6 flex flex-col justify-between items-center pointer-events-auto">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            role="button"
            tabIndex={0}
            aria-label={`Jump to ${sec.eng}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSectionClick(sec.id);
              }
            }}
            onMouseEnter={() => {
              sound.playPluck(160 + idx * 15);
              setHoveredSection(sec.id);
            }}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative flex items-center justify-center cursor-pointer group focus:outline-none"
          >
            <div className="w-2 h-2 rounded-full border border-white/60 bg-black group-hover:scale-150 group-hover:bg-white transition-all shadow-[0_0_6px_rgba(255,255,255,0.4)]" />

            {/* Hover Tooltip Pill */}
            {hoveredSection === sec.id && (
              <div className="absolute right-6 px-3 py-1 rounded-full bg-black/95 border border-white/30 backdrop-blur-md shadow-2xl whitespace-nowrap text-right animate-in fade-in slide-in-from-right-2 duration-150">
                <span className="font-royal text-xs text-white block font-semibold leading-tight">
                  {sec.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block">
                  {sec.eng}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Diamond Base */}
      <div className="w-2.5 h-2.5 rotate-45 border border-white/60 bg-white/20 mt-2" />
    </aside>
  );
}
