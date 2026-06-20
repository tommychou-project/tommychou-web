import type { Metadata } from "next";

// /home 的 page 是 client component（Tour 用了 window），無法直接 export metadata，
// 改由這個 server layout 提供（只負責 metadata，渲染原樣傳遞）。
export const metadata: Metadata = {
  title: "空間導覽 | Tommy Chou",
  description: "走進 Tommy Chou 的互動式空間導覽，一個場景一個場景認識我的作品與想法。",
  alternates: {
    canonical: "/home",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
