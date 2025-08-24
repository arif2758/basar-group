"use client";
import React, { useRef, useState } from 'react';
import {  BookOpen, Sparkles, Star, TrendingUp } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import BookGrid from './BookGrid';

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);


const BookCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Sparkles className="float absolute top-32 right-1/4 w-8 h-8 text-blue-300/20" />
        <Star className="float absolute bottom-1/3 left-1/4 w-6 h-6 text-purple-300/15" />
        <BookOpen className="float absolute top-2/3 right-1/3 w-7 h-7 text-emerald-300/20" />
        <TrendingUp className="float absolute top-1/4 left-1/2 w-5 h-5 text-amber-300/15" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Enhanced Header */}
        <div className="header-content mb-12 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-200/50 backdrop-blur-sm">
            <BookOpen className="w-4 h-4 mr-2" />
            Digital Library
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Book Catalog
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            Explore our collection of over 
            <span className="text-blue-600 font-bold"> 500+ books</span> donated by our amazing community
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {[
              { icon: "📚", number: "500+", label: "Total Books" },
              { icon: "👥", number: "150+", label: "Active Donors" },
              { icon: "⭐", number: "4.8", label: "Avg Rating" },
              { icon: "🔄", number: "200+", label: "Books Exchanged" }
            ].map((stat, index) => (
              <div key={index} className="stat-item text-center bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 shadow-lg min-w-[120px]">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
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