"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, Download } from "lucide-react";
import { SocialRedirectionDeck } from "@/components/common/SocialRedirectionDeck";
import { BreydaqsButton } from "@/components/common/BreydaqsButton";
import { MoustacheClock } from "@/components/common/MoustacheClock";
import { MoustacheSlingshot } from "@/components/easteregg/MoustacheSlingshot";

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
    <footer id="footer" className="relative bg-transparent text-[#e8e8e3] pt-24 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] overflow-x-clip select-none font-display border-t border-[rgba(232,232,227,0.12)]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colossal Breydaqs Headline Callout */}
        <div className="mb-20 pb-16 border-b border-[rgba(232,232,227,0.12)] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.035em] text-white uppercase leading-[0.92]">
              LET&apos;S MAKE SOMETHING PEOPLE <span className="font-editorial text-[#e8e8e3] font-normal lowercase tracking-normal">→ remember.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal font-sans">
              An engineering-grade, results-driven performance marketing and digital creative studio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <BreydaqsButton
              href="tel:+919180252831"
              variant="white"
              className="py-4 px-8 text-xs sm:text-sm min-h-[48px]"
            >
              DIRECT STRATEGY CALL (+91 91802 52831)
            </BreydaqsButton>

            <BreydaqsButton
              href="https://wa.me/919180252831?text=Hello%20Desi%20Muchads!%20We%20would%20like%20to%20discuss%20our%20growth%20proposal."
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
              className="py-4 px-8 text-xs sm:text-sm min-h-[48px]"
            >
              WHATSAPP PROPOSAL
            </BreydaqsButton>
          </div>
        </div>

        {/* 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[rgba(232,232,227,0.12)] font-mono text-xs">
          {/* Brand Vision Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3.5">
              <div className="relative group shrink-0">
                <div className="relative w-11 h-7 flex items-center justify-center shrink-0">
                  <img
                    src="/desi-muchads-cropped-logo.png"
                    alt="Desi Muchads Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="font-display font-black text-xl tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                  <span>DESI</span>
                  <span>
                    <span className="text-zinc-400">MUCH</span>ADS
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase mt-1 font-bold">
                  PERFORMANCE MARKETING STUDIO
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-normal font-sans">
              An engineering-grade digital growth agency helping ambitious brands scale e-commerce revenues with verified contribution margins.
            </p>

            {/* Live IST Timekeeper */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-[0.2rem] border border-[rgba(232,232,227,0.18)] bg-[#121211] text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>LIVE IST // {currentTime || "06:05:00 PM"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Official Agency Socials */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/the_desi_muchads/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[0.2rem] bg-[#121211] hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-zinc-400 transition-all shadow-sm"
                title="Instagram (@the_desi_muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/desi-muchads"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[0.2rem] bg-[#121211] hover:bg-white hover:text-black border border-white/10 flex items-center justify-center text-zinc-400 transition-all shadow-sm"
                title="LinkedIn (Desi Muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              COMPANY [ 01 ]
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-400 hover:text-white transition-colors block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-zinc-400 hover:text-white transition-colors block">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors block">
                  Retainers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors block">
                  Strategy Session
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
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
                  title="Install Universal Mobile App for iOS & Android"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download App (iOS &amp; Android)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities Links */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              DISCIPLINES [ 02 ]
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/performance-marketing" className="text-zinc-400 hover:text-white transition-colors block">
                  Performance Marketing &amp; ROAS
                </Link>
              </li>
              <li>
                <Link href="/services/seo-sem" className="text-zinc-400 hover:text-white transition-colors block">
                  SEO &amp; High-Intent SEM
                </Link>
              </li>
              <li>
                <Link href="/services/quick-commerce" className="text-zinc-400 hover:text-white transition-colors block">
                  Quick Commerce Scaling
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-services" className="text-zinc-400 hover:text-white transition-colors block">
                  D2C E-Commerce &amp; Shopify CRO
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-zinc-400 hover:text-white transition-colors block">
                  Full-Stack Next.js 16 Web Apps
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="text-zinc-400 hover:text-white transition-colors block">
                  Viral Social Media &amp; Content
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-2 space-y-3 font-mono text-xs">
            <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              CONTACTS [ 03 ]
            </h4>
            <div className="space-y-2 text-zinc-400">
              <a href="mailto:thedesimuchads@gmail.com" className="text-white hover:underline block">
                thedesimuchads@gmail.com
              </a>
              <a href="tel:+919180252831" className="text-zinc-300 hover:text-white block">
                +91 9180252831
              </a>
              <div className="pt-2 border-t border-white/10 space-y-1">
                <p className="text-white font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HQ Coordinates</span>
                </p>
                <a
                  href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white underline block"
                >
                  Hosapalaya, Bengaluru 560068 ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Location & Map */}
        <div className="py-12 border-b border-[rgba(232,232,227,0.12)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase font-bold block">
                STUDIO PRESENCE
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Our Headquarters &amp; Studio Hub
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Visit our agency headquarters for executive strategy sessions, creative direction reviews, and growth workshops.
              </p>

              {/* Live Moustache Analog Clock Widget */}
              <div className="pt-2">
                <div className="flex items-center gap-4 p-3.5 rounded-[0.25rem] bg-white/[0.03] border border-white/10 max-w-sm">
                  <MoustacheClock size={68} showDigital={false} />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
                      BENGALURU HQ · LIVE IST
                    </span>
                    <span className="font-mono font-bold text-base text-white mt-0.5">
                      {currentTime || "06:30:00 PM"}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Executive Desk Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <BreydaqsButton
                  href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  className="py-3 px-6 text-xs"
                >
                  GET DIRECTIONS ON GOOGLE MAPS
                </BreydaqsButton>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full h-72 sm:h-80 rounded-[0.25rem] overflow-hidden border border-[rgba(232,232,227,0.18)] shadow-2xl bg-[#0c0c0b]">
                <iframe
                  title="Desi Muchads Business Location - Hosapalaya Bengaluru"
                  src="https://maps.google.com/maps?q=12.9002701%2C77.6454546&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", minHeight: "288px", display: "block" }}
                />
                <a
                  href="https://maps.app.goo.gl/qNmRs1e5AeqprpuL8?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-[0.2rem] bg-black/95 border border-white/20 text-white font-mono text-[11px] font-bold shadow-xl flex items-center gap-1.5 hover:bg-white hover:text-black transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hosapalaya, Bengaluru ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wordmark (DESI MUCHADS) & Interactive Slingshot + Social Redirection Coins */}
        <div className="pt-12 sm:pt-16 pb-2 text-center select-none border-b border-[rgba(232,232,227,0.12)] flex flex-col items-center">
          <SocialRedirectionDeck className="mb-10" showTitle={false} />
          <MoustacheSlingshot onOpenKundli={onOpenKundli} />
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 pt-8 gap-4">
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
