"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  ChevronRight,
} from "lucide-react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { KhadiNoiseOverlay } from "@/components/common/KhadiNoiseOverlay";
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
import { AGENCY_PROJECTS, ProjectItem } from "@/data/projectsData";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // 6 Flagship Projects for Curated Executive Preview
  const flagshipProjects = AGENCY_PROJECTS.slice(0, 6);

  // 4 Core Highlighted Disciplines for Curated Capabilities Preview
  const highlightedServices = AGENCY_SERVICES.slice(0, 4);

  return (
    <SmoothScrollProvider>
      {/* Tactile Khadi handmade paper noise texture overlay */}
      <KhadiNoiseOverlay />

      {/* Authentic Indian Architectural Jaali & Mandala Cultural Artistry Background */}
      <IndianArtBackgroundOverlay />

      {/* Custom dual cursor with 'DEKHO • EXPLORE' stamp */}
      <CustomCursor />

      {/* Fixed right-edge scroll-linked golden Sutra progress meter */}
      <SutraProgressMeter />

      {/* Theatrical Royal Darbar 3-Stage Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main Experience Container */}
      <div
        className={`relative w-full transition-transform duration-1000 ease-out ${
          preloaderDone ? "scale-100 opacity-100" : "scale-[1.04] opacity-90"
        }`}
      >
        {/* Floating Glassmorphic Pill Navigation */}
        <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

        <main className="relative flex flex-col">
          {/* Section 1: Monumental Hero with Three.js 3D Moustache & Mudras */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 2: Executive Capabilities Bento Preview */}
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  What We Engineer
                </h2>
              </div>

              <Link
                href="/services"
                onMouseEnter={() => sound.playPluck(150)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-md active:scale-95 shrink-0"
              >
                <span>View All 9 Disciplines</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {highlightedServices.map((service, idx) => (
                <SpotlightCard
                  key={service.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500 font-bold uppercase">
                        CAPABILITY 0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                        {service.metric}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                      {service.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.shortDesc}
                    </p>

                    <ul className="space-y-1.5 pt-2 border-t border-white/5">
                      {service.specs.deliverables.slice(0, 3).map((d, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span className="truncate">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {service.specs.turnaround}
                    </span>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-display font-bold uppercase tracking-wider text-white hover:underline flex items-center gap-1"
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

          {/* Section 3: Flagship Works & Master Artworks Preview */}
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Selected Work &amp; Art
                </h2>
              </div>

              <Link
                href="/work"
                onMouseEnter={() => sound.playPluck(150)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-md active:scale-95 shrink-0"
              >
                <span>Explore All 50 Works</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagshipProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase text-zinc-200">
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
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>PREVIEW</span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-metric font-bold text-white bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                        {proj.heroStat}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-300">
                        {proj.stats[0]?.val || proj.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
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

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          sound.playChime();
                          setActiveProject(proj);
                        }}
                        className="text-xs font-mono text-white hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Platform</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href={`/work/${proj.slug}`}
                        className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300"
                      >
                        Case Study ↗
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Section 4: Client Trust Proof Strip */}
          <ClientsTrustStrip />

          <SectionDivider />

          {/* Section 5: Executive Retainer Teaser */}
          <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
                Transparent Partnerships
              </h2>
              <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed">
                Choose a structured growth retainer or assemble your custom marketing thali. Every rupee is tied to clear SLAs and daily contribution margin tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  FOUNDATION STACK
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Seed Sanchalan
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹75,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  For challenger brands pushing ₹3L–₹15L/mo ad spend seeking disciplined, profitable scaling.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border-2 border-white/40 shadow-2xl space-y-4 relative">
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-white text-black text-[9px] font-bold font-mono uppercase">
                  FLAGSHIP
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  DOMINANCE STACK
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Growth Darbar
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹1,50,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Our flagship end-to-end engine for scaling brands pushing ₹15L–₹75L/mo ad volume.
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 space-y-4">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  ENTERPRISE STACK
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase">
                  Sovereign Empire
                </h3>
                <div className="font-metric font-black text-3xl text-white">
                  ₹3,00,000<span className="text-xs font-mono text-zinc-500 font-normal"> / month</span>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Full enterprise brand takeover for market leaders exceeding ₹75L/mo ad volume.
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/pricing"
                onMouseEnter={() => sound.playPluck(150)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase transition-all shadow-xl active:scale-95"
              >
                <span>OPEN FULL PRICING &amp; ROI SIMULATOR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Section 7: Interactive Spring-Physics Easter Egg */}
          <TwirlEasterEgg onOpenKundli={() => setIsKundliOpen(true)} />
        </main>

        {/* Section 8: Royal Seal & Wordmark Footer */}
        <Footer onOpenKundli={() => setIsKundliOpen(true)} />

        {/* Persistent Floating Bottom Proposal Drawer */}
        <ProposalFloatingBar />
      </div>

      {/* Global Interactive Project Preview Modal Shell */}
      {activeProject && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[94dvh] sm:h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl ios-glass-panel text-white overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border border-white/20">
            <div className="px-4 py-3 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setActiveProject(null)}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] cursor-pointer"
                  title="Close Preview"
                />
                <span className="font-display font-black text-xs uppercase tracking-wider text-white ml-2">
                  {activeProject.client}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono"
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

      {/* Free Brand Kundli 3-Step Wizard Modal */}
      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
