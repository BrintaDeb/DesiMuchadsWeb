"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowRight,
  CheckCircle2,
  RotateCw,
  Film,
} from "lucide-react";
import { ProjectItem } from "@/data/projectsData";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
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

      {/* 3. Open Airy Hairline Summary Bar */}
      <div className="w-full max-w-2xl px-4 sm:px-6 pt-5 border-t border-white/[0.07]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-[#F3E5AB] tabular-nums">
                {String(safeActiveIndex + 1).padStart(2, "0")} · {activeProject.category}
              </span>
              {activeProject.heroVideo && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-[9.5px] font-mono uppercase text-emerald-300">
                  <Film className="w-2.5 h-2.5" />
                  <span>Reel</span>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setShowSpecs((s) => !s);
                }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-transparent hover:bg-white hover:text-black border border-white/12 text-[10px] font-mono uppercase text-zinc-400 transition-colors cursor-pointer"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>{showSpecs ? "Summary" : "Specs"}</span>
              </button>
            </div>

            <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight truncate">
              {activeProject.client}
            </h3>

            {!showSpecs ? (
              <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed max-w-xl line-clamp-1">
                {activeProject.desc}
              </p>
            ) : (
              <div className="space-y-2 pt-1">
                <ul className="space-y-1 text-xs text-zinc-300 font-light">
                  {activeProject.deliverables.slice(0, 2).map((d, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F3E5AB]/85 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {activeProject.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.07] text-[9.5px] font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onOpenPreview(activeProject)}
              className="flex-1 sm:flex-initial py-2 px-4 rounded-full bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold tracking-wider uppercase text-center transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <Link
              href={`/work/${activeProject.slug}`}
              className="flex-1 sm:flex-initial py-2 px-4 rounded-full bg-transparent hover:bg-white/[0.05] border border-white/12 text-zinc-300 hover:text-white text-[11px] font-mono uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 min-h-[38px]"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
