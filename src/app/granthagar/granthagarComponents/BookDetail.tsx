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
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    donor: "Ahmed Rahman",
    donorPhoto:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    donorLocation: "Dhanmondi",
    status: "Available",
    category: "Philosophy",
    pages: 163,
    language: "English",
    publishYear: 1988,
    isbn: "978-0062315007",
    dateAdded: "January 15, 2024",
    description:
      "The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988. Originally written in Portuguese, it became a widely translated international bestseller. An allegorical novel, The Alchemist follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
    keyLearnings: [
      "Follow your personal legend and dreams",
      "Listen to your heart and the universe",
      "The treasure is often the journey itself",
      "Fear is the greatest obstacle to achieving dreams",
    ],
    whyRead:
      "This timeless tale will inspire you to pursue your dreams fearlessly and understand that the journey of self-discovery is often more valuable than the destination itself.",
    reviews: [
      {
        id: 1,
        user: "Sarah Ahmed",
        rating: 5,
        date: "2 weeks ago",
        text: "Life-changing book! Paulo Coelho's writing style is simple yet profound.",
      },
      {
        id: 2,
        user: "Karim Hassan",
        rating: 4,
        date: "1 month ago",
        text: "Beautiful story about following your dreams. Highly recommended!",
      },
    ],
    similarBooks: [
      { title: "The Prophet", author: "Kahlil Gibran" },
      { title: "Jonathan Livingston Seagull", author: "Richard Bach" },
      { title: "The Celestine Prophecy", author: "James Redfield" },
    ],
  };

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
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Enhanced Floating Background Elements with Multiple Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="book-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
        <div className="book-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
        <div className="book-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>

        <Sparkles className="sparkle-layer-1 absolute top-32 right-1/4 w-6 h-6 text-blue-300/30" />
        <Star className="sparkle-layer-1 absolute bottom-1/3 left-1/4 w-5 h-5 text-purple-300/25" />
        <BookOpen className="sparkle-layer-2 absolute top-2/3 right-1/3 w-5 h-5 text-emerald-300/35" />
        <Award className="sparkle-layer-2 absolute top-1/4 left-1/2 w-4 h-4 text-amber-300/30" />
        <Eye className="sparkle-layer-1 absolute bottom-1/4 right-1/2 w-4 h-4 text-cyan-300/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Back Button with Nested Elements */}
        <button className="back-button flex items-center space-x-3 text-blue-600 hover:text-blue-800 mb-8 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-blue-200/50 shadow-lg transition-all duration-300">
          <ArrowLeft className="back-icon w-5 h-5" />
          <span className="back-text font-semibold">Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced Book Cover with Complex Nested Animations */}
          <div className="lg:col-span-1">
            <div className="book-cover-container bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8  top-8 border border-gray-100/50 relative overflow-hidden">
              {/* Background Glow Effect */}
              <div className="book-cover-glow absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-xl"></div>

              <div className="relative mb-8">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={400}
                  height={600}
                  className="book-cover-image w-full max-w-sm mx-auto rounded-2xl shadow-2xl relative z-10"
                />

                {/* Floating badge with nested animation */}
                <div className="bestseller-badge absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Award className="w-4 h-4 inline mr-1" />
                  Bestseller
                </div>
              </div>

              <div className="book-info text-center mb-8 relative z-10">
                <h1 className="book-title text-3xl font-black text-gray-900 mb-3 leading-tight">
                  {book.title}
                </h1>
                <p className="book-author text-xl text-gray-600 mb-4 font-medium">
                  by {book.author}
                </p>

                <div className="rating-stars flex items-center justify-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`star w-6 h-6 ${
                          index < Math.floor(book.rating)
                            ? "text-amber-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="rating-text text-lg font-semibold text-gray-700">
                    {book.rating}
                  </span>
                  <span className="text-gray-500">
                    ({book.totalReviews} reviews)
                  </span>
                </div>

                <div className="status-badge inline-flex items-center bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold border border-emerald-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  {book.status}
                </div>
              </div>

              {/* Enhanced Action Buttons with Nested Elements */}
              <div className="space-y-4 mb-8 relative z-10">
                <button className="action-btn primary-action-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl border border-blue-500/20 relative overflow-hidden">
                  <div className="btn-glow absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 blur-sm"></div>
                  <span className="btn-text relative z-10">
                    Request This Book
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="action-btn secondary-action-btn bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200 shadow-lg relative overflow-hidden">
                    <div className="btn-glow absolute -inset-1 bg-gradient-to-r from-gray-200/20 to-blue-200/20 rounded-2xl opacity-0 blur-sm"></div>
                    <Heart className="btn-icon w-5 h-5 relative z-10" />
                    <span className="btn-text relative z-10">Save</span>
                  </button>
                  <button className="action-btn secondary-action-btn bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 border border-gray-200 shadow-lg relative overflow-hidden">
                    <div className="btn-glow absolute -inset-1 bg-gradient-to-r from-gray-200/20 to-blue-200/20 rounded-2xl opacity-0 blur-sm"></div>
                    <Share2 className="btn-icon w-5 h-5 relative z-10" />
                    <span className="btn-text relative z-10">Share</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Book Details with Nested Animations */}
              <div className="border-t border-gray-200 pt-8 relative z-10">
                <h3 className="details-header text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="header-icon w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  Book Details
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Pages", value: book.pages, icon: "📖" },
                    { label: "Language", value: book.language, icon: "🌐" },
                    { label: "Published", value: book.publishYear, icon: "📅" },
                    { label: "Category", value: book.category, icon: "📚" },
                    { label: "Added", value: book.dateAdded, icon: "⏰" },
                  ].map((detail, index) => (
                    <div
                      key={index}
                      className="detail-item flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="detail-icon text-lg">
                          {detail.icon}
                        </span>
                        <span className="text-gray-600 font-medium">
                          {detail.label}:
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content with Complex Nested Animations */}
          <div className="main-content lg:col-span-2 space-y-8">
            {/* Enhanced Donor Info with Nested Elements */}
            <div className="content-section bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <h2 className="section-header text-2xl font-black text-gray-900 mb-6 flex items-center">
                <div className="header-icon w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-white" />
                </div>
                Donated By
              </h2>

              <div className="section-content">
                <div className="donor-section flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200/50 cursor-pointer">
                  <div className="relative">
                    <Image
                      src={book.donorPhoto}
                      alt={book.donor}
                      width={80}
                      height={80}
                      className="donor-avatar w-20 h-20 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="donor-badge absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="donor-name text-xl font-bold text-gray-900 mb-2">
                      {book.donor}
                    </h3>
                    <div className="donor-location flex items-center space-x-2 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{book.donorLocation}</span>
                    </div>
                    <div className="donor-stats flex items-center space-x-4 text-sm">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                        Active donor
                      </span>
                      <span className="text-gray-500">
                        12 books contributed
                      </span>
                    </div>
                  </div>

                  <button className="donor-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg">
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Description with Nested Learning Items */}
            <div className="content-section bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <h2 className="section-header text-2xl font-black text-gray-900 mb-6 flex items-center">
                <div className="header-icon w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mr-3">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                About This Book
              </h2>

              <div className="section-content">
                <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                  {book.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span>Key Learnings</span>
                    </h3>
                    <ul className="space-y-3">
                      {book.keyLearnings.map((learning, index) => (
                        <li
                          key={index}
                          className="learning-item flex items-start space-x-3 cursor-pointer"
                        >
                          <div className="learning-dot w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="learning-text text-gray-700 font-medium leading-relaxed">
                            {learning}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/50">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                      <span>Why You Should Read This</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {book.whyRead}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Reviews with Nested Elements */}
            <div className="content-section bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <div className="section-header flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 flex items-center">
                  <div className="header-icon w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-3">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  Reader Reviews
                </h2>
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg">
                  Write Review
                </button>
              </div>

              <div className="section-content space-y-6">
                {book.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="review-card bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200/50 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="review-avatar w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="review-user font-bold text-gray-900 text-lg">
                            {review.user}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`review-star w-4 h-4 ${
                                    index < review.rating
                                      ? "text-amber-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {review.date}
                            </span>
                          </div>
                        </div>
                        <p className="review-text text-gray-700 leading-relaxed font-medium">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Similar Books with Nested Elements */}
            <div className="content-section bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <h2 className="section-header text-2xl font-black text-gray-900 mb-6 flex items-center">
                <div className="header-icon w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                Similar Books You Might Like
              </h2>

              <div className="section-content grid grid-cols-1 md:grid-cols-3 gap-6">
                {book.similarBooks.map((similarBook, index) => (
                  <div
                    key={index}
                    className="similar-book bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="similar-icon w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div className="similar-dot w-2 h-2 bg-purple-400 rounded-full transition-all duration-300"></div>
                    </div>
                    <h4 className="similar-title font-bold text-gray-900 mb-2 transition-all duration-300">
                      {similarBook.title}
                    </h4>
                    <p className="similar-author text-gray-600 font-medium transition-all duration-300">
                      by {similarBook.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Discussion Section */}
            <div className="content-section bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100/50">
              <div className="section-header flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 flex items-center">
                  <div className="header-icon w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mr-3">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  Book Discussion
                </h2>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                  3 comments
                </span>
              </div>

              <div className="section-content bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Join the Conversation!
                  </h3>
                  <p className="text-green-800 mb-6 font-medium">
                    Share your thoughts about this book with the community and
                    discover new perspectives.
                  </p>
                  <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl">
                    Join Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
          {[
            "📚 Verified Books",
            "🤝 Trusted Community",
            "⚡ Quick Exchange",
            "💯 Quality Guaranteed",
          ].map((indicator, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-sm font-medium"
            >
              <span>{indicator}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
