import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { marked } from "marked";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Tommy Chou`,
    description: post.excerpt,
  };
}

export default function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const htmlContent = marked(post.content) as string;

  return (
    <main
      style={{
        background: "#080c12",
        minHeight: "100vh",
        color: "#fff",
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
          background: "rgba(8,12,18,0.92)",
          backdropFilter: "blur(16px)",
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
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Tommy Chou
        </Link>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {[
            { href: "/#about", label: "關於我" },
            { href: "/#work", label: "作品集" },
            { href: "/blog", label: "部落格" },
            { href: "/#contact", label: "聯絡" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              background: "#fff",
              color: "#080c12",
              padding: "8px 20px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            合作洽談
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "120px 48px 100px",
        }}
      >
        {/* Back */}
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "13px",
            textDecoration: "none",
            marginBottom: "48px",
            transition: "color 0.2s",
          }}
        >
          ← 所有文章
        </Link>

        {/* Tag + meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "4px",
              border: "0.5px solid rgba(255,255,255,0.1)",
            }}
          >
            {post.tag}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
            {post.date} · {post.readTime} read
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(24px,4vw,40px)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            marginBottom: "16px",
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "16px",
              lineHeight: 1.8,
              marginBottom: "48px",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              paddingBottom: "40px",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Markdown body */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "15px",
            lineHeight: 1.9,
          }}
        />

        {/* CTA */}
        <div
          style={{
            marginTop: "72px",
            padding: "32px",
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "14px",
              marginBottom: "20px",
              lineHeight: 1.8,
            }}
          >
            這篇文章對你有幫助嗎？歡迎聯絡我，聊聊你的品牌成長策略。
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              background: "#fff",
              color: "#080c12",
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            合作洽談 →
          </Link>
        </div>
      </article>

      {/* Prose styles */}
      <style>{`
        .prose h2 {
          color: #fff;
          font-size: clamp(18px, 3vw, 24px);
          font-weight: 500;
          margin: 48px 0 16px;
          letter-spacing: -0.02em;
          line-height: 1.4;
        }
        .prose h3 {
          color: rgba(255,255,255,0.85);
          font-size: clamp(15px, 2.5vw, 18px);
          font-weight: 500;
          margin: 32px 0 12px;
        }
        .prose p {
          margin: 0 0 20px;
        }
        .prose ul, .prose ol {
          padding-left: 20px;
          margin: 0 0 20px;
        }
        .prose li {
          margin-bottom: 8px;
        }
        .prose strong {
          color: #fff;
          font-weight: 500;
        }
        .prose a {
          color: rgba(255,255,255,0.7);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose blockquote {
          border-left: 2px solid rgba(255,255,255,0.15);
          padding-left: 20px;
          margin: 24px 0;
          color: rgba(255,255,255,0.4);
          font-style: italic;
        }
        .prose code {
          background: rgba(255,255,255,0.06);
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 13px;
          color: rgba(255,255,255,0.75);
        }
        .prose pre {
          background: rgba(255,255,255,0.04);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 20px;
          overflow-x: auto;
          margin: 0 0 24px;
        }
        .prose pre code {
          background: none;
          padding: 0;
        }
        .prose hr {
          border: none;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          margin: 40px 0;
        }
      `}</style>

      {/* Footer */}
      <footer
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          padding: "24px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>
            © 2025 Tommy Chou. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["LinkedIn", "YouTube", "Instagram"].map((s) => (
              <span
                key={s}
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
