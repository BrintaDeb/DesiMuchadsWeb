"use client";

import React, { useState, useRef } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import { ArrowLeftRight, Sparkles, X } from "lucide-react";
import { sound } from "@/lib/sound";

export function AdPostMortemSection() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [activePin, setActivePin] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const pins = [
    {
      id: 1,
      x: 25,
      y: 22,
      title: "Scroll-Stopping Cultural Hook (0–1.5s)",
      desc: "Replaced sterile Western corporate stock footage with a dramatic street-smart Hinglish question that arrests the thumb within the first 400 milliseconds.",
    },
    {
      id: 2,
      x: 72,
      y: 35,
      title: "Golden Ratio (φ) Visual Focal Point",
      desc: "Anchored the product bottle directly at the intersection of classical Indian architectural symmetry, directing immediate pupil dilation to the brand emblem.",
    },
    {
      id: 3,
      x: 35,
      y: 65,
      title: "High-Contrast Vernacular Value Proposition",
      desc: "Cut corporate jargon. Deployed bold two-tone Syne typography with localized slang that bridges emotional pride directly to unit economics.",
    },
    {
      id: 4,
      x: 68,
      y: 82,
      title: "Zero-Friction Fitts's Law CTA Trigger",
      desc: "Expanded the mobile thumb target radius by 3.4x with high-contrast Sindoor Crimson backdrop and animated marquee twirl.",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#09090b] border-t border-white/10 text-white overflow-hidden">
      <SectionDivider label="AD POST-MORTEM" sublabel="ANATOMY OF A HIGH-ROAS CONVERSION" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-tight">
            Template Ad vs.<br />
            <span className="text-zinc-300">
              Desi Muchads High-ROAS Weapon.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans">
            Drag the comparison slider below to dissect why generic ads burn your budget at 0.8x ROAS while our culturally engineered ads print 5.2x ROAS.
          </p>
        </div>

        {/* Interactive Split-Screen Slider Box */}
        <div
          ref={containerRef}
          onMouseMove={(e) => handleSliderMove(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) handleSliderMove(e.touches[0].clientX);
          }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[580px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.95)] select-none cursor-ew-resize bg-black"
        >
          {/* Filigree corner brackets */}
          <div className="absolute top-3 left-3 opacity-40 z-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white/50" position="top-left" />
          </div>
          <div className="absolute top-3 right-3 opacity-40 z-30 pointer-events-none">
            <FiligreeCorner className="w-4 h-4 text-white/50" position="top-right" />
          </div>

          {/* LEFT SIDE: Generic Template Ad (0.8x ROAS) */}
          <div className="absolute inset-0 w-full h-full bg-[#141417] p-6 sm:p-12 flex flex-col justify-between text-zinc-400">
            {/* Template Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/60 border border-red-500/40 text-red-400 font-mono text-xs w-max">
              <span>BORING CORPORATE TEMPLATE • 0.8x ROAS (BURNING CASH)</span>
            </div>

            {/* Bad Mockup Center */}
            <div className="my-auto max-w-sm space-y-4">
              <div className="w-full h-32 sm:h-44 rounded-lg bg-black border border-white/10 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-mono text-zinc-400">
                  [ Generic Stock Photo of People Smiling in London ]
                </span>
                <span className="text-[11px] text-zinc-500 mt-2">
                  Zero Indian cultural context • Zero emotional resonance
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-white/10 text-zinc-400 text-xs rounded font-sans cursor-not-allowed"
              >
                Learn More (Generic Link)
              </button>
            </div>

            <div className="font-mono text-[11px] text-zinc-400">
              High CPA (₹1,850) • Low CTR (0.42%) • High Ad Fatigue in 3 Days
            </div>
          </div>

          {/* RIGHT SIDE: Desi Muchads High-ROAS Weapon (5.2x ROAS) clipped by sliderPos */}
          <div
            style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#121215] via-[#16161b] to-[#121215] p-6 sm:p-12 flex flex-col justify-between transition-none z-10"
          >
            {/* Weapon Header Badge */}
            <div className="inline-flex items-center justify-between w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/25 text-white font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>DESI MUCHADS CRAFTED AD • 5.2x ROAS (PROFIT MACHINE)</span>
              </div>
            </div>

            {/* High-Converting Ad Mockup Visual */}
            <div className="my-auto max-w-md space-y-4 pl-4 border-l-2 border-white">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-white uppercase tracking-wider font-bold">
                <MoustacheSVG className="w-5 h-2.5 text-white" />
                <span>The Royal Masala Hook</span>
              </div>
              <h3 className="font-sans font-black text-2xl sm:text-4xl text-white leading-tight">
                शर्म कैसी?{" "}
                <span className="text-zinc-300">राज करो मार्केट पर।</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed font-sans">
                Engineered with high-voltage vernacular storytelling that commands immediate attention and converts high-ticket buyers.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-lg">
                  Shop Heritage Collection &gt;
                </span>
              </div>
            </div>

            <div className="font-mono text-[11px] text-zinc-300 flex items-center justify-between">
              <span>Low CPA (₹410) • High CTR (3.8%) • 45+ Day Ad Longevity</span>
              <span className="text-white font-black font-metric">5.2x Scaled ROAS</span>
            </div>

            {/* 4 Pulsing Golden Hotspot Pins */}
            {pins.map((pin) => (
              <div
                key={pin.id}
                style={{ top: `${pin.y}%`, left: `${pin.x}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playPluck(200);
                    setActivePin(activePin === pin.id ? null : pin.id);
                  }}
                  onMouseEnter={() => sound.playPluck(180)}
                  className="relative group p-1 focus:outline-none"
                  aria-label={pin.title}
                >
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                  <div className="relative w-6 h-6 rounded-full bg-white border-2 border-black text-black font-mono text-[11px] font-black flex items-center justify-center shadow-[0_0_15px_white] hover:scale-125 transition-transform">
                    {pin.id}
                  </div>
                </button>

                {/* Hotspot Floating Tooltip */}
                {activePin === pin.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-64 p-3.5 rounded-xl bg-[#121215] border border-white/30 backdrop-blur-xl shadow-2xl text-left z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] text-white font-bold uppercase tracking-wider">
                        HOTSPOT 0{pin.id}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePin(null);
                        }}
                        className="text-white/60 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="font-sans font-bold text-xs text-white mb-1">
                      {pin.title}
                    </div>
                    <p className="text-[10px] font-sans text-zinc-300 leading-relaxed">
                      {pin.desc}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Draggable Divider Handle */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none -translate-x-1/2 shadow-[0_0_20px_white]"
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-black text-black flex items-center justify-center shadow-xl">
              <ArrowLeftRight className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 font-mono text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <span>← Slide Left for Template Ad</span>
          </span>
          <span className="text-white">✦</span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white" />
            <span>Slide Right for Desi Muchads Weapon →</span>
          </span>
        </div>
      </div>
    </section>
  );
}
