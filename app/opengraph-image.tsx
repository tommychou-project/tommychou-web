import { renderBrandCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

// 全站預設分享卡（動態產生，免圖檔）。文案沿用 layout 既有的 title/description。
export const alt = SITE_TITLE;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderBrandCard(SITE_TITLE, SITE_DESCRIPTION);
}
