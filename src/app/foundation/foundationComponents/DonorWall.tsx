"use client";

import React, { useRef } from "react";
import { Crown, Award, Star, Heart } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section ref={containerRef} className="py-20 to-white">
      <div className="container mx-auto px-4">
        <div className="donor-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Wall of Generosity
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Honoring the compassionate hearts who make our mission possible.
            Every donor, regardless of contribution size, creates meaningful
            impact.
          </p>
        </div>

        {/* Donor Tiers */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {donorTiers.map((tier, tierIndex) => {
            const TierIcon = tier.icon;
            return (
              <div
                key={tierIndex}
                className="donor-tier marble-gradient rounded-3xl shadow-xl p-8 border border-gray-100"
              >
                <div className="flex items-center justify-center mb-8">
                  <div
                    className={`bg-gradient-to-r ${tier.color} p-4 rounded-2xl mr-4`}
                  >
                    <TierIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                      {tier.title}
                    </h3>
                    <p className="text-gray-600 font-semibold">
                      {tier.minAmount}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tier.donors.map((donor, donorIndex) => (
                    <div
                      key={donorIndex}
                      className={`donor-card bg-gradient-to-br ${tier.color} p-6 rounded-2xl text-white relative overflow-hidden`}
                    >
                      <div className="relative z-10">
                        <h4 className="font-bold text-lg mb-2 line-clamp-2">
                          {donor.name}
                        </h4>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold">
                            {donor.amount}
                          </span>
                          <span className="text-sm opacity-90">
                            {donor.year}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 opacity-20">
                        <TierIcon className="w-16 h-16" />
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
          <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-3xl p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Recent Donations
              </h3>
              <p className="text-lg text-gray-600">
                Live updates from our community of generous supporters
              </p>
            </div>

            <div className="space-y-4">
              {recentDonors.map((donor, index) => (
                <div
                  key={index}
                  className="recent-donor-item bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 w-12 h-12 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{donor.name}</h4>
                      <p className="text-gray-600 text-sm">{donor.timeAgo}</p>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold text-lg">
                    {donor.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate Partners */}
        <div className="corporate-partners mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Corporate Partners
            </h3>
            <p className="text-lg text-gray-600">
              Companies committed to social responsibility and community impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                className="partner-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {company.charAt(0)}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 text-center">
                  {company}
                </h4>
                <p className="text-gray-600 text-sm text-center mt-2">
                  Proud Partner Since 2023
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Wall CTA */}
        <div className="donor-cta text-center mt-16">
          <div className="teal-slate-gradient rounded-3xl p-8 max-w-4xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-4">
              Join Our Wall of Generosity
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Every donation, no matter the size, makes a difference and earns
              recognition in our community of change-makers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Make a Donation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105">
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