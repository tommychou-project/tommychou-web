import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isValidCategory } from "./taxonomy";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  /** 機器可解析的 ISO 日期（sitemap、未來 Article schema 使用） */
  date: string;
  /** UI 顯示用的日期字串（例 "2026年5月"） */
  displayDate: string;
  /** 單一分類，應為 taxonomy 白名單之一 */
  category: string;
  /** 標籤陣列（可多個） */
  tags: string[];
  readTime: string;
  excerpt: string;
  author: string;
  coverImage: string;
};

export type Post = PostMeta & {
  content: string;
};

// Keystatic 的 date 欄位會寫成「未加引號」的 YAML 日期（例 date: 2026-06-20），
// 被 js-yaml 解析成 JS Date 物件；既有手寫文章則是加引號的字串。
// 統一轉成 ISO 字串（YYYY-MM-DD），確保下游（render / sitemap / JSON-LD）拿到的永遠是字串。
function normalizeDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value == null ? "" : String(value);
}

function toMeta(slug: string, data: matter.GrayMatterFile<string>["data"]): PostMeta {
  const category = data.category ?? "";
  if (category && !isValidCategory(category)) {
    // 不在白名單內：印警告但不中斷 build
    console.warn(
      `[posts] 文章 "${slug}" 的 category "${category}" 不在白名單內，請改用 lib/taxonomy.ts 定義的分類。`
    );
  }

  // tags 優先讀複數陣列，向後相容舊的單數 tag 欄位
  const tags: string[] = Array.isArray(data.tags)
    ? data.tags
    : data.tag
      ? [data.tag]
      : [];

  const date = normalizeDate(data.date);

  return {
    slug,
    title: data.title ?? "",
    date,
    displayDate: data.displayDate ?? date,
    category,
    tags,
    readTime: data.readTime ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "",
    coverImage: data.coverImage ?? "",
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(raw);
    return toMeta(slug, data);
  });

  // 依 ISO 日期降冪排序
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return { ...toMeta(slug, data), content };
}
