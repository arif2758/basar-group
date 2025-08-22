"use client";

import { useState } from "react";
import { Star, Plus, Heart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";

type StockLevel = "high" | "medium" | "low";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  stockLevel: StockLevel;
}

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 80,
      originalPrice: 100,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 2,
      name: "Premium Basmati Rice",
      price: 750,
      originalPrice: 850,
      rating: 4.9,
      image:
        "https://images.pexels.com/photos/33875/pexels-photo-33875.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Rice & Grains",
      unit: "per 5kg",
      inStock: true,
      stockLevel: "medium",
    },
    {
      id: 3,
      name: "Fresh Milk",
      price: 60,
      originalPrice: 70,
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Dairy",
      unit: "per liter",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 4,
      name: "Green Bananas",
      price: 40,
      originalPrice: 50,
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fruits",
      unit: "per dozen",
      inStock: true,
      stockLevel: "low",
    },
    {
      id: 5,
      name: "Fresh Chicken",
      price: 320,
      originalPrice: 350,
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Meat",
      unit: "per kg",
      inStock: true,
      stockLevel: "medium",
    },
    {
      id: 6,
      name: "Mixed Vegetables",
      price: 120,
      originalPrice: 150,
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
  ];

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked fresh products with the best prices for our community
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    wishlist.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>
                <div
                  className={`absolute bottom-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    product.stockLevel === "high"
                      ? "bg-green-100 text-green-800"
                      : product.stockLevel === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stockLevel === "high"
                    ? "In Stock"
                    : product.stockLevel === "medium"
                    ? "Few Left"
                    : "Low Stock"}
                </div>
              </div>

              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  {product.category}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-600">
                      ৳{product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ৳{product.originalPrice}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-3">{product.unit}</div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}
