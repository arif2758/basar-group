"use client";

import React, { useRef } from "react";
import { Star, Heart, User } from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const FeaturedBooks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredBooks = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      donor: "Ahmed Rahman",
      status: "Available",
      category: "Philosophy",
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      donor: "Fatima Khan",
      status: "Available",
      category: "History",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      donor: "Rafiq Uddin",
      status: "Borrowed",
      category: "Self-Help",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      donor: "Nasreen Akter",
      status: "Available",
      category: "Fiction",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".books-header", { y: 50, opacity: 1 });
    gsap.set(".book-card", { y: 60, opacity: 0,  });
    gsap.set(".view-all-btn", { y: 40, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".books-header", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to(".book-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      stagger: 0.3,
      ease: "power4.out(1.4)"
    }, "-=.5")
    .to(".view-all-btn", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="books-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Featured Books
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover our most loved books, carefully curated by our amazing
            community of donors and readers.
          </p>
        </div>

        <div className="books-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      book.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
                <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {book.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {book.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">by {book.author}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {book.rating}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <User className="w-3 h-3" />
                    <span>by {book.donor}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      book.status === "Available"
                        ? "bg-green-100 hover:bg-green-200 text-green-800"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {book.status === "Available" ? "Request" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-btn text-center mt-12">
          <button className="bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#303030] px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]">
            View All Books
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;