"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number;
    }[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.35 + 0.05,
    }));

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { id: "home", label: "首頁" },
    { id: "about", label: "關於我" },
    { id: "work", label: "作品集" },
    { id: "blog", label: "部落格" },
    { id: "contact", label: "聯絡" },
  ];

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
  };

  return (
    <main style={{
      background: "#080c12",
      minHeight: "100vh",
      color: "#fff",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      <canvas ref={canvasRef} style={{
        position: "fixed", top: 0, left: 0,
        zIndex: 0, pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "68px",
        background: "rgba(8,12,18,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}>
        <span style={{ fontSize: "17px", letterSpacing: "0.04em", fontWeight: 500 }}>
          Tommy Chou
        </span>
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeSection === link.id ? "#fff" : "rgba(255,255,255,0.4)",
              fontSize: "14px", letterSpacing: "0.02em",
              fontFamily: "inherit", transition: "color 0.2s",
            }}>
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{
            background: "#fff", color: "#080c12",
            border: "none", padding: "9px 22px",
            borderRadius: "6px", cursor: "pointer",
            fontSize: "13px", fontWeight: 600,
            fontFamily: "inherit", letterSpacing: "0.02em",
          }}>
            合作洽談
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 48px 60px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "inline-block",
          border: "0.5px solid rgba(255,255,255,0.18)",
          borderRadius: "20px", padding: "5px 16px",
          fontSize: "11px", color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.14em", textTransform: "uppercase",
          marginBottom: "36px",
        }}>
          成長策略 · 影音自動化行銷顧問
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 80px)",
          fontWeight: 500, lineHeight: 1.12,
          marginBottom: "24px", letterSpacing: "-0.02em",
          color: "#fff",
        }}>
          讓你的品牌<br />
          <span style={{ color: "rgba(255,255,255,0.45)" }}>自動成長、持續曝光</span>
        </h1>

        <p style={{
          fontSize: "16px", color: "rgba(255,255,255,0.4)",
          lineHeight: 1.8, maxWidth: "480px", marginBottom: "44px",
        }}>
          專注於成長策略與影音內容自動化，幫助品牌建立可複製、可規模化的行銷系統。
        </p>

        <div style={{ display: "flex", gap: "14px" }}>
          <button onClick={() => scrollTo("work")} style={{
            background: "#fff", color: "#080c12",
            border: "none", padding: "13px 30px",
            borderRadius: "8px", cursor: "pointer",
            fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
          }}>
            看作品集
          </button>
          <button onClick={() => scrollTo("contact")} style={{
            background: "transparent", color: "rgba(255,255,255,0.6)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            padding: "13px 30px", borderRadius: "8px",
            cursor: "pointer", fontSize: "14px", fontFamily: "inherit",
          }}>
            聯絡我
          </button>
        </div>

        {/* Metrics */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: "1px", background: "rgba(255,255,255,0.06)",
          marginTop: "90px", borderRadius: "12px", overflow: "hidden",
          width: "100%", maxWidth: "560px",
          border: "0.5px solid rgba(255,255,255,0.06)",
        }}>
          {[
            { num: "50+", label: "服務品牌數" },
            { num: "8年", label: "產業經驗" },
            { num: "3x", label: "平均成長倍數" },
          ].map((m) => (
            <div key={m.label} style={{ background: "#080c12", padding: "28px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: 500, color: "#fff" }}>{m.num}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginTop: "4px", letterSpacing: "0.04em" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      {/* About */}
      <section id="about" style={{ padding: "120px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>About</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, color: "#fff", marginBottom: "48px", letterSpacing: "-0.02em" }}>關於我</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 2 }}>
            <p style={{ marginBottom: "20px" }}>
              我是 Tommy，專注於<span style={{ color: "#fff" }}>成長策略</span>與<span style={{ color: "#fff" }}>影音內容自動化</span>的行銷顧問。協助品牌打造不需要每天手動操作、卻能持續產出內容、持續吸引流量的行銷系統。
            </p>
            <p style={{ marginBottom: "20px" }}>
              我相信好的行銷應該像機器一樣運轉——有系統、可複製、能規模化。影音是目前觸及率最高的媒介，加上 AI 自動化工具，讓小團隊也能做出大品牌的內容量。
            </p>
            <p>目前開放接受顧問合作、工作坊邀約與演講。</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { name: "成長策略規劃", pct: 92 },
              { name: "影音內容自動化", pct: 88 },
              { name: "AI 行銷工具應用", pct: 85 },
              { name: "社群與廣告投放", pct: 80 },
              { name: "品牌定位", pct: 78 },
            ].map((s) => (
              <div key={s.name} style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "13px 16px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{s.name}</span>
                <div style={{ width: "80px", height: "1.5px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                  <div style={{ width: `${s.pct}%`, height: "1.5px", background: "#fff", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      {/* Work */}
      <section id="work" style={{ padding: "120px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Portfolio</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, color: "#fff", marginBottom: "48px", letterSpacing: "-0.02em" }}>精選案例</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px" }}>
          {[
            { icon: "🎬", title: "影音自動化內容系統", desc: "幫助品牌每週產出 15 支短影音，人力降低 80%", tag: "影音自動化" },
            { icon: "📈", title: "電商成長飛輪建立", desc: "6 個月自然流量成長 240%，廣告依賴度下降", tag: "成長策略" },
            { icon: "🤖", title: "AI 行銷工作流程設計", desc: "導入 AI 工具，內容產出效率提升 5 倍", tag: "AI 自動化" },
            { icon: "🌏", title: "跨境品牌行銷策略", desc: "台灣品牌進軍東南亞，首年營收破千萬", tag: "國際行銷" },
          ].map((w) => (
            <div key={w.title} style={{
              background: "rgba(255,255,255,0.02)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", overflow: "hidden",
              transition: "border-color 0.2s", cursor: "pointer",
            }}>
              <div style={{
                height: "100px", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "36px",
                background: "rgba(255,255,255,0.02)",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              }}>{w.icon}</div>
              <div style={{ padding: "18px 20px" }}>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>{w.title}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: 1.6 }}>{w.desc}</div>
                <div style={{
                  display: "inline-block", marginTop: "12px",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "11px", padding: "4px 10px",
                  borderRadius: "4px", letterSpacing: "0.04em",
                }}>{w.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      {/* Blog */}
      <section id="blog" style={{ padding: "120px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Blog</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, color: "#fff", marginBottom: "48px", letterSpacing: "-0.02em" }}>最新文章</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {[
            { title: "用 AI 打造影音自動化流水線，一個人頂一個團隊", date: "2025年4月", tag: "AI 自動化", time: "9 min" },
            { title: "成長策略不是燒廣告：建立可持續的行銷飛輪", date: "2025年3月", tag: "成長策略", time: "7 min" },
            { title: "短影音已死？不，是你的內容策略需要升級", date: "2025年2月", tag: "影音行銷", time: "6 min" },
            { title: "顧問如何用個人品牌帶來穩定案源？", date: "2025年1月", tag: "個人品牌", time: "8 min" },
          ].map((b, i) => (
            <div key={b.title} style={{
              padding: "24px 0",
              borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              cursor: "pointer",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontSize: "15px", fontWeight: 400, marginBottom: "6px", letterSpacing: "-0.01em" }}>{b.title}</div>
                <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", letterSpacing: "0.04em" }}>{b.date} · {b.time} read</div>
              </div>
              <div style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px",
                padding: "4px 12px", borderRadius: "4px",
                border: "0.5px solid rgba(255,255,255,0.1)",
                marginLeft: "24px", whiteSpace: "nowrap", letterSpacing: "0.04em",
              }}>{b.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 48px" }} />

      {/* Contact */}
      <section id="contact" style={{ padding: "120px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>Contact</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 500, color: "#fff", marginBottom: "48px", letterSpacing: "-0.02em" }}>合作洽談</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { icon: "✉", text: "tommy@tommychou.com" },
              { icon: "📍", text: "台北，Taiwan（全球遠端）" },
              { icon: "💼", text: "LinkedIn / tommychou" },
            ].map((c) => (
              <div key={c.text} style={{ display: "flex", alignItems: "center", gap: "14px", color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px", display: "flex",
                  alignItems: "center", justifyContent: "center", fontSize: "16px",
                }}>{c.icon}</div>
                {c.text}
              </div>
            ))}
            <div style={{
              marginTop: "8px", padding: "20px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "10px",
              border: "0.5px solid rgba(255,255,255,0.08)",
            }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 2 }}>
                目前開放接受<br />
                <span style={{ color: "#fff" }}>成長顧問合作</span>、<span style={{ color: "#fff" }}>影音自動化工作坊</span>、<span style={{ color: "#fff" }}>演講邀約</span><br />
                歡迎來信，通常 24 小時內回覆。
              </p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {["你的名字", "Email", "合作類型（顧問 / 工作坊 / 演講）"].map((ph) => (
              <input key={ph} placeholder={ph} style={{ ...inputStyle }} />
            ))}
            <textarea placeholder="簡單說說你的需求..." style={{
              ...inputStyle, height: "110px", resize: "none",
            }} />
            <button style={{
              background: "#fff", color: "#080c12",
              border: "none", padding: "13px 28px",
              borderRadius: "8px", cursor: "pointer",
              fontSize: "14px", fontWeight: 600,
              fontFamily: "inherit", alignSelf: "flex-start",
            }}>
              送出訊息
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        padding: "28px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2025 Tommy Chou. All rights reserved.</span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["LinkedIn", "YouTube", "Instagram"].map((s) => (
            <span key={s} style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </footer>
    </main>
  );
}