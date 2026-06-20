import { config, fields, collection } from "@keystatic/core";
import { CATEGORIES } from "./lib/taxonomy";

// 後台儲存：dev 用 local（直接寫本機檔案），production 用 github。
// 用一個顯式的 NEXT_PUBLIC_ 旗標切換：
//   - 必須是 NEXT_PUBLIC_（client 與 server 兩端都讀得到），否則 Keystatic
//     的 client UI 與 server route handler 會解析出不同模式而失效。
//   - 不用 NODE_ENV：本機 production build 沒憑證時會直接失敗；而且 setup 時
//     需要「github 模式但還沒有憑證」來跑 GitHub App 建立流程。
// 本機預設不設此旗標 → local；production（及建立 GitHub App 時）設成 'github'。
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({ kind: "github", repo: "tommychou-project/tommychou-web" } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  collections: {
    posts: collection({
      label: "Posts",
      // slug = 檔名（對齊現有 content/posts/<slug>.md 規則）。
      slugField: "title",
      // 無結尾斜線 → 扁平單檔 content/posts/<slug>.md（與既有文章一致）。
      path: "content/posts/*",
      // 內文存進同一個 .md 檔的 markdown body（接續 gray-matter + marked）。
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        // 人類可讀標題存進 frontmatter `title`；slug（檔名）可在後台手動編輯。
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "Slug（檔名，英文 kebab-case）",
            description:
              "用來生成檔名，例如 learning-ai-feeling-lost。中文標題請手動填英文 slug。",
          },
        }),
        date: fields.date({
          label: "Date",
          description: "發佈日期，輸出 ISO（給 sitemap / Article schema 用）",
          validation: { isRequired: true },
        }),
        displayDate: fields.text({
          label: "Display date",
          description: "UI 顯示用的日期字串，例如「2026年5月」",
        }),
        category: fields.select({
          label: "Category",
          description: "單一分類（鎖三選一，定義於 lib/taxonomy.ts）",
          options: CATEGORIES.map((c) => ({ label: c, value: c })),
          defaultValue: CATEGORIES[0],
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "摘要，當 meta description 用",
          multiline: true,
        }),
        // readTime 不在原始需求清單，但既有 frontmatter 有、lib/posts.ts 會讀它；
        // 列入 schema 才不會在後台編輯既有文章時被刪掉（格式相容性最高優先）。
        readTime: fields.text({
          label: "Read time",
          description: "閱讀時間，例如「3 min」",
        }),
        author: fields.text({
          label: "Author",
          defaultValue: "Tommy Chou",
        }),
        coverImage: fields.image({
          label: "Cover image",
          description: "封面圖（給 OG 卡片用）",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        content: fields.markdoc({
          label: "Content",
          // 輸出純 markdown（.md），而非 .mdoc。
          extension: "md",
          options: {
            image: {
              directory: "public/images/posts",
              publicPath: "/images/posts/",
              schema: {
                alt: fields.text({ label: "Alt text" }),
                title: fields.text({
                  label: "Caption",
                  description: "圖說（顯示在圖片下方，選填）",
                }),
              },
            },
          },
        }),
      },
    }),
  },
});
