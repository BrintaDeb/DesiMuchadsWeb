"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { KhadiNoiseOverlay } from "@/components/common/KhadiNoiseOverlay";
import { CustomCursor } from "@/components/common/CustomCursor";
import { SutraProgressMeter } from "@/components/common/SutraProgressMeter";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { BaiscopeShowcase } from "@/components/baiscope/BaiscopeShowcase";
import { ServicesSection } from "@/components/services/ServicesSection";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { AdPostMortemSection } from "@/components/adpostmortem/AdPostMortemSection";
import { CaseStudiesSection } from "@/components/casestudies/CaseStudiesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { TwirlEasterEgg } from "@/components/easteregg/TwirlEasterEgg";
import { MethodologySection } from "@/components/methodology/MethodologySection";
import { BrandKundliScanner } from "@/components/scanner/BrandKundliScanner";
import { ClientPortalPreview } from "@/components/portal/ClientPortalPreview";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { ProposalFloatingBar } from "@/components/proposal/ProposalFloatingBar";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* Tactile Khadi handmade paper noise texture overlay */}
      <KhadiNoiseOverlay />

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
        {/* Floating Glassmorphic Pill Navigation with Theme & Sonic Toggles */}
        <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

        <main className="relative flex flex-col">
          {/* Section 1: Monumental Hero with Three.js 3D Moustache & Mudras */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 2: The Royal Baiscope (Bioscope Viewfinder Showreel & Telemetry) */}
          <BaiscopeShowcase />

          {/* Section 3: The 6 Pillars Darbar Bento Grid */}
          <ServicesSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 4: Real-time Hisab-Kitab ROAS Simulator */}
          <RoiCalculator />

          {/* Section 5: Ad Post-Mortem Before/After Draggable Slider with 4 Golden Pins */}
          <AdPostMortemSection />

          {/* Section 6: Editorial Case Studies in Jharokha Frames with Liquid Ripple Shader */}
          <CaseStudiesSection />

          {/* Section 7: 3-Tier Retainers & "Build Your Marketing Thali" Platter Configurator */}
          <PricingSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 8: Interactive Spring-Physics "Twirl the Muchh" Easter Egg */}
          <TwirlEasterEgg onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 9: Chai to Conversion Methodology */}
          <MethodologySection />

          {/* Section 10: Live AI Brand Kundli Diagnostic Scanner */}
          <BrandKundliScanner />

          {/* Section 11: "Inside the Darbar" Interactive Client Portal Preview */}
          <ClientPortalPreview />
        </main>

        {/* Section 12: Royal Seal & Kinetic Wordmark Footer */}
        <Footer onOpenKundli={() => setIsKundliOpen(true)} />

        {/* Persistent Floating Bottom Proposal Drawer with Dynamic WhatsApp & Chai Call */}
        <ProposalFloatingBar />
      </div>

      {/* Free Brand Kundli 3-Step Multi-Stage Audit Wizard Modal */}
      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
