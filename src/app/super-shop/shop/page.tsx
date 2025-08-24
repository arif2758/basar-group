"use client";

import { useState, useRef } from "react";
import {
  Filter,
  X,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
  Search,
} from "lucide-react";
import { CartProvider } from "../contexts/CartContext";
import FilterSidebar from "../shopComponents/FilterSidebar";
import ProductGrid from "../shopComponents/ProductGrid";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Floating background elements with more dynamic movement
      gsap.to(".shop-bg-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-360, 360)",
        duration: "random(6, 10)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      // Enhanced header animation with stagger
      gsap.fromTo(
        ".shop-header",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationX: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Content sections with scroll trigger
      gsap.fromTo(
        ".shop-content",
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".shop-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup advanced hover interactions
      setupShopHovers();

      // Enhanced sparkle animations with random movement
      gsap.to(".sparkle-shop", {
        y: "random(-15, 15)",
        x: "random(-10, 10)",
        rotation: "random(0, 360)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Floating filter button animation
      gsap.to(".filter-btn", {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: containerRef }
  );

  const setupShopHovers = () => {
    // Filter button advanced hover
    const filterBtn = containerRef.current?.querySelector(".filter-btn");
    if (filterBtn) {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(filterBtn, {
          scale: 1.1,
          y: -8,
          boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          filterBtn.querySelector(".filter-icon"),
          {
            rotation: 180,
            scale: 1.2,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      filterBtn.addEventListener("mouseenter", () => hoverTl.play());
      filterBtn.addEventListener("mouseleave", () => hoverTl.reverse());
    }

    // Search bar hover effect
    const searchBar = containerRef.current?.querySelector(".search-bar");
    if (searchBar) {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(searchBar, {
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(16, 185, 129, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      searchBar.addEventListener("mouseenter", () => hoverTl.play());
      searchBar.addEventListener("mouseleave", () => hoverTl.reverse());
    }
  };

  const toggleFilter = () => {
    if (!isFilterOpen) {
      setIsFilterOpen(true);

      // Animate filter panel entrance
      gsap.fromTo(
        ".filter-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        ".filter-panel",
        {
          x: "-100%",
          scale: 0.9,
          rotationY: -15,
        },
        {
          x: "0%",
          scale: 1,
          rotationY: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    } else {
      closeFilter();
    }
  };

  const closeFilter = () => {
    // Animate filter panel exit
    gsap.to(".filter-panel", {
      x: "-100%",
      scale: 0.9,
      rotationY: -15,
      duration: 0.4,
      ease: "power2.in",
    });

    gsap.to(".filter-overlay", {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.in",
      onComplete: () => setIsFilterOpen(false),
    });
  };

  return (
    <CartProvider>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden"
      >
        {/* Enhanced Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="shop-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
          <div className="shop-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
          <div className="shop-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
          <div className="shop-bg-element absolute top-1/4 right-1/3 w-24 h-24 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"></div>

          <Sparkles className="sparkle-shop absolute top-32 right-1/4 w-6 h-6 text-emerald-300/30" />
          <Star className="sparkle-shop absolute bottom-1/3 left-1/4 w-5 h-5 text-blue-300/25" />
          <Zap className="sparkle-shop absolute top-2/3 right-1/3 w-4 h-4 text-purple-300/35" />
          <Sparkles className="sparkle-shop absolute bottom-1/4 right-1/4 w-3 h-3 text-pink-300/40" />
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Enhanced Header with Search */}
          <div className="shop-header mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-bold mb-8 border border-emerald-200/50 backdrop-blur-sm">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Premium Shopping Experience
                <TrendingUp className="w-4 h-4 ml-2" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Shop All
                </span>{" "}
                <span className="relative">
                  Products
                  <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"></div>
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium mb-8">
                Fresh groceries and daily essentials delivered to your doorstep
                with
                <span className="text-emerald-600 font-bold">
                  {" "}
                  love, care, and community support
                </span>
              </p>

              {/* Enhanced Search Bar */}
              <div className="search-bar max-w-2xl mx-auto relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for fresh products, brands, or categories..."
                    className="w-full px-6 py-4 pl-14 pr-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg"
                  />
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: "🥬", number: "500+", label: "Fresh Products" },
                { icon: "🚚", number: "2-4h", label: "Fast Delivery" },
                { icon: "⭐", number: "4.9", label: "Customer Rating" },
                { icon: "💯", number: "100%", label: "Quality Promise" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 shadow-lg"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shop-content flex gap-8">
            {/* Enhanced Desktop Filter Sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-8">
                <FilterSidebar />
              </div>
            </div>

            {/* Enhanced Mobile Filter Button */}
            <button
              onClick={toggleFilter}
              className="filter-btn lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center space-x-3 border border-emerald-500/20 backdrop-blur-sm"
            >
              <Filter className="filter-icon w-6 h-6 transition-transform duration-300" />
              <span className="font-bold text-lg">Filters</span>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </button>

            {/* Enhanced Mobile Filter Overlay */}
            {isFilterOpen && (
              <div className="filter-overlay lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50">
                <div className="filter-panel bg-white h-full w-80 overflow-y-auto shadow-2xl border-r border-gray-200">
                  <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-black text-gray-900 flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-3">
                          <Filter className="w-5 h-5 text-white" />
                        </div>
                        Filters
                      </h2>
                      <button
                        onClick={closeFilter}
                        className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 group"
                      >
                        <X className="w-6 h-6 text-gray-600 group-hover:text-gray-900 group-hover:rotate-90 transition-all duration-200" />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Find exactly what you&apos;re looking for
                    </p>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid />/
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
            {[
              "🔒 Secure Shopping",
              "🚚 Fast Delivery",
              "💯 Quality Guaranteed",
              "🤝 Community Supported",
            ].map((indicator, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-sm font-medium"
              >
                <span>{indicator}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
