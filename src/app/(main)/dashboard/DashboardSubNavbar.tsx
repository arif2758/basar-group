"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Heart,
  ShoppingBag,
  Laptop,
  User,
  GitPullRequestDraft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ৪টি ডিপার্টমেন্টের সঠিক সিকোয়েন্স: গ্রন্থাগার, ফাউন্ডেশন, সুপার শপ, আইটি পার্ক
const NAV_ITEMS = [
  { name: "ওভারভিউ", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "গ্রন্থাগার", href: "/dashboard/library", icon: BookOpen, color: "text-blue-500" },
  { name: "ফাউন্ডেশন", href: "/dashboard/foundation", icon: Heart, color: "text-rose-500" },
  { name: "সুপার শপ", href: "/dashboard/shop", icon: ShoppingBag, color: "text-amber-500" },
  { name: "আইটি পার্ক", href: "/dashboard/it-park", icon: Laptop, color: "text-purple-500" },
  { name: "আবেদন ও স্ট্যাটাস", href: "/dashboard/requests", icon: GitPullRequestDraft },
  { name: "প্রোফাইল", href: "/dashboard/profile", icon: User },
];

export default function DashboardSubNavbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = navRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = navRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });

    // Auto scroll active item into view on load/route change
    const activeEl = el.querySelector<HTMLElement>("[data-active='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
    }

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [pathname, checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    const el = navRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -180 : 180;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors group">
      {/* Left Scroll Button / Fade Indicator */}
      {canScrollLeft && (
        <div className="absolute left-1 top-1.5 bottom-1.5 z-10 flex items-center pr-3 pl-0.5 bg-gradient-to-r from-white via-white/95 dark:from-[#1f1f1f] dark:via-[#1f1f1f]/95 to-transparent rounded-l-xl pointer-events-none">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="size-7 rounded-lg bg-slate-100 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-[#3c89e8] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer pointer-events-auto"
          >
            <ChevronLeft className="size-4" />
          </button>
        </div>
      )}

      {/* Nav Items Container */}
      <nav
        ref={navRef}
        className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all duration-150 shrink-0",
                isActive
                  ? "bg-[#1677ff] text-white font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              )}
            >
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  isActive ? "text-white" : item.color || "text-slate-400"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right Scroll Button / Fade Indicator (Signals more items exist!) */}
      {canScrollRight && (
        <div className="absolute right-1 top-1.5 bottom-1.5 z-10 flex items-center pl-3 pr-0.5 bg-gradient-to-l from-white via-white/95 dark:from-[#1f1f1f] dark:via-[#1f1f1f]/95 to-transparent rounded-r-xl pointer-events-none">
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="size-7 rounded-lg bg-slate-100 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-[#3c89e8] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer pointer-events-auto animate-pulse sm:animate-none"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
