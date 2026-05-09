"use client";
import { useEffect, useRef } from "react";

type Props = { preloaderDone: boolean };

export default function Ch01Hero({ preloaderDone }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderDone || !ref.current) return;
    ref.current.style.opacity = "1";
    ref.current.style.transform = "translateY(0)";
  }, [preloaderDone]);

  const scrollToNext = () => {
    const el = document.getElementById("ch02");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="ch01"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 48px 80px",
        position: "relative",
        scrollMarginTop: "80px",
        zIndex: 1,
      }}
    >
      <div
        ref={ref}
        style={{
          opacity: 0,
          transform: "translateY(32px)",
          transition: "opacity 1.0s ease-out, transform 1.0s ease-out",
        }}
      >
        {/* Chapter label */}
        <div
          style={{
            fontSize: "11px",
            color: "rgba(240,240,240,0.25)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "36px",
          }}
        >
          Chapter 01
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontSize: "clamp(48px, 9vw, 110px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "28px",
            color: "#f0f0f0",
          }}
        >
          你好，我是{" "}
          <span style={{ color: "#E8F55A" }}>Tommy</span>
        </h1>

        {/* Slogan */}
        <p
          style={{
            fontSize: "clamp(16px, 2.4vw, 24px)",
            color: "rgba(240,240,240,0.45)",
            lineHeight: 1.65,
            maxWidth: "580px",
            margin: "0 auto 48px",
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          I help brands grow with story, strategy, and AI.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={scrollToNext}
            style={{
              background: "#E8F55A",
              color: "#080808",
              border: "none",
              padding: "14px 32px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "inherit",
              letterSpacing: "0.02em",
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
              color: "rgba(240,240,240,0.55)",
              border: "0.5px solid rgba(240,240,240,0.2)",
              padding: "14px 32px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontFamily: "inherit",
            }}
          >
            聯繫我
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "rgba(240,240,240,0.2)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          animation: "heroBounce 2s ease-in-out infinite",
        }}
      >
        <span>scroll</span>
        <span style={{ fontSize: "14px" }}>↓</span>
      </div>

      <style>{`
        @keyframes heroBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.2; }
          50% { transform: translateX(-50%) translateY(6px); opacity: 0.5; }
        }
        @media (max-width: 768px) {
          #ch01 { padding: 100px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
}
