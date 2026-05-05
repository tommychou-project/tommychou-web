"use client";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
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
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] =
      Array.from({ length: 80 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      }));
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
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
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
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

  return (
    <main style={{ background: "#080c12", minHeight: "100vh", color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        padding: "0 24px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "0.04em" }}>Tommy Chou</span>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: activeSection === link.id ? "#fff" : "rgba(255,255,255,0.4)",
              fontSize: "14px", fontFamily: "inherit", transition: "color 0.2s",
            }}>{link.label}</button>
          ))}
          <Link href="/contact" style={{
  background: "#fff", color: "#080c12",
  padding: "8px 20px", borderRadius: "6px",
  fontSize: "13px", fontWeight: 600, fontFamily: "inherit",
  textDecoration: "none",
}}>合作洽談</Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: "none", background: "none", border: "none",
          cursor: "pointer", color: "#fff", fontSize: "22px",
          padding: "4px",
        }} className="hamburger">☰</button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
          background: "rgba(8,12,18,0.98)", borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "16px 24px", display: "flex", flexDirection: "column", gap: "4px",
        }}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.7)", fontSize: "16px",
              fontFamily: "inherit", padding: "12px 0", textAlign: "left",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
            }}>{link.label}</button>
          ))}
         <Link href="/contact" onClick={() => setMenuOpen(false)} style={{
  background: "#fff", color: "#080c12",
  padding: "12px", borderRadius: "8px",
  fontSize: "15px", fontWeight: 600, fontFamily: "inherit",
  marginTop: "8px", textDecoration: "none", display: "block", textAlign: "center",
}}>合作洽談</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
          .two-col { grid-template-columns: 1fr !important; gap: 32px !important; }
          .work-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: repeat(3,1fr) !important; }
          .section-pad { padding: 80px 24px !important; }
          .hero-pad { padding: 100px 24px 60px !important; }
          .nav-pad { padding: 0 24px !important; }
          .footer-inner { flex-direction: column !important; gap: 12px !important; text-align: center !important; }
        }
      `}</style>

      {/* Hero */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "100px 48px 60px",
        position: "relative", zIndex: 1,
      }} className="hero-pad">
        <div style={{
          display: "inline-block", border: "0.5px solid rgba(255,255,255,0.18)",
          borderRadius: "20px", padding: "5px 16px", fontSize: "11px",
          color: "rgba(255,255,255,0.5)", letterSpacing: "0.14em",
          textTransform: "uppercase", marginBottom: "32px",
        }}>成長策略 · 影音自動化行銷顧問</div>

        <h1 style={{
          fontSize: "clamp(32px, 7vw, 76px)", fontWeight: 500,
          lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.02em",
        }}>
          讓你的品牌<br />
          <span style={{ color: "rgba(255,255,255,0.4)" }}>自動成長、持續曝光</span>
        </h1>

        <p style={{
          fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.4)",
          lineHeight: 1.8, maxWidth: "480px", marginBottom: "40px",
        }}>
          專注於成長策略與影音內容自動化，幫助品牌建立可複製、可規模化的行銷系統。
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => scrollTo("work")} style={{
            background: "#fff", color: "#080c12", border: "none",
            padding: "13px 28px", borderRadius: "8px", cursor: "pointer",
            fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
          }}>看作品集</button>
          <button onClick={() => scrollTo("contact")} style={{
            background: "transparent", color: "rgba(255,255,255,0.6)",
            border: "0.5px solid rgba(255,255,255,0.2)",
            padding: "13px 28px", borderRadius: "8px",
            cursor: "pointer", fontSize: "14px", fontFamily: "inherit",
          }}>聯絡我</button>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px",
          background: "rgba(255,255,255,0.06)", marginTop: "80px",
          borderRadius: "12px", overflow: "hidden",
          width: "100%", maxWidth: "560px",
          border: "0.5px solid rgba(255,255,255,0.06)",
        }} className="metrics-grid">
          {[{ num: "50+", label: "服務品牌數" }, { num: "8年", label: "產業經驗" }, { num: "3x", label: "平均成長倍數" }].map((m) => (
            <div key={m.label} style={{ background: "#080c12", padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 500 }}>{m.num}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />

      {/* About */}
      <section id="about" style={{ padding: "100px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }} className="section-pad">
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>About</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, marginBottom: "40px", letterSpacing: "-0.02em" }}>關於我</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }} className="two-col">
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 2 }}>
            <p style={{ marginBottom: "16px" }}>我是 Tommy，專注於<span style={{ color: "#fff" }}>成長策略</span>與<span style={{ color: "#fff" }}>影音內容自動化</span>的行銷顧問。協助品牌打造不需要每天手動操作、卻能持續產出內容的行銷系統。</p>
            <p style={{ marginBottom: "16px" }}>我相信好的行銷應該像機器一樣運轉——有系統、可複製、能規模化。</p>
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
                background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: "8px", padding: "12px 16px",
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

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />

      {/* Work */}
      <section id="work" style={{ padding: "100px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }} className="section-pad">
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Portfolio</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, marginBottom: "40px", letterSpacing: "-0.02em" }}>精選案例</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px" }} className="work-grid">
          {[
            { icon: "🎬", title: "影音自動化內容系統", desc: "幫助品牌每週產出 15 支短影音，人力降低 80%", tag: "影音自動化" },
            { icon: "📈", title: "電商成長飛輪建立", desc: "6 個月自然流量成長 240%，廣告依賴度下降", tag: "成長策略" },
            { icon: "🤖", title: "AI 行銷工作流程設計", desc: "導入 AI 工具，內容產出效率提升 5 倍", tag: "AI 自動化" },
            { icon: "🌏", title: "跨境品牌行銷策略", desc: "台灣品牌進軍東南亞，首年營收破千萬", tag: "國際行銷" },
          ].map((w) => (
            <div key={w.title} style={{
              background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", overflow: "hidden",
            }}>
              <div style={{
                height: "90px", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "32px", background: "rgba(255,255,255,0.02)",
                borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              }}>{w.icon}</div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>{w.title}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", lineHeight: 1.6 }}>{w.desc}</div>
                <div style={{
                  display: "inline-block", marginTop: "10px",
                  background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
                  fontSize: "11px", padding: "3px 10px", borderRadius: "4px",
                }}>{w.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />

      {/* Blog */}
      <section id="blog" style={{ padding: "100px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }} className="section-pad">
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Blog</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, marginBottom: "40px", letterSpacing: "-0.02em" }}>最新文章</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { title: "用 AI 打造影音自動化流水線，一個人頂一個團隊", date: "2025年4月", tag: "AI 自動化", time: "9 min" },
            { title: "成長策略不是燒廣告：建立可持續的行銷飛輪", date: "2025年3月", tag: "成長策略", time: "7 min" },
            { title: "短影音已死？不，是你的內容策略需要升級", date: "2025年2月", tag: "影音行銷", time: "6 min" },
            { title: "顧問如何用個人品牌帶來穩定案源？", date: "2025年1月", tag: "個人品牌", time: "8 min" },
          ].map((b, i) => (
            <div key={b.title} style={{
              padding: "22px 0",
              borderBottom: i < 3 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              cursor: "pointer", gap: "16px",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontSize: "clamp(13px,2vw,15px)", fontWeight: 400, marginBottom: "6px" }}>{b.title}</div>
                <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{b.date} · {b.time} read</div>
              </div>
              <div style={{
                color: "rgba(255,255,255,0.3)", fontSize: "11px", padding: "4px 10px",
                borderRadius: "4px", border: "0.5px solid rgba(255,255,255,0.1)",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>{b.tag}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "0 24px" }} />

      {/* Contact */}
      <section id="contact" style={{ padding: "100px 48px", maxWidth: "1080px", margin: "0 auto", position: "relative", zIndex: 1 }} className="section-pad">
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Contact</div>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, marginBottom: "40px", letterSpacing: "-0.02em" }}>合作洽談</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }} className="two-col">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "✉", text: "tommy@tommychou.com" },
              { icon: "📍", text: "台北，Taiwan（全球遠端）" },
              { icon: "💼", text: "LinkedIn / tommychou" },
            ].map((c) => (
              <div key={c.text} style={{ display: "flex", alignItems: "center", gap: "12px", color: "rgba(255,255,255,0.45)", fontSize: "14px" }}>
                <div style={{
                  width: "38px", height: "38px", background: "rgba(255,255,255,0.04)",
                  border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0,
                }}>{c.icon}</div>
                {c.text}
              </div>
            ))}
            <div style={{
              marginTop: "8px", padding: "18px",
              background: "rgba(255,255,255,0.03)", borderRadius: "10px",
              border: "0.5px solid rgba(255,255,255,0.08)",
            }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 2 }}>
                目前開放接受<br />
                <span style={{ color: "#fff" }}>成長顧問合作</span>、<span style={{ color: "#fff" }}>影音自動化工作坊</span>、<span style={{ color: "#fff" }}>演講邀約</span><br />
                歡迎來信，通常 24 小時內回覆。
              </p>
            </div>
          </div>
     <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  {[
    { label: "名字", placeholder: "Tommy", type: "text" },
    { label: "Email *", placeholder: "tommy@example.com", type: "email" },
    { label: "合作類型（顧問 / 工作坊 / 演講）", placeholder: "告訴我你的需求", type: "text" },
  ].map((f) => (
    <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>{f.label}</label>
      <input type={f.type} placeholder={f.placeholder} style={{
        width: "100%", background: "rgba(255,255,255,0.04)",
        border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "8px",
        padding: "12px 16px", color: "#fff", fontSize: "14px",
        fontFamily: "inherit", outline: "none",
      }} />
    </div>
  ))}
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}>你的需求或想法</label>
    <textarea placeholder="簡單說說你想解決什麼問題，或想聊什麼..." style={{
      width: "100%", background: "rgba(255,255,255,0.04)",
      border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "8px",
      padding: "12px 16px", color: "#fff", fontSize: "14px",
      fontFamily: "inherit", outline: "none", height: "120px", resize: "none",
    }} />
  </div>
  <Link href="/contact" style={{
    background: "#fff", color: "#080c12", border: "none",
    padding: "13px 28px", borderRadius: "8px", cursor: "pointer",
    fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
    alignSelf: "flex-start", textDecoration: "none", display: "inline-block",
  }}>
    送出訊息 →
  </Link>
</div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
        padding: "24px 48px", position: "relative", zIndex: 1,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="footer-inner">
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2025 Tommy Chou. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["LinkedIn", "YouTube", "Instagram"].map((s) => (
              <span key={s} style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px", cursor: "pointer" }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}