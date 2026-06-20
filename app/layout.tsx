import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/app/components/Cursor";
import { SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_URL, OG_IMAGE_SIZE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "zh_TW",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // 明確引用 OG 圖路由（不含 type，避免標錯圖片格式）。
    images: [{ url: "/og", ...OG_IMAGE_SIZE, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og", ...OG_IMAGE_SIZE, alt: SITE_TITLE }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <Cursor />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-88VQMPMJDP"></script>
  <script dangerouslySetInnerHTML={{ __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-88VQMPMJDP');
  `}} />
  {children}
</body>
    </html>
  );
}
