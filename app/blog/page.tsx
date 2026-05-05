import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "部落格 | Tommy Chou",
  description: "成長策略、影音自動化、AI 行銷工具應用——Tommy Chou 的深度文章",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "#080c12", minHeight: "100vh", color: "#fff", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid rgba(255,255,255,0.06)", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "0.04em", color: "#fff", textDecoration: "none" }}>Tommy Chou</Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }} className="desktop-nav">
          {[{ href: "/#about", label: "關於我" }, { href: "/#work", label: "作品集" }, { href: "/blog", label: "部落格" }, { href: "/#contact", label: "聯絡" }].map((link) => (
            <Link key={link.href} href={link.href} style={{ color: link.href === "/blog" ? "#fff" : "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>{link.label}</Link>
          ))}
          <Link href="/contact" style={{ background: "#fff", color: "#080c12", padding: "8px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>合作洽談</Link>
        </div>

        {/* Mobile 只顯示合作洽談 */}
        <Link href="/contact" style={{ display: "none" }} className="mobile-cta">合作洽談</Link>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-cta { display: inline-block !important; background: #fff; color: #080c12; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; }
        }
      `}</style>

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "120px 24px 100px" }}>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "8px" }}>Blog</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "60px" }}>所有文章</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ padding: "28px 0", borderBottom: i < posts.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: "clamp(14px,2vw,17px)", fontWeight: 400, marginBottom: "8px", lineHeight: 1.5 }}>{post.title}</div>
                  {post.excerpt && <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", lineHeight: 1.7 }}>{post.excerpt}</div>}
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", marginTop: "8px" }}>{post.date} · {post.readTime} read</div>
                </div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", border: "0.5px solid rgba(255,255,255,0.1)", whiteSpace: "nowrap", flexShrink: 0, marginTop: "4px" }}>{post.tag}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "24px 48px" }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2025 Tommy Chou. All rights reserved.</span>
      </footer>
    </main>
  );
}
