"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoustacheSVG } from "../common/Icons";
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
      className="relative bg-[#14110E] text-[#EFE7DA] pt-24 pb-12 overflow-hidden border-t border-[rgba(239,231,218,0.15)] select-none font-body"
    >
      {/* Cursor-Following Radial Golden Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.2), transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desi Vibes Monumental Legacy Counter (22 Years / ₹140Cr+) */}
        <div className="mb-16 pb-12 border-b border-[rgba(239,231,218,0.15)] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-baseline gap-4 sm:gap-6 mb-4">
            <span className="font-display font-light text-6xl sm:text-8xl md:text-9xl text-[#D4AF37] tracking-tight leading-none">
              ₹140Cr+
            </span>
            <div className="flex flex-col">
              <span className="font-body text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#EFE7DA] uppercase">
                OF ATTRIBUTED NET REVENUE SCALED
              </span>
              <span className="font-display text-xl sm:text-2xl italic text-[#EFE7DA]/70 font-light">
                Unshakable Strategy • Uncompromising ROAS • Made with Pride in India
              </span>
            </div>
          </div>
        </div>

        {/* Top Footer Multi-Column Grid (Desi Vibes Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[rgba(239,231,218,0.12)]">
          {/* Col 1-5: Brand & Vision */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center">
                <MoustacheSVG className="w-6 h-3 text-[#D4AF37]" />
              </div>
              <span className="font-display font-light text-3xl tracking-widest text-[#EFE7DA] uppercase">
                DESI MUCHADS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#EFE7DA]/70 max-w-sm leading-relaxed font-light">
              India&apos;s premier high-ROAS marketing agency and neo-desi creative powerhouse. We fuse royal cultural storytelling with ruthless performance media buying.
            </p>

            {/* Live IST Time Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(239,231,218,0.2)] bg-[#1C1815] text-xs font-mono text-[#D4AF37]">
              <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>LIVE IST // {currentTime || "05:50:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            </div>
          </div>

          {/* Col 6-8: Discover Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h6 className="font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              DISCOVER
            </h6>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Hum Kya Karte Hain (Services)
                </a>
              </li>
              <li>
                <a href="#baiscope" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ The Royal Baiscope (Showreel)
                </a>
              </li>
              <li>
                <a href="#karname" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Hamare Karname (Case Studies)
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Marketing Thali & Retainers
                </a>
              </li>
              <li>
                <a href="#portal" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Inside the Darbar (Client Portal)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 9-12: Locations & Direct WhatsApp Callout */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between space-y-6">
            <div className="w-full lg:text-right space-y-2">
              <h6 className="font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
                DARBAR LOCATIONS
              </h6>
              <p className="text-xs text-[#EFE7DA]/70 font-light">
                Sector 18 Noida • Connaught Place Delhi • Indiranagar Bengaluru • BKC Mumbai
              </p>
            </div>

            {/* Direct WhatsApp Hotline */}
            <a
              href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20discuss%20our%20brand%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#075E54] text-white hover:scale-105 transition-all text-xs font-semibold tracking-wider uppercase shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Oversized Kinetic Edge-to-Edge Cormorant Garamond Wordmark */}
        <div className="pt-12 pb-8 text-center overflow-hidden">
          <div className="text-[12vw] font-display font-light tracking-[0.06em] uppercase leading-none select-none text-[rgba(239,231,218,0.06)] hover:text-[#D4AF37]/25 transition-colors duration-500 whitespace-nowrap">
            DESI MUCHADS
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-light text-[#EFE7DA]/50 pt-8 border-t border-[rgba(239,231,218,0.1)] gap-4">
          <div>
            <span>© 2026 Desi Muchads Marketing Agency. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C84B31] fill-current" />
            <span>and Pride in Bharat • Indian Cuisine Indian Style</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
