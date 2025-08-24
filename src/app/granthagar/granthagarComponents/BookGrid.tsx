"use client";

import React, { useRef } from "react";
import {
  Star,
  Heart,
  User,
  MapPin,
  Clock,
  Eye,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface BookGridProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

const BookGrid: React.FC<BookGridProps> = ({
  searchTerm,
  selectedCategory,
  selectedStatus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const books = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      donor: "Ahmed Rahman",
      donorLocation: "Dhanmondi",
      status: "Available",
      category: "Philosophy",
      summary:
        "A young shepherd's journey to find treasure teaches us about following our dreams.",
      dateAdded: "2024-01-15",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 2,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      donor: "Fatima Khan",
      donorLocation: "Gulshan",
      status: "Available",
      category: "History",
      summary:
        "A fascinating look at how humans became the dominant species on Earth.",
      dateAdded: "2024-01-20",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      donor: "Rafiq Uddin",
      donorLocation: "Banani",
      status: "Borrowed",
      category: "Self-Help",
      summary:
        "Learn how tiny changes can create remarkable results in your life.",
      dateAdded: "2024-01-10",
      borrowedBy: "Sarah Ahmed",
      returnDate: "2024-02-10",
    },
    {
      id: 4,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      donor: "Nasreen Akter",
      donorLocation: "Uttara",
      status: "Available",
      category: "Fiction",
      summary:
        "A dystopian masterpiece about surveillance, control, and the power of truth.",
      dateAdded: "2024-01-25",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 5,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      donor: "Karim Hassan",
      donorLocation: "Mirpur",
      status: "Available",
      category: "Business",
      summary:
        "Understanding how psychology influences our financial decisions.",
      dateAdded: "2024-02-01",
      borrowedBy: null,
      returnDate: null,
    },
    {
      id: 6,
      title: "Brief Answers to Big Questions",
      author: "Stephen Hawking",
      cover:
        "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.5,
      donor: "Dr. Rahman",
      donorLocation: "Wari",
      status: "Borrowed",
      category: "Science",
      summary:
        "The great physicist's final thoughts on the universe's biggest mysteries.",
      dateAdded: "2024-01-30",
      borrowedBy: "Mahmud Ali",
      returnDate: "2024-02-15",
    },
  ];

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.donor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      book.category.toLowerCase() === selectedCategory;

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "available" && book.status === "Available") ||
      (selectedStatus === "borrowed" && book.status === "Borrowed");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  useGSAP(
    () => {
      // Sort controls animation
      gsap.fromTo(
        ".sort-controls",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );

      // Book cards staggered entrance
      gsap.fromTo(
        ".book-card",
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 1,
            grid: "auto",
            from: "start",
          },
          scrollTrigger: {
            trigger: ".books-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover effects
      gsap.utils.toArray<HTMLElement>(".book-card").forEach((card) => {
        const image = card.querySelector(".book-image");
      
        const buttons = card.querySelectorAll(".book-button");

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(card, {
            y: -8,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            image,
            {
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            buttons,
            {
              y: -2,
              duration: 0.2,
              ease: "power2.out",
              stagger: 0.05,
            },
            "-=0.2"
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });

      // Empty state animation
      if (filteredBooks.length === 0) {
        gsap.fromTo(
          ".empty-state",
          { opacity: 0, scale: 0.9, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    },
    { scope: containerRef, dependencies: [filteredBooks.length] }
  );

  return (
    <div ref={containerRef}>
      {/* Enhanced Sort Controls */}
      <div className="sort-controls flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <p className="text-gray-700 font-semibold">
            Showing{" "}
            <span className="text-blue-600 font-bold">
              {filteredBooks.length}
            </span>{" "}
            of <span className="font-bold">{books.length}</span> books
          </p>
        </div>

        <select className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300">
          <option>📅 Sort by: Recently Added</option>
          <option>⭐ Sort by: Rating</option>
          <option>🔤 Sort by: Title A-Z</option>
          <option>👤 Sort by: Author A-Z</option>
        </select>
      </div>

      {/* Enhanced Books Grid */}
      <div className="books-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="book-card bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-gray-100/50 group cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <Image
                src={book.cover}
                alt={book.title}
                width={500}
                height={192}
                className="book-image w-full h-48 object-cover transition-all duration-500"
              />

              {/* Enhanced Status Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border ${
                    book.status === "Available"
                      ? "bg-emerald-50/90 text-emerald-700 border-emerald-200"
                      : "bg-amber-50/90 text-amber-700 border-amber-200"
                  }`}
                >
                  {book.status === "Available" ? "✅ Available" : "📚 Borrowed"}
                </span>
              </div>

              {/* Enhanced Heart Button */}
              <button className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg border border-white/50">
                <Heart className="w-5 h-5 text-red-500" />
              </button>

              {/* Quick View Button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Quick View</span>
                </button>
              </div>
            </div>

            <div className="book-content p-6">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  📖 {book.category}
                </span>
              </div>

              {/* Title & Author */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors duration-300">
                {book.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 font-medium">
                by {book.author}
              </p>

              {/* Rating & Donor */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-bold text-gray-700">
                    {book.rating}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span className="font-medium">{book.donor}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-4">
                <MapPin className="w-3 h-3" />
                <span className="font-medium">{book.donorLocation}</span>
              </div>

              {/* Borrowed Status Info */}
              {book.status === "Borrowed" && book.returnDate && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-3 mb-4 border border-amber-200">
                  <div className="flex items-center space-x-1 text-xs text-amber-800 mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="font-semibold">
                      Returns on {book.returnDate}
                    </span>
                  </div>
                  <div className="text-xs text-amber-700 font-medium">
                    📚 Borrowed by {book.borrowedBy}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button className="book-button flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-300 shadow-lg">
                  View Details
                </button>
                <button
                  className={`book-button flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    book.status === "Available"
                      ? "bg-gradient-to-r from-emerald-100 to-green-100 hover:from-emerald-200 hover:to-green-200 text-emerald-800 border border-emerald-200"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
                  }`}
                  disabled={book.status !== "Available"}
                >
                  {book.status === "Available"
                    ? "📖 Request"
                    : "❌ Unavailable"}
                </button>
              </div>
            </div>

            {/* Decorative Sparkle */}
            <Sparkles className="absolute bottom-4 right-4 w-4 h-4 text-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredBooks.length === 0 && (
        <div className="empty-state text-center py-20">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
            <div className="text-4xl">📚</div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No books found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your search terms or filter criteria to find the
            perfect book
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Reset Filters
          </button>
        </div>
      )}

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
  );
};

export default BookGrid;
