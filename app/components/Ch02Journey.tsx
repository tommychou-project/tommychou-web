"use client";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2025 - 現今",
    role: "數位行銷與自動化策略",
    summary: "結合 AI 自動化工作流與國際貿易實務，協助企業優化跨境行銷與展會佈局。",
    detail:
      "專注於 AI 工作流的開發與應用。學習利用 n8n、claude 等工具，為 B2B 貿易公司打造自動化的開發與行銷系統，將技術 SEO、內容策略與自動化流程串聯。同時，發揮國際貿易的實戰優勢，我也負責協調跨國商務溝通，帶領外國業務與技師在台進行專業簡報與技術交流。在國際展會規劃中，我不僅負責視覺呈現，更導入數據追蹤與自動化獲客系統，讓更多台灣在地認識國外品牌。",
  },
  {
    year: "2024 - 2025",
    role: "品牌內容與影像指導",
    summary: "擔任短影音製作顧問，專業廚師自媒體帳號的內容企劃與影像拍攝。",
    detail:
      "以顧問角色參與短影音製作，也為專業藝人廚師打造一系列大眾看得懂的料理食譜影片。",
  },
  {
    year: "2021 - 2023",
    role: "倫敦電影學院",
    summary:
      "擔任攝影、紀錄片導演及美術指導，擅長在預算與創意間極限突破，曾以 200 英鎊預算打造 4,000 片 DVD 實景。",
    detail:
      "在倫敦電影學院期間，我深耕攝影指導（DoP）、紀錄片導演領域，但在一次意外的美術指導學習中，最具代表性的嘗試是曾運用僅 200 英鎊的預算，透過網路力量採購到 4,000 片 DVD，在攝影棚內親手打造出懷舊 DVD 錄影帶店。這段經驗磨練了我如何在有限資源中找到突破。",
  },
  {
    year: "2019 - 2020",
    role: "萬人級專案管理（基金會 50 週年）",
    summary:
      "與執行長共創萬人響應的週年活動。統籌從企劃發想、形象影片到網站規劃的全方位執行。",
    detail:
      "負責基金會 50 週年大型專案，直接對接執行長並帶領跨部門團隊。專案範疇橫跨：萬人實體活動統籌、形象短片製作、IG 社群營運策略、文創商品開發，以及官方網站的架構規劃。這次經歷讓我學會如何在複雜的專案中，確保品牌價值能傳遞給社會大眾。",
  },
  {
    year: "2013 - 2017",
    role: "跨域思維養成（社工、企管、博雅書院）",
    summary:
      "經歷雙城騎行與深山獨處。揉合社工同理心、商管決策邏輯與博雅教育探究本質的思考模式。",
    detail:
      "這是我跨界整合的起點。\n\n社工系｜傾聽與觀察：在醫院實習期間，我拍攝了癌症病童與家長的影像。儘管那段畫面基於隱私無法公開，卻啟發了我：影像媒體的力量，是我實踐社會關懷的最佳媒介。我學會了不帶評判地觀察，並從中看見需求。\n\n企管系｜流程與邏輯：管理學帶給我的是流程嚴謹度與商模全局觀，讓我學會在資源有限的情境下，透過機會成本評估做出目標導向的決策。\n\n博雅書院｜探究本質：經歷上海與北京的單車騎行、深山的獨處磨練與兩代人的深度訪談。我學會不斷追問「Why」而非僅僅是「How」，並深受僕人式領導啟發，致力於在團隊中發揮利他影響力。",
  },
  {
    year: "2013 以前",
    role: "初心啟蒙",
    summary: "以成為一名社會工作者為志業，建立對「人」與「社會」的深層關懷。",
    detail:
      "受母親作為資深醫療安寧社工的啟蒙，醫院場域曾是我童年極為熟悉的風景。在那裡，我常看到了生命在生老病前的脆弱與掙扎，這讓我天生能察覺每個人背後不為人知的不容易。\n\n雖然職稱改變，但我仍能以不同的形式持續實踐社工精神。這份初心是我所有行動的精神——無論是透過影像敘事還是系統規劃，核心始終是為了建構更溫暖的「人的社會支持」，並以此提醒自己：活在當下，傾聽生命的本質。",
  },
];

export default function Ch02Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

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

  const toggle = (idx: number) => {
    setExpandedIdx((prev) => (prev === idx ? null : idx));
  };

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
          <div
            style={{
              fontSize: "12px",
              color: "#E8652A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            SCENE 02 — THE JOURNEY
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
          className="ch02-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: Timeline */}
          <div style={{ position: "relative", paddingLeft: "28px" }}>
            {/* Vertical line */}
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

            {timeline.map((item, i) => {
              const isOpen = expandedIdx === i;
              const isLatest = i === 0;

              return (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    marginBottom: "32px",
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-34px",
                      top: "7px",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: isLatest ? "#E8652A" : "rgba(240,240,240,0.35)",
                      border: isLatest
                        ? "1.5px solid rgba(232,101,42,0.5)"
                        : "1.5px solid rgba(240,240,240,0.2)",
                      boxShadow: isLatest ? "0 0 6px rgba(232,101,42,0.5)" : "none",
                      flexShrink: 0,
                    }}
                  />

                  {/* Year */}
                  <div
                    style={{
                      fontSize: "11px",
                      color: isLatest ? "#E8652A" : "#888888",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Role */}
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: isLatest ? "#E8652A" : "#f0f0f0",
                      marginBottom: "6px",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.role}
                  </div>

                  {/* Summary — always visible */}
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#999999",
                      lineHeight: 1.7,
                      marginBottom: "10px",
                    }}
                  >
                    {item.summary}
                  </div>

                  {/* Toggle button */}
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: isOpen ? "#E8652A" : "rgba(240,240,240,0.35)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      fontFamily: "inherit",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#E8652A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = isOpen
                        ? "#E8652A"
                        : "rgba(240,240,240,0.35)";
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        transition: "transform 0.3s ease",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        fontSize: "10px",
                      }}
                    >
                      ▶
                    </span>
                    {isOpen ? "收起" : "了解更多"}
                  </button>

                  {/* Expanded detail */}
                  <div
                    style={{
                      maxHeight: isOpen ? "600px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.45s ease-out, opacity 0.35s ease-out",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div
                      style={{
                        marginTop: "14px",
                        background: "rgba(232,101,42,0.05)",
                        border: "0.5px solid rgba(232,101,42,0.15)",
                        borderRadius: "12px",
                        padding: "16px 18px",
                        fontSize: "13px",
                        color: "rgba(240,240,240,0.72)",
                        lineHeight: 1.85,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: 3:4 media box */}
          <div style={{ position: "sticky", top: "100px" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "133.33%", // 3:4 aspect ratio
                background: "#0D1220",
                border: "0.5px solid rgba(240,240,240,0.08)",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              {/* Placeholder content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(232,101,42,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "9px solid transparent",
                      borderBottom: "9px solid transparent",
                      borderLeft: "15px solid rgba(232,101,42,0.5)",
                      marginLeft: "3px",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(240,240,240,0.2)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Media
                </div>
              </div>
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
