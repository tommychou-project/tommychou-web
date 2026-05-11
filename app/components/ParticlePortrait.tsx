"use client";
import { useEffect, useRef } from "react";

// Mode: "sphere" | "portrait" | "emoji"
type Mode = "sphere" | "portrait" | "emoji";

interface Particle {
  theta: number;
  phi: number;
  r: number;
  size: number;

  portraitX: number;   // target when showing portrait
  portraitY: number;

  emojiX: number;      // target when showing emoji
  emojiY: number;

  x: number;
  y: number;

  baseOpacity: number;
}

/** Generate [x,y] points that form a simple smiley face */
function buildEmojiTargets(W: number, H: number, N: number): [number, number][] {
  const cx = W / 2;
  const cy = H / 2;
  const faceR  = Math.min(W, H) * 0.28;

  const pts: [number, number][] = [];

  // ── Face outline ──
  const faceCount = Math.round(N * 0.42);
  for (let i = 0; i < faceCount; i++) {
    const a = (i / faceCount) * Math.PI * 2;
    const jitter = (Math.random() - 0.5) * faceR * 0.07;
    pts.push([
      cx + (faceR + jitter) * Math.cos(a),
      cy + (faceR + jitter) * Math.sin(a),
    ]);
  }

  // ── Eyes — upper third of face ──
  const eyeOffX = faceR * 0.35;
  const eyeOffY = faceR * 0.32;   // well above center
  const eyeR    = faceR * 0.09;
  const eyeCount = Math.round(N * 0.12);

  for (let i = 0; i < eyeCount; i++) {       // left eye
    const a = Math.random() * Math.PI * 2;
    const rr = Math.random() * eyeR;
    pts.push([cx - eyeOffX + rr * Math.cos(a), cy - eyeOffY + rr * Math.sin(a)]);
  }
  for (let i = 0; i < eyeCount; i++) {       // right eye
    const a = Math.random() * Math.PI * 2;
    const rr = Math.random() * eyeR;
    pts.push([cx + eyeOffX + rr * Math.cos(a), cy - eyeOffY + rr * Math.sin(a)]);
  }

  // ── Smile arc — lower third of face ──
  // In canvas coords y increases downward, so angle 30°→150° through 90°
  // traces the BOTTOM of a circle = visually curves downward = smile ✓
  const mouthR    = faceR * 0.38;
  const mouthOffY = faceR * 0.18;   // shift arc centre downward
  const mouthStartA = (20  / 180) * Math.PI;   // 20°
  const mouthEndA   = (160 / 180) * Math.PI;   // 160°
  const mouthSpan   = mouthEndA - mouthStartA;
  const mouthCount  = N - pts.length;

  for (let i = 0; i < mouthCount; i++) {
    const t = i / mouthCount;
    const a = mouthStartA + t * mouthSpan;
    const jitter = (Math.random() - 0.5) * mouthR * 0.07;
    pts.push([
      cx + (mouthR + jitter) * Math.cos(a),
      cy + mouthOffY + (mouthR + jitter) * Math.sin(a),
    ]);
  }

  return pts;
}

export default function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef   = useRef<Mode>("sphere");

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

      // Pre-build emoji target positions (same count as particles)
      const emojiPts = buildEmojiTargets(W, H, N);

      particles = Array.from({ length: N }, (_, i) => {
        const [px, py] = valid[Math.floor((i / N) * valid.length)];
        const [ex, ey] = emojiPts[i % emojiPts.length];

        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.random() * Math.PI;
        const r     = 0.88 + Math.random() * 0.12;

        const rand = Math.random();
        const size = rand < 0.7
          ? 0.7 + Math.random() * 0.8
          : rand < 0.93
          ? 1.5 + Math.random() * 1.0
          : 2.5 + Math.random() * 1.2;

        const sx = r * Math.sin(phi) * Math.cos(theta);
        const sy = r * Math.cos(phi);

        return {
          theta, phi, r, size,
          portraitX: px, portraitY: py,
          emojiX: ex,    emojiY: ey,
          x: centerX + sx * sphereRadius,
          y: centerY + sy * sphereRadius,
          baseOpacity: 0.4 + Math.random() * 0.6,
        };
      });

      let rotAngle = 0;

      const draw = () => {
        ctx.clearRect(0, 0, W, H);
        rotAngle += 0.002;

        const mode = modeRef.current;

        // Lerp speed per mode
        const lerpFactor =
          mode === "sphere"  ? 0.02 :
          mode === "portrait"? 0.03 :
          /* emoji */          0.035;

        for (const p of particles) {
          // Sphere target (keeps rotating even while lerping away)
          const sx    = p.r * Math.sin(p.phi) * Math.cos(p.theta + rotAngle);
          const sy    = p.r * Math.cos(p.phi);
          const depth = p.r * Math.sin(p.phi) * Math.sin(p.theta + rotAngle);

          const sphereX = centerX + sx * sphereRadius;
          const sphereY = centerY + sy * sphereRadius;

          const destX =
            mode === "portrait" ? p.portraitX :
            mode === "emoji"    ? p.emojiX    :
            sphereX;
          const destY =
            mode === "portrait" ? p.portraitY :
            mode === "emoji"    ? p.emojiY    :
            sphereY;

          p.x += (destX - p.x) * lerpFactor;
          p.y += (destY - p.y) * lerpFactor;

          const depthNorm = (depth / p.r + 1) / 2;
          const opacity   = mode === "sphere"
            ? p.baseOpacity * (0.12 + 0.88 * depthNorm)
            : p.baseOpacity;

          const drawSize = mode === "sphere" ? p.size : 1.5;

          ctx.beginPath();
          ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240,240,240,${Math.min(1, opacity).toFixed(2)})`;
          ctx.fill();
        }

        rafId = requestAnimationFrame(draw);
      };

      draw();
    };

    // ── Mouse direction detection ──
    let lastX: number | null = null;

    const onMouseEnter = () => {
      // When entering, default to portrait mode
      if (modeRef.current === "sphere") modeRef.current = "portrait";
    };
    const onMouseLeave = () => {
      modeRef.current = "sphere";
      lastX = null;
    };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const curX = e.clientX - rect.left;

      if (lastX !== null) {
        const delta = curX - lastX;
        if (delta > 5) {
          // Moving right → emoji
          modeRef.current = "emoji";
        } else if (delta < -5) {
          // Moving left → portrait
          modeRef.current = "portrait";
        }
      }
      lastX = curX;
    };

    canvas.addEventListener("mouseenter", onMouseEnter);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("mousemove",  onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mouseenter", onMouseEnter);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("mousemove",  onMouseMove);
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
