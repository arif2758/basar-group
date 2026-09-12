// src/app/admin/shop/ShopAdminClient.tsx
"use client";

import React, { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  MapPin,
  ChevronDown,
  Loader2,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Filter,
  ArrowRight,
  AlertTriangle,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { IOrderSerializable } from "@/types/order";
import type { OrderStatus } from "@/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const ORDER_STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "assigned", label: "Assigned" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "in_return", label: "In-Return" },
  { value: "returned", label: "Returned" },
  { value: "cancelled", label: "Cancelled" },
];

const TAB_FILTERS = [
  { id: "all", label: "সকল" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "in_return", label: "In-Return" },
  { id: "returned", label: "Returned" },
  { id: "cancelled", label: "Cancelled" },
] as const;

type TabId = (typeof TAB_FILTERS)[number]["id"];

// ─── Badge helpers ───────────────────────────────────────────────────────────

function getStatusBadge(status: OrderStatus) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    pending: {
      label: "Pending",
      className:
        "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
    },
    confirmed: {
      label: "Confirmed",
      className:
        "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40",
    },
    processing: {
      label: "Processing",
      className:
        "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-900/40",
    },
    ready: {
      label: "Ready",
      className:
        "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/40",
    },
    assigned: {
      label: "Assigned",
      className:
        "bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-900/40",
    },
    shipped: {
      label: "Shipped",
      className:
        "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40",
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
        "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    },
    cancelled: {
      label: "Cancelled",
      className:
        "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40",
    },
  };
  return (
    map[status] ?? {
      label: status,
      className:
        "bg-slate-100 dark:bg-slate-800 text-slate-600 border-slate-200",
    }
  );
}

// ─── Dot color per status ─────────────────────────────────────────────────────

const STATUS_DOT_COLOR: Record<OrderStatus, string> = {
  pending: "bg-amber-400",
  confirmed: "bg-blue-500",
  processing: "bg-sky-500",
  ready: "bg-indigo-500",
  assigned: "bg-violet-500",
  shipped: "bg-orange-500",
  delivered: "bg-emerald-500",
  in_return: "bg-purple-500",
  returned: "bg-slate-400",
  cancelled: "bg-rose-500",
};

// ─── Inline Status Selector ───────────────────────────────────────────────────

