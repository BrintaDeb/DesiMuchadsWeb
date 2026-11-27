"use client";

import React, { useState, useEffect, useMemo, useSyncExternalStore } from "react";
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
  Copy,
  QrCode,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { generateQrMatrix } from "@/lib/qr";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __dmDeferredPrompt?: BeforeInstallPromptEvent | null;
  }
}

type DeviceProfile =
  | "ios-safari"
  | "ios-alt"
  | "ios-inapp"
  | "android"
  | "android-inapp"
  | "desktop";

type ModalTab = "android" | "ios" | "desktop";

const DISMISS_KEY = "dm_apk_popup_dismissed";
const DISMISS_EVENT = "dm_apk_dismiss_change";

function subscribeDeferredPrompt(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("dm_pwa_prompt_ready", callback);
  window.addEventListener("beforeinstallprompt", callback);
  window.addEventListener("appinstalled", callback);
  return () => {
    window.removeEventListener("dm_pwa_prompt_ready", callback);
    window.removeEventListener("beforeinstallprompt", callback);
    window.removeEventListener("appinstalled", callback);
  };
}

function getDeferredPrompt(): BeforeInstallPromptEvent | null {
  if (typeof window === "undefined") return null;
  return window.__dmDeferredPrompt || null;
}

function subscribeDismissed(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(DISMISS_EVENT, callback);
  return () => window.removeEventListener(DISMISS_EVENT, callback);
}

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(DISMISS_KEY) === "true";
  } catch {
    return false;
  }
}

function detectDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  const isInApp = /FBAN|FBAV|Instagram|WhatsApp|LinkedInApp|Line\/|MicroMessenger/i.test(ua);
  const isIOSDevice =
    (/iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !(window as unknown as { MSStream?: boolean }).MSStream;

  if (isIOSDevice) {
    if (isInApp) return "ios-inapp";
    if (/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua)) return "ios-alt";
    return "ios-safari";
  }

  if (/Android/i.test(ua)) {
    return isInApp ? "android-inapp" : "android";
  }

  return "desktop";
}

