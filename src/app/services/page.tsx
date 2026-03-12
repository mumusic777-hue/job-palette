import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle,
  Search,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Clock,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "サービス案内",
  description:
    "JOB PALETTEの就職・転職サポートサービスをご案内します。無料カウンセリングから内定・入社後フォローまで、一貫したサポートを提供します。",
};

const serviceSteps = [
  {
    step: "STEP 01",
    icon: MessageCircle,
    title: "無料カウンセリング",
    duration: "約60分",
    description:
      "まずはあなたのことを知ることから始めます。現在の状況、希望する働き方、将来の夢などをじっくりお聞きします。",
    points: [
      "LINEや電話・対面など、ご都合に合わせた方法で実施",
      "履歴書・職務経歴書は不要（まっさらな状態でOK）",
      "専任アドバイザーが担当し、秘密は厳守",
      "転職・就職を強制することは一切ありません",
    ],
    bgColor: "bg-orange-50",
    iconColor: "text-[#e85d04]",
    iconBg: "bg-[#e85d04]",
  },
  {
    step: "STEP 02",
    icon: Search,
    title: "求人のご紹介",
    duration: "随時",
    description:
      "カウンセリングで把握したあなたの強みと希望に基づき、最適な求人を厳選してご紹介します。",
    points: [
      "500社以上の提携企業から最適な求人をマッチング",
      "5〜10年後のキャリアパスも見据えたご提案",
      "非公開求人も多数ご紹介可能",
      "1社に限らず複数社を比較検討できます",
    ],
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-600",
  },
  {
    step: "STEP 03",
    icon: Users,
    title: "面接・書類サポート",
    duration: "選考期間中",
    description:
      "書類作成から面接対策まで、徹底的にサポートします。自信を持って選考に臨めるよう二人三脚で準備します。",
    points: [
      "履歴書・職務経歴書の添削・アドバイス",
      "企業ごとに合わせた面接対策を実施",
      "模擬面接で本番さながらの練習が可能",
      "面接後のフィードバックも丁寧にお伝えします",
    ],
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    iconBg: "bg-green-600",
  },
  {
    step: "STEP 04",
    icon: Award,
    title: "内定・入社後フォロー",
    duration: "内定後も継続",
    description:
      "内定おめでとうございます！でもサポートはここで終わりません。入社後も安心して新しい職場に慣れられるようフォローします。",
    points: [
      "内定条件（給与・待遇）の交渉サポート",
      "入社前の不安・疑問を丁寧に解消",
      "入社後1ヶ月・3ヶ月・6ヶ月のフォローアップ",
      "もし困ったことがあればいつでも相談OK",
    ],
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-500",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] text-white py-20">
        <div className="container-base text-center">
          <span className="text-[#ffd166] font-bold text-sm uppercase tracking-widest">
            Our Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            就職・転職サポートの流れ
          </h1>
          <p className="text-white/70 mt-4 max-w-xl mx-auto text-lg">
            相談から内定・入社後フォローまで、<br />
            すべてのステップを専任アドバイザーがサポートします。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#ffd166]" />
              完全無料
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#ffd166]" />
              学歴・経歴不問
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#ffd166]" />
              就職成功率98%
            </span>
          </div>
        </div>
      </div>

      {/* サービスステップ */}
      <div className="py-16 bg-white">
        <div className="container-base">
          <div className="space-y-10">
            {serviceSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className={`rounded-2xl ${step.bgColor} p-8 flex flex-col lg:flex-row gap-8`}
                >
                  {/* ステップ番号とアイコン */}
                  <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4">
                    <div
                      className={`w-14 h-14 ${step.iconBg} rounded-2xl flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${step.iconColor} uppercase tracking-widest`}>
                        {step.step}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {step.duration}
                      </div>
                    </div>
                  </div>

                  {/* コンテンツ */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#1a1a2e] mb-3">
                      {step.title}
                    </h2>
                    <p className="text-gray-600 mb-5 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className={`w-4 h-4 ${step.iconColor} mt-0.5 flex-shrink-0`} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ステップ番号（大） */}
                  <div className="hidden lg:block">
                    <span className="text-8xl font-black text-black/5 select-none">
                      {index + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* よくある質問 */}
      <section className="py-16 bg-gray-50">
        <div className="container-base max-w-3xl">
          <h2 className="text-2xl font-bold text-[#1a1a2e] text-center mb-10">
            よくある質問
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "学歴が中卒・高卒でも相談できますか？",
                a: "もちろんです。JOB PALETTEは中卒・高卒・第二新卒の方を中心にサポートしています。学歴は一切関係ありません。",
              },
              {
                q: "費用はかかりますか？",
                a: "相談から内定・入社後フォローまで、すべて完全無料です。費用は一切かかりません。",
              },
              {
                q: "現在働いている状態でも相談できますか？",
                a: "はい。在職中の方も多くご相談いただいています。夜間・土日にもご対応できますので、お気軽にご連絡ください。",
              },
              {
                q: "相談したら必ず転職しないといけませんか？",
                a: "いいえ。相談したからといって転職を強制することはありません。まずは現状の整理や可能性を一緒に考えることから始めましょう。",
              },
              {
                q: "地方在住でも利用できますか？",
                a: "はい。LINEやビデオ通話でのオンライン相談も可能です。全国どこからでもご利用いただけます。",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="bg-white rounded-xl border border-gray-100 shadow-sm group"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-[#1a1a2e] list-none">
                  <span className="flex items-start gap-3">
                    <span className="text-[#e85d04] font-black text-lg leading-tight">Q.</span>
                    {faq.q}
                  </span>
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50 flex gap-3">
                  <span className="text-[#e85d04] font-black text-lg leading-tight flex-shrink-0">A.</span>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#e85d04] to-[#f4a261] text-white">
        <div className="container-base text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            まずは気軽に話しかけてください
          </h2>
          <p className="text-white/80 text-lg mb-8">
            LINEで簡単にメッセージを送るだけでOK。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#e85d04] font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              LINEで無料相談する
            </Link>
            <a
              href="tel:0X-XXXX-XXXX"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#e85d04] font-bold py-4 px-10 rounded-full text-lg transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              電話で相談する
            </a>
          </div>
          <p className="mt-4 text-sm text-white/70">
            平日 9:00〜20:00 / 土日祝 10:00〜18:00
          </p>
        </div>
      </section>
    </div>
  );
}
