"use client";
import { useEffect, useRef } from "react";

const BEEHIIV_FORM_ID = "84aff35f-6e66-4902-a583-e3ea4645f7d9";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beehiivRef = useRef<HTMLDivElement>(null);

  // Beehiiv inline embed — inject target div + script into a React-unmanaged container
  useEffect(() => {
    const container = beehiivRef.current;
    if (!container || container.querySelector("script")) return;

    // Target div the loader will inject the form into
    const formDiv = document.createElement("div");
    formDiv.setAttribute("data-beehiiv-form", BEEHIIV_FORM_ID);
    container.appendChild(formDiv);

    // Load the Beehiiv v3 loader
    const script = document.createElement("script");
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.async = true;
    container.appendChild(script);
  }, []);

  // Particle canvas
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
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            marginBottom: "48px",
          }}
          className="footer-top"
        >
          {/* Left: branding */}
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
              }}
            >
              Story, strategy, and AI — helping brands grow across cultures.
            </div>
          </div>

          {/* Right: Newsletter card */}
          <div
            style={{
              background: "#0D1220",
              border: "0.5px solid rgba(240,240,240,0.08)",
              borderRadius: "16px",
              padding: "24px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              transition: "border-color 0.25s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,101,42,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,240,240,0.08)"; }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#E8652A", marginBottom: "4px" }}>
                Tommy&apos;s 電子報
              </div>
              <div style={{ fontSize: "12px", color: "#f0f0f0", lineHeight: 1.55 }}>
                每兩週AI行銷與生活思考，寫給想一起成長的你
              </div>
            </div>
            {/* React-unmanaged container — Beehiiv injects target div + script here */}
            <div ref={beehiivRef} />
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
          .footer-top { grid-template-columns: 1fr !important; }
          footer > div { padding: 40px 24px 32px !important; }
        }
      `}</style>
    </footer>
  );
}
