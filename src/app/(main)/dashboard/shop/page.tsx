import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import { formatPrice } from "@/lib/priceUtils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ClearGuestOrdersCookie } from "@/components/dashboard/ClearGuestOrdersCookie";
import {
  ShoppingBag,
  MapPin,
  Heart,
  User as UserIcon,
  ArrowRight,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  ListOrdered,
  CreditCard,
  Search,
  ShoppingCart,
  Receipt,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const metadata = {
  title: "সুপার শপ ড্যাশবোর্ড | BASAR Group",
  description: "আপনার গ্যাজেট ও সুপার শপ অর্ডার ট্র্যাকিং, উইশলিস্ট এবং অ্যাকাউন্ট পরিচালনা",
};

export const dynamic = "force-dynamic";

const STATUS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  confirmed: CheckCircle2,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: Package,
};

const STATUS_BADGES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  pending: {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-900/40",
    label: "পেন্ডিং",
  },
  confirmed: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-900/40",
    label: "নিশ্চিত",
  },
  processing: {
    bg: "bg-indigo-50 dark:bg-indigo-950/40",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-900/40",
    label: "প্রসেসিং",
  },
  shipped: {
    bg: "bg-purple-50 dark:bg-purple-950/40",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-900/40",
    label: "শিপড",
  },
  delivered: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-900/40",
    label: "ডেলিভার্ড",
  },
  cancelled: {
    bg: "bg-rose-50 dark:bg-rose-950/40",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-900/40",
    label: "বাতিল",
  },
};

interface RecentOrderData {
  _id: string;
  orderNumber: string;
  orderStatus: string;
  total: number;
  advancePaid?: number;
  createdAt: string;
}

