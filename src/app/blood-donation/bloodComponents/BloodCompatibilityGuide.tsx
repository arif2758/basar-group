"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Scale,
  Clock,
  Activity
} from "lucide-react";

interface BloodInfo {
  group: string;
  giveTo: string[];
  receiveFrom: string[];
  description: string;
  populationShare: string;
}

const BLOOD_COMPATIBILITY_DATA: Record<string, BloodInfo> = {
  "O+": {
    group: "O+",
    giveTo: ["O+", "A+", "B+", "AB+"],
    receiveFrom: ["O+", "O-"],
    description: "সবচেয়ে বেশি ব্যবহৃত ব্লাড গ্রুপ। সকল পজিটিভ গ্রুপের রোগীকে প্লাজমা/লোহিত রক্তকণিকা দেওয়া যায়।",
    populationShare: "~৩১% মানুষের এই রক্ত"
  },
  "O-": {
    group: "O-",
    giveTo: ["সকল গ্রুপ (A+, A-, B+, B-, O+, O-, AB+, AB-)"],
    receiveFrom: ["O-"],
    description: "সার্বজনীন রক্তদাতা (Universal Donor)। যেকোনো জরুরি দুর্ঘটনায় যেকোনো গ্রুপের রোগীকে তাৎক্ষণিক দেওয়া যায়।",
    populationShare: "~১.৫% বিরল রক্ত"
  },
  "A+": {
    group: "A+",
    giveTo: ["A+", "AB+"],
    receiveFrom: ["A+", "A-", "O+", "O-"],
    description: "দ্বিতীয় বৃহত্তম রক্ত গ্রুপ। A+ এবং AB+ রোগীদের দেওয়া যায়।",
    populationShare: "~২৬% মানুষের এই রক্ত"
  },
  "A-": {
    group: "A-",
    giveTo: ["A+", "A-", "AB+", "AB-"],
    receiveFrom: ["A-", "O-"],
    description: "বিরল গ্রুপের রক্ত। নেগেটিভ ও পজিটিভ উভয় A ও AB গ্রুপের রোগীকে দেওয়া যায়।",
    populationShare: "~২% মানুষের এই রক্ত"
  },
  "B+": {
    group: "B+",
    giveTo: ["B+", "AB+"],
    receiveFrom: ["B+", "B-", "O+", "O-"],
    description: "বাংলাদেশে অন্যতম প্রধান রক্ত গ্রুপ। B+ এবং AB+ রোগীদের দেওয়া যায়।",
    populationShare: "~৩৩% মানুষের এই রক্ত"
  },
  "B-": {
    group: "B-",
    giveTo: ["B+", "B-", "AB+", "AB-"],
    receiveFrom: ["B-", "O-"],
    description: "বিরল গ্রুপের রক্ত। সমস্ত B এবং AB রোগীদের সহায়তা করতে পারে।",
    populationShare: "~১.৮% মানুষের এই রক্ত"
  },
  "AB+": {
    group: "AB+",
    giveTo: ["AB+"],
    receiveFrom: ["সকল গ্রুপ (A+, A-, B+, B-, O+, O-, AB+, AB-)"],
    description: "সার্বজনীন রক্তগ্রহীতা (Universal Recipient)। যেকোনো গ্রুপের রক্ত গ্রহণ করতে সক্ষম।",
    populationShare: "~৪.৫% মানুষের এই রক্ত"
  },
  "AB-": {
    group: "AB-",
    giveTo: ["AB+", "AB-"],
    receiveFrom: ["AB-", "A-", "B-", "O-"],
    description: "সবচেয়ে বিরলতম রক্তের গ্রুপগুলোর একটি। সকল নেগেটিভ গ্রুপ থেকে রক্ত নিতে পারে।",
    populationShare: "~০.৫% অতি বিরল রক্ত"
  }
};

