"use client";

import React, { useRef, useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // Translation displacement factor (default 0.25)
  tiltStrength?: number; // Angular 3D rotation factor (default 4)
  className?: string;
  disabled?: boolean;
  enableSound?: boolean;
}

/**
 * 3D Magnetic Kinetic Physics Wrapper
 * Pulls elements smoothly toward cursor coordinates with realistic spring physics,
 * subtle 3D rotational tilt, and tactile micro-audio feedback.
 */
export function MagneticWrapper({
  children,
  strength = 0.25,
  tiltStrength = 4,
  className = "",
  disabled = false,
  enableSound = false,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const isCoarse = useRef(false);
  const hasTriggeredAudio = useRef(false);

  useEffect(() => {
    isCoarse.current = window.matchMedia("(pointer: coarse)").matches;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isCoarse.current || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    // Calculate subtle 3D rotational angle
    const normX = (clientX - centerX) / (width / 2);
    const normY = (clientY - centerY) / (height / 2);
    const rotX = -normY * tiltStrength;
    const rotY = normX * tiltStrength;

    if (enableSound && !hasTriggeredAudio.current) {
      sound.playPluck(190);
      haptics.light();
      hasTriggeredAudio.current = true;
    }

    setPosition({ x: deltaX, y: deltaY, rx: rotX, ry: rotY });
  };

  const handleMouseLeave = () => {
    hasTriggeredAudio.current = false;
    setPosition({ x: 0, y: 0, rx: 0, ry: 0 });
  };

  const isFullWidth = className.includes("w-full");
  const displayClass = isFullWidth ? "w-full block" : "inline-block";

  const isDisplaced = position.x !== 0 || position.y !== 0;

  return (
    <div
      ref={containerRef}
      data-magnetic="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${displayClass} transform-gpu perspective-[1000px] ${className}`}
      style={{
        transform: isDisplaced
          ? `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0) rotateX(${position.rx.toFixed(2)}deg) rotateY(${position.ry.toFixed(2)}deg)`
          : undefined,
        transition: isDisplaced
          ? "transform 0.08s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
