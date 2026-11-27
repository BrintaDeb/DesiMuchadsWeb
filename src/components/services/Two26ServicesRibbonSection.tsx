"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface RibbonServiceStop {
  id: string;
  slug: string;
  href?: string;
  leftWord: string;
  rightWord: string;
  description: string;
  deskX: number; // percentage on 1616x2850 canvas
  deskY: number;
  deskTrigger: number; // arc-length progress [0..1]
  mobAlign: "left" | "right";
  mobY: number; // percentage on 407x2030 mobile canvas
  mobTrigger: number;
}

const DESKTOP_RIBBON_PATH =
  "M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1175 900 1235 912C1285 922 1320 970 1315 1085C1310 1200 1210 1255 1140 1286C1045 1328 960 1385 845 1335C740 1288 666 1293 650 1384C634 1475 711 1532 837 1543C963 1554 1146 1535 1181 1676C1216 1817 1040 1858 860 1868C680 1878 525 1900 548 2015C571 2130 785 2150 960 2168C1135 2186 1225 2225 1175 2345C1125 2465 895 2475 735 2470C575 2465 422 2435 385.5 2328C340.4 2196 636 2212 465.5 2565C414.5 2670 290 2820 15 2825";

const MOBILE_RIBBON_PATH =
  "M542.7 10C465.7 49 92.8 79.5 92.8 185.6C92.8 291.7 352.7 336 346.3 440.9C339.9 545.7 104.3 543.3 92.8 652.1C79.6 777.8 353.3 765.6 346.3 898.5C339.4 1031.4 63.9 911.5 68 1046C72.1 1180.5 335.2 1170.4 328.3 1279.6C321.4 1388.8 82 1410 88 1525C94 1640 342 1648 334 1765C326 1882 40 1985 -135 2015";

const RIBBON_STOPS: RibbonServiceStop[] = [
  {
    id: "meta-google-ads",
    slug: "meta-google-ads",
    leftWord: "META &",
    rightWord: "GOOGLE ADS",
    description:
      "Meta Advantage+ · Google Search & PMax · Server-Side CAPI",
    deskX: 73,
    deskY: 6.2,
    deskTrigger: 0.052,
    mobAlign: "left",
    mobY: 9.1,
    mobTrigger: 0.139,
  },
  {
    id: "branding",
    slug: "branding",
    leftWord: "BRAND",
    rightWord: "IDENTITY",
    description:
      "Logo Systems · Typography & Color Rules · Brand Guidelines",
    deskX: 33,
    deskY: 16.0,
    deskTrigger: 0.203,
    mobAlign: "right",
    mobY: 21.7,
    mobTrigger: 0.243,
  },
  {
    id: "web-development",
    slug: "web-development",
    leftWord: "WEB",
    rightWord: "ENGINES",
    description:
      "Next.js Platforms · Interactive 3D WebGL UI · Razorpay/UPI Checkout",
    deskX: 53,
    deskY: 26.8,
    deskTrigger: 0.271,
    mobAlign: "left",
    mobY: 32.1,
    mobTrigger: 0.339,
  },
  {
    id: "social-media",
    slug: "social-media",
    leftWord: "VIRAL",
    rightWord: "SOCIAL",
    description:
      "Reels Scripting · Motion Edits · Creator Whitelisting & Community",
    deskX: 76,
    deskY: 38.0,
    deskTrigger: 0.357,
    mobAlign: "right",
    mobY: 44.3,
    mobTrigger: 0.444,
  },
  {
    id: "quick-commerce",
    slug: "quick-commerce",
    leftWord: "QUICK",
    rightWord: "COMMERCE",
    description:
      "Blinkit, Zepto & Instamart Onboarding · Dark Store Stock & Ad Bidding",
    deskX: 40,
    deskY: 49.4,
    deskTrigger: 0.467,
    mobAlign: "left",
    mobY: 53.5,
    mobTrigger: 0.554,
  },
  {
    id: "ecommerce-services",
    slug: "ecommerce-services",
    leftWord: "D2C",
    rightWord: "CRO",
    description:
      "Shopify Storefront CRO · Cart Drawer Upsells · WhatsApp Retention",
    deskX: 73,
    deskY: 60.0,
    deskTrigger: 0.555,
    mobAlign: "right",
    mobY: 63.0,
    mobTrigger: 0.646,
  },
  {
    id: "packaging-label",
    slug: "packaging-label",
    leftWord: "PACKAGING",
    rightWord: "SYSTEMS",
    description:
      "CAD Print Dielines · Foil & UV Finishes · Photorealistic 3D Renders",
    deskX: 35,
    deskY: 70.7,
    deskTrigger: 0.655,
    mobAlign: "left",
    mobY: 75.1,
    mobTrigger: 0.746,
  },
  {
    id: "seo-management",
    slug: "seo-management",
    href: "/contact",
    leftWord: "SEO",
    rightWord: "MANAGEMENT",
    description:
      "Technical Audits · Schema & Core Web Vitals · Organic Authority",
    deskX: 64,
    deskY: 85.6,
    deskTrigger: 0.78,
    mobAlign: "right",
    mobY: 86.2,
    mobTrigger: 0.845,
  },
];

