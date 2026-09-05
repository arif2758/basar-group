"use client";

import React from "react";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";



import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiSend,
  FiCheck,
  FiHeart,
  FiUsers,
  FiGift,
  FiStar,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface NewsletterProps {
  language: "bn" | "en";
}

export default function Newsletter({ language }: NewsletterProps) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: "volunteer",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs for animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

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

        // Form animation
        .fromTo(
          formRef.current,
          {
            opacity: 0,
            y: 60,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // Input field animations
      const inputs = gsap.utils.toArray<HTMLElement>(".form-input");
      inputs.forEach((input, index) => {
        gsap.fromTo(
          input,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: input,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Button hover animation
      const submitBtn = document.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.addEventListener("mouseenter", () => {
          gsap.to(submitBtn, {
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        submitBtn.addEventListener("mouseleave", () => {
          gsap.to(submitBtn, {
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
        y: -8,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });

      // Background blob animations
      gsap.to(".blob-1", {
        x: 30,
        y: -20,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".blob-2", {
        x: -20,
        y: 30,
        duration: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Loading animation
    gsap.to(".submit-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);

      // Success animation
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );

      setTimeout(() => {
        gsap.to(successRef.current, {
          opacity: 0,
          scale: 0.8,
          y: -50,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            setIsSubmitted(false);
            setFormData({ name: "", contact: "", interest: "volunteer" });
          },
        });
      }, 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const interestIcons = {
    volunteer: FiUsers,
    donor: FiGift,
    mentor: FiStar,
    student: FiHeart,
  };

  if (isSubmitted) {
    return (
      <section
        ref={containerRef}
        id="newsletter"
        className=" py-20 relative overflow-hidden"
      >
        {/* Enhanced Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900" />

        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="blob-1 absolute top-20 left-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="blob-2 absolute bottom-20 right-10 w-60 h-60 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div
              ref={successRef}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <FiCheck className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                {language === "bn" ? "ধন্যবাদ!" : "Thank You!"}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {language === "bn"
                  ? "আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। আমাদের কমিউনিটিতে স্বাগতম!"
                  : "We will contact you soon. Welcome to our community!"}
              </p>

              {/* Success stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    500+
                  </div>
                  <div className="text-xs text-gray-400">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">50+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">1000+</div>
                  <div className="text-xs text-gray-400">Lives Impacted</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="newsletter"
      className="py-20 bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] relative overflow-hidden transition-colors duration-200"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
              <FiMail className="w-6 h-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              {language === "bn"
                ? "আমাদের সাথে যুক্ত হন"
                : "Join Our Community"}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {language === "bn"
                ? "স্বেচ্ছাসেবক, দাতা বা পরামর্শদাতা হিসেবে আমাদের মিশনে অংশ নিন। আমরা স্প্যাম করি না—শুধু অর্থপূর্ণ আপডেট।"
                : "Join our mission as a volunteer, donor or mentor. We won't spam—only meaningful updates that matter."}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <FiUsers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>500+ Active Members</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiHeart className="w-4 h-4 text-pink-500" />
                <span>No Spam Policy</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiStar className="w-4 h-4 text-amber-500" />
                <span>Monthly Updates Only</span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div
            ref={formRef}
            className="bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-10 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030]"
          >
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="form-input relative group">
                  <FiUser className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={
                      language === "bn" ? "আপনার পূর্ণ নাম" : "Your Full Name"
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="form-input relative group">
                  <FiPhone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    placeholder={
                      language === "bn"
                        ? "ফোন নম্বর বা ইমেইল ঠিকানা"
                        : "Phone Number or Email Address"
                    }
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="form-input relative group">
                  <div className="absolute left-3.5 top-3 w-4 h-4 text-slate-400">
                    {React.createElement(
                      interestIcons[
                        formData.interest as keyof typeof interestIcons
                      ]
                    )}
                  </div>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full pl-10 pr-8 py-2.5 bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors"
                  >
                    <option
                      value="volunteer"
                      className="text-slate-900 dark:text-white dark:bg-[#141414]"
                    >
                      {language === "bn"
                        ? "স্বেচ্ছাসেবক হতে চাই"
                        : "I want to Volunteer"}
                    </option>
                    <option
                      value="donor"
                      className="text-slate-900 dark:text-white dark:bg-[#141414]"
                    >
                      {language === "bn" ? "দাতা হতে চাই" : "I want to Donate"}
                    </option>
                    <option
                      value="mentor"
                      className="text-slate-900 dark:text-white dark:bg-[#141414]"
                    >
                      {language === "bn"
                        ? "পরামর্শদাতা হতে চাই"
                        : "I want to Mentor"}
                    </option>
                    <option
                      value="student"
                      className="text-slate-900 dark:text-white dark:bg-[#141414]"
                    >
                      {language === "bn"
                        ? "শিক্ষার্থী হিসেবে যুক্ত হতে চাই"
                        : "I want to Learn"}
                    </option>
                  </select>
                  <div className="absolute right-3.5 top-3.5 pointer-events-none text-slate-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Interest-based content */}
                <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-200 dark:border-[#2a2a2a]">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2.5 flex items-center">
                    {React.createElement(
                      interestIcons[
                        formData.interest as keyof typeof interestIcons
                      ],
                      {
                        className: "w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400",
                      }
                    )}
                    {language === "bn" ? "আপনি পাবেন:" : "What You'll Get:"}
                  </h3>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 text-xs">
                    {formData.interest === "volunteer" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "দক্ষতা উন্নয়নের সুযোগ"
                            : "Skill development opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "নেটওয়ার্কিং সুবিধা"
                            : "Networking opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "সার্টিফিকেট ও স্বীকৃতি"
                            : "Certificates & recognition"}
                        </li>
                      </>
                    )}
                    {formData.interest === "donor" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "মাসিক প্রভাব রিপোর্ট"
                            : "Monthly impact reports"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "ট্যাক্স ছাড়ের সুবিধা"
                            : "Tax deduction benefits"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "বিশেষ ইভেন্টে আমন্ত্রণ"
                            : "Exclusive event invitations"}
                        </li>
                      </>
                    )}
                    {formData.interest === "mentor" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "শিক্ষার্থীদের সাথে সংযোগ"
                            : "Connect with students"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "নেতৃত্ব দক্ষতা বৃদ্ধি"
                            : "Leadership skill development"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "পেশাদার নেটওয়ার্ক"
                            : "Professional network growth"}
                        </li>
                      </>
                    )}
                    {formData.interest === "student" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "বিনামূল্যে কোর্স অ্যাক্সেস"
                            : "Free course access"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "মেন্টরশিপ সুবিধা"
                            : "Mentorship opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {language === "bn"
                            ? "ক্যারিয়ার গাইডেন্স"
                            : "Career guidance"}
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors shadow-sm disabled:opacity-60 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>
                        {language === "bn"
                          ? "এখনই যোগ দিন"
                          : "Join Our Mission"}
                      </span>
                      <FiSend className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className=" backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="floating-icon inline-block mr-2">🤝</span>
                {language === "bn"
                  ? "একসাথে পরিবর্তন আনি"
                  : "Let's Create Change Together"}
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                {language === "bn"
                  ? "আমাদের সাথে যুক্ত হয়ে বাংলাদেশের কমিউনিটি উন্নয়নে অবদান রাখুন। প্রতিটি অংশগ্রহণ গুরুত্বপূর্ণ।"
                  : "Join us in making a meaningful impact on Bangladesh's community development. Every participation matters."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
