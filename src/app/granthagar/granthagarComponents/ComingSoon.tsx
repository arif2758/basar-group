"use client";

import React, { useRef } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const ComingSoon: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const comingBooks = [
    {
      id: 1,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      donor: "Maria Ahmed",
      arrivalDate: "3 দিন",
      category: "আধ্যাত্মিক"
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      donor: "Karim Hassan",
      arrivalDate: "5 দিন",
      category: "অর্থনীতি ও ফাইন্যান্স"
    },
    {
      id: 3,
      title: "The 7 Habits",
      author: "Stephen Covey",
      donor: "Ayesha Siddique",
      arrivalDate: "7 দিন",
      category: "আত্মউন্নয়ন"
    }
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".coming-header", { y: 50, opacity: 0 });
    gsap.set(".coming-card", { y: 60, opacity: 0, scale: 0.95 });
    gsap.set(".calendar-cta", { y: 60, opacity: 0, scale: 0.95 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".coming-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".coming-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".calendar-cta", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)"
    }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="coming-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            শীঘ্রই আসছে নতুন বই
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            অসাধারণ কিছু নতুন বই যুক্ত হতে চলেছে! আগে থেকেই বুকিং করুন এবং সর্বপ্রথম পড়ার সুযোগ নিন।
          </p>
        </div>

        <div className="coming-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingBooks.map((book) => (
            <div key={book.id} className="coming-card bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] border-l-4 border-l-emerald-500 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">লেখক: {book.author}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-orange-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">পৌঁছাবে</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {book.arrivalDate}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>দাতা: {book.donor}</span>
                </div>
                
                <a
                  href="/granthagar/request-book"
                  className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  বুকিং করুন
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="calendar-cta bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-8 mt-12 text-center max-w-2xl mx-auto">
          <Calendar className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
            আরো নতুন বইয়ের তালিকা দেখতে চান?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            আমাদের সম্পূর্ণ আগমন ক্যালেন্ডার দেখুন এবং 30 দিন আগেই বইয়ের জন্য বুকিং দিয়ে রাখুন।
          </p>
          <a
            href="/granthagar/events"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            সম্পূর্ণ ক্যালেন্ডার দেখুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;