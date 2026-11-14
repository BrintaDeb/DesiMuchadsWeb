"use client";

import React, { useEffect, useRef } from "react";

export function LiquidPlatinumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let t = 0;

    const render = () => {
      t += 0.008;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Draw 3 layered liquid platinum sinuous ribbon waves
      const waves = [
        { amplitude: 45, frequency: 0.003, speed: 0.8, color: "rgba(255, 255, 255, 0.035)", lineWidth: 2 },
        { amplitude: 65, frequency: 0.002, speed: 1.2, color: "rgba(228, 228, 231, 0.045)", lineWidth: 2.5 },
        { amplitude: 35, frequency: 0.004, speed: 1.5, color: "rgba(255, 255, 255, 0.025)", lineWidth: 1.5 },
      ];

      waves.forEach((wave, idx) => {
        ctx.beginPath();
        const baseHeight = height * 0.45 + idx * 40;

        for (let x = 0; x <= width; x += 6) {
          const distFromMouse = Math.abs(x - mouseX);
          const mouseInfluence = Math.max(0, 1 - distFromMouse / 350) * 35;
          const y =
            baseHeight +
            Math.sin(x * wave.frequency + t * wave.speed + idx) * wave.amplitude +
            Math.cos(x * 0.0015 - t * 0.5) * 20 -
            mouseInfluence * Math.sin((mouseY / height) * Math.PI);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        ctx.stroke();

        // Subtle specular highlight gradient along peak
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseHeight - 60, 0, height);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.015)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
