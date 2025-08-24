"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  useGSAP(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          // Animate seconds countdown
          gsap.to("[data-seconds]", {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
          });
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

  useGSAP(() => {
    // Header animations
    const headerTl = gsap.timeline();
    headerTl
      .from("[data-header-title]", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      })
      .from("[data-header-desc]", {
        opacity: 0,
        y: 30,
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
      scale: 0.9,
      y: 60,
      duration: 1,
      ease: "power3.out",
    });

    // Quiz content staggered animation
    gsap.from("[data-quiz-content] > *", {
      scrollTrigger: {
        trigger: quizSpotlightRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
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
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from("[data-winner-card]", {
      scrollTrigger: {
        trigger: pastWinnersRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Upcoming events animation
    gsap.from("[data-events-section]", {
      scrollTrigger: {
        trigger: upcomingEventsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from("[data-event-card]", {
      scrollTrigger: {
        trigger: upcomingEventsRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Interactive hover animations
    const eventCards = document.querySelectorAll<HTMLElement>("[data-event-card]");
    eventCards.forEach((cardElement: HTMLElement) => {
      cardElement.addEventListener("mouseenter", () => {
        gsap.to(cardElement, {
          y: -8,
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      
      cardElement.addEventListener("mouseleave", () => {
        gsap.to(cardElement, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Button hover animations
    const buttons = document.querySelectorAll<HTMLElement>("[data-animated-btn]");
    buttons.forEach((btnElement: HTMLElement) => {
      btnElement.addEventListener("mouseenter", () => {
        gsap.to(btnElement, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      });
      
      btnElement.addEventListener("mouseleave", () => {
        gsap.to(btnElement, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });
      });
    });

    // Winner medal animations
    const medals = document.querySelectorAll<HTMLElement>("[data-medal]");
    medals.forEach((medalElement: HTMLElement) => {
      medalElement.addEventListener("mouseenter", () => {
        gsap.to(medalElement, {
          rotation: 360,
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });
      });
      
      medalElement.addEventListener("mouseleave", () => {
        gsap.to(medalElement, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });

    // Progress bar animations
    gsap.fromTo("[data-progress-bar]", 
      { width: "0%" },
      {
        scrollTrigger: {
          trigger: "[data-progress-bar]",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        width: (index, target) => target.dataset.width,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 data-header-title className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Events & Quizzes
          </h1>
          <p data-header-desc className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join our community events, test your knowledge in monthly quizzes,
            and win amazing prizes while connecting with fellow book lovers.
          </p>
        </div>

        {/* Current Quiz Spotlight */}
        <div ref={quizSpotlightRef} data-quiz-spotlight className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-12 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10" data-quiz-content>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  {currentQuiz.title}
                </h2>
              </div>
              <p className="text-blue-100 text-lg">
                Test your knowledge and win incredible prizes!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quiz Details */}
              <div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-yellow-400" />
                    <span>Quiz Details</span>
                  </h3>
                  <div className="space-y-3 text-blue-100">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{currentQuiz.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{currentQuiz.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{currentQuiz.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {currentQuiz.participants} / {currentQuiz.maxParticipants}{" "}
                        registered
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-blue-200 mb-1">
                      <span>Registration Progress</span>
                      <span>
                        {Math.round(
                          (currentQuiz.participants /
                            currentQuiz.maxParticipants) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        data-progress-bar
                        data-width={`${(currentQuiz.participants / currentQuiz.maxParticipants) * 100}%`}
                        className="bg-yellow-400 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Quiz Topics */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-green-400" />
                    <span>Quiz Topics</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuiz.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="bg-white/30 backdrop-blur-sm rounded-lg p-3 text-sm border border-white/10"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Countdown & Prizes */}
              <div>
                {/* Countdown Timer */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6 text-center border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span>Quiz Starts In</span>
                  </h3>

                  <div className="grid grid-cols-4 gap-3">
                    <div data-countdown-item className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="text-2xl font-bold text-yellow-400">
                        {timeLeft.days}
                      </div>
                      <div className="text-xs text-blue-200">Days</div>
                    </div>
                    <div data-countdown-item className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="text-2xl font-bold text-yellow-400">
                        {timeLeft.hours}
                      </div>
                      <div className="text-xs text-blue-200">Hours</div>
                    </div>
                    <div data-countdown-item className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div className="text-2xl font-bold text-yellow-400">
                        {timeLeft.minutes}
                      </div>
                      <div className="text-xs text-blue-200">Minutes</div>
                    </div>
                    <div data-countdown-item className="bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                      <div data-seconds className="text-2xl font-bold text-yellow-400">
                        {timeLeft.seconds}
                      </div>
                      <div className="text-xs text-blue-200">Seconds</div>
                    </div>
                  </div>
                </div>

                {/* Prizes */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-yellow-400" />
                    <span>Amazing Prizes</span>
                  </h3>
                  <div className="space-y-3">
                    {currentQuiz.prizes.map((prize, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                      >
                        <div>
                          <span className="font-semibold">{prize.position}</span>
                          <div className="text-sm text-blue-200">
                            {prize.reward}
                          </div>
                        </div>
                        <div className="text-yellow-400 font-bold">
                          {prize.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button data-animated-btn className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl mr-4">
                Register Now
              </button>
              <button data-animated-btn className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg">
                View Rules
              </button>
            </div>
          </div>
        </div>

        {/* Past Winners */}
        <div ref={pastWinnersRef} data-winners-section className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Recent Quiz Winners</span>
          </h2>

          <div className="space-y-8">
            {pastWinners.map((contest, index) => (
              <div
                key={index}
                className="border-b border-slate-200 pb-8 last:border-b-0"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {contest.quiz}
                  </h3>
                  <p className="text-slate-600">{contest.month}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contest.winners.map((winner, winnerIndex) => (
                    <div
                      key={winnerIndex}
                      data-winner-card
                      className={`text-center p-6 rounded-2xl border-2 ${
                        winnerIndex === 0
                          ? "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
                          : winnerIndex === 1
                          ? "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200"
                          : "bg-gradient-to-br from-orange-50 to-red-50 border-orange-200"
                      }`}
                    >
                      <div
                        data-medal
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold cursor-pointer ${
                          winnerIndex === 0
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                            : winnerIndex === 1
                            ? "bg-gradient-to-br from-gray-400 to-gray-600"
                            : "bg-gradient-to-br from-orange-400 to-orange-600"
                        }`}
                      >
                        {winnerIndex + 1}
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {winner.name}
                      </h4>
                      <p className="text-sm text-slate-600 mb-2">
                        {winner.university}
                      </p>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          winnerIndex === 0
                            ? "bg-yellow-200 text-yellow-800"
                            : winnerIndex === 1
                            ? "bg-gray-200 text-gray-800"
                            : "bg-orange-200 text-orange-800"
                        }`}
                      >
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
        <div ref={upcomingEventsRef} data-events-section className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                data-event-card
                className="bg-white/90 backdrop-blur-lg border border-slate-200 rounded-2xl p-6 shadow-lg cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      event.type === "Book Club"
                        ? "bg-blue-100 text-blue-800"
                        : event.type === "Workshop"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {event.type}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.participants} / {event.maxParticipants} registered
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Registration</span>
                    <span>
                      {Math.round(
                        (event.participants / event.maxParticipants) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      data-progress-bar
                      data-width={`${(event.participants / event.maxParticipants) * 100}%`}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    ></div>
                  </div>
                </div>

                <button data-animated-btn className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg">
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