"use client";

import React, { useState, useEffect } from "react";
import { MoustacheSVG, FiligreeCorner } from "../common/Icons";
import { AudioVisualizer } from "./AudioVisualizer";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
    { label: "Karname", sub: "Case Studies", href: "#karname" },
    { label: "Hisab-Kitab", sub: "ROAS Calculator", href: "#calculator" },
    { label: "Parampara", sub: "Methodology", href: "#methodology" },
  ];

  return (
    <header
      className={`fixed top-4 sm:top-6 inset-x-0 z-40 flex justify-center px-4 transition-all duration-300 ${
        isScrolled ? "translate-y-0" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="relative w-full max-w-6xl rounded-full bg-[#0D0C12]/85 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between"
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
          className="group flex items-center gap-2.5 sm:gap-3 py-1 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-all duration-300">
            <MoustacheSVG className="w-6 h-3 text-[#D4AF37] group-hover:-rotate-12 transition-transform duration-300 transform-gpu" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-[#F7F1E5] group-hover:text-[#D4AF37] transition-colors leading-tight">
              DESI MUCHADS
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#D4AF37]/80 uppercase">
              Much Ads • Muchhad ROAS
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex flex-col items-center text-xs transition-colors py-1"
            >
              <span className="font-medium text-[#F7F1E5]/80 group-hover:text-[#D4AF37] transition-colors">
                {link.label}
              </span>
              <span className="font-mono text-[9px] tracking-wider text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors uppercase">
                {link.sub}
              </span>
            </a>
          ))}
        </div>

        {/* Right Utilities: Ambient Desi Beats + CTA */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <AudioVisualizer />

          {/* Magnetic CTA Button */}
          <button
            onClick={onOpenKundli}
            type="button"
            className="group relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#E11D48] to-[#C84B31] text-[#F7F1E5] font-semibold text-xs tracking-wide shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.7)] transition-all duration-300 active:scale-95"
          >
            <span>Start a Project</span>
            <span className="text-sm font-mono text-[#F7F1E5]/90 group-hover:translate-x-0.5 transition-transform">
              〰️
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline text-white/80 group-hover:rotate-45 transition-transform" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#D4AF37] hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 inset-x-4 bg-[#0D0C12]/95 backdrop-blur-2xl border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
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
