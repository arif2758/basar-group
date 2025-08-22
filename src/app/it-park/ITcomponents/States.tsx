"use client";

import {  useState, useRef } from "react";
import {
  FaCalendarAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaUsers,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Counter component
const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

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
    <section ref={sectionRef} className="py-20 bg-gray-50">
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
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <stat.icon className="text-4xl text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  <CountUp end={stat.number} />
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default States;
