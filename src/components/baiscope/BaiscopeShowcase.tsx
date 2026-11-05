"use client";

import React, { useState } from "react";
import { SectionDivider } from "../common/SectionDivider";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import { Eye, Flame, Play, Sparkles, TrendingUp, Film } from "lucide-react";
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
      color: "from-[#141829] to-[#0D0C12]",
      ratio: "aspect-[16/9]",
    },
  ];

  const filteredItems = items.filter((item) => item.category === filter);

  return (
    <section id="baiscope" className="relative py-28 sm:py-36 bg-[#0D0C12] text-[#F7F1E5] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-[150px] pointer-events-none" />

      <SectionDivider label="THE ROYAL BAISCOPE" sublabel="HIGH-RETENTION SHOWREEL & TELEMETRY" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-xs font-mono text-[#D4AF37] mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>VINTAGE LUXURY BIOSCOPE VIEWFINDER</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F7F1E5]">
            Where Desi Swagger{" "}
            <span className="brass-gradient-text block mt-1">
              Meets Hard Telemetry.
            </span>
          </h2>
          <p className="mt-4 text-[#F7F1E5]/70 text-sm sm:text-base">
            Every creative we shoot is tied to verified performance telemetry. Inspect our viral reels, high-converting D2C ad creatives, and spatial web builds.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-[#141829] border border-[#D4AF37]/30">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(140);
                setFilter("reels");
              }}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                filter === "reels"
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                  : "text-white/60 hover:text-white"
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
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                  : "text-white/60 hover:text-white"
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
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-[#0D0C12] shadow-md"
                  : "text-white/60 hover:text-white"
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
              className="group relative rounded-3xl p-5 bg-[#141829]/70 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-xl shadow-xl flex flex-col justify-between"
            >
              {/* Bioscope Brass Lens Peep-Hole Casing */}
              <div
                className={`relative w-full ${item.ratio} max-h-[380px] rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} p-4 flex flex-col justify-between shadow-2xl border border-white/10`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-[#F5DE88]">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/80 text-white text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>{item.views} Views</span>
                  </div>
                </div>

                {/* Center Play Button Overlay */}
                <div className="my-auto mx-auto w-14 h-14 rounded-full bg-[#D4AF37]/90 text-[#0D0C12] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>

                {/* Bottom Overlay Title */}
                <div className="z-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase block">
                    {item.client}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white">
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Verified Performance Telemetry Overlays */}
              <div className="mt-5 pt-4 border-t border-[#D4AF37]/15">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/70 block mb-2 font-semibold">
                  Verified Ad Telemetry:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center font-mono">
                  <div className="p-2 rounded-xl bg-[#0D0C12]/60 border border-[#D4AF37]/10">
                    <span className="text-[10px] text-white/50 block">Hook Rate</span>
                    <span className="text-xs font-bold text-[#F5DE88]">{item.hookRate}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0D0C12]/60 border border-[#D4AF37]/10">
                    <span className="text-[10px] text-white/50 block">Hold Rate</span>
                    <span className="text-xs font-bold text-[#F5DE88]">{item.holdRate}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#0D0C12]/60 border border-[#0D9488]/30">
                    <span className="text-[10px] text-[#0D9488] block">ROAS</span>
                    <span className="text-xs font-bold text-[#0D9488]">{item.roas}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
