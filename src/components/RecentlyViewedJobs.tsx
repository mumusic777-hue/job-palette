"use client";

import Link from "next/link";
import { History, MapPin, Banknote, X } from "lucide-react";
import { useJobHistory } from "@/hooks/useJobHistory";
import { JOB_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS, type JobCategory, type EmploymentType } from "@/types";

export default function RecentlyViewedJobs() {
  const { history, clearHistory } = useJobHistory();

  if (history.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-sm text-gray-700 flex items-center gap-2">
          <History className="w-4 h-4 text-[#e85d04]" />
          最近見た求人
        </h2>
        <button
          onClick={clearHistory}
          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"
        >
          <X className="w-3 h-3" />
          履歴を消す
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {history.map((job) => {
          const salaryText =
            job.salaryMin && job.salaryMax
              ? `月給 ${job.salaryMin.toLocaleString()}〜${job.salaryMax.toLocaleString()}円`
              : job.salaryMin
              ? `月給 ${job.salaryMin.toLocaleString()}円〜`
              : "給与応相談";

          return (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block bg-[#e85d04] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {JOB_CATEGORY_LABELS[job.category as JobCategory]}
                </span>
                <span className="text-xs text-gray-400">
                  {EMPLOYMENT_TYPE_LABELS[job.employmentType as EmploymentType]}
                </span>
              </div>
              <p className="text-sm font-medium text-[#1a1a2e] group-hover:text-[#e85d04] transition-colors line-clamp-1">
                {job.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Banknote className="w-3 h-3 text-[#e85d04]" />
                  {salaryText}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#e85d04]" />
                  {job.location}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
