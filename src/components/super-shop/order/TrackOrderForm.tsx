// src/components/super-shop/order/TrackOrderForm.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  Hash,
  HelpCircle,
  Copy,
  Check,
  MessageCircle,
  ShoppingBag,
  Calendar,
  AlertCircle,
  XCircle,
  CreditCard,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/priceUtils";
import { toast } from "sonner";
import type { IOrder } from "@/types/order";
import type { OrderStatus } from "@/types";

const STAGES: {
  id: OrderStatus;
  labelBn: string;
  labelEn: string;
  icon: typeof Clock;
  description: string;
}[] = [
  {
    id: "pending",
    labelBn: "অর্ডার গ্রহণ",
    labelEn: "Order Placed",
    icon: Clock,
    description: "আপনার অর্ডার সিস্টেমে জমা হয়েছে",
  },
  {
    id: "confirmed",
    labelBn: "অর্ডার নিশ্চিত",
    labelEn: "Confirmed",
    icon: CheckCircle2,
    description: "অর্ডারটি যাচাই ও নিশ্চিত করা হয়েছে",
  },
  {
    id: "processing",
    labelBn: "প্যাকিং চলছে",
    labelEn: "Processing",
    icon: Package,
    description: "পণ্য প্যাকিং ও ডেলিভারি পার্টনারে হস্তান্তর",
  },
  {
    id: "shipped",
    labelBn: "পথে আছে",
    labelEn: "On the Way",
    icon: Truck,
    description: "কুরিয়ার পার্টনার ডেলিভারির জন্য নিয়ে বের হয়েছে",
  },
  {
    id: "delivered",
    labelBn: "ডেলিভারি সম্পন্ন",
    labelEn: "Delivered",
    icon: MapPin,
    description: "পণ্য সফলভাবে ক্রেতার কাছে পৌঁছেছে",
  },
];

type TrackedOrder = Pick<
  IOrder,
  | "orderNumber"
  | "channelSource"
  | "orderStatus"
  | "paymentMethod"
  | "paymentStatus"
  | "total"
  | "items"
  | "subtotal"
  | "shippingCost"
  | "discount"
  | "couponCode"
  | "createdAt"
  | "shipping"
  | "courierProvider"
  | "courierTrackingId"
  | "courierStatus"
>;

