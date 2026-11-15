"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ExternalLink,
  Globe,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Code2,
  CheckCircle2,
  Eye,
  Film,
  Sparkles,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { sound } from "@/lib/sound";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { AGENCY_PROJECTS, getProjectAssetType } from "@/data/projectsData";
import { ProjectPreviewShowcase } from "./ProjectPreviewShowcase";

const FILTER_CATEGORIES = [
  { id: "all", label: "All Work (48)" },
  { id: "packaging-label", label: "Packaging & Branding (13)" },
  { id: "web-development", label: "Fullstack Web & Apps (11)" },
  { id: "social-media", label: "Social Media & Video (7)" },
  { id: "performance-marketing", label: "Performance Marketing (5)" },
  { id: "lead-generation", label: "Lead Gen & Decks (4)" },
  { id: "seo-sem", label: "SEO & SEM (3)" },
  { id: "ecommerce-services", label: "E-Commerce (3)" },
  { id: "quick-commerce", label: "Quick Commerce (2)" },
];

export function CaseStudiesSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "strategy">("preview");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const cases = AGENCY_PROJECTS;
  const filteredCases =
    selectedCategory === "all"
      ? cases
      : cases.filter((c) => c.serviceId === selectedCategory);

  const currentCase =
    selectedProjectId !== null
      ? cases.find((c) => c.id === selectedProjectId) || null
      : null;

  const currentFilteredIndex = currentCase
    ? filteredCases.findIndex((c) => c.id === currentCase.id)
    : -1;

  // Open Lightbox handler
  const openLightbox = (proj: typeof cases[0], tab: "preview" | "strategy" = "preview") => {
    sound.playChime();
    setSelectedProjectId(proj.id);
    setActiveTab(tab);
  };

  const handleNext = useCallback(() => {
    sound.playPluck(180);
    if (filteredCases.length === 0) return;
    const currentIdx = currentCase
      ? filteredCases.findIndex((c) => c.id === currentCase.id)
      : -1;
    const nextIdx = (currentIdx + 1) % filteredCases.length;
    setSelectedProjectId(filteredCases[nextIdx].id);
  }, [currentCase, filteredCases]);

  const handlePrev = useCallback(() => {
    sound.playPluck(150);
    if (filteredCases.length === 0) return;
    const currentIdx = currentCase
      ? filteredCases.findIndex((c) => c.id === currentCase.id)
      : -1;
    const prevIdx = (currentIdx - 1 + filteredCases.length) % filteredCases.length;
    setSelectedProjectId(filteredCases[prevIdx].id);
  }, [currentCase, filteredCases]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProjectId === null) return;
      if (e.key === "Escape") {
        sound.playPluck(120);
        setSelectedProjectId(null);
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
  }, [selectedProjectId, handleNext, handlePrev]);

  // Body scroll locking when modal is open
  useEffect(() => {
    if (selectedProjectId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProjectId]);

  return (
    <section
      id="karname"
      className="relative py-28 sm:py-36 bg-[#09090b] text-white overflow-hidden select-none font-display scroll-mt-24 border-t border-white/10"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/20 text-white font-royal text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED CLIENT WORK • 48 HUMAN-GRADE CASE STUDIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none">
            Our Latest Work
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal leading-relaxed font-sans">
            Live web platforms, direct-to-consumer storefronts, high-impact video reels, and brand packaging architectures engineered for growth. Filter by capability or click Preview on any card to inspect the interactive live environment and strategic dossier.
          </p>
        </div>

        {/* Category Filter Pills (Silky momentum rail on mobile) */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap sm:flex-wrap scrollbar-none scroll-momentum-x">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playPluck(160);
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 min-h-[44px] flex items-center cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-white text-black shadow-lg scale-105 font-black"
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
            const assetType = getProjectAssetType(cs);

            return (
              <SpotlightCard
                key={cs.id}
                spotlightColor="rgba(255, 255, 255, 0.12)"
                borderColor="rgba(255, 255, 255, 0.45)"
                className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 ios-glass-card"
              >
                {/* Browser Window Showcase Thumbnail with 3D Depth */}
                <div
                  className="w-full h-56 rounded-2xl mb-5 relative overflow-hidden border border-white/15 bg-black shadow-md group-hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col ios-layer-floating"
                  onClick={() => openLightbox(cs)}
                >
                  {/* Simulated Mini Browser Chrome Header */}
                  <div className="h-7 px-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-[10px] font-mono shrink-0 z-20">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-zinc-400 truncate max-w-[140px]">
                      {cs.liveUrl.startsWith("/")
                        ? `desimuchads.agency${cs.liveUrl}`
                        : cs.liveUrl.replace("https://", "")}
                    </span>
                    <div className="flex items-center gap-1">
                      {assetType === "video_reel" ? (
                        <Film className="w-3 h-3 text-emerald-400" />
                      ) : assetType === "canva_deck" ? (
                        <Sparkles className="w-3 h-3 text-amber-400" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Image Container with Zoom & Overlays */}
                  <div className="relative flex-1 w-full overflow-hidden bg-black">
                    <img
                      src={cs.thumbnail}
                      alt={`${cs.client} Work Thumbnail`}
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
                          title="Open Live Deployment / Asset"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Hover Quick Overlay Prompt */}
                    <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md text-white font-display text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-white" />
                        <span>PREVIEW WORK &amp; DOSSIER</span>
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
                    onClick={() => openLightbox(cs)}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all min-h-[44px] flex items-center justify-center gap-1.5 border border-white/15 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-white" />
                    <span>PREVIEW</span>
                  </button>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playPluck(190)}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-zinc-200 active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 min-h-[44px] shadow-md cursor-pointer"
                    title="Launch Live Project / Master File"
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
              if (filteredCases.length > 0) openLightbox(filteredCases[0]);
            }}
            type="button"
            className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 min-h-[48px] inline-flex items-center gap-2 cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
            <span>EXPLORE WORK LIGHTBOX ({filteredCases.length} PROJECTS) &gt;</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          HIGH-END GLASSMORPHISM WORK LIGHTBOX SYSTEM
          Rendered at z-[150] to sit securely above fixed navigation bars
         ========================================================================= */}
      {selectedProjectId !== null && currentCase && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200 select-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playPluck(120);
              setSelectedProjectId(null);
            }
          }}
        >
          {/* Dynamic Ambient Glow Behind Lightbox */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[140px] opacity-35 transition-all duration-700"
              style={{ backgroundColor: currentCase.accentColor || "#3b82f6" }}
            />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#1b2b78] blur-[150px] opacity-35" />
          </div>

          {/* Floating Left/Right Prev/Next Glass Chevrons (Desktop) */}
          <button
            type="button"
            onClick={handlePrev}
            className="hidden lg:flex absolute left-4 xl:left-8 top-1/2 -translate-y-1/2 z-[160] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-xl text-white items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group cursor-pointer"
            aria-label="Previous Project (Arrow Left)"
            title="Previous Project (←)"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="hidden lg:flex absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 z-[160] w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 backdrop-blur-xl text-white items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 group cursor-pointer"
            aria-label="Next Project (Arrow Right)"
            title="Next Project (→)"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Lightbox Modal Shell with iOS Glassmorphism */}
          <div className="relative w-full max-w-6xl h-[94dvh] sm:h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl ios-glass-panel text-white overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border border-white/20 animate-in zoom-in-95 duration-200">

            {/* 1. Frosted Glass Browser Bar (Traffic lights, Sequence, Tabs, Single Close Button) */}
            <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between gap-2.5 shrink-0">
              {/* Left Side: Traffic Lights & Project Sequence Badge */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span
                    onClick={() => {
                      sound.playPluck(120);
                      setSelectedProjectId(null);
                    }}
                    className="w-3 h-3 rounded-full bg-[#FF5F56] border border-red-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Close Lightbox"
                  />
                  <span
                    onClick={() => setActiveTab(activeTab === "preview" ? "strategy" : "preview")}
                    className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-amber-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Toggle Preview / Strategy"
                  />
                  <span
                    onClick={handleNext}
                    className="w-3 h-3 rounded-full bg-[#27C93F] border border-green-400/40 cursor-pointer shadow hover:opacity-80 transition-opacity"
                    title="Next Project"
                  />
                </div>

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold tracking-widest text-white">
                  <span>{currentFilteredIndex >= 0 ? currentFilteredIndex + 1 : 1}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/70">{filteredCases.length}</span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 font-display font-black text-xs uppercase tracking-wider text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="truncate max-w-[200px]">{currentCase.client}</span>
                </div>
              </div>

              {/* Center / Right: Tabs & Clean Close Control */}
              <div className="flex items-center gap-2 sm:gap-3 ml-auto shrink-0">
                {/* View Mode Switcher: Preview vs Strategy */}
                <div className="flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(140);
                      setActiveTab("preview");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "preview"
                        ? "bg-white text-black shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(160);
                      setActiveTab("strategy");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === "strategy"
                        ? "bg-white text-black shadow"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Strategy</span>
                  </button>
                </div>

                {/* Direct Link to Official Destination */}
                <a
                  href={currentCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all items-center justify-center cursor-pointer"
                  title="Open Project in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Single, Accessible Thumb-Friendly Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(120);
                    setSelectedProjectId(null);
                  }}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white transition-all active:scale-95 cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
                  aria-label="Close Lightbox (Esc)"
                  title="Close Lightbox (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Main Lightbox Content Area */}
            <div className="relative flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 md:p-8">

              {/* TAB 1: LIVE INTERACTIVE PREVIEW */}
              {activeTab === "preview" && (
                <ProjectPreviewShowcase
                  key={currentCase.id}
                  project={currentCase}
                  initialDeviceMode="desktop"
                />
              )}

              {/* TAB 2: STRATEGIC CASE STUDY DOSSIER */}
              {activeTab === "strategy" && (
                <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
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

                  {/* 4 Metric Glass Tiles (2x2 on mobile, 4-col on tablet/desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
                    {currentCase.stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/15 text-center shadow-md hover:border-white/30 transition-all"
                      >
                        <div className="font-display font-black text-lg sm:text-2xl md:text-3xl text-white truncate">
                          {s.val}
                        </div>
                        <div className="text-[10px] sm:text-xs font-mono text-white/60 uppercase mt-1 leading-tight">
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

                  {/* Deliverables Deployed */}
                  {currentCase.deliverables && currentCase.deliverables.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                        Deliverables Deployed
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentCase.deliverables.map((deliv, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
            <div className="px-4 sm:px-6 py-3 border-t border-white/15 bg-white/[0.04] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              {/* Stepper Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1 text-xs font-mono font-bold active:scale-95 transition-all cursor-pointer"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-1 text-xs font-mono font-bold active:scale-95 transition-all cursor-pointer"
                    aria-label="Next Project"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-mono text-zinc-400 font-bold px-2">
                  Project {currentFilteredIndex >= 0 ? currentFilteredIndex + 1 : 1} of {filteredCases.length}
                </span>
              </div>

              {/* Action Buttons: Launch Website & Dossier */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                <Link
                  href={`/work/${currentCase.slug}`}
                  onClick={() => setSelectedProjectId(null)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
                >
                  <span>Strategic Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={currentCase.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-black uppercase tracking-wider shadow flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
