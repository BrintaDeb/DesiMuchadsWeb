"use client";

import React, { useState } from "react";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import { SectionDivider } from "../common/SectionDivider";
import {
  TrendingUp,
  Sparkles,
  Flame,
  Globe,
  Search,
  Crown,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: '"Much Ads" Performance Media',
      hindiTitle: "राज करेगा Ad Spend",
      category: "Paid Media & PPC",
      metricBadge: "Avg. 4.8x ROAS",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: TrendingUp,
      summary:
        "Algorithmic media buying across Meta, Google Search & Shopping, and YouTube that treats every Rupee like an investment, not an expense.",
      deliverables: [
        "Meta Ads (CBO & Advantage+ Scaling)",
        "Google Shopping & High-Intent Search",
        "YouTube In-Stream Video Funnels",
        "Multi-Touch Dynamic Retargeting",
        "Automated Hourly Bid Optimization",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      id: 2,
      title: 'Desi Brand Identity & Packaging',
      hindiTitle: "शाही पहचान (Brand Granth)",
      category: "Branding & Pehchan",
      metricBadge: "100% Bespoke Craft",
      metricColor: "text-[#9A7B1C] bg-[#D4AF37]/15 border-[#D4AF37]/30",
      icon: Crown,
      summary:
        "Bespoke visual identities and packaging that capture authentic Indian cultural prestige with world-class Swiss typography.",
      deliverables: [
        "Unforgettable Logo & Mark Systems",
        "Cultural Storytelling & Narrative",
        "Luxury FMCG & D2C Packaging",
        "The Complete 'Brand Granth' Book",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      id: 3,
      title: 'Viral Reels & Hinglish Content ("Halla Bol")',
      hindiTitle: "इंटरनेट पर हल्ला बोल",
      category: "Content & Virality",
      metricBadge: "10M+ Organic Views",
      metricColor: "text-[#C84B31] bg-[#C84B31]/15 border-[#C84B31]/30",
      icon: Flame,
      summary:
        "High-retention Hinglish short-form video production, witty meme marketing, and culturally resonant scripts that turn scrollers into buyers.",
      deliverables: [
        "Hinglish Hook Engineering",
        "Studio & On-Location Reels Shoots",
        "Cultural Trend Hijacking & Memes",
        "Full Community & Comment Moderation",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      id: 4,
      title: 'Spatial & Custom Web Engineering',
      hindiTitle: "डिजिटल महल Construction",
      category: "Digital Mahal & Web",
      metricBadge: "<0.8s Load Time",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: Globe,
      summary:
        "Ultra-fast Next.js 16 web applications, headless Shopify storefronts, and tactile WebGL interactions engineered for ruthless conversion rates.",
      deliverables: [
        "Next.js App Router & Micro-Animations",
        "Headless Shopify High-Conversion Stores",
        "Mobile-First Frictionless Checkout UX",
        "Core Web Vitals Perfect 100 Score",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      id: 5,
      title: 'SEO & Search Dominance ("Danka")',
      hindiTitle: "Google पर हुकूमत",
      category: "Search & GEO Engine",
      metricBadge: "#1 Page Rankings",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: Search,
      summary:
        "Dominate search results across Google Search, Maps GMB, and modern AI generative answer engines (Perplexity, ChatGPT, Gemini).",
      deliverables: [
        "Deep Technical SEO Architecture",
        "High-Authority Contextual Backlinks",
        "Local Google Business Domination",
        "Generative AI Engine Optimization (GEO)",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      id: 6,
      title: 'Influencer Marketing & PR Darbar',
      hindiTitle: "शाही रूतबा & Creators",
      category: "PR & Creator Darbar",
      metricBadge: "500+ Creator Network",
      metricColor: "text-[#C84B31] bg-[#C84B31]/15 border-[#C84B31]/30",
      icon: Sparkles,
      summary:
        "Curated creator partnerships with tier-1 regional and national voices that deliver authentic endorsements and measurable revenue attribution.",
      deliverables: [
        "Precision Creator Matchmaking",
        "Iron-Clad Performance Contracts",
        "Whitelisting Ad Rights on Creator Handles",
        "National PR & Digital News Syndication",
      ],
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <section id="services" className="relative py-28 sm:py-36 bg-[#DCD3C5] text-[#2A2521] overflow-hidden">
      {/* Subtle Sandstone Khadi Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#BAAF9C_1px,transparent_1px)] [background-size:24px_24px]" />

      <SectionDivider label="THE 6 SHASTRA" sublabel="WHERE TRADITION MEETS PERFORMANCE" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 relative z-10">
        {/* Section Heading - Desi Vibes Spirit Section Style */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="font-body text-xs uppercase tracking-[0.22em] text-[#C84B31] font-semibold block mb-2">
            THE SOUL OF DESI MUCHADS
          </span>
          <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl tracking-[0.03em] uppercase leading-[0.95] text-[#2A2521]">
            WHERE TRADITION{" "}
            <span className="italic block font-normal text-[#C84B31] mt-1">
              MEETS THE AD TANK.
            </span>
          </h2>
          <p className="mt-5 text-[#2A2521]/80 text-sm sm:text-base font-body font-light max-w-2xl mx-auto leading-relaxed">
            Authentic Indian storytelling, soothing precision, and moments of breakthrough brand scale. We engineer every service as a high-precision weapon.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item) => {
            const Icon = item.icon;
            const isHovered = activeCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  sound.playPluck(140);
                  setActiveCard(item.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                data-cursor="explore"
                className={`relative group rounded-3xl p-6 sm:p-8 bg-white/70 border transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden ${
                  item.colSpan
                } ${
                  isHovered
                    ? "border-[#2A2521]/40 shadow-[0_15px_40px_rgba(42,37,33,0.12)] bg-white/90 -translate-y-1"
                    : "border-[#2A2521]/15 hover:border-[#2A2521]/30"
                }`}
              >
                {/* Filigree corner accents */}
                <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-100 transition-opacity">
                  <FiligreeCorner className="w-4 h-4 text-[#C84B31]" position="top-left" />
                </div>
                <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
                  <FiligreeCorner className="w-4 h-4 text-[#C84B31]" position="top-right" />
                </div>

                <div>
                  {/* Top Header Row with Icon and Live Metric Pill */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl border border-[#2A2521]/20 bg-[#2A2521]/5 flex items-center justify-center text-[#2A2521] group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#C84B31]" />
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold ${item.metricBadge ? item.metricColor : ""}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{item.metricBadge}</span>
                    </div>
                  </div>

                  {/* Hindi & English Titles */}
                  <div className="mb-4">
                    <span className="font-royal text-sm text-[#C84B31] tracking-wider block mb-1">
                      {item.hindiTitle}
                    </span>
                    <h3 className="font-display font-medium text-2xl sm:text-3xl text-[#2A2521] tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#2A2521]/75 leading-relaxed mb-6 font-body font-light">
                    {item.summary}
                  </p>

                  {/* Progressive Deliverables List */}
                  <div className="space-y-2 border-t border-[#2A2521]/15 pt-5">
                    <span className="text-[11px] font-body tracking-[0.18em] text-[#C84B31] uppercase block mb-3 font-semibold">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {item.deliverables.map((deliv, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-[#2A2521]/90 font-body"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div className="mt-8 pt-5 border-t border-[#2A2521]/15 flex items-center justify-between">
                  <span className="font-body text-[11px] text-[#2A2521]/60 uppercase tracking-widest font-medium">
                    {item.category}
                  </span>

                  <button
                    onClick={() => {
                      sound.playChime();
                      onOpenKundli();
                    }}
                    className="inline-flex items-center gap-2 text-xs font-body font-semibold text-[#2A2521] hover:text-[#C84B31] transition-colors group-hover:translate-x-1 duration-300 uppercase tracking-wider"
                  >
                    <span>Deploy Weapon</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C84B31]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-3xl bg-white/80 border border-[#2A2521]/20 backdrop-blur-md shadow-md">
            <div className="flex items-center gap-3">
              <MoustacheSVG className="w-8 h-4 text-[#C84B31]" />
              <span className="text-sm sm:text-base font-body font-medium text-[#2A2521]">
                Need a comprehensive 360° growth strategy for your brand?
              </span>
            </div>
            <button
              onClick={() => {
                sound.playChime();
                onOpenKundli();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-white font-body font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Order Full Darbar Suite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
