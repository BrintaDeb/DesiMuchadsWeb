import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Sparkles, PhoneCall } from "lucide-react";
import { MoustacheSVG } from "@/components/common/Icons";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between px-6 py-12 selection:bg-white selection:text-black font-sans relative overflow-hidden">
      {/* Background ambient radial sheen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
            <MoustacheSVG className="w-full h-full text-white" />
          </div>
          <div>
            <span className="font-display font-black text-sm tracking-widest uppercase block text-white">
              DESI MUCHADS
            </span>
            <span className="text-[10px] font-mono text-zinc-400 block -mt-0.5">
              GROWTH ARCHITECTURE
            </span>
          </div>
        </Link>

        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Emergency Dispatch</span>
        </a>
      </header>

      {/* Center 404 Hero */}
      <main className="max-w-2xl mx-auto w-full text-center py-16 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-zinc-300 font-mono text-xs uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>RAASTA BHEEG GAYA · 404 CODE</span>
        </div>

        <h1 className="font-display font-black text-6xl sm:text-8xl text-white tracking-tight uppercase leading-none mb-4">
          404
        </h1>

        <h2 className="font-display font-bold text-xl sm:text-2xl text-zinc-200 uppercase mb-4">
          Yeh Page Mandi Me Nahi Mila
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
          The route you are searching for has either been moved, updated into a new growth framework, or never existed in the first place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Agency HQ</span>
          </Link>
          <Link
            href="/#karname"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore 16 Live Case Studies</span>
          </Link>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center text-xs font-mono text-zinc-500 z-10 pt-8 border-t border-white/10">
        © 2025 DESI MUCHADS DIGITAL LLP · UNIT OF DESI MUCHADS DIGITAL AGENCY
      </footer>
    </div>
  );
}
