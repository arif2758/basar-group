"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function EventsAndRegistration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const eventCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const events = [
    {
      title: "Free Medical Camp",
      date: "March 15, 2024",
      time: "9:00 AM - 4:00 PM",
      description: "Free health checkups for community members",
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
    },
    {
      title: "Skills Fair 2024",
      date: "March 22, 2024",
      time: "10:00 AM - 6:00 PM",
      description: "Showcase of student projects and skill demonstrations",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg",
    },
    {
      title: "Web Development Workshop",
      date: "March 29, 2024",
      time: "2:00 PM - 5:00 PM",
      description: "Hands-on workshop for beginners in web development",
      image: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg",
    },
    {
      title: "Community Networking",
      date: "April 5, 2024",
      time: "6:00 PM - 8:00 PM",
      description: "Connect with mentors, learners, and supporters",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
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
          ease: "power2.out"
        });
      },
      once: true
    });

    // Event cards animation
    const cards = eventCardsRef.current.filter(Boolean);
    gsap.set(cards, { y: 50, opacity: 0 });
    
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
    cards.forEach((card) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
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
    <section id="events" ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Join our community events and workshops to grow together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => { eventCardsRef.current[index] = el; }}
              className="bg-slate-50 dark:bg-[#141414] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer group"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h3>
                  <FaCalendarAlt className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{event.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-[#252525]">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-medium shadow-sm transition-all duration-200 active:scale-[0.98]">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsAndRegistration;