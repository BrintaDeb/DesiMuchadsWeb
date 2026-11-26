"use client";

import React from "react";
import { sound } from "@/lib/sound";

export interface SocialChannelItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  accentGlow: string; // Tailwind glow / shadow classes
  brandColor: string; // Vibrant brand color class
  icon: (props: { className?: string }) => React.JSX.Element;
  desc: string;
}

export const OFFICIAL_SOCIAL_CHANNELS: SocialChannelItem[] = [
  {
    id: "instagram",
    name: "INSTAGRAM",
    handle: "@the_desi_muchads",
    url: "https://www.instagram.com/the_desi_muchads/",
    accentGlow: "rgba(225, 48, 108, 0.45)",
    brandColor: "from-amber-400 via-rose-500 to-purple-600",
    desc: "Reels & Visual Swagger",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LINKEDIN",
    handle: "Desi Muchads Digital",
    url: "https://www.linkedin.com/company/desi-muchads",
    accentGlow: "rgba(10, 102, 194, 0.45)",
    brandColor: "bg-[#0A66C2]",
    desc: "Executive Insights & Audits",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
      </svg>
    ),
  },
  {
    id: "facebook",
    name: "FACEBOOK",
    handle: "Desi Muchads Official",
    url: "https://www.facebook.com/profile.php?id=61596454145422",
    accentGlow: "rgba(24, 119, 242, 0.45)",
    brandColor: "bg-[#1877F2]",
    desc: "Case Studies & Community",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    name: "WHATSAPP",
    handle: "+91 9180252831",
    url: "https://wa.me/919180252831?text=Hello%20Desi%20Muchads!%20I%20would%20like%20to%20discuss%20scaling%20my%20brand.",
    accentGlow: "rgba(37, 211, 102, 0.45)",
    brandColor: "bg-[#25D366]",
    desc: "Direct Founder Access",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    ),
  },
];

interface SocialRedirectionDeckProps {
  className?: string;
  showTitle?: boolean;
}

export function SocialRedirectionDeck({
  className = "",
  showTitle = true,
}: SocialRedirectionDeckProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {showTitle && (
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-1">
            OFFICIAL AGENCY ECOSYSTEM
          </span>
          <h4 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider text-white">
            Connect With Desi Muchads
          </h4>
        </div>
      )}

      {/* Row of Interactive Metallic Social Redirection Discs */}
      <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10">
        {OFFICIAL_SOCIAL_CHANNELS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playChime()}
              onMouseEnter={() => sound.playPluck(160)}
              className="relative group flex flex-col items-center focus:outline-none"
              title={`Follow Desi Muchads on ${item.name} (${item.handle})`}
            >
              {/* Dynamic Aura Glow (illuminates with platform signature color on hover) */}
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125 pointer-events-none"
                style={{ backgroundColor: item.accentGlow }}
              />

              {/* Rotating Dashed Orbital Halo on Hover */}
              <div
                className="absolute -inset-2.5 rounded-full border border-dashed border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow pointer-events-none"
                style={{ animationDuration: "20s" }}
              />

              {/* The Metallic Coin / Disc (Inspired directly by the reference image) */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-b from-zinc-400 via-zinc-700 to-zinc-900 group-hover:from-white group-hover:via-zinc-300 group-hover:to-zinc-800 shadow-[0_10px_25px_rgba(0,0,0,0.8)] group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 active:scale-95 transition-all duration-300">
                {/* Dark Recessed Separation Bevel */}
                <div className="w-full h-full rounded-full p-1 bg-black">
                  {/* Deep Midnight Navy/Slate Core Disc (matching reference background) */}
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#0f1b2f] via-[#09111f] to-[#040810] border border-white/10 group-hover:border-white/30 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden transition-all">
                    {/* Radial Specular Glint */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)] opacity-40 group-hover:opacity-90 transition-opacity pointer-events-none" />

                    {/* Vector Icon */}
                    <div className="relative z-10 text-white/80 group-hover:text-white transition-colors duration-300 mb-1 group-hover:scale-110 group-hover:-translate-y-0.5 transform transition-transform">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    {/* Compact Platform Wordmark */}
                    <span className="relative z-10 font-display font-black text-[9px] sm:text-[10px] tracking-wider text-zinc-300 group-hover:text-white uppercase leading-none transition-colors">
                      {item.name}
                    </span>

                    {/* Micro gold sub-line */}
                    <div className="w-4 h-[1px] bg-amber-400/40 group-hover:w-8 group-hover:bg-amber-400 transition-all duration-300 mt-1" />
                  </div>
                </div>
              </div>

              {/* Subtle hover label tooltip below the button */}
              <div className="mt-2.5 flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {item.handle}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
