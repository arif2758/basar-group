"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Users,
  CreditCard,
  Sparkles,
  ArrowRight,
  Search,
  Zap,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroShop() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Fresh Groceries at Your Doorstep",
      highlight: "Delivered Within 2 Hours",
      subtitle:
        "Farm-fresh vegetables, seasonal fruits, and daily essentials sourced directly from local producers with love.",
      image:
        "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "🌿 100% Fresh & Chemical-Free",
      offer: "Free Delivery on Orders Over ৳500",
      cta: "Explore Fresh Produce",
      link: "/super-shop/shop?category=fresh-produce",
    },
    {
      title: "Ramadan & Family Bundles",
      highlight: "Save Up To 25% Today",
      subtitle:
        "Handpicked essentials, premium dates, aromatic rice, and lentils packed thoughtfully for your family's table.",
      image:
        "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "⭐ Special Ramadan Packages",
      offer: "Extra 10% Off with Code: RAMADAN10",
      cta: "View Value Bundles",
      link: "/super-shop/shop?category=grains-&-rice",
    },
    {
      title: "Empowering Local Youth",
      highlight: "Every Purchase Creates Jobs",
      subtitle:
        "Our logistics & operations are run by ambitious youth earning tuition fees and building professional skills.",
      image:
        "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1600",
      badge: "🤝 Social Welfare Initiative",
      offer: "120+ Youth Actively Employed",
      cta: "Learn Our Mission",
      link: "/foundation",
    },
  ];

  const quickTags = [
    { label: "Fresh Vegetables", query: "vegetables" },
    { label: "Basmati Rice", query: "rice" },
    { label: "Pure Dairy", query: "dairy" },
    { label: "Fresh Fruits", query: "fruits" },
    { label: "Spices & Oils", query: "spices" },
  ];

  useScrollAnimation();

  // Auto-play slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-content-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [currentSlide] }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/super-shop/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-slate-950">
      {/* Slide Images with Rich Moody Cinematic Overlays */}
      <div className="relative h-[680px] sm:h-[720px] lg:h-[760px] w-full">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image with Slow Zoom */}
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className={`object-cover transform transition-transform duration-[8000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  sizes="100vw"
                />

                {/* Dark Cinematic Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.5)_100%)]" />
              </div>

              {/* Slide Content */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-20">
                  <div className="max-w-3xl">
                    {/* Glowing Badge */}
                    <div className="hero-content-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md mb-5 shadow-lg shadow-emerald-950/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{slide.badge}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-emerald-200/90">{slide.offer}</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="hero-content-anim text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-4">
                      {slide.title}{" "}
                      <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-content-anim text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
                      {slide.subtitle}
                    </p>

                    {/* Search & Quick Action Bar */}
                    <div className="hero-content-anim mb-8 max-w-xl">
                      <form onSubmit={handleSearch} className="relative flex items-center">
                        <div className="relative flex-grow">
                          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search fresh vegetables, fruits, rice, milk..."
                            className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-emerald-400 text-white placeholder-slate-400 text-sm sm:text-base outline-none backdrop-blur-xl transition-all shadow-xl"
                          />
                        </div>
                        <button
                          type="submit"
                          className="ml-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 flex items-center gap-2"
                        >
                          <span>Search</span>
                          <ArrowRight className="w-4 h-4 hidden sm:inline" />
                        </button>
                      </form>

                      {/* Quick Suggestion Pills */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-1">
                        <span className="text-xs text-slate-400 font-medium">Quick find:</span>
                        {quickTags.map((tag, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => router.push(`/super-shop/shop?q=${tag.query}`)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all duration-200"
                          >
                            {tag.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="hero-content-anim flex flex-wrap items-center gap-4">
                      <Link
                        href={slide.link}
                        className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
                      >
                        <span>{slide.cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <Link
                        href="/super-shop/shop"
                        className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>All Products</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Navigation Arrows */}
        <div className="absolute right-6 bottom-28 sm:bottom-24 z-30 flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-3 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-white/15 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Progress Pill Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-28 sm:bottom-24 z-30 flex items-center gap-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? "w-8 bg-emerald-400 shadow-md shadow-emerald-400/50"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating Modern Trust & Value Bar (No harsh border-t, seamless dock) */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-14 pb-8">
        <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-none p-4 sm:p-6 transition-colors duration-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-[#262626]">
            {/* Feature 1 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 first:pt-0">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  2-Hour Express
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fast delivery to your doorstep
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-600 dark:text-teal-400">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  100% Farm Fresh
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct from verified growers
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Youth Empowered
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every order creates local jobs
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-6">
              <div className="w-11 h-11 rounded-xl bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 flex items-center justify-center flex-shrink-0 text-sky-600 dark:text-sky-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Guaranteed Quality
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Easy return & cash on delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
