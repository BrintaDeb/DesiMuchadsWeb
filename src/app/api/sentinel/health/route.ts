import { NextResponse } from "next/server";

export interface SentinelTargetCheck {
  id: string;
  name: string;
  url: string;
  status: "healthy" | "degraded" | "down";
  httpCode: number;
  latencyMs: number;
  lastChecked: string;
}

const MONITORED_PLATFORMS = [
  { id: "youandme", name: "YOU & ME Photography", url: "https://youandme-smoky.vercel.app/" },
  { id: "saffron-sage", name: "Saffron & Sage Fine Dining", url: "https://restaurantweb-ruby.vercel.app/" },
  { id: "currycraft", name: "CurryCraft Cloud Kitchen", url: "https://food-website-ashy-nine.vercel.app/" },
  { id: "pet-first", name: "Pet-First Wellness Hub", url: "https://pet-first-web.vercel.app/" },
];

export async function GET() {
  const timestamp = new Date().toISOString();

  const checks: SentinelTargetCheck[] = await Promise.all(
    MONITORED_PLATFORMS.map(async (target) => {
      const start = Date.now();
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        const res = await fetch(target.url, {
          method: "HEAD",
          signal: controller.signal,
          headers: { "User-Agent": "DesiMuchads-Sentinel-Uptime/1.0" },
        });
        clearTimeout(timeout);

        const latencyMs = Date.now() - start;
        const healthy = res.status >= 200 && res.status < 400;

        return {
          id: target.id,
          name: target.name,
          url: target.url,
          status: healthy ? "healthy" : "degraded",
          httpCode: res.status,
          latencyMs,
          lastChecked: timestamp,
        };
      } catch {
        const latencyMs = Date.now() - start;
        return {
          id: target.id,
          name: target.name,
          url: target.url,
          status: "down",
          httpCode: 0,
          latencyMs,
          lastChecked: timestamp,
        };
      }
    })
  );

  const allHealthy = checks.every((c) => c.status === "healthy");
  const avgLatency = Math.round(
    checks.reduce((acc, c) => acc + c.latencyMs, 0) / checks.length
  );

  return NextResponse.json({
    system: "Desi Muchads Platform Uptime Sentinel",
    overallStatus: allHealthy ? "100% OPERATIONAL" : "DEGRADED TELEMETRY",
    averageLatencyMs: avgLatency,
    verifiedPlatforms: checks.length,
    timestamp,
    checks,
  });
}
