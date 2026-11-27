"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  MapPin,
  Plus,
  Minus,
  LocateFixed,
  Navigation,
  Copy,
  Check,
  Layers,
  Globe,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

export const HQ_COORDS = {
  lat: 12.9002701,
  lng: 77.6454546,
  label: "DESI MUCHADS HQ",
  address: "Hosapalaya, Bengaluru, Karnataka 560068",
  mapsUrl: "https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw",
};

type MapTheme = "dark" | "day" | "hybrid";

interface Landmark {
  id: string;
  name: string;
  subtitle: string;
  lat: number;
  lng: number;
  kind: "hq" | "metro" | "park" | "hub";
}

const LANDMARKS: Landmark[] = [
  {
    id: "hq",
    name: "DESI MUCHADS HQ",
    subtitle: "Performance Studio & Growth Desk",
    lat: HQ_COORDS.lat,
    lng: HQ_COORDS.lng,
    kind: "hq",
  },
  {
    id: "hsr-2",
    name: "HSR Sector 2",
    subtitle: "27th Main Startup Corridor · 0.8 km N",
    lat: 12.9078,
    lng: 77.6468,
    kind: "hub",
  },
  {
    id: "lake",
    name: "Somasundarapalya Lake",
    subtitle: "Lakefront Ecological Park · 0.9 km NE",
    lat: 12.9054,
    lng: 77.6518,
    kind: "park",
  },
  {
    id: "kudlu",
    name: "Kudlu Gate · NH 44",
    subtitle: "Hosur Elevated Corridor · 1.1 km SW",
    lat: 12.8926,
    lng: 77.6388,
    kind: "metro",
  },
  {
    id: "bommanahalli",
    name: "Bommanahalli Jct",
    subtitle: "NH 44 · 2.2 km W",
    lat: 12.9016,
    lng: 77.6248,
    kind: "hub",
  },
  {
    id: "silkboard",
    name: "Silk Board Metro",
    subtitle: "Yellow & Blue Line Interchange · 3.1 km NW",
    lat: 12.9171,
    lng: 77.6229,
    kind: "metro",
  },
];

// Real Bengaluru water bodies (approx geographic bounds around Hosapalaya & HSR)
const WATER_POLYS: Array<{ name: string; pts: [number, number][] }> = [
  {
    name: "Somasundarapalya Lake",
    pts: [
      [12.9036, 77.6496],
      [12.9058, 77.6492],
      [12.9079, 77.6505],
      [12.9082, 77.6531],
      [12.9064, 77.6548],
      [12.9039, 77.6542],
      [12.9030, 77.6518],
    ],
  },
  {
    name: "Kudlu Chikka Lake",
    pts: [
      [12.8918, 77.6512],
      [12.8938, 77.6510],
      [12.8944, 77.6536],
      [12.8925, 77.6542],
    ],
  },
  {
    name: "Agara Lake",
    pts: [
      [12.9205, 77.6385],
      [12.9258, 77.6392],
      [12.9265, 77.6455],
      [12.9212, 77.6458],
      [12.9196, 77.6422],
    ],
  },
  {
    name: "Madiwala Lake",
    pts: [
      [12.9065, 77.6145],
      [12.9124, 77.6152],
      [12.9128, 77.6238],
      [12.9072, 77.6232],
    ],
  },
];

const PARK_POLYS: Array<{ pts: [number, number][] }> = [
  {
    pts: [
      [12.9026, 77.6486],
      [12.9088, 77.6484],
      [12.9090, 77.6556],
      [12.9024, 77.6550],
    ],
  },
  {
    pts: [
      [12.9074, 77.6422],
      [12.9096, 77.6422],
      [12.9096, 77.6448],
      [12.9074, 77.6448],
    ],
  },
  {
    pts: [
      [12.8958, 77.6376],
      [12.8980, 77.6376],
      [12.8980, 77.6402],
      [12.8958, 77.6402],
    ],
  },
];

interface RoadSegment {
  tier: "highway" | "arterial" | "collector" | "minor";
  name?: string;
  shield?: string;
  pts: [number, number][];
}

