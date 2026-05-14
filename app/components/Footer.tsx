"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setSubStatus("success"); setEmail(""); }
      else setSubStatus("error");
    } catch { setSubStatus("error"); }
  };

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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#E8652A", marginBottom: "4px" }}>
                Tommy&apos;s 電子報
              </div>
              <div style={{ fontSize: "13px", color: "#f0f0f0", marginBottom: "16px", lineHeight: 1.5 }}>
                每兩週AI行銷與生活思考，寫給想一起成長的你
              </div>
              {subStatus === "success" ? (
                <div style={{ color: "#E8652A", fontSize: "13px", lineHeight: 1.6 }}>
                  ✓ 已訂閱！<br />
                  <span style={{ color: "rgba(240,240,240,0.4)", fontSize: "12px" }}>感謝你的支持</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      background: "rgba(240,240,240,0.06)",
                      border: "0.5px solid rgba(240,240,240,0.15)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "#f0f0f0",
                      fontSize: "13px",
                      fontFamily: "inherit",
                      outline: "none",
                      width: "200px",
                    }}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(232,101,42,0.5)")}
                    onBlur={(e)  => ((e.target as HTMLInputElement).style.borderColor = "rgba(240,240,240,0.15)")}
                  />
                  <button
                    type="submit"
                    disabled={subStatus === "loading"}
                    style={{
                      background: "transparent",
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.5)",
                      borderRadius: "999px",
                      padding: "8px 20px",
                      cursor: subStatus === "loading" ? "not-allowed" : "pointer",
                      fontSize: "13px",
                      fontFamily: "inherit",
                      opacity: subStatus === "loading" ? 0.5 : 1,
                      boxShadow: "0 0 8px rgba(255,255,255,0.2)",
                      transition: "all 0.3s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={(e) => {
                      if (subStatus === "loading") return;
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow = "0 0 12px rgba(255,255,255,0.4), 0 0 24px rgba(255,255,255,0.15)";
                      el.style.borderColor = "rgba(255,255,255,0.9)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.boxShadow = "0 0 8px rgba(255,255,255,0.2)";
                      el.style.borderColor = "rgba(255,255,255,0.5)";
                    }}
                  >
                    {subStatus === "loading" ? "訂閱中..." : "訂閱"}
                  </button>
                  {subStatus === "error" && (
                    <div style={{ color: "#ff8080", fontSize: "11px" }}>訂閱失敗，請再試一次</div>
                  )}
                </form>
              )}
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
