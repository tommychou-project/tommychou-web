"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      s: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.12 + 0.02,
    }));

    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,240,240,${p.a})`;
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        background: "#050505",
        borderTop: "0.5px solid rgba(240,240,240,0.06)",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "60px 48px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "32px",
            marginBottom: "48px",
          }}
          className="footer-top"
        >
          <div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#f0f0f0",
                letterSpacing: "-0.02em",
                marginBottom: "10px",
              }}
            >
              Tommy Chou
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(240,240,240,0.32)",
                lineHeight: 1.7,
                maxWidth: "300px",
              }}
            >
              Story, strategy, and AI — helping brands grow across cultures.
            </div>
          </div>
          <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(240,240,240,0.25)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Links
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "部落格", href: "/blog" },
                  { label: "聯繫我", href: "/contact" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{
                      color: "rgba(240,240,240,0.4)",
                      fontSize: "13px",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(240,240,240,0.25)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Social
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {["LinkedIn", "YouTube", "Instagram"].map((s) => (
                  <span
                    key={s}
                    style={{
                      color: "rgba(240,240,240,0.4)",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "0.5px solid rgba(240,240,240,0.06)",
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span style={{ color: "rgba(240,240,240,0.18)", fontSize: "12px" }}>
            © 2025 Tommy Chou. All rights reserved.
          </span>
          <span style={{ color: "rgba(240,240,240,0.12)", fontSize: "12px", fontStyle: "italic" }}>
            Built with story, strategy, and AI.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-top { flex-direction: column !important; }
          footer > div { padding: 40px 24px 32px !important; }
        }
      `}</style>
    </footer>
  );
}
