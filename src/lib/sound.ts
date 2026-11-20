"use client";

/**
 * Desi Muchads Procedural Sound Engine (Web Audio API)
 * Zero external audio files (0 KB payload).
 * Generates tactile mechanical plucks, crystal chimes, and micro-ticks procedurally.
 * Includes localStorage persistence and a reactive listener system for UI visualizers.
 */

type SoundListener = (muted: boolean) => void;
type PlaybackListener = (type: "pluck" | "chime" | "whoosh" | "tick") => void;

class SoundController {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = true; // Default to muted for polite UX; user can toggle with 1-click
  private listeners: Set<SoundListener> = new Set();
  private playbackListeners: Set<PlaybackListener> = new Set();
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dm_sound_muted");
      if (stored !== null) {
        this.isMuted = stored === "true";
      } else {
        this.isMuted = false; // Enabled by default if not set
      }
    }
  }

  private initAudio() {
    if (typeof window === "undefined") return;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume().catch(() => {});
    }
    this.initialized = true;
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

  /**
   * Procedural Mechanical Pluck (Low-frequency tactile resonant decay)
   */
  public playPluck(frequency: number = 220): void {
    if (this.isMuted || typeof window === "undefined") return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, frequency * 0.4), now + 0.12);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
      this.notifyPlayback("pluck");
    } catch {
      // AudioContext unavailable or backgrounded
    }
  }

  /**
   * Procedural Crystal Chime (Harmonic dual-oscillator chord with shimmering decay)
   */
  public playChime(): void {
    if (this.isMuted || typeof window === "undefined") return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);

      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.46);

      // Note 2: B5 (987.77 Hz) - Slight shimmer delay
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(987.77, now + 0.05);

      gain2.gain.setValueAtTime(0.05, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.56);

      this.notifyPlayback("chime");
    } catch {}
  }

  /**
   * Procedural Micro-Tick (Fast 8ms click for slider movement)
   */
  public playTick(): void {
    if (this.isMuted || typeof window === "undefined") return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.015);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.018);
      this.notifyPlayback("tick");
    } catch {}
  }

  /**
   * Procedural Modal Whoosh
   */
  public playWhoosh(): void {
    if (this.isMuted || typeof window === "undefined") return;
    this.initAudio();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.15);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
      this.notifyPlayback("whoosh");
    } catch {}
  }
}

export const sound = new SoundController();
