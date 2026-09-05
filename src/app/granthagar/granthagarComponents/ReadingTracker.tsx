"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Stats Cards Animation
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      statCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
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
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            My Reading Journey
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Track your progress, celebrate achievements, and stay motivated on
            your reading adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <div ref={statsRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
                Reading Stats
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="stat-card text-center p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626]">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-emerald-600 dark:text-emerald-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {userStats.booksRead}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Books Read</div>
                </div>

                <div className="stat-card text-center p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626]">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-blue-600 dark:text-blue-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {userStats.pagesRead.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Pages Read</div>
                </div>

                <div className="stat-card text-center p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626]">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-amber-500">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {userStats.currentStreak}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Day Streak</div>
                </div>

                <div className="stat-card text-center p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626]">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-purple-600 dark:text-purple-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="stat-number text-2xl font-bold text-slate-900 dark:text-white mb-0.5">
                    {userStats.readingHours}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Hours Read</div>
                </div>
              </div>
            </div>

            {/* Goals Progress */}
            <div ref={goalsRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
                Reading Goals
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Monthly Goal
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      1 of {userStats.monthlyGoal} books
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-[#262626] rounded-full h-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${(1 / userStats.monthlyGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Yearly Goal
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {userStats.booksRead} of {userStats.yearlyGoal} books
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-[#262626] rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(userStats.booksRead / userStats.yearlyGoal) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg p-3.5 border border-slate-200 dark:border-[#262626] flex items-center space-x-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  You&apos;re 50% ahead of your yearly reading goal. Keep up the excellent work!
                </p>
              </div>
            </div>

            {/* Monthly Progress Chart */}
            <div ref={chartRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
                Monthly Progress
              </h2>
              <div className="flex items-end space-x-3 sm:space-x-4 h-36 pt-4 border-b border-slate-100 dark:border-[#262626]">
                {monthlyProgress.map((month, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center h-full justify-end"
                  >
                    <div
                      className="w-full max-w-[36px] bg-emerald-600/80 hover:bg-emerald-500 rounded-t transition-all"
                      style={{ height: `${(month.books / 4) * 100}%` }}
                    ></div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-2">
                      {month.month}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {month.books}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Books */}
            <div ref={booksRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
                Recently Completed
              </h2>
              <div className="space-y-3">
                {recentBooks.map((book, index) => (
                  <div
                    key={index}
                    className="book-item flex items-center space-x-3.5 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626]"
                  >
                    <div className="w-10 h-12 bg-emerald-600 rounded flex items-center justify-center flex-shrink-0 text-white">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm truncate">
                        {book.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">by {book.author}</p>
                      <div className="flex items-center space-x-3 mt-1 text-[11px] text-slate-400">
                        <span>{book.pages} pages</span>
                        <span>•</span>
                        <span>{book.timeSpent}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-3.5 h-3.5 ${
                            starIndex < book.rating
                              ? "text-amber-400 fill-current"
                              : "text-slate-300 dark:text-slate-600"
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
              className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Achievements
                </h2>
              </div>

              <div className="space-y-2.5">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`badge-item flex items-center space-x-3 p-2.5 rounded-lg border ${
                      badge.earned
                        ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/30"
                        : "bg-slate-50 dark:bg-[#1a1a1a] border-slate-200 dark:border-[#262626]"
                    }`}
                  >
                    <div
                      className={`text-xl ${
                        badge.earned ? "" : "grayscale opacity-40"
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-xs truncate ${
                          badge.earned ? "text-amber-900 dark:text-amber-300" : "text-slate-500"
                        }`}
                      >
                        {badge.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate">
                        {badge.description}
                      </p>
                    </div>
                    {badge.earned && (
                      <div className="w-4 h-4 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px]">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              ref={actionsRef}
              className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-2.5">
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-lg font-medium text-xs shadow-sm transition-colors active:scale-[0.99]">
                  Log New Book
                </button>
                <button className="w-full bg-slate-100 dark:bg-[#1f1f1f] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#303030] py-2.5 px-4 rounded-lg font-medium text-xs transition-colors">
                  Set New Goal
                </button>
                <button className="w-full bg-slate-100 dark:bg-[#1f1f1f] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-[#303030] py-2.5 px-4 rounded-lg font-medium text-xs transition-colors">
                  Share Progress
                </button>
              </div>
            </div>

            {/* Reading Streak */}
            <div
              ref={streakRef}
              className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-xl shadow-sm p-6 text-white text-center"
            >
              <Flame className="w-8 h-8 mx-auto mb-2 text-amber-400" />
              <h2 className="text-base font-semibold mb-1 text-white">Reading Streak</h2>
              <div className="text-3xl font-bold text-amber-400 mb-0.5">
                {userStats.currentStreak}
              </div>
              <div className="text-xs text-slate-400 mb-3">Days in a row</div>
              <div className="text-xs text-slate-400 pt-3 border-t border-slate-800 dark:border-[#262626]">
                Personal best: {userStats.longestStreak} days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingTracker;
