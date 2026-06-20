import fs from "fs";
import path from "path";
import { renderBrandCard } from "@/lib/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// 文章 OG 圖：以「一般 route handler」提供（非 opengraph-image 檔案慣例，
// 後者會自動寫死 og:image:type）。由 generateMetadata 的 openGraph.images 明確引用。
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  // 若 coverImage 對應的實體檔案存在於 public/ 就回傳它（可能是 JPEG/PNG）；
  // 否則 fallback 到動態預設卡（PNG）。檔案不存在時不會丟錯。
  if (post?.coverImage) {
    const filePath = path.join(process.cwd(), "public", post.coverImage);
    if (fs.existsSync(filePath)) {
      const data = await fs.promises.readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const type =
        ext === ".png"
          ? "image/png"
          : ext === ".webp"
            ? "image/webp"
            : ext === ".gif"
              ? "image/gif"
              : "image/jpeg";
      return new Response(new Uint8Array(data), {
        headers: { "Content-Type": type },
      });
    }
  }

  return renderBrandCard(post?.title ?? SITE_NAME, post?.excerpt ?? SITE_DESCRIPTION);
}
