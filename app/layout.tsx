import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s · Portfolio" },
  description: "Next.js + MongoDB로 만든 개인 포트폴리오 홈페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-muted">
          Built with Next.js · MongoDB · Auth.js — 웹서버보안프로그래밍 2026
        </footer>
      </body>
    </html>
  );
}
