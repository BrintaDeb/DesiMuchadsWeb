"use client";

import React, { useState, useEffect } from "react";
import { X, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

export function CaseStudiesSection() {
  const [selectedCaseModal, setSelectedCaseModal] = useState<any | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCaseModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const cases = [
    {
      id: 1,
      client: "DADU",
      tagline: "Natural Dairy & Premium Ice Cream",
      category: "Social media marketing",
      heroStat: "+477% ENGAGEMENT GROWTH",
      desc: "Dadu ice cream are made from natural milk. Their purpose is to make you feel happy and give a moment to relax from your everyday routine. Founded in 1997, they're one of the most innovative ice cream manufacturers.",
      mushkil:
        "High ad fatigue on legacy social channels, low emotional connection with younger consumers, and intense seasonal supermarket shelf competition.",
      jugaad:
        "Engineered vibrant sensory-driven short-form reels, high-energy UGC tasting reactions, and relatable everyday micro-moments paired with localized influencer seeding.",
      nateeja:
        "Achieved a record +477% engagement surge across digital touchpoints, 2.8x increase in brand recall, and massive retail stock-outs across distribution chains.",
      stats: [
        { label: "Engagement Lift", val: "+477%" },
        { label: "Viral Impressions", val: "18.5M" },
        { label: "Brand Recall", val: "+140%" },
      ],
      bgGradient: "from-[#0e164c] via-[#142161] to-[#090e33]",
      accentColor: "#F36700",
    },
    {
      id: 2,
      client: "GARMIN",
      tagline: "Wearable GPS & Endurance Tech",
      category: "Social media marketing",
      heroStat: "5.2x BLENDED ROAS",
      desc: "GARMIN creates superior products that are an essential part of their customers' lives across automotive, aviation, marine, outdoor and fitness markets with more than 13,000 associates globally.",
      mushkil:
        "High customer acquisition costs on generic fitness keywords and saturated competition from commoditized smartwatches and fitness trackers.",
      jugaad:
        "Segmented media buying into high-intent precision search funnels, dynamic athletic lifestyle video ads on Meta, and targeted cross-sell workflows for existing users.",
      nateeja:
        "Lowered blended CAC by 38%, scaled seasonal Black Friday / holiday campaigns to 5.2x ROAS, and captured category-leading market share among marathoners and athletes.",
      stats: [
        { label: "Blended ROAS", val: "5.2x" },
        { label: "CAC Reduction", val: "-38%" },
        { label: "High-Ticket AOV", val: "₹42,000" },
      ],
      bgGradient: "from-[#142161] via-[#1b2b78] to-[#0e164c]",
      accentColor: "#FFC400",
    },
    {
      id: 3,
      client: "NEMATEKAS",
      tagline: "Leading Fresh Food & Meat Processing",
      category: "Social media marketing",
      heroStat: "OVER 80 TONS SCALED DAILY",
      desc: "Started in 1994, Nematekas grew into a powerhouse meat and poultry processing company producing over 80 tons daily with the highest quality smoked, cooked, and fresh products.",
      mushkil:
        "Consumer skepticism regarding industrial food processing, lack of digital footprint, and commoditized supermarket shelf price wars.",
      jugaad:
        "Humanized the brand with transparent culinary storytelling, chef pairing reels, and geo-targeted discount coupon triggers near supermarket chains.",
      nateeja:
        "Accelerated supermarket inventory turn rates by 44%, established the brand as the #1 household trust mark for family meals, and expanded into 400+ new retail outlets.",
      stats: [
        { label: "Daily Output", val: "80+ Tons" },
        { label: "Turnover Lift", val: "+44%" },
        { label: "Retail Outlets", val: "400+" },
      ],
      bgGradient: "from-[#1b2b78] via-[#243799] to-[#0e164c]",
      accentColor: "#F36700",
    },
    {
      id: 4,
      client: "Rumšiškių Paukštynas",
      tagline: "Recognizable Poultry Brand",
      category: "Social media marketing",
      heroStat: "MARKET-LEADING DIGITAL PRESENCE",
      desc: "Rumšiškių Paukštynas provides various types of poultry: fresh, frozen, marinated and cooked. Highly recognizable brand in the market striving for modern digital reach.",
      mushkil:
        "Traditional retail reliance with virtually no direct consumer community and low digital engagement amongst next-generation home cooks.",
      jugaad:
        "Crafted relatable quick-recipe video formats, wholesome family storytelling, and targeted awareness campaigns driving footfall to retail grocery shelves.",
      nateeja:
        "Built an active engaged community of over 120,000 food enthusiasts, generating massive double-digit sales growth across partner supermarkets.",
      stats: [
        { label: "Reach Lift", val: "+310%" },
        { label: "Community Growth", val: "120K+" },
        { label: "Shelf Velocity", val: "+36%" },
      ],
      bgGradient: "from-[#090e33] via-[#0e164c] to-[#142161]",
      accentColor: "#FFC400",
    },
  ];

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-white text-[#0e164c] overflow-hidden select-none font-display"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (BeeMarketing Exact) */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0e164c] uppercase leading-none">
            Our Latest Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#676767] font-normal leading-relaxed">
            Proven results for innovative e-commerce brands. Click on any project to explore the strategy.
          </p>
        </div>

        {/* 4-Tile Work Grid (BeeMarketing Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {cases.map((cs) => (
            <div
              key={cs.id}
              onClick={() => {
                sound.playChime();
                setSelectedCaseModal(cs);
              }}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[16/10] sm:aspect-[16/9] flex flex-col justify-end p-8 sm:p-10 border border-gray-100"
            >
              {/* CSS Gradient Canvas (NO copied media files) */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${cs.bgGradient} transition-transform duration-500 group-hover:scale-105`}
              />

              {/* Decorative Subtle Geometry Lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Top Metric Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1.5 rounded bg-[#F36700] text-white font-mono text-xs font-bold tracking-wider uppercase shadow">
                  {cs.heroStat}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-left">
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-[#FFC400] transition-colors leading-none">
                  {cs.client}
                </h3>
                <div className="mt-2 text-sm sm:text-base font-normal text-white/80 tracking-wide">
                  {cs.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Center Bottom Action Button (BeeMarketing Exact) */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              sound.playPluck(150);
              setSelectedCaseModal(cases[0]);
            }}
            type="button"
            className="px-8 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105 active:scale-95"
          >
            MORE PROJECTS &gt;
          </button>
        </div>
      </div>

      {/* Pop-Up Modal View (BeeMarketing Architecture, iOS & Android Touch Tuned) */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto overscroll-contain rounded-2xl bg-[#0e164c] text-white shadow-2xl p-5 sm:p-10 select-none border border-white/10">
            {/* Close Button (44px min touch target) */}
            <button
              onClick={() => setSelectedCaseModal(null)}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F36700] active:scale-95 text-white flex items-center justify-center transition-all z-20 min-w-[44px] min-h-[44px]"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className={`p-8 rounded-xl bg-gradient-to-r ${selectedCaseModal.bgGradient} mb-8 border border-white/15`}>
              <span className="text-xs font-mono font-bold tracking-widest text-[#FFC400] uppercase block mb-1">
                {selectedCaseModal.category}
              </span>
              <h3 className="font-display font-black text-4xl sm:text-5xl text-white uppercase leading-none">
                {selectedCaseModal.client}
              </h3>
              <p className="mt-2 text-sm text-white/80 font-normal">
                {selectedCaseModal.tagline}
              </p>
            </div>

            {/* Verified Metric Banner */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-[#142161] border border-white/10 mb-8 text-center">
              {selectedCaseModal.stats.map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="font-display font-black text-2xl sm:text-4xl text-[#FFC400]">
                    {s.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-white/60 uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Narrative Sections */}
            <div className="space-y-6 text-sm text-white/85 font-normal leading-relaxed">
              <div>
                <h4 className="font-display font-bold text-base text-[#FFC400] uppercase mb-2">
                  About the Client
                </h4>
                <p className="bg-[#142161]/50 p-4 rounded-lg border border-white/10">
                  {selectedCaseModal.desc}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-[#FFC400] uppercase mb-2">
                  Strategy &amp; Execution
                </h4>
                <p className="bg-[#142161]/50 p-4 rounded-lg border border-white/10">
                  {selectedCaseModal.jugaad}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-[#FFC400] uppercase mb-2">
                  Verified Outcome
                </h4>
                <p className="bg-[#142161]/50 p-4 rounded-lg border border-white/10">
                  {selectedCaseModal.nateeja}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/60">
                Ready to replicate these results for your business?
              </span>
              <a
                href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20want%20to%20discuss%20our%20e-commerce%20growth."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded bg-[#F36700] hover:bg-[#e2560b] text-white text-xs font-bold uppercase tracking-wider shadow hover:scale-105 transition-transform"
              >
                LET&apos;S TALK ON WHATSAPP &gt;
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
