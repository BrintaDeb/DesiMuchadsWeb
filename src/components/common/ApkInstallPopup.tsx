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
        aria-label="Direct Android APK Installation"
        className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 select-none animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <button
          type="button"
          onClick={() => {
            sound.playPluck(180);
            haptics.selection();
            setIsMinimized(false);
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0c0c0b]/95 border border-emerald-500/50 hover:border-emerald-400 text-white shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl active:scale-95 transition-all text-xs font-mono"
          title="Open APK Install popup"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
            APK v2.4
          </span>
          <Download className="w-3 h-3 text-zinc-400" />
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Direct Android APK Installation"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-3 duration-300 select-none max-w-[calc(100vw-1.5rem)]"
    >
      <div className="relative group">
        {/* Ambient emerald backlight glow */}
        <div className="absolute -inset-0.5 rounded-[0.35rem] bg-gradient-to-r from-emerald-500/40 via-teal-400/20 to-emerald-600/40 opacity-70 group-hover:opacity-100 blur-sm transition-opacity" />

        {/* Clickable Compact Action Container */}
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
          className="relative flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-[0.25rem] bg-[#0c0c0b] hover:bg-[#151513] border border-emerald-500/50 hover:border-emerald-400 text-white shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all cursor-pointer active:scale-95"
          title="Click to Install Android APK directly"
        >
          {/* Glowing radar ping status */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          {/* Icon */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-[0.2rem] bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/25 transition-colors">
            {downloadStatus === "downloaded" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-in zoom-in-75" />
            ) : downloadStatus === "downloading" ? (
              <span className="animate-spin w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full" />
            ) : (
              <Smartphone className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            )}
          </div>

          {/* Label and Details */}
          <div className="flex flex-col text-left font-mono pr-1 min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-xs sm:text-[13px] tracking-wider text-white uppercase group-hover:text-emerald-300 transition-colors truncate">
                {downloadStatus === "downloading"
                  ? "DOWNLOADING..."
                  : downloadStatus === "downloaded"
                  ? "APK READY"
                  : "INSTALL APK"}
              </span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 py-0.2 rounded-[0.15rem] font-bold shrink-0">
                v2.4
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5 truncate">
              {downloadStatus === "downloaded"
                ? "Tap file to finish install"
                : "Android 8.0+ • 1-Click"}
            </span>
          </div>

          {/* Download Action Glyph */}
          <div className="p-1 rounded-[0.2rem] bg-white/5 group-hover:bg-emerald-500 group-hover:text-black text-zinc-400 transition-all shrink-0 ml-0.5">
            <Download className="w-3.5 h-3.5" />
          </div>

          {/* Minimize / Dismiss Controls */}
          <div className="flex items-center gap-0.5 ml-0.5 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                sound.playPluck(120);
                haptics.selection();
                setIsMinimized(true);
              }}
              className="p-1 rounded-[0.2rem] text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimize APK Widget"
              aria-label="Minimize APK Widget"
            >
              <span className="text-xs font-bold leading-none block px-0.5">−</span>
            </button>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-[0.2rem] text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Dismiss APK Widget"
              aria-label="Dismiss APK Widget"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
