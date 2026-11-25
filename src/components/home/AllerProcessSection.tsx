"use client";

import React, { useState, useEffect, useRef } from "react";
import "./AllerProcessSection.css";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
  x: number;
  y: number;
}

interface TracePath {
  d: string;
  from: [number, number];
  to: [number, number];
  travel: number;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Business goals, users, constraints and technical context.",
    icon: "icon-discover.svg",
    x: 0,
    y: 0,
  },
  {
    number: "02",
    title: "Define",
    description: "Product strategy, priorities, architecture and success criteria.",
    icon: "icon-define.svg",
    x: 606,
    y: 0,
  },
  {
    number: "03",
    title: "Design",
    description: "UX flows, visual system, prototypes and validation.",
    icon: "icon-design.svg",
    x: 0,
    y: 362,
  },
  {
    number: "04",
    title: "Build and scale",
    description: "Development, implementation support and continuous improvement.",
    icon: "icon-build.svg",
    x: 606,
    y: 362,
  },
];

const TRACE_PATHS: TracePath[] = [
  { d: "M356 116H598", from: [356, 116], to: [598, 116], travel: 750 },
  {
    d: "M780.5 240V254L159.5 340V354",
    from: [780.5, 240],
    to: [159.5, 354],
    travel: 1150,
  },
  { d: "M356 478H598", from: [356, 478], to: [598, 478], travel: 750 },
];

interface AnimState {
  active: number;
  drawn: number;
  traveling: number | null;
  complete: boolean;
  resetting: boolean;
}

const INITIAL_ANIM: AnimState = {
  active: 0,
  drawn: 0,
  traveling: null,
  complete: false,
  resetting: false,
};

const ASSET_BASE = "/process";

/**
 * Exact recreation of Aller Studio's `10-process` section:
 * "A clear process for complex products."
 * Preserves the exact visual design tokens, typography (Rajdhani + sans),
 * white floating step cards, neon lime pulsing central key, violet circuit traces,
 * crosshair markers, mobile vertical spine timeline, and bottom diagonal stripe ruler.
 */
