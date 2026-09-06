"use client";

import React, { useRef } from "react";
import { BookOpen, Users, Award, Truck } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";



const HeroGranthagar: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".hero-title", { y: 60, opacity: 0 });
    gsap.set(".hero-quote", { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(".hero-buttons", { y: 30, opacity: 0 });
    gsap.set(".hero-stat", { y: 40, opacity: 0, scale: 0.9 });

    // Create timeline
    const tl = gsap.timeline();

    // Animate in sequence
    tl.to(".hero-title", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to(".hero-quote", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.5")
    .to(".hero-buttons", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(".hero-stat", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.3");

    // Floating animation for quote box
    gsap.to(".hero-quote", {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="bg-white dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-slate-900 dark:text-white">
            প্রতিটি বইয়ের পাতায়,
            <br />
            <span className="text-emerald-600 dark:text-emerald-400">উদ্বুদ্ধ হোক আপনার চিন্তা</span>
          </h1>
 
          <div className="hero-quote bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 mb-8 max-w-3xl mx-auto shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
              &quot;বই পড়া হয়তো তাৎক্ষণিক পুরস্কার এনে দেয় না, কিন্তু দীর্ঘমেয়াদে এটি জীবনকে বদলে দেয়। আমাদের কমিউনিটি Library-তে যুক্ত হোন এবং পাঠ্যবইয়ের বাইরে অনন্ত জ্ঞানের সন্ধান পান।&quot;
            </p>
            <p className="text-emerald-600 dark:text-emerald-400 mt-2 text-sm font-semibold">
              — BASAR লাইব্রেরি টিম
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a href="/granthagar/membership" className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-all shadow-sm active:scale-[0.98]">
              লাইব্রেরিতে যুক্ত হোন
            </a>
            <a href="/granthagar/books-catalog" className="inline-flex items-center justify-center bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#303030] px-8 py-3.5 rounded-xl font-medium text-base transition-all shadow-sm">
              বই খুঁজুন
            </a>
            <a href="/granthagar/donors" className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-all shadow-sm active:scale-[0.98]">
              বই দান করুন
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="hero-stat text-center bg-slate-50 dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800/40 rounded-xl flex items-center justify-center mx-auto mb-3 text-emerald-600 dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">500+</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">উপলব্ধ বই</div>
            </div>
            <div className="hero-stat text-center bg-slate-50 dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">200+</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">সক্রিয় সদস্য</div>
            </div>
            <div className="hero-stat text-center bg-slate-50 dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800/40 rounded-xl flex items-center justify-center mx-auto mb-3 text-amber-500 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">50+</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">উদার দাতা</div>
            </div>
            <div className="hero-stat text-center bg-slate-50 dark:bg-[#141414] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/40 rounded-xl flex items-center justify-center mx-auto mb-3 text-purple-600 dark:text-purple-400">
                <Truck className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">30min</div>
              <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">ফ্রি ডেলিভারি</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGranthagar;