"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Truck, Clock, Shield } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Fresh Groceries at Your Doorstep",
      subtitle: "Supporting Local Youth, Serving Our Community",
      description:
        "Get fresh vegetables, fruits, and daily essentials delivered by local youth within 2 hours",
      image:
        "https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Shop Now",
      offer: "Free Delivery on Orders Over ৳500",
    },
    {
      title: "Ramadan Special Bundles",
      subtitle: "Everything You Need for Holy Month",
      description:
        "Pre-packed bundles with dates, rice, lentils, and iftar essentials",
      image:
        "https://images.pexels.com/photos/4397839/pexels-photo-4397839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "View Bundles",
      offer: "Up to 15% Off on Bundles",
    },
    {
      title: "Supporting Local Youth",
      subtitle: "Every Purchase Creates Jobs",
      description:
        "Your orders provide income and skills training to young people in our community",
      image:
        "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Learn More",
      offer: "100+ Youth Employed This Month",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          <div className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 "></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
                  {slide.offer}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  {slide.title}
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-emerald-300">
                  {slide.subtitle}
                </h2>
                <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  {slide.description}
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Trust badges */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8 md:space-x-16">
            <div className="flex items-center space-x-2 text-gray-700">
              <Truck className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">Same Day Service</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-medium">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
