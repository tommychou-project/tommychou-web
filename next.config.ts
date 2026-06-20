import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開發時允許從 127.0.0.1 存取 dev 資源（否則 Next 16 會擋掉跨來源的
  // /_next 資源，導致 Keystatic 後台 SPA 載不進來、畫面空白）。僅影響 dev。
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
