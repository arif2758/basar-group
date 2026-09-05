"use client";

import React, { useRef } from "react";
import { Trophy, BookOpen, Star, Flame } from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const TopReaders: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const topReaders = [
    {
      id: 1,
      name: "Aisha Rahman",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      booksRead: 18,
      streak: 23,
      level: "Master Reader",
      badges: ["Speed Reader", "Diverse Explorer", "Night Owl"],
      favoriteGenre: "Science Fiction",
    },
    {
      id: 2,
      name: "Mahmud Hassan",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      booksRead: 15,
      streak: 19,
      level: "Avid Reader",
      badges: ["Consistent Reader", "Philosophy Lover"],
      favoriteGenre: "Philosophy",
    },
    {
      id: 3,
      name: "Fatima Khan",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      booksRead: 12,
      streak: 15,
      level: "Book Enthusiast",
      badges: ["History Buff", "Weekend Warrior"],
      favoriteGenre: "History",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".readers-header", { y: 50, opacity: 0 });
    gsap.set(".reader-card", { y: 80, opacity: 0, scale: 0.9 });
    gsap.set(".reader-photo", { scale: 0, opacity: 0 });
    gsap.set(".reader-stats", { y: 20, opacity: 0 });
    gsap.set(".reader-badges", { y: 15, opacity: 0 });
    gsap.set(".reader-button", { y: 10, opacity: 0 });
    gsap.set(".challenge-cta", { y: 60, opacity: 0, scale: 0.95 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".readers-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".reader-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".reader-photo", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(".reader-stats", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "sine.out"
    }, "-=0.4")
    .to(".reader-badges", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "sine.out"
    }, "-=0.3")
    .to(".reader-button", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.2")
    .to(".challenge-cta", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)"
    }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="readers-header text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-amber-500" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Top Readers This Month
            </h2>
          </div>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Celebrating our most dedicated readers who inspire the entire
            community with their love for learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {topReaders.map((reader, index) => (
            <div
              key={reader.id}
              className={`reader-card relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 ${
                index === 0 ? "lg:scale-110" : ""
              }`}
            >
              {/* Rank Badge */}
              <div
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                    ? "bg-gray-400"
                    : "bg-orange-500"
                }`}
              >
                {index + 1}
              </div>

              {/* Header */}
              <div
                className={`bg-gradient-to-r p-6 text-white ${
                  index === 0
                    ? "from-yellow-400 to-orange-500"
                    : index === 1
                    ? "from-gray-400 to-gray-600"
                    : "from-orange-400 to-red-500"
                }`}
              >
                <div className="text-center">
                  <Image
                    src={reader.photo}
                    alt={reader.name}
                    width={80}
                    height={80}
                    className="reader-photo w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white"
                  />

                  <h3 className="text-xl font-bold">{reader.name}</h3>
                  <p className="text-sm opacity-90">{reader.level}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="p-6">
                <div className="reader-stats grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Books Read
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {reader.booksRead}
                    </div>
                  </div>

                  <div className="text-center bg-red-50 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Flame className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Day Streak
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {reader.streak}
                    </div>
                  </div>
                </div>

                {/* Favorite Genre */}
                <div className="reader-badges mb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Favorite Genre
                    </span>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {reader.favoriteGenre}
                  </span>
                </div>

                {/* Badges */}
                <div className="reader-badges">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Achievements
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {reader.badges.map((badge, badgeIndex) => (
                      <span
                        key={badgeIndex}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="reader-button w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="challenge-cta text-center mt-12">
          <div className="bg-white dark:bg-[#141414] text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 tracking-tight">
              Join the Leaderboard!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              Start your reading journey today and compete with fellow book
              lovers. Track your progress, earn badges, and climb the monthly
              rankings.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm active:scale-[0.98]">
              Start Reading Challenge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopReaders;