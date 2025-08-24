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
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

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
      title: "Home Delivery",
      subtitle: "2-4 hours delivery",
      price: subtotal >= 500 ? "FREE" : "৳50",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      id: "pickup",
      icon: Store,
      title: "Click & Collect",
      subtitle: "Ready in 30 mins",
      price: "FREE",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  const paymentOptions = [
    {
      id: "bkash",
      icon: Smartphone,
      title: "bKash",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      id: "nagad",
      icon: Smartphone,
      title: "Nagad",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: "rocket",
      icon: Smartphone,
      title: "Rocket",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "card",
      icon: CreditCard,
      title: "Credit/Debit Card",
      color: "text-gray-500",
      bgColor: "bg-gray-50",
    },
    {
      id: "cod",
      icon: Clock,
      title: "Cash on Delivery",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

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
      className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-24 border border-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border-b border-emerald-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Delivery Method */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-emerald-600" />
            Delivery Method
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
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 bg-gray-50 hover:border-emerald-300"
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
                      <div className="font-semibold text-gray-900">
                        {option.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {option.subtitle}
                      </div>
                    </div>

                    <div
                      className={`font-bold ${
                        option.price === "FREE"
                          ? "text-green-600"
                          : "text-gray-700"
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
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
            Payment Method
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
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 bg-gray-50 hover:border-emerald-300"
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
                      <div className="font-semibold text-gray-900">
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
        <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
            Price Breakdown
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">৳{subtotal}</span>
            </div>

            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Delivery Fee</span>
              <span
                className={`font-semibold ${
                  deliveryFee === 0 ? "text-green-600" : ""
                }`}
              >
                {deliveryFee === 0 ? "FREE" : `৳${deliveryFee}`}
              </span>
            </div>

            {subtotal >= 500 && deliveryMethod === "delivery" && (
              <div className="flex justify-between items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium">
                  🎉 Free Delivery Bonus
                </span>
                <span className="text-sm font-bold">-৳50</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-black text-emerald-600">
                  ৳{total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Alert */}
        {subtotal < 500 && deliveryMethod === "delivery" && (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-orange-800">
                  Almost there!
                </div>
                <div className="text-sm text-orange-700">
                  Add ৳{500 - subtotal} more for FREE delivery
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <button className="checkout-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg border border-emerald-500/20 flex items-center justify-center space-x-3">
          <Shield className="w-5 h-5" />
          <span>Proceed to Checkout</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            ৳{total}
          </span>
        </button>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm font-semibold text-gray-700">
              Secure Payment
            </div>
            <div className="text-xs text-gray-500">SSL Protected</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm font-semibold text-gray-700">
              Satisfaction
            </div>
            <div className="text-xs text-gray-500">100% Guarantee</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-800 text-sm">
                Quick Delivery
              </div>
              <div className="text-xs text-blue-700 leading-relaxed">
                {deliveryMethod === "delivery"
                  ? "Your order will be delivered within 2-4 hours by our local youth team"
                  : "Your order will be ready for pickup in 30 minutes"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
