"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  House,
  ShoppingBag,
  Tag,
  PackageSearch,
  PhoneCall,
  Search,
  Menu,
  X,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CartButton from "./CartButton";
import UnifiedUserMenu from "@/components/UnifiedUserMenu";
import SearchDropdown from "./SearchDropdown";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { WhatsAppIcon } from "@/socialCustomSVGIcon/SocialCustomSVGIcon";

const NAV_ITEMS = [
  { label: "হোম", href: "/super-shop", icon: House },
  { label: "প্রোডাক্টস", href: "/super-shop/products", icon: ShoppingBag },
  { label: "অফারস", href: "/super-shop/products?sale=true", icon: Tag },
  { label: "অর্ডার ট্র্যাক", href: "/super-shop/track-order", icon: PackageSearch },
  { label: "যোগাযোগ", href: "/super-shop/contact", icon: PhoneCall },
];

// ✅ Desktop Nav Links
function NavLinks() {
  const pathname = usePathname();
  const [isOffersActive, setIsOffersActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsOffersActive(params.get("sale") === "true");
    }
  }, [pathname]);

  const currentPath = pathname.replace(/\/$/, "") || "/";
  const isActive = (href: string): boolean => {
    const [base, query] = href.split("?");
    const basePath = base.replace(/\/$/, "") || "/";
    if (basePath === "/super-shop") return currentPath === "/super-shop";
    if (query) {
      return currentPath === basePath && isOffersActive;
    }
    if (basePath === "/super-shop/products") {
      if (isOffersActive) return false;
      return currentPath.startsWith("/super-shop/products");
    }
    return currentPath.startsWith(basePath);
  };

  return (
    <div
      className="hidden lg:flex items-center gap-1"
      aria-label="Main navigation"
    >
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

// ✅ Mobile Nav Links
function MobileNavLinks({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const [isOffersActive, setIsOffersActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsOffersActive(params.get("sale") === "true");
    }
  }, [pathname]);

  const currentPath = pathname.replace(/\/$/, "") || "/";
  const isActive = (href: string): boolean => {
    const [base, query] = href.split("?");
    const basePath = base.replace(/\/$/, "") || "/";
    if (basePath === "/super-shop") return currentPath === "/super-shop";
    if (query) {
      return currentPath === basePath && isOffersActive;
    }
    if (basePath === "/super-shop/products") {
      if (isOffersActive) return false;
      return currentPath.startsWith("/super-shop/products");
    }
    return currentPath.startsWith(basePath);
  };

  return (
    <nav
      className="container mx-auto px-4 py-3 space-y-1"
      aria-label="Mobile navigation"
    >
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
                : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-white/5",
            )}
          >
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-lg transition-colors",
                active
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400"
                  : "bg-slate-100 text-slate-500 dark:bg-[#262626] dark:text-slate-400",
              )}
            >
              <Icon className="size-4" />
            </div>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// ✅ Route change হলে menu/search বন্ধ
function NavigationCloser({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, searchKey, onClose]);

  return null;
}

export default function NavbarClient() {
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

  // stable callback — route change এ সব বন্ধ
  const handleNavigationClose = useCallback(() => {
    setMobileOpen(false);
    setShowSearch(false);
  }, []);

  // Search toggle — mobile menu বন্ধ করে
  const handleSearchToggle = () => {
    setMobileOpen(false);
    setShowSearch((s) => !s);
  };

  // Mobile toggle — search বন্ধ করে
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
            href="/super-shop"
            className="flex items-center transition-transform hover:opacity-90 active:scale-95 shrink-0"
            aria-label="Super Shop"
          >
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              Super Shop
            </span>
          </Link> 

          {/* Desktop Nav */}
          <NavLinks />

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Toggle */}
            <button
              type="button"
              onClick={handleSearchToggle}
              aria-label="Search"
              aria-expanded={showSearch}
              aria-controls="navbar-search-dropdown"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
            >
              {showSearch ? (
                <X className="size-4" />
              ) : (
                <Search className="size-4" />
              )}
            </button>

            {/* Cart Button */}
            <CartButton />

            {/* Ant Design Theme Switcher */}
            <ThemeSwitcher />

            {/* User Menu */}
            <UnifiedUserMenu variant="default" />

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex items-center justify-center h-9 w-9 lg:hidden rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
              onClick={handleMobileToggle}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Route change listener */}
      <Suspense fallback={null}>
        <NavigationCloser onClose={handleNavigationClose} />
      </Suspense>

      {/* Search Dropdown */}
      {showSearch && (
        <div
          id="navbar-search-dropdown"
          className="fixed top-[50px] left-0 right-0 z-60"
        >
          <SearchDropdown onClose={() => setShowSearch(false)} />
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-[50px] z-45 bg-black/50 animate-in fade-in duration-200 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed top-[50px] left-0 right-0 z-55 lg:hidden bg-white dark:bg-[#1f1f1f] border-b border-slate-200 dark:border-[#303030] shadow-xl animate-in slide-in-from-top-2 duration-200"
          >
            <MobileNavLinks onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3">
        {/* WhatsApp */}
        <Link
          href="https://wa.me/8801568390014"
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-[#20ba5a] group"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon className="size-6 text-white" />
        </Link>

        {/* Scroll to Top */}
        {showScrollTop && (
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="icon"
            className="h-11 w-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#1668dc] dark:hover:bg-[#1554ad] shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in slide-in-from-bottom-4"
            aria-label="Scroll to top"
          >
            <ChevronUp className="size-5" />
          </Button>
        )}
      </div>

      <div className="h-[50px]" />
    </>
  );
}
