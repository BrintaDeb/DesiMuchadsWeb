"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Globe,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Lock,
  Maximize2,
  RefreshCw,
  Layers,
  ShieldCheck,
  ArrowRight,
  Code2,
} from "lucide-react";
import { sound } from "@/lib/sound";

export function CaseStudiesSection() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "strategy">("preview");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

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
      techStack: ["Next.js 14", "Tailwind CSS", "Vercel Edge", "Framer Motion", "TypeScript"],
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
      techStack: ["React", "Editorial UI", "Dynamic Galleries", "Vercel CDN", "TypeScript"],
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
      techStack: ["Next.js", "Nutrition Calculator Engine", "Tailwind CSS", "Vercel"],
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
      techStack: ["Next.js 14", "Real-Time Cart", "Tailwind CSS", "Vercel Edge"],
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
      techStack: ["Next.js", "Slot Scheduler", "Tailwind CSS", "Enterprise API", "Vercel"],
      bgGradient: "from-[#142161] via-[#090e33] to-[#0e164c]",
      accentColor: "#F36700",
    },
  ];

  const currentCase = selectedCaseIndex !== null ? cases[selectedCaseIndex] : null;

  const handleNext = () => {
    sound.playPluck(180);
    setIframeLoading(true);
    setSelectedCaseIndex((prev) => (prev !== null ? (prev + 1) % cases.length : 0));
  };

  const handlePrev = () => {
    sound.playPluck(150);
    setIframeLoading(true);
    setSelectedCaseIndex((prev) => (prev !== null ? (prev - 1 + cases.length) % cases.length : 0));
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCaseIndex === null) return;
      if (e.key === "Escape") {
        setSelectedCaseIndex(null);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCaseIndex]);

  useEffect(() => {
    if (selectedCaseIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCaseIndex]);

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-white text-[#0e164c] overflow-hidden select-none font-display scroll-mt-24"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F36700]/10 border border-[#F36700]/30 text-[#F36700] font-mono text-xs font-bold tracking-wider uppercase mb-4">
            <Globe className="w-3.5 h-3.5" />
            <span>VERIFIED CLIENT WORK • 5 LIVE DEPLOYMENTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#0e164c] uppercase leading-none">
            Our Latest Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#676767] font-normal leading-relaxed">
            Live web platforms, direct-to-consumer storefronts, and performance architectures engineered for growth. Click on any project card to launch the interactive glassmorphism lightbox.
          </p>
        </div>

        {/* 5-Tile Responsive Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cases.map((cs, idx) => (
            <div
              key={cs.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 border border-gray-200 bg-white hover:border-[#F36700]/40"
            >
              {/* CSS Gradient Banner Card with Glass Sheen */}
              <div
                className={`w-full h-48 rounded-xl mb-6 relative overflow-hidden bg-gradient-to-tr ${cs.bgGradient} p-5 flex flex-col justify-between cursor-pointer`}
                onClick={() => {
                  sound.playChime();
                  setSelectedCaseIndex(idx);
                  setIframeLoading(true);
                }}
              >
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute -inset-full group-hover:inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-700 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#F36700] text-white font-mono text-[11px] font-bold tracking-wider uppercase shadow">
                    {cs.heroStat}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/20 flex items-center gap-1">
                      <Maximize2 className="w-3 h-3 text-[#FFC400]" />
                      <span>LIGHTBOX</span>
                    </span>
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#0e164c] transition-all shadow"
                      title="Open Live Deployment in New Tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="relative z-10 text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase font-bold block mb-1">
                    {cs.category}
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight group-hover:text-[#FFC400] transition-colors">
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
                    setSelectedCaseIndex(idx);
                    setIframeLoading(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#0e164c] hover:bg-[#142161] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>VIEW LIGHTBOX</span>
                </button>
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playPluck(190)}
                  className="px-4 py-3 rounded-xl bg-[#F36700] hover:bg-[#e2560b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[44px]"
                  title="Open Live Website"
                >
                  <span>LIVE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Center Bottom Action Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              sound.playPluck(150);
              setSelectedCaseIndex(0);
              setIframeLoading(true);
            }}
            type="button"
            className="px-8 py-4 rounded-xl bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:scale-105 active:scale-95 min-h-[48px] inline-flex items-center gap-2"
          >
            <Maximize2 className="w-4 h-4" />
            <span>EXPLORE INTERACTIVE LIGHTBOX &gt;</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          HIGH-END GLASSMORPHISM LIGHTBOX SYSTEM (Interactive Browser, Dual Viewport)
         ========================================================================= */}
      {selectedCaseIndex !== null && currentCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#04081e]/85 backdrop-blur-2xl animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCaseIndex(null);
          }}
        >
          {/* Dynamic Ambient Glow Behind Lightbox */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-40 transition-all duration-700"
              style={{ backgroundColor: currentCase.accentColor }}
            />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#1b2b78] blur-[140px] opacity-40" />
          </div>

          {/* Floating Left/Right Prev/Next Glass Chevrons (Desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group"
            aria-label="Previous Project (Arrow Left)"
            title="Previous Project (←)"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-white items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group"
            aria-label="Next Project (Arrow Right)"
            title="Next Project (→)"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Lightbox Modal Shell with Glassmorphism */}
          <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl bg-gradient-to-b from-white/[0.14] via-white/[0.07] to-[#0e164c]/90 backdrop-blur-3xl border border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] text-white overflow-hidden">
            
            {/* 1. Frosted Glass Browser Bar (macOS Dots, URL Pill, Controls) */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Traffic Lights & Project Sequence Badge */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    onClick={() => setSelectedCaseIndex(null)}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] border border-red-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Close Lightbox"
                  />
                  <span
                    onClick={() => setDeviceMode(deviceMode === "desktop" ? "mobile" : "desktop")}
                    className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-amber-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Toggle Device Mode"
                  />
                  <span
                    onClick={() => setIframeKey((k) => k + 1)}
                    className="w-3 h-3 rounded-full bg-[#27C93F] border border-green-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Reload Preview"
                  />
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold tracking-widest text-[#FFC400]">
                  <span>0{currentCase.id}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">05</span>
                </div>
              </div>

              {/* Center Simulated URL Bar */}
              <div className="flex-1 max-w-md hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white/80">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate select-text">{currentCase.liveUrl.replace("https://", "")}</span>
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  SSL LIVE
                </span>
              </div>

              {/* Right Controls: Viewport, Tabs & Close */}
              <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                {/* View Mode Switcher: Preview vs Strategy */}
                <div className="flex items-center p-0.5 rounded-xl bg-black/40 border border-white/15">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(140);
                      setActiveTab("preview");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      activeTab === "preview"
                        ? "bg-[#F36700] text-white shadow"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Live Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(160);
                      setActiveTab("strategy");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                      activeTab === "strategy"
                        ? "bg-[#F36700] text-white shadow"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    Strategy
                  </button>
                </div>

                {/* Device Viewport Toggle (Only visible in Preview tab) */}
                {activeTab === "preview" && (
                  <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-black/40 border border-white/15">
                    <button
                      type="button"
                      onClick={() => setDeviceMode("desktop")}
                      className={`p-1.5 rounded-lg transition-all ${
                        deviceMode === "desktop"
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                      title="Desktop View"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceMode("mobile")}
                      className={`p-1.5 rounded-lg transition-all ${
                        deviceMode === "mobile"
                          ? "bg-white/20 text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                      title="Mobile iPhone View"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Direct External Link */}
                <a
                  href={currentCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
                  title="Open Live Website in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedCaseIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#F36700] border border-white/15 text-white transition-all active:scale-95"
                  aria-label="Close Lightbox (Esc)"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Main Lightbox Content Area */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-8">
              
              {/* TAB 1: LIVE INTERACTIVE PREVIEW */}
              {activeTab === "preview" && (
                <div className="flex flex-col items-center justify-center min-h-[500px] h-full">
                  {deviceMode === "desktop" ? (
                    /* Desktop Panoramic Viewport */
                    <div className="w-full h-[58vh] min-h-[420px] rounded-2xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl relative flex flex-col">
                      {/* Browser Sub-bar */}
                      <div className="px-4 py-2 bg-white/[0.06] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-bold text-white uppercase">{currentCase.client}</span>
                          <span className="text-white/40">•</span>
                          <span className="text-[#FFC400] text-[11px]">{currentCase.heroStat}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIframeLoading(true);
                              setIframeKey((k) => k + 1);
                            }}
                            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                            title="Reload Frame"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <a
                            href={currentCase.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FFC400] hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>Open Tab</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Interactive Iframe */}
                      <div className="relative flex-1 w-full h-full bg-[#0e164c]/50">
                        {iframeLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090e33]/90 backdrop-blur-md z-10">
                            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[#F36700] animate-spin mb-3" />
                            <span className="font-mono text-xs text-white/70 tracking-wider">
                              CONNECTING TO LIVE VERCEL DEPLOYMENT...
                            </span>
                          </div>
                        )}
                        <iframe
                          key={`${currentCase.id}-${iframeKey}-desktop`}
                          src={currentCase.liveUrl}
                          onLoad={() => setIframeLoading(false)}
                          className="w-full h-full border-0"
                          title={`${currentCase.client} Live Showcase`}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Mobile iPhone Device Frame */
                    <div className="w-[340px] sm:w-[375px] h-[58vh] min-h-[480px] rounded-[44px] border-[8px] border-white/20 bg-black shadow-2xl relative overflow-hidden flex flex-col">
                      {/* Dynamic Island */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white/20 ml-auto mr-2" />
                      </div>

                      {/* Iframe inside Mobile Frame */}
                      <div className="relative flex-1 w-full h-full pt-8 pb-3 bg-[#0e164c]">
                        {iframeLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090e33]/90 backdrop-blur-md z-10">
                            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#FFC400] animate-spin mb-2" />
                            <span className="font-mono text-[10px] text-white/70">
                              LOADING MOBILE VIEW...
                            </span>
                          </div>
                        )}
                        <iframe
                          key={`${currentCase.id}-${iframeKey}-mobile`}
                          src={currentCase.liveUrl}
                          onLoad={() => setIframeLoading(false)}
                          className="w-full h-full border-0"
                          title={`${currentCase.client} Mobile Showcase`}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          loading="lazy"
                        />
                      </div>

                      {/* iPhone Home Indicator Bar */}
                      <div className="w-32 h-1 bg-white/30 rounded-full mx-auto my-1.5" />
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: STRATEGIC CASE STUDY DOSSIER */}
              {activeTab === "strategy" && (
                <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
                  {/* Hero Gradient Header */}
                  <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-r ${currentCase.bgGradient} border border-white/20 shadow-xl relative overflow-hidden`}>
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono font-bold tracking-widest text-[#FFC400] uppercase block mb-1">
                          {currentCase.category}
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
                          {currentCase.client}
                        </h3>
                        <p className="mt-1 text-sm text-white/80 font-normal">
                          {currentCase.tagline}
                        </p>
                      </div>

                      <div className="shrink-0 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                        <span className="text-[10px] font-mono text-white/60 uppercase block">PRIMARY IMPACT</span>
                        <span className="font-display font-black text-xl sm:text-2xl text-[#FFC400]">
                          {currentCase.heroStat}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3 Metric Glass Tiles */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {currentCase.stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 text-center shadow-md hover:border-white/30 transition-all"
                      >
                        <div className="font-display font-black text-xl sm:text-3xl text-[#FFC400]">
                          {s.val}
                        </div>
                        <div className="text-[10px] sm:text-xs font-mono text-white/60 uppercase mt-1">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3 Strategic Narrative Glass Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Mushkil */}
                    <div className="p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-red-400/40 transition-all flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <h4 className="font-display font-bold text-sm text-red-300 uppercase">
                          01. The Bottleneck (Mushkil)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed flex-1">
                        {currentCase.mushkil}
                      </p>
                    </div>

                    {/* Jugaad */}
                    <div className="p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-[#FFC400]/40 transition-all flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
                        <h4 className="font-display font-bold text-sm text-[#FFC400] uppercase">
                          02. Strategic Architecture (Jugaad)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed flex-1">
                        {currentCase.jugaad}
                      </p>
                    </div>

                    {/* Nateeja */}
                    <div className="p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-emerald-400/40 transition-all flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <h4 className="font-display font-bold text-sm text-emerald-300 uppercase">
                          03. Verified Outcome (Nateeja)
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed flex-1">
                        {currentCase.nateeja}
                      </p>
                    </div>
                  </div>

                  {/* Technology Stack Pills */}
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 mr-2">
                      <Code2 className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>TECH STACK:</span>
                    </div>
                    {currentCase.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Glass Navigation Dock & Project Switcher Strip */}
            <div className="px-4 sm:px-6 py-4 border-t border-white/15 bg-white/[0.04] backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-4 shrink-0">
              {/* Project Thumbnail / Pill Dock (5 Projects) */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 lg:pb-0">
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest hidden sm:inline mr-1">
                  PROJECTS:
                </span>
                {cases.map((cs, cIdx) => (
                  <button
                    key={cs.id}
                    type="button"
                    onClick={() => {
                      sound.playPluck(140 + cIdx * 20);
                      setSelectedCaseIndex(cIdx);
                      setIframeLoading(true);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCaseIndex === cIdx
                        ? "bg-white/20 text-white border border-[#FFC400] shadow-[0_0_15px_rgba(255,196,0,0.3)] scale-105"
                        : "bg-white/[0.06] hover:bg-white/[0.12] text-white/70 border border-white/10"
                    }`}
                  >
                    <span className="text-[10px] text-[#FFC400]">0{cs.id}</span>
                    <span>{cs.client.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons: Launch Website & WhatsApp Strategy */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto justify-end">
                <a
                  href={currentCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#F36700] hover:bg-[#e2560b] text-white text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 min-h-[42px] active:scale-95 transition-all"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20love%20the%20${encodeURIComponent(currentCase.client)}%20showcase%20and%20want%20to%20build%20a%20similar%20high-ROAS%20storefront.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[42px] active:scale-95 transition-all"
                >
                  <span>DISCUSS STRATEGY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
