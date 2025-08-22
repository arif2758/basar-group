"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState } from "react";
import { IconType } from "react-icons";
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
  focusRing: string; // Add this for focus ring colors
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
      title: "General Support",
      description:
        "Support all our programs and let us use funds where needed most",
      icon: FiHeart,
      amounts: [25, 50, 100, 250],
      color: "#1E3A8A",
      gradient: "from-blue-600 to-indigo-600",
      focusRing: "focus:ring-blue-500",
    },
    {
      id: "education",
      title: "Student Sponsorship",
      description: "Sponsor a student's complete education for one year",
      icon: FiBook,
      amounts: [120, 250, 500, 1000],
      color: "#059669",
      gradient: "from-emerald-500 to-green-600",
      focusRing: "focus:ring-emerald-500",
    },
    {
      id: "books",
      title: "Book Donation",
      description: "Buy books for our library and mobile library services",
      icon: FiUsers,
      amounts: [15, 30, 75, 150],
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-500",
      focusRing: "focus:ring-amber-500",
    },
    {
      id: "technology",
      title: "Tech Equipment",
      description: "Provide computers and technology for IT training programs",
      icon: FiHome,
      amounts: [200, 500, 1000, 2000],
      color: "#2563EB",
      gradient: "from-blue-500 to-cyan-500",
      focusRing: "focus:ring-blue-500",
    },
    {
      id: "healthcare",
      title: "Healthcare Support",
      description: "Fund medical camps and healthcare assistance",
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
        alert("Thank you for your donation! (Demo)");
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
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            <span className="floating-icon inline-block mr-3">💝</span>
            Support Our Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every contribution makes a difference. Choose how you&asop;d like to
            support our community development efforts and create lasting impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Options */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <FiGift className="floating-icon w-7 h-7 mr-3 text-emerald-500" />
                Choose Your Impact
              </h3>

              {/* Option Tabs */}
              <div
                ref={optionsRef}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
              >
                {donationOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionChange(option.id)}
                      className={`donation-option p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                        selectedOption === option.id
                          ? "shadow-xl border-transparent"
                          : "border-gray-200 hover:border-gray-300 bg-white/50"
                      }`}
                      style={{
                        background:
                          selectedOption === option.id
                            ? `linear-gradient(135deg, ${option.color}15, ${option.color}25)`
                            : undefined,
                        borderColor:
                          selectedOption === option.id
                            ? option.color
                            : undefined,
                      }}
                    >
                      <IconComponent
                        className="option-icon w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-200"
                        style={{ color: option.color }}
                      />
                      <div className="text-sm font-bold text-gray-900 mb-1">
                        {option.title}
                      </div>
                      <div className="text-xs text-gray-600 leading-tight">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Option Details */}
              <div className="option-content mb-8">
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: `${currentOption.color}20` }}
                  >
                    <currentOption.icon
                      className="w-6 h-6"
                      style={{ color: currentOption.color }}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {currentOption.title}
                    </h4>
                    <p className="text-gray-600">{currentOption.description}</p>
                  </div>
                </div>
              </div>

              {/* Amount Selection */}
              <div ref={amountRef} className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <FiDollarSign className="w-5 h-5 mr-2 text-emerald-500" />
                  Select Amount
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {currentOption.amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`amount-btn p-4 rounded-xl border-2 font-bold transition-all duration-300 ${
                        selectedAmount === amount
                          ? "text-white shadow-lg selected transform scale-105"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white/70"
                      }`}
                      style={{
                        background:
                          selectedAmount === amount
                            ? `linear-gradient(135deg, ${currentOption.color}, ${currentOption.color}dd)`
                            : undefined,
                        borderColor:
                          selectedAmount === amount
                            ? currentOption.color
                            : undefined,
                      }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-600 font-medium">
                    or enter custom amount:
                  </span>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
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
                      className={`w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm ${currentOption.focusRing}`}
                      style={{
                        borderColor: customAmount
                          ? currentOption.color
                          : undefined,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                disabled={!selectedAmount && !customAmount}
                className={`main-donate-btn w-full text-lg font-bold text-white py-5 rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${currentOption.gradient} bg-gradient-to-r`}
              >
                <span className="flex items-center justify-center">
                  <FiHeart className="w-5 h-5 mr-2" />
                  Donate ${totalAmount || 0} Now
                </span>
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <FiShield className="w-4 h-4 text-emerald-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>SSL Encrypted</span>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>Tax Deductible</span>
              </div>
            </div>
          </div>

          {/* Impact Calculator & Sidebar */}
          <div ref={sidebarRef} className="space-y-6">
            {/* Impact Calculator */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FiTrendingUp className="floating-icon w-6 h-6 mr-2 text-blue-500" />
                Your Impact
              </h3>
              {totalAmount > 0 ? (
                <div className="space-y-4">
                  {currentOption.id === "education" && (
                    <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl border border-emerald-200">
                      <div className="impact-counter text-3xl font-bold text-emerald-700 mb-2">
                        {Math.floor(totalAmount / 250)}
                      </div>
                      <div className="text-sm text-emerald-600 font-medium">
                        Students sponsored for 1 year
                      </div>
                    </div>
                  )}
                  {currentOption.id === "books" && (
                    <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-200">
                      <div className="impact-counter text-3xl font-bold text-amber-700 mb-2">
                        {Math.floor(totalAmount / 15)}
                      </div>
                      <div className="text-sm text-amber-600 font-medium">
                        Books added to library
                      </div>
                    </div>
                  )}
                  {currentOption.id === "general" && (
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200">
                      <div className="impact-counter text-3xl font-bold text-blue-700 mb-2">
                        {Math.floor(totalAmount / 10)}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">
                        Families supported this month
                      </div>
                    </div>
                  )}
                  {currentOption.id === "technology" && (
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl border border-cyan-200">
                      <div className="impact-counter text-3xl font-bold text-cyan-700 mb-2">
                        {Math.floor(totalAmount / 500)}
                      </div>
                      <div className="text-sm text-cyan-600 font-medium">
                        Computers provided
                      </div>
                    </div>
                  )}
                  {currentOption.id === "healthcare" && (
                    <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl border border-red-200">
                      <div className="impact-counter text-3xl font-bold text-red-700 mb-2">
                        {Math.floor(totalAmount / 50)}
                      </div>
                      <div className="text-sm text-red-600 font-medium">
                        Medical checkups funded
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiHeart className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">
                    Select an amount to see your impact
                  </p>
                </div>
              )}
            </div>

            {/* Recent Donors */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="floating-icon mr-2">👥</span>
                Recent Supporters
              </h3>
              <div className="space-y-4">
                {[
                  {
                    name: "Ahmed R.",
                    amount: 100,
                    time: "2 hours ago",
                    type: "education",
                  },
                  {
                    name: "Fatima K.",
                    amount: 50,
                    time: "5 hours ago",
                    type: "books",
                  },
                  {
                    name: "Anonymous",
                    amount: 250,
                    time: "1 day ago",
                    type: "general",
                  },
                ].map((donor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {donor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {donor.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {donor.time} • {donor.type}
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-emerald-600">
                      ${donor.amount}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    $12,450
                  </div>
                  <div className="text-sm text-gray-600">Raised this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div
              ref={modalRef}
              className="modal-content bg-white rounded-3xl max-w-md w-full max-h-screen overflow-y-auto shadow-2xl border border-white/20"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${currentOption.color}20` }}
                    >
                      <currentOption.icon
                        className="w-5 h-5"
                        style={{ color: currentOption.color }}
                      />
                    </div>
                    Complete Donation
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-gray-50 ${currentOption.focusRing}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-gray-50 ${currentOption.focusRing}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-gray-50 ${currentOption.focusRing}`}
                    />
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
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
                      className="w-5 h-5 rounded border-gray-300 focus:ring-2"
                      style={{ accentColor: currentOption.color }}
                    />
                    <label
                      htmlFor="recurring"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Make this a monthly donation
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={3}
                      className={`w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 bg-gray-50 resize-none ${currentOption.focusRing}`}
                      placeholder="Any message for the team..."
                    />
                  </div>

                  <div className="border-t-2 border-gray-100 pt-6">
                    <div className="flex items-center justify-between text-xl font-bold mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                      <span className="text-gray-700">Total Amount:</span>
                      <span style={{ color: currentOption.color }}>
                        ${totalAmount}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className={`w-full text-lg font-bold text-white py-5 rounded-2xl shadow-lg transition-all duration-300 ${currentOption.gradient} bg-gradient-to-r hover:shadow-xl transform hover:scale-105`}
                    >
                      <span className="flex items-center justify-center">
                        <FiHeart className="w-5 h-5 mr-2" />
                        Complete Donation
                      </span>
                    </button>
                  </div>
                </form>

                {/* Security note */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center text-sm text-green-700">
                    <FiShield className="w-4 h-4 mr-2" />
                    <span>
                      Your payment is secured with 256-bit SSL encryption
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
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center">
                <FiShield className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Secure & Safe
              </div>
              <div className="text-xs text-gray-500">SSL Protected</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Trusted NGO
              </div>
              <div className="text-xs text-gray-500">5+ Years</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Transparent
              </div>
              <div className="text-xs text-gray-500">Monthly Reports</div>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <div className="text-sm font-semibold text-gray-700">
                Tax Deductible
              </div>
              <div className="text-xs text-gray-500">80G Certified</div>
            </div>
          </div>
        </div>

        {/* Call to Action Footer */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
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
                Every Donation Creates Ripples of Change
              </h3>
              <p className="text-lg text-emerald-100 mb-6 max-w-2xl mx-auto">
                Join thousands of supporters who are making a real difference in
                communities across Bangladesh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">1,250+</span>
                  <span>Lives Impacted</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-emerald-200 rounded-full"></div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">$45,000+</span>
                  <span>Raised This Year</span>
                </div>
                <div className="hidden sm:block w-1 h-1 bg-emerald-200 rounded-full"></div>
                <div className="flex items-center space-x-2 text-emerald-100">
                  <span className="text-2xl font-bold">98%</span>
                  <span>Goes to Programs</span>
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
