"use client";

import React, { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Rocket,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Crown,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { ServiceItem } from "@/data/servicesData";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface ServicesSlideCarouselProps {
  services: ServiceItem[];
  onOpenKundli: () => void;
}

export const SERVICE_HERO_IMAGES: Record<string, string> = {
  "meta-google-ads": "/projects/snacknation-hero.jpg",
  "social-media": "/projects/streetthreads-handloom-hero.jpg",
  "web-development": "/projects/you-and-me-hero.webp",
  branding: "/projects/saffron-sage-hero.webp",
  "ecommerce-services": "/projects/urbandrift-ev-hero.jpg",
  "quick-commerce": "/projects/chaichaska-tea-hero.jpg",
  "packaging-label": "/projects/currycraft-hero.png",
};

const subscribeViewport = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export function ServicesSlideCarousel({
  services,
  onOpenKundli,
}: ServicesSlideCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isHoverPaused, setIsHoverPaused] = useState(false);

  const isMobile = useSyncExternalStore(
    subscribeViewport,
    () => (typeof window !== "undefined" ? window.innerWidth < 768 : false),
    () => false
  );

  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const total = services.length;
  const safeIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;

  const navigateTo = useCallback(
    (index: number, withPluck = true) => {
      if (total === 0) return;
      const nextIndex = (index + total) % total;
      setActiveIndex(nextIndex);
      if (withPluck) {
        sound.playPluck(180);
        haptics.selection();
      } else {
        sound.playTick();
        haptics.light();
      }
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    setAutoPlay(false);
    navigateTo(safeIndex - 1);
  }, [safeIndex, navigateTo]);

  const handleNext = useCallback(() => {
    setAutoPlay(false);
    navigateTo(safeIndex + 1);
  }, [safeIndex, navigateTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  useEffect(() => {
    if (!autoPlay || isHoverPaused || total <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3600);
    return () => clearInterval(timer);
  }, [autoPlay, isHoverPaused, total]);

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
      if (delta > 45) handlePrev();
      else if (delta < -45) handleNext();
      touchStartXRef.current = null;
      touchDeltaXRef.current = 0;
    }
  };

  const getServiceIcon = (iconName: string) => {
    const iconStyle = "w-4 h-4 text-zinc-200";
    switch (iconName) {
      case "Crown":
        return <Crown className={iconStyle} />;
      case "Rocket":
        return <Rocket className={iconStyle} />;
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
      default:
        return <Sparkles className={iconStyle} />;
    }
  };

  if (total === 0) return null;

  const activeService = services[safeIndex] || services[0];
  const progressPct = total > 1 ? Math.round((safeIndex / (total - 1)) * 100) : 100;

  return (
    <div className="w-full max-w-full relative flex flex-col items-center overflow-x-clip">
      {/* 1. Calm 3D Monograph Gallery Stage */}
      <div
        className="relative w-full h-[410px] sm:h-[470px] md:h-[500px] flex items-center justify-center overflow-hidden sm:overflow-visible select-none touch-pan-y my-2"
        style={{ perspective: isMobile ? "900px" : "1400px" }}
        onMouseEnter={() => setIsHoverPaused(true)}
        onMouseLeave={() => setIsHoverPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {services.map((service, i) => {
          let offset = (i - safeIndex) % total;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);

          const xDistance = isMobile ? 190 : 315;
          const translateX = offset * xDistance;
          const rotateY = isCenter ? 0 : Math.max(-26, Math.min(26, offset * (isMobile ? -8 : -14)));
          const translateZ = isCenter ? (isMobile ? 18 : 40) : -absOffset * (isMobile ? 42 : 68);

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
            scale = isMobile ? 0.85 : 0.86;
            opacity = 0.58;
            filter = "blur(1.4px)";
            zIndex = 20;
          } else if (absOffset === 2) {
            scale = isMobile ? 0.72 : 0.72;
            opacity = 0.24;
            filter = "blur(3px)";
            zIndex = 10;
          } else {
            scale = 0.56;
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
                if (!isCenter) {
                  setAutoPlay(false);
                  navigateTo(i);
                }
              }}
              tabIndex={isCenter ? 0 : -1}
              role="group"
              aria-label={`Service: ${service.title}`}
              className={`absolute top-1/2 left-1/2 block rounded-3xl overflow-hidden cursor-pointer group focus:outline-none ${isCenter ? "shadow-[0_24px_64px_-16px_rgba(0,0,0,0.92)]" : ""
                }`}
              style={{
                width: isMobile ? "260px" : "336px",
                height: isMobile ? "385px" : "456px",
                zIndex,
                opacity,
                filter,
                pointerEvents: absOffset > 2 ? "none" : "auto",
                transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transition:
                  "transform 0.72s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                className={`relative w-full h-full bg-[#0a0a0d] rounded-3xl overflow-hidden transition-colors ${isCenter
                  ? "border border-white/20 hover:border-white/35"
                  : "border border-white/[0.06]"
                  }`}
              >
                <img
                  src={heroImage}
                  alt={service.title}
                  draggable={false}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-75"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/50 to-transparent pointer-events-none" />

                {isCenter && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent dm-shimmer-sweep"
                  />
                )}

                {/* Minimal Top Row */}
                <div className="absolute top-5 inset-x-5 z-20 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-zinc-300/90 tabular-nums tracking-widest">
                    0{i + 1}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </span>
                </div>

                {/* Minimal Editorial Monograph Caption */}
                <div className="absolute bottom-6 inset-x-6 z-20 text-left space-y-2.5">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] tracking-wider text-[#F3E5AB]/85 uppercase block">
                      {service.metric}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-zinc-300/90 font-light leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>

                  <div className="pt-1">
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          setAutoPlay(false);
                          navigateTo(i);
                        }
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[38px] rounded-full bg-white/[0.1] hover:bg-white text-white hover:text-black border border-white/20 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider transition-all"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Quiet Navigation & Scrubber Rail */}
      <div className="w-full max-w-md mt-2 mb-6 px-4 space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Service"
            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-transparent hover:bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer touch-manipulation"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-zinc-400 tabular-nums tracking-widest">
              0{safeIndex + 1} / 0{total}
            </span>

            <button
              type="button"
              onClick={() => {
                sound.playPluck(165);
                haptics.selection();
                setAutoPlay((p) => !p);
              }}
              aria-pressed={autoPlay}
              className={`px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer touch-manipulation ${autoPlay
                ? "bg-white/10 border-[#F3E5AB]/45 text-[#F3E5AB]"
                : "bg-transparent border-white/10 text-zinc-400 hover:text-white"
                }`}
            >
              {autoPlay ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              <span>{autoPlay ? "Pause" : "Auto"}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Service"
            className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-transparent hover:bg-white/[0.06] border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer touch-manipulation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {total > 1 && (
          <input
            type="range"
            aria-label="Scrub 3D service deck"
            min={0}
            max={total - 1}
            step={1}
            value={safeIndex}
            onChange={(e) => {
              const idx = Number(e.target.value);
              if (idx !== safeIndex) {
                setAutoPlay(false);
                navigateTo(idx, false);
              }
            }}
            style={{ "--dm-progress": `${progressPct}%` } as React.CSSProperties}
            className="dm-studio-range w-full touch-manipulation"
          />
        )}
      </div>

      {/* 3. Open Airy Hairline Details Strip */}
      <div className="w-full max-w-2xl px-4 sm:px-6 pt-5 border-t border-white/[0.07]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left"
          >
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] text-zinc-400">
                <span className="text-[#F3E5AB]">{activeService.metric}</span>
                <span>·</span>
                <span className="truncate">{activeService.specs.targetKpi}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight truncate">
                {activeService.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <Link
                href={`/services/${activeService.slug}`}
                className="flex-1 sm:flex-initial py-2 px-4 min-h-[38px] rounded-full bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold tracking-wider uppercase text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => {
                  sound.playChime();
                  onOpenKundli();
                }}
                type="button"
                className="flex-1 sm:flex-initial py-2 px-4 min-h-[38px] rounded-full bg-transparent hover:bg-white/[0.05] border border-white/12 text-zinc-300 hover:text-white text-[11px] font-mono uppercase tracking-wider transition-all text-center cursor-pointer touch-manipulation"
              >
                Audit
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
