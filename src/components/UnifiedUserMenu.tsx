"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  User,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ShoppingBag,
  Heart,
  ChevronRight,
  Crown,
  Home,
  BookOpen,
  Building2,
  Laptop,
  Store,
  GitPullRequestDraft,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UnifiedUserMenuProps {
  /** 'sm' = compact styling, 'default' = standard styling */
  variant?: "sm" | "default";
  /** 'button' = "লগিন" styled button when logged out, 'icon' = circular icon button */
  loggedOutVariant?: "button" | "icon";
  className?: string;
}

const SITE_LINKS = [
  { label: "মূল ওয়েবসাইট", href: "/", icon: Home, color: "text-slate-600 dark:text-slate-300" },
  { label: "Super Shop", href: "/super-shop", icon: Store, color: "text-purple-600 dark:text-purple-400" },
  { label: "গ্রন্থাগার", href: "/granthagar", icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
  { label: "ফাউন্ডেশন", href: "/foundation", icon: Building2, color: "text-rose-600 dark:text-rose-400" },
  { label: "IT Park", href: "/it-park", icon: Laptop, color: "text-sky-600 dark:text-sky-400" },
];

const ACCOUNT_LINKS = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: LayoutDashboard },
  { label: "আমার অর্ডার", href: "/dashboard/shop/orders", icon: ShoppingBag },
  { label: "প্রোফাইল সেটিংস", href: "/dashboard/profile", icon: User },
  { label: "Wishlist", href: "/super-shop/wishlist", icon: Heart },
  { label: "আমার রিকোয়েস্ট", href: "/dashboard/requests", icon: GitPullRequestDraft },
];

export default function UnifiedUserMenu({
  variant = "default",
  loggedOutVariant,
  className,
}: UnifiedUserMenuProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Auto-determine loggedOutVariant if not explicitly passed
  const effectiveLoggedOutVariant = loggedOutVariant ?? (variant === "sm" ? "button" : "icon");

  // Close on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Loading state
  if (status === "loading") {
    return (
      <div
        className={cn(
          "size-9 rounded-full bg-slate-200/70 dark:bg-[#262626] animate-pulse shrink-0",
          className
        )}
      />
    );
  }

  // Not logged in
  if (!session?.user) {
    if (effectiveLoggedOutVariant === "button") {
      return (
        <Link
          href="/login"
          className={cn(
            "flex items-center justify-center h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold transition-all shadow-sm active:scale-[0.98] shrink-0",
            className
          )}
        >
          লগিন
        </Link>
      );
    }

    return (
      <Link
        href="/login"
        className={cn(
          "inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] shrink-0",
          className
        )}
        aria-label="লগিন করুন"
      >
        <User className="size-4" />
      </Link>
    );
  }

  const { name, fullname, email, image, role } = session.user;
  const displayName = name || fullname || "User";
  const isAdmin = role === "ADMIN" || role === "admin";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <div ref={ref} className={cn("relative shrink-0", className)}>
      {/* Trigger Button - Matches other icon buttons (search, cart) with active green dot */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group relative inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500 bg-white dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] focus:outline-none"
        aria-label="অ্যাকাউন্ট মেনু"
        aria-expanded={open}
      >
        {image && !imgError ? (
          <img
            src={image}
            alt={displayName}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="size-full rounded-full object-cover p-0.5"
          />
        ) : (
          <User className="size-4 text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        )}
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 bg-emerald-500 border-2 border-white dark:border-[#141414] rounded-full" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-slate-200/80 dark:border-[#2f2f2f] shadow-[0_20px_50px_rgba(0,0,0,0.14)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55)] z-[100] animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
          
          {/* ── User Header ─────────────────────────── */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-slate-50/80 dark:bg-[#141414] border-b border-slate-100 dark:border-[#262626]">
            <Avatar className="size-11 border border-slate-200 dark:border-[#303030] shrink-0">
              <AvatarImage src={image ?? ""} alt={displayName} referrerPolicy="no-referrer" />
              <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/60 dark:to-indigo-950/60 text-blue-700 dark:text-blue-300 text-sm font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {displayName}
                </p>
                {isAdmin ? (
                  <ShieldCheck className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Crown className="size-3.5 shrink-0 text-amber-500 fill-amber-500" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{email}</p>
              <div className="mt-1">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide",
                    isAdmin
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40"
                      : "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40"
                  )}
                >
                  {isAdmin ? "SUPER ADMIN" : "ROYAL MEMBER"}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2 px-1.5 space-y-0.5 max-h-[70vh] overflow-y-auto">

            {/* ── BASAR Group সাইটসমূহ ──────────────────── */}
            <div className="px-2.5 pt-1.5 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                BASAR Group সাইটসমূহ
              </p>
            </div>
            {SITE_LINKS.map(({ label, href, icon: Icon, color }) => {
              const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-blue-50/80 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                >
                  <div className="size-6 rounded-lg bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 transition-colors">
                    <Icon className={cn("size-3.5", color)} />
                  </div>
                  <span className="flex-1">{label}</span>
                  {isActive && (
                    <span className="size-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mr-1" />
                  )}
                  <ChevronRight className="size-3 opacity-30 group-hover:opacity-70 transition-opacity" />
                </Link>
              );
            })}

            <div className="h-px bg-slate-100 dark:bg-[#262626] my-1.5 mx-2" />

            {/* ── আমার অ্যাকাউন্ট ──────────────────────────── */}
            <div className="px-2.5 pt-1 pb-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                আমার অ্যাকাউন্ট
              </p>
            </div>
            {ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-[13px] font-medium transition-colors group",
                    isActive
                      ? "bg-blue-50/80 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                      : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400"
                  )}
                >
                  <div className="size-6 rounded-lg bg-slate-100 dark:bg-[#262626] flex items-center justify-center shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 transition-colors">
                    <Icon className="size-3.5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="size-3 opacity-30 group-hover:opacity-70 transition-opacity" />
                </Link>
              );
            })}

            {/* ── Admin Section ────────────────────────────── */}
            {isAdmin && (
              <>
                <div className="h-px bg-slate-100 dark:bg-[#262626] my-1.5 mx-2" />
                <div className="px-2.5 pt-1 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                    অ্যাডমিন প্যানেল
                  </p>
                </div>
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <div className="size-6 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-3.5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="flex-1">Admin Dashboard</span>
                  <ChevronRight className="size-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/admin/family-tree"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                >
                  <div className="size-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0">
                    <Users className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="flex-1">ফ্যামিলি ট্রি ম্যানেজমেন্ট</span>
                  <ChevronRight className="size-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                </Link>
              </>
            )}
          </div>

          {/* ── Sign Out ─────────────────────────────── */}
          <div className="border-t border-slate-100 dark:border-[#262626] p-1.5 bg-slate-50/50 dark:bg-[#161616]">
            <button
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors group cursor-pointer"
            >
              <div className="size-6 rounded-lg bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center shrink-0">
                <LogOut className="size-3.5 text-rose-600 dark:text-rose-400" />
              </div>
              <span className="font-semibold">লগ আউট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
