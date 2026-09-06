"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FiBook,
  FiMonitor,
  FiShoppingBag,
  FiHeart,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiX,
  FiAward,
  FiTarget,
  FiClock,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface Opportunity {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  requirements: string[];
  timeCommitment: string;
  impact: string;
}

const opportunities: Opportunity[] = [
  {
    id: "library",
    title: "লাইব্রেরি সহকারী (Library Assistant)",
    icon: FiBook,
    description:
      "বই ব্যবস্থাপনা, পাঠকদের সহায়তা ও নিয়মিত পাঠচক্র পরিচালনায় সার্বিক সহায়তা করা।",
    color: "from-indigo-500 to-cyan-500",
    requirements: ["বইয়ের প্রতি আগ্রহ", "উত্তম যোগাযোগ দক্ষতা", "সপ্তাহে 2-3 ঘণ্টা সময়"],
    timeCommitment: "সপ্তাহে 6-10 ঘণ্টা",
    impact: "50+ শিক্ষার্থীর মানসম্মত শিক্ষা উপকরণ প্রাপ্তিতে সহায়তা",
  },
  {
    id: "it-mentor",
    title: "IT মেন্টর (IT Mentor)",
    icon: FiMonitor,
    description:
      "শিক্ষার্থীদের প্রোগ্রামিং, ওয়েব ডিজাইন বা আধুনিক ডিজিটাল দক্ষতা শেখানো।",
    color: "from-emerald-500 to-teal-500",
    requirements: ["Programming জ্ঞান", "শেখানোর আগ্রহ", "Tech দক্ষতা"],
    timeCommitment: "সপ্তাহে 8-12 ঘণ্টা",
    impact: "20+ শিক্ষার্থীকে কাজের উপযোগী ডিজিটাল দক্ষতায় প্রশিক্ষণ",
  },
  {
    id: "delivery",
    title: "ডেলিভারি ভলান্টিয়ার (Delivery Volunteer)",
    icon: FiShoppingBag,
    description: "Super Shop-এর পণ্য পৌঁছানো ও স্থানীয় লজিস্টিকস সমন্বয়ে সহায়তা করা।",
    color: "from-orange-500 to-pink-500",
    requirements: ["নিজস্ব বাহন", "স্থানীয় এলাকা পরিচিতি", "কর্মে উদ্যমী মনোভাব"],
    timeCommitment: "সপ্তাহে 4-6 ঘণ্টা",
    impact: "100+ পরিবারের কাছে জরুরি পণ্য ও সেবা পৌঁছানো",
  },
  {
    id: "outreach",
    title: "কমিউনিটি আউটরিচ (Community Outreach)",
    icon: FiHeart,
    description:
      "সামাজিক ইভেন্ট আয়োজন, পরিবারের খোঁজখবর নেওয়া ও Foundation-এর কর্মসূচি বাস্তবায়ন।",
    color: "from-blue-500 to-purple-500",
    requirements: ["সামাজিক যোগাযোগ দক্ষতা", "Event পরিকল্পনা", "কমিউনিটির সাথে সুসম্পর্ক"],
    timeCommitment: "সপ্তাহে 10-15 ঘণ্টা",
    impact: "প্রতি মাসে 200+ মানুষের কাছে উন্নয়ন সেবা পৌঁছানো",
  },
];

const benefits = [
  {
    title: "দক্ষতা উন্নয়ন (Skill Development)",
    desc: "বাস্তব অভিজ্ঞতার মাধ্যমে নেতৃত্ব, যোগাযোগ, দলগত কাজ ও Project Management শেখার সুযোগ।",
    icon: FiTrendingUp,
    color: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600",
  },
  {
    title: "গ্লোবাল নেটওয়ার্কিং (Networking)",
    desc: "অভিজ্ঞ মেন্টর, পেশাজীবী ও সমমনা স্বেচ্ছাসেবকদের সাথে শক্তিশালী যোগাযোগ তৈরি।",
    icon: FiGlobe,
    color: "from-emerald-100 to-green-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "স্বীকৃতি ও সার্টিফিকেট (Recognition)",
    desc: "Certificate, প্রশংসা পত্র ও নিজের Portfolio সমৃদ্ধ করার আকর্ষণীয় সুযোগ।",
    icon: FiStar,
    color: "from-amber-100 to-yellow-100",
    iconColor: "text-amber-600",
  },
];

