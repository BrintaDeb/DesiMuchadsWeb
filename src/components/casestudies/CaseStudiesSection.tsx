"use client";

import React, { useState, useEffect } from "react";
import { X, TrendingUp, Sparkles, CheckCircle2, ExternalLink, Globe } from "lucide-react";
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
      client: "LionelP Restaurant",
      tagline: "Artisanal French Patisserie & Fine Dining Storefront",
      category: "E-Commerce & Hospitality Web App",
      heroStat: "+340% RESERVATION LIFT",
      liveUrl: "https://restaurant-web.vercel.app",
      vercelUrl: "https://vercel.com/brinta-debs-projects/restaurant_web/CMmXJSKAqMWtrQQeaVvMQTJpRHPh",
      desc: "High-end culinary and bakery e-commerce experience designed for LionelP. Built with bespoke visual aesthetics, interactive gourmet product menus, and seamless table reservation flows.",
      mushkil:
        "Traditional boutique restaurant needing modern online ordering, menu showcase, and high-ticket private dining reservations without losing artisanal prestige.",
      jugaad:
        "Crafted a rich luxury visual storefront with smooth French gastronomy catalog, real-time table booking integration, and mobile-optimized ordering.",
      nateeja:
        "Scaled online reservations by +340%, doubled average catering order value, and established a signature digital brand presence.",
      stats: [
        { label: "Reservation Lift", val: "+340%" },
        { label: "Average Order Value", val: "2.1x" },
        { label: "Store Speed", val: "<650ms" },
      ],
      bgGradient: "from-[#0e164c] via-[#142161] to-[#090e33]",
      accentColor: "#F36700",
    },
    {
      id: 2,
      client: "YOU & ME Photography",
      tagline: "Luxury Documentary Wedding & Destination Visual Stories",
      category: "High-Ticket Creative & Brand Portfolio",
      heroStat: "6.4x INBOUND ROAS",
      liveUrl: "https://you-me-less-features.vercel.app",
      vercelUrl: "https://vercel.com/brinta-debs-projects/you-me-less-features/9qY2XmMTKYTWcaFB6qBY4ERNXCwk",
      desc: "Cinematic visual storytelling portfolio for world-class destination wedding photographers. Designed with emotion-first typography, fluid media galleries, and high-converting client inquiry funnels.",
      mushkil:
        "Low inquiry conversion on generic social feeds and inability to command premium pricing for luxury global destination shoots.",
      jugaad:
        "Developed a cinematic editorial portfolio platform with high-contrast imagery, immersive documentary love story showcases, and seamless WhatsApp inquiry flow.",
      nateeja:
        "Achieved a +410% surge in qualified luxury wedding inquiries across Europe and India, booking out seasonal dates 8 months in advance.",
      stats: [
        { label: "Inbound Lead ROAS", val: "6.4x" },
        { label: "Inquiry Growth", val: "+410%" },
        { label: "Advance Sellout", val: "8 Months" },
      ],
      bgGradient: "from-[#142161] via-[#1b2b78] to-[#0e164c]",
      accentColor: "#FFC400",
    },
    {
      id: 3,
      client: "Pet-First Multi-Species",
      tagline: "Pet Wellness, Veterinary Pharmacy & Calorie Planner",
      category: "D2C Healthcare & Subscription E-Commerce",
      heroStat: "5.8x BLENDED ROAS",
      liveUrl: "https://pet-first-web.vercel.app",
      vercelUrl: "https://vercel.com/brinta-debs-projects/pet-first-web/3K3nPxYnWxHjhHdmA9DnjvJ2MVbf",
      desc: "Comprehensive pet-first health ecosystem for dogs, cats, birds, and small animals. Features an interactive pet nutrition calculator, digital health passport ID, and subscription essentials store.",
      mushkil:
        "Fragmented pet care market where pet parents struggled with customized nutrition calculations and recurring essentials replenishment.",
      jugaad:
        "Built a full-stack digital pet healthcare platform with interactive calorie & nutrition calculators, digital pet health ID cards, and subscription checkout.",
      nateeja:
        "Achieved 5.8x blended ROAS on paid acquisition funnels, 44% recurring repeat subscription rate, and over 45,000 active pet IDs created.",
      stats: [
        { label: "Blended ROAS", val: "5.8x" },
        { label: "Subscription Repeat", val: "44%" },
        { label: "Pet IDs Created", val: "45K+" },
      ],
      bgGradient: "from-[#090e33] via-[#0e164c] to-[#142161]",
      accentColor: "#F36700",
    },
    {
      id: 4,
      client: "FreshEats Organic Food",
      tagline: "Fresh Organic Bowls & Direct-to-Consumer Food Delivery",
      category: "QSR & Direct Food Delivery Web App",
      heroStat: "+480% DIRECT ORDERS",
      liveUrl: "https://food-website.vercel.app",
      vercelUrl: "https://vercel.com/brinta-debs-projects/food-website/3MRZU3LuAVkxqMZAMyr4H2NJDAaU",
      desc: "High-speed digital ordering storefront engineered for healthy organic meal bowls, fresh salads, and rapid doorstep delivery.",
      mushkil:
        "High commission bleed from 3rd-party delivery aggregators and lack of direct customer brand loyalty.",
      jugaad:
        "Launched a lightning-fast direct-to-consumer food ordering web app with one-click dish customization and zero checkout friction.",
      nateeja:
        "Slashed aggregator commission loss by 65%, scaled direct customer orders by +480%, and achieved a 3.4x re-order frequency.",
      stats: [
        { label: "Direct Orders", val: "+480%" },
        { label: "Aggregator Bleed", val: "-65%" },
        { label: "Monthly Re-order", val: "3.4x" },
      ],
      bgGradient: "from-[#0e164c] via-[#1b2b78] to-[#090e33]",
      accentColor: "#FFC400",
    },
    {
      id: 5,
      client: "NestServices Concierge",
      tagline: "Premium Residential Concierge, Maintenance & Property Hub",
      category: "Enterprise Real Estate & Property Services",
      heroStat: "₹3.2Cr+ PIPELINE VALUE",
      liveUrl: "https://nestservices-brinta-debs-projects.vercel.app",
      vercelUrl: "https://vercel.com/brinta-debs-projects/nestservices/4Y8GS7NKxbCNVKpxWB5LX7E1ryo2",
      desc: "Enterprise home living and residential services hub providing on-demand maintenance, home concierge, and luxury property lifecycle management.",
      mushkil:
        "Unorganized local service vendors and lack of reliable digital booking for premium residential communities.",
      jugaad:
        "Engineered an enterprise-grade service portal with transparent tier pricing, instant slot scheduling, and real-time technician dispatch telemetry.",
      nateeja:
        "Captured ₹3.2Cr+ in closed property service contracts, with 98.4% verified customer satisfaction and multi-facility retainers.",
      stats: [
        { label: "Contract Pipeline", val: "₹3.2Cr+" },
        { label: "Customer Satisfaction", val: "98.4%" },
        { label: "Dispatch Response", val: "<15 Min" },
      ],
      bgGradient: "from-[#142161] via-[#090e33] to-[#0e164c]",
      accentColor: "#F36700",
    },
  ];

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-white text-[#0e164c] overflow-hidden select-none font-display scroll-mt-24"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header (BeeMarketing Exact) */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F36700]/10 border border-[#F36700]/30 text-[#F36700] font-mono text-xs font-bold tracking-wider uppercase mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>VERIFIED CLIENT WORK • 5 LIVE DEPLOYMENTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0e164c] uppercase leading-none">
            Our Latest Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#676767] font-normal leading-relaxed">
            Live web platforms, direct-to-consumer storefronts, and performance architectures engineered for growth. Click on any project to explore the strategy or launch the live deployment.
          </p>
        </div>

        {/* 5-Tile Responsive Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cases.map((cs) => (
            <div
              key={cs.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 border border-gray-200 bg-white"
            >
              {/* CSS Gradient Banner Card */}
              <div
                className={`w-full h-44 rounded-xl mb-6 relative overflow-hidden bg-gradient-to-tr ${cs.bgGradient} p-5 flex flex-col justify-between`}
              >
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-[#F36700] text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow">
                    {cs.heroStat}
                  </span>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#0e164c] transition-all shadow"
                    title="Open Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="relative z-10 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase font-bold block mb-1">
                    {cs.category}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight">
                    {cs.client}
                  </h3>
                </div>
              </div>

              {/* Tagline & Info */}
              <div className="text-left mb-6 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-[#676767] font-normal leading-relaxed">
                  {cs.tagline}
                </p>

                {/* Metric pill row */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-gray-500">{cs.stats[0].label}</span>
                  <span className="text-[#0e164c] font-black">{cs.stats[0].val}</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    setSelectedCaseModal(cs);
                  }}
                  className="flex-1 py-3 rounded bg-[#0e164c] hover:bg-[#142161] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[44px]"
                >
                  VIEW STRATEGY &gt;
                </button>
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPluck(190)}
                  className="px-4 py-3 rounded bg-[#F36700] hover:bg-[#e2560b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[44px]"
                  title="Open Live Website"
                >
                  <span>LIVE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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
            className="px-8 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105 active:scale-95 min-h-[48px]"
          >
            EXPLORE STRATEGY DOSSIER &gt;
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
              <h3 className="font-display font-black text-3xl sm:text-5xl text-white uppercase leading-none">
                {selectedCaseModal.client}
              </h3>
              <p className="mt-2 text-sm text-white/80 font-normal">
                {selectedCaseModal.tagline}
              </p>
            </div>

            {/* Verified Metric Banner */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-[#142161] border border-white/10 mb-8 text-center">
              {selectedCaseModal.stats.map((s: any, idx: number) => (
                <div key={idx}>
                  <div className="font-display font-black text-xl sm:text-3xl text-[#FFC400]">
                    {s.val}
                  </div>
                  <div className="text-[9px] sm:text-xs font-mono text-white/60 uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Narrative Sections */}
            <div className="space-y-6 text-sm text-white/85 font-normal leading-relaxed">
              <div>
                <h4 className="font-display font-bold text-base text-[#FFC400] uppercase mb-2">
                  About the Project
                </h4>
                <p className="bg-[#142161]/50 p-4 rounded-lg border border-white/10">
                  {selectedCaseModal.desc}
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-base text-[#FFC400] uppercase mb-2">
                  Strategy &amp; Architecture
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

            {/* Modal Bottom CTA Row with Direct Live Links */}
            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={selectedCaseModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded bg-[#F36700] hover:bg-[#e2560b] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>LAUNCH LIVE WEBSITE</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={selectedCaseModal.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded border border-white/20 hover:border-white/50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px] hover:bg-white/5"
                >
                  <span>VERCEL BUILD</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FFC400]" />
                </a>
              </div>

              <a
                href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20want%20to%20build%20a%20similar%20high-ROAS%20storefront."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider text-center min-h-[44px] flex items-center justify-center"
              >
                DISCUSS THIS ARCHITECTURE &gt;
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
