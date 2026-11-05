"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Clock, ArrowUpRight } from "lucide-react";
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
    <footer id="footer" className="relative bg-[#0e164c] text-white pt-24 pb-28 sm:pb-36 overflow-hidden select-none font-display border-t border-white/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* BeeMarketing Signature Pre-Footer Punchline (Exact Typography & Layout) */}
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

        {/* 3-Column Footer Grid (BeeMarketing Exact) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Vision Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFC400] shadow shrink-0 bg-[#0e164c]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand-logo.jpg"
                  alt="Desi Muchads Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="font-display font-extrabold text-xl tracking-wider text-white uppercase flex items-center gap-1 leading-none">
                  <span>DESI</span>
                  <span className="text-[#F36700]">MUCH</span>
                  <span>ADS</span>
                </div>
                <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase mt-0.5">
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
              <p className="text-[11px] text-white/50 pt-2 border-t border-white/10">
                K. Donelaicio str. 60 (BLC), Kaunas • Connaught Place, New Delhi
              </p>
            </div>
          </div>
        </div>

        {/* Unclipped Signature Two-Tone Wordmark */}
        <div className="py-12 sm:py-16 text-center select-none border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 text-4xl sm:text-6xl md:text-8xl lg:text-[9vw] font-display font-black tracking-tight uppercase leading-tight">
            <span className="text-white/20 hover:text-white transition-colors duration-300">
              DESI
            </span>
            <span className="text-[#F36700]/70 hover:text-[#F36700] transition-colors duration-300">
              MUCH
            </span>
            <span className="text-white/20 hover:text-white transition-colors duration-300">
              ADS
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-white/60 uppercase font-medium">
            PERFORMANCE MARKETING AGENCY FOR E-COMMERCE GROWTH
          </p>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-normal text-white/50 pt-8 gap-4">
          <div>
            <span>© 2026 BeeMarketing / Desi Muchads. All rights reserved.</span>
          </div>
          <div>
            <span>An honest &amp; results-driven digital marketing agency.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
