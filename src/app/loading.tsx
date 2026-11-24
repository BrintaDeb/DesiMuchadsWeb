import React from "react";
import {
  RoyalLotusMandala,
  RoyalPalatialJaaliTapestry,
  IndianFloralFlourish,
} from "@/components/common/IndianArtPatterns";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[998] flex flex-col items-center justify-center bg-[#070709] text-white select-none">
      {/* Background Indian Jaali Latticework Tapestry in Matte Gold */}
      <div className="absolute inset-0 pointer-events-none">
        <RoyalPalatialJaaliTapestry className="absolute inset-0 w-full h-full text-[#c5a059]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/60 to-[#070709]/95" />
      </div>

      {/* Ambient warm matte gold radiance */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-[#c5a059]/[0.05] blur-[120px]" />
        <div className="w-64 h-64 rounded-full bg-[#dfb76c]/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-4 text-center px-4 max-w-sm">
        {/* Illuminated Moustache with Rotating Lotus Mandala */}
        <div className="relative flex items-center justify-center">
          {/* Subtle Rotating Indian Lotus Mandala Ring in Matte Gold */}
          <div className="absolute -z-10 w-44 h-44 text-[#dfb76c]/25 animate-spin-slow pointer-events-none flex items-center justify-center">
            <RoyalLotusMandala className="w-full h-full" />
          </div>

          {/* Diya Halo */}
          <div className="absolute -inset-4 rounded-full bg-[#c5a059]/20 blur-xl animate-pulse" />
          <img
            src="/desi-muchads-cropped-logo.png"
            srcSet="/desi-muchads-cropped-logo.png 1x, /desi-muchads-cropped-logo@2x.png 2x"
            alt="Desi Muchads Official Brand Mark"
            className="relative z-10 w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.95)] drop-shadow-[0_0_36px_rgba(223,183,108,0.45)] animate-pulse"
          />
        </div>

        {/* Indian Floral Arabesque Flourish Under Logo */}
        <div className="w-36 text-[#dfb76c]/40 pointer-events-none">
          <IndianFloralFlourish className="w-full h-6" />
        </div>

        {/* Artisanal Cultural Title in Matte Gold & Ivory */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-serif text-[#faf9f5]">
            <span className="text-[#dfb76c]">✦</span>
            <span>DESI MUCHADS</span>
            <span className="text-[#dfb76c]">✦</span>
          </div>
          <p className="text-[10px] text-[#dfb76c]/80 uppercase tracking-[0.2em] font-serif">
            ARTISANAL CREATIVE AGENCY &bull; BENGALURU
          </p>
        </div>

        {/* Fine Matte Gold Leaf Shimmer Track */}
        <div className="w-48 sm:w-56 h-1 bg-[#1b1710] rounded-full overflow-hidden border border-[#dfb76c]/25 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f7e8ba] to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
        </div>
      </div>
    </div>
  );
}
