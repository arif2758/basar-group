"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, ShoppingBasket, Laptop, Sparkles, Users, Globe2, Target, ShieldCheck, LineChart } from "lucide-react";
import { FaLeaf, FaRegSmileBeam } from "react-icons/fa";

/** Small reveal-on-scroll helper */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("opacity-0", "translate-y-6");
            e.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      child.style.transitionDelay = `${Math.min(i * 60, 400)}ms`;
      io.observe(child);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function AboutCoponent() {
  const revealRef = useReveal<HTMLDivElement>();

  const stats = [
    { label: "Learners engaged", value: "12,500+", icon: Users },
    { label: "Books delivered", value: "38,000+", icon: BookOpen },
    { label: "Local jobs created", value: "350+", icon: LineChart },
    { label: "Communities served", value: "40+", icon: Globe2 },
  ];

  const values = [
    { title: "Integrity", desc: "We do the right thing—always.", icon: ShieldCheck },
    { title: "Impact", desc: "Decisions that change lives.", icon: Target },
    { title: "Joy", desc: "Learning should feel good.", icon: FaRegSmileBeam },
    { title: "Sustainability", desc: "People, planet, prosperity.", icon: FaLeaf },
  ];

  const pillars = [
    {
      title: "Library",
      href: "/library",
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
      href: "/shop",
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white px-3 py-1 text-xs font-semibold shadow">
                <Sparkles className="w-3.5 h-3.5" /> BASAR Group
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Learn. Earn. <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">Empower.</span>
              </h1>
              <p className="text-lg text-slate-600">
                We’re a community-first ecosystem transforming lives through reading, skill-building, jobs, and local commerce. Minimal by look, rich by impact.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/library"
                  className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 font-semibold shadow hover:shadow-lg transition"
                >
                  Explore Library
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>
                <Link
                  href="/foundation"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold border border-slate-200 hover:border-slate-300 hover:shadow transition"
                >
                  See Impact
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> Open for everyone
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4" /> i18n ready
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl bg-gradient-to-tr from-indigo-100 via-pink-100 to-amber-100 p-2 shadow-xl">
                <div className="h-full w-full rounded-2xl bg-white grid grid-cols-3 gap-2 p-2">
                  {/* playful mosaic */}
                  <div className="col-span-2 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-indigo-500" />
                  </div>
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <HeartHandshake className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <ShoppingBasket className="w-8 h-8 text-amber-500" />
                  </div>
                  <div className="col-span-2 rounded-xl bg-fuchsia-50 border border-fuchsia-100 flex items-center justify-center">
                    <Laptop className="w-10 h-10 text-fuchsia-500" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-2xl bg-white border border-slate-200 shadow px-4 py-3 text-sm flex items-center gap-2">
                <FaRegSmileBeam className="text-amber-500" />
                Wow experience guaranteed ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-6 py-8" ref={revealRef}>
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
          <p className="text-slate-600">
            From a proud lineage of choosing the best—BASAR grew into a future-ready platform for learning, livelihood, and community wellbeing.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-4" >
          {[
            { year: "Past", text: "Rooted in a culture of excellence & generosity." },
            { year: "Now", text: "Library, Foundation, Super Shop, IT Park—working as one." },
            { year: "Next", text: "Scale across neighborhoods, districts, and beyond." },
            { year: "Future", text: "A self-sustaining ecosystem where everyone can thrive." },
          ].map((t, i) => (
            <div
              key={i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">{t.year}</span>
              <p className="mt-2 font-medium">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-10" ref={revealRef}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700 rounded-2xl bg-gradient-to-tr from-white to-slate-50 border border-slate-200 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <s.icon className="w-6 h-6 text-indigo-600" />
                <span className="text-sm text-slate-500">{s.label}</span>
              </div>
              <div className="mt-3 text-2xl font-extrabold">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS (Departments) */}
      <section className="max-w-7xl mx-auto px-6 py-6" ref={revealRef}>
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold">What we do</h3>
          <p className="text-slate-600">Four connected pillars—each feels like its own product, yet all work together.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              data-reveal
              className={`opacity-0 translate-y-6 transition-all duration-700 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className={`rounded-2xl bg-gradient-to-r ${p.color} p-4 inline-flex mb-4`}>
                <p.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xl font-bold">{p.title}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-100">{p.badge}</span>
              </div>
              <p className="mt-2 text-slate-600">{p.desc}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-indigo-600 font-semibold">
                Visit <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-6 py-10" ref={revealRef}>
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold">Our Values</h3>
          <p className="text-slate-600">Principles that shape our design, ops, and community relationships.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <div
              key={i}
              data-reveal
              className="opacity-0 translate-y-6 transition-all duration-700 rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <v.icon className="w-5 h-5 text-pink-600" />
                <h4 className="font-semibold">{v.title}</h4>
              </div>
              <p className="mt-2 text-slate-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONNECTED ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-6 py-10" ref={revealRef}>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-3" data-reveal>
              <h3 className="text-2xl sm:text-3xl font-bold">One ecosystem, many paths</h3>
              <p className="text-slate-600">
                Read at the Library → learn skills at the IT Park → earn via Super Shop ops → give back through the Foundation.
                Everyone can enter anywhere and keep moving forward.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm">Reading → Skills</span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm">Skills → Jobs</span>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm">Jobs → Community</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 w-full" data-reveal>
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-indigo-50 to-white border border-indigo-100">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                <p className="mt-2 font-medium">Library → habit & discovery</p>
              </div>
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-fuchsia-50 to-white border border-fuchsia-100">
                <Laptop className="w-6 h-6 text-fuchsia-600" />
                <p className="mt-2 font-medium">IT Park → skills & gigs</p>
              </div>
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-emerald-50 to-white border border-emerald-100">
                <ShoppingBasket className="w-6 h-6 text-emerald-600" />
                <p className="mt-2 font-medium">Super Shop → local commerce</p>
              </div>
              <div className="rounded-2xl p-4 bg-gradient-to-tr from-amber-50 to-white border border-amber-100">
                <HeartHandshake className="w-6 h-6 text-amber-600" />
                <p className="mt-2 font-medium">Foundation → social impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-white p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-extrabold">Ready to explore BASAR?</h3>
              <p className="text-white/90">Jump into any pillar—everything connects.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/library" className="bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl hover:shadow transition">
                Start Reading
              </Link>
              <Link href="/it-park" className="bg-white/10 backdrop-blur border border-white/20 px-5 py-3 rounded-xl hover:bg-white/20 transition">
                Learn & Earn
              </Link>
              <Link href="/shop" className="bg-white/10 backdrop-blur border border-white/20 px-5 py-3 rounded-xl hover:bg-white/20 transition">
                Shop Local
              </Link>
              <Link href="/foundation" className="bg-white/10 backdrop-blur border border-white/20 px-5 py-3 rounded-xl hover:bg-white/20 transition">
                See Impact
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          *We don’t collect donations online. Offline contributors are acknowledged transparently in relevant sections.
        </p>
      </section>
    </main>
  );
}
