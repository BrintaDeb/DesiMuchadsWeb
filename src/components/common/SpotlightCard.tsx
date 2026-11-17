"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  borderColor?: string;
  className?: string;
  enableTilt?: boolean;
  maxTilt?: number; // max tilt degrees (default 3)
  perspective?: number; // 3D perspective in px (default 1200)
  scale?: number; // scale on hover (default 1.004)
  isGlass?: boolean; // iOS & visionOS glassmorphism backdrop
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(255, 255, 255, 0.10)",
  borderColor = "rgba(255, 255, 255, 0.40)",
  className = "",
  enableTilt = true,
  maxTilt = 3,
  perspective = 1200,
  scale = 1.004,
  isGlass = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const borderGlintRef = useRef<HTMLDivElement>(null);
  const isCoarseRef = useRef<boolean>(false);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Track viewport visibility for high-efficiency mobile gyro tilt
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation frame and interpolation targets for buttery 60/120fps physics
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    isCoarseRef.current = window.matchMedia("(pointer: coarse)").matches;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Smooth linear interpolation animation loop using named function expression
  const updatePhysics = useCallback(
    function tick() {
      if (!enableTilt || prefersReducedMotion || !cardRef.current) return;

      // Smooth, silky dampening factor (lerp)
      const factor = 0.08;
      currentX.current += (targetX.current - currentX.current) * factor;
      currentY.current += (targetY.current - currentY.current) * factor;

      const rotX = -currentY.current * maxTilt;
      const rotY = currentX.current * maxTilt;

      if (isHovered) {
        cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      } else {
        cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1, 1, 1)`;
      }

      // Continue loop until fully dampened when not hovered
      const delta = Math.abs(targetX.current - currentX.current) + Math.abs(targetY.current - currentY.current);
      if (isHovered || delta > 0.001) {
        animFrameId.current = requestAnimationFrame(tick);
      } else {
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
        animFrameId.current = null;
      }
    },
    [enableTilt, isHovered, maxTilt, perspective, prefersReducedMotion, scale]
  );

  // Gyroscope mobile spatial tilt support (active when card is in view on Android & iOS)
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !enableTilt || !isInView) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      // When finger is touching, touch coordinate takes priority
      if (isHovered) return;

      // Normalize gamma (-25 to 25 deg roll) and beta (20 to 70 deg pitch)
      const normX = Math.max(-1, Math.min(1, e.gamma / 25));
      const normY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));

      // Gentle, refined ambient 3D tilt
      targetX.current = normX * 0.45;
      targetY.current = normY * 0.45;

      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [enableTilt, isInView, isHovered, prefersReducedMotion, updatePhysics]);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!cardRef.current || !enableTilt || prefersReducedMotion) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Calculate normalized -1 to +1 coordinates from card center
      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      targetX.current = Math.max(-1, Math.min(1, normX));
      targetY.current = Math.max(-1, Math.min(1, normY));

      const glareXPct = (x / rect.width) * 100;
      const glareYPct = (y / rect.height) * 100;

      // Modern Web Guidance: Update coordinates on container for registered custom properties
      if (cardRef.current) {
        cardRef.current.style.setProperty("--mouse-x", `${glareXPct.toFixed(1)}%`);
        cardRef.current.style.setProperty("--mouse-y", `${glareYPct.toFixed(1)}%`);
      }

      // Dynamic Glare coordinates
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(400px circle at ${glareXPct}% ${glareYPct}%, ${spotlightColor}, transparent 70%)`;
      }

      // Dynamic Border Glint coordinates
      if (borderGlintRef.current) {
        borderGlintRef.current.style.maskImage = `radial-gradient(280px circle at ${x}px ${y}px, black var(--inner-size, 0%), transparent var(--outer-size, 75%))`;
        borderGlintRef.current.style.webkitMaskImage = `radial-gradient(280px circle at ${x}px ${y}px, black var(--inner-size, 0%), transparent var(--outer-size, 75%))`;
      }

      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      }
    },
    [enableTilt, prefersReducedMotion, spotlightColor, updatePhysics]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handlePointerMove(e.clientX, e.clientY);
    },
    [handlePointerMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [handlePointerMove]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onMouseEnter) props.onMouseEnter(e);
      setIsHovered(true);
      if (cardRef.current) {
        cardRef.current.style.setProperty("--inner-size", "80px");
        cardRef.current.style.setProperty("--outer-size", "220px");
        cardRef.current.style.setProperty("--spotlight-opacity", "1");
      }
      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      }
    },
    [props, updatePhysics]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setIsHovered(true);
      if (e.touches && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (cardRef.current) {
        cardRef.current.style.setProperty("--inner-size", "100px");
        cardRef.current.style.setProperty("--outer-size", "260px");
        cardRef.current.style.setProperty("--spotlight-opacity", "1");
      }
      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      }
    },
    [handlePointerMove, updatePhysics]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (props.onMouseLeave) props.onMouseLeave(e);
      setIsHovered(false);
      targetX.current = 0;
      targetY.current = 0;
      if (cardRef.current) {
        cardRef.current.style.setProperty("--inner-size", "0px");
        cardRef.current.style.setProperty("--outer-size", "0px");
        cardRef.current.style.setProperty("--spotlight-opacity", "0");
      }
      if (!animFrameId.current) {
        animFrameId.current = requestAnimationFrame(updatePhysics);
      }
    },
    [props, updatePhysics]
  );

  const handleTouchEnd = useCallback(() => {
    setIsHovered(false);
    targetX.current = 0;
    targetY.current = 0;
    if (cardRef.current) {
      cardRef.current.style.setProperty("--inner-size", "0px");
      cardRef.current.style.setProperty("--outer-size", "0px");
      cardRef.current.style.setProperty("--spotlight-opacity", "0");
    }
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: isHovered
          ? "none"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
        ...props.style,
      }}
      className={`relative overflow-hidden select-none ${isGlass ? "ios-glass-card backdrop-blur-xl" : ""} ${className}`}
      {...props}
    >
      {/* 1. iOS Specular Reflection Sheen (Follows cursor in 3D) */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at 50% 50%, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* 2. Cursor-Tracking Specular Border Glint */}
      <div
        ref={borderGlintRef}
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
          borderTopColor: "rgba(255, 255, 255, 0.7)",
        }}
      />

      {/* 3. iOS visionOS Specular Top Bevel Edge */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20" />

      {/* 4. Card Content with 3D Spatial Depth */}
      <div
        style={{ transformStyle: "preserve-3d", transform: "translateZ(4px)" }}
        className="relative z-20 flex-1 flex flex-col justify-between h-full"
      >
        {children}
      </div>
    </div>
  );
}
