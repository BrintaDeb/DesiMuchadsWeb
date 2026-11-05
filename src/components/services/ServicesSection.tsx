"use client";

import React, { useState } from "react";
import { FiligreeCorner, MoustacheSVG } from "../common/Icons";
import { SectionDivider } from "../common/SectionDivider";
import {
  TrendingUp,
  Sparkles,
  Flame,
  Globe,
  Mail,
  Coins,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface ServicesSectionProps {
  onOpenKundli: () => void;
}

export function ServicesSection({ onOpenKundli }: ServicesSectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const capabilities = [
    {
      id: 1,
      title: "Social Media Marketing",
      subTitle: "Create a Buzz • Tell Engaging Stories",
      category: "Social & Buzz",
      metricBadge: "+477% Engagement Avg.",
      metricColor: "text-[#C84B31] bg-[#C84B31]/10 border-[#C84B31]/30",
      icon: Flame,
      summary:
        "Tell engaging stories to your target audience to create a buzz around your brand. We’ll get you heard out there.",
      deliverables: [
        "Hinglish Hook & Viral Reels Production",
        "Cultural Trend Hijacking & Memes",
        "Creator Whitelisting & Influencer Darbar",
        "Full Community Management & Buzz Architecture",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      id: 2,
      title: "Performance Marketing",
      subTitle: "Facebook & Google Ads Media Buying",
      category: "Paid Media & PPC",
      metricBadge: "Avg. 4.8x ROAS",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: TrendingUp,
      summary:
        "Developing unique, proven media buying strategies to profitably scale business through Facebook and Google Ads.",
      deliverables: [
        "Meta Ads (Advantage+ & High-Scale CBO)",
        "Google Shopping & High-Intent Search PPC",
        "Omnichannel Budget & Bid Optimization",
        "100% Transparent Attribution & Live ROAS Tracking",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      id: 3,
      title: "Email & SMS Marketing",
      subTitle: "Automations, Sequences & Workflows",
      category: "Retention & LTV",
      metricBadge: "32% Net Revenue via Flows",
      metricColor: "text-[#9A7B1C] bg-[#D4AF37]/15 border-[#D4AF37]/30",
      icon: Mail,
      summary:
        "Setting up all necessary automations, sequences, and workflows is the first step in maximizing our clients ROI.",
      deliverables: [
        "Automated Welcome & Abandoned Cart Recovery",
        "High-Converting Post-Purchase Journeys",
        "Conversational WhatsApp Automations",
        "Predictive Customer LTV & Win-Back Campaigns",
      ],
      colSpan: "lg:col-span-1",
    },
    {
      id: 4,
      title: "Ad Creative Production",
      subTitle: "Data-Driven Creative Sauce",
      category: "Creative Engineering",
      metricBadge: "First 1.5s Hook Mastery",
      metricColor: "text-[#C84B31] bg-[#C84B31]/10 border-[#C84B31]/30",
      icon: Sparkles,
      summary:
        "Using data to guide the creativity behind these winning ads is our “not-so” secret sauce.",
      deliverables: [
        "First 1.5s Thumb-Stopping Hook Testing",
        "Rapid UGC Variation Engines & Studio Shoots",
        "High-Contrast Cultural Packaging & Visual Assets",
        "Iterative Weekly Creative Sprint Cycles",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      id: 5,
      title: "CRO & Ecommerce Solutions",
      subTitle: "Crafted Websites & Conversion Optimization",
      category: "Web & Conversions",
      metricBadge: "<0.8s Load • 2.8x CR Lift",
      metricColor: "text-[#0D9488] bg-[#0D9488]/10 border-[#0D9488]/30",
      icon: Globe,
      summary:
        "Carefully crafted and professionally developed ecommerce website and CRO to improve conversions.",
      deliverables: [
        "Ultra-Fast Next.js & Headless Storefronts",
        "Friction-Free 1-Click Checkout Integration",
        "Comprehensive CRO Audits & Heatmap Analysis",
        "A/B Multivariate Funnel Optimization",
      ],
      colSpan: "lg:col-span-2",
    },
    {
      id: 6,
      title: "Investments & Strategic Growth",
      subTitle: "Backing High-Potential E-Commerce",
      category: "Equity & Capital",
      metricBadge: "Skin In The Game",
      metricColor: "text-[#9A7B1C] bg-[#D4AF37]/15 border-[#D4AF37]/30",
      icon: Coins,
      summary:
        "We invest in e-commerce and retail businesses where we see huge potential.",
      deliverables: [
        "Equity-Share Growth Retainers",
        "Inventory Financing & Media Capital",
        "Omnichannel Category Dominance Roadmaps",
        "Dedicated In-House Growth Squad",
      ],
      colSpan: "lg:col-span-1",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 bg-[#DCD3C5] text-[#2A2521] overflow-hidden select-none font-body transition-colors duration-500"
    >
      {/* Handcrafted Parchment Subtle Noise & Ambient Warmth */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C84B31_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 -right-36 w-[500px] h-[500px] rounded-full bg-[#E5A83B]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-36 w-[500px] h-[500px] rounded-full bg-[#C84B31]/10 blur-[120px] pointer-events-none" />

      {/* Scalloped Top Edge Transition */}
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#1C1815] to-transparent pointer-events-none opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header - Exact BeeMarketing Taxonomy with Desi Swagger */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#2A2521]/20 bg-white/40 backdrop-blur-md mb-4 shadow-sm">
            <MoustacheSVG className="w-5 h-2.5 text-[#C84B31]" />
            <span className="font-body text-[11px] uppercase tracking-[0.22em] text-[#2A2521] font-semibold">
              OUR CAPABILITIES
            </span>
            <span className="text-[#C84B31]">✦</span>
          </div>

          <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#2A2521] uppercase leading-[0.95]">
            WE LOVE DIGITAL.{" "}
            <span className="block italic font-normal text-[#C84B31] mt-1 font-display">
              PROVEN TO DELIVER.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-[#2A2521]/75 font-body font-light leading-relaxed max-w-xl mx-auto">
            We love digital. We’re experts in brand-building experiences and results-driven marketing — blending deep cultural storytelling with ruthless performance media buying.
          </p>
        </div>

        {/* 6 Capabilities Bento Grid (BeeMarketing Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {capabilities.map((item) => {
            const Icon = item.icon;
            const isHovered = activeCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => {
                  sound.playPluck(130 + item.id * 15);
                  setActiveCard(item.id);
                }}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative group rounded-3xl p-6 sm:p-8 bg-white/75 border transition-all duration-300 backdrop-blur-md flex flex-col justify-between overflow-hidden shadow-sm ${
                  item.colSpan
                } ${
                  isHovered
                    ? "border-[#2A2521]/40 shadow-[0_20px_45px_rgba(42,37,33,0.14)] bg-white/95 -translate-y-1.5"
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
                  {/* Category & Verified Metric Badge */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-body text-[10.5px] font-semibold tracking-[0.2em] text-[#2A2521]/60 uppercase">
                      {item.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider border shadow-sm ${item.metricColor}`}
                    >
                      {item.metricBadge}
                    </span>
                  </div>

                  {/* Title & Icon Header */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#2A2521]/5 border border-[#2A2521]/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#C84B31] group-hover:text-white transition-all duration-300 text-[#C84B31]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[#2A2521] uppercase leading-tight group-hover:text-[#C84B31] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs text-[#2A2521]/60 font-medium tracking-wide mt-0.5">
                        {item.subTitle}
                      </p>
                    </div>
                  </div>

                  {/* BeeMarketing Specification Paragraph */}
                  <p className="text-xs sm:text-sm text-[#2A2521]/80 leading-relaxed font-light mt-3">
                    {item.summary}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 pt-5 border-t border-[#2A2521]/10 space-y-2.5">
                    {item.deliverables.map((del, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2.5 text-xs text-[#2A2521]/85 font-body font-light"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card CTA Trigger */}
                <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#2A2521]/10">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-wider text-[#2A2521]/60 group-hover:text-[#C84B31] transition-colors">
                    Deploy Capability
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      onOpenKundli();
                    }}
                    className="w-8 h-8 rounded-full border border-[#2A2521]/20 flex items-center justify-center group-hover:bg-[#C84B31] group-hover:text-white group-hover:border-[#C84B31] transition-all"
                    aria-label={`Inquire about ${item.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Conversion Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:p-6 rounded-3xl bg-white/70 border border-[#2A2521]/15 backdrop-blur-md shadow-sm">
            <span className="font-display text-lg sm:text-xl text-[#2A2521] italic font-light">
              Need a tailored omnichannel strategy across these capabilities?
            </span>
            <button
              onClick={() => {
                sound.playChime();
                onOpenKundli();
              }}
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#C84B31] hover:bg-[#E11D48] text-white font-body text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:scale-105"
            >
              Get Custom Proposal
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Traditional Border Divider at bottom */}
      <div className="mt-20 opacity-30">
        <SectionDivider label="OUR CAPABILITIES" sublabel="PROVEN E-COMMERCE GROWTH" />
      </div>
    </section>
  );
}
