"use client";

import { useState, useRef } from "react";
import {
  Truck,
  Store,
  CreditCard,
  Smartphone,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";



export default function OrderSummary() {
  const { cartItems, getTotalPrice } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const containerRef = useRef<HTMLDivElement>(null);

  const subtotal = getTotalPrice();
  const deliveryFee =
    deliveryMethod === "delivery" ? (subtotal >= 500 ? 0 : 50) : 0;
  const total = subtotal + deliveryFee;

  const deliveryOptions = [
    {
      id: "delivery",
      icon: Truck,
      title: "হোম ডেলিভারি",
      subtitle: "2-4 ঘণ্টার মধ্যে ডেলিভারি",
      price: subtotal >= 500 ? "ফ্রি" : "৳50",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      id: "pickup",
      icon: Store,
      title: "Click & Collect",
      subtitle: "30 মিনিটে প্রস্তুত",
      price: "ফ্রি",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/40",
    },
  ];

  const paymentOptions = [
    {
      id: "bkash",
      icon: Smartphone,
      title: "bKash",
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/40",
    },
    {
      id: "nagad",
      icon: Smartphone,
      title: "Nagad",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/40",
    },
    {
      id: "rocket",
      icon: Smartphone,
      title: "Rocket",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
    },
    {
      id: "card",
      icon: CreditCard,
      title: "ক্রেডিট / ডেবিট কার্ড",
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-slate-800",
    },
    {
      id: "cod",
      icon: Clock,
      title: "Cash on Delivery",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      if (cartItems.length === 0) return;

      // Summary card entrance animation
      gsap.fromTo(
        containerRef.current,
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
          delay: 0.3,
        }
      );

      // Setup hover interactions
      setupSummaryHovers();
    },
    { scope: containerRef, dependencies: [cartItems.length] }
  );

  const setupSummaryHovers = () => {
    // Delivery option hover effects
    gsap.utils.toArray<HTMLElement>(".delivery-option").forEach((option) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(option, {
        scale: 1.02,
        y: -2,
        boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      option.addEventListener("mouseenter", () => hoverTl.play());
      option.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Payment option hover effects
    gsap.utils.toArray<HTMLElement>(".payment-option").forEach((option) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(option, {
        scale: 1.02,
        y: -2,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

      option.addEventListener("mouseenter", () => hoverTl.play());
      option.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Checkout button hover effect
    const checkoutBtn = containerRef.current?.querySelector(".checkout-btn");
    if (checkoutBtn) {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(checkoutBtn, {
        scale: 1.02,
        y: -3,
        boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });

      checkoutBtn.addEventListener("mouseenter", () => hoverTl.play());
      checkoutBtn.addEventListener("mouseleave", () => hoverTl.reverse());
    }
  };

  const animateMethodChange = (type: string) => {
    const selector =
      type === "delivery" ? ".delivery-option" : ".payment-option";
    const options = gsap.utils.toArray<HTMLElement>(selector);

    gsap.to(options, {
      scale: 0.98,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  const handleDeliveryChange = (value: string) => {
    setDeliveryMethod(value);
    animateMethodChange("delivery");
  };

  const handlePaymentChange = (value: string) => {
    setPaymentMethod(value);
    animateMethodChange("payment");
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden sticky top-24 border border-gray-100 dark:border-slate-800"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 p-6 border-b border-emerald-100 dark:border-emerald-900/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">অর্ডার সামারি</h2>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Delivery Method */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            ডেলিভারি মাধ্যম
          </h3>
          <div className="space-y-3">
            {deliveryOptions.map((option) => (
              <label
                key={option.id}
                className="delivery-option block cursor-pointer"
              >
                <div
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    deliveryMethod === option.id
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30"
                      : "border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/60 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.id}
                      checked={deliveryMethod === option.id}
                      onChange={(e) => handleDeliveryChange(e.target.value)}
                      className="text-emerald-600 focus:ring-emerald-500 w-5 h-5"
                    />

                    <div
                      className={`w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <option.icon className={`w-6 h-6 ${option.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {option.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.subtitle}
                      </div>
                    </div>

                    <div
                      className={`font-bold ${
                        option.price === "ফ্রি"
                          ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {option.price}
                    </div>
                  </div>

                  {deliveryMethod === option.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            পেমেন্ট মাধ্যম
          </h3>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label
                key={option.id}
                className="payment-option block cursor-pointer"
              >
                <div
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                    paymentMethod === option.id
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30"
                      : "border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/60 hover:border-emerald-300 dark:hover:border-emerald-700"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={paymentMethod === option.id}
                      onChange={(e) => handlePaymentChange(e.target.value)}
                      className="text-emerald-600 focus:ring-emerald-500 w-5 h-5"
                    />

                    <div
                      className={`w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center`}
                    >
                      <option.icon className={`w-6 h-6 ${option.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {option.title}
                      </div>
                    </div>
                  </div>

                  {paymentMethod === option.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gradient-to-r from-gray-50 to-emerald-50 dark:from-slate-800/70 dark:to-emerald-950/30 rounded-2xl p-6 space-y-4 border border-gray-100 dark:border-slate-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            মূল্যের বিস্তারিত
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">সাবটোটাল</span>
              <span className="font-semibold">৳{subtotal}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
              <span className="font-medium">ডেলিভারি চার্জ</span>
              <span
                className={`font-semibold ${
                  deliveryFee === 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""
                }`}
              >
                {deliveryFee === 0 ? "ফ্রি" : `৳${deliveryFee}`}
              </span>
            </div>

            {subtotal >= 500 && deliveryMethod === "delivery" && (
              <div className="flex justify-between items-center text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/50 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <span className="text-sm font-medium">
                  🎉 ফ্রি ডেলিভারি বোনাস
                </span>
                <span className="text-sm font-bold">-৳50</span>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-slate-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">সর্বমোট</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ৳{total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Alert */}
        {subtotal < 500 && deliveryMethod === "delivery" && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-orange-200 dark:border-orange-800/50 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-orange-800 dark:text-amber-300">
                  আর সামান্য বাকি!
                </div>
                <div className="text-sm text-orange-700 dark:text-amber-400/90">
                  ফ্রি ডেলিভারি পেতে আরও ৳{500 - subtotal} এর কেনাকাটা করুন
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <button className="checkout-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg border border-emerald-500/20 flex items-center justify-center space-x-3 cursor-pointer">
          <Shield className="w-5 h-5" />
          <span>অর্ডার নিশ্চিত করুন</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            ৳{total}
          </span>
        </button>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-800">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-emerald-950 dark:to-teal-950 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-green-600 dark:text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              নিরাপদ পেমেন্ট
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">SSL সুরক্ষিত</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950 dark:to-cyan-950 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              নিখুঁত সেবা
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">100% গ্যারান্টি</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-4 border border-blue-200 dark:border-blue-900/40">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                দ্রুত ডেলিভারি
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300/80 leading-relaxed">
                {deliveryMethod === "delivery"
                  ? "আমাদের স্থানীয় তরুণ ডেলিভারি টিম 2-4 ঘণ্টার মধ্যে আপনার অর্ডার পৌঁছে দেবে"
                  : "আপনার অর্ডার 30 মিনিটের মধ্যে পিকআপের জন্য প্রস্তুত থাকবে"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
