"use client";

/**
 * Desi Muchads Tactile Haptics Engine
 * Provides native Web Vibration API feedback for Android & supported mobile devices,
 * with graceful non-blocking degradation for iOS Safari / desktop browsers.
 */

export type HapticPreset =
  | "light"     // 10ms - subtle mechanical tick / micro-interaction
  | "medium"    // 22ms - standard button press / navigation toggle
  | "heavy"     // 35ms - primary CTA / impact action
  | "selection" // 12ms - tab switch / segmented slider change
  | "success"   // [15, 50, 20]ms - coupon code copied / WhatsApp dispatched
  | "warning"   // [25, 40, 25]ms - validation alert
  | "error";    // [40, 60, 40]ms - submission error

const HAPTIC_PATTERNS: Record<HapticPreset, number | number[]> = {
  light: 10,
  medium: 22,
  heavy: 35,
  selection: 12,
  success: [15, 50, 20],
  warning: [25, 40, 25],
  error: [40, 60, 40],
};

class HapticsController {
  private isSupported: boolean = false;
  private hasChecked: boolean = false;

  private checkSupport(): boolean {
    if (this.hasChecked) return this.isSupported;
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      this.isSupported = "vibrate" in navigator && typeof navigator.vibrate === "function";
    }
    this.hasChecked = true;
    return this.isSupported;
  }

  /**
   * Trigger a vibration pattern safely
   */
  public vibrate(presetOrPattern: HapticPreset | number | number[] = "medium"): boolean {
    if (!this.checkSupport()) return false;

    try {
      const pattern =
        typeof presetOrPattern === "string"
          ? HAPTIC_PATTERNS[presetOrPattern] || 20
          : presetOrPattern;
      return navigator.vibrate(pattern);
    } catch {
      // Ignored: browser may prevent vibration without direct user gesture
      return false;
    }
  }

  /**
   * Subtle 10ms tap for menu items, micro-controls, and drag feedback
   */
  public light(): boolean {
    return this.vibrate("light");
  }

  /**
   * Standard 22ms tactile impulse for buttons and toggles
   */
  public medium(): boolean {
    return this.vibrate("medium");
  }

  /**
   * 35ms authoritative impact for primary conversions and bookings
   */
  public heavy(): boolean {
    return this.vibrate("heavy");
  }

  /**
   * 12ms quick click for slider steps, segmented buttons, and category chips
   */
  public selection(): boolean {
    return this.vibrate("selection");
  }

  /**
   * Distinct dual-pulse pattern [15ms, pause 50ms, 20ms] for successful actions
   */
  public success(): boolean {
    return this.vibrate("success");
  }

  /**
   * Double warning pulse
   */
  public warning(): boolean {
    return this.vibrate("warning");
  }

  /**
   * Triple heavy pulse for errors
   */
  public error(): boolean {
    return this.vibrate("error");
  }
}

export const haptics = new HapticsController();
