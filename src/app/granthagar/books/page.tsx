// src/app/granthagar/books/page.tsx
"use client";

import React, { useMemo } from "react";
import { BookOpen } from "lucide-react";
import LibraryBookCard from "@/components/granthagar/LibraryBookCard";
import { getAllBooks } from "@/data/granthagar/booksData";

export default function BooksCatalogPage() {
  const books = useMemo(() => getAllBooks(), []);

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Books Grid */}
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {books.map((book, idx) => (
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
              শীঘ্রই লাইব্রেরিতে নতুন বই সংযোজন করা হবে।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
