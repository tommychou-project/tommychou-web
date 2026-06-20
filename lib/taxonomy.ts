// 文章分類白名單（單選）。新增分類請在此維護。
export const CATEGORIES = [
  "AI × 行銷自動化",
  "影視 × 品牌敘事",
  "思考與成長",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function isValidCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value);
}
