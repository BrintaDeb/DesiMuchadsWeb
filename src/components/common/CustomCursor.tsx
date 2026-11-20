"use client";

import React, { useEffect, useState, useRef } from "react";
import { Eye, Flame, Coffee, MoveHorizontal } from "lucide-react";

export type CursorMode = "default" | "pointer" | "explore" | "view" | "flame" | "chai" | "drag";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const isVisibleRef = useRef(false);
  const modeRef = useRef<CursorMode>("default");

  useEffect(() => {
    // Only enable on fine pointer devices (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Check for specialized data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      let nextMode: CursorMode = "default";

      if (target.closest('[data-cursor="view"]')) {
        nextMode = "view";
      } else if (target.closest('[data-cursor="flame"]')) {
        nextMode = "flame";
      } else if (target.closest('[data-cursor="chai"]')) {
        nextMode = "chai";
      } else if (target.closest('[data-cursor="drag"]')) {
        nextMode = "drag";
      } else if (target.closest('[data-cursor="explore"]')) {
        nextMode = "explore";
      } else if (
        target.closest('button, a, input, select, textarea, [role="button"], [data-cursor="pointer"]')
      ) {
        nextMode = "pointer";
      }

      if (modeRef.current !== nextMode) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;
    const lerpFactor = 0.18;

    const render = () => {
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
  }, []);

  if (!mounted) return null;

  const isSpecial = mode !== "default" && mode !== "pointer";

  return (
    <>
      {/* Center 8px stark white sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[100] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isSpecial ? "opacity-0" : ""}`}
      >
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
      </div>

      {/* Trailing Ring / Metamorphosis Shape */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {mode === "explore" && (
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
                  ✦ INSPECT • EXPLORE ✦ INSPECT • EXPLORE
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_white]">
              <span className="text-black text-xs font-bold font-mono">〰️</span>
            </div>
          </div>
        )}

        {mode === "view" && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white text-black flex items-center gap-1.5 shadow-[0_0_20px_white] animate-in zoom-in-75 duration-200">
            <Eye className="w-3.5 h-3.5 text-black" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">INSPECT</span>
          </div>
        )}

        {mode === "flame" && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-amber-400 text-black flex items-center gap-1.5 shadow-[0_0_25px_rgba(251,191,36,0.8)] animate-in zoom-in-75 duration-200">
            <Flame className="w-3.5 h-3.5 text-black animate-pulse" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">ROAS</span>
          </div>
        )}

        {mode === "chai" && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-emerald-400 text-black flex items-center gap-1.5 shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-in zoom-in-75 duration-200">
            <Coffee className="w-3.5 h-3.5 text-black" />
            <span className="font-mono text-[10px] font-black uppercase tracking-wider">SESSION</span>
          </div>
        )}

        {mode === "drag" && (
          <div className="relative -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-white text-black flex items-center gap-1 shadow-[0_0_15px_white] animate-in zoom-in-75 duration-200">
            <MoveHorizontal className="w-3.5 h-3.5 text-black" />
            <span className="font-mono text-[9px] font-bold uppercase">DRAG</span>
          </div>
        )}

        {!isSpecial && (
          /* Normal Trailing Ring */
          <div
            className={`rounded-full border border-white/60 transition-all duration-300 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 ${
              mode === "pointer"
                ? "w-14 h-14 bg-white/10 border-white scale-110"
                : "w-9 h-9 border-white/40"
            }`}
          />
        )}
      </div>
    </>
  );
}
