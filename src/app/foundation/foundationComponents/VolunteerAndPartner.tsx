"use client";

import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "UN SDG", logo: "🌍" },
  { name: "UNESCO", logo: "📚" },
  { name: "WHO", logo: "🏥" },
  { name: "UNICEF", logo: "👶" },
  { name: "Red Cross", logo: "➕" },
  { name: "Oxfam", logo: "🤝" },
];

function VolunteerAndPartner() {
  const containerRef = useRef(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Volunteer section - simple left slide
      gsap.from(".volunteer-section", {
        scrollTrigger: {
          trigger: ".volunteer-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // Partners section - simple right slide
      gsap.from(".partners-section", {
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Volunteer Form */}
          <div className="volunteer-section bg-white dark:bg-[#141414] p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              স্বেচ্ছাসেবক হিসেবে যুক্ত হোন
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              আমাদের একনিষ্ঠ স্বেচ্ছাসেবী দলের অংশ হোন এবং সাধারণ মানুষের জীবনে প্রত্যক্ষ ইতিবাচক ভূমিকা রাখুন।
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("ধন্যবাদ! আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।"); }} className="space-y-4">
              <input
                type="text"
                required
                placeholder="আপনার পূর্ণ নাম"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <input
                type="email"
                required
                placeholder="ইমেইল ঠিকানা"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="ফোন নম্বর"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
              />
              <textarea
                placeholder="কেন আপনি আমাদের সাথে স্বেচ্ছাসেবী হতে চান?"
                rows={4}
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-all duration-200 font-medium text-sm shadow-sm active:scale-[0.99]"
              >
                স্বেচ্ছাসেবী দলে যুক্ত হোন
              </button>
            </form>
          </div>

          {/* Partners */}
          <div className="partners-section flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              আমাদের সহযোগী সংস্থাসমূহ
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              সামাজিক রূপান্তর ও সেবার পরিধি বাড়াতে দেশীয় ও আন্তর্জাতিক উন্নয়ন সহযোগী সংস্থার সাথে যৌথ অংশীদারিত্ব।
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#141414] p-5 rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 text-center group"
                >
                  <div className="text-3xl mb-2 transition-transform duration-200 group-hover:scale-110">{partner.logo}</div>
                  <h3 className="font-medium text-slate-900 dark:text-white text-xs sm:text-sm">
                    {partner.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VolunteerAndPartner;
