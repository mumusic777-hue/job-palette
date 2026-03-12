import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote, ArrowRight } from "lucide-react";
import { getVoice } from "@/lib/microcms";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const voice = await getVoice(id).catch(() => null);
  if (!voice) return { title: "記事が見つかりません" };

  return {
    title: `${voice.name}さんの転職体験談`,
    description: voice.comment.slice(0, 120),
  };
}

export default async function VoiceDetailPage({ params }: Props) {
  const { id } = await params;
  const voice = await getVoice(id).catch(() => null);

  if (!voice) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-base py-8 max-w-3xl">
        {/* パンくず */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#e85d04]">ホーム</Link>
          <span>/</span>
          <Link href="/voice" className="hover:text-[#e85d04]">転職者の声</Link>
          <span>/</span>
          <span className="text-gray-800">{voice.name}さんの体験談</span>
        </nav>

        <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-8">
            <div className="flex items-center gap-5">
              {voice.photo ? (
                <Image
                  src={voice.photo.url}
                  alt={voice.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-20 bg-[#e85d04] rounded-full flex items-center justify-center text-white font-black text-3xl flex-shrink-0 border-4 border-white shadow">
                  {voice.name.charAt(0)}
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-[#1a1a2e]">
                  {voice.name}さんの転職体験談
                </h1>
                <p className="text-gray-500 mt-1">{voice.age}歳</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full line-through">
                    {voice.beforeJob}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#e85d04]" />
                  <span className="bg-[#e85d04] text-white text-sm px-3 py-1 rounded-full font-medium">
                    {voice.afterJob}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* コメント */}
          <div className="p-8">
            <div className="relative">
              <Quote className="w-12 h-12 text-orange-100 mb-4" />
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                {voice.comment}
              </p>
            </div>
          </div>
        </article>

        {/* CTA */}
        <div className="mt-8 bg-gradient-to-r from-[#e85d04] to-[#f4a261] rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">
            あなたも転職を成功させませんか？
          </h2>
          <p className="text-white/80 text-sm mb-5">
            まずは無料相談から。あなたのペースで大丈夫です。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#e85d04] font-bold py-3 px-8 rounded-full hover:shadow-lg transition-shadow"
          >
            LINEで無料相談する
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-6">
          <Link
            href="/voice"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#e85d04] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            転職者の声一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
