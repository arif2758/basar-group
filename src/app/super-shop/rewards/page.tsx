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
import { CartProvider } from "../contexts/CartContext";
import FooterShop from "../shopComponents/FooterShop";
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
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      benefits: ["1x Points", "Basic Support", "Standard Delivery"],
    },
    {
      name: "Silver",
      minPoints: 1000,
      color: "from-gray-400 to-slate-500",
      icon: "🥈",
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      benefits: ["1.2x Points", "Priority Support", "Fast Delivery"],
    },
    {
      name: "Gold",
      minPoints: 2000,
      color: "from-yellow-400 to-amber-500",
      icon: "🥇",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      benefits: ["1.5x Points", "VIP Support", "Express Delivery"],
    },
    {
      name: "Platinum",
      minPoints: 5000,
      color: "from-purple-500 to-indigo-600",
      icon: "👑",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      benefits: ["2x Points", "Dedicated Manager", "Same Day Delivery"],
    },
  ];

  const availableRewards = [
    {
      id: 1,
      title: "৳50 Off Next Order",
      points: 500,
      description: "Get ৳50 discount on orders over ৳300",
      type: "discount",
      icon: "💰",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Free Delivery (3 orders)",
      points: 300,
      description: "Free delivery on your next 3 orders",
      type: "delivery",
      icon: "🚚",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "৳100 Off Premium Products",
      points: 800,
      description: "Special discount on premium product range",
      type: "discount",
      icon: "⭐",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      title: "Double Points Weekend",
      points: 1000,
      description: "Earn 2x points on all purchases for a weekend",
      type: "bonus",
      icon: "🎯",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivity = [
    {
      date: "2025-01-15",
      action: "Purchase",
      points: 150,
      description: "Order #1234 - Fresh Vegetables",
      icon: "🛒",
    },
    {
      date: "2025-01-12",
      action: "Purchase",
      points: 80,
      description: "Order #1233 - Dairy Products",
      icon: "🛒",
    },
    {
      date: "2025-01-10",
      action: "Bonus",
      points: 100,
      description: "First order of the month bonus",
      icon: "🎁",
    },
    {
      date: "2025-01-08",
      action: "Purchase",
      points: 120,
      description: "Order #1232 - Weekly Groceries",
      icon: "🛒",
    },
    {
      date: "2025-01-05",
      action: "Redeemed",
      points: -500,
      description: "Redeemed ৳50 discount coupon",
      icon: "🎫",
    },
  ];

  const earnMethods = [
    {
      icon: Gift,
      title: "Shop & Earn",
      description: "Get 1 point for every ৳10 spent",
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Users,
      title: "Refer Friends",
      description: "Earn 200 bonus points for each referral",
      color: "from-orange-400 to-amber-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Trophy,
      title: "Special Events",
      description: "Double points during special promotions",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
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
    <CartProvider>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden"
      >
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="rewards-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
          <div className="rewards-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
          <div className="rewards-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>

          <Sparkles className="sparkle-rewards absolute top-32 right-1/4 w-6 h-6 text-emerald-300/30" />
          <Star className="sparkle-rewards absolute bottom-1/3 left-1/4 w-5 h-5 text-purple-300/25" />
          <Crown className="sparkle-rewards absolute top-2/3 right-1/3 w-5 h-5 text-yellow-300/35" />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Enhanced Header Section */}
          <div className="rewards-header text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-emerald-200">
              <Trophy className="w-4 h-4 mr-2" />
              Rewards Program
              <Crown className="w-4 h-4 ml-2" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Earn & Save
              </span>{" "}
              <span className="relative">
                More
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"></div>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Earn points with every purchase and unlock exclusive rewards.
              <span className="text-emerald-600 font-bold">
                {" "}
                The more you shop, the more you save!
              </span>
            </p>
          </div>

          {/* Enhanced Points Overview */}
          <div className="points-overview bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white mb-12 relative overflow-hidden">
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
                    {currentLevel} Member
                  </span>
                </div>
                <div className="text-5xl sm:text-6xl font-black mb-3">
                  {userPoints.toLocaleString()}
                </div>
                <div className="text-white/80 text-lg font-medium">
                  Total Points Earned
                </div>
              </div>

              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
                  <div className="text-3xl sm:text-4xl font-black mb-3 text-yellow-300">
                    {pointsToNextLevel}
                  </div>
                  <div className="text-white/90 mb-6 font-medium">
                    Points to Gold Level
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                    <div
                      className="progress-fill bg-gradient-to-r from-yellow-400 to-amber-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <div className="mt-4 text-sm text-white/70">
                    {Math.round(((userPoints - 1000) / (2000 - 1000)) * 100)}%
                    Complete
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Next Tier Benefits
                </div>
                <div className="space-y-3">
                  {[
                    "🎁 15% bonus points",
                    "🚚 Priority delivery",
                    "💝 Exclusive offers",
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
              <div className="tiers-section bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  Membership Tiers
                </h2>

                <div className="space-y-4">
                  {rewardTiers.map((tier, index) => (
                    <div
                      key={index}
                      className={`tier-card relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        tier.name === currentLevel
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                        >
                          {tier.icon}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 text-lg">
                            {tier.name}
                          </div>
                          <div className="text-gray-600 font-medium">
                            {tier.minPoints}+ points
                          </div>
                        </div>
                        {tier.name === currentLevel && (
                          <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Current
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <div
                            key={benefitIndex}
                            className="flex items-center space-x-2 text-sm text-gray-600"
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
              <div className="activity-section bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Recent Activity
                </h3>

                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="activity-item flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div
                        className={`font-bold text-lg ${
                          activity.points > 0
                            ? "text-emerald-600"
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
              <h2 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                Available Rewards
              </h2>

              <div className="rewards-grid grid sm:grid-cols-2 gap-8 mb-12">
                {availableRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="reward-card relative bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 group"
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
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {reward.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {reward.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-bold text-emerald-600 text-lg">
                            {reward.points} points
                          </span>
                        </div>
                        <button
                          className={`redeem-btn px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                            userPoints >= reward.points
                              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={userPoints < reward.points}
                        >
                          {userPoints >= reward.points
                            ? "Redeem"
                            : "Need More Points"}
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
              <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-purple-200">
                    <Zap className="w-4 h-4 mr-2" />
                    Earning Methods
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4">
                    How to Earn Points
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Multiple ways to earn points and unlock amazing rewards
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
                      <h4 className="font-bold text-gray-900 mb-3 text-lg">
                        {method.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                  <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3">
                    <Gift className="w-5 h-5" />
                    <span>Start Earning Points</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Special Promotions Section */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Zap className="w-4 h-4 mr-2 text-yellow-300" />
                Limited Time Offer
                <Sparkles className="w-4 h-4 ml-2 text-pink-300" />
              </div>

              <h3 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                  Double Points
                </span>{" "}
                Weekend!
              </h3>

              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Earn 2x points on all purchases this weekend.
                <span className="text-yellow-200 font-bold">
                  {" "}
                  Don&apos;t miss out on this amazing opportunity!
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: "⚡",
                    title: "2x Points",
                    desc: "Double rewards on everything",
                  },
                  {
                    icon: "🎯",
                    title: "No Minimum",
                    desc: "All orders qualify",
                  },
                  { icon: "⏰", title: "48 Hours", desc: "This weekend only" },
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
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                  <Gift className="w-5 h-5" />
                  <span>Shop Now & Earn 2x</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                  <Trophy className="w-5 h-5" />
                  <span>View All Offers</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Stories Section */}
          <div className="mt-20 text-center">
            <h3 className="text-3xl font-black text-gray-900 mb-12">
              Member Success Stories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Ahmed",
                  level: "Gold Member",
                  savings: "৳2,500",
                  story:
                    "Saved over ৳2,500 last year through rewards and exclusive offers!",
                  avatar: "👩‍💼",
                },
                {
                  name: "Karim Hassan",
                  level: "Platinum Member",
                  savings: "৳4,200",
                  story:
                    "The double points events helped me reach Platinum status quickly.",
                  avatar: "👨‍💻",
                },
                {
                  name: "Fatima Khan",
                  level: "Silver Member",
                  savings: "৳1,800",
                  story:
                    "Love the free delivery rewards - saves me time and money!",
                  avatar: "👩‍🎓",
                },
              ].map((story, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
                >
                  <div className="text-5xl mb-4">{story.avatar}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {story.name}
                  </h4>
                  <div className="text-emerald-600 font-semibold mb-4">
                    {story.level}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed italic">
                    &ldquo;{story.story}&rdquo;
                  </p>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                    Saved {story.savings}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How do I earn points?",
                  answer:
                    "Earn 1 point for every ৳10 spent, plus bonus points for referrals and special events.",
                },
                {
                  question: "When do points expire?",
                  answer:
                    "Points never expire as long as you make at least one purchase every 12 months.",
                },
                {
                  question: "Can I combine rewards?",
                  answer:
                    "Yes! You can stack certain rewards like free delivery with discount coupons.",
                },
                {
                  question: "How do I check my points balance?",
                  answer:
                    "Your current points balance is always visible on this page and in your account dashboard.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
            {[
              "🔒 Secure Rewards System",
              "⚡ Instant Point Updates",
              "🎁 No Hidden Fees",
              "💯 Satisfaction Guaranteed",
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

        <FooterShop />
      </div>
    </CartProvider>
  );
}