const ROADS: RoadSegment[] = [
  // Highways
  {
    tier: "highway",
    name: "Hosur Rd",
    shield: "NH 44",
    pts: [
      [12.924, 77.616],
      [12.9171, 77.6229],
      [12.9016, 77.6248],
      [12.8926, 77.6388],
      [12.883, 77.647],
    ],
  },
  {
    tier: "highway",
    name: "Outer Ring Rd",
    shield: "ORR",
    pts: [
      [12.914, 77.610],
      [12.9171, 77.6229],
      [12.9195, 77.636],
      [12.9212, 77.650],
      [12.9228, 77.665],
    ],
  },
  // Arterials
  {
    tier: "arterial",
    name: "Hosapalaya Main Rd",
    pts: [
      [12.9082, 77.6428],
      [12.9045, 77.6442],
      [12.9005, 77.6454],
      [12.8965, 77.6446],
      [12.8926, 77.6388],
    ],
  },
  {
    tier: "arterial",
    name: "27th Main Rd · HSR",
    pts: [
      [12.9210, 77.6502],
      [12.9135, 77.6506],
      [12.9065, 77.6484],
      [12.9012, 77.6472],
    ],
  },
  {
    tier: "arterial",
    name: "Mangammanapalya Rd",
    pts: [
      [12.9016, 77.6248],
      [12.8998, 77.6335],
      [12.8992, 77.6410],
      [12.9002, 77.6458],
      [12.9014, 77.6525],
    ],
  },
  {
    tier: "arterial",
    name: "Kudlu Main Rd",
    pts: [
      [12.8926, 77.6388],
      [12.8942, 77.6462],
      [12.8955, 77.6552],
    ],
  },
  // Collectors
  {
    tier: "collector",
    name: "19th Main HSR",
    pts: [
      [12.9185, 77.6435],
      [12.9110, 77.6438],
      [12.9040, 77.6435],
      [12.8975, 77.6422],
    ],
  },
  {
    tier: "collector",
    name: "24th Main Rd",
    pts: [
      [12.916, 77.6476],
      [12.908, 77.6478],
      [12.902, 77.6474],
    ],
  },
  {
    tier: "collector",
    name: "Muneshwara Main",
    pts: [
      [12.9032, 77.6345],
      [12.9026, 77.6418],
      [12.9022, 77.6480],
    ],
  },
  {
    tier: "collector",
    name: "Somasundarapalya Rd",
    pts: [
      [12.9025, 77.6475],
      [12.9026, 77.6562],
      [12.9055, 77.6602],
    ],
  },
  {
    tier: "collector",
    name: "Begur-Koppa Rd",
    pts: [
      [12.9016, 77.6248],
      [12.8915, 77.6258],
      [12.8825, 77.6272],
    ],
  },
];

// Deterministic local Hosapalaya/HSR neighborhood street grid & extruded 2.5D city blocks
const MINOR_STREETS: [number, number][][] = [];
for (let k = -6; k <= 6; k++) {
  const lat = HQ_COORDS.lat + k * 0.00145;
  MINOR_STREETS.push([
    [lat, HQ_COORDS.lng - 0.014],
    [lat + 0.00025, HQ_COORDS.lng + 0.012],
  ]);
}
for (let k = -7; k <= 6; k++) {
  const lng = HQ_COORDS.lng + k * 0.0018;
  MINOR_STREETS.push([
    [HQ_COORDS.lat - 0.009, lng - 0.0003],
    [HQ_COORDS.lat + 0.010, lng + 0.0002],
  ]);
}

interface BuildingFootprint {
  lat: number;
  lng: number;
  wDeg: number;
  hDeg: number;
  elev: number;
}

