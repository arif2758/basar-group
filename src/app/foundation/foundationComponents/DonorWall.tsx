"use client";

import React, { useRef } from "react";
import { Crown, Award, Star, Heart, ArrowRight, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const DonorWall = () => {
  const containerRef = useRef(null);

  const donorTiers = [
    {
      title: "প্লাটিনাম পৃষ্ঠপোষক (Platinum Patrons)",
      icon: Crown,
      color: "from-purple-500 to-indigo-600",
      minAmount: "৳১,০০,০০০+",
      donors: [
        {
          name: "বাছার ফ্যামিলি ট্রাস্ট",
          amount: "৳২,৫০,০০০",
          year: "২০২৬",
        },
        { name: "আলহাজ্ব শফিকুল ইসলাম মেমোরিয়াল ফান্ড", amount: "৳১,৫০,০০০", year: "২০২৬" },
        { name: "বেনামী সমাজসেবী (Anonymous Donor)", amount: "৳১,২০,০০০", year: "২০২৬" },
      ],
    },
    {
      title: "গোল্ডেন শুভাকাঙ্ক্ষী (Gold Supporters)",
      icon: Award,
      color: "from-amber-500 to-orange-600",
      minAmount: "৳৫০,০০০+",
      donors: [
        { name: "মো. রফিকুল আহসান ও পরিবার (প্রবাসী)", amount: "৳৮০,০০০", year: "২০২৬" },
        { name: "মেঘনা ট্রেডিং কর্পোরেশন", amount: "৳৭৫,০০০", year: "২০২৬" },
        { name: "ডা. মাহমুদুর রহমান ও ডা. ফাহমিদা", amount: "৳৬০,০০০", year: "২০২৬" },
        { name: "ইউনাইটেড ফ্রেন্ডস ফোরাম", amount: "৳৫০,০০০", year: "২০২৬" },
      ],
    },
    {
      title: "সিলভার অংশীদার (Silver Contributors)",
      icon: Star,
      color: "from-sky-500 to-blue-600",
      minAmount: "৳১০,০০০+",
      donors: [
        { name: "ইঞ্জি. মোস্তাফিজুর রহমান", amount: "৳৩০,০০০", year: "২০২৬" },
        { name: "মাদারীপুর প্রবাসী কল্যাণ পরিষদ", amount: "৳২৫,০০০", year: "২০২৬" },
        { name: "কাজী তানভীর আহমেদ", amount: "৳২০,০০০", year: "২০২৬" },
        { name: "সানশাইন যুব সংঘ", amount: "৳১৫,০০০", year: "২০২৬" },
        { name: "আহমেদ জুবায়ের হাসান", amount: "৳১২,০০০", year: "২০২৬" },
        { name: "বেনামী শুভাকাঙ্ক্ষী", amount: "৳১০,০০০", year: "২০২৬" },
      ],
    },
  ];

  const recentDonors = [
    { name: "তানজিমুল হাসান", amount: "৳৫,০০০", timeAgo: "১ ঘণ্টা আগে" },
    { name: "ডা. নওশাদ আলী", amount: "৳২,৫০০", timeAgo: "৩ ঘণ্টা আগে" },
    { name: "বেনামী শুভাকাঙ্ক্ষী", amount: "৳১,০০০", timeAgo: "৫ ঘণ্টা আগে" },
    { name: "ফাহিমা আক্তার", amount: "৳৭,৫০০", timeAgo: "৮ ঘণ্টা আগে" },
    { name: "রাশেদুল ইসলাম", amount: "৳৩,০০০", timeAgo: "১০ ঘণ্টা আগে" },
  ];

  const corporatePartners = [
    { name: "BASAR Super Shop", role: "খাদ্য প্যাকেজ ও লজিস্টিক পার্টনার" },
    { name: "BASAR IT Park", role: "ডিজিটাল ও আইটি প্রশিক্ষণ পার্টনার" },
    { name: "বাছার গ্রন্থাগার", role: "শিক্ষা ও পাঠাগার উন্নয়ন পার্টনার" },
    { name: "মাদারীপুর কমিউনিটি হসপিটাল", role: "বিনামূল্যে স্বাস্থ্যসেবা ও ক্যাম্প পার্টনার" },
  ];

  useScrollAnimation();
  useGSAP(() => {
    gsap.from(".donor-header", {
      scrollTrigger: {
        trigger: ".donor-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="donor-header text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-[#2b2111] text-amber-600 dark:text-[#d89614] border border-amber-200/80 dark:border-[#594214] text-xs font-bold mb-4 tracking-wide shadow-xs">
            <Sparkles className="size-3.5" />
            <span>সম্মানিত দাতাদের প্রাচীর</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            যাঁদের উদারতায় দূর হচ্ছে সমাজের অন্ধকার
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            সম্মানিত পৃষ্ঠপোষক ও দাতাদের সহযোগিতায় প্রতিবছর হাজারো সুবিধাবঞ্চিত মানুষের জীবনে নতুন আশার আলো জ্বলে ওঠে।
          </p>
        </div>

        {/* Donor Tiers */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {donorTiers.map((tier, tierIndex) => {
            const TierIcon = tier.icon;
            return (
              <div
                key={tierIndex}
                className="bg-white dark:bg-[#1f1f1f] rounded-2xl p-5 sm:p-7 border border-slate-200 dark:border-[#303030] shadow-xs"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`bg-gradient-to-r ${tier.color} p-2.5 rounded-xl text-white shadow-xs`}>
                    <TierIcon className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {tier.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      অনুদান সীমা {tier.minAmount}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {tier.donors.map((donor, donorIndex) => (
                    <div
                      key={donorIndex}
                      className="bg-slate-50 dark:bg-[#141414] p-4 rounded-xl border border-slate-200 dark:border-[#303030] flex flex-col justify-between hover:border-[#1677ff] dark:hover:border-[#1677ff] transition-colors shadow-xs"
                    >
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                          {donor.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 block mt-0.5">বছর: {donor.year}</span>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200 dark:border-[#262626] flex justify-between items-baseline">
                        <span className="text-[10px] uppercase font-bold text-slate-400">অবদান:</span>
                        <span className="text-sm sm:text-base font-extrabold text-[#1677ff] dark:text-[#4096ff]">
                          {donor.amount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Micro Donors */}
        <div className="mt-8 max-w-5xl mx-auto rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="size-4 text-rose-500 fill-current" />
              <span>সাম্প্রতিক অনুদানসমূহ (Recent Micro Donations)</span>
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">সরাসরি অনলাইন আপডেট</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {recentDonors.map((rd, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-xs">
                <p className="font-bold text-slate-900 dark:text-white truncate">{rd.name}</p>
                <p className="text-emerald-600 dark:text-[#49aa19] font-extrabold mt-0.5">{rd.amount}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{rd.timeAgo}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Partners */}
        <div className="mt-10 max-w-5xl mx-auto">
          <h4 className="text-center text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-4">
            প্রাতিষ্ঠানিক ও কৌশলগত অংশীদারবৃন্দ
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {corporatePartners.map((cp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-center">
                <Building2 className="size-5 text-[#1677ff] dark:text-[#4096ff] mx-auto mb-1.5" />
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">{cp.name}</h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{cp.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Donate */}
        <div className="mt-12 text-center">
          <Link
            href="/foundation/donate"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#1677ff] hover:bg-[#4096ff] active:scale-[0.98] transition-all shadow-xs"
          >
            <Heart className="size-4 fill-current" />
            <span>আপনিও মানবতার এই অভিযাত্রায় যুক্ত হোন</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DonorWall;