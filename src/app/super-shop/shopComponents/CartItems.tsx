"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <div className="text-gray-400 mb-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-3xl">🛒</div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Add some fresh products to get started
        </p>
        <Link
          href="/shop"
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Cart Items ({cartItems.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <div key={item.id} className="p-6 flex items-center space-x-4">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-emerald-600 font-bold">৳{item.price}</p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>

              <span className="w-12 text-center font-medium text-gray-800">
                {item.quantity}
              </span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-800">
                ৳{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors mt-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
