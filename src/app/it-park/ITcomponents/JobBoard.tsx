"use client";

import { useRef } from "react";

import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function JobBoard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const jobCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const jobs = [
    {
      title: "Web Developer",
      company: "লোকাল টেক কোম্পানি",
      type: "ফুল-টাইম (Full-time)",
      location: "রিমোট (Remote)",
      salary: "$1,200/mo",
    },
    {
      title: "Graphics Designer",
      company: "ডিজিটাল এজেন্সি",
      type: "পার্ট-টাইম (Part-time)",
      location: "অন-সাইট (Local)",
      salary: "$800/mo",
    },
    {
      title: "Digital Marketing Specialist",
      company: "ই-কমার্স প্ল্যাটফর্ম",
      type: "চুক্তিভিত্তিক (Contract)",
      location: "হাইব্রিড (Hybrid)",
      salary: "$1,000/mo",
    },
    {
      title: "Content Creator",
      company: "মিডিয়া প্রোডাকশন",
      type: "ফ্রিল্যান্স (Freelance)",
      location: "রিমোট (Remote)",
      salary: "$600/mo",
    },
    {
      title: "Photography Assistant",
      company: "ফটোগ্রাফি স্টুডিও",
      type: "পার্ট-টাইম (Part-time)",
      location: "অন-সাইট (Local)",
      salary: "$500/mo",
    },
    {
      title: "IT Support",
      company: "আইটি সাপোর্ট সেন্টার",
      type: "ফুল-টাইম (Full-time)",
      location: "অন-সাইট (Local)",
      salary: "$900/mo",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.set(headerRef.current, { y: 30, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Job cards animation
    const cards = jobCardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 40, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: cards[0],
      start: "top 75%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Hover animations
    cards.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  return (
    <section id="jobs" ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            কর্মসংস্থান ও ক্যারিয়ার সুযোগ
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            বাছার IT Park শিক্ষার্থীদের জন্য দেশীয় ও আন্তর্জাতিক রিমোট এবং অন-সাইট চাকরির সুযোগ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              ref={(el) => { jobCardsRef.current[index] = el; }}
              className="bg-white dark:bg-[#141414] rounded-2xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {job.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3">{job.company}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded-md text-xs font-medium">
                  {job.type}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">{job.location}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#252525]">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {job.salary}
                </span>
                <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-xs font-medium transition-colors duration-200">
                  আবেদন করুন →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobBoard;