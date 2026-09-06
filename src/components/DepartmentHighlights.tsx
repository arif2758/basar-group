"use client";

import React, { useRef } from "react";
import { FiArrowRight, FiUsers, FiTrendingUp } from "react-icons/fi";
import departmentsData from "../data/departments.json";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const DepartmentHighlights: React.FC = () => {
  const { departments } = departmentsData;
  const sectionRef = useRef<HTMLElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Set initial states
      gsap.set(".highlights-header", { y: 60, opacity: 0 });
      gsap.set(".dept-content", { x: -80, opacity: 0 });
      gsap.set(".dept-gallery", { x: 80, opacity: 0 });
      gsap.set(".dept-title", { y: 30, opacity: 0 });
      gsap.set(".dept-tagline", { y: 20, opacity: 0 });
      gsap.set(".dept-description", { y: 20, opacity: 0 });
      gsap.set(".feature-item", { x: -20, opacity: 0 });
      gsap.set(".stat-card", { y: 30, opacity: 0, scale: 0.9 });
      gsap.set(".dept-buttons", { y: 20, opacity: 0 });
     
      gsap.set(".floating-stats", { scale: 0, opacity: 0 });
      gsap.set(".gallery-thumb", { scale: 0, opacity: 0 });

      // Header animation
      gsap.to(".highlights-header", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".highlights-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Department sections animation
      departments.forEach((_, index) => {
      

        // Create timeline for each department
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.dept-section-${index}`,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Content and gallery slide in from opposite sides
        tl.to(`.dept-content-${index}`, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(
            `.dept-gallery-${index}`,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )

          // Content elements animate in sequence
          .to(
            `.dept-title-${index}`,
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.4)",
            },
            "-=0.6"
          )
          .to(
            `.dept-tagline-${index}`,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            `.dept-description-${index}`,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            `.feature-item-${index}`,
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: "sine.out",
            },
            "-=0.3"
          )
          .to(
            `.stat-card-${index}`,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.4)",
            },
            "-=0.2"
          )
          .to(
            `.dept-buttons-${index}`,
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.4)",
            },
            "-=0.2"
          )

          .to(
            `.floating-stats-${index}`,
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
            },
            "-=0.3"
          )
          .to(
            `.gallery-thumb-${index}`,
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          );
      });

      // Floating animation for stats cards
      gsap.to(".floating-stats", {
        y: -8,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1,
        delay: 2,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="highlights-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            বিভাগ বিস্তারিত
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            প্রতিটি বিভাগের অনন্য সেবা ও দীর্ঘমেয়াদী প্রভাব সম্পর্কে আরও জানুন।
          </p>
        </div>

        {/* Department Cards */}
        <div className="space-y-20">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              className={`dept-section-${index} grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`dept-content dept-content-${index} ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="max-w-xl">
                  <h3
                    className={`dept-title dept-title-${index} text-2xl sm:text-3xl font-poppins font-bold text-slate-900 dark:text-white mb-2 tracking-tight`}
                  >
                    {dept.name["bn"]}
                  </h3>
                  <p
                    className={`dept-tagline dept-tagline-${index} text-sm sm:text-base font-semibold mb-3`}
                    style={{ color: dept.color }}
                  >
                    {dept.tagline["bn"]}
                  </p>
                  <p
                    className={`dept-description dept-description-${index} text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed`}
                  >
                    {dept.description["bn"]}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      মূল সুবিধাসমূহ:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {dept.features["bn"].map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`feature-item feature-item-${index} flex items-center space-x-2.5 p-2 rounded-lg bg-slate-50/70 dark:bg-[#141414] border border-slate-200/60 dark:border-[#262626]`}
                        >
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                      className={`stat-card stat-card-${index} bg-slate-50 dark:bg-[#141414] rounded-xl p-4 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]`}
                    >
                      <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 mb-1">
                        <FiUsers className="w-3.5 h-3.5" />
                        <span className="text-xs">সুবিধাভোগী</span>
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white text-base">
                        {dept.beneficiaries["bn"]}
                      </div>
                    </div>
                    <div
                      className={`stat-card stat-card-${index} bg-slate-50 dark:bg-[#141414] rounded-xl p-4 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]`}
                    >
                      <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 mb-1">
                        <FiTrendingUp className="w-3.5 h-3.5" />
                        <span className="text-xs">প্রভাব</span>
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white text-base">
                        {dept.impact["bn"]}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div
                    className={`dept-buttons dept-buttons-${index} flex flex-col sm:flex-row gap-3`}
                  >
                    <Link
                      href={`/${dept.slug}`}
                      className="inline-flex items-center space-x-2 justify-center px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: dept.color }}
                    >
                      <span>{dept.name["bn"]} দেখুন</span>
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#system-flow"
                      className="inline-flex items-center space-x-2 justify-center px-5 py-2.5 rounded-lg text-sm font-medium bg-white dark:bg-[#141414] border border-slate-300 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-colors"
                    >
                      <span>সংযোগ দেখুন</span>
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div
                className={`dept-gallery dept-gallery-${index} ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative h-72 sm:h-88 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
                    <Image
                      src={dept.image}
                      alt={dept.name["bn"]}
                      width={600}
                      height={400}
                      className={`main-image main-image-${index} w-full h-full object-cover transition-transform duration-500 hover:scale-105`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div
                    className={`floating-stats floating-stats-${index} absolute -bottom-4 -right-4 bg-white dark:bg-[#141414] rounded-xl shadow-lg p-3 sm:p-4 border border-slate-200 dark:border-[#303030]`}
                  >
                    <div className="text-center">
                      <div
                        className="text-xl sm:text-2xl font-bold font-poppins"
                        style={{ color: dept.color }}
                      >
                        95%
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">সাফল্যের হার</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentHighlights;
