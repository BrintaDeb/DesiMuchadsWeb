"use client";

import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import * as THREE from "three";

export interface CurvedSlideItem {
  id: string | number;
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;
  accentHex?: string;
  alignTop?: boolean;
}

export interface WeichieCurvedCarouselHandle {
  scrollToItem: (index: number) => void;
  step: (delta: number) => void;
}

interface WeichieCurvedCarousel3DProps {
  items: CurvedSlideItem[];
  activeIndex: number;
  onActiveChange?: (index: number) => void;
  onCardClick?: (index: number) => void;
  planeWidth?: number;
  planeHeight?: number;
  borderRadius?: number;
  bendAmount?: number;
  carouselRadius?: number;
  carouselTiltDeg?: number;
  autoRotateSpeed?: number;
  heightClassName?: string;
  ariaLabel?: string;
  showCaptionOnCard?: boolean;
}

const SLOT_COUNT = 15; // Exact Weichie.com 5 * N(=3) = 15 slots around 2π cylinder
const TAU = Math.PI * 2;
const SLOT_ANGLE = TAU / SLOT_COUNT;

// Exact Weichie.com vertex shader: cylindrical card bend along X axis
const VERTEX_SHADER = `
uniform float uBend;
uniform vec2 uSize;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  float halfW = uSize.x * 0.5;
  float distX = clamp(abs(p.x) / halfW, 0.0, 1.0);
  p.z -= uBend * distX * distX;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

// Exact Weichie.com SDF rounded rectangle + anti-aliased border + aspect cover fragment shader
const FRAGMENT_SHADER = `
precision highp float;

