// src/app/(main)/dashboard/library/LibraryDashboardClient.tsx
"use client";

import React, { useState, useMemo } from "react";
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
  Building,
  Calendar,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookMarked,
  Phone,
  MapPin,
  HelpCircle,
  PlusCircle,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface IBorrowItem {
  bookId: string;
  productId?: string;
  title: string;
  author: string;
  thumbnail: string;
  quantity: number;
}

export interface IBorrowRecord {
  _id: string;
  borrowCode: string;
  items: IBorrowItem[];
  durationDays: number;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  deliveryMethod: "self_pickup" | "standard_delivery" | "electric_bike" | "drone" | string;
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
  status:
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
  createdAt: string;
}

interface LibraryDashboardClientProps {
  initialBorrows: IBorrowRecord[];
  stats: {
    activeCount: number;
    returnedCount: number;
    pendingCount: number;
    membershipStatus: string;
  };
}

// 6-step English stepper as requested:
// Pending > Accepted > In Transit > Delivered > In-Return > Returned
const STEPPER_STAGES = [
  { id: "pending", label: "Pending", icon: Clock },
  { id: "accepted", label: "Accepted", icon: CheckCircle2 },
  { id: "in_transit", label: "In Transit", icon: Truck },
  { id: "delivered", label: "Delivered", icon: BookOpen },
  { id: "in_return", label: "In-Return", icon: RotateCcw },
  { id: "returned", label: "Returned", icon: CheckCircle2 },
];

function getStageIndex(status: string): number {
  switch (status) {
    case "pending":
      return 0;
    case "approved":
    case "accepted":
      return 1;
    case "dispatched":
    case "in_transit":
      return 2;
    case "delivered":
      return 3;
    case "in_return":
      return 4;
    case "returned":
      return 5;
    default:
      return 0;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        className:
          "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40",
      };
    case "approved":
    case "accepted":
      return {
        label: "Accepted",
        className:
          "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40",
      };
    case "dispatched":
    case "in_transit":
      return {
        label: "In Transit",
        className:
          "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900/40",
      };
    case "delivered":
      return {
        label: "Delivered",
        className:
          "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40",
      };
    case "in_return":
      return {
        label: "In-Return",
        className:
          "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40",
      };
    case "returned":
      return {
        label: "Returned",
        className:
          "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40",
      };
    case "cancelled":
      return {
        label: "Cancelled",
        className:
          "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40",
      };
    case "overdue":
      return {
        label: "Overdue",
        className:
          "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40",
      };
    default:
      return {
        label: status.toUpperCase(),
        className:
          "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
      };
  }
}

function getDueDateBadge(expectedReturnDate: string, status: string) {
  if (status === "returned") {
    return {
      text: "বই ফেরত সম্পন্ন",
      badgeClass:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40",
    };
  }
  if (status === "cancelled") {
    return {
      text: "আবেদন বাতিল",
      badgeClass:
        "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40",
    };
  }

  const now = new Date();
  const due = new Date(expectedReturnDate);
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      text: `মেয়াদ শেষ (${Math.abs(diffDays)} দিন পার)`,
      badgeClass:
        "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40 animate-pulse font-semibold",
    };
  }
  if (diffDays === 0) {
    return {
      text: "আজই ফেরত দেওয়ার শেষ দিন!",
      badgeClass:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 font-bold",
    };
  }
  return {
    text: `আর ${diffDays} দিন বাকি`,
    badgeClass:
      "bg-blue-50 text-[#1677ff] dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/40 font-medium",
  };
}

