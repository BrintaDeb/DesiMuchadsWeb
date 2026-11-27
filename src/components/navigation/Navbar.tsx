"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Rocket,
  Share2,
  ShoppingBag,
  Zap,
  Code2,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
  Download,
  Crown,
  Calendar,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
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
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(84);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef<number>(0);

  const activeRouteKey = pathname.startsWith("/about")
    ? "about"
    : pathname.startsWith("/services")
    ? "services"
    : pathname.startsWith("/work")
    ? "work"
    : pathname.startsWith("/contact")
    ? "contact"
    : null;

  const focusedNavKey = hoveredNav ?? activeDropdown ?? activeRouteKey;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (dropdownRef.current) {
        setHeaderHeight(dropdownRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [isScrolled]);

  useEffect(() => {
    let rafId = 0;
    const syncScroll = () => {
      rafId = 0;
      const y = window.scrollY;
      setIsScrolled(y > 20);
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setScrollProgress(Math.max(0, Math.min(1, y / maxScroll)));
      if (Math.abs(y - lastScrollYRef.current) > 6) {
        setScrollDir(y > lastScrollYRef.current ? "down" : "up");
        lastScrollYRef.current = y;
      }
      if (dropdownRef.current) {
        setHeaderHeight(dropdownRef.current.offsetHeight);
      }
    };
    const handleScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(syncScroll);
    };
    syncScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
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
      case "Crown":
        return <Crown className={iconStyle} />;
      case "Rocket":
        return <Rocket className={iconStyle} />;
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

  const handleHeaderPointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = dropdownRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--nav-x", `${(e.clientX - rect.left).toFixed(1)}px`);
  };

  return (
    <header
      ref={dropdownRef}
      onMouseMove={handleHeaderPointerMove}
      onMouseLeave={() => {
        setHoveredNav(null);
        dropdownRef.current?.style.setProperty("--nav-x", "-500px");
      }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)] ${isScrolled
        ? "bg-[#080807]/90 backdrop-blur-xl shadow-[0_14px_45px_rgba(0,0,0,0.92)] border-b border-white/15"
        : "bg-[#080807]/85 backdrop-blur-md border-b border-[rgba(232,232,227,0.12)]"
        }`}
    >
      {/* Pointer-Reactive Ambient Brass Gold Light Sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(360px circle at var(--nav-x, -500px) 50%, rgba(212,175,55,0.095), transparent 72%)",
        }}
      />

      {/* Scroll-Reactive Metallic Progress Hairline Along Header Bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/[0.04] overflow-hidden"
      >
        <div
          className="h-full w-full bg-gradient-to-r from-white/50 via-[#D4AF37] to-[#F3E5AB] shadow-[0_0_12px_rgba(212,175,55,0.65)] transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left",
          }}
        />
      </div>

      {/* Main Architectural Navigation Bar (Morphs smoothly on scroll) */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 transition-[padding] duration-300 ease-out ${
          isScrolled ? (scrollDir === "down" ? "py-2" : "py-2.5") : "py-3"
        }`}
      >
        {/* Brand Mark with Official White Moustache Logo */}
        <Link
          href="/"
          data-slingshot-logo="true"
          onMouseEnter={() => sound.playPluck(180)}
          className="flex items-center gap-2 sm:gap-3 focus:outline-none group min-w-0 shrink"
        >
          {/* Authentic White Moustache Logo with interactive spring tilt */}
          <div className="relative w-8 h-4 sm:w-11 sm:h-6 flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
            <img
              src="/desi-muchads-cropped-logo.png"
              srcSet="/desi-muchads-cropped-logo.png 1x, /desi-muchads-cropped-logo@2x.png 2x"
              alt="Desi Muchads Official Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] drop-shadow-[0_0_16px_rgba(255,255,255,0.35)] transition-all group-hover:drop-shadow-[0_0_14px_rgba(243,229,171,0.95)]"
              loading="eager"
            />
          </div>
          <div className="flex flex-col text-left justify-center min-w-0">
            <div className="font-display font-black text-sm sm:text-lg tracking-wide sm:tracking-wider text-white uppercase flex items-center gap-1 sm:gap-1.5 leading-none whitespace-nowrap">
              <span className="transition-colors group-hover:text-[#F3E5AB]">DESI</span>
              <span className="text-zinc-300 transition-colors group-hover:text-white">MUCHADS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items with Sliding Pill Indicator & Active Route Micro-Dot */}
        <nav
          onMouseLeave={() => setHoveredNav(null)}
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 font-mono text-xs shrink-0 whitespace-nowrap"
        >
          {/* About Us */}
          <Link
            href="/about"
            onMouseEnter={() => {
              sound.playPluck(130);
              setHoveredNav("about");
            }}
            className={`relative px-3 py-1.5 rounded-[0.25rem] transition-colors flex items-center gap-1.5 uppercase tracking-wider ${
              focusedNavKey === "about" ? "text-white" : "text-zinc-400 hover:text-[#e8e8e3]"
            }`}
          >
            {focusedNavKey === "about" && (
              <motion.span
                layoutId="dm-nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-[0.25rem] bg-white/[0.08] border border-white/15"
              />
            )}
            {activeRouteKey === "about" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
            )}
            <span>About</span>
          </Link>

          {/* Services */}
          <div
            className="relative"
            onMouseEnter={() => {
              handleMouseEnter("services");
              setHoveredNav("services");
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/services"
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-[0.25rem] uppercase tracking-wider transition-colors ${
                focusedNavKey === "services"
                  ? "text-white"
                  : "text-zinc-400 hover:text-[#e8e8e3]"
              }`}
            >
              {focusedNavKey === "services" && (
                <motion.span
                  layoutId="dm-nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-[0.25rem] bg-white/[0.08] border border-white/15"
                />
              )}
              {activeRouteKey === "services" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
              )}
              <span>Services</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ml-0.5 ${activeDropdown === "services" ? "rotate-180 text-[#F3E5AB]" : "opacity-60"
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
                    CAPABILITIES &amp; DISCIPLINES [ {String(AGENCY_SERVICES.length).padStart(2, "0")} TOTAL ]
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
                        <span className="font-sans text-[11px] text-zinc-300 leading-snug mt-1 line-clamp-1">
                          {srv.specs.deliverables[0]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-300">
                  <span>Select any service to inspect scope.</span>
                  <Link
                    href="/services"
                    onClick={() => setActiveDropdown(null)}
                    className="text-white hover:underline font-bold"
                  >
                    All Services ↗
                  </Link>
                </div>

                <Link
                  href="/#request-quote"
                  onClick={() => setActiveDropdown(null)}
                  className="mt-3 p-2.5 rounded-[0.2rem] bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs font-mono transition-all"
                >
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Request Custom Quote &amp; Book Strategy Session</span>
                  </div>
                  <span className="text-white font-bold">Get Quote ↗</span>
                </Link>
              </div>
            )}
          </div>

          {/* Work */}
          <div
            className="relative"
            onMouseEnter={() => {
              handleMouseEnter("work");
              setHoveredNav("work");
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/work"
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-[0.25rem] uppercase tracking-wider transition-colors ${
                focusedNavKey === "work"
                  ? "text-white"
                  : "text-zinc-400 hover:text-[#e8e8e3]"
              }`}
            >
              {focusedNavKey === "work" && (
                <motion.span
                  layoutId="dm-nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-[0.25rem] bg-white/[0.08] border border-white/15"
                />
              )}
              {activeRouteKey === "work" && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
              )}
              <span>Work</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ml-0.5 ${activeDropdown === "work" ? "rotate-180 text-[#F3E5AB]" : "opacity-60"
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
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        Featured
                      </span>
                    </div>
                    <span className="font-display font-bold text-sm text-white uppercase group-hover/feat:text-zinc-200">
                      Selected Work
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white group-hover/feat:translate-x-1 transition-transform">
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

          {/* Request Quote */}
          <Link
            href="/#request-quote"
            onMouseEnter={() => {
              sound.playPluck(130);
              setHoveredNav("quote");
            }}
            className={`relative px-3 py-1.5 rounded-[0.25rem] transition-colors flex items-center gap-1 uppercase tracking-wider ${
              focusedNavKey === "quote" ? "text-white" : "text-zinc-400 hover:text-[#e8e8e3]"
            }`}
          >
            {focusedNavKey === "quote" && (
              <motion.span
                layoutId="dm-nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-[0.25rem] bg-white/[0.08] border border-white/15"
              />
            )}
            <span>Quote</span>
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            onMouseEnter={() => {
              sound.playPluck(130);
              setHoveredNav("contact");
            }}
            className={`relative px-3 py-1.5 rounded-[0.25rem] transition-colors flex items-center gap-1.5 uppercase tracking-wider ${
              focusedNavKey === "contact" ? "text-white" : "text-zinc-400 hover:text-[#e8e8e3]"
            }`}
          >
            {focusedNavKey === "contact" && (
              <motion.span
                layoutId="dm-nav-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-[0.25rem] bg-white/[0.08] border border-white/15"
              />
            )}
            {activeRouteKey === "contact" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
            )}
            <span>Contact</span>
          </Link>

          {/* Reactive Scroll Depth Quick-Top Pill */}
          {scrollProgress > 0.04 && (
            <button
              type="button"
              onClick={() => {
                sound.playPluck(220);
                haptics.selection();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              title="Back to top"
              aria-label={`Scroll depth ${Math.round(scrollProgress * 100)}%, click to return to top`}
              className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] hover:bg-white hover:text-black border border-white/10 text-[10px] font-mono text-zinc-300 transition-all cursor-pointer tabular-nums"
            >
              <span>{String(Math.round(scrollProgress * 100)).padStart(2, "0")}%</span>
              <span aria-hidden="true">↑</span>
            </button>
          )}

          {/* Command Palette Shortcut (⌘K) */}
          <button
            onClick={() => setIsCommandOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 bg-transparent hover:bg-white/[0.05] hover:border-white/25 text-xs font-mono text-zinc-400 hover:text-white transition-all ml-1"
            title="Open Quick Search & Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="text-[10px] text-zinc-500 font-mono">
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 bg-transparent hover:bg-white/[0.05] hover:border-white/25 text-[11px] font-mono text-zinc-400 hover:text-white transition-all uppercase tracking-wider cursor-pointer"
            title="Download / Install Official Desi Muchads Phone & Web App"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>App</span>
          </button>

          {/* Zero-Payload Procedural Sound Toggle */}
          <SonicToggle />

          {/* Breydaqs Kinetic Double-Slide Button */}
          <BreydaqsButton
            href="/contact"
            variant="white"
            className="ml-2 py-2 px-4"
          >
            START PROJECT
          </BreydaqsButton>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
          <SonicToggle />

          <button
            type="button"
            onClick={() => {
              sound.playPluck(180);
              haptics.medium();
              setMobileMenuOpen(false);
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
              }
            }}
            style={{ minBlockSize: 0 }}
            className="touch-manipulation p-1.5 sm:p-2 w-9 h-9 sm:w-[40px] sm:h-[40px] rounded-full bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all relative cursor-pointer"
            aria-label="Download / Install Mobile App"
            title="Get Mobile App (iOS & Android)"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
          </button>

          <button
            onClick={() => {
              sound.playPluck(195);
              haptics.medium();
              setMobileMenuOpen(false);
              setIsCommandOpen(true);
            }}
            type="button"
            style={{ minBlockSize: 0 }}
            className="touch-manipulation p-1.5 sm:p-2 w-9 h-9 sm:w-[40px] sm:h-[40px] rounded-full bg-white/[0.03] border border-white/10 text-zinc-300 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            aria-label="Open Command Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playPluck(mobileMenuOpen ? 120 : 170);
              haptics.medium();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{ minBlockSize: 0 }}
            className="touch-manipulation p-1.5 sm:p-2 w-9 h-9 sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white active:scale-95 transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => {
            sound.playPluck(120);
            setMobileMenuOpen(false);
          }}
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
          <div className="p-4 sm:p-5 space-y-4 max-w-xl mx-auto w-full flex-1 flex flex-col justify-between pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
            <div className="space-y-3">
              {/* Quick Navigation Deck */}
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <Link
                  href="/contact#session"
                  onClick={() => {
                    sound.playPluck(155);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 min-h-[60px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.98] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5 transition-all touch-manipulation"
                >
                  <Calendar className="w-4 h-4 text-[#F3E5AB]" />
                  <span className="text-[10px] uppercase font-bold text-white">Book Call</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    haptics.medium();
                    setMobileMenuOpen(false);
                    onOpenKundli();
                  }}
                  className="p-3 min-h-[60px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.98] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer touch-manipulation"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F3E5AB]" />
                  <span className="text-[10px] uppercase font-bold text-white">Growth Audit</span>
                </button>

                <Link
                  href="/about#team"
                  onClick={() => {
                    sound.playPluck(165);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 min-h-[60px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.98] border border-white/10 flex flex-col items-center justify-center text-center gap-1.5 transition-all touch-manipulation"
                >
                  <Users className="w-4 h-4 text-[#F3E5AB]" />
                  <span className="text-[10px] uppercase font-bold text-white">Our Team</span>
                </Link>
              </div>

              {/* Dedicated Links */}
              <div className="space-y-1.5 font-mono text-xs pt-2">
                <Link
                  href="/"
                  onClick={() => {
                    sound.playPluck(140);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/10 text-white uppercase transition-all touch-manipulation"
                >
                  <span>Home</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => {
                    sound.playPluck(145);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/10 text-white uppercase transition-all touch-manipulation"
                >
                  <span>About &amp; Principles</span>
                </Link>

                <Link
                  href="/services"
                  onClick={() => {
                    sound.playPluck(150);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/10 text-white uppercase transition-all touch-manipulation"
                >
                  <span>Services</span>
                </Link>

                <Link
                  href="/work"
                  onClick={() => {
                    sound.playPluck(155);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/10 text-white uppercase transition-all touch-manipulation"
                >
                  <span>Work (All 50+ Case Studies)</span>
                  <span className="text-[10px] font-mono text-zinc-400 shrink-0 ml-2">Archive ↗</span>
                </Link>

                <Link
                  href="/#work"
                  onClick={() => {
                    sound.playPluck(165);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#161614] hover:bg-white/10 active:scale-[0.99] border border-white/20 text-white uppercase transition-all touch-manipulation"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 text-white shrink-0" />
                    <span className="truncate">Featured Work (Homepage)</span>
                  </span>
                  <span className="text-[10px] font-mono text-white font-bold shrink-0 ml-2">Explore →</span>
                </Link>

                <Link
                  href="/#request-quote"
                  onClick={() => {
                    sound.playPluck(170);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/10 text-white uppercase transition-all touch-manipulation"
                >
                  <span>Request Quote</span>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => {
                    sound.playPluck(180);
                    haptics.selection();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 min-h-[44px] rounded-[0.2rem] bg-[#121211] hover:bg-white/10 active:scale-[0.99] border border-white/20 text-white uppercase font-bold transition-all touch-manipulation"
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
                  sound.playPluck(160);
                  haptics.selection();
                  setMobileMenuOpen(false);
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
                  }
                }}
                className="w-full py-2.5 px-3 rounded-[0.2rem] bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[44px] touch-manipulation"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Get Mobile App (iOS &amp; Android)</span>
              </button>

              <BreydaqsButton
                onClick={() => {
                  sound.playChime();
                  setMobileMenuOpen(false);
                  onOpenKundli();
                }}
                variant="white"
                className="w-full py-3.5 min-h-[48px] text-xs touch-manipulation"
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
