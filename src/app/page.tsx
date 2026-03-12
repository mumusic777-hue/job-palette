import Link from "next/link";
import { ArrowRight, Search, Users, Award, MessageCircle, CheckCircle } from "lucide-react";
import JobCard from "@/components/JobCard";
import VoiceCard from "@/components/VoiceCard";
import { getFeaturedJobs, getFeaturedVoices } from "@/lib/microcms";
import { JOB_CATEGORY_LABELS, type JobCategory } from "@/types";

// カテゴリ別求人検索ショートカット
const categoryItems: { key: JobCategory; emoji: string }[] = [
  { key: "sales", emoji: "💼" },
  { key: "office", emoji: "🗂️" },
  { key: "manufacturing", emoji: "🏭" },
  { key: "it", emoji: "💻" },
  { key: "service", emoji: "😊" },
  { key: "logistics", emoji: "🚚" },
  { key: "medical", emoji: "🏥" },
  { key: "food", emoji: "🍽️" },
];

// サービスフロー
const serviceSteps = [
  {
    step: "01",
    title: "無料カウンセリング",
    description:
      "まずはLINEや電話でお気軽にご相談ください。あなたの希望や状況をじっくりお聞きします。",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "求人のご紹介",
    description:
      "あなたの強みや将来の目標に合わせた求人を厳選してご紹介。5〜10年後のキャリアも一緒に考えます。",
    icon: Search,
  },
  {
    step: "03",
    title: "面接サポート",
    description:
      "書類作成から面接対策まで徹底サポート。自信を持って面接に臨めるよう全力で準備します。",
    icon: Users,
  },
  {
    step: "04",
    title: "内定・入社後フォロー",
    description:
      "内定後も安心。入社後のフォローまで継続して行い、長期的な活躍を応援します。",
    icon: Award,
  },
];

// 実績数値
const stats = [
  { value: "98%", label: "就職成功率" },
  { value: "3,000+", label: "累計支援実績" },
  { value: "500社+", label: "提携企業数" },
  { value: "4.8", label: "満足度（5点満点）" },
];

export default async function HomePage() {
  // CMS未設定時はエラーを握りつぶして空配列を使用（開発中）
  const [featuredJobs, featuredVoices] = await Promise.allSettled([
    getFeaturedJobs(6),
    getFeaturedVoices(3),
  ]);

  const jobs = featuredJobs.status === "fulfilled" ? featuredJobs.value : [];
  const voices = featuredVoices.status === "fulfilled" ? featuredVoices.value : [];

  return (
    <>
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-[#1a1a2e] via-[#2d1b4e] to-[#e85d04] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffd166] rounded-full blur-3xl" />
        </div>
        <div className="container-base relative py-24 sm:py-32">
          <div className="max-w-3xl">
            <span className="inline-block bg-[#e85d04] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              中卒・高卒・第二新卒 大歓迎
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              あなたらしい
              <br />
              <span className="text-[#ffd166]">「働く」</span>を
              <br />
              一緒に見つけよう
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl">
              学歴や経歴は関係ありません。
              JOB PALETTEは、あなたの可能性を信じて
              理想のキャリアへ導きます。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-[#e85d04] hover:bg-[#c44d03] text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
              >
                求人情報を探す
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#1a1a2e] font-bold py-4 px-8 rounded-full transition-all duration-200 text-lg"
              >
                無料で相談する
              </Link>
            </div>

            {/* 実績 */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-black text-[#ffd166]">{stat.value}</p>
                  <p className="text-xs text-white/70 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリ別求人検索 */}
      <section className="py-16 bg-gray-50">
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
              職種から求人を探す
            </h2>
            <p className="text-gray-500 mt-2">気になる職種をクリックしてください</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categoryItems.map(({ key, emoji }) => (
              <Link
                key={key}
                href={`/jobs?category=${key}`}
                className="flex items-center gap-3 bg-white hover:bg-orange-50 border border-gray-200 hover:border-[#e85d04] rounded-xl px-4 py-3 transition-all duration-150 group"
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#e85d04]">
                  {JOB_CATEGORY_LABELS[key]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 注目求人 */}
      {jobs.length > 0 && (
        <section className="py-16">
          <div className="container-base">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
                  注目の求人情報
                </h2>
                <p className="text-gray-500 mt-1">厳選したおすすめ求人をご紹介</p>
              </div>
              <Link
                href="/jobs"
                className="hidden sm:inline-flex items-center gap-1 text-[#e85d04] text-sm font-medium hover:underline"
              >
                すべて見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-[#e85d04] text-white font-bold py-3 px-8 rounded-full"
              >
                すべての求人を見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* サービスフロー */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white" id="flow">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="text-[#e85d04] font-bold text-sm uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mt-2">
              就職・転職までの流れ
            </h2>
            <p className="text-gray-500 mt-2">
              相談から内定まで、全てのステップをサポートします
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  {index < serviceSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 -right-3 z-10 text-gray-300">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-black text-orange-100">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#e85d04]" />
                      </div>
                    </div>
                    <h3 className="font-bold text-[#1a1a2e] mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#e85d04] hover:bg-[#c44d03] text-white font-bold py-4 px-10 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              サービス詳細を見る
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* JOB PALETTEが選ばれる理由 */}
      <section className="py-20 bg-[#1a1a2e] text-white">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="text-[#ffd166] font-bold text-sm uppercase tracking-widest">
              Why JOB PALETTE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2">
              JOB PALETTEが選ばれる理由
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "学歴・経歴不問",
                description:
                  "中卒・高卒・第二新卒など、どんな経歴でも歓迎。あなたの「今」と「これから」を一緒に考えます。",
                icon: "🎓",
              },
              {
                title: "専任アドバイザーが二人三脚",
                description:
                  "担当アドバイザーが最初から最後まで一貫してサポート。安心して転職活動を進められます。",
                icon: "🤝",
              },
              {
                title: "完全無料のサポート",
                description:
                  "相談から内定まで、すべて無料。費用の心配なく転職活動に集中できます。",
                icon: "✨",
              },
            ].map((reason) => (
              <div
                key={reason.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-4">{reason.icon}</div>
                <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 転職者の声 */}
      {voices.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-base">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-[#e85d04] font-bold text-sm uppercase tracking-widest">
                  Success Stories
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mt-2">
                  転職者の声
                </h2>
                <p className="text-gray-500 mt-1">
                  JOB PALETTEで転職を成功させた方の声
                </p>
              </div>
              <Link
                href="/voice"
                className="hidden sm:inline-flex items-center gap-1 text-[#e85d04] text-sm font-medium hover:underline"
              >
                すべて見る
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {voices.map((voice) => (
                <VoiceCard key={voice.id} voice={voice} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#e85d04] to-[#f4a261] text-white">
        <div className="container-base text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            まずは気軽に相談してみませんか？
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            LINEで簡単に相談できます。
            相談は完全無料。あなたのペースで大丈夫です。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#e85d04] font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              LINEで無料相談する
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#e85d04] font-bold py-4 px-10 rounded-full text-lg transition-all duration-200"
            >
              求人情報を見る
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              相談・サポート完全無料
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              学歴・経歴不問
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              専任担当者があなたをサポート
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