export function AllerProcessSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLOListElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const leadRefs = useRef<(HTMLElement | null)[]>([]);

  const [scale, setScale] = useState(1);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);
  const [anim, setAnim] = useState<AnimState>(INITIAL_ANIM);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 954);
    };
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    updateScale();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = mobileListRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsMobileVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (
      !isMobileVisible ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(() => {
      setMobileActive((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 1900);
    return () => clearInterval(timer);
  }, [isMobileVisible]);

  useEffect(() => {
    if (!isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let cancelled = false;
    const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";
    const easeInOut = "cubic-bezier(0.37, 0, 0.63, 1)";
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        setTimeout(res, ms);
      });

    const pulseKey = (finalBurst: boolean) => {
      keyRef.current?.animate(
        finalBurst
          ? [
              { transform: "translateY(0) scale(1)" },
              { transform: "translateY(4px) scale(0.92)", offset: 0.25, easing: easeInOut },
              { transform: "translateY(-2px) scale(1.03)", offset: 0.55, easing: easeOut },
              { transform: "translateY(0) scale(1)" },
            ]
          : [
              { transform: "translateY(0) scale(1)" },
              { transform: "translateY(1.5px) scale(0.965)", offset: 0.3, easing: easeInOut },
              { transform: "translateY(0) scale(1)" },
            ],
        { duration: finalBurst ? 900 : 520, easing: easeOut }
      );

      haloRef.current?.animate(
        [
          { opacity: 0.8, transform: "scale(1)" },
          { opacity: 1, transform: `scale(${finalBurst ? 1.35 : 1.08})`, offset: 0.35 },
          { opacity: 0.8, transform: "scale(1)" },
        ],
        { duration: finalBurst ? 1400 : 900, easing: easeOut }
      );

      if (finalBurst) {
        ringRef.current?.animate(
          [
            { opacity: 0.9, transform: "scale(0.95)" },
            { opacity: 0, transform: "scale(1.6)" },
          ],
          { duration: 900, easing: easeInOut }
        );
      }
    };

    const launchLead = (idx: number) => {
      const lead = leadRefs.current[idx];
      lead?.animate(
        [
          { offsetDistance: "0%", opacity: 0 },
          { opacity: 1, offset: 0.12 },
          { offsetDistance: "100%", opacity: 1, offset: 0.88 },
          { offsetDistance: "100%", opacity: 0 },
        ],
        { duration: TRACE_PATHS[idx].travel + 250, easing: easeOut }
      );
    };

    (async () => {
      try {
        let firstPass = true;
        while (!cancelled) {
          await sleep(firstPass ? 400 : 1700);
          if (cancelled) break;
          if (!firstPass) setAnim(INITIAL_ANIM);
          firstPass = false;

          for (let i = 0; i < TRACE_PATHS.length; i++) {
            if (cancelled) break;
            setAnim((prev) => ({ ...prev, traveling: i }));
            pulseKey(false);
            launchLead(i);
            await sleep(TRACE_PATHS[i].travel);
            if (cancelled) break;
            setAnim((prev) => ({
              ...prev,
              traveling: null,
              drawn: i + 1,
              active: i + 1,
            }));
            await sleep(1700);
          }

          if (cancelled) break;
          setAnim((prev) => ({ ...prev, complete: true }));
          pulseKey(true);
          await sleep(1500);
          if (cancelled) break;
          setAnim((prev) => ({ ...prev, complete: false, resetting: true }));
          await sleep(600);
        }
      } catch {
        // Ignore cancelled animation cycle
      }
    })();

    return () => {
      cancelled = true;
      setAnim(INITIAL_ANIM);
    };
  }, [isVisible]);

  const effectiveActive = hoveredIdx ?? anim.active;
  const isTraceOn = (idx: number) => anim.drawn > idx || anim.traveling === idx;

  const nodes = TRACE_PATHS.flatMap((path, idx) => [
    { pos: path.from, on: isTraceOn(idx), key: `${idx}-from` },
    { pos: path.to, on: anim.drawn > idx, key: `${idx}-to` },
  ]);

  return (
    <section
      id="process"
      aria-label="Our 4-step process"
      className="relative w-full bg-transparent text-white border-t border-white/10 overflow-hidden scroll-mt-24"
    >
      <div className="relative px-4 pt-20 pb-16 md:px-8 md:pt-28 lg:px-6 lg:pt-[120px] lg:pb-[72px] max-w-7xl mx-auto">
        {/* Corner + Crosshair Accents */}
        <div className="max-lg:hidden" aria-hidden="true">
          <span className="pointer-events-none block size-6 absolute top-[280px] left-[4%]">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/20" />
          </span>
          <span className="pointer-events-none block size-6 absolute bottom-[52px] right-[4%]">
            <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/20" />
            <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/20" />
          </span>
        </div>

        {/* Top Asymmetric Split Heading Matching Site Typography */}
        <div className="flex flex-col gap-6 lg:mx-auto lg:w-[1100px] max-w-full lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="lg:w-[540px]">
            <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-3">
              [ 05 / EXECUTION ARCHITECTURE ]
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-[1.02]">
              <span className="text-zinc-400">A Clear Process</span>{" "}
              <span className="text-white">For Complex Products.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-400 lg:w-[440px] font-sans">
            Products, brands and digital systems designed to solve real problems
            and prepare our clients for their next stage of growth.
          </p>
        </div>

        {/* Mobile Vertical Timeline (< lg) */}
        <div className="mt-12 lg:hidden">
          <ol ref={mobileListRef} className="relative flex flex-col gap-4 pl-10">
            <span
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-[11px] w-px bg-white/15"
            />
            <span
              aria-hidden="true"
              className="absolute top-6 left-[11px] w-0.5 -translate-x-[0.5px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.45)] transition-[height] duration-700"
              style={{
                height: `calc((100% - 48px) * ${mobileActive / (PROCESS_STEPS.length - 1)})`,
              }}
            />

            {PROCESS_STEPS.map((step, idx) => {
              const isCardActive = idx === mobileActive;
              return (
                <li key={step.number} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-6 -left-10 size-6"
                  >
                    <img
                      src={`${ASSET_BASE}/node-idle.svg`}
                      alt=""
                      className="absolute inset-0 size-full"
                    />
                    <img
                      src={`${ASSET_BASE}/node-active.svg`}
                      alt=""
                      className={`absolute inset-0 size-full transition-[opacity,transform] duration-500 ${
                        isCardActive
                          ? "scale-100 opacity-100"
                          : "scale-[0.6] opacity-0"
                      }`}
                    />
                  </span>

                  <article
                    onClick={() => {
                      sound.playPluck(160 + idx * 20);
                      haptics.selection();
                      setMobileActive(idx);
                    }}
                    className={`relative flex min-h-[176px] flex-col justify-between gap-4 overflow-hidden rounded-2xl p-5 border transition-[transform,box-shadow,background-color,border-color] duration-700 cursor-pointer ${
                      isCardActive
                        ? "-translate-y-1 bg-[#141416] border-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.08)]"
                        : "bg-[#0c0c0b] border-white/15"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        aria-hidden="true"
                        className={`size-16 transition-colors duration-500 ${
                          isCardActive ? "bg-white" : "bg-zinc-600"
                        }`}
                        style={{
                          maskImage: `url(${ASSET_BASE}/${step.icon})`,
                          WebkitMaskImage: `url(${ASSET_BASE}/${step.icon})`,
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        className={`font-metric text-[56px] leading-[48px] font-bold tracking-tight transition-colors duration-500 ${
                          isCardActive
                            ? "text-white"
                            : "text-white/15"
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3
                        className={`font-display text-lg leading-6 font-extrabold uppercase tracking-tight transition-colors duration-500 ${
                          isCardActive ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        <span className="sr-only">{step.number}. </span>
                        {step.title}
                      </h3>
                      <p
                        className={`text-xs leading-[18px] font-medium transition-colors duration-500 ${
                          isCardActive ? "text-zinc-300" : "text-zinc-500"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop Interactive 2x2 Flow Stage (>= lg) */}
        <div className="mt-[56px] px-4 max-lg:hidden">
          <div
            ref={wrapRef}
            className="dm-proc-wrap"
            style={{ "--s": scale } as React.CSSProperties}
          >
            <div
              className="dm-proc-board"
              data-complete={anim.complete ? "true" : undefined}
              data-resetting={anim.resetting ? "true" : undefined}
            >
              {/* Connecting Circuit Trace Paths */}
              <svg
                className="dm-proc-svg"
                width={954}
                height={594}
                viewBox="0 0 954 594"
                fill="none"
                aria-hidden="true"
              >
                {TRACE_PATHS.map((path) => (
                  <path
                    key={path.d}
                    d={path.d}
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth={1}
                    strokeLinejoin="round"
                  />
                ))}
                {TRACE_PATHS.map((path, idx) => (
                  <path
                    key={`p-${path.d}`}
                    className="dm-proc-progress"
                    d={path.d}
                    pathLength={1}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-on={isTraceOn(idx) ? "true" : undefined}
                    style={{ "--travel": `${path.travel}ms` } as React.CSSProperties}
                  />
                ))}
              </svg>

              {/* Glowing Leading Trace Sparks */}
              {TRACE_PATHS.map((path, idx) => (
                <i
                  key={`lead-${path.d}`}
                  ref={(el) => {
                    leadRefs.current[idx] = el;
                  }}
                  className="dm-proc-lead"
                  style={{ offsetPath: `path('${path.d}')` }}
                  aria-hidden="true"
                />
              ))}

              {/* Floating 01-04 Process Cards */}
              {PROCESS_STEPS.map((step, idx) => {
                const isCardActive = effectiveActive === idx || anim.complete;
                return (
                  <div
                    key={step.number}
                    className="dm-proc-float"
                    style={{ animationDelay: `${-idx}s` }}
                  >
                    <article
                      className="dm-proc-card"
                      style={{ left: step.x, top: step.y }}
                      data-active={isCardActive ? "true" : undefined}
                      onMouseEnter={() => {
                        setHoveredIdx(idx);
                        sound.playPluck(150 + idx * 20);
                      }}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <span
                        className="dm-proc-icon"
                        style={{
                          maskImage: `url(${ASSET_BASE}/${step.icon})`,
                          WebkitMaskImage: `url(${ASSET_BASE}/${step.icon})`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="dm-proc-number" aria-hidden="true">
                        {step.number}
                      </span>
                      <div className="dm-proc-copy">
                        <h3 className="dm-proc-title">{step.title}</h3>
                        <p className="dm-proc-description">{step.description}</p>
                      </div>
                    </article>
                  </div>
                );
              })}

              {/* Center Neon Lime Halo */}
              <div ref={haloRef} className="dm-proc-halo" aria-hidden="true" />

              {/* Center Tactile Lime Key & Shockwave Ring */}
              <div className="dm-proc-key-wrap" aria-hidden="true">
                <span ref={ringRef} className="dm-proc-ring" />
                <div ref={keyRef} className="dm-proc-key">
                  <div
                    className="dm-proc-key-face"
                    style={{
                      maskImage: `url(${ASSET_BASE}/key-mask.svg)`,
                      WebkitMaskImage: `url(${ASSET_BASE}/key-mask.svg)`,
                    }}
                  />
                  <img
                    className="dm-proc-key-overlay"
                    src={`${ASSET_BASE}/key-overlay.svg`}
                    alt=""
                  />
                  <div className="dm-proc-key-softlight">
                    <img src={`${ASSET_BASE}/key-softlight.svg`} alt="" />
                  </div>
                  <div className="dm-proc-key-bar">
                    <div
                      className="dm-proc-key-bar-fill"
                      style={{
                        maskImage: `url(${ASSET_BASE}/key-bar-mask.svg)`,
                        WebkitMaskImage: `url(${ASSET_BASE}/key-bar-mask.svg)`,
                      }}
                    />
                  </div>
                  <div className="dm-proc-key-rim">
                    <img src={`${ASSET_BASE}/key-rim.svg`} alt="" />
                  </div>
                </div>
              </div>

              {/* Connection Circuit Nodes */}
              {nodes.map((node) => (
                <span
                  key={node.key}
                  className="dm-proc-node"
                  style={{ left: node.pos[0] - 12, top: node.pos[1] - 12 }}
                  data-on={node.on ? "true" : undefined}
                  aria-hidden="true"
                >
                  <img src={`${ASSET_BASE}/node-idle.svg`} alt="" />
                  <img
                    className="dm-proc-node-on"
                    src={`${ASSET_BASE}/node-active.svg`}
                    alt=""
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Matte Obsidian Diagonal Ruled Strip */}
      <div
        aria-hidden="true"
        className="w-full h-10 sm:h-12 border-t border-white/10 bg-transparent"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-60deg, transparent 0 31px, rgba(255, 255, 255, 0.08) 31px 32px)",
        }}
      />
    </section>
  );
}
