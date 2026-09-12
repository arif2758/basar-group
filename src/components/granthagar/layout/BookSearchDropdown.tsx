// src/components/granthagar/layout/BookSearchDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, TrendingUp } from "lucide-react";

interface BookSearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_BOOK_SEARCHES = [
  { label: "হুমায়ূন আহমেদ", query: "হুমায়ূন আহমেদ" },
  { label: "লীলাবতী", query: "লীলাবতী" },
  { label: "বৃষ্টি ও মেঘমালা", query: "বৃষ্টি ও মেঘমালা" },
  { label: "মানিক বন্দ্যোপাধ্যায়", query: "মানিক বন্দ্যোপাধ্যায়" },
  { label: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", query: "বিভূতিভূষণ বন্দ্যোপাধ্যায়" },
  { label: "উপন্যাস", query: "উপন্যাস" },
  { label: "ক্লাসিক", query: "ক্লাসিক" },
];

export default function BookSearchDropdown({
  isOpen,
  onClose,
}: BookSearchDropdownProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    router.push(`/granthagar/books?search=${encodeURIComponent(searchVal.trim())}`);
    onClose();
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-2xl p-4 sm:p-5 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 size-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
            className="w-full rounded-xl bg-slate-50 dark:bg-[#141414] pl-10 pr-10 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-[#303030] focus:border-[#1677ff] focus:outline-none focus:ring-1 focus:ring-[#1677ff]"
          />
          <button
            onClick={onClose}
            className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Quick Searches */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2.5">
            <TrendingUp className="size-3.5 text-[#1677ff]" />
            <span>জনপ্রিয় অনুসন্ধান (Quick Searches)</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_BOOK_SEARCHES.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSearch(item.query)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-[#2a2a2a] text-slate-700 dark:text-slate-300 hover:bg-[#e6f4ff] hover:text-[#1677ff] dark:hover:bg-[#111a2c] dark:hover:text-[#3c89e8] transition-colors cursor-pointer border border-transparent hover:border-[#91caff] dark:hover:border-[#15325b]"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer tip */}
        <div className="pt-2 border-t border-slate-100 dark:border-[#2a2a2a] flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="size-3 text-[#1677ff]" />
            বাছার গ্রন্থাগার ক্যাটালগ
          </span>
          <span>Enter চাপুন অনুসন্ধানের জন্য</span>
        </div>
      </div>
    </div>
  );
}
