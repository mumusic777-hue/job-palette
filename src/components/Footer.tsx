import Link from "next/link";
import { Briefcase, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  service: [
    { href: "/jobs", label: "求人情報を探す" },
    { href: "/services", label: "サービス案内" },
    { href: "/voice", label: "転職者の声" },
    { href: "/contact", label: "無料相談" },
  ],
  company: [
    { href: "/about", label: "会社概要" },
    { href: "/privacy", label: "プライバシーポリシー" },
    { href: "/terms", label: "利用規約" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* ブランド */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#e85d04]">
              <Briefcase className="w-6 h-6" />
              <span>JOB PALETTE</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              中卒・高卒・第二新卒の方を中心に、<br />
              一人ひとりに寄り添った就職・転職サポートを行っています。<br />
              あなたの「働く」を全力で応援します。
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e85d04]" />
                <span>〒XXX-XXXX 大阪府○○市○○区○○1-1-1</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e85d04]" />
                <span>0X-XXXX-XXXX（平日 9:00〜18:00）</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#e85d04]" />
                <span>info@job-palette.co.jp</span>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              サービス
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報 */}
          <div>
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">
              会社情報
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} 株式会社JOB PALETTE. All rights reserved.</p>
          <p>有料職業紹介事業許可番号：XX-XXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
