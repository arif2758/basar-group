"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";



import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
      className="relative py-20 bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4 border border-blue-100 dark:border-blue-800/50">
            <FiUsers className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Volunteer Opportunities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Be part of BASAR Group — contribute your time, skills, and passion
            to empower the community and create lasting change.
          </p>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stat-card text-center">
                <div className="bg-slate-50 dark:bg-[#141414] rounded-xl p-5 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-100 dark:border-blue-800/40">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
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
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20"
        >
          {opportunities.map((op) => {
            const Icon = op.icon;
            return (
              <div
                key={op.id}
                className="opportunity-card group bg-white dark:bg-[#141414] rounded-2xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] 
                           transition-all duration-200 border border-slate-200 dark:border-[#303030] hover:border-blue-400 dark:hover:border-blue-500/50 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                                flex items-center justify-center border border-blue-100 dark:border-blue-800/40 mb-4"
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {op.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4">
                    {op.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                      Requirements:
                    </h4>
                    <ul className="space-y-1">
                      {op.requirements.map((req, index) => (
                        <li
                          key={index}
                          className="text-xs text-slate-600 dark:text-slate-300 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time Commitment & Impact */}
                  <div className="space-y-2 mb-6">
                    <div className="p-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#2a2a2a]">
                      <div className="flex items-center text-xs text-slate-700 dark:text-slate-300">
                        <FiClock className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="font-medium">{op.timeCommitment}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                      <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center">
                        <FiTarget className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                        <span>{op.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => openModal(op)}
                    className="w-full py-2.5 rounded-lg text-xs sm:text-sm font-medium 
                               bg-blue-600 hover:bg-blue-700 text-white
                               shadow-sm transition-colors flex items-center justify-center gap-1.5"
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
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Why Become a Volunteer?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Being a volunteer at BASAR Group means more than giving your time
              — it&apos;s about learning, growing, and making a meaningful
              difference in people&apos;s lives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="benefit-card bg-slate-50 dark:bg-[#141414] rounded-2xl p-6 
                             transition-all duration-200 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4 border border-blue-100 dark:border-blue-800/40"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {b.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="mb-20">
          <div className="rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 border border-slate-200 dark:border-[#303030] shadow-lg">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <blockquote className="text-lg sm:text-xl font-normal mb-6 leading-relaxed italic">
                &ldquo;Volunteering with BASAR Group has been life-changing. I&apos;ve
                gained valuable skills, made lifelong friends, and most
                importantly, contributed to meaningful change in my community.&rdquo;
              </blockquote>
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">Ayesha Sultana</div>
                  <div className="text-blue-200 text-xs">
                    IT Mentor Volunteer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl p-8 sm:p-10 shadow-sm border border-slate-200 dark:border-[#303030]">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Ready to Make a Difference?
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto leading-relaxed">
              Join our community of passionate volunteers and help us create
              positive change. Your skills and dedication can transform lives.
            </p>
            <button
              onClick={() => openModal(opportunities[0])}
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium text-white
                         bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              <FiUsers className="w-4 h-4 mr-2" />
              Join as a Volunteer
            </button>

            <div className="mt-6 flex flex-wrap gap-4 justify-center items-center text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <FiClock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flexible Hours</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiAward className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Certificate Provided</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <FiHeart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Make Real Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedRole && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="modal-content bg-white dark:bg-[#141414] rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-[#303030]"
          >
            <div className="p-6 sm:p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-[#252525]">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 border border-blue-100 dark:border-blue-800/40"
                  >
                    <selectedRole.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Apply for {selectedRole.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      {selectedRole.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-[#202020] rounded-lg transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Role Details */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center text-xs">
                    <FiClock className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                    Time Commitment
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs">
                    {selectedRole.timeCommitment}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                  <h4 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center text-xs">
                    <FiTarget className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
                    Your Impact
                  </h4>
                  <p className="text-emerald-700 dark:text-emerald-300 text-xs">
                    {selectedRole.impact}
                  </p>
                </div>
              </div>

              {/* Application Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your phone number"
                      className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Why do you want to volunteer with us? *
                  </label>
                  <textarea
                    required
                    placeholder="Tell us about your motivation..."
                    rows={3}
                    className="w-full px-3.5 py-2 border border-slate-200 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex items-center space-x-2.5 p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-200 dark:border-[#252525]">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    I agree to the volunteer responsibilities and guidelines
                  </label>
                </div>

                <div className="border-t border-slate-100 dark:border-[#252525] pt-4 mt-6">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg font-medium text-white text-sm
                               bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm
                               flex items-center justify-center"
                  >
                    <FiHeart className="w-4 h-4 mr-2" />
                    Submit Application
                  </button>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-3">
                    We&apos;ll review your application and get back to you within 3-5 business days.
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
