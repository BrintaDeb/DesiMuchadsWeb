"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isExplore, setIsExplore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements or explore targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const exploreEl = target.closest('[data-cursor="explore"]');
      setIsExplore(!!exploreEl);

      const clickableEl = target.closest(
        'button, a, input, select, textarea, [role="button"], [data-cursor="pointer"]'
      );
      setIsPointer(!!clickableEl);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const lerpFactor = 0.16;

    const render = () => {
      // Lerp ring position toward mouse position
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Center 8px stark white sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isExplore ? "opacity-0" : ""}`}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
      </div>

      {/* Trailing 36px white ring or rotating stamp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {isExplore ? (
          /* Circular rotating Hindi/English stamp */
          <div className="relative w-28 h-28 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-spin-slow">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            >
              <path
                id="dekhoCirclePath"
                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                fill="none"
              />
              <text className="font-mono text-[9px] uppercase tracking-[0.22em] fill-white font-bold">
                <textPath href="#dekhoCirclePath" startOffset="0%">
                  ✦ DEKHO • EXPLORE ✦ DEKHO • EXPLORE
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_white]">
              <span className="text-black text-xs font-bold font-mono">〰️</span>
            </div>
          </div>
        ) : (
          /* Normal Trailing Ring */
          <div
            className={`rounded-full border border-white/60 transition-all duration-300 flex items-center justify-center ${
              isPointer
                ? "w-14 h-14 bg-white/10 border-white scale-110"
                : "w-9 h-9 border-white/40"
            }`}
          />
        )}
      </div>
    </>
  );
}
