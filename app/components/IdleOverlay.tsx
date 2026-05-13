"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number; y: number;
  size: number;
  baseAlpha: number;
  twinkle: boolean;
  twinkleOffset: number; twinkleSpeed: number; twinkleAmp: number;
  r: number; g: number; b: number;
}

interface Meteor {
  x: number; y: number;
  vx: number; vy: number;
  length: number; alpha: number; life: number; speed: number;
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

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile
      ? Math.floor(200 + Math.random() * 80)
      : Math.floor(800 + Math.random() * 200);
    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random();
      const size =
        depth < 0.6  ? 0.25 + Math.random() * 0.5
        : depth < 0.9 ? 0.6  + Math.random() * 0.7
        :               1.1  + Math.random() * 0.9;
      const baseAlpha = Math.min(0.06 + depth * 0.6 + Math.random() * 0.15, 0.88);
      const twinkle   = Math.random() < 0.4;
      const rand = Math.random();
      let r: number, g: number, b: number;
      if (rand < 0.30)      { r = 200 + Math.floor(Math.random()*30); g = 215 + Math.floor(Math.random()*25); b = 255; }
      else if (rand < 0.35) { r = 255; g = 245 + Math.floor(Math.random()*10); b = 200 + Math.floor(Math.random()*30); }
      else                  { r = 240 + Math.floor(Math.random()*15); g = 240 + Math.floor(Math.random()*15); b = 240 + Math.floor(Math.random()*15); }
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size, baseAlpha, twinkle,
        twinkleOffset: Math.random() * Math.PI * 2,
        twinkleSpeed:  0.002 + Math.random() * 0.012,
        twinkleAmp:    0.1   + Math.random() * 0.45,
        r, g, b,
      };
    });

    const meteors: Meteor[] = [];
    const spawnMeteor = () => {
      const fromTop = Math.random() < 0.7;
      const angle   = (25 + Math.random() * 20) * (Math.PI / 180);
      const speed   = 12 + Math.random() * 8;
      meteors.push({
        x: fromTop ? Math.random() * canvas.width * 0.8 : 0,
        y: fromTop ? 0 : Math.random() * canvas.height * 0.4,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        length: 120 + Math.random() * 180,
        alpha: 0, life: 0, speed,
      });
    };
    const meteorTimer = setTimeout(spawnMeteor, 1000);

    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        let a = s.baseAlpha;
        if (s.twinkle) {
          const flicker = 1 + s.twinkleAmp * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
          a = Math.min(s.baseAlpha * flicker, 1);
        }
        if (s.size > 1.3) {
          const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
          grd.addColorStop(0, `rgba(${s.r},${s.g},${s.b},${(a * 0.4).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${s.r},${s.g},${s.b},0)`);
          ctx.beginPath(); ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`; ctx.fill();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx; m.y += m.vy; m.life += 0.018;
        m.alpha = m.life < 0.15 ? m.life / 0.15 : Math.max(0, 1 - (m.life - 0.15) / 0.85);
        if (m.life >= 1 || m.alpha <= 0) { meteors.splice(i, 1); continue; }
        const tailX = m.x - m.vx / m.speed * m.length;
        const tailY = m.y - m.vy / m.speed * m.length;
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0,   `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(220,230,255,${(m.alpha * 0.35).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(255,255,255,${(m.alpha * 0.95).toFixed(3)})`);
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(m.alpha * 0.9).toFixed(3)})`; ctx.fill();
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
      clearTimeout(meteorTimer);
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
