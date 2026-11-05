"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onOpenKundli: () => void;
}

export function Navbar({ onOpenKundli }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Capabilities", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Our Work", href: "#karname" },
    { label: "Clients", href: "#clients" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contacts", href: "#footer" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0e164c]/95 backdrop-blur-md shadow-lg py-3.5 border-b border-white/10"
          : "bg-[#0e164c] py-4 sm:py-5 border-b border-white/10"
      } pt-[calc(0.75rem+env(safe-area-inset-top,0px))]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Mark with Official Logo */}
        <a
          href="#"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-3 focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFC400] shadow-[0_0_15px_rgba(255,196,0,0.3)] group-hover:scale-105 transition-transform shrink-0 bg-[#0e164c]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand-logo.jpg"
              alt="Desi Muchads Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
              <span>DESI</span>
              <span>
                <span className="text-[#F36700]">MUCH</span>ADS
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-white/60 uppercase mt-0.5">
              PERFORMANCE MARKETING
            </span>
          </div>
        </a>

        {/* Desktop Nav Links (BeeMarketing exact style) */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9 font-display">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onMouseEnter={() => sound.playPluck(130)}
              className="text-xs font-bold tracking-widest uppercase text-white/80 hover:text-[#F36700] transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* BeeMarketing Signature Orange Button */}
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="px-5 py-2.5 rounded bg-[#F36700] hover:bg-[#e2560b] text-white font-display text-xs font-bold tracking-wider uppercase transition-all shadow hover:shadow-orange-500/20 active:scale-95 flex items-center gap-1.5"
          >
            <span>LET&apos;S TALK</span>
            <span className="text-sm font-bold">&gt;</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger (48px Touch Target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2.5 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg active:bg-white/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e164c] border-t border-white/10 px-4 py-6 space-y-2 font-display animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-2 rounded-lg text-sm font-bold uppercase tracking-wider text-white/90 hover:text-[#F36700] active:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenKundli();
            }}
            type="button"
            className="w-full mt-4 min-h-[48px] py-3.5 rounded bg-[#F36700] active:bg-[#e2560b] text-white font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            LET&apos;S TALK &gt;
          </button>
        </div>
      )}
    </header>
  );
}
