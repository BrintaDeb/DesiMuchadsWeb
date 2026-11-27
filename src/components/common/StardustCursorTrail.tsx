"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rot: number;
  vr: number;
  kind: "orb" | "star" | "ring";
  color: string;
}

interface TrailPoint {
  x: number;
  y: number;
  life: number;
}

export function StardustCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only run on desktop fine pointers with motion enabled
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const ribbon: TrailPoint[] = [];
    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(244, 244, 245, ",
      "rgba(243, 229, 171, ",
      "rgba(212, 175, 55, ", // Refined heritage brass gold shimmer
    ];

    let lastX = 0;
    let lastY = 0;
    let animId = 0;
    let isRunning = false;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const drawFourPointStar = (r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const rad = i % 2 === 0 ? r * 2.1 : r * 0.45;
        if (i === 0) ctx.moveTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
        else ctx.lineTo(Math.cos(ang) * rad, Math.sin(ang) * rad);
      }
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw smooth liquid platinum-gold comet ribbon behind fast cursor sweeps
      for (let i = ribbon.length - 1; i >= 0; i--) {
        ribbon[i].life -= 0.055;
        if (ribbon[i].life <= 0) ribbon.splice(i, 1);
      }
      if (ribbon.length >= 2) {
        ctx.save();
        ctx.lineCap = "round";
        for (let i = 1; i < ribbon.length; i++) {
          const p0 = ribbon[i - 1];
          const p1 = ribbon[i];
          const frac = i / ribbon.length;
          const alpha = Math.max(0, Math.min(0.42, p1.life * frac * 0.42));
          ctx.strokeStyle = frac > 0.6
            ? `rgba(243, 229, 171, ${alpha.toFixed(2)})`
            : `rgba(255, 255, 255, ${(alpha * 0.85).toFixed(2)})`;
          ctx.lineWidth = Math.max(0.6, frac * 2.1);
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.kind === "ring") {
          p.size += 1.65;
          ctx.strokeStyle = `${p.color}${p.alpha.toFixed(2)})`;
          ctx.lineWidth = Math.max(0.8, 1.8 * p.alpha);
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.stroke();
        } else if (p.kind === "star") {
          ctx.rotate(p.rot);
          ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
          ctx.shadowColor = "rgba(243, 229, 171, 0.5)";
          ctx.shadowBlur = 7;
          drawFourPointStar(p.size);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
          ctx.shadowColor = "rgba(212, 175, 55, 0.35)";
          ctx.shadowBlur = 5;
          ctx.fill();
        }
        ctx.restore();
      }

      if ((particles.length > 0 || ribbon.length > 0) && !document.hidden) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animId = 0;
      }
    };

    const wakeLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      // Restrain particle scatter over dense 3D carousels and the interactive slingshot stage
      const target = e.target as HTMLElement | null;
      if (target?.closest('[role="region"], .dm-ss-section')) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        ribbon.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (ribbon.length > 14) ribbon.shift();

        const count = Math.min(2, Math.floor(dist / 14) + 1);
        for (let i = 0; i < count; i++) {
          const isStar = Math.random() < 0.34;
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 1.1,
            vy: (Math.random() - 0.5) * 1.1 + 0.25,
            size: isStar ? Math.random() * 1.8 + 1.1 : Math.random() * 1.9 + 0.7,
            alpha: isStar ? 0.88 : 0.72,
            decay: Math.random() * 0.026 + 0.018,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.08,
            kind: isStar ? "star" : "orb",
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        lastX = e.clientX;
        lastY = e.clientY;
        wakeLoop();
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[role="region"], .dm-ss-section')) return;

      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: 0,
        vy: 0,
        size: 3,
        alpha: 0.75,
        decay: 0.045,
        rot: 0,
        vr: 0,
        kind: "ring",
        color: "rgba(243, 229, 171, ",
      });
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI * 2) / 6 + Math.random() * 0.4;
        const sp = 1.4 + Math.random() * 1.2;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          size: 1.5,
          alpha: 0.85,
          decay: 0.032,
          rot: a,
          vr: 0.1,
          kind: i % 2 === 0 ? "star" : "orb",
          color: colors[i % colors.length],
        });
      }
      wakeLoop();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[98]"
      aria-hidden="true"
    />
  );
}
