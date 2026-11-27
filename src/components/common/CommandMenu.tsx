"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowRight,
  Calculator,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ExternalLink,
  Layers,
  X,
  Calendar,
  Download,
} from "lucide-react";
import { AGENCY_SERVICES } from "@/data/servicesData";
import { AGENCY_PROJECTS } from "@/data/projectsData";
import { DEMO_PROJECTS_DATABASE } from "@/data/demoProductsData";
import { sound } from "@/lib/sound";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenKundli: () => void;
}

export function CommandMenu({ isOpen, onClose, onOpenKundli }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle global keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          sound.playPluck(160);
          // If we had a global open trigger, we could call it
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Define Quick Actions
  const quickActions = [
    {
      id: "action-services",
      category: "Action",
      title: "Explore Growth Capabilities",
      subtitle: "Meta & Google ads, Next.js stores, and Q-Commerce scaling",
      icon: Calculator,
      onSelect: () => {
        onClose();
        router.push("/services");
      },
    },
    {
      id: "action-kundli",
      category: "Action",
      title: "Run Free Brand Growth Audit",
      subtitle: "Audit speed, ads & revenue leaks",
      icon: ShieldCheck,
      onSelect: () => {
        onClose();
        onOpenKundli();
      },
    },
    {
      id: "action-quote",
      category: "Action",
      title: "Request Custom Quote & Strategy Session",
      subtitle: "Meta & Google Ads, Social Media, Website Dev & Branding",
      icon: Layers,
      onSelect: () => {
        onClose();
        const el = document.getElementById("request-quote");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else router.push("/contact");
      },
    },
    {
      id: "action-calendar",
      category: "Action",
      title: "Schedule Live Strategy Session (Calendar)",
      subtitle: "Select appointment slot & request custom quotation",
      icon: Calendar,
      onSelect: () => {
        onClose();
        router.push("/contact");
      },
    },
    {
      id: "action-app",
      category: "Action",
      title: "Download / Install Mobile App (iOS & Android APK)",
      subtitle: "Install standalone Web App, scan phone QR, or download APK v2.4",
      icon: Download,
      onSelect: () => {
        onClose();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("dm_open_app_installer"));
        }
      },
    },
    {
      id: "action-whatsapp",
      category: "Action",
      title: "Book Direct Strategy Call on WhatsApp",
      subtitle: "Connect instantly with Principal Growth Architect (+91 9180252831)",
      icon: PhoneCall,
      onSelect: () => {
        onClose();
        window.open(
          "https://wa.me/919180252831?text=" +
            encodeURIComponent("Hello Desi Muchads! I would like to schedule a strategy session."),
          "_blank"
        );
      },
    },
  ];

  // Map Services (Name + What We Do Only)
  const serviceItems = AGENCY_SERVICES.map((s) => ({
    id: `service-${s.slug}`,
    category: "Services",
    title: s.title,
    subtitle: s.specs.deliverables.slice(0, 2).join(" · "),
    icon: Sparkles,
    onSelect: () => {
      onClose();
      router.push(`/services/${s.slug}`);
    },
  }));

  // Map Case Studies
  const projectItems = AGENCY_PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    category: "Case Studies",
    title: `${p.client} (${p.category})`,
    subtitle: `${p.heroStat} — ${p.tagline}`,
    icon: ExternalLink,
    onSelect: () => {
      onClose();
      router.push(`/work/${p.slug}`);
    },
  }));

  // Map Live Demo Storefronts
  const demoItems = Object.values(DEMO_PROJECTS_DATABASE).map((d) => ({
    id: `demo-${d.slug}`,
    category: "Live Demo Stores",
    title: `${d.brandName} • Live Storefront`,
    subtitle: `${d.brandTagline} (${d.categoryBadge})`,
    icon: ExternalLink,
    onSelect: () => {
      onClose();
      router.push(`/demos/${d.slug}`);
    },
  }));

  // Filter items based on query
  const allItems = [...quickActions, ...serviceItems, ...projectItems, ...demoItems];

  const filteredItems = query.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 8); // Top results when empty

  // Arrow key navigation
  const handleKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredItems.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      sound.playPluck(120);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredItems.length === 0) return;
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      sound.playPluck(120);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        sound.playChime();
        filteredItems[selectedIndex].onSelect();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fast Navigation Command Menu"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
    >
      <div
        className="relative w-full max-w-2xl ios-glass-panel rounded-2xl shadow-[0_35px_100px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col max-h-[85dvh] overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            aria-label="Search services, case studies, live demos, or commands"
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNav}
            placeholder="Type a service, case study, live demo, or command..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 outline-none font-sans min-h-[40px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-zinc-500 hover:text-white text-xs px-2.5 py-1 min-h-[44px] flex items-center rounded cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors touch-hit-expand cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              No matching services, projects, or commands found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    sound.playChime();
                    item.onSelect();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all min-h-[44px] ${
                    isSelected ? "bg-white/10 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-white/5 text-zinc-300 border-white/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white tracking-wide truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? "translate-x-0.5 text-white" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="hidden sm:inline">Desi Muchads Fast Navigation</span>
        </div>
      </div>
    </div>
  );
}
