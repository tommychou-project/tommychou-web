"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import postsData from "@/lib/posts-data.json";

type PostData = {
  title: string;
  date: string;
  tag: string;
  readTime: string;
  excerpt: string;
};

const allPosts = Object.entries(postsData as Record<string, PostData>)
  .map(([slug, data]) => ({ slug, ...data }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export default function BlogPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <main
      style={{
        background: "#080808",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "0 48px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#f0f0f0",
            textDecoration: "none",
          }}
        >
          Tommy Chou
        </Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              color: "rgba(240,240,240,0.4)",
              fontSize: "13px",
              textDecoration: "none",
            }}
          >
            ← 回首頁
          </Link>
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
            }}
          >
            合作洽談
          </Link>
        </div>
      </nav>

      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "120px 24px 100px",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "rgba(240,240,240,0.22)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Blog
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
            color: "#f0f0f0",
          }}
        >
          所有文章
        </h1>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: "52px" }}>
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(240,240,240,0.3)",
              fontSize: "15px",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="搜尋文章標題或標籤..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "#111111",
              border: "0.5px solid rgba(240,240,240,0.12)",
              borderRadius: "12px",
              padding: "14px 16px 14px 44px",
              color: "#f0f0f0",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                "rgba(232,245,90,0.4)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                "rgba(240,240,240,0.12)";
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(240,240,240,0.35)",
                fontSize: "16px",
                fontFamily: "inherit",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Results count */}
        {query && (
          <div
            style={{
              fontSize: "12px",
              color: "rgba(240,240,240,0.3)",
              marginBottom: "24px",
              letterSpacing: "0.04em",
            }}
          >
            找到 {filtered.length} 篇文章
          </div>
        )}

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                color: "rgba(240,240,240,0.25)",
                fontSize: "15px",
                textAlign: "center",
                padding: "60px 0",
              }}
            >
              沒有找到符合的文章
            </div>
          ) : (
            filtered.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "28px 0",
                    borderBottom:
                      i < filtered.length - 1
                        ? "0.5px solid rgba(240,240,240,0.06)"
                        : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "0.7";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "1";
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: "#f0f0f0",
                        fontSize: "clamp(15px, 2.2vw, 19px)",
                        fontWeight: 400,
                        marginBottom: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {post.title}
                    </div>
                    {post.excerpt && (
                      <div
                        style={{
                          color: "rgba(240,240,240,0.3)",
                          fontSize: "13px",
                          lineHeight: 1.7,
                          marginBottom: "8px",
                        }}
                      >
                        {post.excerpt}
                      </div>
                    )}
                    <div
                      style={{
                        color: "rgba(240,240,240,0.2)",
                        fontSize: "12px",
                      }}
                    >
                      {post.date} · {post.readTime} read
                    </div>
                  </div>
                  <div
                    style={{
                      color: "rgba(240,240,240,0.3)",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      border: "0.5px solid rgba(240,240,240,0.1)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    {post.tag}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <footer
        style={{
          borderTop: "0.5px solid rgba(240,240,240,0.06)",
          padding: "24px 48px",
        }}
      >
        <span style={{ color: "rgba(240,240,240,0.2)", fontSize: "13px" }}>
          © 2025 Tommy Chou. All rights reserved.
        </span>
      </footer>

      <style>{`
        input::placeholder { color: rgba(240,240,240,0.22) !important; }
        @media (max-width: 768px) {
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </main>
  );
}
