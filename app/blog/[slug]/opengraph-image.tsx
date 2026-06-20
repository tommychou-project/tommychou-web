import fs from "fs";
import path from "path";
import { renderBrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const alt = SITE_NAME;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// 與文章一致預先產生，OG 圖會是靜態檔。
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);

  // 若 coverImage 對應的實體檔案存在於 public/ 就用它；否則 fallback 到動態預設卡。
  // 檔案不存在時不會丟錯、也不會送出壞掉的圖片連結。
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
