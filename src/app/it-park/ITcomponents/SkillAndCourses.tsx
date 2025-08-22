"use client";

import { useRef } from "react";
import { FaBullhorn, FaCamera, FaLaptopCode, FaPalette } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    <section id="skills" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Skills & Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group-hover:border-emerald-200">
                <div
                  ref={(el) => { iconsRef.current[index] = el; }}
                  className={`w-16 h-16 ${skill.color} rounded-lg flex items-center justify-center mb-4 transition-transform duration-300`}
                >
                  <skill.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-600 mb-4">{skill.description}</p>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200">
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