import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { generateMetadata as generateSEOMetadata, defaultSEO } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = generateSEOMetadata({
  title: defaultSEO.defaultTitle,
  description: defaultSEO.defaultDescription,
  canonical: defaultSEO.siteUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 根布局必须包含 html 和 body 标签
  // 为了避免嵌套HTML标签，这里提供基础结构
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Google Site Verification */}
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION} />
        )}

        {/* Google One Tap Script */}
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        />

        {/* Umami Analytics */}
        <script
          defer
          src="https://umami.wenhaofree.com/script.js"
          data-website-id="9bf16fcb-74c7-4fa1-bf5e-63694131abec"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
