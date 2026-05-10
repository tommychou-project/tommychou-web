"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Preloader from "@/app/components/Preloader";
import Navbar from "@/app/components/Navbar";
import Ch01Hero from "@/app/components/Ch01Hero";
import Ch02Journey from "@/app/components/Ch02Journey";
import Ch03About from "@/app/components/Ch03About";
import Ch04Blog from "@/app/components/Ch04Blog";
import Ch05Services from "@/app/components/Ch05Services";
import Ch06Contact from "@/app/components/Ch06Contact";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-follow ripple glow
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = rippleRef.current;
    if (!el) return;
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = rippleRef.current;
    if (el) el.style.opacity = "0";
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      <div
        style={{
          background: "#080C14",
          color: "#f0f0f0",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          minHeight: "100vh",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {/* Mouse ripple glow */}
        <div
          ref={rippleRef}
          style={{
            position: "fixed",
            pointerEvents: "none",
            zIndex: 0,
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,101,42,0.032) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
          }}
        />

        <Navbar />

        {/* Divider lines */}
        <Ch01Hero preloaderDone={preloaderDone} />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch02Journey />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch03About />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch04Blog />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch05Services />
        <div style={{ height: "0.5px", background: "rgba(240,240,240,0.05)", margin: "0 48px" }} />

        <Ch06Contact />

        <Footer />
      </div>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080C14; }
        ::selection { background: rgba(232,101,42,0.3); }
        @media (max-width: 768px) {
          div[style*="margin: 0 48px"] { margin: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
