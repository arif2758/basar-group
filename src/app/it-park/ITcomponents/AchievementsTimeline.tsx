"use client";

import { useRef } from "react";
import { FaTrophy } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
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
                  className={`bg-gray-800 rounded-xl p-6 shadow-lg max-w-md ${
                    index % 2 === 0 ? "mr-4" : "ml-4"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <FaTrophy className="text-emerald-400 mr-3" />
                    <span className="text-emerald-400 font-bold">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300">{achievement.description}</p>
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
