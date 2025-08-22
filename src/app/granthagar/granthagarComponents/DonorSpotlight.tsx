"use client";

import React, { useRef } from "react";
import { Heart, BookOpen, Award } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DonorSpotlight: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const featuredDonor = {
    name: "Dr. Rahman Chowdhury",
    photo:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    totalDonations: 45,
    recentBooks: [
      "The Intelligent Investor",
      "Thinking, Fast and Slow", 
      "The Art of War",
      "Man's Search for Meaning",
    ],
    quote:
      "Knowledge grows when shared. I donate books to help students discover new worlds and perspectives.",
    achievement: "Top Donor of the Month",
    joinDate: "January 2023",
  };

  useGSAP(() => {
    // Set initial states
    gsap.set(".donor-header", { y: 40, opacity: 0 });
    gsap.set(".donor-card", { y: 60, opacity: 0, scale: 0.95 });
    gsap.set(".donor-photo", { scale: 0, opacity: 0 });
    gsap.set(".donor-info", { x: -30, opacity: 0 });
    gsap.set(".donor-content", { x: 30, opacity: 0 });
    gsap.set(".recent-book", { x: -20, opacity: 0 });
    gsap.set(".stats-box", { scale: 0.8, opacity: 0 });
    gsap.set(".quote-box", { y: 20, opacity: 0 });
    gsap.set(".donor-buttons", { y: 20, opacity: 0 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".donor-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".donor-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".donor-photo", {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(".donor-info", {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(".donor-content", {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    .to(".recent-book", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "sine.out"
    }, "-=0.3")
    .to(".stats-box", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".quote-box", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(".donor-buttons", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="donor-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Donor Spotlight
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating our amazing donors who make our community library
            possible through their generous contributions.
          </p>
        </div>

        <div className="donor-card bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-orange-400 to-pink-500 p-8 text-white flex items-center justify-center">
              <div className="donor-info text-center">
                <Image
                  src={featuredDonor.photo}
                  alt={featuredDonor.name}
                  width={128}
                  height={128}
                  className="donor-photo w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-medium">
                    {featuredDonor.achievement}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">
                  {featuredDonor.name}
                </h3>
                <p className="text-orange-100">
                  Member since {featuredDonor.joinDate}
                </p>
              </div>
            </div>

            <div className="donor-content md:w-2/3 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      Recent Donations
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {featuredDonor.recentBooks.map((book, index) => (
                      <li key={index} className="recent-book flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <div className="stats-box bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Heart className="w-6 h-6 text-red-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Total Books Donated
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {featuredDonor.totalDonations}
                    </div>
                    <div className="text-sm text-gray-500">
                      Helping {featuredDonor.totalDonations * 3}+ students learn
                    </div>
                  </div>
                </div>
              </div>

              <div className="quote-box bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  Message from {featuredDonor.name.split(" ")[1]}:
                </h4>
                <blockquote className="text-gray-700 italic">
                  {featuredDonor.quote}
                </blockquote>
              </div>

              <div className="donor-buttons flex flex-col sm:flex-row gap-4 mt-6">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                  View All Donations
                </button>
                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-3 px-6 rounded-lg font-semibold transition-colors">
                  Become a Donor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorSpotlight;