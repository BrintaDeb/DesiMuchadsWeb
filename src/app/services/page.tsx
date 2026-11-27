"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
import {
  ServicesSlideCarousel,
  SERVICE_HERO_IMAGES,
} from "@/components/services/ServicesSlideCarousel";
import { DevStackGuruSection } from "@/components/services/DevStackGuruSection";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function ServicesPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

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

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-200">Services</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.04]">
              Services
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light font-sans">
              Performance marketing, commerce systems, and visual craft.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* 2. View Mode Toolbar */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8 text-left">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: "all", label: `All (${String(AGENCY_SERVICES.length).padStart(2, "0")})` },
                { id: "performance", label: "Growth" },
                { id: "creative", label: "Brand" },
                { id: "tech", label: "Commerce" },
              ].map((tab) => {
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      sound.playPluck(150);
                      setActiveTab(tab.id);
                    }}
                    className={`relative px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer touch-manipulation ${
                      isTabActive
                        ? "text-black font-semibold"
                        : "text-zinc-400 hover:text-white bg-white/[0.02] border border-white/[0.08]"
                    }`}
                  >
                    {isTabActive && (
                      <motion.span
                        layoutId="dm-srvpage-tab"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-white"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/[0.08] shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(170);
                  setViewMode("carousel");
                }}
                className={`relative px-3.5 py-1.5 min-h-[36px] rounded-lg text-xs font-mono uppercase transition-colors flex items-center gap-2 cursor-pointer touch-manipulation ${
                  viewMode === "carousel"
                    ? "text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {viewMode === "carousel" && (
                  <motion.span
                    layoutId="dm-srvpage-mode"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-white"
                  />
                )}
                <SlidersHorizontal className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">3D</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(175);
                  setViewMode("grid");
                }}
                className={`relative px-3.5 py-1.5 min-h-[36px] rounded-lg text-xs font-mono uppercase transition-colors flex items-center gap-2 cursor-pointer touch-manipulation ${
                  viewMode === "grid"
                    ? "text-black font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {viewMode === "grid" && (
                  <motion.span
                    layoutId="dm-srvpage-mode"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-white"
                  />
                )}
                <LayoutGrid className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Grid</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Services Showcase */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8">
          <h2 className="sr-only">Agency Services and What We Do</h2>
          {viewMode === "carousel" ? (
            <ServicesSlideCarousel
              services={filteredServices}
              onOpenKundli={() => setIsKundliOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
              {filteredServices.map((service, index) => {
                const heroImg =
                  SERVICE_HERO_IMAGES[service.slug] ||
                  SERVICE_HERO_IMAGES[service.id] ||
                  "/projects/snacknation-hero.jpg";

                return (
                  <SpotlightCard
                    key={service.id}
                    id={service.id}
                    isGlass={true}
                    spotlightColor="rgba(212, 175, 55, 0.08)"
                    maxTilt={2}
                    onMouseEnter={() => sound.playPluck(130 + index * 12)}
                    className="group rounded-3xl border border-white/[0.08] hover:border-white/25 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="relative h-36 w-full overflow-hidden border-b border-white/[0.07]">
                        <img
                          src={heroImg}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-65"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/55 to-black/20" />
                        <div className="absolute top-3.5 inset-x-4 flex items-center justify-between gap-2">
                          <div className="w-9 h-9 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0">
                            {getServiceIcon(service.iconName)}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#F3E5AB]">
                            {service.metric}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                          {service.title}
                        </h3>

                        <ul className="space-y-1.5">
                          {service.specs.deliverables.slice(0, 3).map((d, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-2 text-xs text-zinc-400 font-sans leading-snug"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#F3E5AB]/80 shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3.5 border-t border-white/[0.07] flex items-center justify-between gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 py-2.5 px-4 min-h-[40px] rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-bold tracking-wider uppercase text-center transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => {
                          sound.playChime();
                          setIsKundliOpen(true);
                        }}
                        type="button"
                        className="py-2.5 px-3 min-h-[40px] rounded-xl bg-transparent hover:bg-white/[0.06] border border-white/12 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer touch-manipulation"
                      >
                        Audit
                      </button>
                    </div>
                  </SpotlightCard>
                );
              })}
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
