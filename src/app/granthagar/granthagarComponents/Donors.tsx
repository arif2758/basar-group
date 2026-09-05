"use client";

import React, { useState, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { Search, Heart, BookOpen, Award, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

    // Top donor spotlight animation
    gsap.from("[data-top-donor]", {
      scrollTrigger: {
        trigger: topDonorRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      scale: 0.98,
      y: 40,
      duration: 0.9,
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
      duration: 0.7,
      ease: "power2.out",
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
      duration: 0.6,
      stagger: 0.08,
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
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header */}
        <div ref={headerRef} className="mb-10 text-center sm:text-left">
          <h1 data-header-title className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Our Amazing Donors
          </h1>
          <p data-header-desc className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Meet the generous people who make our community library possible
            through their book donations.
          </p>
        </div>

        {/* Top Donor Spotlight */}
        <div ref={topDonorRef} data-top-donor className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl shadow-sm mb-12 overflow-hidden">
          <div data-top-donor-content className="p-6 sm:p-8 text-white">
            <div className="flex items-center space-x-2.5 mb-6">
              <Award className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Top Donor of the Month
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center lg:text-left">
                <Image
                  src={topDonor.photo}
                  alt={topDonor.name}
                  width={110}
                  height={110}
                  className="rounded-full mx-auto lg:mx-0 mb-4 border border-slate-700 dark:border-[#303030] shadow-sm object-cover"
                />
                <h3 className="text-xl font-bold mb-1 text-white">{topDonor.name}</h3>
                <div className="flex items-center justify-center lg:justify-start space-x-1 text-slate-400 mb-1.5 text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{topDonor.location}</span>
                </div>
                <div className="text-slate-400 text-xs mb-3">
                  Member since {topDonor.joinDate}
                </div>
                <div className="bg-amber-500/10 dark:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-medium inline-block">
                  {topDonor.badge}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-800/70 dark:bg-[#1a1a1a] rounded-xl p-5 text-center border border-slate-700/60 dark:border-[#303030]">
                    <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div data-counter className="text-3xl font-bold text-white mb-1">
                      {topDonor.totalDonations}
                    </div>
                    <div className="text-slate-400 text-xs">Books Donated</div>
                  </div>

                  <div className="bg-slate-800/70 dark:bg-[#1a1a1a] rounded-xl p-5 border border-slate-700/60 dark:border-[#303030]">
                    <h4 className="font-semibold mb-3 text-amber-400 text-xs uppercase tracking-wider">
                      Recent Contributions
                    </h4>
                    <div className="space-y-1.5">
                      {topDonor.recentBooks.slice(0, 4).map((book, index) => (
                        <div key={index} className="text-xs text-slate-300 dark:text-slate-400 truncate">
                          • {book}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-slate-800/50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-700/60 dark:border-[#303030]">
                  <p className="text-slate-300 dark:text-slate-400 italic text-xs sm:text-sm">
                    &ldquo;Knowledge grows when shared. I donate books to help students
                    discover new worlds and perspectives that can transform
                    their lives.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div ref={searchRef} data-search-box className="bg-white dark:bg-[#141414] rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] p-4 sm:p-5 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search donors by name or donated books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Donors Grid */}
        <div ref={donorsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              data-donor-card
              className="bg-white dark:bg-[#141414] rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] border border-slate-200 dark:border-[#303030] overflow-hidden transition-all duration-200"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <Image
                    src={donor.photo}
                    alt={donor.name}
                    width={72}
                    height={72}
                    className="rounded-full mx-auto mb-3 border border-slate-200 dark:border-[#303030] shadow-sm object-cover"
                  />
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-0.5">
                    {donor.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1 text-slate-500 dark:text-slate-400 mb-2 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{donor.location}</span>
                  </div>
                  <span className="inline-block bg-slate-100 dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#303030] px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {donor.badge}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-lg p-3 mb-4 text-center border border-slate-200 dark:border-[#303030]">
                  <div className="flex items-center justify-center space-x-1.5 mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Books Donated</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {donor.totalDonations}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2 text-xs">
                    Recent Donations:
                  </h4>
                  <div className="space-y-1">
                    {donor.recentBooks.map((book, index) => (
                      <div
                        key={index}
                        className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-[#1a1a1a] px-2.5 py-1.5 rounded-md truncate border border-slate-200 dark:border-[#262626]"
                      >
                        {book}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4 pt-3 border-t border-slate-100 dark:border-[#262626]">
                  <span>Joined {donor.joinDate}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    <span>Active Donor</span>
                  </div>
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 rounded-lg text-xs font-medium transition-colors shadow-sm active:scale-[0.99]">
                  View All Donations
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Donor CTA */}
        <div ref={ctaRef} data-cta-content className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl shadow-sm p-8 sm:p-12 mt-16 text-white text-center">
          <div>
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
              Join Our Amazing Community of Donors
            </h2>
            <p className="text-slate-300 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Have books sitting on your shelf collecting dust? Share them with
              students who will love and learn from them. Every donated book
              creates ripples of knowledge in our community.
            </p>
            <div data-cta-stats className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-slate-800/70 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-700/60 dark:border-[#303030]">
                <div className="text-2xl font-bold text-emerald-400 mb-0.5">500+</div>
                <div className="text-xs text-slate-400">Books Needed</div>
              </div>
              <div className="bg-slate-800/70 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-700/60 dark:border-[#303030]">
                <div className="text-2xl font-bold text-emerald-400 mb-0.5">Free</div>
                <div className="text-xs text-slate-400">Pickup Service</div>
              </div>
              <div className="bg-slate-800/70 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-700/60 dark:border-[#303030]">
                <div className="text-2xl font-bold text-emerald-400 mb-0.5">100%</div>
                <div className="text-xs text-slate-400">Community Impact</div>
              </div>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-xl font-medium text-base transition-colors shadow-sm active:scale-[0.99]">
              Donate Your Books
            </button>
          </div>
        </div>

        {filteredDonors.length === 0 && searchTerm && (
          <div className="text-center py-16 bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] p-8 shadow-sm">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
              No donors found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donors;