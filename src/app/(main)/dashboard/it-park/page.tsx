import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Laptop,
  Briefcase,
  Award,
  GraduationCap,
  Calendar,
  ArrowRight,
  Code,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "আইটি পার্ক ড্যাশবোর্ড | BASAR Group",
  description: "আপনার প্রযুক্তি দক্ষতা, কোর্স অগ্রগতি ও চাকরির আবেদন ব্যবস্থাপনা",
};

export default async function ITParkDashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard/it-park");
  }

  const courses: Array<{
    id: string;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
  }> = [];

  return (
    <div className="w-full space-y-6 pb-12">
      {/* Header Banner - Ant Design Theme */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40">
            <Laptop className="size-3.5" />
            <span>ডিপার্টমেন্ট #৪ — বাছার আইটি পার্ক</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            আইটি পার্ক ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            প্রোগ্রামিং ও আইটি কোর্স অগ্রগতি, চাকরির আবেদন ট্র্যাকিং, সার্টিফিকেট এবং টেক ইভেন্ট ও সেমিনারে অংশগ্রহণ পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
          <Link
            href="/it-park#skills"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-[#262626] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] transition-colors whitespace-nowrap"
          >
            <GraduationCap className="size-3.5 sm:size-4 text-purple-600 dark:text-purple-400 shrink-0" />
            <span>কোর্স খুঁজুন</span>
          </Link>
          <Link
            href="/it-park#jobs"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors shadow-xs whitespace-nowrap"
          >
            <Briefcase className="size-3.5 sm:size-4 shrink-0" />
            <span>চাকরির পোর্টাল</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
            <GraduationCap className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">এনরোল করা কোর্স</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <Briefcase className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">চাকরির আবেদন</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Award className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">অর্জিত সার্টিফিকেট</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] transition-colors flex flex-col items-center text-center">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <Calendar className="size-5" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">০ টি</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">নিবন্ধিত ইভেন্ট</p>
        </div>
      </div>

      {/* Main Content Sections (Full width max-w-7xl, no right sidebar) */}
      <div className="space-y-6">
        {/* Enrolled Courses Section */}
        <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Code className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  আমার কোর্সসমূহ ও শেখার অগ্রগতি
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ওয়েব ডেভেলপমেন্ট, পাইথন, ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং ট্রেনিং
                </p>
              </div>
            </div>
            <Link
              href="/it-park#skills"
              className="text-xs font-semibold text-[#1677ff] hover:underline flex items-center gap-1"
            >
              <span>নতুন কোর্স এক্সপ্লোর করুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="py-12 px-4 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-3">
              <GraduationCap className="size-10 text-slate-400 dark:text-slate-500 mx-auto opacity-70" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                আপনি এখনো কোনো কোর্সে ভর্তি হননি
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                বাছার আইটি পার্কের প্রফেশনাল মেন্টরদের পরিচালিত প্রযুক্তি কোর্সে যুক্ত হয়ে নিজের ক্যারিয়ার গড়ে তুলুন।
              </p>
              <Link
                href="/it-park#skills"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1677ff] hover:bg-[#1677ff]/90 text-white transition-colors"
              >
                <span>কোর্স ক্যাটালগ দেখুন</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>

        {/* Career & Event Cards (2 equal columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Job Applications Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors text-center">
            <div className="space-y-3">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Briefcase className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    চাকরির আবেদন ও সিভি
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    আইটি সেক্টরে নিয়োগ ও ইন্টার্নশিপ আবেদনের স্ট্যাটাস
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <Briefcase className="size-8 text-blue-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  কোনো চলমান আবেদন নেই
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  আমাদের ক্যারিয়ার পোর্টালে নিয়মিত নতুন আইটি সার্কুলার প্রকাশ করা হয়।
                </p>
              </div>
            </div>

            <Link
              href="/it-park#jobs"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>চাকরির সার্কুলার দেখুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* IT Events & Hackathons Card */}
          <div className="rounded-2xl p-6 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] space-y-4 flex flex-col justify-between transition-colors text-center">
            <div className="space-y-3">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    আইটি ইভেন্ট ও কর্মশালা
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    সেমিনার, হ্যাকাথন ও টেক ওয়ার্কশপে অংশগ্রহণ
                  </p>
                </div>
              </div>

              <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#262626] border border-dashed border-slate-200 dark:border-[#303030] space-y-2">
                <Sparkles className="size-8 text-amber-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  আপকামিং ইভেন্টস
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  পরবর্তী সেমিনার ও অনলাইন কর্মশালার টিকিট বুক করুন।
                </p>
              </div>
            </div>

            <Link
              href="/it-park#events"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#262626] hover:bg-slate-200 dark:hover:bg-[#303030] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>ইভেন্টস শিডিউল দেখুন</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
