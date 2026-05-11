"use client";
import { useEffect, useRef } from "react";

interface Particle {
  theta: number;
  phi: number;
  r: number;
  size: number;        // varied radius for sparkle effect

  targetX: number;
  targetY: number;

  x: number;
  y: number;

  baseOpacity: number;
}

export default function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let particles: Particle[] = [];

    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const sphereRadius = W * 0.33;
    const centerX = W / 2;
    const centerY = H / 2;

    const img = new Image();
    img.src = "/images/tommy-portrait.png";

    img.onload = () => {
      const scale = Math.min((W * 0.85) / img.width, (H * 0.9) / img.height);
      const dw = img.width  * scale;
      const dh = img.height * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      const off = document.createElement("canvas");
      off.width  = W;
      off.height = H;
      const offCtx = off.getContext("2d")!;
      offCtx.drawImage(img, dx, dy, dw, dh);
      const { data } = offCtx.getImageData(0, 0, W, H);

      const valid: [number, number][] = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 128) valid.push([x, y]);
        }
      }

      const N = Math.min(5500, valid.length);

      particles = Array.from({ length: N }, (_, i) => {
        const [tx, ty] = valid[Math.floor((i / N) * valid.length)];

        // phi sampled uniformly from [0, PI] → pole-concentrated distribution
        // (more particles near top/bottom poles, like the reference image)
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.random() * Math.PI;
        const r     = 0.88 + Math.random() * 0.12;   // thin shell near surface

        // Varied particle size: mostly small with occasional bright sparks
        const rand = Math.random();
        const size = rand < 0.7
          ? 0.7 + Math.random() * 0.8     // 70% small  : 0.7–1.5
          : rand < 0.93
          ? 1.5 + Math.random() * 1.0     // 23% medium : 1.5–2.5
          : 2.5 + Math.random() * 1.2;    //  7% large  : 2.5–3.7 (bright sparks)

        const sx = r * Math.sin(phi) * Math.cos(theta);
        const sy = r * Math.cos(phi);

        return {
          theta, phi, r, size,
          targetX: tx,
          targetY: ty,
          x: centerX + sx * sphereRadius,
          y: centerY + sy * sphereRadius,
          baseOpacity: 0.4 + Math.random() * 0.6,
        };
      });

      let rotAngle = 0;

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        rotAngle += 0.002;

        const hovering   = isHoveredRef.current;
        const lerpFactor = hovering ? 0.03 : 0.02;

        for (const p of particles) {
          const sx    = p.r * Math.sin(p.phi) * Math.cos(p.theta + rotAngle);
          const sy    = p.r * Math.cos(p.phi);
          const depth = p.r * Math.sin(p.phi) * Math.sin(p.theta + rotAngle);

          const sphereX = centerX + sx * sphereRadius;
          const sphereY = centerY + sy * sphereRadius;

          const destX = hovering ? p.targetX : sphereX;
          const destY = hovering ? p.targetY : sphereY;

          p.x += (destX - p.x) * lerpFactor;
          p.y += (destY - p.y) * lerpFactor;

          // Depth shading: front bright, back dim but still visible
          const depthNorm = (depth / p.r + 1) / 2;   // 0 (back) → 1 (front)
          const opacity   = hovering
            ? p.baseOpacity
            : p.baseOpacity * (0.12 + 0.88 * depthNorm);

          ctx.beginPath();
          ctx.arc(p.x, p.y, hovering ? 1.5 : p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,240,240,${Math.min(1, opacity).toFixed(2)})`;
          ctx.fill();
        }

        rafId = requestAnimationFrame(draw);
      };

      draw();
    };

    const onEnter = () => { isHoveredRef.current = true; };
    const onLeave = () => { isHoveredRef.current = false; };

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        background: "transparent",
        cursor: "crosshair",
      }}
    />
  );
}
