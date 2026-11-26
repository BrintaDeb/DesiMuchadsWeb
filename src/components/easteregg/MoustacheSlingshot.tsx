"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { slingshotSound } from "@/lib/slingshotSound";

interface MoustacheSlingshotProps {
  onOpenKundli?: () => void;
}

// Authentic Desi Muchads handlebar moustache vector paths (viewBox 0 0 240 90)
const MOUSTACHE_MAIN_PATH =
  "M 11.6,40.9 L 13.0,48.6 L 17.2,57.7 L 21.5,63.2 L 26.7,68.2 L 35.6,74.1 L 46.5,78.1 L 55.9,80.0 L 70.5,80.0 L 80.9,78.1 L 90.3,75.0 L 96.0,72.2 L 104.0,67.3 L 112.5,59.5 L 117.2,53.2 L 120.9,45.5 L 122.4,39.6 L 122.8,33.2 L 124.7,27.7 L 126.1,25.5 L 131.3,20.0 L 137.0,16.8 L 141.2,15.5 L 144.5,15.0 L 151.6,15.5 L 156.8,16.8 L 161.5,19.1 L 166.2,22.3 L 175.6,31.4 L 183.2,39.6 L 189.8,44.5 L 194.5,46.8 L 201.6,48.6 L 206.7,48.6 L 212.9,47.3 L 220.4,43.6 L 219.5,46.4 L 217.6,49.1 L 211.9,54.1 L 204.9,56.8 L 196.4,57.3 L 189.3,55.4 L 182.2,51.8 L 178.5,49.1 L 160.5,31.4 L 155.4,27.7 L 151.6,25.9 L 147.3,25.0 L 141.7,25.0 L 135.6,27.3 L 131.8,30.9 L 129.9,35.5 L 132.3,33.2 L 137.4,30.9 L 146.4,30.5 L 149.7,31.4 L 154.9,34.1 L 176.1,54.5 L 185.5,60.0 L 190.7,61.8 L 195.4,62.7 L 203.4,62.7 L 212.9,60.4 L 209.1,64.1 L 205.3,66.8 L 198.3,70.4 L 192.1,72.7 L 182.7,74.5 L 170.4,74.5 L 166.7,74.1 L 154.4,70.9 L 145.5,66.8 L 134.6,59.1 L 129.0,52.7 L 126.6,48.6 L 123.8,54.1 L 123.8,55.4 L 127.5,60.0 L 137.0,68.2 L 146.4,73.6 L 153.0,76.3 L 161.0,78.6 L 169.0,80.0 L 184.1,80.0 L 193.5,78.1 L 201.1,75.4 L 205.8,73.2 L 211.5,69.5 L 219.5,61.8 L 225.1,52.7 L 226.5,49.1 L 228.0,41.8 L 228.0,35.9 L 227.0,30.9 L 224.2,24.6 L 222.3,22.3 L 222.8,23.2 L 221.4,31.8 L 219.0,35.9 L 215.2,39.6 L 211.5,41.8 L 208.2,42.7 L 203.0,43.2 L 195.9,41.4 L 189.3,37.3 L 172.3,20.0 L 164.8,14.6 L 159.1,11.9 L 149.7,9.6 L 140.3,10.0 L 134.1,11.9 L 127.5,15.5 L 122.8,20.0 L 119.1,26.4 L 117.6,30.5 L 116.7,35.0 L 116.7,38.2 L 114.8,45.5 L 112.5,50.0 L 109.2,54.5 L 101.6,61.8 L 92.7,67.7 L 86.5,70.4 L 79.5,72.7 L 69.6,74.5 L 57.3,74.5 L 49.3,73.2 L 40.3,70.0 L 33.7,66.3 L 27.1,60.4 L 28.1,60.0 L 29.5,60.9 L 36.6,62.7 L 44.6,62.7 L 52.1,60.9 L 58.7,57.7 L 63.4,54.5 L 84.2,34.6 L 88.9,31.8 L 93.6,30.5 L 100.2,30.5 L 105.9,32.3 L 108.7,34.1 L 109.6,35.5 L 108.7,32.3 L 106.3,29.1 L 104.0,27.3 L 97.8,25.0 L 92.2,25.0 L 86.1,26.8 L 82.8,28.7 L 76.6,33.6 L 69.6,41.4 L 60.1,50.0 L 55.4,53.2 L 50.7,55.4 L 46.0,56.8 L 37.0,57.3 L 31.8,55.9 L 28.1,54.1 L 21.9,48.6 L 19.6,44.5 L 20.1,43.2 L 23.8,45.9 L 30.4,48.2 L 38.4,48.6 L 42.7,47.7 L 47.4,45.9 L 53.1,42.3 L 62.0,34.1 L 64.8,30.5 L 72.9,22.7 L 78.0,19.1 L 81.8,17.3 L 91.2,15.0 L 98.3,15.5 L 106.3,18.7 L 110.6,21.8 L 112.9,24.6 L 115.3,20.0 L 115.3,19.1 L 112.5,15.9 L 105.4,11.9 L 99.3,10.0 L 89.8,9.6 L 80.4,11.9 L 74.7,14.6 L 69.6,18.2 L 60.1,27.3 L 55.4,32.7 L 49.3,38.2 L 42.7,41.8 L 36.6,43.2 L 30.9,42.7 L 28.1,41.8 L 24.3,39.6 L 20.5,35.9 L 17.7,30.0 L 17.2,22.3 L 13.5,28.7 L 12.0,33.2 Z";
const MOUSTACHE_LEFT_QUILL =
  "M 104.0,40.5 L 102.6,39.1 L 99.7,39.1 L 94.1,45.9 L 88.4,51.4 L 83.2,55.4 L 77.6,59.1 L 69.6,63.2 L 63.9,65.4 L 60.1,66.3 L 68.1,65.9 L 74.7,64.5 L 80.9,62.3 L 87.0,59.1 L 91.7,55.9 L 100.2,47.7 L 104.0,42.7 Z";
const MOUSTACHE_RIGHT_QUILL =
  "M 136.5,39.6 L 136.0,42.7 L 137.9,45.9 L 147.3,55.4 L 153.5,59.5 L 160.1,62.7 L 165.3,64.5 L 171.9,65.9 L 179.9,66.3 L 173.3,64.5 L 162.0,59.1 L 153.5,53.2 L 147.8,48.2 L 140.3,39.1 Z";

