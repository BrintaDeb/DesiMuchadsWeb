"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

type SoundMode = "tanpura" | "pulse" | "chimes";

export function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>("tanpura");
  const [showMenu, setShowMenu] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearNodes = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    oscillatorsRef.current = [];
  };

  const startSoundscape = (mode: SoundMode) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      clearNodes();

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.001, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      if (mode === "tanpura") {
        // Indian Tanpura Chord: Root D2 (73.4Hz), Fifth A2 (110Hz), Octave D3 (146.8Hz), 220Hz
        const freqs = [73.42, 110.0, 146.83, 220.0];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          oscGain.gain.setValueAtTime(0.08 / freqs.length, ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(master);
          osc.start();
          oscillatorsRef.current.push(osc);
        });

        // Sub-bass rhythmic breath
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || !masterGainRef.current) return;
          const beatCtx = audioCtxRef.current;
          const beatOsc = beatCtx.createOscillator();
          const beatGain = beatCtx.createGain();

          beatOsc.type = "sine";
          beatOsc.frequency.setValueAtTime(80, beatCtx.currentTime);
          beatOsc.frequency.exponentialRampToValueAtTime(30, beatCtx.currentTime + 0.18);

          beatGain.gain.setValueAtTime(0.035, beatCtx.currentTime);
          beatGain.gain.exponentialRampToValueAtTime(0.001, beatCtx.currentTime + 0.18);

          beatOsc.connect(beatGain);
          beatGain.connect(masterGainRef.current);
          beatOsc.start();
          beatOsc.stop(beatCtx.currentTime + 0.2);
        }, 900);
      } else if (mode === "pulse") {
        // Darbar Tabla Rhythmic Pulse
        const baseFreq = 65.4; // C2
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.03, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(master);
        osc.start();
        oscillatorsRef.current.push(osc);

        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || !masterGainRef.current) return;
          const beatCtx = audioCtxRef.current;
          const tablaOsc = beatCtx.createOscillator();
          const tablaGain = beatCtx.createGain();

          tablaOsc.type = "sine";
          tablaOsc.frequency.setValueAtTime(120, beatCtx.currentTime);
          tablaOsc.frequency.exponentialRampToValueAtTime(45, beatCtx.currentTime + 0.15);

          tablaGain.gain.setValueAtTime(0.06, beatCtx.currentTime);
          tablaGain.gain.exponentialRampToValueAtTime(0.001, beatCtx.currentTime + 0.15);

          tablaOsc.connect(tablaGain);
          tablaGain.connect(masterGainRef.current);
          tablaOsc.start();
          tablaOsc.stop(beatCtx.currentTime + 0.18);
        }, 550);
      } else if (mode === "chimes") {
        // Royal Temple Chimes (Pentatonic sparkling harmony)
        const chimeFreqs = [293.66, 329.63, 392.0, 440.0, 523.25, 587.33];
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || !masterGainRef.current) return;
          const chimeCtx = audioCtxRef.current;
          const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

          const chimeOsc = chimeCtx.createOscillator();
          const chimeGain = chimeCtx.createGain();

          chimeOsc.type = "sine";
          chimeOsc.frequency.setValueAtTime(freq, chimeCtx.currentTime);

          chimeGain.gain.setValueAtTime(0.04, chimeCtx.currentTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0005, chimeCtx.currentTime + 1.2);

          chimeOsc.connect(chimeGain);
          chimeGain.connect(masterGainRef.current);
          chimeOsc.start();
          chimeOsc.stop(chimeCtx.currentTime + 1.3);
        }, 700);
      }
      setIsPlaying(true);
    } catch (err) {
      console.warn("Web Audio API not allowed or blocked:", err);
      setIsPlaying(false);
    }
  };

  const stopSoundscape = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(
        0.001,
        audioCtxRef.current.currentTime + 0.35
      );
      setTimeout(() => {
        clearNodes();
        if (audioCtxRef.current) {
          audioCtxRef.current.suspend().catch(() => {});
        }
      }, 380);
    } else {
      clearNodes();
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape(soundMode);
    }
  };

  const switchMode = (newMode: SoundMode) => {
    setSoundMode(newMode);
    if (isPlaying) {
      startSoundscape(newMode);
    }
  };

  useEffect(() => {
    return () => {
      clearNodes();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => {
        if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
        setShowMenu(true);
      }}
      onMouseLeave={() => {
        menuTimeoutRef.current = setTimeout(() => setShowMenu(false), 300);
      }}
    >
      <button
        onClick={toggleAudio}
        type="button"
        className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-mono interactive-scale-tap ${
          isPlaying
            ? "border-white/60 bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.15)]"
            : "border-white/20 bg-[#121215]/80 hover:border-white/50 hover:bg-white/10 text-zinc-300 hover:text-white"
        }`}
        title={isPlaying ? "Mute Desi Ambient Beats" : "Play Desi Ambient Beats"}
        aria-label="Toggle ambient desi beats"
      >
        {/* 4 Animated Soundwave Bars */}
        <div className="flex items-end gap-[2.5px] h-3.5 w-3.5">
          <span
            className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-pulse" : "h-1"
            }`}
            style={{ animationDuration: "0.6s" }}
          />
          <span
            className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
              isPlaying ? "h-2.5 animate-pulse" : "h-1.5"
            }`}
            style={{ animationDuration: "0.4s" }}
          />
          <span
            className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-pulse" : "h-1"
            }`}
            style={{ animationDuration: "0.8s" }}
          />
          <span
            className={`w-[2px] bg-white rounded-full transition-all duration-300 ${
              isPlaying ? "h-2 animate-pulse" : "h-1.5"
            }`}
            style={{ animationDuration: "0.5s" }}
          />
        </div>

        <span className="hidden sm:inline tracking-wider uppercase font-semibold text-[10px]">
          {isPlaying
            ? soundMode === "tanpura"
              ? "Tanpura"
              : soundMode === "pulse"
              ? "Tabla Beat"
              : "Temple Chimes"
            : "Desi Beats"}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-white" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        )}
      </button>

      {/* Interactive Soundscape Mode Picker Flyout */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 z-50 w-48 p-2 rounded-2xl bg-[#121215]/95 backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block px-2 py-1 font-bold">
            AMBIENT SOUNDSCAPE
          </span>

          <div className="space-y-1 mt-1 font-mono text-xs">
            {[
              { id: "tanpura", label: "Tanpura Drone", desc: "Classical D-Tuning" },
              { id: "pulse", label: "Tabla Pulse", desc: "Rhythmic Sub-Bass" },
              { id: "chimes", label: "Temple Chimes", desc: "Pentatonic Shimmer" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  switchMode(mode.id as SoundMode);
                  if (!isPlaying) startSoundscape(mode.id as SoundMode);
                }}
                className={`w-full text-left p-2 rounded-xl transition-all ${
                  soundMode === mode.id
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-zinc-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold block">{mode.label}</span>
                  {soundMode === mode.id && <Sparkles className="w-3 h-3 text-black" />}
                </div>
                <span className={`text-[9px] block ${soundMode === mode.id ? "text-zinc-600" : "text-zinc-500"}`}>
                  {mode.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
