import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  readTime: string;
  excerpt: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      tag: data.tag ?? "",
      readTime: data.readTime ?? "",
      excerpt: data.excerpt ?? "",
    } as PostMeta;
  });

  // 依日期降冪排序
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    tag: data.tag ?? "",
    readTime: data.readTime ?? "",
    excerpt: data.excerpt ?? "",
    content,
  };
}
