"use client";

import { useRef } from "react";
import CartItems from "../shopComponents/CartItems";
import OrderSummary from "../shopComponents/OrderSummary";
import { ShoppingBag, Sparkles, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CartPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Floating background elements
      gsap.to(".cart-bg-element", {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(6, 10)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Header animation
      gsap.fromTo(
        ".cart-header",
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Cart content animation
      gsap.fromTo(
        ".cart-content",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
        }
      );

      // Sparkle animation
      gsap.to(".sparkle-cart", {
        y: "random(-8, 8)",
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

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="cart-bg-element absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-xl"></div>
        <div className="cart-bg-element absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-xl"></div>
        <div className="cart-bg-element absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-xl"></div>

        <Sparkles className="sparkle-cart absolute top-32 right-1/4 w-5 h-5 text-emerald-300/30" />
        <Star className="sparkle-cart absolute bottom-1/3 left-1/4 w-4 h-4 text-blue-300/25" />
        <Sparkles className="sparkle-cart absolute top-2/3 right-1/3 w-3 h-3 text-purple-300/35" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="cart-header mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/super-shop/shop"
                className="group flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="font-medium">কেনাকাটা চালিয়ে যান</span>
              </Link>
            </div>

            <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-200 dark:border-emerald-800">
              <ShoppingBag className="w-4 h-4 mr-2" />
              শপিং কার্ট
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                আপনার শপিং কার্ট
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              আপনার পছন্দের পণ্যগুলো যাচাই করুন এবং প্রস্তুত হলে অর্ডার সম্পন্ন করুন
            </p>
          </div>
        </div>

        {/* Cart Content */}
        <div className="cart-content grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
