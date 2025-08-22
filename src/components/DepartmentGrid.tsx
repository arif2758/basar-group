import React, { useState, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import departmentsData from "../data/departments.json";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DepartmentGridProps {
  language: "en" | "bn";
}

const DepartmentGrid: React.FC<DepartmentGridProps> = ({ language }) => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const { departments = [] } = departmentsData || {};
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
 
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

    // Department cards animation
    const cards = cardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 40, opacity: 0 });

    ScrollTrigger.create({
      trigger: cards[0],
      start: "top 75%",
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

    // CTA animation
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: ctaRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
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
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });
  }, []);

  return (
    <section id="departments" className="section-padding bg-soft-50">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            {language === "en" ? "Our Departments" : "আমাদের বিভাগসমূহ"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "en"
              ? "Four interconnected pillars working together to build stronger communities through education, empowerment, commerce, and technology."
              : "চারটি আন্তঃসংযুক্ত স্তম্ভ যা শিক্ষা, ক্ষমতায়ন, ব্যবসা এবং প্রযুক্তির মাধ্যমে শক্তিশালী সম্প্রদায় গড়ে তুলতে একসাথে কাজ করছে।"}
          </p>
        </div>

        {/* Department Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {departments.map((dept, index) => {
            return (
              <div
                key={dept.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredDept(dept.id)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                {/* Background Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-2 transition-all duration-300"
                  style={{ backgroundColor: dept.color }}
                />

                {/* Image */}
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={dept.image}
                    alt={dept.name[language]}
                    width={100}
                    height={75}
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    {dept.name[language]}
                  </h3>
                  <p
                    className="text-sm font-medium mb-3 transition-colors duration-300"
                    style={{ color: dept.color }}
                  >
                    {dept.tagline[language]}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {dept.features[language].map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="text-sm text-gray-600 flex items-start"
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                          style={{ backgroundColor: dept.color }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className="group/btn inline-flex items-center justify-between w-full p-3 rounded-lg border transition-all duration-300 focus-ring"
                    style={{
                      borderColor: dept.color,
                      color: dept.color,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = dept.color;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = dept.color;
                    }}
                  >
                    <span className="font-medium">
                      {language === "en"
                        ? `Visit ${dept.name[language].split(" ")[1]}`
                        : `${dept.name[language].split(" ")[1]} দেখুন`}
                    </span>
                    <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                    hoveredDept === dept.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: dept.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <a
            href="#system-flow"
            className="btn-outline inline-flex items-center space-x-2 text-lg hover:scale-105 transition-transform duration-300"
          >
            <span>
              {language === "en"
                ? "See How They Connect"
                : "দেখুন কীভাবে তারা সংযুক্ত"}
            </span>
            <FiArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DepartmentGrid;
