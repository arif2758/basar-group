import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  HandHeart,
  Receipt,
  FileText,
  Clock,
  ShieldCheck,
  PlusCircle,
  Users,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "ফাউন্ডেশন ড্যাশবোর্ড | BASAR Group",
  description: "আপনার অনুদান হিস্ট্রি, সাহায্যের আবেদন ও সমাজসেবা ট্র্যাকিং",
};

export default async function FoundationDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/foundation");
  }

  const donations: Array<{
    id: string;
    date: string;
    amount: number;
    fundType: string;
    status: string;
  }> = [];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner - Ant Design Theme */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
            <Heart className="size-3.5" />
            <span>ডিপার্টমেন্ট #২ — বাছার ফাউন্ডেশন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            ফাউন্ডেশন ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            আপনার দেওয়া অনুদানের ইতিহাস, মানি রিসিপ্ট, শিক্ষা/চিকিৎসা সহায়তার আবেদন ও সমাজকল্যাণমূলক কার্যক্রম পর্যবেক্ষণ করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/foundation"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-[#262626] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors whitespace-nowrap"
          >
            <HandHeart className="size-3.5 sm:size-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>অনুদান প্রদান</span>
          </Link>
          <Link
            href="/foundation"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs whitespace-nowrap"
          >
            <PlusCircle className="size-3.5 sm:size-4 shrink-0" />
            <span>সাহায্যের আবেদন</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3">
            <Heart className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">৳ ০</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">মোট অনুদান</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <Receipt className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">রিসিপ্ট ও ভাউচার</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <FileText className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">সহায়তা আবেদন</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Users className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">সক্রিয়</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">ভলান্টিয়ার স্ট্যাটাস</p>
        </div>
      </div>

      {/* Main Content Sections (Full width max-w-7xl, no right sidebar) */}
      <div className="space-y-6">
        {/* Donation History Section */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Receipt className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  আমার অনুদান হিস্ট্রি ও মানি রিসিপ্ট
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  যাকাত, ত্রাণ তহবিল বা শিক্ষা তহবিলে প্রদত্ত সকল দানের অফিসিয়াল বিবরণী
                </p>
              </div>
            </div>
            <Link
              href="/foundation"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>নতুন অনুদান দিন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {donations.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-3">
              <Heart className="size-10 text-slate-400 dark:text-slate-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                এখনো কোনো অনুদানের রেকর্ড পাওয়া যায়নি
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                বাছার ফাউন্ডেশনের উদ্যোগে দরিদ্র, অসহায় ও এতিমদের কল্যাণে আপনার হাত বাড়িয়ে দিন।
              </p>
              <Link
                href="/foundation"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors"
              >
                <span>ফাউন্ডেশন পেজে যান</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Aid Applications & Volunteering (2 equal columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aid Applications Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors text-center">
            <div className="space-y-3">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    সাহায্য বা বৃত্তির আবেদন
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    চিকিৎসা, শিক্ষা বা জরুরি ত্রাণ সহায়তার আবেদনের অবস্থা
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <Clock className="size-8 text-amber-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  কোনো চলমান আবেদন নেই
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  জরুরি পরিস্থিতিতে বাছার ফাউন্ডেশন পরিবারের পাশে দাঁড়াতে বদ্ধপরিকর।
                </p>
              </div>
            </div>

            <Link
              href="/foundation"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>নতুন আবেদনের ফর্ম</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Volunteering Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors text-center">
            <div className="space-y-3">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    ভলান্টিয়ারিং ও সমাজকল্যাণ
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    রক্তদান, শীতবস্ত্র বিতরণ ও ত্রাণ কার্যক্রমে সক্রিয় অংশগ্রহণ
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <ShieldCheck className="size-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  ভলান্টিয়ার টিম সক্রিয়
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  পরবর্তী মানবসেবা ইভেন্টে আপনার এলাকার জন্য অবদান রাখুন।
                </p>
              </div>
            </div>

            <Link
              href="/foundation"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>ভলান্টিয়ার নেটওয়ার্ক দেখুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
