"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Building2,
  ShoppingCart,
  Laptop,
  Info,
  Phone,
  ChevronDown,
  ArrowRight,
  Book,
  FileText,
  Bookmark,
  Users,
  Calendar,
  CreditCard,
  Search,
  Target,
  TrendingUp,
  Heart,
  LayoutGrid,
  Trophy,
  Store,
  ShoppingBag,
  MessageSquare,
  Lightbulb,
  Briefcase,
  Shield,
  Menu as MenuIcon,
  X,
  Leaf,
  Apple,
  Package,
  Fish,
  Wheat,
  Cookie,
  Coffee,
  Sparkles,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

// Category definitions for Super Shop
const categories = [
  { key: "vegetables", label: "সবজি", icon: Leaf, href: "/super-shop/shop?category=vegetables" },
  { key: "fruits", label: "ফলমূল", icon: Apple, href: "/super-shop/shop?category=fruits" },
  { key: "dairy", label: "দুগ্ধজাত", icon: Package, href: "/super-shop/shop?category=dairy" },
  { key: "meat-fish", label: "মাংস ও মাছ", icon: Fish, href: "/super-shop/shop?category=meat-fish" },
  { key: "rice-grains", label: "চাল ও শস্য", icon: Wheat, href: "/super-shop/shop?category=rice-grains" },
  { key: "snacks", label: "স্ন্যাকস", icon: Cookie, href: "/super-shop/shop?category=snacks" },
  { key: "beverages", label: "পানীয়", icon: Coffee, href: "/super-shop/shop?category=beverages" },
  { key: "personal-care", label: "ব্যক্তিগত যত্ন", icon: Sparkles, href: "/super-shop/shop?category=personal-care" },
  { key: "household", label: "গৃহস্থালি", icon: Home, href: "/super-shop/shop?category=household" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({
    library: false,
    foundation: false,
    shop: false,
    categories: false,
    itpark: false,
  });

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns and drawer on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Smooth hover handlers with invisible hover bridge
  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 240);
  };

  const toggleMobileSubmenu = (key: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Determine if a main section is currently active
  const isSectionActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Common Navlink Styles
  const navItemClass = (isActive: boolean) =>
    `relative px-2.5 xl:px-3 py-1.5 text-[13.5px] font-medium rounded-lg flex items-center gap-1.5 transition-all duration-150 select-none cursor-pointer ${
      isActive
        ? "bg-blue-50/90 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold shadow-xs"
        : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100/70 dark:hover:bg-white/5"
    }`;

  return (
    <>
      {/* Desktop & Mobile Top Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-slate-100 dark:border-[#202020] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2 xl:gap-4">
            
            {/* Logo Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0 focus:outline-none"
            >
              <div className="relative h-10 w-10 rounded-xl bg-white dark:bg-[#1e1e1e] shadow-xs border border-slate-200 dark:border-[#333] flex items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:shadow transition-all duration-300">
                <span
                  className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent font-black text-xl select-none"
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  B
                </span>
              </div>

              <div className="leading-tight flex flex-col justify-center text-center">
                <div className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  BASAR Group
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                  Learn. Earn. Empower.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center justify-end flex-1 gap-1 xl:gap-1.5 nav-dropdown-container">
              
              {/* Home */}
              <Link
                href="/"
                className={navItemClass(pathname === "/")}
              >
                <Home className="w-3.5 h-3.5 opacity-70" />
                <span>হোম</span>
              </Link>

              {/* Library (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("library")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "library" ? null : "library")}
                  className={navItemClass(isSectionActive("/granthagar") || activeDropdown === "library")}
                >
                  <BookOpen className="w-3.5 h-3.5 opacity-70" />
                  <span>লাইব্রেরি</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      activeDropdown === "library" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {/* Dropdown with invisible padding bridge (pt-2.5) */}
                {activeDropdown === "library" && (
                  <div className="absolute top-full left-0 pt-2.5 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    <div className="w-[430px] rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200/90 dark:border-[#303030] shadow-[0_12px_36px_0_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_0_rgba(0,0,0,0.5)] p-3">
                      
                      {/* Top Action Banner */}
                      <Link
                        href="/granthagar"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <div>
                            <div className="text-[13px] font-semibold">লাইব্রেরি হোম ভিজিট করুন</div>
                            <div className="text-[11px] text-blue-600/70 dark:text-blue-400/70">হাজারো বই, পাঠক সেবা ও তথ্যভাণ্ডার</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      {/* 2-Column Links Layout */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-[#282828]">
                        
                        {/* Col 1: Books & Catalog */}
                        <div>
                          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            বই ও ক্যাটালগ
                          </div>
                          <div className="space-y-0.5 mt-1">
                            <Link
                              href="/granthagar/books-catalog"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Book className="w-3.5 h-3.5 text-blue-500 opacity-80" />
                              <span>বই ক্যাটালগ</span>
                            </Link>
                            <Link
                              href="/granthagar/request-book"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5 text-indigo-500 opacity-80" />
                              <span>নতুন বই অনুরোধ</span>
                            </Link>
                            <Link
                              href="/granthagar/book-detail"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Search className="w-3.5 h-3.5 text-cyan-500 opacity-80" />
                              <span>বইয়ের বিবরণ</span>
                            </Link>
                          </div>
                        </div>

                        {/* Col 2: Reader Services */}
                        <div>
                          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            সেবা ও কর্নার
                          </div>
                          <div className="space-y-0.5 mt-1">
                            <Link
                              href="/granthagar/reading-tracker"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Bookmark className="w-3.5 h-3.5 text-amber-500 opacity-80" />
                              <span>আমার পাঠ ট্র্যাকার</span>
                            </Link>
                            <Link
                              href="/granthagar/membership"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <CreditCard className="w-3.5 h-3.5 text-emerald-500 opacity-80" />
                              <span>সদস্যপদ</span>
                            </Link>
                            <Link
                              href="/granthagar/donors"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Users className="w-3.5 h-3.5 text-purple-500 opacity-80" />
                              <span>দাতা তালিকা</span>
                            </Link>
                            <Link
                              href="/granthagar/events"
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <Calendar className="w-3.5 h-3.5 text-rose-500 opacity-80" />
                              <span>ইভেন্টসমূহ</span>
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Foundation (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("foundation")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "foundation" ? null : "foundation")}
                  className={navItemClass(isSectionActive("/foundation") || activeDropdown === "foundation")}
                >
                  <Building2 className="w-3.5 h-3.5 opacity-70" />
                  <span>ফাউন্ডেশন</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      activeDropdown === "foundation" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {/* Dropdown with invisible padding bridge */}
                {activeDropdown === "foundation" && (
                  <div className="absolute top-full left-0 pt-2.5 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    <div className="w-[320px] rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200/90 dark:border-[#303030] shadow-[0_12px_36px_0_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_0_rgba(0,0,0,0.5)] p-3">
                      
                      {/* Top Banner */}
                      <Link
                        href="/foundation"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100/80 dark:hover:bg-rose-900/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          <div>
                            <div className="text-[13px] font-semibold">ফাউন্ডেশন হোম ভিজিট করুন</div>
                            <div className="text-[11px] text-rose-600/70 dark:text-rose-400/70">মানবসেবা ও সমাজকল্যাণমূলক উদ্যোগ</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <div className="space-y-1 mt-2.5 pt-2 border-t border-slate-100 dark:border-[#282828]">
                        <Link
                          href="/foundation#about"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">ফাউন্ডেশন সম্পর্কে</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">আমাদের উদ্দেশ্য, ভিশন ও আদর্শ</div>
                          </div>
                        </Link>

                        <Link
                          href="/foundation#programs"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Target className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">কল্যাণমূলক প্রোগ্রাম</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">শিক্ষা, স্বাস্থ্য ও মানবিক সহায়তা</div>
                          </div>
                        </Link>

                        <Link
                          href="/foundation#impact"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                            <TrendingUp className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">সামাজিক প্রভাব</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">অগ্রগতি, রিপোর্ট ও অর্জিত ফলাফল</div>
                          </div>
                        </Link>

                        <Link
                          href="/foundation#contact"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Heart className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">অনুপ্রেরণার গল্প</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">সুবিধাভোগীদের বাস্তব অভিজ্ঞতা</div>
                          </div>
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Super Shop (Modern 2-Column Mega-Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "shop" ? null : "shop")}
                  className={navItemClass(isSectionActive("/super-shop") || activeDropdown === "shop")}
                >
                  <ShoppingCart className="w-3.5 h-3.5 opacity-70" />
                  <span>সুপার শপ</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      activeDropdown === "shop" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {/* Mega Dropdown with invisible padding bridge */}
                {activeDropdown === "shop" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    <div className="w-[520px] rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200/90 dark:border-[#303030] shadow-[0_12px_36px_0_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_0_rgba(0,0,0,0.5)] p-4">
                      
                      <div className="grid grid-cols-12 gap-4">
                        
                        {/* Left Column: Hub & Quick Links (5 cols) */}
                        <div className="col-span-5 flex flex-col justify-between pr-3 border-r border-slate-100 dark:border-[#282828]">
                          <div>
                            <Link
                              href="/super-shop"
                              className="block p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100/80 dark:hover:bg-purple-900/50 transition-colors group"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[13px] font-semibold">সুপার শপ হোম</span>
                                <ArrowRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                              <p className="text-[11px] text-purple-600/75 dark:text-purple-400/75">
                                সেরা মূল্যে নিত্যপ্রয়োজনীয় পণ্য ও গ্রোসারি
                              </p>
                            </Link>

                            <div className="space-y-1 mt-3">
                              <Link
                                href="/super-shop/shop"
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <ShoppingCart className="w-4 h-4 text-purple-500 opacity-80" />
                                <span>শপ ব্রাউজ করুন</span>
                              </Link>
                              <Link
                                href="/super-shop/rewards"
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <Trophy className="w-4 h-4 text-amber-500 opacity-80" />
                                <span>পুরস্কার ও পয়েন্ট</span>
                              </Link>
                              <Link
                                href="/super-shop/cart"
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <ShoppingBag className="w-4 h-4 text-emerald-500 opacity-80" />
                                <span>আমার কার্ট</span>
                              </Link>
                              <Link
                                href="/super-shop/about"
                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                              >
                                <Store className="w-4 h-4 text-blue-500 opacity-80" />
                                <span>শপ সম্পর্কে</span>
                              </Link>
                            </div>
                          </div>

                          <Link
                            href="/super-shop/contact"
                            className="flex items-center gap-2 px-2.5 py-1.5 mt-2 rounded-lg text-[12px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5 opacity-70" />
                            <span>কাস্টমার সাপোর্ট</span>
                          </Link>
                        </div>

                        {/* Right Column: Direct Category Grid (7 cols) - No hover trap! */}
                        <div className="col-span-7">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-[#282828]">
                            <span className="text-[12px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <LayoutGrid className="w-3.5 h-3.5 text-purple-500" />
                              জনপ্রিয় বিভাগসমূহ
                            </span>
                            <Link
                              href="/super-shop/categories"
                              className="text-[11.5px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              সব বিভাগ দেখুন
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            {categories.map((cat) => {
                              const IconComponent = cat.icon;
                              return (
                                <Link
                                  key={cat.key}
                                  href={cat.href}
                                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] text-slate-700 dark:text-slate-300 hover:bg-purple-50/70 dark:hover:bg-purple-950/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group"
                                >
                                  <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-[#252525] group-hover:bg-purple-100/60 dark:group-hover:bg-purple-900/50 flex items-center justify-center shrink-0 transition-colors">
                                    <IconComponent className="w-3.5 h-3.5 opacity-80" />
                                  </div>
                                  <span className="truncate">{cat.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* IT Park (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("itpark")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "itpark" ? null : "itpark")}
                  className={navItemClass(isSectionActive("/it-park") || activeDropdown === "itpark")}
                >
                  <Laptop className="w-3.5 h-3.5 opacity-70" />
                  <span>আইটি পার্ক</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      activeDropdown === "itpark" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {/* Dropdown with invisible padding bridge */}
                {activeDropdown === "itpark" && (
                  <div className="absolute top-full right-0 xl:left-0 pt-2.5 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                    <div className="w-[330px] rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200/90 dark:border-[#303030] shadow-[0_12px_36px_0_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_0_rgba(0,0,0,0.5)] p-3">
                      
                      {/* Top Banner */}
                      <Link
                        href="/it-park"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100/80 dark:hover:bg-sky-900/50 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Laptop className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                          <div>
                            <div className="text-[13px] font-semibold">IT Park হোম ভিজিট করুন</div>
                            <div className="text-[11px] text-sky-600/70 dark:text-sky-400/70">প্রযুক্তি, প্রশিক্ষণ ও কর্মসংস্থান</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <div className="space-y-1 mt-2.5 pt-2 border-t border-slate-100 dark:border-[#282828]">
                        <Link
                          href="/it-park#about"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Laptop className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">IT Park সম্পর্কে</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">ভিশন ও প্রযুক্তি অবকাঠামো</div>
                          </div>
                        </Link>

                        <Link
                          href="/it-park#skills"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Lightbulb className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">প্রযুক্তি দক্ষতা ও কোর্স</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">প্রোগ্রামিং, ফ্রিল্যান্সিং ও ক্যারিয়ার ট্রেনিং</div>
                          </div>
                        </Link>

                        <Link
                          href="/it-park#jobs"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">ক্যারিয়ার ও চাকরি</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">আইটি ও ডিজিটাল কর্মসংস্থানের সুযোগ</div>
                          </div>
                        </Link>

                        <Link
                          href="/it-park#events"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">আইটি ইভেন্টসমূহ</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">সেমিনার, হ্যাকাথন ও টেক কর্মশালা</div>
                          </div>
                        </Link>

                        <Link
                          href="/it-park#guardian"
                          className="flex items-start gap-3 p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Shield className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">অভিভাবক গাইড</div>
                            <div className="text-[11.5px] text-slate-500 dark:text-slate-400">নতুন প্রজন্মের প্রযুক্তিগত ভবিষ্যৎ ও নিরাপত্তা</div>
                          </div>
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* Family Tree */}
              <Link
                href="/family-tree"
                className={navItemClass(isSectionActive("/family-tree") || isSectionActive("/descendant"))}
              >
                <Users className="w-3.5 h-3.5 opacity-70" />
                <span>ফ্যামিলি ট্রি</span>
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                className={navItemClass(isSectionActive("/about"))}
              >
                <Info className="w-3.5 h-3.5 opacity-70" />
                <span>আমাদের সম্পর্কে</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={navItemClass(isSectionActive("/contact"))}
              >
                <Phone className="w-3.5 h-3.5 opacity-70" />
                <span>যোগাযোগ</span>
              </Link>
            </nav>

            {/* Right Side: ThemeSwitcher + Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
              
              {/* ThemeSwitcher */}
              <ThemeSwitcher />

              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
              >
                <MenuIcon className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Ant Design Style Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative z-10 w-[310px] sm:w-[350px] max-w-[85vw] h-full bg-white dark:bg-[#141414] border-l border-slate-200 dark:border-[#303030] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-slate-100 dark:border-[#222]">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 shadow-sm flex items-center justify-center">
                  <span className="text-white font-bold text-sm select-none">
                    B
                  </span>
                </div>
                <div className="text-center flex flex-col justify-center">
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">BASAR Group</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Learn. Earn. Empower.
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
              
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Home className="w-4 h-4 opacity-75" />
                <span>হোম</span>
              </Link>

              {/* Library Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("library")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 opacity-75" />
                    <span>লাইব্রেরি</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.library ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.library && (
                  <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/granthagar"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      লাইব্রেরি হোম ভিজিট করুন
                    </Link>
                    <Link
                      href="/granthagar/books-catalog"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      বই ক্যাটালগ
                    </Link>
                    <Link
                      href="/granthagar/request-book"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      বই অনুরোধ
                    </Link>
                    <Link
                      href="/granthagar/reading-tracker"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      আমার পাঠ ট্র্যাকার
                    </Link>
                    <Link
                      href="/granthagar/donors"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      দাতা তালিকা
                    </Link>
                    <Link
                      href="/granthagar/events"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      ইভেন্টসমূহ
                    </Link>
                    <Link
                      href="/granthagar/membership"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      সদস্যপদ
                    </Link>
                  </div>
                )}
              </div>

              {/* Foundation Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("foundation")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 opacity-75" />
                    <span>ফাউন্ডেশন</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.foundation ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.foundation && (
                  <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/foundation"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      ফাউন্ডেশন হোম ভিজিট করুন
                    </Link>
                    <Link
                      href="/foundation#about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      ফাউন্ডেশন সম্পর্কে
                    </Link>
                    <Link
                      href="/foundation#programs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      কল্যাণমূলক প্রোগ্রাম
                    </Link>
                    <Link
                      href="/foundation#impact"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      সামাজিক প্রভাব
                    </Link>
                    <Link
                      href="/foundation#contact"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      অনুপ্রেরণার গল্প
                    </Link>
                  </div>
                )}
              </div>

              {/* Super Shop Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("shop")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 opacity-75" />
                    <span>সুপার শপ</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.shop ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.shop && (
                  <div className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/super-shop"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      সুপার শপ হোম ভিজিট করুন
                    </Link>
                    <Link
                      href="/super-shop/shop"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      শপ ব্রাউজ করুন
                    </Link>

                    {/* Quick Category Chips for Mobile (no complex 3rd-level submenu nesting!) */}
                    <div className="py-1">
                      <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        জনপ্রিয় বিভাগসমূহ:
                      </div>
                      <div className="grid grid-cols-2 gap-1 px-2 pt-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.key}
                            href={cat.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-2.5 py-1.5 text-[12px] rounded-lg bg-slate-50 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/50 transition-colors truncate"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/super-shop/rewards"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      পুরস্কার ও অফার
                    </Link>
                    <Link
                      href="/super-shop/cart"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      আমার কার্ট
                    </Link>
                    <Link
                      href="/super-shop/about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      শপ সম্পর্কে
                    </Link>
                  </div>
                )}
              </div>

              {/* IT Park Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("itpark")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Laptop className="w-4 h-4 opacity-75" />
                    <span>আইটি পার্ক</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.itpark ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.itpark && (
                  <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/it-park"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      IT Park হোম ভিজিট করুন
                    </Link>
                    <Link
                      href="/it-park#about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      IT Park সম্পর্কে
                    </Link>
                    <Link
                      href="/it-park#skills"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      প্রযুক্তি দক্ষতা
                    </Link>
                    <Link
                      href="/it-park#jobs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      ক্যারিয়ার ও চাকরি
                    </Link>
                    <Link
                      href="/it-park#events"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      আইটি ইভেন্টসমূহ
                    </Link>
                    <Link
                      href="/it-park#guardian"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      অভিভাবক গাইড
                    </Link>
                  </div>
                )}
              </div>

              {/* Family Tree */}
              <Link
                href="/family-tree"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  isSectionActive("/family-tree") || isSectionActive("/descendant")
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Users className="w-4 h-4 opacity-75" />
                <span>ফ্যামিলি ট্রি</span>
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  isSectionActive("/about")
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Info className="w-4 h-4 opacity-75" />
                <span>আমাদের সম্পর্কে</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-colors ${
                  isSectionActive("/contact")
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Phone className="w-4 h-4 opacity-75" />
                <span>যোগাযোগ</span>
              </Link>

            </div>

            {/* Drawer Footer with Theme Switcher */}
            <div className="p-4 border-t border-slate-100 dark:border-[#222] bg-slate-50/50 dark:bg-[#181818]/60 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  থিম পরিবর্তন করুন
                </span>
                <ThemeSwitcher showLabel={true} />
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
