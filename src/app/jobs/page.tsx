import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import JobCard from "@/components/JobCard";
import { getJobs } from "@/lib/microcms";
import { JOB_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS, type JobCategory, type EmploymentType } from "@/types";

export const metadata: Metadata = {
  title: "求人情報一覧",
  description: "JOB PALETTEの求人情報一覧。営業・事務・製造・IT・サービスなど多数の求人をご紹介しています。",
};

type SearchParams = {
  category?: string;
  employmentType?: string;
  q?: string;
  page?: string;
};

const LIMIT = 12;

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const offset = (page - 1) * LIMIT;

  // フィルター構築
  const filters: string[] = [];
  if (params.category) {
    filters.push(`category[equals]${params.category}`);
  }
  if (params.employmentType) {
    filters.push(`employmentType[equals]${params.employmentType}`);
  }

  const { contents: jobs, totalCount } = await getJobs({
    limit: LIMIT,
    offset,
    filters: filters.length > 0 ? filters.join("[and]") : undefined,
    q: params.q,
  }).catch(() => ({ contents: [], totalCount: 0 }));

  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-base py-10">
          <h1 className="text-3xl font-bold text-[#1a1a2e]">求人情報を探す</h1>
          <p className="text-gray-500 mt-2">
            {totalCount > 0
              ? `${totalCount}件の求人が見つかりました`
              : "条件に合う求人を探しています"}
          </p>

          {/* 検索バー */}
          <form method="GET" className="mt-6 flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={params.q}
                placeholder="職種・キーワードで検索"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e85d04] focus:border-transparent bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-[#e85d04] hover:bg-[#c44d03] text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              検索
            </button>
          </form>
        </div>
      </div>

      <div className="container-base py-8">
        <div className="flex gap-8">
          {/* サイドバー（フィルター） */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
              <h2 className="font-bold text-sm text-gray-700 flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-4 h-4" />
                絞り込み
              </h2>

              {/* 職種 */}
              <div className="mb-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  職種
                </h3>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/jobs"
                    className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                      !params.category
                        ? "bg-orange-50 text-[#e85d04] font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    すべて
                  </Link>
                  {(Object.keys(JOB_CATEGORY_LABELS) as JobCategory[]).map((key) => (
                    <Link
                      key={key}
                      href={`/jobs?category=${key}${params.q ? `&q=${params.q}` : ""}`}
                      className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        params.category === key
                          ? "bg-orange-50 text-[#e85d04] font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {JOB_CATEGORY_LABELS[key]}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 雇用形態 */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  雇用形態
                </h3>
                <div className="flex flex-col gap-1">
                  {(Object.keys(EMPLOYMENT_TYPE_LABELS) as EmploymentType[]).map((key) => (
                    <Link
                      key={key}
                      href={`/jobs?employmentType=${key}${params.category ? `&category=${params.category}` : ""}${params.q ? `&q=${params.q}` : ""}`}
                      className={`text-sm py-1.5 px-3 rounded-lg transition-colors ${
                        params.employmentType === key
                          ? "bg-orange-50 text-[#e85d04] font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {EMPLOYMENT_TYPE_LABELS[key]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* メインコンテンツ */}
          <div className="flex-1 min-w-0">
            {jobs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* ページネーション */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/jobs?page=${p}${params.category ? `&category=${params.category}` : ""}${params.employmentType ? `&employmentType=${params.employmentType}` : ""}${params.q ? `&q=${params.q}` : ""}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-[#e85d04] text-white"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-[#e85d04] hover:text-[#e85d04]"
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔍</p>
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
                  求人が見つかりませんでした
                </h2>
                <p className="text-gray-500 mb-6">
                  条件を変えて再度お試しください
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 bg-[#e85d04] text-white font-bold py-3 px-8 rounded-full"
                >
                  すべての求人を見る
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
