"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number; // Physics displacement factor (default 0.25)
  className?: string;
  disabled?: boolean;
}

export function MagneticWrapper({
  children,
  strength = 0.25,
  className = "",
  disabled = false,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isCoarse = useRef(false);

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

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isFullWidth = className.includes("w-full");
  const displayClass = isFullWidth ? "w-full block" : "inline-block";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${displayClass} transform-gpu ${className}`}
      style={{
        transform:
          position.x !== 0 || position.y !== 0
            ? `translate3d(${position.x}px, ${position.y}px, 0)`
            : undefined,
        transition:
          position.x === 0 && position.y === 0
            ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 0.1s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
