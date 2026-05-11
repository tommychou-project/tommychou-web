"use client";
import { useEffect, useRef, useState } from "react";

type Props = { onDone: () => void };

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;       // 0.3 – 1.2 px
  depth: number;      // 0 (far) → 1 (near)
  alpha: number;      // base opacity, depth-modulated
  twinkleOffset: number;   // phase offset for gentle shimmer
  twinkleSpeed: number;
  // subtle color tint: pure white or faint blue-white
  r: number; g: number; b: number;
}

export default function Preloader({ onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [done, setDone] = useState(false);
  const dismissedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.floor(200 + Math.random() * 100); // 200–300

    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random();                        // 0=far, 1=near

      // Far stars: tiny, dim, near-neutral white
      // Near stars: slightly larger, brighter, hint of blue-white
      const size  = 0.3 + depth * 0.9 * Math.random();  // 0.3 – 1.2
      const alpha = 0.04 + depth * 0.55 + Math.random() * 0.12; // dim far, brighter near

      // Speed proportional to depth (parallax feel), but all very slow
      const speed = 0.02 + depth * 0.06;
      const angle = Math.random() * Math.PI * 2;

      // Color: mostly white (255,255,255), occasional faint blue-white
      const isCool = Math.random() < 0.35;
      const r = isCool ? 210 + Math.floor(Math.random() * 30) : 245 + Math.floor(Math.random() * 10);
      const g = isCool ? 220 + Math.floor(Math.random() * 25) : 245 + Math.floor(Math.random() * 10);
      const b = isCool ? 255                                   : 245 + Math.floor(Math.random() * 10);

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        depth,
        alpha: Math.min(alpha, 0.72),
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.003 + Math.random() * 0.007, // very slow shimmer
        r, g, b,
      };
    });

    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;

      // Deep-space background — near-black with very faint midnight-blue hint
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        // Drift
        s.x += s.vx;
        s.y += s.vy;

        // Wrap at edges (seamless deep-space scroll)
        if (s.x < -2)               s.x = canvas.width  + 2;
        if (s.x > canvas.width + 2) s.x = -2;
        if (s.y < -2)               s.y = canvas.height + 2;
        if (s.y > canvas.height + 2) s.y = -2;

        // Gentle twinkle: ±15% opacity oscillation
        const twinkle = 1 + 0.15 * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
        const a = Math.min(s.alpha * twinkle, 1);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    // Dismiss
    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setOpacity(0);
      setTimeout(() => { setDone(true); onDone(); }, 800);
    };

    const autoTimer = setTimeout(dismiss, 3000);

    window.addEventListener("wheel",      dismiss, { once: true, passive: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    window.addEventListener("keydown",    dismiss, { once: true });
    window.addEventListener("click",      dismiss, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(autoTimer);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("wheel",      dismiss);
      window.removeEventListener("touchstart", dismiss);
      window.removeEventListener("keydown",    dismiss);
      window.removeEventListener("click",      dismiss);
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#050810",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transition: "opacity 0.8s ease-out",
        pointerEvents: opacity < 0.1 ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      />
      <p
        style={{
          position: "relative",
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(18px, 4.4vw, 40px)",
          fontStyle: "italic",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.04em",
          textAlign: "center",
          maxWidth: "88vw",
          lineHeight: 1.7,
          padding: "0 24px",
        }}
      >
        Become what you&apos;re meant to be.
      </p>
    </div>
  );
}
