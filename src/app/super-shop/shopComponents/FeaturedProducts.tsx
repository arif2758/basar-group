"use client";

import { useState, useRef, useMemo } from "react";
import {
  Star,
  Plus,
  Check,
  Heart,
  ShoppingBag,
  Zap,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type StockLevel = "high" | "medium" | "low";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  stockLevel: StockLevel;
  badge?: string;
}

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Farm Fresh Tomatoes",
      price: 80,
      originalPrice: 100,
      rating: 4.8,
      reviewsCount: 42,
      image:
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Vegetables",
      unit: "1 kg",
      inStock: true,
      stockLevel: "high",
      badge: "Organic",
    },
    {
      id: 2,
      name: "Premium Kalijira Aromatic Rice",
      price: 150,
      originalPrice: 180,
      rating: 4.9,
      reviewsCount: 88,
      image:
        "https://images.pexels.com/photos/4110257/pexels-photo-4110257.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Rice & Grains",
      unit: "1 kg",
      inStock: true,
      stockLevel: "medium",
      badge: "Bestseller",
    },
    {
      id: 3,
      name: "Pure Farm Fresh Cow Milk",
      price: 85,
      originalPrice: 95,
      rating: 4.9,
      reviewsCount: 64,
      image:
        "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Dairy & Eggs",
      unit: "1 Liter",
      inStock: true,
      stockLevel: "high",
      badge: "Daily Fresh",
    },
    {
      id: 4,
      name: "Sweet Local Bananas (Sagor Kola)",
      price: 45,
      originalPrice: 55,
      rating: 4.7,
      reviewsCount: 31,
      image:
        "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fruits",
      unit: "per dozen",
      inStock: true,
      stockLevel: "low",
    },
    {
      id: 5,
      name: "Organic Farm Broiler Chicken",
      price: 260,
      originalPrice: 290,
      rating: 4.8,
      reviewsCount: 57,
      image:
        "https://images.pexels.com/photos/616838/pexels-photo-616838.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Meat & Poultry",
      unit: "1 kg (Dressed)",
      inStock: true,
      stockLevel: "medium",
      badge: "Halal Certified",
    },
    {
      id: 6,
      name: "Fresh Red Apples (Royal Gala)",
      price: 240,
      originalPrice: 280,
      rating: 4.9,
      reviewsCount: 73,
      image:
        "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fruits",
      unit: "1 kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 7,
      name: "Country Brown Eggs (Deshi Dim)",
      price: 155,
      originalPrice: 175,
      rating: 4.9,
      reviewsCount: 92,
      image:
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Dairy & Eggs",
      unit: "12 pcs",
      inStock: true,
      stockLevel: "high",
      badge: "Pure Deshi",
    },
    {
      id: 8,
      name: "Cold-Pressed Mustard Oil (Sorisha)",
      price: 280,
      originalPrice: 320,
      rating: 4.8,
      reviewsCount: 45,
      image:
        "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=600",
      category: "Rice & Grains",
      unit: "1 Liter",
      inStock: true,
      stockLevel: "medium",
      badge: "Ghānī-Pressed",
    },
  ];

  const categories = [
    "All",
    "Vegetables",
    "Dairy & Eggs",
    "Fruits",
    "Rice & Grains",
    "Meat & Poultry",
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  useScrollAnimation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".prod-card-anim",
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [selectedCategory] }
  );

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  const getStockBadge = (level: StockLevel) => {
    switch (level) {
      case "high":
        return {
          label: "In Stock",
          dotColor: "bg-emerald-500",
          textColor: "text-emerald-600 dark:text-emerald-400",
        };
      case "medium":
        return {
          label: "Few Left",
          dotColor: "bg-amber-500",
          textColor: "text-amber-600 dark:text-amber-400",
        };
      case "low":
        return {
          label: "Low Stock",
          dotColor: "bg-rose-500",
          textColor: "text-rose-600 dark:text-rose-400",
        };
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-slate-50/60 dark:bg-[#070b14] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Handpicked Daily Quality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Featured Products
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl font-normal">
              Direct from verified community farmers and suppliers at honest wholesale prices.
            </p>
          </div>

          {/* Direct Link */}
          <Link
            href="/super-shop/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {filteredProducts.map((product) => {
            const stock = getStockBadge(product.stockLevel);
            const discountPercent = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="prod-card-anim group bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-emerald-950/20 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-[#1a1a1a]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {discountPercent > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-md shadow-emerald-900/20">
                          -{discountPercent}% OFF
                        </span>
                      )}
                      {product.badge && (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-amber-300 text-[11px] font-bold border border-white/10">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Save to Wishlist"
                      className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
                        isWishlisted
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-110"
                          : "bg-white/80 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Stock Row */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${stock.dotColor}`} />
                        <span className={stock.textColor}>{stock.label}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>

                    {/* Unit & Rating */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span>Unit: {product.unit}</span>
                      <div className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Add to Cart */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 dark:border-[#262626] mt-2">
                  <div>
                    <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      ৳{product.price}
                    </div>
                    {product.originalPrice > product.price && (
                      <div className="text-xs text-slate-400 line-through">
                        ৳{product.originalPrice}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 ${
                      isAdded
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                        : "bg-slate-900 dark:bg-emerald-600/20 hover:bg-emerald-600 text-white dark:text-emerald-300 dark:hover:text-white border border-transparent dark:border-emerald-500/30 hover:border-transparent"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
