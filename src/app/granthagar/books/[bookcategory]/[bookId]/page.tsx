// src/app/granthagar/books/[bookcategory]/[bookId]/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  BookOpen,
  ArrowLeft,
  ShoppingBag,
  Check,
  Heart,
  Share2,
  Calendar,
  Building,
  Languages,
  Bookmark,
  Gift,
  ShieldCheck,
  Zap,
  Truck,
  RefreshCcw,
  Star,
} from "lucide-react";
import { getBookById, getBooksByCategory } from "@/data/granthagar/booksData";
import { useBookCart } from "@/context/BookCartContext";
import BookDescriptionTabs from "@/components/granthagar/BookDescriptionTabs";
import WhatsAppBorrowButton from "@/components/granthagar/WhatsAppBorrowButton";
import CurrentBorrowerCard from "@/components/granthagar/CurrentBorrowerCard";
import LibraryBookCard from "@/components/granthagar/LibraryBookCard";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();

  const bookCategorySlug = String(params?.bookcategory || "");
  const bookId = String(params?.bookId || "");

  const book = useMemo(() => getBookById(bookId), [bookId]);

  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useBookCart();

  // Active gallery image
  const [activeImage, setActiveImage] = useState<string>(
    book?.thumbnail || ""
  );
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [isCopied, setIsCopied] = useState(false);

  // Sync activeImage when book loads
  React.useEffect(() => {
    if (book?.thumbnail) {
      setActiveImage(book.thumbnail);
    }
  }, [book]);

  const inCart = book ? isInCart(book.productId) : false;
  const cartQty = book ? getItemQuantity(book.productId) : 0;
  const isAvailable = book?.status === "available" && (book?.availableQuantity || 0) > 0;

  // Related books
  const relatedBooks = useMemo(() => {
    if (!book) return [];
    return getBooksByCategory(book.category)
      .filter((b) => b.productId !== book.productId)
      .slice(0, 4);
  }, [book]);

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="size-16 text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          বইটি পাওয়া যায়নি (Book Not Found)
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-md">
          অনুরোধকৃত বইটির আইডি সঠিক নয় অথবা বইটি লাইব্রেরি ক্যাটালগ থেকে সরিয়ে নেওয়া হয়েছে।
        </p>
        <Link
          href="/granthagar/books"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1677ff] text-white text-xs font-semibold hover:bg-[#4096ff]"
        >
          <ArrowLeft className="size-4" />
          ক্যাটালগে ফিরে যান
        </Link>
      </div>
    );
  }

  // All gallery images
  const allImages = [book.thumbnail, ...(book.extraImages || [])];

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(book, selectedQty);
  };

  const handleBorrowNow = () => {
    if (!isAvailable) return;
    if (!inCart) {
      addToCart(book, 1);
    }
    router.push("/granthagar/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `${book.title} - ${book.author} | বাছার গ্রন্থাগার`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast.success("লিংক কপি করা হয়েছে!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 1. Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/granthagar" className="hover:text-[#1677ff]">
            গ্রন্থাগার
          </Link>
          <span>/</span>
          <Link href="/granthagar/books" className="hover:text-[#1677ff]">
            বই
          </Link>
          <span>/</span>
          <Link
            href={`/granthagar/books/${book.category}`}
            className="hover:text-[#1677ff]"
          >
            {book.categoryName || book.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[200px]">
            {book.title}
          </span>
        </div>

        {/* 2. Main Super Shop Style Two-Column Container */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Gallery & Cover (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Active Main Cover Display (Strict 1:1 Aspect Ratio, object-cover filled up) */}
            <div className="relative aspect-square w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-sm group">
              <Image
                src={activeImage || book.thumbnail}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Thumbnail Carousel / Grid */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative size-16 sm:size-18 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                      activeImage === img
                        ? "border-[#1677ff] ring-2 ring-[#1677ff]/20 shadow-md scale-105"
                        : "border-slate-200 dark:border-[#303030] opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Badges matching Super Shop */}
            <div className="hidden sm:flex gap-3">
              <div className="flex flex-1 items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f]">
                <Truck className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">ডেলিভারি</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">২৪–৪৮ ঘণ্টা</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f]">
                <RefreshCcw className="size-4 text-[#1677ff] dark:text-[#3c89e8] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">পড়ার সময়কাল</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">১–৭ দিন</p>
                </div>
              </div>
            </div>

            {/* Donor Spotlight (Moved to Details page as requested) */}
            {book.donor && (
              <div className="rounded-xl border border-blue-200/80 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 p-4 flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
                  <Gift className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    বইটি উপহার দিয়েছেন: {book.donor.name}
                  </div>
                  {book.donor.zone && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      এলাকা: {book.donor.zone}
                    </div>
                  )}
                  {book.donor.note && (
                    <p className="mt-1 text-xs text-blue-900 dark:text-blue-200 italic">
                      &ldquo;{book.donor.note}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Book Metadata & Action Area (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Title & Author */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {book.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-[#1677ff] dark:text-[#4096ff]">
                লেখক: {book.author}
              </p>
            </div>

            {/* Free Reader Service Box (No commercial price) */}
            <div className="mb-5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
                  <BookOpen className="size-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                    বিনামূল্যে জ্ঞানচর্চা সেবা (Free Reader Service)
                  </div>
                  <div className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                    বাছার পরিবারের পাঠকদের জন্য বইটি বিনামূল্যে ধার দেওয়া হয়
                  </div>
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
              {book.shortDesc}
            </p>

            {/* Book Meta Specification Table */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50 dark:bg-[#161616] p-4 border border-slate-200/80 dark:border-[#262626] text-xs">
              {book.publisher && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    প্রকাশনী (Publisher)
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {book.publisher}
                  </span>
                </div>
              )}

              {book.publishYear && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    প্রকাশকাল (Year)
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {book.publishYear}
                  </span>
                </div>
              )}

              {book.pages && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    পৃষ্ঠা (Pages)
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {book.pages} Pages
                  </span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  ভাষা (Language)
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {book.language || "Bangla"}
                </span>
              </div>

              {book.edition && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">
                    সংস্করণ (Edition)
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {book.edition}
                  </span>
                </div>
              )}

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  স্টক কপি (Stock)
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {book.availableQuantity} of {book.totalQuantity} Copies
                </span>
              </div>
            </div>

            {/* Current Borrower Card (If currently borrowed) */}
            {book.currentBorrower && !isAvailable && (
              <div className="mb-6">
                <CurrentBorrowerCard
                  borrower={book.currentBorrower}
                  bookTitle={book.title}
                />
              </div>
            )}

            {/* Action Area: Quantity + 2-Column Buttons + WhatsApp (Super Shop Style) */}
            {isAvailable ? (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#303030]">
                {/* Quantity + Stock Status */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    পরিমাণ (Quantity){" "}
                    {inCart && (
                      <span className="text-[#1677ff] dark:text-[#3c89e8] ml-2 lowercase font-medium">
                        (কার্টে আছে)
                      </span>
                    )}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <QuantitySelector
                      quantity={inCart ? cartQty : selectedQty}
                      setQuantity={(val) => {
                        if (inCart) {
                          updateQuantity(book.productId, val);
                        } else {
                          setSelectedQty(val);
                        }
                      }}
                      min={inCart ? 0 : 1}
                      max={book.availableQuantity}
                      className="h-11 w-32"
                    />
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Available: <strong className="text-slate-900 dark:text-white font-bold">{book.availableQuantity}</strong>
                        {book.totalQuantity ? ` of ${book.totalQuantity}` : " Copies"}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {isAvailable ? "In Library" : "Currently Borrowed"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2-Column Action Buttons matching Super Shop */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={handleAddToCart}
                    className={cn(
                      "w-full h-12 flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight border transition-all active:scale-[0.98] cursor-pointer",
                      inCart
                        ? "bg-[#e6f4ff] text-[#1677ff] border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] shadow-xs"
                        : "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-[#3c89e8] border-[#91caff] dark:border-[#15325b] hover:border-[#1677ff] dark:hover:border-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40 shadow-xs"
                    )}
                  >
                    <ShoppingBag className="size-4 shrink-0" />
                    <span>{inCart ? "কার্টে যুক্ত আছে" : "Add to Cart"}</span>
                  </button>

                  <button
                    onClick={handleBorrowNow}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-bold tracking-tight bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_2px_0_rgba(5,145,255,0.15)] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Zap className="size-4 text-yellow-300 fill-yellow-300 shrink-0" />
                    <span>এখনই ধার নিন</span>
                  </button>
                </div>

                {/* Full Width WhatsApp Borrow Button */}
                <WhatsAppBorrowButton
                  book={book}
                  quantity={inCart ? cartQty : selectedQty}
                />

                {/* Share Button & Guarantee Line */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                    বাছার পরিবারের পাঠকদের জন্য সম্পূর্ণ নিরাপদ সেবা
                  </span>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#1677ff] dark:text-slate-400 dark:hover:text-[#3c89e8] cursor-pointer"
                  >
                    <Share2 className="size-3.5" />
                    {isCopied ? "কপি হয়েছে!" : "শেয়ার করুন"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-[#303030]">
                <div className="p-4 rounded-xl bg-[#fff2f0] dark:bg-[#2c1618] border border-[#ffccc7] dark:border-[#5b2123] text-center">
                  <p className="text-xs sm:text-sm font-bold text-[#cf1322] dark:text-[#ff7875]">
                    বইটি বর্তমানে অন্য একজন পাঠক পড়ছেন
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    বইটি ফেরত আসা মাত্র লাইব্রেরিতে উন্মুক্ত করা হবে
                  </p>
                </div>

                <WhatsAppBorrowButton book={book} quantity={1} />
              </div>
            )}
          </div>
        </div>

        {/* 3. Rich Description Tabs (Tanjumart style with Flap, Spoiler & Quotes) */}
        <div className="mb-12">
          <BookDescriptionTabs
            description={book.description}
            tags={book.tags}
            bookTitle={book.title}
          />
        </div>

        {/* 4. Related Books Section */}
        {relatedBooks.length > 0 && (
          <div className="border-t border-slate-200/80 dark:border-[#262626] pt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  সম্পর্কিত আরও বই (Related Books)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  এই ক্যাটাগরির আরও কিছু আকর্ষণীয় বই
                </p>
              </div>

              <Link
                href={`/granthagar/books/${book.category}`}
                className="text-xs font-bold text-[#1677ff] hover:underline"
              >
                সবগুলো দেখুন &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {relatedBooks.map((rel) => (
                <LibraryBookCard key={rel.productId} book={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
