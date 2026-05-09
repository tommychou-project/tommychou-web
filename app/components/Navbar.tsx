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
    const onScroll = () => setScrolled(window.scrollY > 50);
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
      {/* Outer wrapper: fixed, full width */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: "16px 24px 0",
          pointerEvents: "none",   /* let clicks pass through the gap areas */
        }}
      >
        {/* Inner capsule: max-width centred */}
        <nav
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px 0 24px",
            borderRadius: "999px",
            border: scrolled
              ? "0.5px solid rgba(255,255,255,0.15)"
              : "0.5px solid rgba(255,255,255,0.0)",
            background: scrolled ? "rgba(8,8,8,0.7)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            transition:
              "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
            pointerEvents: "auto",  /* re-enable clicks on the bar itself */
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("ch01")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#f0f0f0",
              fontSize: "15px",
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
                  color: "rgba(240,240,240,0.55)",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  letterSpacing: "0.04em",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    "rgba(240,240,240,0.55)")
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
                color: "#f0f0f0",
                padding: "7px 18px",
                borderRadius: "999px",
                border: "0.5px solid rgba(255,255,255,0.4)",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "background 0.2s, border-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.65)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(255,255,255,0.4)";
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
              margin: "8px auto 0",
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
