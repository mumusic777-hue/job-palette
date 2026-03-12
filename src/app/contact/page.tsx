import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Phone, CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "無料相談",
  description: "JOB PALETTEへの無料相談はLINEまたはお電話から。学歴・経歴不問、完全無料です。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-gradient-to-br from-[#e85d04] to-[#f4a261] text-white py-16">
        <div className="container-base text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">無料相談はこちら</h1>
          <p className="text-white/80 mt-3 text-lg">
            LINEで気軽にメッセージを送るだけでOKです
          </p>
        </div>
      </div>

      <div className="container-base py-12 max-w-3xl">
        {/* 安心ポイント */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-[#1a1a2e] mb-4 text-lg">ご相談前のご安心ください</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "相談は完全無料",
              "学歴・経歴は一切不問",
              "転職を強制することはありません",
              "個人情報は厳重に管理します",
              "在職中でも相談OK",
              "オンライン対応可（全国どこでも）",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[#e85d04] flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 相談方法 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {/* LINE */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-bold text-xl text-[#1a1a2e] mb-2">LINEで相談</h2>
            <p className="text-sm text-gray-500 mb-5">
              一番簡単な方法です。<br />
              友達追加してメッセージを送るだけ。
            </p>
            <a
              href="https://line.me/R/ti/p/XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              LINEで友達追加
            </a>
            <p className="text-xs text-gray-400 mt-3">24時間受付</p>
          </div>

          {/* 電話 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-[#e85d04] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-bold text-xl text-[#1a1a2e] mb-2">電話で相談</h2>
            <p className="text-sm text-gray-500 mb-5">
              すぐに話を聞いてほしい方は<br />
              お電話ください。
            </p>
            <a
              href="tel:0X-XXXX-XXXX"
              className="block w-full bg-[#e85d04] hover:bg-[#c44d03] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              0X-XXXX-XXXX
            </a>
            <p className="text-xs text-gray-400 mt-3">
              平日 9:00〜20:00 / 土日祝 10:00〜18:00
            </p>
          </div>
        </div>

        {/* 相談の流れ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-[#1a1a2e] text-lg mb-5">
            相談後の流れ
          </h2>
          <div className="space-y-4">
            {[
              { step: "1", text: "ご連絡いただいたら、担当アドバイザーからご挨拶" },
              { step: "2", text: "ご都合のよい日時を決めてカウンセリング（約60分）" },
              { step: "3", text: "あなたに合った求人をご提案" },
              { step: "4", text: "面接・書類サポートで内定へ" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <span className="w-8 h-8 bg-orange-50 text-[#e85d04] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </span>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm text-[#e85d04] font-medium hover:underline"
            >
              サービス詳細を見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
