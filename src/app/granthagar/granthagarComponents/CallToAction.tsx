"use client";

import React, { useRef } from "react";
import { BookOpen, Heart, Users, ArrowRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".cta-header", { y: 60, opacity: 0 });
    gsap.set(".cta-card", { y: 100, opacity: 0, scale: 0.9 });
    gsap.set(".cta-icon", { scale: 0, opacity: 0 });
    gsap.set(".cta-title", { y: 20, opacity: 0 });
    gsap.set(".cta-description", { y: 15, opacity: 0 });
    gsap.set(".cta-price", { scale: 0.8, opacity: 0 });
    gsap.set(".cta-button", { y: 20, opacity: 0, scale: 0.9 });
    gsap.set(".bottom-cta", { y: 80, opacity: 0, scale: 0.95 });
    gsap.set(".final-buttons", { y: 30, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".cta-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".cta-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".cta-icon", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(".cta-title", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(".cta-description", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "sine.out"
    }, "-=0.3")
    .to(".cta-price", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(".cta-button", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".bottom-cta", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".final-buttons", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.4)"
    }, "-=0.3");

    // Pulse animation for icons
    gsap.to(".cta-icon", {
      scale: 1.1,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 3
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 dark:bg-[#070b14] text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-header text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight text-white">
            পড়ার মাধ্যমে নিজের জীবন পরিবর্তনের জন্য প্রস্তুত?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            আমাদের বইপ্রেমী পাঠকদের কমিউনিটিতে যোগ দিন এবং পাঠ্যবইয়ের বাইরে শেখার আনন্দ উপভোগ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Join as Member */}
          <div className="cta-card bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-xl p-8 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 text-emerald-400">
                <Users className="cta-icon w-7 h-7" />
              </div>
              <h3 className="cta-title text-xl font-bold mb-3 text-white">সদস্য হিসেবে যুক্ত হোন</h3>
              <p className="cta-description text-slate-300 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                500+ বইয়ের অ্যাক্সেস, রিডিং ট্র্যাকার এবং বিশেষ কমিউনিটি সুবিধাসহ আপনার পাঠযাত্রা শুরু করুন।
              </p>
            </div>
            <div>
              <div className="cta-price bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-amber-400">৳100</div>
                <div className="text-xs text-slate-400 mt-0.5">ফেরতযোগ্য জামানত</div>
              </div>
              <a href="/granthagar/membership" className="cta-button w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm active:scale-[0.99]">
                <span>সদস্যপদ গ্রহণ করুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Donate Books */}
          <div className="cta-card bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-xl p-8 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-rose-500/10 dark:bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 text-rose-400">
                <Heart className="cta-icon w-7 h-7" />
              </div>
              <h3 className="cta-title text-xl font-bold mb-3 text-white">বই দান করুন</h3>
              <p className="cta-description text-slate-300 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                কমিউনিটিতে জ্ঞানের আলো ছড়িয়ে দিন। আপনার দান করা বই বহু শিক্ষার্থীর জীবনের পথ দেখাবে।
              </p>
            </div>
            <div>
              <div className="cta-price bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-emerald-400">ফ্রি</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  আমরা আপনার কাছ থেকে সংগ্রহ করব
                </div>
              </div>
              <a href="/granthagar/donors" className="cta-button w-full bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm active:scale-[0.99]">
                <span>এখনই বই দান করুন</span>
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Browse Books */}
          <div className="cta-card bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-xl p-8 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-5 text-blue-400">
                <BookOpen className="cta-icon w-7 h-7" />
              </div>
              <h3 className="cta-title text-xl font-bold mb-3 text-white">বই অন্বেষণ করুন</h3>
              <p className="cta-description text-slate-300 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                একাধিক ক্যাটাগরি ও জনরায় সমৃদ্ধ আমাদের বইয়ের সংগ্রহশালা ঘুরে দেখুন।
              </p>
            </div>
            <div>
              <div className="cta-price bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-xs text-slate-400 mt-0.5">উপলব্ধ বই</div>
              </div>
              <a href="/granthagar/books-catalog" className="cta-button w-full bg-slate-700 hover:bg-slate-600 border border-slate-600/60 dark:border-[#303030] text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm active:scale-[0.99]">
                <span>কালেকশন ব্রাউজ করুন</span>
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bottom-cta bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-2xl p-8 sm:p-12 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              বই পড়া হয়তো তাৎক্ষণিক পুরস্কার এনে দেয় না, কিন্তু দীর্ঘমেয়াদে এটি জীবনকে বদলে দেয়।
            </h3>
            <p className="text-slate-300 dark:text-slate-400 mb-8 text-base max-w-2xl mx-auto">
              স্মার্টফোনে উদ্দেশ্যহীন স্ক্রোলিংয়ে আরেকটি দিন নষ্ট করবেন না। আজ থেকেই শুরু হোক আপনার ইতিবাচক রূপান্তর।
            </p>
            <div className="final-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/granthagar/books-catalog" className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-colors shadow-sm active:scale-[0.99]">
                আজই পড়া শুরু করুন
              </a>
              <a href="/granthagar/membership" className="inline-block border border-slate-600 dark:border-[#303030] bg-transparent hover:bg-slate-700/40 text-slate-200 dark:text-slate-300 px-8 py-3.5 rounded-xl font-medium text-base transition-colors">
                বিস্তারিত জানুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;