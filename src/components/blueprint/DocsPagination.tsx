// src/components/blueprint/DocsPagination.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { docGroups } from "@/data/blueprintDocsData";

interface DocsPaginationProps {
  currentSlug: string;
}

export default function DocsPagination({ currentSlug }: DocsPaginationProps) {
  const flatItems = docGroups.flatMap((g) => g.items);
  const currentIndex = flatItems.findIndex((it) => it.slug === currentSlug);

  const prevItem = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextItem =
    currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return (
    <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prevItem ? (
        <Link
          href={`/blueprint/${prevItem.slug}`}
          className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 bg-white dark:bg-[#0b101b] transition-all flex items-center gap-3 text-left"
        >
          <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-0.5 transition-transform shrink-0" />
          <div className="min-w-0">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              পূর্ববর্তী অধ্যায়
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {prevItem.title}
            </div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextItem && (
        <Link
          href={`/blueprint/${nextItem.slug}`}
          className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 bg-white dark:bg-[#0b101b] transition-all flex items-center justify-between gap-3 text-right"
        >
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">
              পরবর্তী অধ্যায়
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
              {nextItem.title}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </Link>
      )}
    </div>
  );
}

