"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ExternalLink,
  Globe,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Lock,
  Maximize2,
  RefreshCw,
  ArrowRight,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { AGENCY_PROJECTS } from "@/data/projectsData";

const FILTER_CATEGORIES = [
  { id: "all", label: "All Work (16)" },
  { id: "seo-sem", label: "SEO & SEM" },
  { id: "performance-marketing", label: "Performance Marketing" },
  { id: "lead-generation", label: "Lead Generation" },
  { id: "social-media", label: "Social Media" },
  { id: "ecommerce-services", label: "E-Commerce" },
  { id: "quick-commerce", label: "Quick Commerce" },
  { id: "web-development", label: "Web Development" },
  { id: "packaging-label", label: "Packaging & Branding" },
];

export function CaseStudiesSection() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "strategy">("preview");
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const cases = AGENCY_PROJECTS;
  const filteredCases =
    selectedCategory === "all"
      ? cases
      : cases.filter((c) => c.serviceId === selectedCategory);

  const currentCase = selectedCaseIndex !== null ? cases[selectedCaseIndex] : null;

  const handleNext = useCallback(() => {
    sound.playPluck(180);
    setIframeLoading(true);
    setSelectedCaseIndex((prev) => (prev !== null ? (prev + 1) % cases.length : 0));
  }, [cases.length]);

  const handlePrev = useCallback(() => {
    sound.playPluck(150);
    setIframeLoading(true);
    setSelectedCaseIndex((prev) => (prev !== null ? (prev - 1 + cases.length) % cases.length : 0));
  }, [cases.length]);

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
  }, [selectedCaseIndex, handleNext, handlePrev]);

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
      className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden select-none font-display scroll-mt-24 border-t border-white/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 text-white font-royal text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>VERIFIED CLIENT WORK • 16 HUMAN-GRADE CASE STUDIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Latest Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed font-sans">
            Live web platforms, direct-to-consumer storefronts, and performance architectures engineered for growth. Filter by capability or click on any project card to inspect the interactive live lightbox and strategic dossier.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 overflow-x-auto pb-2">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playPluck(160);
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? "bg-white text-black shadow-lg scale-105"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCases.map((cs) => {
            const origIdx = cases.findIndex((c) => c.id === cs.id);
            return (
              <SpotlightCard
                key={cs.id}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                borderColor="rgba(255, 255, 255, 0.4)"
                className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06)] transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 border border-white/10 border-t-white/20 bg-[#121215] hover:border-white/35 hover:bg-[#18181d]"
              >
                {/* Browser Window Showcase Thumbnail */}
                <div
                  className="w-full h-56 rounded-2xl mb-5 relative overflow-hidden border border-white/10 bg-black shadow-md group-hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col"
                  onClick={() => {
                    sound.playChime();
                    setSelectedCaseIndex(origIdx);
                    setIframeLoading(true);
                  }}
                >
                  {/* Simulated Mini Browser Chrome Header */}
                  <div className="h-7 px-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-[10px] font-mono shrink-0 z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-zinc-400 truncate max-w-[140px]">
                      {cs.liveUrl.replace("https://", "")}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Thumbnail Image Container with Zoom & Overlays */}
                  <div className="relative flex-1 w-full overflow-hidden bg-black">
                    { }
                    <img
                      src={cs.thumbnail}
                      alt={`${cs.client} Website Thumbnail`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Glass Overlay on Bottom of Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121215]/90 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Badges: Hero Stat & External Link */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-white text-black font-metric text-[10px] font-black tracking-wider uppercase shadow-md pointer-events-auto">
                        {cs.heroStat}
                      </span>
                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        <a
                          href={cs.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-black/70 hover:bg-white text-white hover:text-black transition-all shadow border border-white/20"
                          title="Open Live Deployment"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Hover Quick Overlay Prompt */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md text-white font-display text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5 text-white" />
                        <span>OPEN LIGHTBOX</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title & Category Below Thumbnail */}
                <div className="text-left mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-1">
                    {cs.category}
                  </span>
                  <h3 className="font-display font-black text-xl text-white uppercase tracking-tight leading-tight transition-colors">
                    {cs.client}
                  </h3>
                </div>

                {/* Tagline & Info */}
                <div className="text-left mb-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed font-sans">
                    {cs.tagline}
                  </p>

                  {/* Metric pill row */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-sans">{cs.stats[0]?.label || "Metric"}</span>
                    <span className="text-white font-metric font-black text-sm">{cs.stats[0]?.val}</span>
                  </div>
                </div>

                {/* Direct Link to Dedicated Case Study Page */}
                <div className="mb-4 pt-2">
                  <Link
                    href={`/work/${cs.slug}`}
                    className="text-xs font-mono font-bold text-zinc-300 hover:text-white flex items-center gap-1 group/link transition-colors"
                  >
                    <span>Read Strategic Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Dual Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      setSelectedCaseIndex(origIdx);
                      setIframeLoading(true);
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center gap-1.5 border border-white/15"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-white" />
                    <span>VIEW LIGHTBOX</span>
                  </button>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playPluck(190)}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[44px] shadow-md"
                    title="Open Live Website"
                  >
                    <span>LIVE</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            );
          })}
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
            className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 min-h-[48px] inline-flex items-center gap-2"
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
          <div className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl bg-gradient-to-b from-white/[0.14] via-[#121215]/95 to-[#09090b]/98 backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] text-white overflow-hidden">

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

                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold tracking-widest text-white">
                  <span>{currentCase.id < 10 ? `0${currentCase.id}` : currentCase.id}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/60">{filteredCases.length < 10 ? `0${filteredCases.length}` : filteredCases.length}</span>
                </div>
              </div>

              {/* Center Simulated URL Bar */}
              <div className="flex-1 max-w-md hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white/80">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate select-text">
                  {currentCase.liveUrl.startsWith("/")
                    ? `https://desimuchads.agency${currentCase.liveUrl}`
                    : currentCase.liveUrl.replace("https://", "")}
                </span>
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${activeTab === "preview"
                        ? "bg-white text-black shadow"
                        : "text-zinc-400 hover:text-white"
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${activeTab === "strategy"
                        ? "bg-white text-black shadow"
                        : "text-zinc-400 hover:text-white"
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
                      className={`p-1.5 rounded-lg transition-all ${deviceMode === "desktop"
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
                      className={`p-1.5 rounded-lg transition-all ${deviceMode === "mobile"
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
                  className="p-2 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/15 text-white transition-all active:scale-95"
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
                          <span className="text-white font-mono text-[11px]">{currentCase.heroStat}</span>
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
                            className="text-white hover:underline flex items-center gap-1 text-[11px]"
                          >
                            <span>Open Tab</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Interactive Iframe */}
                      <div className="relative flex-1 w-full h-full bg-black">
                        {iframeLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                            <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
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
                    /* Mobile iPhone Device Frame with iOS 18 Chrome */
                    <div className="w-[340px] sm:w-[375px] h-[58vh] min-h-[480px] rounded-[44px] border-[8px] border-white/25 bg-black shadow-2xl relative overflow-hidden flex flex-col">
                      {/* Authentic iOS Status Bar */}
                      <div className="absolute top-0 inset-x-0 h-8 px-6 flex items-center justify-between text-[11px] font-mono text-white/90 z-30 pointer-events-none">
                        <span className="font-bold tracking-tight">9:41</span>
                        {/* Dynamic Island */}
                        <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-between px-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px]">
                          <span>5G</span>
                          <div className="w-4 h-2 rounded-xs border border-white/60 p-0.5 flex items-center">
                            <div className="w-full h-full bg-white rounded-xs" />
                          </div>
                        </div>
                      </div>

                      {/* Iframe inside Mobile Frame */}
                      <div className="relative flex-1 w-full h-full pt-8 pb-3 bg-black">
                        {iframeLoading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-2" />
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
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#18181c] via-[#121215] to-[#09090b] border border-white/20 shadow-xl relative overflow-hidden">
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase block mb-1">
                          {currentCase.category}
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
                          {currentCase.client}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-300 font-normal">
                          {currentCase.tagline}
                        </p>
                      </div>

                      <div className="shrink-0 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                        <span className="text-[10px] font-mono text-white/60 uppercase block">PRIMARY IMPACT</span>
                        <span className="font-display font-black text-xl sm:text-2xl text-white">
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
                        <div className="font-display font-black text-xl sm:text-3xl text-white">
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
                    <div className="p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 hover:border-white/40 transition-all flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        <h4 className="font-display font-bold text-sm text-white uppercase">
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
                      <Code2 className="w-3.5 h-3.5 text-white" />
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${selectedCaseIndex === cIdx
                        ? "bg-white text-black border border-white shadow-[0_0_15px_rgba(255,255,255,0.25)] scale-105"
                        : "bg-white/[0.06] hover:bg-white/[0.12] text-white/70 border border-white/10"
                      }`}
                  >
                    <span className="text-[10px] opacity-70">0{cs.id}</span>
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
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-2 min-h-[42px] active:scale-95 transition-all"
                >
                  <span>LAUNCH LIVE SITE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/919999999999?text=Pranam%20Desi%20Muchads!%20We%20love%20the%20${encodeURIComponent(currentCase.client)}%20showcase%20and%20want%20to%20build%20a%20similar%20high-ROAS%20storefront.`}
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
