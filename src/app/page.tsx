"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
} from "lucide-react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SutraProgressMeter } from "@/components/common/SutraProgressMeter";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ClientsTrustStrip } from "@/components/clients/ClientsTrustStrip";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { ProposalFloatingBar } from "@/components/proposal/ProposalFloatingBar";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionDivider } from "@/components/common/SectionDivider";
import { AllerProcessSection } from "@/components/home/AllerProcessSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ProjectPreviewShowcase } from "@/components/casestudies/ProjectPreviewShowcase";
import { WinterExpansionDiscountModal } from "@/components/common/WinterExpansionDiscountModal";
import { StardustCursorTrail } from "@/components/common/StardustCursorTrail";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";
import { WorkAutoCarousel } from "@/components/work/WorkAutoCarousel";
import { DevStackGuruSection } from "@/components/services/DevStackGuruSection";
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

  // 10 Curated Flagship Projects for Interactive Auto-Slider
  const flagshipProjects = AGENCY_PROJECTS.slice(0, 10);

  // 4 Core Highlighted Disciplines for Curated Capabilities Preview
  const highlightedServices = AGENCY_SERVICES.slice(0, 4);

  return (
    <SmoothScrollProvider>
      {/* Custom dual cursor with 'INSPECT • EXPLORE' stamp */}
      <CustomCursor />

      {/* Fixed right-edge scroll-linked progress meter */}
      <SutraProgressMeter />

      {/* Theatrical Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Main Experience Container (no scale transform on fixed-nav ancestor) */}
      <div
        className={`relative w-full max-w-full overflow-x-clip transition-opacity duration-700 ease-out bg-transparent text-[#e8e8e3] ${
          preloaderDone ? "opacity-100" : "opacity-90"
        }`}
      >
        {/* Architectural Navigation Bar */}
        <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

        <main className="relative flex flex-col w-full">
          {/* Section 1: Monumental Hero with Three.js 3D Centerpiece */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 2: Executive Capabilities Bento Preview */}
          <section id="services" className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(232,232,227,0.12)] pb-6">
              <div>
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
                    </div>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                      {service.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(232,232,227,0.12)] flex items-center justify-end font-mono">
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

          {/* Section 3: Flagship Works & Projects Preview */}
          <section id="work" className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-24 scroll-mt-24 dm-scroll-reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[rgba(232,232,227,0.12)] pb-6">
              <div>
                <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  PROVEN REVENUE ARCHITECTURES
                </h2>
              </div>

              <BreydaqsButton href="/work" variant="white">
                EXPLORE ALL 50 WORKS
              </BreydaqsButton>
            </div>

            {/* Interactive 3D Auto-Slide Carousel for Featured Works */}
            <div className="w-full py-4">
              <WorkAutoCarousel
                projects={flagshipProjects}
                onOpenPreview={(proj) => {
                  sound.playChime();
                  setActiveProject(proj);
                }}
              />
            </div>
          </section>

          <SectionDivider />

          {/* Section 4: Client Trust Proof Strip */}
          <ClientsTrustStrip />

          {/* Section 5: Exact Aller Studio Clear Process for Complex Products */}
          <AllerProcessSection />

          {/* Section 6: 5-Discipline × 4-Tier Accessible Pricing Architecture */}
          <PricingSection variant="home" onOpenKundli={() => setIsKundliOpen(true)} />

          <SectionDivider />

          {/* Section 7: Engineering & Growth Tech Stack In Orbit */}
          <section className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-20">
            <DevStackGuruSection />
          </section>
        </main>

        {/* Section 8: Wordmark & Architecture Footer */}
        <Footer onOpenKundli={() => setIsKundliOpen(true)} />

        {/* Persistent Floating Bottom Proposal Drawer */}
        <ProposalFloatingBar />
      </div>

      {/* Global Interactive Project Preview Modal Shell */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-preview-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playPluck(120);
              setActiveProject(null);
            }
          }}
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-7xl h-[100dvh] sm:h-[90vh] flex flex-col rounded-none sm:rounded-2xl ios-glass-panel text-white overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border-0 sm:border sm:border-white/20 cursor-default"
          >
            <div className="px-4 py-3 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between font-mono shrink-0">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span id="home-preview-title" className="font-display font-black text-xs uppercase tracking-wider text-white ml-2">
                  {activeProject.client}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-zinc-400">
                  {activeProject.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-1.5 px-3 min-h-[36px] min-w-[44px] rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono cursor-pointer"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ProjectPreviewShowcase
                project={activeProject}
                onClose={() => setActiveProject(null)}
              />
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
