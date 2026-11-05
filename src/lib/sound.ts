"use client";

/**
 * Desi Sonic UI Engine
 * Lightweight, zero-latency procedural Web Audio API sound synthesis.
 * Requires 0kb external audio downloads and works offline seamlessly.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("desi_sonic_enabled");
      if (stored !== null) {
        this.isEnabled = stored === "true";
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("desi_sonic_enabled", String(this.isEnabled));
    }
    if (this.isEnabled) {
      this.playPluck();
    }
    return this.isEnabled;
  }

  public getStatus(): boolean {
    return this.isEnabled;
  }

  /**
   * Warm, muted percussive pluck for hover states
   * Low-pass filtered triangle oscillator with quick exponential decay
   */
  public playPluck(frequency: number = 140) {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      const now = ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.08);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {
      // Audio context blocked or unsupported
    }
  }

  /**
   * Deep harmonic chime for actions, calculations, and form submissions
   * 3-tone harmonic Indian Raag chord (D4 ~ 293.6Hz, A4 ~ 440Hz, D5 ~ 587.3Hz)
   */
  public playChime() {
    if (!this.isEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const freqs = [293.66, 440.0, 587.33]; // Root, Fifth, Octave

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.06 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.46);
      });
    } catch {
      // Audio context blocked or unsupported
    }
  }
}

export const sound = new SoundController();
