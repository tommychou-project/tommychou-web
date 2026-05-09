"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

// Links that scroll to homepage sections
const sectionLinks = [
  { label: "關於我", id: "about" },
  { label: "服務",   id: "services" },
];

// Links that navigate to other pages
const pageLinks = [
  { label: "部落格", href: "/blog" },
  { label: "聯繫",   href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Always show frosted — keeps navbar consistent across all pages
  useEffect(() => { setScrolled(true); }, []);

  /** Smooth-scroll on homepage; navigate to /#id on other pages */
  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  /** Logo — scroll to very top on homepage, navigate to / elsewhere */
  const goHome = () => {
    setMenuOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const btnStyle: React.CSSProperties = {
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
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: 0,
          margin: 0,
          border: "none",
          outline: "none",
          boxShadow: "none",
          background: scrolled ? "rgba(8,8,8,0.65)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }}
      >
        <nav
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
            position: "relative",
            pointerEvents: "auto",
          }}
        >
          {/* LEFT: Logo */}
          <button
            onClick={goHome}
            style={{
              ...btnStyle,
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            Tommy Chou
          </button>

          {/* CENTRE: all nav items — absolutely centred */}
          <div
            className="nav-desktop"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {/* Section scroll links */}
            {sectionLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => goToSection(l.id)}
                style={btnStyle}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.6")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              >
                {l.label}
              </button>
            ))}

            {/* Page navigation links */}
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "#ffffff",
                  fontSize: "15px",
                  fontFamily: "inherit",
                  letterSpacing: "0.03em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.6")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: CTA + mobile hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", zIndex: 1 }}>
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
              background: "rgba(5,5,5,0.96)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 40px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              pointerEvents: "auto",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {sectionLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => goToSection(l.id)}
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
            {pageLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "16px",
                  fontFamily: "inherit",
                  padding: "12px 0",
                  textDecoration: "none",
                  display: "block",
                  borderBottom: "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                {l.label}
              </Link>
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
