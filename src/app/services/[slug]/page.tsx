import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  PhoneCall,
  Search,
  Rocket,
  Magnet,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
} from "lucide-react";
import { AGENCY_SERVICES, ServiceItem } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { MoustacheSVG, FiligreeCorner } from "@/components/common/Icons";
import { KhadiNoiseOverlay } from "@/components/common/KhadiNoiseOverlay";
import { IndianArtBackgroundOverlay } from "@/components/common/IndianArtBackgroundOverlay";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AGENCY_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = AGENCY_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | DESI MUCHADS ✦ High-ROAS Agency`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = AGENCY_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find demo projects matching this service
  const matchedProjects = AGENCY_PROJECTS.filter((p) => p.serviceId === service.id);

  const getServiceIcon = (name: ServiceItem["iconName"]) => {
    const iconClass = "w-7 h-7 text-white";
    switch (name) {
      case "Search":
        return <Search className={iconClass} />;
      case "Rocket":
        return <Rocket className={iconClass} />;
      case "Magnet":
        return <Magnet className={iconClass} />;
      case "Share2":
        return <Share2 className={iconClass} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconClass} />;
      case "Zap":
        return <Zap className={iconClass} />;
      case "Code2":
        return <Code2 className={iconClass} />;
      case "Package":
        return <Package className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black font-display overflow-x-hidden">
      {/* Background textures */}
      <KhadiNoiseOverlay />
      <IndianArtBackgroundOverlay />

      {/* Top Floating Glass Navigation Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <div className="w-7 h-5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <MoustacheSVG className="w-full h-full fill-current" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-royal text-sm font-bold tracking-widest text-white uppercase">
                DESI MUCHADS
              </span>
              <span className="font-mono text-[9px] text-zinc-400 tracking-wider">
                BACK TO DARBAR
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#services"
              className="text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Capabilities</span>
            </Link>
            <Link
              href="/#karname"
              className="text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors hidden sm:inline"
            >
              Portfolio Work
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20Desi%20Muchads%2C%20let%27s%20discuss%20our%20strategy."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-md flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Book Baithak</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Darbar Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/#services" className="hover:text-white transition-colors">
            Capabilities
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-white font-bold">{service.title}</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-[#121215] border border-white/15 border-t-white/30 shadow-2xl overflow-hidden">
          {/* Filigree decorative corners */}
          <div className="absolute top-4 left-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-6 h-6 text-white" position="top-left" />
          </div>
          <div className="absolute top-4 right-4 opacity-30 pointer-events-none">
            <FiligreeCorner className="w-6 h-6 text-white" position="top-right" />
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{service.metric}</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none mb-6">
              {service.title}
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-300 font-medium leading-relaxed font-sans mb-8">
              {service.shortDesc}
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-3xl mb-10">
              {service.fullDesc}
            </p>

            {/* Turnaround & SLA Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{service.specs.turnaround}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Target: {service.specs.targetKpi}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/919876543210?text=Hi%20Desi%20Muchads%2C%20let%27s%20discuss%20our%20strategy."
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-sm font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>CLAIM FREE STRATEGY AUDIT</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#demo-projects"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/15"
              >
                Explore Demo Projects ({matchedProjects.length})
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: Strategic Edge & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
              THE MUCHADS ADVANTAGE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
              Why Ordinary Agencies Fail &amp; How We Deliver Compounding ROI
            </h2>
          </div>
          <div className="lg:col-span-7 rounded-2xl p-8 bg-[#121215] border border-white/10 text-zinc-300 leading-relaxed font-sans text-sm sm:text-base space-y-4 shadow-xl">
            <p>{service.philosophy}</p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300">
                <strong className="text-white block font-sans text-sm mb-1">
                  Ideal Client Profile:
                </strong>
                {service.specs.bestFor}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 5-Stage Execution Framework */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              METHODICAL BLUEPRINT
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              The 5-Stage Execution Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.framework.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 bg-[#121215] border border-white/10 border-t-white/25 flex flex-col justify-between hover:border-white/30 hover:bg-[#16161b] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center font-mono text-xs font-black text-amber-400 mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display font-black text-base text-white uppercase mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Full Deliverables & Tech Architecture */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#121215] border border-white/15 shadow-2xl">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              ZERO-AMBIGUITY SCOPE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              Full Deliverables &amp; Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Deliverables Checklist */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Core Deliverables Included:
              </h3>
              <ul className="space-y-3">
                {service.specs.deliverables.map((item, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-200 font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Tooling & Tech Architecture */}
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300 mb-3">
                  Tools &amp; Platform Architecture:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.specs.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block font-bold">
                  Target SLA &amp; Commitment:
                </span>
                <p className="text-sm text-white font-sans font-medium">
                  {service.specs.turnaround} with live daily portal dashboards and 100% full account ownership.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Real Showcase Projects (Human-Grade Demos) */}
        <div id="demo-projects" className="space-y-8 scroll-mt-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-white font-mono text-xs uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>REAL CLIENT PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase">
              Demonstrated Case Studies
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-sans mt-2 max-w-2xl">
              Inspect the real strategic breakdowns, metrics, and live platforms engineered by Desi Muchads for this capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matchedProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                borderColor="rgba(255, 255, 255, 0.4)"
                className="group rounded-3xl p-6 sm:p-8 bg-[#121215] border border-white/10 hover:border-white/30 flex flex-col justify-between shadow-xl transition-all"
              >
                <div>
                  {/* Hero Stat & Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white text-black font-metric text-xs font-black tracking-wider uppercase shadow-md">
                      {project.heroStat}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white uppercase mb-2">
                    {project.client}
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* The Problem & Solution Breakdown */}
                  <div className="space-y-3 pt-3 border-t border-white/10 mb-6">
                    <div>
                      <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold block mb-1">
                        THE MUSHKIL (CHALLENGE):
                      </span>
                      <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                        {project.mushkil}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block mb-1">
                        THE JUGAAD (STRATEGY):
                      </span>
                      <p className="text-xs text-zinc-400 line-clamp-2 font-sans">
                        {project.jugaad}
                      </p>
                    </div>
                  </div>

                  {/* 4 Performance Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    {project.stats.slice(0, 4).map((st, sIdx) => (
                      <div key={sIdx}>
                        <div className="font-metric font-black text-base text-white">
                          {st.val}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-400 uppercase">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link to Full Case Study */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:underline uppercase font-sans"
                  >
                    <span>Inspect Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"
                    title="Live Web Preview"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Section 6: Retainer Packages */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              TRANSPARENT HISAB-KITAB
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              Service Retainer Packages
            </h2>
            <p className="text-zinc-400 text-sm font-sans mt-2">
              Predictable, flat monthly investment with dedicated engineering and zero hidden markups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {service.packages.map((pkg, pIdx) => (
              <SpotlightCard
                key={pIdx}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                borderColor="rgba(255, 255, 255, 0.4)"
                className="rounded-3xl p-8 bg-[#121215] border border-white/10 hover:border-white/30 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <h3 className="font-display font-black text-2xl text-white uppercase mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-white/10">
                    <span className="font-metric font-black text-4xl text-white">
                      {pkg.price}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">/{pkg.period}</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-sans mb-6 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {pkg.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/919876543210?text=Hi%20Desi%20Muchads%2C%20I%20want%20to%20discuss%20the%20${encodeURIComponent(
                    pkg.name
                  )}%20for%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all text-center"
                >
                  DEPLOY THIS PACKAGE
                </a>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Section 7: FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              CLARITY FIRST
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl p-6 bg-[#121215] border border-white/10 space-y-2"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <h3 className="font-display font-bold text-base text-white">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white text-black text-center max-w-4xl mx-auto space-y-6 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
          <span className="font-mono text-xs font-black uppercase tracking-widest text-zinc-800">
            RADICAL TRANSPARENCY · NO COMMISSIONS · NO LOCK-IN
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase leading-tight">
            Ready to scale {service.title} for your brand?
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base font-sans max-w-xl mx-auto">
            Book a direct strategy baithak with our senior growth architects. We audit your current accounts, pinpoint leakage points, and deliver your 90-day scaling roadmap.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/919876543210?text=Hi%20Desi%20Muchads%2C%20let%27s%20discuss%20our%20strategy."
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-display text-xs font-black tracking-widest uppercase transition-all"
            >
              SCHEDULE CHAI BAITHAK
            </a>
            <Link
              href="/#services"
              className="px-8 py-4 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              Explore Other Services
            </Link>
          </div>
        </div>
      </main>

      {/* Footer Credentials */}
      <footer className="mt-20 border-t border-white/10 py-10 px-4 text-center text-xs font-mono text-zinc-500">
        <p>UNIT OF DESI MUCHADS DIGITAL LLP · GSTIN: 07AAECD5582M1ZX · CIN: U74999DL2024PTC412891</p>
        <p className="mt-2">© 2025 DESI MUCHADS. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
