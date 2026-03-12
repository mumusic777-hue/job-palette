import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Banknote, Clock, ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";
import { getJob } from "@/lib/microcms";
import { JOB_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id).catch(() => null);
  if (!job) return { title: "求人が見つかりません" };

  return {
    title: `${job.title} | ${job.companyName}`,
    description: job.description.slice(0, 120),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getJob(id).catch(() => null);

  if (!job) notFound();

  const salaryText =
    job.salaryMin && job.salaryMax
      ? `月給 ${job.salaryMin.toLocaleString()}円〜${job.salaryMax.toLocaleString()}円`
      : job.salaryMin
      ? `月給 ${job.salaryMin.toLocaleString()}円〜`
      : "給与応相談";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-base py-8">
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#e85d04]">ホーム</Link>
          <span>/</span>
          <Link href="/jobs" className="hover:text-[#e85d04]">求人一覧</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{job.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* ヘッダー */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                {job.companyLogo ? (
                  <Image
                    src={job.companyLogo.url}
                    alt={job.companyName}
                    width={64}
                    height={64}
                    className="rounded-xl border border-gray-100 object-contain flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center text-[#e85d04] font-bold text-2xl flex-shrink-0">
                    {job.companyName.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-[#e85d04] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {JOB_CATEGORY_LABELS[job.category]}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
                    </span>
                    {job.featured && (
                      <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                        注目
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{job.companyName}</p>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] leading-tight">
                {job.title}
              </h1>

              {/* キー情報 */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                  <Banknote className="w-5 h-5 text-[#e85d04] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">給与</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">{salaryText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                  <MapPin className="w-5 h-5 text-[#e85d04] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">勤務地</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                  <Clock className="w-5 h-5 text-[#e85d04] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">雇用形態</p>
                    <p className="text-sm font-bold text-[#1a1a2e]">
                      {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 仕事内容 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#e85d04] rounded-full inline-block" />
                仕事内容
              </h2>
              <div
                className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </div>

            {/* 応募要件 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-[#1a1a2e] mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#e85d04] rounded-full inline-block" />
                応募要件
              </h2>
              <div
                className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: job.requirements }}
              />
            </div>

            {/* タグ */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* サイドバー（応募） */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-20 space-y-4">
              <h2 className="font-bold text-[#1a1a2e] text-lg">この求人に応募する</h2>
              <p className="text-sm text-gray-500">
                専任のアドバイザーが応募から内定まで
                全力でサポートします。
              </p>
              <Link
                href={`/contact?job=${job.id}`}
                className="block w-full bg-[#e85d04] hover:bg-[#c44d03] text-white font-bold py-4 px-6 rounded-xl text-center transition-colors shadow-md"
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  LINEで応募・相談する
                </div>
              </Link>
              <div className="space-y-2">
                {[
                  "相談・応募は完全無料",
                  "学歴・経歴不問",
                  "アドバイザーが面接対策もサポート",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#e85d04] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-8">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#e85d04] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            求人一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
