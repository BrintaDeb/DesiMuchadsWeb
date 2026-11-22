"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

/**
 * Small, High-Impact Clickable APK Installation Widget
 * Positioned in the right corner.
 * - No QR code.
 * - 1-Click direct APK download and installation trigger.
 * - Compact, sleek neo-desi engineering aesthetics.
 * - Full sound and haptic integration.
 */
export function ApkInstallPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded">("idle");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if dismissed in this session
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("dm_apk_popup_dismissed");
      if (dismissed === "true") {
        setIsVisible(false);
      }

      // Capture beforeinstallprompt for native PWA installation if supported
      const handleBeforeInstall = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener("beforeinstallprompt", handleBeforeInstall);

      const handleDrawer = (e: any) => {
        setIsDrawerOpen(!!e.detail?.open);
      };
      window.addEventListener("dm_mobile_drawer_change", handleDrawer);

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
        window.removeEventListener("dm_mobile_drawer_change", handleDrawer);
      };
    }
  }, []);

  const handleInstallApk = async () => {
    sound.playChime();
    haptics.heavy();
    setDownloadStatus("downloading");

    // Track download intent in CRM
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "small_apk_install_widget",
        name: "APK Downloader",
        budget: "Mobile App Direct",
        service: "Android APK v2.4",
        message: "User clicked direct Install APK button in the right corner.",
      }),
    }).catch(() => {});

    // Trigger APK download
    try {
      const link = document.createElement("a");
      link.href = "/api/download-apk";
      link.download = "desi-muchads-v2.4.apk";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // If browser supports native Web App installation prompt, invoke it as well
      if (deferredPrompt) {
        deferredPrompt.prompt();
      }
    } catch (err) {
      console.error("APK download failed:", err);
    }

    setTimeout(() => {
      setDownloadStatus("downloaded");
      sound.playChime();
      haptics.success();
    }, 1200);

    setTimeout(() => {
      setDownloadStatus("idle");
    }, 4500);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPluck(140);
    haptics.light();
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dm_apk_popup_dismissed", "true");
    }
  };

  if (!isVisible || isDrawerOpen) return null;

  if (isMinimized) {
    return (
      <aside
        aria-label="Direct Android APK & App Installation"
        className="fixed bottom-[4.5rem] sm:bottom-5 right-3 sm:right-5 z-40 select-none animate-in fade-in zoom-in-90 duration-200"
      >
        <button
          type="button"
          onClick={() => {
            sound.playPluck(180);
            haptics.selection();
            setIsMinimized(false);
          }}
          className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0c0c0b] border border-white/20 hover:border-emerald-400 text-white shadow-[0_8px_25px_rgba(0,0,0,0.9)] backdrop-blur-xl active:scale-95 transition-all p-1"
          title="Open App Installation Widget"
          aria-label="Open App Installation Widget"
        >
          <img
            src="/icon-192.png"
            alt="Desi Muchads App Icon"
            className="w-full h-full object-contain rounded-lg"
          />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Direct Android APK & App Installation"
      className="fixed bottom-[4.5rem] sm:bottom-5 right-2.5 sm:right-5 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none max-w-[calc(100vw-1.25rem)]"
    >
      <div className="relative group">
        {/* Subtle ambient border backlight */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-emerald-500/30 to-teal-400/20 opacity-50 group-hover:opacity-90 blur-[2px] transition-opacity" />

        {/* Ultra-compact Clickable Action Container */}
        <div
          onClick={handleInstallApk}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleInstallApk();
            }
          }}
          className="relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#0c0c0b]/95 hover:bg-[#141412] border border-white/20 hover:border-emerald-400/80 text-white shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all cursor-pointer active:scale-95"
          title="Click to Install Official Desi Muchads App"
        >
          {/* Official App Logo Icon */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden border border-white/15 bg-black shrink-0 flex items-center justify-center">
            <img
              src="/icon-192.png"
              alt="Desi Muchads App Icon"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Compact Status & Label */}
          <div className="flex flex-col text-left font-mono min-w-0 pr-0.5">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-bold text-[11px] sm:text-xs tracking-wider text-white uppercase group-hover:text-emerald-300 transition-colors truncate">
                {downloadStatus === "downloading"
                  ? "DOWNLOADING..."
                  : downloadStatus === "downloaded"
                  ? "APK READY"
                  : "GET APP"}
              </span>
              <span className="text-[8px] sm:text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 py-0 rounded font-bold shrink-0">
                v2.4
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate leading-none mt-0.5">
              {downloadStatus === "downloaded"
                ? "Tap to install"
                : "Android & iOS"}
            </span>
          </div>

          {/* Action Status Glyph */}
          <div className="p-1 rounded-md bg-white/5 group-hover:bg-emerald-500 group-hover:text-black text-zinc-400 transition-all shrink-0">
            {downloadStatus === "downloaded" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-black" />
            ) : downloadStatus === "downloading" ? (
              <span className="animate-spin w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full block" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
          </div>

          {/* Minimize / Dismiss Controls */}
          <div className="flex items-center gap-0.5 border-l border-white/10 pl-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playPluck(120);
                haptics.selection();
                setIsMinimized(true);
              }}
              className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimize"
              aria-label="Minimize App Widget"
            >
              <span className="text-[11px] font-bold leading-none block">−</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss"
              aria-label="Dismiss App Widget"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
