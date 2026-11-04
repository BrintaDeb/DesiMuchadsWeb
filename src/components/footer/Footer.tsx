"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoustacheSVG, MandalaStamp } from "../common/Icons";
import { ArrowUpRight, MessageCircle, Clock, Heart } from "lucide-react";

interface FooterProps {
  onOpenKundli: () => void;
}

export function Footer({ onOpenKundli }: FooterProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Live IST Clock
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-IN", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#07070A] text-[#F7F1E5] pt-24 pb-12 overflow-hidden border-t border-[#D4AF37]/20 select-none"
    >
      {/* Cursor-Following Radial Golden Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.2), transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#D4AF37]/15">
          {/* Col 1-5: Brand & Vision */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center">
                <MoustacheSVG className="w-6 h-3 text-[#D4AF37]" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-[#F7F1E5]">
                DESI MUCHADS
              </span>
            </div>

            <p className="text-sm text-[#F7F1E5]/70 max-w-sm leading-relaxed">
              India&apos;s flagship performance marketing and neo-desi creative powerhouse. We fuse royal cultural swagger with ruthless data science to build category-defining brands.
            </p>

            {/* Live IST Time Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0D0C12] text-xs font-mono text-[#D4AF37]">
              <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>LIVE IST // {currentTime || "04:55:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            </div>
          </div>

          {/* Col 6-8: Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              DARBAR NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <a href="#services" className="text-[#F7F1E5]/70 hover:text-[#D4AF37] transition-colors">
                  ✦ Hum Kya Karte Hain (Services)
                </a>
              </li>
              <li>
                <a href="#karname" className="text-[#F7F1E5]/70 hover:text-[#D4AF37] transition-colors">
                  ✦ Hamare Karname (Case Studies)
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-[#F7F1E5]/70 hover:text-[#D4AF37] transition-colors">
                  ✦ Hisab-Kitab (ROAS Simulator)
                </a>
              </li>
              <li>
                <a href="#methodology" className="text-[#F7F1E5]/70 hover:text-[#D4AF37] transition-colors">
                  ✦ Parampara (Methodology)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: The Rotating Vintage Brass Seal & WhatsApp Action */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between">
            {/* The Rotating Royal Brass Seal */}
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#D4AF37]/80">
                  <path
                    id="sealPath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-[7.5px] uppercase tracking-[0.24em] fill-[#D4AF37] font-bold">
                    <textPath href="#sealPath" startOffset="0%">
                      ✦ 100% SHUDDH STRATEGY ✦ ZERO BAKWAAS
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Seal Center Icon */}
              <div className="w-14 h-14 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <MoustacheSVG className="w-8 h-4 text-[#D4AF37]" />
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <a
              href="https://wa.me/919999999999?text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20discuss%20our%20brand%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-all text-xs font-mono font-semibold"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Direct WhatsApp Hotline</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Oversized Kinetic Edge-to-Edge SVG Wordmark */}
        <div className="pt-12 pb-8 text-center overflow-hidden">
          <div className="text-[12vw] font-display font-extrabold tracking-tighter leading-none select-none text-[#141829] hover:text-[#D4AF37]/30 transition-colors duration-500 whitespace-nowrap">
            DESI MUCHADS
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#F7F1E5]/50 pt-8 border-t border-[#D4AF37]/10 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Desi Muchads Agency. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-current" />
            <span>and Pride in Bharat • High ROAS Only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
