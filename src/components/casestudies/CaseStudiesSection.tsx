"use client";

import React, { useState } from "react";
import { JharokhaArchSVG, MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { ArrowUpRight, TrendingUp, CheckCircle, Award } from "lucide-react";

export function CaseStudiesSection() {
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  const cases = [
    {
      id: 1,
      client: "Maharaja Silks & Handlooms",
      niche: "Luxury Heritage Bridal & D2C Silk Sarees",
      location: "Varanasi & Bengaluru",
      period: "90-Day Scaling Sprint",
      heroStat: "+380% Revenue Surge",
      heroBadge: "5.8x ROAS",
      mushkil:
        "Struggling with sky-high ₹1,400+ CPAs on Meta and low buyer trust for high-ticket silk sarees (avg order value ₹18,000+).",
      jugaad:
        "Produced authentic Varanasi loom documentary reels highlighting 4th-generation weavers, paired with an interactive WhatsApp VIP concierge checkout.",
      nateeja:
        "Scaled monthly revenue from ₹18 Lakhs to ₹1.12 Crores with an ironclad 5.8x blended ROAS and 94% customer retention.",
      stats: [
        { label: "Blended ROAS", val: "5.8x" },
        { label: "CPA Reduction", val: "-48%" },
        { label: "Monthly Revenue", val: "₹1.12 Cr" },
      ],
      bgGradient: "from-[#8B0000] to-[#3B0000]",
    },
    {
      id: 2,
      client: "Vedic Skin Science",
      niche: "Ayurvedic Clinical D2C Skincare",
      location: "Mumbai",
      period: "6-Month Growth Retainer",
      heroStat: "-42% Blended CPA",
      heroBadge: "4.4x ROAS",
      mushkil:
        "Drowning in a sea of generic organic skincare brands with high return rates (RTO 38%) and low subscription adoption.",
      jugaad:
        "Engineered an interactive 'Dosha Skin Diagnostic Kundli' quiz that prescribed customized 3-step regimens, backed by verified dermatologists on YouTube shorts.",
      nateeja:
        "Dropped blended CPA by 42%, reduced COD RTO to an industry-record 14%, and drove ₹3.4Cr in tracked revenue over 6 months.",
      stats: [
        { label: "Ad Spend Managed", val: "₹75L+" },
        { label: "Quiz Completions", val: "180K+" },
        { label: "Repeat Purchase", val: "41%" },
      ],
      bgGradient: "from-[#0F5132] to-[#0A2616]",
    },
    {
      id: 3,
      client: "Urban Chaiwala",
      niche: "Packaged Artisanal Tea & FMCG",
      location: "Delhi NCR",
      period: "Viral Launch Campaign",
      heroStat: "12M+ Organic Views",
      heroBadge: "100% Stockout",
      mushkil:
        "Launching against entrenched legacy FMCG tea giants with zero retail shelf presence and a small initial ad budget.",
      jugaad:
        "Deployed a viral street-corner Hinglish video series ('Dilli Ki Cutting Chai Ka Sach') using clever street theatre, coupled with hyper-local geo-targeted Meta ads.",
      nateeja:
        "Generated 12M+ organic views, sold out entire 40,000-unit initial inventory within 18 days, and secured 340+ retail distribution inquiries across North India.",
      stats: [
        { label: "Organic Reach", val: "12.4M" },
        { label: "Sell-Out Time", val: "18 Days" },
        { label: "B2B Distributors", val: "340+" },
      ],
      bgGradient: "from-[#B85D19] to-[#5C2E0C]",
    },
  ];

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-[#F7F1E5] text-[#0D0C12] overflow-hidden"
    >
      {/* Subtle Khadi Parchment Texture Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#E2D7C0_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 pb-8 border-b-2 border-[#0D0C12]/15 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#0D0C12]/20 bg-[#0D0C12]/5 text-xs font-mono font-bold uppercase tracking-widest text-[#C84B31] mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>HAMARE KARNAME • PROVEN CASE STUDIES</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0D0C12]">
              Real Numbers.{" "}
              <span className="italic font-serif text-[#C84B31]">Real Swagger.</span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-[#0D0C12]/75 leading-relaxed">
            We judge ourselves by one unforgiving metric: <strong>money added to your bank account</strong>. Here is how we turned ambitious brands into category kings.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-16 sm:space-y-24">
          {cases.map((cs, idx) => {
            const isHovered = hoveredCase === cs.id;

            return (
              <div
                key={cs.id}
                onMouseEnter={() => setHoveredCase(cs.id)}
                onMouseLeave={() => setHoveredCase(null)}
                data-cursor="explore"
                className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/80 border border-[#0D0C12]/10 shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                {/* Filigree corner brackets */}
                <div className="absolute top-4 left-4 opacity-30">
                  <FiligreeCorner className="w-5 h-5 text-[#C84B31]" position="top-left" />
                </div>
                <div className="absolute top-4 right-4 opacity-30">
                  <FiligreeCorner className="w-5 h-5 text-[#C84B31]" position="top-right" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Ornate Jharokha Scalloped Visual Frame (5 cols) */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div
                      className={`relative w-full aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 text-white bg-gradient-to-br ${cs.bgGradient}`}
                    >
                      {/* Jharokha SVG Arch Mask Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center p-2">
                        <JharokhaArchSVG className="w-full h-full text-white/40" />
                      </div>

                      {/* Top Frame Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest uppercase font-bold text-white/90">
                          {cs.niche}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md font-mono text-xs font-bold text-white">
                          0{idx + 1} // CASE
                        </span>
                      </div>

                      {/* Centerpiece Stat */}
                      <div className="relative z-10 text-center my-auto">
                        <MoustacheSVG className="w-16 h-8 text-[#D4AF37] mx-auto mb-3" />
                        <span className="font-display font-extrabold text-3xl sm:text-4xl text-white block">
                          {cs.heroStat}
                        </span>
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#D4AF37] text-[#0D0C12] font-mono text-xs font-bold uppercase tracking-wider">
                          {cs.heroBadge}
                        </span>
                      </div>

                      {/* Bottom Frame Location */}
                      <div className="relative z-10 flex items-center justify-between font-mono text-xs text-white/70">
                        <span>{cs.location}</span>
                        <span>{cs.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: The 3-Part Proof Breakdown (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Client Name & Niche */}
                      <div className="mb-6">
                        <span className="font-mono text-xs text-[#C84B31] uppercase tracking-widest font-bold block mb-1">
                          {cs.niche} • {cs.location}
                        </span>
                        <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0D0C12]">
                          {cs.client}
                        </h3>
                      </div>

                      {/* The 3-Step Narrative: Mushkil -> Jugaad -> Nateeja */}
                      <div className="space-y-4 mb-8">
                        {/* 1. Mushkil */}
                        <div className="p-4 rounded-2xl bg-[#0D0C12]/[0.03] border border-[#0D0C12]/10">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#C84B31] block mb-1">
                            ✦ The Challenge (मुश्किल)
                          </span>
                          <p className="text-xs sm:text-sm text-[#0D0C12]/80 leading-relaxed font-sans">
                            {cs.mushkil}
                          </p>
                        </div>

                        {/* 2. Jugaad + Science */}
                        <div className="p-4 rounded-2xl bg-[#0D0C12]/[0.03] border border-[#0D0C12]/10">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                            ✦ The Desi Muchads Move (जुगाड़ + Science)
                          </span>
                          <p className="text-xs sm:text-sm text-[#0D0C12]/80 leading-relaxed font-sans">
                            {cs.jugaad}
                          </p>
                        </div>

                        {/* 3. Nateeja */}
                        <div className="p-4 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/30">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D9488] block mb-1">
                            ✦ The Verdict (नतीजा)
                          </span>
                          <p className="text-xs sm:text-sm text-[#0D0C12] font-medium leading-relaxed font-sans">
                            {cs.nateeja}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stat Pills Footer */}
                    <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#0D0C12]/10">
                      {cs.stats.map((st, i) => (
                        <div key={i} className="text-center sm:text-left">
                          <span className="text-[11px] font-mono text-[#0D0C12]/60 uppercase tracking-wider block">
                            {st.label}
                          </span>
                          <span className="font-display font-extrabold text-lg sm:text-2xl text-[#0D0C12]">
                            {st.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
