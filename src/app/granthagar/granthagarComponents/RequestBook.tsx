"use client";

import React, { useState } from "react";
import { Plus, Calendar, Clock, BookOpen, Send } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Request & Suggest Books
          </h1>
          <p className="text-gray-600 text-lg">
            Can&asop;t find a book you&asop;re looking for? Request it and
            we&asop;ll try to add it to our collection!
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "request"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Request New Book
            </button>
            <button
              onClick={() => setActiveTab("incoming")}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === "incoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Incoming Books
            </button>
          </div>

          <div className="p-8">
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
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request a New Book
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we&asop;ll do our best to add your
          requested book to our collection.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the author name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="high">High (Academic Need)</option>
              <option value="urgent">Urgent (Exam/Assignment)</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Why do you want this book? *
          </label>
          <textarea
            id="reason"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us why this book is important to you and how it will help your learning journey..."
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="additional-info"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Additional Information
          </label>
          <textarea
            id="additional-info"
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any additional details like ISBN, edition, publisher, or where you heard about this book..."
          ></textarea>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="space-y-1 text-blue-800">
            <li>• We&asop;ll review your request within 24 hours</li>
            <li>
              • If approved, we&asop;ll try to source the book from donors or
              purchase it
            </li>
            <li>• You&asop;ll be notified when the book is available</li>
            <li>
              • As the requester, you&asop;ll get priority access to borrow it
              first
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <Send className="w-5 h-5" />
          <span>Submit Request</span>
        </button>
      </form>
    </div>
  );
};

const IncomingBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Books Coming Soon
        </h2>
        <p className="text-gray-600">
          Track the status of requested books and see what&asop;s arriving in
          our collection.
        </p>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
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
                  <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium transition-colors">
                    Reserve Spot
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-orange-50 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Plus className="w-6 h-6 text-orange-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              Don&asop;t see your requested book?
            </h3>
            <p className="text-orange-800 mb-4">
              If you&asop;ve requested a book and don&asop;t see it in the list
              above, it might still be under review. Feel free to contact us or
              submit a new request.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestBook;
