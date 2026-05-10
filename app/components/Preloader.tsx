"use client";
import { useEffect, useRef, useState } from "react";

type Props = { onDone: () => void };

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Floating particles only (no ripples)
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] =
      Array.from({ length: 60 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.25 + 0.05,
      }));

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    // Single dismiss function — safe to call multiple times
    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setOpacity(0);
      setTimeout(() => { setDone(true); onDone(); }, 800);
    };

    // Auto-dismiss after 3 s
    const autoTimer = setTimeout(dismiss, 3000);

    // Dismiss on any user interaction
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
        background: "#080C14",
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
          fontSize: "clamp(28px, 4.4vw, 40px)",
          fontStyle: "italic",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.04em",
          textAlign: "center",
          maxWidth: "560px",
          lineHeight: 1.7,
          padding: "0 24px",
        }}
      >
        Become what you&apos;re meant to be.
      </p>
    </div>
  );
}
