"use client";

import React, { useRef } from "react";
import {
  Star,
  Heart,
  User,
  MapPin,
  Clock,
  Eye,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

interface BookGridProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

const BookGrid: React.FC<BookGridProps> = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      donor: "আহমেদ রহমান",
      donorLocation: "ধানমন্ডি",
      status: "Available",
      categoryKey: "philosophy",
      category: "দর্শন",
      summary:
        "একজন তরুণ রাখালের গুপ্তধন খোঁজার যাত্রা আমাদের স্বপ্ন পূরণের পথ শেখায়।",
      dateAdded: "2024-01-15",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      donor: "ফাতিমা খান",
      donorLocation: "গুলশান",
      status: "Available",
      categoryKey: "history",
      category: "ইতিহাস",
      summary:
        "মানুষ কীভাবে পৃথিবীর প্রধানতম প্রজাতি হয়ে উঠল তার এক চমকপ্রদ ইতিহাস।",
      dateAdded: "2024-01-20",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      donor: "রফিক উদ্দিন",
      donorLocation: "বনানী",
      status: "Borrowed",
      categoryKey: "self-help",
      category: "আত্মউন্নয়ন",
      summary:
        "ছোট ছোট অভ্যাস কীভাবে আপনার জীবনে অসাধারণ পরিবর্তন আনতে পারে তা জানুন।",
      dateAdded: "2024-01-10",
      borrowedBy: "Sarah Ahmed",
      returnDate: "2024-02-10",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      donor: "নাসরিন আক্তার",
      donorLocation: "উত্তরা",
      status: "Available",
      categoryKey: "fiction",
      category: "ফিকশন",
      summary:
        "নজরদারি, নিয়ন্ত্রণ এবং সত্যের শক্তি নিয়ে রচিত এক কালজয়ী ডিসটোপিয়ান মাস্টারপিস।",
      dateAdded: "2024-01-25",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      donor: "করিম হাসান",
      donorLocation: "মিরপুর",
      status: "Available",
      categoryKey: "business",
      category: "ব্যবসা ও ক্যারিয়ার",
      summary:
        "অর্থনৈতিক সিদ্ধান্তের পেছনে মানব মনস্তত্ত্ব কীভাবে কাজ করে তা জানুন।",
      dateAdded: "2024-02-01",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 6,
      title: "Brief Answers to Big Questions",
      author: "Stephen Hawking",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.5,
      donor: "ডা. রহমান",
      donorLocation: "ওয়ারী",
      status: "Borrowed",
      categoryKey: "science",
      category: "বিজ্ঞান",
      summary:
        "মহাবিশ্বের সবচেয়ে বড় রহস্যগুলো নিয়ে মহান পদার্থবিজ্ঞানীর চূড়ান্ত ভাবনা।",
      dateAdded: "2024-01-30",
      borrowedBy: "Mahmud Ali",
      returnDate: "2024-02-15",
    },
  ];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.donor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      book.categoryKey === selectedCategory ||
      book.category.toLowerCase() === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "available" && book.status === "Available") ||
      (selectedStatus === "borrowed" && book.status === "Borrowed");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  useScrollAnimation();
  useGSAP(
    () => {
      // Sort controls animation
      gsap.fromTo(
        ".sort-controls",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Book cards staggered entrance
      gsap.fromTo(
        ".book-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".books-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [filteredBooks.length] }
  );

  return (
    <div ref={containerRef}>
      {/* Enhanced Sort Controls */}
      <div className="sort-controls flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            প্রদর্শন করা হচ্ছে{" "}
            <span className="text-slate-900 dark:text-white font-semibold">
              {filteredBooks.length}
            </span>{" "}
            / মোট <span className="font-semibold">{books.length}</span> টি বই
          </p>
        </div>

        <select className="bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#303030] rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors">
          <option>ক্রমানুসার: সম্প্রতি যুক্ত</option>
          <option>ক্রমানুসার: সর্বোচ্চ রেটিং</option>
          <option>নাম অনুসারে (A-Z)</option>
          <option>লেখক অনুসারে (A-Z)</option>
        </select>
      </div>

      {/* Enhanced Books Grid */}
      <div className="books-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="book-card bg-white dark:bg-[#141414] rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden border border-slate-200 dark:border-[#303030] flex flex-col justify-between transition-all duration-200"
          >
            <div>
              <div className="relative overflow-hidden group">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={500}
                  height={192}
                  className="book-image w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Enhanced Status Badge */}
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      book.status === "Available"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40"
                    }`}
                  >
                    {book.status === "Available" ? "উপলব্ধ" : "ধার নেওয়া"}
                  </span>
                </div>

                {/* Heart Button */}
                <button 
                  aria-label="পছন্দের তালিকায় যোগ করুন"
                  className="absolute top-2.5 left-2.5 w-8 h-8 bg-white/90 dark:bg-[#141414]/90 rounded-full flex items-center justify-center text-slate-500 hover:text-rose-500 transition-colors shadow-sm border border-slate-200 dark:border-[#303030]"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="book-content p-5">
                {/* Category Badge */}
                <div className="mb-2">
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/30">
                    {book.category}
                  </span>
                </div>

                {/* Title & Author */}
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <Link href={`/granthagar/book-detail/${book.id}`}>
                    {book.title}
                  </Link>
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-xs mb-3 font-medium">
                  লেখক: {book.author}
                </p>

                {/* Rating & Donor */}
                <div className="flex items-center justify-between text-xs mb-3 text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {book.rating}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                    <User className="w-3 h-3" />
                    <span>{book.donor}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-1 text-xs text-slate-400 dark:text-slate-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{book.donorLocation}</span>
                </div>

                {/* Borrowed Status Info */}
                {book.status === "Borrowed" && book.returnDate && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2.5 mb-3 border border-amber-200/60 dark:border-amber-900/30">
                    <div className="flex items-center space-x-1 text-xs text-amber-800 dark:text-amber-300">
                      <Clock className="w-3 h-3" />
                      <span>ফেরত আসার সম্ভাব্য তারিখ: {book.returnDate}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 flex flex-col gap-2">
              <Link 
                href={`/granthagar/book-detail/${book.id}`}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors shadow-sm active:scale-[0.99]"
              >
                বিস্তারিত দেখুন
              </Link>
              {book.status === "Available" ? (
                <Link
                  href="/granthagar/request-book"
                  className="w-full text-center py-2 px-3 rounded-lg text-xs font-medium transition-colors bg-slate-100 dark:bg-[#1f1f1f] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#303030]"
                >
                  বইটির জন্য অনুরোধ করুন
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors bg-slate-50 dark:bg-[#141414] text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-[#262626]"
                >
                  ধার নেওয়া হয়েছে
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="empty-state text-center py-16 bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] p-8 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-[#1f1f1f] rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-[#303030]">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            কোনো বই পাওয়া যায়নি
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-5 max-w-sm mx-auto text-xs sm:text-sm">
            আপনার অনুসন্ধানের শব্দ বা ফিল্টারের মান পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button 
            onClick={() => {}}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-slate-500 dark:text-slate-400 text-xs sm:text-sm pt-8">
        {[
          "📚 যাচাইকৃত বইয়ের সংগ্রহ",
          "🤝 বিশ্বস্ত পাঠক কমিউনিটি",
          "⚡ দ্রুত বই আদান-প্রদান",
          "💯 100% ফ্রি সেবা",
        ].map((indicator, index) => (
          <div key={index} className="flex items-center space-x-1.5 font-medium">
            <span>{indicator}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
