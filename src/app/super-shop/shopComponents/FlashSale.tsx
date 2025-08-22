"use client";

import { useState, useEffect } from "react";
import { Clock, Plus } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Image from "next/image";

type FlashSaleProduct = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  unit: string;
  sold: number;
  total: number;
};

export default function FlashSale() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts: FlashSaleProduct[] = [
    {
      id: 7,
      name: "Fresh Potatoes",
      price: 30,
      originalPrice: 45,
      image:
        "https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per kg",
      sold: 45,
      total: 100,
    },
    {
      id: 8,
      name: "Red Onions",
      price: 25,
      originalPrice: 35,
      image:
        "https://images.pexels.com/photos/533342/pexels-photo-533342.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per kg",
      sold: 32,
      total: 80,
    },
    {
      id: 9,
      name: "Premium Eggs",
      price: 140,
      originalPrice: 180,
      image:
        "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per dozen",
      sold: 28,
      total: 60,
    },
    {
      id: 10,
      name: "Fresh Spinach",
      price: 20,
      originalPrice: 30,
      image:
        "https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=400",
      unit: "per bunch",
      sold: 15,
      total: 40,
    },
  ];

  const handleAddToCart = (product: FlashSaleProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center text-white mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-8 h-8" />
            <h2 className="text-3xl md:text-4xl font-bold">Flash Sale!</h2>
          </div>
          <p className="text-xl mb-6">
            Limited time offers on selected fresh products
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-sm">Hours</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-2xl font-bold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {flashSaleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative w-full h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
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

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Sold: {product.sold}</span>
                    <span>Available: {product.total - product.sold}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(product.sold / product.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Grab Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
