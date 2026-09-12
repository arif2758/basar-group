// src/app/admin/library/LibraryAdminClient.tsx
"use client";

import React, { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
  Copy,
  Check,
  MapPin,
  ChevronDown,
  Loader2,
  ArrowLeft,
  BookMarked,
  AlertTriangle,
  RefreshCw,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────

type BorrowStatus =
  | "pending"
  | "approved"
  | "accepted"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "in_return"
  | "returned"
  | "overdue"
  | "cancelled";

interface IBorrowItem {
  bookId: string;
  productId?: string;
  title: string;
  author: string;
  thumbnail: string;
  quantity: number;
}

interface IBorrowRecord {
  _id: string;
  borrowCode: string;
  user: {
    userId?: string;
    name?: string;
    phone?: string;
    email?: string;
  };
  items: IBorrowItem[];
  durationDays: number;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  deliveryMethod: string;
  deliveryFee: number;
  bookBorrowFee: number;
  totalAmount: number;
  shippingAddress: {
    recipientName: string;
    phone: string;
    altPhone?: string;
    villageOrArea: string;
    fullAddress: string;
    notes?: string;
  };
  status: BorrowStatus;
  createdAt: string;
}

interface LibraryAdminClientProps {
  initialBorrows: IBorrowRecord[];
  stats: {
    totalBorrows: number;
    pendingBorrows: number;
    activeBorrows: number;
    returnedBorrows: number;
  };
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: BorrowStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "in_return", label: "In-Return" },
  { value: "returned", label: "Returned" },
  { value: "overdue", label: "Overdue" },
  { value: "cancelled", label: "Cancelled" },
];

const TAB_FILTERS = [
  { id: "all", label: "সকল" },
  { id: "pending", label: "Pending" },
  { id: "accepted", label: "Accepted" },
  { id: "in_transit", label: "In Transit" },
  { id: "delivered", label: "Delivered" },
  { id: "in_return", label: "In-Return" },
  { id: "returned", label: "Returned" },
  { id: "cancelled", label: "Cancelled" },
  { id: "overdue", label: "Overdue" },
] as const;

type TabId = (typeof TAB_FILTERS)[number]["id"];

// ─── Badge helpers ───────────────────────────────────────────────────────────

function getStatusBadge(status: BorrowStatus) {
  const map: Record<BorrowStatus, { label: string; className: string }> = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
    },
    approved: {
      label: "Approved",
      className:
        "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40",
    },
    accepted: {
      label: "Accepted",
      className:
        "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40",
    },
    dispatched: {
      label: "Dispatched",
      className:
        "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/40",
    },
    in_transit: {
      label: "In Transit",
      className:
        "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/40",
    },
    delivered: {
      label: "Delivered",
      className:
        "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40",
    },
    in_return: {
      label: "In-Return",
      className:
        "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/40",
    },
    returned: {
      label: "Returned",
      className:
        "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40",
    },
    overdue: {
      label: "Overdue",
      className:
        "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/40",
    },
    cancelled: {
      label: "Cancelled",
      className:
        "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40",
    },
  };
  return map[status] ?? { label: status, className: "bg-slate-100 dark:bg-slate-800 text-slate-600 border-slate-200" };
}

