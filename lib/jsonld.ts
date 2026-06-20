import fs from "fs";
import path from "path";
import { SITE_NAME, SITE_URL } from "./site";
import type { Post } from "./posts";

// 把相對路徑補成完整網址。
export function absoluteUrl(pathname: string): string {
  return `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function isoOrUndefined(date: string): string | undefined {
  const d = new Date(date);
  return isNaN(d.getTime()) ? undefined : d.toISOString();
}

// 沿用 OG 圖邏輯：coverImage 實體檔存在就用它，否則用動態 OG 圖網址。
export function postImageUrl(post: { slug: string; coverImage: string }): string {
  if (post.coverImage) {
    const filePath = path.join(process.cwd(), "public", post.coverImage);
    if (fs.existsSync(filePath)) return absoluteUrl(post.coverImage);
  }
  return absoluteUrl(`/blog/${post.slug}/opengraph-image`);
}

// 首頁 Person。codebase 找不到社群連結，因此省略 sameAs（不編造網址）。
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: SITE_URL,
    jobTitle: "行銷顧問 / Marketing Consultant",
  };
}

export function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const published = isoOrUndefined(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: published,
    // 無 updated 欄位 → dateModified 同 datePublished。
    dateModified: published,
    author: {
      "@type": "Person",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: postImageUrl(post),
    mainEntityOfPage: url,
  };
}

export function breadcrumbJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: absoluteUrl(`/blog/${post.slug}`),
      },
    ],
  };
}
