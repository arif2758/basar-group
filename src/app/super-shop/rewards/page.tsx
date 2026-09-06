"use client";

import { useRef } from "react";
import {
  Star,
  Gift,
  Trophy,
  Users,
  Crown,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function RewardsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const userPoints = 1250;
  const pointsToNextLevel = 750;
  const currentLevel = "Silver";

  const rewardTiers = [
    {
      name: "Bronze",
      minPoints: 0,
      color: "from-amber-400 to-orange-500",
      icon: "🥉",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      textColor: "text-amber-700 dark:text-amber-300",
      benefits: ["1x পয়েন্ট", "সাধারণ সহায়তা", "স্ট্যান্ডার্ড ডেলিভারি"],
    },
    {
      name: "Silver",
      minPoints: 1000,
      color: "from-gray-400 to-slate-500",
      icon: "🥈",
      bgColor: "bg-gray-50 dark:bg-slate-800/60",
      textColor: "text-gray-700 dark:text-gray-300",
      benefits: ["1.2x পয়েন্ট", "অগ্রাধিকার সহায়তা", "দ্রুত ডেলিভারি"],
    },
    {
      name: "Gold",
      minPoints: 2000,
      color: "from-yellow-400 to-amber-500",
      icon: "🥇",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      textColor: "text-yellow-700 dark:text-yellow-300",
      benefits: ["1.5x পয়েন্ট", "ভিআইপি সহায়তা", "এক্সপ্রেস ডেলিভারি"],
    },
    {
      name: "Platinum",
      minPoints: 5000,
      color: "from-purple-500 to-indigo-600",
      icon: "👑",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      textColor: "text-purple-700 dark:text-purple-300",
      benefits: ["2x পয়েন্ট", "ব্যক্তিগত ম্যানেজার", "একই দিনে ডেলিভারি"],
    },
  ];

  const availableRewards = [
    {
      id: 1,
      title: "পরবর্তী অর্ডারে ৳50 ছাড়",
      points: 500,
      description: "৳300 এর বেশি অর্ডারে ৳50 বিশেষ ডিসকাউন্ট পান",
      type: "discount",
      icon: "💰",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      id: 2,
      title: "ফ্রি ডেলিভারি (3টি অর্ডার)",
      points: 300,
      description: "আপনার পরবর্তী 3টি অর্ডারে সম্পূর্ণ বিনামূল্যে ডেলিভারি",
      type: "delivery",
      icon: "🚚",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      id: 3,
      title: "প্রিমিয়াম পণ্যে ৳100 ছাড়",
      points: 800,
      description: "সুপার শপের প্রিমিয়াম পণ্য সমাহারে বিশেষ মূল্যছাড়",
      type: "discount",
      icon: "⭐",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      id: 4,
      title: "ডাবল পয়েন্ট উইকএন্ড",
      points: 1000,
      description: "সাপ্তাহিক ছুটির দিনে প্রতিটি কেনাকাটায় 2x পয়েন্ট পান",
      type: "bonus",
      icon: "🎯",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  const recentActivity = [
    {
      date: "2025-01-15",
      action: "কেনাকাটা",
      points: 150,
      description: "অর্ডার #1234 - তাজা শাকসবজি",
      icon: "🛒",
    },
    {
      date: "2025-01-12",
      action: "কেনাকাটা",
      points: 80,
      description: "অর্ডার #1233 - দুগ্ধজাত পণ্য",
      icon: "🛒",
    },
    {
      date: "2025-01-10",
      action: "বোনাস",
      points: 100,
      description: "মাসের প্রথম অর্ডার বোনাস",
      icon: "🎁",
    },
    {
      date: "2025-01-08",
      action: "কেনাকাটা",
      points: 120,
      description: "অর্ডার #1232 - সাপ্তাহিক গ্রোসারি",
      icon: "🛒",
    },
    {
      date: "2025-01-05",
      action: "রিডিম",
      points: -500,
      description: "৳50 ডিসকাউন্ট কুপন রিডিম করা হয়েছে",
      icon: "🎫",
    },
  ];

  const earnMethods = [
    {
      icon: Gift,
      title: "কেনাকাটা করুন ও পয়েন্ট জিতুন",
      description: "প্রতি ৳10 খরচে 1 পয়েন্ট অর্জন করুন",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: Users,
      title: "বন্ধুদের রেফার করুন",
      description: "প্রতিটি সফল রেফারে 200 বোনাস পয়েন্ট পান",
      color: "from-orange-400 to-amber-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
    {
      icon: Trophy,
      title: "বিশেষ অফার ও ইভেন্ট",
      description: "বিশেষ ক্যাম্পেইনে দ্বিগুণ পয়েন্ট উপভোগ করুন",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Floating background elements
      gsap.to(".rewards-bg-element", {
        y: "random(-25, 25)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(8, 12)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      // Header animation
      gsap.fromTo(
        ".rewards-header",
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
        }
      );

      // Points overview animation
      gsap.fromTo(
        ".points-overview",
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Tier cards animation
      gsap.fromTo(
        ".tier-card",
        {
          opacity: 0,
          x: -60,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".tiers-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Reward cards animation
      gsap.fromTo(
        ".reward-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.6,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".rewards-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Activity items animation
      gsap.fromTo(
        ".activity-item",
        {
          opacity: 0,
          x: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".activity-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Earn methods animation
      gsap.fromTo(
        ".earn-method",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".earn-methods",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupRewardsHovers();

      // Sparkle animation
      gsap.to(".sparkle-rewards", {
        y: "random(-8, 8)",
        rotation: "random(0, 360)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Progress bar animation
      gsap.fromTo(
        ".progress-fill",
        { width: "0%" },
        {
          width: `${((userPoints - 1000) / (2000 - 1000)) * 100}%`,
          duration: 2,
          ease: "power2.out",
          delay: 1,
        }
      );
    },
    { scope: containerRef }
  );

  const setupRewardsHovers = () => {
    // Tier cards hover
    gsap.utils.toArray<HTMLElement>(".tier-card").forEach((card) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Reward cards hover
    gsap.utils.toArray<HTMLElement>(".reward-card").forEach((card) => {
      const icon = card.querySelector(".reward-icon");
      const button = card.querySelector(".redeem-btn");
      const glow = card.querySelector(".reward-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -12,
          scale: 1.03,
          boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          glow,
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          icon,
          {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          button,
          {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Earn method cards hover
    gsap.utils.toArray<HTMLElement>(".earn-method").forEach((card) => {
      const icon = card.querySelector(".earn-icon");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          icon,
          {
            scale: 1.2,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="rewards-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-2xl"></div>
        <div className="rewards-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-2xl"></div>
        <div className="rewards-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-2xl"></div>

        <Sparkles className="sparkle-rewards absolute top-32 right-1/4 w-6 h-6 text-emerald-300/30" />
        <Star className="sparkle-rewards absolute bottom-1/3 left-1/4 w-5 h-5 text-purple-300/25" />
        <Crown className="sparkle-rewards absolute top-2/3 right-1/3 w-5 h-5 text-yellow-300/35" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="rewards-header text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-200 dark:border-emerald-800">
            <Trophy className="w-4 h-4 mr-2" />
            রিওয়ার্ড প্রোগ্রাম
            <Crown className="w-4 h-4 ml-2" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              কেনাকাটায় পয়েন্ট
            </span>{" "}
            <span className="relative">
              ও সেরা সঞ্চয়
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"></div>
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            প্রতিটি কেনাকাটায় পয়েন্ট অর্জন করুন এবং বিশেষ ডিসকাউন্ট আনলক করুন।
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {" "}
              যত বেশি কেনাকাটা, তত বেশি সঞ্চয়!
            </span>
          </p>
        </div>

        {/* Enhanced Points Overview */}
        <div className="points-overview bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-gray-900" />
                </div>
                <span className="text-2xl sm:text-3xl font-black">
                  {currentLevel} মেম্বার
                </span>
              </div>
              <div className="text-5xl sm:text-6xl font-black mb-3">
                {userPoints.toLocaleString()}
              </div>
              <div className="text-white/80 text-lg font-medium">
                মোট অর্জিত পয়েন্ট
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                <div className="text-3xl sm:text-4xl font-black mb-3 text-yellow-300">
                  {pointsToNextLevel}
                </div>
                <div className="text-white/90 mb-6 font-medium">
                  Gold লেভেলে পৌঁছাতে প্রয়োজন
                </div>
                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <div
                    className="progress-fill bg-gradient-to-r from-yellow-400 to-amber-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  {Math.round(((userPoints - 1000) / (2000 - 1000)) * 100)}% সম্পন্ন
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                পরবর্তী স্তরের সুবিধা
              </div>
              <div className="space-y-3">
                {[
                  "🎁 15% বোনাস পয়েন্ট",
                  "🚚 অগ্রাধিকার ডেলিভারি",
                  "💝 বিশেষ এক্সক্লুসিভ অফার",
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center lg:justify-end space-x-2 text-white/90"
                  >
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Enhanced Reward Tiers */}
          <div className="lg:col-span-1">
            <div className="tiers-section bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                মেম্বারশিপ লেভেলসমূহ
              </h2>

              <div className="space-y-4">
                {rewardTiers.map((tier, index) => (
                  <div
                    key={index}
                    className={`tier-card relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      tier.name === currentLevel
                        ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30"
                        : "border-gray-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-gray-50 dark:bg-slate-800/60"
                    }`}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {tier.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-lg">
                          {tier.name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                          {tier.minPoints}+ পয়েন্ট
                        </div>
                      </div>
                      {tier.name === currentLevel && (
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          বর্তমান
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {tier.name === currentLevel && (
                      <div className="absolute top-3 right-3">
                        <Sparkles className="w-5 h-5 text-emerald-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Points Activity */}
            <div className="activity-section bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                সাম্প্রতিক কার্যকলাপ
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="activity-item flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {activity.description}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(activity.date).toLocaleDateString("bn-BD")}
                      </div>
                    </div>
                    <div
                      className={`font-bold text-lg ${
                        activity.points > 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {activity.points > 0 ? "+" : ""}
                      {activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Available Rewards */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              উপলব্ধ রিওয়ার্ডসমূহ
            </h2>

            <div className="rewards-grid grid sm:grid-cols-2 gap-8 mb-12">
              {availableRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="reward-card relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 group"
                >
                  {/* Card Glow Effect */}
                  <div className="reward-glow absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                  {/* Main Card */}
                  <div className="relative p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div
                        className={`reward-icon w-16 h-16 bg-gradient-to-r ${reward.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {reward.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {reward.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {reward.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                          {reward.points} পয়েন্ট
                        </span>
                      </div>
                      <button
                        className={`redeem-btn px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                          userPoints >= reward.points
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg cursor-pointer"
                            : "bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={userPoints < reward.points}
                      >
                        {userPoints >= reward.points
                          ? "রিডিম করুন"
                          : "আরও পয়েন্ট প্রয়োজন"}
                      </button>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                      <Sparkles className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced How to Earn Points */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-purple-200 dark:border-purple-800">
                  <Zap className="w-4 h-4 mr-2" />
                  পয়েন্ট অর্জনের উপায়
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                  যেভাবে সহজে পয়েন্ট অর্জন করবেন
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  সহজে পয়েন্ট অর্জন করে দারুণ সব পুরস্কার ও ক্যাশব্যাক আনলক করুন
                </p>
              </div>

              <div className="earn-methods grid sm:grid-cols-3 gap-8">
                {earnMethods.map((method, index) => (
                  <div key={index} className="earn-method text-center group">
                    <div
                      className={`earn-icon w-20 h-20 bg-gradient-to-r ${method.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <method.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                      {method.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="mt-12 text-center">
                <Link
                  href="/super-shop/shop"
                  className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3 cursor-pointer"
                >
                  <Gift className="w-5 h-5" />
                  <span>পয়েন্ট অর্জন শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Special Promotions Section */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <Zap className="w-4 h-4 mr-2 text-yellow-300" />
              সীমিত সময়ের অফার
              <Sparkles className="w-4 h-4 ml-2 text-pink-300" />
            </div>

            <h3 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                ডাবল পয়েন্ট
              </span>{" "}
              উইকএন্ড!
            </h3>

            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              এই উইকএন্ডে প্রতিটি কেনাকাটায় 2x পয়েন্ট উপভোগ করুন।
              <span className="text-yellow-200 font-bold">
                {" "}
                সুবর্ণ সুযোগটি হাতছাড়া করবেন না!
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "⚡",
                  title: "2x পয়েন্ট",
                  desc: "সব কেনাকাটায় দ্বিগুণ রিওয়ার্ড",
                },
                {
                  icon: "🎯",
                  title: "ন্যূনতম সীমা নেই",
                  desc: "যেকোনো মূল্যের অর্ডারে প্রযোজ্য",
                },
                { icon: "⏰", title: "48 ঘণ্টা", desc: "শুধুমাত্র এই উইকএন্ডে" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-bold mb-2 text-lg">{feature.title}</h4>
                  <p className="text-white/80 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/super-shop/shop"
                className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Gift className="w-5 h-5" />
                <span>এখনই কিনুন ও 2x পান</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/super-shop/shop"
                className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
              >
                <Trophy className="w-5 h-5" />
                <span>সব অফার দেখুন</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-12">
            গ্রাহকদের সফলতার গল্প
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "সারাহ আহমেদ",
                level: "Gold মেম্বার",
                savings: "৳2,500",
                story:
                  "গত এক বছরে সুপার শপের রিওয়ার্ড এবং এক্সক্লুসিভ অফারের মাধ্যমে ৳2,500 এর বেশি সাশ্রয় করেছি!",
                avatar: "👩‍💼",
              },
              {
                name: "করিম হাসান",
                level: "Platinum মেম্বার",
                savings: "৳4,200",
                story:
                  "ডাবল পয়েন্ট ইভেন্টগুলোর কল্যাণে খুব দ্রুত Platinum মেম্বারশিপে পৌঁছাতে পেরেছি। দারুণ অভিজ্ঞতা!",
                avatar: "👨‍💻",
              },
              {
                name: "ফাতিমা খান",
                level: "Silver মেম্বার",
                savings: "৳1,800",
                story:
                  "ফ্রি ডেলিভারি রিওয়ার্ডগুলো আমার সবচেয়ে পছন্দের - এটি সময় ও টাকা দুটোই দারুণভাবে বাঁচায়!",
                avatar: "👩‍🎓",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-slate-800 text-left"
              >
                <div className="text-5xl mb-4">{story.avatar}</div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {story.name}
                </h4>
                <div className="text-emerald-600 dark:text-emerald-400 font-semibold mb-4 text-sm">
                  {story.level}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic text-sm">
                  &ldquo;{story.story}&rdquo;
                </p>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                  সঞ্চয় {story.savings}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8 text-center">
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "আমি কীভাবে পয়েন্ট উপার্জন করব?",
                answer:
                  "প্রতি ৳10 খরচে 1 পয়েন্ট অর্জিত হয়, এছাড়া রেফারেল বোনাস এবং বিশেষ উইকএন্ড ইভেন্টে দ্বিগুণ পয়েন্ট পাওয়া যায়।",
              },
              {
                question: "পয়েন্টের মেয়াদ কি শেষ হয়ে যায়?",
                answer:
                  "না, প্রতি 12 মাসে অন্তত একটি কেনাকাটা সম্পন্ন করলে আপনার অর্জিত পয়েন্টের মেয়াদ কখনোই শেষ হবে না।",
              },
              {
                question: "একাধিক রিওয়ার্ড কি একসাথে ব্যবহার করা যাবে?",
                answer:
                  "হ্যাঁ! আপনি ফ্রি ডেলিভারি ভাউচারের সাথে ডিসকাউন্ট কুপন একসাথে ব্যবহার করতে পারবেন।",
              },
              {
                question: "আমার বর্তমান পয়েন্ট কীভাবে দেখতে পাব?",
                answer:
                  "এই পেজের শীর্ষ ব্যানার এবং আপনার অ্যাকাউন্ট ড্যাশবোর্ডে যেকোনো সময় রিয়েল-টাইম পয়েন্ট দেখতে পারবেন।",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400">
          {[
            "🔒 নিরাপদ রিওয়ার্ড সিস্টেম",
            "⚡ তাৎক্ষণিক পয়েন্ট আপডেট",
            "🎁 কোনো গোপন চার্জ নেই",
            "💯 শতভাগ সন্তুষ্টির নিশ্চয়তা",
          ].map((indicator, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm font-medium"
            >
              <span>{indicator}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
