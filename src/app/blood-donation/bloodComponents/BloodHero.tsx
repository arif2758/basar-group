"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  AlertTriangle,
  Droplet,
  Users,
  Heart,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const topDistricts = [
  "ঢাকা",
  "ফরিদপুর",
  "মাদারীপুর",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিল্লা",
  "গাজীপুর",
];

export default function BloodHero() {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState<string>("O+");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("মাদারীপুর");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/blood-donation/find-donor?group=${encodeURIComponent(selectedGroup)}&district=${encodeURIComponent(selectedDistrict)}`);
  };

  return (
    <section className="relative py-8 sm:py-12 bg-white dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Vision & Quick Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border border-rose-200/80 dark:border-[#5b2123] text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="size-3.5" />
              <span>২৪/৭ জরুরি রক্তদাতা নেটওয়ার্ক</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              আপনার এক ব্যাগ রক্তে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-amber-500">
                বেঁচে যেতে পারে একটি প্রাণ
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              সারা বাংলাদেশের ৬৪ জেলার স্বেচ্ছাসেবী রক্তদাতাদের সরাসরি খুঁজে নিন অথবা রক্তের জরুরি প্রয়োজনে লাইভ SOS পোস্ট করুন। কোনো প্রকার দালালি বা ফি নেই।
            </p>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/blood-donation/emergency"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <AlertTriangle className="size-4 animate-bounce" />
                <span>জরুরি রক্তের আবেদন (SOS)</span>
              </Link>

              <Link
                href="/blood-donation/register"
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Droplet className="size-4 fill-current" />
                <span>রক্তদাতা হিসেবে যুক্ত হোন</span>
              </Link>
            </div>

            {/* Live Stats Counters */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-[#262626] max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-center">
                <p className="text-lg sm:text-2xl font-black text-rose-600 dark:text-[#ff7875]">৮,৫০০+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">নিবন্ধিত রক্তদাতা</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-center">
                <p className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-[#49aa19]">৫,২০০+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">জীবন রক্ষাপ্রাপ্ত</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-center">
                <p className="text-lg sm:text-2xl font-black text-[#1677ff] dark:text-[#4096ff]">৬৪</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">জেলায় সক্রিয়</p>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Search Box */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-[#303030] shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-[#262626]">
                <div className="size-9 rounded-xl bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] flex items-center justify-center">
                  <Search className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    তাৎক্ষণিক রক্তদাতা অনুসন্ধান
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    রক্তের গ্রুপ ও জেলা নির্বাচন করে সরাসরি সার্চ করুন
                  </p>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                {/* Blood Group Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    রক্তের গ্রুপ নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodGroups.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setSelectedGroup(bg)}
                        className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                          selectedGroup === bg
                            ? "bg-rose-600 text-white border-rose-600 shadow-xs scale-[1.02]"
                            : "bg-slate-50 dark:bg-[#141414] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#303030] hover:border-rose-400"
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* District Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    জেলা নির্বাচন করুন:
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-rose-500"
                  >
                    {topDistricts.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist} জেলা
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Action Button */}
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <Search className="size-4" />
                  <span>রক্তদাতা খুঁজুন</span>
                  <ArrowRight className="size-4" />
                </button>
              </form>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                <span>সব রক্তদাতার মোবাইল নম্বর সরাসরি যাচাইকৃত ও সচল।</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
