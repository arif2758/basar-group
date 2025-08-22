"use client";
import React, { useState } from "react";
import { FiHeart, FiStar, FiClock, FiFilter } from "react-icons/fi";
import donorsData from "../data/donors.json";
import Image from "next/image";

const CommunityWall = () => {
  const [filter, setFilter] = useState<string>("featured");
  const [showTestimonials, setShowTestimonials] = useState(false);

  const { donors } = donorsData;

  const testimonials = [
    {
      id: 1,
      name: "Dr. Sarah Rahman",
      role: "Community Leader",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
      quote:
        "BASAR Group has transformed our community. The integrated approach of education, technology, and commerce creates sustainable development.",
      rating: 5,
    },
    {
      id: 2,
      name: "Mohammad Hasan",
      role: "IT Park Graduate",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote:
        "Started from zero programming knowledge. Now I'm a freelance web developer earning $800/month. Thanks to BASAR IT Park!",
      rating: 5,
    },
    {
      id: 3,
      name: "Amina Khatun",
      role: "Library Member & Mother",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote:
        "My children love the library. The books and study environment helped them excel in school. The Foundation also supported us during tough times.",
      rating: 5,
    },
  ];

  const filteredDonors =
    filter === "all"
      ? donors
      : filter === "featured"
      ? donors.filter((donor) => donor.featured)
      : donors.filter((donor) => donor.type === filter);

  const filterOptions = [
    { value: "featured", label: "Featured" },
    { value: "all", label: "All Donors" },
    { value: "education", label: "Education" },
    { value: "books", label: "Books" },
    { value: "technology", label: "Technology" },
    { value: "food", label: "Food Support" },
    { value: "healthcare", label: "Healthcare" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            🌍 Community Wall
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating our amazing donors, volunteers, and community members
            who make our mission possible.
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex shadow-md">
            <button
              onClick={() => setShowTestimonials(false)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                !showTestimonials
                  ? "bg-emerald-600 text-white shadow"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              Donor Recognition
            </button>
            <button
              onClick={() => setShowTestimonials(true)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                showTestimonials
                  ? "bg-emerald-600 text-white shadow"
                  : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              Testimonials
            </button>
          </div>
        </div>

        {!showTestimonials ? (
          <>
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <FiFilter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === option.value
                      ? "bg-emerald-600 text-white shadow"
                      : "bg-white text-gray-600 hover:bg-gray-50 border"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Donors Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-soft-50 rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 text-center hover:-translate-y-1"
                >
                  <div className="relative mb-3">
                    <Image
                      src={donor.image}
                      alt={donor.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-emerald-100"
                    />
                    {donor.featured && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow">
                        <FiStar className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                    {donor.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2 leading-tight">
                    {donor.contribution}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-gray-500 text-xs">
                    <FiClock className="w-3 h-3" />
                    <span>{new Date(donor.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-full capitalize">
                      {donor.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Donor CTA */}
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-4">
                Join our community wall by making a contribution today
              </p>
              <button className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 text-white font-medium shadow hover:shadow-lg transition-all duration-300">
                <FiHeart className="w-4 h-4 mr-2" />
                Become a Supporter
              </button>
            </div>
          </>
        ) : (
          /* Testimonials Section */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Newsletter Signup */}
        <div className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 teal-slate-gradient" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="p-10 lg:p-16 text-white">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                Stay Connected with Us
              </h3>
              <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed">
                Be part of our global community 🌍 <br />
                Get impact stories, project updates, and new opportunities
                delivered straight to your inbox.
              </p>

              {/* Glass Form */}
              <form className="flex flex-col sm:flex-row gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-inner">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-4 rounded-xl border-0 bg-slate-900/60 
                     text-gray-100 placeholder-gray-400 
                     focus:ring-2 focus:ring-teal-400 outline-none"
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-semibold 
                     bg-gradient-to-r from-teal-500 to-cyan-400 
                     text-white shadow-lg hover:shadow-cyan-400/30 
                     hover:scale-105 transform transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>

              {/* Subnote */}
              <p className="mt-4 text-sm text-gray-400">
                No spam. Unsubscribe anytime with a single click.
              </p>
            </div>

            {/* Right Image with Overlay */}
            <div className="hidden lg:block relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=700&fit=crop"
                alt="Community gathering"
                fill
                className="object-cover rounded-l-3xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-cyan-900/20 to-transparent rounded-l-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityWall;
