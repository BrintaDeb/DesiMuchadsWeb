"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client exceptions
    console.error("Desi Muchads Runtime Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 text-center font-sans selection:bg-white selection:text-black">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold block mb-2">
        RUNTIME EXCEPTION CAUGHT
      </span>

      <h1 className="font-display font-black text-3xl sm:text-4xl text-white uppercase mb-4">
        Kuch Gadbad Ho Gayi
      </h1>

      <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-8">
        An unexpected runtime event occurred. Our engineering telemetry has captured this event. Please reset the component view or return to the main baithak.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Operation</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Agency Home</span>
        </Link>
      </div>
    </div>
  );
}
