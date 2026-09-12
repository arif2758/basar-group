"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  HelpCircle,
  Sparkles,
  Users,
  Award,
  Phone,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavbarVisibility } from "@/hooks/useNavbarVisibility";

const NAV_ITEMS = [
  { name: "ওভারভিউ", href: "/foundation", icon: LayoutDashboard, exact: true, color: "text-blue-500" },
  { name: "অনলাইন অনুদান", href: "/foundation/donate", icon: Heart, color: "text-rose-500", badge: "যাকাত" },
  { name: "সহায়তার আবেদন", href: "/foundation/request-aid", icon: HelpCircle, color: "text-emerald-500" },
  { name: "ক্যাম্পেইনসমূহ", href: "/foundation/campaigns", icon: Sparkles, color: "text-amber-500" },
  { name: "স্বেচ্ছাসেবক ও রক্তদান", href: "/foundation/volunteer", icon: Users, color: "text-purple-500" },
  { name: "ডোনর ওয়াল", href: "/foundation/donors", icon: Award, color: "text-amber-500" },
  { name: "যোগাযোগ ও হটলাইন", href: "/foundation/contact", icon: Phone, color: "text-cyan-500" },
];

export default function FoundationSubNav() {
  const pathname = usePathname();
  const currentPath = pathname ? pathname.replace(/\/$/, "") || "/" : "";
  const navRef = useRef<HTMLElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isNavVisible = useNavbarVisibility();

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
    <div
      className={cn(
        "sticky z-40 w-full transition-all duration-300 ease-in-out py-2.5 bg-slate-50/90 dark:bg-[#141414]/90 backdrop-blur-md",
        isNavVisible ? "top-[50px]" : "top-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-1.5 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] transition-colors group">
          {/* Left Scroll Button */}
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
                ? currentPath === item.href
                : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  className={cn(
                    "dashboard-nav-item inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium whitespace-nowrap shrink-0",
                    isActive ? "dashboard-nav-item-active" : ""
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      isActive ? "text-white" : item.color || "text-slate-400"
                    )}
                  />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-amber-100 dark:bg-[#2b2111] text-amber-700 dark:text-[#d89614] border border-amber-200 dark:border-[#594214]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Scroll Button */}
          {canScrollRight && (
            <div className="absolute right-1 top-1.5 bottom-1.5 z-10 flex items-center pl-3 pr-0.5 bg-gradient-to-l from-white via-white/95 dark:from-[#1f1f1f] dark:via-[#1f1f1f]/95 to-transparent rounded-r-xl pointer-events-none">
              <button
                type="button"
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
                className="size-7 rounded-lg bg-slate-100 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-[#3c89e8] flex items-center justify-center shadow-xs transition-all active:scale-90 cursor-pointer pointer-events-auto"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
