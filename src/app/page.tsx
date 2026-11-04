"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { KhadiNoiseOverlay } from "@/components/common/KhadiNoiseOverlay";
import { CustomCursor } from "@/components/common/CustomCursor";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { RoiCalculator } from "@/components/calculator/RoiCalculator";
import { CaseStudiesSection } from "@/components/casestudies/CaseStudiesSection";
import { MethodologySection } from "@/components/methodology/MethodologySection";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* Tactile Khadi handmade paper noise texture overlay */}
      <KhadiNoiseOverlay />

      {/* Custom dual cursor with 'DEKHO • EXPLORE' stamp */}
      <CustomCursor />

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
          {/* Section 2: Monumental Hero */}
          <HeroSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 3: 6 Pillars Darbar Bento Grid */}
          <ServicesSection onOpenKundli={() => setIsKundliOpen(true)} />

          {/* Section 4: Real-time Hisab-Kitab ROAS Simulator */}
          <RoiCalculator />

          {/* Section 5: Editorial Case Studies in Jharokha Frames */}
          <CaseStudiesSection />

          {/* Section 6: Chai to Conversion Methodology */}
          <MethodologySection />
        </main>

        {/* Section 8: Royal Seal & Wordmark Footer */}
        <Footer onOpenKundli={() => setIsKundliOpen(true)} />
      </div>

      {/* Section 7: Free Brand Kundli 3-Step Multi-Stage Audit Wizard Modal */}
      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
