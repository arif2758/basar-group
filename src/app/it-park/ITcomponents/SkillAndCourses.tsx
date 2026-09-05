"use client";

import { useRef } from "react";
import { FaBullhorn, FaCamera, FaLaptopCode, FaPalette } from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

const skills = [
  {
    icon: FaLaptopCode,
    title: "Web Development",
    description: "Full-stack development with modern frameworks",
    color: "bg-blue-500",
  },
  {
    icon: FaPalette,
    title: "Graphics Design",
    description: "Creative design for digital and print media",
    color: "bg-purple-500",
  },
  {
    icon: FaBullhorn,
    title: "Digital Marketing",
    description: "SEO, social media, and content marketing",
    color: "bg-pink-500",
  },
  {
    icon: FaCamera,
    title: "Photography",
    description: "Professional photography and editing skills",
    color: "bg-indigo-500",
  },
];

function SkillAndCourses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          ease: "power2.out"
        });
      },
      once: true
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
          stagger: 0.15,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Hover animations
    cards.forEach((card, index) => {
      if (card) {
        const icon = iconsRef.current[index];
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -8,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
          
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
      }
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Skills & Courses
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Comprehensive programs designed to prepare you for the digital
            economy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group cursor-pointer"
            >
              <div className="bg-slate-50 dark:bg-[#141414] rounded-2xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300">
                <div
                  ref={(el) => { iconsRef.current[index] = el; }}
                  className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center mb-4 shadow-sm transition-transform duration-300`}
                >
                  <skill.icon className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{skill.description}</p>
                <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline transition-colors duration-200">
                  Enroll Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillAndCourses;