"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Rocket,
  Magnet,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  Calculator,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Globe,
  PhoneCall,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "../common/CommandMenu";

interface NavbarProps {
  onOpenKundli: () => void;
}

export function Navbar({ onOpenKundli }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(96);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (dropdownRef.current) {
        setHeaderHeight(dropdownRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global Shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sound.playPluck(160);
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    sound.playPluck(140);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const portfolioHighlights = [
    {
      name: "VedaRoots Ayurveda",
      tagline: "Classical Single-Estate Ayurveda",
      metric: "+420% Organic",
      href: "/demos/vedaroots-ayurveda",
    },
    {
      name: "Darbar Fine Watches",
      tagline: "Bespoke Royal Mechanical Horology",
      metric: "99 PageSpeed",
      href: "/demos/darbar-fine-watches",
    },
    {
      name: "SnackNation Makhanas",
      tagline: "D2C Clean-Label Superfoods",
      metric: "5.8x ROAS",
      href: "/demos/snacknation-makhanas",
    },
    {
      name: "Mithai Magic Sweets",
      tagline: "10-Minute Dark Store Ingestion",
      metric: "8.4x Flash",
      href: "/demos/mithaimagic-sweets",
    },
  ];

  const getServiceLucideIcon = (name: string) => {
    const iconStyle = "w-4 h-4 text-white";
    switch (name) {
      case "Search":
        return <Search className={iconStyle} />;
      case "Rocket":
        return <Rocket className={iconStyle} />;
      case "Magnet":
        return <Magnet className={iconStyle} />;
      case "Share2":
        return <Share2 className={iconStyle} />;
      case "ShoppingBag":
        return <ShoppingBag className={iconStyle} />;
      case "Zap":
        return <Zap className={iconStyle} />;
      case "Code2":
        return <Code2 className={iconStyle} />;
      case "Package":
        return <Package className={iconStyle} />;
      case "TrendingUp":
        return <TrendingUp className={iconStyle} />;
      default:
        return <Sparkles className={iconStyle} />;
    }
  };

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#09090b]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] border-b border-white/10"
        : "bg-[#09090b] border-b border-white/10"
        }`}
    >
      {/* 1. Top Regulatory & Trust Announcement Bar */}
      <div className="bg-[#050507] text-zinc-300 py-1.5 px-3 sm:px-6 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase border-b border-white/10 flex items-center justify-between select-none whitespace-nowrap overflow-hidden">
        <div className="flex items-center gap-2 truncate shrink-0">
          <span className="font-extrabold text-white">UNIT OF DESI MUCHADS DIGITAL LLP</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-zinc-400">CIN: U74999DL2024PTC412891</span>
          <span className="hidden lg:inline text-white/20">|</span>
          <span className="hidden lg:inline text-emerald-400 font-bold">100% VERIFIED AGENCY</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>5.8X BLENDED ROAS GUARANTEED</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <a
            href="https://wa.me/919180252831"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 text-zinc-300"
          >
            <PhoneCall className="w-3.5 h-3.5 text-white" />
            <span>TALK TO FOUNDER (+91 9180252831)</span>
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand Mark with Official Logo and Tagline */}
        <Link
          href="/"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-3 sm:gap-3.5 focus:outline-none group shrink-0"
        >
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 xl:w-14 xl:h-14 rounded-full overflow-hidden border-2 border-white/40 shadow-[0_0_22px_rgba(255,255,255,0.18)] group-hover:scale-105 group-hover:border-white transition-all shrink-0 bg-black p-0.5">
            <img
              src="/brand-logo.jpg"
              alt="Desi Muchads Official Brand Logo"
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />
          </div>
          <div className="flex flex-col text-left justify-center shrink-0">
            <div className="font-display font-black text-lg sm:text-xl xl:text-2xl tracking-wider text-white uppercase flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
              <span>DESI</span>
              <span className="text-zinc-400">MUCH</span>
              <span>ADS</span>
            </div>
            <span className="text-[9px] sm:text-[10px] xl:text-[11px] font-sans font-medium tracking-wide text-zinc-300 italic leading-tight mt-1 whitespace-nowrap hidden 2xl:block">
              We Scale Your Business Personally and Seriously!
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items (No Word Breaking, Perfectly Aligned) */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-4 font-display shrink-0 whitespace-nowrap flex-nowrap"
          style={{ whiteSpace: "nowrap" }}
        >
          {/* About Us */}
          <Link
            href="/about"
            onMouseEnter={() => sound.playPluck(130)}
            className="whitespace-nowrap shrink-0 px-2 xl:px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
            style={{ whiteSpace: "nowrap" }}
          >
            About Us
          </Link>

          {/* Services Dropdown Trigger */}
          <div
            className="relative shrink-0 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className={`whitespace-nowrap shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors ${activeDropdown === "services"
                ? "text-white"
                : "text-zinc-300 hover:text-white"
                }`}
              style={{ whiteSpace: "nowrap" }}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${activeDropdown === "services" ? "rotate-180 text-white" : ""
                  }`}
              />
            </Link>

            {/* Services Mega Menu Dropdown */}
            {activeDropdown === "services" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] ios-glass-panel text-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.98)] p-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200"
              >
                {/* Mega Menu Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold font-royal tracking-widest uppercase text-white">
                      Full-Suite Performance &amp; Growth Services
                    </span>
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-xs font-bold text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-sans"
                  >
                    <span>View All 8 Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 2-Column Grid of 8 Services */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3.5">
                  {AGENCY_SERVICES.map((srv) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-white/30 group-hover/item:bg-white/10 transition-all">
                        {getServiceLucideIcon(srv.iconName)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-display font-extrabold text-xs sm:text-sm text-white group-hover/item:text-white transition-colors leading-tight">
                          {srv.title}
                        </span>
                        <span className="font-sans text-[11px] text-zinc-400 leading-snug mt-0.5 line-clamp-2">
                          {srv.shortDesc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom Highlight Banner */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between bg-white/[0.03] -mx-6 -mb-6 p-4 rounded-b-2xl border-x-0 border-b-0">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                    <span className="font-bold text-white">Want Custom Retainer Architecture?</span>
                    <span>Explore our 8 engineering disciplines.</span>
                  </div>
                  <Link
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="px-4 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                  >
                    Explore Services &gt;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Work / Portfolio Dropdown Trigger */}
          <div
            className="relative shrink-0 whitespace-nowrap"
            onMouseEnter={() => handleMouseEnter("work")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/work"
              className={`whitespace-nowrap shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors ${activeDropdown === "work"
                ? "text-white"
                : "text-zinc-300 hover:text-white"
                }`}
              style={{ whiteSpace: "nowrap" }}
            >
              <span>Work</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${activeDropdown === "work" ? "rotate-180 text-white" : ""
                  }`}
              />
            </Link>

            {/* Work Projects Dropdown */}
            {activeDropdown === "work" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 ios-glass-panel text-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.98)] p-4 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200"
              >
                <div className="pb-2.5 mb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-royal">
                    50 Verified Case Studies &amp; Artworks
                  </span>
                  <Link
                    href="/work"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-bold text-white hover:underline"
                  >
                    View All 50 &gt;
                  </Link>
                </div>
                <div className="space-y-1.5">
                  {portfolioHighlights.map((proj) => (
                    <Link
                      key={proj.name}
                      href={proj.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group/port flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all"
                    >
                      <div className="flex flex-col text-left">
                        <span className="font-display font-extrabold text-xs text-white uppercase">
                          {proj.name}
                        </span>
                        <span className="font-sans text-[11px] text-zinc-400">
                          {proj.tagline}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-metric text-[10px] font-bold">
                        {proj.metric}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Success Stories */}
          <Link
            href="/success-stories"
            onMouseEnter={() => sound.playPluck(130)}
            className="whitespace-nowrap shrink-0 px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
            style={{ whiteSpace: "nowrap" }}
          >
            Success Stories
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            onMouseEnter={() => sound.playPluck(130)}
            className="whitespace-nowrap shrink-0 px-2 xl:px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
            style={{ whiteSpace: "nowrap" }}
          >
            Pricing
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onMouseEnter={() => sound.playPluck(130)}
            className="whitespace-nowrap shrink-0 px-2 xl:px-2.5 py-1.5 text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
            style={{ whiteSpace: "nowrap" }}
          >
            Contact
          </Link>

          {/* Quick Search & Command Palette (⌘K) */}
          <button
            onClick={() => {
              setIsCommandOpen(true);
            }}
            type="button"
            className="whitespace-nowrap shrink-0 flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 min-h-[36px] rounded-full border border-white/20 bg-[#121215]/80 hover:border-white/50 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            title="Open Quick Search & Command Palette (⌘K)"
            aria-label="Search and quick actions"
            style={{ whiteSpace: "nowrap" }}
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="hidden 2xl:inline text-[11px] whitespace-nowrap">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 border border-white/20 text-zinc-300 font-mono shrink-0 whitespace-nowrap">
              ⌘K
            </kbd>
          </button>

          {/* Luxury Visual Density Switcher */}
          <ThemeToggle />

          {/* Signature Stark White CTA Button */}
          <Link
            href="/contact"
            onMouseEnter={() => sound.playPluck(160)}
            className="btn-luxury-shine px-3.5 xl:px-5 py-2 min-h-[36px] rounded-full bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_22px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-1.5 shrink-0 whitespace-nowrap"
            style={{ whiteSpace: "nowrap" }}
          >
            <span className="whitespace-nowrap">LET&apos;S TALK</span>
            <span className="text-sm font-bold">&gt;</span>
          </Link>
        </nav>

        {/* Mobile Controls: Search Shortcut + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              setIsCommandOpen(true);
            }}
            type="button"
            className="p-2.5 min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.18] border border-white/15 text-white transition-all shadow-[0_2px_10px_rgba(0,0,0,0.5)] flex items-center justify-center touch-hit-expand"
            aria-label="Open Command Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="relative p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.18] border border-white/15 text-white transition-all shadow-[0_2px_10px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-1 focus:ring-white/40 touch-hit-expand"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => {
            setMobileMenuOpen(false);
          }}
          style={{ top: `${headerHeight}px` }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* 4. Structured Glassmorphic Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            top: `${headerHeight}px`,
            maxHeight: `calc(100dvh - ${headerHeight}px)`,
          }}
          className="fixed inset-x-0 bottom-0 z-50 lg:hidden drawer-glass flex flex-col overflow-y-auto overscroll-contain font-display animate-in slide-in-from-top-2 duration-200"
        >
          <div className="p-4 sm:p-6 space-y-4 max-w-xl mx-auto w-full flex-1 flex flex-col justify-between">
            {/* Top Interactive Tool Rows & Navigations */}
            <div className="space-y-3.5">
              {/* Tool Row 1: Quick Search Bar Pill */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCommandOpen(true);
                }}
                type="button"
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] active:bg-white/[0.12] border border-white/15 text-zinc-300 text-xs font-mono transition-all shadow-[0_2px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Search className="w-4 h-4 text-white group-hover:scale-110 transition-transform shrink-0" />
                  <span className="text-zinc-200 font-medium truncate">Search services, case studies, formulas...</span>
                </div>
                <kbd className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-bold text-white border border-white/20 shrink-0">
                  ⌘K
                </kbd>
              </button>

              {/* Tool Row 2: High-Utility Tactical Deck */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                {/* Tile 1: Hisab-Kitab Calculator */}
                <Link
                  href="/pricing#simulator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="touch-tool-card p-2.5 sm:p-3 flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-[11px] font-display font-bold text-white group-hover:text-zinc-200 truncate w-full">
                    Hisab-Kitab
                  </span>
                </Link>

                {/* Tile 2: AI Brand Kundli Audit */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenKundli();
                  }}
                  className="touch-tool-card p-2.5 sm:p-3 flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-[11px] font-display font-bold text-white group-hover:text-zinc-200 truncate w-full">
                    Brand Kundli
                  </span>
                </button>

                {/* Tile 3: Team Roster Quick Link */}
                <Link
                  href="/about#team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="touch-tool-card p-2.5 sm:p-3 flex flex-col items-center justify-center text-center gap-1.5 group cursor-pointer"
                >
                  <Users className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  <span className="text-[11px] font-display font-bold text-white group-hover:text-zinc-200 truncate w-full">
                    Our Team
                  </span>
                </Link>
              </div>

              {/* Subtle Hairline Divider 1 */}
              <div className="drawer-divider my-1" />

              {/* Core Dedicated Page Links */}
              <div className="space-y-2">
                {/* Home */}
                <Link
                  href="/"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                >
                  <span>Home</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </Link>

                {/* About Desi Muchads */}
                <Link
                  href="/about"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" />
                    <span>About Us &amp; Team</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Leadership</span>
                </Link>

                {/* All Services */}
                <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.03] transition-all">
                  <div className="flex items-center justify-between p-3">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Services ({AGENCY_SERVICES.length})</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPluck(160);
                        setMobileAccordion(mobileAccordion === "services" ? null : "services");
                      }}
                      className="p-1 text-zinc-400 hover:text-white"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === "services" ? "rotate-180 text-white" : ""
                          }`}
                      />
                    </button>
                  </div>

                  {mobileAccordion === "services" && (
                    <div className="p-2.5 bg-black/60 border-t border-white/10 grid grid-cols-1 gap-1.5 animate-in fade-in duration-150">
                      {AGENCY_SERVICES.map((s) => (
                        <Link
                          key={s.id}
                          href={`/services/${s.slug}`}
                          onClick={() => {
                            sound.playPluck(180);
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            <span className="p-1 rounded bg-white/10 shrink-0">
                              {getServiceLucideIcon(s.iconName)}
                            </span>
                            <span className="text-xs font-semibold text-zinc-200 truncate">{s.title}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                            {s.metric}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Work */}
                <Link
                  href="/work"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-zinc-400" />
                    <span>Work &amp; Case Studies</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">50 Projects</span>
                </Link>

                {/* Success Stories */}
                <Link
                  href="/success-stories"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-4 h-4 text-zinc-400" />
                    <span>Success Stories</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">5.8x ROAS</span>
                </Link>

                {/* Pricing & Retainers */}
                <Link
                  href="/pricing"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-zinc-400" />
                    <span>Transparent Pricing</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">0% Markups</span>
                </Link>

                {/* Contact Us & Live Baithak */}
                <Link
                  href="/contact"
                  onClick={() => {
                    sound.playPluck(140);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>Contact Us &amp; Live Baithak</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Live Slots</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKundli();
                }}
                className="w-full py-3.5 rounded-full bg-white text-black font-display font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-transform"
              >
                <span>REQUEST FREE BRAND KUNDLI AUDIT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between px-2 text-[10px] font-mono text-zinc-500">
                <span>© {new Date().getFullYear()} DESI MUCHADS DIGITAL LLP</span>
                <span>NEW DELHI, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Command Search (⌘K) Modal */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenKundli={() => {
          setIsCommandOpen(false);
          onOpenKundli();
        }}
      />
    </header>
  );
}
