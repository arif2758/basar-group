"use client";

import { useRef } from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";


import { useCart } from "../contexts/CartContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const cartContentRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(() => {
    // Empty State Animation
    if (cartItems.length === 0 && emptyStateRef.current) {
      const tl = gsap.timeline();
      tl.from(".empty-icon", { 
        scale: 0, 
        rotation: -180, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      })
      .from(".empty-title", { 
        opacity: 0, 
        y: 30, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .from(".empty-description", { 
        opacity: 0, 
        y: 20, 
        duration: 0.5, 
        ease: "power2.out" 
      }, "-=0.3")
      .from(".empty-button", { 
        opacity: 0, 
        y: 20, 
        scale: 0.9, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      }, "-=0.2");
    }

    // Cart Items Animation
    if (cartItems.length > 0 && cartContentRef.current) {
      // Header Animation
      gsap.from(".cart-header", {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.out"
      });

      // Stagger animation for cart items
      gsap.from(".cart-item", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Image animations
      gsap.from(".item-image", {
        scale: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Content slide in
      gsap.from(".item-content", {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2
      });

      // Controls animation
      gsap.from(".item-controls", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.4
      });
    }

    // Quantity Button Hover Effects
    const quantityButtons = gsap.utils.toArray<HTMLElement>(".quantity-btn");
    quantityButtons.forEach((button: HTMLElement) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(button, { 
        scale: 1.1, 
        backgroundColor: "#f3f4f6", 
        duration: 0.2, 
        ease: "power2.out" 
      });
      
      button.addEventListener("mouseenter", () => hoverTl.play());
      button.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Remove Button Hover Effects
    const removeButtons = gsap.utils.toArray<HTMLElement>(".remove-btn");
    removeButtons.forEach((button: HTMLElement) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(button, { 
        scale: 1.2, 
        rotation: 15, 
        color: "#dc2626", 
        duration: 0.2, 
        ease: "power2.out" 
      });
      
      button.addEventListener("mouseenter", () => hoverTl.play());
      button.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Shopping Button Hover Effect
    const shopButton = containerRef.current?.querySelector(".shop-btn");
    if (shopButton) {
      const shopTl = gsap.timeline({ paused: true });
      shopTl.to(shopButton, { 
        scale: 1.05, 
        y: -2, 
        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)", 
        duration: 0.3, 
        ease: "power2.out" 
      });
      
      shopButton.addEventListener("mouseenter", () => shopTl.play());
      shopButton.addEventListener("mouseleave", () => shopTl.reverse());
    }

  }, { scope: containerRef, dependencies: [cartItems.length] });

  // Remove Item Animation
  const handleRemoveItem = (itemId: number) => {
    const itemElement = containerRef.current?.querySelector(`[data-item-id="${itemId}"]`);
    if (itemElement) {
      gsap.to(itemElement, { 
        x: -100, 
        opacity: 0,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => removeFromCart(itemId)
      });
    } else {
      removeFromCart(itemId);
    }
  };

  // Quantity Update Animation
  const handleQuantityUpdate = (itemId: number, newQuantity: number) => {
    const quantityElement = containerRef.current?.querySelector(`[data-quantity-id="${itemId}"]`);
    if (quantityElement) {
      gsap.to(quantityElement, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }
    updateQuantity(itemId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div ref={containerRef}>
        <div ref={emptyStateRef} className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl shadow-sm p-8 sm:p-12 text-center transition-colors">
          <div className="text-slate-400 mb-4">
            <div className="empty-icon w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <ShoppingCart className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
          <h2 className="empty-title text-2xl font-bold text-slate-900 dark:text-white mb-2">
            আপনার কার্ট বর্তমানে খালি
          </h2>
          <p className="empty-description text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto text-sm">
            কেনাকাটা শুরু করতে আমাদের শপ থেকে তাজা নিত্যপণ্য কার্টে যুক্ত করুন।
          </p>
          <Link
            href="/super-shop/shop"
            className="shop-btn inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/25 transition-colors"
          >
            শপিং চালিয়ে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div ref={cartContentRef} className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl shadow-sm overflow-hidden transition-colors">
        <div className="cart-header p-6 border-b border-slate-100 dark:border-[#262626] bg-slate-50/70 dark:bg-[#191919]">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            কার্টের পণ্যসমূহ ({cartItems.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-[#262626]">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              data-item-id={item.id}
              className="cart-item p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#1a1a1a] transition-colors duration-200"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="item-image relative flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
                </div>

                <div className="item-content flex-1">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-black text-lg">৳{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
                <div className="item-controls flex items-center space-x-2 bg-slate-100 dark:bg-[#202020] rounded-full px-2 py-1">
                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                    className="quantity-btn p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span 
                    data-quantity-id={item.id}
                    className="w-8 text-center font-bold text-slate-900 dark:text-white text-base"
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                    className="quantity-btn p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right flex items-center gap-3">
                  <p className="font-black text-slate-900 dark:text-white text-lg">
                    ৳{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="পণ্য মুছুন"
                    className="remove-btn p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}