import type { Metadata } from "next";
import VoiceCard from "@/components/VoiceCard";
import { getVoices } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "転職者の声",
  description: "JOB PALETTEで就職・転職を成功させた方々の体験談をご紹介します。",
};

const LIMIT = 12;

export default async function VoicePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const offset = (page - 1) * LIMIT;

  const { contents: voices, totalCount } = await getVoices({
    limit: LIMIT,
    offset,
  }).catch(() => ({ contents: [], totalCount: 0 }));

  const totalPages = Math.ceil(totalCount / LIMIT);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] text-white py-16">
        <div className="container-base text-center">
          <span className="text-[#ffd166] font-bold text-sm uppercase tracking-widest">
            Success Stories
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2">転職者の声</h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            JOB PALETTEのサポートで就職・転職を成功させた方々の
            リアルな体験談をご紹介します。
          </p>
        </div>
      </div>

      <div className="container-base py-12">
        {voices.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {voices.map((voice) => (
                <VoiceCard key={voice.id} voice={voice} />
              ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <a
                    key={p}
                    href={`/voice?page=${p}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? "bg-[#e85d04] text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#e85d04] hover:text-[#e85d04]"
                    }`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">💬</p>
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">
              転職者の声を準備中です
            </h2>
            <p className="text-gray-500">近日公開予定です。お楽しみに！</p>
          </div>
        )}
      </div>
    </div>
  );
}
