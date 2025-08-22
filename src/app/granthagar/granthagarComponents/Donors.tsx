"use client";

import React, { useState } from "react";
import { Search, Heart, BookOpen, Award, MapPin, Star } from "lucide-react";
import Image from "next/image";

const Donors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const topDonor = {
    name: "Dr. Rahman Chowdhury",
    photo:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    totalDonations: 45,
    location: "Dhanmondi",
    joinDate: "January 2023",
    recentBooks: [
      "The Intelligent Investor",
      "Thinking, Fast and Slow",
      "The Art of War",
      "Man's Search for Meaning",
      "Principles",
    ],
    badge: "Top Donor 2024",
  };

  const donors = [
    {
      id: 2,
      name: "Ahmed Rahman",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 18,
      location: "Gulshan",
      joinDate: "March 2023",
      recentBooks: ["The Alchemist", "Sapiens", "Atomic Habits"],
      badge: "Consistent Contributor",
    },
    {
      id: 3,
      name: "Fatima Khan",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 23,
      location: "Banani",
      joinDate: "February 2023",
      recentBooks: ["1984", "To Kill a Mockingbird", "Pride and Prejudice"],
      badge: "Literature Lover",
    },
    {
      id: 4,
      name: "Rafiq Uddin",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 15,
      location: "Uttara",
      joinDate: "April 2023",
      recentBooks: ["Rich Dad Poor Dad", "The Lean Startup", "Good to Great"],
      badge: "Business Books Expert",
    },
    {
      id: 5,
      name: "Nasreen Akter",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 12,
      location: "Mirpur",
      joinDate: "May 2023",
      recentBooks: ["The Power of Now", "Becoming", "Educated"],
      badge: "Self-Help Advocate",
    },
    {
      id: 6,
      name: "Karim Hassan",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 20,
      location: "Wari",
      joinDate: "January 2023",
      recentBooks: [
        "A Brief History of Time",
        "Cosmos",
        "The Elegant Universe",
      ],
      badge: "Science Enthusiast",
    },
    {
      id: 7,
      name: "Ayesha Siddique",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      totalDonations: 16,
      location: "Dhanmondi",
      joinDate: "June 2023",
      recentBooks: ["The Diary of a Young Girl", "Persepolis", "I Am Malala"],
      badge: "Biography Collector",
    },
  ];

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.recentBooks.some((book) =>
        book.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Our Amazing Donors
          </h1>
          <p className="text-gray-600 text-lg">
            Meet the generous people who make our community library possible
            through their book donations.
          </p>
        </div>

        {/* Top Donor Spotlight */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-xl mb-12 overflow-hidden">
          <div className="p-8 text-white">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-8 h-8 text-yellow-200" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Top Donor of the Month
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <Image
                  src={topDonor.photo}
                  alt={topDonor.name}
                  width={128}
                  height={128}
                  className="rounded-full mx-auto lg:mx-0 mb-4 border-4 border-white shadow-lg"
                />
                <h3 className="text-2xl font-bold mb-2">{topDonor.name}</h3>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-orange-100 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{topDonor.location}</span>
                </div>
                <div className="text-orange-100">
                  Member since {topDonor.joinDate}
                </div>
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold mt-3 inline-block">
                  {topDonor.badge}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                    <BookOpen className="w-12 h-12 text-yellow-200 mx-auto mb-3" />
                    <div className="text-4xl font-bold mb-2">
                      {topDonor.totalDonations}
                    </div>
                    <div className="text-orange-100">Books Donated</div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="font-semibold mb-3 text-yellow-200">
                      Recent Contributions
                    </h4>
                    <div className="space-y-1">
                      {topDonor.recentBooks.slice(0, 4).map((book, index) => (
                        <div key={index} className="text-sm text-orange-100">
                          • {book}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-orange-100 italic">
                    Knowledge grows when shared. I donate books to help students
                    discover new worlds and perspectives that can transform
                    their lives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search donors by name or donated books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Donors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={donor.photo}
                    alt={donor.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-3 border-2 border-blue-200"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {donor.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{donor.location}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {donor.badge}
                  </span>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Books Donated
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {donor.totalDonations}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Recent Donations:
                  </h4>
                  <div className="space-y-1">
                    {donor.recentBooks.map((book, index) => (
                      <div
                        key={index}
                        className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded truncate"
                      >
                        {book}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Joined {donor.joinDate}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>Active Donor</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  View All Donations
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Donor CTA */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-xl p-8 mt-16 text-white text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 text-green-200" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Amazing Community of Donors
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
            Have books sitting on your shelf collecting dust? Share them with
            students who will love and learn from them. Every donated book
            creates ripples of knowledge in our community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">500+</div>
              <div className="text-sm text-green-100">Books Needed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">Free</div>
              <div className="text-sm text-green-100">Pickup Service</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-200">∞</div>
              <div className="text-sm text-green-100">Impact Created</div>
            </div>
          </div>
          <button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
            Donate Your Books
          </button>
        </div>

        {filteredDonors.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No donors found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;
