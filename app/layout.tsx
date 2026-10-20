import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_KR } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Portfolio", template: "%s · Portfolio" },
  description: "Next.js + MongoDB로 만든 개인 포트폴리오 홈페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-6 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Built with Next.js · MongoDB · Auth.js — 웹서버보안프로그래밍 2026
          </div>
        </footer>
      </body>
    </html>
  );
}
