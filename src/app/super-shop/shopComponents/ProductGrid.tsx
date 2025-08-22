"use client";

import { useState } from "react";
import { Star, Plus, Heart, Eye } from "lucide-react";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  unit: string;
  inStock: boolean;
  stockLevel: "high" | "medium" | "low";
};

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 80,
      originalPrice: 100,
      rating: 4.8,
      reviews: 124,
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
      reviews: 89,
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
      reviews: 203,
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
      reviews: 67,
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
      reviews: 145,
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
      reviews: 78,
      image:
        "https://images.pexels.com/photos/1400172/pexels-photo-1400172.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 11,
      name: "Fresh Carrots",
      price: 45,
      originalPrice: 55,
      rating: 4.4,
      reviews: 92,
      image:
        "https://images.pexels.com/photos/1508601/pexels-photo-1508601.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Vegetables",
      unit: "per kg",
      inStock: true,
      stockLevel: "high",
    },
    {
      id: 12,
      name: "Red Apples",
      price: 180,
      originalPrice: 200,
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Fruits",
      unit: "per kg",
      inStock: true,
      stockLevel: "medium",
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
    <div>
      {/* Sort and Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">Showing {products.length} products</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
          >
            <div className="relative">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>

              {/* Action buttons */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full transition-colors shadow-md ${
                    wishlist.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                </button>
                <Link href={`/product/${product.id}`}>
                  <button className="p-2 rounded-full bg-white text-gray-400 hover:text-emerald-600 transition-colors shadow-md">
                    <Eye className="w-4 h-4" />
                  </button>
                </Link>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-2">
                {product.originalPrice > product.price && (
                  <span className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                )}
                <div
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${
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
            </div>

            <div className="p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
                {product.category}
              </div>
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviews})
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-emerald-600">
                    ৳{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
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
    </div>
  );
}
