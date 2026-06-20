// 全站基礎資訊的單一來源（layout metadata 與 OG 圖共用，避免重複文案）。
export const SITE_NAME = "Tommy Chou";
export const SITE_URL = "https://www.tommychou.com";
export const SITE_TITLE = "Tommy Chou — 讓品牌自動成長";
export const SITE_DESCRIPTION =
  "Tommy Chou 是專注於成長策略與影音內容自動化的行銷顧問，幫助品牌建立可複製、可規模化的行銷系統。";

// OG 分享圖尺寸（OG 圖路由與 metadata 的 openGraph.images 共用）。
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
