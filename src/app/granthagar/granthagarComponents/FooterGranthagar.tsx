"use client";

import React, { useRef } from 'react';
import { BookOpen, Heart, Mail, Phone, MapPin, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const FooterGranthagar: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useScrollAnimation();
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
    <footer ref={footerRef} className="relative bg-slate-900 dark:bg-[#070b14] transition-colors duration-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-2">
            <div className="footer-logo flex items-center space-x-3 mb-6">
              <div className="footer-logo-icon w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">BASAR গ্রন্থাগার</h3>
                <p className="text-xs text-emerald-400 font-medium">Community Library</p>
              </div>
            </div>
            
            <p className="footer-mission text-slate-300 dark:text-slate-400 mb-6 max-w-md leading-relaxed text-sm">
              Inspiring students to read more, gain knowledge beyond textbooks, and reduce unproductive time on social media. 
              Reading may not bring instant rewards, but in the long run, it transforms lives.
            </p>
            
            <div className="footer-love flex items-center space-x-2 text-sm">
              <Heart className="footer-heart w-4 h-4 text-rose-400" />
              <span className="text-slate-400 text-xs">Built with love for our community</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8 p-4 bg-slate-800/80 dark:bg-[#141414] rounded-xl border border-slate-700/60 dark:border-[#303030]">
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-400">500+</div>
                <div className="text-xs text-slate-400">Books</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-teal-400">200+</div>
                <div className="text-xs text-slate-400">Members</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">50+</div>
                <div className="text-xs text-slate-400">Donors</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 dark:text-slate-300 mb-5 flex items-center">
              <Star className="w-4 h-4 text-emerald-400 mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Browse Books', href: '/granthagar/books-catalog' },
                { name: 'Join Library', href: '/granthagar/membership' }, 
                { name: 'Donate Books', href: '/granthagar/donors' },
                { name: 'Reading Tracker', href: '/granthagar/reading-tracker' },
                { name: 'Events', href: '/granthagar/events' }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link group flex items-center text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 dark:text-slate-300 mb-5 flex items-center">
              <Mail className="w-4 h-4 text-emerald-400 mr-2" />
              Contact Us
            </h4>
            
            <div className="space-y-3">
              <div className="contact-item flex items-center space-x-3 p-3 bg-slate-800/60 dark:bg-[#141414] rounded-lg border border-slate-700/60 dark:border-[#303030]">
                <div className="w-7 h-7 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300">+880 1234-567890</span>
              </div>
              
              <div className="contact-item flex items-center space-x-3 p-3 bg-slate-800/60 dark:bg-[#141414] rounded-lg border border-slate-700/60 dark:border-[#303030]">
                <div className="w-7 h-7 bg-teal-500/10 rounded-lg flex items-center justify-center text-teal-400">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300">info@basarlibrary.com</span>
              </div>
              
              <div className="contact-item flex items-center space-x-3 p-3 bg-slate-800/60 dark:bg-[#141414] rounded-lg border border-slate-700/60 dark:border-[#303030]">
                <div className="w-7 h-7 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm text-slate-300">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-2.5 mt-5">
              <a href="#" className="social-icon w-8 h-8 bg-slate-800 dark:bg-[#141414] border border-slate-700 dark:border-[#303030] rounded-lg flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <Heart className="w-4 h-4" />
              </a>
              <a href="#" className="social-icon w-8 h-8 bg-slate-800 dark:bg-[#141414] border border-slate-700 dark:border-[#303030] rounded-lg flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom border-t border-slate-800 dark:border-[#303030] mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} BASAR গ্রন্থাগার. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-3 md:mt-0">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGranthagar;