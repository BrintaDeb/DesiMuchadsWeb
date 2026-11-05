"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Clock, ArrowUpRight, MapPin, Navigation, ExternalLink } from "lucide-react";
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
    <footer id="footer" className="relative bg-[#0e164c] text-white pt-24 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] overflow-hidden select-none font-display border-t border-white/10">
      {/* Authentic Indian Cultural Artistry Background Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] mix-blend-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/indian-art-bg-royal.jpg"
          alt="Indian Cultural Heritage Artistry"
          className="w-full h-full object-cover object-bottom filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e164c] via-transparent to-[#0e164c]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Signature Pre-Footer Punchline */}
        <div className="mb-20 pb-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-[0.98]">
              You deserve more.<br />
              <span className="text-[#FFC400]">We’re proven to deliver.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 font-normal">
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
              className="px-9 py-4 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-orange-500/25 active:scale-95"
            >
              BUZZ US NOW &gt;
            </button>
            <a
              href="https://web.whatsapp.com/send?phone=919999999999&text=Pranam%20Desi%20Muchads!%20We%20would%20like%20to%20buzz%20you%20for%20our%20e-commerce%20growth."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded border border-white/20 hover:border-white/50 text-white font-display text-xs font-bold tracking-widest uppercase transition-all hover:bg-white/5"
            >
              WHATSAPP &gt;
            </a>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Vision Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3.5">
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFC400]/40 to-[#F36700]/30 rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFC400] shadow-md bg-[#0e164c] p-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <span className="text-[#F36700]">MUCH</span>ADS
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#FFC400] uppercase mt-1 font-bold">
                  PERFORMANCE MARKETING AGENCY
                </span>
              </div>
            </div>

            <p className="text-sm text-white/75 max-w-sm leading-relaxed font-normal">
              An honest &amp; results-driven digital marketing agency helping ambitious brands scale their e-commerce potential through the roof.
            </p>

            {/* Live IST Timekeeper */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded border border-white/10 bg-white/5 text-xs font-mono text-[#FFC400]">
              <Clock className="w-3.5 h-3.5 text-[#F36700]" />
              <span>LIVE IST // {currentTime || "06:05:00 PM"}</span>
              <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#FFC400] font-bold">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs font-normal">
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#clients" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Clients
                </a>
              </li>
              <li>
                <a href="#karname" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a href="#footer" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#FFC400] font-bold">
              CAPABILITIES
            </h4>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Social Media Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Performance Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Search Engine Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Web Design &amp; UX
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/75 hover:text-[#F36700] transition-colors">
                  E-Commerce Development
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#FFC400] font-bold">
              CONTACTS
            </h4>
            <div className="space-y-2 text-xs text-white/75 font-normal leading-relaxed">
              <a href="mailto:buzz@desimuchads.com" className="text-[#F36700] font-mono hover:underline block">
                buzz@desimuchads.com
              </a>
              <p>+91 (0) 9999 999 999</p>
              <div className="pt-2 border-t border-white/10 space-y-1">
                <p className="text-[#FFC400] font-bold text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F36700]" />
                  <span>Business Location</span>
                </p>
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/70 hover:text-[#F36700] underline block"
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F36700]/15 border border-[#F36700]/40 text-xs font-mono font-bold text-[#FFC400] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#F36700]" />
                <span>OFFICIAL BUSINESS LOCATION</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Our Headquarters &amp; Studio
              </h3>
              <p className="text-sm text-white/75 leading-relaxed font-normal">
                Visit our agency hub for in-person strategy Baithaks, creative direction reviews, and e-commerce growth war-rooms.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://maps.app.goo.gl/WyD9PkPPEeMx6gGp7?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded bg-[#F36700] hover:bg-[#e2560b] active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all min-h-[44px]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>GET DIRECTIONS ON GOOGLE MAPS &gt;</span>
                </a>
              </div>
            </div>

            {/* Right Client-View Map */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#090e33] group">
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
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-[#0e164c]/95 border border-[#F36700]/60 text-white font-mono text-[11px] font-bold shadow-lg flex items-center gap-1.5 hover:bg-[#F36700] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FFC400]" />
                  <span>Open in Google Maps ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Unclipped Signature Two-Tone Wordmark (MUCHADS Together) */}
        <div className="py-12 sm:py-16 text-center select-none border-b border-white/10 flex flex-col items-center">
          {/* Prominent Circular Brand Logo Crest */}
          <div className="mb-6 relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#FFC400]/40 via-[#F36700]/30 to-[#FFC400]/40 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3px] border-[#FFC400] shadow-[0_0_35px_rgba(255,196,0,0.4)] bg-[#0e164c] p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-logo.jpg"
                alt="Desi Muchads Royal Crest"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold tracking-widest text-[#FFC400] uppercase mb-6">
            <span>EST. 2026</span>
            <span className="text-white/40">•</span>
            <span>ROYAL PERFORMANCE MARKETING</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 text-3xl sm:text-5xl md:text-7xl lg:text-[8.5vw] font-display font-black tracking-tight uppercase leading-tight">
            <span className="text-white/20 hover:text-white transition-colors duration-300">
              DESI
            </span>
            <span className="inline-block transition-colors duration-300">
              <span className="text-[#F36700]/80 hover:text-[#F36700] transition-colors duration-300">
                MUCH
              </span>
              <span className="text-white/20 hover:text-white transition-colors duration-300">
                ADS
              </span>
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-white/60 uppercase font-medium">
            PERFORMANCE MARKETING AGENCY FOR E-COMMERCE GROWTH
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-white/50 pt-8 gap-4">
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
