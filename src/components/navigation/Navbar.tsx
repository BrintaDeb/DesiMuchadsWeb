"use client";

import React, { useState, useEffect } from "react";
import { MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { AudioVisualizer } from "./AudioVisualizer";
import { SonicToggle } from "./SonicToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onOpenKundli: () => void;
}

export function Navbar({ onOpenKundli }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "ABOUT US", sub: "Pehchan", href: "#services" },
    { label: "SERVICES", sub: "Weapons", href: "#services" },
    { label: "SHOWREEL", sub: "Baiscope", href: "#baiscope" },
    { label: "CASE STUDIES", sub: "Karname", href: "#karname" },
    { label: "RETAINERS", sub: "Pricing", href: "#pricing" },
    { label: "CLIENT DARBAR", sub: "Portal", href: "#portal" },
  ];

  return (
    <header
      className={`fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-4 transition-all duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="relative w-full max-w-7xl rounded-full bg-[#1C1815]/90 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between"
      >
        {/* Brass filigree corner accents on the edges */}
        <div className="absolute left-3 top-2 pointer-events-none opacity-40 hidden sm:block">
          <FiligreeCorner className="w-3.5 h-3.5 text-[#D4AF37]" position="top-left" />
        </div>
        <div className="absolute right-3 top-2 pointer-events-none opacity-40 hidden sm:block">
          <FiligreeCorner className="w-3.5 h-3.5 text-[#D4AF37]" position="top-right" />
        </div>

        {/* Brand Mark with Hover Twirling Moustache */}
        <a
          href="#"
          onMouseEnter={() => sound.playPluck(180)}
          className="group flex items-center gap-2 sm:gap-3 py-1 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all duration-300">
            <MoustacheSVG className="w-5 h-2.5 text-[#D4AF37] group-hover:-rotate-12 transition-transform duration-300 transform-gpu" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base sm:text-lg tracking-widest text-[#EFE7DA] group-hover:text-[#D4AF37] transition-colors leading-tight uppercase">
              DESI MUCHADS
            </span>
            <span className="font-body text-[8.5px] tracking-[0.25em] text-[#D4AF37]/80 uppercase hidden xs:inline font-medium">
              HIGH-ROAS PERFORMANCE • DESI STYLE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links - Desi Vibes Cormorant / Poppins Tracked Style */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 font-body">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => sound.playPluck(130)}
              className="group py-1 text-[11px] font-medium tracking-[0.16em] uppercase text-[#EFE7DA]/75 hover:text-[#D4AF37] transition-colors"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Right Utilities: Theme Toggle + Sonic Toggle + Ambient Beats + CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <ThemeToggle />
          <SonicToggle />
          <AudioVisualizer />

          {/* Magnetic CTA Button */}
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            onMouseEnter={() => sound.playPluck(160)}
            type="button"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-[#EFE7DA] font-body font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(200,75,49,0.4)] hover:shadow-[0_0_25px_rgba(200,75,49,0.7)] transition-all duration-300 active:scale-95"
          >
            <span>Book Baithak</span>
            <span className="text-xs font-mono text-[#EFE7DA]/90 group-hover:translate-x-0.5 transition-transform">
              〰️
            </span>
            <ArrowUpRight className="w-3 h-3 hidden sm:inline text-white/80 group-hover:rotate-45 transition-transform" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#D4AF37] hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 inset-x-4 bg-[#1C1815]/98 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col divide-y divide-[#D4AF37]/15 font-body">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 flex items-center justify-between text-xs tracking-[0.18em] uppercase font-medium text-[#EFE7DA] hover:text-[#D4AF37] transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-[#D4AF37]/60">
                  {link.sub}
                </span>
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenKundli();
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#C84B31] via-[#E11D48] to-[#C84B31] text-[#EFE7DA] font-body font-semibold text-xs tracking-wider uppercase shadow-lg"
          >
            <span>Reserve Strategy Baithak (Free)</span>
            <span>〰️</span>
          </button>
        </div>
      )}
    </header>
  );
}