// Authentic GSAP-matched back.out(3.2) overshoot spring easing
function backOut(t: number, s = 2.6): number {
  const k = Math.max(0, Math.min(1, t)) - 1;
  return k * k * ((s + 1) * k + s) + 1;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Monochrome White Two26-style Sticker Icon Badges (die-cut outer aura + pure #FFFFFF & obsidian vector strokes)
 */
function ServiceStickerIcon({ id }: { id: string }) {
  switch (id) {
    case "meta-google-ads":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="4" y="6" width="72" height="68" rx="20" fill="rgba(255,255,255,0.22)" />
          <path d="M56 16C44 18 32 27 25 39L41 55C53 48 62 36 64 24L56 16Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" strokeLinejoin="round" />
          <circle cx="46" cy="34" r="6" fill="#09090B" />
          <path d="M25 39L16 37L22 46L17 58L29 53L38 59L41 55" fill="#FFFFFF" stroke="#09090B" strokeWidth="3" strokeLinejoin="round" />
          <path d="M13 65L23 55M21 67L27 61" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "branding":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="6" y="6" width="68" height="68" rx="18" fill="rgba(255,255,255,0.22)" transform="rotate(-6 40 40)" />
          <g transform="rotate(-6 40 40)">
            <path d="M18 54L14 26L29 37L40 20L51 37L66 26L62 54H18Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" strokeLinejoin="round" />
            <rect x="18" y="56" width="44" height="7" rx="3" fill="#09090B" />
          </g>
        </svg>
      );
    case "web-development":
      return (
        <svg viewBox="0 0 88 76" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="8" y="6" width="74" height="58" rx="12" fill="rgba(255,255,255,0.22)" />
          <rect x="13" y="11" width="64" height="48" rx="7" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" />
          <path d="M13 23H77" stroke="#09090B" strokeWidth="3" />
          <circle cx="22" cy="17" r="2.2" fill="#09090B" />
          <circle cx="30" cy="17" r="2.2" fill="#09090B" />
          <circle cx="38" cy="17" r="2.2" fill="#09090B" />
          <path d="M35 35L29 41L35 47M49 35L55 41L49 47M44 33L40 49" stroke="#09090B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M6 48L24 55L17 58L19 67L12 61L6 65Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      );
    case "social-media":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <circle cx="40" cy="40" r="34" fill="rgba(255,255,255,0.22)" />
          <rect x="14" y="16" width="52" height="48" rx="12" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" />
          <path d="M33 29L51 40L33 51Z" fill="#09090B" stroke="#09090B" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M63 14L66 21L73 24L66 27L63 34L60 27L53 24L60 21Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.4" strokeLinejoin="round" />
        </svg>
      );
    case "quick-commerce":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="6" y="6" width="68" height="68" rx="22" fill="rgba(255,255,255,0.22)" />
          <circle cx="40" cy="40" r="28" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" />
          <path d="M44 17L24 43H39L35 63L56 36H41L44 17Z" fill="#09090B" stroke="#09090B" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "ecommerce-services":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="8" y="8" width="64" height="64" rx="18" fill="rgba(255,255,255,0.22)" />
          <path d="M18 28H62L57 64H23L18 28Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M30 28V22C30 16.5 34.5 13 40 13C45.5 13 50 16.5 50 22V28" fill="none" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M30 28V22C30 16.5 34.5 13 40 13C45.5 13 50 16.5 50 22V28" fill="none" stroke="#09090B" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M33 46L38 51L48 40" stroke="#09090B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case "seo-management":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <circle cx="36" cy="36" r="28" fill="rgba(255,255,255,0.22)" />
          <circle cx="36" cy="36" r="21" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" />
          <path d="M51 51L66 66" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round" />
          <path d="M51 51L66 66" stroke="#09090B" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M25 43L33 35L39 40L48 29" stroke="#09090B" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M42 29H48V35" stroke="#09090B" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    default: // packaging-label
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]" aria-hidden="true">
          <rect x="6" y="6" width="68" height="68" rx="18" fill="rgba(255,255,255,0.22)" />
          <path d="M40 13L64 25V53L40 66L16 53V25L40 13Z" fill="#FFFFFF" stroke="#09090B" strokeWidth="3.2" strokeLinejoin="round" />
          <path d="M16 25L40 37L64 25M40 37V66M28 19L52 31" stroke="#09090B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
  }
}

