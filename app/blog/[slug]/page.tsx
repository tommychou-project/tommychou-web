import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";

const posts: Record<string, { title: string; date: string; tag: string; readTime: string; excerpt: string; content: string }> = {
  "ai-video-automation": {
    title: "用 AI 打造影音自動化流水線，一個人頂一個團隊",
    date: "2025年4月", tag: "AI 自動化", readTime: "9 min",
    excerpt: "影音內容是目前最有效的行銷媒介，但也是最耗時間的。這篇文章分享我如何用 AI 工具建立一套自動化流水線，讓一個人也能產出團隊等級的影音內容量。",
    content: `## 為什麼影音自動化是現在最重要的議題\n\n每次我跟品牌主聊到影音內容，最常聽到的回答是：「我們知道要做，但沒有時間。」\n\n這個答案背後藏著一個舊時代的假設——影音內容需要大量人力。但現在，這個假設已經不成立了。\n\n## 我的自動化流水線長什麼樣子\n\n### 1. 主題研究\n\n用 AI 分析競品頻道、熱門話題，每週產出 10–15 個主題方向。\n\n### 2. 腳本生成\n\n根據選定主題，用結構化 prompt 生成腳本初稿。\n\n> 一個好的腳本 prompt，是整個系統最值得投資的環節。\n\n### 3. 語音與畫面\n\n- **語音**：ElevenLabs 克隆品牌人聲\n- **畫面**：Runway、Pika 生成 B-roll\n- **剪接**：Descript 自動對齊語音與字幕\n\n### 4. 發布排程\n\nn8n + Buffer 自動排程發布到 YouTube、IG Reels、TikTok。\n\n## 實際效果\n\n- 每週影音產出從 1 支提升到 8 支\n- 人力成本降低約 75%\n- 3 個月後自然流量成長 180%\n\n**重點不是用了哪些工具，而是流程設計。**`
  },
  "growth-flywheel": {
    title: "成長策略不是燒廣告：建立可持續的行銷飛輪",
    date: "2025年3月", tag: "成長策略", readTime: "7 min",
    excerpt: "很多品牌把「燒廣告」當成成長策略。但廣告停，流量就停。真正的成長策略，是建立一個可以自我強化的飛輪。",
    content: `## 廣告是油門，不是引擎\n\n我常用這個比喻：廣告是油門，不是引擎。油門一放開，車子就停了。\n\n## 什麼是行銷飛輪？\n\n**內容 → 流量 → 受眾 → 信任 → 轉換 → 口碑 → 更多內容素材**\n\n每一個環節都在強化下一個環節。\n\n## 建立飛輪的三個關鍵\n\n### 1. 找到你的飛輪起點\n\n電商品牌通常從 SEO 起步；服務業顧問通常從個人品牌起步。\n\n### 2. 設計可複製的內容機制\n\n- 每月 1–2 篇深度長文\n- 每週 3–5 篇社群短內容\n- 每季 1 個大型內容資產\n\n### 3. 測量飛輪速度\n\n看自然流量月成長率、品牌搜尋量趨勢、回訪率。`
  },
  "short-video-strategy": {
    title: "短影音已死？不，是你的內容策略需要升級",
    date: "2025年2月", tag: "影音行銷", readTime: "6 min",
    excerpt: "每隔幾個月就有人說短影音已死，但數據說的是另一回事。真正改變的，是演算法的偏好和觀眾的口味。",
    content: `## 短影音沒有死\n\n現在是 2025 年，短影音的總體觀看時間還在增長。\n\n## 真正改變的是什麼？\n\n### 演算法從「新鮮感」轉向「留存率」\n\n- **完播率**：觀眾看完多少比例？\n- **重複觀看**：有沒有人看第二遍？\n\n### 觀眾對廣告感越來越敏感\n\n**最有效的影音策略，是讓觀眾先學到東西，然後才意識到你在銷售。**\n\n## 升級策略\n\n### 前三秒只做一件事\n\n讓觀眾有理由留下來——一個反直覺的陳述，或直接告訴觀眾他們會學到什麼。\n\n### 短影音是入口，不是終點\n\n短影音 → 長影音/部落格 → email 名單 → 客戶。`
  },
  "personal-brand-for-consultants": {
    title: "顧問如何用個人品牌帶來穩定案源？",
    date: "2025年1月", tag: "個人品牌", readTime: "8 min",
    excerpt: "很多顧問靠人脈和轉介紹維生，但這種模式不穩定。個人品牌讓你從「等待別人介紹」變成「讓對的客戶主動找上你」。",
    content: `## 顧問的最大焦慮：案源不穩定\n\n忙的時候忙到沒時間睡覺，閒的時候閒到開始懷疑人生。\n\n## 個人品牌的本質：信任的規模化\n\n傳統人脈是一對一建立信任。個人品牌是一對多建立信任——**信任的槓桿**。\n\n## 三個層次\n\n### 第一層：展示你怎麼思考\n\n分享「你怎麼看待問題」，而不只是「你做了什麼」。\n\n### 第二層：記錄實戰案例\n\n「幫客戶解決了 X 問題，方法是 Y，結果是 Z」。\n\n### 第三層：建立可預期的觀點\n\n清晰的立場會吸引認同的客戶，自動篩掉不適合的客戶。\n\n## 需要多久？\n\n通常 6–12 個月才開始有明顯效果。但這正是它的護城河——大多數競品不願意等。`
  }
};

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
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,12,18,0.92)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid rgba(255,255,255,0.06)", padding: "0 48px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontSize: "16px", fontWeight: 500, color: "#fff", textDecoration: "none" }}>Tommy Chou</Link>
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {[{ href: "/#about", label: "關於我" }, { href: "/#work", label: "作品集" }, { href: "/blog", label: "部落格" }, { href: "/#contact", label: "聯絡" }].map((link) => (
            <Link key={link.href} href={link.href} style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textDecoration: "none" }}>{link.label}</Link>
          ))}
          <Link href="/contact" style={{ background: "#fff", color: "#080c12", padding: "8px 20px", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>合作洽談</Link>
        </div>
      </nav>
      <article style={{ maxWidth: "680px", margin: "0 auto", padding: "120px 48px 100px" }}>
        <Link href="/blog" style={{ display: "inline-block", color: "rgba(255,255,255,0.3)", fontSize: "13px", textDecoration: "none", marginBottom: "48px" }}>← 所有文章</Link>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", border: "0.5px solid rgba(255,255,255,0.1)" }}>{post.tag}</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>{post.date} · {post.readTime} read</span>
        </div>
        <h1 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.3, marginBottom: "16px" }}>{post.title}</h1>
        {post.excerpt && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", lineHeight: 1.8, marginBottom: "48px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", paddingBottom: "40px" }}>{post.excerpt}</p>}
        <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }} style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.9 }} />
        <div style={{ marginTop: "72px", padding: "32px", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "20px" }}>這篇文章對你有幫助嗎？歡迎聯絡我，聊聊你的品牌成長策略。</p>
          <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: "#080c12", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>合作洽談 →</Link>
        </div>
      </article>
      <style>{`.prose h2{color:#fff;font-size:clamp(18px,3vw,24px);font-weight:500;margin:48px 0 16px}.prose h3{color:rgba(255,255,255,0.85);font-size:18px;font-weight:500;margin:32px 0 12px}.prose p{margin:0 0 20px}.prose ul,.prose ol{padding-left:20px;margin:0 0 20px}.prose li{margin-bottom:8px}.prose strong{color:#fff;font-weight:500}.prose blockquote{border-left:2px solid rgba(255,255,255,0.15);padding-left:20px;margin:24px 0;color:rgba(255,255,255,0.4);font-style:italic}`}</style>
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "24px 48px" }}>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>© 2025 Tommy Chou. All rights reserved.</span>
      </footer>
    </main>
  );
}
