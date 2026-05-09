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
    const onScroll = () => setScrolled(window.scrollY > 60);
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
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          background: scrolled ? "rgba(8,8,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(255,255,255,0.07)" : "none",
          transition: "background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease",
        }}
      >
        <button
          onClick={() => scrollTo("ch01")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#f0f0f0",
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: "inherit",
            letterSpacing: "0.04em",
          }}
        >
          Tommy Chou
        </button>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(240,240,240,0.45)",
                fontSize: "13px",
                fontFamily: "inherit",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}
          <Link
            href="/contact"
            style={{
              background: "#E8F55A",
              color: "#080808",
              padding: "7px 18px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              letterSpacing: "0.02em",
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
            fontSize: "22px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            zIndex: 199,
            background: "rgba(8,8,8,0.97)",
            borderBottom: "0.5px solid rgba(255,255,255,0.07)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
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
              background: "#E8F55A",
              color: "#080808",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              marginTop: "12px",
              display: "block",
            }}
          >
            合作洽談
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
