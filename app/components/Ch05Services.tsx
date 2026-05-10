"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    id: "A",
    title: "B2B 品牌影音內容製作",
    fit: "中小型 B2B 公司、新創",
    price: "起價 CA$1,500",
    timeline: "2–4 週",
    items: [
      "形象片 / 產品 Demo",
      "LinkedIn 短影音",
      "客戶見證影片",
      "內訓培訓影片",
    ],
  },
  {
    id: "B",
    title: "影音內容自動化獲客系統",
    fit: "行銷部門、個人創作者",
    price: "起價 CA$2,500",
    timeline: "3–6 週",
    items: [
      "AI 工具流程建置",
      "長影片拆解短影音",
      "Podcast 轉文字系統",
      "團隊操作培訓",
    ],
  },
  {
    id: "C",
    title: "個人生命經驗知識資料庫",
    fit: "創業者 / 創作者",
    price: "起價 CA$800",
    timeline: "依專案",
    items: [
      "深度訪談錄製",
      "內容架構設計",
      "紀錄片 / 自傳規劃",
      "個人品牌知識庫",
    ],
  },
  {
    id: "D",
    title: "跨境品牌影音策略諮詢",
    fit: "台灣品牌進北美 / 北美品牌進亞洲",
    price: "CA$500 / session",
    timeline: "1–2 週",
    items: [
      "市場影像策略規劃",
      "本地化內容設計",
      "多語言內容系統",
      "跨文化品牌定位",
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
        <div
          style={{
            fontSize: "12px",
            color: "#E8652A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          CHAPTER 04
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

              {/* Price + Timeline */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "18px",
                  borderTop: "0.5px solid rgba(240,240,240,0.08)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#E8652A",
                      letterSpacing: "-0.01em",
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
