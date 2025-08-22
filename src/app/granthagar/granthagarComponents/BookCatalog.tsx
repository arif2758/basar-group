"use client";
import React, { useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import BookGrid from './BookGrid';


const BookCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Book Catalog
          </h1>
          <p className="text-gray-600 text-lg">
            Explore our collection of over 500 books donated by our amazing community.
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <BookGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
        />
      </div>
    </div>
  );
};

export default BookCatalog;