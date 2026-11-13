import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  ChevronRight,
  Quote,
  PhoneCall,
} from "lucide-react";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { MoustacheSVG, FiligreeCorner } from "@/components/common/Icons";
import { KhadiNoiseOverlay } from "@/components/common/KhadiNoiseOverlay";
import { IndianArtBackgroundOverlay } from "@/components/common/IndianArtBackgroundOverlay";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AGENCY_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = AGENCY_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study Not Found" };

  const pageUrl = `https://desimuchads.agency/work/${slug}`;

  return {
    title: `${project.client} Case Study (${project.heroStat}) | DESI MUCHADS ✦ High-ROAS Agency`,
    description: `${project.tagline} Verified Results: ${project.heroStat}. The Mushkil, Jugaad, and Nateeja breakdown by Desi Muchads Digital Growth Squad.`,
    keywords: [
      project.client,
      `${project.client} Case Study`,
      `${project.client} Performance Marketing`,
      `${project.category} Growth Agency India`,
      "Desi Muchads Work",
      "High ROAS Case Study",
      ...project.techStack,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.client} Case Study · ${project.heroStat} | DESI MUCHADS`,
      description: project.tagline,
      url: pageUrl,
      siteName: "DESI MUCHADS",
      images: [
        {
          url: "/brand-logo-white.jpg",
          width: 1200,
          height: 630,
          alt: `${project.client} Case Study - Desi Muchads`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} Case Study · ${project.heroStat} | DESI MUCHADS`,
      description: project.tagline,
      images: ["/brand-logo-white.jpg"],
      creator: "@desimuchads",
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = AGENCY_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = AGENCY_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject =
    AGENCY_PROJECTS[(currentIndex + 1) % AGENCY_PROJECTS.length];
  const matchedService = AGENCY_SERVICES.find((s) => s.id === project.serviceId);

  // Structured Data: Article / CreativeWork Schema
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.client} Case Study: How Desi Muchads Delivered ${project.heroStat}`,
    description: `${project.tagline}. ${project.desc}`,
    author: {
      "@type": "Organization",
      name: "DESI MUCHADS Digital Agency",
      url: "https://desimuchads.agency",
    },
    publisher: {
      "@type": "Organization",
      name: "DESI MUCHADS",
      logo: {
        "@type": "ImageObject",
        url: "https://desimuchads.agency/brand-logo-white.jpg",
      },
    },
    datePublished: "2025-01-15T00:00:00+05:30",
    dateModified: "2026-03-15T00:00:00+05:30",
    mainEntityOfPage: `https://desimuchads.agency/work/${project.slug}`,
    about: {
      "@type": "Organization",
      name: project.client,
    },
    review: {
      "@type": "Review",
      reviewBody: project.testimonial.quote,
      author: {
        "@type": "Person",
        name: project.testimonial.author,
        jobTitle: project.testimonial.role,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    },
  };

  // Structured Data: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Darbar Home",
        item: "https://desimuchads.agency",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio Work",
        item: "https://desimuchads.agency/#karname",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.client,
        item: `https://desimuchads.agency/work/${project.slug}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black font-display overflow-x-hidden">
      {/* Injected Rich Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
              href="/#karname"
              className="text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Case Studies</span>
            </Link>
            {matchedService && (
              <Link
                href={`/services/${matchedService.slug}`}
                className="text-xs font-mono font-medium text-zinc-400 hover:text-white transition-colors hidden sm:inline"
              >
                {matchedService.title}
              </Link>
            )}
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
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Darbar Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/#karname" className="hover:text-white transition-colors">
            Portfolio Work
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-white font-bold">{project.client}</span>
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-black font-metric text-xs font-black tracking-wider uppercase shadow-md">
                {project.heroStat}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-zinc-300">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                {project.year}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-none mb-6">
              {project.client}
            </h1>

            <p className="text-lg sm:text-2xl text-zinc-300 font-medium leading-relaxed font-sans mb-8">
              {project.tagline}
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans max-w-3xl mb-10">
              {project.desc}
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
              {project.stats.map((st, sIdx) => (
                <div key={sIdx} className="text-left">
                  <div className="font-metric font-black text-2xl sm:text-3xl text-white">
                    {st.val}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA & Live Links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-sm font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>OPEN LIVE INTERACTIVE PREVIEW</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              {matchedService && (
                <Link
                  href={`/services/${matchedService.slug}`}
                  className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/15"
                >
                  Explore {matchedService.title} ➔
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Simulated Device Showcase */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#121215] border border-white/15 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-1">
                LIVE INTERACTIVE ENVIRONMENT
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                Platform Architecture Preview
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Edge Host (bom1)</span>
              </span>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-400">
                LCP: 0.62s · 99 PageSpeed
              </span>
            </div>
          </div>

          {/* Browser Shell Frame */}
          <div className="rounded-2xl border border-white/15 bg-black overflow-hidden shadow-2xl">
            {/* Browser Chrome Header */}
            <div className="h-10 px-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-md bg-black/60 border border-white/10 text-zinc-300 text-[11px] truncate max-w-sm flex items-center gap-1.5">
                <span className="text-emerald-400">🔒</span>
                <span>{project.liveUrl.startsWith("/") ? `https://desimuchads.agency${project.liveUrl}` : project.liveUrl}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono flex items-center gap-1"
                  title="Open Live Product Experience"
                >
                  <span>Open Flagship</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Embedded Iframe Container */}
            <div className="relative w-full h-[520px] sm:h-[680px] bg-zinc-950">
              <iframe
                src={project.liveUrl}
                title={`${project.client} Live Showcase`}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </div>

          {/* Anti-AI Pro Developer Architecture Guarantee Strip */}
          <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="text-zinc-400">
              <strong className="text-white">Anti-AI Engineering Guarantee:</strong> Custom Shopify Liquid &amp; Next.js 16 components · Zero generic automated builders · Scaled to ₹140Cr+ GMV.
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline font-bold shrink-0 flex items-center gap-1"
            >
              <span>Explore Live Production Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section 3: The 3 Pillars of Truth (Mushkil, Jugaad, Nateeja) */}
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
              THE STRATEGIC DOSSIER
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase">
              How the Battle Was Won
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Mushkil */}
            <div className="rounded-3xl p-8 bg-[#151214] border border-red-500/20 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center font-mono text-xs font-bold text-red-400">
                01
              </div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-red-400 block">
                THE MUSHKIL (CHALLENGE)
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {project.mushkil}
              </p>
            </div>

            {/* 2. Jugaad */}
            <div className="rounded-3xl p-8 bg-[#121513] border border-emerald-500/20 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                02
              </div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-emerald-400 block">
                THE JUGAAD (STRATEGY)
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {project.jugaad}
              </p>
            </div>

            {/* 3. Nateeja */}
            <div className="rounded-3xl p-8 bg-[#15151a] border border-white/25 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                03
              </div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-white block">
                THE NATEEJA (RESULTS)
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {project.nateeja}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Deliverables & Tech Architecture */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#121215] border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block">
                DELIVERED ARTIFACTS
              </span>
              <h3 className="font-display font-black text-2xl text-white uppercase">
                What Was Engineered
              </h3>
              <ul className="space-y-3 pt-2">
                {project.deliverables.map((deliv, dIdx) => (
                  <li
                    key={dIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-200 font-sans">{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block mb-2">
                  TOOLS &amp; INFRASTRUCTURE
                </span>
                <h3 className="font-display font-black text-2xl text-white uppercase mb-4">
                  Tech Stack Deployed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white font-mono text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Founder Testimonial Card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                <Quote className="w-8 h-8 text-white/10 absolute -top-1 -right-1" />
                <p className="text-sm text-zinc-200 italic font-sans leading-relaxed mb-4">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {project.testimonial.author}
                  </div>
                  <div className="font-mono text-xs text-zinc-400">
                    {project.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Next Project Navigation Bar */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-[#121215] to-[#18181f] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
              CONTINUE EXPLORING PORTFOLIO
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
              Next Case Study: {nextProject.client}
            </h3>
            <p className="text-xs text-zinc-400 font-sans mt-1">
              {nextProject.heroStat} · {nextProject.category}
            </p>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
