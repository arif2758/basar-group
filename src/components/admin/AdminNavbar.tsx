"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  BookOpen,
  Heart,
  ShoppingBag,
  Laptop,
  TreePine,
  Users,
  Home,
  ExternalLink,
  LogOut,
  Menu,
  ShieldAlert,
  ChevronRight,
  User,
} from "lucide-react";
import { Drawer } from "antd";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function AdminNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Admin Navigation Items:
  // 1. লাইব্রেরি, 2. ফাউন্ডেশন, 3. সুপার শপ, 4. আইটি পার্ক, 5. ফ্যামিলি ট্রি, 6. ইউজারস
  const adminNavItems = [
    {
      name: "লাইব্রেরি",
      href: "/admin/library",
      icon: BookOpen,
      active: pathname.startsWith("/admin/library"),
    },
    {
      name: "ফাউন্ডেশন",
      href: "/admin/foundation",
      icon: Heart,
      active: pathname.startsWith("/admin/foundation"),
    },
    {
      name: "সুপার শপ",
      href: "/admin/shop",
      icon: ShoppingBag,
      active: pathname.startsWith("/admin/shop") || pathname.startsWith("/super-shop/admin"),
    },
    {
      name: "আইটি পার্ক",
      href: "/admin/it-park",
      icon: Laptop,
      active: pathname.startsWith("/admin/it-park"),
    },
    {
      name: "ফ্যামিলি ট্রি",
      href: "/admin/family-tree",
      icon: TreePine,
      active: pathname.startsWith("/admin/family-tree"),
    },
    {
      name: "ইউজারস",
      href: "/admin/users",
      icon: Users,
      active: pathname.startsWith("/admin/users"),
    },
  ];

  const navItemClass = (isActive: boolean) =>
    `relative px-3 py-1.5 text-[13px] font-medium rounded-lg flex items-center gap-1.5 select-none cursor-pointer transition-all duration-150 admin-nav-item ${
      isActive
        ? "admin-nav-item-active"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-[#2a2a2a] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[56px] items-center justify-between gap-3">
            
            {/* Brand Logo & Admin Badge */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/admin"
                className="flex items-center gap-2.5 group focus:outline-none"
              >
                <div className="relative h-8 w-8 rounded-lg bg-white dark:bg-[#1e1e1e] shadow-xs border border-slate-200 dark:border-[#333] flex items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all duration-200">
                  <span
                    className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent font-black text-lg select-none"
                    style={{
                      fontFamily: "Inter, system-ui, sans-serif",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    B
                  </span>
                </div>

                <div className="leading-tight flex flex-col justify-center">
                  <div className="text-[13.5px] font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span>BASAR Group</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      অ্যাডমিন
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                    কন্ট্রোল সেন্টার
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={navItemClass(item.active)}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Link to public website */}
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 dark:border-[#303030] bg-slate-100 dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#282828] hover:text-slate-900 dark:hover:text-white admin-site-btn transition-colors"
                title="মূল ওয়েবসাইটে যান"
              >
                <Home className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>মূল সাইট</span>
              </Link>

              {/* Theme Switcher */}
              <ThemeSwitcher />

              {/* User / Admin Avatar & Info (Desktop) */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-[#333]">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs">
                  {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <div className="text-left leading-none hidden xl:block">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white max-w-[120px] truncate">
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                    Super Admin
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="লগআউট"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Hamburger Drawer Trigger */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] lg:hidden transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Ant Design) */}
      <Drawer
        title={
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">
                BASAR Group
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                অ্যাডমিন কন্ট্রোল
              </p>
            </div>
          </div>
        }
        placement="left"
        onClose={() => setMobileDrawerOpen(false)}
        open={mobileDrawerOpen}
        size={290}
        styles={{
          body: {
            padding: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <div className="space-y-6">
          {/* Admin User Card */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate text-slate-900 dark:text-white">
                  {session?.user?.name || "অ্যাডমিনিস্ট্রেটর"}
                </p>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                  SUPER ADMIN
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              ডিপার্টমেন্ট ও মডিউল
            </p>
            <nav className="space-y-1">
              <Link
                href="/admin"
                onClick={() => setMobileDrawerOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  pathname === "/admin"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1f1f]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4" />
                  <span>সেন্ট্রাল ওভারভিউ</span>
                </div>
                {pathname === "/admin" && <ChevronRight className="w-4 h-4 opacity-75" />}
              </Link>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      item.active
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1f1f1f]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.active && <ChevronRight className="w-4 h-4 opacity-75" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Public Navigation */}
          <div>
            <p className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              অন্যান্য লিংক
            </p>
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] transition-colors"
              >
                <span>ইউজার ড্যাশবোর্ড</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-50" />
              </Link>
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] transition-colors"
              >
                <span>মূল ওয়েবসাইট</span>
                <Home className="w-3.5 h-3.5 opacity-50" />
              </Link>
            </nav>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#303030] space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">থিম পরিবর্তন</span>
            <ThemeSwitcher />
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </Drawer>
    </>
  );
}
