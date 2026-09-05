"use client";

import { useState, useRef } from "react";
import {
  Star,
  Plus,
  Heart,
  ShoppingBag,
  Zap,
  TrendingUp,
  Award,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

type StockLevel = "high" | "medium" | "low";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  stockLevel: StockLevel;
}

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 80,
      originalPrice: 100,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 2,
      name: "Premium Basmati Rice",
      price: 750,
      originalPrice: 850,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/33875/pexels-photo-33875.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Rice & Grains",
      unit: "per 5kg",
      inStock: true,
      stockLevel: "medium",
    },
    {
      id: 3,
      name: "Fresh Milk",
      price: 60,
      originalPrice: 70,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Dairy",
      unit: "per liter",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 4,
      name: "Green Bananas",
      price: 40,
      originalPrice: 50,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fruits",
      unit: "per dozen",
      inStock: true,
      stockLevel: "low",
    },
    {
      id: 5,
      name: "Fresh Chicken",
      price: 320,
      originalPrice: 350,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meat",
      unit: "per kg",
      inStock: true,
      stockLevel: "medium",
    },
    {
      id: 6,
      name: "Mixed Vegetables",
      price: 120,
      originalPrice: 150,
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Background floating elements
      gsap.to(".floating-bg", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(8, 12)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Header animation with magnetic effect
      gsap.fromTo(
        ".section-header",
        {
          opacity: 0,
          y: 60,
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
          scrollTrigger: {
            trigger: ".section-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Product cards with advanced stagger
      gsap.fromTo(
        ".product-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 1.2,
            grid: "auto",
            from: "random",
          },
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup advanced hover interactions
      setupAdvancedHovers();

      // Continuous floating animation for decorative elements
      gsap.to(".sparkle", {
        y: "random(-10, 10)",
        rotation: "random(0, 360)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  const setupAdvancedHovers = () => {
    gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
      const image = card.querySelector(".product-image");
      const overlay = card.querySelector(".card-overlay");
      const price = card.querySelector(".price-section");
      const button = card.querySelector(".add-btn");
      const wishBtn = card.querySelector(".wish-btn");
      const badge = card.querySelector(".discount-badge");
      const glow = card.querySelector(".card-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -12,
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)",
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
            scale: 1.1,
            rotation: 2,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          overlay,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          button,
          {
            backgroundColor: "#047857",
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          badge,
          {
            scale: 1.15,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          price,
          {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());

      // Wishlist button special animation
      if (wishBtn) {
        const wishTl = gsap.timeline({ paused: true });
        wishTl
          .to(wishBtn, {
            scale: 1.2,
            rotation: 15,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
          .to(
            wishBtn,
            {
              boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
              duration: 0.2,
            },
            "-=0.3"
          );

        wishBtn.addEventListener("mouseenter", () => wishTl.play());
        wishBtn.addEventListener("mouseleave", () => wishTl.reverse());
      }
    });
  };

  const animateAddToCart = (productId: number) => {
    const card = document.querySelector(`[data-product="${productId}"]`);
    const button = card?.querySelector(".add-btn");
    const icon = card?.querySelector(".add-icon");

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
            rotation: 180,
            scale: 1.2,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.05"
        )
        .to(
          button,
          {
            scale: 1.05,
            backgroundColor: "#10b981",
            boxShadow: "0 8px 25px rgba(16, 185, 129, 0.4)",
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        )
        .to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out",
        });

      // Reset after 2 seconds
      gsap.delayedCall(2, () => {
        gsap.to(button, {
          backgroundColor: "#059669",
          boxShadow: "none",
          duration: 0.3,
        });
        gsap.to(icon, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
        });
      });
    }
  };

  const animateWishlist = (productId: number, isAdded: boolean) => {
    const wishBtn = document.querySelector(`[data-wish="${productId}"]`);

    if (wishBtn) {
      const tl = gsap.timeline();

      if (isAdded) {
        tl.to(wishBtn, {
          scale: 1.3,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(1.7)",
        }).to(wishBtn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        tl.to(wishBtn, {
          scale: 0.8,
          rotation: -180,
          duration: 0.3,
          ease: "power2.out",
        }).to(wishBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      }
    }
  };

  const toggleWishlist = (productId: number) => {
    const isAdded = !wishlist.includes(productId);
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    animateWishlist(productId, isAdded);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    animateAddToCart(product.id);
  };

  const getStockConfig = (level: StockLevel) => {
    switch (level) {
      case "high":
        return {
          text: "In Stock",
          color:
            "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-200",
          dot: "bg-emerald-500",
        };
      case "medium":
        return {
          text: "Few Left",
          color:
            "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-200",
          dot: "bg-amber-500",
        };
      case "low":
        return {
          text: "Low Stock",
          color:
            "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border border-red-200",
          dot: "bg-red-500",
        };
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-bg absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-xl"></div>
        <div className="floating-bg absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        <div className="floating-bg absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-xl"></div>

        <div className="sparkle absolute top-32 right-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"></div>
        <div className="sparkle absolute bottom-1/3 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-40"></div>
        <div className="sparkle absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="section-header text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-emerald-200/50 backdrop-blur-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Featured Products
            <Award className="w-4 h-4 ml-2" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Handpicked
            </span>{" "}
            <span className="relative">
              Fresh Products
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-30"></div>
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Discover our carefully curated selection of premium products with
            unbeatable prices,
            <span className="text-emerald-600 font-semibold">
              {" "}
              delivered fresh to your doorstep
            </span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {products.map((product) => {
            const stockConfig = getStockConfig(product.stockLevel);
            const discount = Math.round(
              (1 - product.price / product.originalPrice) * 100
            );

            return (
              <div
                key={product.id}
                data-product={product.id}
                className="product-card relative bg-white rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Card Glow Effect */}
                <div className="card-glow absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="product-image object-cover transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16.66vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-all duration-500"></div>

                    {/* Wishlist Button */}
                    <button
                      data-wish={product.id}
                      onClick={() => toggleWishlist(product.id)}
                      className={`wish-btn absolute top-4 right-4 p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        wishlist.includes(product.id)
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 shadow-lg shadow-red-500/25"
                          : "bg-white/90 text-gray-600 border-white/50 hover:bg-white hover:text-red-500 shadow-lg"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          wishlist.includes(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="discount-badge absolute top-4 left-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20">
                        <Zap className="w-3 h-3 inline mr-1" />
                        {discount}% OFF
                      </div>
                    )}

                    {/* Stock Status */}
                    <div
                      className={`absolute bottom-4 left-4 px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md ${stockConfig.color}`}
                    >
                      <div
                        className={`w-2 h-2 ${stockConfig.dot} rounded-full inline-block mr-2`}
                      ></div>
                      {stockConfig.text}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-bold bg-gray-50 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight group-hover:text-emerald-600 transition-colors duration-300">
                      {product.name}
                    </h3>

                    {/* Price Section */}
                    <div className="price-section flex items-center justify-between mb-5">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-gray-900">
                          ৳{product.price}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through font-medium">
                            ৳{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-2 py-1 rounded-lg">
                        {product.unit}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="add-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95 border border-emerald-500/20"
                    >
                      <Plus className="add-icon w-5 h-5 transition-transform duration-300" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mb-16">
          <button className="group bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 inline-flex items-center space-x-3 shadow-2xl hover:shadow-emerald-500/25 hover:-translate-y-2 border border-emerald-500/20">
            <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg">View All Products</span>
            <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              number: "500+",
              label: "Fresh Products",
              icon: "🥬",
              color: "from-emerald-500 to-green-500",
            },
            {
              number: "24/7",
              label: "Delivery Service",
              icon: "🚚",
              color: "from-blue-500 to-cyan-500",
            },
            {
              number: "98%",
              label: "Customer Satisfaction",
              icon: "⭐",
              color: "from-amber-500 to-orange-500",
            },
            {
              number: "5K+",
              label: "Happy Customers",
              icon: "❤️",
              color: "from-pink-500 to-red-500",
            },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl text-white text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          {[
            "Fresh Daily",
            "Local Sourced",
            "Quality Promise",
            "Fast Delivery",
          ].map((trust, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-500"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-sm font-medium">{trust}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
