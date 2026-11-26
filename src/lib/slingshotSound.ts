"use client";

import { sound } from "./sound";

/**
 * Procedural Web Audio synthesizer for the Moustache Slingshot.
 * Replicates elastic band tension pitch-sliding, rubber twang,
 * peel/landing boings, aerodynamic canopy breeze, and impact bursts.
 * Strictly respects the global Desi Muchads mute toggle (`sound.isSoundMuted()`).
 */
class SlingshotSoundEngine {
  private ctx: AudioContext | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private slideState: {
    o1: OscillatorNode;
    o2: OscillatorNode;
    lfo: OscillatorNode;
    dep: GainNode;
    lp: BiquadFilterNode;
    g: GainNode;
  } | null = null;
  private lastImpactAt = 0;

  // Minor/Major warm playful pentatonic scale matching crisp acoustic feedback
  private readonly scale = [0, 2, 4, 7, 9];

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined" || sound.isSoundMuted()) return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      try {
        this.ctx = new AC();
      } catch {
        return null;
      }
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => { });
    }
    if (!this.noiseBuf) {
      const sr = this.ctx.sampleRate;
      const buf = this.ctx.createBuffer(1, sr, sr);
      const data = buf.getChannelData(0);
      for (let i = 0; i < sr; i++) data[i] = Math.random() * 2 - 1;
      this.noiseBuf = buf;
    }
    return this.ctx;
  }

  private hz(step: number): number {
    const baseMidi = 54;
    const len = this.scale.length;
    const idx = ((step % len) + len) % len;
    const oct = Math.floor(step / len);
    const midi = baseMidi + this.scale[idx] + 12 * oct;
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  private env(g: GainNode, t: number, peak: number, att: number, dec: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t + att + dec);
  }

  private noiseBurst(
    c: AudioContext,
    t: number,
    dur: number,
    type: BiquadFilterType,
    freq: number,
    q: number,
    peak: number,
    att = 0.002
  ): BiquadFilterNode | null {
    if (!this.noiseBuf) return null;
    const src = c.createBufferSource();
    src.buffer = this.noiseBuf;
    const filter = c.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, t);
    filter.Q.value = q;
    const g = c.createGain();
    this.env(g, t, peak, att, dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(c.destination);
    src.start(t, Math.random() * 0.45);
    src.stop(t + att + dur + 0.05);
    return filter;
  }

  public peel(): void {
    const c = this.ensureContext();
    if (!c) return;
    try {
      const t = c.currentTime + 0.004;
      let cursor = t;
      for (let k = 0; k < 10; k++) {
        this.noiseBurst(c, cursor, 0.004, "highpass", 2400 + k * 140, 0.8, 0.025, 0.001);
        cursor += 0.016 * Math.pow(0.86, k);
      }
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(this.hz(5) * 0.84, t + 0.015);
      o.frequency.exponentialRampToValueAtTime(this.hz(5), t + 0.09);
      this.env(g, t + 0.015, 0.04, 0.018, 0.08);
      o.connect(g);
      g.connect(c.destination);
      o.start(t + 0.015);
      o.stop(t + 0.14);
    } catch { }
  }

  public slide(vel: number, pullRatio: number): void {
    const c = this.ensureContext();
    if (!c) return;
    try {
      const n = c.currentTime;
      const ratio = Math.max(0, Math.min(1, pullRatio));
      const f = this.hz(2 + Math.round(ratio * 10));
      if (!this.slideState) {
        const lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 1800;
        lp.Q.value = 0.6;

        const g = c.createGain();
        g.gain.value = 0.0001;
        lp.connect(g);
        g.connect(c.destination);

        const o1 = c.createOscillator();
        const o2 = c.createOscillator();
        const g2 = c.createGain();
        o1.type = "sine";
        o2.type = "triangle";
        g2.gain.value = 0.16;
        o1.frequency.value = f;
        o2.frequency.value = f * 2;
        o1.connect(lp);
        o2.connect(g2);
        g2.connect(lp);

        const lfo = c.createOscillator();
        const dep = c.createGain();
        lfo.frequency.value = 5.5;
        dep.gain.value = 18;
        lfo.connect(dep);
        dep.connect(o1.detune);
        dep.connect(o2.detune);

        [o1, o2, lfo].forEach((osc) => osc.start(n));
        this.slideState = { o1, o2, lfo, dep, lp, g };
      }

      const st = this.slideState;
      st.o1.frequency.setTargetAtTime(f, n, 0.045);
      st.o2.frequency.setTargetAtTime(f * 2, n, 0.045);
      st.dep.gain.setTargetAtTime(10 + ratio * 28, n, 0.08);
      st.lp.frequency.setTargetAtTime(900 + ratio * 2200, n, 0.08);
      const lvl = Math.min(0.11, 0.03 + vel * 0.045);
      st.g.gain.cancelScheduledValues(n);
      st.g.gain.setTargetAtTime(lvl, n, 0.04);
      st.g.gain.setTargetAtTime(0.0001, n + 0.14, 0.12);
    } catch { }
  }

  public slideEnd(): void {
    if (!this.slideState || !this.ctx) return;
    try {
      const n = this.ctx.currentTime;
      const st = this.slideState;
      st.g.gain.cancelScheduledValues(n);
      st.g.gain.setTargetAtTime(0.0001, n, 0.05);
      [st.o1, st.o2, st.lfo].forEach((osc) => osc.stop(n + 0.35));
      this.slideState = null;
    } catch {
      this.slideState = null;
    }
  }

  public twang(power: number): void {
    const c = this.ensureContext();
    if (!c) return;
    try {
      const t = c.currentTime + 0.003;
      const p = Math.min(1, Math.max(0.3, power));
      const f0 = this.hz(5);
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(f0 * 1.45, t);
      o.frequency.exponentialRampToValueAtTime(f0 * 0.52, t + 0.32);
      this.env(g, t, 0.08 + 0.1 * p, 0.002, 0.38);

      const lfo = c.createOscillator();
      const lg = c.createGain();
      lfo.frequency.value = 26;
      lg.gain.setValueAtTime(f0 * 0.09, t);
      lg.gain.exponentialRampToValueAtTime(1, t + 0.35);
      lfo.connect(lg);
      lg.connect(o.frequency);

      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.44);
      lfo.start(t);
      lfo.stop(t + 0.44);

      const sweep = this.noiseBurst(c, t, 0.28, "bandpass", 700, 0.8, 0.03 + 0.05 * p, 0.018);
      if (sweep) sweep.frequency.exponentialRampToValueAtTime(2400 + 2200 * p, t + 0.3);
    } catch { }
  }

  public boom(): void {
    const nowMs = performance.now();
    if (nowMs - this.lastImpactAt < 85) return;
    this.lastImpactAt = nowMs;

    const c = this.ensureContext();
    if (!c) return;
    try {
      const t = c.currentTime + 0.003;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(132, t);
      o.frequency.exponentialRampToValueAtTime(42, t + 0.26);
      this.env(g, t, 0.14, 0.002, 0.3);
      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.36);

      const nf = this.noiseBurst(c, t, 0.22, "lowpass", 2200, 0.6, 0.09, 0.003);
      if (nf) nf.frequency.exponentialRampToValueAtTime(280, t + 0.24);

      [5, 7, 9, 12].forEach((step, k) => {
        const note = c.createOscillator();
        const ng = c.createGain();
        note.type = "sine";
        note.frequency.setValueAtTime(this.hz(step), t + 0.05 + k * 0.05);
        this.env(ng, t + 0.05 + k * 0.05, 0.045, 0.003, 0.28);
        note.connect(ng);
        ng.connect(c.destination);
        note.start(t + 0.05 + k * 0.05);
        note.stop(t + 0.4 + k * 0.05);
      });
    } catch { }
  }

  public slap(): void {
    const c = this.ensureContext();
    if (!c) return;
    try {
      const t = c.currentTime + 0.003;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(56, t + 0.1);
      this.env(g, t, 0.14, 0.001, 0.12);
      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.15);
      this.noiseBurst(c, t, 0.06, "lowpass", 1500, 0.5, 0.09);
    } catch { }
  }

  public boing(): void {
    const c = this.ensureContext();
    if (!c) return;
    try {
      const t = c.currentTime + 0.003;
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(155, t);
      o.frequency.exponentialRampToValueAtTime(325, t + 0.13);
      o.frequency.exponentialRampToValueAtTime(255, t + 0.45);
      this.env(g, t, 0.09, 0.004, 0.45);

      const lfo = c.createOscillator();
      const lg = c.createGain();
      lfo.frequency.value = 16;
      lg.gain.setValueAtTime(65, t);
      lg.gain.exponentialRampToValueAtTime(1, t + 0.45);
      lfo.connect(lg);
      lg.connect(o.frequency);

      o.connect(g);
      g.connect(c.destination);
      o.start(t);
      o.stop(t + 0.55);
      lfo.start(t);
      lfo.stop(t + 0.55);
    } catch { }
  }

  public breeze(durationSec = 2.8): void {
    const c = this.ensureContext();
    if (!c || !this.noiseBuf) return;
    try {
      const t = c.currentTime + 0.01;
      const d = Math.max(1.4, Math.min(5, durationSec));
      const src = c.createBufferSource();
      src.buffer = this.noiseBuf;
      src.loop = true;

      const filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 0.7;
      filter.frequency.setValueAtTime(420, t);
      for (let x = t + 0.3; x < t + d; x += 0.5) {
        filter.frequency.setTargetAtTime(300 + Math.random() * 580, x, 0.3);
      }

      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.025, t + 0.8);
      g.gain.setValueAtTime(0.025, t + Math.max(0.85, d - 1.0));
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);

      src.connect(filter);
      filter.connect(g);
      g.connect(c.destination);
      src.start(t, Math.random() * 0.4);
      src.stop(t + d + 0.1);
    } catch { }
  }
}

export const slingshotSound = new SlingshotSoundEngine();

