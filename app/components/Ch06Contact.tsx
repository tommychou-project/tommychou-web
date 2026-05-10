"use client";
import { useEffect, useRef, useState } from "react";

export default function Ch06Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ firstName: "", email: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: "",
          email: form.email,
          message: `合作類型：${form.type}\n\n${form.message}`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inp = {
    width: "100%",
    background: "rgba(240,240,240,0.04)",
    border: "0.5px solid rgba(240,240,240,0.12)",
    borderRadius: "10px",
    padding: "13px 16px",
    color: "#f0f0f0",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <section
      id="ch06"
      style={{
        padding: "120px 48px 80px",
        position: "relative",
        scrollMarginTop: "80px",
        zIndex: 1,
      }}
    >
      <div
        ref={sectionRef}
        style={{
          opacity: 0,
          transform: "translateY(40px)",
          transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#E8652A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SCENE 05 — THE NEXT SCENE
          </div>
        </div>

        <div
          className="ch06-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: large statement text */}
          <div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 68px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#f0f0f0",
                marginBottom: "32px",
              }}
            >
              LET&apos;S BUILD{" "}
              <span style={{ color: "#E8652A" }}>SOMETHING</span>{" "}
              MEANINGFUL,{" "}
              <span style={{ color: "rgba(240,240,240,0.35)" }}>WARM,</span>{" "}
              AND USEFUL.
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {[
                { icon: "✉", text: "tommy@tommychou.com" },
                { icon: "📍", text: "Vancouver, Canada（全球遠端）" },
                { icon: "💼", text: "linkedin.com/in/tommychou" },
              ].map((c) => (
                <div
                  key={c.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    color: "#aaaaaa",
                    fontSize: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(240,240,240,0.04)",
                      border: "0.5px solid rgba(240,240,240,0.1)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "15px",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  {c.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div
            style={{
              background: "#0D1220",
              border: "0.5px solid rgba(240,240,240,0.09)",
              borderRadius: "20px",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(240,240,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>名字</label>
              <input
                style={inp}
                placeholder="Tommy"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(240,240,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email *</label>
              <input
                style={inp}
                type="email"
                placeholder="tommy@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(240,240,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>合作類型</label>
              <input
                style={inp}
                placeholder="影音製作 / 自動化系統 / 諮詢..."
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", color: "rgba(240,240,240,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>告訴我你的故事</label>
              <textarea
                style={{ ...inp, height: "120px", resize: "none" }}
                placeholder="你想解決什麼問題？有什麼夢想正在等待被說出來？"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            {status === "success" && (
              <div
                style={{
                  background: "rgba(232,101,42,0.08)",
                  border: "0.5px solid rgba(232,101,42,0.3)",
                  borderRadius: "10px",
                  padding: "14px",
                  color: "#E8652A",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                ✓ 訊息已送出！24 小時內回覆。
              </div>
            )}
            {status === "error" && (
              <div
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "0.5px solid rgba(255,80,80,0.3)",
                  borderRadius: "10px",
                  padding: "14px",
                  color: "#ff8080",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                送出失敗，請寄信至 tommy@tommychou.com
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.6)",
                borderRadius: "999px",
                padding: "12px 28px",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                fontSize: "15px",
                fontFamily: "inherit",
                opacity: status === "loading" ? 0.5 : 1,
                boxShadow: "0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1), inset 0 0 8px rgba(255,255,255,0.05)",
                transition: "all 0.3s ease",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                if (status === "loading") return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 12px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.2), inset 0 0 12px rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1), inset 0 0 8px rgba(255,255,255,0.05)";
                el.style.borderColor = "rgba(255,255,255,0.6)";
              }}
            >
              {status === "loading" ? "送出中..." : "送出訊息 →"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch06-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          #ch06 { padding: 80px 24px !important; }
        }
        #ch06 input::placeholder, #ch06 textarea::placeholder { color: rgba(240,240,240,0.2); }
        #ch06 input:focus, #ch06 textarea:focus { border-color: rgba(232,101,42,0.35) !important; }
      `}</style>
    </section>
  );
}
