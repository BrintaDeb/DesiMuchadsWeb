"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";

export function SutraProgressMeter() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sections = [
    { id: "hero", name: "दरबार", eng: "Darbar (Hero)" },
    { id: "baiscope", name: "बायोस्कोप", eng: "Baiscope (Showreel)" },
    { id: "services", name: "शस्त्र", eng: "Weapons (Services)" },
    { id: "calculator", name: "हिसाब-किताब", eng: "Hisab-Kitab (ROAS)" },
    { id: "karname", name: "कारनामे", eng: "Karname (Case Studies)" },
    { id: "pricing", name: "थाली", eng: "Thali & Pricing" },
    { id: "scanner", name: "कुण्डली", eng: "Kundli Scanner" },
  ];

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
      <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/30 mb-2" />

      {/* Sutra Track with Dynamic Glowing Crimson Fill */}
      <div className="relative w-[3px] h-64 sm:h-80 bg-[#D4AF37]/20 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-b from-[#D4AF37] via-[#E11D48] to-[#C84B31] shadow-[0_0_10px_#E11D48] transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* 7 Checkpoint Dots & Hindi Transliterated Tooltips */}
      <div className="absolute inset-y-6 flex flex-col justify-between items-center pointer-events-auto">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            onMouseEnter={() => {
              sound.playPluck(160 + idx * 15);
              setHoveredSection(sec.id);
            }}
            onMouseLeave={() => setHoveredSection(null)}
            className="relative flex items-center justify-center cursor-pointer group"
          >
            <div className="w-2 h-2 rounded-full border border-[#D4AF37] bg-[#0D0C12] group-hover:scale-150 group-hover:bg-[#E11D48] transition-all" />

            {/* Hover Tooltip Pill */}
            {hoveredSection === sec.id && (
              <div className="absolute right-6 px-3 py-1 rounded-full bg-[#0D0C12]/95 border border-[#D4AF37] backdrop-blur-md shadow-xl whitespace-nowrap text-right animate-in fade-in slide-in-from-right-2 duration-150">
                <span className="font-royal text-xs text-[#D4AF37] block font-semibold leading-tight">
                  {sec.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/70 block">
                  {sec.eng}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Diamond Pinnacle */}
      <div className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37] bg-[#D4AF37]/30 mt-2" />
    </aside>
  );
}

