"use client";

import React, { useState, useRef } from "react";
import { Eye } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { ProjectItem } from "@/data/projectsData";

interface CaseStudyHoverPreviewProps {
  project: ProjectItem;
  onInspect: (project: ProjectItem) => void;
  className?: string;
}

/**
 * Case Study Motion Video Hover Preview
 * When hovered on desktop:
 * - Activates automated fluid vertical website inspection pan
 * - Displays holographic HUD scanlines and active "REC ● 60 FPS" telemetry
 * - Synchronized tactile haptic tick and audio cue
 * - Instant click opens the full-screen interactive ProjectPreviewShowcase
 */
export function CaseStudyHoverPreview({
  project,
  onInspect,
  className = "",
}: CaseStudyHoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    sound.playPluck(180);
    haptics.light();
    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime();
    haptics.medium();
    onInspect(project);
  };

  const displayImage = project.fullImage || project.thumbnail;

  return (
    <div
      data-casestudy-preview="true"
      data-project-title={project.client}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor="view"
      className={`relative aspect-[16/10] overflow-hidden bg-black/80 cursor-pointer select-none group ${className}`}
    >
      {/* Background Static / Motion Image Container */}
      <div
        className={`w-full h-full transition-transform duration-700 ease-out ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      >
        <img
          src={displayImage}
          alt={project.client}
          className={`w-full h-full object-cover object-top transition-transform duration-[6000ms] ease-in-out ${
            isHovered ? "-translate-y-1/3" : "translate-y-0"
          }`}
          loading="lazy"
        />
      </div>

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

      {/* Category Pill Tag (Top Left) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span className="px-2.5 py-1 rounded-[0.2rem] bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold uppercase text-zinc-200">
          {project.category}
        </span>
      </div>

      {/* Holographic Recording HUD (Top Right on Hover) */}
      <div
        className={`absolute top-3 right-3 z-10 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[0.2rem] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE PREVIEW 60FPS</span>
        </span>
      </div>

      {/* Dynamic Scanline & Shimmer Bar on Hover */}
      {isHovered && (
        <div
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent top-0 animate-pulse pointer-events-none"
          style={{ animationDuration: "1.5s" }}
        />
      )}

      {/* Central "INSPECT ARCHITECTURE" Button on Hover */}
      <div
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2.5 rounded-[0.2rem] bg-white text-black text-xs font-black font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-zinc-200 active:scale-95 transition-all"
        >
          <Eye className="w-4 h-4 text-black stroke-[2.5]" />
          <span>INSPECT PLATFORM</span>
        </button>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs font-mono">
        <span className="font-bold text-white bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-[0.2rem] border border-white/20 text-[11px] truncate max-w-[70%]">
          {project.heroStat}
        </span>
        <span className="text-[10px] text-zinc-300 bg-black/80 backdrop-blur-md px-2 py-1 rounded-[0.2rem] border border-white/10 shrink-0">
          {project.stats[0]?.val || project.year}
        </span>
      </div>
    </div>
  );
}
