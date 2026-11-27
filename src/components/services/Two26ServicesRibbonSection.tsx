"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  MessageCircle,
  Pause,
  Play,
  Plus,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_WHATSAPP_NUMBER } from "@/context/AgencyProposalContext";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface RibbonServiceStop {
  id: string;
  slug: string;
  href?: string;
  shortLabel: string;
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

interface StopInspectSpec {
  title: string;
  metric: string;
  summary: string;
  deliverables: string[];
  tools: string[];
  turnaround: string;
  targetKpi: string;
}

interface CurveSample {
  x: number;
  y: number;
  t: number;
  angle: number;
}

interface MagneticHit {
  x: number;
  y: number;
  t: number;
  angle: number;
  pointerX: number;
  pointerY: number;
  nearestStopId: string | null;
}

const DESKTOP_RIBBON_PATH =
  "M1601 15C1241.24 56.6913 1025.14 308.977 1139.71 377.393C1191.45 408.29 1240.74 339.444 1181.39 282.059C1075.45 179.627 937.582 215.243 741.458 298.287C701.638 315.147 622.383 350.59 552.298 410.201C487.298 465.486 487.725 549.018 534.765 563.77C581.804 578.523 632.714 579.634 681.058 587.392C729.731 595.202 767.011 617.17 797.836 657.756C833.766 705.065 838.864 772.034 862.127 825.767C890.491 891.283 966.341 911.2 1033.5 915.638C1130.56 922.052 1175 900 1235 912C1285 922 1320 970 1315 1085C1310 1200 1210 1255 1140 1286C1045 1328 960 1385 845 1335C740 1288 666 1293 650 1384C634 1475 711 1532 837 1543C963 1554 1146 1535 1181 1676C1216 1817 1040 1858 860 1868C680 1878 525 1900 548 2015C571 2130 785 2150 960 2168C1135 2186 1225 2225 1175 2345C1125 2465 895 2475 735 2470C575 2465 422 2435 385.5 2328C340.4 2196 636 2212 465.5 2565C414.5 2670 290 2820 15 2825";

const MOBILE_RIBBON_PATH =
  "M542.7 10C465.7 49 92.8 79.5 92.8 185.6C92.8 291.7 352.7 336 346.3 440.9C339.9 545.7 104.3 543.3 92.8 652.1C79.6 777.8 353.3 765.6 346.3 898.5C339.4 1031.4 63.9 911.5 68 1046C72.1 1180.5 335.2 1170.4 328.3 1279.6C321.4 1388.8 82 1410 88 1525C94 1640 342 1648 334 1765C326 1882 40 1985 -135 2015";

const RIBBON_STOPS: RibbonServiceStop[] = [
  {
    id: "meta-google-ads",
    slug: "meta-google-ads",
    shortLabel: "Ads",
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
    shortLabel: "Brand",
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
    shortLabel: "Web",
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
    shortLabel: "Social",
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
    shortLabel: "Q-Com",
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
    shortLabel: "CRO",
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
    shortLabel: "Pack",
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
    shortLabel: "SEO",
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

const SEO_FALLBACK_SPEC: StopInspectSpec = {
  title: "SEO Management & Organic Authority",
  metric: "+310% Non-Branded Traffic",
  summary:
    "Full-stack technical SEO, structured Schema.org architecture, Core Web Vitals speed engineering, and high-intent organic topic clusters built to compound acquisition without rising ad CPMs.",
  deliverables: [
    "Technical crawlability, canonical & sitemap hygiene for SSR/Next.js",
    "Rich JSON-LD Schema markup across services, products & FAQs",
    "Core Web Vitals (LCP, INP, CLS) & mobile indexing hardening",
    "High-intent commercial landing clusters & GA4 Search Console attribution",
  ],
  tools: ["Next.js Metadata", "Google Search Console", "Ahrefs", "Schema.org"],
  turnaround: "7-Day Technical Audit & Indexing Sprint",
  targetKpi: "+310% Organic Discovery · Top-3 Intent Keywords",
};

function getInspectSpec(stop: RibbonServiceStop): StopInspectSpec {
  const match = AGENCY_SERVICES.find((s) => s.slug === stop.slug);
  if (match) {
    return {
      title: match.title,
      metric: match.metric,
      summary: match.shortDesc,
      deliverables: match.specs.deliverables,
      tools: match.specs.tools,
      turnaround: match.specs.turnaround,
      targetKpi: match.specs.targetKpi,
    };
  }
  return SEO_FALLBACK_SPEC;
}

// Authentic GSAP-matched back.out(3.2) overshoot spring easing
function backOut(t: number, s = 2.6): number {
  const k = Math.max(0, Math.min(1, t)) - 1;
  return k * k * ((s + 1) * k + s) + 1;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const SPARK_RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

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
  const deskCanvasRef = useRef<HTMLDivElement>(null);
  const mobCanvasRef = useRef<HTMLDivElement>(null);
  const desktopActivePathRef = useRef<SVGPathElement>(null);
  const mobileActivePathRef = useRef<SVGPathElement>(null);

  const [progress, setProgress] = useState(0.08);
  const [deskLen, setDeskLen] = useState(7840);
  const [mobLen, setMobLen] = useState(3610);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [inspectedId, setInspectedId] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [mobileFocusId, setMobileFocusId] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const [penPointDesk, setPenPointDesk] = useState<{ x: number; y: number; angle: number } | null>(null);
  const [penPointMob, setPenPointMob] = useState<{ x: number; y: number; angle: number } | null>(null);
  const [deskNodes, setDeskNodes] = useState<Record<string, { x: number; y: number }>>({});
  const [mobNodes, setMobNodes] = useState<Record<string, { x: number; y: number }>>({});
  const [burstIds, setBurstIds] = useState<string[]>([]);
  const [pulseSpeedBoost, setPulseSpeedBoost] = useState(0);
  const [pulseReverse, setPulseReverse] = useState(false);
  const [magnetic, setMagnetic] = useState<MagneticHit | null>(null);

  const deskSamplesRef = useRef<CurveSample[]>([]);
  const crossedRef = useRef<Set<string>>(new Set());
  const autoPlayingRef = useRef(false);
  const progressRef = useRef(0.08);
  const pointerRafRef = useRef<number>(0);
  const burstTimersRef = useRef<number[]>([]);

  useEffect(() => {
    autoPlayingRef.current = isAutoPlaying;
  }, [isAutoPlaying]);

  // Stop auto-tour automatically on Escape or close modal
  useEffect(() => {
    if (!inspectedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        sound.playPluck(120);
        setInspectedId(null);
      } else if (e.key === "ArrowRight") {
        const idx = RIBBON_STOPS.findIndex((s) => s.id === inspectedId);
        const next = RIBBON_STOPS[(idx + 1) % RIBBON_STOPS.length];
        if (next) {
          sound.playPluck(155 + ((idx + 1) % RIBBON_STOPS.length) * 14);
          setInspectedId(next.id);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = RIBBON_STOPS.findIndex((s) => s.id === inspectedId);
        const prevIdx = (idx - 1 + RIBBON_STOPS.length) % RIBBON_STOPS.length;
        const prev = RIBBON_STOPS[prevIdx];
        if (prev) {
          sound.playPluck(155 + prevIdx * 14);
          setInspectedId(prev.id);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inspectedId]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const burstTimers = burstTimersRef.current;

    let dLen = desktopActivePathRef.current?.getTotalLength?.() || 7840;
    let mLen = mobileActivePathRef.current?.getTotalLength?.() || 3610;
    let lenSynced = false;
    let currentP = 0.08;
    let targetP = 0.08;
    let autoP = 0.08;
    let prevP = 0.08;
    let prevTime = performance.now();
    let dirDebounce = 0;
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

          // Pre-sample 64 points with local tangents for zero-jank pointer magnetic lookup
          const samples: CurveSample[] = [];
          const count = 64;
          for (let i = 0; i <= count; i++) {
            const t = i / count;
            const lenAt = t * dLen;
            const p0 = desktopActivePathRef.current.getPointAtLength(Math.max(0, lenAt - 8));
            const p1 = desktopActivePathRef.current.getPointAtLength(Math.min(dLen, lenAt + 8));
            const mid = desktopActivePathRef.current.getPointAtLength(lenAt);
            const angle = (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI;
            samples.push({ x: mid.x, y: mid.y, t, angle });
          }
          deskSamplesRef.current = samples;
        } catch { }
      }
      if (mobileActivePathRef.current) {
        try {
          mLen = mobileActivePathRef.current.getTotalLength() || 3610;
          setMobLen(mLen);
          const mPts: Record<string, { x: number; y: number }> = {};
          for (const stop of RIBBON_STOPS) {
            const pm = mobileActivePathRef.current.getPointAtLength(stop.mobTrigger * mLen);
            mPts[stop.id] = { x: pm.x, y: pm.y };
          }
          setMobNodes(mPts);
        } catch { }
      }
    };

    const triggerMilestoneBurst = (stopId: string, idx: number) => {
      if (crossedRef.current.has(stopId)) return;
      crossedRef.current.add(stopId);
      setBurstIds((prev) => (prev.includes(stopId) ? prev : [...prev, stopId]));
      const timer = window.setTimeout(() => {
        setBurstIds((prev) => prev.filter((id) => id !== stopId));
      }, 780);
      burstTimersRef.current.push(timer);

      if (sound.isAudioReady()) {
        sound.playPluck(155 + idx * 14);
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

      // Mobile center-viewport auto-focus stop
      if (window.innerWidth < 768) {
        const mobRect = mobCanvasRef.current?.getBoundingClientRect() ?? r;
        const focusY = vh * 0.48;
        let bestId: string | null = null;
        let bestDist = 240;
        for (const stop of RIBBON_STOPS) {
          const stopClientY = mobRect.top + (stop.mobY / 100) * mobRect.height;
          const dist = Math.abs(stopClientY - focusY);
          if (dist < bestDist && currentP >= stop.mobTrigger - 0.12) {
            bestDist = dist;
            bestId = stop.id;
          }
        }
        setMobileFocusId((prev) => (prev === bestId ? prev : bestId));
      } else {
        setMobileFocusId((prev) => (prev === null ? prev : null));
      }
    };

    const updatePenPoint = (p: number) => {
      if (desktopActivePathRef.current && dLen > 0) {
        try {
          const lenAt = p * dLen;
          const pt = desktopActivePathRef.current.getPointAtLength(lenAt);
          const ptNext = desktopActivePathRef.current.getPointAtLength(Math.min(dLen, lenAt + 10));
          const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI;
          setPenPointDesk({ x: pt.x, y: pt.y, angle });
        } catch { }
      }
      if (mobileActivePathRef.current && mLen > 0) {
        try {
          const lenM = p * mLen;
          const ptM = mobileActivePathRef.current.getPointAtLength(lenM);
          const ptMNext = mobileActivePathRef.current.getPointAtLength(Math.min(mLen, lenM + 10));
          const angleM = (Math.atan2(ptMNext.y - ptM.y, ptMNext.x - ptM.x) * 180) / Math.PI;
          setPenPointMob({ x: ptM.x, y: ptM.y, angle: angleM });
        } catch { }
      }
    };

    const tick = (now: number) => {
      if (destroyed) return;
      syncPathLengths();
      const dt = Math.max(0.008, Math.min(0.05, (now - prevTime) / 1000));
      prevTime = now;

      if (autoPlayingRef.current && !mq.matches) {
        if (autoP < currentP - 0.05) {
          autoP = currentP;
        }
        if (autoP >= 0.995) {
          autoP = 0.06;
          crossedRef.current.clear();
        }
        autoP = Math.min(1, autoP + dt * 0.13);
        targetP = autoP;
        if (autoP >= 0.999) {
          autoPlayingRef.current = false;
          setIsAutoPlaying(false);
        }
      } else {
        measure();
        autoP = targetP;
      }

      const diff = targetP - currentP;
      const gain = Math.abs(diff) > 0.3 ? 0.42 : 0.24;
      const nextP = Math.abs(diff) > 0.0008 ? currentP + diff * gain : targetP;
      const vel = (nextP - prevP) / dt;
      prevP = nextP;
      currentP = nextP;
      progressRef.current = nextP;

      setProgress(nextP);
      updatePenPoint(nextP);

      // Velocity streak + bidirectional photon physics
      const boost = Math.min(1, Math.abs(vel) * 1.15);
      setPulseSpeedBoost((prev) => (Math.abs(prev - boost) > 0.04 ? boost : prev));

      if (vel < -0.045) {
        dirDebounce += 1;
        if (dirDebounce > 3) setPulseReverse(true);
      } else if (vel > 0.03) {
        dirDebounce = 0;
        setPulseReverse(false);
      } else {
        dirDebounce = Math.max(0, dirDebounce - 1);
      }

      // Milestone crossing bursts
      const isMobileView = window.innerWidth < 768;
      RIBBON_STOPS.forEach((stop, idx) => {
        const trig = isMobileView ? stop.mobTrigger : stop.deskTrigger;
        if (nextP >= trig && !crossedRef.current.has(stop.id)) {
          triggerMilestoneBurst(stop.id, idx);
        }
      });

      if (Math.abs(diff) > 0.0008 || autoPlayingRef.current) {
        raf = requestAnimationFrame(tick);
      } else {
        if (boost > 0.05) {
          setPulseSpeedBoost(0);
        }
        raf = 0;
      }
    };

    const wake = () => {
      if (autoPlayingRef.current) {
        // User manual scroll overrides guided playback cleanly
        autoPlayingRef.current = false;
        setIsAutoPlaying(false);
      }
      measure();
      if (!raf && !destroyed) {
        prevTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const startAutoRaf = () => {
      if (!raf && !destroyed) {
        autoP = progressRef.current >= 0.96 ? 0.06 : progressRef.current;
        prevTime = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("dm_ribbon_autoplay_kick", startAutoRaf);
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake, { passive: true });
    mq.addEventListener?.("change", wake);
    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pointerRafRef.current);
      burstTimers.forEach((id) => clearTimeout(id));
      window.removeEventListener("dm_ribbon_autoplay_kick", startAutoRaf);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      mq.removeEventListener?.("change", wake);
    };
  }, []);

  const handleToggleAutoPlay = () => {
    const next = !isAutoPlaying;
    haptics.selection();
    sound.playPluck(next ? 210 : 140);
    setIsAutoPlaying(next);
    autoPlayingRef.current = next;
    if (next && typeof window !== "undefined") {
      if (progressRef.current >= 0.96) {
        crossedRef.current.clear();
      }
      window.dispatchEvent(new CustomEvent("dm_ribbon_autoplay_kick"));
    }
  };

  const handleJumpToStop = (stop: RibbonServiceStop, idx: number, openModalAfter = false) => {
    sound.playPluck(155 + idx * 14);
    haptics.selection();
    setIsAutoPlaying(false);
    autoPlayingRef.current = false;
    setHoveredId(stop.id);

    const isMob = typeof window !== "undefined" && window.innerWidth < 768;
    const canvasEl = isMob ? mobCanvasRef.current : deskCanvasRef.current;
    const el = canvasEl ?? sectionRef.current;
    if (el && typeof window !== "undefined") {
      const rect = el.getBoundingClientRect();
      const docTop = window.scrollY + rect.top;
      const stopPct = isMob ? stop.mobY : stop.deskY;
      const targetY = docTop + (stopPct / 100) * rect.height - window.innerHeight * 0.48;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }

    if (openModalAfter) {
      setInspectedId(stop.id);
    }
  };

  const handleTogglePin = (stopId: string) => {
    haptics.medium();
    setPinnedIds((prev) => {
      const exists = prev.includes(stopId);
      sound.playPluck(exists ? 130 : 225);
      return exists ? prev.filter((id) => id !== stopId) : [...prev, stopId];
    });
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const box = deskCanvasRef.current;
    if (!box || deskSamplesRef.current.length === 0) return;
    const rect = box.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const svgX = ((e.clientX - rect.left) / rect.width) * 1616;
    const svgY = ((e.clientY - rect.top) / rect.height) * 2850;

    cancelAnimationFrame(pointerRafRef.current);
    pointerRafRef.current = requestAnimationFrame(() => {
      let best: CurveSample | null = null;
      let bestDist = 280;
      for (const s of deskSamplesRef.current) {
        const d = Math.hypot(s.x - svgX, s.y - svgY);
        if (d < bestDist) {
          bestDist = d;
          best = s;
        }
      }

      if (!best) {
        setMagnetic(null);
        return;
      }

      let nearestStop: string | null = null;
      let minStopD = 260;
      for (const stop of RIBBON_STOPS) {
        const sx = (stop.deskX / 100) * 1616;
        const sy = (stop.deskY / 100) * 2850;
        const sd = Math.hypot(sx - svgX, sy - svgY);
        if (sd < minStopD) {
          minStopD = sd;
          nearestStop = stop.id;
        }
      }

      setMagnetic({
        x: best.x,
        y: best.y,
        t: best.t,
        angle: best.angle,
        pointerX: svgX,
        pointerY: svgY,
        nearestStopId: nearestStop,
      });
    });
  };

  // Illuminated threaded gold arc calculations (connects pinned services along the ribbon)
  const deskThreadSpan = useMemo(() => {
    if (pinnedIds.length < 2) return null;
    const trigs = RIBBON_STOPS.filter((s) => pinnedIds.includes(s.id)).map((s) => s.deskTrigger);
    if (trigs.length < 2) return null;
    const minT = Math.max(0, Math.min(...trigs) - 0.01);
    const maxT = Math.min(1, Math.max(...trigs) + 0.01);
    return {
      offset: -minT * deskLen,
      segLen: Math.max(40, (maxT - minT) * deskLen),
    };
  }, [pinnedIds, deskLen]);

  const mobThreadSpan = useMemo(() => {
    if (pinnedIds.length < 2) return null;
    const trigs = RIBBON_STOPS.filter((s) => pinnedIds.includes(s.id)).map((s) => s.mobTrigger);
    if (trigs.length < 2) return null;
    const minT = Math.max(0, Math.min(...trigs) - 0.01);
    const maxT = Math.min(1, Math.max(...trigs) + 0.01);
    return {
      offset: -minT * mobLen,
      segLen: Math.max(40, (maxT - minT) * mobLen),
    };
  }, [pinnedIds, mobLen]);

  const pinnedStops = useMemo(
    () => RIBBON_STOPS.filter((s) => pinnedIds.includes(s.id)),
    [pinnedIds]
  );

  const threadedWhatsAppUrl = useMemo(() => {
    if (pinnedStops.length === 0) return "";
    const lines = pinnedStops
      .map((s, i) => `${i + 1}. ${s.leftWord} ${s.rightWord} (${s.description})`)
      .join("\n");
    const msg =
      `Hello Desi Muchads!\n\n` +
      `I threaded ${pinnedStops.length} capabilities along your Growth Trail:\n\n` +
      `${lines}\n\n` +
      `Let's schedule our Strategy Session and put together a custom proposal.`;
    return `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [pinnedStops]);

  const inspectedIdx = inspectedId ? RIBBON_STOPS.findIndex((s) => s.id === inspectedId) : -1;
  const inspectedStop = inspectedIdx >= 0 ? RIBBON_STOPS[inspectedIdx] : null;
  const inspectedSpec = inspectedStop ? getInspectSpec(inspectedStop) : null;

  const photonDashDesk = Math.round(180 + pulseSpeedBoost * 240);
  const photonDashMob = Math.round(110 + pulseSpeedBoost * 150);

  return (
    <section
      id="services-ribbon"
      ref={sectionRef}
      aria-label="Desi Muchads Interactive Growth Swirl Showcase"
      className="relative w-full bg-transparent text-white py-12 sm:py-16 overflow-x-clip scroll-mt-24"
    >
      {/* Top Header Row */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-zinc-500 block mb-1">
            INTERACTIVE TRAIL
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Capabilities
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleToggleAutoPlay}
            aria-pressed={isAutoPlaying}
            className={`inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full border font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer touch-manipulation ${isAutoPlaying
              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F3E5AB] shadow-[0_0_24px_rgba(212,175,55,0.28)]"
              : "bg-white/[0.04] border-white/25 hover:border-white text-white hover:bg-white hover:text-black"
              }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Trail</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Tour Trail</span>
              </>
            )}
          </button>

          <Link
            href="/services"
            onClick={() => {
              sound.playPluck(165);
              haptics.selection();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full border border-white/25 hover:border-white bg-white/[0.04] hover:bg-white hover:text-black text-white font-mono text-xs font-bold uppercase tracking-wider transition-all touch-manipulation"
          >
            <span>All Disciplines</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* STICKY INTERACTIVE CHECKPOINT SCRUBBER + THREADED SCOPE CONSOLE       */}
      {/* Rides smoothly below the main Navbar without colliding with bottom HUD */}
      {/* ===================================================================== */}
      <div className="sticky top-[62px] sm:top-[70px] z-30 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-4 pointer-events-none">
        <div className="pointer-events-auto rounded-2xl bg-[#0a0a0d]/92 backdrop-blur-xl border border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.85)] p-2 sm:p-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2">
            {/* Checkpoint Scrubber Rail (01 -> 08) */}
            <div
              role="navigation"
              aria-label="Swirl trail checkpoints"
              className="flex items-center gap-1.5 overflow-x-auto scroll-momentum-x scrollbar-none py-0.5 flex-1"
            >
              {RIBBON_STOPS.map((stop, idx) => {
                const isReached = progress >= stop.deskTrigger - 0.04;
                const isPinned = pinnedIds.includes(stop.id);
                const isFocused =
                  inspectedId === stop.id ||
                  hoveredId === stop.id ||
                  mobileFocusId === stop.id;
                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => handleJumpToStop(stop, idx, true)}
                    className={`px-2.5 py-1.5 min-h-[34px] rounded-full border font-mono text-[10.5px] font-bold uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-all cursor-pointer touch-manipulation ${isFocused
                      ? "bg-white text-black border-white shadow-[0_0_16px_rgba(255,255,255,0.28)]"
                      : isPinned
                        ? "bg-[#D4AF37]/20 text-[#F3E5AB] border-[#D4AF37]/70"
                        : isReached
                          ? "bg-white/[0.08] text-white border-white/30 hover:border-white/60"
                          : "bg-white/[0.02] text-zinc-400 border-white/10 hover:text-zinc-200 hover:border-white/25"
                      }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${isPinned
                        ? "bg-[#D4AF37]"
                        : isReached
                          ? isFocused
                            ? "bg-black"
                            : "bg-white"
                          : "bg-zinc-600"
                        }`}
                    />
                    <span>
                      {String(idx + 1).padStart(2, "0")} {stop.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Progress Telemetry Pill */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10 shrink-0 font-mono text-[10.5px] text-zinc-300 tabular-nums">
              <Compass className={`w-3.5 h-3.5 ${isAutoPlaying ? "text-[#D4AF37] animate-spin" : "text-zinc-400"}`} />
              <span>{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
            </div>
          </div>

          {/* Active Threaded Scope Summary Row */}
          {pinnedStops.length > 0 && (
            <div className="pt-1.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-left">
              <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#F3E5AB]">
                  THREADED ({pinnedStops.length}):
                </span>
                {pinnedStops.slice(0, 3).map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-white"
                  >
                    <span>{s.shortLabel}</span>
                    <button
                      type="button"
                      onClick={() => handleTogglePin(s.id)}
                      aria-label={`Remove ${s.leftWord} ${s.rightWord} from trail scope`}
                      className="p-0.5 hover:text-[#F3E5AB] cursor-pointer touch-manipulation"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                {pinnedStops.length > 3 && (
                  <span className="font-mono text-[10px] text-zinc-400">
                    +{pinnedStops.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(125);
                    setPinnedIds([]);
                  }}
                  className="px-2 py-1 min-h-[30px] font-mono text-[10px] text-zinc-400 hover:text-white underline cursor-pointer touch-manipulation"
                >
                  Clear
                </button>
                <a
                  href={threadedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    sound.playChime();
                    haptics.success();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[32px] rounded-full bg-white hover:bg-zinc-200 text-black font-display font-black text-[10.5px] uppercase tracking-wider transition-all active:scale-95 shadow-[0_0_18px_rgba(255,255,255,0.2)] touch-manipulation"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send Brief ({pinnedStops.length}) ↗</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* DESKTOP & TABLET INTERACTIVE WINDING WHITE RIBBON (>= md)         */}
      {/* ================================================================= */}
      <div
        ref={deskCanvasRef}
        onPointerMove={handleCanvasPointerMove}
        onPointerLeave={() => setMagnetic(null)}
        className="hidden md:block relative w-full max-w-[1440px] mx-auto aspect-[1616/2850] overflow-hidden"
      >
        {/* Cursor-Magnetic Ambient Spotlight Over Canvas */}
        {magnetic && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(360px circle at ${(magnetic.pointerX / 1616) * 100}% ${(magnetic.pointerY / 2850) * 100}%, rgba(212, 175, 55, 0.085), transparent 70%)`,
            }}
          />
        )}

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
            stroke={pulseSpeedBoost > 0.25 ? "rgba(212, 175, 55, 0.36)" : "rgba(212, 175, 55, 0.24)"}
            strokeWidth={Math.round(28 + pulseSpeedBoost * 16)}
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

          {/* Illuminated Brass-Gold Arc Linking Pinned Disciplines */}
          {deskThreadSpan && (
            <path
              d={DESKTOP_RIBBON_PATH}
              stroke="#D4AF37"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: `${deskThreadSpan.segLen} ${deskLen}`,
                strokeDashoffset: deskThreadSpan.offset,
                filter: "drop-shadow(0 0 14px rgba(212, 175, 55, 0.85))",
              }}
            />
          )}

          {/* Traveling photon energy pulse (stretches & reverses smoothly with velocity) */}
          <path
            d={DESKTOP_RIBBON_PATH}
            stroke="#F3E5AB"
            strokeWidth={Math.round(10 + pulseSpeedBoost * 4)}
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#dm-desk-drawn-mask)"
            className="dm-ribbon-pulse"
            style={{
              strokeDasharray: `${photonDashDesk} ${Math.max(1000, deskLen - photonDashDesk)}`,
              animationDirection: pulseReverse ? "reverse" : "normal",
              filter: "drop-shadow(0 0 12px rgba(243, 229, 171, 0.85))",
            }}
          />

          {/* Cursor-Magnetic Tangent Reticle Snapped to Closest Point on Ribbon */}
          {magnetic && (
            <g transform={`translate(${magnetic.x}, ${magnetic.y}) rotate(${magnetic.angle})`}>
              <circle r="30" fill="rgba(212, 175, 55, 0.14)" stroke="rgba(243, 229, 171, 0.65)" strokeWidth="2" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#F3E5AB" strokeWidth="2.5" strokeLinecap="round" />
              <circle r="6" fill="#FFFFFF" stroke="#09090B" strokeWidth="2.5" />
            </g>
          )}

          {/* Interactive milestone anchor beacons along ribbon bends */}
          {RIBBON_STOPS.map((stop, idx) => {
            const pt = deskNodes[stop.id];
            if (!pt) return null;
            const isStopHovered = hoveredId === stop.id || inspectedId === stop.id;
            const isPinned = pinnedIds.includes(stop.id);
            const isReached = progress >= stop.deskTrigger - 0.04;
            const isBursting = burstIds.includes(stop.id);
            if (!isReached && !isStopHovered && !isPinned) return null;

            return (
              <g
                key={`node-${stop.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${stop.leftWord} ${stop.rightWord}`}
                onClick={() => {
                  sound.playPluck(155 + idx * 14);
                  haptics.selection();
                  setInspectedId(stop.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    sound.playPluck(155 + idx * 14);
                    haptics.selection();
                    setInspectedId(stop.id);
                  }
                }}
                onMouseEnter={() => {
                  sound.playPluck(155 + idx * 14);
                  setHoveredId(stop.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="pointer-events-auto cursor-pointer focus:outline-none"
              >
                {/* Crossing Spark Burst */}
                {isBursting && (
                  <g className="dm-ribbon-burst">
                    <circle cx={pt.x} cy={pt.y} r="42" fill="none" stroke="#F3E5AB" strokeWidth="2.5" />
                    {SPARK_RAYS.map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      return (
                        <line
                          key={deg}
                          x1={pt.x + Math.cos(rad) * 14}
                          y1={pt.y + Math.sin(rad) * 14}
                          x2={pt.x + Math.cos(rad) * 34}
                          y2={pt.y + Math.sin(rad) * 34}
                          stroke="#F3E5AB"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </g>
                )}

                {(isStopHovered || isPinned) && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="34"
                    fill={isPinned ? "rgba(212, 175, 55, 0.28)" : "rgba(212, 175, 55, 0.18)"}
                    stroke="#F3E5AB"
                    strokeWidth="2.5"
                    className={isStopHovered ? "animate-ping" : ""}
                  />
                )}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isStopHovered || isPinned ? 14 : 9}
                  fill={isPinned ? "#D4AF37" : isStopHovered ? "#F3E5AB" : "#FFFFFF"}
                  stroke="#09090B"
                  strokeWidth="3.5"
                />
              </g>
            );
          })}

          {/* Starting entry white cap circle (top-right matching Two26) */}
          <circle cx="1601" cy="15" r="14" fill="#FFFFFF" />

          {/* Multi-ring glowing directional comet reticle at live drawing pen tip */}
          {penPointDesk && progress < 0.99 && (
            <g transform={`translate(${penPointDesk.x}, ${penPointDesk.y}) rotate(${penPointDesk.angle})`}>
              <ellipse
                cx={-Math.round(10 + pulseSpeedBoost * 24)}
                cy="0"
                rx={Math.round(28 + pulseSpeedBoost * 34)}
                ry="12"
                fill="rgba(243, 229, 171, 0.22)"
              />
              <circle
                r="26"
                fill="rgba(243, 229, 171, 0.16)"
                stroke="rgba(243, 229, 171, 0.65)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <polygon
                points="18,0 -6,-10 -2,0 -6,10"
                fill="#FFFFFF"
                stroke="#09090B"
                strokeWidth="2.5"
                strokeLinejoin="round"
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
            const isHovered =
              hoveredId === stop.id ||
              inspectedId === stop.id ||
              magnetic?.nearestStopId === stop.id;
            const isPinned = pinnedIds.includes(stop.id);
            const siblingDimmed = hoveredId !== null && hoveredId !== stop.id;
            const stickerWidth = Math.round(clamp01(rawIconP * 1.15) * 90);
            const shiftClass =
              stop.deskX >= 70
                ? "-translate-x-[58%] -translate-y-1/2"
                : stop.deskX <= 36
                  ? "-translate-x-[42%] -translate-y-1/2"
                  : "-translate-x-1/2 -translate-y-1/2";

            // Subtle pointer magnetic 3D tilt when cursor nears this stop
            let tiltX = 0;
            let tiltY = 0;
            if (magnetic && magnetic.nearestStopId === stop.id) {
              const sx = (stop.deskX / 100) * 1616;
              const sy = (stop.deskY / 100) * 2850;
              tiltY = Math.max(-14, Math.min(14, ((magnetic.pointerX - sx) / 220) * 14));
              tiltX = Math.max(-12, Math.min(12, -((magnetic.pointerY - sy) / 220) * 12));
            }

            return (
              <div
                key={stop.id}
                style={{ left: `${stop.deskX}%`, top: `${stop.deskY}%` }}
                onMouseEnter={() => {
                  setHoveredId(stop.id);
                  sound.playPluck(155 + idx * 14);
                }}
                onMouseLeave={() => setHoveredId(null)}
                className={`group absolute ${shiftClass} flex flex-col items-start transition-opacity duration-300 ${siblingDimmed ? "opacity-55" : "opacity-100"}`}
              >
                {/* Main Trigger Opens Inline Quick-Inspect Deliverable Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    sound.playPluck(155 + idx * 14);
                    haptics.selection();
                    setIsAutoPlaying(false);
                    autoPlayingRef.current = false;
                    setInspectedId(stop.id);
                  }}
                  aria-label={`Inspect ${stop.leftWord} ${stop.rightWord} deliverables`}
                  className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3E5AB] rounded-2xl p-1 cursor-pointer"
                >
                  {/* Split Headline: LEFT [Expanding 3D Tilt Sticker Icon] RIGHT */}
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-display font-black text-[clamp(2rem,3.6vw,3.85rem)] leading-[0.88] uppercase tracking-tight text-white [text-shadow:0_2px_10px_rgba(7,7,9,0.96),0_6px_18px_rgba(7,7,9,0.9)] transition-transform duration-300 group-hover:-translate-x-1">
                      {stop.leftWord}
                    </span>

                    <div
                      style={{
                        width: `${isHovered ? 98 : stickerWidth}px`,
                        opacity: rawIconP > 0.02 ? 1 : 0,
                        transform: `perspective(420px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.14 : Math.max(0.01, iconEased)
                          }) rotate(${isHovered ? 5 : idx % 2 === 0 ? -4 : 4}deg)`,
                      }}
                      className="h-[74px] lg:h-[88px] mx-1.5 shrink-0 flex items-center justify-center origin-center transition-[transform,width] duration-200 ease-out"
                    >
                      <ServiceStickerIcon id={stop.id} />
                    </div>

                    <span className="font-display font-black text-[clamp(2rem,3.6vw,3.85rem)] leading-[0.88] uppercase tracking-tight text-white [text-shadow:0_2px_10px_rgba(7,7,9,0.96),0_6px_18px_rgba(7,7,9,0.9)] transition-transform duration-300 group-hover:translate-x-1">
                      {stop.rightWord}
                    </span>
                  </div>
                </button>

                {/* Bottom Capsule Row: Tilted Description Pill + Interactive "+ Pin" & Direct Link */}
                <div
                  style={{
                    opacity: clamp01(rawPillP * 1.4),
                    transform: `scale(${Math.max(0.01, pillEased)}) rotate(${isHovered ? -2 : -5}deg)`,
                  }}
                  className="mt-1.5 self-end sm:mr-2 flex items-center gap-1.5 origin-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(155 + idx * 14);
                      haptics.selection();
                      setIsAutoPlaying(false);
                      autoPlayingRef.current = false;
                      setInspectedId(stop.id);
                    }}
                    className={`max-w-[255px] rounded-full px-4 py-2 border transition-colors duration-300 shadow-[0_10px_28px_rgba(0,0,0,0.65)] text-left cursor-pointer ${isHovered
                      ? "bg-white text-[#09090B] border-white"
                      : isPinned
                        ? "bg-[#151209]/95 text-[#F3E5AB] border-[#D4AF37]"
                        : "bg-[#09090B]/95 text-white border-white"
                      }`}
                  >
                    <p className="font-sans text-[11.5px] lg:text-[12.5px] font-medium leading-snug">
                      {stop.description}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTogglePin(stop.id)}
                    aria-pressed={isPinned}
                    title={isPinned ? "Remove from custom scope" : "Pin discipline to your threaded quote"}
                    className={`px-2.5 py-2 min-h-[34px] rounded-full border font-mono text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-lg ${isPinned
                      ? "bg-[#D4AF37] text-black border-[#F3E5AB]"
                      : "bg-[#111114]/95 text-zinc-200 border-white/30 hover:border-white hover:text-white"
                      }`}
                  >
                    {isPinned ? "✓ Pinned" : "+ Pin"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* MOBILE RESPONSIVE S-CURVE WHITE RIBBON (< md)                     */}
      {/* ================================================================= */}
      <div
        ref={mobCanvasRef}
        className="md:hidden relative w-full max-w-[430px] mx-auto aspect-[407/2030] overflow-hidden px-3"
      >
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

          {/* Illuminated Brass-Gold Threaded Arc on Mobile */}
          {mobThreadSpan && (
            <path
              d={MOBILE_RIBBON_PATH}
              stroke="#D4AF37"
              strokeWidth={10}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: `${mobThreadSpan.segLen} ${mobLen}`,
                strokeDashoffset: mobThreadSpan.offset,
                filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.85))",
              }}
            />
          )}

          <path
            d={MOBILE_RIBBON_PATH}
            stroke="#F3E5AB"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#dm-mob-drawn-mask)"
            className="dm-ribbon-pulse-mob"
            style={{
              strokeDasharray: `${photonDashMob} ${Math.max(500, mobLen - photonDashMob)}`,
              animationDirection: pulseReverse ? "reverse" : "normal",
              filter: "drop-shadow(0 0 8px rgba(243, 229, 171, 0.85))",
            }}
          />

          {/* Interactive Mobile Curve Beacons + Crossing Sparks */}
          {RIBBON_STOPS.map((stop, idx) => {
            const pm = mobNodes[stop.id];
            if (!pm) return null;
            const isActiveMob = mobileFocusId === stop.id || inspectedId === stop.id;
            const isPinned = pinnedIds.includes(stop.id);
            const isReached = progress >= stop.mobTrigger - 0.05;
            const isBursting = burstIds.includes(stop.id);
            if (!isReached && !isActiveMob && !isPinned) return null;

            return (
              <g
                key={`mob-node-${stop.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${stop.leftWord} ${stop.rightWord}`}
                onClick={() => {
                  sound.playPluck(155 + idx * 14);
                  haptics.selection();
                  setInspectedId(stop.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    sound.playPluck(155 + idx * 14);
                    haptics.selection();
                    setInspectedId(stop.id);
                  }
                }}
                className="pointer-events-auto cursor-pointer focus:outline-none"
              >
                {isBursting && (
                  <g className="dm-ribbon-burst">
                    <circle cx={pm.x} cy={pm.y} r="32" fill="none" stroke="#F3E5AB" strokeWidth="2.5" />
                    {SPARK_RAYS.map((deg) => {
                      const rad = (deg * Math.PI) / 180;
                      return (
                        <line
                          key={deg}
                          x1={pm.x + Math.cos(rad) * 10}
                          y1={pm.y + Math.sin(rad) * 10}
                          x2={pm.x + Math.cos(rad) * 26}
                          y2={pm.y + Math.sin(rad) * 26}
                          stroke="#F3E5AB"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      );
                    })}
                  </g>
                )}
                {(isActiveMob || isPinned) && (
                  <circle
                    cx={pm.x}
                    cy={pm.y}
                    r="24"
                    fill={isPinned ? "rgba(212, 175, 55, 0.26)" : "rgba(243, 229, 171, 0.16)"}
                    stroke="#F3E5AB"
                    strokeWidth="2"
                  />
                )}
                <circle
                  cx={pm.x}
                  cy={pm.y}
                  r={isActiveMob || isPinned ? 12 : 8}
                  fill={isPinned ? "#D4AF37" : isActiveMob ? "#F3E5AB" : "#FFFFFF"}
                  stroke="#09090B"
                  strokeWidth="3"
                />
              </g>
            );
          })}

          {penPointMob && progress < 0.99 && (
            <g transform={`translate(${penPointMob.x}, ${penPointMob.y}) rotate(${penPointMob.angle})`}>
              <circle
                r="18"
                fill="rgba(243, 229, 171, 0.2)"
                stroke="rgba(243, 229, 171, 0.65)"
                strokeWidth="1.5"
              />
              <polygon
                points="14,0 -5,-8 -2,0 -5,8"
                fill="#FFFFFF"
                stroke="#09090B"
                strokeWidth="2"
                strokeLinejoin="round"
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
            const stickerW = Math.round(clamp01(rawIconP * 1.15) * 44);
            const isLeft = stop.mobAlign === "left";
            const isFocusedMob = mobileFocusId === stop.id || inspectedId === stop.id;
            const isPinned = pinnedIds.includes(stop.id);

            return (
              <div
                key={stop.id}
                style={{ top: `${stop.mobY}%` }}
                className={`absolute left-2.5 right-2.5 sm:left-3 sm:right-3 -translate-y-1/2 flex ${isLeft ? "justify-start" : "justify-end"
                  }`}
              >
                <div className={`flex flex-col ${isLeft ? "items-start" : "items-end"} max-w-full`}>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(155 + idx * 14);
                      haptics.selection();
                      setIsAutoPlaying(false);
                      autoPlayingRef.current = false;
                      setInspectedId(stop.id);
                    }}
                    className={`flex items-center whitespace-nowrap max-w-full focus:outline-none cursor-pointer touch-manipulation ${isFocusedMob ? "scale-[1.03]" : ""
                      } transition-transform duration-200`}
                  >
                    <span className="font-display font-black text-[clamp(1.12rem,5.2vw,1.5rem)] leading-none uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                      {stop.leftWord}
                    </span>

                    <div
                      style={{
                        width: `${isFocusedMob && stickerW > 20 ? stickerW + 6 : stickerW}px`,
                        opacity: rawIconP > 0.02 ? 1 : 0,
                        transform: `scale(${Math.max(0.01, iconEased)})`,
                      }}
                      className="h-[46px] sm:h-[52px] mx-1 shrink-0 flex items-center justify-center origin-center"
                    >
                      <ServiceStickerIcon id={stop.id} />
                    </div>

                    <span className="font-display font-black text-[clamp(1.12rem,5.2vw,1.5rem)] leading-none uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                      {stop.rightWord}
                    </span>
                  </button>

                  <div
                    style={{
                      opacity: clamp01(rawPillP * 1.4),
                      transform: `scale(${Math.max(0.01, pillEased)}) rotate(-4deg)`,
                    }}
                    className="mt-1.5 flex items-center gap-1.5 max-w-full"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(155 + idx * 14);
                        haptics.selection();
                        setIsAutoPlaying(false);
                        autoPlayingRef.current = false;
                        setInspectedId(stop.id);
                      }}
                      className={`max-w-[205px] rounded-full px-3 py-2 border shadow-xl text-left cursor-pointer touch-manipulation transition-colors ${isFocusedMob
                        ? "bg-white text-black border-white"
                        : isPinned
                          ? "bg-[#151209]/95 text-[#F3E5AB] border-[#D4AF37]"
                          : "bg-[#09090B]/95 text-white border-white"
                        }`}
                    >
                      <p className="font-sans text-[10.5px] sm:text-[11px] font-medium leading-snug">
                        {stop.description}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTogglePin(stop.id)}
                      aria-pressed={isPinned}
                      aria-label={isPinned ? "Unpin from scope" : "Pin to scope"}
                      className={`px-2.5 py-2 min-h-[36px] rounded-full border font-mono text-[10px] font-bold uppercase cursor-pointer touch-manipulation shrink-0 ${isPinned
                        ? "bg-[#D4AF37] text-black border-[#F3E5AB]"
                        : "bg-[#111114]/95 text-white border-white/30"
                        }`}
                    >
                      {isPinned ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* INLINE QUICK-INSPECT DELIVERABLE OVERLAY (No page navigation needed)  */}
      {/* Zero collision with bottom ProposalFloatingBar or ApkInstallPopup     */}
      {/* ===================================================================== */}
      {inspectedStop && inspectedSpec && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dm-swirl-inspect-title"
          onClick={() => {
            sound.playPluck(120);
            setInspectedId(null);
          }}
          className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150 overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#0c0c10] border-t sm:border border-white/20 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 space-y-5 text-left text-white shadow-[0_28px_90px_rgba(0,0,0,0.96)] max-h-[88dvh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 shrink-0">
                  <ServiceStickerIcon id={inspectedStop.id} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB]">
                      STOP {String(inspectedIdx + 1).padStart(2, "0")} / 08
                    </span>
                    <span className="font-mono text-[10.5px] font-bold text-zinc-300">
                      {inspectedSpec.metric}
                    </span>
                  </div>
                  <h3
                    id="dm-swirl-inspect-title"
                    className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white mt-1 leading-tight"
                  >
                    {inspectedSpec.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(120);
                  setInspectedId(null);
                }}
                aria-label="Close discipline inspector"
                className="p-2 min-w-[40px] min-h-[40px] rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center justify-center cursor-pointer touch-manipulation shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Summary */}
            <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {inspectedSpec.summary}
            </p>

            {/* Target KPI & Turnaround */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#F3E5AB] font-bold">
                  <Target className="w-3.5 h-3.5" />
                  <span>Target Outcome</span>
                </div>
                <p className="font-sans text-white font-medium">{inspectedSpec.targetKpi}</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Cadence &amp; Speed</span>
                </div>
                <p className="font-sans text-zinc-200 font-medium">{inspectedSpec.turnaround}</p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-2">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-zinc-400 block">
                CORE EXECUTION DELIVERABLES
              </span>
              <ul className="space-y-2">
                {inspectedSpec.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200 font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="flex flex-wrap items-center gap-1.5">
              {inspectedSpec.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/12 font-mono text-[10.5px] text-zinc-300"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Actions Footer: Prev/Next Tour + Pin + Full Sheet */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const prevIdx = (inspectedIdx - 1 + RIBBON_STOPS.length) % RIBBON_STOPS.length;
                    handleJumpToStop(RIBBON_STOPS[prevIdx], prevIdx, true);
                  }}
                  aria-label="Previous stop on trail"
                  className="px-3 py-2.5 min-h-[44px] rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white flex items-center justify-center gap-1 font-mono text-xs uppercase cursor-pointer touch-manipulation"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = (inspectedIdx + 1) % RIBBON_STOPS.length;
                    handleJumpToStop(RIBBON_STOPS[nextIdx], nextIdx, true);
                  }}
                  aria-label="Next stop on trail"
                  className="px-3 py-2.5 min-h-[44px] rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-white flex items-center justify-center gap-1 font-mono text-xs uppercase cursor-pointer touch-manipulation"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePin(inspectedStop.id)}
                  aria-pressed={pinnedIds.includes(inspectedStop.id)}
                  className={`flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer touch-manipulation ${pinnedIds.includes(inspectedStop.id)
                    ? "bg-[#D4AF37] text-black border-[#F3E5AB]"
                    : "bg-white/[0.06] hover:bg-white/[0.14] text-white border-white/20"
                    }`}
                >
                  {pinnedIds.includes(inspectedStop.id) ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Pinned to Scope</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Pin to Scope</span>
                    </>
                  )}
                </button>

                <Link
                  href={inspectedStop.href ?? `/services/${inspectedStop.slug}`}
                  onClick={() => {
                    sound.playChime();
                    haptics.selection();
                    setInspectedId(null);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all touch-manipulation"
                >
                  <span>Full Breakdown</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
