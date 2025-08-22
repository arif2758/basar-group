"use client";

import React, { useRef } from "react";
import { FiArrowRight, FiUsers, FiTrendingUp } from "react-icons/fi";
import departmentsData from "../data/departments.json";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DepartmentGridProps {
  language: "en" | "bn";
}

const DepartmentHighlights: React.FC<DepartmentGridProps> = ({ language }) => {
  const { departments } = departmentsData;
  const sectionRef = useRef<HTMLElement>(null);

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

      // Subtle parallax removed for better performance
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div className="highlights-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            Department Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deeper into each department&apos;s unique offerings and see how
            they create lasting impact.
          </p>
        </div>

        {/* Department Cards */}
        <div className="space-y-20">
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              className={`dept-section-${index} grid lg:grid-cols-2 gap-12 items-center ${
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
                    className={`dept-title dept-title-${index} text-3xl font-poppins font-bold text-gray-900 mb-4`}
                  >
                    {dept.name[language]}
                  </h3>
                  <p
                    className={`dept-tagline dept-tagline-${index} text-lg font-medium mb-4`}
                    style={{ color: dept.color }}
                  >
                    {dept.tagline[language]}
                  </p>
                  <p
                    className={`dept-description dept-description-${index} text-gray-600 mb-6 leading-relaxed`}
                  >
                    {dept.description[language]}
                  </p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {dept.features[language].map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`feature-item feature-item-${index} flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors`}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div
                      className={`stat-card stat-card-${index} bg-white rounded-xl p-4 shadow-lg border-l-4 hover:shadow-xl transition-shadow`}
                      style={{ borderColor: dept.color }}
                    >
                      <div className="flex items-center space-x-2 text-gray-600 mb-1">
                        <FiUsers className="w-4 h-4" />
                        <span className="text-sm">Beneficiaries</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {dept.beneficiaries[language]}
                      </div>
                    </div>
                    <div
                      className={`stat-card stat-card-${index} bg-white rounded-xl p-4 shadow-lg border-l-4 hover:shadow-xl transition-shadow`}
                      style={{ borderColor: dept.color }}
                    >
                      <div className="flex items-center space-x-2 text-gray-600 mb-1">
                        <FiTrendingUp className="w-4 h-4" />
                        <span className="text-sm">Impact</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        {dept.impact[language]}
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div
                    className={`dept-buttons dept-buttons-${index} flex flex-col sm:flex-row gap-4`}
                  >
                    <Link
                      href={`/${dept.slug}`}
                      className="group btn-primary inline-flex items-center space-x-2 justify-center px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ backgroundColor: dept.color }}
                    >
                      <span>Explore {dept.name[language]}</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="#system-flow"
                      className="group btn-outline inline-flex items-center space-x-2 justify-center px-6 py-3 rounded-xl font-semibold bg-white border-2 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                      style={{ borderColor: dept.color, color: dept.color }}
                    >
                      <span>See Connections</span>
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                  <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={dept.image}
                      alt={dept.name[language]}
                      width={600}
                      height={400}
                      className={`main-image main-image-${index} w-full h-full object-cover hover:scale-105 transition-transform duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div
                    className={`floating-stats floating-stats-${index} absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-l-4 backdrop-blur-sm`}
                    style={{ borderColor: dept.color }}
                  >
                    <div className="text-center">
                      <div
                        className="text-2xl font-bold font-poppins"
                        style={{ color: dept.color }}
                      >
                        95%
                      </div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>

                  {/* Small Gallery Thumbnails */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {[1, 2, 3].map((thumb) => (
                      <div
                        key={thumb}
                        className={`gallery-thumb gallery-thumb-${index} w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer`}
                        style={{ borderColor: dept.color + "40" }}
                      />
                    ))}
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
