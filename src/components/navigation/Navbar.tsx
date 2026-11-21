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
  TrendingUp,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { ThemeToggle } from "./ThemeToggle";
import { SonicToggle } from "./SonicToggle";
import { CommandMenu } from "../common/CommandMenu";
import { BreydaqsButton } from "../common/BreydaqsButton";

interface NavbarProps {
  onOpenKundli: () => void;
}

export function Navbar({ onOpenKundli }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(84);

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
    const iconStyle = "w-3.5 h-3.5 text-white";
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${isScrolled
          ? "bg-[#080807]/95 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.9)] border-b border-[rgba(232,232,227,0.15)]"
          : "bg-[#080807] border-b border-[rgba(232,232,227,0.12)]"
        }`}
    >
      {/* Main Architectural Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Mark with Preserved Official Logo */}
        <Link
          href="/"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-3 focus:outline-none group shrink-0"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-[0.2rem] overflow-hidden border border-white/20 group-hover:border-white transition-all shrink-0 bg-black p-0.5">
            <img
              src="/brand-logo.jpg"
              alt="Desi Muchads Official Brand Logo"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="flex flex-col text-left justify-center shrink-0">
            <div className="font-display font-black text-base sm:text-lg tracking-wider text-white uppercase flex items-center gap-1 leading-none">
              <span>DESI</span>
              <span className="text-zinc-400">MUCH</span>
              <span>ADS</span>
            </div>
            {/* Architectural Live Studio Telemetry Clock */}
            <div className="hidden sm:flex items-center gap-1.5 mt-1 font-mono text-[9px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase">IST · 10:00 – 20:30 · NEW DELHI</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items with Monospace Indexes (Breydaqs Design Theory) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs shrink-0 whitespace-nowrap">
          {/* About Us 0 1 */}
          <Link
            href="/about"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>About</span>
            <span className="text-[10px] opacity-40 font-bold">0 1</span>
          </Link>

          {/* Services 0 2 */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("services")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 px-2.5 py-1.5 uppercase tracking-wider transition-colors ${activeDropdown === "services"
                  ? "text-white"
                  : "text-zinc-400 hover:text-[#e8e8e3]"
                }`}
            >
              <span>Services</span>
              <span className="text-[10px] opacity-40 font-bold">0 2</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ml-0.5 ${activeDropdown === "services" ? "rotate-180 text-white" : "opacity-60"
                  }`}
              />
            </Link>

            {/* Services Dropdown */}
            {activeDropdown === "services" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[760px] max-w-[90vw] bg-[#0c0c0b] text-[#e8e8e3] rounded-[0.25rem] border border-[rgba(232,232,227,0.18)] p-6 z-50 shadow-[0_30px_90px_rgba(0,0,0,0.98)] animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 font-mono text-xs">
                  <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-bold">
                    CAPABILITIES &amp; DISCIPLINES [ 09 TOTAL ]
                  </span>
                  <Link
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-white hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>View All Disciplines ↗</span>
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {AGENCY_SERVICES.map((srv, idx) => (
                    <Link
                      key={srv.id}
                      href={`/services/${srv.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group/item flex items-start gap-3 p-3 rounded-[0.2rem] bg-[#121211] hover:bg-[#181816] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="w-8 h-8 rounded-[0.2rem] bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-white/30 transition-all">
                        {getServiceLucideIcon(srv.iconName)}
                      </div>
                      <div className="flex flex-col text-left min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-black text-xs text-white group-hover/item:text-[#e8e8e3] uppercase truncate">
                            {srv.title}
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold ml-1">
                            {srv.metric}
                          </span>
                        </div>
                        <span className="font-sans text-[11px] text-zinc-400 leading-snug mt-1 line-clamp-1">
                          {srv.shortDesc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                  <span>SLA Guarantee: Sub-24h turnaround &amp; direct principal oversight.</span>
                  <Link
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-white hover:underline font-bold"
                  >
                    Full Documentation ↗
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Work 0 3 */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("work")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/work"
              className={`flex items-center gap-1 px-2.5 py-1.5 uppercase tracking-wider transition-colors ${activeDropdown === "work"
                  ? "text-white"
                  : "text-zinc-400 hover:text-[#e8e8e3]"
                }`}
            >
              <span>Work</span>
              <span className="text-[10px] opacity-40 font-bold">0 3</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ml-0.5 ${activeDropdown === "work" ? "rotate-180 text-white" : "opacity-60"
                  }`}
              />
            </Link>

            {/* Work Dropdown */}
            {activeDropdown === "work" && (
              <div
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-[#0c0c0b] text-[#e8e8e3] rounded-[0.25rem] border border-[rgba(232,232,227,0.18)] p-5 z-50 shadow-[0_30px_90px_rgba(0,0,0,0.98)] animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="pb-3 mb-3 border-b border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    SELECTED WORKS [ 50 ARCHIVES ]
                  </span>
                  <Link
                    href="/work"
                    onClick={() => setActiveDropdown(null)}
                    className="text-white hover:underline font-bold"
                  >
                    View All ↗
                  </Link>
                </div>
                <div className="space-y-2">
                  {portfolioHighlights.map((proj) => (
                    <Link
                      key={proj.name}
                      href={proj.href}
                      onClick={() => setActiveDropdown(null)}
                      className="group/port flex items-center justify-between p-2.5 rounded-[0.2rem] bg-[#121211] hover:bg-[#181816] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col text-left">
                        <span className="font-display font-black text-xs text-white uppercase">
                          {proj.name}
                        </span>
                        <span className="font-sans text-[11px] text-zinc-400">
                          {proj.tagline}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-[0.2rem] bg-white/10 border border-white/15 text-white font-mono text-[10px] font-bold">
                        {proj.metric}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing 0 4 */}
          <Link
            href="/pricing"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Pricing</span>
            <span className="text-[10px] opacity-40 font-bold">0 4</span>
          </Link>

          {/* Contact 0 5 */}
          <Link
            href="/contact"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Contact</span>
            <span className="text-[10px] opacity-40 font-bold">0 5</span>
          </Link>

          {/* Command Palette Shortcut (⌘K) */}
          <button
            onClick={() => setIsCommandOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[0.2rem] border border-white/15 bg-[#121211] hover:border-white/40 text-xs font-mono text-zinc-300 hover:text-white transition-all ml-1"
            title="Open Quick Search & Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <kbd className="px-1 text-[10px] rounded bg-white/10 border border-white/20 text-zinc-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme & Density Switcher */}
          <ThemeToggle />

          {/* Zero-Payload Procedural Sound Toggle */}
          <SonicToggle />

          {/* Breydaqs Kinetic Double-Slide Button */}
          <BreydaqsButton
            href="/contact"
            variant="white"
            className="ml-2 py-2 px-4"
          >
            START A PROJECT
          </BreydaqsButton>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <SonicToggle />

          <button
            onClick={() => setIsCommandOpen(true)}
            type="button"
            className="p-2 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] rounded-[0.2rem] bg-white/5 border border-white/15 text-white flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Open Command Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-w-[38px] min-h-[38px] sm:min-w-[42px] sm:min-h-[42px] flex items-center justify-center rounded-[0.2rem] bg-white/5 border border-white/15 text-white active:scale-95 transition-transform"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{ top: `${headerHeight}px` }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile Structured Drawer (Breydaqs Architectural Styling & 100% English) */}
      {mobileMenuOpen && (
        <div
          style={{
            top: `${headerHeight}px`,
            maxHeight: `calc(100dvh - ${headerHeight}px)`,
          }}
          className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-[#0a0a09] border-t border-[rgba(232,232,227,0.15)] flex flex-col overflow-y-auto overscroll-contain animate-in slide-in-from-top-2 duration-200"
        >
          <div className="p-5 space-y-4 max-w-xl mx-auto w-full flex-1 flex flex-col justify-between pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
            <div className="space-y-3">
              {/* Theme & Density */}
              <div className="p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider font-bold">
                  Theme &amp; Visual Density
                </span>
                <ThemeToggle />
              </div>

              {/* Quick Navigation Deck */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Calculator className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] uppercase font-bold text-white">ROAS Engine</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenKundli();
                  }}
                  className="p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] uppercase font-bold text-white">Growth Audit</span>
                </button>

                <Link
                  href="/about#team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] uppercase font-bold text-white">Our Team</span>
                </Link>
              </div>

              {/* Dedicated Links */}
              <div className="space-y-1.5 font-mono text-xs pt-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Home</span>
                  <span className="text-zinc-500 text-[10px]">0 0</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>About &amp; Principles</span>
                  <span className="text-zinc-500 text-[10px]">0 1</span>
                </Link>

                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Services ({AGENCY_SERVICES.length})</span>
                  <span className="text-zinc-500 text-[10px]">0 2</span>
                </Link>

                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Selected Works (50)</span>
                  <span className="text-zinc-500 text-[10px]">0 3</span>
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Transparent Retainers</span>
                  <span className="text-zinc-500 text-[10px]">0 4</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/20 text-white uppercase font-bold"
                >
                  <span>Contact &amp; Strategy Call</span>
                  <span className="text-emerald-400 text-[10px]">0 5</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-3">
              <BreydaqsButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenKundli();
                }}
                variant="white"
                className="w-full py-3 text-xs"
              >
                REQUEST GROWTH AUDIT
              </BreydaqsButton>

              <div className="flex items-center justify-between px-1 text-[10px] font-mono text-zinc-500">
                <span>© 2026 DESI MUCHADS</span>
                <span>NEW DELHI · MUMBAI · BENGALURU</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Search (⌘K) Modal */}
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
