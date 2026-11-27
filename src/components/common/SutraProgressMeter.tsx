"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface RailSection {
  id: string;
  number: string;
  title: string;
  fallbackRoute?: string;
}

const RAIL_SECTIONS: RailSection[] = [
  { id: "hero", number: "01", title: "Vision & Manifesto" },
  {
    id: "services",
    number: "02",
    title: "Disciplines & Services",
    fallbackRoute: "/services",
  },
  {
    id: "work",
    number: "03",
    title: "Selected Works",
    fallbackRoute: "/work",
  },
  { id: "clients", number: "04", title: "Trusted Partners" },
  {
    id: "request-quote",
    number: "05",
    title: "Request Quote",
    fallbackRoute: "/contact",
  },
  {
    id: "footer",
    number: "06",
    title: "Strategy & Contact",
    fallbackRoute: "/contact",
  },
];

/**
 * Right-edge floating circular chapter rail (`01`–`06`) modeled on segmentsix.de's `.chapter-rail`.
 * Features accessible 36px touch/hit targets, terracotta `#d4a48a` active location pill,
 * 1900ms click-lock released immediately on manual wheel/touch, and ResizeObserver recalibration.
 */
export function SutraProgressMeter() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const railRef = useRef<HTMLElement>(null);
  const lockedIdRef = useRef<string | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const evaluateActiveSection = useCallback(() => {
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 84;
    const threshold = Math.max(headerHeight + 90, 170);
    const root = document.documentElement;

    if (lockedIdRef.current) {
      setActiveId(lockedIdRef.current);
      return;
    }

    const scrollBottom = window.scrollY + window.innerHeight;
    if (
      root.scrollHeight > window.innerHeight + 100 &&
      scrollBottom >= root.scrollHeight - 28
    ) {
      const last = RAIL_SECTIONS[RAIL_SECTIONS.length - 1];
      if (document.getElementById(last.id)) {
        setActiveId(last.id);
        return;
      }
    }

    let current = RAIL_SECTIONS[0].id;
    for (const sec of RAIL_SECTIONS) {
      const el = document.getElementById(sec.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) {
        current = sec.id;
      }
    }

    setActiveId(current);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const scheduleEval = () => {
      if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          evaluateActiveSection();
        });
      }
    };

    const clearLock = () => {
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
        lockTimerRef.current = null;
      }
      if (lockedIdRef.current) {
        lockedIdRef.current = null;
        scheduleEval();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest(".dm-chapter-rail")
      ) {
        clearLock();
      }
    };

    scheduleEval();

    window.addEventListener("scroll", scheduleEval, { passive: true });
    window.addEventListener("resize", scheduleEval, { passive: true });
    window.addEventListener("wheel", clearLock, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("visibilitychange", scheduleEval);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(scheduleEval);
      ro.observe(document.body);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      window.removeEventListener("scroll", scheduleEval);
      window.removeEventListener("resize", scheduleEval);
      window.removeEventListener("wheel", clearLock);
      window.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("visibilitychange", scheduleEval);
      ro?.disconnect();
    };
  }, [evaluateActiveSection]);

  const handleJump = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sec: RailSection
  ) => {
    const el = document.getElementById(sec.id);
    if (!el && sec.fallbackRoute) {
      e.preventDefault();
      sound.playChime();
      haptics.selection();
      router.push(sec.fallbackRoute);
      return;
    }

    e.preventDefault();
    sound.playChime();
    haptics.selection();

    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockedIdRef.current = sec.id;
    lockTimerRef.current = setTimeout(() => {
      lockedIdRef.current = null;
      lockTimerRef.current = null;
      evaluateActiveSection();
    }, 1900);
    setActiveId(sec.id);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";

    if (sec.id === "hero") {
      window.scrollTo({ top: 0, behavior });
    } else if (el) {
      el.scrollIntoView({ behavior, block: "start" });
    }
  };

  return (
    <nav
      ref={railRef}
      aria-label="Page sections"
      className="dm-chapter-rail hidden md:grid"
    >
      {/* Vertical Monochrome Scroll Progress Spine */}
      <span aria-hidden="true" className="dm-rail-spine">
        <span className="dm-rail-spine-fill" />
      </span>

      {RAIL_SECTIONS.map((sec, idx) => {
        const isCurrent = activeId === sec.id;
        const isHovered = hoveredId === sec.id;

        return (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            aria-label={`${sec.number} ${sec.title}`}
            aria-current={isCurrent ? "location" : undefined}
            className={isCurrent ? "is-current" : undefined}
            onClick={(e) => handleJump(e, sec)}
            onMouseEnter={() => {
              sound.playPluck(155 + idx * 14);
              setHoveredId(sec.id);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(sec.id)}
            onBlur={() => setHoveredId(null)}
          >
            <span aria-hidden="true" className="dm-rail-number">
              {sec.number}
            </span>

            <span
              aria-hidden="true"
              className={`dm-rail-tooltip ${isHovered ? "is-visible" : ""
                }`}
            >
              <span className="dm-rail-tooltip-num font-mono text-[9px] font-bold mr-1.5">
                {sec.number}
              </span>
              <span className="font-sans text-[11px] font-medium">
                {sec.title}
              </span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
