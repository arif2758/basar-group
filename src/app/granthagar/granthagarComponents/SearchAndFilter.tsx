"use client";

import React, { useRef } from "react";
import { Search, Filter, BookOpen, Sparkles } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { value: "all", label: "All Categories", icon: "📚" },
    { value: "fiction", label: "Fiction", icon: "📖" },
    { value: "non-fiction", label: "Non-Fiction", icon: "📰" },
    { value: "science", label: "Science & Technology", icon: "🔬" },
    { value: "history", label: "History", icon: "🏛️" },
    { value: "philosophy", label: "Philosophy", icon: "🤔" },
    { value: "self-help", label: "Self-Help", icon: "💪" },
    { value: "biography", label: "Biography", icon: "👤" },
    { value: "business", label: "Business", icon: "💼" },
  ];

  const statusOptions = [
    { value: "all", label: "All Books" },
    { value: "available", label: "Available" },
    { value: "borrowed", label: "Currently Borrowed" },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Entrance animations
      gsap.fromTo(
        ".search-container",
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="search-container bg-white dark:bg-[#141414] rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-4 sm:p-6 mb-8 border border-slate-200 dark:border-[#303030]"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Enhanced Search */}
        <div className="flex-1 relative group">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search by title, author, or donor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
        </div>

        {/* Enhanced Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-white dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#303030] rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors min-w-[190px]"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Enhanced Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="appearance-none bg-white dark:bg-[#1f1f1f] border border-slate-300 dark:border-[#303030] rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors min-w-[170px]"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
            <Filter className="w-4 h-4" />
          </div>
        </div>

        {/* Enhanced Filter Button */}
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm active:scale-[0.99]">
          <Filter className="w-4 h-4" />
          <span>Apply Filters</span>
          <Sparkles className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