const FAQS = [
  {
    q: "কারা রক্ত দিতে পারবেন?",
    a: "১৮ থেকে ৬০ বছর বয়সী যেকোনো সুস্থ পুরুষ ও নারী, যাদের ওজন নূন্যতম ৫০ কেজি (নারীদের ৪৫ কেজি হতে পারে), হিমোগ্লোবিনের মাত্রা ১২.৫ g/dL এর উপরে এবং ব্লাড প্রেশার ও পালস স্বাভাবিক।"
  },
  {
    q: "কতদিন পর পর রক্ত দেওয়া যায়?",
    a: "সুস্থ পুরুষ প্রতি ৩ মাস (৯০ দিন) পর পর এবং সুস্থ নারী প্রতি ৪ মাস (১২০ দিন) পর পর নিরাপদে নিয়মিত রক্তদান করতে পারেন।"
  },
  {
    q: "রক্তদানের আগে কি কি সতর্কতা প্রয়োজন?",
    a: "রক্তদানের আগের রাতে পর্যাপ্ত ঘুম নিশ্চিত করুন। দান করার ২-৩ ঘণ্টা আগে স্বাস্থ্যকর হালকা খাবার গ্রহণ করুন এবং প্রচুর পানি পান করুন। খালি পেটে কখনোই রক্তদান করবেন না।"
  },
  {
    q: "রক্ত দিলে কি কোনো শারীরিক ক্ষতি বা দুর্বলতা হয়?",
    a: "একদমই না! একজন প্রাপ্তবয়স্ক মানুষের শরীরে ৫-৬ লিটার রক্ত থাকে, যার মাত্র ১ ব্যাগ (৩৫০-৪৫০ মিলি) নেওয়া হয়। শরীর পরবর্তী ২৪-৪৮ ঘণ্টার মধ্যে রক্তের তরল অংশ এবং কয়েক সপ্তাহের মধ্যে লোহিত রক্তকণিকা পূরণ করে ফেলে।"
  },
  {
    q: "রক্তদানের ফলে কি কি স্বাস্থ্যগত উপকারিতা পাওয়া যায়?",
    a: "নিয়মিত রক্তদানে হৃদরোগ ও স্ট্রোকের ঝুঁকি কমে, শরীরে নতুন রক্তকণিকা তৈরির প্রক্রিয়া উদ্দীপ্ত হয়, অতিরিক্ত ক্ষতিকর আয়রন শরীর থেকে বের হয়ে যায় এবং বিনামূল্যে নিজের প্রাথমিক স্বাস্থ্য ও ৫টি মারাত্মক সংক্রামক রোগের স্ক্রিনিং রিপোর্ট জানা যায়।"
  }
];

