"use client";

import React from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
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
      className="py-20 relative overflow-hidden"
    >
      {/* Enhanced Dark Gradient Background */}
      <div className="absolute inset-0 teal-slate-gradient" />

      {/* Animated Decorative Blobs */}
      <div className="absolute inset-0 opacity-20">
        <div className="blob-1 absolute -top-40 -left-40 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="blob-2 absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Header */}
          <div ref={headerRef} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent mb-6">
              <span className="floating-icon inline-block mr-3">🌟</span>
              {language === "bn"
                ? "আমাদের সাথে যুক্ত হন"
                : "Join Our Community"}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {language === "bn"
                ? "স্বেচ্ছাসেবক, দাতা বা পরামর্শদাতা হিসেবে আমাদের মিশনে অংশ নিন। আমরা স্প্যাম করি না—শুধু অর্থপূর্ণ আপডেট।"
                : "Join our mission as a volunteer, donor or mentor. We won't spam—only meaningful updates that matter."}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <FiUsers className="w-4 h-4 text-emerald-400" />
                <span>500+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiHeart className="w-4 h-4 text-pink-400" />
                <span>No Spam Policy</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiStar className="w-4 h-4 text-yellow-400" />
                <span>Monthly Updates Only</span>
              </div>
            </div>
          </div>

          {/* Enhanced Form */}
          <div
            ref={formRef}
            className=" backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="form-input relative group">
                  <FiUser className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={
                      language === "bn" ? "আপনার পূর্ণ নাম" : "Your Full Name"
                    }
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="form-input relative group">
                  <FiPhone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200" />
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
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:bg-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none transition-all duration-300"
                  />
                </div>

                <div className="form-input relative group">
                  <div className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-200">
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
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:bg-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option
                      value="volunteer"
                      className="text-gray-800 bg-white"
                    >
                      {language === "bn"
                        ? "স্বেচ্ছাসেবক হতে চাই"
                        : "I want to Volunteer"}
                    </option>
                    <option value="donor" className="text-gray-800 bg-white">
                      {language === "bn" ? "দাতা হতে চাই" : "I want to Donate"}
                    </option>
                    <option value="mentor" className="text-gray-800 bg-white">
                      {language === "bn"
                        ? "পরামর্শদাতা হতে চাই"
                        : "I want to Mentor"}
                    </option>
                    <option value="student" className="text-gray-800 bg-white">
                      {language === "bn"
                        ? "শিক্ষার্থী হিসেবে যুক্ত হতে চাই"
                        : "I want to Learn"}
                    </option>
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-4 top-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
              <div className="space-y-6">
                {/* Interest-based content */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    {React.createElement(
                      interestIcons[
                        formData.interest as keyof typeof interestIcons
                      ],
                      {
                        className: "w-5 h-5 mr-2 text-cyan-400",
                      }
                    )}
                    {language === "bn" ? "আপনি পাবেন:" : "What You'll Get:"}
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    {formData.interest === "volunteer" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "দক্ষতা উন্নয়নের সুযোগ"
                            : "Skill development opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "নেটওয়ার্কিং সুবিধা"
                            : "Networking opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "সার্টিফিকেট ও স্বীকৃতি"
                            : "Certificates & recognition"}
                        </li>
                      </>
                    )}
                    {formData.interest === "donor" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "মাসিক প্রভাব রিপোর্ট"
                            : "Monthly impact reports"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "ট্যাক্স ছাড়ের সুবিধা"
                            : "Tax deduction benefits"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "বিশেষ ইভেন্টে আমন্ত্রণ"
                            : "Exclusive event invitations"}
                        </li>
                      </>
                    )}
                    {formData.interest === "mentor" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "শিক্ষার্থীদের সাথে সংযোগ"
                            : "Connect with students"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "নেতৃত্ব দক্ষতা বৃদ্ধি"
                            : "Leadership skill development"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "পেশাদার নেটওয়ার্ক"
                            : "Professional network growth"}
                        </li>
                      </>
                    )}
                    {formData.interest === "student" && (
                      <>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "বিনামূল্যে কোর্স অ্যাক্সেস"
                            : "Free course access"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></span>
                          {language === "bn"
                            ? "মেন্টরশিপ সুবিধা"
                            : "Mentorship opportunities"}
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></span>
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
                  className="submit-btn group w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white py-5 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center relative overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <div className="relative flex items-center">
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {language === "bn"
                          ? "এখনই যোগ দিন"
                          : "Join Our Mission"}
                        <FiSend className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                </button>

                {/* Additional CTA */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-3">
                    {language === "bn"
                      ? "অথবা সরাসরি যোগাযোগ করুন:"
                      : "Or contact us directly:"}
                  </p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <a
                      href="tel:+8801234567890"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                    >
                      📞 +880 123 456 7890
                    </a>
                    <a
                      href="mailto:info@basargroup.org"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                    >
                      ✉️ info@basargroup.org
                    </a>
                  </div>
                </div>
              </div>
            </form>

            {/* Trust Message & Social Proof */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
                    <FiMail className="w-4 h-4 mr-2 text-cyan-400" />
                    {language === "bn"
                      ? "আমরা আপনার গোপনীয়তাকে সম্মান করি এবং কখনও স্প্যাম করি না"
                      : "We respect your privacy and never spam"}
                  </p>
                </div>

                <div className="flex justify-center md:justify-end space-x-6 text-xs text-gray-500">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-400">
                      500+
                    </div>
                    <div>{language === "bn" ? "সদস্য" : "Members"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-400">50+</div>
                    <div>{language === "bn" ? "প্রকল্প" : "Projects"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">98%</div>
                    <div>
                      {language === "bn" ? "সন্তুষ্টি" : "Satisfaction"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