// High-contrast website-aligned tokens against Desi Muchads obsidian footer
const THEME = {
  frame: "#D4AF37",
  frameOutline: "rgba(255, 255, 255, 0.72)",
  band: "#FF6B2C",
  bandOutline: "#09090b",
  pocket: "#18181B",
  bits: ["#D4AF37", "#FFFFFF", "#FF6B2C", "#10B981", "#F3E5AB"],
  boing: 1,
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const roundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const rad = Math.min(r || 0, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
};

/**
 * Generates an 852x378 supersampled SVG->ImageBitmap of the white/platinum Desi Muchads
 * handlebar moustache logo with a subtle obsidian rim shadow so there is ZERO bleed or
 * pixelation directly over the dark footer or while rocketing across bright UI sections.
 */
async function buildMoustacheStickerSprite(): Promise<ImageBitmap | HTMLImageElement> {
  const svgMarkup = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-22 -18 284 126" width="852" height="378">
      <defs>
        <linearGradient id="dmPlatinum" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="50%" stop-color="#E4E4E7"/>
          <stop offset="100%" stop-color="#FFFFFF"/>
        </linearGradient>
      </defs>
      <!-- Subtle dark silhouette separation for flight over light sections -->
      <path d="${MOUSTACHE_MAIN_PATH}" fill="#09090B" stroke="#09090B" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
      <!-- Crisp metallic platinum white Handlebar Moustache foreground -->
      <path d="${MOUSTACHE_MAIN_PATH}" fill="url(#dmPlatinum)" stroke="#FFFFFF" stroke-width="0.9" stroke-linejoin="round"/>
      <path d="${MOUSTACHE_LEFT_QUILL}" fill="url(#dmPlatinum)"/>
      <path d="${MOUSTACHE_RIGHT_QUILL}" fill="url(#dmPlatinum)"/>
    </svg>
  `.trim();

  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = async () => {
      try {
        if (typeof createImageBitmap === "function") {
          const bmp = await createImageBitmap(img);
          URL.revokeObjectURL(url);
          resolve(bmp);
          return;
        }
        URL.revokeObjectURL(url);
        resolve(img);
      } catch {
        URL.revokeObjectURL(url);
        resolve(img);
      }
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  decay: number;
  rot: number;
  vr: number;
  color: string;
  shape: "pill" | "dot" | "sq" | "ring" | "star";
}

interface SkyPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w?: number;
  h?: number;
  r?: number;
  rot: number;
  vr: number;
  life: number;
  decay: number;
  col?: string;
  ring?: boolean;
  canopy?: boolean;
}

const spring1 = (k: number) => {
  const c = 1.70158 * 1.4;
  return 1 + (c + 1) * (k - 1) ** 3 + c * (k - 1) ** 2;
};

export function MoustacheSlingshot({ onOpenKundli }: MoustacheSlingshotProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grabRef = useRef<HTMLButtonElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [blownCount, setBlownCount] = useState(0);
  const [bullseyeHit, setBullseyeHit] = useState(false);
  const [liveMsg, setLiveMsg] = useState("");

  const blownElementsRef = useRef<Set<HTMLElement>>(new Set());

  const handleTidyUp = useCallback(() => {
    slingshotSound.boing();
    blownElementsRef.current.forEach((el) => {
      el.classList.remove("dm-slingshot-blown");
    });
    blownElementsRef.current.clear();
    setBlownCount(0);
    setLiveMsg("All page elements restored cleanly.");
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const cv = canvasRef.current;
    const grab = grabRef.current;
    if (!root || !cv || !grab) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let art: ImageBitmap | HTMLImageElement | null = null;
    let fallbackPaths: { main: Path2D; left: Path2D; right: Path2D } | null = null;
    if (typeof Path2D !== "undefined") {
      fallbackPaths = {
        main: new Path2D(MOUSTACHE_MAIN_PATH),
        left: new Path2D(MOUSTACHE_LEFT_QUILL),
        right: new Path2D(MOUSTACHE_RIGHT_QUILL),
      };
    }

    buildMoustacheStickerSprite()
      .then((bmp) => {
        art = bmp;
        draw();
      })
      .catch(() => { });

    let W = 0;
    let H = 0;
    let S = 80;
    let size = 140;
    let maxPull = 140;
    let g = 800;
    let vmax = 1000;
    let visible = false;
    let goneFor = 0;
    let flyT = 0;
    let raf = 0;
    let last = 0;
    let destroyed = false;

    const A = { x: 0, y: 0 };
    const R = { x: 0, y: 0 };
    const doll = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      rot: 0,
      spin: 0,
      sq: 0,
      sqv: 0,
      st: 0,
      ang: 0,
      mode: "rest" as "wait" | "rest" | "drag" | "fly" | "gone" | "drop",
      rocket: false,
      bank: false,
    };
    const pocket = { x: 0, y: 0, vx: 0, vy: 0 };
    const fr = { sq: 0, sqv: 0, lean: 0, leanv: 0 };
    const bits: Bit[] = [];
    const activeSkyCleanups = new Set<() => void>();

    function triggerPop(el: HTMLElement | null, cls = "dm-ss-boing") {
      if (!el) return;
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
    }

    function updateGrabDom() {
      if (!grab) return;
      const w = Math.max(88, size * 0.92);
      const h = Math.max(76, size * 0.56);
      grab.style.width = `${w}px`;
      grab.style.height = `${h}px`;
      grab.style.transform = `translate3d(${(doll.x - w / 2).toFixed(1)}px, ${(doll.y - h * 0.5).toFixed(1)}px, 0)`;
      grab.style.pointerEvents = doll.mode === "rest" || doll.mode === "drag" ? "auto" : "none";
    }

    function layout() {
      if (!root || !cv) return;
      const r = root.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sr = slotRef.current ? slotRef.current.getBoundingClientRect() : null;
      const hasSlot = Boolean(sr && sr.width > 0);
      S = hasSlot && sr
        ? clamp(Math.min(sr.width * 0.44, sr.height * 0.38), 40, 74)
        : clamp(Math.min(W * 0.14, H * 0.24), 44, 72);
      size = S * 1.55;
      A.x = hasSlot && sr ? sr.left - r.left + sr.width * 0.5 : W * 0.5;
      A.y = hasSlot && sr ? sr.top - r.top + sr.height * 0.42 : H * 0.38;
      R.x = A.x;
      R.y = A.y + S * 0.04;
      const bottomClearance = Math.max(72, H - R.y - size * 0.38);
      maxPull = clamp(Math.min(W * 0.22, bottomClearance), 68, 128);
      g = Math.max(H * 1.5, 760);
      vmax = Math.sqrt(2 * g * (R.y + size)) * 1.15;

      if (doll.mode === "rest" || doll.mode === "wait") {
        pocket.x = doll.x = R.x;
        pocket.y = doll.y = R.y;
        pocket.vx = pocket.vy = 0;
      }

      updateGrabDom();
      draw();
      wake();
    }

    function burst(x: number, y: number, n: number, ux = 0, uy = -1, k = 1, spread = 2.4) {
      for (let i = 0; i < n; i++) {
        const a = Math.atan2(-uy, -ux) + (Math.random() - 0.5) * spread;
        const s = (60 + Math.random() * 260) * k;
        bits.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s - 60,
          r: 5 + Math.random() * 7,
          life: 1,
          decay: 0.7 + Math.random() * 0.5,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 10,
          color: THEME.bits[i % THEME.bits.length],
          shape: i % 3 === 0 ? "pill" : i % 3 === 1 ? "dot" : "sq",
        });
      }
    }

    function boom(x: number, y: number) {
      const sp = Math.hypot(doll.vx, doll.vy) || 1;
      const ux = doll.vx / sp;
      const uy = doll.vy / sp;
      burst(x, y, 36, ux, uy, 2.3, 3.4);
      bits.push({ x, y, vx: 0, vy: 0, r: size * 0.12, life: 1, decay: 2.1, rot: 0, vr: 0, color: THEME.band, shape: "ring" });
      bits.push({ x, y, vx: 0, vy: 0, r: size * 0.04, life: 1, decay: 1.5, rot: 0, vr: 0, color: THEME.band, shape: "ring" });
      bits.push({ x, y, vx: 0, vy: 0, r: size * 0.28, life: 1, decay: 1.7, rot: Math.random() * 6, vr: 1.5, color: THEME.bits[4], shape: "star" });
      fr.sqv += 2.5 * THEME.boing;
      triggerPop(cv, "dm-ss-shake");
      slingshotSound.boom();
    }

    const logoHit = (x: number, y: number, r: number) => {
      const L = document.querySelector<HTMLElement>("a[data-slingshot-logo]");
      if (!L) return false;
      const b = L.getBoundingClientRect();
      if (!b.width) return false;
      const nx = Math.max(b.left, Math.min(x, b.right));
      const ny = Math.max(b.top, Math.min(y, b.bottom));
      return (nx - x) ** 2 + (ny - y) ** 2 < r * r;
    };

    function bullseye(x: number, y: number) {
      slingshotSound.boom();
      setBullseyeHit(true);
      setLiveMsg("Bullseye! Direct hit on the Desi Muchads emblem!");

      const cv2 = document.createElement("canvas");
      cv2.className = "fixed inset-0 w-screen h-[100dvh] z-[85] pointer-events-none";
      cv2.setAttribute("aria-hidden", "true");
      document.body.appendChild(cv2);
      const c = cv2.getContext("2d");
      if (!c) {
        cv2.remove();
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      cv2.width = vw * dpr;
      cv2.height = vh * dpr;
      c.scale(dpr, dpr);

      const P: SkyPiece[] = [];
      for (let i = 0; i < 150; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 250 + Math.random() * 750;
        P.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          w: 7 + Math.random() * 12,
          h: 5 + Math.random() * 9,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 16,
          life: 1,
          decay: 0.28 + Math.random() * 0.25,
          col: THEME.bits[i % THEME.bits.length],
        });
      }
      for (let i = 0; i < 90; i++) {
        P.push({
          x: Math.random() * vw,
          y: -20 - Math.random() * vh * 0.6,
          vx: (Math.random() - 0.5) * 80,
          vy: 100 + Math.random() * 200,
          w: 7 + Math.random() * 10,
          h: 5 + Math.random() * 8,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 10,
          life: 1.4,
          decay: 0.3,
          col: THEME.bits[i % THEME.bits.length],
        });
      }

      let t0 = performance.now();
      let animId = 0;
      const tickConfetti = (now: number) => {
        if (destroyed) {
          cv2.remove();
          return;
        }
        const dt = Math.min((now - t0) / 1000, 0.033);
        t0 = now;
        c.clearRect(0, 0, vw, vh);
        for (const p of P) {
          p.life -= p.decay * dt;
          p.vy += 700 * dt;
          p.vx *= Math.pow(0.5, dt);
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vr * dt;
          if (p.life <= 0) continue;
          c.save();
          c.globalAlpha = Math.min(1, p.life);
          c.translate(p.x, p.y);
          c.rotate(p.rot);
          c.fillStyle = p.col || THEME.band;
          c.strokeStyle = "#fff";
          c.lineWidth = 2;
          c.beginPath();
          roundedRect(c, -(p.w || 8) / 2, -(p.h || 6) / 2, p.w || 8, p.h || 6, 3);
          c.fill();
          c.stroke();
          c.restore();
        }
        if (P.some((p) => p.life > 0)) {
          animId = requestAnimationFrame(tickConfetti);
        } else {
          cv2.remove();
        }
      };
      animId = requestAnimationFrame(tickConfetti);
      activeSkyCleanups.add(() => {
        cancelAnimationFrame(animId);
        cv2.remove();
      });
    }

    function drawChuteArt(c: CanvasRenderingContext2D, w: number, open: number, a: number) {
      const hw = (w / 2) * open;
      const hh = w * 0.42 * open;
      if (hw < 1) return;
      c.save();
      c.globalAlpha *= a;

      const dome = () => {
        c.beginPath();
        c.moveTo(-hw, 0);
        c.bezierCurveTo(-hw, -hh * 1.35, hw, -hh * 1.35, hw, 0);
        for (let i = 0; i < 3; i++) {
          const xa = hw - (hw * 2 * i) / 3;
          c.quadraticCurveTo(xa - hw / 3, hh * 0.22, xa - (hw * 2) / 3, 0);
        }
        c.closePath();
      };

      c.shadowColor = "rgba(14,14,14,0.3)";
      c.shadowBlur = 10;
      c.shadowOffsetY = 6;
      dome();
      c.fillStyle = "#fff";
      c.lineWidth = 6;
      c.strokeStyle = "#fff";
      c.lineJoin = "round";
      c.fill();
      c.stroke();

      c.shadowColor = "transparent";
      c.save();
      dome();
      c.clip();
      const goreColors = [THEME.bits[0], THEME.bits[1], THEME.bits[4]];
      for (let i = 0; i < 3; i++) {
        c.fillStyle = goreColors[i];
        c.fillRect(-hw + (hw * 2 * i) / 3, -hh * 1.4, (hw * 2) / 3 + 1, hh * 1.6);
      }
      c.restore();
      c.restore();
    }

    function drawLogoAt(targetCtx: CanvasRenderingContext2D, widthTarget: number) {
      if (art) {
        const aspect =
          art instanceof ImageBitmap
            ? art.height / art.width
            : (art.naturalHeight || 378) / (art.naturalWidth || 852);
        const w = widthTarget;
        const h = w * aspect;
        targetCtx.shadowColor = "rgba(14, 14, 14, 0.34)";
        targetCtx.shadowBlur = 10;
        targetCtx.shadowOffsetY = 6;
        targetCtx.drawImage(art, -w / 2, -h * 0.5, w, h);
        return;
      }

      if (fallbackPaths) {
        const scale = widthTarget / 240;
        targetCtx.save();
        targetCtx.scale(scale, scale);
        targetCtx.translate(-120, -45);
        targetCtx.lineJoin = "round";
        targetCtx.lineCap = "round";

        targetCtx.fillStyle = "#09090B";
        targetCtx.strokeStyle = "#09090B";
        targetCtx.lineWidth = 7;
        targetCtx.stroke(fallbackPaths.main);
        targetCtx.fill(fallbackPaths.main);

        targetCtx.fillStyle = "#FFFFFF";
        targetCtx.fill(fallbackPaths.main);
        targetCtx.fill(fallbackPaths.left);
        targetCtx.fill(fallbackPaths.right);
        targetCtx.restore();
      }
    }

    function syncScrollTo(y: number) {
      const lenis = (window as unknown as { __dmLenis?: { scrollTo: (t: number, opts?: { immediate?: boolean }) => void } }).__dmLenis;
      if (lenis) {
        lenis.scrollTo(y, { immediate: true });
      }
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    }

    function rocket(x0: number, y0: number, vx0: number, vy0: number, spin: number) {
      if (!root) return;
      const sky = document.createElement("canvas");
      sky.className = "fixed inset-0 w-screen h-[100dvh] z-[80] pointer-events-none";
      sky.setAttribute("aria-hidden", "true");
      document.body.appendChild(sky);
      const c = sky.getContext("2d");
      if (!c) {
        sky.remove();
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let vw = 0;
      let vh = 0;
      const fit = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        sky.width = Math.round(vw * dpr);
        sky.height = Math.round(vh * dpr);
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      fit();

      const rr = root.getBoundingClientRect();
      const html = document.documentElement;
      const sb = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const home = () => {
        const b = root.getBoundingClientRect();
        return { x: b.left + R.x, y: b.top + window.scrollY + R.y };
      };

      const CW = size * 0.78;
      const M = {
        x: rr.left + x0,
        y: rr.top + window.scrollY + y0,
        vx: vx0 * 0.6,
        vy: vy0,
        cruise: -Math.min(vh * 2, Math.max(920, (rr.top + window.scrollY) / 5.2)),
        rot: 0,
        spin: spin || 6,
        hit: 0,
        cool: 0,
        phase: "up" as "up" | "top" | "down" | "land",
        t: 0,
        tt: 0,
        free: false,
        x0: 0,
        y0: 0,
        tx: 0,
        ty: 0,
        vd: 0,
        dur: 3,
        end: 0,
        c0: 0,
        w0: 0,
        breezed: false,
        boomAt: 0,
      };

      const ease = (k: number) => (k < 1 ? k * k * (3 - 2 * k) : 1);
      const lift = -Math.min(650, -M.cruise * 0.5);
      const ramp = 0.8 * Math.min(1, Math.max(0.45, (M.y - window.scrollY) / (vh * 0.6)));
      let cam = window.scrollY;
      let camV = 0;
      let lastTgt: number | null = null;
      const rad = size * 0.25;
      const pieces: SkyPiece[] = [];

      // Safe visual targets across any page hosting the Footer
      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#services h2, #services .breydaqs-hover-item, #work h2, #clients h2, #clients .animate-marquee > div, #process h2, #process li, #pricing h2, main h1, main h2, footer h2"
        )
      ).filter((el) => !el.closest("header, .dm-ss-section"));

      let shake = 0;
      let skyLast = performance.now();
      let skyRaf = 0;

      function explode(d: HTMLElement, r: DOMRect) {
        d.classList.add("dm-slingshot-blown");
        blownElementsRef.current.add(d);
        setBlownCount(blownElementsRef.current.size);

        const now = performance.now();
        if (now - M.boomAt > 90) {
          M.boomAt = now;
          slingshotSound.boom();
        }
        shake = 0.35;
        const n = Math.min(44, 14 + Math.round((r.width * r.height) / 9000));
        for (let i = 0; i < n; i++) {
          const px = r.left + Math.random() * r.width;
          const py = r.top + window.scrollY + Math.random() * r.height;
          const a = Math.atan2(py - M.y, px - M.x) + (Math.random() - 0.5) * 1.2;
          const sp = 250 + Math.random() * 650;
          pieces.push({
            x: px,
            y: py,
            vx: Math.cos(a) * sp,
            vy: Math.sin(a) * sp - 200,
            w: 6 + Math.random() * Math.min(36, r.width * 0.12),
            h: 6 + Math.random() * Math.min(26, r.height * 0.1),
            rot: Math.random() * 6,
            vr: (Math.random() - 0.5) * 14,
            life: 1,
            decay: 0.55 + Math.random() * 0.4,
            col: THEME.bits[i % THEME.bits.length],
          });
        }
        pieces.push({ ring: true, x: M.x, y: M.y, vx: 0, vy: 0, rot: 0, vr: 0, r: rad, life: 1, decay: 2.2, col: THEME.band });
      }

      function atTop() {
        M.phase = "top";
        M.tt = 0;
        shake = 0.5;
      }

      function down() {
        const h = home();
        M.phase = "down";
        M.tt = 0;
        M.vd = 0;
        M.x0 = clamp(h.x + (M.x < h.x ? -1 : 1) * Math.min(vw * 0.22, 150), CW * 0.6, vw - CW * 0.6);
        M.y0 = Math.min(window.scrollY, M.y) - size * 0.9;
        M.tx = h.x;
        M.ty = h.y;
        M.rot = 0;
        M.x = M.x0;
        M.y = M.y0;
        const D = Math.max(1, M.ty - M.y0);
        M.dur = Math.min(4.6, Math.max(2.2, D / 1500));
        M.end = Math.max(0, Math.min(html.scrollHeight - vh, M.ty - vh * 0.62));
        M.c0 = cam;
        M.w0 = Math.max(0, M.y0 - vh * 0.4);
        slingshotSound.peel();
        if (!M.free) {
          M.breezed = true;
          slingshotSound.breeze(M.dur);
        }
      }

      function land() {
        if (!M.free) {
          cam = M.end;
          syncScrollTo(cam);
        }
        M.phase = "land";
        pieces.push({
          canopy: true,
          x: M.x,
          y: M.y - size * 0.62,
          vx: (Math.random() - 0.5) * 90,
          vy: -150,
          rot: M.rot,
          vr: (Math.random() - 0.5) * 1.2,
          life: 1,
          decay: 0.8,
        });
        if (visible) {
          Object.assign(doll, { mode: "drop", x: R.x, y: pocket.y - 2, vx: 0, vy: 320, rot: M.rot, spin: 0 });
        } else {
          doll.mode = "wait";
          pocket.x = doll.x = R.x;
          pocket.y = doll.y = R.y;
        }
        wake();
        setLiveMsg(
          M.hit
            ? `Moustache logo returned via parachute. ${M.hit} items cleared.`
            : "Moustache logo landed safely back in the slingshot."
        );
      }

      const SCROLLKEYS = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      const takeOver = (e: Event) => {
        if (e.type === "keydown" && !SCROLLKEYS.includes((e as KeyboardEvent).key)) return;
        M.free = true;
        camV = 0;
      };
      const EV: Array<keyof WindowEventMap> = ["wheel", "touchmove", "keydown", "pointerdown"];
      EV.forEach((t) => window.addEventListener(t, takeOver, { passive: true }));

      const finish = () => {
        cancelAnimationFrame(skyRaf);
        sky.remove();
        html.style.scrollBehavior = sb;
        window.removeEventListener("resize", fit);
        EV.forEach((t) => window.removeEventListener(t, takeOver));
      };
      activeSkyCleanups.add(finish);

      function drawRocketLogo(x: number, y: number, rot: number, open: number) {
        if (!c) return;
        c.save();
        c.translate(x, y);
        c.rotate(rot);
        if (open > 0) {
          const cy = -size * 0.56;
          c.strokeStyle = "#fff";
          c.lineWidth = 2.5;
          c.lineCap = "round";
          c.beginPath();
          for (const k of [-1, -0.35, 0.35, 1]) {
            c.moveTo(k * CW * 0.5 * open, cy);
            c.lineTo(k * size * 0.14, -size * 0.14);
          }
          c.stroke();
          c.strokeStyle = THEME.frame;
          c.lineWidth = 1.2;
          c.stroke();
          c.save();
          c.translate(0, cy);
          drawChuteArt(c, CW, open, 1);
          c.restore();
        }
        drawLogoAt(c, size);
        c.restore();
      }

      const tick = (now: number) => {
        if (destroyed) {
          finish();
          return;
        }
        const dt = Math.min((now - skyLast) / 1000, 0.033);
        skyLast = now;
        M.t += dt;
        M.tt += dt;

        if (M.phase === "up") {
          M.vy += (lift + (M.cruise - lift) * ease(Math.max(0, M.t - 0.2) / 1.2) - M.vy) * Math.min(1, dt * 5);
          M.x += M.vx * dt;
          M.y += M.vy * dt;
          M.rot += M.spin * dt;
          M.vx *= Math.pow(0.6, dt);
          M.cool -= dt;

          if (M.x < rad) {
            M.x = rad;
            M.vx = Math.abs(M.vx);
          } else if (M.x > vw - rad) {
            M.x = vw - rad;
            M.vx = -Math.abs(M.vx);
          }

          if (Math.random() < 0.72) {
            pieces.push({
              x: M.x + (Math.random() - 0.5) * rad * 0.6,
              y: M.y + rad * 0.6,
              vx: (Math.random() - 0.5) * 60,
              vy: 120 + Math.random() * 80,
              w: 5 + Math.random() * 7,
              h: 5 + Math.random() * 7,
              rot: 0,
              vr: 3,
              life: 1,
              decay: 2.3,
              col: THEME.bits[Math.floor(Math.random() * THEME.bits.length)],
            });
          }

          const vy0 = M.y - window.scrollY;
          for (const d of targets) {
            if (d.classList.contains("dm-slingshot-blown")) continue;
            const rect = d.getBoundingClientRect();
            if (!rect.width || rect.bottom < -50 || rect.top > vh + 50) continue;
            const nx = Math.max(rect.left, Math.min(M.x, rect.right));
            const ny = Math.max(rect.top, Math.min(vy0, rect.bottom));
            if ((nx - M.x) ** 2 + (ny - vy0) ** 2 < rad * rad) {
              explode(d, rect);
              M.hit++;
              if (M.cool <= 0) {
                M.cool = 0.3;
                M.vx = (M.x < (rect.left + rect.right) / 2 ? -1 : 1) * (350 + Math.random() * 450);
                M.vy *= 0.8;
                M.spin = -Math.sign(M.spin) * Math.min(11, Math.abs(M.spin) * 1.2);
              }
            }
          }

          if (M.t > 0.3 && logoHit(M.x, vy0, rad)) {
            atTop();
            pieces.push({ ring: true, x: M.x, y: M.y, vx: 0, vy: 0, rot: 0, vr: 0, r: rad, life: 1, decay: 1.4, col: THEME.band });
            bullseye(M.x, vy0);
          } else if (M.y < 50) {
            atTop();
            slingshotSound.boom();
            for (let i = 0; i < 40; i++) {
              const a = Math.random() * Math.PI * 2;
              const sp = 200 + Math.random() * 700;
              pieces.push({
                x: M.x,
                y: M.y,
                vx: Math.cos(a) * sp,
                vy: Math.sin(a) * sp,
                w: 6 + Math.random() * 12,
                h: 6 + Math.random() * 12,
                rot: 0,
                vr: (Math.random() - 0.5) * 12,
                life: 1,
                decay: 0.6 + Math.random() * 0.4,
                col: THEME.bits[i % THEME.bits.length],
              });
            }
            pieces.push({ ring: true, x: M.x, y: M.y, vx: 0, vy: 0, rot: 0, vr: 0, r: rad, life: 1, decay: 1.6, col: THEME.band });
          }

          if (!M.free) {
            const want = M.y - vh * 0.45;
            const D = vh * 0.6;
            const tgt = want >= D ? want : D * Math.exp(want / D - 1);
            const tv = lastTgt === null || !dt ? 0 : (tgt - lastTgt) / dt;
            const f = ease(M.t / ramp);
            lastTgt = tgt;
            camV += (Math.max(f * (tv + (tgt - cam) * 2), -cam * 3) - camV) * Math.min(1, dt * 6);
            cam = Math.max(0, cam + camV * dt);
            syncScrollTo(cam);
            if (cam > vh * 0.3 && M.y - cam < rad * 1.1) {
              M.y = cam + rad * 1.1;
              M.vy = Math.max(M.vy, camV);
            }
          }
        } else if (M.phase === "top") {
          if (!M.free && (cam > 0.5 || camV < -5)) {
            camV += (-25 * cam - 10 * camV) * dt;
            cam = Math.max(0, cam + camV * dt);
            syncScrollTo(cam);
          }
          if (M.tt > 1.1) down();
        } else if (M.phase === "down") {
          let e = 0;
          if (!M.free) {
            const k = Math.min(1, M.tt / M.dur);
            const prevY = M.y;
            e = k * k * (3 - 2 * k);
            M.y = M.y0 + (M.ty - M.y0) * e;
            if (dt) M.vd = (M.y - prevY) / dt;
          } else {
            const sy = M.y - window.scrollY;
            const near = sy > -size * 1.6 && sy < vh + size * 0.6;
            M.vd += ((near ? Math.max(120, vh * 0.18) : 2200) - M.vd) * Math.min(1, dt * (near ? 6 : 3));
            M.y = Math.min(M.ty, M.y + M.vd * dt);
            e = (M.y - M.y0) / Math.max(1, M.ty - M.y0);
            if (near && !M.breezed) {
              M.breezed = true;
              slingshotSound.breeze(Math.min(6, (vh + size * 2.2) / Math.max(120, vh * 0.18)));
            }
          }
          const sw = Math.min(70, vw * 0.06) * (1 - e);
          M.x = M.x0 + (M.tx - M.x0) * e + Math.sin(M.tt * 2.3) * sw;
          M.rot = Math.sin(M.tt * 2.3 + 1.2) * 0.16 * (1 - e * e);
          if (!M.free) {
            const want = Math.min(M.end, Math.max(0, M.y - vh * 0.4));
            cam = want + (M.c0 - M.w0) * Math.max(0, 1 - M.tt / 0.3);
            syncScrollTo(cam);
          }
          if (M.free ? M.y >= M.ty : M.tt >= M.dur) land();
        }

        for (const p of pieces) {
          p.life -= p.decay * dt;
          if (p.ring) {
            p.r = (p.r || rad) + size * 6 * dt * p.life;
            continue;
          }
          if (p.canopy) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.rot += p.vr * dt;
            continue;
          }
          p.vy += 900 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rot += p.vr * dt;
        }
        for (let i = pieces.length - 1; i >= 0; i--) {
          if (pieces[i].life <= 0) pieces.splice(i, 1);
        }

        shake = Math.max(0, shake - dt);
        const sx = shake ? (Math.random() - 0.5) * 14 * shake : 0;
        const sy = shake ? (Math.random() - 0.5) * 14 * shake : 0;
        c.setTransform(dpr, 0, 0, dpr, sx * dpr, sy * dpr);
        c.clearRect(-20, -20, vw + 40, vh + 40);

        for (const p of pieces) {
          c.save();
          c.globalAlpha = Math.max(0, Math.min(1, p.life));
          c.translate(p.x, p.y - window.scrollY);
          if (p.ring) {
            c.strokeStyle = p.col || THEME.band;
            c.lineWidth = Math.max(1, 8 * p.life);
            c.beginPath();
            c.arc(0, 0, p.r || rad, 0, Math.PI * 2);
            c.stroke();
          } else if (p.canopy) {
            c.rotate(p.rot);
            drawChuteArt(c, CW, 1, 1);
          } else {
            c.rotate(p.rot);
            c.fillStyle = p.col || THEME.band;
            c.strokeStyle = "#fff";
            c.lineWidth = 2;
            c.beginPath();
            const pw = p.w || 10;
            const ph = p.h || 8;
            roundedRect(c, -pw / 2, -ph / 2, pw, ph, Math.min(pw, ph) * 0.3);
            c.fill();
            c.stroke();
          }
          c.restore();
        }

        if (M.phase === "up" || M.phase === "down") {
          drawRocketLogo(M.x, M.y - window.scrollY, M.rot, M.phase === "down" ? spring1(Math.min(1, M.tt / 0.45)) : 0);
        }
        if (M.phase === "land" && !pieces.length) {
          finish();
          return;
        }
        skyRaf = requestAnimationFrame(tick);
      };

      window.addEventListener("resize", fit);
      skyRaf = requestAnimationFrame(tick);
    }

    function bank(m: number) {
      const side = doll.x < -m || doll.x > W + m;
      const x = clamp(doll.x, size * 0.3, W - size * 0.3);
      const y = Math.max(doll.y, size * 0.3);
      let vx = doll.vx;
      let vy = doll.vy;
      let spin = doll.spin;
      if (side) {
        bits.push({ x: doll.x < 0 ? 0 : W, y, vx: 0, vy: 0, r: size * 0.1, life: 1, decay: 2, rot: 0, vr: 0, color: THEME.band, shape: "ring" });
        burst(doll.x < 0 ? 0 : W, y, 14, doll.x < 0 ? 1 : -1, 0, 1.4, 2);
        triggerPop(cv, "dm-ss-shake");
        slingshotSound.slap();
        vx = -vx * 0.35;
        vy = -Math.max(Math.abs(vy), vmax * 0.9);
        spin = -spin * 1.3;
      }
      doll.rocket = true;
      doll.bank = false;
      doll.mode = "gone";
      goneFor = 1e9;
      setLiveMsg(side ? "Moustache ricocheted off the wall and rocketed upward!" : "Moustache rocketed up the page!");
      rocket(x, y, vx, vy, spin);
    }

    function launch(ux: number, uy: number, power: number) {
      const sp = vmax * 1.2 * Math.pow(power, 0.9);
      Object.assign(doll, {
        vx: ux * sp,
        vy: uy * sp,
        spin: (ux >= 0 ? 1 : -1) * (3 + Math.random() * 5),
        mode: "fly",
      });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      doll.rocket = !reduced && uy < 0 && Math.abs(ux) < Math.SQRT1_2 && power > 0.35;
      doll.bank = !reduced && !doll.rocket && power > 0.5 && uy < 0.35;
      flyT = 0;

      slingshotSound.twang(power);
      pocket.vx = ux * sp * 0.32;
      pocket.vy = uy * sp * 0.32;
      fr.sqv += 7 * THEME.boing * power;
      fr.leanv += -ux * 3.2 * THEME.boing * power;
      burst(doll.x, doll.y, 16, ux, uy);

      setLiveMsg("Launched moustache logo.");
      root?.classList.add("dm-ss-launched");
      triggerPop(headlineRef.current);

      if (doll.rocket) {
        doll.mode = "gone";
        goneFor = 1e9;
        rocket(doll.x, doll.y, doll.vx, doll.vy, doll.spin);
      }
    }

    function spring(o: { p: number; v: number }, k: number, c: number, dt: number, tx = 0) {
      o.v += (-k * (o.p - tx) - c * o.v) * dt;
      o.p += o.v * dt;
    }

    function step(dt: number) {
      if (doll.mode !== "drag") {
        pocket.vx += (-300 * (pocket.x - R.x) - 7 * pocket.vx) * dt;
        pocket.vy += (-300 * (pocket.y - R.y) - 7 * pocket.vy) * dt;
        pocket.x += pocket.vx * dt;
        pocket.y += pocket.vy * dt;
      }

      let tgtSt = 0;
      let tgtAng = doll.ang;

      if (doll.mode === "rest") {
        doll.x = pocket.x;
        doll.y = pocket.y;
        doll.rot *= Math.pow(0.02, dt);
      } else if (doll.mode === "drag") {
        const dx = doll.x - R.x;
        const dy = doll.y - R.y;
        tgtSt = (0.28 * Math.hypot(dx, dy)) / maxPull;
        tgtAng = Math.atan2(dy, dx);
      } else if (doll.mode === "fly") {
        flyT += dt;
        doll.vy += g * dt;
        doll.x += doll.vx * dt;
        doll.y += doll.vy * dt;
        doll.rot += doll.spin * dt;
        const sp = Math.hypot(doll.vx, doll.vy);
        tgtSt = clamp((sp / vmax) * 0.34, 0, 0.34) * Math.max(0, 1 - flyT * 0.9);
        tgtAng = Math.atan2(doll.vy, doll.vx);

        const m = size * 0.12;
        const rb = root!.getBoundingClientRect();
        if (logoHit(rb.left + doll.x, rb.top + doll.y, size * 0.24)) {
          bullseye(rb.left + doll.x, rb.top + doll.y);
          doll.mode = "gone";
          goneFor = 0.8;
        } else if (doll.bank && (doll.x < -m || doll.x > W + m || doll.y < -m)) {
          bank(m);
        } else if (doll.x < -m || doll.x > W + m || doll.y < -m || doll.y > H + m) {
          boom(clamp(doll.x, 24, W - 24), clamp(doll.y, 24, H - 24));
          doll.mode = "gone";
          goneFor = 0.8;
        }
      } else if (doll.mode === "gone") {
        goneFor -= dt;
        if (goneFor <= 0) {
          Object.assign(doll, { mode: "drop", x: R.x, y: -size, vx: 0, vy: 0, rot: 0, spin: 0 });
        }
      } else if (doll.mode === "drop") {
        doll.vy += g * 1.3 * dt;
        doll.y += doll.vy * dt;
        if (doll.y >= pocket.y) {
          const hit = doll.vy;
          doll.y = pocket.y;
          doll.mode = "rest";
          pocket.vy += hit * 0.42;
          slingshotSound.boing();
          doll.sqv += clamp(hit / 900, 0, 2) * 4.5 * THEME.boing;
          burst(doll.x, doll.y + size * 0.22, 8, 0, 1);
        }
      }

      doll.st += (tgtSt - doll.st) * Math.min(1, dt * 14);
      doll.ang = tgtAng;

      const sq = { p: doll.sq, v: doll.sqv };
      spring(sq, 420, 11, dt);
      doll.sq = clamp(sq.p, -0.4, 0.4);
      doll.sqv = sq.v;

      const fs = { p: fr.sq, v: fr.sqv };
      spring(fs, 380, 9, dt);
      fr.sq = clamp(fs.p, -0.3, 0.3);
      fr.sqv = fs.v;

      const fl = { p: fr.lean, v: fr.leanv };
      spring(fl, 300, 8, dt);
      fr.lean = clamp(fl.p, -0.25, 0.25);
      fr.leanv = fl.v;

      for (const b of bits) {
        b.life -= b.decay * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.rot += b.vr * dt;
        if (b.shape === "ring") b.r += size * 5 * dt * b.life;
        else if (b.shape === "star") b.r += size * 0.5 * dt;
        else b.vy += g * 0.6 * dt;
      }
      for (let i = bits.length - 1; i >= 0; i--) {
        if (bits[i].life <= 0) bits.splice(i, 1);
      }
    }

    const base = () => ({ x: A.x, y: A.y + S * 1.1 });
    function fx(p: { x: number; y: number }) {
      const b = base();
      const sx = 1 + fr.sq * 0.45;
      const sy = 1 - fr.sq;
      const cs = Math.cos(fr.lean);
      const sn = Math.sin(fr.lean);
      const x = (p.x - b.x) * sx;
      const y = (p.y - b.y) * sy;
      return { x: b.x + x * cs - y * sn, y: b.y + x * sn + y * cs };
    }
    const tips = () => [fx({ x: A.x - S * 0.5, y: A.y - S * 0.08 }), fx({ x: A.x + S * 0.5, y: A.y - S * 0.08 })];

    function strokeLine(pts: Array<Array<{ x: number; y: number }>>, w: number, col: string, outline: string) {
      if (!ctx) return;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const trace = () => {
        ctx.beginPath();
        pts.forEach((seg) => {
          ctx.moveTo(seg[0].x, seg[0].y);
          for (let i = 1; i < seg.length; i++) ctx.lineTo(seg[i].x, seg[i].y);
        });
      };
      if (outline) {
        ctx.save();
        ctx.shadowColor = "rgba(14,14,14,.3)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        trace();
        ctx.strokeStyle = outline;
        ctx.lineWidth = w + S * 0.1;
        ctx.stroke();
        ctx.restore();
      }
      trace();
      ctx.strokeStyle = col;
      ctx.lineWidth = w;
      ctx.stroke();
    }

    function drawFrame() {
      const b = fx(base());
      const j = fx({ x: A.x, y: A.y + S * 0.46 });
      const [l, r] = tips();
      strokeLine([[b, j], [l, j, r]], S * 0.22, THEME.frame, THEME.frameOutline);
    }

    function band(from: { x: number; y: number }, w: number) {
      const len = Math.hypot(pocket.x - from.x, pocket.y - from.y);
      strokeLine(
        [[from, { x: pocket.x, y: pocket.y }]],
        w * clamp(1.15 - len / (maxPull * 2.4), 0.45, 1),
        THEME.band,
        THEME.bandOutline
      );
    }

    function drawDoll() {
      if (!ctx || doll.mode === "gone" || doll.mode === "wait") return;
      ctx.save();
      ctx.translate(doll.x, doll.y);
      const st = 1 + doll.st;
      ctx.rotate(doll.ang);
      ctx.scale(st, 1 / st);
      ctx.rotate(-doll.ang);
      ctx.scale(1 + doll.sq, 1 - doll.sq * 0.9);
      ctx.rotate(doll.rot);
      drawLogoAt(ctx, size);
      ctx.restore();
    }

    function drawBits() {
      if (!ctx) return;
      for (const b of bits) {
        ctx.save();
        ctx.globalAlpha = clamp(b.life, 0, 1);
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        if (b.shape === "ring") {
          ctx.strokeStyle = b.color;
          ctx.lineWidth = Math.max(1, S * 0.09 * b.life);
          ctx.beginPath();
          ctx.arc(0, 0, b.r, 0, Math.PI * 2);
          ctx.stroke();
        } else if (b.shape === "star") {
          ctx.beginPath();
          for (let i = 0; i < 24; i++) {
            const a = (i * Math.PI) / 12;
            const rr = i % 2 ? b.r * 0.62 : b.r;
            ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
          }
          ctx.closePath();
          ctx.fillStyle = b.color;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 4;
          ctx.lineJoin = "round";
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = b.color;
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          if (b.shape === "dot") ctx.arc(0, 0, b.r, 0, Math.PI * 2);
          else if (b.shape === "pill") roundedRect(ctx, -b.r * 1.4, -b.r * 0.6, b.r * 2.8, b.r * 1.2, b.r * 0.6);
          else roundedRect(ctx, -b.r, -b.r, b.r * 2, b.r * 2, b.r * 0.35);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const [l, r] = tips();
      const bw = S * 0.11;
      band(l, bw);
      drawFrame();
      ctx.fillStyle = THEME.pocket;
      ctx.beginPath();
      ctx.ellipse(pocket.x, pocket.y, S * 0.2, S * 0.1, 0, 0, Math.PI * 2);
      ctx.fill();
      drawDoll();
      band(r, bw);
      drawBits();
    }

    const still = () =>
      doll.mode === "rest" &&
      !bits.length &&
      Math.abs(pocket.x - R.x) + Math.abs(pocket.y - R.y) + Math.abs(pocket.vx) + Math.abs(pocket.vy) < 0.02 &&
      Math.abs(doll.sq) +
      Math.abs(doll.sqv) +
      Math.abs(doll.rot) +
      Math.abs(doll.st) +
      Math.abs(fr.sq) +
      Math.abs(fr.sqv) +
      Math.abs(fr.lean) +
      Math.abs(fr.leanv) <
      0.002;

    function frame(t: number) {
      if (destroyed) return;
      const dt = Math.min((t - last) / 1000 || 0, 0.033);
      last = t;
      if (doll.mode === "wait" && root && root.getBoundingClientRect().top + A.y + S * 1.1 < window.innerHeight) {
        Object.assign(doll, { mode: "drop", x: R.x, y: -size, vx: 0, vy: 0, rot: 0, spin: 0 });
      }
      step(dt / 2);
      step(dt / 2);
      draw();
      updateGrabDom();
      raf = visible && !still() ? requestAnimationFrame(frame) : 0;
    }

    function wake() {
      if (visible && !raf && !destroyed) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }

    // Pointer + Keyboard handlers
    const pt = (e: PointerEvent) => {
      const r = root!.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    let off = { x: 0, y: 0 };
    const snd = { lx: 0, ly: 0, t: 0 };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || doll.mode !== "rest") return;
      e.preventDefault();
      try {
        grab.setPointerCapture(e.pointerId);
      } catch { }
      const p = pt(e);
      off = { x: doll.x - p.x, y: doll.y - p.y };
      doll.mode = "drag";
      root.classList.add("dm-ss-pulling");
      snd.lx = doll.x;
      snd.ly = doll.y;
      snd.t = performance.now();
      slingshotSound.peel();
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (doll.mode !== "drag") return;
      const p = pt(e);
      let dx = p.x + off.x - R.x;
      let dy = p.y + off.y - R.y;
      const m = Math.hypot(dx, dy);
      if (m > maxPull) {
        dx *= maxPull / m;
        dy *= maxPull / m;
      }
      doll.x = pocket.x = R.x + dx;
      doll.y = pocket.y = R.y + dy;
      pocket.vx = pocket.vy = 0;
      doll.rot = clamp(dx * 0.004, -0.4, 0.4);

      const now = performance.now();
      const vel = Math.hypot(doll.x - snd.lx, doll.y - snd.ly) / Math.max(now - snd.t, 8);
      slingshotSound.slide(vel, Math.min(m, maxPull) / maxPull);
      snd.lx = doll.x;
      snd.ly = doll.y;
      snd.t = now;
      wake();
    };

    const release = () => {
      if (doll.mode !== "drag") return;
      root.classList.remove("dm-ss-pulling");
      slingshotSound.slideEnd();
      const dx = R.x - doll.x;
      const dy = R.y - doll.y;
      const pull = Math.hypot(dx, dy);
      if (pull < 16) {
        doll.mode = "rest";
        doll.rot = 0;
        return;
      }
      launch(dx / pull, dy / pull, pull / maxPull);
      wake();
    };

    let kb = false;
    const kp = { x: 0, y: 0 };
    const ARROW: Record<string, [number, number]> = {
      ArrowDown: [0, 1],
      ArrowUp: [0, -1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    const aimDesc = (ux: number, uy: number) => {
      const a = (Math.atan2(-uy, ux) * 180) / Math.PI;
      if (a > 112) return "up and to the left";
      if (a > 68) return "straight up";
      if (a > 22) return "up and to the right";
      if (a > -22) return "to the right";
      if (a > -158) return "down";
      return "to the left";
    };
    const unpull = () => {
      kb = false;
      kp.x = kp.y = 0;
      doll.mode = "rest";
      root.classList.remove("dm-ss-pulling");
      slingshotSound.slideEnd();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const d = ARROW[e.key];
      if (d && (doll.mode === "rest" || (doll.mode === "drag" && kb))) {
        e.preventDefault();
        if (doll.mode === "rest") {
          kb = true;
          kp.x = kp.y = 0;
          doll.mode = "drag";
          root.classList.add("dm-ss-pulling");
          slingshotSound.peel();
        }
        kp.x += d[0] * maxPull * 0.1;
        kp.y += d[1] * maxPull * 0.1;
        const m = Math.hypot(kp.x, kp.y);
        if (m > maxPull) {
          kp.x *= maxPull / m;
          kp.y *= maxPull / m;
        }
        doll.x = pocket.x = R.x + kp.x;
        doll.y = pocket.y = R.y + kp.y;
        pocket.vx = pocket.vy = 0;
        doll.rot = clamp(kp.x * 0.004, -0.4, 0.4);
        const pull = Math.min(Math.hypot(kp.x, kp.y), maxPull) / maxPull;
        slingshotSound.slide(0.6, pull);
        setLiveMsg(pull < 0.12 ? "Barely pulled." : `Pulled back ${Math.round(pull * 100)}%, aiming ${aimDesc(-kp.x, -kp.y)}.`);
        wake();
        return;
      }
      if (e.key === "Escape" && doll.mode === "drag" && kb) {
        e.preventDefault();
        unpull();
        setLiveMsg("Put logo back cleanly.");
        return;
      }
      if (e.key !== "Enter" && e.key !== " ") return;
      if (doll.mode === "drag" && kb) {
        e.preventDefault();
        kb = false;
        release();
        return;
      }
      if (doll.mode !== "rest") return;
      e.preventDefault();
      const a = -Math.PI * (0.28 + Math.random() * 0.12);
      launch(Math.cos(a), Math.sin(a), 0.88 + Math.random() * 0.12);
      wake();
    };

    const onBlur = () => {
      if (doll.mode === "drag" && kb) unpull();
    };

    grab.addEventListener("pointerdown", onPointerDown);
    grab.addEventListener("pointermove", onPointerMove);
    grab.addEventListener("pointerup", release);
    grab.addEventListener("pointercancel", release);
    grab.addEventListener("keydown", onKeyDown);
    grab.addEventListener("blur", onBlur);
    root.addEventListener("pointerdown", wake, true);
    root.addEventListener("keydown", wake, true);

    const io = new IntersectionObserver((es) => {
      visible = es[0]?.isIntersecting ?? false;
      root.classList.toggle("dm-ss-asleep", !visible);
      wake();
    });
    io.observe(root);

    const ro = new ResizeObserver(layout);
    ro.observe(root);
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!destroyed) layout();
      });
    }
    layout();

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      activeSkyCleanups.forEach((fn) => fn());
      activeSkyCleanups.clear();
      slingshotSound.slideEnd();
      grab.removeEventListener("pointerdown", onPointerDown);
      grab.removeEventListener("pointermove", onPointerMove);
      grab.removeEventListener("pointerup", release);
      grab.removeEventListener("pointercancel", release);
      grab.removeEventListener("keydown", onKeyDown);
      grab.removeEventListener("blur", onBlur);
      root.removeEventListener("pointerdown", wake, true);
      root.removeEventListener("keydown", wake, true);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label="DESI MUCHADS Interactive Slingshot Wordmark"
      className="dm-ss-section dm-ss-asleep relative w-full select-none pt-2 pb-14 sm:pb-20"
    >
      {/* Original Monochrome DESI MUCHADS Bold Wordmark with Slingshot Directly Beside It */}
      <div className="relative z-10 flex flex-row items-center justify-center gap-3 sm:gap-7 md:gap-10 pointer-events-none">
        <div className="text-left sm:text-center">
          <h2
            ref={headlineRef}
            className="flex flex-wrap items-center justify-start sm:justify-center gap-x-2 sm:gap-x-5 md:gap-x-6 text-[28px] sm:text-6xl md:text-7xl lg:text-[7vw] font-display font-black tracking-tight uppercase leading-[1.02]"
          >
            <span className="text-white/25 hover:text-white transition-colors duration-300 pointer-events-auto">
              DESI
            </span>
            <span className="inline-block transition-colors duration-300 pointer-events-auto">
              <span className="text-white">
                MUCH
              </span>
              <span className="text-white/25 hover:text-white transition-colors duration-300">
                ADS
              </span>
            </span>
          </h2>
          <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs md:text-sm font-mono tracking-widest text-zinc-500 uppercase font-medium">
            HIGH-CONVERSION PERFORMANCE MARKETING STUDIO
          </p>
        </div>

        {/* Positioned Anchor Slot Directly Next to the Bold Words */}
        <div
          ref={slotRef}
          aria-hidden="true"
          className="w-[96px] sm:w-[152px] md:w-[184px] h-[118px] sm:h-[164px] md:h-[188px] shrink-0"
        />
      </div>

      {/* Full-stage HiDPI Transparent Canvas for Gold Slingshot, Orange Straps, Moustache Logo & Particles */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full block pointer-events-none z-10"
      />

      {/* Interactive accessible drag handle over the slingshot pouch */}
      <button
        ref={grabRef}
        type="button"
        aria-label="Pull back and release the Desi Muchads logo slingshot. Keyboard: Arrow keys pull back, Enter releases, Escape cancels."
        className="dm-ss-grab absolute left-0 top-0 z-20 p-0 border-0 bg-transparent rounded-[40%]"
      />

      {/* Subtle post-shot recovery / bullseye actions shown only after interactive fire */}
      {(bullseyeHit || blownCount > 0) && (
        <div className="relative z-20 mt-2 flex flex-wrap items-center justify-center gap-3">
          {bullseyeHit && onOpenKundli && (
            <button
              type="button"
              onClick={onOpenKundli}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Bullseye! Claim Bonus Growth Audit</span>
            </button>
          )}

          {blownCount > 0 && (
            <button
              type="button"
              onClick={handleTidyUp}
              aria-label="Restore scattered page elements"
              className="dm-ss-tidy-btn dm-ss-sticker-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141416] hover:bg-[#1e1e22] border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tidy up</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FF6B2C] text-white text-[10px] font-black leading-none">
                {blownCount}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Screen-reader live announcer */}
      <p className="sr-only" aria-live="polite">
        {liveMsg}
      </p>
    </div>
  );
}
