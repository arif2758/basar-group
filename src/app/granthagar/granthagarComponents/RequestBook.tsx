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
      requestedBy: "আপনি",
      expectedDate: "2024-02-10",
      status: "নিশ্চিত হয়েছে",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      requestedBy: "মাহমুদ হাসান",
      expectedDate: "2024-02-15",
      status: "পথে রয়েছে (In Transit)",
    },
    {
      id: 3,
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen Covey",
      requestedBy: "আয়েশা সিদ্দিকা",
      expectedDate: "2024-02-20",
      status: "প্রক্রিয়াধীন",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="mb-8 text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            বইয়ের অনুরোধ ও পরামর্শ (Request a Book)
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            আপনার কাঙ্ক্ষিত বইটি লাইব্রেরিতে খুঁজে পাচ্ছেন না? অনুরোধ জানান, আমরা আমাদের সংগ্রহে যুক্ত করার সর্বোচ্চ চেষ্টা করব!
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] mb-8 overflow-hidden">
          <div className="flex bg-slate-50/50 dark:bg-[#1a1a1a]/50">
            <button
              onClick={() => handleTabChange("request")}
              className={`flex-1 py-3.5 px-6 font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                activeTab === "request"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#141414]"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              নতুন বইয়ের অনুরোধ
            </button>
            <button
              onClick={() => handleTabChange("incoming")}
              className={`flex-1 py-3.5 px-6 font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                activeTab === "incoming"
                  ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#141414]"
                  : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              শীঘ্রই আসছে এমন বই
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
          নতুন বইয়ের জন্য অনুরোধ ফর্ম
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          নিচের ফর্মটি পূরণ করে আপনার কাঙ্ক্ষিত বইটির তথ্য প্রদান করুন।
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              বইয়ের নাম *
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="বইয়ের নাম লিখুন"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              লেখকের নাম *
            </label>
            <input
              type="text"
              id="author"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              placeholder="লেখকের নাম লিখুন"
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
              ক্যাটাগরি
            </label>
            <select
              id="category"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="">ক্যাটাগরি নির্বাচন করুন</option>
              <option value="fiction">ফিকশন</option>
              <option value="non-fiction">নন-ফিকশন</option>
              <option value="science">বিজ্ঞান ও প্রযুক্তি</option>
              <option value="history">ইতিহাস</option>
              <option value="philosophy">দর্শন</option>
              <option value="self-help">আত্মউন্নয়ন (Self-Help)</option>
              <option value="biography">জীবনী</option>
              <option value="business">ব্যবসা ও ক্যারিয়ার</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
            >
              অনুরোধের অগ্রাধিকার (Priority)
            </label>
            <select
              id="priority"
              className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              <option value="normal">সাধারণ (Normal)</option>
              <option value="high">উচ্চ (অ্যাকাডেমিক প্রয়োজন)</option>
              <option value="urgent">জরুরি (পরীক্ষা বা অ্যাসাইনমেন্ট)</option>
            </select>
          </div>
        </div>

        <div className="form-element">
          <label
            htmlFor="reason"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            বইটি আপনার কেন প্রয়োজন? *
          </label>
          <textarea
            id="reason"
            rows={3}
            className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            placeholder="বইটি আপনার জন্য কেন গুরুত্বপূর্ণ তা সংক্ষেপে লিখুন..."
            required
          ></textarea>
        </div>

        <div className="form-element">
          <label
            htmlFor="additional-info"
            className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            অতিরিক্ত তথ্য
          </label>
          <textarea
            id="additional-info"
            rows={2}
            className="w-full px-3.5 py-2.5 border border-slate-300 dark:border-[#303030] rounded-lg bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            placeholder="যেমন: ISBN, প্রকাশনী বা সংস্করণের তথ্য..."
          ></textarea>
        </div>

        <div className="form-element bg-slate-50 dark:bg-[#1a1a1a] rounded-lg p-4 border border-slate-200 dark:border-[#262626]">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
            পরবর্তী ধাপসমূহ কী?
          </h3>
          <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>• 24 ঘণ্টার মধ্যে আমরা আপনার অনুরোধ পর্যালোচনা করব</li>
            <li>• অনুমোদন পেলে দাতাদের মাধ্যমে বইটি সংগ্রহের উদ্যোগ নেওয়া হবে</li>
            <li>• বইটি লাইব্রেরিতে যুক্ত হওয়ামাত্রই আপনাকে নোটিফিকেশন পাঠানো হবে</li>
            <li>• অনুরোধকারী পাঠক হিসেবে বইটি প্রথম পড়ার অগ্রাধিকার পাবেন</li>
          </ul>
        </div>

        <button
          type="submit"
          className="submit-button w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors active:scale-[0.99]"
        >
          <Send className="w-4 h-4" />
          <span>অনুরোধ জমা দিন</span>
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
          শীঘ্রই লাইব্রেরিতে যুক্ত হচ্ছে
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          অনুরোধকৃত বইগুলোর বর্তমান স্থিতি ও আগমন ট্র্যাক করুন।
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
                      book.status === "নিশ্চিত হয়েছে"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40"
                        : book.status.includes("In Transit")
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/40"
                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/40"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">লেখক: {book.author}</p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>প্রত্যাশিত তারিখ: {book.expectedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>অনুরোধ করেছেন: {book.requestedBy}</span>
                  </div>
                </div>
              </div>

              <div>
                {book.requestedBy === "আপনি" ? (
                  <span className="inline-block bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-200 dark:border-emerald-800/40">
                    আপনার অনুরোধ
                  </span>
                ) : (
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm active:scale-[0.99]">
                    অগ্রিম বুকিং
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
              আপনার অনুরোধকৃত বইটি কি তালিকায় নেই?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs mb-3">
              যদি আপনার অনুরোধকৃত বইটি তালিকায় না দেখতে পান, তবে তা এখনো পর্যালোচনাধীন থাকতে পারে। যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
            </p>
            <a
              href="/contact"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
            >
              যোগাযোগ করুন
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBook;
