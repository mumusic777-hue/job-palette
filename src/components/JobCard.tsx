import Link from "next/link";
import Image from "next/image";
import { MapPin, Banknote, Clock } from "lucide-react";
import type { Job } from "@/types";
import { JOB_CATEGORY_LABELS, EMPLOYMENT_TYPE_LABELS } from "@/types";

type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  const salaryText =
    job.salaryMin && job.salaryMax
      ? `月給 ${job.salaryMin.toLocaleString()}〜${job.salaryMax.toLocaleString()}円`
      : job.salaryMin
      ? `月給 ${job.salaryMin.toLocaleString()}円〜`
      : "給与応相談";

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden h-full flex flex-col">
        {/* カテゴリバッジ */}
        <div className="bg-orange-50 px-4 pt-4 pb-2 flex items-center justify-between">
          <span className="inline-block bg-[#e85d04] text-white text-xs font-bold px-3 py-1 rounded-full">
            {JOB_CATEGORY_LABELS[job.category]}
          </span>
          {job.featured && (
            <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              注目
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1">
          {/* 会社ロゴ・名称 */}
          <div className="flex items-center gap-2 mb-3">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo.url}
                alt={job.companyName}
                width={32}
                height={32}
                className="rounded-md object-contain border border-gray-100"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs font-bold">
                {job.companyName.charAt(0)}
              </div>
            )}
            <span className="text-xs text-gray-500">{job.companyName}</span>
          </div>

          {/* タイトル */}
          <h3 className="font-bold text-[#1a1a2e] text-sm leading-snug mb-3 group-hover:text-[#e85d04] transition-colors line-clamp-2 flex-1">
            {job.title}
          </h3>

          {/* 詳細情報 */}
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Banknote className="w-3.5 h-3.5 text-[#e85d04]" />
              <span>{salaryText}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 text-[#e85d04]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 text-[#e85d04]" />
              <span>{EMPLOYMENT_TYPE_LABELS[job.employmentType]}</span>
            </div>
          </div>

          {/* タグ */}
          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {job.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
