"use client";

import React, { useRef } from "react";
import { BookOpen, Heart, Users, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToAction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(".cta-header", { y: 60, opacity: 0 });
    gsap.set(".cta-card", { y: 100, opacity: 0, scale: 0.9 });
    gsap.set(".cta-icon", { scale: 0, opacity: 0 });
    gsap.set(".cta-title", { y: 20, opacity: 0 });
    gsap.set(".cta-description", { y: 15, opacity: 0 });
    gsap.set(".cta-price", { scale: 0.8, opacity: 0 });
    gsap.set(".cta-button", { y: 20, opacity: 0, scale: 0.9 });
    gsap.set(".bottom-cta", { y: 80, opacity: 0, scale: 0.95 });
    gsap.set(".final-buttons", { y: 30, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".cta-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".cta-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".cta-icon", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(".cta-title", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(".cta-description", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "sine.out"
    }, "-=0.3")
    .to(".cta-price", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(".cta-button", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".bottom-cta", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".final-buttons", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.4)"
    }, "-=0.3");

  

    // Pulse animation for icons
    gsap.to(".cta-icon", {
      scale: 1.1,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 3
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 teal-slate-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-header text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Transform Your Life
            <br />
            Through Reading?
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Join our community of passionate readers and discover the joy of
            learning beyond textbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Join as Member */}
          <div className="cta-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="cta-icon w-8 h-8 text-white" />
            </div>
            <h3 className="cta-title text-2xl font-bold mb-3">Join as Member</h3>
            <p className="cta-description text-orange-100 mb-6">
              Start your reading journey with access to 500+ books, reading
              tracker, and community features.
            </p>
            <div className="cta-price bg-white/20 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-yellow-300">৳100</div>
              <div className="text-sm text-orange-100">Refundable deposit</div>
            </div>
            <button className="cta-button w-full bg-white text-orange-600 hover:bg-orange-50 py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
              <span>Become a Member</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Donate Books */}
          <div className="cta-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="cta-icon w-8 h-8 text-red-300" />
            </div>
            <h3 className="cta-title text-2xl font-bold mb-3">Donate Books</h3>
            <p className="cta-description text-orange-100 mb-6">
              Share knowledge with the community. Your donated books will be
              loved by students across the city.
            </p>
            <div className="cta-price bg-white/20 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-green-300">Free</div>
              <div className="text-sm text-orange-100">
                We&apos;ll pick up from you
              </div>
            </div>
            <button className="cta-button w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
              <span>Donate Now</span>
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Browse Books */}
          <div className="cta-card bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="cta-icon w-8 h-8 text-blue-300" />
            </div>
            <h3 className="cta-title text-2xl font-bold mb-3">Explore Books</h3>
            <p className="cta-description text-orange-100 mb-6">
              Browse our collection of carefully curated books across multiple
              categories and genres.
            </p>
            <div className="cta-price bg-white/20 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-blue-300">500+</div>
              <div className="text-sm text-orange-100">Books available</div>
            </div>
            <button className="cta-button w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center space-x-2">
              <span>Browse Collection</span>
              <BookOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bottom-cta bg-black/20 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Reading may not bring instant rewards, but in the long run, it
              transforms lives.
            </h3>
            <p className="text-orange-100 mb-8 text-lg">
              Don&apos;t let another day pass by scrolling mindlessly. Start
              your transformation today.
            </p>
            <div className="final-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                Start Reading Today
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;