"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Briefcase } from "lucide-react";

const navLinks = [
  { href: "/jobs", label: "求人情報を探す" },
  { href: "/services", label: "サービス案内" },
  { href: "/voice", label: "転職者の声" },
  { href: "/contact", label: "無料相談" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-base">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[#e85d04]"
          >
            <Briefcase className="w-6 h-6" />
            <span>JOB PALETTE</span>
          </Link>

          {/* PCナビゲーション */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#e85d04] transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-[#e85d04] hover:bg-[#c44d03] text-white text-sm font-bold py-2 px-5 rounded-full transition-colors duration-200 shadow-sm"
            >
              LINEで相談する
            </Link>
          </div>

          {/* ハンバーガーメニュー */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container-base flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 bg-[#e85d04] text-white text-sm font-bold py-3 px-4 rounded-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              LINEで無料相談する
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
