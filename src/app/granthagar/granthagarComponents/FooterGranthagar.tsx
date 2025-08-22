"use client";

import React, { useRef } from 'react';
import { BookOpen, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, ArrowRight, Star } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterGranthagar: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Set initial states
    gsap.set(".footer-logo", { y: 40, opacity: 0 });
    gsap.set(".footer-mission", { y: 30, opacity: 0 });
    gsap.set(".footer-love", { scale: 0, opacity: 0 });
    gsap.set(".footer-section", { y: 50, opacity: 0 });
    gsap.set(".footer-link", { x: -20, opacity: 0 });
    gsap.set(".contact-item", { x: -15, opacity: 0 });
    gsap.set(".social-icon", { scale: 0, opacity: 0 });
    gsap.set(".footer-bottom", { y: 20, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".footer-logo", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    })
    .to(".footer-mission", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(".footer-love", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .to(".footer-section", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(".footer-link", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "sine.out"
    }, "-=0.4")
    .to(".contact-item", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "sine.out"
    }, "-=0.3")
    .to(".social-icon", {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.2")
    .to(".footer-bottom", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.1");

    // Floating animation for logo
    gsap.to(".footer-logo-icon", {
      y: -3,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2
    });

    // Pulse animation for heart
    gsap.to(".footer-heart", {
      scale: 1.2,
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });

  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="footer-logo flex items-center space-x-3 mb-6">
              <div className="footer-logo-icon w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">BASAR গ্রন্থাগার</h3>
                <p className="text-sm text-emerald-300 font-medium">Community Library</p>
              </div>
            </div>
            
            <p className="footer-mission text-gray-300 mb-6 max-w-md leading-relaxed">
              Inspiring students to read more, gain knowledge beyond textbooks, and reduce unproductive time on social media. 
              Reading may not bring instant rewards, but in the long run, it transforms lives.
            </p>
            
            <div className="footer-love flex items-center space-x-2 text-sm">
              <Heart className="footer-heart w-5 h-5 text-red-400" />
              <span className="text-gray-400">Built with love for our community</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">500+</div>
                <div className="text-xs text-gray-400">Books</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-teal-400">200+</div>
                <div className="text-xs text-gray-400">Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">50+</div>
                <div className="text-xs text-gray-400">Donors</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Star className="w-5 h-5 text-emerald-400 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                'Browse Books',
                'Join Library', 
                'Donate Books',
                'Reading Tracker',
                'Monthly Quiz'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="footer-link group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Mail className="w-5 h-5 text-emerald-400 mr-2" />
              Contact Us
            </h4>
            
            <div className="space-y-4">
              <div className="contact-item flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-gray-300">+880 1234-567890</span>
              </div>
              
              <div className="contact-item flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-teal-400" />
                </div>
                <span className="text-gray-300">info@basarlibrary.com</span>
              </div>
              
              <div className="contact-item flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              <a href="#" className="social-icon w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="social-icon w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center hover:from-sky-400 hover:to-sky-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="social-icon w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center hover:from-pink-400 hover:to-rose-500 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 BASAR গ্রন্থাগার. All rights reserved. Made with love for book lovers.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGranthagar;