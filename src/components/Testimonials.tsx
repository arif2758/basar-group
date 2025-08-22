"use client";

import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "@/lib/data";
import Image from "next/image";

interface TestimonialsProps {
  language: "bn" | "en";
}

export default function Testimonials({ language }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 teal-slate-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === "bn" ? "সদস্যদের মতামত" : "Member Testimonials"}
          </h2>
          <p className="text-primary-100 text-lg">
            {language === "bn"
              ? "আমাদের সদস্য ও সেবা গ্রহীতাদের কথা"
              : "Words from our members and beneficiaries"}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-soft-100 rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <div className="flex flex-col items-center text-center">
              {/* Stars */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-5 h-5 text-accent fill-current"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Avatar and Details */}
              <div className="flex flex-col items-center">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  width={600}
                  height={400}
                  className="w-16 h-16 rounded-full object-cover mb-4 shadow-lg"
                />

                <div>
                  <h4 className="font-semibold text-lg text-neutral-dark">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {language === "bn"
                      ? testimonials[currentIndex].role
                          .replace("Library Member", "লাইব্রেরি সদস্য")
                          .replace(
                            "IT Park Graduate",
                            "আইটি পার্ক গ্র্যাজুয়েট"
                          )
                          .replace(
                            "Foundation Volunteer",
                            "ফাউন্ডেশন স্বেচ্ছাসেবক"
                          )
                          .replace("Super Shop Customer", "সুপার শপ ক্রেতা")
                      : testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
