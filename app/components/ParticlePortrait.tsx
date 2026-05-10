"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  homeX: number;
  homeY: number;
  opacity: number;
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

    // Match canvas resolution to container
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const W = canvas.width;
    const H = canvas.height;

    const img = new Image();
    img.src = "/images/tommy-portrait.png";

    img.onload = () => {
      // Scale portrait to fit with a little breathing room
      const scale = Math.min((W * 0.85) / img.width, (H * 0.9) / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (W - dw) / 2;
      const dy = (H - dh) / 2;

      // Offscreen canvas — read pixel alpha
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const offCtx = off.getContext("2d")!;
      offCtx.drawImage(img, dx, dy, dw, dh);
      const { data } = offCtx.getImageData(0, 0, W, H);

      // Collect all opaque pixels (alpha > 128)
      const valid: [number, number][] = [];
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            valid.push([x, y]);
          }
        }
      }

      // Uniformly sample ~3000 portrait target positions
      const N = Math.min(3000, valid.length);
      particles = Array.from({ length: N }, (_, i) => {
        const [tx, ty] = valid[Math.floor((i / N) * valid.length)];
        const hx = Math.random() * W;
        const hy = Math.random() * H;
        return {
          x: hx,
          y: hy,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          targetX: tx,
          targetY: ty,
          homeX: hx,
          homeY: hy,
          opacity: 0.45 + Math.random() * 0.5,
        };
      });

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        const hovering = isHoveredRef.current;

        for (const p of particles) {
          if (hovering) {
            // Gather — lerp to portrait pixel (~1.2s convergence at 60fps)
            p.x += (p.targetX - p.x) * 0.04;
            p.y += (p.targetY - p.y) * 0.04;
          } else {
            // Scatter — home drifts with brownian motion, particle lerps toward it (~2s)
            p.homeX += p.vx;
            p.homeY += p.vy;
            p.vx += (Math.random() - 0.5) * 0.04;
            p.vy += (Math.random() - 0.5) * 0.04;
            // Speed cap
            const spd = Math.hypot(p.vx, p.vy);
            if (spd > 0.65) { p.vx *= 0.94; p.vy *= 0.94; }
            // Wrap home around edges (no hard bounce)
            if (p.homeX < 0) p.homeX += W;
            if (p.homeX > W) p.homeX -= W;
            if (p.homeY < 0) p.homeY += H;
            if (p.homeY > H) p.homeY -= H;
            // Soft lerp toward drifting home (~2s convergence)
            p.x += (p.homeX - p.x) * 0.025;
            p.y += (p.homeY - p.y) * 0.025;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,240,240,${p.opacity})`;
          ctx.fill();
        }

        rafId = requestAnimationFrame(draw);
      };

      draw();
    };

    const onEnter = () => {
      isHoveredRef.current = true;
    };
    const onLeave = () => {
      isHoveredRef.current = false;
      // Assign fresh scatter targets — particles drift away from portrait
      for (const p of particles) {
        p.homeX = Math.random() * W;
        p.homeY = Math.random() * H;
      }
    };

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
