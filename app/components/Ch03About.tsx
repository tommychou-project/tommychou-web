"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ParticleCloud3D = dynamic(() => import("./ParticleCloud3D"), {
  ssr: false,
  loading: () => <ParticleFallback />,
});

function ParticleFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      s: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.35 + 0.05,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
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
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

const qaData: Record<string, string> = {
  "你提供什麼服務？":
    "我提供四類服務：B2B 品牌影音製作、影音內容自動化獲客系統、個人生命經驗知識資料庫，以及跨境品牌影音策略諮詢。每個專案都從傾聽你的故事開始。",
  "你的背景是什麼？":
    "我曾是醫療社工、倫敦電影學院畢業生、B2B 行銷主管，現在是 AI 工具愛好者與跨境品牌顧問。這段非線性的旅程，讓我能從多角度看見品牌的潛力。",
  "如何跟你合作？":
    "第一步：填寫下方表單或直接寄信。我通常在 24 小時內回覆，接著安排一次免費探索通話，確認彼此的目標與期望。",
  "你用什麼工具？":
    "影片製作：Premiere Pro、DaVinci、CapCut。AI：Claude、ChatGPT、Midjourney、Descript、Notion AI。自動化：Zapier、Make、Airtable。我選工具，不被工具選。",
};

const presetQuestions = Object.keys(qaData);

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
  const [answer, setAnswer] = useState<string | null>(null);
  const [activeQ, setActiveQ] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleQ = (q: string) => {
    setActiveQ(q);
    setAnswer(null);
    setTimeout(() => setAnswer(qaData[q]), 350);
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
        <div
          style={{
            fontSize: "12px",
            color: "#E8F55A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Chapter 03
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

        {/* Two-column: 3D cloud + AI QA */}
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
          {/* Left: particle */}
          <div
            style={{
              height: "420px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "#0d0d0d",
              border: "0.5px solid rgba(240,240,240,0.07)",
            }}
          >
            {isMobile ? <ParticleFallback /> : <ParticleCloud3D />}
          </div>

          {/* Right: mock AI Q&A */}
          <div
            style={{
              background: "#111111",
              border: "0.5px solid rgba(240,240,240,0.09)",
              borderRadius: "20px",
              padding: "28px 24px",
              height: "420px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "rgba(240,240,240,0.28)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Ask Tommy
            </div>

            {/* Answer area */}
            <div
              style={{
                flex: 1,
                marginBottom: "20px",
                overflowY: "auto",
              }}
            >
              {answer ? (
                <div
                  style={{
                    background: "rgba(232,245,90,0.06)",
                    border: "0.5px solid rgba(232,245,90,0.18)",
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
                      color: "#E8F55A",
                      marginBottom: "8px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Tommy ·
                  </span>
                  {answer}
                </div>
              ) : (
                <div
                  style={{
                    color: "rgba(240,240,240,0.2)",
                    fontSize: "13px",
                    fontStyle: "italic",
                    paddingTop: "12px",
                  }}
                >
                  點擊下方問題，了解更多關於我…
                </div>
              )}
            </div>

            {/* Preset questions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQ(q)}
                  style={{
                    background: activeQ === q ? "rgba(232,245,90,0.1)" : "rgba(240,240,240,0.04)",
                    border: activeQ === q
                      ? "0.5px solid rgba(232,245,90,0.35)"
                      : "0.5px solid rgba(240,240,240,0.09)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: activeQ === q ? "#E8F55A" : "rgba(240,240,240,0.55)",
                    fontSize: "12.5px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                >
                  {q}
                </button>
              ))}
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
                background: "#111111",
                border: "0.5px solid rgba(240,240,240,0.08)",
                borderRadius: "16px",
                padding: "24px 22px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#E8F55A",
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
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .ch03-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .ch03-bottom { grid-template-columns: 1fr !important; }
          #ch03 { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
