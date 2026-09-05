"use client";

import React, { useRef } from "react";
import { Crown, Award, Star, Heart } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const DonorWall = () => {
  const containerRef = useRef(null);

  const donorTiers = [
    {
      title: "Platinum Champions",
      icon: Crown,
      color: "from-purple-500 to-purple-700",
      minAmount: "$10,000+",
      donors: [
        {
          name: "The Johnson Family Foundation",
          amount: "$25,000",
          year: "2024",
        },
        { name: "Global Tech Solutions", amount: "$15,000", year: "2024" },
        { name: "Anonymous Donor", amount: "$12,500", year: "2024" },
      ],
    },
    {
      title: "Golden Supporters",
      icon: Award,
      color: "from-amber-500 to-amber-700",
      minAmount: "$5,000+",
      donors: [
        { name: "Sarah & Michael Chen", amount: "$8,000", year: "2024" },
        { name: "Midwest Healthcare Group", amount: "$7,500", year: "2024" },
        { name: "The Ahmed Family", amount: "$6,000", year: "2024" },
        { name: "Future Builders Inc.", amount: "$5,500", year: "2024" },
      ],
    },
    {
      title: "Silver Contributors",
      icon: Star,
      color: "from-gray-400 to-gray-600",
      minAmount: "$1,000+",
      donors: [
        { name: "Robert & Lisa Davis", amount: "$3,000", year: "2024" },
        {
          name: "Community Bank of Springfield",
          amount: "$2,500",
          year: "2024",
        },
        { name: "The Wilson Trust", amount: "$2,000", year: "2024" },
        { name: "Maria Rodriguez", amount: "$1,500", year: "2024" },
        {
          name: "Green Valley School District",
          amount: "$1,200",
          year: "2024", 
        },
        { name: "Dr. James Thompson", amount: "$1,000", year: "2024" },
      ],
    },
  ];

  const recentDonors = [
    { name: "Emma Watson", amount: "$500", timeAgo: "2 hours ago" },
    { name: "David Park", amount: "$250", timeAgo: "4 hours ago" },
    { name: "Anonymous", amount: "$100", timeAgo: "6 hours ago" },
    { name: "Jennifer Smith", amount: "$750", timeAgo: "8 hours ago" },
    { name: "Carlos Rivera", amount: "$300", timeAgo: "12 hours ago" },
  ];

useScrollAnimation();
  useGSAP(() => {
  // Header animation
  gsap.from(".donor-header", {
    scrollTrigger: {
      trigger: ".donor-header",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Donor tiers animation
  gsap.utils.toArray<HTMLElement>(".donor-tier").forEach((tier, index) => {
    gsap.from(tier, {
      scrollTrigger: {
        trigger: tier,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: "power2.out",
    });
  });

  // Donor cards individual
  gsap.utils.toArray<HTMLElement>(".donor-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.05,
      ease: "power2.out",
    });
  });

  // Recent donations section
  gsap.from(".recent-donations", {
    scrollTrigger: {
      trigger: ".recent-donations",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Recent donor items - Individual targeting
  gsap.utils.toArray<HTMLElement>(".recent-donor-item").forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: "power2.out",
    });
  });

  // Corporate partners section
  gsap.from(".corporate-partners", {
    scrollTrigger: {
      trigger: ".corporate-partners",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Corporate partner cards - Individual targeting
  gsap.utils.toArray<HTMLElement>(".partner-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.08,
      ease: "power2.out",
    });
  });

  // CTA animation
  gsap.from(".donor-cta", {
    scrollTrigger: {
      trigger: ".donor-cta",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

}, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="donor-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Wall of Generosity
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Honoring the compassionate hearts who make our mission possible.
            Every donor, regardless of contribution size, creates meaningful
            impact.
          </p>
        </div>

        {/* Donor Tiers */}
        <div className="space-y-10 max-w-6xl mx-auto">
          {donorTiers.map((tier, tierIndex) => {
            const TierIcon = tier.icon;
            return (
              <div
                key={tierIndex}
                className="donor-tier bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-8 border border-slate-200 dark:border-[#303030]"
              >
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`bg-gradient-to-r ${tier.color} p-3.5 rounded-xl mr-4 shadow-sm`}
                  >
                    <TierIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {tier.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {tier.minAmount}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {tier.donors.map((donor, donorIndex) => (
                    <div
                      key={donorIndex}
                      className={`donor-card bg-gradient-to-br ${tier.color} p-5 rounded-xl text-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className="relative z-10">
                        <h4 className="font-bold text-base mb-2 line-clamp-1">
                          {donor.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">
                            {donor.amount}
                          </span>
                          <span className="text-xs opacity-80">
                            {donor.year}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 opacity-20">
                        <TierIcon className="w-14 h-14" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Donations */}
        <div className="recent-donations mt-16 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#141414] rounded-2xl p-8 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <div className="text-center mb-6">
              <Heart className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                Recent Donations
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Live updates from our community of generous supporters
              </p>
            </div>

            <div className="space-y-3">
              {recentDonors.map((donor, index) => (
                <div
                  key={index}
                  className="recent-donor-item bg-slate-50 dark:bg-[#1f1f1f] rounded-xl p-3.5 border border-slate-200 dark:border-[#303030] flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800/40">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{donor.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">{donor.timeAgo}</p>
                    </div>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
                    {donor.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Partners */}
        <div className="corporate-partners mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Corporate Partners
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Companies committed to social responsibility and community impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              "Global Tech Solutions",
              "Midwest Healthcare Group",
              "Future Builders Inc.",
              "Community Bank of Springfield",
              "Green Valley School District",
              "Sunrise Energy Corp.",
              "Metro Construction Group",
              "Valley Fresh Foods",
            ].map((company, index) => (
              <div
                key={index}
                className="partner-card bg-white dark:bg-[#141414] rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 border border-slate-200 dark:border-[#303030] text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] mx-auto mb-3 flex items-center justify-center">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                    {company.charAt(0)}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  {company}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                  Partner Since 2023
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Wall CTA */}
        <div className="donor-cta text-center mt-16">
          <div className="bg-white dark:bg-[#141414] rounded-2xl p-8 max-w-4xl mx-auto border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Join Our Wall of Generosity
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Every donation, no matter the size, makes a difference and earns
              recognition in our community of change-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-sm font-medium shadow-sm transition-all duration-200 active:scale-[0.98]">
                Make a Donation
              </button>
              <button className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#252525] text-slate-800 dark:text-slate-200 px-8 py-3 rounded-xl text-sm font-medium transition-all duration-200">
                Corporate Partnerships
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorWall;