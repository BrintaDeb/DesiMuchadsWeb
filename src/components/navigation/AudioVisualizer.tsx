"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioVisualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleAudio = async () => {
    try {
      if (!isPlaying) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          await ctx.resume();
        }

        // Master gain with smooth ramp
        const master = ctx.createGain();
        master.gain.setValueAtTime(0, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2);
        master.connect(ctx.destination);
        masterGainRef.current = master;

        // Indian Tanpura Chord: Root D2 (73.4Hz), Fifth A2 (110Hz), Octave D3 (146.8Hz)
        const freqs = [73.42, 110.0, 146.83, 220.0];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const oscGain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle harmonic detuning for acoustic warmth
          osc.detune.setValueAtTime((idx - 1.5) * 4, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          oscGain.gain.setValueAtTime(0.08 / freqs.length, ctx.currentTime);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(master);
          osc.start();
        });

        // Gentle rhythmic beat simulation
        intervalRef.current = setInterval(() => {
          if (!audioCtxRef.current || !masterGainRef.current) return;
          const beatCtx = audioCtxRef.current;
          const beatOsc = beatCtx.createOscillator();
          const beatGain = beatCtx.createGain();

          beatOsc.type = "sine";
          beatOsc.frequency.setValueAtTime(80, beatCtx.currentTime);
          beatOsc.frequency.exponentialRampToValueAtTime(30, beatCtx.currentTime + 0.18);

          beatGain.gain.setValueAtTime(0.04, beatCtx.currentTime);
          beatGain.gain.exponentialRampToValueAtTime(0.001, beatCtx.currentTime + 0.18);

          beatOsc.connect(beatGain);
          beatGain.connect(masterGainRef.current);

          beatOsc.start();
          beatOsc.stop(beatCtx.currentTime + 0.2);
        }, 800);

        setIsPlaying(true);
      } else {
        // Smooth fade out
        if (masterGainRef.current && audioCtxRef.current) {
          masterGainRef.current.gain.linearRampToValueAtTime(
            0.001,
            audioCtxRef.current.currentTime + 0.4
          );
          setTimeout(() => {
            if (audioCtxRef.current) {
              audioCtxRef.current.suspend();
            }
          }, 450);
        }
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsPlaying(false);
      }
    } catch (err) {
      console.warn("Web Audio API not allowed or blocked:", err);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      type="button"
      className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0D0C12]/80 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-xs font-mono text-[#D4AF37]"
      title={isPlaying ? "Mute Desi Ambient Beats" : "Play Desi Ambient Beats"}
      aria-label="Toggle ambient desi beats"
    >
      {/* 4 Animated Soundwave Bars */}
      <div className="flex items-end gap-[3px] h-3.5 w-3.5">
        <span
          className={`w-[2.5px] bg-[#D4AF37] rounded-full transition-all duration-300 ${
            isPlaying ? "h-3.5 animate-pulse" : "h-1"
          }`}
          style={{ animationDuration: "0.6s" }}
        />
        <span
          className={`w-[2.5px] bg-[#D4AF37] rounded-full transition-all duration-300 ${
            isPlaying ? "h-2.5 animate-pulse" : "h-1.5"
          }`}
          style={{ animationDuration: "0.4s" }}
        />
        <span
          className={`w-[2.5px] bg-[#D4AF37] rounded-full transition-all duration-300 ${
            isPlaying ? "h-3.5 animate-pulse" : "h-1"
          }`}
          style={{ animationDuration: "0.8s" }}
        />
        <span
          className={`w-[2.5px] bg-[#D4AF37] rounded-full transition-all duration-300 ${
            isPlaying ? "h-2 animate-pulse" : "h-1.5"
          }`}
          style={{ animationDuration: "0.5s" }}
        />
      </div>

      <span className="hidden sm:inline tracking-wider uppercase font-semibold text-[10px]">
        {isPlaying ? "Desi Beats: ON" : "Desi Beats"}
      </span>

      {isPlaying ? (
        <Volume2 className="w-3.5 h-3.5 text-[#E11D48]" />
      ) : (
        <VolumeX className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
      )}
    </button>
  );
}
