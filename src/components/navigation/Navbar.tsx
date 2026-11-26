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
  Users,
  TrendingUp,
  Download,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useProposal } from "@/context/AgencyProposalContext";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { SonicToggle } from "./SonicToggle";
import { CommandMenu } from "../common/CommandMenu";
import { BreydaqsButton } from "../common/BreydaqsButton";
import { ReadingProgressBar } from "../common/ReadingProgressBar";

interface NavbarProps {
  onOpenKundli: () => void;
}

export function Navbar({ onOpenKundli }: NavbarProps) {
  const { cartCount, openCart } = useProposal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  // Prevent background body scroll and notify floating docks when mobile drawer is open
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("dm_mobile_drawer_change", {
          detail: { open: mobileMenuOpen },
        })
      );
    }
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

  // The exact featured works showcased in the homepage auto-slider
  const featuredHomepageWorks = AGENCY_PROJECTS.slice(0, 8);

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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Mark with Official White Moustache Logo */}
        <Link
          href="/"
          data-slingshot-logo="true"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-2 sm:gap-3 focus:outline-none group min-w-0 shrink"
        >
          {/* Authentic White Moustache Logo without box border */}
          <div className="relative w-8 h-4 sm:w-11 sm:h-6 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/desi-muchads-cropped-logo.png"
              srcSet="/desi-muchads-cropped-logo.png 1x, /desi-muchads-cropped-logo@2x.png 2x"
              alt="Desi Muchads Official Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] transition-all group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]"
              loading="eager"
            />
          </div>
          <div className="flex flex-col text-left justify-center min-w-0">
            <div className="font-display font-black text-sm sm:text-lg tracking-wide sm:tracking-wider text-white uppercase flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
              <span>DESI</span>
              <span className="text-zinc-300">MUCHADS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items with Monospace Indexes (Breydaqs Design Theory) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-mono text-xs shrink-0 whitespace-nowrap">
          {/* About Us */}
          <Link
            href="/about"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>About</span>
          </Link>

          {/* Services */}
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
                  {AGENCY_SERVICES.map((srv) => (
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
                        <span className="font-display font-black text-xs text-white group-hover/item:text-[#e8e8e3] uppercase truncate">
                          {srv.title}
                        </span>
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

                <Link
                  href="/#process"
                  onClick={() => setActiveDropdown(null)}
                  className="mt-3 p-2.5 rounded-[0.2rem] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs font-mono transition-all"
                >
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/75" />
                    <span>Process Architecture: Discover · Define · Design · Build</span>
                  </div>
                  <span className="text-white font-bold">Explore ↗</span>
                </Link>
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
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[460px] max-w-[92vw] bg-[#0c0c0b] text-[#e8e8e3] rounded-[0.25rem] border border-[rgba(232,232,227,0.18)] p-5 z-50 shadow-[0_30px_90px_rgba(0,0,0,0.98)] animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="pb-3 mb-3 border-b border-white/10 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      HOMEPAGE FEATURED WORK
                    </span>
                  </div>
                  <Link
                    href="/#work"
                    onClick={() => setActiveDropdown(null)}
                    className="text-zinc-400 hover:text-white transition-colors text-[11px] font-bold"
                  >
                    View on Home ↗
                  </Link>
                </div>

                {/* Featured Work Banner Card -> links directly to /#work */}
                <Link
                  href="/#work"
                  onClick={() => setActiveDropdown(null)}
                  className="group/feat mb-3 p-3 rounded-[0.2rem] bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:border-white/40 transition-all flex items-center justify-between"
                >
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-bold">
                        Homepage Auto-Slider
                      </span>
                    </div>
                    <span className="font-display font-black text-sm text-white uppercase group-hover/feat:text-zinc-200">
                      Flagship Revenue Architectures
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white group-hover/feat:translate-x-1 transition-transform">
                    Explore →
                  </span>
                </Link>

                {/* Featured Projects List: Exact Works from Homepage */}
                <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                  {featuredHomepageWorks.map((proj) => (
                    <Link
                      key={proj.id}
                      href={`/work/${proj.slug}`}
                      onClick={() => setActiveDropdown(null)}
                      className="group/port flex items-center justify-between p-2.5 rounded-[0.2rem] bg-[#121211] hover:bg-[#181816] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-9 h-7 rounded-[0.15rem] overflow-hidden bg-black/60 shrink-0 border border-white/10">
                          <img
                            src={proj.thumbnail}
                            alt={proj.client}
                            className="w-full h-full object-cover group-hover/port:scale-105 transition-transform"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col text-left min-w-0 flex-1">
                          <span className="font-display font-black text-xs text-white uppercase group-hover/port:text-zinc-200 truncate">
                            {proj.client}
                          </span>
                          <span className="font-sans text-[10.5px] text-zinc-400 truncate max-w-[220px]">
                            {proj.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-[0.2rem] bg-white/10 border border-white/15 text-white font-mono text-[9.5px] font-bold shrink-0 ml-2">
                        {proj.heroStat ? proj.heroStat.split("·")[0].trim() : proj.category}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                  <span>Curated Homepage Flagships</span>
                  <Link
                    href="/work"
                    onClick={() => setActiveDropdown(null)}
                    className="text-white hover:underline font-bold"
                  >
                    All 50 Works ↗
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <Link
            href="/pricing"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Pricing</span>
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onMouseEnter={() => sound.playPluck(130)}
            className="px-2.5 py-1.5 text-zinc-400 hover:text-[#e8e8e3] transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Contact</span>
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

          {/* Direct Mobile / Desktop App Installer Button */}
          <button
            type="button"
            onClick={() => {
              sound.playPluck(180);
              haptics.selection();
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
              }
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[0.2rem] border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400 text-[11px] font-mono text-emerald-300 hover:text-emerald-200 transition-all ml-1 uppercase tracking-wider font-bold cursor-pointer"
            title="Download / Install Official Desi Muchads Phone & Web App"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>App</span>
          </button>

          {/* Service Cart Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playPluck(170);
              haptics.selection();
              openCart();
            }}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-[0.2rem] border text-[11px] font-mono transition-all ml-1 uppercase tracking-wider font-bold cursor-pointer ${
              cartCount > 0
                ? "border-white bg-white text-black shadow-[0_0_16px_rgba(255,255,255,0.25)]"
                : "border-white/15 bg-[#121211] hover:border-white/40 text-zinc-300 hover:text-white"
            }`}
            title="Open Selected Service Cart & Dispatch via WhatsApp"
            aria-label={`Open service cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-black text-white text-[10px] font-black leading-none">
                {cartCount}
              </span>
            )}
          </button>

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
        <div className="flex items-center gap-1 sm:gap-2 lg:hidden shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.playPluck(170);
              haptics.medium();
              openCart();
            }}
            style={{ minBlockSize: 0 }}
            className={`touch-hit-expand p-1.5 sm:p-2 w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[0.2rem] border flex items-center justify-center active:scale-95 transition-transform relative cursor-pointer ${
              cartCount > 0
                ? "bg-white border-white text-black"
                : "bg-white/5 border-white/15 text-white"
            }`}
            aria-label={`Open service cart (${cartCount} items)`}
            title="Open Service Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-emerald-500 text-black text-[9px] font-mono font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <SonicToggle />

          <button
            type="button"
            onClick={() => {
              sound.playPluck(180);
              haptics.medium();
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
              }
            }}
            style={{ minBlockSize: 0 }}
            className="touch-hit-expand p-1.5 sm:p-2 w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[0.2rem] bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center justify-center active:scale-95 transition-transform relative cursor-pointer"
            aria-label="Download / Install Mobile App"
            title="Get Mobile App (iOS & Android)"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </button>

          <button
            onClick={() => {
              haptics.medium();
              setIsCommandOpen(true);
            }}
            type="button"
            style={{ minBlockSize: 0 }}
            className="touch-hit-expand p-1.5 sm:p-2 w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-[0.2rem] bg-white/5 border border-white/15 text-white flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Open Command Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              haptics.medium();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{ minBlockSize: 0 }}
            className="touch-hit-expand p-1.5 sm:p-2 w-9 h-9 sm:w-[42px] sm:h-[42px] flex items-center justify-center rounded-[0.2rem] bg-white/5 border border-white/15 text-white active:scale-95 transition-transform"
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
              {/* Quick Navigation Deck */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5"
                >
                  <Calculator className="w-4 h-4 text-zinc-400" />
                  <span className="text-[10px] uppercase font-bold text-white">Retainers</span>
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
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>About &amp; Principles</span>
                </Link>

                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Services</span>
                </Link>

                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Work (All 50+ Case Studies)</span>
                  <span className="text-[10px] font-mono text-zinc-400">Archive ↗</span>
                </Link>

                <Link
                  href="/#work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#161614] border border-white/20 text-white uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>Featured Work (Homepage Slider)</span>
                  </span>
                  <span className="text-[10px] font-mono text-white font-bold">Explore →</span>
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/10 text-white uppercase"
                >
                  <span>Pricing</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-[0.2rem] bg-[#121211] border border-white/20 text-white uppercase font-bold"
                >
                  <span>Contact</span>
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.playPluck(160);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
                  }
                }}
                className="w-full py-2.5 px-3 rounded-[0.2rem] bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px]"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Get Mobile App (iOS &amp; Android)</span>
              </button>

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
                <span>BENGALURU (HQ) · NEW DELHI · MUMBAI</span>
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

      {/* Top Scroll-Linked Reading Progress Bar (copied from segmentsix.de) */}
      <ReadingProgressBar />
    </header>
  );
}
