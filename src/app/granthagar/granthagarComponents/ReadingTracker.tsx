import React from "react";
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  Calendar,
  Star,
  TrendingUp,
} from "lucide-react";

const ReadingTracker: React.FC = () => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Reading Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.booksRead}
                  </div>
                  <div className="text-sm text-gray-600">Books Read</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.pagesRead.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Pages Read</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {userStats.readingHours}
                  </div>
                  <div className="text-sm text-gray-600">Hours Read</div>
                </div>
              </div>
            </div>

            {/* Goals Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(1 / userStats.monthlyGoal) * 100}%` }}
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
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (userStats.booksRead / userStats.yearlyGoal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    You&asop;re doing great!
                  </span>
                </div>
                <p className="text-blue-800 text-sm">
                  You&asop;re 50% ahead of your yearly reading goal. Keep up the
                  excellent work!
                </p>
              </div>
            </div>

            {/* Monthly Progress Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(month.books / 4) * 100}%` }}
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Recently Completed
              </h2>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Log New Book
                </button>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-3 px-4 rounded-lg font-semibold transition-colors">
                  Set New Goal
                </button>
                <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 px-4 rounded-lg font-semibold transition-colors">
                  Share Progress
                </button>
              </div>
            </div>

            {/* Reading Streak */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <Flame className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
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
