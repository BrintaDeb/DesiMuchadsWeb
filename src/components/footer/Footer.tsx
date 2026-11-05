"use client";

import React, { useState, useEffect, useRef } from "react";
import { MoustacheSVG } from "../common/Icons";
import { ArrowUpRight, MessageCircle, Clock, Heart } from "lucide-react";
import { sound } from "@/lib/sound";

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
      className="relative bg-[#14110E] text-[#EFE7DA] pt-24 pb-28 sm:pb-36 overflow-hidden border-t border-[rgba(239,231,218,0.15)] select-none font-body"
    >
      {/* Cursor-Following Radial Golden Glow Effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.2), transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* BeeMarketing Signature High-Impact Punchline Banner */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1C1815] via-[#2A2521] to-[#1C1815] border border-[#D4AF37]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
              ✦ HONEST &amp; RESULTS-DRIVEN PERFORMANCE AGENCY
            </span>
            <h3 className="font-display font-light text-3xl sm:text-5xl text-[#F5EFEB] uppercase leading-tight">
              You deserve more.{" "}
              <span className="italic font-normal text-[#D4AF37] block sm:inline font-display">
                We’re proven to deliver.
              </span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-[#EFE7DA]/70 font-light">
              No hollow agency promises. We engineer data-backed media buying, viral hooks, and high-converting storefronts that scale real bank balance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => {
                sound.playChime();
                onOpenKundli();
              }}
              type="button"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-white font-body text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(200,75,49,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              BUZZ US NOW (FREE AUDIT)
            </button>
            <a
              href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20buzz%20you%20for%20our%20e-commerce%20growth."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full border border-[rgba(239,231,218,0.3)] bg-white/5 hover:bg-[#D4AF37]/15 text-[#EFE7DA] hover:text-[#D4AF37] font-body text-xs font-bold uppercase tracking-widest transition-all"
            >
              CHAT ON WHATSAPP
            </a>
          </div>
        </div>

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

        {/* Top Footer Multi-Column Grid (BeeMarketing Taxonomy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[rgba(239,231,218,0.12)]">
          {/* Col 1-5: Brand & Vision with Official Logo */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] shrink-0 bg-[#10223D]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="font-display font-bold text-2xl tracking-wider text-[#F5EFEB] uppercase flex items-center gap-1.5 leading-none">
                  <span>DESI</span>
                  <span className="text-[#E5A83B]">MUCH</span>
                  <span>ADS</span>
                </div>
                <span className="font-body text-[9px] tracking-[0.22em] text-[#D4AF37]/90 uppercase font-medium mt-1">
                  High-ROAS Performance • Desi Style
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#EFE7DA]/70 max-w-sm leading-relaxed font-light">
              An honest &amp; results-driven performance marketing agency. We fuse authentic cultural storytelling with ruthless media buying to scale category kings.
            </p>

            {/* Live IST Time Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[rgba(239,231,218,0.2)] bg-[#1C1815] text-xs font-mono text-[#D4AF37]">
              <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>LIVE IST // {currentTime || "06:05:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            </div>
          </div>

          {/* Col 5-6: Company Links (BeeMarketing Structure) */}
          <div className="lg:col-span-2 space-y-4">
            <h6 className="font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              COMPANY
            </h6>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ About us
                </a>
              </li>
              <li>
                <a href="#karname" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Clients &amp; Work
                </a>
              </li>
              <li>
                <a href="#baiscope" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ The Royal Baiscope
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Retainers &amp; Thali
                </a>
              </li>
              <li>
                <a href="#portal" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Client Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 7-9: 6 Capabilities Links (BeeMarketing Structure) */}
          <div className="lg:col-span-3 space-y-4">
            <h6 className="font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              CAPABILITIES
            </h6>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Social Media Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Performance Marketing (PPC)
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Email &amp; SMS Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Ad Creative Production
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ CRO &amp; Ecommerce Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors">
                  ✦ Growth Investments
                </a>
              </li>
            </ul>
          </div>

          {/* Col 10-12: Contact & Locations */}
          <div className="lg:col-span-3 space-y-4">
            <h6 className="font-body text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
              CONTACTS &amp; DARBAR
            </h6>
            <div className="space-y-2 text-xs text-[#EFE7DA]/70 font-light leading-relaxed">
              <p className="font-mono text-[#D4AF37]">buzz@desimuchads.com</p>
              <p>+91 (0) 9999 999 999</p>
              <p className="text-[11px] text-[#EFE7DA]/50 pt-2 border-t border-[rgba(239,231,218,0.1)]">
                BLC Kaunas • Connaught Place Delhi • Indiranagar Bengaluru • BKC Mumbai
              </p>
            </div>

            <a
              href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20discuss%20our%20brand%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:scale-105 transition-all text-xs font-semibold uppercase tracking-wider shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Buzz on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Grand Signature Wordmark (Unclipped & Fully Visible) */}
        <div className="py-12 sm:py-16 text-center select-none border-b border-[rgba(239,231,218,0.08)]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] font-display font-light tracking-[0.06em] uppercase leading-tight">
            <span className="text-[#F5EFEB]/30 hover:text-[#F5EFEB] transition-colors duration-300">
              DESI
            </span>
            <span className="text-[#E5A83B]/70 hover:text-[#E5A83B] transition-colors duration-300">
              MUCH
            </span>
            <span className="text-[#F5EFEB]/30 hover:text-[#F5EFEB] transition-colors duration-300">
              ADS
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm font-body tracking-[0.25em] text-[#D4AF37]/80 uppercase font-medium">
            HIGH-ROAS PERFORMANCE MARKETING • BOLD VERNACULAR ROOTS
          </p>
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
