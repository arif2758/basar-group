"use client";

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

  return (
    <div className="w-full bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-1.5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
      <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
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
    </div>
  );
}
