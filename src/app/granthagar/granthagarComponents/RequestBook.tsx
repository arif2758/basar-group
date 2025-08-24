"use client";

"use client";

import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Plus, Calendar, Clock, BookOpen, Send } from "lucide-react";

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

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Tabs Container Animation
      gsap.fromTo(
        tabsRef.current,
        {
          opacity: 0,
          y: 30,
          rotationX: 10,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
        }
      );

      // Content Animation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // Tab buttons hover effect
      const tabButtons = tabsRef.current?.querySelectorAll("button");
      tabButtons?.forEach((button) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.02,
            y: -2,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const handleTabChange = (tab: string) => {
    // Animate out current content
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setActiveTab(tab);
        // Animate in new content
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          }
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
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={headerRef} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Request & Suggest Books
          </h1>
          <p className="text-gray-600 text-lg">
            Can&apos;t find a book you&apos;re looking for? Request it and
            we&apos;ll try to add it to our collection!
          </p>
        </div>

        {/* Tabs */}
        <div ref={tabsRef} className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => handleTabChange("request")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "request"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Request New Book
            </button>
            <button
              onClick={() => handleTabChange("incoming")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "incoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Incoming Books
            </button>
          </div>

          <div ref={contentRef} className="p-8">
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

  useGSAP(
    () => {
      // Form elements animation
      const formElements = formRef.current?.querySelectorAll(".form-element");
      formElements?.forEach((element, index) => {
        gsap.fromTo(
          element,
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
            delay: index * 0.1,
            ease: "power2.out",
          }
        );
      });

      // Input focus animations
      const inputs = formRef.current?.querySelectorAll(
        "input, select, textarea"
      );
      inputs?.forEach((input) => {
        const inputElement = input as HTMLElement;
        inputElement.addEventListener("focus", () => {
          gsap.to(inputElement, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        inputElement.addEventListener("blur", () => {
          gsap.to(inputElement, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

      // Submit button hover effect
      const submitButton = formRef.current?.querySelector(".submit-button");
      if (submitButton) {
        const buttonElement = submitButton as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            y: -3,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      }
    },
    { scope: formRef }
  );

  return (
    <div ref={formRef}>
      <div className="form-element mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request a New Book
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we&apos;ll do our best to add your
          requested book to our collection.
        </p>
      </div>

      <form className="space-y-6">
        <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter the book title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Author Name *
            </label>
            <input
              type="text"
              id="author"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter the author name"
              required
            />
          </div>
        </div>

        <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Request Priority
            </label>
            <select
              id="priority"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Why do you want this book? *
          </label>
          <textarea
            id="reason"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Tell us why this book is important to you and how it will help your learning journey..."
            required
          ></textarea>
        </div>

        <div className="form-element">
          <label
            htmlFor="additional-info"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Information
          </label>
          <textarea
            id="additional-info"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Any additional details like ISBN, edition, publisher, or where you heard about this book..."
          ></textarea>
        </div>

        <div className="form-element bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="space-y-1 text-blue-800">
            <li>• We&apos;ll review your request within 24 hours</li>
            <li>
              • If approved, we&apos;ll try to source the book from donors or
              purchase it
            </li>
            <li>• You&apos;ll be notified when the book is available</li>
            <li>
              • As the requester, you&apos;ll get priority access to borrow it
              first
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="submit-button w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg"
        >
          <Send className="w-5 h-5" />
          <span>Submit Request</span>
        </button>
      </form>
    </div>
  );
};

const IncomingBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  const booksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      const header = booksRef.current?.querySelector(".books-header");
      if (header) {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Book cards animation
      const bookCards = booksRef.current?.querySelectorAll(".book-card");
      bookCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 100,
            rotationY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out",
          }
        );

        // Hover effect for book cards
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Contact section animation
      const contactSection =
        booksRef.current?.querySelector(".contact-section");
      if (contactSection) {
        gsap.fromTo(
          contactSection,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
          }
        );
      }

      // Button hover effects
      const buttons = booksRef.current?.querySelectorAll("button");
      buttons?.forEach((button) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.05,
            y: -2,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: booksRef }
  );

  return (
    <div ref={booksRef}>
      <div className="books-header mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Books Coming Soon
        </h2>
        <p className="text-gray-600">
          Track the status of requested books and see what&apos;s arriving in
          our collection.
        </p>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-card border border-gray-200 rounded-lg p-6 shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {book.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      book.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : book.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-3">by {book.author}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Expected: {book.expectedDate}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Requested by: {book.requestedBy}</span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                {book.requestedBy === "You" ? (
                  <button className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                    Your Request
                  </button>
                ) : (
                  <button className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">
                    Reserve Spot
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-section mt-8 bg-orange-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Plus className="w-6 h-6 text-orange-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              Don&apos;t see your requested book?
            </h3>
            <p className="text-orange-800 mb-4">
              If you&apos;ve requested a book and don&apos;t see it in the list
              above, it might still be under review. Feel free to contact us or
              submit a new request.
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBook;
