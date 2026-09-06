"use client";

import { useState, useRef, useEffect } from "react";
import { Zap, Timer, ShoppingBag, Check, Flame, ArrowRight } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type FlashSaleProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  unit: string;
  sold: number;
  total: number;
  tag: string;
};

export default function FlashSale() {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  const flashSaleProducts: FlashSaleProduct[] = [
    {
      id: 7,
      name: "ডায়মন্ড গোল আলু",
      price: 32,
      originalPrice: 48,
      image:
        "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=600",
      unit: "1 kg",
      sold: 68,
      total: 100,
      tag: "সেরা বিক্রিত",
    },
    {
      id: 8,
      name: "তাজা দেশি লাল পেঁয়াজ",
      price: 65,
      originalPrice: 85,
      image:
        "https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=600",
      unit: "1 kg",
      sold: 52,
      total: 80,
      tag: "সীমিত স্টক",
    },
    {
      id: 9,
      name: "খামারের তাজা লাল ডিম",
      price: 135,
      originalPrice: 165,
      image:
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600",
      unit: "1 ডজন (12 টি)",
      sold: 49,
      total: 60,
      tag: "দ্রুত বিক্রি হচ্ছে",
    },
    {
      id: 10,
      name: "তাজা কচি পালং শাক",
      price: 25,
      originalPrice: 40,
      image:
        "https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=600",
      unit: "1 আঁটি",
      sold: 34,
      total: 40,
      tag: "ভোরের তাজা তোলা",
    },
  ];

  useScrollAnimation();

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".flash-card-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleAddToCart = (product: FlashSaleProduct) => {
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

  return (
    <section
      ref={containerRef}
      className="py-20 bg-slate-950 dark:bg-[#070b14] text-white relative overflow-hidden transition-colors duration-200"
    >
      {/* Ambient Lighting & Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header & Timer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold mb-4 backdrop-blur-md">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>সীমিত সময়ের ফ্ল্যাশ ডিল</span>
              <span className="text-white/40">•</span>
              <span>প্রতিদিন স্টক রিফ্রেশ হয়</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              আজকের সেরা ফ্ল্যাশ ডিসকাউন্ট
            </h2>

            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              নিত্যপ্রয়োজনীয় তাজা পণ্যে আকর্ষণীয় মূল্যছাড়। কাউন্টডাউন টাইমার শেষ হলে বা স্টক ফুরালে নিয়মিত দাম কার্যকর হবে!
            </p>
          </div>

          {/* High-Tech Countdown Timer */}
          <div className="flex items-center gap-3 sm:gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-semibold pr-2">
              <Timer className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>বাকি আছে:</span>
            </div>

            {[
              { val: timeLeft.hours, label: "ঘণ্টা" },
              { val: timeLeft.minutes, label: "মিনিট" },
              { val: timeLeft.seconds, label: "সেকেন্ড" },
            ].map((unit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center text-lg sm:text-2xl font-black text-amber-300 font-mono shadow-inner">
                    {String(unit.val).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold mt-1">
                    {unit.label}
                  </span>
                </div>
                {idx < 2 && <span className="text-xl font-bold text-slate-600">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            );
            const percentSold = Math.round((product.sold / product.total) * 100);
            const isAdded = addedIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="flash-card-anim group bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-950/20 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badges */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                    {/* Top Discount Tag */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black text-xs shadow-lg">
                        ছাড় {discount}%
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-300 text-[10px] font-semibold border border-white/10">
                        {product.tag}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 sm:p-5">
                    <span className="text-xs text-slate-400 font-medium">
                      একক: {product.unit}
                    </span>

                    <h3 className="font-bold text-base text-white mt-1 leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-2xl font-black text-amber-400">
                        ৳{product.price}
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        ৳{product.originalPrice}
                      </span>
                    </div>

                    {/* Stock Urgency Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-400 font-medium mb-1.5">
                        <span>বিক্রি: {product.sold}</span>
                        <span className="text-amber-400">
                          বাকি: {product.total - product.sold}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 shadow-amber-500/20"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>কার্টে যুক্ত হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        <span>এখনই কিনুন</span>
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
