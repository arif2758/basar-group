"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Apple,
  Carrot,
  Milk,
  Fish,
  Dice1 as Rice,
  Cookie,
  Coffee,
  Sparkles,
  Home,
  ArrowRight,
  Star,
  Copy,
  Check,
  Percent,
  Clock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CategoriesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = [
    {
      name: "Fresh Produce",
      slug: "fresh-produce",
      icon: Apple,
      count: "120+ items",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-500 dark:text-emerald-400",
      borderColor: "border-emerald-500/30",
    },
    {
      name: "Vegetables",
      slug: "vegetables",
      icon: Carrot,
      count: "85+ items",
      color: "from-orange-500/20 to-amber-500/20",
      textColor: "text-orange-500 dark:text-orange-400",
      borderColor: "border-orange-500/30",
    },
    {
      name: "Dairy & Eggs",
      slug: "dairy",
      icon: Milk,
      count: "45+ items",
      color: "from-sky-500/20 to-blue-500/20",
      textColor: "text-sky-500 dark:text-sky-400",
      borderColor: "border-sky-500/30",
    },
    {
      name: "Fish & Seafood",
      slug: "seafood",
      icon: Fish,
      count: "60+ items",
      color: "from-cyan-500/20 to-teal-500/20",
      textColor: "text-cyan-500 dark:text-cyan-400",
      borderColor: "border-cyan-500/30",
    },
    {
      name: "Rice & Grains",
      slug: "grains-&-rice",
      icon: Rice,
      count: "35+ items",
      color: "from-amber-500/20 to-yellow-500/20",
      textColor: "text-amber-500 dark:text-amber-400",
      borderColor: "border-amber-500/30",
    },
    {
      name: "Snacks & Bakery",
      slug: "snacks",
      icon: Cookie,
      count: "100+ items",
      color: "from-rose-500/20 to-pink-500/20",
      textColor: "text-rose-500 dark:text-rose-400",
      borderColor: "border-rose-500/30",
    },
    {
      name: "Beverages",
      slug: "beverages",
      icon: Coffee,
      count: "55+ items",
      color: "from-violet-500/20 to-purple-500/20",
      textColor: "text-violet-500 dark:text-violet-400",
      borderColor: "border-violet-500/30",
    },
    {
      name: "Personal Care",
      slug: "personal-care",
      icon: Sparkles,
      count: "90+ items",
      color: "from-pink-500/20 to-rose-500/20",
      textColor: "text-pink-500 dark:text-pink-400",
      borderColor: "border-pink-500/30",
    },
    {
      name: "Household",
      slug: "household",
      icon: Home,
      count: "75+ items",
      color: "from-slate-500/20 to-zinc-500/20",
      textColor: "text-slate-600 dark:text-slate-300",
      borderColor: "border-slate-500/30",
    },
  ];

  useScrollAnimation();

  useGSAP(
    () => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".cat-card-anim",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cat-grid-anim",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WEEKEND25");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 bg-white dark:bg-[#070b14] relative transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Grocery Departments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Shop by Category
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Hand-inspected fresh vegetables, organic staples, and daily household needs — all sourced directly from local producers with transparent pricing.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="cat-grid-anim grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={`/super-shop/shop?category=${category.slug}`}
                className="cat-card-anim group block"
              >
                <div className="h-full bg-slate-50 dark:bg-[#141414] hover:bg-white dark:hover:bg-[#1a1a1a] border border-slate-200/80 dark:border-[#303030] hover:border-emerald-500/40 dark:hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 dark:hover:shadow-emerald-950/20 hover:-translate-y-1 relative overflow-hidden flex flex-col items-center justify-between">
                  {/* Subtle Background Glow on Hover */}
                  <div
                    className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  />

                  {/* Icon Container */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} border ${category.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${category.textColor}`} />
                  </div>

                  {/* Title & Count */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-1.5">
                      {category.name}
                    </h3>
                    <span className="inline-block text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-[#202020] px-2.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>

                  {/* Hover Micro-link */}
                  <div className="mt-4 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-1">
                    <span>Browse</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Premium Weekend Offers Banner */}
        <div className="mt-14 sm:mt-18 relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 dark:border-emerald-500/30">
          {/* Background Mesh Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950/80 to-slate-900" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-14 text-white">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Offer Details */}
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
                  <Percent className="w-4 h-4" />
                  <span>Limited Weekend Mega Sale</span>
                  <span className="text-white/40">•</span>
                  <span>Save Up to 25% Off</span>
                </div>

                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                  Organic Grocery Bundles at Special Member Prices!
                </h3>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mb-6">
                  Get seasonal vegetable packs, premium aromatic rice, farm eggs, and fresh cold-pressed mustard oil with guaranteed same-day delivery.
                </p>

                {/* Perk Pills */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 mb-8">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-400" /> Free delivery over ৳500
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" /> 2-Hour Express available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% satisfaction guarantee
                  </span>
                </div>

                {/* Action Buttons & Code Copy */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/super-shop/shop"
                    className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
                  >
                    <span>Shop Weekend Deals</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Promo Code Box */}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all">
                    <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                      Coupon:
                    </span>
                    <code className="text-sm font-mono font-bold text-amber-300">
                      WEEKEND25
                    </code>
                    <button
                      onClick={handleCopyCode}
                      className="ml-1 p-1 rounded hover:bg-white/20 text-white transition-colors"
                      title="Copy Coupon Code"
                    >
                      {copiedCode ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-300 hover:text-white" />
                      )}
                    </button>
                    {copiedCode && (
                      <span className="text-xs text-emerald-400 font-semibold ml-1">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Decorative Badge / Feature Card */}
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30 text-slate-950 font-black text-2xl">
                    25%
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    Weekend Special Pack
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Includes 5kg Premium Rice, 2kg Potatoes, 1kg Onions, 1 Dozen Eggs & 1 Liter Mustard Oil.
                  </p>
                  <div className="text-center py-2 px-4 rounded-xl bg-black/20 border border-white/10">
                    <span className="text-xs text-slate-400 line-through mr-2">৳980</span>
                    <span className="text-xl font-black text-emerald-400">৳735</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
