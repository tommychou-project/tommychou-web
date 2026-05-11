"use client";
import { useEffect, useRef, useState } from "react";
import ParticlePortrait from "./ParticlePortrait";

const qaData: { q: string; a: string }[] = [
  {
    q: "你提供什麼服務？",
    a: "我提供四類服務：B2B 品牌影音製作、影音內容自動化獲客系統、品牌影音策略與製作諮詢，以及個人生命經驗知識資料庫。每個專案都從傾聽你的需求與故事開始。",
  },
  {
    q: "你的背景是什麼？",
    a: "現為 B2B 農業加工領域的數位行銷，負責 SEO、品牌曝光、系統自動化與展會規劃。曾為廣告產業影音製作顧問，專精於中小型企業產品影片、教學以及餐飲料理影片製作。",
  },
  {
    q: "如何跟你合作？",
    a: "第一步：填寫下方表單或直接寄信。我通常在 24 小時內回覆，接著安排一次免費線上通話，確認彼此的目標與期望，我就會開始準備提案，陪伴你完成心中的目標與期望。",
  },
];

const bottomCards = [
  {
    title: "What I Do",
    items: ["品牌影音策略", "內容自動化系統", "跨文化橋接", "AI 工作流程設計"],
  },
  {
    title: "How I Work",
    items: ["深度傾聽優先", "故事驅動策略", "快速原型迭代", "長期夥伴關係"],
  },
  {
    title: "What I Care About",
    items: ["真實的人的故事", "跨越邊界的連結", "技術服務人性", "可持續的創作"],
  },
];

export default function Ch03About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visibleAnswer, setVisibleAnswer] = useState<string | null>(null);

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

  const handleQ = (idx: number) => {
    if (activeIdx === idx) {
      // toggle off
      setActiveIdx(null);
      setVisibleAnswer(null);
      return;
    }
    setActiveIdx(idx);
    setVisibleAnswer(null);
    setTimeout(() => setVisibleAnswer(qaData[idx].a), 280);
  };

  return (
    <section
      id="about"
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
        {/* Scene label — English only, no Chinese subtitle */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#E8652A", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SCENE 01 — THE PERSON
          </div>
        </div>

        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            marginBottom: "64px",
          }}
        >
          About Me
        </h2>

        {/* Two-column: particle portrait + Ask Tommy */}
        <div
          className="ch03-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            marginBottom: "72px",
            alignItems: "start",
          }}
        >
          {/* Left: particle portrait */}
          <div style={{ height: "420px", background: "transparent" }}>
            <ParticlePortrait />
          </div>

          {/* Right: Ask Tommy — questions on top, answer below */}
          <div
            style={{
              background: "#0D1220",
              border: "0.5px solid rgba(240,240,240,0.09)",
              borderRadius: "20px",
              padding: "28px 24px",
              minHeight: "420px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            {/* Header */}
            <div
              style={{
                fontSize: "11px",
                color: "#f0f0f0",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Ask Tommy
            </div>

            {/* Question buttons — top */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
              {qaData.map((item, idx) => (
                <button
                  key={item.q}
                  onClick={() => handleQ(idx)}
                  style={{
                    background: activeIdx === idx ? "rgba(232,101,42,0.1)" : "rgba(240,240,240,0.04)",
                    border: activeIdx === idx
                      ? "0.5px solid rgba(232,101,42,0.35)"
                      : "0.5px solid rgba(240,240,240,0.09)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: activeIdx === idx ? "#E8652A" : "rgba(240,240,240,0.55)",
                    fontSize: "12.5px",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  {item.q}
                </button>
              ))}
            </div>

            {/* Answer area — bottom */}
            <div style={{ flex: 1 }}>
              {visibleAnswer ? (
                <div
                  style={{
                    background: "rgba(232,101,42,0.06)",
                    border: "0.5px solid rgba(232,101,42,0.18)",
                    borderRadius: "12px",
                    padding: "16px",
                    color: "rgba(240,240,240,0.75)",
                    fontSize: "14px",
                    lineHeight: 1.75,
                    animation: "fadeInAnswer 0.4s ease-out",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#E8652A",
                      marginBottom: "8px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Tommy ·
                  </span>
                  {visibleAnswer}
                </div>
              ) : (
                <div
                  style={{
                    color: "rgba(240,240,240,0.2)",
                    fontSize: "13px",
                    fontStyle: "italic",
                    paddingTop: "4px",
                  }}
                >
                  點擊上方問題，了解更多關於我…
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom three columns */}
        <div
          className="ch03-bottom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {bottomCards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "#0D1220",
                border: "0.5px solid rgba(240,240,240,0.08)",
                borderRadius: "16px",
                padding: "24px 22px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#E8652A",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {card.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {card.items.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: "rgba(240,240,240,0.55)",
                      fontSize: "13.5px",
                      lineHeight: 1.5,
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(240,240,240,0.3)",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInAnswer {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .ch03-grid   { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ch03-bottom { grid-template-columns: 1fr !important; }
          #about       { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
