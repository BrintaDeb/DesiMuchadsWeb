"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, MapPin, Navigation, ArrowRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface FooterProps {
  onOpenKundli: () => void;
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
                onOpenKundli();
              }}
              type="button"
              className="px-9 py-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2"
            >
              <span>BUZZ US NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/919999999999?text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20buzz%20you%20for%20our%20e-commerce%20growth."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl border border-white/20 hover:border-white text-white font-display text-xs font-bold tracking-widest uppercase transition-all hover:bg-white/5"
            >
              WHATSAPP &gt;
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
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-white font-bold">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-normal font-sans">
              <li>
                <a href="#services" className="text-zinc-400 hover:text-white transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#clients" className="text-zinc-400 hover:text-white transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="#karname" className="text-zinc-400 hover:text-white transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#footer" className="text-zinc-400 hover:text-white transition-colors">
                  Contact us
                </a>
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
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-white font-bold">
              CONTACTS
            </h4>
            <div className="space-y-2 text-xs text-zinc-400 font-normal leading-relaxed font-sans">
              <a href="mailto:buzz@desimuchads.agency" className="text-white font-mono hover:underline block font-semibold">
                buzz@desimuchads.agency
              </a>
              <p>+91 (0) 9999 999 999</p>
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/20 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>OFFICIAL BUSINESS LOCATION</span>
              </div>
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
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#121215] group">
                <iframe
                  title="Desi Muchads Business Location"
                  src="https://maps.google.com/maps?q=Kolkata%20West%20Bengal&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05] opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                />
                {/* Floating Map Pin Badge */}
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/90 border border-white/20 text-white font-mono text-[11px] font-bold shadow-lg flex items-center gap-1.5 hover:bg-white hover:text-black transition-all"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wordmark (MUCHADS Together) */}
        <div className="py-12 sm:py-16 text-center select-none border-b border-white/10 flex flex-col items-center">
          {/* Prominent Circular Brand Logo Crest */}
          <div className="mb-6 relative group">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[2px] border-white/40 shadow-[0_0_35px_rgba(255,255,255,0.15)] bg-black p-1">
              { }
              <img
                src="/brand-logo.jpg"
                alt="Desi Muchads Crest"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase mb-6">
            <span>EST. 2026</span>
            <span className="text-white/40">•</span>
            <span>HIGH-ROAS PERFORMANCE ARCHITECTURE</span>
          </div>

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