export function Two26ServicesRibbonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopActivePathRef = useRef<SVGPathElement>(null);
  const mobileActivePathRef = useRef<SVGPathElement>(null);

  const [progress, setProgress] = useState(0.08);
  const [deskLen, setDeskLen] = useState(7840);
  const [mobLen, setMobLen] = useState(3610);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [penPointDesk, setPenPointDesk] = useState<{ x: number; y: number } | null>(null);
  const [penPointMob, setPenPointMob] = useState<{ x: number; y: number } | null>(null);
  const [deskNodes, setDeskNodes] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let dLen = desktopActivePathRef.current?.getTotalLength?.() || 7840;
    let mLen = mobileActivePathRef.current?.getTotalLength?.() || 3610;
    let lenSynced = false;
    let currentP = 0.08;
    let targetP = 0.08;
    let raf = 0;
    let destroyed = false;

    const syncPathLengths = () => {
      if (lenSynced) return;
      lenSynced = true;
      if (desktopActivePathRef.current) {
        try {
          dLen = desktopActivePathRef.current.getTotalLength() || 7840;
          setDeskLen(dLen);
          const pts: Record<string, { x: number; y: number }> = {};
          for (const stop of RIBBON_STOPS) {
            const p = desktopActivePathRef.current.getPointAtLength(stop.deskTrigger * dLen);
            pts[stop.id] = { x: p.x, y: p.y };
          }
          setDeskNodes(pts);
        } catch { }
      }
      if (mobileActivePathRef.current) {
        try {
          mLen = mobileActivePathRef.current.getTotalLength() || 3610;
          setMobLen(mLen);
        } catch { }
      }
    };

    const measure = () => {
      if (!el) return;
      if (mq.matches) {
        targetP = 1;
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const startY = vh * 0.72;
      const travel = Math.max(200, r.height - vh * 0.16);
      const raw = (startY - r.top) / travel;
      targetP = clamp01(Math.max(0.06, raw));
    };

    const updatePenPoint = (p: number) => {
      if (desktopActivePathRef.current && dLen > 0) {
        try {
          const pt = desktopActivePathRef.current.getPointAtLength(p * dLen);
          setPenPointDesk({ x: pt.x, y: pt.y });
        } catch { }
      }
      if (mobileActivePathRef.current && mLen > 0) {
        try {
          const ptM = mobileActivePathRef.current.getPointAtLength(p * mLen);
          setPenPointMob({ x: ptM.x, y: ptM.y });
        } catch { }
      }
    };

    const tick = () => {
      if (destroyed) return;
      syncPathLengths();
      measure();
      const diff = targetP - currentP;
      const gain = Math.abs(diff) > 0.3 ? 0.42 : 0.24;
      if (Math.abs(diff) > 0.0008) {
        currentP += diff * gain;
        setProgress(currentP);
        updatePenPoint(currentP);
        raf = requestAnimationFrame(tick);
      } else {
        currentP = targetP;
        setProgress(currentP);
        updatePenPoint(currentP);
        raf = 0;
      }
    };

    const wake = () => {
      measure();
      if (!raf && !destroyed) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    mq.addEventListener?.("change", wake);
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      mq.removeEventListener?.("change", wake);
      void mLen;
    };
  }, []);

  return (
    <section
      id="services-ribbon"
      ref={sectionRef}
      aria-label="Desi Muchads Services Ribbon Showcase"
      className="relative w-full bg-transparent text-white py-12 sm:py-16 overflow-x-clip scroll-mt-24"
    >
      {/* Subtle Top Header Marker Keeping Context Under Request Quote */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-4 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-400 font-bold block mb-1.5">
            FULL-FUNNEL DELIVERABLES ALONG THE GROWTH THREAD
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            WHAT WE DO FOR BRANDS
          </h2>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-full border border-white/25 hover:border-white bg-white/[0.04] hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
        >
          <span>All Disciplines</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ================================================================= */}
      {/* DESKTOP & TABLET INTERACTIVE WINDING WHITE RIBBON (>= md)         */}
      {/* ================================================================= */}
      <div className="hidden md:block relative w-full max-w-[1440px] mx-auto aspect-[1616/2850] overflow-hidden">
        {/* Background Soft White Track + Foreground Active Scroll-Drawn White Path */}
        <svg
          viewBox="0 0 1616 2850"
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <mask id="dm-desk-drawn-mask">
              <path
                d={DESKTOP_RIBBON_PATH}
                stroke="#FFFFFF"
                strokeWidth={34}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: deskLen,
                  strokeDashoffset: Math.max(0, deskLen * (1 - progress)),
                }}
              />
            </mask>
          </defs>

          {/* Subtle under-track ahead of scroll */}
          <path
            d={DESKTOP_RIBBON_PATH}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Warm brass-gold ambient halo glow under drawn ribbon */}
          <path
            d={DESKTOP_RIBBON_PATH}
            stroke="rgba(212, 175, 55, 0.24)"
            strokeWidth={28}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: deskLen,
              strokeDashoffset: Math.max(0, deskLen * (1 - progress)),
            }}
          />

          {/* Crisp Solid Pure White Path Drawing Live on Scroll */}
          <path
            ref={desktopActivePathRef}
            d={DESKTOP_RIBBON_PATH}
            stroke="#FFFFFF"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: deskLen,
              strokeDashoffset: Math.max(0, deskLen * (1 - progress)),
              filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.3))",
            }}
          />

          {/* Traveling photon energy pulse along the drawn white ribbon */}
          <path
            d={DESKTOP_RIBBON_PATH}
            stroke="#F3E5AB"
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#dm-desk-drawn-mask)"
            className="dm-ribbon-pulse"
            style={{
              strokeDasharray: `180 ${Math.max(1000, deskLen - 180)}`,
              filter: "drop-shadow(0 0 12px rgba(243, 229, 171, 0.85))",
            }}
          />

          {/* Interactive milestone anchor beacons along ribbon bends */}
          {RIBBON_STOPS.map((stop) => {
            const pt = deskNodes[stop.id];
            if (!pt) return null;
            const isStopHovered = hoveredId === stop.id;
            const isReached = progress >= stop.deskTrigger - 0.04;
            if (!isReached && !isStopHovered) return null;
            return (
              <g key={`node-${stop.id}`}>
                {isStopHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="34"
                    fill="rgba(212, 175, 55, 0.2)"
                    stroke="#F3E5AB"
                    strokeWidth="2.5"
                    className="animate-ping"
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isStopHovered ? 13 : 7}
                  fill={isStopHovered ? "#F3E5AB" : "#FFFFFF"}
                  stroke="#09090B"
                  strokeWidth="3"
                />
              </g>
            );
          })}

          {/* Starting entry white cap circle (top-right matching Two26) */}
          <circle cx="1601" cy="15" r="14" fill="#FFFFFF" />
          {/* Multi-ring glowing comet reticle at live drawing pen tip */}
          {penPointDesk && progress < 0.99 && (
            <g>
              <circle
                cx={penPointDesk.x}
                cy={penPointDesk.y}
                r="26"
                fill="rgba(243, 229, 171, 0.16)"
                stroke="rgba(243, 229, 171, 0.6)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle
                cx={penPointDesk.x}
                cy={penPointDesk.y}
                r="12"
                fill="#FFFFFF"
                stroke="#09090B"
                strokeWidth="3"
              />
            </g>
          )}
        </svg>

        {/* All Service Stops Along the Exact Bends of the White Ribbon */}
        <div className="relative z-20 w-full h-full">
          {RIBBON_STOPS.map((stop, idx) => {
            const rawIconP = clamp01((progress - (stop.deskTrigger - 0.055)) / 0.11);
            const rawPillP = clamp01((progress - (stop.deskTrigger - 0.035)) / 0.11);
            const iconEased = backOut(rawIconP, 2.8);
            const pillEased = backOut(rawPillP, 2.6);
            const isHovered = hoveredId === stop.id;
            const siblingDimmed = hoveredId !== null && !isHovered;
            const stickerWidth = Math.round(clamp01(rawIconP * 1.15) * 90);
            // Keep right-most stops comfortably inside container edges
            const shiftClass =
              stop.deskX >= 70
                ? "-translate-x-[58%] -translate-y-1/2"
                : stop.deskX <= 36
                  ? "-translate-x-[42%] -translate-y-1/2"
                  : "-translate-x-1/2 -translate-y-1/2";

            return (
              <div
                key={stop.id}
                style={{ left: `${stop.deskX}%`, top: `${stop.deskY}%` }}
                className={`absolute ${shiftClass} flex flex-col items-start transition-opacity duration-300 ${siblingDimmed ? "opacity-55" : "opacity-100"}`}
              >
                <Link
                  href={stop.href ?? `/services/${stop.slug}`}
                  onMouseEnter={() => {
                    setHoveredId(stop.id);
                    sound.playPluck(155 + idx * 14);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => haptics.selection()}
                  className="group relative flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-2xl p-1"
                >
                  {/* Split Headline: LEFT [Expanding Sticker Icon] RIGHT */}
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-display font-black text-[clamp(2rem,3.6vw,3.85rem)] leading-[0.88] uppercase tracking-tight text-white [text-shadow:0_2px_10px_rgba(7,7,9,0.96),0_6px_18px_rgba(7,7,9,0.9)] transition-transform duration-300 group-hover:-translate-x-1">
                      {stop.leftWord}
                    </span>

                    <div
                      style={{
                        width: `${isHovered ? 98 : stickerWidth}px`,
                        opacity: rawIconP > 0.02 ? 1 : 0,
                        transform: `scale(${isHovered ? 1.14 : Math.max(0.01, iconEased)}) rotate(${isHovered ? 5 : idx % 2 === 0 ? -4 : 4
                          }deg)`,
                      }}
                      className="h-[74px] lg:h-[88px] mx-1.5 shrink-0 flex items-center justify-center origin-center transition-[transform,width] duration-300 ease-out"
                    >
                      <ServiceStickerIcon id={stop.id} />
                    </div>

                    <span className="font-display font-black text-[clamp(2rem,3.6vw,3.85rem)] leading-[0.88] uppercase tracking-tight text-white [text-shadow:0_2px_10px_rgba(7,7,9,0.96),0_6px_18px_rgba(7,7,9,0.9)] transition-transform duration-300 group-hover:translate-x-1">
                      {stop.rightWord}
                    </span>
                  </div>

                  {/* Iconic Tilted (-5deg) White Outline Pill Capsule */}
                  <div
                    style={{
                      opacity: clamp01(rawPillP * 1.4),
                      transform: `scale(${Math.max(0.01, pillEased)}) rotate(${isHovered ? -2 : -5}deg)`,
                    }}
                    className={`mt-1.5 self-end sm:mr-2 max-w-[255px] rounded-full px-4 py-2.5 border transition-colors duration-300 origin-center shadow-[0_10px_28px_rgba(0,0,0,0.65)] ${isHovered
                      ? "bg-white text-[#09090B] border-white"
                      : "bg-[#09090B]/95 text-white border-white"
                      }`}
                  >
                    <p className="font-sans text-[11.5px] lg:text-[12.5px] font-medium leading-snug text-left">
                      {stop.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE RESPONSIVE S-CURVE WHITE RIBBON (< md)                     */}
      {/* ================================================================= */}
      <div className="md:hidden relative w-full max-w-[430px] mx-auto aspect-[407/2030] overflow-hidden px-3">
        <svg
          viewBox="0 0 407 2030"
          className="pointer-events-none absolute inset-0 w-full h-full z-10"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <mask id="dm-mob-drawn-mask">
              <path
                d={MOBILE_RIBBON_PATH}
                stroke="#FFFFFF"
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: mobLen,
                  strokeDashoffset: Math.max(0, mobLen * (1 - progress)),
                }}
              />
            </mask>
          </defs>
          <path
            d={MOBILE_RIBBON_PATH}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={mobileActivePathRef}
            d={MOBILE_RIBBON_PATH}
            stroke="#FFFFFF"
            strokeWidth={16}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: mobLen,
              strokeDashoffset: Math.max(0, mobLen * (1 - progress)),
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))",
            }}
          />
          <path
            d={MOBILE_RIBBON_PATH}
            stroke="#F3E5AB"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#dm-mob-drawn-mask)"
            className="dm-ribbon-pulse-mob"
            style={{
              strokeDasharray: `110 ${Math.max(500, mobLen - 110)}`,
              filter: "drop-shadow(0 0 8px rgba(243, 229, 171, 0.85))",
            }}
          />
          {penPointMob && progress < 0.99 && (
            <g>
              <circle
                cx={penPointMob.x}
                cy={penPointMob.y}
                r="18"
                fill="rgba(243, 229, 171, 0.2)"
                stroke="rgba(243, 229, 171, 0.65)"
                strokeWidth="1.5"
              />
              <circle
                cx={penPointMob.x}
                cy={penPointMob.y}
                r="9"
                fill="#FFFFFF"
                stroke="#09090B"
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>

        <div className="relative z-20 w-full h-full">
          {RIBBON_STOPS.map((stop, idx) => {
            const rawIconP = clamp01((progress - (stop.mobTrigger - 0.08)) / 0.14);
            const rawPillP = clamp01((progress - (stop.mobTrigger - 0.05)) / 0.14);
            const iconEased = backOut(rawIconP, 2.5);
            const pillEased = backOut(rawPillP, 2.4);
            const stickerW = Math.round(clamp01(rawIconP * 1.15) * 54);
            const isLeft = stop.mobAlign === "left";

            return (
              <div
                key={stop.id}
                style={{ top: `${stop.mobY}%` }}
                className={`absolute left-3 right-3 -translate-y-1/2 flex ${isLeft ? "justify-start" : "justify-end"
                  }`}
              >
                <Link
                  href={stop.href ?? `/services/${stop.slug}`}
                  onClick={() => {
                    sound.playPluck(155 + idx * 14);
                    haptics.selection();
                  }}
                  className={`flex flex-col ${isLeft ? "items-start" : "items-end"} max-w-full focus:outline-none`}
                >
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-display font-black text-[25px] leading-none uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                      {stop.leftWord}
                    </span>

                    <div
                      style={{
                        width: `${stickerW}px`,
                        opacity: rawIconP > 0.02 ? 1 : 0,
                        transform: `scale(${Math.max(0.01, iconEased)})`,
                      }}
                      className="h-[52px] mx-1 shrink-0 flex items-center justify-center origin-center"
                    >
                      <ServiceStickerIcon id={stop.id} />
                    </div>

                    <span className="font-display font-black text-[25px] leading-none uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                      {stop.rightWord}
                    </span>
                  </div>

                  <div
                    style={{
                      opacity: clamp01(rawPillP * 1.4),
                      transform: `scale(${Math.max(0.01, pillEased)}) rotate(-4deg)`,
                    }}
                    className="mt-1.5 max-w-[238px] rounded-full px-3.5 py-2 border border-white bg-[#09090B]/95 text-white shadow-xl"
                  >
                    <p className="font-sans text-[11px] font-medium leading-snug text-left">
                      {stop.description}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
