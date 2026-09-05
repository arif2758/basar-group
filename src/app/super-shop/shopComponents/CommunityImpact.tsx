"use client";

import { useRef } from "react";
import {
  Users,
  TrendingUp,
  Heart,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Truck,
  Quote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CommunityImpact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      number: "120+",
      label: "Youth Employed",
      description: "College students earning dignified tuition fees",
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      icon: TrendingUp,
      number: "৳2.4M+",
      label: "Wages & Stipends",
      description: "Direct financial support to local youth & families",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    {
      icon: Heart,
      number: "5,200+",
      label: "Families Nourished",
      description: "Households enjoying fresh chemical-free groceries",
      badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    },
    {
      icon: Award,
      number: "100%",
      label: "Profit Reinvested",
      description: "All surplus funds free IT education & community library",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
  ];

  const pillars = [
    {
      title: "Fair-Trade Sourcing",
      desc: "Direct partnership with grassroots farmers, cutting out exploitative middlemen and ensuring growers receive honest prices.",
    },
    {
      title: "Flexible Student Shifts",
      desc: "Local university and college youths work structured 3-4 hour delivery and packing shifts that fit seamlessly around classes.",
    },
    {
      title: "Hygienic & Eco-Friendly Packaging",
      desc: "Biodegradable paper bags and sanitized crates to minimize plastic waste and keep vegetables crisp.",
    },
    {
      title: "Profits Fund Free Education",
      desc: "Surplus earnings directly fund BASAR Granthagar (Free Library) and BASAR IT Park computer courses.",
    },
  ];

  useScrollAnimation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".impact-card-anim",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-white dark:bg-[#070b14] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-4">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Social Enterprise Mission</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            More Than Just Groceries.
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              Empowering Community Lives.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Every basket of fresh vegetables and staple grains ordered through BASAR Super Shop directly supports student tuition, fair farmer compensation, and social development programs.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="impact-card-anim bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${stat.badgeColor}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.number}
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-200 mb-1">
                  {stat.label}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Two-Column Showcase: Pillars & Spotlight Story */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate-50/60 dark:bg-[#121824] border border-slate-200/80 dark:border-[#303030] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
          {/* Left Column: Pillars */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>How The Social Model Works</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug mb-6">
              A Cycle of Community Growth & Self-Reliance
            </h3>

            <div className="space-y-4 sm:space-y-5">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/foundation"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
              >
                <span>Learn About BASAR Foundation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Youth Partner Story Card */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-6 sm:p-8 shadow-lg relative">
              <Quote className="w-10 h-10 text-emerald-500/20 absolute top-6 right-6" />

              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/40">
                  <Image
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
                    alt="Tanvir Ahmed - Delivery Associate"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    Tanvir Ahmed
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    Delivery Associate & University Student
                  </p>
                </div>
              </div>

              <blockquote className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                &ldquo;Before BASAR Super Shop, it was difficult to afford my semester exam fees and books. Now, working flexible shifts delivering fresh groceries allows me to graduate with dignity without burdening my family.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Joined: June 2024</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Verified Partner ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
