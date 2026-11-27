"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, Download } from "lucide-react";
import { SocialRedirectionDeck } from "@/components/common/SocialRedirectionDeck";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";
import { MoustacheClock } from "@/components/common/MoustacheClock";
import { MoustacheSlingshot } from "@/components/easteregg/MoustacheSlingshot";
import { BengaluruStudioMap } from "@/components/footer/BengaluruStudioMap";

interface FooterProps {
  onOpenKundli?: () => void;
}

export function Footer({ onOpenKundli }: FooterProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
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

  return (
    <footer id="footer" className="relative bg-transparent text-[#e8e8e3] pt-14 sm:pt-20 lg:pt-24 pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] overflow-x-clip select-none font-display border-t border-[rgba(232,232,227,0.12)]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colossal Minimal Footer Callout */}
        <div className="mb-12 sm:mb-16 pb-10 sm:pb-14 border-b border-[rgba(232,232,227,0.09)] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] text-white uppercase leading-[0.94]">
              LET&apos;S BUILD SOMETHING PEOPLE <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ remember.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <BreydaqsButton
              href="tel:+919180252831"
              variant="white"
              className="py-3.5 px-7 text-xs sm:text-sm min-h-[46px]"
            >
              +91 91802 52831
            </BreydaqsButton>

            <BreydaqsButton
              href="https://wa.me/919180252831?text=Hello%20Desi%20Muchads!%20We%20would%20like%20to%20discuss%20our%20growth%20proposal."
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              className="py-3.5 px-7 text-xs sm:text-sm min-h-[46px]"
            >
              WHATSAPP
            </BreydaqsButton>
          </div>
        </div>

        {/* Minimal 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[rgba(232,232,227,0.09)] font-mono text-xs">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-6 flex items-center justify-center shrink-0">
                <img
                  src="/desi-muchads-cropped-logo.png"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-contain opacity-90"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="font-display font-bold text-lg tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                  <span>DESI</span>
                  <span className="text-zinc-400">MUCHADS</span>
                </div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase mt-1">
                  DIGITAL STUDIO
                </span>
              </div>
            </div>

            {/* Live IST Timekeeper */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[11px] font-mono text-zinc-400 tabular-nums">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span>IST // {currentTime || "06:05:00 PM"}</span>
            </div>

            {/* Official Agency Socials */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/the_desi_muchads/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-[0.2rem] bg-[#121211] hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-zinc-400 transition-all shadow-sm touch-manipulation"
                title="Instagram (@the_desi_muchads)"
                aria-label="Instagram (@the_desi_muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/desi-muchads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-[0.2rem] bg-[#121211] hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-zinc-400 transition-all shadow-sm touch-manipulation"
                title="LinkedIn (Desi Muchads)"
                aria-label="LinkedIn (Desi Muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Company
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-400 hover:text-white transition-colors block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-zinc-400 hover:text-white transition-colors block">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/#request-quote" className="text-zinc-400 hover:text-white transition-colors block">
                  Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors block">
                  Contact
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
                    }
                  }}
                  className="text-[#F3E5AB]/90 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px] touch-manipulation"
                  title="Install Web App"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Install App</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Services
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/services/meta-google-ads" className="text-zinc-400 hover:text-white transition-colors block">
                  Meta &amp; Google Ads
                </Link>
              </li>
              <li>
                <Link href="/services/branding" className="text-zinc-400 hover:text-white transition-colors block">
                  Branding &amp; Identity
                </Link>
              </li>
              <li>
                <Link href="/services/quick-commerce" className="text-zinc-400 hover:text-white transition-colors block">
                  Quick Commerce
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-services" className="text-zinc-400 hover:text-white transition-colors block">
                  E-Commerce CRO
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-zinc-400 hover:text-white transition-colors block">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="text-zinc-400 hover:text-white transition-colors block">
                  Social Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Contact
            </p>
            <div className="space-y-2 text-zinc-400">
              <a href="mailto:thedesimuchads@gmail.com" className="text-zinc-200 hover:text-white transition-colors block">
                thedesimuchads@gmail.com
              </a>
              <a href="tel:+919180252831" className="text-zinc-400 hover:text-white transition-colors block">
                +91 9180252831
              </a>
              <div className="pt-2 border-t border-white/[0.08] space-y-1">
                <a
                  href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>Bengaluru 560068 ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Location & Clock */}
        <div className="py-10 border-b border-[rgba(232,232,227,0.09)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[10.5px] font-mono tracking-widest text-zinc-500 uppercase block">
                STUDIO
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Bengaluru HQ
              </h3>
              <p className="text-sm text-zinc-400 font-light font-sans">
                Hosapalaya, Bengaluru 560068
              </p>

              <div className="pt-1">
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/10 max-w-xs">
                  <MoustacheClock size={60} showDigital={false} />
                  <div className="flex flex-col text-left">
                    <span className="font-mono font-semibold text-sm text-white tabular-nums">
                      {currentTime || "06:30:00 PM"}
                    </span>
                    <span className="text-[10.5px] font-mono text-zinc-400 mt-0.5">
                      Asia/Kolkata IST
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <BreydaqsButton
                  href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  className="py-2.5 px-5 text-xs"
                >
                  DIRECTIONS ↗
                </BreydaqsButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <BengaluruStudioMap heightClass="h-64 sm:h-72" />
              </div>
            </div>
          </div>
        </div>

        {/* Open Interactive Slingshot & Coins Stage */}
        <div className="relative py-8 text-center select-none flex flex-col items-center border-b border-[rgba(232,232,227,0.09)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-zinc-500 mb-5">
            PULL SLINGSHOT
          </span>
          <SocialRedirectionDeck className="mb-8" showTitle={false} />
          <MoustacheSlingshot onOpenKundli={onOpenKundli} />
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400 pt-8 gap-4">
          <div>
            <span>© 2026 DESI MUCHADS DIGITAL LLP. ALL RIGHTS RESERVED.</span>
          </div>
          <div>
            <span>BENGALURU (HQ) · NEW DELHI · MUMBAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