const stats = [
  { number: "500+", label: "সক্রিয় স্বেচ্ছাসেবক", icon: FiUsers },
  { number: "2,000+", label: "কাজের ঘণ্টা অবদান", icon: FiClock },
  { number: "50+", label: "সম্পন্ন প্রকল্প", icon: FiTarget },
  { number: "95%", label: "সন্তুষ্টির হার", icon: FiAward },
];

export default function VolunteerOpportunities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Opportunity | null>(null);

  // Refs for animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Header animation
      tl.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      )
        // Opportunities cards animation
        .fromTo(
          ".opportunity-card",
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        )
        // Benefits section animation
        .fromTo(
          benefitsRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // Benefits cards animation
        .fromTo(
          ".benefit-card",
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        )
        // Stats animation
        .fromTo(
          statsRef.current,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // CTA animation
        .fromTo(
          ctaRef.current,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );

      // Card hover animations
      const cards = gsap.utils.toArray<HTMLElement>(".opportunity-card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: -6,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      });

      // Stat counters animation
      const statNumbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      statNumbers.forEach((stat) => {
        ScrollTrigger.create({
          trigger: stat,
          start: "top 85%",
          onEnter: () => {
            const originalText = stat.textContent || "";
            const num = parseInt(originalText.replace(/[^0-9]/g, "")) || 0;
            const hasPlus = originalText.includes("+");
            const hasPercent = originalText.includes("%");
            const obj = { value: 0 };

            gsap.to(obj, {
              value: num,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                let formatted = Math.round(obj.value).toLocaleString();
                if (hasPlus) formatted += "+";
                if (hasPercent) formatted += "%";
                stat.textContent = formatted;
              },
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  const openModal = (opportunity: Opportunity) => {
    setSelectedRole(opportunity);
    setIsModalOpen(true);

    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    // Animate modal exit
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedRole(null);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Success animation
    gsap.to(".modal-content", {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        alert("আপনার আবেদনের জন্য ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।");
        closeModal();
      },
    });
  };

  return (
    <section
      ref={containerRef}
      id="volunteer"
      className="relative py-20 bg-white dark:bg-[#070b14] overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
            <FiUsers className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            স্বেচ্ছাসেবক হিসেবে যোগ দিন
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            BASAR Group-এর অংশ হোন — আপনার সময়, মেধা ও দক্ষতাকে কাজে লাগিয়ে সমাজকে ক্ষমতায়িত করুন এবং স্থায়ী ইতিবাচক পরিবর্তন আনুন।
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stat-card text-center">
                <div className="bg-slate-50 dark:bg-[#141414] rounded-xl p-5 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-100 dark:border-blue-800/40">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Opportunities */}
        <div
          ref={opportunitiesRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20"
        >
          {opportunities.map((op) => {
            const Icon = op.icon;
            return (
              <div
                key={op.id}
                className="opportunity-card group bg-white dark:bg-[#141414] rounded-2xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] 
                           transition-all duration-200 border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500/50 flex flex-col justify-between"
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                                flex items-center justify-center border border-blue-100 dark:border-blue-800/40 mb-4 mx-auto"
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 text-center">
                    {op.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
                    {op.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4 w-full text-left">
                    <h4 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      প্রয়োজনীয় যোগ্যতা:
                    </h4>
                    <ul className="space-y-1">
                      {op.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 dark:text-slate-300 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time Commitment & Impact */}
                  <div className="space-y-2 mb-6 w-full text-left">
                    <div className="p-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#2a2a2a]">
                      <div className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                        <FiClock className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="font-medium">{op.timeCommitment}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                      <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center">
                        <FiTarget className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span>{op.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => openModal(op)}
                    className="w-full py-2.5 rounded-lg text-xs sm:text-sm font-medium 
                               bg-blue-600 hover:bg-blue-700 text-white
                               shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FiUsers className="w-4 h-4" />
                    আবেদন করুন
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div ref={benefitsRef} className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              কেন স্বেচ্ছাসেবী হবেন?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              BASAR Group-এ স্বেচ্ছাসেবী হওয়া কেবল সময় দেওয়ার বিষয় নয় — এটি শেখা, নিজেকে বিকশিত করা এবং মানুষের জীবনে বাস্তব ইতিবাচক অবদান রাখার সুবর্ণ সুযোগ।
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="benefit-card bg-slate-50 dark:bg-[#141414] rounded-2xl p-6 
                             transition-all duration-200 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex flex-col items-center text-center"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 border border-blue-100 dark:border-blue-800/40 mx-auto"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 text-center">
                    {b.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-20">
          <div className="rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border border-slate-200 dark:border-[#303030] shadow-lg">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <blockquote className="text-lg sm:text-xl font-normal mb-6 leading-relaxed italic">
                &ldquo;BASAR Group-এর সাথে স্বেচ্ছাসেবা আমার দৃষ্টিভঙ্গি বদলে দিয়েছে। আমি কাজের বাস্তব দক্ষতা অর্জন করেছি, অসাধারণ সহকর্মীদের সাথে সংযোগ তৈরি হয়েছে এবং নিজের এলাকার মানুষের কল্যাণে সরাসরি অবদান রাখতে পেরেছি।&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">আয়েশা সুলতানা</div>
                  <div className="text-blue-200 text-xs">
                    IT Mentor স্বেচ্ছাসেবক
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200 dark:border-[#303030]">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              পরিবর্তন আনতে প্রস্তুত?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto leading-relaxed">
              আমাদের নিবেদিত স্বেচ্ছাসেবক পরিবারে যুক্ত হোন এবং ইতিবাচক পরিবর্তনে ভূমিকা রাখুন। আপনার মেধা ও একাগ্রতা মানুষের জীবনকে বদলে দিতে পারে।
            </p>
            <button
              onClick={() => openModal(opportunities[0])}
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white
                         bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              <FiUsers className="w-4 h-4 mr-2" />
              স্বেচ্ছাসেবক হিসেবে যোগ দিন
            </button>

            <div className="mt-6 flex flex-wrap gap-4 justify-center items-center text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <FiClock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>নমনীয় সময়সূচি</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiAward className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Certificate প্রদান</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiHeart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>বাস্তব ইতিবাচক প্রভাব</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="modal-content bg-white dark:bg-[#141414] rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-[#303030]"
          >
            <div className="p-6 sm:p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 border border-blue-100 dark:border-blue-800/40"
                  >
                    <selectedRole.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {selectedRole.title}-এর জন্য আবেদন
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {selectedRole.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#202020] rounded-lg transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Role Details */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center text-xs">
                    <FiClock className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                    প্রয়োজনীয় সময়
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {selectedRole.timeCommitment}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center text-xs">
                    <FiTarget className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
                    আপনার অবদান
                  </h4>
                  <p className="text-emerald-700 dark:text-emerald-300 text-xs">
                    {selectedRole.impact}
                  </p>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      ফোন নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="আপনার ফোন নম্বর"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email ঠিকানা *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    কেন আমাদের সাথে স্বেচ্ছাসেবী হতে চান? *
                  </label>
                  <textarea
                    required
                    placeholder="আপনার আগ্রহ ও অনুপ্রেরণা সম্পর্কে লিখুন..."
                    rows={3}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2.5 p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    আমি স্বেচ্ছাসেবকের দায়িত্ব ও নীতিমালা মেনে চলতে সম্মত
                  </label>
                </div>

                <div className="border-t border-slate-100 dark:border-[#252525] pt-4 mt-6">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg font-medium text-white text-sm
                               bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm
                               flex items-center justify-center"
                  >
                    <FiHeart className="w-4 h-4 mr-2" />
                    আবেদন জমা দিন
                  </button>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-3">
                    আমরা আপনার আবেদনটি পর্যালোচনা করে 3-5 কার্যদিবসের মধ্যে যোগাযোগ করব।
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
