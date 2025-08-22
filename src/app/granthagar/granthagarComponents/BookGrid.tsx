import React from "react";
import { Star, Heart, User, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import SearchAndFilter from "./SearchAndFilter";

interface BookGridProps {
  searchTerm: string;
  selectedCategory: string;
  selectedStatus: string;
}

const BookGrid: React.FC<BookGridProps> = ({
  searchTerm: initialSearchTerm,
  selectedCategory: initialCategory,
  selectedStatus: initialStatus,
}) => {
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] =
    React.useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = React.useState(initialStatus);

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

  // Filter books based on search and filters
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {filteredBooks.length} of {books.length} books
        </p>
        <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
          <option>Sort by: Recently Added</option>
          <option>Sort by: Rating</option>
          <option>Sort by: Title A-Z</option>
          <option>Sort by: Author A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative">
              <Image
                src={book.cover}
                alt={book.title}
                width={500}
                height={192}
                className="w-full h-48 object-cover"
              />

              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {book.status}
                </span>
              </div>
              <button className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-red-500" />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {book.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {book.title}
              </h3>

              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {book.rating}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <User className="w-3 h-3" />
                  <span>{book.donor}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
                <MapPin className="w-3 h-3" />
                <span>{book.donorLocation}</span>
              </div>

              {/* Status Info */}
              {book.status === "Borrowed" && book.returnDate && (
                <div className="bg-orange-50 rounded-lg p-2 mb-3">
                  <div className="flex items-center space-x-1 text-xs text-orange-800">
                    <Clock className="w-3 h-3" />
                    <span>Returns on {book.returnDate}</span>
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Borrowed by {book.borrowedBy}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
                <button
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    book.status === "Available"
                      ? "bg-green-100 hover:bg-green-200 text-green-800"
                      : "bg-gray-100 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {book.status === "Available" ? "Request" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No books found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default BookGrid;
