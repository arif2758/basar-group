"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  Tag,
  Check,
} from "lucide-react";

interface FilterSidebarProps {
  categories: { name: string; slug: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  selectedPriceRange: string;
  onSelectPriceRange: (range: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  minRating: number;
  onSelectRating: (rating: number) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  inStockOnly,
  onToggleInStock,
  minRating,
  onSelectRating,
  onResetFilters,
  isFiltered,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const priceRanges = [
    { id: "all", label: "সকল মূল্য" },
    { id: "under-50", label: "৳50 এর নিচে" },
    { id: "50-100", label: "৳50 - ৳100" },
    { id: "100-250", label: "৳100 - ৳250" },
    { id: "over-250", label: "৳250 এর বেশি" },
  ];

  const ratingOptions = [
    { value: 0, label: "সকল রেটিং" },
    { value: 4.8, label: "4.8★ ও তদূর্ধ্ব" },
    { value: 4.5, label: "4.5★ ও তদূর্ধ্ব" },
  ];

  return (
    <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-sm transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#262626] mb-5">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            পণ্য ফিল্টার
          </h2>
        </div>

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিসেট</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#262626]">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-bold text-sm text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>বিভাগসমূহ</span>
          {openSections.category ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.category && (
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            <button
              onClick={() => onSelectCategory("all")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === "all" || !selectedCategory
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>সকল বিভাগ</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-[#262626]">
                {categories.reduce((acc, curr) => acc + curr.count, 0)}
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.slug}
                  onClick={() => onSelectCategory(cat.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-[#262626] ml-2">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#262626]">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-bold text-sm text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>মূল্য পরিসীমা</span>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.price && (
          <div className="space-y-1.5">
            {priceRanges.map((range) => {
              const isSelected = selectedPriceRange === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => onSelectPriceRange(range.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{range.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6 pb-6 border-b border-slate-100 dark:border-[#262626]">
        <button
          onClick={() => toggleSection("availability")}
          className="flex items-center justify-between w-full text-left font-bold text-sm text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>প্রাপ্যতা</span>
          {openSections.availability ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.availability && (
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={onToggleInStock}
                className="w-4 h-4 rounded text-emerald-600 border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-emerald-500"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                শুধুমাত্র স্টকে থাকা পণ্য
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Customer Rating */}
      <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left font-bold text-sm text-slate-900 dark:text-white mb-3 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <span>গ্রাহক রেটিং</span>
          {openSections.rating ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {openSections.rating && (
          <div className="space-y-1.5">
            {ratingOptions.map((opt) => {
              const isSelected = minRating === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onSelectRating(opt.value)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