function StatusSelector({
  orderId,
  currentStatus,
  onUpdate,
}: {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdate: (id: string, newStatus: OrderStatus) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState<OrderStatus>(currentStatus);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    const prevStatus = localStatus;
    setLocalStatus(newStatus);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/super-shop/admin/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderStatus: newStatus }),
        });
        const data = await res.json();
        if (data.success) {
          onUpdate(orderId, newStatus);
          toast.success(`অর্ডার স্ট্যাটাস "${newStatus}" করা হয়েছে।`);
        } else {
          setLocalStatus(prevStatus);
          toast.error(data.error || "স্ট্যাটাস আপডেট করা যায়নি।");
        }
      } catch {
        setLocalStatus(prevStatus);
        toast.error("সার্ভার এরর। পুনরায় চেষ্টা করুন।");
      }
    });
  }

  return (
    <div className="relative inline-flex items-center gap-1.5">
      {isPending && (
        <Loader2 className="size-3 animate-spin text-slate-400 absolute -left-5" />
      )}
      <div className="relative flex items-center">
        <span
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 size-2 rounded-full pointer-events-none z-10",
            STATUS_DOT_COLOR[localStatus]
          )}
        />
        <select
          value={localStatus}
          onChange={handleChange}
          disabled={isPending}
          className="appearance-none pl-6 pr-7 py-1 text-[11px] font-semibold rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-[#1677ff] disabled:opacity-60 bg-white dark:bg-[#262626] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-[#404040]"
        >
          {ORDER_STATUS_OPTIONS.map((opt) => (
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface ShopAdminClientProps {
  initialOrders: IOrderSerializable[];
  stats: {
    totalOrders: number;
    pendingOrders: number;
    confirmedOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ShopAdminClient({
  initialOrders,
  stats,
}: ShopAdminClientProps) {
  const [orders, setOrders] = useState<IOrderSerializable[]>(initialOrders);
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  function handleStatusUpdate(id: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, orderStatus: newStatus } : o))
    );
  }

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`"${code}" কপি করা হয়েছে`);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  // Live stats from current orders state
  const liveStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.orderStatus === "pending").length,
      processing: orders.filter((o) =>
        ["confirmed", "processing", "ready", "assigned"].includes(o.orderStatus)
      ).length,
      shipped: orders.filter((o) => o.orderStatus === "shipped").length,
      delivered: orders.filter((o) => o.orderStatus === "delivered").length,
      cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      // Tab filter
      if (activeTab !== "all" && o.orderStatus !== activeTab) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.shipping?.name?.toLowerCase().includes(q) ||
          o.shipping?.phone?.includes(q) ||
          o.items.some((i) => i.productTitle.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

  return (
    <div className="w-full space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="rounded-2xl p-5 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-1.5">
          {/* Breadcrumb — always left */}
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
              সুপার শপ
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
            <ShoppingBag className="size-3.5" />
            <span>বাছার সুপার শপ — অ্যাডমিন কন্ট্রোল</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            অর্ডার ব্যবস্থাপনা
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            সকল কাস্টমার অর্ডার পর্যালোচনা করুন, স্ট্যাটাস আপডেট করুন এবং ডেলিভারি ট্র্যাক করুন।
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-start gap-2 shrink-0">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors"
          >
            <RefreshCw className="size-3.5" />
            রিফ্রেশ
          </button>
          <Link
            href="/super-shop"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-xs"
          >
            <ExternalLink className="size-3.5" />
            পাবলিক শপ
          </Link>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {[
          {
            label: "মোট অর্ডার",
            value: liveStats.total,
            icon: ShoppingBag,
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
            label: "প্রসেসিং",
            value: liveStats.processing,
            icon: Package,
            color: "text-sky-600 dark:text-sky-400",
            bg: "bg-sky-50 dark:bg-sky-950/40",
          },
          {
            label: "Shipped",
            value: liveStats.shipped,
            icon: Truck,
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-950/40",
          },
          {
            label: "Delivered",
            value: liveStats.delivered,
            icon: CheckCircle2,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/40",
          },
          {
            label: "Cancelled",
            value: liveStats.cancelled,
            icon: XCircle,
            color: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-50 dark:bg-rose-950/40",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-4 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col items-center text-center transition-colors"
            >
              <div
                className={cn(
                  "size-9 rounded-xl flex items-center justify-center mb-2",
                  stat.bg
                )}
              >
                <Icon className={cn("size-5", stat.color)} />
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.label}
              </p>
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
              placeholder="অর্ডার নম্বর / ফোন / পণ্যের নাম / কাস্টমারের নাম"
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1677ff] focus:ring-1 focus:ring-[#1677ff] transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] px-3 py-2 rounded-xl shrink-0">
            <Filter className="size-3.5" />
            <span>{filteredOrders.length} রেকর্ড</span>
          </div>
        </div>

        {/* Status Tabs — scrollable */}
        <div className="flex gap-1 overflow-x-auto no-scrollbar border-b border-slate-100 dark:border-[#262626] px-4 py-2">
          {TAB_FILTERS.map((tab) => {
            const count =
              tab.id === "all"
                ? orders.length
                : orders.filter((o) => o.orderStatus === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-amber-500 text-white shadow-xs"
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

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 text-center px-4">
            <div className="size-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <ShoppingBag className="size-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                কোনো অর্ডার পাওয়া যায়নি
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {searchQuery
                  ? `"${searchQuery}" এর জন্য কোনো মিল নেই।`
                  : "এই ক্যাটাগরিতে কোনো অর্ডার নেই।"}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#222] overflow-hidden rounded-b-2xl">
            {filteredOrders.map((order) => {
              const badge = getStatusBadge(order.orderStatus as OrderStatus);
              const isCancelled = order.orderStatus === "cancelled";
              const isReturned =
                order.orderStatus === "returned" ||
                order.orderStatus === "in_return";
              const amountDue = Math.max(
                0,
                order.total - (order.advancePaid || 0)
              );

              return (
                <div
                  key={order._id}
                  className={cn(
                    "p-4 sm:p-5 transition-colors hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a]/50",
                    isCancelled && "border-l-2 border-rose-400",
                    isReturned && "border-l-2 border-purple-400"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Left: Product thumbnails */}
                    <div className="flex gap-1.5 shrink-0">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="relative size-12 sm:size-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#333]"
                        >
                          {item.productImage ? (
                            <Image
                              src={item.productImage}
                              alt={item.productTitle}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="size-5 text-slate-400" />
                            </div>
                          )}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="size-12 sm:size-14 rounded-lg bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#333] flex items-center justify-center">
                          <span className="text-xs font-bold text-slate-500">
                            +{order.items.length - 2}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Center: Main info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Order number + Status + badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                          #{order.orderNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(order.orderNumber)}
                          className="p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        >
                          {copiedCode === order.orderNumber ? (
                            <Check className="size-3 text-emerald-500" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </button>

                        {/* Inline status selector */}
                        <StatusSelector
                          orderId={order._id}
                          currentStatus={order.orderStatus as OrderStatus}
                          onUpdate={handleStatusUpdate}
                        />

                        {/* Advance paid badge */}
                        {order.advancePaid && order.advancePaid > 0 && (
                          <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-full">
                            অগ্রিম: ৳{order.advancePaid}
                          </span>
                        )}

                        {/* VIP / discount badge */}
                        {((order.vipPrivilege || 0) > 0 ||
                          (order.discount || 0) > 0) && (
                          <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40 px-2 py-0.5 rounded-full">
                            🌟 VIP ছাড়
                          </span>
                        )}
                      </div>

                      {/* Products */}
                      <div className="flex flex-col gap-0.5">
                        {order.items.map((item, idx) => (
                          <p
                            key={idx}
                            className="text-xs text-slate-700 dark:text-slate-300 truncate"
                          >
                            <span className="font-semibold">
                              {item.productTitle}
                            </span>
                            <span className="text-slate-400">
                              {" "}
                              × {item.itemQuantity} · ৳{item.unitPrice}
                            </span>
                          </p>
                        ))}
                      </div>

                      {/* Customer + Address + Date */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Phone className="size-3 shrink-0" />
                          {order.shipping?.name} · {order.customerPhone}
                        </span>
                        {order.shipping?.addressLine1 && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3 shrink-0" />
                            {order.shipping.addressLine1}
                            {order.shipping.district
                              ? `, ${order.shipping.district}`
                              : ""}
                          </span>
                        )}
                        <span>
                          {format(new Date(order.createdAt), "dd MMM yyyy · hh:mm a")}
                        </span>
                        <span className="capitalize text-slate-400">
                          {order.paymentMethod?.toUpperCase()}
                        </span>
                        {order.courierProvider && order.courierProvider !== "offline" && (
                          <span className="uppercase font-medium text-indigo-500 dark:text-indigo-400">
                            {order.courierProvider}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Amount + detail link */}
                    <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          {order.advancePaid && order.advancePaid > 0
                            ? "বাকি (COD)"
                            : "মোট"}
                        </p>
                        <p className="text-base font-bold text-slate-900 dark:text-white">
                          ৳{amountDue.toLocaleString()}
                        </p>
                      </div>
                      <Link
                        href={`/dashboard/shop/orders/${order._id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#333] transition-colors"
                      >
                        বিস্তারিত
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
    </div>
  );
}
