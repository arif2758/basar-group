"use client";

import { CartProvider } from "../contexts/CartContext";
import CartItems from "../shopComponents/CartItems";
import FooterShop from "../shopComponents/FooterShop";

import OrderSummary from "../shopComponents/OrderSummary";

export default function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
  
        <main className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Shopping Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItems />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </main>
        <FooterShop />
      </div>
    </CartProvider>
  );
}
