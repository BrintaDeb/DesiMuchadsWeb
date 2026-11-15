"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Eye,
  TrendingUp,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Palette,
  Code2,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SectionDivider } from "@/components/common/SectionDivider";
import { ProjectPreviewShowcase } from "@/components/casestudies/ProjectPreviewShowcase";
import { AGENCY_PROJECTS, ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/sound";

const FILTER_PILLS = [
  { id: "all", label: "All Works (50)" },
  { id: "graphic-design", label: "Graphic Design (10)" },
  { id: "illustrations-art", label: "Illustrations & Sketches (10)" },
  { id: "web-development", label: "Fullstack Web & Apps (11)" },
  { id: "social-media", label: "Social Media & Video (7)" },
  { id: "demos", label: "High-Velocity Demos (16)" },
  { id: "seo-sem", label: "SEO & Growth (3)" },
];

export default function WorkPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const isDemoProject = (p: ProjectItem) =>
    p.liveUrl.startsWith("/demos/") ||
    p.serviceId === "ecommerce-services" ||
    p.serviceId === "quick-commerce";

  const filteredProjects = useMemo(() => {
    return AGENCY_PROJECTS.filter((proj) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "demos") {
        matchesCategory = isDemoProject(proj);
      } else if (selectedCategory !== "all") {
        matchesCategory = proj.serviceId === selectedCategory;
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          proj.client.toLowerCase().includes(q) ||
          proj.tagline.toLowerCase().includes(q) ||
          proj.category.toLowerCase().includes(q) ||
          proj.techStack.some((t) => t.toLowerCase().includes(q));
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenPreview = (proj: ProjectItem) => {
    sound.playChime();
    setActiveProject(proj);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-white selection:text-black">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24">
        {/* 1. Header Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">Selected Works &amp; Case Studies</span>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider uppercase text-zinc-300 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>50 Verified Production Architectures &amp; Master Artworks</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-6">
              Our Karname:{" "}
              <span className="text-zinc-400 underline decoration-white/20 underline-offset-8">
                Work That Converts
              </span>
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl mb-8">
              Explore our full portfolio of bespoke graphic designs, fine art sketches,
              high-performance Next.js web applications, viral social media campaigns, and
              interactive high-velocity e-commerce storefronts.
            </p>

            {/* Portfolio Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">50</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Total Master Works</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">₹14.8Cr+</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Verified Client GMV</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">5.8x</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Average Blended ROAS</span>
              </div>
              <div className="p-3">
                <span className="block font-metric font-black text-2xl sm:text-3xl text-white">0%</span>
                <span className="text-xs text-zinc-400 font-sans mt-0.5 block">Generic AI Slop</span>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Filter & Instant Search Tool Bar */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121215] border border-white/10">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    sound.playPluck(150);
                    setSelectedCategory(pill.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                    selectedCategory === pill.id
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/15"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Instant Search Bar */}
            <div className="relative shrink-0 w-full lg:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works, brands, tags..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 3. The Work Grid (50 Works) */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-[#121215] border border-white/10 p-8 space-y-4">
              <Compass className="w-10 h-10 text-zinc-500 mx-auto" />
              <h3 className="font-display font-bold text-lg text-white uppercase">
                No Projects Found Matching Your Criteria
              </h3>
              <p className="text-xs font-mono text-zinc-400 max-w-md mx-auto">
                Try clearing your search query or selecting another discipline filter pill above.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold font-mono uppercase"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="group relative rounded-2xl bg-[#121215] border border-white/10 hover:border-white/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl"
                >
                  {/* Project Media Thumbnail */}
                  <div
                    onClick={() => handleOpenPreview(proj)}
                    className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                  >
                    <img
                      src={proj.thumbnail}
                      alt={proj.client}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-200">
                        {proj.category}
                      </span>
                      {isDemoProject(proj) && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300">
                          LIVE DEMO
                        </span>
                      )}
                    </div>

                    {/* Hover Preview Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenPreview(proj);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>PREVIEW NOW</span>
                      </button>

                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-black/80 text-white border border-white/20 hover:border-white transition-all"
                          title="Open Live Platform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    {/* Bottom Metric Strip on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-metric font-bold text-white bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/20">
                        {proj.heroStat}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-300">
                        {proj.stats[0]?.val || proj.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          {proj.year}
                        </span>
                      </div>

                      <h3
                        onClick={() => handleOpenPreview(proj)}
                        className="font-display font-black text-lg text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        {proj.client}
                      </h3>

                      <p className="font-sans text-xs text-zinc-400 leading-snug mt-1.5 line-clamp-2">
                        {proj.tagline}
                      </p>
                    </div>

                    {/* Tag Pills */}
                    <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                      {proj.techStack.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-zinc-400 font-mono text-[9.5px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenPreview(proj)}
                        className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Inspect Work</span>
                      </button>

                      <Link
                        href={`/work/${proj.slug}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all"
                        title="View Full Case Study"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <SectionDivider />

        {/* 4. Creative Engineering Philosophy */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-20">
          <div className="mb-12">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-zinc-400 block mb-2">
              Portfolio Philosophy
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Why We Showcase Live Architectures &amp; Fine Art
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <Palette className="w-8 h-8 text-white mb-2" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                1. Human Soul In Every Brushstroke
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                We believe fine art, bespoke illustrations, and high-craft typography evoke trust that programmatic AI templates will never replicate. Every brand we touch receives hand-crafted visual gravitas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <Code2 className="w-8 h-8 text-white mb-2" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                2. Sub-Second Code Execution
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Our web storefronts aren&apos;t bloated Shopify themes bogged down by 40 unoptimized apps. We build bespoke Next.js and Tailwind stores that hit 99 PageSpeed scores, slashing bounce rates by 68%.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121215] border border-white/10 space-y-3">
              <TrendingUp className="w-8 h-8 text-white mb-2" />
              <h3 className="font-display font-black text-lg text-white uppercase">
                3. High-Velocity Commercial Validation
              </h3>
              <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                Every demo storefront in this portfolio is a fully functional business prototype featuring realistic checkout flows, cart sliders, dark store ingestion, and calculated ROAS triggers.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Direct CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Commission A Production Architecture</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Want Your Brand Featured in Our Next Success Story?
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              We take on a maximum of 4 new brand scaling partners per quarter to maintain our obsession with obsessive craft and extraordinary ROAS.
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
                START A CONVERSATION &gt;
              </button>

              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                EXPLORE ALL SERVICES
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Global Interactive Project Preview Modal Shell */}
      {activeProject && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[94dvh] sm:h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl ios-glass-panel text-white overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border border-white/20">
            <div className="px-4 py-3 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setActiveProject(null)}
                  className="w-3 h-3 rounded-full bg-[#FF5F56] cursor-pointer"
                  title="Close Preview"
                />
                <span className="font-display font-black text-xs uppercase tracking-wider text-white ml-2">
                  {activeProject.client}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono"
              >
                CLOSE ✕
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ProjectPreviewShowcase project={activeProject} />
            </div>
          </div>
        </div>
      )}

      <Footer onOpenKundli={() => setIsKundliOpen(true)} />

      <BrandKundliModal
        isOpen={isKundliOpen}
        onClose={() => setIsKundliOpen(false)}
      />
    </div>
  );
}
