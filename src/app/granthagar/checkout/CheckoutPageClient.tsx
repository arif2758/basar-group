// src/app/granthagar/checkout/CheckoutPageClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Clock,
  Truck,
  Building,
  CheckCircle2,
  ArrowLeft,
  Phone,
  User,
  MapPin,
  Copy,
  Check,
  Loader2,
  BookOpen,
  LogIn,
} from "lucide-react";
import { useBookCart } from "@/context/BookCartContext";
import type { BorrowDuration, DeliveryMethod } from "@/data/granthagar/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ─── Types ─────────────────────────────────────────────────────────────────

interface UserProp {
  name: string | null;
  email: string | null;
  phone: string | null;
  id: string | null;
}

interface CheckoutPageClientProps {
  user: UserProp | null;
}

type PaymentMethod = "cod" | "mobile" | "none";
type PaymentProvider = "bkash" | "nagad" | "rocket";

// ─── Constants ──────────────────────────────────────────────────────────────

const PAYMENT_ACCOUNTS = {
  bkash: {
    name: "bKash",
    number: "01742413416",
    logo: "/payment-method-logo/bkash.svg",
    color: "text-[#D12053]",
    bg: "bg-[#fef0f3] dark:bg-[#3d0a14]",
    border: "border-[#f9a8bb] dark:border-[#6b1628]",
  },
  nagad: {
    name: "Nagad",
    number: "01742413416",
    logo: "/payment-method-logo/nagad.svg",
    color: "text-[#EF4136]",
    bg: "bg-[#fef3f1] dark:bg-[#3d1008]",
    border: "border-[#fbb3a9] dark:border-[#6b1c0e]",
  },
  rocket: {
    name: "Rocket",
    number: "01742413416",
    logo: "/payment-method-logo/rocket.png",
    color: "text-[#8C3494]",
    bg: "bg-[#f8f0fa] dark:bg-[#2d0e36]",
    border: "border-[#d5a8e0] dark:border-[#53185e]",
  },
} as const;

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CheckoutPageClient({ user }: CheckoutPageClientProps) {
  const router = useRouter();
  const {
    items,
    totalItems,
    durationDays,
    setDurationDays,
    deliveryMethod,
    setDeliveryMethod,
    deliveryFee,
    bookBorrowFee,
    totalAmount,
    clearCart,
  } = useBookCart();

  // Form states
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [pledgeAgreed, setPledgeAgreed] = useState(true);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("none");
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>("bkash");
  const [senderNumber, setSenderNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState(false);

  // Submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Auto-fill when user is logged in
  useEffect(() => {
    if (user) {
      if (user.name && !recipientName) setRecipientName(user.name);
      if (user.phone && !phone) setPhone(user.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Auto-set payment method when delivery fee changes
  useEffect(() => {
    if (deliveryFee <= 0) {
      setPaymentMethod("none");
    } else {
      setPaymentMethod("cod");
    }
  }, [deliveryFee]);

  // Return date calculation
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + durationDays);
  const formattedReturnDate = returnDate.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const durationOptions: { days: BorrowDuration; label: string; desc: string }[] = [
    { days: 1, label: "1 Day", desc: "দ্রুত এক বসায় পড়ার জন্য" },
    { days: 3, label: "3 Days", desc: "স্ট্যান্ডার্ড সময়সীমা (Default)" },
    { days: 5, label: "5 Days", desc: "একটানা ধীরে পড়ার জন্য" },
    { days: 7, label: "7 Days", desc: "সর্বোচ্চ ৭ দিনের জন্য" },
  ];

  const deliveryOptions: {
    id: DeliveryMethod;
    title: string;
    fee: number;
    icon: any;
  }[] = [
    {
      id: "self_pickup",
      title: "পাঠক নিজে এসে নিয়ে যাবে",
      fee: 0,
      icon: Building,
    },
    {
      id: "standard_delivery",
      title: "স্ট্যান্ডার্ড ডেলিভারি",
      fee: 10,
      icon: Truck,
    },
  ];

  function handleCopyNumber(num: string) {
    navigator.clipboard.writeText(num);
    setCopied(true);
    toast.success(`${num} কপি করা হয়েছে`);
    setTimeout(() => setCopied(false), 2000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      toast.error("অনুগ্রহ করে আপনার পুরো নাম লিখুন।");
      return;
    }
    if (!phone.trim() || phone.length < 11) {
      toast.error("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন।");
      return;
    }
    if (deliveryMethod !== "self_pickup" && !fullAddress.trim()) {
      toast.error("হোম ডেলিভারির জন্য ঠিকানা দেওয়া আবশ্যক।");
      return;
    }
    if (paymentMethod === "mobile" && (!senderNumber.trim() || !transactionId.trim())) {
      toast.error("মোবাইল পেমেন্টের জন্য প্রেরক নম্বর ও ট্রানজেকশন আইডি দিন।");
      return;
    }
    if (!pledgeAgreed) {
      toast.error("বই অক্ষত ও সময়ে ফেরত দেওয়ার অঙ্গীকারে সম্মতি দিন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/granthagar/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            bookId: item.book.productId,
            productId: item.book.productId,
            title: item.book.title,
            author: item.book.author,
            thumbnail: item.book.thumbnail,
            quantity: item.quantity,
          })),
          recipientName: recipientName.trim(),
          phone: phone.trim(),
          fullAddress: fullAddress.trim(),
          notes: notes.trim(),
          durationDays,
          deliveryMethod,
          deliveryFee,
          bookBorrowFee,
          totalAmount,
          pledgeAgreed,
          paymentMethod,
          paymentProvider: paymentMethod === "mobile" ? paymentProvider : undefined,
          senderNumber: paymentMethod === "mobile" ? senderNumber.trim() : undefined,
          transactionId: paymentMethod === "mobile" ? transactionId.trim() : undefined,
        }),
      });

      const data = await res.json();

      if (data.success && data.borrow) {
        setCompletedOrder({
          ...data.borrow,
          formattedReturnDate: new Date(data.borrow.expectedReturnDate).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        });
        clearCart();
        toast.success("বই ধার নেওয়ার আবেদন সফলভাবে গৃহীত হয়েছে!");
      } else {
        toast.error(data.error || "আবেদন প্রক্রিয়াকরণে সমস্যা হয়েছে।");
      }
    } catch {
      toast.error("সার্ভার এরর। কিছুক্ষণ পর আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── SUCCESS SCREEN ────────────────────────────────────────────────────────
  if (completedOrder) {
    return (
      <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-6 sm:p-8 text-center shadow-lg space-y-5">
          <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="size-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Request Confirmed
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              আবেদন সফল হয়েছে!
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              আপনার আবেদনটি বাছার গ্রন্থাগার সিস্টেমে সফলভাবে সংরক্ষিত হয়েছে।
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-[#141414] p-4 text-xs space-y-2.5 border border-slate-200/80 dark:border-[#303030] text-left">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">বুক ট্র্যাকিং কোড:</span>
              <strong className="text-[#1677ff] font-mono text-sm font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-900/40">
                {completedOrder.borrowCode}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">পাঠকের নাম:</span>
              <strong className="text-slate-800 dark:text-slate-200">
                {completedOrder.shippingAddress?.recipientName}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ধার নেওয়ার সময়কাল:</span>
              <strong className="text-slate-800 dark:text-slate-200">
                {completedOrder.durationDays} Days
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ফেরত দেওয়ার তারিখ:</span>
              <strong className="text-amber-600 dark:text-amber-400 font-semibold">
                {completedOrder.formattedReturnDate}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">মোট চার্জ:</span>
              <strong className="text-slate-800 dark:text-slate-200">
                ৳{completedOrder.totalAmount || 0}
              </strong>
            </div>
            {completedOrder.paymentMethod === "mobile" && completedOrder.transactionId && (
              <div className="flex justify-between">
                <span className="text-slate-500">ট্রানজেকশন ID:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-mono">
                  {completedOrder.transactionId}
                </strong>
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard/library"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all text-center shadow-xs flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="size-4" />
              <span>ড্যাশবোর্ডে ট্র্যাক করুন</span>
            </Link>
            <Link
              href="/granthagar/books"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-[#222] dark:hover:bg-[#2e2e2e] text-slate-700 dark:text-slate-200 transition-all text-center border border-slate-200 dark:border-[#303030]"
            >
              আরও বই দেখুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── EMPTY CART ────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] flex items-center justify-center mb-4">
          <BookOpen className="size-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          আপনার কার্ট বর্তমানে খালি
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          চেকআউট করার জন্য প্রথমে ক্যাটালগ থেকে বই নির্বাচন করুন।
        </p>
        <Link
          href="/granthagar/books"
          className="mt-4 px-5 py-2.5 rounded-xl bg-[#1677ff] text-white text-xs font-bold hover:bg-[#4096ff]"
        >
          ক্যাটালগে যান
        </Link>
      </div>
    );
  }

  // ── INPUT STYLES ─────────────────────────────────────────────────────────
  const inputCls =
    "w-full rounded-xl bg-slate-50 dark:bg-[#141414] px-3 py-2.5 text-sm text-slate-900 dark:text-white border border-slate-200 dark:border-[#303030] focus:border-[#1677ff] focus:ring-2 focus:ring-[#1677ff]/15 focus:outline-none transition-all placeholder:text-slate-400";

  const labelCls =
    "block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5";

  // ── MAIN FORM ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link href="/granthagar" className="hover:text-[#1677ff]">গ্রন্থাগার</Link>
          <span>/</span>
          <Link href="/granthagar/cart" className="hover:text-[#1677ff]">বইয়ের ঝুলি</Link>
          <span>/</span>
          <span className="text-[#1677ff]">চেকআউট</span>
        </div>

        {/* Login Banner (not logged in) */}
        {!user && (
          <div className="mb-6 p-4 sm:p-5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                দ্রুত চেকআউট করতে চান?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Google দিয়ে লগিন করলে আপনার নাম ও ফোন নম্বর অটো-ফিলাপ হয়ে যাবে।
              </p>
            </div>
            <Link
              href={`/login?callbackUrl=${encodeURIComponent("/granthagar/checkout")}`}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-white dark:bg-[#1f1f1f] text-[#1677ff] border border-blue-200 dark:border-blue-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors shadow-xs"
            >
              <LogIn className="size-4" />
              লগিন করুন
            </Link>
          </div>
        )}

        {/* Logged in banner */}
        {user && (
          <div className="mb-6 p-3.5 sm:p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xl flex items-center gap-3 shadow-xs">
            <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
              আপনি <span className="font-bold">{user.name || user.email}</span> হিসেবে লগিন করা আছেন — তথ্য অটো-ফিলাপ করা হয়েছে।
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 space-y-6">

            {/* ─── Section 1: ধার নেওয়ার সময়কাল ─── */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#1677ff] text-white text-xs font-bold">1</div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    ধার নেওয়ার সময়কাল
                  </h2>
                </div>
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="size-3.5" />
                  ফেরত: {formattedReturnDate}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.days}
                    type="button"
                    onClick={() => setDurationDays(opt.days)}
                    className={cn(
                      "p-3 rounded-xl border text-center transition-all cursor-pointer",
                      durationDays === opt.days
                        ? "border-[#1677ff] bg-blue-50/50 dark:bg-blue-950/20 text-[#1677ff] shadow-xs"
                        : "border-slate-200 dark:border-[#303030] bg-slate-50/60 dark:bg-[#191919] text-slate-700 dark:text-slate-300 hover:border-slate-300"
                    )}
                  >
                    <div className="text-base font-extrabold">{opt.label}</div>
                    <div className="text-[10px] opacity-75 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Section 2: বই পৌঁছানোর পদ্ধতি ─── */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs space-y-3.5">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#262626] pb-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#1677ff] text-white text-xs font-bold">2</div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  বই পৌঁছানোর পদ্ধতি
                </h2>
              </div>

              <div className="space-y-2.5">
                {deliveryOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = deliveryMethod === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setDeliveryMethod(opt.id)}
                      className={cn(
                        "px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer",
                        isSelected
                          ? "border-[#1677ff] bg-blue-50/40 dark:bg-blue-950/20 shadow-xs ring-1 ring-[#1677ff]/30"
                          : "border-slate-200 dark:border-[#303030] bg-slate-50/40 dark:bg-[#191919] hover:border-slate-300"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "size-4.5 rounded-full border-2 flex items-center justify-center transition-all shrink-0",
                            isSelected
                              ? "border-[#1677ff] bg-white dark:bg-[#141414]"
                              : "border-slate-300 dark:border-slate-600 bg-transparent"
                          )}
                        >
                          {isSelected && <div className="size-2 rounded-full bg-[#1677ff]" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon className="size-4 text-[#1677ff] shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                            {opt.title}
                          </span>
                        </div>
                      </div>

                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-md text-xs font-bold shrink-0",
                          opt.fee === 0
                            ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                            : "bg-blue-100 dark:bg-blue-950/60 text-[#1677ff] dark:text-blue-300"
                        )}
                      >
                        {opt.fee === 0 ? "Free" : `৳${opt.fee}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── Section 3: শিপিং তথ্য ─── */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#262626] pb-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-[#1677ff] text-white text-xs font-bold">3</div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  শিপিং তথ্য
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className={labelCls}>আপনার নাম *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="যেমন: তানভীর বাছার"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className={cn(inputCls, "pl-9")}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className={labelCls}>মোবাইল নম্বর *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={cn(inputCls, "pl-9")}
                    />
                  </div>
                </div>

                {/* Full Address (only if not self_pickup) */}
                {deliveryMethod !== "self_pickup" && (
                  <div className="sm:col-span-2">
                    <label className={labelCls}>পূর্ণ ডেলিভারি ঠিকানা *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 size-4 text-slate-400" />
                      <textarea
                        rows={2}
                        required
                        placeholder="বাড়ি নং, রাস্তা, গ্রাম/এলাকা, থানা, জেলা"
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        className={cn(inputCls, "pl-9 resize-none")}
                      />
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label className={labelCls}>বিশেষ অনুরোধ <span className="normal-case font-normal text-slate-400">(ঐচ্ছিক)</span></label>
                  <input
                    type="text"
                    placeholder="যেমন: বিকেলে পৌঁছে দিলে ভালো হয়"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Pledge */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#262626]">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pledgeAgreed}
                    onChange={(e) => setPledgeAgreed(e.target.checked)}
                    className="mt-1 size-4 rounded text-[#1677ff] focus:ring-[#1677ff]"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    আমি অঙ্গীকার করছি যে, বইগুলো অত্যন্ত যত্নের সাথে পাঠ করব এবং কোনো দাগ বা ক্ষতিসাধন না করে নির্ধারিত{" "}
                    <strong>{durationDays} দিনের</strong> মধ্যে অক্ষত অবস্থায় ফেরত প্রদান করব।
                  </span>
                </label>
              </div>
            </div>

            {/* ─── Section 4: পেমেন্ট (only if deliveryFee > 0) ─── */}
            {deliveryFee > 0 ? (
              <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-slate-100 dark:border-[#262626] pb-3">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-[#1677ff] text-white text-xs font-bold">4</div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">পেমেন্ট পদ্ধতি</h2>
                    <p className="text-[11px] text-slate-500">শুধুমাত্র ডেলিভারি চার্জ (৳{deliveryFee}) পরিশোধ করতে হবে</p>
                  </div>
                </div>

                <div className="grid gap-2.5">
                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={cn(
                      "relative flex items-center justify-between px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden",
                      paymentMethod === "cod"
                        ? "border-2 border-[#1677ff] bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                        : "border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] hover:border-blue-200 dark:hover:border-blue-900/40"
                    )}
                  >
                    {paymentMethod === "cod" && (
                      <div className="absolute top-0 right-0 bg-[#1677ff] text-white px-1.5 py-0.5 rounded-bl-lg flex items-center justify-center">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                          paymentMethod === "cod"
                            ? "border-[#1677ff] bg-white dark:bg-[#141414]"
                            : "border-slate-300 dark:border-slate-600"
                        )}
                      >
                        {paymentMethod === "cod" && <div className="size-2.5 rounded-full bg-[#1677ff]" />}
                      </div>
                      <div className="leading-tight">
                        <p className={cn("text-xs sm:text-sm font-bold", paymentMethod === "cod" ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-200")}>
                          ক্যাশ অন ডেলিভারি (COD)
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">বই পেয়ে ডেলিভারি চার্জ দিন</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Banking */}
                  <div
                    onClick={() => setPaymentMethod("mobile")}
                    className={cn(
                      "relative flex items-center justify-between px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl border transition-all cursor-pointer overflow-hidden group",
                      paymentMethod === "mobile"
                        ? "border-2 border-[#1677ff] bg-blue-50/40 dark:bg-blue-950/20 shadow-xs"
                        : "border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] hover:border-blue-200 dark:hover:border-blue-900/40"
                    )}
                  >
                    {paymentMethod === "mobile" && (
                      <div className="absolute top-0 right-0 bg-[#1677ff] text-white px-1.5 py-0.5 rounded-bl-lg flex items-center justify-center z-10">
                        <Check className="size-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                          paymentMethod === "mobile"
                            ? "border-[#1677ff] bg-white dark:bg-[#141414]"
                            : "border-slate-300 dark:border-slate-600"
                        )}
                      >
                        {paymentMethod === "mobile" && <div className="size-2.5 rounded-full bg-[#1677ff]" />}
                      </div>
                      <div className="leading-tight min-w-0">
                        <p className={cn("text-xs sm:text-sm font-bold", paymentMethod === "mobile" ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-200")}>
                          মোবাইল ব্যাংকিং
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">বিকাশ, নগদ বা রকেটে অগ্রিম পেমেন্ট</p>
                      </div>
                    </div>
                    {/* Provider logos */}
                    <div className="flex items-center -space-x-1.5 shrink-0 pl-2">
                      {(["bkash", "nagad", "rocket"] as const).map((p, i) => (
                        <div
                          key={p}
                          className="size-7 rounded-full bg-white dark:bg-[#262626] border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center p-1 transition-transform group-hover:scale-105"
                          style={{ zIndex: 30 - i * 10, position: "relative" }}
                        >
                          <Image
                            src={PAYMENT_ACCOUNTS[p].logo}
                            alt={PAYMENT_ACCOUNTS[p].name}
                            width={18}
                            height={18}
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Banking Details */}
                {paymentMethod === "mobile" && (
                  <div className="space-y-3.5 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Provider selector: 3 cols grid, all fit in 1 line on mobile */}
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {(["bkash", "nagad", "rocket"] as const).map((p) => {
                        const acc = PAYMENT_ACCOUNTS[p];
                        return (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPaymentProvider(p)}
                            className={cn(
                              "py-2 px-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs w-full",
                              paymentProvider === p
                                ? `${acc.bg} ${acc.border} ${acc.color} ring-1 ring-current/30`
                                : "bg-white dark:bg-[#1f1f1f] border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-300 hover:border-slate-300"
                            )}
                          >
                            <Image src={acc.logo} alt={acc.name} width={16} height={16} className="object-contain shrink-0" />
                            <span className="truncate">{acc.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Account number with copy */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          {PAYMENT_ACCOUNTS[paymentProvider].name} নম্বর (Send Money)
                        </p>
                        <p className={cn("text-base sm:text-lg font-black font-mono mt-0.5", PAYMENT_ACCOUNTS[paymentProvider].color)}>
                          {PAYMENT_ACCOUNTS[paymentProvider].number}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">পরিমাণ: ৳{deliveryFee}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(PAYMENT_ACCOUNTS[paymentProvider].number)}
                        className="shrink-0 p-2 rounded-lg bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-[#303030] transition-colors cursor-pointer"
                      >
                        {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4 text-slate-500" />}
                      </button>
                    </div>

                    {/* Sender + TrxID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>প্রেরকের নম্বর *</label>
                        <input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={senderNumber}
                          onChange={(e) => setSenderNumber(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>ট্রানজেকশন ID *</label>
                        <input
                          type="text"
                          placeholder="যেমন: 8H6TY3ABCD"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Self pickup — no payment needed */
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-4 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">কোনো পেমেন্ট প্রয়োজন নেই</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">Self-Pickup নির্বাচিত — সরাসরি কাউন্টার থেকে বই নিন।</p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/80 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] p-5 sm:p-6 shadow-xs sticky top-24 space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-[#262626] pb-3">
                নির্বাচিত বইয়ের তালিকা ({totalItems} Books)
              </h3>

              {/* Mini Book List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-[#262626] pr-1">
                {items.map(({ book, quantity }) => (
                  <div key={book.productId} className="py-2.5 flex items-center gap-3">
                    <div className="relative size-12 shrink-0 rounded-lg overflow-hidden bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                      <Image src={book.thumbnail} alt={book.title} fill className="object-contain p-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{book.title}</h4>
                      <p className="text-[11px] text-[#1677ff]">{book.author}</p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#222] text-slate-600 dark:text-slate-300">
                      ×{quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-[#262626] text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>বই ধার মূল্য:</span>
                  <span className="font-bold text-emerald-600">বিনামূল্যে</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {deliveryFee > 0 ? `৳${deliveryFee}` : "বিনামূল্যে"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>ফেরত দেওয়ার তারিখ:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{formattedReturnDate}</span>
                </div>
                {paymentMethod === "mobile" && transactionId && (
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>পেমেন্ট স্ট্যাটাস:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">পরিশোধিত ✓</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 dark:border-[#262626] flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">সর্বমোট প্রদেয়:</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-[#1677ff] dark:text-[#4096ff]">
                      ৳{totalAmount}
                    </span>
                    {totalAmount === 0 && (
                      <p className="text-[10px] text-slate-400">(সম্পূর্ণ বিনামূল্যে)</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !pledgeAgreed}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all active:scale-[0.98] shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>প্রসেসিং হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4.5" />
                    <span>সাবমিট করুন</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
                <ShieldCheck className="size-3.5 text-emerald-500" />
                <span>বাছার গ্রন্থাগার ট্রাস্টি বোর্ড কর্তৃক অনুমোদিত</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
