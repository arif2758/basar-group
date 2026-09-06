"use client";

import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import { testimonials } from "@/lib/data";
import Image from "next/image";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
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
    <section className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            সদস্যদের মতামত
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            আমাদের সদস্য ও সেবা গ্রহীতাদের কথা
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl shadow-[0_6px_16px_0_rgba(0,0,0,0.06)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.4)] p-8 md:p-12 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center mb-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed mb-8 italic">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  width={600}
                  height={400}
                  className="w-16 h-16 rounded-full object-cover mb-4 ring-2 ring-blue-500/20 shadow-md"
                />

                <div>
                  <h4 className="font-semibold text-lg text-slate-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-white/5 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
              aria-label="আগের মতামত"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    index === currentIndex
                      ? "bg-blue-600 dark:bg-blue-400 w-6"
                      : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                  }`}
                  aria-label={`মতামত ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:bg-slate-100 dark:hover:bg-white/5 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-xs transition-colors cursor-pointer"
              aria-label="পরের মতামত"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
