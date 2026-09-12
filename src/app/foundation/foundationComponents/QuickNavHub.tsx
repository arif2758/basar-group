"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  HelpCircle,
  Sparkles,
  Users,
  Award,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

const hubCards = [
  {
    href: "/foundation/donate",
    title: "অনলাইন অনুদান ও যাকাত",
    subtitle: "বিকাশ/নগদ/ব্যাংকে সরাসরি অনুদান ও ইনস্ট্যান্ট ডিজিটাল রসিদ",
    icon: Heart,
    color: "from-[#1677ff] to-[#10239e]",
    bgAccent: "bg-blue-50 dark:bg-[#111a2c] border-blue-200/80 dark:border-[#15325b] text-[#1677ff] dark:text-[#4096ff]",
    badge: "যাকাত ক্যালকুলেটর",
  },
  {
    href: "/foundation/request-aid",
    title: "সহায়তার আবেদন পোর্টাল",
    subtitle: "চিকিৎসা, শিক্ষা বা জীবিকার জন্য মধ্যস্থতাকারী ছাড়া সরাসরি আবেদন",
    icon: HelpCircle,
    color: "from-[#52c41a] to-[#237804]",
    bgAccent: "bg-emerald-50 dark:bg-[#162312] border-emerald-200/80 dark:border-[#274916] text-emerald-600 dark:text-[#49aa19]",
    badge: "দ্রুত ভেরিফিকেশন",
  },
  {
    href: "/foundation/campaigns",
    title: "সক্রিয় ক্যাম্পেইন ও তহবিল",
    subtitle: "বন্যার্তদের ত্রাণ, শীতবস্ত্র ও এতিম শিশুদের শিক্ষাবৃত্তি কার্যক্রম",
    icon: Sparkles,
    color: "from-[#ff4d4f] to-[#a8071a]",
    bgAccent: "bg-rose-50 dark:bg-[#2c1618] border-rose-200/80 dark:border-[#5b2123] text-rose-600 dark:text-[#ff7875]",
    badge: "লাইভ প্রগ্রেস",
  },
  {
    href: "/foundation/volunteer",
    title: "স্বেচ্ছাসেবক ও রক্তদাতা নেটওয়ার্ক",
    icon: Users,
    subtitle: "মাঠপর্যায়ে সেবা দিতে যুক্ত হোন অথবা রক্তের গ্রুপ নিবন্ধন করুন",
    color: "from-[#722ed1] to-[#391085]",
    bgAccent: "bg-purple-50 dark:bg-[#1f1135] border-purple-200/80 dark:border-[#4d1f87] text-purple-600 dark:text-[#b37feb]",
    badge: "রক্তের গ্রুপ ক্লাব",
  },
  {
    href: "/foundation/donors",
    title: "সম্মানিত দাতাদের প্রাচীর",
    icon: Award,
    subtitle: "যাঁদের আন্তরিক সহযোগিতায় আলোকিত হচ্ছে সমাজের প্রতিটি কোণ",
    color: "from-[#fa8c16] to-[#ad4e00]",
    bgAccent: "bg-amber-50 dark:bg-[#2b2111] border-amber-200/80 dark:border-[#594214] text-amber-600 dark:text-[#d89614]",
    badge: "স্বচ্ছ হিসাব",
  },
  {
    href: "/foundation/contact",
    title: "যোগাযোগ ও জরুরি হেল্পলাইন",
    icon: PhoneCall,
    subtitle: "২৪/৭ জরুরি হটলাইন, অফিস লোকেশন ও সরাসরি WhatsApp চ্যাট",
    color: "from-[#13c2c2] to-[#00474f]",
    bgAccent: "bg-cyan-50 dark:bg-[#112123] border-cyan-200/80 dark:border-[#144f53] text-cyan-600 dark:text-[#36cfc9]",
    badge: "২৪/৭ খোলা",
  },
];

export default function QuickNavHub() {
  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            সমাজকল্যাণমূলক সেবার প্রবেশদ্বার
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            আপনার প্রয়োজনীয় সেবা বা কার্যক্রমে সরাসরি অংশ নিতে নিচে ক্লিক করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {hubCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group p-6 rounded-2xl bg-slate-50/70 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:border-[#1677ff] dark:hover:border-[#1677ff] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`size-12 rounded-xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="size-6" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.bgAccent}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#1677ff] dark:group-hover:text-[#4096ff] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-[#262626] flex items-center justify-between text-xs font-bold text-[#1677ff] dark:text-[#4096ff]">
                  <span>বিস্তারিত দেখুন</span>
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
