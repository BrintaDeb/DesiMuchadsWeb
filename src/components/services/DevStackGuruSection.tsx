"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_TECH_STACK,
  TechLogoGlyph,
} from "@/components/services/TechStackIcons";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface OrbitSpec {
  rx: number;
  ry: number;
  tiltDeg: number;
  speed: number;
}

const CX = 500;
const CY = 278;
const VB_W = 1000;
const VB_H = 620;

const ORBITS: [OrbitSpec, OrbitSpec, OrbitSpec] = [
  { rx: 318, ry: 92, tiltDeg: -22, speed: 0.34 },
  { rx: 356, ry: 134, tiltDeg: 21, speed: -0.28 },
  { rx: 418, ry: 84, tiltDeg: 2, speed: 0.24 },
];

interface DevStackGuruSectionProps {
  className?: string;
}

/**
 * Minimal transparent 3D orbital illustration featuring the meditating
 * Indian Dev Guru on a flying carpet with floating software tech stack logos.
 */
export function DevStackGuruSection({ className = "" }: DevStackGuruSectionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const stageSizeRef = useRef<{ w: number; h: number }>({ w: 1000, h: 620 });

  // Always start with false on server (SSR-safe). Client will sync via useEffect.
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        stageSizeRef.current = { w: rect.width, h: rect.height };
      }
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(stage);

    let isVisible = true;
    let isPageVisible = !document.hidden;
    let raf = 0;
    let tAccum = 0;
    let lastTs = performance.now();

    const positionNodes = (timeSec: number) => {
      const { w, h } = stageSizeRef.current;
      const sx = w / VB_W;
      const sy = h / VB_H;

      for (let i = 0; i < SERVICE_TECH_STACK.length; i++) {
        const node = SERVICE_TECH_STACK[i];
        const el = nodeRefs.current[i];
        if (!el) continue;

        const spec = ORBITS[node.ring];
        const theta =
          node.phase * Math.PI * 2 +
          (prefersReducedMotion ? 0 : timeSec * spec.speed);

        const lx = spec.rx * Math.cos(theta);
        const ly = spec.ry * Math.sin(theta);
        const depth = Math.sin(theta);

        const tiltRad = (spec.tiltDeg * Math.PI) / 180;
        const cosR = Math.cos(tiltRad);
        const sinR = Math.sin(tiltRad);

        const vbX = CX + lx * cosR - ly * sinR;
        const vbY = CY + lx * sinR + ly * cosR;

        const px = vbX * sx;
        const py = vbY * sy;

        const scale =
          w < 540
            ? 0.88 + ((depth + 1) * 0.5) * 0.14
            : 0.88 + ((depth + 1) * 0.5) * 0.22;
        const opacity = depth >= 0 ? 1 : 0.7 + ((depth + 1) * 0.24);

        el.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.zIndex = depth >= 0 ? "30" : "15";
        el.style.opacity = opacity.toFixed(2);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      if (!prefersReducedMotion) {
        tAccum += dt;
      }
      positionNodes(tAccum);

      if (isVisible && isPageVisible && !prefersReducedMotion) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      positionNodes(tAccum);
      if (isVisible && isPageVisible && !prefersReducedMotion) {
        lastTs = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry ? entry.isIntersecting : true;
        schedule();
      },
      { rootMargin: "120px 0px", threshold: 0.05 }
    );
    io.observe(stage);

    schedule();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      aria-label="Desi Muchads Tech Stack Architecture"
      className={`relative w-full bg-transparent ${className}`}
    >
      <div
        ref={stageRef}
        className="relative w-full max-w-5xl mx-auto aspect-[1000/670] sm:aspect-[1000/620] min-h-[250px] select-none overflow-hidden bg-transparent"
      >
        {/* LAYER 1 (z-10): Back Half of 3 Thin Elliptical Orbits */}
        <svg
          viewBox="0 0 1000 620"
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
          fill="none"
          aria-hidden="true"
        >
          {ORBITS.map((o, idx) => (
            <path
              key={`back-${idx}`}
              d={`M ${CX - o.rx} ${CY} A ${o.rx} ${o.ry} 0 0 1 ${CX + o.rx} ${CY}`}
              transform={`rotate(${o.tiltDeg} ${CX} ${CY})`}
              stroke={
                idx === 1
                  ? "rgba(212,175,55,0.32)"
                  : "rgba(255,255,255,0.28)"
              }
              strokeWidth="1.4"
              strokeDasharray={idx === 2 ? "4 4" : undefined}
            />
          ))}
        </svg>

        {/* LAYER 2 (z-20): Transparent Indian Dev Guru Cutout Floating Gently */}
        <div
          className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center ${
            prefersReducedMotion ? "" : "dm-guru-levitate"
          }`}
        >
          <div className="relative w-[58%] sm:w-[57%] max-w-[565px] aspect-[1182/776] translate-y-[4%]">
            <Image
              src="/art/desi-dev-guru.png"
              alt="Desi Muchads Indian Dev Guru meditating on a flying carpet with software tech stack logos"
              width={1182}
              height={776}
              sizes="(max-width: 640px) 58vw, 565px"
              className="w-full h-full object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>

        {/* LAYER 3 (z-25): Front Half of 3 Thin Elliptical Orbits */}
        <svg
          viewBox="0 0 1000 620"
          className="pointer-events-none absolute inset-0 w-full h-full z-[25]"
          fill="none"
          aria-hidden="true"
        >
          {ORBITS.map((o, idx) => (
            <path
              key={`front-${idx}`}
              d={`M ${CX + o.rx} ${CY} A ${o.rx} ${o.ry} 0 0 1 ${CX - o.rx} ${CY}`}
              transform={`rotate(${o.tiltDeg} ${CX} ${CY})`}
              stroke={
                idx === 1
                  ? "rgba(212,175,55,0.48)"
                  : "rgba(255,255,255,0.42)"
              }
              strokeWidth="1.55"
              strokeDasharray={idx === 2 ? "4 4" : undefined}
            />
          ))}
        </svg>

        {/* LAYER 4 (Dynamic Depth z-15 back / z-30 front): Pure Floating Tech Stack Logos */}
        {SERVICE_TECH_STACK.map((node, i) => (
          <Link
            key={node.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            href={`/services/${node.serviceSlug}`}
            onClick={() => {
              sound.playPluck(155 + i * 8);
              haptics.selection();
            }}
            aria-label={node.name}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              minBlockSize: 0,
              willChange: prefersReducedMotion ? "auto" : "transform",
            }}
            className="group absolute w-7 h-7 sm:w-10 sm:h-10 aspect-square bg-transparent flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full"
          >
            <TechLogoGlyph
              id={node.id}
              className="w-7 h-7 sm:w-10 sm:h-10 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)] transition-transform duration-200 group-hover:scale-125"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
