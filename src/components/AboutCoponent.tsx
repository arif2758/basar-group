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
            <div className="relative">
              <div className="hero-visual aspect-video rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-pink-500/10 to-amber-500/10 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-slate-900/60 p-2.5 border border-slate-200/80 dark:border-white/10 shadow-xl">
                <div className="h-full w-full rounded-2xl bg-white dark:bg-[#141414] grid grid-cols-3 gap-2.5 p-2.5 border border-slate-100 dark:border-white/5">
                  <div className="col-span-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-center">
                    <BookOpen className="w-9 h-9 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center">
                    <HeartHandshake className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 flex items-center justify-center">
                    <ShoppingBasket className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="col-span-2 rounded-xl bg-fuchsia-50 dark:bg-fuchsia-950/30 border border-fuchsia-100 dark:border-fuchsia-900/40 flex items-center justify-center">
                    <Laptop className="w-9 h-9 text-fuchsia-600 dark:text-fuchsia-400" />
                  </div>
                </div>
              </div>
              <div className="hero-badge-floating absolute -bottom-5 -right-3 sm:-right-5 rounded-2xl bg-white/95 dark:bg-[#141414]/95 border border-slate-200 dark:border-[#303030] shadow-lg backdrop-blur-md px-4 py-3 text-xs sm:text-sm flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <FaRegSmileBeam className="text-amber-500 w-4 h-4" />
                <span>বাস্তব পরিবর্তনের নিশ্চয়তা ✨</span>
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
