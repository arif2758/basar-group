"use client";

import React, { useState, useRef } from "react";
import { Users, Droplet, Heart, CheckCircle2, Send, Sparkles, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: "বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি", type: "জরুরি দুর্যোগ পার্টনার", logo: "🏥" },
  { name: "মাদারীপুর যুব উন্নয়ন অধিদপ্তর", type: "দক্ষতা ও যুব প্রশিক্ষণ", logo: "🎓" },
  { name: "বাছার সুপার শপ", type: "খাদ্য ও লজিস্টিক সহায়তা", logo: "🛒" },
  { name: "বাছার আইটি পার্ক", type: "ফ্রি কম্পিউটার ও স্কিল ট্রেনিং", logo: "💻" },
  { name: "বাছার পাঠাগার ও গবেষণা কেন্দ্র", type: "শিক্ষা ও সাহিত্য বিকাশ", logo: "📚" },
  { name: "কমিউনিটি হেলথ ফাউন্ডেশন", type: "ফ্রি রক্ত ও চিকিৎসা ক্যাম্প", logo: "🩸" },
];

function VolunteerAndPartner() {
  const containerRef = useRef(null);
  const [activeFormTab, setActiveFormTab] = useState<"volunteer" | "blood">("volunteer");

  // Volunteer state
  const [volName, setVolName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [volSkill, setVolSkill] = useState("education");
  const [volMsg, setVolMsg] = useState("");

  // Blood donor state
  const [bloodName, setBloodName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [bloodPhone, setBloodPhone] = useState("");
  const [bloodDistrict, setBloodDistrict] = useState("মাদারীপুর");
  const [lastDonationDate, setLastDonationDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      gsap.from(".volunteer-section", {
        scrollTrigger: {
          trigger: ".volunteer-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".partners-section", {
        scrollTrigger: {
          trigger: ".partners-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (activeFormTab === "volunteer") {
        setSuccessMessage("স্বেচ্ছাসেবক হিসেবে রেজিস্ট্রেশনের জন্য ধন্যবাদ! আমাদের সমন্বয়কারী টিম দ্রুত যোগাযোগ করবে।");
      } else {
        setSuccessMessage("জরুরি রক্তদাতা ক্লাবে যুক্ত হওয়ার জন্য আপনাকে অভিনন্দন! আপনার এই রক্ত একটি জীবন বাঁচাতে পারে।");
      }
      setTimeout(() => setSuccessMessage(null), 5000);
      setVolName("");
      setVolEmail("");
      setVolPhone("");
      setVolMsg("");
      setBloodName("");
      setBloodPhone("");
    }, 800);
  };

  return (
    <section id="volunteer" ref={containerRef} className="py-12 sm:py-16 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Form: Volunteer & Blood Registry */}
          <div className="lg:col-span-7 volunteer-section bg-white dark:bg-[#1f1f1f] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm">
            {/* Tab switch */}
            <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveFormTab("volunteer");
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeFormTab === "volunteer"
                    ? "bg-[#1677ff] text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#262626]"
                }`}
              >
                <Users className="size-4" />
                <span>স্বেচ্ছাসেবক নিবন্ধন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveFormTab("blood");
                  setSuccessMessage(null);
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeFormTab === "blood"
                    ? "bg-rose-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-[#262626]"
                }`}
              >
                <Droplet className="size-4 fill-current" />
                <span>রক্তদাতা নিবন্ধন</span>
              </button>
            </div>

            {successMessage ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-[#162312] border border-emerald-200 dark:border-[#274916] text-center space-y-2.5 animate-fadeIn">
                <div className="size-11 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="size-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">আবেদন গৃহীত হয়েছে!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {activeFormTab === "volunteer" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          আপনার পূর্ণ নাম *
                        </label>
                        <input
                          type="text"
                          required
                          value={volName}
                          onChange={(e) => setVolName(e.target.value)}
                          placeholder="উদা: তাওহীদ হাসান"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          মোবাইল নম্বর *
                        </label>
                        <input
                          type="tel"
                          required
                          value={volPhone}
                          onChange={(e) => setVolPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          ইমেইল ঠিকানা
                        </label>
                        <input
                          type="email"
                          value={volEmail}
                          onChange={(e) => setVolEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          যে খাতে সেবা দিতে আগ্রহী
                        </label>
                        <select
                          value={volSkill}
                          onChange={(e) => setVolSkill(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                        >
                          <option value="education">শিক্ষা ও পাঠশালা ক্যাম্পেইন</option>
                          <option value="relief">ত্রাণ বিতরণ ও মাঠপর্যায়ের কার্যক্রম</option>
                          <option value="medical">মেডিকেল ক্যাম্প ও রক্তদান সমন্বয়</option>
                          <option value="digital">ডিজিটাল মিডিয়া ও ফটোগ্রাফি</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        আপনার প্রেরণা বা অভিজ্ঞতা সংক্ষেপে লিখুন
                      </label>
                      <textarea
                        rows={3}
                        value={volMsg}
                        onChange={(e) => setVolMsg(e.target.value)}
                        placeholder="কেন আপনি সমাজের মানুষের পাশে দাঁড়াতে চান?..."
                        className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#1677ff]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                      <span>স্বেচ্ছাসেবী দলে যুক্ত হোন</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          রক্তদাতার নাম *
                        </label>
                        <input
                          type="text"
                          required
                          value={bloodName}
                          onChange={(e) => setBloodName(e.target.value)}
                          placeholder="উদা: সাকিবুল ইসলাম"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          রক্তের গ্রুপ *
                        </label>
                        <select
                          value={bloodGroup}
                          onChange={(e) => setBloodGroup(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-rose-500"
                        >
                          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                            <option key={bg} value={bg}>
                              {bg} গ্রুপ
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          মোবাইল নম্বর (জরুরি সময়ে কল যাবে) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={bloodPhone}
                          onChange={(e) => setBloodPhone(e.target.value)}
                          placeholder="01XXXXXXXXX"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                          বর্তমান জেলা ও এলাকা *
                        </label>
                        <input
                          type="text"
                          required
                          value={bloodDistrict}
                          onChange={(e) => setBloodDistrict(e.target.value)}
                          placeholder="উদা: মাদারীপুর সদর"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-white text-xs focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-[#2c1618] border border-rose-200/80 dark:border-[#5b2123] text-xs text-rose-800 dark:text-[#ff7875] flex items-center gap-2">
                      <Droplet className="size-4 shrink-0 fill-current text-rose-600" />
                      <span>
                        আপনার এই রক্ত কোনো মুমূর্ষু মা, শিশু বা দুর্ঘটনাকবলিত মানুষের জীবন রক্ষা করবে।
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 rounded-xl text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Droplet className="size-4 fill-current" />}
                      <span>জরুরি রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন করুন</span>
                    </button>
                  </>
                )}
              </form>
            )}
          </div>

          {/* Right: Partner Network & Local Ecosystem */}
          <div className="lg:col-span-5 partners-section space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[#111a2c] text-[#1677ff] dark:text-[#4096ff] text-xs font-bold mb-2 border border-blue-200/80 dark:border-[#15325b]">
                <Sparkles className="size-3.5" />
                <span>যৌথ উদ্যোগ ও নেটওয়ার্ক</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                আমাদের সহযোগী সংস্থা ও উদ্যোগসমূহ
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                বাছার গ্রুপের অঙ্গপ্রতিষ্ঠান ও স্থানীয় প্রশাসনের সমন্বিত সহযোগিতায় সমাজকল্যাণমূলক কার্যক্রম প্রতিটি প্রত্যন্ত অঞ্চলে পৌঁছে দেওয়া হয়।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] shadow-xs hover:border-[#1677ff]/40 transition-colors"
                >
                  <div className="text-xl mb-1.5">{partner.logo}</div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{partner.name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{partner.type}</p>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] flex items-center gap-3">
              <ShieldCheck className="size-5 text-[#1677ff] shrink-0" />
              <p className="text-xs text-slate-700 dark:text-slate-300">
                স্বেচ্ছাসেবকদের কার্যক্রম মূল্যায়ন করে বার্ষিক ডিজিটাল সার্টিফিকেট ও ভলান্টিয়ার অ্যাওয়ার্ড প্রদান করা হয়।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VolunteerAndPartner;
