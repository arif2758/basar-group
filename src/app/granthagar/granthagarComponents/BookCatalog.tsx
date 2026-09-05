"use client";
import React, { useRef, useState } from 'react';
import { BookOpen, Sparkles, Star, TrendingUp } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import BookGrid from './BookGrid';

import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const BookCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    // Floating background elements
    gsap.to(".float", {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Header animation
    gsap.fromTo(".header-content", 
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    );

    // Stats animation
    gsap.fromTo(".stat-item", 
      { opacity: 0, scale: 0, rotation: -10 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "back.out(1.7)",
        delay: 0.5
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-200">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Sparkles className="float absolute top-32 right-1/4 w-8 h-8 text-emerald-400/10" />
        <Star className="float absolute bottom-1/3 left-1/4 w-6 h-6 text-blue-400/10" />
        <BookOpen className="float absolute top-2/3 right-1/3 w-7 h-7 text-emerald-400/10" />
        <TrendingUp className="float absolute top-1/4 left-1/2 w-5 h-5 text-amber-400/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Enhanced Header */}
        <div className="header-content mb-12 text-center">
          <div className="inline-flex items-center bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border border-slate-200 dark:border-[#303030] shadow-sm">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" />
            Digital Library
            <Sparkles className="w-3.5 h-3.5 ml-1.5" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Book Catalog
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Explore our collection of over{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">500+ books</span> donated by our amazing community.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { icon: "📚", number: "500+", label: "Total Books" },
              { icon: "👥", number: "150+", label: "Active Donors" },
              { icon: "⭐", number: "4.8", label: "Avg Rating" },
              { icon: "🔄", number: "200+", label: "Books Exchanged" }
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center bg-white dark:bg-[#141414] rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200">
                <div className="text-2xl mb-1.5">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{stat.number}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <BookGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
        />
      </div>
    </div>
  );
};

export default BookCatalog;