import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "JOB PALETTE | 中卒・高卒・第二新卒の就職・転職サポート",
    template: "%s | JOB PALETTE",
  },
  description:
    "株式会社JOB PALETTEは中卒・高卒・第二新卒の方に特化した就職・転職サポートを提供しています。専任のアドバイザーがあなたに寄り添い、理想の働き方を一緒に見つけます。",
  keywords: ["就職", "転職", "高卒", "第二新卒", "キャリアサポート", "JOB PALETTE"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://job-palette.co.jp",
    siteName: "JOB PALETTE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
