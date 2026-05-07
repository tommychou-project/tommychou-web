"use client";

import { useState } from "react";
import Link from "next/link";

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

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
  };

  return (
    <main style={{
      background: "#080c12", minHeight: "100vh",
      color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "60px",
        background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}>
        <Link href="/" style={{ color: "#fff", fontSize: "16px", fontWeight: 500, textDecoration: "none" }}>
          Tommy Chou
        </Link>
        <Link href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>
          ← 回首頁
        </Link>
      </nav>

      <div style={{ padding: "80px 48px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>Contact</div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500, lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em" }}>
          讓我們一起<br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>做些有意義的事</span>
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "480px" }}>
          無論是成長策略顧問、影音自動化工作坊，或是演講邀約，歡迎填寫表單，我通常在 24 小時內回覆。
        </p>
      </div>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 2fr",
        gap: "60px", padding: "60px 48px 80px",
        maxWidth: "1080px", margin: "0 auto",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>開放項目</div>
            {["成長顧問合作", "影音自動化工作坊", "演講邀約"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
                <div style={{ width: "4px", height: "4px", background: "#fff", borderRadius: "50%", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>聯絡方式</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 2 }}>
              <div>tommy@tommychou.com</div>
              <div>台北，Taiwan</div>
              <div>全球遠端接案</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>名字</label>
              <input
                style={inputStyle}
                placeholder="Tommy"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>姓</label>
              <input
                style={inputStyle}
                placeholder="Chou"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>Email *</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="tommy@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>你的需求或想法</label>
            <textarea
              style={{ ...inputStyle, height: "140px", resize: "none" }}
              placeholder="簡單說說你想解決什麼問題，或想聊什麼..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {status === "success" && (
            <div style={{
              background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.15)",
              borderRadius: "8px", padding: "16px", color: "#fff", fontSize: "14px", textAlign: "center",
            }}>
              ✓ 訊息已送出！我會在 24 小時內回覆你。
            </div>
          )}

          {status === "error" && (
            <div style={{
              background: "rgba(255,80,80,0.1)", border: "0.5px solid rgba(255,80,80,0.3)",
              borderRadius: "8px", padding: "16px", color: "#ff8080", fontSize: "14px", textAlign: "center",
            }}>
              送出失敗，請稍後再試或直接寄信至 tommy@tommychou.com
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              background: "#fff", color: "#080c12", border: "none",
              padding: "14px 32px", borderRadius: "8px", cursor: "pointer",
              fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
              alignSelf: "flex-start", opacity: status === "loading" ? 0.6 : 1,
            }}
          >
            {status === "loading" ? "送出中..." : "送出訊息"}
          </button>
        </form>
      </div>
    </main>
  );
}