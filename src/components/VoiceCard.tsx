import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import type { Voice } from "@/types";

type Props = {
  voice: Voice;
};

export default function VoiceCard({ voice }: Props) {
  return (
    <Link href={`/voice/${voice.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-6 h-full flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-start gap-4 mb-4">
          {voice.photo ? (
            <Image
              src={voice.photo.url}
              alt={voice.name}
              width={56}
              height={56}
              className="rounded-full object-cover border-2 border-orange-100 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-[#e85d04] font-bold text-xl flex-shrink-0">
              {voice.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-bold text-[#1a1a2e]">
              {voice.name}
              <span className="text-gray-500 font-normal text-sm ml-1">
                （{voice.age}歳）
              </span>
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-sm">
              <span className="text-gray-400 line-through">{voice.beforeJob}</span>
              <span className="text-[#e85d04]">→</span>
              <span className="text-[#e85d04] font-medium">{voice.afterJob}</span>
            </div>
          </div>
        </div>

        {/* コメント */}
        <div className="relative flex-1">
          <Quote className="w-6 h-6 text-orange-100 absolute -top-1 -left-1" />
          <p className="text-sm text-gray-600 leading-relaxed pl-4 line-clamp-4">
            {voice.comment}
          </p>
        </div>

        <p className="text-xs text-[#e85d04] font-medium mt-4 group-hover:underline">
          詳しく読む →
        </p>
      </div>
    </Link>
  );
}
