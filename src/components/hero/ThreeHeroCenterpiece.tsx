"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MoustacheSVG } from "../common/Icons";

export function ThreeHeroCenterpiece() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    // Check mobile or touch device
    const checkMobile = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
      setIsMobile(isTouch);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Lighting Setup for Royal Brushed Gold
    const ambientLight = new THREE.AmbientLight(0x141829, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Brass)
    const keyLight = new THREE.DirectionalLight(0xfff5c0, 2.5);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    // Marigold Rim Light
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 3.8);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    // Top Fill Light (Sindoor Crimson accent)
    const topLight = new THREE.PointLight(0xe11d48, 1.5, 10);
    topLight.position.set(0, 4, 3);
    scene.add(topLight);

    // 3. PBR Brushed-Gold Material
    const goldPBR = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xd4af37),
      metalness: 0.92,
      roughness: 0.18,
    });

    const brassDarkPBR = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb38f26),
      metalness: 0.88,
      roughness: 0.28,
    });

    // 4. Group for all 3D Hero Elements
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 5. Construct 3D Twirled Moustache using parametric curves & extrusion
    const moustacheShape = new THREE.Shape();
    // Symmetric royal twirled contour
    moustacheShape.moveTo(0, 0.2);
    moustacheShape.bezierCurveTo(-0.8, 1.1, -2.2, 1.4, -3.2, 0.6);
    moustacheShape.bezierCurveTo(-3.8, 0.0, -4.2, -0.8, -3.8, -1.3);
    moustacheShape.bezierCurveTo(-3.2, -1.6, -2.4, -0.8, -1.8, -0.4);
    moustacheShape.bezierCurveTo(-1.0, 0.0, -0.4, -0.3, 0, -0.6);
    moustacheShape.bezierCurveTo(0.4, -0.3, 1.0, 0.0, 1.8, -0.4);
    moustacheShape.bezierCurveTo(2.4, -0.8, 3.2, -1.6, 3.8, -1.3);
    moustacheShape.bezierCurveTo(4.2, -0.8, 3.8, 0.0, 3.2, 0.6);
    moustacheShape.bezierCurveTo(2.2, 1.4, 0.8, 1.1, 0, 0.2);

    const extrudeSettings = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const moustacheGeo = new THREE.ExtrudeGeometry(moustacheShape, extrudeSettings);
    moustacheGeo.center();

    const moustacheMesh = new THREE.Mesh(moustacheGeo, goldPBR);
    moustacheMesh.scale.set(0.68, 0.68, 0.68);
    rootGroup.add(moustacheMesh);

    // 6. Floating Royal Mudras (Indian Brass Coins)
    const mudras: {
      mesh: THREE.Mesh;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      orbitY: number;
    }[] = [];

    const coinGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 32);
    coinGeo.rotateX(Math.PI / 2);

    const coinInnerGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.1, 24);
    coinInnerGeo.rotateX(Math.PI / 2);

    const coinConfigs = [
      { r: 2.8, y: 1.1, speed: 0.012, initial: 0 },
      { r: 3.1, y: -0.9, speed: -0.015, initial: Math.PI * 0.75 },
      { r: 3.4, y: 0.3, speed: 0.018, initial: Math.PI * 1.4 },
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

    // 7. Mouse Normalized Coordinates and Lerp Physics
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = x * 0.4;
      targetMouse.y = y * 0.3;
    };

    window.addEventListener("mousemove", handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Render Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      // Parallax lerp
      currentMouse.x = THREE.MathUtils.lerp(currentMouse.x, targetMouse.x, 0.06);
      currentMouse.y = THREE.MathUtils.lerp(currentMouse.y, targetMouse.y, 0.06);

      rootGroup.rotation.y = currentMouse.x + Math.sin(elapsed * 0.8) * 0.05;
      rootGroup.rotation.x = -currentMouse.y + Math.cos(elapsed * 0.6) * 0.04;

      // Subtle breathing float on moustache
      moustacheMesh.position.y = Math.sin(elapsed * 1.5) * 0.08;
      moustacheMesh.rotation.z = Math.sin(elapsed * 1.2) * 0.03;

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
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      moustacheGeo.dispose();
      coinGeo.dispose();
      coinInnerGeo.dispose();
      goldPBR.dispose();
      brassDarkPBR.dispose();
    };
  }, [isMobile]);

  // Mobile or WebGL Unsupported Fallback
  if (isMobile || !webGlSupported) {
    return (
      <div className="relative my-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full scale-125" />
        <MoustacheSVG className="relative z-10 w-44 sm:w-64 h-20 sm:h-28 text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] transform-gpu hover:scale-105 transition-transform" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full max-w-xl h-64 sm:h-80 mx-auto my-1 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      title="Interactive 3D Desi Muchhad & Mudras (Move your cursor to tilt)"
    />
  );
}
