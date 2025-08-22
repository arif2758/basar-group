"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    <section ref={sectionRef} className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Student Support System
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="text-4xl mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 mb-4">{program.description}</p>
              <div className="text-sm text-emerald-600 font-semibold">
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
