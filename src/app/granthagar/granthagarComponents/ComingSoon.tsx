"use client";

import React, { useRef } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ComingSoon: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const comingBooks = [
    {
      id: 1,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      donor: "Maria Ahmed",
      arrivalDate: "3 days",
      category: "Spirituality"
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      donor: "Karim Hassan",
      arrivalDate: "5 days",
      category: "Finance"
    },
    {
      id: 3,
      title: "The 7 Habits",
      author: "Stephen Covey",
      donor: "Ayesha Siddique",
      arrivalDate: "7 days",
      category: "Self-Help"
    }
  ];

  useGSAP(() => {
    // Set initial states
    gsap.set(".coming-header", { y: 50, opacity: 0 });
    gsap.set(".coming-card", { y: 60, opacity: 0, scale: 0.95 });
    gsap.set(".calendar-cta", { y: 60, opacity: 0, scale: 0.95 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".coming-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".coming-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".calendar-cta", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)"
    }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="coming-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Books Coming Soon
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Exciting new books are on their way! Reserve your spot and be the first to read these amazing titles.
          </p>
        </div>

        <div className="coming-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingBooks.map((book) => (
            <div key={book.id} className="coming-card bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600">by {book.author}</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-orange-600 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Arrives in</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {book.arrivalDate}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  <span>Donated by {book.donor}</span>
                </div>
                
                <button className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="calendar-cta marble-gradient text-gray-800 rounded-xl shadow-lg p-8 mt-12 text-center">
          <Calendar className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Want to see more arrivals?
          </h3>
          <p className="mb-6">
            Check our complete arrival calendar and reserve books up to 30 days in advance.
          </p>
          <button className="teal-slate-gradient hover:teal-slate-gradient-hover text-gray-200 hover:text-gray-50 px-6 py-3 rounded-lg font-semibold transition-colors">
            View Full Calendar
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;