"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Trophy, Gift, Users } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const MonthlyQuiz: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const previousWinners = [
    { name: "Sara Ahmed", prize: "Kindle E-reader", month: "নভেম্বর" },
    { name: "Karim Hassan", prize: "বুক ভাউচার (৳500)", month: "অক্টোবর" },
    { name: "Nadia Khan", prize: "প্রিমিয়াম মেম্বারশিপ", month: "সেপ্টেম্বর" },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".quiz-header", { y: 50, opacity: 0 });
    gsap.set(".quiz-info", { x: -60, opacity: 0 });
    gsap.set(".prize-item", { x: -30, opacity: 0 });
    gsap.set(".winner-item", { x: -20, opacity: 0 });
    gsap.set(".countdown-section", { x: 60, opacity: 0 });
    gsap.set(".countdown-timer", { scale: 0.8, opacity: 0 });
    gsap.set(".quiz-topics", { y: 30, opacity: 0 });
    gsap.set(".topic-item", { scale: 0.8, opacity: 0 });
    gsap.set(".register-button", { y: 20, opacity: 0, scale: 0.9 });
    gsap.set(".quiz-note", { y: 15, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".quiz-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".quiz-info", {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.4")
    .to(".countdown-section", {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.6")
    .to(".prize-item", {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".countdown-timer", {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(".winner-item", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "sine.out"
    }, "-=0.4")
    .to(".quiz-topics", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(".topic-item", {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.3")
    .to(".register-button", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .to(".quiz-note", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "sine.out"
    }, "-=0.1");

    // Floating animation for countdown timer
    gsap.to(".countdown-timer", {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 dark:bg-[#070b14] text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quiz-header text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl mb-4 text-amber-400">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            ডিসেম্বর পাঠ কুইজ প্রতিযোগিতা
          </h2>
          <p className="text-slate-300 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            এই মাসের নির্বাচিত বইগুলো থেকে আপনার জ্ঞান পরীক্ষা করুন এবং জিতে নিন আকর্ষণীয় পুরস্কার!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Quiz Info */}
          <div className="quiz-info space-y-8">
            <div className="bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-xl p-6 sm:p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-bold mb-5 flex items-center space-x-2 text-white">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>এই মাসের পুরস্কারসমূহ</span>
              </h3>

              <div className="space-y-3">
                <div className="prize-item flex items-center justify-between bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4">
                  <span className="font-medium text-slate-200">🏆 1st স্থান</span>
                  <span className="text-amber-400 font-semibold">
                    iPad Mini + বইয়ের কালেকশন
                  </span>
                </div>
                <div className="prize-item flex items-center justify-between bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4">
                  <span className="font-medium text-slate-200">🥈 2nd স্থান</span>
                  <span className="text-slate-300 font-semibold">
                    বুক ভাউচার (৳1000)
                  </span>
                </div>
                <div className="prize-item flex items-center justify-between bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-lg p-4">
                  <span className="font-medium text-slate-200">🥉 3rd স্থান</span>
                  <span className="text-amber-300 font-semibold">
                    3 মাসের প্রিমিয়াম মেম্বারশিপ
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2 text-white">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>বিগত বিজয়ীগণ</span>
              </h4>
              <div className="space-y-3">
                {previousWinners.map((winner, index) => (
                  <div
                    key={index}
                    className="winner-item flex items-center justify-between text-sm py-2 border-b border-slate-700/40 dark:border-[#262626] last:border-b-0"
                  >
                    <div>
                      <span className="font-medium text-slate-200">{winner.name}</span>
                      <span className="text-slate-400 text-xs ml-2">
                        ({winner.month})
                      </span>
                    </div>
                    <span className="text-amber-400 font-medium text-xs">
                      {winner.prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-section text-center">
            <div className="countdown-timer bg-slate-800/80 dark:bg-[#141414] border border-slate-700/60 dark:border-[#303030] rounded-2xl p-6 sm:p-8 mb-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center space-x-2 text-white">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>কুইজ শুরু হতে বাকি</span>
              </h3>

              <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-6">
                <div className="bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {timeLeft.days}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">দিন</div>
                </div>
                <div className="bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {timeLeft.hours}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">ঘণ্টা</div>
                </div>
                <div className="bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">মিনিট</div>
                </div>
                <div className="bg-slate-700/50 dark:bg-[#1a1a1a] border border-slate-600/40 dark:border-[#303030] rounded-xl p-3 sm:p-4">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1">সেকেন্ড</div>
                </div>
              </div>
            </div>

            <div className="quiz-topics bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl p-6 text-left mb-6 shadow-sm">
              <h4 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">কুইজের বিষয়সমূহ</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="topic-item bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg p-3 text-slate-800 dark:text-slate-200">
                  <span className="font-medium">The Alchemist</span>
                </div>
                <div className="topic-item bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg p-3 text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Sapiens</span>
                </div>
                <div className="topic-item bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg p-3 text-slate-800 dark:text-slate-200">
                  <span className="font-medium">Atomic Habits</span>
                </div>
                <div className="topic-item bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg p-3 text-slate-800 dark:text-slate-200">
                  <span className="font-medium">1984</span>
                </div>
              </div>
            </div>

            <a
              href="/granthagar/events"
              className="register-button w-full sm:w-auto inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-colors shadow-sm active:scale-[0.99]"
            >
              কুইজের জন্য নিবন্ধন করুন
            </a>

            <p className="quiz-note text-slate-400 text-sm mt-4">
              📚 অংশগ্রহণের জন্য নির্বাচিত বইগুলো পড়ুন • 👥 সকল সদস্যের জন্য উন্মুক্ত
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyQuiz;