"use client";

/**
 * Desi Sound Controller (Silent Stub)
 * Audio has been completely removed across the website per design specification.
 * Methods remain as silent no-ops to preserve component API contracts without runtime exceptions.
 */
class SoundController {
  public subscribe = (_listener: () => void): (() => void) => {
    return () => {};
  };

  public toggle(): boolean {
    return false;
  }

  public getStatus = (): boolean => {
    return false;
  };

  public playPluck(_frequency?: number): void {
    // Audio permanently disabled
  }

  public playChime(): void {
    // Audio permanently disabled
  }
}

export const sound = new SoundController();
