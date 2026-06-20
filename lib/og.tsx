import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL, OG_IMAGE_SIZE } from "./site";

// 共用的 OG 卡片渲染器。root 與文章頁的 OG 圖路由都用它。

// 從 Google Fonts 取得可被 satori 解析的 CJK 字型（truetype/opentype，非 woff2）。
// 全程包在 try/catch：取不到就回 null，改用內建字型，絕不讓 build 失敗。
async function loadCjkFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&text=${encodeURIComponent(
      text
    )}`;
    // 用舊版 Android UA 讓 Google 回傳 truetype（satori 不支援 woff2 / eot）。
    const css = await fetch(api, {
      headers: { "User-Agent": "Mozilla/5.0 (Linux; U; Android 2.2)" },
    }).then((r) => (r.ok ? r.text() : ""));
    // 嚴格只接受 truetype/opentype；其餘格式一律回 null 改用內建字型，避免 satori 解析錯誤。
    const url = css.match(
      /src:\s*url\((.+?)\)\s*format\(['"]?(?:truetype|opentype)['"]?\)/
    )?.[1];
    if (!url) return null;
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

// 預設品牌卡：純色背景 + 標題 + 描述。文案由呼叫端傳入（沿用既有 site metadata）。
export async function renderBrandCard(title: string, subtitle: string) {
  const font = await loadCjkFont(`${title}${subtitle}${SITE_NAME}`);
  const fontFamily = font ? "Noto Sans TC" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#080C14",
          color: "#f0f0f0",
          fontFamily,
          padding: "80px 90px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "6px",
            background: "#E8652A",
            borderRadius: "3px",
            marginBottom: "40px",
          }}
        />
        <div
          style={{
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
            marginBottom: "28px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "30px",
            lineHeight: 1.6,
            color: "#aaaaaa",
            maxWidth: "900px",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            marginTop: "auto",
            fontSize: "24px",
            color: "#E8652A",
          }}
        >
          {SITE_URL.replace("https://", "")}
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: font
        ? [{ name: "Noto Sans TC", data: font, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
