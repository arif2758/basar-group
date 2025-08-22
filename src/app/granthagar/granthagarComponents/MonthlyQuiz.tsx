"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Trophy, Gift, Users } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MonthlyQuiz: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const previousWinners = [
    { name: "Sara Ahmed", prize: "Kindle E-reader", month: "November" },
    { name: "Karim Hassan", prize: "Book Voucher (৳500)", month: "October" },
    { name: "Nadia Khan", prize: "Premium Membership", month: "September" },
  ];

  useGSAP(() => {
    // Set initial states
    gsap.set(".quiz-header", { y: 50, opacity: 0 });
    gsap.set(".quiz-info", { x: -60, opacity: 0 });
    gsap.set(".prize-item", { x: -30, opacity: 0 });
    gsap.set(".winner-item", { x: -20, opacity: 0 });
    gsap.set(".countdown-section", { x: 60, opacity: 0 });
    gsap.set(".countdown-timer", { scale: 0.8, opacity: 0 });
    gsap.set(".quiz-topics", { y: 30, opacity: 0 });
    gsap.set(".topic-item", { scale: 0.8, opacity: 0 });
    gsap.set(".register-button", { y: 20, opacity: 0, scale: 0.9 });
    gsap.set(".quiz-note", { y: 15, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".quiz-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".quiz-info", {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.4")
    .to(".countdown-section", {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.6")
    .to(".prize-item", {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".countdown-timer", {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(".winner-item", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.08,
      ease: "sine.out"
    }, "-=0.4")
    .to(".quiz-topics", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(".topic-item", {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.3")
    .to(".register-button", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .to(".quiz-note", {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "sine.out"
    }, "-=0.1");

    // Floating animation for countdown timer
    gsap.to(".countdown-timer", {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 teal-slate-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quiz-header text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold">
              December Reading Quiz
            </h2>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Test your knowledge from this month&apos;s featured books and win
            amazing prizes!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Quiz Info */}
          <div className="quiz-info space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Gift className="w-6 h-6 text-yellow-400" />
                <span>This Month&apos;s Prizes</span>
              </h3>

              <div className="space-y-4">
                <div className="prize-item flex items-center justify-between bg-white/20 rounded-lg p-4">
                  <span className="font-medium">🏆 1st Place</span>
                  <span className="text-yellow-400 font-bold">
                    iPad Mini + Book Collection
                  </span>
                </div>
                <div className="prize-item flex items-center justify-between bg-white/20 rounded-lg p-4">
                  <span className="font-medium">🥈 2nd Place</span>
                  <span className="text-gray-200 font-bold">
                    Book Voucher (৳1000)
                  </span>
                </div>
                <div className="prize-item flex items-center justify-between bg-white/20 rounded-lg p-4">
                  <span className="font-medium">🥉 3rd Place</span>
                  <span className="text-orange-300 font-bold">
                    3 Months Premium
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Previous Winners</span>
              </h4>
              <div className="space-y-3">
                {previousWinners.map((winner, index) => (
                  <div
                    key={index}
                    className="winner-item flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium">{winner.name}</span>
                      <span className="text-blue-200 text-sm ml-2">
                        ({winner.month})
                      </span>
                    </div>
                    <span className="text-yellow-400 text-sm">
                      {winner.prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="countdown-section text-center">
            <div className="countdown-timer bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-2 flex items-center justify-center space-x-2">
                <Clock className="w-6 h-6 text-yellow-400" />
                <span>Quiz Starts In</span>
              </h3>

              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">
                    {timeLeft.days}
                  </div>
                  <div className="text-sm text-blue-200">Days</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">
                    {timeLeft.hours}
                  </div>
                  <div className="text-sm text-blue-200">Hours</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-sm text-blue-200">Minutes</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-400">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-sm text-blue-200">Seconds</div>
                </div>
              </div>
            </div>

            <div className="quiz-topics bg-white rounded-xl p-6 text-gray-900 mb-6">
              <h4 className="text-xl font-bold mb-3">Quiz Topics</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="topic-item bg-blue-50 rounded-lg p-3">
                  <span className="font-medium">The Alchemist</span>
                </div>
                <div className="topic-item bg-green-50 rounded-lg p-3">
                  <span className="font-medium">Sapiens</span>
                </div>
                <div className="topic-item bg-purple-50 rounded-lg p-3">
                  <span className="font-medium">Atomic Habits</span>
                </div>
                <div className="topic-item bg-orange-50 rounded-lg p-3">
                  <span className="font-medium">1984</span>
                </div>
              </div>
            </div>

            <button className="register-button bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
              Register for Quiz
            </button>

            <p className="quiz-note text-blue-200 text-sm mt-4">
              📚 Read the featured books to participate • 👥 Open to all members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonthlyQuiz;