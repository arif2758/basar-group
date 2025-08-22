"use client";

import React, { useRef } from "react";
import { FiCalendar, FiTarget } from "react-icons/fi";
import { upcomingProjects } from "@/lib/data";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  language: "bn" | "en";
}

export default function Timeline({ language }: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(".timeline-header", { y: 50, opacity: 0 });
    gsap.set(".project-card", { y: 80, opacity: 0, scale: 0.9 });
    gsap.set(".card-icon", { scale: 0, rotation: -180 });
    gsap.set(".card-content", { y: 20, opacity: 0 });
    gsap.set(".card-button", { y: 20, opacity: 0, scale: 0.8 });

    // Header animation
    gsap.to(".timeline-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline-header",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    // Project cards animation
    gsap.to(".project-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".timeline-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Card icons animation
    gsap.to(".card-icon", {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
      stagger: 0.1,
      delay: 0.1,
      scrollTrigger: {
        trigger: ".timeline-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Card content animation
    gsap.to(".card-content", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
      scrollTrigger: {
        trigger: ".timeline-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Card button animation
    gsap.to(".card-button", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.4)",
      stagger: 0.1,
      delay: 0.5,
      scrollTrigger: {
        trigger: ".timeline-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Floating animation for icons
    gsap.to(".card-icon", {
      y: -3,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 1.5
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="timeline-header text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-neutral-dark mb-4">
            {language === "bn" ? "আসন্ন প্রকল্প" : "Upcoming Projects"}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {language === "bn"
              ? "আগামী ছয় মাসে আমাদের পরিকল্পিত প্রকল্পগুলো এবং আপনি কিভাবে সহায়তা করতে পারেন"
              : "Our planned projects for the next six months and how you can support"}
          </p>
        </div>

        <div className="timeline-grid grid md:grid-cols-2 gap-8">
          {upcomingProjects.map((project, ) => (
            <div
              key={project.id}
              className="project-card bg-gradient-to-br from-soft to-soft-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="card-icon w-12 h-12 bg-primary-green rounded-xl flex items-center justify-center shadow-lg">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="card-content">
                    <h3 className="font-poppins font-bold text-lg text-neutral-dark">
                      {language === "bn"
                        ? project.title
                            .replace(
                              "IT Park Solar Installation",
                              "আইটি পার্ক সোলার ইনস্টলেশন"
                            )
                            .replace(
                              "Library Expansion",
                              "গ্রন্থাগার সম্প্রসারণ"
                            )
                            .replace(
                              "Foundation Winter Drive",
                              "ফাউন্ডেশন শীত অভিযান"
                            )
                            .replace(
                              "Super Shop Expansion",
                              "সুপার শপ সম্প্রসারণ"
                            )
                        : project.title}
                    </h3>
                    <p className="text-primary-green font-medium">{project.month}</p>
                  </div>
                </div>
                <div className="card-content text-right">
                  <div className="flex items-center text-accent font-bold">
                    <FiTarget className="w-4 h-4 mr-1" />
                    <span>{project.target}</span>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {language === "bn"
                    ? project.description
                        .replace(
                          "Installing solar panels to make IT Park energy-efficient",
                          "আইটি পার্ককে শক্তি-সাশ্রয়ী করতে সোলার প্যানেল স্থাপন"
                        )
                        .replace(
                          "Adding new reading spaces and digital learning zones",
                          "নতুন পড়ার স্থান এবং ডিজিটাল লার্নিং জোন যোগ"
                        )
                        .replace(
                          "Providing warm clothes and blankets to families in need",
                          "প্রয়োজনীয় পরিবারগুলোকে গরম কাপড় এবং কম্বল প্রদান"
                        )
                        .replace(
                          "Opening a new branch in the neighboring area",
                          "পার্শ্ববর্তী এলাকায় নতুন শাখা খোলা"
                        )
                    : project.description}
                </p>
              </div>

              <button className="card-button w-full bg-primary-green text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-green-600 hover:scale-105 transition-all duration-200 shadow-md">
                {language === "bn"
                  ? "এই প্রকল্পে সহায়তা করুন"
                  : "Support This Project"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}