export default function BloodCompatibilityGuide() {
  const [selectedGroup, setSelectedGroup] = useState<string>("O+");
  const currentInfo = BLOOD_COMPATIBILITY_DATA[selectedGroup];

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
          <HeartHandshake className="w-4 h-4" />
          রক্তের ম্যাচিং ও স্বাস্থ্য নির্দেশিকা
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          রক্তদানের সামঞ্জস্যতা ও নির্দেশিকা
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          আপনার রক্তের গ্রুপ সিলেক্ট করে জেনে নিন আপনি কাকে রক্ত দিতে পারবেন এবং প্রয়োজনে কার থেকে রক্ত গ্রহণ করতে পারবেন।
        </p>
      </div>

      {/* Interactive Blood Selector Hub */}
      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-[#303030] shadow-sm">
        <div className="text-center mb-6">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-3">
            আপনার রক্তের গ্রুপ নির্বাচন করুন
          </label>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {Object.keys(BLOOD_COMPATIBILITY_DATA).map((grp) => {
              const isActive = selectedGroup === grp;
              return (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl font-bold text-base sm:text-lg transition-all duration-200 flex flex-col items-center justify-center gap-0.5 border ${
                    isActive
                      ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30 scale-105"
                      : "bg-gray-50 dark:bg-[#141414] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#303030] hover:border-rose-400 dark:hover:border-rose-600"
                  }`}
                >
                  <span>{grp}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Group Detailed Cards */}
        {currentInfo && (
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#262626] grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Can Donate To */}
            <div className="bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base sm:text-lg">
                  <HeartHandshake className="w-5 h-5" />
                  কাকে রক্ত দিতে পারবেন ({currentInfo.group})
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded">
                  রক্তদাতা হিসেবে
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {currentInfo.group} রক্তের মানুষ নিচের গ্রুপের রোগীদের জীবন বাঁচাতে পারেন:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentInfo.giveTo.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white dark:bg-[#141414] border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-300 font-bold text-sm rounded-lg shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Can Receive From */}
            <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">
                  <Activity className="w-5 h-5" />
                  কার থেকে রক্ত নিতে পারবেন ({currentInfo.group})
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded">
                  গ্রহীতা হিসেবে
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                জরুরি প্রয়োজনে {currentInfo.group} রক্তের রোগী নিচের গ্রুপের রক্ত গ্রহণ করতে পারেন:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentInfo.receiveFrom.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white dark:bg-[#141414] border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 font-bold text-sm rounded-lg shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Description note */}
            <div className="md:col-span-2 bg-gray-50 dark:bg-[#141414] p-4 rounded-xl border border-gray-200 dark:border-[#303030] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{currentInfo.description}</span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                {currentInfo.populationShare}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Full Compatibility Matrix Table */}
      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-[#303030] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              সার্বজনীন রক্তদান সামঞ্জস্যতা চার্ট (Universal Matrix)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              এক নজরে সকল রক্ত গ্রুপের দাতা ও গ্রহীতার সামঞ্জস্যতা
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> দেওয়া যাবে
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-[#303030] bg-gray-50 dark:bg-[#141414]">
                <th className="p-3 font-bold text-gray-700 dark:text-gray-300">রক্তের গ্রুপ</th>
                <th className="p-3 font-bold text-rose-600 dark:text-rose-400">রক্ত দিতে পারবেন</th>
                <th className="p-3 font-bold text-emerald-600 dark:text-emerald-400">রক্ত নিতে পারবেন</th>
                <th className="p-3 font-bold text-gray-600 dark:text-gray-400">বিশেষ বৈশিষ্ট্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#262626]">
              {Object.values(BLOOD_COMPATIBILITY_DATA).map((item) => (
                <tr key={item.group} className="hover:bg-gray-50/50 dark:hover:bg-[#141414]/50">
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400 text-sm">
                    {item.group}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200 font-medium">
                    {item.giveTo.join(", ")}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200 font-medium">
                    {item.receiveFrom.join(", ")}
                  </td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">
                    {item.group === "O-" ? (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">সার্বজনীন দাতা (Universal Donor)</span>
                    ) : item.group === "AB+" ? (
                      <span className="text-sky-600 dark:text-sky-400 font-semibold">সার্বজনীন গ্রহীতা (Universal Recipient)</span>
                    ) : (
                      item.populationShare
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Donor Eligibility Criteria Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-gray-200 dark:border-[#303030] shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">বয়স ও স্বাস্থ্য</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            বয়স ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে এবং কোনো দীর্ঘস্থায়ী সংক্রামক ব্যাধি থাকা যাবে না।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-gray-200 dark:border-[#303030] shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">শরীরের ওজন</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            পুরুষের নূন্যতম ৫০ কেজি এবং নারীদের নূন্যতম ৪৫ কেজি ওজন থাকা আবশ্যক।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-gray-200 dark:border-[#303030] shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">সময়কাল বিরতি</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            পুরুষ প্রতি ৩ মাস পর পর এবং নারী প্রতি ৪ মাস পর পর নিরাপদে নিয়মিত রক্তদান করতে পারেন।
          </p>
        </div>

        <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-gray-200 dark:border-[#303030] shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white">হিমোগ্লোবিন স্তর</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            হিমোগ্লোবিনের মাত্রা নূন্যতম ১২.৫ g/dL থাকতে হবে যা বুথেই টেস্ট করা হয়।
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-[#303030] shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              রক্তদান সম্পর্কিত সাধারণ প্রশ্নোত্তর (FAQ)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              রক্তদানের পূর্বে সাধারণ মানুষের প্রচলিত কিছু প্রশ্ন ও চিকিৎসাভিত্তিক সঠিক তথ্য
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#303030] space-y-2"
            >
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-start gap-2">
                <span className="text-rose-500 font-extrabold">{i + 1}.</span>
                {faq.q}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl p-8 bg-gradient-to-r from-rose-900/30 to-red-900/30 border border-rose-500/30 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          আপনি কি প্রস্তুত একজন মানুষের জীবন বাঁচাতে?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          আজই বাছার ব্লাড ডোনেশন নেটওয়ার্কে রক্তদাতা হিসেবে নাম নিবন্ধন করুন। আপনার এক ব্যাগ রক্ত হতে পারে একজন মুমূর্ষু রোগীর বেঁচে থাকার শেষ আশা।
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/blood-donation/register"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            রক্তদাতা হিসেবে নিবন্ধন করুন
          </Link>
          <Link
            href="/blood-donation/emergency"
            className="px-6 py-3 bg-white dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-[#262626] text-gray-800 dark:text-gray-200 font-bold text-sm rounded-xl border border-gray-200 dark:border-[#303030] transition-all flex items-center gap-2"
          >
            জরুরি রক্তের পোস্ট করুন
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
