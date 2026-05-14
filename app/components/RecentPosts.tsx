import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function RecentPosts({ count = 4 }: { count?: number }) {
  const posts = getAllPosts().slice(0, count);

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
