"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Apple,
  Carrot,
  Milk,
  Fish,
  Dice1 as Rice,
  Cookie,
  Coffee,
  Sparkles,
  Home,
  ArrowRight,
  Star,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      name: "Fresh Vegetables",
      icon: Carrot,
      color: "bg-green-100 text-green-600",
      count: "150+ items",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      name: "Fresh Fruits",
      icon: Apple,
      color: "bg-red-100 text-red-600",
      count: "80+ items",
      gradient: "from-red-400 to-pink-500",
    },
    {
      name: "Dairy Products",
      icon: Milk,
      color: "bg-blue-100 text-blue-600",
      count: "45+ items",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      name: "Meat & Fish",
      icon: Fish,
      color: "bg-orange-100 text-orange-600",
      count: "35+ items",
      gradient: "from-orange-400 to-red-500",
    },
    {
      name: "Rice & Grains",
      icon: Rice,
      color: "bg-yellow-100 text-yellow-600",
      count: "25+ items",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      name: "Snacks & Treats",
      icon: Cookie,
      color: "bg-purple-100 text-purple-600",
      count: "120+ items",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      name: "Beverages",
      icon: Coffee,
      color: "bg-indigo-100 text-indigo-600",
      count: "60+ items",
      gradient: "from-indigo-400 to-purple-500",
    },
    {
      name: "Personal Care",
      icon: Sparkles,
      color: "bg-pink-100 text-pink-600",
      count: "90+ items",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      name: "Household",
      icon: Home,
      color: "bg-gray-100 text-gray-600",
      count: "75+ items",
      gradient: "from-gray-400 to-slate-500",
    },
  ];

  useGSAP(
    () => {
      // Header animation on scroll
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Category cards staggered animation
      gsap.fromTo(
        ".category-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.8,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 1.2,
            grid: "auto",
            from: "start",
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Banner animation
      gsap.fromTo(
        bannerRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationX: -10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Enhanced hover effects for category cards
      const categoryCards = gsap.utils.toArray<HTMLElement>(".category-card");
      categoryCards.forEach((card: HTMLElement, ) => {
        const icon = card.querySelector(".category-icon");
        const iconBg = card.querySelector(".icon-bg");
        const title = card.querySelector(".category-title");
        const count = card.querySelector(".category-count");
        const sparkle = card.querySelector(".card-sparkle");

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(card, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            duration: 0.4,
            ease: "power2.out",
          })
          .to(
            iconBg,
            {
              scale: 1.15,
              rotation: 5,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          )
          .to(
            icon,
            {
              scale: 1.2,
              rotation: -5,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          )
          .to(
            title,
            {
              color: "#059669",
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            count,
            {
              y: -2,
              color: "#6b7280",
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            sparkle,
            {
              opacity: 1,
              scale: 1,
              rotation: 180,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            "-=0.4"
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());

        // Click animation
        card.addEventListener("mousedown", () => {
          gsap.to(card, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseup", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.1,
            ease: "power2.out",
          });
        });
      });

      // Banner hover effect
      const bannerButton = bannerRef.current?.querySelector(".banner-button");
      if (bannerButton) {
        const bannerHoverTl = gsap.timeline({ paused: true });
        bannerHoverTl
          .to(bannerButton, {
            scale: 1.05,
            y: -3,
            boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            bannerButton.querySelector(".button-arrow"),
            {
              x: 5,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.3"
          );

        bannerButton.addEventListener("mouseenter", () => bannerHoverTl.play());
        bannerButton.addEventListener("mouseleave", () =>
          bannerHoverTl.reverse()
        );
      }

      // Floating animation for decorative elements
      gsap.to(".floating-star", {
        y: -10,
        rotation: 180,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Parallax effect for background elements
      gsap.to(".bg-decoration", {
        y: -30,
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-decoration absolute top-20 left-10 w-32 h-32 bg-emerald-100/30 rounded-full blur-xl"></div>
        <div className="bg-decoration absolute bottom-40 right-20 w-40 h-40 bg-blue-100/30 rounded-full blur-xl"></div>
        <div className="bg-decoration absolute top-1/2 left-1/3 w-24 h-24 bg-purple-100/30 rounded-full blur-xl"></div>

        <Star className="floating-star absolute top-32 right-1/4 w-6 h-6 text-yellow-300/40" />
        <Star className="floating-star absolute bottom-1/3 left-1/4 w-4 h-4 text-pink-300/40" />
        <Star className="floating-star absolute top-2/3 right-1/3 w-5 h-5 text-blue-300/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent text-sm font-bold uppercase tracking-wider">
              Explore Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find everything you need from fresh produce to daily essentials, all
            sourced locally with love and care
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/shop?category=${category.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="group"
            >
              <div className="category-card bg-white rounded-2xl p-6 text-center border border-gray-100 relative overflow-hidden cursor-pointer">
                {/* Hidden sparkle for hover effect */}
                <Sparkles className="card-sparkle absolute top-3 right-3 w-4 h-4 text-yellow-400 opacity-0 scale-0" />

                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10">
                  <div
                    className={`icon-bg w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden`}
                  >
                    <category.icon className="category-icon w-8 h-8 relative z-10" />
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </div>

                  <h3 className="category-title font-semibold text-gray-800 mb-2 transition-all duration-300">
                    {category.name}
                  </h3>

                  <p className="category-count text-sm text-gray-500 transition-all duration-300">
                    {category.count}
                  </p>
                </div>

                {/* Border glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ padding: "1px" }}
                >
                  <div className="w-full h-full bg-white rounded-2xl"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced special offers banner */}
        <div ref={bannerRef} className="mt-16 relative overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-8 text-center text-white relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-16 h-16 border-2 border-white/30 rounded-full"></div>
              <div className="absolute bottom-6 right-12 w-12 h-12 border-2 border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-8 h-8 border border-white/20 rounded-full"></div>
              <Sparkles className="absolute top-8 right-1/4 w-6 h-6 text-white/30" />
              <Sparkles className="absolute bottom-8 left-1/3 w-4 h-4 text-white/20" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Star className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-sm font-semibold">
                  Limited Time Offer
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Special Weekend Offers!
              </h3>

              <p className="text-emerald-100 mb-6 text-lg">
                Get up to 20% off on all fresh produce and daily essentials
              </p>

              <Link
                href="/shop?offer=weekend"
                className="banner-button bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold shadow-lg backdrop-blur-sm border border-white/20 inline-flex items-center group"
              >
                Shop Weekend Deals
                <ArrowRight className="button-arrow w-5 h-5 ml-2 transition-transform duration-300" />
              </Link>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="floating-star absolute top-12 left-16 w-3 h-3 bg-white/20 rounded-full"></div>
                <div className="floating-star absolute bottom-16 right-20 w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="floating-star absolute top-1/3 right-1/4 w-4 h-4 bg-white/15 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Banner shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-500/20 rounded-2xl blur-xl transform translate-y-2 -z-10"></div>
        </div>

        {/* Additional promotional section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="promo-card bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Fresh Daily</h4>
            <p className="text-sm text-gray-600">
              New stock arrives every morning
            </p>
          </div>

          <div className="promo-card bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Local Sourced</h4>
            <p className="text-sm text-gray-600">
              Supporting local farmers & vendors
            </p>
          </div>

          <div className="promo-card bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Quality Promise
            </h4>
            <p className="text-sm text-gray-600">
              100% satisfaction guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
