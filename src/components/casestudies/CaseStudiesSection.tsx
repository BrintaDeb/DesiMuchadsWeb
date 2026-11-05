"use client";

import React, { useState, useRef, useEffect } from "react";
import { JharokhaArchSVG, MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { ArrowUpRight, TrendingUp, CheckCircle, Award, X, Sparkles, ChevronRight } from "lucide-react";
import { sound } from "@/lib/sound";
import gsap from "gsap";

export function CaseStudiesSection() {
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  const [selectedCaseModal, setSelectedCaseModal] = useState<any | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCaseModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerRippleEffect = () => {
    sound.playPluck(130);
    if (displacementMapRef.current) {
      gsap.fromTo(
        displacementMapRef.current,
        { attr: { scale: 0 } },
        {
          attr: { scale: 22 },
          duration: 0.25,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      );
    }
  };

  const cases = [
    {
      id: 1,
      client: "DADU",
      tagline: "Natural Dairy & Premium Ice Cream",
      category: "Social Media Marketing & Creative Production",
      location: "FMCG Retail & Direct-to-Consumer",
      period: "Multi-Season Scale",
      heroStat: "+477% Engagement Growth",
      heroBadge: "+477% ENGAGEMENT",
      desc: "Dadu ice cream is made from natural milk with the purpose to make consumers feel happy and relaxed from everyday routine. Founded in 1997, they are one of the most innovative manufacturers in the market.",
      mushkil:
        "High ad fatigue on legacy social channels, low emotional connection with younger Gen-Z consumers, and intense seasonal supermarket shelf competition.",
      jugaad:
        "Engineered vibrant, sensory-driven short-form reels, high-energy UGC tasting reactions, and relatable everyday micro-moments paired with localized influencer seeding.",
      nateeja:
        "Achieved a record +477% engagement surge across digital touchpoints, 2.8x increase in brand recall, and massive retail stock-outs across primary distribution chains.",
      stats: [
        { label: "Engagement Lift", val: "+477%" },
        { label: "Viral Impressions", val: "18.5M" },
        { label: "Brand Recall", val: "+140%" },
      ],
      bgGradient: "from-[#10223D] via-[#1B355B] to-[#0B172B]",
    },
    {
      id: 2,
      client: "GARMIN",
      tagline: "Wearable GPS & Endurance Tech",
      category: "Performance Marketing & Paid Search",
      location: "Global Lifestyle & Sports Markets",
      period: "Quarterly Blitz Retainer",
      heroStat: "5.2x Blended ROAS",
      heroBadge: "5.2x ROAS",
      desc: "GARMIN creates superior products that are an essential part of their customers' lives across automotive, aviation, marine, outdoor, and fitness markets with over 13,000 associates globally.",
      mushkil:
        "High customer acquisition costs on generic fitness keywords and saturated competition from commoditized smartwatches and fitness trackers.",
      jugaad:
        "Segmented media buying into high-intent precision search funnels, dynamic athletic lifestyle video ads on Meta, and targeted cross-sell workflows for existing users.",
      nateeja:
        "Lowered blended CAC by 38%, scaled seasonal Black Friday / Diwali campaigns to 5.2x ROAS, and captured category-leading market share among marathoners and athletes.",
      stats: [
        { label: "Blended ROAS", val: "5.2x" },
        { label: "CAC Reduction", val: "-38%" },
        { label: "High-Ticket AOV", val: "₹42,000" },
      ],
      bgGradient: "from-[#0F5132] via-[#13653F] to-[#0A2616]",
    },
    {
      id: 3,
      client: "NEMATEKAS",
      tagline: "Leading Fresh Food & Poultry Processing",
      category: "Social Branding & Retail Distribution",
      location: "80+ Tons Daily Output",
      period: "Brand Elevation Campaign",
      heroStat: "Over 80 Tons Scaled Daily",
      heroBadge: "80 TONS/DAY",
      desc: "Started in 1994, Nematekas grew into a powerhouse meat and poultry processing company producing over 80 tons daily with the highest quality smoked, cooked, and fresh products.",
      mushkil:
        "Consumer skepticism regarding industrial poultry processing, lack of digital footprint, and commoditized supermarket shelf price wars.",
      jugaad:
        "Humanized the brand with transparent 'Farm-to-Kitchen' culinary storytelling, celebrity chef pairing reels, and geo-targeted discount coupon triggers near supermarket chains.",
      nateeja:
        "Accelerated supermarket inventory turn rates by 44%, established the brand as the #1 household trust mark for family meals, and expanded into 400+ new retail outlets.",
      stats: [
        { label: "Daily Output", val: "80+ Tons" },
        { label: "Turnover Lift", val: "+44%" },
        { label: "Retail Outlets", val: "400+" },
      ],
      bgGradient: "from-[#8B0000] via-[#A81515] to-[#3B0000]",
    },
    {
      id: 4,
      client: "FROSCH",
      tagline: "Eco-Friendly Sustainable Living",
      category: "E-Commerce CRO & Performance PPC",
      location: "Clean Living & Home Care",
      period: "Full-Funnel Scaling",
      heroStat: "-68% Blended CAC",
      heroBadge: "-68% CAC",
      desc: "Pioneer in natural, ecological cleaning and homecare solutions designed for health-conscious families striving to reduce plastic waste and harsh chemical exposure.",
      mushkil:
        "Eco-friendly products were perceived as expensive and low-efficacy, with high checkout drop-offs on their initial direct-to-consumer store.",
      jugaad:
        "Redesigned the headless e-commerce funnel with instant proof demo videos, comparison charts, and an automated eco-refill subscription model with WhatsApp notifications.",
      nateeja:
        "Slashed customer acquisition cost by 68%, grew recurring subscription revenue to 42% of total store GMV, and drove 3.8x net profit expansion.",
      stats: [
        { label: "CAC Reduction", val: "-68%" },
        { label: "Subscription %", val: "42%" },
        { label: "Conversion Rate", val: "4.6%" },
      ],
      bgGradient: "from-[#144272] via-[#205295] to-[#0A2647]",
    },
    {
      id: 5,
      client: "MAHARAJA SILKS",
      tagline: "Luxury Heritage Handlooms & Sarees",
      category: "High-Ticket D2C & Omnichannel",
      location: "Varanasi & Bengaluru",
      period: "Heritage Growth Retainer",
      heroStat: "₹1.12Cr Monthly Revenue",
      heroBadge: "5.8x ROAS",
      desc: "Centuries of royal handloom weaving traditions distilled into luxury bridal silks, catering to modern Indian brides seeking heirloom craftsmanship.",
      mushkil:
        "Struggling with high ₹1,400+ CPAs on Meta and low buyer trust for high-ticket silk sarees (avg order value ₹18,000+).",
      jugaad:
        "Produced authentic loom documentary reels highlighting 4th-generation master weavers, paired with an interactive 1-click WhatsApp VIP concierge checkout.",
      nateeja:
        "Scaled monthly revenue from ₹18 Lakhs to ₹1.12 Crores with an ironclad 5.8x blended ROAS and 94% customer retention.",
      stats: [
        { label: "Blended ROAS", val: "5.8x" },
        { label: "CPA Reduction", val: "-48%" },
        { label: "Monthly GMV", val: "₹1.12 Cr" },
      ],
      bgGradient: "from-[#78350F] via-[#92400E] to-[#451A03]",
    },
  ];

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-[#DCD3C5] text-[#2A2521] overflow-hidden font-body select-none"
    >
      {/* SVG Liquid Displacement Filter */}
      <svg className="hidden pointer-events-none" aria-hidden="true">
        <filter id="desi-ripple" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.08"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Subtle Parchment Texture Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C84B31_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial Section Header (BeeMarketing & Desi Vibes Fusion) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 pb-8 border-b-2 border-[#2A2521]/15 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2521]/20 bg-white/40 text-xs font-mono font-bold uppercase tracking-widest text-[#C84B31] mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>OUR LATEST WORK • VERIFIED HISAB-KITAB</span>
            </div>
            <h2 className="font-display font-light text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#2A2521] uppercase leading-none">
              REAL NUMBERS.{" "}
              <span className="block italic font-normal text-[#C84B31] mt-1 font-display">
                PROVEN RESULTS.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-body text-sm sm:text-base text-[#2A2521]/75 leading-relaxed font-light">
            We judge ourselves by one unforgiving metric: <strong>money added to your bank account</strong>. Explore our latest work and proven client transformations.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-12 sm:space-y-16">
          {cases.map((cs) => {
            const isHovered = hoveredCase === cs.id;

            return (
              <div
                key={cs.id}
                onMouseEnter={() => {
                  setHoveredCase(cs.id);
                  triggerRippleEffect();
                }}
                onMouseLeave={() => setHoveredCase(null)}
                className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-white/80 border border-[#2A2521]/15 shadow-sm hover:shadow-[0_20px_50px_rgba(42,37,33,0.12)] transition-all duration-300"
              >
                {/* Filigree corner brackets */}
                <div className="absolute top-4 left-4 opacity-30">
                  <FiligreeCorner className="w-5 h-5 text-[#C84B31]" position="top-left" />
                </div>
                <div className="absolute top-4 right-4 opacity-30">
                  <FiligreeCorner className="w-5 h-5 text-[#C84B31]" position="top-right" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Visual Jharokha Badge with Liquid Ripple */}
                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div
                      style={{
                        filter: isHovered ? "url(#desi-ripple)" : "none",
                      }}
                      className={`relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden transition-all duration-700 shadow-xl flex flex-col justify-between p-6 sm:p-8 text-white bg-gradient-to-br ${cs.bgGradient} rounded-3xl`}
                    >
                      {/* Jharokha SVG Arch Mask */}
                      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                        <JharokhaArchSVG className="w-full h-full text-white" />
                      </div>

                      {/* Top Metric Pill */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-mono font-bold tracking-wider text-[#F5DE88]">
                          {cs.heroBadge}
                        </span>
                        <MoustacheSVG className="w-6 h-3 text-[#D4AF37]" />
                      </div>

                      {/* Center Brand Identity Display */}
                      <div className="relative z-10 my-auto text-center">
                        <div className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F5EFEB] uppercase leading-none">
                          {cs.client}
                        </div>
                        <p className="mt-2 text-xs sm:text-sm font-body text-[#F5DE88] font-light tracking-widest uppercase">
                          {cs.tagline}
                        </p>
                      </div>

                      {/* Bottom Key Metric Ribbon */}
                      <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                        <span className="text-white/80">{cs.period}</span>
                        <span className="text-[#F5DE88] font-bold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {cs.heroStat}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Case Details & Metrics Breakdown */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#C84B31] font-bold tracking-wider uppercase mb-2">
                        <span>{cs.category}</span>
                        <span>•</span>
                        <span>{cs.location}</span>
                      </div>

                      <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#2A2521] uppercase leading-tight">
                        {cs.client}: {cs.heroStat}
                      </h3>

                      <p className="mt-4 text-xs sm:text-sm text-[#2A2521]/75 font-body font-light leading-relaxed">
                        {cs.desc}
                      </p>
                    </div>

                    {/* Problem -> Execution -> Result Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2A2521]/15 text-xs">
                      <div className="p-4 rounded-2xl bg-[#2A2521]/5 border border-[#2A2521]/10">
                        <span className="font-bold text-[#C84B31] uppercase tracking-wider block mb-1">
                          The Challenge:
                        </span>
                        <p className="text-[#2A2521]/75 font-light leading-relaxed line-clamp-3">
                          {cs.mushkil}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#2A2521]/5 border border-[#2A2521]/10">
                        <span className="font-bold text-[#9A7B1C] uppercase tracking-wider block mb-1">
                          The Strategy:
                        </span>
                        <p className="text-[#2A2521]/75 font-light leading-relaxed line-clamp-3">
                          {cs.jugaad}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#2A2521]/5 border border-[#2A2521]/10">
                        <span className="font-bold text-[#0D9488] uppercase tracking-wider block mb-1">
                          The Result:
                        </span>
                        <p className="text-[#2A2521]/75 font-light leading-relaxed line-clamp-3">
                          {cs.nateeja}
                        </p>
                      </div>
                    </div>

                    {/* Stats Ribbon & Modal Opener Trigger */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#2A2521]/15">
                      <div className="flex items-center gap-6 text-xs font-mono">
                        {cs.stats.map((s, sIdx) => (
                          <div key={sIdx}>
                            <span className="text-[#2A2521]/50 block text-[10px] uppercase font-bold">
                              {s.label}
                            </span>
                            <span className="text-base font-bold text-[#2A2521]">
                              {s.val}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          setSelectedCaseModal(cs);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2A2521] hover:bg-[#C84B31] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md self-start sm:self-auto hover:scale-105 active:scale-95"
                      >
                        <span>View Deep-Dive Modal</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BeeMarketing Slide-Out / Pop-Up Case Study Modal */}
      {selectedCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1C1815] text-[#EFE7DA] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-10 select-none">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCaseModal(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-[#C84B31] text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header Banner */}
            <div className={`p-8 rounded-2xl bg-gradient-to-r ${selectedCaseModal.bgGradient} mb-8 border border-white/15 relative overflow-hidden`}>
              <div className="relative z-10">
                <span className="text-xs font-mono font-bold tracking-widest text-[#F5DE88] uppercase block mb-1">
                  {selectedCaseModal.category}
                </span>
                <h3 className="font-display font-bold text-4xl sm:text-5xl text-white uppercase leading-none">
                  {selectedCaseModal.client}
                </h3>
                <p className="mt-2 text-sm text-white/80 font-light">
                  {selectedCaseModal.tagline} • {selectedCaseModal.period}
                </p>
              </div>
              <div className="absolute right-4 bottom-4 opacity-15">
                <MoustacheSVG className="w-32 h-16 text-white" />
              </div>
            </div>

            {/* Verified Growth Metrics Row */}
            <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 text-center">
              {selectedCaseModal.stats.map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="font-display font-bold text-2xl sm:text-4xl text-[#F5DE88]">
                    {s.val}
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-white/60 uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep-Dive Narrative */}
            <div className="space-y-6 text-xs sm:text-sm text-[#EFE7DA]/85 font-light leading-relaxed">
              <div>
                <h4 className="font-display font-bold text-lg text-[#F5DE88] uppercase mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C84B31]" />
                  <span>The Challenge & Market Bottleneck</span>
                </h4>
                <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedCaseModal.mushkil}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-lg text-[#F5DE88] uppercase mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0D9488]" />
                  <span>Execution & Media Strategy</span>
                </h4>
                <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedCaseModal.jugaad}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-lg text-[#F5DE88] uppercase mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>Attributed Revenue & Bottom-Line Growth</span>
                </h4>
                <p className="bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedCaseModal.nateeja}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/60 font-light">
                Ready to replicate these numbers for your e-commerce brand?
              </span>
              <a
                href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20I%20reviewed%20your%20case%20study%20and%20want%20to%20scale%20our%20e-commerce%20ROAS."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
              >
                Buzz Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
