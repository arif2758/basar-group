"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Heart, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "প্রতিটি শিশুর জন্য মানসম্মত শিক্ষা নিশ্চিতকরণ",
      subtitle: "বই, খাতা ও শিক্ষা উপকরণ বিতরণের মাধ্যমে সুবিধাবঞ্চিত শিশুদের ভবিষ্যৎ বিনির্মাণ",
      image: "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "শিক্ষায় অনুদান দিন",
      targetUrl: "/foundation/donate",
      stats: "১২,০০০+ শিক্ষার্থী সহায়তাপ্রাপ্ত",
    },
    {
      title: "দরিদ্র পরিবারের মাঝে খাদ্য ও রমজান প্যাকেজ বিতরণ",
      subtitle: "কোনো পরিবার যেন অনাহারে না থাকে সেই মানবিক অঙ্গীকারে বাছার ফাউন্ডেশন",
      image: "https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "খাদ্য সহায়তা দিন",
      targetUrl: "/foundation/donate",
      stats: "২৫,০০০+ পরিবার উপকৃত",
    },
    {
      title: "শীতার্ত মানুষের মাঝে উষ্ণতার উপহার বিতরণ",
      subtitle: "কঠোর শীতের হাত থেকে অসহায় শিশু ও বয়োবৃদ্ধদের সুরক্ষায় শীতবস্ত্র ও কম্বল বিতরণ",
      image: "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "শীতবস্ত্র স্পনসর করুন",
      targetUrl: "/foundation/donate",
      stats: "৮,৫০০+ শীতার্তদের উষ্ণতা",
    },
    {
      title: "প্রত্যন্ত অঞ্চলের জন্য বিনামূল্যে স্বাস্থ্যসেবা ও ক্যাম্প",
      subtitle: "সুবিধাবঞ্চিত জনপদে ফ্রি মেডিকেল ক্যাম্প ও জরুরি চিকিৎসাসেবা নিশ্চিতকরণ",
      image: "https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "স্বাস্থ্যসেবায় যুক্ত হোন",
      targetUrl: "/foundation/donate",
      stats: "১৫,০০০+ রোগীর চিকিৎসা সেবা",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-[calc(100svh-7rem)] min-h-[520px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide
              ? "transform translate-x-0"
              : index < currentSlide
              ? "transform -translate-x-full"
              : "transform translate-x-full"
          }`}
        >
          <div
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.68)), url(${slide.image})`,
            }}
          >
            <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-center">
              <div className="text-white max-w-4xl flex flex-col items-center text-center">
                {/* Stats Pill */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-6 shadow-lg">
                  <Sparkles className="size-3.5" />
                  <span>{slide.stats}</span>
                  <span className="text-[10px] sm:text-xs bg-black/25 px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
                    Learn • Earn • Empower
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4 sm:mb-6 drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg lg:text-xl mb-8 sm:mb-10 text-gray-200 leading-relaxed font-light max-w-2xl">
                  {slide.subtitle}
                </p>

                {/* Multi-Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                  <Link
                    href={slide.targetUrl}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold bg-[#1677ff] hover:bg-[#4096ff] active:scale-[0.98] text-white transition-all shadow-[0_4px_16px_rgba(22,119,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="size-4.5 fill-current" />
                    <span>{slide.cta}</span>
                    <ArrowRight className="size-4.5" />
                  </Link>

                  <Link
                    href="/foundation/request-aid"
                    className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold bg-emerald-600/90 hover:bg-emerald-600 active:scale-[0.98] text-white backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg border border-emerald-400/30 cursor-pointer"
                  >
                    <HelpCircle className="size-4.5" />
                    <span>সহায়তার আবেদন</span>
                  </Link>

                  <Link
                    href="/foundation/campaigns"
                    className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold bg-white/10 hover:bg-white/20 active:scale-[0.98] text-white border border-white/30 backdrop-blur-md transition-all text-center flex items-center justify-center"
                  >
                    চলমান ক্যাম্পেইন
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm hidden sm:flex items-center justify-center border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm hidden sm:flex items-center justify-center border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "w-8 bg-[#1677ff]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;