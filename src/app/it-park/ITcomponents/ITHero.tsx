"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaGraduationCap, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(useGSAP);

const heroImages = [
  "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
  "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
  "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
  "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg",
];

function ITHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRefs = useRef<(HTMLDivElement | null)[]>([]);

  useScrollAnimation();
  useGSAP(() => {
    // Set initial state
    gsap.set(".hero-text", { y: 30, opacity: 0 });
    gsap.set(backgroundRefs.current[0], { opacity: 1 });

    // Smooth entrance animation
    gsap.to(".hero-text", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power1.out",
      delay: 0.3,
    });

    // Carousel auto-play
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle slide changes
  useScrollAnimation();
  useGSAP(() => {
    backgroundRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.to(ref, {
          opacity: index === currentSlide ? 1 : 0,
          duration: 0.8,
          ease: "power1.inOut",
        });
      }
    });
  }, [currentSlide]);

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] min-h-[620px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              backgroundRefs.current[index] = el;
            }}
            className="absolute inset-0 bg-cover bg-center opacity-0 transition-opacity"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold mb-6 tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Learn. Earn. Empower.
        </div>

        <h1 className="hero-text text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
          প্রযুক্তি শিখুন, দক্ষ হোন,{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            সমাজ গড়ুন
          </span>
        </h1>

        <p className="hero-text text-lg sm:text-xl lg:text-2xl mb-10 text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
          যেখানে আধুনিক তথ্যপ্রযুক্তি শিক্ষা ও সামাজিক উন্নয়ন একসূত্রে গাঁথা। BASAR IT Park-এ যুক্ত হয়ে ক্যারিয়ারের উপযোগী স্কিল অর্জন করুন এবং স্বাবলম্বী হয়ে গড়ে তুলুন নতুন ভবিষ্যৎ।
        </p>

        <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#skills"
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <FaGraduationCap className="text-lg" />
            <span>শিক্ষার্থী হিসেবে যুক্ত হোন</span>
          </Link>
          <Link
            href="#about"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 px-8 py-4 rounded-xl text-base font-bold shadow-lg hover:shadow-amber-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <FaHandHoldingHeart className="text-lg text-slate-950" />
            <span>মেন্টর হিসেবে যুক্ত হোন</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl text-base font-bold backdrop-blur-sm transition-all duration-300 active:scale-95 flex items-center justify-center gap-2.5"
          >
            <FaUsers className="text-lg" />
            <span>সহযোগিতা করুন</span>
          </Link>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2.5 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`স্লাইড ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-emerald-400 w-8" : "bg-white/40 w-2.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default ITHero;
