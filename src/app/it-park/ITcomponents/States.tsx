"use client";

import {  useState, useRef } from "react";
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaUsers,
} from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

// Counter component
const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    const element = ref.current;
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        gsap.to(
          { value: 0 },
          {
            value: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: function () {
              setCount(Math.floor(this.targets()[0].value));
            },
          }
        );
      },
      once: true,
    });
  }, [end, duration]);

  return <span ref={ref}>{count}+</span>;
};

function States() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useScrollAnimation();
  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);

    gsap.set(cards, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        });
      },
      once: true,
    });

    // Hover animations
    cards.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }
    });
  }, []);

  const stats = [
    { number: 1000, label: "Lives Impacted", icon: FaUsers },
    { number: 500, label: "Students Trained", icon: FaGraduationCap },
    { number: 200, label: "Jobs Created", icon: FaLaptopCode },
    { number: 50, label: "Community Events", icon: FaCalendarAlt },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group"
            >
              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200">
                <stat.icon className="text-3xl text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                  <CountUp end={stat.number} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default States;
