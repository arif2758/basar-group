"use client";

import React, { useRef } from "react";
import { BookOpen, Users, Award, Truck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const HeroGranthagar: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(".hero-title", { y: 60, opacity: 0 });
    gsap.set(".hero-quote", { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(".hero-buttons", { y: 30, opacity: 0 });
    gsap.set(".hero-stat", { y: 40, opacity: 0, scale: 0.9 });

    // Create timeline
    const tl = gsap.timeline();

    // Animate in sequence
    tl.to(".hero-title", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    })
    .to(".hero-quote", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.5")
    .to(".hero-buttons", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(".hero-stat", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.3");

    // Floating animation for quote box
    gsap.to(".hero-quote", {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

  }, { scope: heroRef });

  return (
    <div ref={heroRef} className="teal-slate-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Mind,
            <br />
            <span className="text-orange-300">One Book at a Time</span>
          </h1>
 
          <div className="hero-quote bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              Reading may not bring instant rewards, but in the long run, it
              transforms lives. Join our community library and discover
              knowledge beyond textbooks.
            </p>
            <p className="text-orange-200 mt-2 font-medium">
              — BASAR গ্রন্থাগার Team
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Join the Library
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border-2 border-white/30">
              Find a Book
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
              Donate a Book
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="hero-stat text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-orange-300" />
              </div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-blue-200">Books Available</div>
            </div>
            <div className="hero-stat text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-300" />
              </div>
              <div className="text-2xl font-bold">200+</div>
              <div className="text-blue-200">Active Members</div>
            </div>
            <div className="hero-stat text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-blue-200">Generous Donors</div>
            </div>
            <div className="hero-stat text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-8 h-8 text-purple-300" />
              </div>
              <div className="text-2xl font-bold">30min</div>
              <div className="text-blue-200">Free Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGranthagar;