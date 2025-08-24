"use client";

import { useRef } from "react";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useCart } from "../contexts/CartContext";

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);
  const cartContentRef = useRef<HTMLDivElement>(null);

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
        <div ref={emptyStateRef} className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <div className="empty-icon w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <ShoppingCart className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <h2 className="empty-title text-2xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="empty-description text-gray-600 mb-6">
            Add some fresh products to get started
          </p>
          <Link
            href="/shop"
            className="shop-btn inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      <div ref={cartContentRef} className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="cart-header p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            Cart Items ({cartItems.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {cartItems.map((item, ) => (
            <div 
              key={item.id} 
              data-item-id={item.id}
              className="cart-item p-6 flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="item-image relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg"></div>
              </div>

              <div className="item-content flex-1">
                <h3 className="font-semibold text-gray-800 mb-1 hover:text-emerald-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-emerald-600 font-bold text-lg">৳{item.price}</p>
              </div>

              <div className="item-controls flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-2">
                <button
                  onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                  className="quantity-btn p-2 rounded-full transition-all duration-200"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>

                <span 
                  data-quantity-id={item.id}
                  className="w-12 text-center font-bold text-gray-800 text-lg"
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                  className="quantity-btn p-2 rounded-full transition-all duration-200"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-800 text-xl mb-2">
                  ৳{item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn p-2 rounded-full hover:bg-red-50 transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}