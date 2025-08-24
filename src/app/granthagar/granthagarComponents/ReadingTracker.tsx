"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  Calendar,
  Star,
  TrendingUp,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ReadingTracker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const goalsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const booksRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Stats Cards Animation with Counter Effect
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      statCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation for numbers
        const numberElement = card.querySelector(".stat-number") as HTMLElement;
        if (numberElement) {
          const finalValue = parseInt(
            numberElement.textContent?.replace(/,/g, "") || "0"
          );
          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: finalValue,
            duration: 2,
            delay: index * 0.1 + 0.5,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(counterObj.value);
              numberElement.textContent = currentValue.toLocaleString();
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Goals Section Animation
      gsap.fromTo(
        goalsRef.current,
        {
          opacity: 0,
          x: -100,
          rotationX: 10,
        },
        {
          opacity: 1,
          x: 0,
          rotationX: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: goalsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Progress bars animation
      const progressBars = goalsRef.current?.querySelectorAll(
        ".progress-bar"
      ) as NodeListOf<HTMLElement>;
      progressBars?.forEach((bar, index) => {
        const targetWidth = bar.getAttribute("data-width") || "0%";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: targetWidth,
            duration: 1.5,
            delay: index * 0.3 + 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: goalsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Chart Animation
      const chartBars = chartRef.current?.querySelectorAll(
        ".chart-bar"
      ) as NodeListOf<HTMLElement>;
      chartBars?.forEach((bar, index) => {
        const targetHeight = bar.getAttribute("data-height") || "0%";
        gsap.fromTo(
          bar,
          {
            height: "0%",
            opacity: 0,
          },
          {
            height: targetHeight,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "bounce.out",
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Recent Books Animation
      const bookItems = booksRef.current?.querySelectorAll(".book-item");
      bookItems?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: 100,
            rotationY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: booksRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Achievements Animation
      const badges = achievementsRef.current?.querySelectorAll(".badge-item");
      badges?.forEach((badge, index) => {
        gsap.fromTo(
          badge,
          {
            opacity: 0,
            scale: 0.5,
            rotation: 10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Quick Actions Animation
      const actionButtons =
        actionsRef.current?.querySelectorAll(".action-button");
      actionButtons?.forEach((button, index) => {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: actionsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Streak Card Animation
      gsap.fromTo(
        streakRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationZ: 5,
        },
        {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: streakRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Flame icon pulsing animation
      const flameIcon = streakRef.current?.querySelector(".flame-icon");
      if (flameIcon) {
        gsap.to(flameIcon, {
          scale: 1.1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }

      // Hover animations for interactive elements
      const statCards2 = statsRef.current?.querySelectorAll(".stat-card");
      statCards2?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Book items hover effect
      const bookItems2 = booksRef.current?.querySelectorAll(".book-item");
      bookItems2?.forEach((item) => {
        const itemElement = item as HTMLElement;
        itemElement.addEventListener("mouseenter", () => {
          gsap.to(itemElement, {
            x: 10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        itemElement.addEventListener("mouseleave", () => {
          gsap.to(itemElement, {
            x: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Action buttons hover effect
      const actionButtons2 =
        actionsRef.current?.querySelectorAll(".action-button");
      actionButtons2?.forEach((button) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            y: -3,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

      // Badge hover effect
      const badges2 = achievementsRef.current?.querySelectorAll(".badge-item");
      badges2?.forEach((badge) => {
        const badgeElement = badge as HTMLElement;
        badgeElement.addEventListener("mouseenter", () => {
          gsap.to(badgeElement, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        badgeElement.addEventListener("mouseleave", () => {
          gsap.to(badgeElement, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const userStats = {
    booksRead: 12,
    pagesRead: 2840,
    readingHours: 56,
    currentStreak: 15,
    longestStreak: 28,
    monthlyGoal: 3,
    yearlyGoal: 24,
    averageRating: 4.2,
  };

  const badges = [
    {
      name: "First Book",
      icon: "🎉",
      earned: true,
      description: "Read your first book",
    },
    {
      name: "Speed Reader",
      icon: "⚡",
      earned: true,
      description: "Read 5 books in a month",
    },
    {
      name: "Night Owl",
      icon: "🌙",
      earned: true,
      description: "Read after midnight",
    },
    {
      name: "Genre Explorer",
      icon: "🗺️",
      earned: false,
      description: "Read books from 5 different genres",
    },
    {
      name: "Marathon Reader",
      icon: "🏃",
      earned: false,
      description: "Read for 5+ hours in a day",
    },
    {
      name: "Consistent Reader",
      icon: "📚",
      earned: true,
      description: "Read 30 days in a row",
    },
  ];

  const recentBooks = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      completedDate: "2024-01-28",
      rating: 5,
      pages: 320,
      timeSpent: "8 hours",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      completedDate: "2024-01-15",
      rating: 4,
      pages: 163,
      timeSpent: "4 hours",
    },
    {
      title: "1984",
      author: "George Orwell",
      completedDate: "2024-01-02",
      rating: 5,
      pages: 328,
      timeSpent: "10 hours",
    },
  ];

  const monthlyProgress = [
    { month: "Aug", books: 2 },
    { month: "Sep", books: 3 },
    { month: "Oct", books: 4 },
    { month: "Nov", books: 2 },
    { month: "Dec", books: 1 },
    { month: "Jan", books: 3 },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            My Reading Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Track your progress, celebrate achievements, and stay motivated on
            your reading adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div ref={statsRef} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Reading Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="stat-card text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-gray-900">
                    {userStats.booksRead}
                  </div>
                  <div className="text-sm text-gray-600">Books Read</div>
                </div>

                <div className="stat-card text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-gray-900">
                    {userStats.pagesRead.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Pages Read</div>
                </div>

                <div className="stat-card text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-gray-900">
                    {userStats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>

                <div className="stat-card text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-gray-900">
                    {userStats.readingHours}
                  </div>
                  <div className="text-sm text-gray-600">Hours Read</div>
                </div>
              </div>
            </div>

            {/* Goals Progress */}
            <div ref={goalsRef} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Reading Goals
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Monthly Goal
                    </span>
                    <span className="text-sm text-gray-600">
                      1 of {userStats.monthlyGoal} books
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="progress-bar bg-blue-600 h-2 rounded-full"
                      data-width={`${(1 / userStats.monthlyGoal) * 100}%`}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Yearly Goal
                    </span>
                    <span className="text-sm text-gray-600">
                      {userStats.booksRead} of {userStats.yearlyGoal} books
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="progress-bar bg-green-600 h-2 rounded-full"
                      data-width={`${
                        (userStats.booksRead / userStats.yearlyGoal) * 100
                      }%`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    You&apos;re doing great!
                  </span>
                </div>
                <p className="text-blue-800 text-sm">
                  You&apos;re 50% ahead of your yearly reading goal. Keep up the
                  excellent work!
                </p>
              </div>
            </div>

            {/* Monthly Progress Chart */}
            <div ref={chartRef} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Monthly Progress
              </h2>
              <div className="flex items-end space-x-4 h-40">
                {monthlyProgress.map((month, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="chart-bar w-full bg-blue-500 rounded-t"
                      data-height={`${(month.books / 4) * 100}%`}
                    ></div>
                    <div className="text-xs font-medium text-gray-600 mt-2">
                      {month.month}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {month.books}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Books */}
            <div ref={booksRef} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recently Completed
              </h2>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div
                    key={index}
                    className="book-item flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 text-sm">by {book.author}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>{book.pages} pages</span>
                        <span>{book.timeSpent}</span>
                        <span>Completed {book.completedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-4 h-4 ${
                            starIndex < book.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div
              ref={achievementsRef}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  Achievements
                </h2>
              </div>

              <div className="space-y-3">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`badge-item flex items-center space-x-3 p-3 rounded-lg ${
                      badge.earned
                        ? "bg-yellow-50 border border-yellow-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-2xl ${
                        badge.earned ? "" : "grayscale opacity-50"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${
                          badge.earned ? "text-yellow-800" : "text-gray-500"
                        }`}
                      >
                        {badge.name}
                      </h3>
                      <p
                        className={`text-xs ${
                          badge.earned ? "text-yellow-600" : "text-gray-400"
                        }`}
                      >
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              ref={actionsRef}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="action-button w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold">
                  Log New Book
                </button>
                <button className="action-button w-full bg-green-100 text-green-800 py-3 px-4 rounded-lg font-semibold">
                  Set New Goal
                </button>
                <button className="action-button w-full bg-orange-100 text-orange-800 py-3 px-4 rounded-lg font-semibold">
                  Share Progress
                </button>
              </div>
            </div>

            {/* Reading Streak */}
            <div
              ref={streakRef}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="text-center">
                <Flame className="flame-icon w-12 h-12 mx-auto mb-3 text-yellow-300" />
                <h2 className="text-2xl font-bold mb-2">Reading Streak</h2>
                <div className="text-4xl font-bold mb-1">
                  {userStats.currentStreak}
                </div>
                <div className="text-orange-100 mb-4">Days in a row</div>
                <div className="text-sm text-orange-100">
                  Personal best: {userStats.longestStreak} days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTracker;
