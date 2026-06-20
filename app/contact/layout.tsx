import type { Metadata } from "next";

// /contact 的 page 是 client component，無法直接 export metadata，
// 改由這個 server layout 提供（只負責 metadata，渲染原樣傳遞）。
export const metadata: Metadata = {
  title: "聯絡 | Tommy Chou",
  description:
    "想合作品牌影音內容、從 0 到 1 搭建攝影棚，或內容自動化系統？歡迎與 Tommy Chou 聯絡，通常 24 小時內回覆。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
