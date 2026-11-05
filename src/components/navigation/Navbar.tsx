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
    { label: "Hum Kya Karte Hain", sub: "Services", href: "#services" },
    { label: "Baiscope", sub: "Showreel", href: "#baiscope" },
    { label: "Karname", sub: "Case Studies", href: "#karname" },
    { label: "Pricing & Thali", sub: "Packages", href: "#pricing" },
    { label: "Client Portal", sub: "Inside Darbar", href: "#portal" },
  ];

  return (
    <header
      className={`fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-3 sm:px-4 transition-all duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="relative w-full max-w-7xl rounded-full bg-[#0D0C12]/85 backdrop-blur-xl border border-[#D4AF37]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between"
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
            <span className="font-display font-extrabold text-xs sm:text-sm tracking-wider text-[#F7F1E5] group-hover:text-[#D4AF37] transition-colors leading-tight">
              DESI MUCHADS
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-[#D4AF37]/80 uppercase hidden xs:inline">
              Much Ads • Muchhad ROAS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => sound.playPluck(130)}
              className="group flex flex-col items-center text-xs transition-colors py-1"
            >
              <span className="font-medium text-[#F7F1E5]/80 group-hover:text-[#D4AF37] transition-colors">
                {link.label}
              </span>
              <span className="font-mono text-[8.5px] tracking-wider text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors uppercase">
                {link.sub}
              </span>
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
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-[#F7F1E5] font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.7)] transition-all duration-300 active:scale-95"
          >
            <span>Start a Project</span>
            <span className="text-xs font-mono text-[#F7F1E5]/90 group-hover:translate-x-0.5 transition-transform">
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
        <div className="lg:hidden fixed top-16 inset-x-4 bg-[#0D0C12]/95 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <div className="flex flex-col divide-y divide-[#D4AF37]/15">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 flex items-center justify-between text-sm font-medium text-[#F7F1E5] hover:text-[#D4AF37] transition-colors"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#D4AF37]/60 uppercase">
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
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-[#F7F1E5] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Get Your Free Brand Kundli</span>
            <span>〰️</span>
          </button>
        </div>
      )}
    </header>
  );
}

