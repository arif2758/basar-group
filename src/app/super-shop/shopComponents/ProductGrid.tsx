"use client";

import { useState, useRef } from "react";
import {
  Star,
  Plus,
  Heart,
  Eye,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  stockLevel: "high" | "medium" | "low";
};

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const containerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 80,
      originalPrice: 100,
      rating: 4.8,
      reviews: 124,
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
      reviews: 89,
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
      reviews: 203,
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
      reviews: 67,
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
      reviews: 145,
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
      reviews: 78,
      image:
        "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 11,
      name: "Fresh Carrots",
      price: 45,
      originalPrice: 55,
      rating: 4.4,
      reviews: 92,
      image:
        "https://images.pexels.com/photos/1508601/pexels-photo-1508601.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 12,
      name: "Red Apples",
      price: 180,
      originalPrice: 200,
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fruits",
      unit: "per kg",
      inStock: true,
      stockLevel: "medium",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Sort controls animation
      gsap.fromTo(
        ".sort-controls",
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      // Product cards staggered entrance
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
            from: "start",
          },
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupProductHovers();

      // Floating sparkles
      gsap.to(".product-sparkle", {
        y: "random(-5, 5)",
        rotation: "random(0, 360)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  const setupProductHovers = () => {
    gsap.utils.toArray<HTMLElement>(".product-card").forEach((card) => {
      const image = card.querySelector(".product-image");
      const actions = card.querySelector(".product-actions");
      const badge = card.querySelector(".discount-badge");
      const button = card.querySelector(".add-to-cart-btn");
      const glow = card.querySelector(".product-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -15,
          scale: 1.03,
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
          actions,
          {
            opacity: 1,
            y: 0,
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
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Sort dropdown hover
    const sortSelect = containerRef.current?.querySelector(".sort-select");
    if (sortSelect) {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(sortSelect, {
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      sortSelect.addEventListener("mouseenter", () => hoverTl.play());
      sortSelect.addEventListener("mouseleave", () => hoverTl.reverse());
    }
  };

  const animateAddToCart = (productId: number) => {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    const button = card?.querySelector(".add-to-cart-btn");
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
            scale: 1.3,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.05"
        )
        .to(
          button,
          {
            scale: 1.05,
            backgroundColor: "#10b981",
            boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
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

  const animateWishlistToggle = (productId: number, isAdded: boolean) => {
    const wishBtn = document.querySelector(`[data-wishlist-id="${productId}"]`);

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
    animateWishlistToggle(productId, isAdded);
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

  const getStockConfig = (level: "high" | "medium" | "low") => {
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
    <div ref={containerRef}>
      {/* Enhanced Sort and Filter Controls */}
      <div className="sort-controls flex items-center justify-between mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <p className="text-gray-700 font-semibold">
              Showing{" "}
              <span className="text-emerald-600 font-bold">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>
          <Sparkles className="product-sparkle w-4 h-4 text-yellow-400" />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-semibold text-gray-700"
        >
          <option value="featured">✨ Featured</option>
          <option value="price-low">💰 Price: Low to High</option>
          <option value="price-high">💎 Price: High to Low</option>
          <option value="rating">⭐ Highest Rated</option>
          <option value="newest">🆕 Newest</option>
        </select>
      </div>

      {/* Enhanced Product Grid */}
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const stockConfig = getStockConfig(product.stockLevel);
          const discount = Math.round(
            (1 - product.price / product.originalPrice) * 100
          );

          return (
            <div
              key={product.id}
              data-product-id={product.id}
              className="product-card relative bg-white rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Card Glow Effect */}
              <div className="product-glow absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={192}
                      className="product-image w-full h-full object-cover transition-all duration-700 cursor-pointer"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Action Buttons */}
                  <div className="product-actions absolute top-4 right-4 flex flex-col space-y-3 opacity-0 translate-y-2 transition-all duration-300">
                    <button
                      data-wishlist-id={product.id}
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
                        wishlist.includes(product.id)
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 shadow-lg shadow-red-500/25"
                          : "bg-white/90 text-gray-600 border-white/50 hover:bg-white hover:text-red-500 shadow-lg"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>

                    <Link href={`/product/${product.id}`}>
                      <button className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-600 hover:text-emerald-600 border border-white/50 hover:bg-white transition-all duration-300 shadow-lg">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {discount > 0 && (
                      <div className="discount-badge bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
                        <Zap className="w-3 h-3 inline mr-1" />
                        {discount}% OFF
                      </div>
                    )}

                    <div
                      className={`px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md ${stockConfig.color}`}
                    >
                      <div
                        className={`w-2 h-2 ${stockConfig.dot} rounded-full inline-block mr-2`}
                      ></div>
                      {stockConfig.text}
                    </div>
                  </div>

                  {/* Decorative Sparkle */}
                  <Sparkles className="product-sparkle absolute bottom-4 right-4 w-4 h-4 text-white/30" />
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
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight group-hover:text-emerald-600 transition-colors duration-300 cursor-pointer line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-amber-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-gray-900">
                        ৳{product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through font-semibold">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-3 py-1 rounded-lg">
                      {product.unit}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg border border-emerald-500/20 group"
                  >
                    <Plus className="add-icon w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-lg">Add to Cart</span>
                  </button>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Section */}
      <div className="text-center mt-16">
        <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span>Load More Products</span>
          <div className="w-2 h-2 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
        {[
          "🔒 Secure Shopping",
          "🚚 Fast Delivery",
          "💯 Quality Guaranteed",
          "⭐ Top Rated Products",
        ].map((indicator, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-sm font-medium"
          >
            <span>{indicator}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
