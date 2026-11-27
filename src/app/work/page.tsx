"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Eye,
  ChevronRight,
  Maximize2,
  Compass,
  LayoutGrid,
  ListFilter,
  SlidersHorizontal,
  Film,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandKundliModal } from "@/components/kundli/BrandKundliModal";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import { ProjectPreviewShowcase } from "@/components/casestudies/ProjectPreviewShowcase";
import { WorkAutoCarousel } from "@/components/work/WorkAutoCarousel";
import { AGENCY_PROJECTS, ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/sound";

const FILTER_PILLS = [
  { id: "all", label: "All Works (50)" },
  { id: "graphic-design", label: "Graphic Design (10)" },
  { id: "illustrations-art", label: "Illustrations & Sketches (10)" },
  { id: "web-development", label: "Fullstack Web & Apps (11)" },
  { id: "social-media", label: "Social Media & Video (7)" },
  { id: "demos", label: "High-Velocity Demos (16)" },
  { id: "meta-google-ads", label: "Meta & Google Growth (4)" },
];

function WorkThumbnailMedia({
  project,
  isHovered,
}: {
  project: ProjectItem;
  isHovered: boolean;
}) {
  return (
    <>
      <img
        src={project.thumbnail}
        alt={project.client}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {project.heroVideo && isHovered && (
        <video
          src={project.heroVideo}
          poster={project.thumbnail}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover animate-in fade-in duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
    </>
  );
}

export default function WorkPage() {
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"preview" | "theory">("preview");
  const [viewMode, setViewMode] = useState<"carousel" | "grid" | "showcase">("carousel");
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      } else if (selectedCategory === "meta-google-ads") {
        matchesCategory = ["meta-google-ads", "performance-marketing", "seo-sem"].includes(proj.serviceId);
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
    setActiveModalTab("preview");
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-clip bg-transparent text-white selection:bg-white selection:text-black">
      <Navbar onOpenKundli={() => setIsKundliOpen(true)} />

      <main className="pt-24 sm:pt-28 md:pt-32 pb-24 max-w-full overflow-x-clip">
        {/* 1. Header Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 overflow-hidden text-left">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[250px] sm:h-[350px] bg-white/[0.03] blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-white font-bold">Selected Works &amp; Case Studies</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.04] mb-3">
              Selected Work
            </h1>

            <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl mb-6">
              Web platforms, commerce engines, social campaigns, and visual identity archives.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* 2. Filter, Instant Search & View Mode Switcher Toolbar */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 text-left">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#121215] border border-white/10 shadow-lg">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {FILTER_PILLS.map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => {
                    sound.playPluck(150);
                    setSelectedCategory(pill.id);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${selectedCategory === pill.id
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/15"
                    }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Right Tools: View Mode Toggle & Instant Search */}
            <div className="flex items-center gap-3 shrink-0">
              {/* View Mode Toggle Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(140);
                    setViewMode("carousel");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "carousel"
                    ? "bg-white text-black shadow"
                    : "text-zinc-400 hover:text-white"
                    }`}
                  title="Interactive 3D Auto-Slider"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Auto-Slider</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(150);
                    setViewMode("grid");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "grid"
                    ? "bg-white text-black shadow"
                    : "text-zinc-400 hover:text-white"
                    }`}
                  title="Grid Bento View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(160);
                    setViewMode("showcase");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${viewMode === "showcase"
                    ? "bg-white text-black shadow"
                    : "text-zinc-400 hover:text-white"
                    }`}
                  title="Cinematic Showcase View"
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Showcase</span>
                </button>
              </div>

              {/* Instant Search Bar */}
              <div className="relative shrink-0 w-full sm:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="workSearchInput"
                  name="workSearchInput"
                  type="text"
                  aria-label="Search works, brands, tags"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search works, brands, tags..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/40 transition-all font-mono"
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
          </div>
        </section>

        {/* 4. The Work Showcase (50 Works in Auto-Slider, Grid, or Showcase View) */}
        <section id="featured" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 text-left">
          <h2 className="sr-only">Portfolio Works</h2>
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
          ) : viewMode === "carousel" ? (
            /* Mode C: Interactive Auto-Slide 3D Carousel */
            <div className="w-full py-4">
              <WorkAutoCarousel
                projects={filteredProjects}
                onOpenPreview={handleOpenPreview}
              />
            </div>
          ) : viewMode === "grid" ? (
            /* Mode A: Grid Bento View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => {
                return (
                  <SpotlightCard
                    key={proj.id}
                    isGlass={true}
                    className="group relative rounded-2xl border border-white/10 hover:border-white/30 transition-all overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl"
                  >
                    {/* Project Media Thumbnail */}
                    <div
                      data-cursor="view"
                      onClick={() => handleOpenPreview(proj)}
                      onMouseEnter={() => proj.heroVideo && setHoveredProjectId(proj.id)}
                      onMouseLeave={() => hoveredProjectId === proj.id && setHoveredProjectId(null)}
                      className="relative aspect-[16/10] overflow-hidden bg-black/60 cursor-pointer"
                    >
                      <WorkThumbnailMedia
                        project={proj}
                        isHovered={hoveredProjectId === proj.id}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold tracking-wider uppercase text-zinc-200">
                          {proj.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {proj.heroVideo && (
                            <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-emerald-300 inline-flex items-center gap-1">
                              <Film className="w-2.5 h-2.5" />
                              <span>REEL</span>
                            </span>
                          )}
                          {isDemoProject(proj) && (
                            <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/18 backdrop-blur-md border border-[#D4AF37]/45 text-[10.5px] font-mono font-bold text-[#F3E5AB]">
                              LIVE DEMO
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Hover Preview Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPreview(proj);
                          }}
                          className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
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

                      {/* Action Bar */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(proj)}
                          className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white text-[11px] font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
                  </SpotlightCard>
                );
              })}
            </div>
          ) : (
            /* Mode B: Cinematic Showcase View (Panoramic Cards with Full Strategic Breakdown) */
            <div className="space-y-8">
              {filteredProjects.map((proj) => {
                return (
                  <SpotlightCard
                    key={proj.id}
                    isGlass={true}
                    className="p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/25 transition-all shadow-xl"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left: Panoramic Media Preview (5 Cols) */}
                      <div
                        data-cursor="view"
                        onClick={() => handleOpenPreview(proj)}
                        onMouseEnter={() => proj.heroVideo && setHoveredProjectId(proj.id)}
                        onMouseLeave={() => hoveredProjectId === proj.id && setHoveredProjectId(null)}
                        className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer group"
                      >
                        <WorkThumbnailMedia
                          project={proj}
                          isHovered={hoveredProjectId === proj.id}
                        />

                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase text-zinc-200">
                            {proj.category}
                          </span>
                          {proj.heroVideo && (
                            <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-emerald-300 inline-flex items-center gap-1">
                              <Film className="w-2.5 h-2.5" />
                              <span>REEL</span>
                            </span>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              sound.playChime();
                              setActiveProject(proj);
                            }}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>LAUNCH PREVIEW</span>
                          </button>
                        </div>
                      </div>

                      {/* Right: Detailed Strategic Blueprint (7 Cols) */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono text-zinc-400 uppercase">
                            {proj.category} · {proj.year}
                          </span>

                          <div className="flex items-center gap-2">
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-mono flex items-center gap-1"
                              >
                                <span>Live Site</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3
                            onClick={() => handleOpenPreview(proj)}
                            className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight hover:text-zinc-200 cursor-pointer"
                          >
                            {proj.client}
                          </h3>
                          <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-1 font-medium">
                            {proj.tagline}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-white/10 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleOpenPreview(proj)}
                            className="px-5 py-2.5 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow cursor-pointer"
                          >
                            Inspect Live Platform
                          </button>
                          <Link
                            href={`/work/${proj.slug}`}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase transition-all flex items-center gap-1.5"
                          >
                            <span>Read Strategic Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          )}
        </section>

        <SectionDivider />

        {/* 5. Direct CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-24 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/20 space-y-6 shadow-2xl relative overflow-hidden">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight max-w-2xl mx-auto">
              Ready to Scale Your Brand to Category Dominance?
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
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
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

      {/* 6. Dual-Mode Lightbox Modal Shell (Preview vs Design Theory Dossier) */}
      {activeProject && (
        <div
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
            className="relative w-full max-w-7xl h-[100dvh] sm:h-[90vh] flex flex-col rounded-none sm:rounded-3xl ios-glass-panel text-white overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.98)] border-0 sm:border sm:border-white/20 cursor-default"
          >
            {/* Modal Header Bar with Dual Tabs */}
            <div className="px-4 py-3 border-b border-white/15 bg-white/[0.04] backdrop-blur-md flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="w-6 h-6 -m-1.5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Close Preview"
                  title="Close Preview"
                >
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                </button>
                <span className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white truncate">
                  {activeProject.client}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-zinc-400">
                  {activeProject.category}
                </span>
              </div>

              {/* View Mode Switcher: Live View vs Design Theory Dossier */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(140);
                      setActiveModalTab("preview");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${activeModalTab === "preview"
                      ? "bg-white text-black shadow"
                      : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(160);
                      setActiveModalTab("theory");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${activeModalTab === "theory"
                      ? "bg-white text-black shadow"
                      : "text-zinc-400 hover:text-white"
                      }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Strategic Dossier</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white hover:text-black transition-all text-xs font-mono cursor-pointer"
                >
                  CLOSE ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-hidden">
              {activeModalTab === "preview" ? (
                <ProjectPreviewShowcase
                  key={activeProject.id}
                  project={activeProject}
                  onClose={() => setActiveProject(null)}
                />
              ) : (
                /* Design Theory & Strategic Dossier Tab */
                <div className="h-full overflow-y-auto overscroll-contain p-6 sm:p-10 space-y-8 text-left bg-black/80 font-sans">
                  {/* Top Header */}
                  <div className="border-b border-white/10 pb-6 space-y-2">
                    <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-white">
                      {activeProject.client}
                    </h2>
                    <p className="text-sm text-zinc-300 font-sans max-w-3xl">
                      {activeProject.desc}
                    </p>
                  </div>

                  {/* 3 Classical Problem/Solution/Result Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-2xl bg-[#121211] border border-red-500/20 space-y-2">
                      <span className="font-mono text-xs text-red-400 font-bold uppercase">
                        01. THE BOTTLENECK (CHALLENGE)
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {activeProject.mushkil}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#121211] border border-blue-500/20 space-y-2">
                      <span className="font-mono text-xs text-blue-400 font-bold uppercase">
                        02. THE PERFORMANCE FIX (STRATEGY)
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {activeProject.jugaad}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#121211] border border-[#D4AF37]/25 space-y-2">
                      <span className="font-mono text-xs text-[#F3E5AB] font-bold uppercase">
                        03. THE MEASURED LIFT (OUTCOME)
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {activeProject.nateeja}
                      </p>
                    </div>
                  </div>

                  {/* Technologies & Deliverables */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                    <h3 className="font-display font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Technologies &amp; Disciplines</span>
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {activeProject.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  {activeProject.testimonial && (
                    <div className="p-6 rounded-2xl bg-white/[0.03] border-l-2 border-white pl-6 space-y-2">
                      <p className="text-sm sm:text-base text-zinc-200 italic font-sans leading-relaxed">
                        &ldquo;{activeProject.testimonial.quote}&rdquo;
                      </p>
                      <div>
                        <span className="font-display font-bold text-xs text-white uppercase block">
                          {activeProject.testimonial.author}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500 block">
                          {activeProject.testimonial.role}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
