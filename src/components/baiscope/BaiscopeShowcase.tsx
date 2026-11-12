"use client";

import React, { useState, useEffect } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { Flame, Play, Film, X, Maximize2 } from "lucide-react";
import { sound } from "@/lib/sound";

export function BaiscopeShowcase() {
  const [filter, setFilter] = useState<"reels" | "d2c" | "web">("reels");
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const items = [
    {
      id: 1,
      category: "reels",
      title: "Dilli Ki Cutting Chai Ka Sach",
      client: "Urban Chaiwala",
      format: "9:16 Vertical Reel",
      views: "12.4M",
      hookRate: "54%",
      holdRate: "38%",
      roas: "6.2x",
      tag: "VIRAL STREET THEATRE",
      color: "from-[#8B4513] to-[#3E1F07]",
      ratio: "aspect-[9/16]",
      strategy: "Engaged micro-local street culinary storytelling to build authentic viral brand authority without expensive celebrity endorsement.",
    },
    {
      id: 2,
      category: "reels",
      title: "Asli Zari Silk Test vs Fake",
      client: "Maharaja Silks",
      format: "9:16 Vertical Reel",
      views: "4.8M",
      hookRate: "48%",
      holdRate: "33%",
      roas: "5.8x",
      tag: "TRUST DOCUMENTARY",
      color: "from-[#8B0000] to-[#2B0000]",
      ratio: "aspect-[9/16]",
      strategy: "Leveraged forensic burn tests on pure mulberry silk to destroy cheap synthetic competition and establish absolute heritage trust.",
    },
    {
      id: 3,
      category: "d2c",
      title: "Ayurvedic Dosha Diagnostic Ad",
      client: "Vedic Skin Science",
      format: "4:5 Feed Creative",
      views: "2.9M",
      hookRate: "42%",
      holdRate: "29%",
      roas: "4.4x",
      tag: "PROBLEM-AGITATION-SOLUTION",
      color: "from-[#0F5132] to-[#0A2616]",
      ratio: "aspect-[4/5]",
      strategy: "Introduced interactive 30-second Ayurvedic dosha diagnostic quiz directly in paid feed, boosting quiz completion to 64%.",
    },
    {
      id: 4,
      category: "d2c",
      title: "The Rajputana Royal Bridal Reveal",
      client: "Jaisalmer Heritage Gems",
      format: "4:5 Feed Creative",
      views: "1.8M",
      hookRate: "46%",
      holdRate: "35%",
      roas: "5.1x",
      tag: "LUXURY ASPIRATIONAL",
      color: "from-[#B8860B] to-[#4D3905]",
      ratio: "aspect-[4/5]",
      strategy: "Crafted high-ticket royal bridal heirloom unboxing with high dynamic range cinematography, booking bridal appointments 6 months out.",
    },
    {
      id: 5,
      category: "web",
      title: "Interactive 3D Haveli Storefront",
      client: "Rajputana Living D2C",
      format: "16:9 Web Walkthrough",
      views: "850K",
      hookRate: "61%",
      holdRate: "45%",
      roas: "7.1x",
      tag: "WEBGL SPATIAL STORE",
      color: "from-[#1c1c22] to-[#121215]",
      ratio: "aspect-[16/9]",
      strategy: "Architected a real-time 3D Three.js courtyard where users can customize handcrafted furniture in spatial environments before buying.",
    },
  ];

  const filteredItems = items.filter((item) => item.category === filter);
  const activeItem = items.find((item) => item.id === activeVideo) || null;

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeVideo) return;
      if (e.key === "Escape") {
        setActiveVideo(null);
      } else if (e.key === "ArrowRight") {
        const nextId = (activeVideo % items.length) + 1;
        setActiveVideo(nextId);
      } else if (e.key === "ArrowLeft") {
        const prevId = activeVideo === 1 ? items.length : activeVideo - 1;
        setActiveVideo(prevId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo, items.length]);

  return (
    <section id="baiscope" className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[150px] pointer-events-none" />

      <SectionDivider label="THE ROYAL BAISCOPE" sublabel="HIGH-RETENTION SHOWREEL & TELEMETRY" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-zinc-300 mb-4">
            <Film className="w-3.5 h-3.5 text-white" />
            <span>VINTAGE LUXURY BIOSCOPE VIEWFINDER</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white">
            Where Desi Swagger{" "}
            <span className="text-gradient-silver block mt-1">
              Meets Hard Telemetry.
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Every creative we shoot is tied to verified performance telemetry. Click any viewfinder to open the high-retention glassmorphic telemetry lightbox.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#121215] border border-white/15">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(140);
                setFilter("reels");
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                filter === "reels"
                  ? "bg-white text-black shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Viral Reels (9:16)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(160);
                setFilter("d2c");
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                filter === "d2c"
                  ? "bg-white text-black shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              D2C Ad Creatives (4:5)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(180);
                setFilter("web");
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                filter === "web"
                  ? "bg-white text-black shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              3D Web Walkthroughs (16:9)
            </button>
          </div>
        </div>

        {/* Bioscope Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => sound.playPluck(120)}
              onClick={() => {
                sound.playChime();
                setActiveVideo(item.id);
              }}
              className="group relative rounded-3xl p-5 bg-[#121215] border border-white/10 border-t-white/20 hover:border-white/35 hover:bg-[#18181d] transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between cursor-pointer"
            >
              {/* Bioscope Brass Lens Peep-Hole Casing */}
              <div
                className={`relative w-full ${item.ratio} max-h-[380px] rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} p-4 flex flex-col justify-between shadow-2xl border border-white/10`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-mono font-bold backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>{item.views} Views</span>
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="my-auto mx-auto w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>

                {/* Bottom Overlay Title */}
                <div className="z-10 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-zinc-300 uppercase">
                      {item.client}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-white" />
                      <span>LIGHTBOX</span>
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Verified Performance Telemetry Overlays */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-2 font-semibold">
                  Verified Ad Telemetry:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-[#18181c] border border-white/10">
                    <span className="text-[10px] text-zinc-400 block">Hook Rate</span>
                    <span className="text-xs font-bold text-white">{item.hookRate}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#18181c] border border-white/10">
                    <span className="text-[10px] text-zinc-400 block">Hold Rate</span>
                    <span className="text-xs font-bold text-white">{item.holdRate}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#18181c] border border-white/10">
                    <span className="text-[10px] text-zinc-400 block">ROAS</span>
                    <span className="text-xs font-bold text-white">{item.roas}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          BAISCOPE CREATIVE GLASSMORPHISM LIGHTBOX
         ========================================================================= */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          {/* Glassmorphic Shell */}
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f0f12] backdrop-blur-3xl border border-white/20 border-t-white/30 shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-5 sm:p-8 text-white overflow-hidden">
            {/* Ambient Back Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.04] rounded-full blur-[100px] pointer-events-none" />

            {/* Header with Close */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                  {activeItem.tag}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeItem.format}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all active:scale-95"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Creative Hero Display */}
            <div
              className={`w-full h-52 sm:h-64 rounded-2xl bg-gradient-to-br ${activeItem.color} p-6 flex flex-col justify-between border border-white/15 relative overflow-hidden shadow-inner mb-6`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-mono text-white uppercase font-bold tracking-widest">
                  {activeItem.client}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-white flex items-center gap-1.5 border border-white/10">
                  <Flame className="w-3.5 h-3.5 text-white" />
                  <span>{activeItem.views} Organic Reach</span>
                </span>
              </div>

              <div className="relative z-10 text-center my-auto">
                <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-0.5" />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Verified Performance Telemetry */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Hook Rate (0-3s)</span>
                <span className="font-display font-black text-xl sm:text-2xl text-white">{activeItem.hookRate}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Hold Rate (&gt;15s)</span>
                <span className="font-display font-black text-xl sm:text-2xl text-white">{activeItem.holdRate}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Blended ROAS</span>
                <span className="font-display font-black text-xl sm:text-2xl text-white">{activeItem.roas}</span>
              </div>
            </div>

            {/* Creative Strategy Insight */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-6 text-xs text-zinc-300 leading-relaxed">
              <span className="font-mono font-bold text-white uppercase block mb-1">Creative Psychology:</span>
              <p>{activeItem.strategy}</p>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <span>0{activeItem.id}</span>
                <span>/</span>
                <span>05 Creatives</span>
              </div>

              <a
                href={`https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20want%20to%20produce%20high-ROAS%20ad%20creatives%20like%20${encodeURIComponent(activeItem.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow transition-all active:scale-95"
              >
                <span>COMMISSION CREATIVE &gt;</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
