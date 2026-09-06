"use client";
// src/components/Hero.tsx

import { useState, useEffect, useRef } from "react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";



export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const images = [
    "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  useScrollAnimation();
  useGSAP(
    () => {
      const tl = gsap.timeline();

      gsap.set(".hero-title", { y: 80, opacity: 0 });
      gsap.set(".hero-subtitle", { y: 50, opacity: 0 });
      gsap.set(".hero-buttons", { y: 30, opacity: 0 });
      gsap.set(".hero-trust", { y: 20, opacity: 0 });

      tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.6"
        )
        .to(
          ".hero-buttons",
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          "-=0.4"
        )
        .to(
          ".hero-trust",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "sine.out",
          },
          "-=0.3"
        );
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-start sm:justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-8 sm:pt-0"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-30" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full">
        <h1 className="text-gray-400 text-xs sm:text-sm mb-3">Beacon Alliance Spark Authentic Rise (BASAR)</h1>
        <div className="max-w-5xl flex flex-col items-center">
          {/* Headline */}
          <h1 className="hero-title font-poppins text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span className="block">
              <span className="bg-[linear-gradient(180deg,#8ee8cf_0%,#e9fff7_40%,#ffffff_50%,#e9fff7_60%,#8ee8cf_100%)] bg-clip-text text-transparent [text-shadow:0_1px_0_rgba(255,255,255,0.5)]">
                <span className="inline-block rounded-xl bg-black/30 px-3 sm:px-4 ring-1 ring-white/10">
                  BASAR
                </span>{" "}
                Group
              </span>
            </span>

            <span className="block mt-3 text-[28px] sm:text-5xl lg:text-6xl whitespace-nowrap">
              <span className="bg-[linear-gradient(180deg,#8ee8cf_0%,#e9fff7_40%,#ffffff_50%,#e9fff7_60%,#8ee8cf_100%)] bg-clip-text text-transparent [text-shadow:0_1px_0_rgba(255,255,255,0.5)]">
                Learn. Earn.{" "}
                <span className="inline-block rounded-xl bg-black/30 px-3 sm:px-4 ring-1 ring-white/10">
                  Empower.
                </span>{" "}
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className="hero-subtitle mb-8">
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-4">
              বাছার বংশের জন্য একটি ভবিষ্যৎ—শিক্ষা, আত্মনির্ভরতা ও কমিউনিটি উন্নয়ন।
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              আমরা এমন ব্যবস্থা গড়ে তুলেছি যাতে বাছার পরিবারের প্রতিটি সদস্য
              এবং আমাদের কমিউনিটি শিখতে, বেড়ে উঠতে এবং সফল হতে পারে।
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 mb-12 justify-center w-full">
            <Link
              href="#departments"
              className="primary-btn group relative px-8 py-3 rounded-lg font-semibold text-lg text-white bg-[#056A5F] flex items-center justify-center w-full sm:w-auto"
            >
              <span>যোগ দিন / ভিজিট করুন</span>
              <FiArrowRight className="ml-2 w-5 h-5 text-white" />
            </Link>

            <button className="secondary-btn group relative px-8 py-3 rounded-lg font-semibold text-lg text-gray-200 border border-white/20 bg-black/20 backdrop-blur-md flex items-center justify-center w-full sm:w-auto">
              <span>আরও জানুন</span>
              <FiPlay className="ml-2 w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="hero-trust flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              <span>1250+ ছাত্রছাত্রীকে সহায়তা</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-teal-400 rounded-full mr-2" />
              <span>85+ দাতার সহায়তায়</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
              <span>15+ কমিউনিটি প্রকল্প</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentImage
                ? "bg-emerald-500 scale-125 shadow-md"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
