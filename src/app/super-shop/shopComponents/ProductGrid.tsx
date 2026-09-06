"use client";

import { useState, useRef } from "react";
import {
  Star,
  Plus,
  Check,
  Heart,
  Eye,
  Sparkles,
  TrendingUp,
  PackageX,
  RotateCcw,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  categorySlug: string;
  unit: string;
  inStock: boolean;
  stockLevel: "high" | "medium" | "low";
  badge?: string;
};

interface ProductGridProps {
  products: Product[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  onResetFilters?: () => void;
}

export default function ProductGrid({
  products,
  sortBy,
  onSortChange,
  onResetFilters,
}: ProductGridProps) {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();

  useGSAP(
    () => {
      gsap.fromTo(
        ".shop-prod-card",
        { opacity: 0, y: 20, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [products, sortBy] }
  );

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
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

  const getStockConfig = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high":
        return {
          text: "স্টকে আছে",
          dot: "bg-emerald-500",
          textColor: "text-emerald-600 dark:text-emerald-400",
        };
      case "medium":
        return {
          text: "সীমিত স্টক",
          dot: "bg-amber-500",
          textColor: "text-amber-600 dark:text-amber-400",
        };
      case "low":
        return {
          text: "শেষের দিকে",
          dot: "bg-rose-500",
          textColor: "text-rose-600 dark:text-rose-400",
        };
    }
  };

  return (
    <div ref={containerRef}>
      {/* Sort and Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 sm:p-5 bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            মোট{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {products.length}
            </span>{" "}
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            সাজান:
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 focus:border-emerald-500 outline-none transition-colors"
          >
            <option value="featured">✨ সেরা বাছাই</option>
            <option value="price-low">💰 মূল্য: কম থেকে বেশি</option>
            <option value="price-high">💎 মূল্য: বেশি থেকে কম</option>
            <option value="rating">⭐ সর্বোচ্চ রেটিং</option>
            <option value="discount">🔥 সর্বোচ্চ মূল্যছাড়</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-12 text-center my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-[#1f1f1f] flex items-center justify-center mx-auto mb-4 text-slate-400">
            <PackageX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
            আপনার ফিল্টার বা সার্চ অনুযায়ী কোনো পণ্য খুঁজে পাওয়া যায়নি।
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>সকল ফিল্টার মুছুন</span>
            </button>
          )}
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => {
            const stockConfig = getStockConfig(product.stockLevel);
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="shop-prod-card group bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-emerald-950/20 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-[#1a1a1a]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {discount > 0 && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shadow-md shadow-emerald-900/20">
                          -{discount}% ছাড়
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
                      aria-label="উইশলিস্টে সংরক্ষণ করুন"
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

                  {/* Product Details */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Stock Row */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-2">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${stockConfig.dot}`} />
                        <span className={stockConfig.textColor}>
                          {stockConfig.text}
                        </span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h3>

                    {/* Unit & Reviews */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                      <span>একক: {product.unit}</span>
                      <div className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({product.reviews})
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
                        <span>যুক্ত হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>যোগ করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
