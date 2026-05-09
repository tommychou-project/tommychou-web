"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "關於我", id: "ch02" },
  { label: "服務", id: "ch05" },
  { label: "部落格", id: "ch04" },
  { label: "聯繫", id: "ch06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Outer wrapper: fixed full-width bar — gets frosted glass on scroll */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: "0",
          background: scrolled ? "rgba(5,5,5,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: "none",
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }}
      >
        {/* Inner capsule: max-width centred */}
        <nav
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderRadius: "0",
            border: "none",
            background: "transparent",
            backdropFilter: "none",
            transition: "all 0.5s ease",
            pointerEvents: "auto",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("ch01")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "inherit",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            Tommy Chou
          </button>

          {/* Desktop centre links */}
          <div
            className="nav-desktop"
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: "inherit",
                  letterSpacing: "0.03em",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                }
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Link
              href="/contact"
              style={{
                color: "#ffffff",
                padding: "7px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 0 12px rgba(255,255,255,0.25), 0 0 24px rgba(255,255,255,0.1)",
                background: "transparent",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "background 0.2s, box-shadow 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "0 0 18px rgba(255,255,255,0.4), 0 0 36px rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.boxShadow = "0 0 12px rgba(255,255,255,0.25), 0 0 24px rgba(255,255,255,0.1)";
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
              }}
            >
              合作洽談
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f0f0f0",
              fontSize: "20px",
              lineHeight: 1,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile dropdown — inside wrapper so it inherits the 900px context */}
        {menuOpen && (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto 0",
              background: "rgba(8,8,8,0.95)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "12px 20px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              pointerEvents: "auto",
              backdropFilter: "blur(16px)",
            }}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(240,240,240,0.7)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  padding: "11px 4px",
                  textAlign: "left",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                {l.label}
              </button>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#f0f0f0",
                padding: "12px",
                borderRadius: "999px",
                border: "0.5px solid rgba(255,255,255,0.35)",
                fontSize: "15px",
                fontWeight: 500,
                textDecoration: "none",
                textAlign: "center",
                marginTop: "10px",
                display: "block",
              }}
            >
              合作洽談
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
