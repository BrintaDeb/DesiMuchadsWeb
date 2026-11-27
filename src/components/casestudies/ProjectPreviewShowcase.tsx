"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  ExternalLink,
  Lock,
  Image as ImageIcon,
  Film,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { ProjectItem, getProjectAssetType, ProjectAssetType } from "@/data/projectsData";

interface ProjectPreviewShowcaseProps {
  project: ProjectItem;
  initialDeviceMode?: "desktop" | "mobile";
  className?: string;
  isStandalone?: boolean; // When rendered inline in /work/[slug] page
  onClose?: () => void;
}

export function ProjectPreviewShowcase({
  project,
  initialDeviceMode = "desktop",
  className = "",
  isStandalone = false,
  onClose,
}: ProjectPreviewShowcaseProps) {
  const assetType: ProjectAssetType = getProjectAssetType(project);

  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">(initialDeviceMode);
  const [zoomLevel, setZoomLevel] = useState<"fit" | "full">("fit");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  // Detect real mobile screen width (< 768px)
  const isRealMobile = React.useSyncExternalStore(
    () => () => { },
    () => typeof window !== "undefined" && window.innerWidth < 768,
    () => false
  );

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Safety timeout on iframe spinner for internal demo storefronts
  useEffect(() => {
    if (assetType !== "internal_app") return;
    const timer = setTimeout(() => {
      setIframeLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [project.id, iframeKey, assetType]);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    sound.playPluck(150);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    sound.playPluck(170);
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Determine active view mode (if real mobile, force full mobile layout for ergonomics)
  const effectiveDeviceMode = isRealMobile && !isStandalone ? "mobile" : deviceMode;

  return (
    <div className={`w-full h-full flex-1 flex flex-col min-h-0 ${className} relative`}>
      {/* Dynamic Ambient Aura Glow in Brand Accent Color */}
      <div
        className="absolute inset-0 blur-3xl opacity-20 pointer-events-none transition-all duration-700 -z-10"
        style={{ backgroundColor: project.accentColor || "#D4AF37" }}
      />

      {/* Top Controls Bar */}
      <div className="w-full px-3 py-2 shrink-0 flex flex-wrap items-center justify-between gap-2 text-xs font-mono bg-black/40 backdrop-blur-md border-b border-white/10 z-20">
        {/* Left Side: Asset Type Pill */}
        <div className="flex items-center gap-2">
          {assetType === "video_reel" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] font-bold text-[11px]">
              <Film className="w-3 h-3 text-[#D4AF37]" />
              <span>4K Motion Reel</span>
            </div>
          ) : assetType === "canva_deck" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Slide Deck Showcase</span>
            </div>
          ) : assetType === "visual_showcase" ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-[11px]">
              <ImageIcon className="w-3 h-3 text-purple-400" />
              <span>Master Art &amp; Design</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#F3E5AB] font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Interactive Live Storefront</span>
            </div>
          )}

          {/* Zoom Level Control (Only in Visual Showcase mode) */}
          {assetType === "visual_showcase" && (
            <button
              type="button"
              onClick={() => {
                sound.playPluck(130);
                setZoomLevel((z) => (z === "fit" ? "full" : "fit"));
              }}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center gap-1 transition-all cursor-pointer text-[11px]"
              title={zoomLevel === "fit" ? "Inspect 100% Full Resolution" : "Fit Image to Viewport"}
            >
              {zoomLevel === "fit" ? (
                <>
                  <ZoomIn className="w-3 h-3 text-zinc-400" />
                  <span>100% Zoom</span>
                </>
              ) : (
                <>
                  <ZoomOut className="w-3 h-3 text-zinc-400" />
                  <span>Fit Viewport</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side: Device Switcher (Desktop vs Mobile) & Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Device Viewport Toggle (Active on desktop monitors) */}
          {!isRealMobile && (
            <div className="flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(140);
                  setDeviceMode("desktop");
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${deviceMode === "desktop"
                  ? "bg-white/20 text-white font-bold"
                  : "text-zinc-500 hover:text-white"
                  }`}
                title="Desktop Studio View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="text-[11px]">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(160);
                  setDeviceMode("mobile");
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${deviceMode === "mobile"
                  ? "bg-white/20 text-white font-bold"
                  : "text-zinc-500 hover:text-white"
                  }`}
                title="iPhone 16 Pro View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px]">iPhone 16</span>
              </button>
            </div>
          )}

          {/* Frame Reload Button (For iframes) */}
          {(assetType === "internal_app" || assetType === "external_app") && (
            <button
              type="button"
              onClick={() => {
                sound.playPluck(150);
                setIframeKey((k) => k + 1);
                setIframeLoading(true);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Reload Frame"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Direct External Link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playChime()}
            className="px-3 py-1 rounded-lg bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            title="Launch Full Experience in New Window"
          >
            <span>Launch</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Viewport Container (Fills 100% of available space) */}
      <div className="relative flex-1 w-full h-full min-h-0 flex items-center justify-center overflow-hidden p-2 sm:p-4">
        {effectiveDeviceMode === "desktop" ? (
          /* =========================================================================
             DESKTOP STUDIO MONITOR SHELL (Expanded full-width macOS Window Chrome)
             ========================================================================= */
          <div
            className={`w-full h-full flex-1 min-h-0 ${isStandalone ? "h-[540px] sm:h-[680px]" : ""
              } rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative flex flex-col`}
          >
            {/* macOS Chrome Header Bar */}
            <div className="px-4 py-2 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 shrink-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-6 h-6 -m-1.5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close Preview"
                    title="Close Preview"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-red-400/40" />
                  </button>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-amber-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-green-400/40" />
                </div>
                <span className="text-white font-bold tracking-tight uppercase truncate max-w-[180px] sm:max-w-xs text-xs">
                  {project.client}
                </span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-zinc-400 text-[10px] hidden sm:inline">{project.category}</span>
              </div>

              {/* Simulated SSL Live Address Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-0.5 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-300 max-w-sm truncate">
                <Lock className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="truncate">
                  {project.liveUrl.startsWith("/")
                    ? `https://desimuchads.in${project.liveUrl}`
                    : project.liveUrl.replace("https://", "")}
                </span>
                <span className="ml-auto text-[10px] px-1.5 rounded bg-[#D4AF37]/20 text-[#F3E5AB] font-bold shrink-0">
                  LIVE
                </span>
              </div>

              {/* Top Right Metric Badge */}
              <div className="flex items-center gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-metric text-[10px] font-black">
                  {project.heroStat}
                </span>
              </div>
            </div>

            {/* Desktop Viewport Body (Flex-1 fills entire remaining height!) */}
            <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden bg-black flex items-center justify-center">
              {/* 1. VIDEO REEL MODE */}
              {assetType === "video_reel" && (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    key={project.liveUrl}
                    src={project.liveUrl}
                    poster={project.thumbnail}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="max-w-full max-h-full object-contain"
                  />
                  {/* Floating Video Overlay Bar */}
                  <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3 text-xs font-mono z-20">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleVideoPlayback}
                        className="p-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all font-bold cursor-pointer"
                        title={isPlaying ? "Pause Video" : "Play Video"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleVideoMute}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                        title={isMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="text-zinc-300 font-bold ml-1 hidden sm:inline">
                        {isPlaying ? "Playing Reel" : "Paused"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                      <span>4K 60FPS MASTER</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. VISUAL SHOWCASE (Artwork / Posters) */}
              {assetType === "visual_showcase" && (
                <div className="relative w-full h-full overflow-y-auto overscroll-contain bg-zinc-950 flex flex-col items-center">
                  <div className="w-full flex-1 flex items-center justify-center p-3 sm:p-6">
                    <img
                      src={project.liveUrl}
                      alt={`${project.client} High-Resolution Master Artwork`}
                      className={`transition-all duration-500 rounded-lg shadow-2xl ${zoomLevel === "fit"
                        ? "max-w-full max-h-[70vh] object-contain"
                        : "w-auto max-w-none object-cover"
                        }`}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 3. CANVA DECK SHOWCASE */}
              {assetType === "canva_deck" && (
                <div className="relative w-full h-full flex flex-col items-center justify-between bg-zinc-950 p-4 sm:p-6 overflow-hidden">
                  <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-black">
                    <img
                      src={project.thumbnail}
                      alt={`${project.client} Slide Deck Preview`}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 inset-x-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Enterprise Pitch Architecture</span>
                        </div>
                        <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                          {project.client}
                        </h4>
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playChime()}
                        className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-display text-xs font-black tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
                      >
                        <span>Launch Interactive Slides</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. LIVE INTERACTIVE WEB PLATFORM & DEMO STOREFRONT (Internal Next.js & External Production Apps) */}
              {(assetType === "internal_app" || assetType === "external_app") && (
                <div className="relative w-full h-full bg-black">
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
                      <span className="font-mono text-xs text-white/70 tracking-wider">
                        INITIALIZING INTERACTIVE PLATFORM ENGINE...
                      </span>
                    </div>
                  )}
                  <iframe
                    key={`${project.id}-${iframeKey}-desktop`}
                    src={project.liveUrl}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0"
                    title={`${project.client} Live Showcase`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* =========================================================================
             MOBILE VIEW (Optimized for both real phones & simulated iPhone 16 Pro)
             ========================================================================= */
          <div
            className={`relative flex flex-col overflow-hidden ${isRealMobile
              ? "w-full h-full flex-1 rounded-none border-0 bg-black"
              : `w-[360px] sm:w-[380px] h-[92%] max-h-[740px] rounded-[48px] border-[10px] border-zinc-800 shadow-[0_25px_80px_rgba(0,0,0,0.98)] bg-black ring-1 ring-white/20`
              }`}
          >
            {/* Dynamic Island / Status Bar (Only in desktop simulated iPhone view) */}
            {!isRealMobile && (
              <div className="absolute top-0 inset-x-0 h-8 px-6 flex items-center justify-between text-[11px] font-mono text-white/90 z-30 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
                <span className="font-bold tracking-tight">9:41</span>
                <div className="w-24 h-4 bg-black rounded-full border border-white/15 flex items-center justify-between px-2 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]/80 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-xs border border-white/60 p-0.5 flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Viewport Body */}
            <div
              className={`relative flex-1 w-full h-full min-h-0 bg-black flex flex-col overflow-hidden ${!isRealMobile ? "pt-8 pb-2" : ""
                }`}
            >
              {/* Internal Demo Storefront & External Production Platform in Mobile */}
              {(assetType === "internal_app" || assetType === "external_app") && (
                <div className="relative flex-1 w-full h-full bg-black">
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                      <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin mb-2" />
                      <span className="font-mono text-[10px] text-white/70">
                        LOADING PLATFORM...
                      </span>
                    </div>
                  )}
                  <iframe
                    key={`${project.id}-${iframeKey}-mobile`}
                    src={project.liveUrl}
                    onLoad={() => setIframeLoading(false)}
                    className="w-full h-full border-0"
                    title={`${project.client} Mobile Showcase`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation allow-top-navigation-by-user-activation"
                    loading="eager"
                  />
                </div>
              )}

              {/* Video Reel in Mobile */}
              {assetType === "video_reel" && (
                <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    key={`${project.liveUrl}-mobile`}
                    src={project.liveUrl}
                    poster={project.thumbnail}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-between z-20">
                    <button
                      type="button"
                      onClick={toggleVideoPlayback}
                      className="p-1.5 rounded-lg bg-white text-black font-bold cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={toggleVideoMute}
                      className="p-1.5 rounded-lg bg-white/10 text-white cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10.5px] font-mono text-[#F3E5AB] font-bold">
                      9:16 MOBILE REEL
                    </span>
                  </div>
                </div>
              )}

              {/* Visual Showcase in Mobile */}
              {assetType === "visual_showcase" && (
                <div className="relative flex-1 w-full h-full overflow-y-auto overscroll-contain bg-zinc-950 p-2 scrollbar-none flex flex-col items-center justify-center">
                  <img
                    src={project.liveUrl}
                    alt={`${project.client} Mobile Visual Showcase`}
                    className="w-full h-auto object-contain rounded-lg shadow"
                    loading="lazy"
                  />
                </div>
              )}



              {/* Canva Deck in Mobile */}
              {assetType === "canva_deck" && (
                <div className="relative flex-1 w-full h-full flex flex-col justify-between p-3 bg-zinc-950">
                  <div className="relative flex-1 w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src={project.thumbnail}
                      alt={`${project.client} Canva Presentation`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider block shadow"
                    >
                      Open Slides ↗
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated iPhone Home Indicator Bar */}
            {!isRealMobile && (
              <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1.5 shrink-0" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
