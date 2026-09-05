"use client";

import { useRef } from "react";
import { FaTrophy } from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

const achievements = [
  {
    year: "2020",
    title: "BASAR IT Park Founded",
    description: "Vision to combine learning with community space",
  },
  {
    year: "2021",
    title: "First 100 Students",
    description: "Reached milestone of helping 100 learners",
  },
  {
    year: "2022",
    title: "Solar Installation",
    description: "Became fully solar-powered for sustainability",
  },
  {
    year: "2023",
    title: "1000+ Lives Impacted",
    description: "Over 1000 community members benefited",
  },
  {
    year: "2024",
    title: "Regional Recognition",
    description: "Awarded for community development excellence",
  },
];

function AchievementsTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    // Timeline line animation
    gsap.set(timelineRef.current, { scaleY: 0 });

    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(timelineRef.current, {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "top",
        });
      },
      once: true,
    });

    // Achievement cards animation
    const cards = achievementRefs.current.filter(Boolean);
    const dots = dotsRef.current.filter(Boolean);

    cards.forEach((card, index) => {
      if (card) {
        const isLeft = index % 2 === 0;
        gsap.set(card, { x: isLeft ? -60 : 60, opacity: 0 });
        gsap.set(dots[index], { scale: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            gsap.to(card, {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              delay: index * 0.1,
            });

            gsap.to(dots[index], {
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
              delay: index * 0.1 + 0.3,
            });
          },
          once: true,
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Our Journey</h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Milestones that mark our commitment to community development
          </p>
        </div>

        <div className="relative">
          <div
            ref={timelineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-emerald-600 h-full"
          ></div>
          {achievements.map((achievement, index) => (
            <div key={index} className="relative mb-12">
              <div
                ref={(el) => {
                  achievementRefs.current[index] = el;
                }}
                className={`flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`bg-white dark:bg-[#141414] rounded-2xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] max-w-md transition-all duration-300 ${
                    index % 2 === 0 ? "mr-4" : "ml-4"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <FaTrophy className="text-amber-500 mr-2.5 text-base" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{achievement.description}</p>
                </div>
              </div>
              <div
                ref={(el) => {
                  dotsRef.current[index] = el;
                }}
                className="absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievementsTimeline;
