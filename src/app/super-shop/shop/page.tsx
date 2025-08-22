"use client";

import { useState } from "react";

import { Filter, X } from "lucide-react";
import { CartProvider } from "../contexts/CartContext";

import FooterShop from "../shopComponents/FooterShop";
import FilterSidebar from "../shopComponents/FilterSidebar";
import ProductGrid from "../shopComponents/ProductGrid";

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Shop All Products
            </h1>
            <p className="text-gray-600">
              Fresh groceries and daily essentials delivered to your doorstep
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 bg-emerald-600 text-white p-3 rounded-full shadow-lg z-40 flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
              <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="bg-white h-full w-80 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid />
            </div>
          </div>
        </main>
        <FooterShop />
      </div>
    </CartProvider>
  );
}
