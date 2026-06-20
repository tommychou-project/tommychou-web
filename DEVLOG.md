# 開發日誌 — tommychou.com

## 2026-06-20｜技術 SEO 全面整備 ＋ 導入 Keystatic 後台

本次把網站從「能跑」推進到「能被搜尋引擎正確收錄 ＋ 能方便發文」的狀態。
技術棧：Next.js（App Router）＋ Vercel；文章為 `content/posts/*.md`，以 gray-matter 解析 frontmatter、marked 渲染。
分四個階段。

---

### 階段一：技術 SEO 稽核與修補

**背景**：對全站做 12 項 technical SEO 稽核。

**最關鍵的發現（致命 bug）**：唯一一篇文章的 frontmatter 日期寫成 `"2026年5月"`，無法被解析，導致它被 sitemap 的過濾條件整篇排除——等於 Google 完全找不到任何文章。

**分三批修補：**

- **批 1　`f25a101` fix(seo)**：frontmatter 標準化（`date` 改 ISO ＋ 新增顯示用 `displayDate`）、修掉 sitemap 日期 bug、新增 `robots.txt`、加入分類/標籤欄位（`category` / `tags`）。
- **批 2　`6f36170` feat(seo)**：Open Graph ＋ Twitter card（含動態 OG 圖）、`canonical` ＋ `metadataBase`、各頁獨立 title/description（`/blog`、`/contact`、`/home` 不再共用同一組）。
- **批 3　`d99018c` feat(seo)**：JSON-LD 結構化資料（首頁 `Person`、文章 `Article`/`BlogPosting`、`BreadcrumbList`）、RSS feed。

**結果**：12 項中 11 項完成並上線（唯一保留 #11 圖片 alt，目前無內容圖、近零影響）。文章重新進入 sitemap，已部署 production。

**關鍵設計決定**：
- 文章渲染本來就是 SSG（爬蟲拿得到內文），無需更動——這是最難改的一項，先天就對。
- 三個內容分類（支柱）定為：`AI × 行銷自動化`、`影視 × 品牌敘事`、`思考與成長`，集中定義於 `lib/taxonomy.ts`。

---

### 階段二：導入 Keystatic（git-based CMS 後台）

**選型理由**：想要像 WordPress 後台、能方便打字 ＋ 上傳圖片的編輯介面，但不犧牲 Next.js 的速度/安全，也不想內容被鎖在雲端。
- 選 **Keystatic**：內容以 markdown 留在自己 repo（零鎖定）、後台嵌在 Next.js app 內、無獨立伺服器、TypeScript schema、免費。
- 排除 Decap（已停止維護）、TinaCMS（順用需 Tina Cloud 相依）、Sanity/Contentful（雲端鎖定）。

**安裝內容**：admin 路由 ＋ API route ＋ `keystatic.config.ts`。schema 對齊既有 frontmatter：`title`/`date`/`displayDate`/`category`（select 鎖三選一）/`tags`/`excerpt`/`author`/`coverImage`/`content`。

**相容性關鍵**：
- 內文用 `fields.markdoc({ extension: 'md' })` → 輸出純 `.md`（不是 .mdoc/.mdx），延續既有 marked 渲染。
- `path: 'content/posts/*'` 不加結尾斜線 → 扁平單檔，對齊既有結構。
- **修掉一個真實 bug**：Keystatic 寫出「未加引號」的日期，gray-matter 會解析成 JS `Date` 物件 → 前台 render 500。於 loader 加 `normalizeDate()` 統一轉成 ISO 字串（對既有加引號字串零影響）。
- 儲存模式用顯式旗標 `NEXT_PUBLIC_KEYSTATIC_STORAGE`（`github`/`local`），而非 `NODE_ENV`（後者會讓本機 build 失敗、且 client/server 模式不一致）。

**commit**：`8bae147` feat: add Keystatic admin for blog；`8e07d8b` chore(dev): allow 127.0.0.1 dev origin。

**上線**：建立並連接 GitHub App、設定 Vercel 環境變數（5 個）、production `/keystatic` 讀寫皆驗證通過（含手機可用）。

---

### 階段三：封面圖修復

**問題**：既有文章的 `coverImage` 指向一個從未存在於 repo 的佔位檔；在後台換封面存檔時，Keystatic 嘗試「刪舊檔」，但舊檔不存在 → GitHub 拒絕整個 commit（錯誤訊息：`A path was requested for deletion which does not exist`）。

**關鍵發現**：Keystatic 的 `fields.image` 路徑規則是 `publicPath/<entry-slug>/<fieldKey>.<ext>`（帶 slug 子資料夾、檔名為欄位鍵），不是扁平路徑。第一次放成扁平路徑時後台讀不到，追進 `@keystatic/core` 原始碼才確認規則。

**修法**：把封面圖移到 `public/images/posts/learning-ai-feeling-lost/coverImage.jpg`，frontmatter 改為對應路徑（Keystatic 存檔時也會自動正規化成此格式）。

**commit**：`365c078` fix(blog): add real cover image for learning-ai-feeling-lost。

**結果**：後台正確顯示封面、存檔不再報錯；OG 分享卡改用真封面 JPEG，Article schema 的 `image` 也指向真封面。

---

### 階段四：移除誤導的 og:image:type

**問題**：OG 圖 meta 的 `og:image:type` 固定標 `image/png`，但實際圖片有時是 JPEG（有封面）、有時是 PNG（動態卡）——標籤會誤導。

**為何不是一行就能修**：該 meta 由 Next 的 `opengraph-image` 檔案慣例強制輸出、無法關閉。

**修法**：把兩個 magic `opengraph-image` 路由改成一般 route handler（`app/og`、`app/blog/[slug]/og`），並在 metadata 明確列出 `openGraph.images`（`url`/`width`/`height`/`alt`，不含 `type`）。

**commit**：`fix(seo): drop misleading og:image:type by serving OG images via explicit routes`。

**結果**：`og:image:type` / `twitter:image:type` 移除；`og:image` / width / height / alt / `twitter:image` 全部保留；兩種圖（封面 JPEG / 動態卡 PNG）皆正確輸出，meta 不再宣稱錯誤格式。

---

### 目前狀態與待辦

**完成並上線**：technical SEO（11/12）、Keystatic 後台（讀寫、線上、含手機）、封面圖、OG 細節。

**保留／日後再做（皆非急迫）**：
- 圖片 `next/image` / alt：目前無內容圖；之後寫圖文時，Keystatic 插圖會內建 alt 欄位，屬自然習慣。
- 分類/標籤的彙整頁路由（`/category/[name]`、`/tag/[name]`）：等文章累積到約 10–15 篇再做。
- 補社群連結 → Person schema 的 `sameAs`（目前刻意留空，未編造）。
- Google Search Console 提交 sitemap（讓 Google 早點重爬）。
- GitHub 帳號開兩步驟驗證（2FA）——帳號＝能改線上內容的鑰匙。

**接下來真正重要的事**：基礎建設已完成，剩下的是持續產出內容。工具的部分可以放下了。
