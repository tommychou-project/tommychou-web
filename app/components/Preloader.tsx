"use client";
import { useEffect, useRef, useState } from "react";

type Props = { onDone: () => void };

interface Star {
  x: number; y: number;
  size: number;
  baseAlpha: number;
  twinkle: boolean;       // whether this star twinkles
  twinkleOffset: number;
  twinkleSpeed: number;
  twinkleAmp: number;     // 0.1 – 0.55 — how much it flickers
  r: number; g: number; b: number;
}

interface Meteor {
  x: number; y: number;
  vx: number; vy: number;
  length: number;
  alpha: number;
  life: number;     // 0 → 1 (progress)
  speed: number;
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

    // ── Stars: fewer on mobile ─────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile
      ? Math.floor(200 + Math.random() * 80)   // mobile: 200–280
      : Math.floor(800 + Math.random() * 200);  // desktop: 800–1000

    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const depth = Math.random();
      // Size: mix of tiny pin-points and a few slightly larger stars
      const size =
        depth < 0.65 ? 0.25 + Math.random() * 0.5   // 65%: tiny (0.25–0.75)
        :              0.6  + Math.random() * 0.65;  // 35%: medium (0.6–1.25), no bright tier

      // Base opacity: dimmer for far, brighter for near — capped lower
      const baseAlpha = Math.min(0.06 + depth * 0.5 + Math.random() * 0.12, 0.65);

      // only 5 stars twinkle — assigned after array is built
      const twinkle = false;

      // Color: mostly white, 30% cool blue-white, 5% warm yellow-white
      const rand = Math.random();
      let r: number, g: number, b: number;
      if (rand < 0.30) {
        // blue-white
        r = 200 + Math.floor(Math.random() * 30);
        g = 215 + Math.floor(Math.random() * 25);
        b = 255;
      } else if (rand < 0.35) {
        // warm yellow-white
        r = 255;
        g = 245 + Math.floor(Math.random() * 10);
        b = 200 + Math.floor(Math.random() * 30);
      } else {
        // pure white
        r = 240 + Math.floor(Math.random() * 15);
        g = 240 + Math.floor(Math.random() * 15);
        b = 240 + Math.floor(Math.random() * 15);
      }

      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size,
        baseAlpha,
        twinkle,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Speed: fast (0.06-0.13/frame = 0.8-1.7s cycle) or medium (0.025-0.06 = 1.7-4s)
        twinkleSpeed:  Math.random() < 0.5
          ? 0.06  + Math.random() * 0.07   // fast group
          : 0.025 + Math.random() * 0.035, // medium group
        twinkleAmp:    0.55 + Math.random() * 0.44,   // 0.55–0.99: goes very dim to very bright
        r, g, b,
      };
    });

    // Pick exactly 5 random stars to twinkle visibly
    const shuffled = [...stars].sort(() => Math.random() - 0.5);
    shuffled.slice(0, 5).forEach(s => { s.twinkle = true; });

    // ── Meteors ────────────────────────────────────────────────────
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      // Travel from bottom-left toward top-right
      const angle = -(28 + Math.random() * 22) * (Math.PI / 180); // -28° to -50° (upward)
      const speed = 14 + Math.random() * 8;
      meteors.push({
        x:      canvas.width  * (0.0 + Math.random() * 0.35), // left 35%
        y:      canvas.height * (0.55 + Math.random() * 0.45), // bottom 45%
        vx:      Math.cos(angle) * speed,  // positive → right
        vy:      Math.sin(angle) * speed,  // negative → up
        length: 130 + Math.random() * 180,
        alpha:  0,
        life:   0,
        speed,
      });
    };

    // Fire first meteor after 1 s
    const meteorTimer1 = setTimeout(spawnMeteor, 1000);
    // Second meteor a bit later for variety
    const meteorTimer2 = setTimeout(spawnMeteor, 1800);

    // ── Animation loop ─────────────────────────────────────────────
    let animId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars (static — no movement)
      for (const s of stars) {
        let a = s.baseAlpha;
        if (s.twinkle) {
          const flicker = 1 + s.twinkleAmp * Math.sin(frame * s.twinkleSpeed + s.twinkleOffset);
          a = Math.min(s.baseAlpha * flicker, 1);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${a.toFixed(3)})`;
        ctx.fill();
      }

      // Draw meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life += 0.018;

        // Fade in quickly, then fade out
        m.alpha = m.life < 0.15
          ? m.life / 0.15               // ramp up
          : Math.max(0, 1 - (m.life - 0.15) / 0.85); // ramp down

        if (m.life >= 1 || m.alpha <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        // Gradient tail
        const tailX = m.x - m.vx / m.speed * m.length;
        const tailY = m.y - m.vy / m.speed * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(220,230,255,${(m.alpha * 0.35).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(255,255,255,${(m.alpha * 0.95).toFixed(3)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();

        // Bright head dot
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(m.alpha * 0.9).toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    // ── Dismiss ────────────────────────────────────────────────────
    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setOpacity(0);
      setTimeout(() => { setDone(true); onDone(); }, 800);
    };

    const autoTimer = setTimeout(dismiss, 5000);

    window.addEventListener("mousemove",  dismiss, { once: true, passive: true });
    window.addEventListener("wheel",      dismiss, { once: true, passive: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    window.addEventListener("keydown",    dismiss, { once: true });
    window.addEventListener("click",      dismiss, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(autoTimer);
      clearTimeout(meteorTimer1);
      clearTimeout(meteorTimer2);
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  dismiss);
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
