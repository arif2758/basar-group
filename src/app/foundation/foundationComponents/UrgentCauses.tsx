"use client";

import React, { useState } from "react";
import { Heart, Target, Users, Clock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Cause {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  daysLeft: number;
  description: string;
  urgentBadge?: string;
}

const causesData: Cause[] = [
  {
    id: "flood-relief",
    title: "বন্যার্ত ও নদীভাঙন ক্ষতিগ্রস্তদের পুনর্বাসন ও খাদ্য সহায়তা",
    category: "জরুরি ত্রাণ ও পুনর্বাসন",
    categoryColor: "bg-rose-50 text-rose-600 dark:bg-[#2c1618] dark:text-[#ff7875] border-rose-200 dark:border-[#5b2123]",
    image: "https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=800",
    targetAmount: 500000,
    raisedAmount: 385000,
    donorsCount: 428,
    daysLeft: 12,
    description: "আকস্মিক বন্যায় গৃহহীন ও অনাহারক্লিষ্ট পরিবারগুলোর কাছে শুকনো খাবার, বিশুদ্ধ পানি ও ঢেউটিন পুনর্বাসন সহায়তা পৌঁছানো।",
    urgentBadge: "জরুরি প্রয়োজন",
  },
  {
    id: "education-scholarship",
    title: "অসহায় এতিম ও সুবিধাবঞ্চিত শিশুদের শিক্ষাবৃত্তি ২০২৬",
    category: "শিক্ষা ও ভবিষ্যৎ",
    categoryColor: "bg-blue-50 text-blue-600 dark:bg-[#111a2c] dark:text-[#4096ff] border-blue-200 dark:border-[#15325b]",
    image: "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800",
    targetAmount: 300000,
    raisedAmount: 245000,
    donorsCount: 312,
    daysLeft: 20,
    description: "মেধাবী অথচ হতদরিদ্র শিক্ষার্থীদের মাসিক স্কুল ফি, বই-খাতা ও প্রয়োজনীয় শিক্ষা সরঞ্জাম নিশ্চিত করে পড়াশোনা চালিয়ে নেওয়া।",
    urgentBadge: "সর্বাধিক সক্রিয়",
  },
  {
    id: "medical-emergency",
    title: "প্রান্তিক রোগীদের জরুরি চিকিৎসা সহায়তা ও ফ্রি ঔষধ বিতরণ",
    category: "স্বাস্থ্যসেবা ও ঔষধ",
    categoryColor: "bg-emerald-50 text-emerald-600 dark:bg-[#162312] dark:text-[#49aa19] border-emerald-200 dark:border-[#274916]",
    image: "https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=800",
    targetAmount: 250000,
    raisedAmount: 195000,
    donorsCount: 260,
    daysLeft: 15,
    description: "জটিল রোগে আক্রান্ত অথচ চিকিৎসার খরচ জোগাতে অক্ষম প্রবীণ, মা ও শিশুদের জীবনরক্ষাকারী ঔষধ ও অপারেশন সহায়তা।",
  },
  {
    id: "women-empowerment",
    title: "বিধবা ও দুস্থ মায়েদের স্বাবলম্বীকরণ (সেলাই মেশিন ও জীবিকা)",
    category: "স্বাবলম্বীকরণ ও জীবিকা",
    categoryColor: "bg-purple-50 text-purple-600 dark:bg-[#1f1135] dark:text-[#b37feb] border-purple-200 dark:border-[#4d1f87]",
    image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800",
    targetAmount: 400000,
    raisedAmount: 280000,
    donorsCount: 195,
    daysLeft: 25,
    description: "পরিবারের একমাত্র উপার্জনহীন মায়েদের বিনামূল্যে টেকসই সেলাই মেশিন প্রদান ও কাপড় সেলাইয়ের ব্যবহারিক প্রশিক্ষণ।",
  },
];

export default function UrgentCauses() {
  return (
    <section id="urgent-causes" className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border border-rose-200/80 dark:border-[#5b2123] text-xs font-bold mb-4 tracking-wide shadow-xs">
            <Sparkles className="size-3.5" />
            <span>সক্রিয় মানবিক ক্যাম্পেইন</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            আপনার ছোট্ট অনুদান বদলে দিতে পারে <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500">
              একটি অসহায় পরিবারের জীবন
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            বাছার ফাউন্ডেশন শতভাগ স্বচ্ছতার সাথে সরাসরি মাঠপর্যায়ে অনুদান পৌঁছে দেয়। প্রতিটি পয়সার হিসাব ও আপডেট আপনার কাছে উন্মুক্ত।
          </p>
        </div>

        {/* Causes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {causesData.map((cause) => {
            const progressPercent = Math.min(100, Math.round((cause.raisedAmount / cause.targetAmount) * 100));

            return (
              <div
                key={cause.id}
                className="group flex flex-col rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] overflow-hidden hover:shadow-md hover:border-[#1677ff] dark:hover:border-[#1677ff] transition-all duration-200"
              >
                {/* Cause Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-[#141414]">
                  <Image
                    src={cause.image}
                    alt={cause.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-xs ${cause.categoryColor}`}>
                    {cause.category}
                  </span>

                  {cause.urgentBadge && (
                    <span className="absolute top-3 right-3 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white shadow-xs">
                      {cause.urgentBadge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-xs">
                    <span className="flex items-center gap-1">
                      <Users className="size-3.5 text-amber-400" />
                      {cause.donorsCount} জন দাতা
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="size-3.5 text-sky-400" />
                      {cause.daysLeft} দিন বাকি
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4.5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-[#1677ff] dark:group-hover:text-[#4096ff] transition-colors">
                      {cause.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {cause.description}
                    </p>
                  </div>

                  {/* Progress Bar & Amounts */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-[#262626] space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">উত্তোলিত:</span>
                        <span className="font-extrabold text-[#1677ff] dark:text-[#4096ff]">
                          ৳{cause.raisedAmount.toLocaleString("bn-BD")}{" "}
                          <span className="text-[10px] text-slate-400 font-normal">({progressPercent}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#141414] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#1677ff] to-emerald-500 transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                        <span>টার্গেট: ৳{cause.targetAmount.toLocaleString("bn-BD")}</span>
                        <span>বাকি: ৳{(cause.targetAmount - cause.raisedAmount).toLocaleString("bn-BD")}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href="/foundation/donate"
                      className="w-full h-10 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] active:bg-[#0958d9] text-white transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                    >
                      <Heart className="size-3.5 fill-current" />
                      <span>অনুদানে অংশ নিন</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-10 rounded-2xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="size-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="size-6" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                ১০০% স্বচ্ছতা ও সরাসরি মাঠপর্যায়ে বাস্তবায়ন
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                বাছার ফাউন্ডেশনে আপনার দেওয়া প্রতিটি অনুদানের ছবি, ভিডিও ও অডিট রিপোর্ট ওয়েবসাইটে নিয়মিত প্রকাশ করা হয়।
              </p>
            </div>
          </div>
          <Link
            href="/foundation/donors"
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-bold text-[#1677ff] dark:text-[#4096ff] bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-[#262626] transition-colors shadow-xs"
          >
            ডোনর লিস্ট দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
}
