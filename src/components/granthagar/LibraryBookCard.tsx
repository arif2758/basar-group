// src/components/granthagar/LibraryBookCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookCart } from "@/context/BookCartContext";
import { IBook } from "@/data/granthagar/types";
import QuantitySelector from "@/components/super-shop/products/QuantitySelector";

interface LibraryBookCardProps {
  book: IBook;
  priority?: boolean;
}

export default function LibraryBookCard({
  book,
  priority = false,
}: LibraryBookCardProps) {
  const { isInCart, getItemQuantity, addToCart, updateQuantity } = useBookCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const inCart = isInCart(book.productId);
  const currentQty = getItemQuantity(book.productId);
  const isAvailable = book.status === "available" && book.availableQuantity > 0;

  const bookDetailHref = `/granthagar/books/${book.category}/${book.productId}`;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAvailable) return;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1500);

    addToCart(book, 1);
  };

  const handleQtyChange = (val: number) => {
    updateQuantity(book.productId, val);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#91caff] dark:hover:border-[#15325b] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.4)] transition-all duration-200">
      {/* 1. Image Container (Fills up like ProductCard, rounded-t-xl, object-cover) */}
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-slate-50 dark:bg-[#141414]">
        <Link href={bookDetailHref} className="absolute inset-0 z-0 block">
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* Out of Stock / Borrowed Overlay (Matching ProductCard) */}
        {!isAvailable && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 dark:bg-[#141414]/80">
            <span className="px-3 py-1 text-xs font-bold rounded bg-[#fff2f0] dark:bg-[#2c1618] text-[#cf1322] dark:text-[#ff7875] border border-[#ffccc7] dark:border-[#5b2123] shadow-sm">
              {book.currentBorrower ? `ধার দেওয়া (${book.currentBorrower.name})` : "স্টক শেষ"}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Container (Matching ProductCard text sizing & padding) */}
      <div className="flex flex-1 flex-col p-4 sm:p-4.5">
        <div className="mb-3 flex flex-1 flex-col">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <Link href={bookDetailHref} className="flex-1">
              <h3 className="line-clamp-2 text-sm sm:text-[15px] font-semibold leading-snug text-slate-900 dark:text-white transition-colors group-hover:text-[#1677ff] dark:group-hover:text-[#3c89e8]">
                {book.title}
              </h3>
            </Link>
          </div>

          <p className="text-xs sm:text-[13px] font-medium text-[#1677ff] dark:text-[#3c89e8]">
            {book.author}
          </p>

          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-1">
            {book.shortDesc}
          </p>
        </div>

        {/* 3. Actions Area */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-[#303030]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Available: <strong className="text-slate-900 dark:text-white font-bold">{book.availableQuantity}</strong>
              {book.totalQuantity ? ` of ${book.totalQuantity}` : " Copies"}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {isAvailable ? "In Library" : "Currently Borrowed"}
            </span>
          </div>

          <div className="relative z-10 flex min-w-26 shrink-0 justify-end">
            {!inCart ? (
              <button
                onClick={handleAdd}
                disabled={!isAvailable}
                className={cn(
                  "flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-xs",
                  showSuccess
                    ? "bg-[#52c41a] text-white"
                    : "bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_2px_0_rgba(5,145,255,0.1)]"
                )}
              >
                {showSuccess ? (
                  <Check className="size-3.5 shrink-0" />
                ) : (
                  <ShoppingBag className="size-3.5 shrink-0" />
                )}
                <span>{showSuccess ? "Added" : "Add to Cart"}</span>
              </button>
            ) : (
              <QuantitySelector
                quantity={currentQty}
                setQuantity={handleQtyChange}
                min={0}
                max={book.availableQuantity}
                variant="compact"
                className="w-26"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
