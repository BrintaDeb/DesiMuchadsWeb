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
  Layers,
  PhoneCall,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AudioVisualizer } from "./AudioVisualizer";
import { SonicToggle } from "./SonicToggle";
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const toggleDropdown = (menuName: string) => {
    sound.playPluck(160);
    setActiveDropdown((prev) => (prev === menuName ? null : menuName));
  };

  const quickLinks = [
    {
      title: "Hisab-Kitab Simulator",
      desc: "Simulate monthly ad spend, projected ROAS & profit",
      href: "#calculator",
      icon: Calculator,
    },
    {
      title: "Why Desi Muchads",
      desc: "Our battle-tested performance growth architecture",
      href: "#why-us",
      icon: ShieldCheck,
    },
    {
      title: "Verified Client Work",
      desc: "5 live production platforms & verified growth results",
      href: "#karname",
      icon: Globe,
    },
    {
      title: "Friends & Client Trust",
      desc: "Multinational household names & high-growth brands",
      href: "#clients",
      icon: Layers,
    },
    {
      title: "Transparent Retainers",
      desc: "Zero-ghosting fixed fee & revenue share models",
      href: "#pricing",
      icon: Sparkles,
    },
  ];

  const portfolioProjects = [
    {
      name: "VedaRoots Ayurveda",
      tagline: "Classical Single-Estate Ayurveda",
      metric: "+420% Organic",
      href: "/demos/vedaroots-ayurveda",
      liveUrl: "/demos/vedaroots-ayurveda",
    },
    {
      name: "Darbar Fine Watches",
      tagline: "Bespoke Royal Mechanical Horology",
      metric: "99 PageSpeed",
      href: "/demos/darbar-fine-watches",
      liveUrl: "/demos/darbar-fine-watches",
    },
    {
      name: "SnackNation Makhanas",
      tagline: "D2C Clean-Label Superfoods",
      metric: "5.8x ROAS",
      href: "/demos/snacknation-makhanas",
      liveUrl: "/demos/snacknation-makhanas",
    },
    {
      name: "Mithai Magic Sweets",
      tagline: "10-Minute Dark Store Ingestion",
      metric: "8.4x Flash",
      href: "/demos/mithaimagic-sweets",
      liveUrl: "/demos/mithaimagic-sweets",
    },
    {
      name: "Lionel P Boulangerie",
      tagline: "French Patisserie & Dining",
      metric: "+340% Lift",
      href: "/demos/lionelp-restaurant",
      liveUrl: "/demos/lionelp-restaurant",
    },
  ];

  const getServiceLucideIcon = (name: string) => {
    const iconStyle = "w-5 h-5 text-white";
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
      default:
        return <Sparkles className={iconStyle} />;
    }
  };

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09090b]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-white/10"
          : "bg-[#09090b] border-b border-white/10"
      }`}
    >
      {/* 1. Top Regulatory & Trust Announcement Bar (Classic Professional Matte Black) */}
      <div className="bg-[#050507] text-zinc-300 py-1.5 px-4 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center gap-2 truncate">
          <span className="font-extrabold text-white">UNIT OF DESI MUCHADS DIGITAL LLP</span>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-zinc-400">GSTIN: 07AAECD5582M1ZX</span>
          <span className="hidden lg:inline text-white/20">|</span>
          <span className="hidden lg:inline text-zinc-400">CIN: U74999DL2024PTC412891</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>5.8X BLENDED ROAS GUARANTEED</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1 text-zinc-300"
          >
            <PhoneCall className="w-3 h-3 text-white" />
            <span>TALK TO GROWTH ARCHITECT</span>
          </a>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Mark with Official Logo and Tagline */}
        <a
          href="#"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-3.5 focus:outline-none group shrink-0"
        >
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-105 group-hover:border-white transition-all shrink-0 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand-logo.jpg"
              alt="Desi Muchads Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <div className="font-display font-black text-xl tracking-wider text-white uppercase flex items-center gap-1 leading-tight">
              <span>DESI</span>
              <span className="text-zinc-400">MUCH</span>ADS
            </div>
            <span className="text-[10px] font-sans font-medium tracking-wide text-zinc-400 italic leading-none mt-0.5">
              We Scale Your Business Personally and Seriously!
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-display">
          {/* About Us */}
          <a
            href="#why-us"
            onMouseEnter={() => sound.playPluck(130)}
            className="text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
          >
            About Us
          </a>

          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("services")}
              className={`flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-colors py-2 ${
                activeDropdown === "services"
                  ? "text-white"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "services" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Services Mega Menu Dropdown (Matte Black Highlighted Panel) */}
            {activeDropdown === "services" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[820px] bg-[#0c0c0e] text-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-white/15 p-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200"
              >
                {/* Mega Menu Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold font-royal tracking-widest uppercase text-white">
                      Full-Suite Performance &amp; Growth Services
                    </span>
                  </div>
                  <a
                    href="#services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-xs font-bold text-zinc-300 hover:text-white transition-colors flex items-center gap-1 font-sans"
                  >
                    <span>View All Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
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
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-white/30 group-hover/item:bg-white/10 transition-all">
                        {getServiceLucideIcon(srv.iconName)}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-display font-extrabold text-sm text-white group-hover/item:text-white transition-colors leading-tight">
                          {srv.title}
                        </span>
                        <span className="font-sans text-xs text-zinc-400 leading-snug mt-0.5 line-clamp-2">
                          {srv.shortDesc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom Highlight Banner */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between bg-white/[0.03] -mx-6 -mb-6 p-4 rounded-b-2xl border-x-0 border-b-0">
                  <div className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                    <span className="font-bold text-white">Ready to Scale?</span>
                    <span>Get your free 30-minute Brand Kundli audit today.</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      sound.playChime();
                      onOpenKundli();
                    }}
                    type="button"
                    className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
                  >
                    Request Audit &gt;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("quick-links")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("quick-links")}
              className={`flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-colors py-2 ${
                activeDropdown === "quick-links"
                  ? "text-white"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>Quick Links</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "quick-links" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Quick Links Menu */}
            {activeDropdown === "quick-links" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-[#0c0c0e] text-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-white/15 p-4 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200"
              >
                <div className="space-y-1">
                  {quickLinks.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="group/ql flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.08] border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover/ql:bg-white/10">
                          <IconComp className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-display font-bold text-xs uppercase text-white transition-colors">
                            {item.title}
                          </span>
                          <span className="font-sans text-[11px] text-zinc-400 leading-tight">
                            {item.desc}
                          </span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Success Story */}
          <a
            href="#karname"
            onMouseEnter={() => sound.playPluck(130)}
            className="text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
          >
            Success Story
          </a>

          {/* Portfolio Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("portfolio")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("portfolio")}
              className={`flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-colors py-2 ${
                activeDropdown === "portfolio"
                  ? "text-white"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <span>Portfolio</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === "portfolio" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>

            {/* Portfolio Projects Dropdown */}
            {activeDropdown === "portfolio" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full right-0 mt-2 w-96 bg-[#0c0c0e] text-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-white/15 p-4 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-200"
              >
                <div className="pb-2.5 mb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-royal">
                    16 Live Client Products
                  </span>
                  <a
                    href="#karname"
                    onClick={() => setActiveDropdown(null)}
                    className="text-[11px] font-bold text-white hover:underline"
                  >
                    View All &gt;
                  </a>
                </div>
                <div className="space-y-1.5">
                  {portfolioProjects.map((proj) => (
                    <a
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
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <a
            href="#pricing"
            onMouseEnter={() => sound.playPluck(130)}
            className="text-xs font-bold tracking-wider uppercase text-zinc-300 hover:text-white transition-colors"
          >
            Pricing
          </a>

          {/* Quick Search & Command Palette (⌘K) */}
          <button
            onClick={() => {
              sound.playPluck(160);
              setIsCommandOpen(true);
            }}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-[#121215]/80 hover:border-white/50 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
            title="Open Quick Search & Command Palette (⌘K)"
            aria-label="Search and quick actions"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden xl:inline text-[11px]">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/10 border border-white/20 text-zinc-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Sonic UI Effects Toggle */}
          <SonicToggle />

          {/* Indian Tanpura + Tabla Ambient Beats */}
          <AudioVisualizer />

          {/* Signature Stark White Button */}
          <button
            onClick={() => {
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <span>LET&apos;S TALK</span>
            <span className="text-sm font-bold">&gt;</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white p-2.5 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-lg active:bg-white/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 3. Mobile Navigation Drawer with Accordions */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09090b] border-t border-white/10 px-4 py-6 max-h-[85vh] overflow-y-auto space-y-3 font-display">
          {/* About Us */}
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
          >
            About Us
          </a>

          {/* Services Mobile Accordion */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121215]">
            <button
              onClick={() =>
                setMobileAccordion(
                  mobileAccordion === "services" ? null : "services"
                )
              }
              className="w-full flex items-center justify-between p-3.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Services ({AGENCY_SERVICES.length})</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === "services" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>
            {mobileAccordion === "services" && (
              <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
                {AGENCY_SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    <span>{s.title}</span>
                    <span className="text-[10px] text-white font-metric font-bold bg-white/10 px-2 py-0.5 rounded">
                      {s.metric}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links Mobile Accordion */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121215]">
            <button
              onClick={() =>
                setMobileAccordion(
                  mobileAccordion === "quick-links" ? null : "quick-links"
                )
              }
              className="w-full flex items-center justify-between p-3.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span>Quick Links</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === "quick-links" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>
            {mobileAccordion === "quick-links" && (
              <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
                {quickLinks.map((ql) => (
                  <a
                    key={ql.title}
                    href={ql.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    {ql.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Success Story */}
          <a
            href="#karname"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
          >
            Success Story
          </a>

          {/* Portfolio Mobile Accordion */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-[#121215]">
            <button
              onClick={() =>
                setMobileAccordion(
                  mobileAccordion === "portfolio" ? null : "portfolio"
                )
              }
              className="w-full flex items-center justify-between p-3.5 text-sm font-bold uppercase tracking-wider text-white"
            >
              <span>Portfolio ({portfolioProjects.length})</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileAccordion === "portfolio" ? "rotate-180 text-white" : ""
                }`}
              />
            </button>
            {mobileAccordion === "portfolio" && (
              <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
                {portfolioProjects.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-white font-metric font-bold bg-white/10 px-2 py-0.5 rounded">
                      {p.metric}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10"
          >
            Pricing
          </a>

          {/* Mobile Audio & Command Tools */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                sound.playPluck(160);
                setIsCommandOpen(true);
              }}
              type="button"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-xs font-mono text-white border border-white/20 flex-1 justify-center"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search (⌘K)</span>
            </button>
            <div className="flex items-center gap-2">
              <SonicToggle />
              <AudioVisualizer />
            </div>
          </div>

          {/* Mobile CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              sound.playChime();
              onOpenKundli();
            }}
            type="button"
            className="w-full mt-4 min-h-[48px] py-3.5 rounded-xl bg-white active:bg-zinc-200 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
          >
            <span>LET&apos;S TALK &gt;</span>
          </button>
        </div>
      )}

      {/* Global ⌘K Command Palette Modal */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenKundli={onOpenKundli}
      />
    </header>
  );
}
