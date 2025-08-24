"use client";
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  FiHeart,
  FiStar,
  FiClock,
  FiFilter,
  FiUsers,
  FiAward,
  FiMail,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const CommunityWall = () => {
  const [filter, setFilter] = useState<string>("featured");
  const [showTestimonials, setShowTestimonials] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  // Mock data - replace with your actual data
  const donors = [
    {
      id: 1,
      name: "Dr. Ahmed Hassan",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      contribution: "Donated 500+ books",
      date: "2024-01-15",
      type: "books",
      featured: true,
    },
    {
      id: 2,
      name: "Fatima Rahman",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face",
      contribution: "Monthly scholarship fund",
      date: "2024-01-10",
      type: "education",
      featured: true,
    },
    {
      id: 3,
      name: "Tech Solutions Ltd",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      contribution: "Laptops & equipment",
      date: "2024-01-08",
      type: "technology",
      featured: false,
    },
    {
      id: 4,
      name: "Sarah Khan",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      contribution: "Healthcare support",
      date: "2024-01-05",
      type: "healthcare",
      featured: true,
    },
    {
      id: 5,
      name: "Green Foods Co.",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&h=150&fit=crop",
      contribution: "Weekly food packages",
      date: "2024-01-03",
      type: "food",
      featured: false,
    },
    {
      id: 6,
      name: "Mohammad Ali",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      contribution: "Volunteer coordinator",
      date: "2024-01-01",
      type: "education",
      featured: false,
    },
  ];

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

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Toggle Buttons Animation
      gsap.fromTo(
        toggleRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: toggleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Filters Animation
      const filterButtons =
        filtersRef.current?.querySelectorAll(".filter-button");
      filterButtons?.forEach((button, index) => {
        gsap.fromTo(
          button,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: filtersRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Grid Animation
      const donorCards = gridRef.current?.querySelectorAll(".donor-card");
      donorCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Testimonials Animation
      const testimonialCards =
        testimonialsRef.current?.querySelectorAll(".testimonial-card");
      testimonialCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            rotation: 2,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Newsletter Animation
      gsap.fromTo(
        newsletterRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations
      const donorCards2 = gridRef.current?.querySelectorAll(".donor-card");
      donorCards2?.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -12,
            scale: 1.05,
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

      // Testimonial hover effects
      const testimonialCards2 =
        testimonialsRef.current?.querySelectorAll(".testimonial-card");
      testimonialCards2?.forEach((card) => {
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

      // Filter button hover effects
      const filterButtons2 =
        filtersRef.current?.querySelectorAll(".filter-button");
      filterButtons2?.forEach((button) => {
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
    { scope: containerRef }
  );

  const handleToggle = (showTestimonialsValue: boolean) => {
    const currentContent = showTestimonials
      ? testimonialsRef.current
      : gridRef.current;

    gsap.to(currentContent, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setShowTestimonials(showTestimonialsValue);
        const newContent = showTestimonialsValue
          ? testimonialsRef.current
          : gridRef.current;
        gsap.fromTo(
          newContent,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      },
    });
  };

  const filteredDonors =
    filter === "all"
      ? donors
      : filter === "featured"
      ? donors.filter((donor) => donor.featured)
      : donors.filter((donor) => donor.type === filter);

  const filterOptions = [
    { value: "featured", label: "Featured", icon: FiStar },
    { value: "all", label: "All Donors", icon: FiUsers },
    { value: "education", label: "Education", icon: FiAward },
    { value: "books", label: "Books", icon: FiHeart },
    { value: "technology", label: "Technology", icon: FiFilter },
    { value: "food", label: "Food Support", icon: FiHeart },
    { value: "healthcare", label: "Healthcare", icon: FiHeart },
  ];

  return (
    <section
      ref={containerRef}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <FiUsers className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Community Wall
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating our amazing donors, volunteers, and community members
            who make our mission possible.
          </p>
        </div>

        {/* Enhanced Toggle Buttons */}
        <div ref={toggleRef} className="flex justify-center mb-16">
          <div className="bg-white rounded-2xl p-2 flex shadow-xl border border-gray-100">
            <button
              onClick={() => handleToggle(false)}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                !showTestimonials
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span>Donor Recognition</span>
            </button>
            <button
              onClick={() => handleToggle(true)}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                showTestimonials
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FiStar className="w-5 h-5" />
              <span>Testimonials</span>
            </button>
          </div>
        </div>

        {!showTestimonials ? (
          <>
            {/* Enhanced Filter Bar */}
            <div
              ref={filtersRef}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              <div className="flex items-center space-x-3 text-gray-600 mb-2">
                <FiFilter className="w-5 h-5" />
                <span className="font-medium">Filter by category:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      className={`filter-button px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                        filter === option.value
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Donors Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-20"
            >
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="donor-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center border border-gray-100"
                >
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <Image
                      src={donor.image}
                      alt={donor.name}
                      width={80}
                      height={80}
                      className="relative w-20 h-20 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    />
                    {donor.featured && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <FiStar className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <h4 className="font-bold text-gray-800 mb-2 text-sm group-hover:text-blue-600 transition-colors duration-300">
                    {donor.name}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {donor.contribution}
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-gray-500 text-xs mb-3">
                    <FiClock className="w-3 h-3" />
                    <span>{new Date(donor.date).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 text-xs rounded-full capitalize font-medium border border-blue-100">
                      {donor.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA */}
            <div className="text-center">
              <div className="inline-flex flex-col items-center space-y-4 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl border border-blue-100">
                <p className="text-gray-700 text-lg font-medium">
                  Join our community wall by making a contribution today
                </p>
                <button className="group inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <FiHeart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span>Become a Supporter</span>
                  <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Enhanced Testimonials Section */
          <div
            ref={testimonialsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card group bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 transition-all duration-300 border border-gray-100"
              >
                {/* Enhanced Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>

                {/* Enhanced Quote */}
                <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg relative">
                  <span className="text-6xl text-blue-200 absolute -top-4 -left-2 font-serif">
                    
                  </span>
                  <span className="relative z-10">{testimonial.quote}</span>
                </blockquote>

                {/* Enhanced Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-md opacity-30"></div>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="relative w-15 h-15 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-600 font-medium">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Newsletter Signup */}
        <div
          ref={newsletterRef}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Enhanced Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />

          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            {/* Enhanced Left Content */}
            <div className="p-10 lg:p-16 text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                Stay Connected with Us
              </h3>
              <p className="text-lg text-blue-100 mb-10 max-w-lg leading-relaxed">
                Be part of our global community 🌍 <br />
                Get impact stories, project updates, and new opportunities
                delivered straight to your inbox.
              </p>

              {/* Enhanced Glass Form */}
              <form className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm
                     text-white placeholder-blue-200 
                     focus:ring-2 focus:ring-white/50 outline-none transition-all duration-300"
                />
                <button
                  type="submit"
                  className="group px-8 py-4 rounded-xl font-semibold 
                     bg-white text-blue-600 shadow-xl hover:shadow-2xl 
                     hover:scale-105 transform transition-all duration-300
                     flex items-center justify-center space-x-2"
                >
                  <span>Subscribe</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>

              {/* Enhanced Subnote */}
              <p className="mt-6 text-sm text-blue-200 flex items-center space-x-2">
                <FiHeart className="w-4 h-4" />
                <span>No spam. Unsubscribe anytime with a single click.</span>
              </p>
            </div>

            {/* Enhanced Right Image */}
            <div className="hidden lg:block relative h-96">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=700&fit=crop"
                alt="Community gathering"
                fill
                className="object-cover rounded-l-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-purple-900/20 to-transparent rounded-l-3xl" />

              {/* Floating elements */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FiHeart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityWall;
