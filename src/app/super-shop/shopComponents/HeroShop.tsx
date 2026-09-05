"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  Clock,
  Shield,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";



export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const contentRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning = useRef(false);
  const autoPlayRef = useRef<gsap.core.Tween | null>(null);

  const slides = [
    {
      title: "Fresh Groceries at Your Doorstep",
      subtitle: "Supporting Local Youth, Serving Our Community",
      description:
        "Get fresh vegetables, fruits, and daily essentials delivered by local youth within 2 hours",
      image:
        "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Shop Now",
      offer: "Free Delivery on Orders Over ৳500",
      gradient: "from-emerald-500/90 via-teal-500/85 to-cyan-500/80",
      accent: "emerald",
    },
    {
      title: "Ramadan Special Bundles",
      subtitle: "Everything You Need for Holy Month",
      description:
        "Pre-packed bundles with dates, rice, lentils, and iftar essentials",
      image:
        "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "View Bundles",
      offer: "Up to 15% Off on Bundles",
      gradient: "from-orange-500/90 via-amber-500/85 to-yellow-500/80",
      accent: "orange",
    },
    {
      title: "Supporting Local Youth",
      subtitle: "Every Purchase Creates Jobs",
      description:
        "Your orders provide income and skills training to young people in our community",
      image:
        "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Learn More",
      offer: "100+ Youth Employed This Month",
      gradient: "from-purple-500/90 via-pink-500/85 to-rose-500/80",
      accent: "purple",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Initialize first slide
      initializeSlide(0);

      // Setup auto-play
      startAutoPlay();

      // Animate trust badges
      gsap.fromTo(
        ".trust-badge",
        {
          opacity: 0,
          y: 40,
          scale: 0.8,
          rotationX: -20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.8,
        }
      );

      // Animate navigation elements
      gsap.fromTo(
        [".nav-button", ".slide-indicator"],
        {
          opacity: 0,
          scale: 0,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.2,
        }
      );

      // Setup hover interactions
      setupHoverEffects();

      // Floating animations
      gsap.to(".floating-element", {
        y: "random(-15, 15)",
        x: "random(-8, 8)",
        rotation: "random(-10, 10)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 1.5,
          from: "random",
        },
      });

      // Cleanup function
      return () => {
        if (autoPlayRef.current) {
          autoPlayRef.current.kill();
        }
      };
    },
    { scope: containerRef }
  );

  const initializeSlide = (slideIndex: number) => {
    const content = contentRef.current[slideIndex];
    if (!content) return;

    const elements = [
      content.querySelector(".offer-badge"),
      content.querySelector(".main-title"),
      content.querySelector(".subtitle"),
      content.querySelector(".description"),
      content.querySelector(".cta-button"),
    ];

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 60,
        scale: 0.8,
        rotationX: -20,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: slideIndex === 0 ? 0.3 : 0,
      }
    );
  };

  const transitionToSlide = (newSlide: number) => {
    if (isTransitioning.current || newSlide === currentSlide) return;

    isTransitioning.current = true;
    const direction = newSlide > currentSlide ? 1 : -1;

    const currentSlideEl = slidesRef.current[currentSlide];
    const newSlideEl = slidesRef.current[newSlide];

    if (!currentSlideEl || !newSlideEl) return;

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        setCurrentSlide(newSlide);
        updateIndicators(newSlide);
        updateProgressBar(newSlide);
      },
    });

    // Slide transition with 3D effect
    tl.to(currentSlideEl, {
      x: `${-100 * direction}%`,
      scale: 0.9,
      rotationY: direction * 8,
      duration: 0.8,
      ease: "power2.inOut",
    }).fromTo(
      newSlideEl,
      {
        x: `${100 * direction}%`,
        scale: 0.9,
        rotationY: direction * -8,
      },
      {
        x: "0%",
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power2.inOut",
      },
      "-=0.6"
    );

    // Animate new content
    setTimeout(() => initializeSlide(newSlide), 300);
  };

  const updateIndicators = (activeIndex: number) => {
    gsap.to(".slide-indicator", {
      scale: (i: any) => (i === activeIndex ? 1.2 : 1),
      backgroundColor: (i: any) =>
        i === activeIndex
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.4)",
      boxShadow: (i: any) =>
        i === activeIndex ? "0 0 20px rgba(255, 255, 255, 0.6)" : "none",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const updateProgressBar = (activeIndex: number) => {
    gsap.to(".progress-bar", {
      width: `${((activeIndex + 1) / slides.length) * 100}%`,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const startAutoPlay = () => {
    autoPlayRef.current = gsap.delayedCall(5, () => {
      if (!isTransitioning.current) {
        const nextSlide = (currentSlide + 1) % slides.length;
        transitionToSlide(nextSlide);
      }
      startAutoPlay();
    });
  };

  const setupHoverEffects = () => {
    // Navigation buttons
    gsap.utils.toArray<HTMLElement>(".nav-button").forEach((button) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(button, {
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });

      button.addEventListener("mouseenter", () => hoverTl.play());
      button.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // CTA buttons
    gsap.utils.toArray<HTMLElement>(".cta-button").forEach((button) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(button, {
        scale: 1.05,
        y: -4,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });

      button.addEventListener("mouseenter", () => hoverTl.play());
      button.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Trust badges
    gsap.utils.toArray<HTMLElement>(".trust-badge").forEach((badge) => {
      const icon = badge.querySelector(".trust-icon");
      const text = badge.querySelector(".trust-text");

      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(badge, { y: -6, duration: 0.3, ease: "power2.out" })
        .to(
          icon,
          { scale: 1.2, rotation: 10, duration: 0.3, ease: "back.out(1.7)" },
          "-=0.3"
        )
        .to(text, { color: "#059669", scale: 1.05, duration: 0.2 }, "-=0.2");

      badge.addEventListener("mouseenter", () => hoverTl.play());
      badge.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  const nextSlide = () => {
    if (autoPlayRef.current) autoPlayRef.current.restart(true);
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    transitionToSlide(nextSlideIndex);
  };

  const prevSlide = () => {
    if (autoPlayRef.current) autoPlayRef.current.restart(true);
    const prevSlideIndex = (currentSlide - 1 + slides.length) % slides.length;
    transitionToSlide(prevSlideIndex);
  };

  const goToSlide = (index: number) => {
    if (autoPlayRef.current) autoPlayRef.current.restart(true);
    transitionToSlide(index);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden bg-gray-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-transparent to-purple-500"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,154,158,0.3),transparent_50%)]"></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) slidesRef.current[index] = el;
          }}
          className={`absolute inset-0 ${
            index === currentSlide ? "z-10" : "z-0"
          }`}
          style={{
            transform:
              index === currentSlide
                ? "translateX(0%)"
                : index < currentSlide
                ? "translateX(-100%)"
                : "translateX(100%)",
          }}
        >
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />

            {/* Enhanced gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
            ></div>

            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

            {/* Floating elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Sparkles className="floating-element absolute top-[15%] left-[10%] w-4 h-4 text-white/30" />
              <Star className="floating-element absolute top-[25%] right-[15%] w-5 h-5 text-white/25" />
              <Zap className="floating-element absolute bottom-[30%] left-[20%] w-4 h-4 text-white/20" />
              <Sparkles className="floating-element absolute top-[60%] right-[25%] w-3 h-3 text-white/35" />
              <Star className="floating-element absolute bottom-[45%] right-[10%] w-4 h-4 text-white/25" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                ref={(el) => {
                  if (el) contentRef.current[index] = el;
                }}
                className="text-center text-white max-w-5xl mx-auto px-6 sm:px-8"
              >
                <div className="offer-badge bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold mb-8 inline-flex items-center border border-white/30 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {slide.offer}
                </div>

                <h1 className="main-title text-4xl sm:text-5xl lg:text-7xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
                    {slide.title}
                  </span>
                </h1>

                <h2 className="subtitle text-xl sm:text-2xl lg:text-3xl font-semibold mb-8 text-white/90 max-w-3xl mx-auto">
                  {slide.subtitle}
                </h2>

                <p className="description text-lg sm:text-xl lg:text-2xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
                  {slide.description}
                </p>

                <button className="cta-button group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl border border-white/20 backdrop-blur-sm inline-flex items-center transition-all duration-300">
                  {slide.cta}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="nav-button absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 sm:p-4 rounded-full border border-white/20 z-20 transition-all duration-300"
        disabled={isTransitioning.current}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="nav-button absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 sm:p-4 rounded-full border border-white/20 z-20 transition-all duration-300"
        disabled={isTransitioning.current}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`slide-indicator w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white/50 transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/30"
            }`}
            disabled={isTransitioning.current}
          />
        ))}
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-[#141414]/95 backdrop-blur-sm border-t border-slate-200/80 dark:border-[#303030] z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 lg:space-x-16">
            <div className="trust-badge flex items-center space-x-3 text-slate-800 dark:text-slate-200 cursor-pointer group">
              <div className="trust-icon p-2 sm:p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-100 dark:border-emerald-800/40 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                <Truck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <span className="trust-text block text-xs sm:text-sm font-semibold">
                  Fast Delivery
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Within 2 hours</span>
              </div>
            </div>

            <div className="trust-badge flex items-center space-x-3 text-slate-800 dark:text-slate-200 cursor-pointer group">
              <div className="trust-icon p-2 sm:p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-100 dark:border-blue-800/40 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <span className="trust-text block text-xs sm:text-sm font-semibold">
                  Same Day Service
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Order before 6 PM</span>
              </div>
            </div>

            <div className="trust-badge flex items-center space-x-3 text-slate-800 dark:text-slate-200 cursor-pointer group">
              <div className="trust-icon p-2 sm:p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-full border border-purple-100 dark:border-purple-800/40 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <span className="trust-text block text-xs sm:text-sm font-semibold">
                  Quality Guaranteed
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  100% fresh products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="progress-bar h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300"
          style={{ width: "33.33%" }}
        />
      </div>

      {/* Mobile Touch Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 sm:hidden z-20">
        <div className="w-8 h-1 bg-white/30 rounded-full">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
