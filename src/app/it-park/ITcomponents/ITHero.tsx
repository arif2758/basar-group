"use client";

import { useState, useRef } from "react";
import { FaGraduationCap, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              backgroundRefs.current[index] = el;
            }}
            className="absolute inset-0 bg-cover bg-center opacity-0"
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Come. Grow. <span className="text-emerald-400">Serve.</span>
        </h1>

        <p className="hero-text text-xl md:text-2xl mb-8 opacity-90">
          Where IT education meets community growth. Join BASAR IT Park to
          develop skills, earn income, and transform lives together.
        </p>

        <div className="hero-text flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors duration-300">
            <FaGraduationCap className="inline mr-2" /> Join as Learner
          </button>
          <button className="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-600 transition-colors duration-300">
            <FaHandHoldingHeart className="inline mr-2" /> Become Mentor
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
            <FaUsers className="inline mr-2" /> Support Us
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-emerald-400 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default ITHero;
