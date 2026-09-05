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
  ChevronRight,
  ExternalLink,
  Book,
  FileText,
  Bookmark,
  User,
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

// Category definitions matching AntD structure
const categories = [
  { key: "vegetables", label: "Vegetables", icon: Leaf, href: "/super-shop/shop?category=vegetables" },
  { key: "fruits", label: "Fruits", icon: Apple, href: "/super-shop/shop?category=fruits" },
  { key: "dairy", label: "Dairy", icon: Package, href: "/super-shop/shop?category=dairy" },
  { key: "meat-fish", label: "Meat & Fish", icon: Fish, href: "/super-shop/shop?category=meat-fish" },
  { key: "rice-grains", label: "Rice & Grains", icon: Wheat, href: "/super-shop/shop?category=rice-grains" },
  { key: "snacks", label: "Snacks", icon: Cookie, href: "/super-shop/shop?category=snacks" },
  { key: "beverages", label: "Beverages", icon: Coffee, href: "/super-shop/shop?category=beverages" },
  { key: "personal-care", label: "Personal Care", icon: Sparkles, href: "/super-shop/shop?category=personal-care" },
  { key: "household", label: "Household", icon: Home, href: "/super-shop/shop?category=household" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverCategory, setHoverCategory] = useState(false);
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
    setHoverCategory(false);
  }, [pathname]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown-container")) {
        setActiveDropdown(null);
        setHoverCategory(false);
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

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoverCategory(false);
    }, 180);
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

  return (
    <>
      {/* Desktop & Mobile Top Header (Ant Design Style) */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Logo Brand */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0 focus:outline-none"
            >
              <div className="relative h-10 w-10 rounded-xl bg-white dark:bg-[#1e1e1e] shadow-sm border border-slate-200 dark:border-[#333] flex items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:shadow transition-all duration-300">
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

              <div className="leading-tight">
                <div className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  BASAR Group
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                  Learn. Earn. Empower.
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Menu (Ant Design Horizontal Style) */}
            <nav className="hidden lg:flex items-center justify-end flex-1 gap-1 xl:gap-2 nav-dropdown-container">
              
              {/* Home */}
              <Link
                href="/"
                className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 ${
                  pathname === "/"
                    ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Home className="w-4 h-4 opacity-75" />
                <span>Home</span>
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
                  className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                    isSectionActive("/granthagar")
                      ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <BookOpen className="w-4 h-4 opacity-75" />
                  <span>Library</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "library" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "library" && (
                  <div className="absolute top-full left-0 mt-1 w-60 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.45)] py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <Link
                      href="/granthagar"
                      className="flex items-center gap-2.5 px-3.5 py-2 mx-1.5 rounded-md text-[13px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Library Home</span>
                    </Link>

                    <div className="my-1.5 border-t border-slate-100 dark:border-[#2a2a2a]" />

                    <Link
                      href="/granthagar/books-catalog"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Book className="w-4 h-4 opacity-75" />
                      <span>Books</span>
                    </Link>
                    <Link
                      href="/granthagar/request-book"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <FileText className="w-4 h-4 opacity-75" />
                      <span>Request Book</span>
                    </Link>
                    <Link
                      href="/granthagar/reading-tracker"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 opacity-75" />
                      <span>My Reading</span>
                    </Link>
                    <Link
                      href="/granthagar/donors"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4 opacity-75" />
                      <span>Donors</span>
                    </Link>
                    <Link
                      href="/granthagar/events"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Calendar className="w-4 h-4 opacity-75" />
                      <span>Events</span>
                    </Link>
                    <Link
                      href="/granthagar/membership"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <CreditCard className="w-4 h-4 opacity-75" />
                      <span>Membership</span>
                    </Link>
                    <Link
                      href="/granthagar/book-detail"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Search className="w-4 h-4 opacity-75" />
                      <span>Book Details</span>
                    </Link>
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
                  className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                    isSectionActive("/foundation")
                      ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <Building2 className="w-4 h-4 opacity-75" />
                  <span>Foundation</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "foundation" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "foundation" && (
                  <div className="absolute top-full left-0 mt-1 w-60 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.45)] py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <Link
                      href="/foundation"
                      className="flex items-center gap-2.5 px-3.5 py-2 mx-1.5 rounded-md text-[13px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/40 hover:bg-rose-100/70 dark:hover:bg-rose-900/40 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Foundation Home</span>
                    </Link>

                    <div className="my-1.5 border-t border-slate-100 dark:border-[#2a2a2a]" />

                    <Link
                      href="/foundation#about"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Building2 className="w-4 h-4 opacity-75" />
                      <span>About Foundation</span>
                    </Link>
                    <Link
                      href="/foundation#programs"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Target className="w-4 h-4 opacity-75" />
                      <span>Programs</span>
                    </Link>
                    <Link
                      href="/foundation#impact"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <TrendingUp className="w-4 h-4 opacity-75" />
                      <span>Impact</span>
                    </Link>
                    <Link
                      href="/foundation#contact"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Heart className="w-4 h-4 opacity-75" />
                      <span>Stories</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Super Shop (Dropdown with nested Categories) */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("shop")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "shop" ? null : "shop")}
                  className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                    isSectionActive("/super-shop")
                      ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 opacity-75" />
                  <span>Super Shop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "shop" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "shop" && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.45)] py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <Link
                      href="/super-shop"
                      className="flex items-center gap-2.5 px-3.5 py-2 mx-1.5 rounded-md text-[13px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50/70 dark:bg-purple-950/40 hover:bg-purple-100/70 dark:hover:bg-purple-900/40 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Super Shop Home</span>
                    </Link>

                    <div className="my-1.5 border-t border-slate-100 dark:border-[#2a2a2a]" />

                    <Link
                      href="/super-shop/shop"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 opacity-75" />
                      <span>Shop</span>
                    </Link>

                    {/* Nested Categories submenu (AntD style cascade) */}
                    <div
                      className="relative"
                      onMouseEnter={() => setHoverCategory(true)}
                      onMouseLeave={() => setHoverCategory(false)}
                    >
                      <div className="flex items-center justify-between px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2.5">
                          <LayoutGrid className="w-4 h-4 opacity-75" />
                          <span>Categories</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>

                      {hoverCategory && (
                        <div className="absolute top-0 left-full ml-1 w-56 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.45)] py-1.5 z-50">
                          <Link
                            href="/super-shop/categories"
                            className="flex items-center gap-2 px-3 py-1.5 text-[12.5px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                          >
                            <LayoutGrid className="w-3.5 h-3.5" />
                            <span>All Categories</span>
                          </Link>
                          <div className="my-1 border-t border-slate-100 dark:border-[#2a2a2a]" />
                          {categories.map((cat) => {
                            const IconComponent = cat.icon;
                            return (
                              <Link
                                key={cat.key}
                                href={cat.href}
                                className="flex items-center gap-2.5 px-3 py-1.5 text-[12.5px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                              >
                                <IconComponent className="w-3.5 h-3.5 opacity-70" />
                                <span>{cat.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <Link
                      href="/super-shop/rewards"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Trophy className="w-4 h-4 opacity-75" />
                      <span>Rewards</span>
                    </Link>
                    <Link
                      href="/super-shop/about"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Store className="w-4 h-4 opacity-75" />
                      <span>About Shop</span>
                    </Link>
                    <Link
                      href="/super-shop/cart"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 opacity-75" />
                      <span>Cart</span>
                    </Link>
                    <Link
                      href="/super-shop/contact"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 opacity-75" />
                      <span>Contact</span>
                    </Link>
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
                  className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 cursor-pointer ${
                    isSectionActive("/it-park")
                      ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <Laptop className="w-4 h-4 opacity-75" />
                  <span>IT Park</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === "itpark" ? "rotate-180 text-blue-600 dark:text-blue-400" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "itpark" && (
                  <div className="absolute top-full left-0 mt-1 w-60 rounded-lg bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.45)] py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                    <Link
                      href="/it-park"
                      className="flex items-center gap-2.5 px-3.5 py-2 mx-1.5 rounded-md text-[13px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50/70 dark:bg-sky-950/40 hover:bg-sky-100/70 dark:hover:bg-sky-900/40 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit IT Park Home</span>
                    </Link>

                    <div className="my-1.5 border-t border-slate-100 dark:border-[#2a2a2a]" />

                    <Link
                      href="/it-park#about"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Laptop className="w-4 h-4 opacity-75" />
                      <span>About IT Park</span>
                    </Link>
                    <Link
                      href="/it-park#skills"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4 opacity-75" />
                      <span>Skills</span>
                    </Link>
                    <Link
                      href="/it-park#jobs"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 opacity-75" />
                      <span>Jobs</span>
                    </Link>
                    <Link
                      href="/it-park#events"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Calendar className="w-4 h-4 opacity-75" />
                      <span>Events</span>
                    </Link>
                    <Link
                      href="/it-park#guardian"
                      className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <Shield className="w-4 h-4 opacity-75" />
                      <span>Guardian</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Family Tree */}
              <Link
                href="/family-tree"
                className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 ${
                  isSectionActive("/family-tree") || isSectionActive("/descendant")
                    ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <User className="w-4 h-4 opacity-75" />
                <span>Family Tree</span>
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 ${
                  isSectionActive("/about")
                    ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Info className="w-4 h-4 opacity-75" />
                <span>About</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`relative px-3 py-2 text-[14px] font-normal rounded-md flex items-center gap-1.5 transition-colors duration-150 ${
                  isSectionActive("/contact")
                    ? "text-blue-600 dark:text-blue-400 font-medium after:absolute after:bottom-[-13px] after:left-2 after:right-2 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 after:rounded-full"
                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Phone className="w-4 h-4 opacity-75" />
                <span>Contact</span>
              </Link>
            </nav>

            {/* Right Side: ThemeSwitcher + Mobile Menu Button */}
            <div className="flex items-center gap-2.5 shrink-0">
              
              {/* AntD-style ThemeSwitcher */}
              <ThemeSwitcher />

              {/* Mobile Drawer Trigger (AntD style button) */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none cursor-pointer"
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
          <div className="relative z-10 w-[300px] sm:w-[340px] max-w-[85vw] h-full bg-white dark:bg-[#141414] border-l border-slate-200 dark:border-[#303030] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 dark:border-[#2a2a2a] shrink-0">
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
                <div>
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
                className="h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Ant Design Inline Menu style) */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <Home className="w-4 h-4 opacity-75" />
                <span>Home</span>
              </Link>

              {/* Library Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("library")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 opacity-75" />
                    <span>Library</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.library ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.library && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/granthagar"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit Library Home
                    </Link>
                    <Link
                      href="/granthagar/books-catalog"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Books
                    </Link>
                    <Link
                      href="/granthagar/request-book"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Request Book
                    </Link>
                    <Link
                      href="/granthagar/reading-tracker"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      My Reading
                    </Link>
                    <Link
                      href="/granthagar/donors"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Donors
                    </Link>
                    <Link
                      href="/granthagar/events"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Events
                    </Link>
                    <Link
                      href="/granthagar/membership"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Membership
                    </Link>
                  </div>
                )}
              </div>

              {/* Foundation Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("foundation")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 opacity-75" />
                    <span>Foundation</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.foundation ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.foundation && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/foundation"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      Visit Foundation Home
                    </Link>
                    <Link
                      href="/foundation#about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      About Foundation
                    </Link>
                    <Link
                      href="/foundation#programs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Programs
                    </Link>
                    <Link
                      href="/foundation#impact"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Impact
                    </Link>
                    <Link
                      href="/foundation#contact"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Stories
                    </Link>
                  </div>
                )}
              </div>

              {/* Super Shop Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("shop")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 opacity-75" />
                    <span>Super Shop</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.shop ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.shop && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/super-shop"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Visit Super Shop Home
                    </Link>
                    <Link
                      href="/super-shop/shop"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Shop
                    </Link>

                    {/* Nested Categories in Mobile */}
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu("categories")}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600 cursor-pointer"
                      >
                        <span>Categories</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                            mobileExpanded.categories ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {mobileExpanded.categories && (
                        <div className="pl-4 py-1 space-y-1">
                          <Link
                            href="/super-shop/categories"
                            onClick={() => setMobileOpen(false)}
                            className="block px-2 py-1 text-xs text-blue-600 font-medium"
                          >
                            All Categories
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.key}
                              href={cat.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href="/super-shop/rewards"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Rewards
                    </Link>
                    <Link
                      href="/super-shop/cart"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Cart
                    </Link>
                    <Link
                      href="/super-shop/about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      About Shop
                    </Link>
                  </div>
                )}
              </div>

              {/* IT Park Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleMobileSubmenu("itpark")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Laptop className="w-4 h-4 opacity-75" />
                    <span>IT Park</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileExpanded.itpark ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {mobileExpanded.itpark && (
                  <div className="pl-6 pr-2 py-1 space-y-1 border-l-2 border-slate-100 dark:border-[#2a2a2a] ml-4 my-1">
                    <Link
                      href="/it-park"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      Visit IT Park Home
                    </Link>
                    <Link
                      href="/it-park#about"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      About IT Park
                    </Link>
                    <Link
                      href="/it-park#skills"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Skills
                    </Link>
                    <Link
                      href="/it-park#jobs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Jobs
                    </Link>
                    <Link
                      href="/it-park#events"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300 hover:text-blue-600"
                    >
                      Events
                    </Link>
                  </div>
                )}
              </div>

              {/* Family Tree */}
              <Link
                href="/family-tree"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                <User className="w-4 h-4 opacity-75" />
                <span>Family Tree</span>
              </Link>

              {/* About Us */}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                <Info className="w-4 h-4 opacity-75" />
                <span>About Us</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4 opacity-75" />
                <span>Contact</span>
              </Link>

            </div>

            {/* Drawer Footer with Theme Switcher */}
            <div className="p-4 border-t border-slate-100 dark:border-[#2a2a2a] bg-slate-50/50 dark:bg-[#181818]/60 shrink-0">
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
