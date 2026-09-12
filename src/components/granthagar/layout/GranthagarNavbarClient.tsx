// src/components/granthagar/layout/GranthagarNavbarClient.tsx
"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  House,
  Search,
  Menu,
  X,
  ChevronUp,
  BookmarkCheck,
  Gift,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BookCartButton from "./BookCartButton";
import BookSearchDropdown from "./BookSearchDropdown";
import UnifiedUserMenu from "@/components/UnifiedUserMenu";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const NAV_ITEMS = [
  { label: "হোম", href: "/granthagar", icon: House },
  { label: "সকল বই", href: "/granthagar/books", icon: BookOpen },
  { label: "পাঠক ট্র্যাকার", href: "/granthagar/reading-tracker", icon: BookmarkCheck },
  { label: "দাতা তালিকা", href: "/granthagar/donors", icon: Gift },
];

function NavLinks() {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "") || "/";

  const isActive = (href: string): boolean => {
    const target = href.replace(/\/$/, "") || "/";
    if (target === "/granthagar") return currentPath === "/granthagar";
    return currentPath.startsWith(target);
  };

  return (
    <div className="hidden lg:flex items-center gap-1" aria-label="Library navigation">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "main-nav-item relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-all duration-150 select-none cursor-pointer",
              active ? "main-nav-item-active" : ""
            )}
          >
            <Icon className="size-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}

function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "") || "/";

  const isActive = (href: string): boolean => {
    const target = href.replace(/\/$/, "") || "/";
    if (target === "/granthagar") return currentPath === "/granthagar";
    return currentPath.startsWith(target);
  };

  return (
    <nav className="container mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
      {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              active
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 font-semibold"
                : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5"
            )}
          >
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors",
                active
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400"
                  : "bg-slate-100 text-slate-500 dark:bg-[#262626] dark:text-slate-400"
              )}
            >
              <Icon className="size-4" />
            </div>
            <span>{label}</span>
          </Link>
        );
      })}

      {/* Back to main portal link */}
      <Link
        href="/"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-[#262626]">
          <ArrowLeft className="size-4" />
        </div>
        <span>বাছার গ্রুপ মূল সাইট</span>
      </Link>
    </nav>
  );
}

export default function GranthagarNavbarClient() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchToggle = () => {
    setMobileOpen(false);
    setShowSearch((s) => !s);
  };

  const handleMobileToggle = () => {
    setShowSearch(false);
    setMobileOpen((o) => !o);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1f1f1f]/95 backdrop-blur-md w-full h-[50px] transition-colors duration-200 border-b border-slate-200 dark:border-[#303030]">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/granthagar"
            className="flex items-center transition-transform hover:opacity-90 active:scale-95 shrink-0"
            aria-label="গ্রন্থাগার"
          >
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              গ্রন্থাগার
            </span>
          </Link>

          {/* Desktop Nav */}
          <NavLinks />

          {/* Action Icons Right */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={handleSearchToggle}
              className="relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
              aria-label="Search books"
            >
              <Search className="size-4" />
            </button>

            {/* Book Cart Button */}
            <BookCartButton />

            {/* Ant Design Theme Switcher (Mobile & Desktop) */}
            <ThemeSwitcher />

            {/* User Profile */}
            <UnifiedUserMenu />

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileToggle}
              className="lg:hidden relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <BookSearchDropdown
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
      />

      {/* Mobile Drawer Menu (z-60 to sit above BookCategoryNav z-40) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[50px] z-50 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-[50px] left-0 right-0 z-60 bg-white dark:bg-[#1f1f1f] border-b border-slate-200 dark:border-[#303030] shadow-2xl lg:hidden animate-in slide-in-from-top-2 duration-200">
            <MobileNavLinks onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 flex size-10 items-center justify-center rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-[#303030] hover:border-blue-400 hover:text-blue-600 transition-all active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-5" />
        </button>
      )}

      {/* Spacer so page content starts below the fixed 50px navbar (matching Super Shop) */}
      <div className="h-[50px]" />
    </>
  );
}
