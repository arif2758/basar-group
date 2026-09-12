// src/components/granthagar/layout/BookCategoryNav.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllBookCategories } from "@/data/granthagar/booksData";

export default function BookCategoryNav() {
  const router = useRouter();
  const pathname = usePathname();
  const categories = getAllBookCategories();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide on scroll down, show on scroll up (matching Super Shop behavior)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < 120) {
            setIsVisible(true);
            setLastScrollY(currentScrollY);
            ticking = false;
            return;
          }

          const delta = Math.abs(currentScrollY - lastScrollY);
          if (delta < 10) {
            ticking = false;
            return;
          }

          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isScrolling) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, [isScrolling]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(checkScroll, 100);
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el || isScrolling) return;

    setIsScrolling(true);
    const scrollAmount = el.clientWidth * 0.7;
    const start = el.scrollLeft;
    const target =
      dir === "left"
        ? Math.max(0, start - scrollAmount)
        : Math.min(el.scrollWidth - el.clientWidth, start + scrollAmount);

    const duration = 300;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      el.scrollLeft = start + (target - start) * easeProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setIsScrolling(false);
        checkScroll();
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const isActive = (slug: string) => {
    return pathname.startsWith(`/granthagar/books/${slug}`);
  };

  const isAllActive = pathname === "/granthagar/books";

  const handleClick = (slug: string) => {
    router.push(`/granthagar/books/${slug}`);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-[50px] left-0 right-0 z-40 bg-transparent transition-transform duration-300 ease-in-out pointer-events-none",
          !isVisible && "-translate-y-full"
        )}
        aria-label="Book Category navigation"
      >
        {showLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={isScrolling}
            className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 p-0 rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 shadow-md border border-slate-200 dark:border-[#303030] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="size-4 stroke-2" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="pointer-events-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ scrollBehavior: "auto" }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={cn(
                "flex items-center gap-2 py-2 transition-[padding] duration-200",
                showLeft ? "pl-10 sm:pl-11" : "pl-[2px] sm:pl-4",
                showRight ? "pr-10 sm:pr-11" : "pr-2 sm:pr-4"
              )}
            >
              {/* All Books Button */}
              <button
                onClick={() => router.push("/granthagar/books")}
                className={cn(
                  "rounded-full px-3.5 text-xs h-7.5 transition-all duration-150 font-medium shrink-0 whitespace-nowrap border cursor-pointer flex items-center gap-1.5",
                  isAllActive
                    ? "bg-[#e6f4ff] text-[#1677ff] border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] shadow-xs font-semibold"
                    : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40"
                )}
              >
                <span>সব বই (All)</span>
              </button>

              {/* Category Pills with counts */}
              {categories.map(({ name, slug, count }) => (
                <button
                  key={slug}
                  onClick={() => handleClick(slug)}
                  className={cn(
                    "rounded-full px-3.5 text-xs h-7.5 transition-all duration-150 font-medium shrink-0 whitespace-nowrap border cursor-pointer flex items-center gap-1.5",
                    isActive(slug)
                      ? "bg-[#e6f4ff] text-[#1677ff] border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] shadow-xs font-semibold"
                      : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40"
                  )}
                >
                  <span>{name}</span>
                  {typeof count === "number" && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-0.2 rounded-full",
                        isActive(slug)
                          ? "bg-[#1677ff] text-white"
                          : "bg-slate-100 dark:bg-[#262626] text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {showRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={isScrolling}
            className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 z-20 h-7 w-7 p-0 rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 shadow-md border border-slate-200 dark:border-[#303030] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="size-4 stroke-2" />
          </button>
        )}
      </div>

      {/* Spacer so page content starts below the fixed navbar and category nav */}
      <div className="h-[42px]" />
    </>
  );
}
