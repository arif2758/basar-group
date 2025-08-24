"use client";

import { useState, useRef } from "react";
import { Zap, Timer, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FlashSaleProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  unit: string;
  sold: number;
  total: number;
};

export default function FlashSale() {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  const flashSaleProducts: FlashSaleProduct[] = [
    {
      id: 7,
      name: "Fresh Potatoes",
      price: 30,
      originalPrice: 45,
      image:
        "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per kg",
      sold: 45,
      total: 100,
    },
    {
      id: 8,
      name: "Red Onions",
      price: 25,
      originalPrice: 35,
      image:
        "https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per kg",
      sold: 32,
      total: 80,
    },
    {
      id: 9,
      name: "Premium Eggs",
      price: 140,
      originalPrice: 180,
      image:
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per dozen",
      sold: 28,
      total: 60,
    },
    {
      id: 10,
      name: "Fresh Spinach",
      price: 20,
      originalPrice: 30,
      image:
        "https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per bunch",
      sold: 15,
      total: 40,
    },
  ];

  useGSAP(
    () => {
      // Countdown timer animation
      gsap.delayedCall(0, () => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev.seconds > 0) {
              return { ...prev, seconds: prev.seconds - 1 };
            } else if (prev.minutes > 0) {
              return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            } else if (prev.hours > 0) {
              return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
            }
            return prev;
          });
        }, 1000);

        return () => clearInterval(timer);
      });

      // Floating background elements
      gsap.to(".flash-bg-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-360, 360)",
        duration: "random(6, 10)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Header animation with Zap effect
      gsap.fromTo(
        ".flash-header",
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
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".flash-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Timer boxes animation
      gsap.fromTo(
        ".timer-box",
        {
          opacity: 0,
          scale: 0,
          rotationY: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".timer-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Product cards staggered entrance
      gsap.fromTo(
        ".flash-product-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationX: -20,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".flash-products-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupFlashHovers();

      // Continuous pulse animation for Zap icons
      gsap.to(".Zap-icon", {
        scale: 1.2,
        duration: 0.8,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      // Timer number flip animation
      gsap.to(".timer-number", {
        rotationX: 360,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  const setupFlashHovers = () => {
    gsap.utils.toArray<HTMLElement>(".flash-product-card").forEach((card) => {
      const image = card.querySelector(".flash-product-image");
      const badge = card.querySelector(".flash-discount-badge");
      const button = card.querySelector(".flash-grab-btn");
      const progress = card.querySelector(".flash-progress-bar");
      const glow = card.querySelector(".flash-card-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -15,
          scale: 1.03,
          boxShadow: "0 30px 60px rgba(255, 87, 34, 0.3)",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          glow,
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          image,
          {
            scale: 1.15,
            rotation: 3,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          badge,
          {
            scale: 1.2,
            rotation: -5,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .to(
          button,
          {
            backgroundColor: "#ea580c",
            scale: 1.05,
            y: -3,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          progress,
          {
            scaleX: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Timer box hover effects
    gsap.utils.toArray<HTMLElement>(".timer-box").forEach((box) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(box, {
        scale: 1.1,
        rotationY: 10,
        boxShadow: "0 15px 30px rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });

      box.addEventListener("mouseenter", () => hoverTl.play());
      box.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  const animateAddToCart = (productId: number) => {
    const card = document.querySelector(`[data-flash-product="${productId}"]`);
    const button = card?.querySelector(".flash-grab-btn");
    const icon = card?.querySelector(".flash-grab-icon");

    if (button && icon) {
      const tl = gsap.timeline();

      tl.to(button, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.out",
      })
        .to(
          icon,
          {
            rotation: 360,
            scale: 1.3,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.05"
        )
        .to(
          button,
          {
            scale: 1.1,
            backgroundColor: "#16a34a",
            boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

      // Success feedback
      gsap.to(button.querySelector("span"), {
        innerHTML: "Added!",
        duration: 0.1,
      });

      // Reset after 2 seconds
      gsap.delayedCall(2, () => {
        gsap.to(button, {
          backgroundColor: "#f97316",
          boxShadow: "none",
          duration: 0.3,
        });
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
        });
        gsap.to(button.querySelector("span"), {
          innerHTML: "Grab Now",
          duration: 0.1,
        });
      });
    }
  };

  const handleAddToCart = (product: FlashSaleProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    animateAddToCart(product.id);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="flash-bg-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>
        <div className="flash-bg-element absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-xl"></div>
        <div className="flash-bg-element absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl"></div>

        <Zap className="flash-bg-element absolute top-32 right-1/4 w-8 h-8 text-yellow-300/30" />
        <Zap className="flash-bg-element absolute bottom-1/3 left-1/4 w-6 h-6 text-yellow-300/40" />
        <Zap className="flash-bg-element absolute top-2/3 right-1/3 w-7 h-7 text-orange-300/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="flash-header text-center text-white mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mb-6">
            <Zap className="Zap-icon w-6 h-6 mr-3 text-yellow-300" />
            <span className="font-bold text-lg">Limited Time Only</span>
            <Zap className="Zap-icon w-6 h-6 ml-3 text-yellow-300" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 bg-clip-text text-transparent">
              Flash Sale!
            </span>
          </h2>

          <p className="text-xl sm:text-2xl mb-8 text-white/90 font-medium max-w-3xl mx-auto">
            Unbeatable prices on fresh products -
            <span className="text-yellow-300 font-bold">
              {" "}
              grab them before they&apos;re gone!
            </span>
          </p>

          {/* Enhanced Countdown Timer */}
          <div className="timer-container flex justify-center space-x-4 sm:space-x-6 mb-12">
            {[
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" },
            ].map((time, index) => (
              <div key={index} className="timer-box relative">
                <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-6 text-center shadow-2xl">
                  <div className="timer-number text-3xl sm:text-4xl font-black text-white mb-2">
                    {String(time.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm sm:text-base text-white/80 font-semibold uppercase tracking-wider">
                    {time.label}
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Urgency Indicator */}
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-2xl">
            <Timer className="w-5 h-5 mr-2" />
            Hurry! Sale ends soon
            <Zap className="w-5 h-5 ml-2" />
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className="flash-products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {flashSaleProducts.map((product) => {
            const discount = Math.round(
              (1 - product.price / product.originalPrice) * 100
            );
            const soldPercentage = (product.sold / product.total) * 100;

            return (
              <div
                key={product.id}
                data-flash-product={product.id}
                className="flash-product-card relative bg-white rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Card Glow Effect */}
                <div className="flash-card-glow absolute -inset-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="flash-product-image object-cover transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Enhanced Discount Badge */}
                    <div className="flash-discount-badge absolute top-4 left-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg backdrop-blur-sm border border-white/20">
                      <Zap className="w-4 h-4 inline mr-1" />
                      {discount}% OFF
                    </div>

                    {/* Stock Urgency Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.total - product.sold} left!
                    </div>

                    {/* Hot Deal Indicator */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      <Zap className="w-3 h-3 inline mr-1" />
                      HOT DEAL
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-6">
                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight group-hover:text-orange-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-orange-600">
                          ৳{product.price}
                        </span>
                        <span className="text-lg text-gray-500 line-through font-semibold">
                          ৳{product.originalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-3 py-1 rounded-lg">
                        {product.unit}
                      </div>
                    </div>

                    {/* Enhanced Progress Section */}
                    <div className="mb-5">
                      <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-orange-600">
                          Sold: {product.sold}
                        </span>
                        <span className="text-gray-500">
                          Available: {product.total - product.sold}
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="flash-progress-bar bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 h-full rounded-full transition-all duration-500 relative overflow-hidden"
                          style={{ width: `${soldPercentage}%` }}
                        >
                          {/* Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                        </div>

                        {/* Progress Percentage */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-700">
                            {Math.round(soldPercentage)}% sold
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Grab Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flash-grab-btn w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl border border-orange-400/20 group"
                    >
                      <ShoppingCart className="flash-grab-icon w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-lg">Grab Now</span>
                      <Zap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center text-white mb-4">
              <Zap className="w-6 h-6 mr-2 text-yellow-300" />
              <span className="text-xl font-bold">
                Don&apos;t miss out on these amazing deals!
              </span>
              <Zap className="w-6 h-6 ml-2 text-yellow-300" />
            </div>

            <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 px-10 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-500/25 hover:-translate-y-2 border border-yellow-300/20">
              <span className="flex items-center space-x-3">
                <Timer className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Shop All Flash Deals</span>
                <Zap className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/70">
          {[
            "⚡ Lightning Fast Delivery",
            "🔥 Limited Stock",
            "💯 Best Prices Guaranteed",
            "⏰ Sale Ends Soon",
          ].map((trust, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm font-medium"
            >
              <span>{trust}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
