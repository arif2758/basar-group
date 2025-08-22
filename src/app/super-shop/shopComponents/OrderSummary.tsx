"use client";

import { useState } from "react";

import { Truck, Store, CreditCard, Smartphone } from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function OrderSummary() {
  const { cartItems, getTotalPrice } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("bkash");

  const subtotal = getTotalPrice();
  const deliveryFee =
    deliveryMethod === "delivery" ? (subtotal >= 500 ? 0 : 50) : 0;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden sticky top-24">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Delivery Method */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Delivery Method</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryMethod === "delivery"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <Truck className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-800">Home Delivery</span>
                <p className="text-sm text-gray-500">2-4 hours delivery</p>
              </div>
              <span className="text-sm text-gray-600">
                {subtotal >= 500 ? "FREE" : "৳50"}
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={(e) => setDeliveryMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <Store className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <span className="text-gray-800">Click & Collect</span>
                <p className="text-sm text-gray-500">Ready in 30 mins</p>
              </div>
              <span className="text-sm text-green-600 font-medium">FREE</span>
            </label>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bkash"
                checked={paymentMethod === "bkash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <Smartphone className="w-5 h-5 text-pink-500" />
              <span className="text-gray-800">bKash</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="nagad"
                checked={paymentMethod === "nagad"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <Smartphone className="w-5 h-5 text-orange-500" />
              <span className="text-gray-800">Nagad</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="rocket"
                checked={paymentMethod === "rocket"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <Smartphone className="w-5 h-5 text-purple-500" />
              <span className="text-gray-800">Rocket</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-gray-800">Credit/Debit Card</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
              <span className="text-gray-800">Cash on Delivery</span>
            </label>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? "FREE" : `৳${deliveryFee}`}</span>
          </div>
          {subtotal >= 500 && deliveryMethod === "delivery" && (
            <div className="flex justify-between text-green-600 text-sm">
              <span>Delivery Discount</span>
              <span>-৳50</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>৳{total}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
          Proceed to Checkout
        </button>

        {/* Trust Badges */}
        <div className="text-center text-sm text-gray-500">
          <p className="mb-2">🔒 Secure Payment</p>
          <p>💯 100% Satisfaction Guarantee</p>
        </div>
      </div>
    </div>
  );
}
