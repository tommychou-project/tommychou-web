"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: "A",
    title: "品牌影音內容製作",
    fit: "中小型 B2B 公司、新創",
    price: "起價 NT$30,000（產出 1–2 支影片）",
    timeline: "依專案而定",
    comingSoon: false,
    items: [
      "網站首頁形象影片",
      "短影音製作",
    ],
  },
  {
    id: "B",
    title: "從 0 到 1 搭建自己的攝影棚",
    fit: "個人創作者、行銷部門",
    price: "起價 NT$36,000（不含設備採購費用）",
    timeline: "依專案而定",
    comingSoon: false,
    items: [
      "攝影、燈光、收音規劃",
      "場景搭建與工作流設計",
    ],
  },
  {
    id: "C",
    title: "內容自動化獲客系統",
    fit: "個人創作者、行銷部門",
    price: "",
    timeline: "",
    comingSoon: true,
    items: [
      "影像內容策略規劃",
      "AI 工具自動化流程建置",
      "CRM 系統整合",
    ],
  },
  {
    id: "D",
    title: "個人品牌諮詢",
    fit: "創業者、創作者",
    price: "",
    timeline: "",
    comingSoon: true,
    items: [
      "法文學習經驗分享",
      "生活經驗文字梳理",
      "內容架構設計",
      "個人品牌知識庫建立",
    ],
  },
];

export default function Ch05Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="services"
      style={{
        padding: "120px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
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
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#E8652A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3px" }}>
            SCENE 04 — THE WORK
          </div>
          <div style={{ fontSize: "12px", color: "rgba(240,240,240,0.45)", letterSpacing: "0.08em" }}>
            一起工作
          </div>
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            marginBottom: "16px",
          }}
        >
          Work With Me
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#999999",
            marginBottom: "64px",
            maxWidth: "520px",
            lineHeight: 1.7,
          }}
        >
          每個服務都從一個好問題開始。讓我們一起找到最適合你的方式。
        </p>

        <div
          className="ch05-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px",
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                background: "#0D1220",
                border: "0.5px solid rgba(240,240,240,0.08)",
                borderRadius: "18px",
                padding: "30px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
                transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                const d = e.currentTarget as HTMLDivElement;
                d.style.borderColor = "rgba(232,101,42,0.28)";
                d.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const d = e.currentTarget as HTMLDivElement;
                d.style.borderColor = "rgba(240,240,240,0.08)";
                d.style.transform = "translateY(0)";
              }}
            >
              {/* Service ID badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    background: "rgba(232,101,42,0.12)",
                    color: "#E8652A",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    padding: "4px 10px",
                    borderRadius: "6px",
                  }}
                >
                  服務 {s.id}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: "clamp(16px, 2vw, 20px)",
                  fontWeight: 600,
                  color: "#f0f0f0",
                  lineHeight: 1.4,
                  marginBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                {s.title}
              </h3>

              {/* Fit */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#999999",
                  marginBottom: "20px",
                  lineHeight: 1.5,
                }}
              >
                適合：{s.fit}
              </div>

              {/* Items */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "9px",
                  marginBottom: "24px",
                  flex: 1,
                }}
              >
                {s.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "#aaaaaa",
                      fontSize: "13px",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "#E8652A",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              {/* Price + Timeline / Coming Soon */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "18px",
                  borderTop: "0.5px solid rgba(240,240,240,0.08)",
                }}
              >
                {s.comingSoon ? (
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(240,240,240,0.3)",
                      fontStyle: "italic",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Coming Soon
                  </span>
                ) : (
                  <>
                    <div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#E8652A",
                          letterSpacing: "-0.01em",
                          lineHeight: 1.4,
                        }}
                      >
                        {s.price}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "rgba(240,240,240,0.3)",
                          marginTop: "2px",
                        }}
                      >
                        時程：{s.timeline}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      style={{
                        background: "transparent",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.6)",
                        borderRadius: "999px",
                        padding: "8px 18px",
                        fontSize: "13px",
                        textDecoration: "none",
                        boxShadow: "0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1), inset 0 0 8px rgba(255,255,255,0.05)",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.boxShadow = "0 0 12px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.2), inset 0 0 12px rgba(255,255,255,0.08)";
                        el.style.borderColor = "rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLAnchorElement;
                        el.style.boxShadow = "0 0 8px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1), inset 0 0 8px rgba(255,255,255,0.05)";
                        el.style.borderColor = "rgba(255,255,255,0.6)";
                      }}
                    >
                      洽談 →
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch05-grid { grid-template-columns: 1fr !important; }
          #ch05 { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
