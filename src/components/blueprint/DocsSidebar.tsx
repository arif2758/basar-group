// src/components/blueprint/DocsSidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  X,
  BookOpen,
  Laptop,
  ShoppingCart,
  HeartHandshake,
  GitBranch,
  Building2,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { docGroups } from "@/data/blueprintDocsData";

interface DocsSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  constitution: ShieldCheck,
  library: BookOpen,
  "it-park": Laptop,
  "super-shop": ShoppingCart,
  foundation: HeartHandshake,
  "family-tree": GitBranch,
  mosque: Building2,
};

export default function DocsSidebar({
  mobileOpen = false,
  onCloseMobile,
}: DocsSidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const currentSlug = pathname.startsWith("/blueprint/")
    ? pathname.replace("/blueprint/", "").split("/")[0]
    : pathname === "/blueprint"
      ? "constitution"
      : "";

  const renderNavContent = () => (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-white dark:bg-[#0b101b]">
      {/* Search Input Box */}
      <div className="p-3.5 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ব্লুপ্রিন্ট সার্চ করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs bg-slate-100 dark:bg-[#141b2a] border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-[#070b14] text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Grouped Links List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {docGroups.map((group, idx) => {
          const filteredItems = group.items.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={idx}>
              <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {group.name}
              </div>

              <div className="space-y-0.5">
                {filteredItems.map((item) => {
                  const isActive = currentSlug === item.slug;
                  const IconComp = iconMap[item.slug] || FileText;

                  return (
                    <Link
                      key={item.slug}
                      href={`/blueprint/${item.slug}`}
                      onClick={onCloseMobile}
                      className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border-l-2 border-emerald-600 dark:border-emerald-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <IconComp
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                          }`}
                        />
                        <span className="truncate">{item.title}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded leading-none shrink-0 ${
                            isActive
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Version Tag at Bottom */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 text-[11px] text-slate-400 text-center shrink-0">
        BASAR Blueprint Docs • সংস্করণ ২.০
      </div>
    </div>
  );

  return (
    <>
      {/* ──────────────── Desktop Sticky Sidebar ──────────────── */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b101b] z-20">
        {renderNavContent()}
      </aside>

      {/* ──────────────── Mobile Slide-in Drawer ──────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Box */}
          <div className="fixed inset-y-0 left-0 w-72 sm:w-80 bg-white dark:bg-[#0b101b] shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                ডকুমেন্টেশন সূচিপত্র
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="flex-1 min-h-0 flex flex-col">
              {renderNavContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
