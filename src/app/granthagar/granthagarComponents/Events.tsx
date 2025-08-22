"use client";

import React, { useState, useEffect } from "react";
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

const Events: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 23,
    seconds: 45,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Events & Quizzes
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join our community events, test your knowledge in monthly quizzes,
            and win amazing prizes while connecting with fellow book lovers.
          </p>
        </div>

        {/* Current Quiz Spotlight */}
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 mb-12 text-white">
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
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
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (currentQuiz.participants /
                            currentQuiz.maxParticipants) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quiz Topics */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  <span>Quiz Topics</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuiz.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-white/20 rounded-lg p-3 text-sm"
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
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 text-center">
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span>Quiz Starts In</span>
                </h3>

                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {timeLeft.days}
                    </div>
                    <div className="text-xs text-blue-200">Days</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {timeLeft.hours}
                    </div>
                    <div className="text-xs text-blue-200">Hours</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-xs text-blue-200">Minutes</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-xs text-blue-200">Seconds</div>
                  </div>
                </div>
              </div>

              {/* Prizes */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <span>Amazing Prizes</span>
                </h3>
                <div className="space-y-3">
                  {currentQuiz.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/20 rounded-lg p-3"
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
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg mr-4">
              Register Now
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              View Rules
            </button>
          </div>
        </div>

        {/* Past Winners */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Recent Quiz Winners</span>
          </h2>

          <div className="space-y-8">
            {pastWinners.map((contest, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-8 last:border-b-0"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {contest.quiz}
                  </h3>
                  <p className="text-gray-600">{contest.month}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contest.winners.map((winner, winnerIndex) => (
                    <div
                      key={winnerIndex}
                      className={`text-center p-6 rounded-xl ${
                        winnerIndex === 0
                          ? "bg-yellow-50 border-2 border-yellow-200"
                          : winnerIndex === 1
                          ? "bg-gray-50 border-2 border-gray-200"
                          : "bg-orange-50 border-2 border-orange-200"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold ${
                          winnerIndex === 0
                            ? "bg-yellow-500"
                            : winnerIndex === 1
                            ? "bg-gray-400"
                            : "bg-orange-500"
                        }`}
                      >
                        {winnerIndex + 1}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {winner.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
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
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
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

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500 mb-4">
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
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Registration</span>
                    <span>
                      {Math.round(
                        (event.participants / event.maxParticipants) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (event.participants / event.maxParticipants) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
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
