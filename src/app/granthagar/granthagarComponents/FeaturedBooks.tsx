// src/app/granthagar/granthagarComponents/FeaturedBooks.tsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getAllBooks } from "@/data/granthagar/booksData";
import LibraryBookCard from "@/components/granthagar/LibraryBookCard";

gsap.registerPlugin(ScrollTrigger);

const FeaturedBooks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredBooks = getAllBooks().slice(0, 4);

  useScrollAnimation();
  useGSAP(() => {
    gsap.set(".books-header", { y: 50, opacity: 1 });
    gsap.set(".book-card-item", { y: 40, opacity: 1 });
    gsap.set(".view-all-btn", { y: 30, opacity: 1 });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-16 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="books-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] dark:text-[#4096ff] text-xs font-bold mb-3 border border-blue-200 dark:border-blue-900/40">
            <BookOpen className="size-3.5" />
            জনপ্রিয় সাহিত্য সংকলন
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            জনপ্রিয় ও আলোচিত বইসমূহ
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            বাছার পরিবারের পাঠকদের জন্য বাছাইকৃত ধ্রুপদী সাহিত্য, উপন্যাস ও মননশীল বইয়ের বিশেষ তালিকা
          </p>
        </div>

        {/* 1:1 Book Grid using LibraryBookCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {featuredBooks.map((book) => (
            <div key={book.productId} className="book-card-item">
              <LibraryBookCard book={book} />
            </div>
          ))}
        </div>

        <div className="view-all-btn text-center mt-12">
          <Link
            href="/granthagar/books"
            className="inline-flex items-center gap-2 bg-[#1677ff] hover:bg-[#4096ff] text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-[0.98]"
          >
            <span>সকল বই দেখুন (View All Books)</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;