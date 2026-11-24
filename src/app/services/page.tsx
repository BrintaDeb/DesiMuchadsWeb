"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Rocket,
  Magnet,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionDivider } from "@/components/common/SectionDivider";
import { ServicesSlideCarousel } from "@/components/services/ServicesSlideCarousel";
import { AGENCY_SERVICES, ServiceItem } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function ServicesPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");

  const getServiceIcon = (iconName: string) => {
    const iconStyle = "w-6 h-6 text-white";
    switch (iconName) {
      case "Search":
        return <Search className={iconStyle} />;
      case "Rocket":
        return <Rocket className={iconStyle} />;
      case "Magnet":
        return <Magnet className={iconStyle} />;
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
      case "TrendingUp":
        return <TrendingUp className={iconStyle} />;
      default:
        return <Sparkles className={iconStyle} />;
    }
  };

  const filteredServices =
    activeTab === "all"
      ? AGENCY_SERVICES
      : activeTab === "performance"
        ? AGENCY_SERVICES.filter((s) =>
          ["seo-sem", "performance-marketing", "lead-generation", "unit-economics"].includes(s.id)
        )
        : activeTab === "creative"
          ? AGENCY_SERVICES.filter((s) =>
            ["social-media", "packaging-label"].includes(s.id)
          )
          : AGENCY_SERVICES.filter((s) =>
            ["ecommerce-services", "quick-commerce", "web-development"].includes(s.id)
          );

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Services Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden text-left">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">Services &amp; Capabilities</span>
          </div>

          <div className="max-w-4xl">
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase leading-[1.04] mb-6">
              Precision Disciplines For{" "}
              <span className="text-zinc-400 underline decoration-white/20 underline-offset-8">
                Compounding Revenue
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              We do not sell generic deliverables, bloated agency retainers, or vanity impressions.
              Every capability at Desi Muchads is a precision revenue mechanism designed to lower
              CAC, scale blended ROAS, and elevate brand equity with custom engineering and human-crafted creative.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Interactive Controls Toolbar: Category Filters & View Mode Switcher */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 text-left">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121215] border border-white/10 shadow-lg">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {[
                { id: "all", label: "All Disciplines (09)" },
                { id: "performance", label: "Paid & Search (04)" },
                { id: "creative", label: "Creative & Brand (02)" },
                { id: "tech", label: "Commerce & Web (03)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playPluck(150);
                    setActiveTab(tab.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/15"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher: 3D Sliding Carousel vs Bento Grid */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(170);
                  setViewMode("carousel");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "carousel"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>3D Slider</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(170);
                  setViewMode("grid");
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento Grid</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Core Presentation Stage */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8">
          {viewMode === "carousel" ? (
            /* Mode A: Aller Studio Style 3D Sliding Picture Carousel */
            <ServicesSlideCarousel
              services={filteredServices}
              onOpenKundli={() => setIsKundliOpen(true)}
            />
          ) : (
            /* Mode B: Clean Luxury Bento Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredServices.map((service, index) => (
                <SpotlightCard
                  key={service.id}
                  id={service.id}
                  isGlass={true}
                  className="p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/25 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                        0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                        {service.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-300 font-medium leading-snug mt-1.5">
                        {service.shortDesc}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {service.philosophy}
                    </p>

                    {/* Deliverable Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {service.specs.deliverables.slice(0, 3).map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-300 font-mono text-[10px]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => {
                        sound.playChime();
                        setIsKundliOpen(true);
                      }}
                      type="button"
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
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

        {/* 4. Grand Call to Action */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Ready to Upgrade to Real Performance Architecture?
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Drop your store URL or ad account metrics. We will pinpoint your 3 biggest conversion leaks and present a 90-day scaling roadmap before you spend a single rupee with us.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  sound.playChime();
                  setIsKundliOpen(true);
                }}
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
              >
                REQUEST FREE BRAND GROWTH AUDIT &gt;
              </button>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                VIEW RETAINER TIERS
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