function subscribeOrigin(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

/**
 * Universal Mobile App & PWA Installer Controller
 * - Automatically detects iOS (Safari, Chrome iOS, In-App browsers), Android, and Desktop.
 * - Hooks early-captured beforeinstallprompt event for reliable 1-click Web App install.
 * - Direct APK sideload via <a download> pointing cleanly to /api/download-apk.
 * - Includes scannable ISO-18004 SVG QR Code on Desktop to install directly on phone.
 * - Supports ?install=app deep-link auto-open and Header/Footer/Mobile Drawer triggers.
 */
export function ApkInstallPopup() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tabOverride, setTabOverride] = useState<ModalTab | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "installed"
  >("idle");

  const deferredPrompt = useSyncExternalStore(
    subscribeDeferredPrompt,
    getDeferredPrompt,
    () => null
  );

  const isBannerDismissed = useSyncExternalStore(
    subscribeDismissed,
    readDismissed,
    () => false
  );

  const isStandalone = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("appinstalled", callback);
      return () => window.removeEventListener("appinstalled", callback);
    },
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((window.navigator as unknown as { standalone?: boolean }).standalone)),
    () => false
  );

  const profile = useSyncExternalStore<DeviceProfile>(
    () => () => {},
    detectDeviceProfile,
    () => "desktop"
  );

  const phoneInstallUrl = useSyncExternalStore(
    subscribeOrigin,
    () =>
      typeof window !== "undefined"
        ? `${window.location.origin}/?install=app`
        : "https://desimuchads.in/?install=app",
    () => "https://desimuchads.in/?install=app"
  );

  const isIOS = profile.startsWith("ios");
  const isAndroid = profile.startsWith("android");
  const defaultTab: ModalTab = isIOS ? "ios" : isAndroid ? "android" : "desktop";
  const activeTab: ModalTab = tabOverride || defaultTab;

  const qrMatrix = useMemo(() => generateQrMatrix(phoneInstallUrl), [phoneInstallUrl]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      window.__dmDeferredPrompt = e as BeforeInstallPromptEvent;
      window.dispatchEvent(new Event("dm_pwa_prompt_ready"));
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    const handleAppInstalled = () => {
      window.__dmDeferredPrompt = null;
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

    const handleOpenInstaller = () => {
      setIsModalOpen(true);
      sound.playPluck(160);
      haptics.selection();
    };
    window.addEventListener("dm_open_app_installer", handleOpenInstaller);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Support direct ?install=app deep link (from QR code scan on phone!)
    const params = new URLSearchParams(window.location.search);
    let rafId: number | null = null;
    if (params.get("install") === "app") {
      rafId = requestAnimationFrame(() => {
        setIsModalOpen(true);
      });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("dm_mobile_drawer_change", handleDrawer);
      window.removeEventListener("dm_open_app_installer", handleOpenInstaller);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerNativeWebInstall = async () => {
    const promptEvt = window.__dmDeferredPrompt || deferredPrompt;
    if (!promptEvt) return false;
    try {
      sound.playChime();
      haptics.heavy();
      await promptEvt.prompt();
      const choiceResult = await promptEvt.userChoice;
      if (choiceResult && choiceResult.outcome === "accepted") {
        setDownloadStatus("installed");
        setIsModalOpen(false);
        sound.playChime();
        haptics.success();
      }
      window.__dmDeferredPrompt = null;
      window.dispatchEvent(new Event("dm_pwa_prompt_ready"));
      return true;
    } catch {
      return false;
    }
  };

  const handleOpenInstallation = async () => {
    sound.playPluck(160);
    haptics.selection();
    setIsModalOpen(true);
  };

  const handleDirectApkDownload = () => {
    sound.playChime();
    haptics.heavy();
    setDownloadStatus("downloading");

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "direct_apk_download",
        name: "Mobile App Downloader",
        budget: "Mobile App Direct",
        service: "Android APK v2.4",
        message: `User triggered direct APK download on ${profile}.`,
      }),
    }).catch(() => {});

    setTimeout(() => {
      setDownloadStatus("installed");
      sound.playChime();
      haptics.success();
    }, 1200);

    setTimeout(() => {
      setDownloadStatus("idle");
    }, 5000);
  };

  const handleCopyPhoneLink = async () => {
    sound.playPluck(180);
    haptics.selection();
    try {
      await navigator.clipboard.writeText(phoneInstallUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  const handleDismissBanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPluck(120);
    haptics.light();
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // Ignore storage restrictions
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  const showFloatingWidget = !isStandalone && !isBannerDismissed && !isDrawerOpen;

  return (
    <>
      {/* 1. FLOATING INSTALLATION WIDGET (Always clears mobile bottom dock cleanly!) */}
      {showFloatingWidget &&
        (isMinimized ? (
          <aside
            aria-label="Direct Mobile App Installation"
            className="fixed bottom-[5.25rem] sm:bottom-6 right-3 sm:right-6 z-40 select-none animate-in fade-in zoom-in-90 duration-200"
          >
            <button
              type="button"
              onClick={() => {
                sound.playPluck(180);
                haptics.selection();
                setIsMinimized(false);
              }}
              className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0c0c0b] border border-white/25 hover:border-[#D4AF37] text-white shadow-[0_8px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl active:scale-95 transition-all p-1.5 cursor-pointer"
              title="Open Mobile App Installer"
              aria-label="Open Mobile App Installer"
            >
              <img
                src="/icon-192.png"
                alt="Desi Muchads App Icon"
                className="w-full h-full object-contain rounded-xl"
              />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F3E5AB] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]" />
              </span>
            </button>
          </aside>
        ) : (
          <aside
            aria-label="Direct Mobile App Installation"
            className="fixed bottom-[5.25rem] sm:bottom-6 right-3 sm:right-6 z-40 animate-in fade-in slide-in-from-bottom-2 duration-200 select-none max-w-[calc(100vw-1.5rem)]"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/35 to-amber-200/20 opacity-55 group-hover:opacity-95 blur-[2px] transition-opacity" />

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
                className="relative flex items-center gap-2 sm:gap-2.5 px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#0c0c0b]/95 hover:bg-[#141412] border border-white/20 hover:border-[#D4AF37]/80 text-white shadow-[0_12px_35px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-all cursor-pointer active:scale-95"
                title="Install Official Desi Muchads App on Phone or Desktop"
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden border border-white/20 bg-[#09090b] shrink-0 flex items-center justify-center p-0.5">
                  <img
                    src="/icon-192.png"
                    alt="Desi Muchads App Icon"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="flex flex-col text-left font-mono min-w-0 pr-0.5">
                  <div className="flex items-center gap-1.5 leading-tight">
                    <span className="font-bold text-[11px] sm:text-xs tracking-wider text-white uppercase group-hover:text-[#F3E5AB] transition-colors truncate">
                      {downloadStatus === "downloading"
                        ? "DOWNLOADING..."
                        : downloadStatus === "installed"
                        ? "APP READY"
                        : "GET APP"}
                    </span>
                    <span className="text-[10px] bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/35 px-1.5 py-0.2 rounded font-bold shrink-0">
                      v2.4
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate leading-none mt-0.5">
                    {isIOS
                      ? "iPhone • Add to Home"
                      : isAndroid
                      ? "Android APK & Web App"
                      : "Scan QR / APK / PWA"}
                  </span>
                </div>

                <div className="p-1 rounded-lg bg-white/5 group-hover:bg-[#D4AF37] group-hover:text-black text-zinc-400 transition-all shrink-0">
                  {downloadStatus === "installed" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F3E5AB] group-hover:text-black" />
                  ) : downloadStatus === "downloading" ? (
                    <span className="animate-spin w-3.5 h-3.5 border-2 border-[#D4AF37] border-t-transparent rounded-full block" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex items-center gap-1 border-l border-white/10 pl-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playPluck(120);
                      haptics.selection();
                      setIsMinimized(true);
                    }}
                    className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer touch-manipulation"
                    title="Minimize"
                    aria-label="Minimize App Widget"
                  >
                    <span className="text-sm font-bold leading-none block">−</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDismissBanner}
                    className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer touch-manipulation"
                    title="Dismiss Floating Pill"
                    aria-label="Dismiss App Widget"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        ))}

      {/* 2. UNIVERSAL APP & WEB APP INSTALLER MODAL (ALWAYS reachable even after dismissing pill) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dm-app-installer-title"
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
            className="w-full max-w-lg bg-[#0c0c10] border-t sm:border border-white/20 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 space-y-5 text-left text-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative cursor-default max-h-[92dvh] overflow-y-auto my-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#09090b] border border-white/25 overflow-hidden p-1 shadow-lg shrink-0">
                  <img
                    src="/icon-192.png"
                    alt="Desi Muchads Official App Icon"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div className="min-w-0">
                  <h3
                    id="dm-app-installer-title"
                    className="font-display font-black text-base sm:text-lg uppercase text-white tracking-tight leading-none truncate"
                  >
                    Desi Muchads Mobile App
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1 truncate">
                    v2.4 Signed APK &amp; Standalone Web App (iOS / Android)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playPluck(120);
                  setIsModalOpen(false);
                }}
                aria-label="Close App Installer"
                className="px-3 py-2 min-h-[40px] rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all text-xs font-mono cursor-pointer shrink-0"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* In-App Browser Warning if opened inside Instagram / WhatsApp / LinkedIn */}
            {(profile === "ios-inapp" || profile === "android-inapp") && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs font-sans space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Open in {profile === "ios-inapp" ? "Safari" : "Chrome"} to Install</span>
                </div>
                <p className="text-zinc-300 leading-relaxed text-[11px]">
                  You&apos;re viewing inside an in-app browser which blocks app downloads. Tap the{" "}
                  <strong>⋯ / Compass</strong> icon and choose{" "}
                  <strong>&quot;Open in {profile === "ios-inapp" ? "Safari" : "Browser"}&quot;</strong>, or copy this link:
                </p>
                <button
                  type="button"
                  onClick={handleCopyPhoneLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-black font-mono font-bold text-[11px] cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied Install URL!" : "Copy Browser Install URL"}</span>
                </button>
              </div>
            )}

            {/* Platform Switcher Tabs (Auto-selected for visitor's device, switchable anytime) */}
            <div
              role="tablist"
              aria-label="Choose installation platform"
              className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-[11px]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "android"}
                onClick={() => {
                  sound.playPluck(150);
                  haptics.selection();
                  setTabOverride("android");
                }}
                className={`py-2 px-2 min-h-[42px] rounded-xl font-bold transition-all cursor-pointer touch-manipulation ${
                  activeTab === "android"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Android / APK
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "ios"}
                onClick={() => {
                  sound.playPluck(150);
                  haptics.selection();
                  setTabOverride("ios");
                }}
                className={`py-2 px-2 min-h-[42px] rounded-xl font-bold transition-all cursor-pointer touch-manipulation ${
                  activeTab === "ios"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                iPhone / iPad
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "desktop"}
                onClick={() => {
                  sound.playPluck(150);
                  haptics.selection();
                  setTabOverride("desktop");
                }}
                className={`py-2 px-2 min-h-[42px] rounded-xl font-bold transition-all cursor-pointer flex items-center justify-center gap-1 touch-manipulation ${
                  activeTab === "desktop"
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Send to Phone</span>
              </button>
            </div>

            {/* TAB 1: ANDROID & DIRECT APK DOWNLOAD */}
            {activeTab === "android" && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/12 border border-[#D4AF37]/35 text-[#F3E5AB] text-xs font-mono font-bold">
                  <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Android APK &amp; 1-Click Web App</span>
                </div>

                {/* Primary: Direct Signed Android APK Download (Real <a download> anchor!) */}
                <a
                  href="/api/download-apk"
                  download="DesiMuchads-App-v2.4.apk"
                  onClick={handleDirectApkDownload}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer group min-h-[48px]"
                >
                  {downloadStatus === "downloading" ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" />
                      <span>Downloading Signed APK (v2.4)...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-black group-hover:translate-y-0.5 transition-transform" />
                      <span>Download Android APK Direct (v2.4 · 85 KB)</span>
                    </>
                  )}
                </a>

                {/* Secondary: Native 1-Click Web App (PWA) if browser prompt captured */}
                {deferredPrompt ? (
                  <button
                    type="button"
                    onClick={triggerNativeWebInstall}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#F3E5AB] font-mono text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[48px]"
                  >
                    <Zap className="w-4 h-4 text-[#F3E5AB]" />
                    <span>⚡ Or 1-Click Install Web App (No APK Sideload)</span>
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-sans space-y-1.5">
                    <div className="font-mono text-[11px] font-bold text-[#F3E5AB] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Prefer Instant Chrome Web App (No APK needed)?</span>
                    </div>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">
                      In Android Chrome, tap the <strong>⋮ Menu (top-right)</strong> →{" "}
                      <strong>&quot;Add to Home screen&quot;</strong> → <strong>&quot;Install&quot;</strong>.
                      It adds the official app icon straight to your Android app drawer with full offline caching.
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-400 space-y-1">
                  <div className="flex items-center justify-between text-zinc-300 font-bold">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Android APK Verified (v1 / v2 / v3 Signed)</span>
                    </span>
                    <a
                      href="/downloads/desi-muchads-v2.4.apk"
                      download="DesiMuchads-App-v2.4.apk"
                      className="text-[#F3E5AB] hover:underline flex items-center gap-1"
                    >
                      <span>Mirror</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p>
                    After downloading the APK, tap <strong>Open</strong> in your notification bar. If prompted, allow{" "}
                    &quot;Install unknown apps&quot; for your browser.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: IPHONE / IPAD (iOS) */}
            {activeTab === "ios" && (
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-bold">
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>
                    {profile === "ios-alt"
                      ? "iPhone Chrome / Edge Home Screen Guide"
                      : "iPhone & iPad Direct Web App Install"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                  Install <strong>Desi Muchads</strong> directly on your iPhone/iPad Home Screen (Apple prohibits `.apk` files on iOS—Web App gives you full-screen 120Hz performance and offline playback):
                </p>

                <div className="space-y-2.5 font-sans text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 flex items-center justify-center shrink-0">
                      <Share className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">
                        1. Tap the Share button
                      </strong>
                      <span className="text-zinc-400 text-[11px]">
                        {profile === "ios-alt"
                          ? "Tap the Share icon at the top-right next to the URL bar in Chrome."
                          : "Located in the bottom Safari toolbar (or top-right on iPad)."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3E5AB] flex items-center justify-center shrink-0">
                      <PlusSquare className="w-4 h-4 text-[#F3E5AB]" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">
                        2. Select &quot;Add to Home Screen&quot;
                      </strong>
                      <span className="text-zinc-400 text-[11px]">
                        Scroll down the iOS share sheet and tap &quot;Add to Home Screen&quot;.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">
                        3. Tap &quot;Add&quot; in the top right
                      </strong>
                      <span className="text-zinc-400 text-[11px]">
                        The official black &amp; white Desi Muchads moustache icon installs immediately.
                      </span>
                    </div>
                  </div>
                </div>

                {!isIOS && (
                  <button
                    type="button"
                    onClick={() => setTabOverride("desktop")}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-zinc-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4 text-[#F3E5AB]" />
                    <span>Show iPhone Camera QR Code</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    sound.playChime();
                    haptics.success();
                    setIsModalOpen(false);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-white text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg cursor-pointer min-h-[46px]"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Done — Ready to Add</span>
                </button>
              </div>
            )}

            {/* TAB 3: DESKTOP -> PHONE QR HANDOFF + DESKTOP PWA + APK */}
            {activeTab === "desktop" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/15">
                  {/* Live Scannable ISO-18004 SVG QR Code */}
                  <div className="p-2.5 rounded-2xl bg-white shrink-0 shadow-lg">
                    <svg
                      width="116"
                      height="116"
                      viewBox={`0 0 ${qrMatrix.length + 4} ${qrMatrix.length + 4}`}
                      role="img"
                      aria-label="QR Code to install Desi Muchads App on your phone"
                      className="block w-[116px] h-[116px]"
                    >
                      <rect
                        width={qrMatrix.length + 4}
                        height={qrMatrix.length + 4}
                        fill="#ffffff"
                      />
                      {qrMatrix.map((row, r) =>
                        row.map((dark, c) =>
                          dark ? (
                            <rect
                              key={`${r}-${c}`}
                              x={c + 2}
                              y={r + 2}
                              width={1}
                              height={1}
                              fill="#09090b"
                            />
                          ) : null
                        )
                      )}
                    </svg>
                  </div>

                  <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] text-[10.5px] font-mono font-bold uppercase">
                      <QrCode className="w-3 h-3" />
                      <span>Scan With Phone Camera</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-white uppercase">
                      Instant Phone Install (iOS &amp; Android)
                    </h4>
                    <p className="text-[11px] font-sans text-zinc-400 leading-relaxed">
                      Point your iPhone or Android camera at this QR code to open the direct phone installer immediately.
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyPhoneLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono text-white transition-all cursor-pointer"
                    >
                      {copiedLink ? (
                        <Check className="w-3.5 h-3.5 text-[#F3E5AB]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-300" />
                      )}
                      <span>{copiedLink ? "Phone Link Copied!" : "Copy Phone Link"}</span>
                    </button>
                  </div>
                </div>

                {/* Action buttons: 1-Click Desktop PWA + Direct Android APK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {deferredPrompt ? (
                    <button
                      type="button"
                      onClick={triggerNativeWebInstall}
                      className="py-3 px-4 rounded-xl bg-white hover:bg-zinc-200 text-black font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
                    >
                      <Zap className="w-4 h-4 text-black" />
                      <span>Install Desktop App</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setTabOverride("ios")}
                      className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
                    >
                      <Smartphone className="w-4 h-4 text-blue-400" />
                      <span>iPhone Guide</span>
                    </button>
                  )}

                  <a
                    href="/api/download-apk"
                    download="DesiMuchads-App-v2.4.apk"
                    onClick={handleDirectApkDownload}
                    className="py-3 px-4 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 text-[#F3E5AB] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
                  >
                    <Download className="w-4 h-4 text-[#F3E5AB]" />
                    <span>Download APK (85 KB)</span>
                  </a>
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
                <span className="block text-white font-bold">📲 Phone App</span>
                <span>iOS + APK</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <span className="block text-white font-bold">🔒 Signed</span>
                <span>v1/v2/v3 APK</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
