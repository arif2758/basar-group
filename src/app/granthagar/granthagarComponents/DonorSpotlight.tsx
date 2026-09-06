"use client";

import React, { useRef } from "react";
import { Heart, BookOpen, Award } from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




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
      "জ্ঞান ভাগ করে নিলে তা বৃদ্ধি পায়। শিক্ষার্থীদের নতুন চিন্তা ও দিগন্ত উন্মোচনে সহায়তা করতে আমি বই দান করি।",
    achievement: "মাসের সেরা দাতা",
    joinDate: "January 2023",
  };

  useScrollAnimation();
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
    <section ref={sectionRef} className="py-16 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="donor-header text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            বিশিষ্ট দাতা কর্নার
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            আমাদের সম্মানিত দাতাদের সাধুবাদ জানাচ্ছি, যাঁদের উদার অবদানে কমিউনিটি Library সমৃদ্ধ হয়ে উঠছে।
          </p>
        </div>

        <div className="donor-card bg-slate-50 dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden">
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
                  যুক্ত আছেন: {featuredDonor.joinDate}
                </p>
              </div>
            </div>

            <div className="donor-content md:w-2/3 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      সম্প্রতি দানকৃত বই
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {featuredDonor.recentBooks.map((book, index) => (
                      <li key={index} className="recent-book flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-slate-300">{book}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <div className="stats-box bg-blue-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-blue-100 dark:border-[#303030]">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Heart className="w-6 h-6 text-red-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                        সর্বমোট দানকৃত বই
                      </span>
                    </div>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {featuredDonor.totalDonations}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">
                      {featuredDonor.totalDonations * 3}+ শিক্ষার্থীর পড়াশোনায় সহায়ক
                    </div>
                  </div>
                </div>
              </div>

              <div className="quote-box bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-slate-200 dark:border-[#303030]">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {featuredDonor.name}-এর বার্তা:
                </h4>
                <blockquote className="text-gray-700 dark:text-slate-300 italic">
                  &quot;{featuredDonor.quote}&quot;
                </blockquote>
              </div>

              <div className="donor-buttons flex flex-col sm:flex-row gap-4 mt-6">
                <a
                  href="/granthagar/donors"
                  className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  সকল অনুদান দেখুন
                </a>
                <a
                  href="/granthagar/donors"
                  className="flex-1 text-center bg-blue-100 dark:bg-blue-950/60 hover:bg-blue-200 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  দাতা হিসেবে যুক্ত হোন
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorSpotlight;