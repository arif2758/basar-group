"use client";

import React, { useRef } from "react";
import {
  ArrowLeft,
  Star,
  User,
  MapPin,
  MessageCircle,
  Share2,
  Heart,
  BookOpen,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

const BookDetail: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const book = {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    cover:
      "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    totalReviews: 24,
    donor: "আহমেদ রহমান",
    donorPhoto:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    donorLocation: "ধানমন্ডি",
    status: "Available",
    category: "দর্শন ও জীবনধারা",
    pages: 163,
    language: "English / অনুবাদ",
    publishYear: 1988,
    isbn: "978-0062315007",
    dateAdded: "15 জানুয়ারি, 2024",
    description:
      "The Alchemist ব্রাজিলিয়ান লেখক পাওলো কোয়েলহোর এক বিশ্বখ্যাত ক্লাসিক উপন্যাস যা প্রথম প্রকাশিত হয় 1988 সালে। মূল পর্তুগিজ ভাষায় রচিত এই বইটি বিশ্বের অন্যতম সর্বাধিক অনূদিত বেস্টসেলার। এক তরুণ মেষপালকের আন্দালুসিয়া থেকে মিশরের পিরামিডের দিকে গুপ্তধনের সন্ধানে দীর্ঘ যাত্রার মাধ্যমে নিজের স্বপ্নপূরণ ও সত্য উপলব্ধির গল্প ফুটে উঠেছে এতে।",
    keyLearnings: [
      "নিজের স্বপ্ন এবং ব্যক্তিগত উদ্দেশ্যের (Personal Legend) প্রতি অবিচল থাকা",
      "হৃদয়ের ডাক এবং প্রকৃতির সংকেত উপলব্ধি করা",
      "অনেক সময় প্রাপ্তির চেয়ে যাত্রাপথ ও আত্ম-আবিষ্কারই প্রধান গুপ্তধন",
      "স্বপ্ন পূরণের পথে সবচেয়ে বড় বাধা হলো ব্যর্থতার ভয়",
    ],
    whyRead:
      "এই কালজয়ী বইটি আপনাকে সকল দ্বিধাদ্বন্দ্ব ভুলে নিজের স্বপ্নপূরণের পথে অনুপ্রাণিত করবে এবং জীবনের গভীরে লুকানো আত্মশক্তির সন্ধান দেবে।",
    reviews: [
      {
        id: 1,
        user: "সারাহ আহমেদ",
        rating: 5,
        date: "2 সপ্তাহ আগে",
        text: "জীবন বদলে দেওয়ার মতো একটি বই! পাওলো কোয়েলহোর সহজ অথচ গভীর লেখনী সত্যি অসাধারণ।",
      },
      {
        id: 2,
        user: "করিম হাসান",
        rating: 4,
        date: "1 মাস আগে",
        text: "স্বপ্নপূরণ আর নিজের পথ খুঁজে নেওয়ার দারুণ এক গল্প। প্রতিটি পাঠকের এটি পড়া উচিত!",
      },
    ],
    similarBooks: [
      { title: "The Prophet", author: "Kahlil Gibran" },
      { title: "Jonathan Livingston Seagull", author: "Richard Bach" },
      { title: "The Celestine Prophecy", author: "James Redfield" },
    ],
  };

  useScrollAnimation();
  useGSAP(
    () => {
      // Complex nested floating background animations
      gsap.to(".book-bg-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-360, 360)",
        duration: "random(8, 15)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Nested sparkle animations with different layers
      gsap.to(".sparkle-layer-1", {
        y: "random(-12, 12)",
        x: "random(-8, 8)",
        rotation: "random(0, 360)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

      gsap.to(".sparkle-layer-2", {
        y: "random(-8, 8)",
        x: "random(-12, 12)",
        rotation: "random(-360, 0)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Complex back button nested animation
      const backButtonTl = gsap.timeline();
      backButtonTl
        .fromTo(
          ".back-button",
          {
            opacity: 0,
            x: -50,
            scale: 0.8,
            rotationY: -20,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(
          ".back-button .back-icon",
          {
            x: -10,
            rotation: -180,
          },
          {
            x: 0,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .fromTo(
          ".back-button .back-text",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Complex book cover nested entrance
      const bookCoverTl = gsap.timeline({ delay: 0.3 });
      bookCoverTl
        .fromTo(
          ".book-cover-container",
          {
            opacity: 0,
            y: 100,
            scale: 0.7,
            rotationY: -30,
            rotationX: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".book-cover-image",
          {
            scale: 0.8,
            rotationZ: -5,
          },
          {
            scale: 1,
            rotationZ: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        )
        .fromTo(
          ".bestseller-badge",
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .fromTo(
          ".book-cover-glow",
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 0.3,
            scale: 1.2,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // Complex book info nested stagger
      const bookInfoTl = gsap.timeline({ delay: 0.8 });
      bookInfoTl
        .fromTo(
          ".book-title",
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
            rotationX: -15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".book-author",
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".rating-stars .star",
          {
            opacity: 0,
            scale: 0,
            rotation: -180,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.3"
        )
        .fromTo(
          ".rating-text",
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .fromTo(
          ".status-badge",
          {
            opacity: 0,
            scale: 0,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // Complex action buttons nested animation
      const actionButtonsTl = gsap.timeline({ delay: 1.2 });
      actionButtonsTl
        .fromTo(
          ".primary-action-btn",
          {
            opacity: 0,
            y: 30,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(
          ".secondary-action-btn",
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.3"
        );

      // Complex book details nested animation
      const detailsTl = gsap.timeline({ delay: 1.5 });
      detailsTl
        .fromTo(
          ".details-header",
          {
            opacity: 0,
            x: -30,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".detail-item",
          {
            opacity: 0,
            x: -20,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          "-=0.3"
        )
        .fromTo(
          ".detail-item .detail-icon",
          {
            scale: 0,
            rotation: -90,
          },
          {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            stagger: 0.05,
          },
          "-=0.4"
        );

      // Complex content sections with nested scroll triggers
      gsap.utils
        .toArray<HTMLElement>(".content-section")
        .forEach((section, ) => {
          const sectionTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });

          sectionTl
            .fromTo(
              section,
              {
                opacity: 0,
                y: 80,
                scale: 0.95,
                rotationX: -10,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 0.8,
                ease: "power3.out",
              }
            )
            .fromTo(
              section.querySelector(".section-header"),
              {
                opacity: 0,
                x: -40,
                scale: 0.9,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.5"
            )
            .fromTo(
              section.querySelector(".section-header .header-icon"),
              {
                scale: 0,
                rotation: -180,
              },
              {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
              },
              "-=0.4"
            )
            .fromTo(
              section.querySelectorAll(".section-content > *"),
              {
                opacity: 0,
                y: 30,
                scale: 0.95,
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.1,
              },
              "-=0.3"
            );
        });

      // Setup complex hover interactions
      setupNestedHovers();
    },
    { scope: containerRef }
  );

  const setupNestedHovers = () => {
    // Complex action button hover with nested elements
    gsap.utils.toArray<HTMLElement>(".action-btn").forEach((btn) => {
      const icon = btn.querySelector(".btn-icon");
      const text = btn.querySelector(".btn-text");
      const glow = btn.querySelector(".btn-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(btn, {
          scale: 1.05,
          y: -5,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          glow,
          {
            opacity: 1,
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          icon,
          {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          text,
          {
            x: 3,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      btn.addEventListener("mouseenter", () => hoverTl.play());
      btn.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Complex similar book hover with nested animations
    gsap.utils.toArray<HTMLElement>(".similar-book").forEach((book) => {
      const icon = book.querySelector(".similar-icon");
      const dot = book.querySelector(".similar-dot");
      const title = book.querySelector(".similar-title");
      const author = book.querySelector(".similar-author");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(book, {
          y: -8,
          scale: 1.03,
          boxShadow: "0 15px 30px rgba(147, 51, 234, 0.2)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          icon,
          {
            scale: 1.3,
            rotation: 15,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          dot,
          {
            scale: 2,
            backgroundColor: "#8b5cf6",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .to(
          title,
          {
            color: "#7c3aed",
            scale: 1.05,
            x: 5,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          author,
          {
            x: 5,
            color: "#6366f1",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      book.addEventListener("mouseenter", () => hoverTl.play());
      book.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Complex review card hover with nested elements
    gsap.utils.toArray<HTMLElement>(".review-card").forEach((card) => {
      const avatar = card.querySelector(".review-avatar");
      const stars = card.querySelectorAll(".review-star");
      const text = card.querySelector(".review-text");
      const user = card.querySelector(".review-user");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          x: 8,
          scale: 1.02,
          boxShadow: "0 15px 30px rgba(59, 130, 246, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          avatar,
          {
            scale: 1.1,
            rotation: 5,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          stars,
          {
            scale: 1.1,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)",
            stagger: 0.05,
          },
          "-=0.3"
        )
        .to(
          user,
          {
            color: "#3b82f6",
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          text,
          {
            x: 5,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Complex donor section hover with nested animations
    const donorSection = containerRef.current?.querySelector(".donor-section");
    if (donorSection) {
      const avatar = donorSection.querySelector(".donor-avatar");
      const badge = donorSection.querySelector(".donor-badge");
      const name = donorSection.querySelector(".donor-name");
      const location = donorSection.querySelector(".donor-location");
      const stats = donorSection.querySelector(".donor-stats");
      const button = donorSection.querySelector(".donor-button");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(donorSection, {
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          avatar,
          {
            scale: 1.1,
            rotation: 3,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          badge,
          {
            scale: 1.2,
            y: -2,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          name,
          {
            color: "#3b82f6",
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          location,
          {
            x: 3,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          stats,
          {
            y: -2,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          button,
          {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      donorSection.addEventListener("mouseenter", () => hoverTl.play());
      donorSection.addEventListener("mouseleave", () => hoverTl.reverse());
    }

    // Complex key learnings hover with nested list items
    gsap.utils.toArray<HTMLElement>(".learning-item").forEach((item) => {
      const dot = item.querySelector(".learning-dot");
      const text = item.querySelector(".learning-text");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(item, {
          x: 8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          dot,
          {
            scale: 1.5,
            rotation: 180,
            backgroundColor: "#8b5cf6",
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        )
        .to(
          text,
          {
            color: "#374151",
            fontWeight: "600",
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.2"
        );

      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-200"
    >
      {/* Subtle Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <Sparkles className="sparkle-layer-1 absolute top-32 right-1/4 w-6 h-6 text-emerald-400/10" />
        <Star className="sparkle-layer-1 absolute bottom-1/3 left-1/4 w-5 h-5 text-blue-400/10" />
        <BookOpen className="sparkle-layer-2 absolute top-2/3 right-1/3 w-5 h-5 text-emerald-400/10" />
        <Award className="sparkle-layer-2 absolute top-1/4 left-1/2 w-4 h-4 text-amber-400/10" />
        <Eye className="sparkle-layer-1 absolute bottom-1/4 right-1/2 w-4 h-4 text-cyan-400/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Back Button */}
        <Link 
          href="/granthagar/books-catalog" 
          className="back-button inline-flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 bg-white dark:bg-[#141414] px-4 py-2 rounded-xl border border-slate-200 dark:border-[#303030] shadow-sm text-sm font-medium transition-colors"
        >
          <ArrowLeft className="back-icon w-4 h-4" />
          <span className="back-text">ক্যাটালগে ফিরে যান</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Book Cover & Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="book-cover-container bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 border border-slate-200 dark:border-[#303030] relative overflow-hidden">
              <div className="relative mb-6">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={400}
                  height={600}
                  className="book-cover-image w-full max-w-sm mx-auto rounded-xl shadow-md relative z-10"
                />

                {/* Floating badge */}
                <div className="bestseller-badge absolute -top-2.5 -right-2.5 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-20">
                  <Award className="w-3.5 h-3.5 inline mr-1" />
                  Bestseller
                </div>
              </div>

              <div className="book-info text-center mb-6 relative z-10">
                <h1 className="book-title text-2xl font-bold text-slate-900 dark:text-white mb-1.5 leading-tight">
                  {book.title}
                </h1>
                <p className="book-author text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                  লেখক: {book.author}
                </p>

                <div className="rating-stars flex items-center justify-center space-x-2 mb-4">
                  <div className="flex items-center space-x-0.5">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`star w-4 h-4 ${
                          index < Math.floor(book.rating)
                            ? "text-amber-400 fill-current"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="rating-text text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {book.rating}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({book.totalReviews} টি রিভিউ)
                  </span>
                </div>

                <div className="status-badge inline-flex items-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
                  {book.status === "Available" ? "উপলব্ধ" : "ধার নেওয়া"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6 relative z-10">
                <Link
                  href="/granthagar/request-book"
                  className="action-btn primary-action-btn w-full block text-center bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
                >
                  <span className="btn-text">বইটির জন্য অনুরোধ করুন</span>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <button className="action-btn secondary-action-btn bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#262626] text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl font-medium text-xs transition-colors flex items-center justify-center space-x-2 border border-slate-200 dark:border-[#303030]">
                    <Heart className="btn-icon w-4 h-4 text-rose-500" />
                    <span className="btn-text">সংরক্ষণ</span>
                  </button>
                  <button className="action-btn secondary-action-btn bg-slate-50 dark:bg-[#1a1a1a] hover:bg-slate-100 dark:hover:bg-[#262626] text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl font-medium text-xs transition-colors flex items-center justify-center space-x-2 border border-slate-200 dark:border-[#303030]">
                    <Share2 className="btn-icon w-4 h-4" />
                    <span className="btn-text">শেয়ার</span>
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="border-t border-slate-100 dark:border-[#262626] pt-6 relative z-10">
                <h3 className="details-header text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  বইয়ের বিবরণ
                </h3>

                <div className="space-y-2">
                  {[
                    { label: "মোট পৃষ্ঠা", value: book.pages, icon: "📖" },
                    { label: "ভাষা", value: book.language, icon: "🌐" },
                    { label: "প্রকাশের সাল", value: book.publishYear, icon: "📅" },
                    { label: "ক্যাটাগরি", value: book.category, icon: "📚" },
                    { label: "যুক্ত করার তারিখ", value: book.dateAdded, icon: "⏰" },
                  ].map((detail, index) => (
                    <div
                      key={index}
                      className="detail-item flex items-center justify-between p-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-lg border border-slate-100 dark:border-[#262626] text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{detail.icon}</span>
                        <span className="text-slate-500 dark:text-slate-400">{detail.label}:</span>
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content lg:col-span-2 space-y-6">
            {/* Donor Info */}
            <div className="content-section bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <h2 className="section-header text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                দান করেছেন
              </h2>

              <div className="section-content">
                <div className="donor-section flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-[#262626]">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={book.donorPhoto}
                      alt={book.donor}
                      width={64}
                      height={64}
                      className="donor-avatar w-14 h-14 rounded-full border border-slate-200 dark:border-[#303030] shadow-sm object-cover"
                    />
                    <div>
                      <h3 className="donor-name text-base font-semibold text-slate-900 dark:text-white">
                        {book.donor}
                      </h3>
                      <div className="donor-location flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{book.donorLocation}</span>
                      </div>
                      <span className="inline-block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded text-[11px] font-medium border border-emerald-200 dark:border-emerald-800/40">
                        সক্রিয় দাতা • 12 টি বই অবদান
                      </span>
                    </div>
                  </div>

                  <Link 
                    href="/granthagar/donors"
                    className="donor-button bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm text-center"
                  >
                    প্রোফাইল দেখুন
                  </Link>
                </div>
              </div>
            </div>

            {/* Description & Key Learnings */}
            <div className="content-section bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <h2 className="section-header text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                বই পরিচিতি
              </h2>

              <div className="section-content">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">
                  {book.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-5 border border-slate-200 dark:border-[#262626]">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center space-x-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>মূল শিক্ষণীয় বিষয়</span>
                    </h3>
                    <ul className="space-y-2">
                      {book.keyLearnings.map((learning, index) => (
                        <li
                          key={index}
                          className="learning-item flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          <span className="text-emerald-500 font-bold">•</span>
                          <span className="learning-text">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-5 border border-slate-200 dark:border-[#262626]">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center space-x-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>কেন এই বইটি পড়বেন?</span>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {book.whyRead}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reader Reviews */}
            <div className="content-section bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <div className="section-header flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <Star className="w-5 h-5 text-amber-400 mr-2 fill-current" />
                  পাঠকদের মতামত ও রিভিউ
                </h2>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm">
                  রিভিউ লিখুন
                </button>
              </div>

              <div className="section-content space-y-4">
                {book.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-card bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-200 dark:border-[#262626]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-9 h-9 bg-slate-200 dark:bg-[#262626] rounded-full flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-300">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="review-user font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {review.user}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs">
                            <div className="flex items-center space-x-0.5">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`w-3 h-3 ${
                                    index < review.rating
                                      ? "text-amber-400 fill-current"
                                      : "text-slate-300 dark:text-slate-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <p className="review-text text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Books */}
            <div className="content-section bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <h2 className="section-header text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Eye className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                অনুরূপ অন্যান্য বই
              </h2>

              <div className="section-content grid grid-cols-1 sm:grid-cols-3 gap-4">
                {book.similarBooks.map((similarBook, index) => (
                  <div
                    key={index}
                    className="similar-book bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-4 border border-slate-200 dark:border-[#262626] hover:border-emerald-500/50 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-2">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="similar-title font-semibold text-slate-900 dark:text-white text-xs mb-1 truncate">
                      {similarBook.title}
                    </h4>
                    <p className="similar-author text-[11px] text-slate-500 dark:text-slate-400">
                      লেখক: {similarBook.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion Section */}
            <div className="content-section bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <div className="section-header flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                  <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                  বই নিয়ে আলোচনা
                </h2>
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
                  3 comments
                </span>
              </div>

              <div className="section-content bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-slate-200 dark:border-[#262626] text-center">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                  আলোচনায় অংশ নিন!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 max-w-md mx-auto">
                  বইটি সম্পর্কে আপনার ভাবনা ও মতামত কমিউনিটির সাথে শেয়ার করুন এবং নতুন দৃষ্টিভঙ্গি আবিষ্কার করুন।
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-6 rounded-xl font-medium text-xs shadow-sm transition-colors active:scale-[0.99]">
                  মন্তব্য করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
