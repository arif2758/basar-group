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
    { label: "Learners engaged", value: "12,500+", icon: Users },
    { label: "Books delivered", value: "38,000+", icon: BookOpen },
    { label: "Local jobs created", value: "350+", icon: LineChart },
    { label: "Communities served", value: "40+", icon: Globe2 },
  ];

  const values = [
    {
      title: "Integrity",
      desc: "We do the right thing—always.",
      icon: ShieldCheck,
    },
    { title: "Impact", desc: "Decisions that change lives.", icon: Target },
    { title: "Joy", desc: "Learning should feel good.", icon: FaRegSmileBeam },
    {
      title: "Sustainability",
      desc: "People, planet, prosperity.",
      icon: FaLeaf,
    },
  ];

  const pillars = [
    {
      title: "Library",
      href: "/granthagar",
      desc: "Order & read beyond textbooks. Track availability, donors, and reading streaks.",
      icon: BookOpen,
      badge: "Read • Discover • Grow",
      color: "from-sky-500/20 to-indigo-500/20",
    },
    {
      title: "Foundation",
      href: "/foundation",
      desc: "Education aid, farmer support, seasonal relief—transparent impact at scale.",
      icon: HeartHandshake,
      badge: "Care • Uplift • Share",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "Super Shop",
      href: "/super-shop",
      desc: "Community-powered grocery with fast local delivery & youth upskilling.",
      icon: ShoppingBasket,
      badge: "Local • Fresh • Fair",
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "IT Park",
      href: "/it-park",
      desc: "Learn skills, earn income, mentor juniors—true Learn & Earn ecosystem.",
      icon: Laptop,
      badge: "Learn • Earn • Mentor",
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
                We&apos;re a community-first ecosystem transforming lives
                through reading, skill-building, jobs, and local commerce.
                Minimal by look, rich by impact.
              </p>
              <div className="hero-buttons flex flex-wrap gap-3">
                <Link
                  href="/granthagar"
                  className="hover-button group inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-5 py-3 font-semibold shadow-sm transition-all"
                >
                  Explore Library
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/foundation"
                  className="hover-button inline-flex items-center gap-2 rounded-xl bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-white/5 px-5 py-3 font-semibold border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 shadow-xs transition-all"
                >
                  See Impact
                </Link>
              </div>
              <div className="hero-features flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Open for everyone
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> i18n ready
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
                <span>Wow experience guaranteed ✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section ref={storyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="story-header space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Story</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            From a proud lineage of choosing the best—BASAR grew into a
            future-ready platform for learning, livelihood, and community
            wellbeing.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              year: "Past",
              text: "Rooted in a culture of excellence & generosity.",
            },
            {
              year: "Now",
              text: "Library, Foundation, Super Shop, IT Park—working as one.",
            },
            {
              year: "Next",
              text: "Scale across neighborhoods, districts, and beyond.",
            },
            {
              year: "Future",
              text: "A self-sustaining ecosystem where everyone can thrive.",
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
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">What we do</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
            Four connected pillars—each feels like its own product, yet all work
            together.
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
                Visit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section ref={valuesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="values-header mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Our Values</h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
            Principles that shape our design, ops, and community relationships.
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
                One ecosystem, many paths
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Read at the Library → learn skills at the IT Park → earn via
                Super Shop ops → give back through the Foundation. Everyone can
                enter anywhere and keep moving forward.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium">
                  Reading → Skills
                </span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium">
                  Skills → Jobs
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs sm:text-sm font-medium">
                  Jobs → Community
                </span>
              </div>
            </div>
            <div className="ecosystem-grid flex-1 grid grid-cols-2 gap-3 w-full">
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Library → habit & discovery</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <Laptop className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">IT Park → skills & gigs</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <ShoppingBasket className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Super Shop → local commerce</p>
              </div>
              <div className="ecosystem-card rounded-2xl p-4 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030]">
                <HeartHandshake className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <p className="mt-2 font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200">Foundation → social impact</p>
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
                Ready to explore BASAR?
              </h3>
              <p className="text-white/90 text-sm sm:text-base mt-1">
                Jump into any pillar—everything connects.
              </p>
            </div>
            <div className="cta-buttons flex flex-wrap gap-2.5 justify-center">
              <Link
                href="/granthagar"
                className="hover-button bg-white text-slate-900 hover:bg-slate-50 font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
              >
                Start Reading
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
                Shop Local
              </Link>
              <Link
                href="/foundation"
                className="hover-button bg-white/15 hover:bg-white/25 backdrop-blur border border-white/20 text-white font-semibold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
              >
                See Impact
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          *We don&apos;t collect donations online. Offline contributors are
          acknowledged transparently in relevant sections.
        </p>
      </section>
    </main>
  );
}