export function TrackOrderForm() {
  const searchParams = useSearchParams();
  const initialOrderId =
    searchParams.get("order") ||
    searchParams.get("orderId") ||
    searchParams.get("id") ||
    "";

  const [orderId, setOrderId] = useState<string>(initialOrderId);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const fetchTrackStatus = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error("আপনার Order ID বা ফোন নম্বর দিন");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/super-shop/order/track?orderId=${encodeURIComponent(searchQuery.trim())}`,
      );
      const data = (await res.json()) as {
        success: boolean;
        order?: TrackedOrder;
        error?: string;
      };

      if (data.success && data.order) {
        setOrder(data.order);
        setTimeout(() => {
          const element = resultRef.current;
          if (element) {
            const elementRect = element.getBoundingClientRect();
            const headerOffset = 60;
            const scrollTarget = elementRect.top + window.scrollY - headerOffset;
            window.scrollTo({
              top: scrollTarget,
              behavior: "smooth",
            });
          }
        }, 150);
      } else {
        toast.error(data.error ?? "Order খুঁজে পাওয়া যায়নি");
        setOrder(null);
      }
    } catch {
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Auto-search if query param present on first load
  useEffect(() => {
    if (initialOrderId) {
      setOrderId(initialOrderId);
      fetchTrackStatus(initialOrderId);
    }
  }, [initialOrderId]);

  const handleTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchTrackStatus(orderId);
  };

  const handleCopyOrderNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopied(true);
    toast.success("অর্ডার নম্বর কপি করা হয়েছে!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIndex = (status: string): number => {
    return STAGES.findIndex((s) => s.id === status);
  };

  const isCancelled = order?.orderStatus === "cancelled";

  return (
    <div className="space-y-10" suppressHydrationWarning>
      {/* Search Section Card */}
      <form
        onSubmit={handleTrack}
        className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm transition-colors"
      >
        <div className="space-y-2.5 text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff] dark:border-[#153450] text-[#1677ff] dark:text-[#1668dc] text-xs font-semibold">
            <Sparkles className="size-3.5" />
            <span>স্মার্ট অর্ডার ট্র্যাকিং</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            আপনার অর্ডার ট্র্যাক করুন
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            অর্ডার আইডি বা মোবাইল নম্বর দিয়ে আপনার পণ্যের লাইভ ডেলিভারি স্ট্যাটাস জানুন
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Hash className="size-3.5 text-[#1677ff]" />
              Order ID অথবা ১১ ডিজিটের ফোন নম্বর
            </label>
            <div className="relative">
              <Input
                placeholder="যেমন: GH-WEB-260910-0003 অথবা 017XXXXXXXX"
                className="h-12 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#424242] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium text-base focus-visible:ring-4 focus-visible:ring-[#1677ff]/10 focus-visible:border-[#1677ff] dark:focus-visible:border-[#1668dc] transition-all px-4"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </div>

          {/* Ant Design Style Helpful Tip Box */}
          <div className="bg-[#e6f4ff]/70 dark:bg-[#111a2c]/60 p-4 rounded-xl border border-[#91caff]/60 dark:border-[#153450] space-y-2">
            <div className="flex items-center gap-2 text-[#0958d9] dark:text-[#69b1ff] text-xs font-bold">
              <HelpCircle className="size-4 shrink-0" />
              <span>সার্চ করার ৩টি সহজ উপায়:</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-5 list-disc leading-relaxed">
              <li>
                <strong className="text-slate-800 dark:text-slate-100">সম্পূর্ণ ইনভয়েস ID:</strong> যেমন{" "}
                <code className="bg-white dark:bg-[#1f1f1f] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#303030] text-[#1677ff] dark:text-[#1668dc] font-mono text-[11px] font-bold">
                  GH-WEB-260910-0003
                </code>
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-100">সংক্ষিপ্ত নম্বর:</strong> যেমন{" "}
                <code className="bg-white dark:bg-[#1f1f1f] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-200 font-mono text-[11px] font-bold">
                  260910-0003
                </code>
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-100">ফোন নম্বর:</strong> অর্ডার করার সময় যে ১১ ডিজিটের মোবাইল নম্বর দিয়েছেন।
              </li>
            </ul>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 rounded-xl bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-all gap-2"
        >
          {loading ? (
            <>
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>তথ্য খোঁজা হচ্ছে...</span>
            </>
          ) : (
            <>
              <Search className="size-4" />
              <span>অর্ডার স্ট্যাটাস দেখুন</span>
            </>
          )}
        </Button>
      </form>

      {/* Result Section */}
      {order && (
        <div
          ref={resultRef}
          className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          {/* Main Status & Stepper Card */}
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-sm transition-colors">
            {/* Order Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#262626]">
              <div className="space-y-1.5">
                <div className="flex items-center flex-wrap gap-2.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">অর্ডার নম্বর:</span>
                  <span className="font-mono font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {order.orderNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyOrderNumber(order.orderNumber)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-[#1668dc] transition-colors border border-slate-200 dark:border-[#303030]"
                    title="কপি করুন"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3" />
                        <span className="text-[11px]">কপি</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-slate-400" />
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("bn-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "তারিখ পাওয়া যায়নি"}
                  </span>
                  <span>•</span>
                  <span>গ্রাহক: <strong className="text-slate-700 dark:text-slate-200">{order.shipping.name}</strong></span>
                </div>
              </div>

              {/* Status Tag */}
              <div className="flex flex-col sm:items-end gap-1">
                <div className="inline-flex items-center gap-1.5">
                  {isCancelled ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#fff2f0] dark:bg-[#2a1215] text-[#cf1322] dark:text-[#ff7875] border border-[#ffa39e] dark:border-[#58181c]">
                      <XCircle className="size-3.5" /> অর্ডার বাতিল করা হয়েছে
                    </span>
                  ) : order.orderStatus === "delivered" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#f6ffed] dark:bg-[#162312] text-[#389e0d] dark:text-[#49aa19] border border-[#b7eb8f] dark:border-[#274916]">
                      <CheckCircle2 className="size-3.5" /> ডেলিভারি সম্পন্ন
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] border border-[#91caff] dark:border-[#153450]">
                      <Truck className="size-3.5" />
                      {STAGES.find((s) => s.id === order.orderStatus)?.labelBn || "প্রক্রিয়াধীন"}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  পেমেন্ট: <span className="font-semibold text-slate-700 dark:text-slate-200 uppercase">{order.paymentMethod}</span>
                  {order.paymentStatus === "paid" ? (
                    <span className="ml-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">(পরিশোধিত)</span>
                  ) : (
                    <span className="ml-1.5 text-amber-600 dark:text-amber-400 font-semibold">(ক্যাশ অন ডেলিভারি)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Ant Design Steps Timeline */}
            {!isCancelled ? (
              <div className="pt-8 pb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
                  শিপমেন্ট ট্র্যাকিং টাইমলাইন
                </h3>

                {/* Horizontal Stepper for md+ */}
                <div className="hidden md:grid grid-cols-5 gap-2 relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-200 dark:bg-[#303030] -z-0" />
                  <div
                    className="absolute top-5 left-8 h-0.5 bg-[#1677ff] -z-0 transition-all duration-500"
                    style={{
                      width: `${(Math.max(0, getStatusIndex(order.orderStatus)) / (STAGES.length - 1)) * 82}%`,
                    }}
                  />

                  {STAGES.map((stage, idx) => {
                    const currentIndex = getStatusIndex(order.orderStatus);
                    const isCompleted = currentIndex > idx;
                    const isCurrent = currentIndex === idx;
                    const isUpcoming = currentIndex < idx;

                    return (
                      <div key={stage.id} className="relative z-10 flex flex-col items-center text-center px-1">
                        <div
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300",
                            isCompleted &&
                              "bg-[#1677ff] text-white shadow-sm shadow-[#1677ff]/30",
                            isCurrent &&
                              "bg-white dark:bg-[#141414] border-2 border-[#1677ff] text-[#1677ff] dark:text-[#1668dc] ring-4 ring-[#1677ff]/15 shadow-sm",
                            isUpcoming &&
                              "bg-slate-100 dark:bg-[#1f1f1f] text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-[#303030]",
                          )}
                        >
                          {isCompleted ? (
                            <Check className="size-5 stroke-[2.5]" />
                          ) : (
                            <stage.icon className={cn("size-5", isCurrent && "animate-pulse")} />
                          )}
                        </div>

                        <div className="mt-3 space-y-0.5">
                          <p
                            className={cn(
                              "text-xs font-bold",
                              isCurrent
                                ? "text-[#1677ff] dark:text-[#1668dc]"
                                : isCompleted
                                ? "text-slate-800 dark:text-slate-200"
                                : "text-slate-400 dark:text-slate-600",
                            )}
                          >
                            {stage.labelBn}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {stage.labelEn}
                          </p>
                          {isCurrent && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] border border-[#91caff] dark:border-[#153450]">
                              বর্তমান অবস্থা
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Stepper for Mobile */}
                <div className="md:hidden space-y-6 relative pl-6 border-l-2 border-slate-200 dark:border-[#303030] ml-3">
                  {STAGES.map((stage, idx) => {
                    const currentIndex = getStatusIndex(order.orderStatus);
                    const isCompleted = currentIndex > idx;
                    const isCurrent = currentIndex === idx;
                    const isUpcoming = currentIndex < idx;

                    return (
                      <div key={stage.id} className="relative">
                        {/* Dot indicator */}
                        <div
                          className={cn(
                            "absolute -left-[31px] top-0 size-7 rounded-full flex items-center justify-center text-xs transition-all",
                            isCompleted && "bg-[#1677ff] text-white",
                            isCurrent && "bg-white dark:bg-[#141414] border-2 border-[#1677ff] text-[#1677ff] ring-2 ring-[#1677ff]/20",
                            isUpcoming && "bg-slate-100 dark:bg-[#1f1f1f] text-slate-400 border border-slate-300 dark:border-[#424242]",
                          )}
                        >
                          {isCompleted ? <Check className="size-3.5 stroke-[2.5]" /> : <stage.icon className="size-3.5" />}
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                "text-sm font-bold",
                                isCurrent
                                  ? "text-[#1677ff] dark:text-[#1668dc]"
                                  : isCompleted
                                  ? "text-slate-800 dark:text-slate-200"
                                  : "text-slate-400 dark:text-slate-600",
                              )}
                            >
                              {stage.labelBn}
                            </span>
                            <span className="text-xs text-slate-400">({stage.labelEn})</span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] border border-[#91caff] dark:border-[#153450]">
                                বর্তমান অবস্থা
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{stage.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="py-6 flex items-center gap-3 text-[#cf1322] dark:text-[#ff7875] bg-[#fff2f0] dark:bg-[#2a1215] p-4 rounded-xl border border-[#ffa39e] dark:border-[#58181c]">
                <AlertCircle className="size-5 shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  এই অর্ডারটি বাতিল করা হয়েছে। কোনো প্রশ্ন থাকলে সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করুন।
                </p>
              </div>
            )}

            {/* Courier Info Bar if Available */}
            {(order.courierProvider || order.courierTrackingId) && (
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#262626] flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-[#1a1a1a] p-4 rounded-xl border border-slate-200 dark:border-[#303030]">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Truck className="size-4 text-[#1677ff]" />
                  <span>কুরিয়ার পার্টনার:</span>
                  <span className="font-bold text-slate-900 dark:text-white uppercase">
                    {order.courierProvider || "রেজিস্টার্ড কুরিয়ার"}
                  </span>
                </div>
                {order.courierTrackingId && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">কন্সায়নমেন্ট আইডি:</span>
                    <code className="font-mono font-bold text-[#1677ff] bg-white dark:bg-[#141414] px-2 py-0.5 rounded border border-slate-200 dark:border-[#303030]">
                      {order.courierTrackingId}
                    </code>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ordered Items & Cost Summary */}
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-sm transition-colors space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262626]">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="size-4 text-[#1677ff]" />
                অর্ডারের পণ্যসমূহ ({order.items?.length || 0})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                মোট মূল্য: <strong className="text-[#ff4d4f] dark:text-[#ff7875] text-sm font-bold">{formatPrice(order.total)}</strong>
              </span>
            </div>

            {/* Items List */}
            <div className="divide-y divide-slate-100 dark:divide-[#262626]">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="size-16 sm:size-18 rounded-xl bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] overflow-hidden shrink-0 relative flex items-center justify-center">
                      {item.productImage ? (
                        <Image
                          src={item.productImage}
                          alt={item.productTitle}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      ) : (
                        <Package className="size-6 text-slate-400" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {item.productTitle}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {item.color && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 text-[11px]">
                            রং: {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 text-[11px]">
                            সাইজ: {item.size}
                          </span>
                        )}
                        <span>পরিমাণ: <strong className="text-slate-800 dark:text-slate-200">{item.itemQuantity}টি</strong></span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">
                        {formatPrice(item.unitPrice * item.itemQuantity)}
                      </p>
                      {item.itemQuantity > 1 && (
                        <p className="text-[11px] text-slate-400">
                          ({formatPrice(item.unitPrice)} × {item.itemQuantity})
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-slate-400 text-xs">কোনো পণ্যের বিবরণ পাওয়া যায়নি</div>
              )}
            </div>

            {/* Price Breakdown Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#262626] space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>সাবটোটাল</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.shippingCost || 0)}</span>
              </div>
              {Boolean(order.discount && order.discount > 0) && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>ডিসকাউন্ট {order.couponCode ? `(${order.couponCode})` : ""}</span>
                  <span>- {formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-[#262626] text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                <span>সর্বমোট প্রদেয়</span>
                <span className="text-[#ff4d4f] dark:text-[#ff7875] text-lg font-bold">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Address & Customer Care (2 Columns) */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivery Address Card */}
            <div className="bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-4 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262626]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <MapPin className="size-4 text-[#1677ff]" />
                  ডেলিভারি ঠিকানা
                </h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#e6f4ff] dark:bg-[#111a2c] text-[#1677ff] dark:text-[#1668dc] border border-[#91caff] dark:border-[#153450]">
                  {order.shipping.deliveryZone || (order.shippingCost > 80 ? "ঢাকার বাইরে" : "ঢাকার ভেতরে")}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {order.shipping.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Phone className="size-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono font-medium">{order.shipping.phone}</span>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <Building2 className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    {[
                      order.shipping.addressLine1,
                      order.shipping.addressLine2,
                      order.shipping.city,
                      order.shipping.district,
                    ]
                      .filter((p): p is string => Boolean(p) && !/outside dhaka|inside dhaka|^dhaka$/i.test(p!.trim()))
                      .join(", ") || order.shipping.addressLine1}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Care Direct Actions */}
            <div className="bg-white dark:bg-[#141414] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-4 transition-colors">
              <div className="pb-3 border-b border-slate-100 dark:border-[#262626]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <HelpCircle className="size-4 text-[#1677ff]" />
                  সাপোর্ট ও সাহায্য
                </h4>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                আপনার অর্ডার বা ডেলিভারি নিয়ে কোনো প্রশ্ন থাকলে আমাদের কাস্টমার কেয়ার প্রতিনিধির সাথে কথা বলুন।
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/8801754154374?text=${encodeURIComponent(
                    `হ্যালো, আমি অর্ডার #${order.orderNumber} সম্পর্কে জানতে চাই।`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 text-xs font-bold transition-all"
                >
                  <MessageCircle className="size-4" />
                  <span>হোয়াটসঅ্যাপ</span>
                </a>

                <a
                  href="tel:01754154374"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#1677ff]/10 hover:bg-[#1677ff]/20 text-[#1677ff] dark:text-[#1668dc] border border-[#1677ff]/30 text-xs font-bold transition-all"
                >
                  <Phone className="size-4" />
                  <span>সরাসরি কল</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

