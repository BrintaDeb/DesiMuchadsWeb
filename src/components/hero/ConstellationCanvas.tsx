"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
}

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);
    let rectCache = canvas.getBoundingClientRect();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      rectCache = canvas.getBoundingClientRect();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Desktop fine-pointer proximity tracking only (avoids scroll-blocking touch listeners on mobile)
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - rectCache.left;
      mouse.y = e.clientY - rectCache.top;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (!isCoarsePointer && !prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    // Fewer stars on mobile GPUs so scrolling stays locked at native display refresh rate
    const stars: Star[] = [];
    const maxStars = isCoarsePointer ? 14 : 32;
    const starCount = Math.min(maxStars, Math.max(8, Math.floor((width * height) / 32000)));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (isCoarsePointer ? 0.14 : 0.25),
        vy: (Math.random() - 0.5) * (isCoarsePointer ? 0.14 : 0.25),
        size: Math.random() * 1.4 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    let animId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let lastFrameTime = 0;
    // Cap mobile animation frame pace (~18fps ambient drift) to preserve touch scrolling headroom
    const minFrameMs = isCoarsePointer ? 55 : 0;

    const render = (now: number) => {
      if (minFrameMs > 0 && now - lastFrameTime < minFrameMs) {
        if (isVisible && isPageVisible && !prefersReducedMotion) {
          animId = requestAnimationFrame(render);
        }
        return;
      }
      lastFrameTime = now;

      ctx.clearRect(0, 0, width, height);

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.baseAlpha})`;
        ctx.fill();

        // Connect star to nearby desktop cursor
        if (!isCoarsePointer && mouse.x > -500) {
          const dMouse = Math.hypot(star.x - mouse.x, star.y - mouse.y);
          if (dMouse < 140) {
            const alpha = (1 - dMouse / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect star to neighboring stars
        for (let j = i + 1; j < stars.length; j++) {
          const star2 = stars[j];
          const dist = Math.hypot(star.x - star2.x, star.y - star2.y);
          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.08;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (isVisible && isPageVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    const scheduleLoop = () => {
      cancelAnimationFrame(animId);
      if (isVisible && isPageVisible && !prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      scheduleLoop();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry ? entry.isIntersecting : true;
        if (!wasVisible && isVisible) {
          scheduleLoop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    if (prefersReducedMotion) {
      render(performance.now());
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (!isCoarsePointer && !prefersReducedMotion) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-[2]"
      aria-hidden="true"
    />
  );
}
