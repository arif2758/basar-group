"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  MessageSquare,
  Copy,
  Check,
  Clock,
  PhoneCall,
  Truck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AccountClaimForm } from "./AccountClaimForm";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderNumber) {
      const cookiesArr = document.cookie.split("; ");
      const guestOrdersCookie = cookiesArr.find((row) =>
        row.startsWith("guest_orders=")
      );
      let existingOrders: string[] = [];
      if (guestOrdersCookie) {
        existingOrders = decodeURIComponent(
          guestOrdersCookie.split("=")[1]
        ).split(",");
      }
      if (!existingOrders.includes(orderNumber)) {
        existingOrders.push(orderNumber);
        document.cookie = `guest_orders=${encodeURIComponent(
          existingOrders.join(",")
        )}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
  }, [orderNumber]);

  const handleCopyOrder = () => {
    if (!orderNumber) return;
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    toast.success("অর্ডার নম্বর কপি করা হয়েছে!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16">
      <div className="max-w-2xl mx-auto text-center space-y-7">
        {/* Success Icon & Title */}
        <div className="flex flex-col items-center gap-3.5">
          <div className="size-20 rounded-full bg-[#f6ffed] dark:bg-[#162312] border-2 border-[#b7eb8f] dark:border-[#274916] flex items-center justify-center text-[#52c41a] dark:text-[#49aa19] shadow-sm">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            অর্ডার সফল হয়েছে!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            আপনার অর্ডারটি সফলভাবে রিসিভ করা হয়েছে। আমাদের প্রতিনিধি শীঘ্রই আপনাকে কল করে অর্ডারটি কনফার্ম করবেন।
          </p>
        </div>

        {/* Order Number Box with Copy */}
        {orderNumber && (
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-5 sm:p-6 rounded-2xl inline-flex flex-col items-center shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">
              আপনার অর্ডার নম্বর
            </p>
            <div className="flex items-center gap-2 bg-[#e6f4ff] dark:bg-[#111a2c] border border-[#91caff] dark:border-[#15325b] px-4 py-2 rounded-xl">
              <span className="text-xl sm:text-2xl font-black text-[#1677ff] dark:text-[#3c89e8] font-mono tracking-wider whitespace-nowrap">
                {orderNumber}
              </span>
              <button
                type="button"
                onClick={handleCopyOrder}
                className="size-8 flex items-center justify-center rounded-lg bg-white dark:bg-[#1f1f1f] border border-[#91caff] dark:border-[#15325b] text-[#1677ff] dark:text-[#3c89e8] hover:bg-[#e6f4ff] active:scale-95 transition-all cursor-pointer"
                title="কপি করুন"
              >
                {copied ? <Check className="size-4 text-[#52c41a]" /> : <Copy className="size-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Order Process Timeline */}
        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-xs text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 text-center">
            অর্ডার প্রসেসিং টাইমলাইন
          </h3>
          <div className="flex flex-row items-start justify-around gap-2">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-9 rounded-full bg-[#52c41a] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="size-4 stroke-[3]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">১. অর্ডার গ্রহণ</p>
                <p className="text-[10px] text-[#389e0d] dark:text-[#49aa19] font-medium">সফলভাবে গৃহীত</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-9 rounded-full bg-[#1677ff] text-white flex items-center justify-center shrink-0 animate-pulse shadow-xs">
                <PhoneCall className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">২. কনফার্মেশন কল</p>
                <p className="text-[10px] text-[#1677ff] dark:text-[#3c89e8] font-medium">শীঘ্রই কল আসবে</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-9 rounded-full bg-slate-200 dark:bg-[#303030] text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 shadow-xs">
                <Truck className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white">৩. ডেলিভারি</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">২৪–৪৮ ঘণ্টা</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/super-shop/products"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto rounded-xl h-12 px-6 font-bold text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] hover:border-[#1677ff] hover:text-[#1677ff] dark:hover:border-[#1668dc] dark:hover:text-[#3c89e8] shadow-xs cursor-pointer"
            )}
          >
            <ShoppingBag className="mr-2 size-4" />
            আরো কেনাকাটা করুন
          </Link>
          <Link
            href={
              orderNumber
                ? `/super-shop/track-order?order=${encodeURIComponent(orderNumber)}`
                : "/super-shop/track-order"
            }
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto rounded-xl h-12 px-6 font-bold text-white bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] dark:bg-[#1668dc] dark:hover:bg-[#3c89e8] shadow-[0_4px_14px_0_rgba(22,119,255,0.35)] cursor-pointer"
            )}
          >
            অর্ডার স্ট্যাটাস দেখুন
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        {/* Account Claiming Form for Guest Users */}
        {!session && orderNumber && (
          <AccountClaimForm orderNumber={orderNumber} />
        )}

        {/* WhatsApp Support */}
        <div className="pt-4 flex items-center justify-center">
          <a
            href="https://wa.me/8801568390014"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-[#f6ffed] dark:bg-[#162312] border border-[#b7eb8f] dark:border-[#274916] px-4 py-2 rounded-full inline-flex items-center gap-2 hover:bg-[#e6f7d9] transition-all shadow-xs"
          >
            <MessageSquare className="size-4 text-emerald-600 dark:text-emerald-400" />
            কোনো সমস্যা? WhatsApp সাপোর্ট এ কথা বলুন
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20 text-center">লোডিং...</div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
