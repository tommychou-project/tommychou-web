"use client";
import { useEffect, useRef } from "react";

const timeline = [
  {
    year: "2013–2017",
    role: "醫療社工",
    desc: "在醫院第一線，學習傾聽與人的故事。",
  },
  {
    year: "2017–2019",
    role: "倫敦電影學院",
    desc: "學習用影像語言說故事，畢業於 London Film School。",
  },
  {
    year: "2019–2022",
    role: "B2B Marketing",
    desc: "從內容到策略，協助科技公司打造品牌聲量。",
  },
  {
    year: "2022–2024",
    role: "AI & Automation",
    desc: "深入 AI 工具應用，建立行銷自動化系統。",
  },
  {
    year: "2024–",
    role: "跨境品牌顧問",
    desc: "橋接台灣與北美市場，幫助品牌跨越文化邊界。",
  },
];

const skills = [
  { emoji: "🎬", title: "Film Production", desc: "從概念到剪接的完整製作能力" },
  { emoji: "📊", title: "B2B Marketing", desc: "品牌策略、內容行銷、漏斗設計" },
  { emoji: "🤖", title: "AI Tools & Automation", desc: "AI 工作流程、內容自動化" },
  { emoji: "🌏", title: "Cross-Cultural Bridge", desc: "台灣 ↔ 北美市場橋接" },
  { emoji: "🧠", title: "Social Work & PM", desc: "同理心驅動的專案管理" },
];

export default function Ch02Journey() {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="ch02"
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
        {/* Header */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#E8652A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3px" }}>
            SCENE 02 — THE JOURNEY
          </div>
          <div style={{ fontSize: "12px", color: "rgba(240,240,240,0.45)", letterSpacing: "0.08em" }}>
            我的旅程
          </div>
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
            marginBottom: "72px",
          }}
        >
          我的角色與旅程
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="ch02-grid"
        >
          {/* Left: Timeline */}
          <div style={{ position: "relative", paddingLeft: "28px" }}>
            {/* vertical line */}
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "8px",
                bottom: "8px",
                width: "1px",
                background: "rgba(240,240,240,0.1)",
              }}
            />
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
        scrollMarginTop: "80px",
                  marginBottom: "40px",
                }}
              >
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-34px",
                    top: "6px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: i === timeline.length - 1 ? "#E8652A" : "rgba(240,240,240,0.35)",
                    border: "1.5px solid rgba(240,240,240,0.2)",
                  }}
                />
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888888",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  {item.year}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: i === timeline.length - 1 ? "#E8652A" : "#f0f0f0",
                    marginBottom: "6px",
                  }}
                >
                  {item.role}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#999999",
                    lineHeight: 1.65,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Skill Universe */}
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "rgba(240,240,240,0.28)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Skill Universe
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {skills.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0D1220",
                    border: "0.5px solid rgba(240,240,240,0.08)",
                    borderRadius: "14px",
                    padding: "20px 18px",
                    gridColumn: i === 4 ? "1 / -1" : undefined,
                    transition: "border-color 0.25s, transform 0.25s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(232,101,42,0.3)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,240,240,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "26px", marginBottom: "10px" }}>{s.emoji}</div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#f0f0f0",
                      marginBottom: "6px",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#999999",
                      lineHeight: 1.6,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch02-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          #ch02 { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
