// src/app/granthagar/books/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Filter,
  Sparkles,
  SlidersHorizontal,
  X,
} from "lucide-react";
import LibraryBookCard from "@/components/granthagar/LibraryBookCard";
import {
  getAllBooks,
  getAllBookCategories,
} from "@/data/granthagar/booksData";
import { cn } from "@/lib/utils";

export default function BooksCatalogPage() {
  const books = useMemo(() => getAllBooks(), []);
  const categories = useMemo(() => getAllBookCategories(), []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "title">("popular");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    books.forEach((b) => b.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [books]);

  // Filter and sort logic (Fast client-side indexing)
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        // Category filter
        if (selectedCategory !== "all" && book.category !== selectedCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag !== "all" && !book.tags?.includes(selectedTag)) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchDesc = book.shortDesc?.toLowerCase().includes(q);
          const matchTag = book.tags?.some((t) => t.toLowerCase().includes(q));

          if (!matchTitle && !matchAuthor && !matchDesc && !matchTag) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "title") {
          return a.title.localeCompare(b.title, "bn");
        }
        if (sortBy === "newest") {
          return (b.publishYear || 2020) - (a.publishYear || 2020);
        }
        return (b.availableQuantity || 0) - (a.availableQuantity || 0);
      });
  }, [books, selectedCategory, selectedTag, searchQuery, sortBy]);

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 1. Header & Breadcrumb */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-[#262626] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <Link href="/granthagar" className="hover:text-[#1677ff]">
                গ্রন্থাগার
              </Link>
              <span>/</span>
              <span className="text-[#1677ff]">বইয়ের ক্যাটালগ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
              <BookOpen className="size-7 text-[#1677ff]" />
              বাছার গ্রন্থাগার ক্যাটালগ
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              বাছার পরিবারের সদস্যদের জন্য উন্মুক্ত সাহিত্য ও ক্লাসিক বইয়ের সমৃদ্ধ ভাণ্ডার
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-300">
              Total Books: <strong className="text-[#1677ff]">{filteredBooks.length}</strong>
            </span>
          </div>
        </div>

        {/* 2. Search & Controls Bar */}
        <div className="mb-6 rounded-2xl bg-white dark:bg-[#1f1f1f] p-4 border border-slate-200/80 dark:border-[#303030] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
                className="w-full rounded-xl bg-slate-50 dark:bg-[#1f1f1f] pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-[#303030] focus:border-[#1677ff] focus:outline-none focus:ring-1 focus:ring-[#1677ff]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <SlidersHorizontal className="size-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-xl bg-slate-50 dark:bg-[#1f1f1f] px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#303030] focus:border-[#1677ff] focus:outline-none"
              >
                <option value="popular">জনপ্রিয়তা অনুযায়ী (Popular)</option>
                <option value="newest">প্রকাশকাল অনুযায়ী (Newest)</option>
                <option value="title">নামের ক্রমানুসারে (A to Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-[#262626]">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                selectedCategory === "all"
                  ? "bg-[#1677ff] text-white shadow-xs"
                  : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2a2a2a]"
              )}
            >
              সব ক্যাটাগরি (All)
            </button>

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === cat.slug
                    ? "bg-[#1677ff] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2a2a2a]"
                )}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Tag Pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Sparkles className="size-3 text-[#1677ff]" />
                ট্যাগ:
              </span>
              {allTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? "all" : tag)
                  }
                  className={cn(
                    "px-2.5 py-0.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer",
                    selectedTag === tag
                      ? "bg-[#1677ff]/15 text-[#1677ff] border border-[#1677ff]"
                      : "bg-slate-50 dark:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-[#303030] hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  #{tag}
                </button>
              ))}
              {selectedTag !== "all" && (
                <button
                  onClick={() => setSelectedTag("all")}
                  className="text-[11px] text-red-500 hover:underline ml-1"
                >
                  ক্লিয়ার ফিল্টার
                </button>
              )}
            </div>
          )}
        </div>

        {/* 3. Books Grid (Super Shop Style 1:1 Card Grid) */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredBooks.map((book, idx) => (
              <LibraryBookCard
                key={book.productId}
                book={book}
                priority={idx < 4}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-12 text-center">
            <BookOpen className="size-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              কোনো বই পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              আপনার সার্চ কি-ওয়ার্ড অথবা ফিল্টারের সাথে মিল রেখে কোনো বই পাওয়া যায়নি। ফিল্টার রিসেট করে চেষ্টা করুন।
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedTag("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] text-white hover:bg-[#4096ff]"
            >
              সব বই দেখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
