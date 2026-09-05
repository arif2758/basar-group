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
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




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

  useScrollAnimation();
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-16 bg-slate-50 dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] relative overflow-hidden transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-block mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Explore Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Find everything you need from fresh produce to daily essentials, all
            sourced locally with love and care.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/super-shop/shop?category=${category.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              className="group"
            >
              <div className="category-card bg-white dark:bg-[#141414] rounded-xl p-5 text-center border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] relative overflow-hidden transition-all duration-200 cursor-pointer flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-50 dark:bg-[#1f1f1f] rounded-xl flex items-center justify-center mb-3 border border-slate-200 dark:border-[#303030] group-hover:scale-105 transition-transform">
                  <category.icon className="category-icon w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h3 className="category-title text-sm font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>

                <p className="category-count text-xs text-slate-500 dark:text-slate-400">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Special offers banner */}
        <div ref={bannerRef} className="mt-14 relative overflow-hidden">
          <div className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl p-8 sm:p-10 text-center text-white relative shadow-sm">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-amber-500/10 rounded-full px-3 py-1 mb-3 text-amber-400 text-xs font-medium border border-amber-500/20">
                <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                <span>Limited Time Offer</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                Special Weekend Offers!
              </h3>

              <p className="text-slate-300 dark:text-slate-400 mb-6 text-sm sm:text-base max-w-xl mx-auto">
                Get up to 20% off on all fresh produce and daily essentials.
              </p>

              <Link
                href="/super-shop/shop?offer=weekend"
                className="banner-button inline-flex items-center bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
              >
                <span>Shop Weekend Deals</span>
                <ArrowRight className="button-arrow w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Additional promotional section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="promo-card bg-white dark:bg-[#141414] rounded-xl p-5 text-center border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">Fresh Daily</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              New stock arrives every morning
            </p>
          </div>

          <div className="promo-card bg-white dark:bg-[#141414] rounded-xl p-5 text-center border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Home className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">Local Sourced</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supporting local farmers & vendors
            </p>
          </div>

          <div className="promo-card bg-white dark:bg-[#141414] rounded-xl p-5 text-center border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm">
              Quality Promise
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              100% satisfaction guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
