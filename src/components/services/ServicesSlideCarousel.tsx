"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Search,
  Rocket,
  Magnet,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { SpotlightCard } from "@/components/common/SpotlightCard";

interface ServicesSlideCarouselProps {
  services: ServiceItem[];
  onOpenKundli: () => void;
}

// Curated high-res authentic visual mappings for each of the 9 disciplines
const SERVICE_HERO_IMAGES: Record<string, string> = {
  "seo-sem": "/projects/vedaroots-ayurveda-hero.jpg",
  "performance-marketing": "/projects/snacknation-hero.jpg",
  "lead-generation": "/projects/lionelp-restaurant-hero.jpg",
  "social-media": "/projects/streetthreads-handloom-hero.jpg",
  "ecommerce-services": "/projects/urbandrift-ev-hero.jpg",
  "quick-commerce": "/projects/chaichaska-tea-hero.jpg",
  "web-development": "/projects/you-and-me-hero.png",
  "packaging-label": "/projects/currycraft-hero.png",
  "unit-economics": "/projects/sobha-heritage-villas-hero.jpg",
};

export function ServicesSlideCarousel({
  services,
  onOpenKundli,
}: ServicesSlideCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  // Responsive breakpoint tracking
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const total = services.length;

  // Safe navigation bounded within total
  const navigateTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      sound.playPluck(180);
      haptics.selection();
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    navigateTo(activeIndex - 1);
  }, [activeIndex, navigateTo]);

  const handleNext = useCallback(() => {
    navigateTo(activeIndex + 1);
  }, [activeIndex, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null) {
      const delta = touchDeltaXRef.current;
      if (delta > 45) {
        handlePrev();
      } else if (delta < -45) {
        handleNext();
      }
      touchStartXRef.current = null;
      touchDeltaXRef.current = 0;
    }
  };

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

  if (total === 0) {
    return null;
  }

  const activeService = services[activeIndex] || services[0];

  return (
    <div className="w-full max-w-full relative flex flex-col items-center overflow-x-clip">
      {/* 1. Main 3D Sliding Carousel Stage */}
      <div
        className="relative w-full h-[470px] sm:h-[530px] md:h-[560px] flex items-center justify-center overflow-hidden sm:overflow-visible select-none touch-pan-y my-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Soft Ambient Depth Light behind active center card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-96 rounded-full bg-white/[0.04] blur-[120px] pointer-events-none" />

        {services.map((service, i) => {
          // Calculate relative circular offset relative to activeIndex
          let offset = (i - activeIndex) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          // 3D positioning calculations (optimized for mobile screen bounds)
          const xDistance = isMobile ? 210 : 340;
          const translateX = offset * xDistance;

          let scale = 1;
          let opacity = 1;
          let filter = "none";
          let zIndex = 30;

          if (isCenter) {
            scale = 1;
            opacity = 1;
            filter = "none";
            zIndex = 30;
          } else if (absOffset === 1) {
            scale = isMobile ? 0.85 : 0.84;
            opacity = 0.65;
            filter = "blur(1.5px)";
            zIndex = 20;
          } else if (absOffset === 2) {
            scale = isMobile ? 0.72 : 0.7;
            opacity = 0.3;
            filter = "blur(3px)";
            zIndex = 10;
          } else {
            scale = 0.55;
            opacity = 0;
            filter = "blur(6px)";
            zIndex = 1;
          }

          const heroImage =
            SERVICE_HERO_IMAGES[service.id] ||
            "/projects/vedaroots-ayurveda-hero.jpg";

          return (
            <div
              key={service.id}
              onClick={() => {
                if (!isCenter) navigateTo(i);
              }}
              tabIndex={isCenter ? 0 : -1}
              role="group"
              aria-label={`Discipline: ${service.title}`}
              className={`absolute top-1/2 left-1/2 block rounded-3xl overflow-hidden cursor-pointer group focus:outline-none transition-all ${
                isCenter
                  ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]"
                  : "shadow-xl"
              }`}
              style={{
                width: isMobile ? "275px" : "350px",
                height: isMobile ? "440px" : "510px",
                zIndex,
                opacity,
                filter,
                pointerEvents: absOffset > 2 ? "none" : "auto",
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                transition:
                  "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Card Container Frame */}
              <div
                className={`relative w-full h-full bg-[#0d0d12] rounded-3xl overflow-hidden transition-colors ${
                  isCenter
                    ? "border border-white/30 hover:border-white/50"
                    : "border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Full-Bleed Background Visual */}
                <img
                  src={heroImage}
                  alt={service.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Cinematic Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25 pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                {/* Top Header Badge & Discipline Number */}
                <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase shadow-lg">
                    DISCIPLINE 0{i + 1}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-5 inset-x-5 z-20 text-left flex flex-col justify-end space-y-3">
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight drop-shadow-md">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-zinc-300 line-clamp-2 mt-1 leading-snug">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Core Deliverable Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.specs.deliverables.slice(0, 2).map((deliv, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[9.5px] font-mono text-zinc-300 truncate max-w-[200px]"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>

                  {/* Direct Specifications CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          navigateTo(i);
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Subtle Glow Under Active Card */}
                {isCenter && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 -bottom-3 h-6 bg-white/25 blur-md opacity-70"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Interactive Navigation Controls & Pagination Scrubber */}
      <div className="flex items-center justify-between w-full max-w-md mt-2 mb-8 px-4">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Service"
          className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        {/* Pagination Indicator (01 / 09) & Dot Scrubber */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white tracking-widest">
              0{activeIndex + 1}
            </span>
            <span className="text-zinc-600 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-zinc-500 tracking-widest">
              0{total}
            </span>
          </div>

          {/* Scrubbable Dots */}
          <div className="flex items-center gap-1.5">
            {services.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => navigateTo(dotIdx)}
                aria-label={`Slide to service ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  dotIdx === activeIndex
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Service"
          className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-md"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 3. Streamlined Minimal Focus Panel */}
      <div className="w-full max-w-3xl px-4 sm:px-6">
        <SpotlightCard
          isGlass={true}
          className="rounded-2xl p-6 sm:p-7 border border-white/15 bg-[#121215]/90 shadow-xl transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
            <div className="space-y-3 min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  {getServiceIcon(activeService.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    0{activeIndex + 1} / 0{total} · DISCIPLINE
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight truncate">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {activeService.shortDesc}
              </p>

              {/* Minimal Deliverable Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeService.specs.deliverables.slice(0, 3).map((d, dIdx) => (
                  <span
                    key={dIdx}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10.5px] font-mono text-zinc-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Concise Actions */}
            <div className="flex sm:flex-col items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <Link
                href={`/services/${activeService.slug}`}
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-display font-black tracking-wider uppercase text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                type="button"
                className="flex-1 sm:flex-initial w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider transition-all text-center cursor-pointer"
              >
                Audit Brand
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
