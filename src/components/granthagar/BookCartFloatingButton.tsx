// src/components/granthagar/BookCartFloatingButton.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useBookCart } from "@/context/BookCartContext";

export default function BookCartFloatingButton() {
  const { totalItems } = useBookCart();
  const pathname = usePathname();

  // Don't show floating button on cart or checkout pages
  if (pathname === "/granthagar/cart" || pathname === "/granthagar/checkout") {
    return null;
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <Link
        href="/granthagar/cart"
        className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-700 dark:border-slate-300 group"
      >
        <div className="relative flex items-center justify-center size-8 rounded-xl bg-[#1677ff] text-white">
          <ShoppingBag className="size-4.5" />
          <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white border-2 border-slate-900 dark:border-white">
            {totalItems}
          </span>
        </div>

        <div className="text-left pr-1">
          <div className="text-xs font-extrabold leading-none">বইয়ের ঝুলি</div>
          <div className="text-[10px] opacity-75 font-semibold mt-0.5">
            {totalItems} Copies Selected
          </div>
        </div>

        <div className="size-7 rounded-lg bg-white/10 dark:bg-slate-900/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
          <ArrowRight className="size-3.5" />
        </div>
      </Link>
    </div>
  );
}
