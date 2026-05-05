"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js-na2.hsforms.net/forms/embed/246099184.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main style={{
      background: "#080c12", minHeight: "100vh",
      color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "60px",
        background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}>
        <Link href="/" style={{ color: "#fff", fontSize: "16px", fontWeight: 500, textDecoration: "none", letterSpacing: "0.04em" }}>
          Tommy Chou
        </Link>
        <Link href="/" style={{
          color: "rgba(255,255,255,0.4)", fontSize: "14px",
          textDecoration: "none", display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← 回首頁
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ padding: "80px 48px 40px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{
          fontSize: "11px", color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px",
        }}>Contact</div>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500,
          lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em",
        }}>
          讓我們一起<br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>做些有意義的事</span>
        </h1>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: "480px" }}>
          無論是成長策略顧問、影音自動化工作坊，或是演講邀約，歡迎填寫表單，我通常在 24 小時內回覆。
        </p>
      </div>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      {/* Form + Info */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 2fr",
        gap: "60px", padding: "60px 48px 80px",
        maxWidth: "1080px", margin: "0 auto",
      }}>
        {/* Left info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>開放項目</div>
            {["成長顧問合作", "影音自動化工作坊", "演講邀約"].map((item) => (
              <div key={item} style={{
                display: "flex", alignItems: "center", gap: "10px",
                color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px",
              }}>
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

        {/* HubSpot Form */}
        <div style={{ minHeight: "400px" }}>
          <div
            className="hs-form-frame"
            data-region="na2"
            data-form-id="4201d8f5-82aa-49ff-92f0-53921be15713"
            data-portal-id="246099184"
          />
        </div>
      </div>
    </main>
  );
}
