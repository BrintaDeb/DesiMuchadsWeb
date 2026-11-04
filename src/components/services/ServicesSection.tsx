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

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      title: '"Much Ads" Performance Engine',
      hindiTitle: "राज करेगा Ad Spend",
      category: "Paid Media & PPC",
      metricBadge: "Avg. 4.8x ROAS",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: TrendingUp,
      accentColor: "#E11D48",
      summary:
        "Algorithmic media buying across Meta, Google Search/Shopping, and YouTube that treats every Rupee like an investment, not an expense.",
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
      metricColor: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30",
      icon: Crown,
      accentColor: "#D4AF37",
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
      title: 'Viral Social Media & Reels ("Halla Bol")',
      hindiTitle: "इंटरनेट पर हल्ला बोल",
      category: "Content & Virality",
      metricBadge: "10M+ Organic Views",
      metricColor: "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30",
      icon: Flame,
      accentColor: "#C84B31",
      summary:
        "High-retention Hinglish short-form video production, witty meme marketing, and culturally resonant scripts that turn scrollers into superfans.",
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
      accentColor: "#D4AF37",
      summary:
        "Ultra-fast Next.js web applications, headless Shopify storefronts, and tactile WebGL interactions engineered for ruthless conversion rates.",
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
      accentColor: "#0D9488",
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
      metricColor: "text-[#E11D48] bg-[#E11D48]/10 border-[#E11D48]/30",
      icon: Sparkles,
      accentColor: "#E11D48",
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
    <section id="services" className="relative py-24 sm:py-32 bg-[#0D0C12] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#141829]/60 blur-[150px] pointer-events-none -z-10" />

      <SectionDivider label="THE 6 PILLARS" sublabel="HUM KYA KARTE HAIN" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F7F1E5]">
            Engineered for Impact.{" "}
            <span className="brass-gradient-text block mt-1">
              Rooted in Royal Craft.
            </span>
          </h2>
          <p className="mt-5 text-[#F7F1E5]/70 text-base sm:text-lg">
            We don’t do cookie-cutter campaigns. Every service is a fine-tuned weapon in our arsenal, designed to win customer attention and dominate market share.
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
                onMouseEnter={() => setActiveCard(item.id)}
                onMouseLeave={() => setActiveCard(null)}
                data-cursor="explore"
                className={`relative group rounded-3xl p-6 sm:p-8 bg-[#141829]/50 border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden ${
                  item.colSpan
                } ${
                  isHovered
                    ? "border-[#D4AF37] shadow-[0_15px_40px_rgba(212,175,55,0.15)] bg-[#161B30]"
                    : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50"
                }`}
              >
                {/* Filigree corner accents */}
                <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-100 transition-opacity">
                  <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-left" />
                </div>
                <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity">
                  <FiligreeCorner className="w-4 h-4 text-[#D4AF37]" position="top-right" />
                </div>

                {/* Matchbox Strike-Strip Accent along left border */}
                <div className="absolute left-0 top-12 bottom-12 w-1 bg-gradient-to-b from-transparent via-[#C84B31]/60 to-transparent group-hover:via-[#E11D48] transition-colors" />

                <div>
                  {/* Top Header Row with Icon and Live Metric Pill */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                      <Icon className="w-6 h-6" />
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
                    <span className="font-royal text-sm text-[#D4AF37] tracking-wider block mb-1">
                      {item.hindiTitle}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F7F1E5] group-hover:text-[#F5DE88] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-[#F7F1E5]/75 leading-relaxed mb-6 font-normal">
                    {item.summary}
                  </p>

                  {/* Progressive Deliverables List */}
                  <div className="space-y-2 border-t border-[#D4AF37]/15 pt-5">
                    <span className="text-[11px] font-mono tracking-widest text-[#D4AF37]/70 uppercase block mb-3 font-semibold">
                      Included Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {item.deliverables.map((deliv, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-[#F7F1E5]/90 font-mono"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Trigger */}
                <div className="mt-8 pt-5 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#D4AF37]/80 uppercase tracking-widest">
                    {item.category}
                  </span>

                  <button
                    onClick={onOpenKundli}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#F7F1E5] hover:text-[#D4AF37] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Deploy This Weapon</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E11D48]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Trigger */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-3xl bg-[#141829]/70 border border-[#D4AF37]/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <MoustacheSVG className="w-8 h-4 text-[#D4AF37]" />
              <span className="text-sm sm:text-base font-medium text-[#F7F1E5]">
                Need a comprehensive 360° growth strategy for your brand?
              </span>
            </div>
            <button
              onClick={onOpenKundli}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-[#F7F1E5] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.7)] transition-all"
            >
              Order Full Darbar Suite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
