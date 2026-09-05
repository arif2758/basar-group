"use client";

import React, { useState, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Calendar,
  Trophy,
  Clock,
  Users,
  Gift,
  Star,
  MapPin,
  BookOpen,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Events: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 23,
    seconds: 45,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const quizSpotlightRef = useRef<HTMLDivElement>(null);
  const pastWinnersRef = useRef<HTMLDivElement>(null);
  const upcomingEventsRef = useRef<HTMLDivElement>(null);

  // Timer effect using GSAP
  useScrollAnimation();
  useGSAP(() => {
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

  const currentQuiz = {
    title: "December Reading Challenge Quiz",
    date: "December 28, 2024",
    time: "7:00 PM - 8:30 PM",
    location: "Online via Zoom",
    participants: 145,
    maxParticipants: 200,
    prizes: [
      {
        position: "1st Place",
        reward: "iPad Mini + Book Collection",
        value: "৳45,000",
      },
      { position: "2nd Place", reward: "Book Voucher", value: "৳1,000" },
      {
        position: "3rd Place",
        reward: "3 Months Premium Membership",
        value: "৳600",
      },
    ],
    topics: [
      "The Alchemist by Paulo Coelho",
      "Sapiens by Yuval Noah Harari",
      "Atomic Habits by James Clear",
      "1984 by George Orwell",
    ],
    registrationDeadline: "December 25, 2024",
  };

  const pastWinners = [
    {
      month: "November 2024",
      quiz: "Philosophy & Self-Development Quiz",
      winners: [
        {
          name: "Sara Ahmed",
          position: "1st",
          prize: "Kindle E-reader",
          university: "University of Dhaka",
        },
        {
          name: "Karim Hassan",
          position: "2nd",
          prize: "Book Voucher (৳500)",
          university: "BUET",
        },
        {
          name: "Nadia Khan",
          position: "3rd",
          prize: "Premium Membership",
          university: "NSU",
        },
      ],
    },
    {
      month: "October 2024",
      quiz: "Science & Technology Quiz",
      winners: [
        {
          name: "Ahmed Rahman",
          position: "1st",
          prize: "iPad",
          university: "IUT",
        },
        {
          name: "Fatima Ali",
          position: "2nd",
          prize: "Book Voucher (৳500)",
          university: "AIUB",
        },
        {
          name: "Mahmud Hasan",
          position: "3rd",
          prize: "Premium Membership",
          university: "EWU",
        },
      ],
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Book Club: Discussing 'The Alchemist'",
      date: "January 15, 2025",
      time: "6:00 PM - 7:30 PM",
      location: "Community Center, Dhanmondi",
      type: "Book Club",
      participants: 25,
      maxParticipants: 30,
      description:
        "Join fellow readers for an in-depth discussion about Paulo Coelho's masterpiece.",
    },
    {
      id: 2,
      title: "Speed Reading Workshop",
      date: "January 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      type: "Workshop",
      participants: 67,
      maxParticipants: 100,
      description:
        "Learn techniques to double your reading speed while maintaining comprehension.",
    },
    {
      id: 3,
      title: "Author Meet & Greet: Local Writers",
      date: "February 5, 2025",
      time: "4:00 PM - 6:00 PM",
      location: "Bishwo Sahitya Kendra",
      type: "Meet & Greet",
      participants: 42,
      maxParticipants: 80,
      description:
        "Meet renowned Bangladeshi authors and learn about their writing journey.",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Header animations
    const headerTl = gsap.timeline();
    headerTl
      .from("[data-header-title]", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
      })
      .from("[data-header-desc]", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

    // Quiz spotlight animation
    gsap.from("[data-quiz-spotlight]", {
      scrollTrigger: {
        trigger: quizSpotlightRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.98,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });

    // Countdown timer animation
    gsap.from("[data-countdown-item]", {
      scrollTrigger: {
        trigger: quizSpotlightRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Past winners animation
    gsap.from("[data-winners-section]", {
      scrollTrigger: {
        trigger: pastWinnersRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });

    // Upcoming events animation
    gsap.from("[data-events-section]", {
      scrollTrigger: {
        trigger: upcomingEventsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 data-header-title className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Events & Quizzes
          </h1>
          <p data-header-desc className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Join our community events, test your knowledge in monthly quizzes,
            and win amazing prizes while connecting with fellow book lovers.
          </p>
        </div>

        {/* Current Quiz Spotlight */}
        <div ref={quizSpotlightRef} data-quiz-spotlight className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl shadow-sm p-6 sm:p-10 mb-12 text-white">
          <div data-quiz-content>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-amber-500/10 rounded-xl mb-3 text-amber-400">
                <Trophy className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {currentQuiz.title}
              </h2>
              <p className="text-slate-300 dark:text-slate-400 text-sm sm:text-base">
                Test your knowledge and win incredible prizes!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quiz Details */}
              <div className="space-y-6">
                <div className="bg-slate-800/80 dark:bg-[#1a1a1a] rounded-xl p-5 sm:p-6 border border-slate-700/60 dark:border-[#303030]">
                  <h3 className="text-base font-semibold mb-4 flex items-center space-x-2 text-white">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Quiz Details</span>
                  </h3>
                  <div className="space-y-2.5 text-slate-300 text-sm">
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{currentQuiz.date}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{currentQuiz.time}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{currentQuiz.location}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>
                        {currentQuiz.participants} / {currentQuiz.maxParticipants}{" "}
                        registered
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-700/60 dark:border-[#303030]">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Registration Progress</span>
                      <span>
                        {Math.round(
                          (currentQuiz.participants / currentQuiz.maxParticipants) * 100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/60 dark:bg-[#262626] rounded-full h-2">
                      <div
                        style={{
                          width: `${(currentQuiz.participants / currentQuiz.maxParticipants) * 100}%`,
                        }}
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Quiz Topics */}
                <div className="bg-slate-800/80 dark:bg-[#1a1a1a] rounded-xl p-5 sm:p-6 border border-slate-700/60 dark:border-[#303030]">
                  <h4 className="text-base font-semibold mb-3 flex items-center space-x-2 text-white">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Quiz Topics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentQuiz.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-slate-700/40 dark:bg-[#141414] rounded-lg p-2.5 text-xs text-slate-300 border border-slate-600/40 dark:border-[#303030]"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Countdown & Prizes */}
              <div className="space-y-6">
                {/* Countdown Timer */}
                <div className="bg-slate-800/80 dark:bg-[#1a1a1a] rounded-xl p-5 sm:p-6 text-center border border-slate-700/60 dark:border-[#303030]">
                  <h3 className="text-sm font-semibold mb-4 flex items-center justify-center space-x-2 text-white">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Quiz Starts In</span>
                  </h3>

                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                    <div data-countdown-item className="bg-slate-700/40 dark:bg-[#141414] rounded-lg p-2.5 sm:p-3 border border-slate-600/40 dark:border-[#303030]">
                      <div className="text-xl sm:text-2xl font-bold text-amber-400">
                        {timeLeft.days}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Days</div>
                    </div>
                    <div data-countdown-item className="bg-slate-700/40 dark:bg-[#141414] rounded-lg p-2.5 sm:p-3 border border-slate-600/40 dark:border-[#303030]">
                      <div className="text-xl sm:text-2xl font-bold text-amber-400">
                        {timeLeft.hours}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Hours</div>
                    </div>
                    <div data-countdown-item className="bg-slate-700/40 dark:bg-[#141414] rounded-lg p-2.5 sm:p-3 border border-slate-600/40 dark:border-[#303030]">
                      <div className="text-xl sm:text-2xl font-bold text-amber-400">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Mins</div>
                    </div>
                    <div data-countdown-item className="bg-slate-700/40 dark:bg-[#141414] rounded-lg p-2.5 sm:p-3 border border-slate-600/40 dark:border-[#303030]">
                      <div className="text-xl sm:text-2xl font-bold text-amber-400">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">Secs</div>
                    </div>
                  </div>
                </div>

                {/* Prizes */}
                <div className="bg-slate-800/80 dark:bg-[#1a1a1a] rounded-xl p-5 sm:p-6 border border-slate-700/60 dark:border-[#303030]">
                  <h3 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-white">
                    <Gift className="w-4 h-4 text-amber-400" />
                    <span>Prizes</span>
                  </h3>
                  <div className="space-y-2">
                    {currentQuiz.prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-slate-700/40 dark:bg-[#141414] rounded-lg p-3 border border-slate-600/40 dark:border-[#303030]"
                      >
                        <div>
                          <span className="font-semibold text-xs text-slate-200">{prize.position}</span>
                          <div className="text-xs text-slate-400">
                            {prize.reward}
                          </div>
                        </div>
                        <div className="text-amber-400 font-bold text-xs">
                          {prize.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]">
                Register Now
              </button>
              <button className="border border-slate-600 dark:border-[#303030] bg-transparent hover:bg-slate-800 text-slate-300 px-7 py-3 rounded-xl font-medium text-sm transition-colors">
                View Rules
              </button>
            </div>
          </div>
        </div>

        {/* Past Winners */}
        <div ref={pastWinnersRef} data-winners-section className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span>Recent Quiz Winners</span>
          </h2>

          <div className="space-y-8">
            {pastWinners.map((contest, index) => (
              <div
                key={index}
                className="border-b border-slate-100 dark:border-[#262626] pb-8 last:border-b-0"
              >
                <div className="text-center mb-6">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                    {contest.quiz}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{contest.month}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contest.winners.map((winner, winnerIndex) => (
                    <div
                      key={winnerIndex}
                      className="text-center p-5 rounded-xl border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#1a1a1a]"
                    >
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-xs bg-emerald-600">
                        {winnerIndex + 1}
                      </div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-0.5 text-sm">
                        {winner.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {winner.university}
                      </p>
                      <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
                        {winner.prize}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div ref={upcomingEventsRef} data-events-section className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#303030] rounded-xl p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  <div className="mb-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {event.participants} / {event.maxParticipants} registered
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Registration</span>
                      <span>
                        {Math.round((event.participants / event.maxParticipants) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-[#262626] rounded-full h-1.5">
                      <div
                        style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                        className="bg-emerald-500 h-1.5 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-lg font-medium text-xs shadow-sm transition-colors active:scale-[0.99]">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;