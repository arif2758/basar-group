"use client";

import React, { useState, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { Plus, Calendar, Clock, BookOpen, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

interface Book {
  id: number;
  title: string;
  author: string;
  requestedBy: string;
  expectedDate: string;
  status: string;
}

const RequestBook: React.FC = () => {
  const [activeTab, setActiveTab] = useState("request");
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  const handleTabChange = (tab: string) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  const incomingBooks = [
    {
      id: 1,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      requestedBy: "You",
      expectedDate: "2024-02-10",
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      requestedBy: "Mahmud Hassan",
      expectedDate: "2024-02-15",
      status: "In Transit",
    },
    {
      id: 3,
      title: "The 7 Habits",
      author: "Stephen Covey",
      requestedBy: "Ayesha Siddique",
      expectedDate: "2024-02-20",
      status: "Processing",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            Request & Suggest Books
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Can&apos;t find a book you&apos;re looking for? Request it and
            we&apos;ll try to add it to our collection!
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] mb-8 overflow-hidden">
          <div className="flex border-b border-slate-200 dark:border-[#303030] bg-slate-50/50 dark:bg-[#1a1a1a]/50">
            <button
              onClick={() => handleTabChange("request")}
              className={`flex-1 py-3.5 px-6 font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                activeTab === "request"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#141414]"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Request New Book
            </button>
            <button
              onClick={() => handleTabChange("incoming")}
              className={`flex-1 py-3.5 px-6 font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                activeTab === "incoming"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#141414]"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Incoming Books
            </button>
          </div>

          <div ref={contentRef} className="p-6 sm:p-8">
            {activeTab === "request" ? (
              <RequestForm />
            ) : (
              <IncomingBooks books={incomingBooks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      // Form elements animation
      const formElements = formRef.current?.querySelectorAll(".form-element");
      formElements?.forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: formRef }
  );

  return (
    <div ref={formRef}>
      <div className="form-element mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Request a New Book
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Fill out the form below and we&apos;ll do our best to add your
          requested book to our collection.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Enter the book title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Author Name *
            </label>
            <input
              type="text"
              id="author"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="Enter the author name"
              required
            />
          </div>
        </div>

        <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="category"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="">Select category</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="science">Science & Technology</option>
              <option value="history">History</option>
              <option value="philosophy">Philosophy</option>
              <option value="self-help">Self-Help</option>
              <option value="biography">Biography</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Request Priority
            </label>
            <select
              id="priority"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="normal">Normal</option>
              <option value="high">High (Academic Need)</option>
              <option value="urgent">Urgent (Exam/Assignment)</option>
            </select>
          </div>
        </div>

        <div className="form-element">
          <label
            htmlFor="reason"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Why do you want this book? *
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            placeholder="Tell us why this book is important to you..."
            required
          ></textarea>
        </div>

        <div className="form-element">
          <label
            htmlFor="additional-info"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Additional Information
          </label>
          <textarea
            id="additional-info"
            rows={2}
            className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            placeholder="Any additional details like ISBN, edition, or publisher..."
          ></textarea>
        </div>

        <div className="form-element bg-slate-50 dark:bg-[#1a1a1a] rounded-lg p-4 border border-slate-200 dark:border-[#262626]">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
            What happens next?
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>• We&apos;ll review your request within 24 hours</li>
            <li>• If approved, we&apos;ll source the book from our donors</li>
            <li>• You&apos;ll be notified as soon as the book is available</li>
            <li>• Priority borrowing access for the requester</li>
          </ul>
        </div>

        <button
          type="submit"
          className="submit-button w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors active:scale-[0.99]"
        >
          <Send className="w-4 h-4" />
          <span>Submit Request</span>
        </button>
      </form>
    </div>
  );
};

const IncomingBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  const booksRef = useRef<HTMLDivElement>(null);

  useScrollAnimation();
  useGSAP(
    () => {
      const bookCards = booksRef.current?.querySelectorAll(".book-card");
      bookCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      });
    },
    { scope: booksRef }
  );

  return (
    <div ref={booksRef}>
      <div className="books-header mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          Books Coming Soon
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Track the status of requested books and see what&apos;s arriving in
          our collection.
        </p>
      </div>

      <div className="space-y-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card border border-slate-200 dark:border-[#303030] bg-slate-50/50 dark:bg-[#1a1a1a] rounded-xl p-4 sm:p-5 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    {book.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      book.status === "Confirmed"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                        : book.status === "In Transit"
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/40"
                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">by {book.author}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Expected: {book.expectedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Requested by: {book.requestedBy}</span>
                  </div>
                </div>
              </div>

              <div>
                {book.requestedBy === "You" ? (
                  <span className="inline-block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
                    Your Request
                  </span>
                ) : (
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm active:scale-[0.99]">
                    Reserve Spot
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-section mt-8 bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
        <div className="flex items-start space-x-3">
          <Plus className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
              Don&apos;t see your requested book?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
              If you&apos;ve requested a book and don&apos;t see it in the list
              above, it might still be under review. Feel free to contact us or
              submit a new request.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBook;
