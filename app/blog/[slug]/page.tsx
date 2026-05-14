import Link from "next/link";
import { marked } from "marked";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Tommy Chou`, description: post.excerpt };
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = marked(post.content) as string;

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

      <article style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 48px 100px" }}>
        <div style={{ maxWidth: "680px" }}>
        {/* Back link */}
        <Link
          href="/blog"
          className="back-link"
          style={{
            display: "inline-block",
            color: "#aaaaaa",
            fontSize: "13px",
            textDecoration: "none",
            marginBottom: "48px",
            transition: "color 0.2s",
          }}
        >
          ← 所有文章
        </Link>

        {/* Tag + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <span
            style={{
              color: "#ffffff",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.8)",
              fontSize: "11px",
              padding: "4px 10px",
              borderRadius: "5px",
            }}
          >
            {post.tag}
          </span>
          <span style={{ color: "#888888", fontSize: "12px" }}>
            {post.date} · {post.readTime} read
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            marginBottom: "20px",
            color: "#f0f0f0",
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            style={{
              color: "#aaaaaa",
              fontSize: "17px",
              lineHeight: 1.8,
              marginBottom: "48px",
              borderBottom: "0.5px solid rgba(255,255,255,0.07)",
              paddingBottom: "40px",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Article body */}
        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />

        </div>{/* end maxWidth 680px */}
      </article>

      <Footer />

      <style>{`
        .prose { color: #cccccc; font-size: 16px; line-height: 1.85; }
        .prose h2 { color: #f0f0f0; font-size: clamp(18px,3vw,26px); font-weight: 600; margin: 52px 0 16px; letter-spacing: -0.02em; }
        .prose h3 { color: #f0f0f0; font-size: clamp(16px,2.5vw,22px); font-weight: 600; margin: 40px 0 12px; }
        .prose p { margin: 0 0 22px; }
        .prose ul, .prose ol { padding-left: 22px; margin: 0 0 22px; }
        .prose li { margin-bottom: 8px; }
        .prose strong { color: #f0f0f0; font-weight: 600; }
        .prose blockquote {
          border-left: 2px solid #E8652A;
          padding: 4px 0 4px 20px;
          margin: 28px 0;
          color: #aaaaaa;
          font-style: italic;
        }
        .prose img { max-width: 100%; border-radius: 10px; margin: 28px 0; }
        .prose a { color: #E8652A; text-decoration: underline; text-underline-offset: 3px; }
        .prose a:hover { color: #f0f0f0; }
        .prose code {
          background: #0D1220;
          color: #cccccc;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .prose pre {
          background: #0D1220;
          color: #cccccc;
          padding: 20px 24px;
          border-radius: 10px;
          overflow-x: auto;
          margin: 28px 0;
          border: 0.5px solid rgba(255,255,255,0.08);
        }
        .prose pre code { background: none; padding: 0; }
        .back-link:hover { color: #f0f0f0 !important; }
        @media (max-width: 768px) {
          article { padding: 100px 20px 80px !important; }
        }
      `}</style>
    </main>
  );
}
