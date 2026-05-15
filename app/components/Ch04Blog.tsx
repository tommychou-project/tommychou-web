"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function Ch04Blog({ posts }: { posts: PostMeta[] }) {
  const displayPosts = posts.slice(0, 4);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="ch04"
      style={{
        padding: "120px 48px",
        maxWidth: "1200px",
        margin: "0 auto",
        position: "relative",
        scrollMarginTop: "80px",
        zIndex: 1,
      }}
    >
      <div
        ref={sectionRef}
        style={{
          opacity: 0,
          transform: "translateY(40px)",
          transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "56px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontSize: "12px", color: "#E8652A", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "3px" }}>
                SCENE 03 — THE MIND
              </div>
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4.5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#f0f0f0",
              }}
            >
              最新文章
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              color: "#ffffff",
              fontSize: "14px",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.4)",
              padding: "8px 20px",
              borderRadius: "999px",
              whiteSpace: "nowrap",
              boxShadow: "0 0 6px rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 0 10px rgba(255,255,255,0.35), 0 0 24px rgba(255,255,255,0.12)";
              el.style.borderColor = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.boxShadow = "0 0 6px rgba(255,255,255,0.2)";
              el.style.borderColor = "rgba(255,255,255,0.4)";
            }}
          >
            查看所有文章 →
          </Link>
        </div>

        <div
          className="ch04-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px",
          }}
        >
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#0D1220",
                  border: "0.5px solid rgba(240,240,240,0.08)",
                  borderRadius: "16px",
                  padding: "28px 26px",
                  height: "100%",
                  transition: "border-color 0.25s, transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = "rgba(232,101,42,0.25)";
                  d.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = "rgba(240,240,240,0.08)";
                  d.style.transform = "translateY(0)";
                }}
              >
                {/* Tag */}
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    color: "#E8652A",
                    background: "rgba(232,101,42,0.08)",
                    border: "1px solid rgba(232,101,42,0.6)",
                    borderRadius: "5px",
                    padding: "3px 10px",
                    marginBottom: "16px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {post.tag}
                </div>

                {/* Title — 30% larger */}
                <h3
                  style={{
                    fontSize: "clamp(17px, 2.2vw, 22px)",
                    fontWeight: 500,
                    color: "#f0f0f0",
                    lineHeight: 1.45,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "rgba(240,240,240,0.38)",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(240,240,240,0.22)",
                  }}
                >
                  {post.date} · {post.readTime} read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ch04-grid { grid-template-columns: 1fr !important; }
          #ch04 { padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
