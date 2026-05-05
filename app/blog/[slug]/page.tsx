import Link from "next/link";
import { marked } from "marked";
import { notFound } from "next/navigation";
import postsData from "@/lib/posts-data.json";

type PostData = { title: string; date: string; tag: string; readTime: string; excerpt: string; slug: string; content: string; };
const posts = postsData as Record<string, PostData>;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = posts[slug];
  if (!post) return {};
  return { title: `${post.title} | Tommy Chou`, description: post.excerpt };
}
export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = posts[slug];
  if (!post) notFound();
  const htmlContent = marked(post.content) as string;
  return (
    <main style={{ background: "#080c12", minHeight: "100vh", color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid rgba(255,255,255,0.06)", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "16px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>Tommy Chou</Link>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
          {[{ href: "/#about", label: "關於我" }, { href: "/#work", label: "作品集" }, { href: "/blog", label: "部落格" }, { href: "/#contact", label: "聯絡" }].map((link) => (
            <Link key={link.href} href={link.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", textDecoration: "none" }}>{link.label}</Link>
          ))}
          <Link href="/contact" style={{ background: "#fff", color: "#080c12", padding: "8px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>合作洽談</Link>
        </div>
        <Link href="/contact" style={{ display: "none" }} className="mobile-cta">合作洽談</Link>
      </nav>
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}.mobile-cta{display:inline-block!important;background:#fff;color:#080c12;padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none}}`}</style>
      <article style={{ maxWidth: "680px", margin: "0 auto", padding: "120px 24px 100px" }}>
        <Link href="/blog" style={{ display: "inline-block", color: "rgba(255,255,255,0.3)", fontSize: "13px", textDecoration: "none", marginBottom: "48px" }}>← 所有文章</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", border: "0.5px solid rgba(255,255,255,0.1)" }}>{post.tag}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>{post.date} · {post.readTime} read</span>
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: "16px" }}>{post.title}</h1>
        {post.excerpt && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", lineHeight: 1.8, marginBottom: "48px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", paddingBottom: "40px" }}>{post.excerpt}</p>}
        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <div style={{ marginTop: "72px", padding: "32px", background: "rgba(255,255,255,0.03)", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "20px" }}>這篇文章對你有幫助嗎？歡迎聯絡我，聊聊你的品牌成長策略。</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#080c12", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>合作洽談 →</Link>
        </div>
      </article>
      <style>{`.prose h2{color:#fff;font-size:clamp(18px,3vw,24px);font-weight:500;margin:48px 0 16px}.prose p{margin:0 0 20px}.prose ul,.prose ol{padding-left:20px;margin:0 0 20px}.prose strong{color:#fff}.prose blockquote{border-left:2px solid rgba(255,255,255,0.15);padding-left:20px;margin:24px 0;color:rgba(255,255,255,0.4);font-style:italic}.prose img{max-width:100%;border-radius:8px;margin:24px 0}.prose a{color:rgba(255,255,255,0.7);text-decoration:underline}`}</style>
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "24px 48px" }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2025 Tommy Chou. All rights reserved.</span>
      </footer>
    </main>
  );
}
