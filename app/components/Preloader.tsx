"use client";
import { useEffect, useRef, useState } from "react";

type Props = { onDone: () => void };

export default function Preloader({ onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [done, setDone] = useState(false);

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

    // ripple particles
    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] =
      Array.from({ length: 60 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.25 + 0.05,
      }));

    let frame = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // spawn ripple every 60 frames
      if (frame % 60 === 0) {
        ripples.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0,
          maxR: Math.random() * 120 + 60,
          alpha: 0.18,
        });
      }

      // draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.8;
        rp.alpha -= 0.002;
        if (rp.alpha <= 0 || rp.r > rp.maxR) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rp.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // draw particles
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });

      frame++;
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleScroll = () => {
      setOpacity(0);
      setTimeout(() => { setDone(true); onDone(); }, 800);
    };

    window.addEventListener("scroll", handleScroll, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onDone]);

  if (done) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#080808",
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
          fontSize: "clamp(14px, 2.2vw, 20px)",
          fontStyle: "italic",
          fontFamily: "'Georgia', serif",
          letterSpacing: "0.04em",
          textAlign: "center",
          maxWidth: "560px",
          lineHeight: 1.7,
          padding: "0 24px",
        }}
      >
        Every great story begins with a single moment.
      </p>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255,255,255,0.35)",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          animation: "scrollBounce 1.6s ease-in-out infinite",
        }}
      >
        <span>SCROLL</span>
        <span style={{ fontSize: "16px" }}>↓</span>
      </div>
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(6px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