const BUILDINGS: BuildingFootprint[] = (() => {
  const list: BuildingFootprint[] = [];
  for (let i = -9; i <= 9; i++) {
    for (let j = -11; j <= 10; j++) {
      const seed = Math.abs(Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1;
      if (seed < 0.28) continue;
      const lat = HQ_COORDS.lat + i * 0.00095 + (seed - 0.5) * 0.00025;
      const lng = HQ_COORDS.lng + j * 0.00115 + ((seed * 7) % 1 - 0.5) * 0.00025;
      // Keep lakes clear of buildings
      if (lat > 12.9026 && lat < 12.9090 && lng > 77.6484 && lng < 77.6556) continue;
      if (lat > 12.9195 && lat < 12.9270 && lng > 77.6380 && lng < 77.6462) continue;
      if (lat > 12.9062 && lat < 12.9130 && lng > 77.6140 && lng < 77.6242) continue;
      list.push({
        lat,
        lng,
        wDeg: 0.00042 + (seed * 0.00042),
        hDeg: 0.00032 + (((seed * 3.7) % 1) * 0.00036),
        elev: Math.round(4 + ((seed * 11.3) % 1) * 14),
      });
    }
  }
  return list;
})();

const THEMES: Record<
  MapTheme,
  {
    bg: string;
    grid: string;
    park: string;
    water: string;
    waterStroke: string;
    bldgSide: string;
    bldgTop: string;
    bldgStroke: string;
    minor: string;
    collector: string;
    arterial: string;
    arterialEdge: string;
    highway: string;
    highwayEdge: string;
    label: string;
    labelHalo: string;
  }
> = {
  dark: {
    bg: "#12151b",
    grid: "rgba(255,255,255,0.025)",
    park: "#132922",
    water: "#0d2942",
    waterStroke: "#1e4b73",
    bldgSide: "#181d26",
    bldgTop: "#202733",
    bldgStroke: "rgba(255,255,255,0.06)",
    minor: "#1e2430",
    collector: "#2a3140",
    arterial: "#384154",
    arterialEdge: "#11141a",
    highway: "#eab308",
    highwayEdge: "#713f12",
    label: "#d4d4d8",
    labelHalo: "#090b10",
  },
  day: {
    bg: "#f2efe9",
    grid: "rgba(0,0,0,0.03)",
    park: "#cde8cd",
    water: "#9dd2f7",
    waterStroke: "#6bb4ea",
    bldgSide: "#d9d5cc",
    bldgTop: "#e6e2da",
    bldgStroke: "rgba(0,0,0,0.08)",
    minor: "#ffffff",
    collector: "#ffffff",
    arterial: "#ffffff",
    arterialEdge: "#d4cfc6",
    highway: "#fbbf24",
    highwayEdge: "#b45309",
    label: "#27272a",
    labelHalo: "#ffffff",
  },
  hybrid: {
    bg: "#091815",
    grid: "rgba(16,185,129,0.07)",
    park: "#0f3025",
    water: "#082838",
    waterStroke: "#0ea5e9",
    bldgSide: "#0e221e",
    bldgTop: "#14302a",
    bldgStroke: "rgba(52,211,153,0.14)",
    minor: "#15362e",
    collector: "#1d4a3f",
    arterial: "#256051",
    arterialEdge: "#06120f",
    highway: "#34d399",
    highwayEdge: "#064e3b",
    label: "#ecfdf5",
    labelHalo: "#040d0b",
  },
};

interface BengaluruStudioMapProps {
  className?: string;
  heightClass?: string;
}

export function BengaluruStudioMap({
  className = "",
  heightClass = "h-72 sm:h-80",
}: BengaluruStudioMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<MapTheme>("dark");
  const [useGoogleEmbed, setUseGoogleEmbed] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(LANDMARKS[0]);
  const [copied, setCopied] = useState(false);

  const camRef = useRef({
    lat: HQ_COORDS.lat,
    lng: HQ_COORDS.lng,
    zoom: 15.6,
    targetLat: HQ_COORDS.lat,
    targetLng: HQ_COORDS.lng,
    targetZoom: 15.6,
  });

  const [readout, setReadout] = useState({
    lat: HQ_COORDS.lat,
    lng: HQ_COORDS.lng,
    zoom: 15.6,
    scaleMeters: 200,
  });

  const project = useCallback((lat: number, lng: number, w: number, h: number, cLat: number, cLng: number, zoom: number) => {
    const scale = 256 * Math.pow(2, zoom);
    const cosLat = Math.cos((HQ_COORDS.lat * Math.PI) / 180);
    const pxPerDegLng = scale / 360;
    const pxPerDegLat = (scale / 360) / cosLat;
    const x = w / 2 + (lng - cLng) * pxPerDegLng;
    const y = h / 2 - (lat - cLat) * pxPerDegLat;
    return { x, y, pxPerDegLng, pxPerDegLat };
  }, []);

  const unproject = useCallback((x: number, y: number, w: number, h: number, cLat: number, cLng: number, zoom: number) => {
    const scale = 256 * Math.pow(2, zoom);
    const cosLat = Math.cos((HQ_COORDS.lat * Math.PI) / 180);
    const pxPerDegLng = scale / 360;
    const pxPerDegLat = (scale / 360) / cosLat;
    return {
      lat: cLat - (y - h / 2) / pxPerDegLat,
      lng: cLng + (x - w / 2) / pxPerDegLng,
    };
  }, []);

  const handleCopyCoords = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${HQ_COORDS.lat}, ${HQ_COORDS.lng}`).catch(() => {});
    }
    sound.playTick();
    haptics.light();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleZoom = (delta: number) => {
    sound.playTick();
    haptics.light();
    camRef.current.targetZoom = Math.max(13.5, Math.min(18.0, camRef.current.targetZoom + delta));
  };

  const handleFocusLandmark = (lm: Landmark) => {
    sound.playPluck(220);
    haptics.selection();
    setSelectedLandmark(lm);
    camRef.current.targetLat = lm.lat;
    camRef.current.targetLng = lm.lng;
    camRef.current.targetZoom = lm.id === "hq" ? 15.8 : 15.4;
  };

  useEffect(() => {
    if (useGoogleEmbed) return;
    const canvas = canvasRef.current;
    const box = containerRef.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let destroyed = false;
    let pulse = 0;
    let isDragging = false;
    let dragMoved = false;
    let dragStart = { x: 0, y: 0, lat: 0, lng: 0 };
    let lastTs = performance.now();

    const fit = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);

    const drawFrame = (now: number) => {
      if (destroyed) return;
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      pulse += dt * 2.4;

      const cam = camRef.current;
      cam.lat += (cam.targetLat - cam.lat) * Math.min(1, dt * 10);
      cam.lng += (cam.targetLng - cam.lng) * Math.min(1, dt * 10);
      cam.zoom += (cam.targetZoom - cam.zoom) * Math.min(1, dt * 10);

      const pal = THEMES[theme];
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, W, H);

      const { pxPerDegLng, pxPerDegLat } = project(cam.lat, cam.lng, W, H, cam.lat, cam.lng, cam.zoom);

      // Subtle geo grid lines (0.0025 deg ~ 275m)
      const stepDeg = 0.0025;
      const tl = unproject(0, 0, W, H, cam.lat, cam.lng, cam.zoom);
      const br = unproject(W, H, W, H, cam.lat, cam.lng, cam.zoom);
      ctx.strokeStyle = pal.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gLng = Math.floor(tl.lng / stepDeg) * stepDeg; gLng <= br.lng; gLng += stepDeg) {
        const p = project(cam.lat, gLng, W, H, cam.lat, cam.lng, cam.zoom);
        ctx.moveTo(p.x, 0);
        ctx.lineTo(p.x, H);
      }
      for (let gLat = Math.floor(br.lat / stepDeg) * stepDeg; gLat <= tl.lat; gLat += stepDeg) {
        const p = project(gLat, cam.lng, W, H, cam.lat, cam.lng, cam.zoom);
        ctx.moveTo(0, p.y);
        ctx.lineTo(W, p.y);
      }
      ctx.stroke();

      // 1. Parks
      ctx.fillStyle = pal.park;
      PARK_POLYS.forEach((pk) => {
        ctx.beginPath();
        pk.pts.forEach(([lt, lg], idx) => {
          const p = project(lt, lg, W, H, cam.lat, cam.lng, cam.zoom);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill();
      });

      // 2. Water Bodies
      WATER_POLYS.forEach((wk) => {
        ctx.beginPath();
        wk.pts.forEach(([lt, lg], idx) => {
          const p = project(lt, lg, W, H, cam.lat, cam.lng, cam.zoom);
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fillStyle = pal.water;
        ctx.fill();
        ctx.strokeStyle = pal.waterStroke;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Water label at centroid
        const cLat = wk.pts.reduce((s, x) => s + x[0], 0) / wk.pts.length;
        const cLng = wk.pts.reduce((s, x) => s + x[1], 0) / wk.pts.length;
        const cp = project(cLat, cLng, W, H, cam.lat, cam.lng, cam.zoom);
        if (cp.x > -80 && cp.x < W + 80 && cp.y > -40 && cp.y < H + 40) {
          ctx.font = "600 9.5px ui-sans-serif, system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = theme === "day" ? "#0369a1" : "#7dd3fc";
          ctx.fillText(wk.name, cp.x, cp.y);
        }
      });

      // 3. Minor Residential Street Grid
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = pal.minor;
      ctx.lineWidth = Math.max(1.5, Math.pow(2, cam.zoom - 15) * 2.1);
      ctx.beginPath();
      MINOR_STREETS.forEach((seg) => {
        const a = project(seg[0][0], seg[0][1], W, H, cam.lat, cam.lng, cam.zoom);
        const b = project(seg[1][0], seg[1][1], W, H, cam.lat, cam.lng, cam.zoom);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      });
      ctx.stroke();

      // 4. Extruded 2.5D City Buildings (visible sharply at medium/close zooms)
      if (cam.zoom >= 14.3) {
        const bAlpha = Math.min(1, (cam.zoom - 14.2) * 1.4);
        ctx.save();
        ctx.globalAlpha = bAlpha;
        BUILDINGS.forEach((b) => {
          const p = project(b.lat, b.lng, W, H, cam.lat, cam.lng, cam.zoom);
          const bw = b.wDeg * pxPerDegLng;
          const bh = b.hDeg * pxPerDegLat;
          if (p.x + bw < -10 || p.x - bw > W + 10 || p.y + bh < -10 || p.y - bh > H + 10) return;
          const dz = (b.elev * Math.pow(2, cam.zoom - 16)) * 0.45;
          // Shadow/Extrusion Side
          ctx.fillStyle = pal.bldgSide;
          ctx.fillRect(p.x - bw / 2 + 2, p.y - bh / 2 + 2, bw, bh);
          // Rooftop top plane
          ctx.fillStyle = pal.bldgTop;
          ctx.strokeStyle = pal.bldgStroke;
          ctx.lineWidth = 0.8;
          ctx.fillRect(p.x - bw / 2 - dz * 0.35, p.y - bh / 2 - dz, bw, bh);
          ctx.strokeRect(p.x - bw / 2 - dz * 0.35, p.y - bh / 2 - dz, bw, bh);
        });
        ctx.restore();
      }

      // 5. Collector, Arterial & Highway Roads
      const zoomScale = Math.pow(2, cam.zoom - 15.4);
      const drawRoadList = (tier: RoadSegment["tier"], w: number, col: string, edgeCol?: string) => {
        ROADS.filter((r) => r.tier === tier).forEach((road) => {
          const pts = road.pts.map(([lt, lg]) => project(lt, lg, W, H, cam.lat, cam.lng, cam.zoom));
          const trace = () => {
            ctx.beginPath();
            pts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
          };
          if (edgeCol) {
            trace();
            ctx.strokeStyle = edgeCol;
            ctx.lineWidth = w + 2.6;
            ctx.stroke();
          }
          trace();
          ctx.strokeStyle = col;
          ctx.lineWidth = w;
          ctx.stroke();
        });
      };
      drawRoadList("collector", Math.max(2.8, 3.6 * zoomScale), pal.collector, pal.arterialEdge);
      drawRoadList("arterial", Math.max(4.4, 5.6 * zoomScale), pal.arterial, pal.arterialEdge);
      drawRoadList("highway", Math.max(5.5, 7.2 * zoomScale), pal.highway, pal.highwayEdge);

      // 6. Road Names & Shields (collision-safe around HQ teardrop marker)
      const hqPt = project(HQ_COORDS.lat, HQ_COORDS.lng, W, H, cam.lat, cam.lng, cam.zoom);
      ctx.font = "700 9.5px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ROADS.forEach((r) => {
        if (!r.name && !r.shield) return;
        const midIdx = Math.floor(r.pts.length / 2);
        const candidates = [midIdx, Math.max(0, midIdx - 1), Math.min(r.pts.length - 1, midIdx + 1)];
        let chosenIdx = midIdx;
        let mp = project(r.pts[midIdx][0], r.pts[midIdx][1], W, H, cam.lat, cam.lng, cam.zoom);
        for (const cIdx of candidates) {
          const cp = project(r.pts[cIdx][0], r.pts[cIdx][1], W, H, cam.lat, cam.lng, cam.zoom);
          if (
            cp.x >= 34 &&
            cp.x <= W - 34 &&
            cp.y >= 34 &&
            cp.y <= H - 34 &&
            Math.hypot(cp.x - hqPt.x, cp.y - hqPt.y) > 74
          ) {
            chosenIdx = cIdx;
            mp = cp;
            break;
          }
        }
        if (mp.x < 24 || mp.x > W - 24 || mp.y < 24 || mp.y > H - 24) return;
        if (!r.shield && Math.hypot(mp.x - hqPt.x, mp.y - hqPt.y) < 68) return;

        if (r.shield) {
          ctx.fillStyle = theme === "day" ? "#f59e0b" : "#1e293b";
          ctx.strokeStyle = pal.highway;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.roundRect(mp.x - 20, mp.y - 9, 40, 18, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = theme === "day" ? "#09090b" : "#fde047";
          ctx.fillText(r.shield, mp.x, mp.y + 0.5);
        } else if (r.name && (r.tier === "arterial" || cam.zoom >= 15.2)) {
          const prevPt = r.pts[Math.max(0, chosenIdx - 1)];
          const nextPt = r.pts[Math.min(r.pts.length - 1, chosenIdx + 1)];
          const pA = project(prevPt[0], prevPt[1], W, H, cam.lat, cam.lng, cam.zoom);
          const pB = project(nextPt[0], nextPt[1], W, H, cam.lat, cam.lng, cam.zoom);
          let angle = Math.atan2(pB.y - pA.y, pB.x - pA.x);
          if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI;
          ctx.save();
          ctx.translate(mp.x, mp.y);
          ctx.rotate(angle);
          ctx.lineWidth = 3.2;
          ctx.strokeStyle = pal.labelHalo;
          ctx.strokeText(r.name, 0, -9);
          ctx.fillStyle = pal.label;
          ctx.fillText(r.name, 0, -9);
          ctx.restore();
        }
      });

      // 7. Landmark Pins & Central Animated HQ Marker
      LANDMARKS.forEach((lm) => {
        const lp = project(lm.lat, lm.lng, W, H, cam.lat, cam.lng, cam.zoom);
        if (lp.x < -30 || lp.x > W + 30 || lp.y < -30 || lp.y > H + 30) return;

        if (lm.kind === "hq") {
          const rRing = 12 + ((Math.sin(pulse) + 1) * 0.5) * 20;
          ctx.beginPath();
          ctx.arc(lp.x, lp.y, rRing, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${(0.28 - (rRing - 12) * 0.011).toFixed(2)})`;
          ctx.fill();

          // Drop shadow + Pin
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.beginPath();
          ctx.ellipse(lp.x, lp.y + 2, 7, 3, 0, 0, Math.PI * 2);
          ctx.fill();

          // Teardrop marker
          ctx.beginPath();
          ctx.arc(lp.x, lp.y - 14, 10, Math.PI * 0.85, Math.PI * 2.15);
          ctx.lineTo(lp.x, lp.y);
          ctx.closePath();
          ctx.fillStyle = "#D4AF37";
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(lp.x, lp.y - 14, 4, 0, Math.PI * 2);
          ctx.fillStyle = "#09090B";
          ctx.fill();

          // Floating HQ Badge
          const txt = "DESI MUCHADS HQ";
          ctx.font = "900 10px ui-monospace, SFMono-Regular, Menlo, monospace";
          const tw = ctx.measureText(txt).width + 14;
          const bx = lp.x - tw / 2;
          const by = lp.y - 42;
          ctx.fillStyle = "rgba(9, 9, 11, 0.94)";
          ctx.strokeStyle = "#D4AF37";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(bx, by, tw, 19, 5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(txt, lp.x, by + 9.5);
        } else {
          const isSel = selectedLandmark.id === lm.id;
          ctx.beginPath();
          ctx.arc(lp.x, lp.y, isSel ? 6 : 4.5, 0, Math.PI * 2);
          ctx.fillStyle = lm.kind === "metro" ? "#38BDF8" : lm.kind === "park" ? "#34D399" : "#F59E0B";
          ctx.fill();
          ctx.strokeStyle = pal.labelHalo;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.font = "700 9px ui-sans-serif, system-ui, sans-serif";
          ctx.textAlign = "left";
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = pal.labelHalo;
          ctx.strokeText(lm.name, lp.x + 8, lp.y);
          ctx.fillStyle = isSel ? "#FFFFFF" : pal.label;
          ctx.fillText(lm.name, lp.x + 8, lp.y);
        }
      });

      raf = requestAnimationFrame(drawFrame);
    };

    raf = requestAnimationFrame(drawFrame);

    // Interactive Drag & Pinch-free Wheel/Click Handlers
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      dragMoved = false;
      dragStart = {
        x: e.clientX,
        y: e.clientY,
        lat: camRef.current.targetLat,
        lng: camRef.current.targetLng,
      };
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        if (Math.hypot(dx, dy) > 4) dragMoved = true;

        const scale = 256 * Math.pow(2, camRef.current.zoom);
        const cosLat = Math.cos((HQ_COORDS.lat * Math.PI) / 180);
        const pxPerDegLng = scale / 360;
        const pxPerDegLat = (scale / 360) / cosLat;

        const nLat = Math.max(12.875, Math.min(12.930, dragStart.lat + dy / pxPerDegLat));
        const nLng = Math.max(77.610, Math.min(77.672, dragStart.lng - dx / pxPerDegLng));
        camRef.current.targetLat = nLat;
        camRef.current.targetLng = nLng;
        setReadout({
          lat: nLat,
          lng: nLng,
          zoom: camRef.current.zoom,
          scaleMeters: Math.round(9000 / Math.pow(2, camRef.current.zoom - 12)),
        });
        return;
      }

      const geo = unproject(px, py, W, H, camRef.current.lat, camRef.current.lng, camRef.current.zoom);
      setReadout((prev) => ({
        ...prev,
        lat: geo.lat,
        lng: geo.lng,
        zoom: camRef.current.zoom,
        scaleMeters: Math.round(9000 / Math.pow(2, camRef.current.zoom - 12)),
      }));
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      if (!dragMoved) {
        // Check click near landmarks
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        for (const lm of LANDMARKS) {
          const lp = project(lm.lat, lm.lng, W, H, camRef.current.lat, camRef.current.lng, camRef.current.zoom);
          if (Math.hypot(cx - lp.x, cy - (lm.kind === "hq" ? lp.y - 10 : lp.y)) < 24) {
            handleFocusLandmark(lm);
            break;
          }
        }
      }
    };

    const onDoubleClick = () => {
      handleZoom(0.8);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("dblclick", onDoubleClick);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("dblclick", onDoubleClick);
    };
  }, [theme, useGoogleEmbed, selectedLandmark.id, project, unproject]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} rounded-[0.25rem] overflow-hidden border border-[rgba(232,232,227,0.2)] shadow-2xl bg-[#0c0e12] select-none ${className}`}
    >
      {useGoogleEmbed ? (
        <iframe
          title="Desi Muchads Business Location - Hosapalaya Bengaluru"
          src={`https://maps.google.com/maps?q=${HQ_COORDS.lat}%2C${HQ_COORDS.lng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full border-0 filter contrast-[1.05] opacity-95"
          loading="lazy"
          allowFullScreen
          style={{ width: "100%", height: "100%", minHeight: "288px", display: "block" }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          aria-label={`Interactive studio map of Hosapalaya, Bengaluru centered at ${HQ_COORDS.lat} North, ${HQ_COORDS.lng} East`}
          className="w-full h-full block cursor-grab active:cursor-grabbing touch-none"
        />
      )}

      {/* Top-Left Live Coordinates & Address Overlay */}
      <div className="pointer-events-none absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 max-w-[calc(100%-156px)] sm:max-w-[calc(100%-240px)]">
        <div className="pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-[0.25rem] bg-black/85 backdrop-blur-md border border-white/15 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <div className="font-mono text-[10px] sm:text-[11px] leading-tight text-left truncate">
            <span className="text-[#F3E5AB] font-bold block truncate tabular-nums">
              {readout.lat.toFixed(6)}° N · {readout.lng.toFixed(6)}° E
            </span>
            <span className="text-zinc-300 text-[9.5px] sm:text-[10px] block truncate">
              Hosapalaya, Bengaluru 560068
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyCoords}
            title="Copy GPS Coordinates"
            aria-label="Copy GPS coordinates"
            className="ml-0.5 sm:ml-1 p-1 sm:p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-[#F3E5AB]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Top-Right Style & Google Maps Switch */}
      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
        {!useGoogleEmbed && (
          <div className="hidden sm:flex items-center rounded-[0.25rem] bg-black/85 backdrop-blur-md border border-white/15 p-0.5 font-mono text-[9.5px]">
            {(["dark", "day", "hybrid"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  sound.playTick();
                  setTheme(mode);
                }}
                className={`px-2 py-1 rounded-[0.2rem] uppercase font-bold transition-colors cursor-pointer ${
                  theme === mode ? "bg-white text-black" : "text-zinc-300 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        )}
        {!useGoogleEmbed && (
          <button
            type="button"
            onClick={() => {
              sound.playTick();
              const order: MapTheme[] = ["dark", "day", "hybrid"];
              setTheme(order[(order.indexOf(theme) + 1) % order.length]);
            }}
            aria-label={`Switch map theme from ${theme}`}
            className="sm:hidden inline-flex items-center px-2 py-1.5 rounded-[0.25rem] bg-black/85 border border-white/20 text-white font-mono text-[9.5px] font-bold uppercase cursor-pointer"
          >
            {theme}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            sound.playTick();
            setUseGoogleEmbed((prev) => !prev);
          }}
          title={useGoogleEmbed ? "Switch to Interactive Vector Map" : "Load Live Google Maps Embed"}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[0.25rem] bg-black/90 hover:bg-white hover:text-black border border-white/20 text-white font-mono text-[10px] font-bold uppercase shadow-lg transition-colors cursor-pointer"
        >
          {useGoogleEmbed ? <Layers className="w-3 h-3" /> : <Globe className="w-3 h-3 text-[#F3E5AB]" />}
          <span>{useGoogleEmbed ? "Vector" : "G-Maps"}</span>
        </button>
      </div>

      {/* Bottom-Left Selected Pin Card + Scale Bar (Zero Overlap on Narrow Screens) */}
      {!useGoogleEmbed && (
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-10 flex flex-col items-start gap-1.5 max-w-[44%] sm:max-w-[58%]">
          <div className="hidden sm:flex pointer-events-auto items-center gap-2 px-2.5 py-1.5 rounded-[0.25rem] bg-black/85 backdrop-blur-md border border-white/15 shadow-lg max-w-full">
            <Navigation className="w-3 h-3 text-[#F3E5AB] shrink-0" />
            <div className="text-left leading-tight truncate">
              <span className="font-mono text-[10.5px] font-bold text-white block truncate">
                {selectedLandmark.name}
              </span>
              <span className="font-mono text-[9.5px] text-zinc-300 block truncate">
                {selectedLandmark.subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/80 border border-white/15 font-mono text-[9.5px] text-zinc-300 tabular-nums">
            <span className="inline-block w-6 sm:w-8 h-0.5 bg-white/80 border-x border-white" />
            <span className="whitespace-nowrap">
              {readout.scaleMeters} m<span className="hidden sm:inline"> · Drag to pan</span>
            </span>
          </div>
        </div>
      )}

      {/* Bottom-Right Zoom, Recenter & Open Maps */}
      <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5">
        {!useGoogleEmbed && (
          <div className="flex items-center rounded-[0.25rem] bg-black/90 backdrop-blur-md border border-white/20 overflow-hidden shadow-xl">
            <button
              type="button"
              onClick={() => handleZoom(0.65)}
              aria-label="Zoom in map"
              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer border-r border-white/10"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-0.65)}
              aria-label="Zoom out map"
              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer border-r border-white/10"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleFocusLandmark(LANDMARKS[0])}
              title="Re-center on Desi Muchads HQ"
              aria-label="Re-center on Desi Muchads HQ"
              className="w-8 h-8 flex items-center justify-center text-[#F3E5AB] hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
            >
              <LocateFixed className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <a
          href={HQ_COORDS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 sm:px-2.5 py-2 rounded-[0.25rem] bg-black/95 border border-white/25 text-white font-mono text-[10px] font-bold shadow-xl flex items-center gap-1 hover:bg-white hover:text-black transition-all whitespace-nowrap"
        >
          <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" aria-hidden="true" />
          <span className="sm:hidden">Directions</span>
          <span className="hidden sm:inline">Hosapalaya, Bengaluru</span>
          <span className="sr-only"> on Google Maps</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
