"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  vx: number; vy: number;
  size: number; depth: number; alpha: number;
  twinkleOffset: number; twinkleSpeed: number;
  r: number; g: number; b: number;
}

const IDLE_MS = 60_000; // 60 seconds

export default function IdleOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas  = canvasRef.current;
    if (!overlay || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Starfield canvas (same as Preloader) ──────────────────────
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.floor(200 + Math.random() * 100);
    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const depth  = Math.random();
      const size   = 0.3 + depth * 0.9 * Math.random();
      const alpha  = Math.min(0.04 + depth * 0.55 + Math.random() * 0.12, 0.72);
      const speed  = 0.02 + depth * 0.06;
      const angle  = Math.random() * Math.PI * 2;
      const isCool = Math.random() < 0.35;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size, depth, alpha,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed:  0.003 + Math.random() * 0.007,
        r: isCool ? 210 + Math.floor(Math.random() * 30) : 245 + Math.floor(Math.random() * 10),
        g: isCool ? 220 + Math.floor(Math.random() * 25) : 245 + Math.floor(Math.random() * 10),
        b: isCool ? 255 : 245 + Math.floor(Math.random() * 10),
      };
    });

    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -2)                s.x = canvas.width  + 2;
        if (s.x > canvas.width  + 2) s.x = -2;
        if (s.y < -2)                s.y = canvas.height + 2;
        if (s.y > canvas.height + 2) s.y = -2;
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

    // ── Idle / wake logic ──────────────────────────────────────────
    let isVisible    = false;
    let savedScrollY = 0;
    let idleTimer:   ReturnType<typeof setTimeout> | null = null;
    let hideTimer:   ReturnType<typeof setTimeout> | null = null;

    const showOverlay = () => {
      if (isVisible) return;
      isVisible    = true;
      savedScrollY = window.scrollY;
      overlay.style.display = "flex";
      // Two rAF frames to allow display:flex to paint before transitioning
      requestAnimationFrame(() => requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      }));
    };

    const hideOverlay = () => {
      if (!isVisible) return;
      isVisible = false;
      overlay.style.opacity = "0";
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        overlay.style.display = "none";
        window.scrollTo({ top: savedScrollY, behavior: "instant" });
      }, 800);
    };

    const resetIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      // Only arm the idle timer when overlay is not showing
      if (!isVisible) idleTimer = setTimeout(showOverlay, IDLE_MS);
    };

    // mousemove & touchstart → wake (dismiss overlay) + reset timer
    const onWake = () => {
      if (isVisible) hideOverlay();
      resetIdleTimer();
    };

    // Other activity → just reset timer (doesn't dismiss overlay)
    const onActivity = () => resetIdleTimer();

    ["mousedown", "scroll", "keydown"].forEach(ev =>
      window.addEventListener(ev, onActivity, { passive: true })
    );
    ["mousemove", "touchstart"].forEach(ev =>
      window.addEventListener(ev, onWake, { passive: true })
    );

    // Arm the first idle timer
    resetIdleTimer();

    return () => {
      cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      if (hideTimer) clearTimeout(hideTimer);
      window.removeEventListener("resize", resize);
      ["mousedown", "scroll", "keydown"].forEach(ev =>
        window.removeEventListener(ev, onActivity)
      );
      ["mousemove", "touchstart"].forEach(ev =>
        window.removeEventListener(ev, onWake)
      );
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#050810",
        display: "none",        // starts hidden
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.8s ease-out",
        pointerEvents: "none",  // transparent to clicks — window listeners still fire
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
          pointerEvents: "none",
        }}
      >
        Become what you&apos;re meant to be.
      </p>
    </div>
  );
}
