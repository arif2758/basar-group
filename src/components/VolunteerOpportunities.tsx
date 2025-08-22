"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState } from "react";
import {
  FiBook,
  FiMonitor,
  FiShoppingBag,
  FiHeart,
  FiUsers,
  FiStar,
  FiTrendingUp,
  FiGlobe,
  FiX,
  FiAward,
  FiTarget,
  FiClock,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

interface Opportunity {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  requirements: string[];
  timeCommitment: string;
  impact: string;
}

const opportunities: Opportunity[] = [
  {
    id: "library",
    title: "Library Assistant",
    icon: FiBook,
    description:
      "Organize books, assist visitors, and support reading programs.",
    color: "from-indigo-500 to-cyan-500",
    requirements: ["Love for books", "Good communication", "2-3 hours/week"],
    timeCommitment: "6-10 hours/week",
    impact: "Help 50+ students access quality education materials",
  },
  {
    id: "it-mentor",
    title: "IT Mentor",
    icon: FiMonitor,
    description:
      "Teach programming, web design, or digital skills to students.",
    color: "from-emerald-500 to-teal-500",
    requirements: ["Programming knowledge", "Teaching passion", "Tech skills"],
    timeCommitment: "8-12 hours/week",
    impact: "Train 20+ students in valuable digital skills",
  },
  {
    id: "delivery",
    title: "Delivery Volunteer",
    icon: FiShoppingBag,
    description: "Help with Super Shop deliveries and logistics coordination.",
    color: "from-orange-500 to-pink-500",
    requirements: ["Own transport", "Local area knowledge", "Physical fitness"],
    timeCommitment: "4-6 hours/week",
    impact: "Serve 100+ families with essential goods",
  },
  {
    id: "outreach",
    title: "Community Outreach",
    icon: FiHeart,
    description:
      "Organize events, visit families, and coordinate Foundation programs.",
    color: "from-blue-500 to-purple-500",
    requirements: ["Social skills", "Event planning", "Community connection"],
    timeCommitment: "10-15 hours/week",
    impact: "Reach 200+ community members monthly",
  },
];

const benefits = [
  {
    title: "Skill Development",
    desc: "Learn leadership, communication, teamwork & project management through hands-on experience.",
    icon: FiTrendingUp,
    color: "from-blue-100 to-indigo-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Global Networking",
    desc: "Connect with mentors, professionals & like-minded volunteers from diverse backgrounds.",
    icon: FiGlobe,
    color: "from-emerald-100 to-green-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Recognition & Awards",
    desc: "Get certificates, appreciation letters & showcase your volunteer work in your portfolio.",
    icon: FiStar,
    color: "from-amber-100 to-yellow-100",
    iconColor: "text-amber-600",
  },
];

const stats = [
  { number: "500+", label: "Active Volunteers", icon: FiUsers },
  { number: "2,000+", label: "Hours Contributed", icon: FiClock },
  { number: "50+", label: "Projects Completed", icon: FiTarget },
  { number: "95%", label: "Satisfaction Rate", icon: FiAward },
];

export default function VolunteerOpportunities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Opportunity | null>(null);

  // Refs for animations
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const opportunitiesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

        // Opportunities cards animation
        .fromTo(
          ".opportunity-card",
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
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        )

        // Benefits section animation
        .fromTo(
          benefitsRef.current,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )

        // Benefits cards animation
        .fromTo(
          ".benefit-card",
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
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      // Stats animation
      gsap.fromTo(
        ".stat-card",
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for opportunity cards
      const opportunityCards =
        gsap.utils.toArray<HTMLElement>(".opportunity-card");
      opportunityCards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>(".opportunity-icon");
        const button = card.querySelector<HTMLElement>(".apply-btn");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -12,
            scale: 1.03,
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            duration: 0.4,
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
          if (button) {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.4,
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
          if (button) {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      });

      // Benefit cards hover animation
      const benefitCards = gsap.utils.toArray<HTMLElement>(".benefit-card");
      benefitCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Button hover animations
      const buttons = gsap.utils.toArray<HTMLElement>(".animated-btn");
      buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            y: -3,
            boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Floating animation for icons
      gsap.to(".floating-icon", {
        y: -5,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Number counter animation
      const counters = gsap.utils.toArray<HTMLElement>(".stat-number");
      counters.forEach((counter) => {
        ScrollTrigger.create({
          trigger: counter,
          start: "top 80%",
          onEnter: () => {
            const target = parseInt(
              counter.textContent?.replace(/[^\d]/g, "") || "0"
            );
            const obj = { value: 0 };

            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                const currentValue = Math.round(obj.value);
                if (counter.textContent?.includes("+")) {
                  counter.textContent = `${currentValue}+`;
                } else if (counter.textContent?.includes("%")) {
                  counter.textContent = `${currentValue}%`;
                } else {
                  counter.textContent = currentValue.toString();
                }
              },
            });
          },
        });
      });
    },
    { scope: containerRef }
  );

  const openModal = (opportunity: Opportunity) => {
    setSelectedRole(opportunity);
    setIsModalOpen(true);

    // Animate modal entrance
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
    );
  };

  const closeModal = () => {
    // Animate modal exit
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedRole(null);
      },
    });
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
        alert("Thank you for your application! We will contact you soon.");
        closeModal();
      },
    });
  };

  return (
    <section
      ref={containerRef}
      id="volunteer"
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-200 to-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            <span className="floating-icon inline-block mr-3">🤝</span>
            Volunteer Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Be part of BASAR Group — contribute your time, skills, and passion
            to empower the community and create lasting change.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stat-card text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="stat-number text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Opportunities */}
        <div
          ref={opportunitiesRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-20"
        >
          {opportunities.map((op) => {
            const Icon = op.icon;
            return (
              <div
                key={op.id}
                className="opportunity-card group bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl 
                           transition-all duration-300 border border-white/20 cursor-pointer"
              >
                <div
                  className={`opportunity-icon w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${op.color} 
                              flex items-center justify-center shadow-lg mb-6`}
                >
                  <Icon className="text-white w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                  {op.title}
                </h3>

                <p className="text-gray-600 text-sm text-center leading-relaxed mb-6">
                  {op.description}
                </p>

                {/* Requirements */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Requirements:
                  </h4>
                  <ul className="space-y-1">
                    {op.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 flex items-center"
                      >
                        <span className="w-1 h-1 bg-emerald-400 rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Time Commitment */}
                <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-center text-xs text-blue-700">
                    <FiClock className="w-3 h-3 mr-1" />
                    <span className="font-medium">{op.timeCommitment}</span>
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-6 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                  <div className="text-xs text-emerald-700 text-center font-medium">
                    <FiTarget className="w-3 h-3 inline mr-1" />
                    {op.impact}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => openModal(op)}
                    className="apply-btn animated-btn px-6 py-3 rounded-xl text-sm font-bold 
                               bg-gradient-to-r from-emerald-500 to-blue-600 text-white
                               shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <FiUsers className="w-4 h-4" />
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits */}
        <div ref={benefitsRef} className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              <span className="floating-icon inline-block mr-2">🌟</span>
              Why Become a Volunteer?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Being a volunteer at BASAR Group means more than giving your time
              — it&asop;s about learning, growing, and making a meaningful
              difference in people&asop;s lives.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="benefit-card bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl 
                             transition-all duration-300 border border-white/20"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${b.color} mb-6 mx-auto`}
                  >
                    <Icon className={`w-8 h-8 ${b.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {b.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-20">
          <div className="teal-slate-gradient rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-4 h-4 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-8 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💬</span>
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium mb-6 max-w-4xl mx-auto leading-relaxed">
                Volunteering with BASAR Group has been life-changing. I&asop;ve
                gained valuable skills, made lifelong friends, and most
                importantly, contributed to meaningful change in my community.
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">AS</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold">Ayesha Sultana</div>
                  <div className="text-emerald-200 text-sm">
                    IT Mentor Volunteer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="marbale-gradient  rounded-3xl p-8 lg:p-12 shadow-2xl border ">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              <span className="floating-icon inline-block mr-2">🚀</span>
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community of passionate volunteers and help us create
              positive change. Your skills and dedication can transform lives.
            </p>
            <button
              onClick={() => openModal(opportunities[0])}
              className="animated-btn inline-flex items-center px-10 py-5 rounded-2xl text-lg font-bold text-white
                         bg-gradient-to-r from-emerald-500 to-blue-600
                         shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <FiUsers className="w-6 h-6 mr-3" />
              Join as a Volunteer
            </button>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <FiClock className="w-4 h-4" />
                <span>Flexible Hours</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <FiAward className="w-4 h-4" />
                <span>Certificate Provided</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <FiHeart className="w-4 h-4" />
                <span>Make Real Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div
            ref={modalRef}
            className="modal-content bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto border border-white/20"
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${selectedRole.color} flex items-center justify-center mr-4`}
                  >
                    <selectedRole.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Apply for {selectedRole.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {selectedRole.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <FiX className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Role Details */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <FiClock className="w-4 h-4 mr-2" />
                    Time Commitment
                  </h4>
                  <p className="text-blue-700 text-sm">
                    {selectedRole.timeCommitment}
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                    <FiTarget className="w-4 h-4 mr-2" />
                    Your Impact
                  </h4>
                  <p className="text-emerald-700 text-sm">
                    {selectedRole.impact}
                  </p>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Why do you want to volunteer with us? *
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about your motivation, relevant experience, and what you hope to achieve..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Relevant Skills & Experience
                  </label>
                  <textarea
                    placeholder="List any relevant skills, experience, or qualifications that make you suitable for this role..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Weekdays", "Weekends", "Mornings", "Evenings"].map(
                      (time) => (
                        <label
                          key={time}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">{time}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    I agree to the terms and conditions and commit to the
                    volunteer responsibilities
                  </label>
                </div>

                <div className="border-t-2 border-gray-100 pt-6">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-bold text-white text-lg
                               bg-gradient-to-r from-emerald-500 to-blue-600
                               hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                               flex items-center justify-center"
                  >
                    <FiHeart className="w-5 h-5 mr-2" />
                    Submit Application
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We&asop;ll review your application and get back to you
                    within 3-5 business days.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
