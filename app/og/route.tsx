import { renderBrandCard } from "@/lib/og";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

// 全站預設分享卡（動態產生，免圖檔）。以「一般 route handler」提供，
// 而非 opengraph-image 檔案慣例 —— 後者會自動寫死 og:image:type，無法移除。
// 由 metadata 的 openGraph.images 明確引用此 URL。
export const dynamic = "force-static";

export function GET() {
  return renderBrandCard(SITE_TITLE, SITE_DESCRIPTION);
}
