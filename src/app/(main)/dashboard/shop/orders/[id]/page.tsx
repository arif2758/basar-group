import React from "react";
import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import { formatPrice } from "@/lib/priceUtils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { OrderItemThumbnail } from "@/components/dashboard/OrderItemThumbnail";
import {
  Package,
  Truck,
  Clock,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  CreditCard,
  Calendar,
  Receipt,
  Phone,
  User,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "অর্ডারের বিস্তারিত | BASAR Group Super Shop",
  description: "অর্ডার ডিটেইলস ও ইনভয়েস সামারি",
};

export const dynamic = "force-dynamic";

const STATUS_STEPS = [
  { id: "pending", label: "পেন্ডিং", icon: Clock },
  { id: "confirmed", label: "কনফার্মড", icon: CheckCircle2 },
  { id: "processing", label: "প্রসেসিং", icon: Package },
  { id: "shipped", label: "শিপড", icon: Truck },
  { id: "delivered", label: "ডেলিভার্ড", icon: CheckCircle2 },
];

export default async function UserOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/shop/orders");

  const { id } = await params;
  await dbConnect();

  const order = await Order.findOne({
    _id: id,
    user: session.user.id,
  }).lean();

  if (!order) notFound();

  const currentStatus = order.orderStatus || "pending";
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.id === currentStatus);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-12 transition-colors">
      {/* Back button */}
      <Link
        href="/dashboard/shop/orders"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1677ff] dark:text-slate-400 dark:hover:text-[#1677ff] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        <span>সকল অর্ডারে ফিরে যান</span>
      </Link>

      {/* Header Card */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              অর্ডার #{order.orderNumber}
            </h1>
            {Boolean((order.vipPrivilege && order.vipPrivilege > 0) || (order.discount && order.discount > 0)) && (
              <span className="text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/40">
                🌟 VIP
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>অর্ডারের তারিখ: {format(new Date(order.createdAt), "dd MMMM, yyyy, hh:mm a")}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-xs font-semibold text-[#1677ff] dark:text-blue-400 shrink-0 self-start sm:self-auto">
          <CheckCircle2 className="size-4" />
          <span className="uppercase tracking-wide">{order.orderStatus}</span>
        </div>
      </div>

      {/* Tracking Progress Stepper */}
      {currentStatus !== "cancelled" && currentStatus !== "returned" ? (
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="size-4 text-[#1677ff]" />
            <span>ডেলিভারি ট্র্যাকিং স্ট্যাটাস</span>
          </h2>
          <div className="relative flex items-center justify-between max-w-xl mx-auto pt-2">
            <div className="absolute left-4 right-4 top-5 h-0.5 bg-slate-200 dark:bg-[#303030] -z-0" />
            <div
              className="absolute left-4 top-5 h-0.5 bg-[#1677ff] transition-all duration-700 -z-0"
              style={{
                width: `${Math.max(0, (currentStepIndex / (STATUS_STEPS.length - 1)) * 90)}%`,
              }}
            />

            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      isCompleted
                        ? "bg-[#1677ff] border-[#1677ff] text-white shadow-xs"
                        : "bg-white dark:bg-[#1f1f1f] border-slate-300 dark:border-[#303030] text-slate-400"
                    )}
                  >
                    <StepIcon className="size-3.5" />
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-medium text-center",
                      isCurrent
                        ? "text-[#1677ff] font-bold"
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
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Items (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Ordered Items */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="size-4 text-[#1677ff]" />
              <span>অর্ডারের পণ্যসমূহ ({order.items?.length || 0} টি আইটেম)</span>
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-[#262626]">
              {order.items?.map((item: any, i: number) => (
                <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <OrderItemThumbnail
                      src={item.productImage}
                      alt={item.productTitle}
                      size="lg"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {item.productTitle}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {formatPrice(item.unitPrice)} × {item.itemQuantity}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {formatPrice(item.unitPrice * item.itemQuantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Shipping Info */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="size-4 text-emerald-500" />
              <span>ডেলিভারি ঠিকানা ও প্রাপকের তথ্য</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">প্রাপকের নাম:</p>
                <p className="font-semibold text-slate-900 dark:text-white">{order.shipping?.name || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500 dark:text-slate-400">মোবাইল নম্বর:</p>
                <p className="font-semibold text-slate-900 dark:text-white">{order.shipping?.phone || order.customerPhone}</p>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <p className="text-slate-500 dark:text-slate-400">ডেলিভারি ঠিকানা:</p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {order.shipping?.addressLine1}
                  {order.shipping?.city ? `, ${order.shipping.city}` : ""}
                  {order.shipping?.district ? `, ${order.shipping.district}` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Billing Summary (1 col) */}
        <div className="space-y-6">
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="size-4 text-[#1677ff]" />
              <span>পেমেন্ট ও বিলিং সারাংশ</span>
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>সাবটোটাল</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.shippingCost || 0)}</span>
              </div>
              {Boolean(order.discount && order.discount > 0) && (
                <div className="flex justify-between text-rose-600 dark:text-rose-400">
                  <span>ডিসকাউন্ট</span>
                  <span className="font-semibold">- {formatPrice(order.discount || 0)}</span>
                </div>
              )}
              {Boolean(order.advancePaid && order.advancePaid > 0) && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>অগ্রিম পরিশোধ</span>
                  <span className="font-semibold">- {formatPrice(order.advancePaid || 0)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>বাকি পরিশোধ (COD)</span>
                <span className="text-[#1677ff]">{formatPrice(Math.max(0, order.total - (order.advancePaid || 0)))}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">পেমেন্ট মেথড:</span>
                <span className="font-semibold text-slate-900 dark:text-white uppercase">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">পেমেন্ট স্ট্যাটাস:</span>
                <span className="font-semibold text-slate-900 dark:text-white uppercase">{order.paymentStatus}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-center space-y-2">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              অর্ডার সংক্রান্ত যেকোনো সহায়তায়
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              আমাদের সাপোর্ট হেল্পলাইনে সরাসরি যোগাযোগ করুন।
            </p>
            <a
              href="tel:+8801700000000"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#303030] transition-colors"
            >
              <Phone className="size-3.5 text-emerald-500" />
              <span>হটলাইন সাপোর্ট</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
