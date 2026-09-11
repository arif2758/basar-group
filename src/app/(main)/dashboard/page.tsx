import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Crown,
  Star,
  TreePine,
  ArrowRight,
  BookOpen,
  Heart,
  ShoppingBag,
  Laptop,
  Sparkles,
  ExternalLink,
  Activity,
  CheckCircle2,
} from "lucide-react";
import mongoose from "mongoose";
import { User as UserModel } from "@/models/User";
import { FamilyRequestModel } from "@/models/FamilyRequest";
import { FamilyMemberModel } from "@/models/FamilyMember";

// Ensure Mongoose is connected
async function connectToDB() {
  if (mongoose.connection.readyState >= 1) return;
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");
  return mongoose.connect(process.env.MONGODB_URI);
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  await connectToDB();

  // Fetch full user data to check genId and other stats
  const dbUser = await UserModel.findOne({ email: session.user.email }).lean();
  const isAdmin = session.user.role === "ADMIN" || session.user.role === "admin";
  const isLinked = !!dbUser?.genId;

  // Admin stats if admin
  let pendingRequests = 0;
  let totalMembers = 0;
  if (isAdmin) {
    pendingRequests = await FamilyRequestModel.countDocuments({ status: "pending" });
    totalMembers = await FamilyMemberModel.countDocuments({});
  }

  // Account tier styling (Ant Design style)
  let TierIcon = Crown;
  let tierLabel = "রয়েল মেম্বার";
  let tierBadge = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40";

  if (dbUser?.accountType === "PREMIUM") {
    TierIcon = Star;
    tierLabel = "প্রিমিয়াম মেম্বার";
    tierBadge = "bg-blue-50 text-[#1677ff] dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40";
  }

  const displayName = session.user.name || session.user.fullname || "ইউজার";

  // ৪টি ডিপার্টমেন্টের সুনির্দিষ্ট তথ্য (ক্রম: ১. গ্রন্থাগার, ২. ফাউন্ডেশন, ৩. সুপার শপ, ৪. আইটি পার্ক)
  const departments = [
    {
      id: "library",
      serial: 1,
      title: "গ্রন্থাগার ড্যাশবোর্ড",
      tagline: "বই পড়া, ধার নেওয়া ও ডিজিটাল বুক ট্র্যাকার",
      icon: BookOpen,
      dashboardHref: "/dashboard/library",
      publicHref: "/granthagar",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-[#262626] border border-blue-100 dark:border-[#303030]",
      metrics: [
        { label: "ধার নেওয়া বই", value: "০ টি" },
        { label: "পড়া শেষ", value: "০ টি" },
        { label: "বুক রিকোয়েস্ট", value: "০ টি" },
      ],
      quickActions: [
        { label: "বই তালিকা ও ট্র্যাকার", href: "/dashboard/library" },
        { label: "ক্যাটালগ ব্রাউজ", href: "/granthagar/books-catalog" },
        { label: "নতুন বই রিকোয়েস্ট", href: "/granthagar/request-book" },
      ],
    },
    {
      id: "foundation",
      serial: 2,
      title: "ফাউন্ডেশন ড্যাশবোর্ড",
      tagline: "মানবসেবা, অনুদান হিস্ট্রি ও সমাজকল্যাণ",
      icon: Heart,
      dashboardHref: "/dashboard/foundation",
      publicHref: "/foundation",
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-[#262626] border border-rose-100 dark:border-[#303030]",
      metrics: [
        { label: "মোট অনুদান", value: "৳ ০" },
        { label: "আবেদনের স্ট্যাটাস", value: "০ টি" },
        { label: "ভলান্টিয়ারিং", value: "সক্রিয়" },
      ],
      quickActions: [
        { label: "ডোনেশন হিস্ট্রি", href: "/dashboard/foundation" },
        { label: "অনুদান প্রদান", href: "/foundation" },
        { label: "সাহায্যের আবেদন", href: "/foundation" },
      ],
    },
    {
      id: "shop",
      serial: 3,
      title: "সুপার শপ ড্যাশবোর্ড",
      tagline: "অর্ডার ট্র্যাকিং, ডেলিভারি ও পছন্দের পণ্য",
      icon: ShoppingBag,
      dashboardHref: "/dashboard/shop",
      publicHref: "/super-shop",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-[#262626] border border-amber-100 dark:border-[#303030]",
      metrics: [
        { label: "চলমান অর্ডার", value: "০ টি" },
        { label: "পছন্দের তালিকা", value: "০ টি" },
        { label: "রিওয়ার্ড পয়েন্ট", value: "০" },
      ],
      quickActions: [
        { label: "অর্ডার ট্র্যাকিং", href: "/dashboard/shop" },
        { label: "উইশলিস্ট", href: "/super-shop/wishlist" },
        { label: "শপ হোমপেজ", href: "/super-shop" },
      ],
    },
    {
      id: "it-park",
      serial: 4,
      title: "আইটি পার্ক ড্যাশবোর্ড",
      tagline: "প্রযুক্তি দক্ষতা, কোর্স অগ্রগতি ও ক্যারিয়ার",
      icon: Laptop,
      dashboardHref: "/dashboard/it-park",
      publicHref: "/it-park",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-[#262626] border border-purple-100 dark:border-[#303030]",
      metrics: [
        { label: "এনরোল করা কোর্স", value: "০ টি" },
        { label: "চাকরির আবেদন", value: "০ টি" },
        { label: "সার্টিফিকেট", value: "০ টি" },
      ],
      quickActions: [
        { label: "আমার কোর্সসমূহ", href: "/dashboard/it-park" },
        { label: "ক্যারিয়ার ও চাকরি", href: "/it-park#jobs" },
        { label: "দক্ষতা উন্নয়ন", href: "/it-park#skills" },
      ],
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* ── Welcome Hero Card (Ant Design Theme) ────────────────────── */}
      <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-6 sm:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-colors">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="space-y-2.5 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1677ff] dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
              <Sparkles className="size-3.5" />
              <span>BASAR Group ইন্টিগ্রেটেড ড্যাশবোর্ড</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              স্বাগতম, {displayName}! 👋
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mx-auto">
              আপনার কেন্দ্রীয় ড্যাশবোর্ড থেকে বাছার গ্রুপের ৪টি ডিপার্টমেন্টের সার্ভিস, ট্র্যাকিং ও প্রোফাইল পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center justify-between w-full gap-3 pt-1">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold ${tierBadge}`}>
              <TierIcon className="size-3.5" />
              <span>{tierLabel}</span>
            </div>
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40 hover:bg-rose-100 transition-colors"
              >
                <ShieldCheck className="size-3.5 text-rose-600" />
                <span>সুপার অ্যাডমিন</span>
              </Link>
            )}
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#2a2a2a] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
            <span>অ্যাকাউন্ট ভেরিফায়েড</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <TreePine className="size-4 text-emerald-500 shrink-0" />
            <span>{isLinked ? `ফ্যামিলি ট্রি: Gen ${dbUser?.genId}` : "ফ্যামিলি ট্রিতে যুক্ত নন"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <User className="size-4 text-blue-500 shrink-0" />
            <span>রোল: {session.user.role || "USER"}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Sparkles className="size-4 text-amber-500 shrink-0" />
            <span>৪টি ডিপার্টমেন্ট সক্রিয়</span>
          </div>
        </div>
      </div>

      {/* ── ৪টি ডিপার্টমেন্ট কার্ড (ক্রম অনুযায়ী, ফুল-উইথ, নো রাইট সাইডবার) ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              ডিপার্টমেন্ট অনুযায়ী ড্যাশবোর্ড
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              যেকোনো ডিপার্টমেন্টের ড্যাশবোর্ডে প্রবেশ করে বিস্তারিত তথ্য পরিচালনা করুন
            </p>
          </div>
        </div>

        {/* 2x2 Grid (Ant Design Card Styling) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                className="group rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#1677ff] dark:hover:border-[#1677ff] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${dept.iconBg}`}>
                        <Icon className={`size-5 ${dept.iconColor}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#262626] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-[#333]">
                            #{dept.serial}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors">
                            {dept.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {dept.tagline}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={dept.publicHref}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#262626] transition-colors"
                      title="পাবলিক পেজ দেখুন"
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                  </div>

                  {/* Metrics Snapshot Grid */}
                  <div className="grid grid-cols-3 gap-2.5 my-5">
                    {dept.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-[#262626] border border-slate-100 dark:border-[#303030] text-center"
                      >
                        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {m.value}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Quick Action Links */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      দ্রুত লিঙ্কসমূহ
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dept.quickActions.map((qa) => (
                        <Link
                          key={qa.label}
                          href={qa.href}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 dark:bg-[#262626] border border-slate-200/80 dark:border-[#333] hover:border-[#1677ff] text-slate-700 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-blue-400 transition-colors"
                        >
                          <span>{qa.label}</span>
                          <ArrowRight className="size-3 opacity-40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#2a2a2a]">
                  <Link
                    href={dept.dashboardHref}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-xs transition-colors"
                  >
                    <span>{dept.title} খুলুন</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Family Tree & Account Status Card (Full Width, AntD Theme) ── */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div className="flex items-start gap-4">
          <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${isLinked ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40" : "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40"}`}>
            <TreePine className="size-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                ফ্যামিলি ট্রি সংযোগ স্ট্যাটাস
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isLinked ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"}`}>
                {isLinked ? "সংযুক্ত" : "অসম্পূর্ণ"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {isLinked
                ? `আপনার প্রোফাইলটি বাছার পরিবারের বংশলতিকায় সংযুক্ত রয়েছে (জেনারেশন আইডি: ${dbUser.genId})।`
                : "আপনার অ্যাকাউন্টটি এখনো ফ্যামিলি ট্রিতে যুক্ত করা হয়নি। ট্রিতে যুক্ত হতে একটি রিকোয়েস্ট পাঠান।"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
          <Link
            href="/dashboard/profile"
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
          >
            <User className="size-3.5" />
            <span>প্রোফাইল সেটিংস</span>
          </Link>
          <Link
            href={isLinked ? "/family-tree" : "/dashboard/requests"}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-xs transition-colors"
          >
            <span>{isLinked ? "ট্রি দেখুন" : "রিকোয়েস্ট পাঠান"}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Admin Overview (If Admin) ────────────────────────────── */}
      {isAdmin && (
        <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-blue-200 dark:border-blue-900/40 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
          <div className="flex items-center gap-4">
            <div className="size-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0">
              <Activity className="size-5 text-[#1677ff]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                সুপার অ্যাডমিন সামারি
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                পেন্ডিং রিকোয়েস্ট: {pendingRequests} টি | মোট নিবন্ধিত সদস্য: {totalMembers} জন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/family-tree"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-semibold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-xs transition-colors"
            >
              <ShieldCheck className="size-3.5" />
              <span>ফ্যামিলি ট্রি ম্যানেজমেন্ট</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
