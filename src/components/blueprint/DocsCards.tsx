// src/components/blueprint/DocsCards.tsx
"use client";

import React from "react";

interface CardItem {
  title: string;
  desc: string;
  badge?: string;
}

interface DocsCardsProps {
  cards: CardItem[];
}

export default function DocsCards({ cards }: DocsCardsProps) {
  return (
    <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {cards.map((c, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b101b] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {c.title}
              </h4>
              {c.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  {c.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {c.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

