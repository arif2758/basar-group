"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
    <section id="events" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community events and workshops to grow together
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              ref={(el) => { eventCardsRef.current[index] = el; }}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="h-48 relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {event.title}
                  </h3>
                  <FaCalendarAlt className="text-emerald-600" />
                </div>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    <div>{event.date}</div>
                    <div>{event.time}</div>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
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