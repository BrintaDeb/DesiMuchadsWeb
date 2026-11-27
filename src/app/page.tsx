"use client";

import React, { useState, useEffect } from "react";
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
import { SectionDivider } from "@/components/common/SectionDivider";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ProjectPreviewShowcase } from "@/components/casestudies/ProjectPreviewShowcase";
import { StardustCursorTrail } from "@/components/common/StardustCursorTrail";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";
import { WorkAutoCarousel } from "@/components/work/WorkAutoCarousel";
import { DevStackGuruSection } from "@/components/services/DevStackGuruSection";
import { ServicesSlideCarousel } from "@/components/services/ServicesSlideCarousel";
import { Two26ServicesRibbonSection } from "@/components/services/Two26ServicesRibbonSection";
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
        className={`relative w-full max-w-full overflow-x-clip transition-opacity duration-700 ease-out bg-transparent text-[#e8e8e3] ${preloaderDone ? "opacity-100" : "opacity-90"
          }`}
      >
        {/* Architectural Navigation Bar */}
        <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

        <main className="relative flex flex-col w-full">
          {/* Section 1: Monumental Hero with Three.js 3D Centerpiece */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 2: Services Showcase */}
          <section id="services" className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-16 sm:py-22 scroll-mt-24 overflow-hidden">
            {/* Subtle Ambient Brass-Gold Stage Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[min(90vw,700px)] h-64 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)] blur-3xl"
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 border-b border-[rgba(232,232,227,0.09)] pb-5">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  What We Do
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <BreydaqsButton href="/services" variant="white">
                  ALL SERVICES
                </BreydaqsButton>
              </div>
            </div>

            <div className="relative z-10">
              <ServicesSlideCarousel
                services={AGENCY_SERVICES}
                onOpenKundli={() => setIsKundliOpen(true)}
              />
            </div>
          </section>

          <SectionDivider />

          {/* Section 3: Flagship Works & Projects Preview */}
          <section id="work" className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 sm:py-24 scroll-mt-24 dm-scroll-reveal">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[rgba(232,232,227,0.09)] pb-5">
              <div>
                <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  Selected Work
                </h2>
              </div>

              <BreydaqsButton href="/work" variant="white">
                VIEW ALL WORK
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

          {/* Section 4: Request Custom Quote & Book Strategy Session */}
          <PricingSection variant="home" onOpenKundli={() => setIsKundliOpen(true)} />

          <SectionDivider />

          {/* Section 5: Scroll-Drawn White Services Ribbon Showcase */}
          <Two26ServicesRibbonSection />

          <SectionDivider />

          {/* Section 6: Engineering & Growth Tech Stack In Orbit */}
          <section className="relative w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
            <DevStackGuruSection />
          </section>

          <SectionDivider />

          {/* Section 7: Category Leaders & Trusted Partners (Below Character Art) */}
          <ClientsTrustStrip />
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

      {/* Liquid Platinum Stardust Particle Cursor Trail */}
      <StardustCursorTrail />
    </SmoothScrollProvider>
  );
}
