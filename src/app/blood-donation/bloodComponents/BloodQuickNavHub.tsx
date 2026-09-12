"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  AlertTriangle,
  Droplet,
  Radio,
  BookOpenCheck,
  Award,
  ArrowRight,
} from "lucide-react";

const hubCards = [
  {
    href: "/blood-donation/find-donor",
    title: "রক্তদাতা অনুসন্ধান ইঞ্জিন",
    subtitle: "৬৪ জেলা ও উপজেলাভিত্তিক ফিল্টারিং এবং ১-ক্লিকে সরাসরি ফোন কল",
    icon: Search,
    color: "from-rose-500 to-red-600",
    bgAccent: "bg-rose-50 dark:bg-[#2c1618] border-rose-200 dark:border-[#5b2123] text-rose-600 dark:text-[#ff7875]",
    badge: "ইনস্ট্যান্ট ফিল্টার",
  },
  {
    href: "/blood-donation/emergency",
    title: "জরুরি রক্তের আবেদন (SOS)",
    subtitle: "রোগীর জন্য অবিলম্বে রক্ত প্রয়োজন হলে সরাসরি লাইভ অ্যালার্ট পোস্ট করুন",
    icon: AlertTriangle,
    color: "from-red-600 to-rose-700",
    bgAccent: "bg-rose-50 dark:bg-[#2c1618] border-rose-200 dark:border-[#5b2123] text-rose-600 dark:text-[#ff7875]",
    badge: "লাইভ নোটিফিকেশন",
  },
  {
    href: "/blood-donation/register",
    title: "রক্তদাতা হিসেবে নিবন্ধন",
    subtitle: "স্বেচ্ছাসেবী রক্তদাতা ক্লাবে যুক্ত হয়ে মানবতার একজন হিরো হোন",
    icon: Droplet,
    color: "from-[#52c41a] to-[#237804]",
    bgAccent: "bg-emerald-50 dark:bg-[#162312] border-emerald-200 dark:border-[#274916] text-emerald-600 dark:text-[#49aa19]",
    badge: "হিরো ব্যাজ",
  },
  {
    href: "/blood-donation/live-requests",
    title: "লাইভ রক্তের আবেদনের তালিকা",
    subtitle: "সারাদেশে বিভিন্ন হাসপাতালে চলমান রক্তের জরুরি চাহিদার আপডেট",
    icon: Radio,
    color: "from-[#fa8c16] to-[#ad4e00]",
    bgAccent: "bg-amber-50 dark:bg-[#2b2111] border-amber-200 dark:border-[#594214] text-amber-600 dark:text-[#d89614]",
    badge: "রিয়েল-টাইম ফিড",
  },
  {
    href: "/blood-donation/guideline",
    title: "রক্ত সামঞ্জস্যতা ও নির্দেশিকা",
    subtitle: "কে কাকে রক্ত দিতে পারবেন এবং রক্তদানের স্বাস্থ্যগত নিয়মাবলী",
    icon: BookOpenCheck,
    color: "from-[#1677ff] to-[#0958d9]",
    bgAccent: "bg-blue-50 dark:bg-[#111a2c] border-blue-200 dark:border-[#15325b] text-[#1677ff] dark:text-[#4096ff]",
    badge: "ইন্টারঅ্যাক্টিভ চার্ট",
  },
  {
    href: "/foundation",
    title: "বাছার ফাউন্ডেশন সহায়তা",
    subtitle: "রক্তদান ছাড়াও অসহায় রোগীদের ফ্রি ঔষধ ও চিকিৎসার জন্য আবেদন",
    icon: Award,
    color: "from-[#722ed1] to-[#391085]",
    bgAccent: "bg-purple-50 dark:bg-[#1f1135] border-purple-200 dark:border-[#4d1f87] text-purple-600 dark:text-[#b37feb]",
    badge: "ফ্রি চিকিৎসা সহায়তা",
  },
];

export default function BloodQuickNavHub() {
  return (
    <section className="py-10 sm:py-14 bg-white dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            রক্তদান সেবাসমূহের প্রবেশদ্বার
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            আপনার প্রয়োজনীয় সেবাটি দ্রুত পেতে নিচের অপশনে ক্লিক করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {hubCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-[#1677ff] dark:hover:border-[#1677ff] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className={`size-11 rounded-xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.bgAccent}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] dark:group-hover:text-[#4096ff] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-[#262626] flex items-center justify-between text-xs font-bold text-[#1677ff] dark:text-[#4096ff]">
                  <span>প্রবেশ করুন</span>
                  <ArrowRight className="size-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
