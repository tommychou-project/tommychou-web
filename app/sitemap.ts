import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // 解析失敗時退回今天日期，絕不因日期問題把整篇文章排除在 sitemap 之外。
  const blogUrls = posts.map((post) => {
    const parsed = new Date(post.date);
    const lastModified = isNaN(parsed.getTime()) ? new Date() : parsed;
    return {
      url: `https://www.tommychou.com/blog/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: "https://www.tommychou.com",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://www.tommychou.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: "https://www.tommychou.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...blogUrls,
  ];
}