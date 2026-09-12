import React from "react";
import Link from "next/link";
import {
  Laptop,
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  TrendingUp,
  Globe
} from "lucide-react";
import { dbConnect } from "@/lib/db";
import { ITCourse } from "@/models/ITCourse";
import { ITJob } from "@/models/ITJob";

export const metadata = {
  title: "বাছার আইটি পার্ক | BASAR IT Park - Learn. Earn. Empower.",
  description: "প্রযুক্তি শিক্ষা, আন্তর্জাতিক স্কিল বুটক্যাম্প, ফ্রিল্যান্সিং ক্যারিয়ার ও ডিজিটাল কর্মসংস্থান প্ল্যাটফর্ম।",
};

export const dynamic = "force-dynamic";

export default async function ITParkOverviewPage() {
  let courses: any[] = [];
  let jobs: any[] = [];

  try {
    await dbConnect();
    const [rawCourses, rawJobs] = await Promise.all([
      ITCourse.find({ status: { $ne: "completed" } }).sort({ isFeatured: -1, createdAt: -1 }).limit(2).lean(),
      ITJob.find({ status: "active" }).sort({ isFeatured: -1, createdAt: -1 }).limit(2).lean(),
    ]);
    courses = JSON.parse(JSON.stringify(rawCourses));
    jobs = JSON.parse(JSON.stringify(rawJobs));
  } catch (err) {
    console.error("Error fetching overview data:", err);
  }

  return (
    <div className="space-y-14">
      {/* Hero Banner with Stats */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
            <Sparkles className="w-4 h-4" />
            ডিজিটাল বাংলাদেশ বিনির্মাণে প্রযুক্তি দক্ষতা
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            আন্তর্জাতিক মানের আইটি স্কিল অর্জন করুন, স্বাবলম্বী হোন
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            বাছার আইটি পার্ক তরুণ প্রজন্মকে প্রযুক্তিগত শিক্ষায় দক্ষ করে ফ্রিল্যান্সিং, রিমোট জব ও আন্তর্জাতিক আইটি ক্যারিয়ারের জন্য সম্পূর্ণ প্রস্তুত করে তোলে।
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/it-park/courses"
              className="px-6 py-3 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              কোর্স ও বুটক্যাম্প দেখুন
            </Link>
            <Link
              href="/it-park/jobs"
              className="px-6 py-3 bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-[#303030] transition-all flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              চাকরির সার্কুলার
            </Link>
          </div>
        </div>

        {/* 4 Stats Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 dark:border-[#262626]">
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">৫০০+</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">প্রশিক্ষণপ্রাপ্ত শিক্ষার্থী</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black text-[#1677ff]">৮৫%</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">জব ও ফ্রিল্যান্সিং সাকসেস</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">১২+</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">আন্তর্জাতিক স্কিল কোর্স</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">২৪/৭</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">হাই-স্পিড কো-ওয়ার্কিং ল্যাব</p>
          </div>
        </div>
      </div>

      {/* 6 Quick Nav Hub Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            আইটি পার্কের প্রধান সেবাসমূহ
          </h3>
          <span className="text-xs text-slate-400">৬টি ডেডিকেটেড কর্নার</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/it-park/courses"
            className="p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm hover:border-[#1677ff]/60 hover:-translate-y-0.5 transition-all space-y-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#1677ff] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors flex items-center justify-between">
              <span>প্রযুক্তি কোর্স ও বুটক্যাম্প</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              ওয়েব ডেভেলপমেন্ট, UI/UX ডিজাইন, পাইথন ও ডিজিটাল মার্কেটিং লাইভ কোর্স।
            </p>
          </Link>

          <Link
            href="/it-park/jobs"
            className="p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm hover:border-[#1677ff]/60 hover:-translate-y-0.5 transition-all space-y-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors flex items-center justify-between">
              <span>আইটি জব পোর্টাল</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              প্রযুক্তি পদের সরাসরি চাকরির সার্কুলার ও তাৎক্ষণিক সিভি সাবমিশন সুবিধা।
            </p>
          </Link>

          <Link
            href="/it-park/events"
            className="p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm hover:border-[#1677ff]/60 hover:-translate-y-0.5 transition-all space-y-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors flex items-center justify-between">
              <span>সেমিনার ও হ্যাকাথন</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              টেক ওয়ার্কশপ, ফ্রিল্যান্সিং সেমিনার ও বার্ষিক হ্যাকাথনে অংশগ্রহণ করুন।
            </p>
          </Link>

          <Link
            href="/it-park/coworking"
            className="p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm hover:border-[#1677ff]/60 hover:-translate-y-0.5 transition-all space-y-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors flex items-center justify-between">
              <span>কো-ওয়ার্কিং স্পেস</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              ফ্রিল্যান্সার ও স্টার্টআপদের জন্য ১০০ Mbps ইন্টারনেট সহ ওয়ার্কিং ডেস্ক।
            </p>
          </Link>

          <Link
            href="/it-park/guardian"
            className="p-5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm hover:border-[#1677ff]/60 hover:-translate-y-0.5 transition-all space-y-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors flex items-center justify-between">
              <span>অভিভাবক গাইড</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              সন্তানের প্রযুক্তির সঠিক ব্যবহার ও সাইবার সিকিউরিটি সচেতনতা গাইড।
            </p>
          </Link>

          <div className="p-5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              আন্তর্জাতিক মেন্টরশিপ
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              সিলিকন ভ্যালি ও ইউরোপে কর্মরত অভিজ্ঞ বাংলাদেশি ইঞ্জিনিয়ারদের সেশন।
            </p>
          </div>
        </div>
      </div>

      {/* Featured Courses Callout */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#1677ff]" />
              আসন্ন জনপ্রিয় বুটক্যাম্পসমূহ
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সীমিত আসনের ব্যাচে এখনই যুক্ত হোন
            </p>
          </div>
          <Link
            href="/it-park/courses"
            className="text-xs font-bold text-[#1677ff] hover:underline flex items-center gap-1"
          >
            সব কোর্স দেখুন <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.slice(0, 2).map((c: any) => (
            <div
              key={c._id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#262626] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-[#1677ff]">
                  {c.batchNumber || "New Batch"}
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  ৳ {(c.discountFee || c.courseFee || 8500).toLocaleString()}
                </span>
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">{c.title}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{c.instructorName}</span>
                <Link
                  href="/it-park/courses"
                  className="text-xs font-bold text-[#1677ff] hover:underline flex items-center gap-1"
                >
                  ভর্তি আবেদন <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
