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
  color: string;
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
    const colors = [
      "rgba(255, 255, 255, ",
      "rgba(244, 244, 245, ",
      "rgba(228, 228, 231, ",
      "rgba(251, 191, 36, ", // Subtle gold shimmer
    ];

    let lastX = 0;
    let lastY = 0;
    let animId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Only spawn if moving
      if (dist > 4) {
        const count = Math.min(3, Math.floor(dist / 10) + 1);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 6,
            y: e.clientY + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2 + 0.3,
            size: Math.random() * 2.2 + 0.8,
            alpha: 0.8,
            decay: Math.random() * 0.025 + 0.015,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      cancelAnimationFrame(animId);
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
