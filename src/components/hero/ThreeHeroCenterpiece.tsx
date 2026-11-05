"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MoustacheSVG } from "../common/Icons";
import { sound } from "@/lib/sound";
import {
  MOUSTACHE_3D_BODY,
  MOUSTACHE_3D_LEFT_QUILL,
  MOUSTACHE_3D_RIGHT_QUILL,
} from "./moustache3DData";

function createShapeFromPoints(pts: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  pts.forEach(([x, y], i) => {
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  return shape;
}

export function ThreeHeroCenterpiece() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 260;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    container.appendChild(renderer.domElement);

    // 2. High-End Studio Lighting Rig (Eliminates Dark Silhouette)
    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.8);
    scene.add(ambientLight);

    // Key Light (Warm Sunlight Gold from front-right)
    const keyLight = new THREE.DirectionalLight(0xfffae0, 3.4);
    keyLight.position.set(3.5, 4.5, 6);
    scene.add(keyLight);

    // Secondary Front Fill (Soft ivory bounce from front-left)
    const fillLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    fillLight.position.set(-3.5, 2.5, 5);
    scene.add(fillLight);

    // Marigold Rim Light (Sculpting outer edges & feather cuts from behind)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 4.8);
    rimLight.position.set(-4.5, -2.5, -3.5);
    scene.add(rimLight);

    // Specular Glint Light (Top-down highlight)
    const glintLight = new THREE.PointLight(0xffd700, 2.4, 15);
    glintLight.position.set(0, 3.5, 3.5);
    scene.add(glintLight);

    // Warm Terracotta Ground Fill
    const groundFill = new THREE.PointLight(0xc84b31, 1.5, 12);
    groundFill.position.set(0, -3.5, 2.5);
    scene.add(groundFill);

    // 3. PBR Brushed-Gold Materials
    const goldPBR = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xe5a83b), // Official Desi Muchads Warm Golden Ochre
      metalness: 0.88,
      roughness: 0.18,
    });

    const quillGoldPBR = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf5de88), // Polished highlight gold for inner quills
      metalness: 0.94,
      roughness: 0.14,
    });

    const brassDarkPBR = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb38f26),
      metalness: 0.90,
      roughness: 0.24,
    });

    // 4. Root & Moustache Groups
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const moustacheGroup = new THREE.Group();

    // Extrude settings for high-precision beveling
    const extrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    };

    const bodyShape = createShapeFromPoints(MOUSTACHE_3D_BODY);
    const leftQuillShape = createShapeFromPoints(MOUSTACHE_3D_LEFT_QUILL);
    const rightQuillShape = createShapeFromPoints(MOUSTACHE_3D_RIGHT_QUILL);

    const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, extrudeSettings);
    const leftQuillGeo = new THREE.ExtrudeGeometry(leftQuillShape, extrudeSettings);
    const rightQuillGeo = new THREE.ExtrudeGeometry(rightQuillShape, extrudeSettings);

    const bodyMesh = new THREE.Mesh(bodyGeo, goldPBR);
    const leftQuillMesh = new THREE.Mesh(leftQuillGeo, quillGoldPBR);
    const rightQuillMesh = new THREE.Mesh(rightQuillGeo, quillGoldPBR);

    // Subtly offset the inner quills in Z for extra dimensional depth
    leftQuillMesh.position.z = 0.04;
    rightQuillMesh.position.z = 0.04;

    moustacheGroup.add(bodyMesh);
    moustacheGroup.add(leftQuillMesh);
    moustacheGroup.add(rightQuillMesh);

    // Calculate geometric bounding box and center precisely at origin
    const bbox = new THREE.Box3().setFromObject(moustacheGroup);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    bodyMesh.position.sub(center);
    leftQuillMesh.position.sub(center);
    rightQuillMesh.position.sub(center);

    // Scale to balanced hero proportion
    moustacheGroup.scale.set(0.88, 0.88, 0.88);
    rootGroup.add(moustacheGroup);

    // 5. Floating Royal Mudras (Indian Brass Coins)
    const mudras: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      orbitY: number;
    }[] = [];

    const coinGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.08, 32);
    coinGeo.rotateX(Math.PI / 2);

    const coinInnerGeo = new THREE.CylinderGeometry(0.40, 0.40, 0.09, 32);
    coinInnerGeo.rotateX(Math.PI / 2);

    const coinConfigs = [
      { r: 3.3, y: 1.1, speed: 0.012, initial: 0 },
      { r: 3.5, y: -0.9, speed: -0.015, initial: Math.PI * 0.75 },
      { r: 3.7, y: 0.2, speed: 0.016, initial: Math.PI * 1.4 },
    ];

    coinConfigs.forEach((cfg) => {
      const coinMesh = new THREE.Mesh(coinGeo, goldPBR);
      const innerMesh = new THREE.Mesh(coinInnerGeo, brassDarkPBR);
      coinMesh.add(innerMesh);

      rootGroup.add(coinMesh);
      mudras.push({
        mesh: coinMesh,
        orbitRadius: cfg.r,
        orbitSpeed: cfg.speed,
        orbitAngle: cfg.initial,
        orbitY: cfg.y,
      });
    });

    // 6. Mouse Normalized Coordinates and Lerp Physics
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };
    let spinVelocity = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = x * 0.45;
      targetMouse.y = y * 0.35;
    };

    const handleClick = () => {
      sound.playChime();
      spinVelocity += Math.PI * 2;
    };

    // Touch Gestures for Android & iOS (Non-blocking vertical scroll)
    let touchStartX = 0;
    let isTouching = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isTouching = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching || e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const deltaX = (currentX - touchStartX) / (window.innerWidth || 360);
      targetMouse.x += deltaX * 1.2;
      touchStartX = currentX;
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 260;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Render Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Parallax lerp
      currentMouse.x = THREE.MathUtils.lerp(currentMouse.x, targetMouse.x, 0.06);
      currentMouse.y = THREE.MathUtils.lerp(currentMouse.y, targetMouse.y, 0.06);

      // Damp spin velocity
      spinVelocity = THREE.MathUtils.lerp(spinVelocity, 0, 0.04);

      rootGroup.rotation.y =
        currentMouse.x + Math.sin(elapsed * 0.8) * 0.06 + spinVelocity;
      rootGroup.rotation.x = -currentMouse.y + Math.cos(elapsed * 0.6) * 0.04;

      // Gentle breathing float on moustache
      moustacheGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;
      moustacheGroup.rotation.z = Math.sin(elapsed * 1.2) * 0.025;

      // Orbit Mudra coins
      mudras.forEach((m) => {
        m.orbitAngle += m.orbitSpeed;
        m.mesh.position.x = Math.cos(m.orbitAngle) * m.orbitRadius;
        m.mesh.position.z = Math.sin(m.orbitAngle) * (m.orbitRadius * 0.5);
        m.mesh.position.y = m.orbitY + Math.sin(elapsed * 2 + m.orbitAngle) * 0.15;
        m.mesh.rotation.x += 0.02;
        m.mesh.rotation.y += 0.015;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      bodyGeo.dispose();
      leftQuillGeo.dispose();
      rightQuillGeo.dispose();
      coinGeo.dispose();
      coinInnerGeo.dispose();
      goldPBR.dispose();
      quillGoldPBR.dispose();
      brassDarkPBR.dispose();
    };
  }, []);

  // WebGL Unsupported Fallback
  if (!webGlSupported) {
    return (
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#E5A83B]/20 blur-3xl rounded-full scale-125" />
        <MoustacheSVG className="relative z-10 w-44 sm:w-64 h-20 sm:h-28 text-[#E5A83B] drop-shadow-[0_0_30px_rgba(229,168,59,0.5)] transform-gpu hover:scale-105 transition-transform" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full max-w-xl h-60 sm:h-80 mx-auto my-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none touch-pan-y"
      title="Interactive 3D Desi Muchhad & Mudras (Touch or move to tilt, tap to spin)"
    />
  );
}