async function getDashboardStats(userId: string) {
  await dbConnect();

  const userRecord = await User.findById(userId)
    .select("wishlist mobile")
    .lean<{ wishlist?: string[]; mobile?: string }>();

  // 1. Link guest orders by phone number
  if (userRecord?.mobile) {
    await Order.updateMany(
      { user: { $exists: false }, customerPhone: userRecord.mobile },
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

  const [orderCount, activeOrdersCount, recentOrders] = await Promise.all([
    Order.countDocuments({ user: userId }),
    Order.countDocuments({
      user: userId,
      orderStatus: { $in: ["pending", "confirmed", "processing", "shipped"] },
    }),
    Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("_id orderNumber orderStatus total advancePaid createdAt")
      .lean(),
  ]);

  return {
    orderCount,
    activeOrdersCount,
    wishlistCount: userRecord?.wishlist?.length || 0,
    recentOrders: JSON.parse(JSON.stringify(recentOrders)) as RecentOrderData[],
    hasGuestOrders: !!guestOrdersVal,
  };
}

export default async function ShopDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/shop");
  }

  const stats = await getDashboardStats(session.user.id!);
  const displayName = session.user.name || session.user.fullname || "সম্মানিত গ্রাহক";

  return (
    <div className="w-full space-y-8 pb-12 transition-colors">
      {stats.hasGuestOrders && <ClearGuestOrdersCookie />}

      {/* ── Greeting Banner (Ant Design Default Theme) ────────────────────── */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40">
            <ShoppingBag className="size-3.5" />
            <span>ডিপার্টমেন্ট #৩ — বাছার সুপার শপ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            স্বাগতম, {displayName}! 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            আপনার গ্যাজেট ও সুপার শপের সকল অর্ডার, ট্র্যাকিং স্ট্যাটাস, উইশলিস্ট এবং সংরক্ষিত ঠিকানা সহজে পরিচালনা করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/super-shop"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-[#262626] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors"
          >
            <ShoppingCart className="size-4 text-amber-600 dark:text-amber-400" />
            <span>শপ ভিজিট করুন</span>
          </Link>
          <Link
            href="/super-shop/track-order"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
          >
            <Truck className="size-4" />
            <span>অর্ডার ট্র্যাকিং</span>
          </Link>
        </div>
      </div>

      {/* ── Stats Highlights Strip ────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] dark:text-blue-400 flex items-center justify-center mb-3">
            <ShoppingBag className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.orderCount} টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">মোট অর্ডার</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Clock className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeOrdersCount} টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">চলমান অর্ডার</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
            <Heart className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.wishlistCount} টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">পছন্দের পণ্য (Wishlist)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle2 className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">সক্রিয়</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">গ্রাহক স্ট্যাটাস</p>
        </div>
      </div>

      {/* ── Quick Navigation Cards ────────────────────── */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          কুইক নেভিগেশন
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* My Orders */}
          <Link
            href="/dashboard/shop/orders"
            className="group p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-[#1677ff] dark:hover:border-[#1677ff] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#1677ff] dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShoppingBag className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors">
                  আমার অর্ডারসমূহ
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  অর্ডার ট্র্যাকিং ও বিস্তারিত তালিকা
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-[#1677ff]">
              <span>অর্ডার দেখুন</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Wishlist */}
          <Link
            href="/super-shop/wishlist"
            className="group p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-rose-400 dark:hover:border-rose-500 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="size-11 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Heart className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  পছন্দের পণ্য (Wishlist)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  সংরক্ষিত প্রিয় গ্যাজেট তালিকা
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>উইশলিস্ট খুলুন</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Addresses */}
          <Link
            href="/dashboard/shop/addresses"
            className="group p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-emerald-400 dark:hover:border-emerald-500 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="size-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  ডেলিভারি ঠিকানা
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  বাসা ও অফিসের শিপিং অ্যাড্রেস
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>ঠিকানা দেখুন</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Profile */}
          <Link
            href="/dashboard/profile"
            className="group p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-purple-400 dark:hover:border-purple-500 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="size-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserIcon className="size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  প্রোফাইল সেটিংস
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  ব্যক্তিগত তথ্য ও ফোন নম্বর
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>প্রোফাইলে যান</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* ── Two Columns: Recent Orders & Quick Support ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Orders (2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="size-5 text-[#1677ff]" />
              <span>সাম্প্রতিক অর্ডার ও স্ট্যাটাস</span>
            </h2>
            <Link
              href="/dashboard/shop/orders"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>সবগুলো অর্ডার দেখুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-5 space-y-3 transition-colors">
            {stats.recentOrders.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                {stats.recentOrders.map((order) => {
                  const badge = STATUS_BADGES[order.orderStatus] || STATUS_BADGES.pending;
                  const StatusIcon = STATUS_ICONS[order.orderStatus] || Clock;

                  return (
                    <Link
                      key={order._id}
                      href={`/dashboard/shop/orders/${order._id}`}
                      className="group py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-[#262626]/60 px-3 -mx-3 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={cn(
                            "size-10 rounded-xl flex items-center justify-center shrink-0 border",
                            badge.bg,
                            badge.text,
                            badge.border
                          )}
                        >
                          <StatusIcon className="size-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors truncate">
                            অর্ডার #{order.orderNumber}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {format(new Date(order.createdAt), "dd MMM, yyyy")}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {formatPrice(Math.max(0, order.total - (order.advancePaid || 0)))}
                          </p>
                          <span
                            className={cn(
                              "inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border mt-0.5",
                              badge.bg,
                              badge.text,
                              badge.border
                            )}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <ChevronRight className="size-4 text-slate-400 group-hover:text-[#1677ff] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 px-4 rounded-xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-3">
                <ListOrdered className="size-10 text-slate-400 dark:text-slate-500 mx-auto opacity-70" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  আপনার কোনো সাম্প্রতিক অর্ডার নেই
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  আমাদের সুপার শপ থেকে প্রিমিয়াম গ্যাজেট, স্মার্টওয়াচ ও নিত্যপ্রয়োজনীয় পণ্য সহজে অর্ডার করুন।
                </p>
                <Link
                  href="/super-shop"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
                >
                  <ShoppingCart className="size-3.5" />
                  <span>কেনাকাটা শুরু করুন</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Tracking & Fast Info */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="size-5 text-amber-500" />
            <span>লাইভ পার্সেল ট্র্যাকিং</span>
          </h2>

          <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-5 space-y-4 transition-colors">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              আপনার কাছে থাকা ইনভয়েস নম্বর বা মোবাইল নম্বর দিয়ে পার্সেলের বর্তমান লোকেশন রিয়েলটাইমে ট্র্যাক করুন।
            </p>
            <form action="/super-shop/track-order" method="GET" className="space-y-3">
              <input
                type="text"
                name="orderId"
                placeholder="অর্ডার নম্বর দিন (যেমন: BG-1002)"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1677ff] transition-colors"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
              >
                <Search className="size-3.5" />
                <span>পার্সেল ট্র্যাক করুন</span>
              </button>
            </form>
          </div>

          {/* Payment & Invoice Card */}
          <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-5 space-y-3 transition-colors">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Receipt className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  ইনভয়েস ও মানি রিসিট
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  অর্ডারের ডিজিটাল ইনভয়েস ডাউনলোড
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/shop/orders"
              className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>অর্ডারের তালিকা দেখুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
