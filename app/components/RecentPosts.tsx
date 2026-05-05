"use client";
import Link from "next/link";

const posts = [
  { slug: "ai-video-automation", title: "用 AI 打造影音自動化流水線，一個人頂一個團隊", date: "2025年4月", tag: "AI 自動化", readTime: "9 min" },
  { slug: "growth-flywheel", title: "成長策略不是燒廣告：建立可持續的行銷飛輪", date: "2025年3月", tag: "成長策略", readTime: "7 min" },
  { slug: "short-video-strategy", title: "短影音已死？不，是你的內容策略需要升級", date: "2025年2月", tag: "影音行銷", readTime: "6 min" },
  { slug: "personal-brand-for-consultants", title: "顧問如何用個人品牌帶來穩定案源？", date: "2025年1月", tag: "個人品牌", readTime: "8 min" },
];

export default function RecentPosts() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {posts.map((b, i) => (
        <Link key={b.slug} href={`/blog/${b.slug}`} style={{ textDecoration: "none" }}>
          <div style={{
            padding: "22px 0",
            borderBottom: i < posts.length - 1 ? "0.5px solid rgba(255,255,255,0.06)" : "none",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            cursor: "pointer", gap: "16px",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: "clamp(13px,2vw,15px)", fontWeight: 400, marginBottom: "6px" }}>{b.title}</div>
              <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>{b.date} · {b.readTime} read</div>
            </div>
            <div style={{
              color: "rgba(255,255,255,0.3)", fontSize: "11px", padding: "4px 10px",
              borderRadius: "4px", border: "0.5px solid rgba(255,255,255,0.1)",
              whiteSpace: "nowrap", flexShrink: 0,
            }}>{b.tag}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
