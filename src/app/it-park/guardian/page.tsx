import React from "react";
import {
  Shield,
  ShieldCheck,
  Heart,
  Laptop,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Lock,
  Smartphone,
  BookOpen
} from "lucide-react";

export const metadata = {
  title: "অভিভাবক গাইড ও প্রযুক্তি ক্যারিয়ার পরামর্শ | বাছার আইটি পার্ক",
  description: "নতুন প্রজন্মের প্রযুক্তি শিক্ষা, অনলাইন নিরাপত্তা ও স্মার্ট ক্যারিয়ার গঠনে অভিভাবকদের পূর্ণাঙ্গ দিকনির্দেশনা।",
};

export default function GuardianPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <Shield className="w-4 h-4" />
          অভিভাবক গাইড ও ভবিষ্যৎ ক্যারিয়ার সচেতনতা
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          সন্তানের আইটি শিক্ষা ও সঠিক ক্যারিয়ার পথ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          প্রযুক্তি শুধুমাত্র গেম বা বিনোদন নয় — সঠিক দিকনির্দেশনায় এটি হতে পারে আপনার সন্তানের উজ্জ্বল আন্তর্জাতিক ক্যারিয়ার
        </p>
      </div>

      {/* 3 Core Guideline Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#1677ff] flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            প্রোডাক্টিভ প্রযুক্তি ব্যবহার
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            মোবাইল বা কম্পিউটারে অলস সময় নষ্ট না করে প্রোগ্রামিং, ডিজাইন ও সমস্যা সমাধানের মাধ্যমে সন্তানের মেধার সঠিক বিকাশ ঘটান।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            সাইবার নিরাপত্তা ও সচেতনতা
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            অনলাইনে নিরাপদ থাকার নিয়মাবলী, ক্ষতিকর কনটেন্ট থেকে দূরে থাকা এবং স্ক্রিন টাইম নিয়ন্ত্রণের বৈজ্ঞানিক উপায় জেনে নিন।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            ভবিষ্যৎ ফ্রিল্যান্সিং ও কর্মসংস্থান
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            পড়াশোনার পাশাপাশি আন্তর্জাতিক বাজারে পার্ট-টাইম কাজ ও ঘরে বসে ডলার আয়ের বৈধ ও টেকসই উপায়সমূহ।
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions by Parents */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#1677ff]" />
          অভিভাবকদের বহুল জিজ্ঞাসিত প্রশ্ন ও উত্তর (FAQ)
        </h3>

        <div className="space-y-4 text-xs">
          {[
            {
              q: "আমার সন্তান স্কুলে বা কলেজে পড়ে, সে কি আইটি কোর্স করতে পারবে?",
              a: "হ্যাঁ! আমাদের কোর্সগুলো এমনভাবে ডিজাইন করা হয়েছে যাতে যেকোনো অষ্টম শ্রেণি থেকে কলেজ পড়ুয়া শিক্ষার্থী কোনো পূর্ব অভিজ্ঞতা ছাড়াই সহজে শিখতে পারে। এতে পড়াশোনার কোনো ক্ষতি হয় না।"
            },
            {
              q: "কম্পিউটার শেখার ফলে কি সন্তানের পড়াশোনায় মনোযোগ কমে যাবে?",
              a: "না, বরং গবেষণায় দেখা গেছে যে প্রোগ্রামিং ও লজিক্যাল থিংকিং শিখলে গণিত ও বিজ্ঞানের মতো বিষয়ে শিক্ষার্থীদের চিন্তাভাবনা অনেক স্পষ্ট ও দূরদর্শী হয়।"
            },
            {
              q: "কোর্স শেষে কি আসলেই চাকরি বা কাজের সুযোগ পাওয়া যায়?",
              a: "হ্যাঁ! বাছার আইটি পার্কের নিজস্ব সফটওয়্যার টিম ও দেশি-বিদেশি সহযোগী প্রতিষ্ঠানে সেরা শিক্ষার্থীদের ইন্টার্নশিপ ও চাকরি পাওয়ার শতভাগ সুযোগ তৈরি করে দেওয়া হয়।"
            },
            {
              q: "বাছার আইটি পার্কে মেয়েদের জন্য কি আলাদা বা নিরাপদ পরিবেশ রয়েছে?",
              a: "সম্পূর্ণ নিরাপদ, সিসিটিভি নিয়ন্ত্রিত ও পেশাদার পরিবেশ। নারী শিক্ষার্থীদের জন্য বিশেষ স্কলারশিপ ও মহিলা মেন্টরদের নিয়মিত সহায়তা রয়েছে।"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] space-y-1.5"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-[#1677ff] font-extrabold">{idx + 1}.</span> {item.q}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
