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
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Terminal,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { SectionDivider } from "@/components/common/SectionDivider";
import { RoasCalculator } from "@/components/calculator/RoasCalculator";
import { ClientPortalPreview } from "@/components/portal/ClientPortalPreview";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { sound } from "@/lib/sound";

export default function ServicesPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

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
            ["e-commerce", "quick-commerce", "web-development"].includes(s.id)
          );

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black relative overflow-x-hidden">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Services Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 overflow-hidden">
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
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-6">
              Services Engineered For{" "}
              <span className="text-zinc-400 underline decoration-white/20 underline-offset-8">
                Compounding Revenue
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              We do not sell isolated deliverables, generic agency fluff, or vanity impressions.
              Every capability at Desi Muchads is a precision revenue mechanism designed to lower
              CAC, scale blended ROAS, and elevate brand equity with custom engineering and human-crafted creative.
            </p>

            {/* Performance Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">9</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Core In-House Disciplines</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">5.8x</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Average Blended ROAS</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">&lt;0.8s</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">PageSpeed LCP Standard</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">100%</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">In-House Human Craft</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Service Philosophy & Design Theory */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Our Operational Dogma
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight">
              Why Traditional Agency Retainers Fail &amp; How We Fix Them
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-3">
                  1. The Engineering Thesis
                </h3>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  Most ad agencies hire copywriters who don&apos;t know what a Next.js Server Component is, or web devs who don&apos;t understand Meta Pixel CAPI. At Desi Muchads, our growth architects write production code. Faster load speeds equal lower CPMs and higher conversion rates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Third-Party Reliance</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-3">
                  2. Cultural Vernacular Psychology
                </h3>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  Indian consumers do not buy from generic corporate English copy translated via ChatGPT. We engineer high-velocity Hinglish hooks, tier-2 relatable storylines, and visceral emotional resonance that stop the thumb scroll within 1.2 seconds.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Native Cultural Hooks</span>
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-black text-lg text-white uppercase tracking-wide mb-3">
                  3. Net Profit Over Vanity Metrics
                </h3>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  We don&apos;t celebrate &ldquo;impressions&rdquo;, &ldquo;video views&rdquo;, or platform ROAS that disappears once returns and shipping costs are deducted. We optimize directly for Contribution Margin (CM3), First-Party LTV, and bottom-line bank account growth.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Contribution Margin Focused</span>
              </div>
            </SpotlightCard>
          </div>
        </section>

        <SectionDivider />

        {/* 3. Comprehensive Breakdown of All 9 Services */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
                Detailed Capabilities
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                Our 9 Core Revenue Disciplines
              </h2>
            </div>

            {/* Filter Tabs with Silky Mobile Touch Momentum */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 scroll-momentum-x">
              {[
                { id: "all", label: "All Disciplines" },
                { id: "performance", label: "Paid & Search" },
                { id: "creative", label: "Creative & Brand" },
                { id: "tech", label: "Web & E-Com" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sound.playPluck(150);
                    setActiveTab(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="space-y-12">
            {filteredServices.map((service, index) => (
              <SpotlightCard
                key={service.id}
                id={service.id}
                isGlass={true}
                className="scroll-mt-32 p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-all shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Overview & Philosophy */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {getServiceIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                          Discipline 0{index + 1}
                        </span>
                        <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="font-sans text-base sm:text-lg text-zinc-200 font-medium leading-snug">
                      {service.shortDesc}
                    </p>

                    <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                      {service.philosophy}
                    </p>

                    {/* Framework Steps */}
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        Execution Framework
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.framework.slice(0, 4).map((f) => (
                          <div
                            key={f.step}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-[10px] font-bold text-zinc-500">
                                {f.step}
                              </span>
                              <span className="font-display font-bold text-xs text-white uppercase">
                                {f.title}
                              </span>
                            </div>
                            <p className="font-sans text-[11px] text-zinc-400 leading-tight">
                              {f.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deliverables, KPIs & CTA */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-6">
                    <div>
                      {/* Metric Callout Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mb-4">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Target: {service.metric}</span>
                      </div>

                      {/* Deliverables List */}
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
                        Verified Deliverables
                      </span>
                      <ul className="space-y-2 mb-6">
                        {service.specs.deliverables.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technical Specs Details */}
                      <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Turnaround:</span>
                          <span className="text-white font-medium">{service.specs.turnaround}</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Ideal For:</span>
                          <span className="text-white font-medium">{service.specs.bestFor}</span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                          <span>Stack &amp; Tools:</span>
                          <span className="text-white font-medium truncate max-w-[200px]">
                            {service.specs.tools.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Deep Dive Specifications</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => {
                          sound.playChime();
                          setIsKundliOpen(true);
                        }}
                        type="button"
                        className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all"
                      >
                        Audit
                      </button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* 4. Capabilities Matrix */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Cross-Discipline Synthesis
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
              The Fullstack Marketing Machine
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-400">
              When you hire Desi Muchads, our disciplines don&apos;t work in isolated silos. Creative, engineering, and media buying iterate in a continuous feedback loop.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121215]">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-white/5 text-zinc-300 font-mono uppercase tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-4 px-6 font-bold">Discipline</th>
                  <th className="py-4 px-6 font-bold">Primary KPI</th>
                  <th className="py-4 px-6 font-bold">Execution Cadence</th>
                  <th className="py-4 px-6 font-bold">Integration Touchpoint</th>
                  <th className="py-4 px-6 font-bold">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {AGENCY_SERVICES.map((srv) => (
                  <tr key={srv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-display font-bold text-white text-sm">
                      {srv.title}
                    </td>
                    <td className="py-4 px-6 font-mono text-emerald-400 font-medium">
                      {srv.specs.targetKpi}
                    </td>
                    <td className="py-4 px-6 text-zinc-400 font-mono">
                      {srv.specs.turnaround}
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      {srv.specs.bestFor}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="text-white hover:underline font-mono inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <SectionDivider />

        {/* 4. Interactive ROAS & Margin Simulator */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <RoasCalculator onOpenKundli={() => setIsKundliOpen(true)} />
        </section>

        <SectionDivider />

        {/* 5. 90-Day Execution Protocol */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Client Onboarding Protocol
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              From Day 1 Ingestion to Day 90 Scaling
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <span className="font-mono text-xs font-bold text-zinc-500">STAGE 01</span>
              <h3 className="font-display font-black text-lg text-white uppercase">Days 1 - 7: Forensic Audit</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Full pixel CAPI diagnostic, negative keyword purging, landing page speed audit, and creative teardown. Zero ad spend waste permitted.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <span className="font-mono text-xs font-bold text-zinc-500">STAGE 02</span>
              <h3 className="font-display font-black text-lg text-white uppercase">Days 8 - 21: Infrastructure Build</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Rebuilding slow landing pages in Next.js, scripting 12 vernacular video hooks, and setting up clean attribution telemetry.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <span className="font-mono text-xs font-bold text-zinc-500">STAGE 03</span>
              <h3 className="font-display font-black text-lg text-white uppercase">Days 22 - 60: Algorithmic Testing</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Running 3:2:2 dynamic creative testing on Meta ASC+, dialing in Google Search tROAS, and doubling down on winning hooks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <span className="font-mono text-xs font-bold text-zinc-500">STAGE 04</span>
              <h3 className="font-display font-black text-lg text-white uppercase">Days 61 - 90: Sovereign Scale</h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Vertical budget scaling, retargeting fatigue shields, automated dark store push, and unlocking multi-crore monthly revenue runs.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 6. VIP Client Growth Portal Live Preview */}
        <ClientPortalPreview />

        {/* 7. Grand Call to Action */}
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95"
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
