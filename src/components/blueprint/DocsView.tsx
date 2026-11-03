// src/components/blueprint/DocsView.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronRight,
  Clock,
  Calendar,
  Share2,
} from "lucide-react";
import { blueprintDocs, DocArticle } from "@/data/blueprintDocsData";
import DocsSidebar from "./DocsSidebar";
import DocsToc from "./DocsToc";
import DocsCallout from "./DocsCallout";
import DocsTable from "./DocsTable";
import DocsSteps from "./DocsSteps";
import DocsCards from "./DocsCards";
import DocsPagination from "./DocsPagination";

interface DocsViewProps {
  slug: string;
}

export default function DocsView({ slug }: DocsViewProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const doc: DocArticle = blueprintDocs[slug] || blueprintDocs.constitution;

  return (
    <div className="flex-1 w-full flex flex-col bg-white dark:bg-[#070b14] text-slate-800 dark:text-slate-100">
      {/* ──────────────── Mobile Docs Sub-Header (Only on Mobile) ──────────────── */}
      <div className="lg:hidden sticky top-16 z-30 bg-white/95 dark:bg-[#0b101b]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-lg active:scale-95 transition-transform cursor-pointer"
        >
          <Menu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>সূচিপত্র</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[190px]">
          <span className="truncate">{doc.title}</span>
        </div>
      </div>

      {/* ──────────────── Main Docs Flex Layout ──────────────── */}
      <div className="flex-1 w-full flex">
        {/* Left Sidebar (Desktop Sticky in normal DOM flow + Mobile Drawer) */}
        <DocsSidebar
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Center Main Reading Content (Natural Flow) */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 xl:px-12 py-8 sm:py-10 max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <Link
              href="/blueprint"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              ব্লুপ্রিন্ট ডক্স
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
              {doc.group}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate">
              {doc.title}
            </span>
          </div>

          {/* Document Title Header */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-2">
            {doc.title}
          </h1>
          <div className="text-xs sm:text-sm font-medium text-slate-400 dark:text-slate-500 mb-4">
            {doc.englishTitle}
          </div>

          {/* Doc Meta Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-5 mb-6 border-b border-slate-200 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>{doc.readingTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>হালনাগাদ: {doc.lastUpdated}</span>
            </span>
          </div>

          {/* Lead Summary Highlight */}
          <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal mb-8 bg-slate-50 dark:bg-[#0c121e] p-4 rounded-xl border-l-4 border-emerald-500">
            {doc.summary}
          </div>

          {/* Structured Sections */}
          <div className="space-y-10">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200/80 dark:border-slate-800/80 mb-3 flex items-center justify-between group">
                  <span>{section.title}</span>
                  <a
                    href={`#${section.id}`}
                    className="text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 transition-colors text-sm font-normal"
                    title="স্থায়ী লিঙ্ক"
                  >
                    #
                  </a>
                </h2>

                {section.lead && (
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                    {section.lead}
                  </p>
                )}

                {section.content && (
                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {section.callout && (
                  <DocsCallout
                    type={section.callout.type}
                    title={section.callout.title}
                  >
                    {section.callout.text}
                  </DocsCallout>
                )}

                {section.table && (
                  <DocsTable
                    headers={section.table.headers}
                    rows={section.table.rows}
                  />
                )}

                {section.steps && <DocsSteps steps={section.steps} />}

                {section.cards && <DocsCards cards={section.cards} />}
              </section>
            ))}
          </div>

          {/* Pagination Navigation (Previous & Next) */}
          <DocsPagination currentSlug={doc.slug} />

          {/* Minimal Clean Docs Footer */}
          <footer className="mt-16 pt-8 pb-12 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                বাশার গ্রুপ (BASAR Group) — উন্মুক্ত জ্ঞান ও ব্লুপ্রিন্ট
              </p>
              <p className="text-[11px] mt-0.5">
                শিক্ষা, আত্মনির্ভরতা ও সামাজিক রূপান্তরের সমন্বিত দলিল।
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/blueprint/constitution"
                className="hover:text-emerald-500 transition-colors"
              >
                সংবিধান
              </Link>
              <span>•</span>
              <Link
                href="/blueprint/library"
                className="hover:text-emerald-500 transition-colors"
              >
                গ্রন্থাগার
              </Link>
              <span>•</span>
              <Link
                href="/blueprint/it-park"
                className="hover:text-emerald-500 transition-colors"
              >
                আইটি পার্ক
              </Link>
            </div>
          </footer>
        </main>

        {/* Right Sticky TOC (Desktop only) */}
        <DocsToc toc={doc.toc} />
      </div>
    </div>
  );
}
