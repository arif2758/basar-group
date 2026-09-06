"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import React from "react";
import { IconType } from "react-icons";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FiHeart,
  FiBook,
  FiUsers,
  FiHome,
  FiShield,
  FiX,
  FiDollarSign,
  FiTrendingUp,
  FiGift,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface DonationOption {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  amounts: number[];
  color: string;
  gradient: string;
  focusRing: string;
}

const DonationSection = () => {
  const [selectedOption, setSelectedOption] = useState<string>("general");
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isRecurring: false,
    message: "",
  });

  // Refs for animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const amountRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const donationOptions: DonationOption[] = [
    {
      id: "general",
      title: "সার্বিক সহায়তা (General Support)",
      description:
        "আমাদের সকল কার্যক্রমে সহায়তা করুন যাতে জরুরি প্রয়োজনে তহবিল ব্যবহার করা যায়",
      icon: FiHeart,
      amounts: [25, 50, 100, 250],
      color: "#1E3A8A",
      gradient: "from-blue-600 to-indigo-600",
      focusRing: "focus:ring-blue-500",
    },
    {
      id: "education",
      title: "শিক্ষার্থী স্পনসরশিপ (Student Sponsorship)",
      description: "1 বছরের জন্য একজন শিক্ষার্থীর সম্পূর্ণ শিক্ষার খরচ বহন করুন",
      icon: FiBook,
      amounts: [120, 250, 500, 1000],
      color: "#059669",
      gradient: "from-emerald-500 to-green-600",
      focusRing: "focus:ring-emerald-500",
    },
    {
      id: "books",
      title: "বই অনুদান (Book Donation)",
      description: "আমাদের লাইব্রেরি ও ভ্রাম্যমাণ পাঠাগারের জন্য বই সংগ্রহে অনুদান দিন",
      icon: FiUsers,
      amounts: [15, 30, 75, 150],
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-500",
      focusRing: "focus:ring-amber-500",
    },
    {
      id: "technology",
      title: "প্রযুক্তি সরঞ্জাম (Tech Equipment)",
      description: "IT প্রশিক্ষণ কর্মসূচির জন্য কম্পিউটার ও প্রযুক্তি সরঞ্জাম প্রদান করুন",
      icon: FiHome,
      amounts: [200, 500, 1000, 2000],
      color: "#2563EB",
      gradient: "from-blue-500 to-cyan-500",
      focusRing: "focus:ring-blue-500",
    },
    {
      id: "healthcare",
      title: "স্বাস্থ্যসেবা সহায়তা (Healthcare Support)",
      description: "ফ্রি মেডিকেল ক্যাম্প ও স্বাস্থ্য সুরক্ষা কার্যক্রমে আর্থিক সহায়তা দিন",
      icon: FiShield,
      amounts: [50, 100, 200, 500],
      color: "#DC2626",
      gradient: "from-red-500 to-pink-500",
      focusRing: "focus:ring-red-500",
    },
  ];

  const currentOption =
    donationOptions.find((opt) => opt.id === selectedOption) ||
    donationOptions[0];

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
        // Options animation
        .fromTo(
          ".donation-option",
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
            stagger: 0.1,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        )
        // Amount buttons animation
        .fromTo(
          ".amount-btn",
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        // Sidebar animation
        .fromTo(
          sidebarRef.current,
          {
            opacity: 0,
            x: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      // Hover animations for donation options
      const optionCards = gsap.utils.toArray<HTMLElement>(".donation-option");
      optionCards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>(".option-icon");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        });
      });

      // Amount button hover animations
      const amountButtons = gsap.utils.toArray<HTMLElement>(".amount-btn");
      amountButtons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          if (!btn.classList.contains("selected")) {
            gsap.to(btn, {
              scale: 1.05,
              y: -3,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });

        btn.addEventListener("mouseleave", () => {
          if (!btn.classList.contains("selected")) {
            gsap.to(btn, {
              scale: 1,
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      });

      // Main donate button animation
      const donateBtn = document.querySelector(".main-donate-btn");
      if (donateBtn) {
        donateBtn.addEventListener("mouseenter", () => {
          gsap.to(donateBtn, {
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        donateBtn.addEventListener("mouseleave", () => {
          gsap.to(donateBtn, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Number counter animation for impact
      const counters = gsap.utils.toArray<HTMLElement>(".impact-counter");
      counters.forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            const target = parseInt(counter.textContent || "0");
            const obj = { value: 0 };

            gsap.to(obj, {
              value: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = Math.round(obj.value).toString();
              },
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  // Handle option change with animation
  const handleOptionChange = (optionId: string) => {
    // Animate out current content
    gsap.to(".option-content", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setSelectedOption(optionId);
        setSelectedAmount(0);
        setCustomAmount("");

        // Animate in new content
        gsap.fromTo(
          ".option-content",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  const handleDonate = () => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (amount && amount > 0) {
      setShowModal(true);
      // Animate modal entrance
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
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
        alert("আপনার অনুদানের জন্য ধন্যবাদ! (Demo)");
        setShowModal(false);
        setSelectedAmount(0);
        setCustomAmount("");
        setFormData({
          name: "",
          email: "",
          phone: "",
          isRecurring: false,
          message: "",
        });
      },
    });
  };

  const totalAmount = selectedAmount || parseFloat(customAmount) || 0;

  return (
    <section
      ref={containerRef}
      id="donate"
      className="py-20 bg-white dark:bg-[#070b14] relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
            <FiHeart className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            আমাদের মিশনে সহায়তা করুন
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            প্রতিটি অবদানই অত্যন্ত গুরুত্বপূর্ণ। আমাদের কমিউনিটি উন্নয়ন কার্যক্রমে সহায়তা করতে আপনার পছন্দের খাত বেছে নিন এবং টেকসই পরিবর্তন আনুন।
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Options */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <FiGift className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                সহায়তার খাত বেছে নিন
              </h3>

              {/* Option Tabs */}
              <div
                ref={optionsRef}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6"
              >
                {donationOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = selectedOption === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionChange(option.id)}
                      className={`donation-option p-4 rounded-xl border text-left transition-all duration-200 group ${
                        isSelected
                          ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 ring-1 ring-blue-500 shadow-sm"
                          : "border-slate-200 dark:border-[#303030] hover:border-slate-300 dark:hover:border-[#444] bg-slate-50/50 dark:bg-[#1a1a1a]"
                      }`}
                    >
                      <IconComponent
                        className="option-icon w-6 h-6 mb-2.5 transition-transform duration-200 group-hover:scale-105"
                        style={{ color: isSelected ? "#2563EB" : option.color }}
                      />
                      <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1 line-clamp-1">
                        {option.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Option Details */}
              <div className="option-content mb-6 p-4 rounded-xl bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a]">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 shrink-0"
                    style={{ backgroundColor: `${currentOption.color}15` }}
                  >
                    <currentOption.icon
                      className="w-5 h-5"
                      style={{ color: currentOption.color }}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {currentOption.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{currentOption.description}</p>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div ref={amountRef} className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center">
                  <FiDollarSign className="w-4 h-4 mr-1 text-emerald-500" />
                  পরিমাণ নির্বাচন করুন
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {currentOption.amounts.map((amount) => {
                    const isSelected = selectedAmount === amount;
                    return (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`amount-btn p-3 rounded-lg border font-semibold text-sm transition-all duration-200 ${
                          isSelected
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-blue-400 bg-white dark:bg-[#1a1a1a]"
                        }`}
                      >
                        ${amount}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount */}
                <div className="flex items-center space-x-3">
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    অথবা কাস্টম পরিমাণ:
                  </span>
                  <div className="flex-1 relative max-w-xs">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-medium text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className="w-full pl-7 pr-3 py-2 border border-slate-200 dark:border-[#303030] rounded-lg text-sm bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={!selectedAmount && !customAmount}
                className="main-donate-btn w-full text-base font-medium text-white py-3 rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
              >
                <span className="flex items-center justify-center">
                  <FiHeart className="w-4 h-4 mr-2" />
                  এখনই ${totalAmount || 0} অনুদান দিন
                </span>
              </button>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-slate-400 dark:text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <FiShield className="w-3.5 h-3.5 text-emerald-500" />
                  <span>নিরাপদ Payment</span>
                </div>
                <span>•</span>
                <span>SSL এনক্রিপ্টেড</span>
                <span>•</span>
                <span>Tax ছাড়ের সুবিধা</span>
              </div>
            </div>
          </div>

          {/* Impact Calculator & Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            {/* Impact Calculator */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 border border-slate-200 dark:border-[#303030]">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                আপনার অনুদানের প্রভাব
              </h3>
              {totalAmount > 0 ? (
                <div className="space-y-4">
                  {currentOption.id === "education" && (
                    <div className="text-center p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
                      <div className="impact-counter text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        {Math.floor(totalAmount / 250)}
                      </div>
                      <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                        শিক্ষার্থীর 1 বছরের শিক্ষা স্পনসর
                      </div>
                    </div>
                  )}
                  {currentOption.id === "books" && (
                    <div className="text-center p-5 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40">
                      <div className="impact-counter text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">
                        {Math.floor(totalAmount / 15)}
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-300 font-medium">
                        বই লাইব্রেরিতে সংযোজন
                      </div>
                    </div>
                  )}
                  {currentOption.id === "general" && (
                    <div className="text-center p-5 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/40">
                      <div className="impact-counter text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {Math.floor(totalAmount / 10)}
                      </div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                        পরিবারকে এই মাসে সহায়তা
                      </div>
                    </div>
                  )}
                  {currentOption.id === "technology" && (
                    <div className="text-center p-5 bg-cyan-50 dark:bg-cyan-950/20 rounded-xl border border-cyan-200 dark:border-cyan-800/40">
                      <div className="impact-counter text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                        {Math.floor(totalAmount / 500)}
                      </div>
                      <div className="text-xs text-cyan-700 dark:text-cyan-300 font-medium">
                        কম্পিউটার প্রদান
                      </div>
                    </div>
                  )}
                  {currentOption.id === "healthcare" && (
                    <div className="text-center p-5 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800/40">
                      <div className="impact-counter text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
                        {Math.floor(totalAmount / 50)}
                      </div>
                      <div className="text-xs text-red-700 dark:text-red-300 font-medium">
                        স্বাস্থ্য পরীক্ষা ও চিকিৎসা সহায়তা
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <FiHeart className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    আপনার অনুদানের প্রভাব দেখতে একটি পরিমাণ নির্বাচন করুন
                  </p>
                </div>
              )}
            </div>

            {/* Recent Donors */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 border border-slate-200 dark:border-[#303030]">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <FiUsers className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
                সাম্প্রতিক দাতাগণ
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: "আহমেদ আর.",
                    amount: 100,
                    time: "2 ঘণ্টা আগে",
                    type: "education",
                  },
                  {
                    name: "ফাতিমা কে.",
                    amount: 50,
                    time: "5 ঘণ্টা আগে",
                    type: "books",
                  },
                  {
                    name: "বেনামী দাতা",
                    amount: 250,
                    time: "1 দিন আগে",
                    type: "general",
                  },
                ].map((donor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-100 dark:border-[#252525]"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {donor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white text-xs">
                          {donor.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {donor.time} • {donor.type}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                      ${donor.amount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-800/40 text-center">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  $12,450
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">এই মাসে সংগৃহীত</div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div
              ref={modalRef}
              className="modal-content bg-white dark:bg-[#141414] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-[#303030]"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                    <FiHeart className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    অনুদান সম্পন্ন করুন
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    aria-label="Close modal"
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#202020] rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email ঠিকানা *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      ফোন নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2.5 p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={formData.isRecurring}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isRecurring: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="recurring"
                      className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      এটি একটি মাসিক নিয়মিত অনুদান করুন
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      বার্তা (ঐচ্ছিক)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="আমাদের টিমের জন্য কোনো বার্তা থাকলে লিখুন..."
                    />
                  </div>

                  <div className="border-t border-slate-100 dark:border-[#252525] pt-4 mt-6">
                    <div className="flex items-center justify-between text-base font-bold mb-4 p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                      <span className="text-slate-700 dark:text-slate-300 text-sm">মোট পরিমাণ:</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        ${totalAmount}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-sm font-medium text-white py-3 rounded-lg shadow-sm transition-colors bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <FiHeart className="w-4 h-4" />
                      <span>অনুদান নিশ্চিত করুন</span>
                    </button>
                  </div>
                </form>

                {/* Security note */}
                <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                  <div className="flex items-center text-xs text-emerald-700 dark:text-emerald-300">
                    <FiShield className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    <span>
                      আপনার Payment সম্পূর্ণ 256-bit SSL এনক্রিপশন দ্বারা সুরক্ষিত
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-950/30 dark:to-green-950/30 rounded-2xl flex items-center justify-center">
                <FiShield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                নিরাপদ ও সুরক্ষিত
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">SSL Protected</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                বিশ্বস্ত সংস্থা
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">5+ বছর সক্রিয়</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                স্বচ্ছতা
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">মাসিক রিপোর্ট</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Tax ছাড় সুবিধা
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">স্বীকৃত ও প্রত্যয়িত</div>
            </div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-8 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                <span className="floating-icon inline-block mr-2">🌟</span>
                প্রতিটি অনুদান পরিবর্তনের নতুন জোয়ার সৃষ্টি করে
              </h3>
              <p className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto">
                হাজার হাজার শুভাকাঙ্ক্ষীর সাথে যুক্ত হোন যারা বাংলাদেশ জুড়ে সাধারণ মানুষের জীবনে বাস্তব ইতিবাচক পরিবর্তন আনছেন।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">1,250+</span>
                  <span>প্রভাবিত জীবন</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-emerald-200 rounded-full"></div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">$45,000+</span>
                  <span>এ বছর সংগৃহীত</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-emerald-200 rounded-full"></div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">98%</span>
                  <span>সরাসরি কার্যক্রমে ব্যয়িত</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