export default function LibraryDashboardClient({
  initialBorrows,
  stats,
}: LibraryDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "pending" | "returned">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`অর্ডার আইডি "${code}" কপি হয়েছে`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filter borrows by tab and search
  const filteredBorrows = useMemo(() => {
    return initialBorrows.filter((borrow) => {
      // Tab filter
      if (activeTab === "active") {
        const isActiveStatus = [
          "approved",
          "accepted",
          "dispatched",
          "in_transit",
          "delivered",
          "in_return",
          "overdue",
        ].includes(borrow.status);
        if (!isActiveStatus) return false;
      } else if (activeTab === "pending") {
        if (borrow.status !== "pending") return false;
      } else if (activeTab === "returned") {
        if (borrow.status !== "returned") return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = borrow.borrowCode.toLowerCase().includes(q);
        const matchesPhone =
          borrow.shippingAddress?.phone?.includes(q) ||
          borrow.shippingAddress?.recipientName?.toLowerCase().includes(q);
        const matchesBook = borrow.items.some(
          (item) =>
            item.title.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
        );
        return matchesCode || matchesPhone || matchesBook;
      }

      return true;
    });
  }, [initialBorrows, activeTab, searchQuery]);

  return (
    <div className="w-full space-y-6 pb-12 transition-colors">
      {/* ── Top Header Banner ────────────────────────────────────────── */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
            <BookOpen className="size-3.5" />
            <span>ডিপার্টমেন্ট #১ — বাছার গ্রন্থাগার</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            গ্রন্থাগার ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            ধার নেওয়া বইয়ের লাইভ ট্র্যাকিং, জমা দেওয়ার শেষ তারিখ এবং লাইব্রেরি সার্ভিস পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/granthagar/books"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-[#262626] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors whitespace-nowrap"
          >
            <Search className="size-3.5 sm:size-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>বই ব্রাউজ করুন</span>
          </Link>
          <Link
            href="/granthagar/request-book"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs whitespace-nowrap"
          >
            <PlusCircle className="size-3.5 sm:size-4 shrink-0" />
            <span>নতুন বইয়ের রিকোয়েস্ট</span>
          </Link>
        </div>
      </div>

      {/* ── Stats Overview ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Active Borrows */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <BookOpen className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.activeCount}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            বর্তমানে ধার নেওয়া
          </p>
        </div>

        {/* Finished / Returned */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.returnedCount}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            পড়া শেষ / ফেরত সম্পন্ন
          </p>
        </div>

        {/* Pending Requests */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Clock className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.pendingCount}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            পেন্ডিং অনুমোদন
          </p>
        </div>

        {/* Membership Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <BookMarked className="size-5" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
            {stats.membershipStatus}
          </p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            মেম্বারশিপ স্ট্যাটাস
          </p>
        </div>
      </div>

      {/* ── Search & Filter Tabs Section ─────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-[#262626] rounded-xl border border-slate-200 dark:border-[#303030] overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "all"
                  ? "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              সকল আবেদন ({initialBorrows.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("active")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "active"
                  ? "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              পড়ারত / চলতি ({stats.activeCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "pending"
                  ? "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              পেন্ডিং ({stats.pendingCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("returned")}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                activeTab === "returned"
                  ? "bg-white dark:bg-[#1f1f1f] text-[#1677ff] dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              ফেরত সম্পন্ন ({stats.returnedCount})
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="আইডি (BG-LIB-...) বা বই খুঁজুন"
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff] transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
            />
          </div>
        </div>

        {/* ── Borrow Records List ────────────────────────────────────── */}
        {filteredBorrows.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4">
            <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] dark:text-blue-400 flex items-center justify-center mx-auto">
              <BookOpen className="size-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                কোনো বই ধার নেওয়ার রেকর্ড পাওয়া যায়নি
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {searchQuery
                  ? `"${searchQuery}" এর সাথে মিলে এমন কোনো বই বা ট্র্যাকিং কোড পাওয়া যায়নি।`
                  : activeTab === "active"
                  ? "বর্তমানে আপনার হাতে কোনো সক্রিয় ধার নেওয়া বই নেই।"
                  : "আমাদের সমৃদ্ধ লাইব্রেরি ক্যাটালগ থেকে যেকোনো ইসলামিক, সাহিত্য বা শিক্ষামূলক বই অনলাইনে অর্ডার করে সংগ্রহ করতে পারেন।"}
              </p>
            </div>
            <Link
              href="/granthagar/books"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
            >
              <BookOpen className="size-4" />
              <span>বই ক্যাটালগ ব্রাউজ করুন</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredBorrows.map((borrow) => {
              const currentStepIndex = getStageIndex(borrow.status);
              const isCancelled = borrow.status === "cancelled";
              const isOverdue = borrow.status === "overdue";
              const statusBadge = getStatusBadge(borrow.status);
              const dueBadge = getDueDateBadge(borrow.expectedReturnDate, borrow.status);

              return (
                <div
                  key={borrow._id}
                  className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden transition-colors"
                >
                  {/* Card Header Top */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#1a1a1a]/50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 shadow-xs">
                        <BookOpen className="size-5 text-[#1677ff]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono">
                            {borrow.borrowCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(borrow.borrowCode)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#333] transition-colors cursor-pointer"
                            title="অর্ডার আইডি কপি করুন"
                          >
                            {copiedCode === borrow.borrowCode ? (
                              <Check className="size-3 text-emerald-600" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                          <span
                            className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                              statusBadge.className
                            )}
                          >
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>
                            আবেদনের তারিখ:{" "}
                            {format(new Date(borrow.borrowDate || borrow.createdAt), "dd MMM, yyyy")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          "text-xs px-2.5 py-1 rounded-lg border",
                          dueBadge.badgeClass
                        )}
                      >
                        {dueBadge.text}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        ফেরতের তারিখ: {format(new Date(borrow.expectedReturnDate), "dd MMM, yyyy")}
                      </span>
                    </div>
                  </div>

                  {/* Visual Stepper: Pending > Accepted > In Transit > Delivered > In-Return > Returned */}
                  {!isCancelled ? (
                    <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-[#262626]">
                      <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                        {/* Connecting background Line */}
                        <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 dark:bg-[#303030] z-0" />
                        {/* Connecting active Progress Line */}
                        <div
                          className="absolute left-4 top-4 h-0.5 bg-[#1677ff] transition-all duration-700 z-0"
                          style={{
                            width: `${Math.min(
                              100,
                              (currentStepIndex / (STEPPER_STAGES.length - 1)) * 92
                            )}%`,
                          }}
                        />

                        {STEPPER_STAGES.map((step, idx) => {
                          const isCompleted = idx <= currentStepIndex;
                          const isCurrent = idx === currentStepIndex;
                          const StepIcon = step.icon;

                          return (
                            <div
                              key={step.id}
                              className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2"
                            >
                              <div
                                className={cn(
                                  "size-7 sm:size-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                  isCurrent
                                    ? "bg-[#1677ff] border-[#1677ff] text-white shadow-md shadow-blue-500/30 scale-110"
                                    : isCompleted
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "bg-white dark:bg-[#1f1f1f] border-slate-300 dark:border-[#404040] text-slate-400"
                                )}
                              >
                                <StepIcon className="size-3.5" />
                              </div>
                              <span
                                className={cn(
                                  "text-[10px] sm:text-[11px] font-semibold text-center whitespace-nowrap",
                                  isCurrent
                                    ? "text-[#1677ff] dark:text-blue-400"
                                    : isCompleted
                                    ? "text-slate-800 dark:text-slate-200"
                                    : "text-slate-400 dark:text-slate-500"
                                )}
                              >
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border-b border-rose-100 dark:border-rose-900/30 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                      <XCircle className="size-4 text-rose-600 shrink-0" />
                      <span>এই ধার নেওয়ার আবেদনটি বাতিল করা হয়েছে।</span>
                    </div>
                  )}

                  {/* Book Items List */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      ধার নেওয়া বই ({borrow.items.reduce((acc, i) => acc + (i.quantity || 1), 0)} টি)
                    </p>
                    <div className="space-y-3">
                      {borrow.items.map((item, idx) => (
                        <div
                          key={`${item.bookId}-${idx}`}
                          className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200/60 dark:border-[#333]"
                        >
                          <div className="relative size-12 sm:size-14 rounded-lg overflow-hidden bg-slate-200 dark:bg-[#1f1f1f] shrink-0 border border-slate-200 dark:border-[#3a3a3a]">
                            <Image
                              src={item.thumbnail || "/placeholder-book.png"}
                              alt={item.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              লেখক: {item.author}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-900/40">
                                মেয়াদ: {borrow.durationDays} দিন
                              </span>
                              <span className="text-[10px] text-slate-500">
                                পরিমাণ: {item.quantity || 1} টি
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery & Address Bottom Bar */}
                  <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#1a1a1a]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                        <span>
                          <strong>গ্রহীতা:</strong> {borrow.shippingAddress?.recipientName} (
                          {borrow.shippingAddress?.phone})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5">
                        {borrow.deliveryMethod === "self_pickup"
                          ? "লাইব্রেরি কাউন্টার থেকে সরাসরি সংগ্রহ"
                          : `ঠিকানা: ${borrow.shippingAddress?.fullAddress}, ${borrow.shippingAddress?.villageOrArea}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                      <div className="text-right">
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                          ডেলিভারি/সার্ভিস চার্জ
                        </span>
                        <strong className="text-sm text-slate-900 dark:text-white">
                          ৳ {borrow.totalAmount || 0}
                        </strong>
                      </div>

                      <Link
                        href="/granthagar/books"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-[#1677ff] hover:bg-slate-50 dark:hover:bg-[#303030] transition-colors shadow-xs"
                      >
                        <span>আরও বই নিন</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Additional Resource Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Reading Tracker Card */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <BookMarked className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  ডিজিটাল রিডিং ট্র্যাকার
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  দৈনিক পড়ার রুটিন ও রিডিং গোল ট্র্যাক করুন
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              আপনি কতগুলো বই পড়ছেন, কোন অধ্যায়ে আছেন এবং আপনার বাৎসরিক রিডিং টার্গেট কতদূর অগ্রসর হয়েছে তা গ্রাফ আকারে পর্যবেক্ষণ করুন।
            </p>
          </div>

          <Link
            href="/granthagar/reading-tracker"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
          >
            <span>রিডিং ট্র্যাকার খুলুন</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Book Request Card */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <PlusCircle className="size-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  নতুন বইয়ের আবেদন (Book Request)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  লাইব্রেরিতে পছন্দের নতুন বই যোগ করার প্রস্তাব পাঠান
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              লাইব্রেরিতে আপনার পছন্দের বইটি এখনো না থাকলে নাম ও লেখকের তথ্য দিয়ে আমাদের আবেদন জানান।
            </p>
          </div>

          <Link
            href="/granthagar/request-book"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
          >
            <span>নতুন বইয়ের আবেদন করুন</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
