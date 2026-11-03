// src/components/blueprint/DocsToc.tsx
"use client";

import React, { useState } from "react";
import { Share2, Check, Printer, Bookmark } from "lucide-react";

interface DocsTocProps {
  toc: { id: string; title: string }[];
}

export default function DocsToc({ toc }: DocsTocProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!toc || toc.length === 0) return null;

  return (
    <aside className="hidden xl:block w-64 sticky top-20 self-start p-4 text-xs">
      <div className="font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 text-[11px] flex items-center gap-1.5">
        <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
        <span>এই পাতায় রয়েছে</span>
      </div>

      <nav className="space-y-1.5 border-l border-slate-200 dark:border-slate-800 pl-3">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block py-1 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors leading-snug"
          >
            {item.title}
          </a>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2">
        <button
          onClick={handleCopy}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>লিঙ্ক কপি হয়েছে!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>লিঙ্ক কপি করুন</span>
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>ডকুমেন্ট প্রিন্ট / PDF</span>
        </button>
      </div>
    </aside>
  );
}

