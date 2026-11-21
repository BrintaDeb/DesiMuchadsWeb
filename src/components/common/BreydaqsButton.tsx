"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { MagneticWrapper } from "./MagneticWrapper";

interface BreydaqsButtonProps {
  children: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "dark" | "white" | "outline";
  showIcon?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  enableMagnetic?: boolean;
}

export function BreydaqsButton({
  children,
  href,
  onClick,
  variant = "dark",
  showIcon = true,
  icon,
  className = "",
  type = "button",
  disabled = false,
  target,
  rel,
  enableMagnetic = true,
}: BreydaqsButtonProps) {
  const variantClass =
    variant === "white"
      ? "breydaqs-btn-white"
      : variant === "outline"
      ? "bg-transparent border-white/20 text-white hover:border-white/60"
      : "bg-[#080807] text-[#e8e8e3] border-[rgba(232,232,227,0.22)]";

  const content = (
    <>
      <span className="btn-text-track">
        <span>{children}</span>
        <span>{children}</span>
      </span>

      {showIcon && (
        <span className="btn-icon-box" aria-hidden="true">
          <span className="icon-primary">
            {icon || <ArrowUpRight className="w-3.5 h-3.5" />}
          </span>
          <span className="icon-secondary">
            {icon || <ArrowUpRight className="w-3.5 h-3.5" />}
          </span>
        </span>
      )}
    </>
  );

  const handleMouseEnter = () => {
    sound.playPluck(160);
  };

  const handleClick = (e: React.MouseEvent) => {
    haptics.medium();
    sound.playChime();
    if (onClick) onClick(e);
  };

  const handleTouchStart = () => {
    haptics.light();
  };

  const buttonElement = href ? (
    <Link
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      className={`breydaqs-btn ${variantClass} ${className}`}
    >
      {content}
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      className={`breydaqs-btn ${variantClass} ${className}`}
    >
      {content}
    </button>
  );

  if (enableMagnetic) {
    const isFullWidth = className.includes("w-full");
    return (
      <MagneticWrapper className={isFullWidth ? "w-full block" : ""}>
        {buttonElement}
      </MagneticWrapper>
    );
  }

  return buttonElement;
}
