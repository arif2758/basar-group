"use client";

import React, { useRef } from "react";
import { Search, Filter, BookOpen, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    { value: "all", label: "All Books", color: "text-gray-600" },
    { value: "available", label: "Available", color: "text-emerald-600" },
    { value: "borrowed", label: "Currently Borrowed", color: "text-amber-600" },
  ];

  useGSAP(
    () => {
      // Entrance animations
      gsap.fromTo(
        ".search-container",
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Hover effects
      gsap.utils.toArray<HTMLElement>(".hover-lift").forEach((el) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(el, { y: -2, scale: 1.02, duration: 0.3, ease: "power2.out" });

        el.addEventListener("mouseenter", () => tl.play());
        el.addEventListener("mouseleave", () => tl.reverse());
      });

      // Focus animations
      gsap.utils.toArray<HTMLElement>(".focus-scale").forEach((el) => {
        const tl = gsap.timeline({ paused: true });
        tl.to(el, {
          scale: 1.02,
          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
          duration: 0.3,
        });

        el.addEventListener("focus", () => tl.play());
        el.addEventListener("blur", () => tl.reverse());
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="search-container bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-gray-100/50"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Enhanced Search */}
        <div className="flex-1 relative group">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Search by title, author, or donor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus-scale w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white text-lg"
          />
        </div>

        {/* Enhanced Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="hover-lift focus-scale appearance-none bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl px-6 py-4 pr-12 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-semibold text-gray-700 min-w-[200px]"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <BookOpen className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* Enhanced Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="hover-lift focus-scale appearance-none bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl px-6 py-4 pr-12 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 font-semibold text-gray-700 min-w-[180px]"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <Filter className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* Enhanced Filter Button */}
        <button className="hover-lift bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-lg border border-blue-500/20">
          <Filter className="w-5 h-5" />
          <span>Apply Filters</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
