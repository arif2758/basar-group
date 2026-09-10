import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { formatPrice } from "@/lib/priceUtils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClearGuestOrdersCookie } from "@/components/dashboard/ClearGuestOrdersCookie";
import { OrderItemThumbnail } from "@/components/dashboard/OrderItemThumbnail";
import {
  ShoppingBag,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Receipt,
} from "lucide-react";

export const metadata = {
  title: "আমার অর্ডারসমূহ (My Orders) | BASAR Group Super Shop",
  description: "আপনার সকল অর্ডারের লাইভ ট্র্যাকিং ও বিস্তারিত তথ্য",
};

export const dynamic = "force-dynamic";

const STATUS_STEPS = [
  { id: "pending", label: "পেন্ডিং", icon: Clock },
  { id: "confirmed", label: "কনফার্মড", icon: CheckCircle2 },
  { id: "processing", label: "প্রসেসিং", icon: Package },
  { id: "shipped", label: "শিপড", icon: Truck },
  { id: "delivered", label: "ডেলিভার্ড", icon: CheckCircle2 },
];

interface OrderItemData {
  productImage?: string;
  productTitle: string;
  unitPrice: number;
  itemQuantity: number;
}

interface OrderData {
  _id: string;
  orderNumber: string;
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  total: number;
  discount?: number;
  vipPrivilege?: number;
  advancePaid?: number;
  createdAt: string;
  items: OrderItemData[];
}

async function getUserOrders(userId: string): Promise<OrderData[]> {
  await dbConnect();

  // 1. Link guest orders by phone number
  const dbUser = await User.findById(userId).select("mobile").lean<{ mobile?: string }>();
  if (dbUser?.mobile) {
    await Order.updateMany(
      { user: { $exists: false }, customerPhone: dbUser.mobile },
      { user: userId }
    );
  }

  // 2. Link guest orders stored in cookies
  const cookieStore = await cookies();
  const guestOrdersVal = cookieStore.get("guest_orders")?.value;
  if (guestOrdersVal) {
    const orderNumbers = guestOrdersVal.split(",");
    if (orderNumbers.length > 0) {
      await Order.updateMany(
        { orderNumber: { $in: orderNumbers }, user: { $exists: false } },
        { user: userId }
      );
    }
  }

  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(orders));
}

export default async function UserOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/shop/orders");
  }

  const orders = await getUserOrders(session.user.id!);
  const cookieStore = await cookies();
  const guestOrdersVal = cookieStore.get("guest_orders")?.value;

  return (
    <div className="w-full space-y-6 pb-12 transition-colors">
      {guestOrdersVal && <ClearGuestOrdersCookie />}

      {/* Back button & Header */}
      <div className="space-y-4">
        <Link
          href="/dashboard/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1677ff] dark:text-slate-400 dark:hover:text-[#1677ff] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>সুপার শপ ড্যাশবোর্ডে ফিরে যান</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
              <ShoppingBag className="size-6 text-[#1677ff]" />
              <span>আমার অর্ডারসমূহ (My Orders)</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              আপনার চলমান ও অতীতের সকল অর্ডারের লাইভ ট্র্যাকিং ও বিস্তারিত তালিকা।
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] shrink-0 self-start sm:self-auto">
            <span className="size-2 rounded-full bg-[#1677ff]" />
            <span>মোট অর্ডার: {orders.length} টি</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4">
          <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] dark:text-blue-400 flex items-center justify-center mx-auto">
            <Package className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              কোনো অর্ডারের রেকর্ড পাওয়া যায়নি
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              আপনি এখনো কোনো পণ্য অর্ডার করেননি। আমাদের সুপার শপ থেকে আপনার পছন্দের গ্যাজেটটি বেছে নিন।
            </p>
          </div>
          <Link
            href="/super-shop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
          >
            <ShoppingBag className="size-4" />
            <span>কেনাকাটা শুরু করুন</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const currentStatus = order.orderStatus || "pending";
            const currentStepIndex = STATUS_STEPS.findIndex((s) => s.id === currentStatus);

            return (
              <div
                key={order._id}
                className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden transition-colors"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#1a1a1a]/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
                      <Package className="size-5 text-[#1677ff]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          অর্ডার #{order.orderNumber}
                        </p>
                        {Boolean((order.vipPrivilege && order.vipPrivilege > 0) || (order.discount && order.discount > 0)) && (
                          <span className="text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-900/40">
                            🌟 VIP ছাড়
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        অর্ডার তারিখ: {format(new Date(order.createdAt), "dd MMM, yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {order.advancePaid && order.advancePaid > 0 ? "বাকি পরিশোধ (COD)" : "মোট মূল্য"}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {formatPrice(Math.max(0, order.total - (order.advancePaid || 0)))}
                    </p>
                    {Boolean(order.advancePaid && order.advancePaid > 0) && (
                      <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        অগ্রিম পরিশোধ: {formatPrice(order.advancePaid || 0)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tracking Stepper (If not cancelled or returned) */}
                {currentStatus !== "cancelled" && currentStatus !== "returned" ? (
                  <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-[#262626]">
                    <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                      {/* Connecting Line */}
                      <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 dark:bg-[#303030] -z-0" />
                      <div
                        className="absolute left-4 top-4 h-0.5 bg-[#1677ff] transition-all duration-700 -z-0"
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

                {/* Ordered Items Preview */}
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                    {order.items?.map((item, i) => (
                      <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <OrderItemThumbnail
                            src={item.productImage}
                            alt={item.productTitle}
                            size="md"
                          />
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                              {item.productTitle}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {formatPrice(item.unitPrice)} × {item.itemQuantity}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                            {formatPrice(item.unitPrice * item.itemQuantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#1a1a1a]/50 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/super-shop/track-order?orderId=${order.orderNumber}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1677ff] hover:underline"
                  >
                    <Truck className="size-3.5" />
                    <span>লাইভ পার্সেল ট্র্যাক করুন</span>
                  </Link>

                  <Link
                    href={`/dashboard/shop/orders/${order._id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#303030] transition-colors shadow-xs"
                  >
                    <span>ইনভয়েস ও বিস্তারিত</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
