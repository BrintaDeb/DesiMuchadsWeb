"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Crown,
  Sparkles,
  ArrowRight,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionDivider } from "@/components/common/SectionDivider";
import { ServicesSlideCarousel } from "@/components/services/ServicesSlideCarousel";
import { InteractiveServicesShowcase } from "@/components/services/InteractiveServicesShowcase";
import { DevStackGuruSection } from "@/components/services/DevStackGuruSection";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function ServicesPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"interactive" | "carousel" | "grid">("interactive");

  const getServiceIcon = (iconName: string) => {
    const iconStyle = "w-6 h-6 text-white";
    switch (iconName) {
      case "Crown":
        return <Crown className={iconStyle} />;
      case "Rocket":
        return <Rocket className={iconStyle} />;
      case "Share2":
        return <Share2 className={iconStyle} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconStyle} />;
      case "Zap":
        return <Zap className={iconStyle} />;
      case "Code2":
        return <Code2 className={iconStyle} />;
      case "Package":
        return <Package className={iconStyle} />;
      default:
        return <Sparkles className={iconStyle} />;
    }
  };

  const filteredServices =
    activeTab === "all"
      ? AGENCY_SERVICES
      : activeTab === "performance"
        ? AGENCY_SERVICES.filter((s) =>
            ["meta-google-ads", "social-media"].includes(s.id)
          )
        : activeTab === "creative"
          ? AGENCY_SERVICES.filter((s) =>
              ["branding", "packaging-label"].includes(s.id)
            )
          : AGENCY_SERVICES.filter((s) =>
              ["ecommerce-services", "quick-commerce", "web-development"].includes(s.id)
            );

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Concise Services Hero Header */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 overflow-hidden text-left">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 mb-5">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-white font-bold">Services &amp; What We Do</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.04]">
              Services &amp;{" "}
              <span className="text-zinc-300 underline decoration-white/25 underline-offset-8">
                What We Do
              </span>
            </h1>
          </div>
        </section>

        <SectionDivider />

        {/* 2. View Mode Toolbar */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8 text-left">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121215] border border-white/10 shadow-lg">
            {viewMode !== "interactive" ? (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {[
                  { id: "all", label: `All (${String(AGENCY_SERVICES.length).padStart(2, "0")})` },
                  { id: "performance", label: "Ads & Social (02)" },
                  { id: "creative", label: "Branding & Packaging (02)" },
                  { id: "tech", label: "Web & Commerce (03)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      sound.playPluck(150);
                      setActiveTab(tab.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-zinc-300 hover:text-white bg-white/[0.03] border border-white/10 hover:border-white/25"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-bold">
                SELECT ANY SERVICE TO INSPECT DELIVERABLES
              </div>
            )}

            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(165);
                  setViewMode("interactive");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "interactive"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Board</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(170);
                  setViewMode("carousel");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "carousel"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>3D Slider</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(175);
                  setViewMode("grid");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Services Interactive Stage (Strict Service + What We Do Only) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8">
          <h2 className="sr-only">Agency Services and What We Do</h2>
          {viewMode === "interactive" ? (
            <InteractiveServicesShowcase
              services={AGENCY_SERVICES}
              onOpenKundli={() => setIsKundliOpen(true)}
            />
          ) : viewMode === "carousel" ? (
            <ServicesSlideCarousel
              services={filteredServices}
              onOpenKundli={() => setIsKundliOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredServices.map((service, index) => (
                <SpotlightCard
                  key={service.id}
                  id={service.id}
                  isGlass={true}
                  maxTilt={3}
                  onMouseEnter={() => sound.playPluck(130 + index * 12)}
                  className="p-6 sm:p-7 rounded-3xl border border-white/12 hover:border-white/30 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/12 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#F3E5AB] font-bold tabular-nums">
                        0{index + 1} · WHAT WE DO
                      </span>
                    </div>

                    <h3 className="font-display font-black text-xl text-white uppercase tracking-tight">
                      {service.title}
                    </h3>

                    <ul className="space-y-2 pt-1">
                      {service.specs.deliverables.map((d, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start gap-2 text-xs text-zinc-200 font-sans leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex-1 py-2.5 px-4 min-h-[42px] rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>What We Do</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => {
                        sound.playChime();
                        setIsKundliOpen(true);
                      }}
                      type="button"
                      className="py-2.5 px-3 min-h-[42px] rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Audit
                    </button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </section>

        <SectionDivider />

        {/* Interactive Next.js & Agency Tech Stack Showcase */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
          <DevStackGuruSection />
        </section>

        <SectionDivider />

        {/* 4. Concise Bottom CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 text-center space-y-6 shadow-2xl">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Start Your Execution Sprint
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  sound.playChime();
                  setIsKundliOpen(true);
                }}
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 min-h-[46px] rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer"
              >
                REQUEST BRAND AUDIT &gt;
              </button>

              <Link
                href="/contact#session"
                className="w-full sm:w-auto px-8 py-3.5 min-h-[46px] rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center"
              >
                BOOK STRATEGY SESSION
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </div>
  );
}
