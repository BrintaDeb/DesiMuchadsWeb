"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, Navigation, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";
import { SocialRedirectionDeck } from "@/components/common/SocialRedirectionDeck";

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
    <footer id="footer" className="relative bg-[#050507] text-white pt-24 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] overflow-hidden select-none font-display border-t border-white/10">
      {/* Subtle Monochrome Artistry Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] mix-blend-screen grayscale">
        { }
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Artistry Background Watermark"
          className="w-full h-full object-cover object-bottom filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Signature Pre-Footer Punchline */}
        <div className="mb-20 pb-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[0.98]">
              You deserve more.<br />
              <span className="text-zinc-400">We’re proven to deliver.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-300 font-normal font-sans">
              An honest &amp; results-driven performance marketing agency.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={() => {
                sound.playChime();
                onOpenKundli?.();
              }}
              type="button"
              className="px-9 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2"
            >
              <span>BUZZ US NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919180252831?text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20buzz%20you%20for%20our%20e-commerce%20growth."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-white/20 hover:border-white text-white font-display text-xs font-bold tracking-widest uppercase transition-all hover:bg-white/5"
            >
              WHATSAPP (+91 9180252831) &gt;
            </a>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Vision Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3.5">
              <div className="relative group shrink-0">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/40 shadow-xl bg-black p-0.5">
                  { }
                  <img
                    src="/brand-logo.jpg"
                    alt="Desi Muchads Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="font-display font-black text-2xl tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                  <span>DESI</span>
                  <span>
                    <span className="text-zinc-400">MUCH</span>ADS
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase mt-1 font-bold">
                  PERFORMANCE MARKETING AGENCY
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-normal font-sans">
              An honest &amp; results-driven digital marketing agency helping ambitious brands scale their e-commerce potential through the roof.
            </p>

            {/* Live IST Timekeeper */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span>LIVE IST // {currentTime || "06:05:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>

            {/* Official Agency Socials */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/the_desi_muchads/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-pink-500/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-sm"
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
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-500/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-sm"
                title="LinkedIn (Desi Muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61596454145422"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 hover:border-indigo-500/50 flex items-center justify-center text-zinc-400 hover:text-white transition-all shadow-sm"
                title="Facebook (Desi Muchads)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-white font-bold">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-normal font-sans">
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">
                  About Us &amp; Team
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">
                  Services (9 Disciplines)
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">
                  Work (50 Projects)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing &amp; Retainers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors font-medium">
                  Contact &amp; Book Baithak
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities Links (Deep Indexable SEO Routes) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-white font-bold">
              CAPABILITIES
            </h4>
            <ul className="space-y-2 text-xs font-normal font-sans">
              <li>
                <Link href="/services/performance-marketing" className="text-zinc-400 hover:text-white transition-colors">
                  Performance Marketing &amp; ROAS
                </Link>
              </li>
              <li>
                <Link href="/services/seo-sem" className="text-zinc-400 hover:text-white transition-colors">
                  SEO &amp; High-Intent SEM
                </Link>
              </li>
              <li>
                <Link href="/services/quick-commerce" className="text-zinc-400 hover:text-white transition-colors">
                  Quick Commerce (Zepto &amp; Blinkit)
                </Link>
              </li>
              <li>
                <Link href="/services/ecommerce-services" className="text-zinc-400 hover:text-white transition-colors">
                  D2C E-Commerce &amp; Shopify Plus
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="text-zinc-400 hover:text-white transition-colors">
                  Full-Stack Next.js 16 Web Apps
                </Link>
              </li>
              <li>
                <Link href="/services/social-media" className="text-zinc-400 hover:text-white transition-colors">
                  Viral Social Media &amp; Reels
                </Link>
              </li>
              <li>
                <Link href="/services/lead-generation" className="text-zinc-400 hover:text-white transition-colors">
                  High-Ticket B2B Lead Gen
                </Link>
              </li>
              <li>
                <Link href="/services/packaging-label" className="text-zinc-400 hover:text-white transition-colors">
                  Luxury Packaging &amp; Identity
                </Link>
              </li>
              <li>
                <Link href="/services/unit-economics" className="text-zinc-400 hover:text-white transition-colors">
                  Unit Economics &amp; Margin Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-white font-bold">
              CONTACTS
            </h4>
            <div className="space-y-2 text-xs text-zinc-400 font-normal leading-relaxed font-sans">
              <a href="mailto:thedesimuchads@gmail.com" className="text-white font-mono hover:underline block font-semibold">
                thedesimuchads@gmail.com
              </a>
              <a href="tel:+919180252831" className="text-zinc-300 font-mono hover:text-white block font-medium">
                +91 9180252831
              </a>
              <div className="pt-2 border-t border-white/10 space-y-1">
                <p className="text-white font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Business Location</span>
                </p>
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-400 hover:text-white underline block"
                >
                  View on Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Location & Client-View Interactive Map */}
        <div className="py-12 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Location Details */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Our Headquarters &amp; Studio
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal font-sans">
                Visit our agency hub for in-person strategy Baithaks, creative direction reviews, and e-commerce growth war-rooms.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-wider shadow-lg transition-all min-h-[44px]"
                >
                  <Navigation className="w-4 h-4 text-black" />
                  <span>GET DIRECTIONS ON GOOGLE MAPS &gt;</span>
                </a>
              </div>
            </div>

            {/* Right Client-View Map */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0c0c0e] group">
                <iframe
                  title="Desi Muchads Business Location - Connaught Place New Delhi"
                  src="https://maps.google.com/maps?q=Connaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] opacity-90 group-hover:opacity-100 transition-opacity map-embed-frame"
                  loading="lazy"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", minHeight: "288px", display: "block" }}
                />
                {/* Floating Map Pin Badge */}
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/95 border border-white/30 text-white font-mono text-[11px] font-bold shadow-xl flex items-center gap-1.5 hover:bg-white hover:text-black transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Connaught Place, New Delhi ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wordmark (MUCHADS Together) & Interactive Social Redirection Coins */}
        <div className="py-12 sm:py-16 text-center select-none border-b border-white/10 flex flex-col items-center">
          {/* Particular Interactive Social Media Redirection Coins (Matching Reference) */}
          <SocialRedirectionDeck className="mb-10" showTitle={false} />

          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 text-3xl sm:text-5xl md:text-7xl lg:text-[8.5vw] font-display font-black tracking-tight uppercase leading-tight">
            <span className="text-white/30 hover:text-white transition-colors duration-300">
              DESI
            </span>
            <span className="inline-block transition-colors duration-300">
              <span className="text-white hover:text-white transition-colors duration-300">
                MUCH
              </span>
              <span className="text-white/30 hover:text-white transition-colors duration-300">
                ADS
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-zinc-400 uppercase font-medium">
            PERFORMANCE MARKETING AGENCY FOR E-COMMERCE GROWTH
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-zinc-400 pt-8 gap-4 font-sans">
          <div>
            <span>© 2026 Desi Muchads. All rights reserved.</span>
          </div>
          <div>
            <span>An honest &amp; results-driven digital marketing agency.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
