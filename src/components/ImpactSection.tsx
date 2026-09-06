"use client";
import React, { useState, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiTrendingUp,
  FiUsers,
  FiHeart,
  FiStar,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const ImpactSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 2500,
      label: "শেয়ারকৃত বই",
      suffix: "+",
      description: "সক্রিয় বিতরণ",
      icon: FiUsers,
    },
    {
      id: 2,
      value: 150,
      label: "শিক্ষার্থী",
      suffix: "+",
      description: "Scholarship প্রাপ্ত",
      icon: FiHeart,
    },
    {
      id: 3,
      value: 85,
      label: "IT গ্র্যাজুয়েট",
      suffix: "+",
      description: "কাজের উপযোগী দক্ষ জনশক্তি",
      icon: FiTrendingUp,
    },
    {
      id: 4,
      value: 45,
      label: "ব্যবসা প্রতিষ্ঠান",
      suffix: "+",
      description: "Super Shop নেটওয়ার্ক",
      icon: FiTarget,
    },
    {
      id: 5,
      value: 98,
      label: "সফলতার হার",
      suffix: "%",
      description: "গ্র্যাজুয়েট কর্মসংস্থান",
      icon: FiAward,
    },
    {
      id: 6,
      value: 12,
      label: "কমিউনিটি",
      suffix: "+",
      description: "সেবাপ্রাপ্ত এলাকা",
      icon: FiStar,
    },
  ];

  const successStories = [
    {
      id: 1,
      name: "রাশিদা খাতুন",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      story:
        "লাইব্রেরির সাধারণ সদস্য থেকে IT পেশাজীবী, এখন Freelancing করে মাসে $500 উপার্জন করছেন",
      department: "Library → IT Park",
      impact: "তার 5 সদস্যের পরিবারের প্রধান অবলম্বন",
      color: "#10B981",
      bgGradient: "from-emerald-50 to-green-50",
    },
    {
      id: 2,
      name: "আহমেদ রহমান",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      story: "Super Shop-এর শিক্ষানবিস হিসেবে শুরু করে এখন 3টি ডেলিভারি রুট পরিচালনা করছেন",
      department: "Super Shop",
      impact: "15টি স্থানীয় কর্মসংস্থান সৃষ্টি করেছেন",
      color: "#3B82F6",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      id: 3,
      name: "ফাতিমা বেগম",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face",
      story:
        "Foundation Scholarship-এর সাহায্যে শিক্ষক হয়েছেন, এখন নিয়মিত স্বেচ্ছাসেবী হিসেবে পড়াচ্ছেন",
      department: "Foundation → Library",
      impact: "50+ সুবিধাবঞ্চিত শিশুকে পাঠদান করছেন",
      color: "#8B5CF6",
      bgGradient: "from-purple-50 to-pink-50",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats Cards Animation
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      statCards?.forEach((card: Element, index: number) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationY: 20,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation
        const numberElement = card.querySelector(".stat-number") as HTMLElement;
        if (numberElement) {
          const finalValue = parseInt(
            numberElement.textContent?.replace(/[^0-9]/g, "") || "0"
          );
          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: finalValue,
            duration: 2,
            delay: index * 0.1 + 0.5,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(counterObj.value);
              const suffix = numberElement.getAttribute("data-suffix") || "";
              numberElement.textContent = currentValue + suffix;
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Stories Section Animation
      gsap.fromTo(
        storiesRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storiesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for stat cards
      const statCards2 = statsRef.current?.querySelectorAll(".stat-card");
      statCards2?.forEach((card: Element) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -12,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Story navigation buttons hover
      const navButtons = storiesRef.current?.querySelectorAll(".nav-button");
      navButtons?.forEach((button: Element) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.1,
            rotation: 360,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const nextStory = () => {
    const currentSlide = storiesRef.current?.querySelector(
      ".story-slide.active"
    );
    if (currentSlide) {
      gsap.to(currentSlide, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentStory((prev) => (prev + 1) % successStories.length);
          gsap.fromTo(
            currentSlide,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }
  };

  const prevStory = () => {
    const currentSlide = storiesRef.current?.querySelector(
      ".story-slide.active"
    );
    if (currentSlide) {
      gsap.to(currentSlide, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentStory(
            (prev) => (prev - 1 + successStories.length) % successStories.length
          );
          gsap.fromTo(
            currentSlide,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setCurrentStory(
        (prev) => (prev - 1 + successStories.length) % successStories.length
      );
    }
  };

  return (
    <section
      ref={containerRef}
      id="impact"
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
            <FiTrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            আমাদের প্রভাব ও অর্জন
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            বাস্তব অনুপ্রেরণার গল্প, সুনির্দিষ্ট ফলাফল এবং পুরো বাংলাদেশ জুড়ে মানুষের জীবনে দীর্ঘস্থায়ী পরিবর্তন।
          </p>
        </div>

        {/* Statistics Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-card group bg-white dark:bg-[#141414] rounded-xl p-5 text-center transition-all duration-200 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] hover:border-blue-400 dark:hover:border-blue-500/50"
              >
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-100 dark:border-blue-800/40 group-hover:scale-105 transition-transform duration-200">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div
                  className="stat-number text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight"
                  data-suffix={stat.suffix}
                >
                  {stat.value}
                  {stat.suffix}
                </div>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-0.5">
                  {stat.label}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <div
          ref={storiesRef}
          className="bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  সাফল্যের গল্পসমূহ
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  জীবন পরিবর্তনের অনুপ্রেরণাদায়ী অভিযাত্রা
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevStory}
                  aria-label="Previous story"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextStory}
                  aria-label="Next story"
                  className="w-9 h-9 rounded-lg border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-colors shadow-sm"
                >
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentStory * 100}%)` }}
              >
                {successStories.map((story, index) => (
                  <div
                    key={story.id}
                    className={`story-slide w-full flex-shrink-0 ${
                      index === currentStory ? "active" : ""
                    }`}
                  >
                    <div
                      className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-6 sm:p-8"
                    >
                      <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-center">
                        <div className="md:col-span-2">
                          <Image
                            src={story.image}
                            alt={story.name}
                            width={400}
                            height={320}
                            className="w-full h-64 sm:h-72 object-cover rounded-xl border border-slate-200 dark:border-[#303030] shadow-sm"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <div
                            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium mb-3 border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#252525]"
                            style={{ color: story.color }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: story.color }}
                            ></div>
                            {story.department}
                          </div>
                          <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            {story.name}
                          </h4>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                            {story.story}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: story.color }}
                              ></div>
                              <p className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                                {story.impact}
                              </p>
                            </div>
                            <button className="inline-flex items-center space-x-2 px-4 py-2 bg-white dark:bg-[#252525] hover:bg-slate-50 dark:hover:bg-[#2d2d2d] rounded-lg shadow-sm transition-all duration-200 border border-slate-200 dark:border-[#303030] text-xs font-medium text-slate-700 dark:text-slate-200">
                              <span>সম্পূর্ণ গল্প পড়ুন</span>
                              <FiExternalLink className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    index === currentStory
                      ? "bg-blue-600 w-6"
                      : "bg-slate-300 dark:bg-slate-700 w-3 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors text-sm font-medium">
            <span>আমাদের প্রভাবের গল্পে যুক্ত হোন</span>
            <FiExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
