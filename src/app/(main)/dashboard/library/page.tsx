import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  BookMarked,
  Clock,
  CheckCircle,
  Search,
  PlusCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "গ্রন্থাগার ড্যাশবোর্ড | BASAR Group",
  description: "আপনার ধার নেওয়া বই, রিডিং ট্র্যাকার ও বুক রিকোয়েস্ট ব্যবস্থাপনা",
};

export default async function LibraryDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/library");
  }

  // Placeholder data for demonstration - in production these come from DB
  const borrowedBooks: Array<{
    id: string;
    title: string;
    author: string;
    borrowDate: string;
    dueDate: string;
    status: "active" | "due_soon" | "overdue";
  }> = [];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner - Ant Design Theme */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
            <BookOpen className="size-3.5" />
            <span>ডিপার্টমেন্ট #১ — বাছার গ্রন্থাগার</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            গ্রন্থাগার ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            ধার নেওয়া বইয়ের তালিকা, জমা দেওয়ার শেষ তারিখ, ডিজিটাল রিডিং ট্র্যাকার এবং নতুন বইয়ের রিকোয়েস্ট ট্র্যাক করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/granthagar/books-catalog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-[#262626] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors"
          >
            <Search className="size-4 text-blue-600 dark:text-blue-400" />
            <span>ক্যাটালগ ব্রাউজ</span>
          </Link>
          <Link
            href="/granthagar/request-book"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs"
          >
            <PlusCircle className="size-4" />
            <span>বইয়ের রিকোয়েস্ট</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <BookOpen className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">ধার নেওয়া বই</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <CheckCircle className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">পড়া শেষ হয়েছে</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Clock className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">পেন্ডিং রিকোয়েস্ট</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors">
          <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <BookMarked className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">সক্রিয়</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">মেম্বারশিপ স্ট্যাটাস</p>
        </div>
      </div>

      {/* Main Content Sections (Full width max-w-7xl, no right sidebar) */}
      <div className="space-y-6">
        {/* Borrowed Books Section */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <BookOpen className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  বর্তমানে হাতে থাকা ধার নেওয়া বই
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  নির্ধারিত তারিখের মধ্যে বই ফেরত দিয়ে লাইব্রেরির শৃঙ্খলা বজায় রাখুন
                </p>
              </div>
            </div>
            <Link
              href="/granthagar/books-catalog"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>নতুন বই খুঁজুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {borrowedBooks.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-3">
              <BookOpen className="size-10 text-slate-400 dark:text-slate-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                বর্তমানে আপনার কোনো বই ধার নেওয়া নেই
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                আমাদের সমৃদ্ধ ক্যাটালগ থেকে যেকোনো ইসলামিক, সাহিত্য, ইতিহাস বা শিক্ষামূলক বই অনলাইনে ব্রাউজ করে ধার নিতে পারেন।
              </p>
              <Link
                href="/granthagar/books-catalog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors"
              >
                <span>বই ক্যাটালগে যান</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Reading Tracker & Book Requests (2 equal columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Reading Tracker Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <BookMarked className="size-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    ডিজিটাল রিডিং ট্র্যাকার
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    দৈনিক বা মাসিক পড়ার লক্ষ্যমাত্রা এবং অগ্রগতি
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <Sparkles className="size-8 text-emerald-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  রিডিং গোল শুরু করুন
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  আপনি যে বইগুলো বর্তমানে পড়ছেন তা ট্র্যাকার যোগ করুন।
                </p>
              </div>
            </div>

            <Link
              href="/granthagar/reading-tracker"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>রিডিং ট্র্যাকার খুলুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Book Request Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <PlusCircle className="size-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    নতুন বইয়ের আবেদন (Book Request)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    লাইব্রেরিতে যে বইটি আপনি দেখতে চান তার জন্য রিকোয়েস্ট পাঠান
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <BookOpen className="size-8 text-purple-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  কোনো পেন্ডিং রিকোয়েস্ট নেই
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  আমরা প্রতি মাসে পাঠকদের চাহিদামতো নতুন বই সংগ্রহ করি।
                </p>
              </div>
            </div>

            <Link
              href="/granthagar/request-book"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>নতুন বইয়ের জন্য আবেদন করুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
