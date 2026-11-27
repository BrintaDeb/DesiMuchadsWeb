"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowRight,
  Cpu,
  Target,
  CheckCircle2,
  RotateCw,
} from "lucide-react";
import { ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { SpotlightCard } from "@/components/common/SpotlightCard";
import {
  WeichieCurvedCarousel3D,
  WeichieCurvedCarouselHandle,
  CurvedSlideItem,
} from "@/components/common/WeichieCurvedCarousel3D";

interface WorkAutoCarouselProps {
  projects: ProjectItem[];
  onOpenPreview: (project: ProjectItem) => void;
  className?: string;
}

export function WorkAutoCarousel({
  projects,
  onOpenPreview,
  className = "",
}: WorkAutoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSpecs, setShowSpecs] = useState(false);
  const carouselRef = useRef<WeichieCurvedCarouselHandle>(null);

  const safeActiveIndex =
    projects.length > 0 ? Math.min(activeIndex, projects.length - 1) : 0;

  const slideItems: CurvedSlideItem[] = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        title: p.client,
        subtitle: p.category,
        badge: p.year || "2026",
        image: p.thumbnail,
        accentHex: "#F3E5AB",
      })),
    [projects]
  );

  const navigateTo = useCallback(
    (index: number) => {
      if (projects.length === 0) return;
      const next = (index + projects.length) % projects.length;
      setActiveIndex(next);
      setShowSpecs(false);
      carouselRef.current?.scrollToItem(next);
      sound.playPluck(180);
      haptics.selection();
    },
    [projects.length]
  );

  const handlePrev = useCallback(() => {
    navigateTo(safeActiveIndex - 1);
  }, [safeActiveIndex, navigateTo]);

  const handleNext = useCallback(() => {
    navigateTo(safeActiveIndex + 1);
  }, [safeActiveIndex, navigateTo]);

  // Keyboard arrow navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  if (projects.length === 0) {
    return null;
  }

  const activeProject = projects[safeActiveIndex] || projects[0];
  // Quick selector bar (up to 6 visible pills around or curated labels like Weichie)
  const labelProjects = projects.slice(0, 6);

  return (
    <div
      className={`w-full max-w-full relative flex flex-col items-center overflow-x-clip select-none ${className}`}
    >
      {/* 1. Exact Weichie.com 3D Curved Panorama WebGL Stage */}
      <WeichieCurvedCarousel3D
        ref={carouselRef}
        items={slideItems}
        activeIndex={safeActiveIndex}
        onActiveChange={(idx) => {
          setActiveIndex(idx);
          setShowSpecs(false);
        }}
        onCardClick={(idx) => {
          const target = projects[idx];
          if (target) {
            sound.playChime();
            haptics.selection();
            onOpenPreview(target);
          }
        }}
        planeWidth={1.6}
        planeHeight={1.6}
        borderRadius={0.08}
        bendAmount={0.12}
        carouselRadius={4.3}
        carouselTiltDeg={-13}
        autoRotateSpeed={-0.04}
        heightClassName="h-[275px] sm:h-[400px] md:h-[505px]"
        ariaLabel="3D Curved Showcase of Desi Muchads Client Work"
      />

      {/* 2. Weichie-style Synchronized Project Selector Labels + Prev/Next Controls */}
      <div className="w-full max-w-5xl px-4 mt-1 mb-5 flex flex-col items-center gap-4">
        {/* Interactive Quick Pills */}
        <div className="flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-visible scrollbar-none gap-2.5 sm:gap-x-5 sm:gap-y-2 w-full pb-1 sm:pb-0">
          {labelProjects.map((proj, pIdx) => {
            const isActive = safeActiveIndex === pIdx;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => navigateTo(pIdx)}
                className={`inline-flex items-center gap-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer py-1.5 px-2.5 sm:px-0 rounded-full sm:rounded-none border sm:border-0 whitespace-nowrap shrink-0 ${isActive
                  ? "text-white font-bold bg-white/10 sm:bg-transparent border-white/30"
                  : "text-zinc-300 hover:text-white bg-white/[0.04] sm:bg-transparent border-white/15"
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full transition-transform duration-300 ${isActive
                    ? "bg-[#D4AF37] scale-125 shadow-[0_0_8px_rgba(212,175,55,0.85)]"
                    : "bg-white/25 scale-90"
                    }`}
                />
                <span>{proj.client}</span>
              </button>
            );
          })}
        </div>

        {/* Arrow & Counter Scrubber */}
        <div className="flex items-center justify-between w-full max-w-sm">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project Slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-300 tracking-widest uppercase">
            <span className="text-white font-bold">
              {String(safeActiveIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
            <span className="hidden sm:inline text-zinc-300">· Drag to spin</span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project Slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* 3. Synchronized Focus Case Study & Specs Dossier */}
      <div className="w-full max-w-3xl px-4 sm:px-6">
        <SpotlightCard
          isGlass={true}
          className="rounded-2xl p-5 sm:p-6 border border-white/15 bg-[#121215]/90 shadow-xl transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-left">
            <div className="space-y-2.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#F3E5AB] font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/12 border border-[#D4AF37]/35 tabular-nums">
                  ACTIVE CASE STUDY · {String(safeActiveIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] font-mono text-zinc-300">
                  {activeProject.category}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setShowSpecs((s) => !s);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.06] hover:bg-white hover:text-black border border-white/20 text-[10px] font-mono font-bold uppercase text-zinc-200 transition-colors cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{showSpecs ? "Overview" : "Specs & Stack"}</span>
                </button>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight truncate">
                {activeProject.client}
              </h3>

              {!showSpecs ? (
                <>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                    {activeProject.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeProject.deliverables.slice(0, 3).map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10.5px] font-mono text-zinc-300"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-[#D4AF37]" />
                      <span>Architectural Deliverables</span>
                    </span>
                    <ul className="space-y-1 text-xs text-zinc-200">
                      {activeProject.deliverables.slice(0, 3).map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-zinc-300" />
                      <span>Tech &amp; Ad Stack</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[9.5px] font-mono text-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex sm:flex-col items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenPreview(activeProject)}
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick Inspect</span>
              </button>

              <Link
                href={`/work/${activeProject.slug}`}
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <span>Read Full Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
