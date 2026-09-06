"use client";
import React, { useState } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";

import { useRef } from "react";
import {
  FiHeart,
  FiStar,
  FiClock,
  FiFilter,
  FiUsers,
  FiAward,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const CommunityWall = () => {
  const [filter, setFilter] = useState<string>("featured");
  const [showTestimonials, setShowTestimonials] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const donors = [
    {
      id: 1,
      name: "ড. আহমেদ হাসান",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      contribution: "500+ বই অনুদান",
      date: "2024-01-15",
      type: "books",
      featured: true,
    },
    {
      id: 2,
      name: "ফাতিমা রহমান",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      contribution: "মাসিক Scholarship ফান্ড",
      date: "2024-01-10",
      type: "education",
      featured: true,
    },
    {
      id: 3,
      name: "Tech Solutions Ltd",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      contribution: "Laptop ও Tech সরঞ্জাম",
      date: "2024-01-08",
      type: "technology",
      featured: false,
    },
    {
      id: 4,
      name: "সারাহ খান",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      contribution: "স্বাস্থ্যসেবা সহায়তা",
      date: "2024-01-05",
      type: "healthcare",
      featured: true,
    },
    {
      id: 5,
      name: "Green Foods Co.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&h=150&fit=crop",
      contribution: "সাপ্তাহিক খাদ্য প্যাকেজ",
      date: "2024-01-03",
      type: "food",
      featured: false,
    },
    {
      id: 6,
      name: "মোহাম্মদ আলী",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      contribution: "ভলান্টিয়ার সমন্বয়কারী",
      date: "2024-01-01",
      type: "education",
      featured: false,
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "ড. সারাহ রহমান",
      role: "কমিউনিটি লিডার",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      quote:
        "BASAR Group আমাদের সমাজের চিত্র বদলে দিয়েছে। শিক্ষা, প্রযুক্তি এবং বাণিজ্যের সমন্বিত প্রয়াস টেকসই উন্নয়নের সৃষ্টি করে।",
      rating: 5,
    },
    {
      id: 2,
      name: "মোহাম্মদ হাসান",
      role: "IT Park গ্র্যাজুয়েট",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote:
        "প্রোগ্রামিংয়ের শূন্য জ্ঞান থেকে শুরু করেছিলাম। এখন আমি একজন Freelance Web Developer এবং মাসে $800 উপার্জন করছি। BASAR IT Park-কে ধন্যবাদ!",
      rating: 5,
    },
    {
      id: 3,
      name: "আমিনা খাতুন",
      role: "লাইব্রেরির সদস্য ও অভিভাবক",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote:
        "আমার সন্তানেরা লাইব্রেরি খুব ভালোবাসে। এখানকার বই ও পড়ার পরিবেশ তাদের স্কুলে ভালো ফলাফলে সাহায্য করেছে। কঠিন সময়ে Foundation-ও আমাদের পাশে ছিল।",
      rating: 5,
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

      // Toggle Buttons Animation
      gsap.fromTo(
        toggleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toggleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Filters Animation
      const filterButtons =
        filtersRef.current?.querySelectorAll(".filter-button");
      filterButtons?.forEach((button, index) => {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Grid Cards Animation
      const donorCards = gridRef.current?.querySelectorAll(".donor-card");
      donorCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
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
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Hover animations for donor cards
      donorCards?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -6,
            scale: 1.02,
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

      // Testimonial hover effects
      const testimonialCards2 =
        testimonialsRef.current?.querySelectorAll(".testimonial-card");
      testimonialCards2?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -8,
            scale: 1.02,
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

      // Filter button hover effects
      const filterButtons2 =
        filtersRef.current?.querySelectorAll(".filter-button");
      filterButtons2?.forEach((button) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const handleToggle = (showTestimonialsValue: boolean) => {
    const currentContent = showTestimonials
      ? testimonialsRef.current
      : gridRef.current;

    gsap.to(currentContent, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setShowTestimonials(showTestimonialsValue);
        const newContent = showTestimonialsValue
          ? testimonialsRef.current
          : gridRef.current;
        gsap.fromTo(
          newContent,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  const filteredDonors =
    filter === "all"
      ? donors
      : filter === "featured"
      ? donors.filter((donor) => donor.featured)
      : donors.filter((donor) => donor.type === filter);

  const filterOptions = [
    { value: "featured", label: "বিশেষ অবদান", icon: FiStar },
    { value: "all", label: "সকল দাতা", icon: FiUsers },
    { value: "education", label: "শিক্ষা", icon: FiAward },
    { value: "books", label: "বই", icon: FiHeart },
    { value: "technology", label: "প্রযুক্তি", icon: FiFilter },
    { value: "food", label: "খাদ্য সহায়তা", icon: FiHeart },
    { value: "healthcare", label: "স্বাস্থ্যসেবা", icon: FiHeart },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
            <FiUsers className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            কমিউনিটি ওয়াল (Community Wall)
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            আমাদের সকল অসাধারণ দাতা, শুভাকাঙ্ক্ষী ও স্বেচ্ছাসেবকদের জানাই আন্তরিক কৃতজ্ঞতা, যাদের যৌথ প্রয়াসে আমাদের মিশন সফল হচ্ছে।
          </p>
        </div>

        {/* Segmented Toggle */}
        <div ref={toggleRef} className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-slate-200/70 dark:bg-[#1f1f1f] rounded-lg border border-slate-300/60 dark:border-[#303030]">
            <button
              onClick={() => handleToggle(false)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                !showTestimonials
                  ? "bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FiUsers className="w-4 h-4" />
              <span>দাতাদের স্বীকৃতি</span>
            </button>
            <button
              onClick={() => handleToggle(true)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                showTestimonials
                  ? "bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-sm font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FiStar className="w-4 h-4" />
              <span>প্রশংসাপত্র ও মতামত</span>
            </button>
          </div>
        </div>

        {!showTestimonials ? (
          <>
            {/* Filter Bar */}
            <div
              ref={filtersRef}
              className="flex flex-wrap items-center justify-center gap-2 mb-10"
            >
              <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 mr-2 text-xs font-semibold uppercase tracking-wider">
                <FiFilter className="w-3.5 h-3.5" />
                <span>ক্যাটাগরি:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isActive = filter === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      className={`filter-button px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center space-x-1.5 border ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500"
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Donors Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 mb-16"
            >
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="donor-card group bg-white dark:bg-[#141414] rounded-xl p-4 sm:p-5 text-center border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-200"
                >
                  <div className="relative mb-3 inline-block">
                    <Image
                      src={donor.image}
                      alt={donor.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-slate-200 dark:border-[#303030] group-hover:border-blue-500 transition-colors"
                    />
                    {donor.featured && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center shadow">
                        <FiStar className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </div>

                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {donor.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2 min-h-[32px]">
                    {donor.contribution}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-slate-400 dark:text-slate-500 text-[11px] mb-3">
                    <FiClock className="w-3 h-3" />
                    <span>{new Date(donor.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 text-[11px] rounded capitalize font-medium border border-slate-200 dark:border-[#303030]">
                      {donor.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className="text-center mb-16">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base font-medium">
                  আজই অবদান রেখে আমাদের কমিউনিটি ওয়ালে যুক্ত হোন
                </p>
                <button className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm transition-colors">
                  <FiHeart className="w-4 h-4 mr-2" />
                  <span>সহায়ক হোন</span>
                  <FiArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Testimonials Grid */
          <div
            ref={testimonialsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card group bg-white dark:bg-[#141414] rounded-xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] hover:border-blue-400 dark:hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 mb-6 text-sm leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-[#252525]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-[#303030]"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div
          ref={newsletterRef}
          className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#303030] bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white shadow-lg"
        >
          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 sm:p-12">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl mb-4 text-white">
                <FiMail className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                আমাদের সাথে যুক্ত থাকুন
              </h3>
              <p className="text-sm sm:text-base text-blue-100 mb-6 max-w-md leading-relaxed">
                আমাদের কমিউনিটির অংশ হোন। অনুপ্রেরণার গল্প, প্রকল্পের আপডেট এবং নতুন সুযোগ সরাসরি আপনার ইনবক্সে পান।
              </p>

              <form className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="আপনার Email ঠিকানা দিন"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-medium text-sm bg-white text-blue-800 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-1.5 shadow-sm shrink-0"
                >
                  <span>সাবস্ক্রাইব করুন</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-4 text-xs text-blue-200 flex items-center space-x-1.5">
                <FiHeart className="w-3.5 h-3.5 text-pink-300" />
                <span>কোনো স্প্যাম নয়। যেকোনো সময় এক ক্লিকে Unsubscribe করতে পারবেন।</span>
              </p>
            </div>

            <div className="hidden lg:block relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=700&fit=crop"
                alt="Community gathering"
                fill
                className="object-cover rounded-xl opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityWall;
