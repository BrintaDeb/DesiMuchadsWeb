"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Share,
  PlusSquare,
  ShieldCheck,
  Check,
  Zap,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

/**
 * Universal Mobile App Installation Controller
 * - Automatically detects device: iOS (iPhone/iPad), Android, or Desktop.
 * - iOS: Interactive step-by-step "Add to Home Screen" sheet with animated Safari share icons.
 * - Android: 1-Click PWA WebAPK install via beforeinstallprompt + Direct APK Sideload (/api/download-apk).
 * - Desktop: Native Chrome/Edge PWA install.
 * - Completely hides when already in standalone display mode.
 * - High-res icons, offline caching, sound effects, and haptic feedback.
 */
export function ApkInstallPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "installed"
  >("idle");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // 1. Detect if running inside standalone installed PWA without triggering effect setState warnings
  const isStandalone = useSyncExternalStore(
    (callback) => {
      window.addEventListener("appinstalled", callback);
      return () => window.removeEventListener("appinstalled", callback);
    },
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((window.navigator as unknown as { standalone?: boolean }).standalone)),
    () => false
  );

  // 2. Synchronous client platform detection without effect cascading renders
  const platform = useSyncExternalStore<"ios" | "android" | "desktop">(
    () => () => {},
    () => {
      if (typeof window === "undefined") return "desktop";
      const ua = navigator.userAgent || "";
      const isIOSDevice =
        /iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: boolean }).MSStream;
      if (isIOSDevice) return "ios";
      if (/Android/i.test(ua)) return "android";
      return "desktop";
    },
    () => "desktop"
  );

  // 3. Check session dismiss state without cascading renders
  const isDismissed = useSyncExternalStore(
    () => () => {},
    () =>
      typeof window !== "undefined" &&
      sessionStorage.getItem("dm_apk_popup_dismissed") === "true",
    () => false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 4. Capture native PWA install prompt (Android & Chromium)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // 5. Track successful installation
    const handleAppInstalled = () => {
      setDownloadStatus("installed");
      setIsModalOpen(false);
      sound.playChime();
      haptics.success();
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    const handleDrawer = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      setIsDrawerOpen(Boolean(customEvent.detail?.open));
    };
    window.addEventListener("dm_mobile_drawer_change", handleDrawer);

    // Global listener so header, mobile menu, and footer can launch the installer sheet on demand
    const handleOpenInstaller = () => {
      setIsVisible(true);
      setIsMinimized(false);
      setIsModalOpen(true);
      sound.playPluck(160);
      haptics.selection();
    };
    window.addEventListener("dm_open_app_installer", handleOpenInstaller);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("dm_mobile_drawer_change", handleDrawer);
      window.removeEventListener("dm_open_app_installer", handleOpenInstaller);
    };
  }, []);

  // Primary trigger: opens platform-tailored installation flow
  const handleOpenInstallation = () => {
    sound.playPluck(160);
    haptics.selection();

    // If native prompt is immediately available on Android/Desktop, invoke it
    if (deferredPrompt && platform !== "ios") {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult && choiceResult.outcome === "accepted") {
          setDownloadStatus("installed");
          sound.playChime();
          haptics.success();
        }
        setDeferredPrompt(null);
      });
      return;
    }

    // Otherwise open the tailored installation sheet
    setIsModalOpen(true);
  };

  // Direct APK file download handler
  const handleDirectApkDownload = () => {
    sound.playChime();
    haptics.heavy();
    setDownloadStatus("downloading");

    // Track download intent in CRM
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "direct_apk_download",
        name: "Mobile App Downloader",
        budget: "Mobile App Direct",
        service: "Android APK v2.4",
        message: `User triggered direct APK download on ${platform}.`,
      }),
    }).catch(() => {});

    // Reliable direct attachment download via API route
    try {
      const link = document.createElement("a");
      link.href = "/api/download-apk";
      link.setAttribute("download", "desi-muchads-v2.4.apk");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open("/api/download-apk", "_blank");
    }

    setTimeout(() => {
      setDownloadStatus("installed");
      sound.playChime();
      haptics.success();
    }, 1200);

    setTimeout(() => {
      setDownloadStatus("idle");
    }, 5000);
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPluck(120);
    haptics.light();
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("dm_apk_popup_dismissed", "true");
    }
  };

  // If already running inside installed standalone PWA, hide floating install prompt
  if (isStandalone || isDismissed || !isVisible || isDrawerOpen) return null;

  return (
    <>
      {/* 1. FLOATING INSTALLATION WIDGET (Corner Pill) */}
      {isMinimized ? (
        <aside
          aria-label="Direct Mobile App Installation"
          className="fixed bottom-[4.5rem] sm:bottom-6 right-3 sm:right-6 z-40 select-none animate-in fade-in zoom-in-90 duration-200"
        >
          <button
            type="button"
            onClick={() => {
              sound.playPluck(180);
              haptics.selection();
              setIsMinimized(false);
            }}
            className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#0c0c0b] border border-white/20 hover:border-emerald-400 text-white shadow-[0_8px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl active:scale-95 transition-all p-1.5 cursor-pointer"
            title="Open Mobile App Installer"
            aria-label="Open Mobile App Installer"
          >
            <img
              src="/icon-192.png"
              alt="Desi Muchads App Icon"
              className="w-full h-full object-contain rounded-xl"
            />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </button>
        </aside>
      ) : (
        <aside
          aria-label="Direct Mobile App Installation"
          className="fixed bottom-[4.5rem] sm:bottom-6 right-2.5 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none max-w-[calc(100vw-1.25rem)]"
        >
          <div className="relative group">
            {/* Subtle ambient border backlight */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-teal-400/20 opacity-50 group-hover:opacity-90 blur-[2px] transition-opacity" />

            {/* Clickable Action Container */}
            <div
              onClick={handleOpenInstallation}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenInstallation();
                }
              }}
              className="relative flex items-center gap-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#0c0c0b]/95 hover:bg-[#141412] border border-white/20 hover:border-emerald-400/80 text-white shadow-[0_12px_35px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all cursor-pointer active:scale-95"
              title="Click to Install Official Desi Muchads App"
            >
              {/* App Icon */}
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-white/20 bg-black shrink-0 flex items-center justify-center p-0.5">
                <img
                  src="/icon-192.png"
                  alt="Desi Muchads App Icon"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>

              {/* Status & Label */}
              <div className="flex flex-col text-left font-mono min-w-0 pr-0.5">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-bold text-xs tracking-wider text-white uppercase group-hover:text-emerald-300 transition-colors truncate">
                    {downloadStatus === "downloading"
                      ? "DOWNLOADING..."
                      : downloadStatus === "installed"
                      ? "APP READY"
                      : "INSTALL APP"}
                  </span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1 py-0.2 rounded font-bold shrink-0">
                    v2.4
                  </span>
                </div>
                <span className="text-[9px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate leading-none mt-0.5">
                  {platform === "ios"
                    ? "iOS / iPhone • 120Hz"
                    : platform === "android"
                    ? "Android 1-Click & APK"
                    : "PWA Standalone App"}
                </span>
              </div>

              {/* Action Glyph */}
              <div className="p-1 rounded-lg bg-white/5 group-hover:bg-emerald-500 group-hover:text-black text-zinc-400 transition-all shrink-0">
                {downloadStatus === "installed" ? (
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
                  <span className="text-xs font-bold leading-none block">−</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="p-1 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Dismiss"
                  aria-label="Dismiss App Widget"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* 2. UNIVERSAL INSTALLATION MODAL SHEET (Tailored for iOS & Android) */}
      {isModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              sound.playPluck(120);
              setIsModalOpen(false);
            }
          }}
          className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200 cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0e0e12] border-t sm:border border-white/20 rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 space-y-6 text-left text-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative cursor-default max-h-[92vh] overflow-y-auto my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-black border border-white/25 overflow-hidden p-1 shadow-lg shrink-0">
                  <img
                    src="/icon-192.png"
                    alt="Desi Muchads Official App Icon"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg uppercase text-white tracking-tight leading-none">
                    Desi Muchads App
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1">
                    v2.4 Production • iOS &amp; Android Standalone
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(120);
                  setIsModalOpen(false);
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all text-xs font-mono cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* PLATFORM SPECIFIC INSTRUCTIONS */}
            {platform === "ios" ? (
              /* iOS SAFARI INSTALLATION GUIDE */
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>iPhone &amp; iPad Safari Direct Install</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Install Desi Muchads directly to your iOS Home Screen for instant 120Hz ProMotion velocity, zero browser bars, and full offline case study playback:
                </p>

                {/* 3 Step Visual Guide */}
                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center shrink-0">
                      <Share className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">1. Tap the Share button</strong>
                      <span className="text-zinc-400 text-[11px]">Located in the bottom Safari toolbar (or top right on iPad).</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center shrink-0">
                      <PlusSquare className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">2. Select &quot;Add to Home Screen&quot;</strong>
                      <span className="text-zinc-400 text-[11px]">Scroll down the iOS share sheet and tap Add to Home Screen.</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">3. Tap &quot;Add&quot; in top right</strong>
                      <span className="text-zinc-400 text-[11px]">The standalone app icon will appear instantly on your Home Screen.</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    haptics.success();
                    setIsModalOpen(false);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Got It — Ready to Add</span>
                </button>
              </div>
            ) : (
              /* ANDROID & DESKTOP INSTALLATION CONTROLS */
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Native Android &amp; Web Installation</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Choose your preferred installation method below. Both options offer full offline capabilities, video reel caching, and instant founder war-room access:
                </p>

                {/* Primary: 1-Click PWA Native App Install */}
                {deferredPrompt ? (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playChime();
                      haptics.heavy();
                      deferredPrompt.prompt();
                      deferredPrompt.userChoice.then((choice) => {
                        if (choice && choice.outcome === "accepted") {
                          setDownloadStatus("installed");
                          setIsModalOpen(false);
                        }
                      });
                    }}
                    className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer group"
                  >
                    <Zap className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                    <span>⚡ 1-Click Instant App Install (Official)</span>
                  </button>
                ) : null}

                {/* Secondary: Direct APK Package Download */}
                <button
                  type="button"
                  onClick={handleDirectApkDownload}
                  disabled={downloadStatus === "downloading"}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider border border-white/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {downloadStatus === "downloading" ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full" />
                      <span>Downloading Standalone APK...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Download Standalone APK (v2.4 Package)</span>
                    </>
                  )}
                </button>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Android Installation Note:</span>
                  </div>
                  <p>
                    After downloading the APK, tap the notification to open and install. If prompted, allow &quot;Install from this source&quot;.
                  </p>
                </div>
              </div>
            )}

            {/* Performance Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400">
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <span className="block text-white font-bold">⚡ 120 FPS</span>
                <span>ProMotion</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <span className="block text-white font-bold">📶 Offline</span>
                <span>Pre-Cached</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <span className="block text-white font-bold">🔔 Push</span>
                <span>War-Room</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <span className="block text-white font-bold">🔒 Verified</span>
                <span>0% AI Slop</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
