"use client";

import React, { useRef } from "react";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Rashida Begum",
      role: "বিশ্ববিদ্যালয় শিক্ষার্থী",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "BASAR লাইব্রেরি আমার পড়ার অভ্যাস পুরোপুরি বদলে দিয়েছে। আগে ঘণ্টার পর ঘণ্টা সোশ্যাল মিডিয়ায় অপচয় করতাম, এখন দারুণ সব বই পড়ে নিজের জ্ঞান বৃদ্ধি করছি। বিশেষ করে 30-মিনিটের ডেলিভারি সত্যিই অবিশ্বাস্য!",
    },
    {
      id: 2,
      name: "Mohammad Karim",
      role: "স্কুল শিক্ষার্থী",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "এই লাইব্রেরির মাধ্যমে আমি এমন অসাধারণ বইগুলোর খোঁজ পেয়েছি যা আগে কখনো জানতাম না। দাতা ব্যবস্থাটি চমৎকার—কে বইটি দান করেছেন তা দেখতে পেলে কমিউনিটির সাথে আন্তরিক বন্ধন অনুভব হয়!",
    },
    {
      id: 3,
      name: "Fatima Rahman",
      role: "কলেজ শিক্ষার্থী",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "রিডিং ট্র্যাকার এবং ব্যাজগুলো আমাকে নিয়মিত পড়তে অনুপ্রাণিত করে। প্রতি মাসের কুইজে অংশ নিতে দারুণ লাগে। বই পড়া এখন আমার কাছে আর কোনো সাধারণ কাজ নয়, একটি রোমাঞ্চকর অভিজ্ঞতা!",
    },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Set initial states
    gsap.set(".testimonials-header", { y: 50, opacity: 0 });
    gsap.set(".testimonial-card", { y: 80, opacity: 0, scale: 0.9 });
    gsap.set(".quote-icon", { scale: 0, opacity: 0 });
    gsap.set(".rating-star", { scale: 0, opacity: 0 });
    gsap.set(".testimonial-text", { y: 20, opacity: 0 });
    gsap.set(".author-photo", { scale: 0, opacity: 0 });
    gsap.set(".author-info", { x: -20, opacity: 0 });
    gsap.set(".stats-section", { y: 60, opacity: 0, scale: 0.95 });
    gsap.set(".stat-item", { y: 30, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".testimonials-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".testimonial-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".quote-icon", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(".rating-star", {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(".testimonial-text", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(".author-photo", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(".author-info", {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3")
    .to(".stats-section", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".stat-item", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.4");

    // Floating animation for testimonial cards
    gsap.to(".testimonial-card", {
      y: -5,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 2
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            আমাদের কমিউনিটির অনুভূতি
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            আমাদের কমিউনিটি Library-র সাথে যুক্ত হয়ে শিক্ষার্থীদের জীবন ও পাঠাভ্যাস কীভাবে সমৃদ্ধ হয়েছে তার বাস্তব গল্প।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl p-6 sm:p-8 relative shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="quote-icon w-8 h-8 text-slate-300 dark:text-[#303030]" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star
                      key={index}
                      className="rating-star w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="testimonial-text text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm sm:text-base">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/80 dark:border-[#262626]">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={44}
                  height={44}
                  className="author-photo w-11 h-11 rounded-full border border-slate-200 dark:border-[#303030] object-cover"
                />

                <div className="author-info">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-section bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl p-8 mt-16 text-white text-center shadow-sm">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
            200+ শিক্ষার্থীর সাথে যুক্ত হোন যারা বই পড়ার মাধ্যমে নিজেদের বিকশিত করেছেন
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="stat-item p-4 bg-slate-800/50 dark:bg-[#1a1a1a] rounded-xl border border-slate-700/40 dark:border-[#303030]">
              <div className="text-3xl font-bold text-amber-400 mb-1">85%</div>
              <div className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm">সোশ্যাল মিডিয়ায় অলস সময় হ্রাস</div>
            </div>
            <div className="stat-item p-4 bg-slate-800/50 dark:bg-[#1a1a1a] rounded-xl border border-slate-700/40 dark:border-[#303030]">
              <div className="text-3xl font-bold text-amber-400 mb-1">3.2</div>
              <div className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm">প্রতি মাসে গড়ে পঠিত বই</div>
            </div>
            <div className="stat-item p-4 bg-slate-800/50 dark:bg-[#1a1a1a] rounded-xl border border-slate-700/40 dark:border-[#303030]">
              <div className="text-3xl font-bold text-amber-400 mb-1">92%</div>
              <div className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm">লেখাপড়ায় মনোযোগ ও দক্ষতা বৃদ্ধি</div>
            </div>
            <div className="stat-item p-4 bg-slate-800/50 dark:bg-[#1a1a1a] rounded-xl border border-slate-700/40 dark:border-[#303030]">
              <div className="text-3xl font-bold text-amber-400 mb-1">
                4.9/5
              </div>
              <div className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm">কমিউনিটি সন্তুষ্টি রেটিং</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;