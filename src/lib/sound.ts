"use client";

import { haptics } from "./haptics";

/**
 * Desi Muchads Procedural Sound Engine (Web Audio API)
 * Zero external audio files (0 KB payload).
 * Generates tactile mechanical plucks, crystal chimes, and micro-ticks procedurally.
 * Coupled with synchronized native mobile haptic feedback.
 */

type SoundListener = (muted: boolean) => void;
type PlaybackListener = (type: "pluck" | "chime" | "whoosh" | "tick") => void;

class SoundController {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = true; // Default to muted for polite UX; user can toggle with 1-click
  private listeners: Set<SoundListener> = new Set();
  private playbackListeners: Set<PlaybackListener> = new Set();
  private initialized: boolean = false;
  private hardwareUnlocked: boolean = false;
  private gestureListenersBound: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dm_sound_muted");
      if (stored !== null) {
        this.isMuted = stored === "true";
      } else {
        this.isMuted = false; // Enabled by default if not set
      }
      this.bindGestureUnlock();
    }
  }

  private bindGestureUnlock() {
    if (this.gestureListenersBound || typeof window === "undefined") return;
    this.gestureListenersBound = true;
    const onFirstGesture = () => {
      this.unlock();
    };
    window.addEventListener("touchstart", onFirstGesture, { passive: true, capture: true });
    window.addEventListener("pointerdown", onFirstGesture, { passive: true, capture: true });
    window.addEventListener("keydown", onFirstGesture, { passive: true, capture: true });
    window.addEventListener("click", onFirstGesture, { passive: true, capture: true });
  }

  private createOrResumeContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch {
          return null;
        }
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    this.initialized = true;
    return this.audioCtx;
  }

  /**
   * Synchronously unlocks Web Audio hardware on iOS Safari & Android Chrome
   * inside user gesture handlers (pointerdown / touchstart / click / keydown).
   */
  public unlock(): AudioContext | null {
    const ctx = this.createOrResumeContext();
    if (!ctx) return null;
    if (!this.hardwareUnlocked) {
      try {
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gain = ctx.createGain();
        gain.gain.value = 0.0001;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(0);
        if (ctx.state === "running") {
          this.hardwareUnlocked = true;
        }
      } catch {}
    }
    return ctx;
  }

  public getAudioContext(): AudioContext | null {
    return this.createOrResumeContext();
  }

  private initAudio() {
    this.unlock();
  }

  private withRunningContext(schedule: (ctx: AudioContext) => void): void {
    if (this.isMuted || typeof window === "undefined") return;
    const ctx = this.unlock();
    if (!ctx) return;
    if (ctx.state === "running") {
      schedule(ctx);
      return;
    }
    if (ctx.state === "suspended") {
      ctx
        .resume()
        .then(() => {
          if (!this.isMuted && ctx.state === "running") {
            schedule(ctx);
          }
        })
        .catch(() => {});
    }
  }

  public subscribe(listener: SoundListener): () => void {
    this.listeners.add(listener);
    listener(this.isMuted);
    return () => this.listeners.delete(listener);
  }

  public onPlayback(listener: PlaybackListener): () => void {
    this.playbackListeners.add(listener);
    return () => this.playbackListeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isMuted));
  }

  private notifyPlayback(type: "pluck" | "chime" | "whoosh" | "tick") {
    this.playbackListeners.forEach((l) => l(type));
  }

  public toggle(): boolean {
    this.initAudio();
    this.isMuted = !this.isMuted;
    haptics.medium();
    if (typeof window !== "undefined") {
      localStorage.setItem("dm_sound_muted", String(this.isMuted));
    }
    this.notify();
    if (!this.isMuted) {
      this.playChime();
    }
    return this.isMuted;
  }

  public getStatus(): boolean {
    return !this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public isAudioReady(): boolean {
    return !this.isMuted && this.audioCtx?.state === "running";
  }

  /**
   * Procedural Mechanical Pluck (Low-frequency tactile resonant decay)
   */
  public playPluck(frequency: number = 220): void {
    haptics.light();
    this.withRunningContext((ctx) => {
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(Math.max(40, frequency * 0.4), now + 0.12);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
        this.notifyPlayback("pluck");
      } catch {
        // AudioContext unavailable or backgrounded
      }
    });
  }

  /**
   * Procedural Crystal Chime (Harmonic dual-oscillator chord with shimmering decay)
   */
  public playChime(): void {
    haptics.selection();
    this.withRunningContext((ctx) => {
      try {
        const now = ctx.currentTime;

        // Note 1: E5 (659.25 Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(659.25, now);

        gain1.gain.setValueAtTime(0.06, now);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.46);

        // Note 2: B5 (987.77 Hz) - Slight shimmer delay
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(987.77, now + 0.05);

        gain2.gain.setValueAtTime(0.05, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.05);
        osc2.stop(now + 0.56);

        this.notifyPlayback("chime");
      } catch {}
    });
  }

  /**
   * Procedural Micro-Tick (Fast 8ms click for slider movement)
   */
  public playTick(): void {
    haptics.light();
    this.withRunningContext((ctx) => {
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.015);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.018);
        this.notifyPlayback("tick");
      } catch {}
    });
  }

  /**
   * Procedural Modal Whoosh
   */
  public playWhoosh(): void {
    haptics.medium();
    this.withRunningContext((ctx) => {
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(340, now + 0.15);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.19);
        this.notifyPlayback("whoosh");
      } catch {}
    });
  }

  /**
   * Soft continuous ambient studio drone for Exhibition Art Studios.
   */
  public startAmbientDrone(themeKey = "ganesha"): void {
    this.stopAmbientDrone();
    haptics.selection();
    this.withRunningContext((ctx) => {
      try {
        const now = ctx.currentTime;
        const rootHz =
          themeKey.includes("samurai")
            ? 98.0
            : themeKey.includes("neotokyo")
              ? 130.81
              : themeKey.includes("varanasi")
                ? 110.0
                : 123.47;

        const master = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(520, now);

        master.gain.setValueAtTime(0.0001, now);
        master.gain.exponentialRampToValueAtTime(0.045, now + 1.1);

        filter.connect(master);
        master.connect(ctx.destination);

        const oscA = ctx.createOscillator();
        const oscB = ctx.createOscillator();
        const oscC = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();

        oscA.type = "sine";
        oscA.frequency.setValueAtTime(rootHz, now);
        oscB.type = "triangle";
        oscB.frequency.setValueAtTime(rootHz * 1.498, now);
        oscC.type = "sine";
        oscC.frequency.setValueAtTime(rootHz * 2.0, now);

        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.18, now);
        lfoGain.gain.setValueAtTime(140, now);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const gA = ctx.createGain();
        const gB = ctx.createGain();
        const gC = ctx.createGain();
        gA.gain.setValueAtTime(0.55, now);
        gB.gain.setValueAtTime(0.22, now);
        gC.gain.setValueAtTime(0.18, now);

        oscA.connect(gA);
        oscB.connect(gB);
        oscC.connect(gC);
        gA.connect(filter);
        gB.connect(filter);
        gC.connect(filter);

        oscA.start(now);
        oscB.start(now);
        oscC.start(now);
        lfo.start(now);

        activeAmbientCleanup = () => {
          try {
            const stopAt = ctx.currentTime + 0.45;
            master.gain.cancelScheduledValues(ctx.currentTime);
            master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), ctx.currentTime);
            master.gain.exponentialRampToValueAtTime(0.0001, stopAt);
            oscA.stop(stopAt + 0.05);
            oscB.stop(stopAt + 0.05);
            oscC.stop(stopAt + 0.05);
            lfo.stop(stopAt + 0.05);
          } catch {}
        };
        this.notifyPlayback("chime");
      } catch {}
    });
  }

  public stopAmbientDrone(): void {
    if (activeAmbientCleanup) {
      activeAmbientCleanup();
      activeAmbientCleanup = null;
    }
  }
}

let activeAmbientCleanup: (() => void) | null = null;

export const sound = new SoundController();