function getDueDiff(expectedReturnDate: string, status: BorrowStatus) {
  if (status === "returned" || status === "cancelled") return null;
  const diff = Math.ceil(
    (new Date(expectedReturnDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

// ─── Inline Status Selector ───────────────────────────────────────────────────

function StatusSelector({
  borrowId,
  currentStatus,
  onUpdate,
}: {
  borrowId: string;
  currentStatus: BorrowStatus;
  onUpdate: (id: string, newStatus: BorrowStatus) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState<BorrowStatus>(currentStatus);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as BorrowStatus;
    const prevStatus = localStatus;
    setLocalStatus(newStatus); // optimistic

    startTransition(async () => {
      try {
        const res = await fetch(`/api/granthagar/borrow/${borrowId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        const data = await res.json();
        if (data.success) {
          onUpdate(borrowId, newStatus);
          toast.success(`স্ট্যাটাস "${newStatus}" করা হয়েছে।`);
        } else {
          setLocalStatus(prevStatus); // revert
          toast.error(data.error || "স্ট্যাটাস আপডেট করা যায়নি।");
        }
      } catch {
        setLocalStatus(prevStatus);
        toast.error("সার্ভার এরর। পুনরায় চেষ্টা করুন।");
      }
    });
  }

  const badge = getStatusBadge(localStatus);

  // Color dot per status
  const dotColor: Record<BorrowStatus, string> = {
    pending: "bg-amber-400",
    approved: "bg-blue-500",
    accepted: "bg-blue-500",
    dispatched: "bg-sky-500",
    in_transit: "bg-sky-500",
    delivered: "bg-emerald-500",
    in_return: "bg-purple-500",
    returned: "bg-emerald-600",
    overdue: "bg-red-500",
    cancelled: "bg-rose-500",
  };

  return (
    <div className="relative inline-flex items-center gap-1.5">
      {isPending && <Loader2 className="size-3 animate-spin text-slate-400 absolute -left-5" />}
      <div className="relative flex items-center">
        {/* Colored status dot */}
        <span
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 size-2 rounded-full pointer-events-none z-10",
            dotColor[localStatus]
          )}
        />
        <select
          value={localStatus}
          onChange={handleChange}
          disabled={isPending}
          className="appearance-none pl-6 pr-7 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-[#1677ff] disabled:opacity-60 bg-white dark:bg-[#262626] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-[#404040]"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 size-3 pointer-events-none text-slate-400" />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function LibraryAdminClient({
  initialBorrows,
  stats,
}: LibraryAdminClientProps) {
  const [borrows, setBorrows] = useState<IBorrowRecord[]>(initialBorrows);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  function handleStatusUpdate(id: string, newStatus: BorrowStatus) {
    setBorrows((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
    );
  }

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`"${code}" কপি করা হয়েছে`);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  // Live stats based on current borrows state
  const liveStats = useMemo(() => {
    const ACTIVE = ["approved", "accepted", "dispatched", "in_transit", "delivered", "in_return", "overdue"];
    return {
      total: borrows.length,
      pending: borrows.filter((b) => b.status === "pending").length,
      active: borrows.filter((b) => ACTIVE.includes(b.status)).length,
      returned: borrows.filter((b) => b.status === "returned").length,
    };
  }, [borrows]);

  const filteredBorrows = useMemo(() => {
    return borrows.filter((b) => {
      // Tab
      if (activeTab !== "all" && b.status !== activeTab) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.borrowCode.toLowerCase().includes(q) ||
          b.shippingAddress?.recipientName?.toLowerCase().includes(q) ||
          b.shippingAddress?.phone?.includes(q) ||
          b.user?.email?.toLowerCase().includes(q) ||
          b.items.some(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.author.toLowerCase().includes(q)
          )
        );
      }
      return true;
    });
  }, [borrows, activeTab, searchQuery]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
        {/* Left content — centered on mobile */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-1.5">
          <div className="flex items-center gap-2 self-start">
            <Link
              href="/admin"
              className="text-xs text-slate-500 hover:text-[#1677ff] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              অ্যাডমিন
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              গ্রন্থাগার
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
            <BookOpen className="size-3.5" />
            <span>বাছার গ্রন্থাগার — অ্যাডমিন কন্ট্রোল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            বই ধার ব্যবস্থাপনা
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            সকল বই ধারের আবেদন পর্যালোচনা করুন, স্ট্যাটাস আপডেট করুন এবং পাঠক তথ্য দেখুন।
          </p>
        </div>

        {/* Buttons — centered on mobile */}
        <div className="flex items-center justify-center md:justify-start gap-2 shrink-0">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors"
          >
            <RefreshCw className="size-3.5" />
            রিফ্রেশ
          </button>
          <Link
            href="/granthagar"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
          >
            <BookMarked className="size-3.5" />
            পাবলিক সাইট
          </Link>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "মোট আবেদন",
            value: liveStats.total,
            icon: BookOpen,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/40",
          },
          {
            label: "Pending",
            value: liveStats.pending,
            icon: Clock,
            color: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-950/40",
          },
          {
            label: "চলতি / Active",
            value: liveStats.active,
            icon: Truck,
            color: "text-sky-600 dark:text-sky-400",
            bg: "bg-sky-50 dark:bg-sky-950/40",
          },
          {
            label: "Returned",
            value: liveStats.returned,
            icon: CheckCircle2,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/40",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-colors"
            >
              <div className={cn("size-9 rounded-xl flex items-center justify-center mb-2", stat.bg)}>
                <Icon className={cn("size-5", stat.color)} />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── Search & Filter ── */}
      <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 dark:border-[#262626] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="BG-LIB-... / পাঠকের নাম / ফোন / বই খুঁজুন"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff] transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] px-3 py-2 rounded-xl">
            <Filter className="size-3.5" />
            <span>{filteredBorrows.length} রেকর্ড</span>
          </div>
        </div>

        {/* Status Tabs — horizontally scrollable */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-[#262626] px-4 py-2">
          {TAB_FILTERS.map((tab) => {
            const count =
              tab.id === "all"
                ? borrows.length
                : borrows.filter((b) => b.status === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-[#1677ff] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#262626]"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-[#262626] text-slate-600 dark:text-slate-300"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Records List */}
        {filteredBorrows.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 text-center px-4">
            <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] flex items-center justify-center">
              <BookOpen className="size-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                কোনো রেকর্ড পাওয়া যায়নি
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery
                  ? `"${searchQuery}" এর জন্য কোনো মিল নেই।`
                  : `এই ক্যাটাগরিতে কোনো আবেদন নেই।`}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#222] overflow-hidden rounded-b-2xl">
            {filteredBorrows.map((borrow) => {
              const statusBadge = getStatusBadge(borrow.status);
              const dueDiff = getDueDiff(borrow.expectedReturnDate, borrow.status);
              const isOverdue = dueDiff !== null && dueDiff < 0;

              return (
                <div
                  key={borrow._id}
                  className={cn(
                    "p-4 sm:p-5 transition-colors hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a]/50",
                    isOverdue && "border-l-2 border-red-400"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Left: Book thumbnails */}
                    <div className="flex gap-1.5 shrink-0">
                      {borrow.items.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="relative size-12 sm:size-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#333]"
                        >
                          <Image
                            src={item.thumbnail || "/placeholder-book.png"}
                            alt={item.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {borrow.items.length > 2 && (
                        <div className="size-12 sm:size-14 rounded-lg bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#333] flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-500">
                            +{borrow.items.length - 2}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Center: Main Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Code + Status + Due */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                          {borrow.borrowCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(borrow.borrowCode)}
                          className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                          {copiedCode === borrow.borrowCode ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>

                        {/* Inline Status Selector */}
                        <StatusSelector
                          borrowId={borrow._id}
                          currentStatus={borrow.status}
                          onUpdate={handleStatusUpdate}
                        />

                        {/* Overdue warning */}
                        {isOverdue && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="size-3" />
                            {Math.abs(dueDiff!)} দিন বেশি
                          </span>
                        )}
                        {dueDiff !== null && dueDiff >= 0 && dueDiff <= 2 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 px-2 py-0.5 rounded-full">
                            <Clock className="size-3" />
                            আর {dueDiff} দিন
                          </span>
                        )}
                      </div>

                      {/* Books */}
                      <div className="flex flex-col gap-0.5">
                        {borrow.items.map((item, idx) => (
                          <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 truncate">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-slate-400"> — {item.author}</span>
                            {item.quantity > 1 && (
                              <span className="text-slate-400"> ×{item.quantity}</span>
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Recipient + Dates */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3 shrink-0" />
                          {borrow.shippingAddress?.recipientName} · {borrow.shippingAddress?.phone}
                        </span>
                        <span>
                          আবেদন:{" "}
                          {format(new Date(borrow.borrowDate || borrow.createdAt), "dd MMM yyyy")}
                        </span>
                        <span className={cn(isOverdue ? "text-red-500 font-semibold" : "")}>
                          ফেরত:{" "}
                          {format(new Date(borrow.expectedReturnDate), "dd MMM yyyy")}
                        </span>
                        <span>
                          মেয়াদ: {borrow.durationDays} দিন
                        </span>
                        {borrow.deliveryMethod === "self_pickup" ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Self-Pickup
                          </span>
                        ) : (
                          <span>
                            ডেলিভারি: ৳{borrow.deliveryFee}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Amount */}
                    <div className="shrink-0 text-right">
                      <p className="text-xs text-slate-400">মোট</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        ৳{borrow.totalAmount}
                      </p>
                      {borrow.user?.email && (
                        <p className="text-[10px] text-slate-400 mt-1 max-w-[140px] truncate">
                          {borrow.user.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
