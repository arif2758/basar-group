"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import React, { useRef } from "react";
import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ShoppingBasket,
  Laptop,
  Sparkles,
  Users,
  Globe2,
  Target,
  ShieldCheck,
  LineChart,
} from "lucide-react";
import { FaLeaf, FaRegSmileBeam } from "react-icons/fa";

export default function AboutComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: "সংযুক্ত শিক্ষার্থী", value: "12,500+", icon: Users },
    { label: "বিতরণকৃত বই", value: "38,000+", icon: BookOpen },
    { label: "স্থানীয় কর্মসংস্থান সৃষ্টি", value: "350+", icon: LineChart },
    { label: "সেবাপ্রাপ্ত কমিউনিটি", value: "40+", icon: Globe2 },
  ];

  const values = [
    {
      title: "সততা (Integrity)",
      desc: "আমরা সর্বাবস্থায় ন্যায়ের পথে অবিচল ও দায়বদ্ধ।",
      icon: ShieldCheck,
    },
    { title: "প্রভাব (Impact)", desc: "এমন প্রতিটি সিদ্ধান্ত যা মানুষের জীবনকে ইতিবাচকভাবে বদলে দেয়।", icon: Target },
    { title: "আনন্দ (Joy)", desc: "শেখা এবং কাজ হওয়া উচিত প্রাণবন্ত ও আনন্দদায়ক।", icon: FaRegSmileBeam },
    {
      title: "স্থায়িত্ব (Sustainability)",
      desc: "মানুষ, পরিবেশ ও টেকসই সমৃদ্ধির দীর্ঘমেয়াদি মেলবন্ধন।",
      icon: FaLeaf,
    },
  ];

  const pillars = [
    {
      title: "Library",
      href: "/granthagar",
      desc: "পাঠ্যবইয়ের বাইরে পড়ুন ও জানুন। বইয়ের সংগ্রহ, দাতা এবং নিয়মিত পড়ার অভ্যাস ট্র্যাক করুন।",
      icon: BookOpen,
      badge: "পড়ুন • আবিষ্কার করুন • বিকশিত হন",
      color: "from-sky-500/20 to-indigo-500/20",
    },
    {
      title: "Foundation",
      href: "/foundation",
      desc: "শিক্ষা সহায়তা, কৃষক উন্নয়ন ও জরুরি ত্রাণ—স্বচ্ছ ও দৃশ্যমান সামাজিক প্রভাব সৃষ্টি।",
      icon: HeartHandshake,
      badge: "সেবা • উন্নয়ন • অংশীদারিত্ব",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "Super Shop",
      href: "/super-shop",
      desc: "কমিউনিটি-চালিত সুপার শপ, দ্রুত স্থানীয় ডেলিভারি এবং তরুণদের কাজের বাস্তব সুযোগ।",
      icon: ShoppingBasket,
      badge: "স্থানীয় • তাজা • ন্যায্য",
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "IT Park",
      href: "/it-park",
      desc: "আধুনিক প্রযুক্তি দক্ষতা শিখুন, আয় করুন, জুনিয়রদের মেন্টরিং করুন—বাস্তব Learn & Earn ইকোসিস্টেম।",
      icon: Laptop,
      badge: "শিখুন • আয় করুন • মেন্টরিং",
      color: "from-fuchsia-500/20 to-pink-500/20",
    },
  ];

  useScrollAnimation();

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(99,102,241,0.12),transparent_70%)] dark:bg-[radial-gradient(60%_60%_at_70%_10%,rgba(99,102,241,0.22),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="hero-badge inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 px-3.5 py-1 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> BASAR Group
              </span>
              <h1 className="hero-title text-4xl sm:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Learn. Earn.{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
                  Empower.
                </span>
              </h1>
              <p className="hero-description text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                আমরা একটি সমাজ-কেন্দ্রিক ইকোসিস্টেম, যা বই পড়া, প্রযুক্তি দক্ষতা, কর্মসংস্থান ও স্থানীয় বাণিজ্যের সমন্বয়ে মানুষের জীবনকে সমৃদ্ধ করে তোলে।
              </p>
              <div className="hero-buttons flex flex-wrap gap-3">
                <Link
                  href="/granthagar"
                  className="hover-button group inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-5 py-3 font-semibold shadow-sm transition-all"
                >
                  Library অন্বেষণ করুন
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/foundation"
                  className="hover-button inline-flex items-center gap-2 rounded-xl bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-white/5 px-5 py-3 font-semibold border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 shadow-xs transition-all"
                >
                  প্রভাব দেখুন
                </Link>
              </div>
              <div className="hero-features flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> সবার জন্য উন্মুক্ত
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> ডিজিটাল প্রস্তুত
                </div>
              </div>
            </div>
            <div className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center mt-8 md:mt-0">
              {/* Abstract Glowing Backgrounds */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 dark:from-indigo-600/20 dark:via-fuchsia-600/20 dark:to-emerald-600/20 rounded-full blur-3xl opacity-70 animate-[pulse_4s_ease-in-out_infinite]" />
              
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] h-[280px] sm:h-[320px] lg:h-[360px] z-10">
                {/* Main Glassmorphic Board */}
                <div className="absolute inset-0 bg-white/70 dark:bg-[#141414]/80 backdrop-blur-2xl border border-white/60 dark:border-[#303030]/50 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
                  {/* Inner subtle gradient top */}
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-50/80 dark:from-indigo-900/20 to-transparent pointer-events-none"></div>
                  
                  <div className="relative p-5 sm:p-7 lg:p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-auto">
                      <div className="flex items-center gap-3">
                        <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-xl shadow-lg shadow-indigo-500/30 text-white">
                          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base lg:text-lg">BASAR Ecosystem</h3>
                          <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Real-time Impact</p>
                        </div>
                      </div>
                      <div className="flex gap-1 relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute right-0"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                       <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/50 dark:border-[#303030]/50 shadow-sm transition-transform hover:-translate-y-1">
                         <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-2 sm:mb-3">
                           <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                         </div>
                         <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight">12.5k</p>
                         <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium">Readers Connected</p>
                       </div>
                       <div className="bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/50 dark:border-[#303030]/50 shadow-sm transition-transform hover:-translate-y-1">
                         <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center mb-2 sm:mb-3">
                           <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                         </div>
                         <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight">500+</p>
                         <p className="text-[9px] sm:text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium">Tech Students</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Floating Element 1 - Top Right */}
                <div className="absolute -top-4 -right-2 sm:-top-6 sm:-right-8 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border border-slate-200/60 dark:border-[#303030] rounded-2xl p-3 sm:p-4 shadow-xl transform md:rotate-3 hover:rotate-6 transition-transform duration-300 z-20 w-36 sm:w-40 lg:w-48">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-900 dark:text-white">Foundation</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-[#202020] rounded-full h-1 sm:h-1.5 mb-1 sm:mb-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[85%]"></div>
                  </div>
                  <p className="text-[8px] sm:text-[9px] lg:text-[10px] text-slate-500 dark:text-slate-400 text-right font-medium">Impact Growing</p>
                </div>

                {/* Floating Element 2 - Bottom Left */}
                <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border border-slate-200/60 dark:border-[#303030] rounded-2xl p-2.5 sm:p-3 lg:p-4 shadow-xl transform md:-rotate-3 hover:-rotate-6 transition-transform duration-300 z-20 w-40 sm:w-44 lg:w-52 flex items-center gap-2 sm:gap-3 lg:gap-4">
                  <div className="p-2 sm:p-2.5 lg:p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-100/50 dark:border-amber-900/30 rounded-xl shadow-inner">
                    <ShoppingBasket className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs lg:text-sm font-bold text-slate-900 dark:text-white">Super Shop</p>
                    <p className="text-[8px] sm:text-[9px] lg:text-xs text-slate-500 dark:text-slate-400 font-medium">Local Commerce</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -right-1 bottom-6 sm:-right-4 sm:bottom-8 lg:-right-6 lg:bottom-12 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-[9px] sm:text-[10px] lg:text-xs font-bold px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-full shadow-[0_8px_16px_-4px_rgba(236,72,153,0.4)] flex items-center gap-1 sm:gap-1.5 lg:gap-2 transform md:rotate-12 z-30 hover:scale-105 transition-transform cursor-default">
                  <FaRegSmileBeam className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-pink-100" />
                  <span>বাস্তব পরিবর্তন ✨</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="story-header space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">আমাদের গল্প</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            ঐতিহ্য ও পারস্পরিক ঐক্যের দৃঢ় ভিত্তি থেকে গড়ে উঠেছে BASAR — যা শিক্ষা, জীবিকা ও কমিউনিটি উন্নয়নের এক ভবিষ্যৎমুখী প্ল্যাটফর্ম।
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              year: "অতীত",
              text: "শ্রেষ্ঠত্ব, উদারতা ও সেবার সমৃদ্ধ ঐতিহ্য।",
            },
            {
              year: "বর্তমান",
              text: "Library, Foundation, Super Shop, IT Park—একটি সূত্রে গাঁথা।",
            },
            {
              year: "পরবর্তী ধাপ",
              text: "গ্রাম থেকে জেলা ও দেশব্যাপী কার্যক্রমের সম্প্রসারণ।",
            },
            {
              year: "ভবিষ্যৎ",
              text: "একটি স্বনির্ভর ইকোসিস্টেম যেখানে সবাই এগিয়ে যাবে।",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="story-card hover-card rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#141414] p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                {t.year}
              </span>
              <p className="mt-2 font-medium text-slate-800 dark:text-slate-200 text-sm sm:text-base">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card hover-card rounded-2xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <s.icon className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">{s.label}</span>
              </div>
              <div className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS (Departments) */}
      <section ref={pillarsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pillars-header mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">আমরা যা করি</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
            চারটি সংযুক্ত স্তম্ভ—প্রতিটি স্বতন্ত্র কার্যক্রমে সমৃদ্ধ এবং সামগ্রিকভাবে একত্রিত।
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="pillar-card hover-card rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#141414] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] transition-all duration-300 group"
            >
              <div
                className={`rounded-2xl bg-gradient-to-r ${p.color} p-3.5 inline-flex mb-4 text-slate-800 dark:text-slate-200`}
              >
                <p.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{p.title}</h4>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-slate-400 font-medium">
                  {p.badge}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                ভিজিট করুন <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="values-header mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">আমাদের মূল্যবোধ</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
            যে নীতি ও আদর্শের ভিত্তিতে আমাদের সকল পরিকল্পনা, অপারেশন ও সামাজিক সম্পর্ক পরিচালিত হয়।
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              className="value-card hover-card rounded-2xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#141414] p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.35)] transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800/60 flex items-center justify-center text-pink-600 dark:text-pink-400">
                  <v.icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{v.title}</h4>
              </div>
              <p className="mt-2.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECTED ECOSYSTEM */}
      <section ref={ecosystemRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#141414] p-6 sm:p-8 lg:p-10 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="ecosystem-content flex-1 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                একটি ইকোসিস্টেম, বহুমুখী পথ
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Library-তে জ্ঞানচর্চা করুন → IT Park-এ প্রযুক্তি দক্ষতা শিখুন → Super Shop-এর সাথে কর্মসংস্থান গড়ুন → Foundation-এর মাধ্যমে সমাজে অবদান রাখুন। যেকোনো পর্যায় থেকে শুরু করে সামনে এগিয়ে যাওয়ার সুযোগ।
              </p>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium">
                  পড়ালেখা → দক্ষতা
                </span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium">
                  দক্ষতা → কর্মসংস্থান
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-medium">
                  কর্মসংস্থান → সমাজ উন্নয়ন
                </span>
              </div>
            </div>
            <div className="ecosystem-grid flex-1 grid grid-cols-2 gap-3 w-full">
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Library → অভ্যাস ও বিকাশ</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <Laptop className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">IT Park → দক্ষতা ও ফ্রিল্যান্সিং</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <ShoppingBasket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Super Shop → স্থানীয় বাণিজ্য</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <HeartHandshake className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Foundation → সামাজিক কল্যাণ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 border border-indigo-500/20 dark:border-indigo-800/40 text-white p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="cta-content text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                BASAR অন্বেষণ করতে প্রস্তুত?
              </h3>
              <p className="text-white/90 text-sm sm:text-base mt-1">
                যেকোনো একটি স্তম্ভ থেকে শুরু করুন—সবকিছু একে অপরের সাথে সংযুক্ত।
              </p>
            </div>
            <div className="cta-buttons flex flex-wrap gap-2.5 justify-center">
              <Link
                href="/granthagar"
                className="hover-button bg-white text-slate-900 hover:bg-slate-50 font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
              >
                পড়া শুরু করুন
              </Link>
              <Link
                href="/it-park"
                className="hover-button bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                Learn & Earn
              </Link>
              <Link
                href="/super-shop"
                className="hover-button bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                কেনাকাটা করুন
              </Link>
              <Link
                href="/foundation"
                className="hover-button bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                প্রভাব দেখুন
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          *আমরা কোনো ধরনের অনৈতিক অর্থ সংগ্রহ করি না। সকল সহায়তা ও অনুদান সম্পূর্ণ স্বচ্ছতার সাথে পরিচালিত হয়।
        </p>
      </section>
    </main>
  );
}
