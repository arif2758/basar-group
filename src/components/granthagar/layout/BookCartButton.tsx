// src/components/granthagar/layout/BookCartButton.tsx
"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useBookCart } from "@/context/BookCartContext";

export default function BookCartButton() {
  const { totalItems: count } = useBookCart();

  return (
    <Link
      href="/granthagar/cart"
      aria-label={`Book Bag — ${count} item${count !== 1 ? "s" : ""}`}
    >
      <button
        type="button"
        className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
      >
        <ShoppingBag className="size-4" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 size-5 min-w-5 rounded-full p-0 flex items-center justify-center text-[10px] font-bold bg-[#1677ff] dark:bg-[#1668dc] text-white border-2 border-slate-100 dark:border-[#141414] animate-in zoom-in duration-300 shadow-xs pointer-events-none">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </Link>
  );
}
