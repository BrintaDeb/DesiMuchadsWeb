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
  Globe,
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
}

export function ProjectPreviewShowcase({
  project,
  initialDeviceMode = "desktop",
  className = "",
  isStandalone = false,
}: ProjectPreviewShowcaseProps) {
  const assetType: ProjectAssetType = getProjectAssetType(project);

  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">(initialDeviceMode);
  const [previewMode, setPreviewMode] = useState<"interactive" | "visual">(() => {
    // Internal Next.js demo storefronts default to interactive; others default to visual
    return project.liveUrl.startsWith("/demos/") ? "interactive" : "visual";
  });
  const [zoomLevel, setZoomLevel] = useState<"fit" | "full">("fit");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [iframeLoading, setIframeLoading] = useState<boolean>(true);

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Safety timeout on iframe spinner
  useEffect(() => {
    if (previewMode !== "interactive") return;
    const timer = setTimeout(() => {
      setIframeLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [project.id, iframeKey, previewMode]);

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

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Top Preview Control & Device Bar */}
      <div className="w-full mb-3 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
        {/* Left Side: Mode Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {assetType === "video_reel" ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
              <Film className="w-3.5 h-3.5 text-emerald-400" />
              <span>4K Motion Reel Preview</span>
            </div>
          ) : assetType === "canva_deck" ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Executive Slide Deck Showcase</span>
            </div>
          ) : assetType === "visual_showcase" ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white font-bold">
              <ImageIcon className="w-3.5 h-3.5 text-zinc-300" />
              <span>High-Res Master Artwork</span>
            </div>
          ) : (
            /* App / Web Mode Switcher */
            <div className="flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15">
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(150);
                  setPreviewMode("interactive");
                  setIframeLoading(true);
                }}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                  previewMode === "interactive"
                    ? "bg-white text-black font-bold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Interactive Live Demo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playPluck(140);
                  setPreviewMode("visual");
                }}
                className={`px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
                  previewMode === "visual"
                    ? "bg-white text-black font-bold shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Architecture Render</span>
              </button>
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
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/15 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
              title={zoomLevel === "fit" ? "Inspect 100% Full Resolution" : "Fit Image to Viewport"}
            >
              {zoomLevel === "fit" ? (
                <>
                  <ZoomIn className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">100% Zoom</span>
                </>
              ) : (
                <>
                  <ZoomOut className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Fit Viewport</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side: Device Switcher (Desktop vs Mobile) & External Action */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Device Viewport Toggle (Active for ALL project types) */}
          <div className="flex items-center p-0.5 rounded-xl bg-black/60 border border-white/15">
            <button
              type="button"
              onClick={() => {
                sound.playPluck(140);
                setDeviceMode("desktop");
              }}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                deviceMode === "desktop"
                  ? "bg-white/20 text-white font-bold"
                  : "text-zinc-500 hover:text-white"
              }`}
              title="Desktop Studio View"
            >
              <Monitor className="w-4 h-4" />
              <span className="text-[10px] hidden sm:inline">Studio</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playPluck(160);
                setDeviceMode("mobile");
              }}
              className={`p-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                deviceMode === "mobile"
                  ? "bg-white/20 text-white font-bold"
                  : "text-zinc-500 hover:text-white"
              }`}
              title="Mobile iPhone View"
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-[10px] hidden sm:inline">iPhone</span>
            </button>
          </div>

          {/* Direct External Link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPluck(190)}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0"
            title="Open Live Project in New Tab"
          >
            <span>Launch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="w-full flex items-center justify-center relative">
        {deviceMode === "desktop" ? (
          /* =========================================================================
             DESKTOP STUDIO MONITOR SHELL (macOS Window Chrome)
             ========================================================================= */
          <div
            className={`w-full ${
              isStandalone ? "h-[540px] sm:h-[680px]" : "h-[54vh] sm:h-[60vh] min-h-[380px]"
            } rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 shadow-2xl relative flex flex-col`}
          >
            {/* macOS Chrome Header Bar */}
            <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400 shrink-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-red-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-amber-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-green-400/40" />
                </div>
                <span className="text-white font-bold tracking-tight uppercase truncate max-w-[180px] sm:max-w-xs">
                  {project.client}
                </span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-zinc-400 text-[11px] hidden sm:inline">{project.category}</span>
              </div>

              {/* Simulated SSL Live Address Bar */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-300 max-w-sm truncate">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">
                  {project.liveUrl.startsWith("/")
                    ? `https://desimuchads.agency${project.liveUrl}`
                    : project.liveUrl.replace("https://", "")}
                </span>
                <span className="ml-auto text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                  LIVE
                </span>
              </div>

              {/* Top Right Controls: Frame Reload & Status */}
              <div className="flex items-center gap-2 text-[11px]">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playChime()}
                  className="px-2.5 py-1 rounded bg-white hover:bg-zinc-200 text-black font-bold text-[10px] uppercase flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  title="Open Full View in New Window"
                >
                  <span>FULL VIEW</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {previewMode === "interactive" && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playPluck(150);
                      setIframeKey((k) => k + 1);
                      setIframeLoading(true);
                    }}
                    className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Reload Live View"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-metric text-[10px] font-black">
                  {project.heroStat}
                </span>
              </div>
            </div>

            {/* Desktop Viewport Body */}
            <div className="relative flex-1 w-full h-full overflow-hidden bg-black flex items-center justify-center">
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

                  {/* Dynamic Ambient Blur Backdrop */}
                  <div
                    className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none transition-all duration-700"
                    style={{ backgroundColor: project.accentColor || "#10b981" }}
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
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>4K 60FPS MASTER</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. VISUAL SHOWCASE (Artwork / Packaging / Dielines / Posters) */}
              {assetType === "visual_showcase" && (
                <div className="relative w-full h-full overflow-y-auto overscroll-contain bg-zinc-950 flex flex-col items-center">
                  <div className="w-full flex-1 flex items-center justify-center p-3 sm:p-6">
                    <img
                      src={project.liveUrl}
                      alt={`${project.client} High-Resolution Master Artwork`}
                      className={`transition-all duration-500 rounded-lg shadow-2xl ${
                        zoomLevel === "fit"
                          ? "max-w-full max-h-[46vh] sm:max-h-[50vh] object-contain"
                          : "w-auto max-w-none object-cover"
                      }`}
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Insight Card */}
                  <div className="w-full p-4 bg-zinc-900/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shrink-0">
                    <div>
                      <span className="text-zinc-400 uppercase block text-[10px] font-bold">
                        Architectural Deliverable
                      </span>
                      <span className="text-white font-bold font-display text-sm">
                        {project.deliverables[0] || project.tagline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow"
                      >
                        <span>Open Raw High-Res Master</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 inset-x-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold uppercase mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Enterprise Canva Pitch Architecture</span>
                        </div>
                        <h4 className="font-display font-black text-xl sm:text-2xl text-white uppercase">
                          {project.client}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl font-sans mt-1">
                          {project.mushkil}
                        </p>
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

              {/* 4. APP / STOREFRONT MODE (Interactive vs Visual) */}
              {(assetType === "internal_app" || assetType === "external_app") && (
                previewMode === "interactive" ? (
                  <div className="relative w-full h-full bg-black">
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
                        <span className="font-mono text-xs text-white/70 tracking-wider">
                          CONNECTING TO INTERACTIVE STOREFRONT...
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
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Visual Architecture Render */
                  <div className="relative w-full h-full overflow-hidden bg-black flex flex-col">
                    <div className="relative flex-1 w-full overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={`${project.client} Architectural Render`}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-mono uppercase text-zinc-400 font-bold">
                            Verified Strategic Metric
                          </div>
                          <div className="font-display font-black text-lg text-white">
                            {project.heroStat}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              sound.playPluck(150);
                              setPreviewMode("interactive");
                              setIframeLoading(true);
                            }}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 cursor-pointer"
                          >
                            Switch to Live Frame
                          </button>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-white text-black font-black text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow"
                          >
                            <span>Launch Live Store</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          /* =========================================================================
             MOBILE IPHONE 16 PRO DEVICE FRAME (Titanium Bezel, Dynamic Island)
             Works seamlessly across Video Reels, Visual Showcases, and Web Apps!
             ========================================================================= */
          <div
            className={`w-[320px] sm:w-[350px] ${
              isStandalone ? "h-[580px] sm:h-[660px]" : "h-[54vh] sm:h-[60vh] min-h-[440px]"
            } rounded-[44px] border-[8px] border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-black relative overflow-hidden flex flex-col mx-auto ring-1 ring-white/20`}
          >
            {/* iPhone Top Status Bar & Dynamic Island */}
            <div className="absolute top-0 inset-x-0 h-9 px-6 flex items-center justify-between text-[11px] font-mono text-white/90 z-30 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
              <span className="font-bold tracking-tight">9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-4 bg-black rounded-full border border-white/15 flex items-center justify-between px-2 shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <div className="w-4 h-2 rounded-xs border border-white/60 p-0.5 flex items-center">
                  <div className="w-full h-full bg-white rounded-xs" />
                </div>
              </div>
            </div>

            {/* Mobile Viewport Body */}
            <div className="relative flex-1 w-full h-full pt-9 pb-3 bg-black flex flex-col overflow-hidden">
              {/* 1. VIDEO REEL IN MOBILE */}
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

                  {/* Mobile Tap Overlay for Play & Mute */}
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
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      9:16 MOBILE REEL
                    </span>
                  </div>
                </div>
              )}

              {/* 2. VISUAL SHOWCASE IN MOBILE (Scrollable within iPhone screen!) */}
              {assetType === "visual_showcase" && (
                <div className="relative flex-1 w-full h-full overflow-y-auto overscroll-contain bg-zinc-950 p-2 scrollbar-none">
                  <img
                    src={project.liveUrl}
                    alt={`${project.client} Mobile Visual Showcase`}
                    className="w-full h-auto object-contain rounded-lg shadow"
                    loading="lazy"
                  />
                  <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs font-mono">
                    <span className="text-zinc-400 block text-[10px]">SCROLLABLE ARCHITECTURE</span>
                    <span className="text-white font-bold">{project.client}</span>
                  </div>
                </div>
              )}

              {/* 3. CANVA DECK IN MOBILE */}
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
                      Open Canva Deck ↗
                    </a>
                  </div>
                </div>
              )}

              {/* 4. INTERACTIVE APP / STOREFRONT IN MOBILE */}
              {(assetType === "internal_app" || assetType === "external_app") && (
                previewMode === "interactive" ? (
                  <div className="relative flex-1 w-full h-full bg-black">
                    {iframeLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-10">
                        <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin mb-2" />
                        <span className="font-mono text-[10px] text-white/70">
                          LOADING IPHONE VIEW...
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
                      loading="lazy"
                    />
                  </div>
                ) : (
                  /* Visual Render in Mobile */
                  <div className="relative flex-1 w-full h-full overflow-y-auto overscroll-contain bg-black p-2">
                    <img
                      src={project.thumbnail}
                      alt={`${project.client} Mobile Architecture`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                )
              )}
            </div>

            {/* iPhone Home Indicator Bar */}
            <div className="w-32 h-1 bg-white/40 rounded-full mx-auto my-1.5 shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
