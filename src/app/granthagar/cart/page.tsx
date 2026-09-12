// src/app/granthagar/cart/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Truck,
  ShieldCheck,
  Headphones,
  Sparkles,
  RotateCcw,
  Calendar,
} from "lucide-react";
import { useBookCart } from "@/context/BookCartContext";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";
import { cn } from "@/lib/utils";

export default function BookCartPage() {
  const {
    items,
    totalItems,
    deliveryFee,
    totalAmount,
    durationDays,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useBookCart();

  // Return date calculation (English numbers)
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + durationDays);
  const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // 1. Empty Cart State (Matching Super Shop Style)
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {/* Main Empty Cart Card */}
          <div className="bg-white dark:bg-[#141414] rounded-3xl border border-slate-200 dark:border-[#303030] p-8 sm:p-12 text-center shadow-xs transition-colors relative overflow-hidden">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff] dark:border-[#153450] text-[#1677ff] dark:text-[#3c89e8] text-xs font-semibold mb-6">
              <Sparkles className="size-3.5" />
              <span>ঝুলি সম্পূর্ণ খালি</span>
            </div>

            {/* Glowing Illustration / Icon Box */}
            <div className="relative size-28 sm:size-32 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#e6f4ff] to-[#d6e4ff]/40 dark:from-[#111a2c] dark:to-[#16233b]/60 border border-[#91caff]/60 dark:border-[#153450] shadow-inner" />
              <div className="relative z-10 size-16 rounded-2xl bg-[#1677ff] text-white flex items-center justify-center shadow-lg shadow-[#1677ff]/30">
                <BookOpen className="size-8 stroke-[2.2]" />
              </div>
            </div>

            {/* Text Content */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              আপনার বইয়ের ঝুলি বর্তমানে খালি!
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
              এখনও কোনো বই ধার নেওয়ার জন্য নির্বাচন করা হয়নি। আপনার পছন্দের প্রিয় বইটি খুঁজে নিতে বাছার গ্রন্থাগারে ঘুরে আসুন!
            </p>

            {/* Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/granthagar/books"
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
              >
                <BookOpen className="size-4" />
                বইয়ের ক্যাটালগ দেখুন
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Value Badges (3-column matching Super Shop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-xs flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#3c89e8] flex items-center justify-center shrink-0">
                <Truck className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">দ্রুত ডেলিভারি</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  বাছার পরিবারের সদস্যদের জন্য দ্রুত হোম ডেলিভারি
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-xs flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#f6ffed] dark:bg-[#162312] text-[#52c41a] flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">১০০% ফ্রি পাঠ</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  জ্ঞানের আলো ছড়িয়ে দিতে সম্পূর্ণ বিনামূল্যে বই পড়ার সুবিধা
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-xs flex items-start gap-3.5 transition-colors">
              <div className="size-10 rounded-xl bg-[#fff7e6] dark:bg-[#2b2111] text-[#faad14] flex items-center justify-center shrink-0">
                <RotateCcw className="size-5" />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-xs font-bold text-slate-900 dark:text-white">সহজ রিটার্ন</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  পড়া শেষে সহজ ফেরত ও নবায়ন সুবিধা
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-32 lg:pb-12">
      {/* Top Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#303030] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Link href="/granthagar" className="hover:text-[#1677ff]">
              গ্রন্থাগার
            </Link>
            <span>/</span>
            <span className="text-[#1677ff] dark:text-[#3c89e8]">বইয়ের ঝুলি</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-baseline gap-3 text-slate-900 dark:text-white">
            আপনার ঝুলি
            <span className="text-lg font-medium text-slate-500 dark:text-slate-400">
              ({totalItems} টি বই)
            </span>
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-red-500 hover:text-red-700 dark:hover:text-red-400 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <Trash2 className="size-3.5" />
          ঝুলি খালি করুন
        </button>
      </div>

      {/* 2-Column Grid (Super Shop Style) */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* LEFT: Book Items List (2 cols on lg) */}
        <section className="lg:col-span-2 space-y-4" aria-label="বইয়ের তালিকা">
          {items.map(({ book, quantity }) => {
            const bookHref = `/granthagar/books/${book.category}/${book.productId}`;

            return (
              <article
                key={book.productId}
                className="rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-4 sm:p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors hover:border-blue-400 dark:hover:border-blue-500"
              >
                <div className="flex gap-4 sm:gap-6 items-start">
                  {/* Image: Strict 1:1 with rounded-xl and object-cover (Super Shop Style) */}
                  <Link
                    href={bookHref}
                    className="relative size-20 sm:size-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] group"
                  >
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 80px, 112px"
                    />
                  </Link>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={bookHref}
                          className="font-bold text-base sm:text-lg text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                        >
                          {book.title}
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(book.productId)}
                          className="text-slate-400 hover:text-[#ff4d4f] hover:bg-[#fff2f0] dark:hover:bg-[#2c1618] p-1.5 rounded-lg transition-colors cursor-pointer"
                          aria-label="বইটি সরান"
                          title="ঝুলি থেকে সরান"
                        >
                          <Trash2 className="size-4 sm:size-5" />
                        </button>
                      </div>

                      {/* Author & Category tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs font-normal px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-[#303030] bg-[#fafafa] dark:bg-[#262626] text-slate-700 dark:text-slate-300">
                          {book.categoryName || book.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          লেখক:{" "}
                          <strong className="font-semibold text-slate-700 dark:text-slate-300">
                            {book.author}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Stock / Status bottom bar (Super Shop Style) */}
                    <div className="flex items-end justify-between gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-[#303030]">
                      <QuantitySelector
                        quantity={quantity}
                        setQuantity={(val) =>
                          updateQuantity(book.productId, val)
                        }
                        min={0}
                        max={book.availableQuantity}
                        variant="compact"
                      />

                      <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          মজুদ: {book.availableQuantity} কপি
                        </p>
                        <p className="text-base sm:text-lg font-bold text-[#1677ff] dark:text-[#3c89e8]">
                          Free Borrow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Back to Catalog Link */}
          <div className="pt-2">
            <Link
              href="/granthagar/books"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1677ff] dark:text-[#3c89e8] hover:underline"
            >
              <ArrowLeft className="size-3.5" />
              আরও বই যোগ করুন
            </Link>
          </div>
        </section>

        {/* RIGHT: Clean, Un-crowded Order Summary Sidebar (Super Shop Style) */}
        <aside className="space-y-6">
          <div className="sticky top-24 rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              অর্ডার সামারি
            </h2>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-[#303030] text-sm">
              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">
                  মোট বই
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {totalItems} টি
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">
                  Borrow Fee
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Free
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">
                  ডেলিভারি চার্জ
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {deliveryFee > 0 ? `Tk ${deliveryFee}` : "Tk 0 (পিকআপ)"}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-500 dark:text-slate-400">
                  পড়ার সময়কাল
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {durationDays} Days (ফেরত: {formattedReturnDate})
                </span>
              </div>

              <div className="flex justify-between py-2 text-base font-bold text-slate-900 dark:text-white">
                <span>সর্বমোট:</span>
                <span className="text-xl text-[#1677ff] dark:text-[#3c89e8] font-black">
                  Tk {totalAmount}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] p-3 rounded-xl flex items-center gap-2">
              <Truck className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
              লাইব্রেরি কাউন্টার থেকে সংগ্রহে কোনো চার্জ নেই
            </p>

            {/* Ant Design Primary Checkout Button */}
            <Link
              href="/granthagar/checkout"
              className="antd-btn antd-btn-primary w-full h-12 rounded-xl text-base font-semibold inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>চেকআউটে যান</span>
              <ArrowRight className="size-4.5 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#303030] grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#52c41a] shrink-0" />
                <span>নিরাপদ ধার গ্রহণ</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="size-4 text-[#1677ff] shrink-0" />
                <span>লাইব্রেরি সাপোর্ট</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Fixed Checkout Bar (Matching Super Shop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-[#1f1f1f] border-t border-slate-200 dark:border-[#303030] p-4 shadow-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">
            সর্বমোট:
          </p>
          <p className="text-xl font-black text-[#1677ff] dark:text-[#3c89e8]">
            Tk {totalAmount}
          </p>
        </div>
        <Link
          href="/granthagar/checkout"
          className="antd-btn antd-btn-primary h-12 rounded-xl px-6 font-semibold flex-1 flex items-center justify-center gap-2 text-sm"
        >
          <span>চেকআউটে যান</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
