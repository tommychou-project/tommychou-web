"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0D1220",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "13px 16px",
    color: "#f0f0f0",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "#999999",
    letterSpacing: "0.06em",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <main
      style={{
        background: "#080C14",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <Navbar />

      {/* Hero header */}
      <div
        style={{
          padding: "120px 48px 48px",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#E8652A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Contact
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "20px",
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
          }}
        >
          讓我們一起<br />
          <span style={{ color: "#aaaaaa" }}>做些有意義的事</span>
        </h1>
        <p style={{ fontSize: "16px", color: "#999999", lineHeight: 1.8, maxWidth: "480px" }}>
          無論是成長策略顧問、影音自動化工作坊，或是演講邀約，
          歡迎填寫表單，我通常在 24 小時內回覆。
        </p>
      </div>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", margin: "0 48px" }} />

      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "60px",
          padding: "60px 48px 100px",
          maxWidth: "1080px",
          margin: "0 auto",
        }}
        className="contact-grid"
      >
        {/* Left: info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#888888",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              開放項目
            </div>
            {["成長顧問合作", "影音自動化工作坊", "演講邀約"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#aaaaaa",
                  fontSize: "14px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "#E8652A",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                color: "#888888",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              聯絡方式
            </div>
            <div style={{ color: "#aaaaaa", fontSize: "14px", lineHeight: 2 }}>
              <div>tommy@tommychou.com</div>
              <div>Vancouver, Canada</div>
              <div>全球遠端接案</div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>名字</label>
              <input
                style={inputStyle}
                placeholder="Tommy"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.3)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={labelStyle}>姓</label>
              <input
                style={inputStyle}
                placeholder="Chou"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.3)")}
                onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>Email *</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="tommy@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.3)")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)")}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={labelStyle}>你的需求或想法</label>
            <textarea
              style={{ ...inputStyle, height: "140px", resize: "none" }}
              placeholder="簡單說說你想解決什麼問題，或想聊什麼..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.3)")}
              onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {status === "success" && (
            <div
              style={{
                background: "rgba(232,101,42,0.08)",
                border: "0.5px solid rgba(232,101,42,0.3)",
                borderRadius: "8px",
                padding: "16px",
                color: "#E8652A",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              ✓ 訊息已送出！我會在 24 小時內回覆你。
            </div>
          )}

          {status === "error" && (
            <div
              style={{
                background: "rgba(255,80,80,0.08)",
                border: "0.5px solid rgba(255,80,80,0.3)",
                borderRadius: "8px",
                padding: "16px",
                color: "#ff8080",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              送出失敗，請稍後再試或直接寄信至 tommy@tommychou.com
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.6)",
              padding: "13px 32px",
              borderRadius: "8px",
              cursor: status === "loading" ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: 500,
              fontFamily: "inherit",
              alignSelf: "flex-start",
              opacity: status === "loading" ? 0.6 : 1,
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "0 0 12px rgba(255,255,255,0.2)";
              el.style.borderColor = "rgba(255,255,255,0.9)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "none";
              el.style.borderColor = "rgba(255,255,255,0.6)";
            }}
          >
            {status === "loading" ? "送出中..." : "送出訊息 →"}
          </button>
        </form>
      </div>

      <Footer />

      <style>{`
        input::placeholder, textarea::placeholder { color: #555555 !important; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; padding: 40px 24px 80px !important; }
          div[style*="padding: 120px 48px"] { padding: 100px 24px 40px !important; }
          div[style*="margin: 0 48px"] { margin: 0 24px !important; }
        }
      `}</style>
    </main>
  );
}
