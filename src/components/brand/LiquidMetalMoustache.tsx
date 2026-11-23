"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface LiquidMetalMoustacheProps {
  className?: string;
  intensity?: number; // 0 to 1 metallic gloss intensity
  interactive?: boolean; // React to mouse/touch coordinates
  showGlow?: boolean;
}

export function LiquidMetalMoustache({
  className = "w-full h-full",
  intensity = 0.85,
  interactive = true,
  showGlow = true,
}: LiquidMetalMoustacheProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const mousePos = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  });
  const hoverFactor = useRef<number>(0);
  const isVisible = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try WebGL context
    const gl =
      (canvas.getContext("webgl", { alpha: true, antialias: true }) as WebGLRenderingContext) ||
      (canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext);

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y; // Flip Y for image coords
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader: Molten Liquid Chrome / Mercury Physics
    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_image;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_hover;
      uniform float u_intensity;

      void main() {
        vec4 baseTex = texture2D(u_image, v_uv);
        if (baseTex.a < 0.04) {
          discard;
        }

        // Finite differences to calculate surface normal from alpha mask
        vec2 texel = 1.0 / u_resolution;
        float hL = texture2D(u_image, v_uv - vec2(texel.x * 2.5, 0.0)).a;
        float hR = texture2D(u_image, v_uv + vec2(texel.x * 2.5, 0.0)).a;
        float hD = texture2D(u_image, v_uv - vec2(0.0, texel.y * 2.5)).a;
        float hU = texture2D(u_image, v_uv + vec2(0.0, texel.y * 2.5)).a;

        // Surface normal
        vec3 normal = normalize(vec3((hL - hR) * 2.5, (hD - hU) * 2.5, 0.75));

        // Interactive fluid ripple distortion on hover / cursor proximity
        vec2 toMouse = v_uv - u_mouse;
        float distToMouse = length(toMouse);
        float ripple = sin(distToMouse * 24.0 - u_time * 5.0) * exp(-distToMouse * 4.0) * u_hover * 0.15;
        normal.xy += normalize(toMouse + 0.0001) * ripple;
        normal = normalize(normal);

        // Light 1: Interactive Key Light (Follows mouse cursor)
        vec3 light1Pos = vec3(u_mouse.x, u_mouse.y, 0.65);
        vec3 light1Dir = normalize(light1Pos - vec3(v_uv, 0.0));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir1 = normalize(light1Dir + viewDir);

        float diff1 = max(dot(normal, light1Dir), 0.0);
        float spec1 = pow(max(dot(normal, halfDir1), 0.0), 32.0);

        // Light 2: Ambient Liquid Platinum Rim Light
        vec3 light2Dir = normalize(vec3(-0.6, 0.8, 0.5));
        vec3 halfDir2 = normalize(light2Dir + viewDir);
        float spec2 = pow(max(dot(normal, halfDir2), 0.0), 24.0);

        // Ambient undulating mercury caustic reflection
        float caustic = sin(v_uv.x * 12.0 + v_uv.y * 8.0 + u_time * 2.2) * 
                        cos(v_uv.y * 14.0 - u_time * 1.8) * 0.5 + 0.5;

        // Base metallic chrome color palette
        vec3 liquidSilver = vec3(0.92, 0.94, 0.98);
        vec3 liquidPlatinum = vec3(0.78, 0.80, 0.85);
        vec3 goldAccent = vec3(1.0, 0.88, 0.65); // Subtle royal gold glint on high specular

        vec3 chromeColor = mix(liquidPlatinum, liquidSilver, normal.y * 0.5 + 0.5);
        chromeColor += spec1 * 1.4 * liquidSilver;
        chromeColor += spec2 * 0.8 * liquidSilver;
        chromeColor += mix(vec3(0.0), goldAccent, pow(spec1, 2.0) * 0.45);
        chromeColor += caustic * 0.18 * liquidPlatinum;

        // Iridescent chromatic dispersion at grazing angles
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
        chromeColor += vec3(fresnel * 0.35, fresnel * 0.25, fresnel * 0.45);

        // Composite with original alpha
        gl_FragColor = vec4(chromeColor * u_intensity, baseTex.a);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.warn("LiquidMetal shader compile error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) {
      setHasWebGL(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setHasWebGL(false);
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("LiquidMetal program link error:", gl.getProgramInfoLog(program));
      setHasWebGL(false);
      return;
    }

    // Geometry buffer (full quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "a_position");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uHover = gl.getUniformLocation(program, "u_hover");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    const uImage = gl.getUniformLocation(program, "u_image");

    // Load Texture
    const texture = gl.createTexture();
    const image = new Image();
    image.src = "/desi-muchads-cropped-logo.png";
    let isTextureLoaded = false;

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      isTextureLoaded = true;
    };

    // Intersection Observer for battery saving (pause rendering when offscreen)
    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    let animationId: number;
    const startTime = performance.now();

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(rect.width * dpr);
      const height = Math.round(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      if (isVisible.current && isTextureLoaded) {
        // Smooth cursor lerp
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.1;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.1;

        // Smooth hover factor lerp
        const targetHover = isHovered ? 1.0 : 0.0;
        hoverFactor.current += (targetHover - hoverFactor.current) * 0.12;

        const elapsed = (time - startTime) * 0.001;

        gl.useProgram(program);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        gl.enableVertexAttribArray(posAttr);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform2f(uMouse, mousePos.current.x, mousePos.current.y);
        gl.uniform1f(uTime, elapsed);
        gl.uniform1f(uHover, hoverFactor.current);
        gl.uniform1f(uIntensity, intensity);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(uImage, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [intensity, isHovered]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      mousePos.current.targetX = x;
      mousePos.current.targetY = y;
    },
    [interactive]
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        mousePos.current.targetX = 0.5;
        mousePos.current.targetY = 0.5;
      }}
      className={`relative select-none pointer-events-auto ${className}`}
      style={{ aspectRatio: "642 / 220" }}
    >
      {/* Specular Ambient Glow */}
      {showGlow && (
        <div
          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-white/30 via-sky-300/20 to-amber-300/20 blur-md pointer-events-none transition-opacity duration-500 ${
            isHovered ? "opacity-90 scale-105" : "opacity-40"
          }`}
        />
      )}

      {hasWebGL ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block filter drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        /* Fallback: High-resolution PNG with Metallic CSS Shimmer */
        <div className="relative w-full h-full overflow-hidden">
          <img
            src="/desi-muchads-cropped-logo.png"
            alt="Desi Muchads Official Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
        </div>
      )}
    </div>
  );
}
