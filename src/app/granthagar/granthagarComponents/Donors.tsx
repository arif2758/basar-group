"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Heart, BookOpen, Award, MapPin, Star } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Donors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const topDonorRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const donorsGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

    // Top donor spotlight animation
    gsap.from("[data-top-donor]", {
      scrollTrigger: {
        trigger: topDonorRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from("[data-top-donor-content] > *", {
      scrollTrigger: {
        trigger: topDonorRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });

    // Search animation
    gsap.from("[data-search-box]", {
      scrollTrigger: {
        trigger: searchRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 30,
      scale: 0.98,
      duration: 0.7,
      ease: "back.out(1.7)",
    });

    // Donors grid animation
    gsap.from("[data-donor-card]", {
      scrollTrigger: {
        trigger: donorsGridRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    // CTA section animation
    gsap.from("[data-cta-content]", {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from("[data-cta-stats] > *", {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Interactive hover animations
    const donorCards = document.querySelectorAll<HTMLElement>("[data-donor-card]");
    donorCards.forEach((cardElement: HTMLElement) => {
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

    // Number counter animation for top donor
    gsap.fromTo("[data-counter]", 
      { textContent: 0 },
      {
        scrollTrigger: {
          trigger: topDonorRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        textContent: topDonor.totalDonations,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <h1 data-header-title className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Our Amazing Donors
          </h1>
          <p data-header-desc className="text-slate-600 text-lg">
            Meet the generous people who make our community library possible
            through their book donations.
          </p>
        </div>

        {/* Top Donor Spotlight */}
        <div ref={topDonorRef} data-top-donor className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl mb-12 overflow-hidden">
          <div data-top-donor-content className="p-8 text-white">
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
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
                    <BookOpen className="w-12 h-12 text-yellow-200 mx-auto mb-3" />
                    <div data-counter className="text-4xl font-bold mb-2">
                      {topDonor.totalDonations}
                    </div>
                    <div className="text-orange-100">Books Donated</div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h4 className="font-semibold mb-3 text-yellow-200">
                      Recent Contributions
                    </h4>
                    <div className="space-y-1">
                      {topDonor.recentBooks.slice(0, 4).map((book, index) => (
                        <div key={index} className="text-sm text-orange-100 truncate">
                          • {book}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
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
        <div ref={searchRef} data-search-box className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search donors by name or donated books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Donors Grid */}
        <div ref={donorsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              data-donor-card
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden cursor-pointer"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={donor.photo}
                    alt={donor.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto mb-3 border-2 border-blue-200 shadow-md"
                  />
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {donor.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1 text-slate-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{donor.location}</span>
                  </div>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {donor.badge}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4 text-center border border-blue-100">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-slate-700">
                      Books Donated
                    </span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {donor.totalDonations}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2 text-sm">
                    Recent Donations:
                  </h4>
                  <div className="space-y-1">
                    {donor.recentBooks.map((book, index) => (
                      <div
                        key={index}
                        className="text-xs text-slate-600 bg-slate-50 px-3 py-2 rounded-lg truncate border border-slate-100"
                      >
                        {book}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>Joined {donor.joinDate}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>Active Donor</span>
                  </div>
                </div>

                <button data-animated-btn className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-lg">
                  View All Donations
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Donor CTA */}
        <div ref={ctaRef} data-cta-content className="bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 mt-16 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <Heart className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Amazing Community of Donors
            </h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto text-lg">
              Have books sitting on your shelf collecting dust? Share them with
              students who will love and learn from them. Every donated book
              creates ripples of knowledge in our community.
            </p>
            <div data-cta-stats className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-emerald-200">500+</div>
                <div className="text-sm text-emerald-100">Books Needed</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-emerald-200">Free</div>
                <div className="text-sm text-emerald-100">Pickup Service</div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-emerald-200">∞</div>
                <div className="text-sm text-emerald-100">Impact Created</div>
              </div>
            </div>
            <button data-animated-btn className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl">
              Donate Your Books
            </button>
          </div>
        </div>

        {filteredDonors.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No donors found
            </h3>
            <p className="text-slate-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;