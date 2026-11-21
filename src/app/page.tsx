"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  ChevronRight,
} from "lucide-react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { IndianArtBackgroundOverlay } from "@/components/common/IndianArtBackgroundOverlay";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SutraProgressMeter } from "@/components/common/SutraProgressMeter";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ClientsTrustStrip } from "@/components/clients/ClientsTrustStrip";
import { TwirlEasterEgg } from "@/components/easteregg/TwirlEasterEgg";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { ProposalFloatingBar } from "@/components/proposal/ProposalFloatingBar";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionDivider } from "@/components/common/SectionDivider";
import { ProjectPreviewShowcase } from "@/components/casestudies/ProjectPreviewShowcase";
import { BeforeAfterSlider } from "@/components/common/BeforeAfterSlider";
import { GrowthJourneyScrollytelling } from "@/components/methodology/GrowthJourneyScrollytelling";
import { WinterExpansionDiscountModal } from "@/components/common/WinterExpansionDiscountModal";
import { StardustCursorTrail } from "@/components/common/StardustCursorTrail";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";
import { AGENCY_PROJECTS, ProjectItem } from "@/data/projectsData";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 6 Flagship Projects for Curated Executive Preview
  const flagshipProjects = AGENCY_PROJECTS.slice(0, 6);

  // 4 Core Highlighted Disciplines for Curated Capabilities Preview
  const highlightedServices = AGENCY_SERVICES.slice(0, 4);

  return (
    <SmoothScrollProvider>
      {/* Cultural Artistry Background */}
      <IndianArtBackgroundOverlay />

      {/* Custom dual cursor with 'INSPECT • EXPLORE' stamp */}
      <CustomCursor />

      {/* Fixed right-edge scroll-linked progress meter */}
      <SutraProgressMeter />

      {/* Theatrical Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main Experience Container */}
      <div
        className={`relative w-full max-w-full overflow-x-clip transition-all duration-1000 ease-out bg-[#080807] text-[#e8e8e3] ${
          preloaderDone ? "scale-100 opacity-100" : "sm:scale-[1.02] opacity-90"
        }`}
      >
        {/* Architectural Navigation Bar */}
        <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

        <main className="relative flex flex-col">
          {/* Section 1: Monumental Hero with Three.js 3D Centerpiece */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 2: Executive Capabilities Bento Preview */}
          <section id="services" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 border-t border-[rgba(232,232,227,0.12)] scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(232,232,227,0.12)] pb-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2">
                  02 / DISCIPLINES &amp; CAPABILITIES
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  What We Engineer
                </h2>
              </div>

              <BreydaqsButton href="/services" variant="white">
                VIEW ALL 9 DISCIPLINES
              </BreydaqsButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 breydaqs-hover-group">
              {highlightedServices.map((service, idx) => (
                <SpotlightCard
                  key={service.id}
                  className="breydaqs-hover-item p-6 sm:p-8 rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.15)] hover:border-[rgba(232,232,227,0.5)] transition-all flex flex-col justify-between space-y-6 md:sticky md:top-28 shadow-2xl"
                  style={{
                    zIndex: idx + 10,
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-400 font-bold uppercase">
                        CAPABILITY 0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[0.2rem] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                        {service.metric}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                      {service.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-xs">
                      {service.specs.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[rgba(232,232,227,0.12)] flex items-center justify-between font-mono">
                    <span className="text-[11px] text-zinc-500">
                      SLA: {service.specs.turnaround}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-white hover:underline flex items-center gap-1"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Section 2.5: The 3-Stage Growth Journey */}
          <GrowthJourneyScrollytelling onOpenKundli={() => setIsKundliOpen(true)} />

          <SectionDivider />

          {/* Section 3: Flagship Works & Projects Preview */}
          <section id="work" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(232,232,227,0.12)] pb-6">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2">
                  03 / SELECTED WORKS — PROJECTS
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  PROVEN REVENUE ARCHITECTURES
                </h2>
              </div>

              <BreydaqsButton href="/work" variant="white">
                EXPLORE ALL 50 WORKS
              </BreydaqsButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagshipProjects.map((proj) => (
                <SpotlightCard
                  key={proj.id}
                  isGlass={true}
                  className="group rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.15)] hover:border-white/50 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div
                    data-cursor="view"
                    onClick={() => {
                      sound.playChime();
                      setActiveProject(proj);
                    }}
                    className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                  >
                    <img
                      src={proj.thumbnail}
                      alt={proj.client}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-[0.2rem] bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase text-zinc-200">
                        {proj.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playChime();
                          setActiveProject(proj);
                        }}
                        className="px-4 py-2 rounded-[0.2rem] bg-white text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>INSPECT</span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-white bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-[0.2rem] border border-white/20">
                        {proj.heroStat}
                      </span>
                      <span className="text-[10px] text-zinc-300">
                        {proj.stats[0]?.val || proj.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase block">
                      {proj.category}
                    </span>
                    <h3
                      onClick={() => {
                        sound.playChime();
                        setActiveProject(proj);
                      }}
                      className="font-display font-black text-lg text-white uppercase tracking-tight hover:text-zinc-300 cursor-pointer transition-colors"
                    >
                      {proj.client}
                    </h3>
                    <p className="font-sans text-xs text-zinc-400 leading-snug line-clamp-2">
                      {proj.tagline}
                    </p>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between font-mono">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          setActiveProject(proj);
                        }}
                        className="text-xs text-white hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Platform</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/work/${proj.slug}`}
                        className="text-[10px] text-zinc-500 hover:text-zinc-300"
                      >
                        Case Study ↗
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Section 3.5: Creative Architecture Teardown Interactive Slider */}
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
            <BeforeAfterSlider />
          </section>

          <SectionDivider />

          {/* Section 4: Client Trust Proof Strip */}
          <ClientsTrustStrip />

          <SectionDivider />

          {/* Section 5: Executive Retainer Teaser */}
          <section id="pricing" className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 scroll-mt-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-2">
                04 / PARTNERSHIP TIERS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
                Transparent Retainer Architecture
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                Choose a structured performance tier or customize your modular growth stack. Every rupee is tied to clear SLAs and daily contribution margin tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <SpotlightCard isGlass={true} className="p-6 sm:p-8 rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.18)] space-y-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  FOUNDATION TIER
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Foundation Sprint
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹75,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  For challenger brands scaling ₹3L–₹15L/month ad spend seeking disciplined, profitable acquisition.
                </p>
              </SpotlightCard>

              <SpotlightCard isGlass={true} className="p-6 sm:p-8 rounded-[0.25rem] bg-[#0e0e0d] border-2 border-white/50 shadow-2xl space-y-4 relative">
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-[0.2rem] bg-white text-black text-[9px] font-bold font-mono uppercase z-30">
                  FLAGSHIP
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  DOMINANCE TIER
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Dominance Engine
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹1,50,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Our flagship end-to-end engine for scaling brands pushing ₹15L–₹75L/month ad volume.
                </p>
              </SpotlightCard>

              <SpotlightCard isGlass={true} className="p-6 sm:p-8 rounded-[0.25rem] bg-[#0c0c0b] border border-[rgba(232,232,227,0.18)] space-y-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  ENTERPRISE TIER
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Enterprise Sovereign
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹3,00,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Full enterprise brand takeover for market leaders exceeding ₹75L/month ad volume.
                </p>
              </SpotlightCard>
            </div>

            <div className="text-center">
              <BreydaqsButton
                href="/pricing"
                variant="white"
                className="py-4 px-8 text-xs sm:text-sm"
              >
                OPEN PRICING &amp; ROI SIMULATOR
              </BreydaqsButton>
            </div>
          </section>

          {/* Section 7: Interactive Spring-Physics Easter Egg */}
          <TwirlEasterEgg onOpenKundli={() => setIsKundliOpen(true)} />
        </main>

        {/* Section 8: Wordmark & Architecture Footer */}
        <Footer onOpenKundli={() => setIsKundliOpen(true)} />

        {/* Persistent Floating Bottom Proposal Drawer */}
        <ProposalFloatingBar />
      </div>

      {/* Global Interactive Project Preview Modal Shell */}
      {activeProject && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playPluck(120);
              setActiveProject(null);
            }
          }}
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[94dvh] sm:h-[88vh] flex flex-col rounded-[0.25rem] bg-[#0c0c0b] text-[#e8e8e3] overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border border-[rgba(232,232,227,0.2)] cursor-default"
          >
            <div className="px-4 py-3 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between font-mono">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setActiveProject(null)}
                  className="w-3 h-3 rounded-[0.2rem] bg-[#FF5F56] cursor-pointer"
                  title="Close Preview"
                />
                <span className="font-display font-black text-xs uppercase tracking-wider text-white ml-2">
                  {activeProject.client}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-1 px-3 rounded-[0.2rem] bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ProjectPreviewShowcase project={activeProject} />
            </div>
          </div>
        </div>
      )}

      {/* Free Brand Growth Audit 3-Step Wizard Modal */}
      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />

      {/* Winter Scale & National Expansion 20% Discount Modal */}
      <WinterExpansionDiscountModal onOpenKundli={() => setIsKundliOpen(true)} />

      {/* Liquid Platinum Stardust Particle Cursor Trail */}
      <StardustCursorTrail />
    </SmoothScrollProvider>
  );
}
