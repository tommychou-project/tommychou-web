"use client";
import { useEffect, useRef, useState } from "react";

type Props = { preloaderDone: boolean };

export default function Ch01Hero({ preloaderDone }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const tcRef      = useRef<HTMLSpanElement>(null);
  const [muted, setMuted] = useState(true);

  // Fade-in on preloader done
  useEffect(() => {
    if (!preloaderDone || !contentRef.current) return;
    contentRef.current.style.opacity = "1";
    contentRef.current.style.transform = "translateY(0)";
  }, [preloaderDone]);

  // Cinema timecode driver (24fps)
  useEffect(() => {
    const node = tcRef.current;
    if (!node) return;
    const fps = 24;
    const tc = { h: 0, m: 0, s: 0, f: 0 };
    const pad = (n: number) => (n < 10 ? "0" + n : "" + n);
    const render = () => {
      node.textContent =
        "TC " + pad(tc.h) + ":" + pad(tc.m) + ":" + pad(tc.s) + ":" + pad(tc.f);
    };
    const tick = () => {
      tc.f++;
      if (tc.f >= fps) { tc.f = 0; tc.s++; }
      if (tc.s >= 60)  { tc.s = 0; tc.m++; }
      if (tc.m >= 60)  { tc.m = 0; tc.h++; }
      if (tc.h >= 100) { tc.h = 0; }
      render();
    };
    render();
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => { if (!reduced && id == null) id = setInterval(tick, 1000 / fps); };
    const stop  = () => { if (id != null) { clearInterval(id); id = null; } };
    start();
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const scrollToNext = () => {
    const el = document.getElementById("ch02");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const hudFont = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-end",
        textAlign: "left",
        padding: 0,
        position: "relative",
        scrollMarginTop: "80px",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {/* ── Background video ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Dark gradient overlay (left + bottom) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: [
            "linear-gradient(to right,  rgba(8,12,20,0.75) 0%, transparent 65%)",
            "linear-gradient(to top,    rgba(8,12,20,0.85) 0%, transparent 55%)",
          ].join(", "),
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Cinema HUD — REC (left) + TC (right) ── */}
      <div
        className="cine-hud"
        style={{
          position: "absolute",
          top: "84px",
          left: "160px",
          right: "160px",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        {/* REC indicator */}
        <span
          role="status"
          aria-label="Recording"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: hudFont,
            fontSize: "11px",
            letterSpacing: "0.22em",
            color: "#ffffff",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          <span className="cine-rec-dot" aria-hidden="true" />
          <span>REC</span>
        </span>

        {/* Timecode */}
        <span
          ref={tcRef}
          aria-label="Timecode"
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontFamily: hudFont,
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#ffffff",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          TC 00:00:00:00
        </span>
      </div>

      {/* ── Text content — bottom left, aligned to navbar ── */}
      <div
        className="hero-content-wrapper"
        style={{
          width: "100%",
          padding: "0 40px 80px 160px",
        }}
      >
        <div
          ref={contentRef}
          style={{
            position: "relative",
            zIndex: 2,
            opacity: 0,
            transform: "translateY(32px)",
            transition: "opacity 1.0s ease-out, transform 1.0s ease-out",
            maxWidth: "680px",
          }}
        >
          {/* Main headline */}
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              color: "#ffffff",
              whiteSpace: "nowrap",
            }}
          >
            你好，我是 Tommy
          </h1>

          {/* Slogan */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.95)",
              lineHeight: 1.65,
              maxWidth: "520px",
              margin: "0 0 40px",
              fontStyle: "italic",
              letterSpacing: "0.01em",
            }}
          >
            I help brands grow with story, strategy, and AI.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <button
              onClick={scrollToNext}
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "999px",
                padding: "10px 28px",
                cursor: "pointer",
                fontSize: "15px",
                fontFamily: "inherit",
                boxShadow: "0 0 6px rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 12px rgba(232,101,42,0.6), 0 0 28px rgba(232,101,42,0.3)";
                el.style.borderColor = "rgba(232,101,42,0.8)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
                el.style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              了解更多
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("ch06");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "999px",
                padding: "10px 28px",
                cursor: "pointer",
                fontSize: "15px",
                fontFamily: "inherit",
                boxShadow: "0 0 6px rgba(255,255,255,0.2)",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 12px rgba(232,101,42,0.6), 0 0 28px rgba(232,101,42,0.3)";
                el.style.borderColor = "rgba(232,101,42,0.8)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
                el.style.borderColor = "rgba(255,255,255,0.4)";
              }}
            >
              聯繫我
            </button>
          </div>
        </div>
      </div>

      {/* ── Mute toggle ── */}
      <button
        onClick={toggleMute}
        title={muted ? "開啟聲音" : "靜音"}
        style={{
          position: "absolute",
          bottom: "36px",
          right: "36px",
          zIndex: 3,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.45)",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          cursor: "pointer",
          fontSize: "18px",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.65)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.45)";
        }}
      >
        {muted ? "🔇" : "🔊"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

        .cine-rec-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          flex: 0 0 auto;
          animation: cine-blink 2.4s steps(2) infinite;
        }
        @keyframes cine-blink {
          0%, 60%   { opacity: 1; }
          61%, 100% { opacity: 0.2; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cine-rec-dot { animation: none; }
        }
        @media (max-width: 768px) {
          .hero-content-wrapper { padding: 0 24px 60px 24px !important; }
          .cine-hud { left: 24px !important; right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
