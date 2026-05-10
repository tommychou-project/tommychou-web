"use client";
import { useEffect, useRef, useState } from "react";

type Props = { preloaderDone: boolean };

export default function Ch01Hero({ preloaderDone }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // Reveal text after preloader
  useEffect(() => {
    if (!preloaderDone || !contentRef.current) return;
    contentRef.current.style.opacity = "1";
    contentRef.current.style.transform = "translateY(0)";
  }, [preloaderDone]);

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

  return (
    <section
      id="hero"
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

      {/* ── Dark gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(8,12,20,0.5) 0%, rgba(8,12,20,0.3) 50%, rgba(8,12,20,0.7) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Text content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          opacity: 0,
          transform: "translateY(32px)",
          transition: "opacity 1.0s ease-out, transform 1.0s ease-out",
        }}
      >
        {/* Chapter label */}
        <div
          style={{
            fontSize: "12px",
            color: "#E8652A",
            letterSpacing: "0.15em",
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
          <span style={{ color: "#E8652A" }}>Tommy</span>
        </h1>

        {/* Slogan */}
        <p
          style={{
            fontSize: "clamp(16px, 2.4vw, 24px)",
            color: "#aaaaaa",
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
              background: "transparent",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "999px",
              padding: "10px 28px",
              cursor: "pointer",
              fontSize: "15px",
              fontFamily: "inherit",
              boxShadow: "0 0 6px rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "0 0 10px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.12)";
              el.style.borderColor = "rgba(255,255,255,0.7)";
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
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.boxShadow = "0 0 10px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.12)";
              el.style.borderColor = "rgba(255,255,255,0.7)";
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

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          color: "rgba(240,240,240,0.2)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          animation: "heroBounce 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <span>scroll</span>
        <span style={{ fontSize: "14px" }}>↓</span>
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
        @keyframes heroBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.2; }
          50%       { transform: translateX(-50%) translateY(6px); opacity: 0.5; }
        }
        @media (max-width: 768px) {
          #hero { padding: 100px 24px 80px !important; }
        }
      `}</style>
    </section>
  );
}
