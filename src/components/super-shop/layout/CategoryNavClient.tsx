// src/components/layout/CategoryNavClient.tsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CategoryNavItem } from "./CategoryNav";

interface CategoryNavClientProps {
  categories: CategoryNavItem[];
}

export function CategoryNavClient({ categories }: CategoryNavClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const isActive = (slug: string) => pathname.startsWith(`/super-shop/products/${slug}`);
  const isAllActive = pathname === "/super-shop/products";

  const handleClick = (slug: string) => {
    router.push(`/super-shop/products/${slug}`);
  };

  if (categories.length === 0) return null;

  return (
    <>
      <div
        className={cn(
          "fixed top-[50px] left-0 right-0 z-40 bg-transparent transition-transform duration-300 ease-in-out pointer-events-none",
          !isVisible && "-translate-y-full",
        )}
        aria-label="Category navigation"
      >
        {showLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={isScrolling}
            className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 p-0 rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 shadow-md border border-slate-200 dark:border-[#303030] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
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
          <div className={cn("flex items-center gap-2 py-2.5 transition-[padding] duration-200", showLeft ? "pl-12" : "pl-4", showRight ? "pr-12" : "pr-4")}>
            <button
              onClick={() => router.push("/super-shop/products")}
              className={cn(
                "rounded-full px-4 text-xs h-8 transition-all duration-150 font-medium shrink-0 whitespace-nowrap border cursor-pointer",
                isAllActive
                  ? "bg-[#e6f4ff] text-[#1677ff] border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] shadow-xs font-semibold"
                  : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40",
              )}
            >
              সব
            </button>

            {categories.map(({ name, slug }) => (
              <button
                key={slug}
                onClick={() => handleClick(slug)}
                className={cn(
                  "rounded-full px-4 text-xs h-8 transition-all duration-150 font-medium shrink-0 whitespace-nowrap border cursor-pointer",
                  isActive(slug)
                    ? "bg-[#e6f4ff] text-[#1677ff] border-[#91caff] dark:bg-[#111a2c] dark:text-[#3c89e8] dark:border-[#15325b] shadow-xs font-semibold"
                    : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-[#91caff] dark:hover:border-[#15325b] hover:text-[#1677ff] dark:hover:text-[#3c89e8] hover:bg-[#e6f4ff]/40 dark:hover:bg-[#111a2c]/40",
                )}
              >
                {name}
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
            className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 p-0 rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 shadow-md border border-slate-200 dark:border-[#303030] flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="size-4 stroke-2" />
          </button>
        )}
      </div>
      {/* Spacer so content does not go under the fixed category navbar */}
      <div className="h-10" />
    </>
  );
}
