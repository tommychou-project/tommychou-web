"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
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
        background: "#080C14",
        minHeight: "100vh",
        color: "#f0f0f0",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <Navbar />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 48px 100px" }}>
        {/* Page header */}
        <div
          style={{
            fontSize: "12px",
            color: "#E8652A",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "10px",
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
              color: "#888888",
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
              background: "#0D1220",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px",
              padding: "14px 16px 14px 44px",
              color: "#f0f0f0",
              fontSize: "14px",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.4)")
            }
            onBlur={(e) =>
              ((e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.15)")
            }
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
                color: "#666666",
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
          <div style={{ fontSize: "12px", color: "#888888", marginBottom: "24px" }}>
            找到 {filtered.length} 篇文章
          </div>
        )}

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtered.length === 0 ? (
            <div style={{ color: "#666666", fontSize: "15px", textAlign: "center", padding: "60px 0" }}>
              沒有找到符合的文章
            </div>
          ) : (
            filtered.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: "28px 0",
                    borderBottom: i < filtered.length - 1 ? "0.5px solid rgba(255,255,255,0.07)" : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "0.7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.opacity = "1")}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: "#f0f0f0",
                        fontSize: "clamp(15px, 2.2vw, 19px)",
                        fontWeight: 500,
                        marginBottom: "8px",
                        lineHeight: 1.5,
                      }}
                    >
                      {post.title}
                    </div>
                    {post.excerpt && (
                      <div style={{ color: "#aaaaaa", fontSize: "13.5px", lineHeight: 1.7, marginBottom: "10px" }}>
                        {post.excerpt}
                      </div>
                    )}
                    <div style={{ color: "#888888", fontSize: "12px" }}>
                      {post.date} · {post.readTime} read
                    </div>
                  </div>
                  {/* Tag badge */}
                  <div
                    style={{
                      color: "#cccccc",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "5px",
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

      <Footer />

      <style>{`
        input::placeholder { color: #666666 !important; }
        @media (max-width: 768px) {
          section { padding: 100px 20px 80px !important; }
        }
      `}</style>
    </main>
  );
}
