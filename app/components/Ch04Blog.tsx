"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import postsData from "@/lib/posts-data.json";

type PostData = {
  title: string;
  date: string;
  tag: string;
  readTime: string;
  excerpt: string;
};

const allPosts = Object.entries(postsData as Record<string, PostData>).map(
  ([slug, data]) => ({ slug, ...data })
);
const posts = allPosts.slice(0, 4);

export default function Ch04Blog() {
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
            <div
              style={{
                fontSize: "12px",
                color: "#E8652A",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Chapter 04
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
              color: "#E8652A",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              letterSpacing: "0.04em",
              border: "0.5px solid rgba(232,101,42,0.3)",
              padding: "8px 20px",
              borderRadius: "8px",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
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
          {posts.map((post) => (
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
                    color: "#cccccc",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
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
