import React from "react";
import {
  ArrowLeft,
  Star,
  User,
  MapPin,
  MessageCircle,
  Share2,
  Heart,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

const BookDetail: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <Image
                src={book.cover}
                alt={book.title}
                width={400}
                height={600}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md mb-6"
              />

              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-3">by {book.author}</p>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(book.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({book.totalReviews} reviews)
                  </span>
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  Request This Book
                </button>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Book Details */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Book Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pages:</span>
                    <span className="font-medium">{book.pages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-medium">{book.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">{book.publishYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{book.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Added:</span>
                    <span className="font-medium">{book.dateAdded}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Donor Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Donated By
              </h2>
              <div className="flex items-center space-x-4">
                <Image
                  src={book.donorPhoto}
                  alt={book.donor}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-blue-200"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {book.donor}
                  </h3>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{book.donorLocation}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Active donor • 12 books contributed
                  </div>
                </div>
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About This Book
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Key Learnings</span>
                  </h3>
                  <ul className="space-y-2">
                    {book.keyLearnings.map((learning, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why You Should Read This
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {book.whyRead}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reader Reviews
                </h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Write Review
                </button>
              </div>

              <div className="space-y-4">
                {book.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-100 pb-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {review.user}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`w-4 h-4 ${
                                    index < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 ml-13">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Books */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Similar Books You Might Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {book.similarBooks.map((similarBook, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {similarBook.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      by {similarBook.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>Book Discussion</span>
                </h2>
                <span className="text-sm text-gray-500">3 comments</span>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 text-center">
                    Join the conversation! Share your thoughts about this book
                    with the community.
                  </p>
                  <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    Join Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
