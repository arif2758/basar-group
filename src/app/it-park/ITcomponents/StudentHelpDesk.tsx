"use client";

import { useRef } from "react";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function StudentHelpDesk() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const programs = [
    {
      title: "Morning Sessions",
      description:
        "Early morning classes for working professionals and college students",
      icon: "🌅",
      time: "6:00 AM - 10:00 AM",
    },
    {
      title: "Afternoon Programs",
      description:
        "Dedicated time for school students and skill development workshops",
      icon: "☀️",
      time: "2:00 PM - 6:00 PM",
    },
    {
      title: "Peer Mentoring",
      description:
        "Senior learners guide juniors, creating a collaborative learning environment",
      icon: "🤝",
      time: "Ongoing Support",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.set(headerRef.current, { y: 30, opacity: 0 });

    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      once: true,
    });

    // Cards animation
    const cards = cardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 40, opacity: 0 });

    ScrollTrigger.create({
      trigger: cards[0],
      start: "top 75%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
        });
      },
      once: true,
    });

    // Hover animations
    cards.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Student Support System
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Our mentoring system ensures every learner gets personalized
            attention and guidance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="bg-white dark:bg-[#141414] rounded-2xl p-7 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 group"
            >
              <div className="text-3xl mb-3">{program.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {program.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{program.description}</p>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                {program.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudentHelpDesk;
