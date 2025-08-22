"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function JobBoard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const jobCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const jobs = [
    {
      title: "Web Developer",
      company: "Local Tech Co.",
      type: "Full-time",
      location: "Remote",
      salary: "$1,200/mo",
    },
    {
      title: "Graphics Designer",
      company: "Marketing Agency",
      type: "Part-time",
      location: "Local",
      salary: "$800/mo",
    },
    {
      title: "Digital Marketing Specialist",
      company: "E-commerce",
      type: "Contract",
      location: "Hybrid",
      salary: "$1,000/mo",
    },
    {
      title: "Content Creator",
      company: "Media Company",
      type: "Freelance",
      location: "Remote",
      salary: "$600/mo",
    },
    {
      title: "Photography Assistant",
      company: "Studio XYZ",
      type: "Part-time",
      location: "Local",
      salary: "$500/mo",
    },
    {
      title: "IT Support",
      company: "Community Center",
      type: "Full-time",
      location: "Local",
      salary: "$900/mo",
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
          ease: "power2.out"
        });
      },
      once: true
    });

    // Job cards animation
    const cards = jobCardsRef.current.filter(Boolean);
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
          ease: "power2.out"
        });
      },
      once: true
    });

    // Hover animations
    cards.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });
  }, []);

  return (
    <section id="jobs" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with local and remote opportunities tailored for our
            community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              ref={(el) => { jobCardsRef.current[index] = el; }}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300 border border-gray-200 cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-2">{job.company}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                  {job.type}
                </span>
                <span className="text-gray-500 text-sm">{job.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {job.salary}
                </span>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200">
                  Apply →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobBoard;