"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  ShoppingBag,
  Laptop,
  TreePine,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Layers,
  Users,
  Search,
  ChevronRight,
  Package,
  Activity,
} from "lucide-react";

export interface AdminStatsData {
  totalUsers: number;
  totalFamilyMembers: number;
  pendingFamilyRequests: number;
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  recentFamilyRequests: Array<{
    _id: string;
    title: string;
    parentKey: string;
    parentName?: string;
    status: string;
    createdAt: string;
  }>;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    customerPhone: string;
    totalAmount?: number;
    status?: string;
    createdAt: string;
  }>;
}

interface AdminOverviewClientProps {
  stats: AdminStatsData;
  adminName: string;
}

export default function AdminOverviewClient({
  stats,
  adminName,
}: AdminOverviewClientProps) {
  const [filterQuery, setFilterQuery] = useState("");

  // ৫টি উইংসের তথ্য - সুনির্দিষ্ট ক্রম:
  // ১. লাইব্রেরি, ২. ফাউন্ডেশন, ৩. সুপার শপ, ৪. আইটি পার্ক, ৫. ফ্যামিলি ট্রি
  const wings = [
    {
      id: "library",
      serial: 1,
      title: "লাইব্রেরি (গ্রন্থাগার)",
      tagline: "ডিজিটাল ক্যাটালগ, বই ধার ও পাঠক ট্র্যাকিং",
      icon: BookOpen,
      adminHref: "/admin/library",
      publicHref: "/granthagar",
      status: "সক্রিয়",
      accentColor: "#1677ff",
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40",
      badgeColor: "blue",
      metrics: [
        { label: "ক্যাটালগ বই", value: "১২০+ টি" },
        { label: "পাঠক সদস্য", value: "৪৫ জন" },
        { label: "বই রিকোয়েস্ট", value: "০ টি" },
      ],
      quickLinks: [
        { label: "বই তালিকা", href: "/admin/library" },
        { label: "পাবলিক পেজ", href: "/granthagar", isExternal: true },
      ],
    },
    {
      id: "foundation",
      serial: 2,
      title: "ফাউন্ডেশন",
      tagline: "মানবসেবা, চিকিৎসা সহায়তা ও অনুদান ফান্ড",
      icon: Heart,
      adminHref: "/admin/foundation",
      publicHref: "/foundation",
      status: "সক্রিয়",
      accentColor: "#e11d48",
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40",
      badgeColor: "rose",
      metrics: [
        { label: "চলমান প্রজেক্ট", value: "৩ টি" },
        { label: "ভলান্টিয়ার", value: "২৮ জন" },
        { label: "আবেদন", value: "০ টি" },
      ],
      quickLinks: [
        { label: "ডোনেশন হিস্ট্রি", href: "/admin/foundation" },
        { label: "পাবলিক পেজ", href: "/foundation", isExternal: true },
      ],
    },
    {
      id: "shop",
      serial: 3,
      title: "সুপার শপ",
      tagline: "পণ্য সম্ভার, ইনভেন্টরি, অর্ডার ও ডেলিভারি",
      icon: ShoppingBag,
      adminHref: "/admin/shop",
      publicHref: "/super-shop",
      status: "সক্রিয়",
      accentColor: "#d97706",
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40",
      badgeColor: "gold",
      metrics: [
        { label: "ইনভেন্টরি পণ্য", value: `${stats.totalProducts} টি` },
        { label: "সর্বমোট অর্ডার", value: `${stats.totalOrders} টি` },
        { label: "পেন্ডিং অর্ডার", value: `${stats.pendingOrders} টি` },
      ],
      quickLinks: [
        { label: "অর্ডার ম্যানেজমেন্ট", href: "/admin/shop" },
        { label: "পাবলিক শপ", href: "/super-shop", isExternal: true },
      ],
    },
    {
      id: "it-park",
      serial: 4,
      title: "আইটি পার্ক",
      tagline: "প্রযুক্তি প্রশিক্ষণ, সফটওয়্যার ও ক্যারিয়ার সুযোগ",
      icon: Laptop,
      adminHref: "/admin/it-park",
      publicHref: "/it-park",
      status: "সক্রিয়",
      accentColor: "#9333ea",
      iconColor: "text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40",
      badgeColor: "purple",
      metrics: [
        { label: "আইটি কোর্স", value: "৪ টি" },
        { label: "শিক্ষার্থী", value: "৩২ জন" },
        { label: "প্রজেক্ট", value: "২ টি" },
      ],
      quickLinks: [
        { label: "কোর্স ও মেন্টরিং", href: "/admin/it-park" },
        { label: "পাবলিক পেজ", href: "/it-park", isExternal: true },
      ],
    },
    {
      id: "family-tree",
      serial: 5,
      title: "ফ্যামিলি ট্রি",
      tagline: "বংশলতিকা সদস্য, সম্পর্ক ম্যাপিং ও রেকর্ড",
      icon: TreePine,
      adminHref: "/admin/family-tree",
      publicHref: "/family-tree",
      status: "সক্রিয়",
      accentColor: "#059669",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40",
      badgeColor: "green",
      metrics: [
        { label: "নথিভুক্ত সদস্য", value: `${stats.totalFamilyMembers} জন` },
        { label: "পেন্ডিং রিকোয়েস্ট", value: `${stats.pendingFamilyRequests} টি` },
        { label: "প্রজন্ম বিস্তার", value: "৬ টি" },
      ],
      quickLinks: [
        { label: "সদস্য তালিকা ও ট্রি", href: "/admin/family-tree" },
        { label: "পাবলিক ভিউ", href: "/family-tree", isExternal: true },
      ],
    },
  ];

  const filteredWings = wings.filter(
    (w) =>
      w.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      w.tagline.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* ── 1. Top Admin Welcome Banner (Ant Design Dark/Light Theme) ── */}
      <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-5 sm:p-7 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1677ff] dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
              <Sparkles className="size-3.5" />
              <span>বাছার গ্রুপ সেন্ট্রাল অ্যাডমিন কন্ট্রোল</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              স্বাগতম, {adminName || "সুপার অ্যাডমিন"}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              সেন্ট্রাল অ্যাডমিন প্যানেল থেকে ৫টি ডিপার্টমেন্ট/উইংসের তথ্য, লাইভ ডেটাবেজ রেকর্ড ও অপারেশন পরিচালনা করুন।
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-center shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>সিস্টেম লাইভ ও স্বাভাবিক</span>
            </div>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-[#262626] text-slate-700 dark:text-slate-200 hover:text-blue-600 border border-slate-200 dark:border-[#333] transition-colors shadow-xs"
            >
              <Users className="size-3.5 text-blue-600" />
              <span>ইউজার কন্ট্রোল</span>
            </Link>
            <Link
              href="/admin/family-tree"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#1677ff] text-white hover:bg-blue-600 transition-colors shadow-xs"
            >
              <TreePine className="size-3.5" />
              <span>ফ্যামিলি ট্রি</span>
            </Link>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-[#2a2a2a] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <ShieldCheck className="size-4 text-[#1677ff] shrink-0" />
            <span>রোল: সুপার অ্যাডমিন</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Layers className="size-4 text-emerald-500 shrink-0" />
            <span>সক্রিয় উইংস: ৫ টি</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Users className="size-4 text-purple-500 shrink-0" />
            <span>মোট রেজিস্টার্ড ইউজার: {stats.totalUsers}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Clock className="size-4 text-amber-500 shrink-0" />
            <span>
              {stats.pendingFamilyRequests > 0
                ? `${stats.pendingFamilyRequests} টি পেন্ডিং অ্যাকশন`
                : "সব আবেদন আপডেট"}
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Global KPI Summary Row (Ant Design Cards) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              অ্যাক্টিভ উইংস
            </span>
            <div className="size-7 rounded-lg bg-blue-50 dark:bg-[#262626] flex items-center justify-center text-[#1677ff]">
              <Layers className="size-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ৫
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">টি</span>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ফ্যামিলি সদস্য
            </span>
            <div className="size-7 rounded-lg bg-emerald-50 dark:bg-[#262626] flex items-center justify-center text-emerald-600">
              <TreePine className="size-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {stats.totalFamilyMembers}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">জন</span>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              শপ অর্ডার
            </span>
            <div className="size-7 rounded-lg bg-amber-50 dark:bg-[#262626] flex items-center justify-center text-amber-600">
              <ShoppingBag className="size-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {stats.totalOrders}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">টি</span>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              মোট ইউজার
            </span>
            <div className="size-7 rounded-lg bg-purple-50 dark:bg-[#262626] flex items-center justify-center text-purple-600">
              <Users className="size-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {stats.totalUsers}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">জন</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              পেন্ডিং রিভিউ
            </span>
            <div className="size-7 rounded-lg bg-rose-50 dark:bg-[#262626] flex items-center justify-center text-rose-600">
              <AlertCircle className="size-4" />
            </div>
          </div>
          <div className="mt-2.5">
            <span className="text-xl sm:text-2xl font-bold text-rose-600 dark:text-rose-400">
              {stats.pendingFamilyRequests + stats.pendingOrders}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">টি অ্যাকশন</span>
          </div>
        </div>
      </div>

      {/* ── 3. The 5 Wings Overview Hub (Card Icon & Title CENTER ALIGNED) ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>বাছার গ্রুপের ৫টি উইংস ওভারভিউ</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#1677ff] font-semibold">
                ৫ টি সক্রিয়
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              প্রতিটি উইং-এর ডেডিকেটেড অ্যাডমিন কনসোল ও লাইভ অপারেশন পরিচালনা করুন
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="উইং খুঁজুন..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-[#1677ff] dark:focus:border-[#1677ff] transition-colors"
            />
          </div>
        </div>

        {/* 5 Wings Grid: 1 col on mobile, 2 cols on tablet, 3 cols on large screen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWings.map((wing) => {
            const Icon = wing.icon;
            return (
              <div
                key={wing.id}
                className="group rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:border-[#1677ff] dark:hover:border-[#1677ff] hover:shadow-[0_8px_20px_0_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Subtle Serial & Status Tag */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#262626] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-[#333]">
                    #{wing.serial} উইং
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {wing.status}
                  </span>
                </div>

                {/* ── CARD ICON & TITLE CENTER ALIGNED (Explicitly requested by USER) ── */}
                <div className="flex flex-col items-center text-center my-3">
                  <div
                    className={`size-16 sm:size-18 rounded-2xl flex items-center justify-center mb-3.5 transition-transform duration-300 group-hover:scale-105 shadow-xs ${wing.iconBg}`}
                  >
                    <Icon className={`size-8 sm:size-9 ${wing.iconColor}`} />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] dark:group-hover:text-[#1677ff] transition-colors">
                    {wing.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed mt-1.5">
                    {wing.tagline}
                  </p>
                </div>

                {/* 3 Metrics Chips */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 dark:border-[#2a2a2a] my-2">
                  {wing.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-100 dark:border-[#262626] p-2 text-center"
                    >
                      <span className="block text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {metric.label}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons (Center & Full Width Touch-friendly on mobile) */}
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href={wing.adminHref}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2 bg-[#1677ff] text-white hover:bg-blue-600 dark:bg-[#1677ff] dark:hover:bg-blue-600 transition-colors shadow-xs active:scale-[0.98]"
                  >
                    <span>অ্যাডমিন কন্ট্রোল</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                  <div className="flex items-center justify-between px-1 text-[11px]">
                    <span className="text-slate-400 dark:text-slate-500">
                      পাবলিক প্রিভিউ:
                    </span>
                    <Link
                      href={wing.publicHref}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors font-medium"
                    >
                      <span>ভিজিট করুন</span>
                      <ExternalLink className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Quick Attention / Recent Alerts Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
        {/* Family Tree Pending Requests Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-5 sm:p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TreePine className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  ফ্যামিলি ট্রি পেন্ডিং আবেদন
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  নতুন সদস্য যুক্ত হওয়ার আবেদন পর্যালোচনা
                </p>
              </div>
            </div>
            <Link
              href="/admin/family-tree"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>সকল আবেদন</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {stats.recentFamilyRequests.length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-slate-50/50 dark:bg-[#141414] border border-dashed border-slate-200 dark:border-[#2a2a2a]">
              <CheckCircle2 className="size-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                কোনো পেন্ডিং আবেদন নেই!
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                সকল ফ্যামিলি রিকোয়েস্ট আপডেট করা হয়েছে।
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.recentFamilyRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-100 dark:border-[#262626]"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {req.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      অভিভাবক: {req.parentName || req.parentKey}
                    </p>
                  </div>
                  <Link
                    href="/admin/family-tree"
                    className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100 transition-colors"
                  >
                    রিভিউ
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Super Shop Recent Orders Card */}
        <div className="rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-5 sm:p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShoppingBag className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  সুপার শপ সাম্প্রতিক অর্ডার
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  নতুন কেনাকাটা ও ডেলিভারি স্ট্যাটাস
                </p>
              </div>
            </div>
            <Link
              href="/admin/shop"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>সকল অর্ডার</span>
              <ChevronRight className="size-3.5" />
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <div className="py-8 text-center rounded-xl bg-slate-50/50 dark:bg-[#141414] border border-dashed border-slate-200 dark:border-[#2a2a2a]">
              <Package className="size-8 text-amber-500 mx-auto mb-2 opacity-80" />
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                সাম্প্রতিক কোনো অর্ডার নেই
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                সুপার শপের নতুন অর্ডার আসলে এখানে প্রদর্শিত হবে।
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.recentOrders.map((ord) => (
                <div
                  key={ord._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-100 dark:border-[#262626]"
                >
                  <div className="min-w-0 pr-3">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      অর্ডার #{ord.orderNumber}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      ফোন: {ord.customerPhone}
                    </p>
                  </div>
                  <Link
                    href="/admin/shop"
                    className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40 hover:bg-blue-100 transition-colors"
                  >
                    বিস্তারিত
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
