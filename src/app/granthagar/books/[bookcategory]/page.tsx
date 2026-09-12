// src/app/granthagar/books/[bookcategory]/page.tsx
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, ArrowLeft, Layers } from "lucide-react";
import LibraryBookCard from "@/components/granthagar/LibraryBookCard";
import {
  getBooksByCategory,
  getCategoryBySlug,
  getAllBookCategories,
} from "@/data/granthagar/booksData";

export default function BookCategoryPage() {
  const params = useParams();
  const bookCategorySlug = String(params?.bookcategory || "");

  const category = useMemo(
    () => getCategoryBySlug(bookCategorySlug),
    [bookCategorySlug]
  );
  const books = useMemo(
    () => getBooksByCategory(bookCategorySlug),
    [bookCategorySlug]
  );
  const allCategories = useMemo(() => getAllBookCategories(), []);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/granthagar" className="hover:text-[#1677ff]">
            গ্রন্থাগার
          </Link>
          <span>/</span>
          <Link href="/granthagar/books" className="hover:text-[#1677ff]">
            বই
          </Link>
          <span>/</span>
          <span className="text-[#1677ff]">
            {category?.name || bookCategorySlug}
          </span>
        </div>

        {/* Category Banner Card */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-white/20 backdrop-blur-xs">
                Category
              </span>
              <span className="text-xs font-semibold text-blue-100">
                {books.length} Books Available
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {category?.name || bookCategorySlug}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-2xl">
              {category?.description ||
                "বাছার গ্রন্থাগারের এই ক্যাটাগরিতে অন্তর্ভুক্ত সকল গ্রন্থ।"}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/granthagar/books"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 transition shadow-xs"
              >
                <ArrowLeft className="size-3.5" />
                সকল ক্যাটাগরি দেখুন
              </Link>
            </div>
          </div>

          <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none">
            <BookOpen className="size-52" />
          </div>
        </div>

        {/* Other Categories Pills */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
            <Layers className="size-3.5" />
            অন্যান্য ক্যাটাগরি:
          </span>
          {allCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/granthagar/books/${c.slug}`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                c.slug === bookCategorySlug
                  ? "bg-[#1677ff] text-white shadow-xs"
                  : "bg-white dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#303030] hover:border-[#1677ff]"
              }`}
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        {/* Category Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {books.map((book) => (
              <LibraryBookCard key={book.productId} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-12 text-center">
            <BookOpen className="size-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              এই ক্যাটাগরিতে কোনো বই পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              শীঘ্রই এই ক্যাটাগরিতে নতুন বই সংযোজন করা হবে।
            </p>
            <Link
              href="/granthagar/books"
              className="mt-4 inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] text-white hover:bg-[#4096ff]"
            >
              সকল বই ব্রাউজ করুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
