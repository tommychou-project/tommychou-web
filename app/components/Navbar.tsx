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
      {/* Fixed full-width outer bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          margin: 0,
          padding: 0,
          border: "none",
          outline: "none",
          background: scrolled ? "rgba(5,5,5,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          boxShadow: "none",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
          pointerEvents: "none",
        }}
      >
        {/* Inner row: max-width centred */}
        <nav
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
            pointerEvents: "auto",
          }}
        >
          {/* LEFT: Logo + nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            {/* Logo */}
            <button
              onClick={() => scrollTo("ch01")}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "inherit",
                letterSpacing: "0.04em",
                padding: 0,
                flexShrink: 0,
              }}
            >
              Tommy Chou
            </button>

            {/* Nav links — immediately right of logo */}
            <div
              className="nav-desktop"
              style={{ display: "flex", gap: "28px", alignItems: "center" }}
            >
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    letterSpacing: "0.03em",
                    padding: 0,
                    transition: "opacity 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                  }
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: CTA + mobile hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="nav-desktop"
              style={{
                display: "inline-block",
                color: "#ffffff",
                padding: "7px 20px",
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-hamburger"
              style={{
                display: "none",
                background: "none",
                border: "none",
                outline: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "20px",
                padding: 0,
                lineHeight: 1,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              background: "rgba(5,5,5,0.95)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 32px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              pointerEvents: "auto",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  padding: "12px 0",
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
                color: "#ffffff",
                padding: "12px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.4)",
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