uniform sampler2D uMap;
uniform float uHasMap;
uniform vec3 uColor;
uniform vec2 uSize;
uniform float uRadius;
uniform float uOpacity;
uniform float uImageAspect;
uniform float uBorderGlow;
varying vec2 vUv;

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec2 coverUv(vec2 uv, float imgAspect, float planeAspect) {
  vec2 scale = vec2(1.0);
  if (imgAspect > planeAspect) {
    scale.x = planeAspect / imgAspect;
  } else {
    scale.y = imgAspect / planeAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 orientedUv = gl_FrontFacing ? vUv : vec2(1.0 - vUv.x, vUv.y);
  vec2 uv = coverUv(orientedUv, uImageAspect, uSize.x / uSize.y);
  vec3 col = uHasMap > 0.5 ? texture2D(uMap, uv).rgb : uColor;
  vec2 p = (orientedUv - 0.5) * uSize;
  float d = sdRoundedBox(p, uSize * 0.5, uRadius);
  float aa = max(fwidth(d), 0.0015);
  float maskAlpha = 1.0 - smoothstep(-aa, aa, d);
  // Crisp rim highlight matching dark-mode studio depth
  float rim = smoothstep(-0.014, -0.002, d) * (1.0 - smoothstep(-0.002, aa, d));
  col = mix(col, vec3(0.95, 0.96, 0.99), rim * uBorderGlow);

  float alpha = maskAlpha * uOpacity;
  if (alpha <= 0.001) discard;
  gl_FragColor = vec4(col, alpha);
}
`;

function resolveSafeTextureUrl(rawUrl: string): string {
  if (!rawUrl) return "";
  if (rawUrl.startsWith("/") || rawUrl.startsWith("data:") || rawUrl.startsWith("blob:")) {
    return rawUrl;
  }
  if (rawUrl.includes("images.unsplash.com")) {
    return rawUrl;
  }
  return `/_next/image?url=${encodeURIComponent(rawUrl)}&w=1080&q=75`;
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderCardToCanvas(
  canvas: HTMLCanvasElement,
  item: CurvedSlideItem,
  img: HTMLImageElement | null,
  showCaption: boolean
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#14151b");
  bgGrad.addColorStop(1, "#090a0d");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Subtle studio radial key-light behind portrait cutouts
  const studioGlow = ctx.createRadialGradient(
    W * 0.5,
    H * 0.36,
    W * 0.05,
    W * 0.5,
    H * 0.38,
    W * 0.62
  );
  studioGlow.addColorStop(0, "rgba(255, 255, 255, 0.14)");
  studioGlow.addColorStop(0.55, "rgba(212, 175, 55, 0.05)");
  studioGlow.addColorStop(1, "rgba(9, 10, 13, 0)");
  ctx.fillStyle = studioGlow;
  ctx.fillRect(0, 0, W, H);

  if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = W / H;
    let drawW = W;
    let drawH = H;
    let offsetX = 0;
    let offsetY = 0;

    if (imgAspect > canvasAspect) {
      drawH = H;
      drawW = H * imgAspect;
      offsetX = -(drawW - W) * 0.5;
    } else {
      drawW = W;
      drawH = W / imgAspect;
      offsetY = item.alignTop ? Math.min(0, -(drawH - H) * 0.14) : -(drawH - H) * 0.5;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for (let gx = 48; gx < W; gx += 72) {
      ctx.fillRect(gx, 0, 1, H);
    }
    ctx.font = `900 ${Math.round(W * 0.08)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fillText(item.title.slice(0, 16).toUpperCase(), W / 2, H * 0.45);
  }

  if (showCaption) {
    const scrim = ctx.createLinearGradient(0, H * 0.52, 0, H);
    scrim.addColorStop(0, "rgba(7,7,9,0)");
    scrim.addColorStop(0.54, "rgba(7,7,9,0.58)");
    scrim.addColorStop(1, "rgba(7,7,9,0.92)");
    ctx.fillStyle = scrim;
    ctx.fillRect(0, H * 0.5, W, H * 0.5);

    if (item.badge) {
      ctx.font = `700 ${Math.round(W * 0.025)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      const badgeText = item.badge.toUpperCase();
      const bw = Math.min(W * 0.58, ctx.measureText(badgeText).width + 36);
      const bh = Math.round(H * 0.052);
      const bx = W - bw - 30;
      const by = 28;
      drawRoundedRectPath(ctx, bx, by, bw, bh, bh / 2);
      ctx.fillStyle = "rgba(9,10,13,0.78)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.24)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#E4E4E7";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(badgeText, bx + bw / 2, by + bh / 2 + 1, bw - 20);
    }

    const padX = Math.round(W * 0.058);
    if (item.subtitle) {
      ctx.font = `700 ${Math.round(W * 0.026)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = item.accentHex || "#F3E5AB";
      ctx.fillText(item.subtitle.toUpperCase(), padX, H - Math.round(H * 0.115), W - padX * 2);
    }

    ctx.font = `900 ${Math.round(W * 0.056)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(item.title.toUpperCase(), padX, H - Math.round(H * 0.042), W - padX * 2);
  }
}

export const WeichieCurvedCarousel3D = forwardRef<
  WeichieCurvedCarouselHandle,
  WeichieCurvedCarousel3DProps
>(function WeichieCurvedCarousel3D(
  {
    items,
    activeIndex,
    onActiveChange,
    onCardClick,
    planeWidth = 1.6,
    planeHeight = 1.6,
    borderRadius = 0.08,
    bendAmount = 0.12,
    carouselRadius = 4.3,
    carouselTiltDeg = -13,
    autoRotateSpeed = -0.04,
    heightClassName = "h-[360px] sm:h-[430px] md:h-[500px]",
    ariaLabel = "Interactive 3D curved showcase slider",
    showCaptionOnCard = true,
  },
  ref
) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const onActiveChangeRef = useRef(onActiveChange);
  const onCardClickRef = useRef(onCardClick);
  const activeIdxRef = useRef(activeIndex);

  useEffect(() => {
    onActiveChangeRef.current = onActiveChange;
  }, [onActiveChange]);

  useEffect(() => {
    onCardClickRef.current = onCardClick;
  }, [onCardClick]);

  useEffect(() => {
    activeIdxRef.current = activeIndex;
  }, [activeIndex]);

  const [webGlSupported] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("webgl2"));
    } catch {
      return false;
    }
  });

  const engineRef = useRef<{
    scrollToItem: (idx: number) => void;
    step: (delta: number) => void;
  } | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToItem: (idx: number) => engineRef.current?.scrollToItem(idx),
    step: (delta: number) => engineRef.current?.step(delta),
  }));

  useEffect(() => {
    if (!webGlSupported || items.length === 0) return;
    const stage = stageRef.current;
    const mount = canvasMountRef.current;
    if (!stage || !mount) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const getResponsiveParams = () => {
      const w = window.innerWidth;
      if (w <= 768) {
        return {
          fov: 38,
          radius: Math.min(4.05, carouselRadius * 0.94),
        };
      }
      if (w <= 1024) {
        return {
          fov: 36,
          radius: carouselRadius,
        };
      }
      return {
        fov: 24,
        radius: carouselRadius,
      };
    };

    const initial = getResponsiveParams();
    const cameraZ = 8.6;
    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(initial.fov, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    const carousel = new THREE.Group();
    scene.add(carousel);

    const applyTilt = (tiltDeg: number, radius: number) => {
      const tiltRad = THREE.MathUtils.degToRad(tiltDeg);
      carousel.rotation.x = tiltRad;
      carousel.position.y = radius * Math.sin(tiltRad);
    };
    applyTilt(carouselTiltDeg, initial.radius);

    const planeSizeVec = new THREE.Vector2(planeWidth, planeHeight);
    const sharedGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, 24, 1);

    const texW = planeHeight > planeWidth ? 768 : 896;
    const texH = Math.round(texW * (planeHeight / planeWidth));
    const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    let destroyed = false;

    // Lazy + cached texture loader (caps memory gracefully even with 50+ projects)
    const textureCache = new Map<
      number,
      { canvas: HTMLCanvasElement; tex: THREE.CanvasTexture }
    >();

    const getTextureForItem = (rawIdx: number) => {
      const idx = ((rawIdx % items.length) + items.length) % items.length;
      const existing = textureCache.get(idx);
      if (existing) return { idx, tex: existing.tex };

      const item = items[idx];
      const cvs = document.createElement("canvas");
      cvs.width = texW;
      cvs.height = texH;
      renderCardToCanvas(cvs, item, null, showCaptionOnCard);

      const tex = new THREE.CanvasTexture(cvs);
      tex.colorSpace = THREE.NoColorSpace;
      tex.anisotropy = maxAniso;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      textureCache.set(idx, { canvas: cvs, tex });

      if (item.image) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (destroyed) return;
          renderCardToCanvas(cvs, item, img, showCaptionOnCard);
          tex.needsUpdate = true;
        };
        img.src = resolveSafeTextureUrl(item.image);
      }

      return { idx, tex };
    };

    // Pre-warm initial visible ring textures immediately
    for (let s = 0; s < Math.min(items.length, SLOT_COUNT); s++) {
      getTextureForItem(s);
    }

    interface PlaneUserData {
      slotIdx: number;
      baseAngle: number;
      itemIndex: number;
      material: THREE.ShaderMaterial;
    }

    const planes: THREE.Mesh[] = [];
    const buildRingMeshes = (radius: number) => {
      for (const p of planes) {
        carousel.remove(p);
        (p.userData as PlaneUserData).material.dispose();
      }
      planes.length = 0;

      for (let slotIdx = 0; slotIdx < SLOT_COUNT; slotIdx++) {
        const baseAngle = slotIdx * SLOT_ANGLE;
        const { idx, tex } = getTextureForItem(slotIdx);

        const mat = new THREE.ShaderMaterial({
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
          transparent: true,
          side: THREE.DoubleSide,
          uniforms: {
            uMap: { value: tex },
            uHasMap: { value: 1.0 },
            uColor: { value: new THREE.Color(0x14151b) },
            uSize: { value: planeSizeVec },
            uRadius: { value: borderRadius },
            uBend: { value: bendAmount },
            uOpacity: { value: 1.0 },
            uImageAspect: { value: texW / texH },
            uBorderGlow: { value: 0.42 },
          },
        });

        const mesh = new THREE.Mesh(sharedGeo, mat);
        mesh.position.set(Math.sin(baseAngle) * radius, 0, Math.cos(baseAngle) * radius);
        mesh.rotation.y = baseAngle;
        mesh.userData = { slotIdx, baseAngle, itemIndex: idx, material: mat } satisfies PlaneUserData;
        carousel.add(mesh);
        planes.push(mesh);
      }
    };

    let currentRadius = initial.radius;
    buildRingMeshes(currentRadius);

    // Exact Weichie.com continuous orbital motion & physics constants
    const baseSpeed = prefersReduced ? 0 : autoRotateSpeed;
    let rotation = -activeIdxRef.current * SLOT_ANGLE;
    let targetRotation = rotation;
    let spinVelocity = baseSpeed;
    let isDragging = false;
    let lastPointerX = 0;
    let pointerDownX = 0;
    let pointerDownY = 0;
    let dragDistance = 0;
    let lastPointerTime = 0;
    let holdTimer: ReturnType<typeof setTimeout> | null = null;
    let isPausedHold = false;
    let tweenState: {
      startRot: number;
      endRot: number;
      startTime: number;
      durationMs: number;
    } | null = null;

    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    const minOpacityThreshold = Math.cos(Math.PI / 3); // cos(pi/3) = 0.5 exact Weichie threshold

    let lastReportedIndex = activeIdxRef.current;

    const easeInOutPower2 = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const scrollToSlot = (targetItemIndex: number) => {
      const normalizedTarget = ((targetItemIndex % items.length) + items.length) % items.length;
      const centerSlotFloat = -rotation / SLOT_ANGLE;

      // Nearest virtual slot index whose modulo equals normalizedTarget
      const modCenter = ((Math.round(centerSlotFloat) % items.length) + items.length) % items.length;
      let deltaSlots = normalizedTarget - modCenter;
      if (deltaSlots > items.length / 2) deltaSlots -= items.length;
      if (deltaSlots < -items.length / 2) deltaSlots += items.length;

      const targetVirtualSlot = Math.round(centerSlotFloat) + deltaSlots;
      const bestTargetRot = -targetVirtualSlot * SLOT_ANGLE;

      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      isPausedHold = false;
      const distRad = Math.abs(bestTargetRot - rotation);
      const frac = Math.min(distRad / TAU, 1);
      const durationMs = THREE.MathUtils.lerp(480, 1250, frac);
      tweenState = {
        startRot: rotation,
        endRot: bestTargetRot,
        startTime: performance.now(),
        durationMs,
      };
      targetRotation = bestTargetRot;
    };

    const stepRelative = (delta: number) => {
      const next = (activeIdxRef.current + delta + items.length) % items.length;
      activeIdxRef.current = next;
      onActiveChangeRef.current?.(next);
      scrollToSlot(next);
    };

    engineRef.current = {
      scrollToItem: scrollToSlot,
      step: stepRelative,
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging = true;
      lastPointerX = e.clientX;
      pointerDownX = e.clientX;
      pointerDownY = e.clientY;
      dragDistance = 0;
      spinVelocity = 0;
      lastPointerTime = performance.now();
      tweenState = null;
      isPausedHold = false;
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
      targetRotation = rotation;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointerX;
      lastPointerX = e.clientX;
      const deltaAngle = dx * 0.005;
      targetRotation += deltaAngle;
      const now = performance.now();
      const dtSec = Math.max(now - lastPointerTime, 1) / 1000;
      lastPointerTime = now;
      const instVel = deltaAngle / dtSec;
      spinVelocity = spinVelocity * (1 - 0.35) + instVel * 0.35;
      dragDistance = Math.hypot(e.clientX - pointerDownX, e.clientY - pointerDownY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;

      if (dragDistance < 6 && e.target === renderer.domElement) {
        const rect = renderer.domElement.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(pointerNDC, camera);
          const hits = raycaster.intersectObjects(planes, false);
          if (hits.length > 0) {
            const data = hits[0].object.userData as PlaneUserData;
            if (data.itemIndex !== activeIdxRef.current) {
              activeIdxRef.current = data.itemIndex;
              onActiveChangeRef.current?.(data.itemIndex);
              scrollToSlot(data.itemIndex);
            } else {
              onCardClickRef.current?.(data.itemIndex);
            }
          }
        }
      }

      if (performance.now() - lastPointerTime > 100 || prefersReduced) {
        spinVelocity = baseSpeed;
        return;
      }
      spinVelocity = THREE.MathUtils.clamp(spinVelocity, -6, 6);
    };

    stage.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth || 800;
      const nh = mount.clientHeight || 460;
      const resp = getResponsiveParams();
      camera.fov = resp.fov;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      if (Math.abs(resp.radius - currentRadius) > 0.05) {
        currentRadius = resp.radius;
        applyTilt(carouselTiltDeg, currentRadius);
        buildRingMeshes(currentRadius);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    let raf = 0;
    let prevTime = performance.now();
    let isStageVisible = true;
    let isPageVisible = !document.hidden;

    const animate = (now: number) => {
      if (destroyed || !isStageVisible || !isPageVisible) {
        raf = 0;
        return;
      }
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;

      if (isDragging) {
        rotation = targetRotation;
      } else if (tweenState) {
        const elapsed = now - tweenState.startTime;
        const p = Math.min(1, elapsed / tweenState.durationMs);
        rotation = THREE.MathUtils.lerp(
          tweenState.startRot,
          tweenState.endRot,
          easeInOutPower2(p)
        );
        targetRotation = rotation;
        if (p >= 1) {
          tweenState = null;
          isPausedHold = true;
          holdTimer = setTimeout(() => {
            isPausedHold = false;
            holdTimer = null;
          }, 1500);
        }
      } else if (isPausedHold) {
        spinVelocity = baseSpeed;
        targetRotation = rotation;
      } else {
        const damp = Math.pow(0.94, dt * 60);
        spinVelocity = baseSpeed + (spinVelocity - baseSpeed) * damp;
        if (Math.abs(spinVelocity - baseSpeed) < 0.001) {
          spinVelocity = baseSpeed;
        }
        rotation += spinVelocity * dt;
        targetRotation = rotation;
      }

      carousel.rotation.y = rotation;

      const centerSlotFloat = -rotation / SLOT_ANGLE;
      let frontIdx = lastReportedIndex;
      let maxCos = -Infinity;

      for (const mesh of planes) {
        const data = mesh.userData as PlaneUserData;
        const wrapK = Math.round((centerSlotFloat - data.slotIdx) / SLOT_COUNT);
        const virtualSlot = data.slotIdx + wrapK * SLOT_COUNT;
        const targetItemIdx = ((virtualSlot % items.length) + items.length) % items.length;

        if (targetItemIdx !== data.itemIndex) {
          const { idx, tex } = getTextureForItem(targetItemIdx);
          data.itemIndex = idx;
          data.material.uniforms.uMap.value = tex;
        }

        const worldAngle = data.baseAngle + rotation;
        const cosA = Math.cos(worldAngle);

        if (cosA > maxCos) {
          maxCos = cosA;
          frontIdx = data.itemIndex;
        }

        const alpha =
          cosA >= minOpacityThreshold
            ? 1
            : Math.max(0.05, ((cosA + 1) / (minOpacityThreshold + 1)) * 0.52);
        data.material.uniforms.uOpacity.value = alpha;
      }

      if (!tweenState && frontIdx !== lastReportedIndex) {
        lastReportedIndex = frontIdx;
        activeIdxRef.current = frontIdx;
        onActiveChangeRef.current?.(frontIdx);
      }

      renderer.render(scene, camera);
      if (isStageVisible && isPageVisible && !destroyed) {
        raf = requestAnimationFrame(animate);
      } else {
        raf = 0;
      }
    };

    const resumeCarousel = () => {
      if (destroyed) return;
      if (!raf && isStageVisible && isPageVisible) {
        prevTime = performance.now();
        raf = requestAnimationFrame(animate);
      }
    };

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (!isPageVisible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else {
        resumeCarousel();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isStageVisible = entry ? entry.isIntersecting : true;
        if (!isStageVisible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        } else {
          resumeCarousel();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.02 }
    );
    visibilityObserver.observe(stage);

    raf = requestAnimationFrame(animate);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      if (holdTimer) clearTimeout(holdTimer);
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
      stage.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      sharedGeo.dispose();
      for (const mesh of planes) {
        (mesh.userData as PlaneUserData).material.dispose();
      }
      for (const { tex } of textureCache.values()) {
        tex.dispose();
      }
      renderer.dispose();
    };
  }, [
    webGlSupported,
    items,
    planeWidth,
    planeHeight,
    borderRadius,
    bendAmount,
    carouselRadius,
    carouselTiltDeg,
    autoRotateSpeed,
    showCaptionOnCard,
  ]);

  if (!webGlSupported) {
    return (
      <div
        role="region"
        aria-label={ariaLabel}
        className={`relative w-full ${heightClassName} flex items-center justify-center overflow-x-auto gap-4 px-4`}
      >
        {items.slice(0, 6).map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onCardClick?.(idx)}
            className="shrink-0 w-64 h-64 rounded-2xl overflow-hidden border border-white/20 bg-[#121215] relative"
          >
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent text-white font-display font-bold text-sm uppercase">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={`relative w-full ${heightClassName} touch-pan-y select-none`}
    >
      {/* Ambient Radial Studio Glow Behind Curved Drum */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72%] h-[76%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045)_0%,rgba(212,175,55,0.035)_45%,transparent_75%)] blur-[90px]"
      />
      {/* Seamless Horizontal Edge Feathering Across Desktop & Ultrawide Displays */}
      <div
        ref={canvasMountRef}
        className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing sm:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      />
    </div>
  );
});
