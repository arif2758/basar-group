import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiTrendingUp,
  FiUsers,
  FiHeart,
  FiStar,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ImpactSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  // Mock stats data - replace with your actual data
  const stats = [
    {
      id: 1,
      value: 2500,
      label: "Books Shared",
      suffix: "+",
      description: "Active circulation",
      icon: FiUsers,
    },
    {
      id: 2,
      value: 150,
      label: "Students",
      suffix: "+",
      description: "Scholarship recipients",
      icon: FiHeart,
    },
    {
      id: 3,
      value: 85,
      label: "IT Graduates",
      suffix: "+",
      description: "Job-ready professionals",
      icon: FiTrendingUp,
    },
    {
      id: 4,
      value: 45,
      label: "Businesses",
      suffix: "+",
      description: "Super Shop network",
      icon: FiTarget,
    },
    {
      id: 5,
      value: 98,
      label: "Success Rate",
      suffix: "%",
      description: "Graduate employment",
      icon: FiAward,
    },
    {
      id: 6,
      value: 12,
      label: "Communities",
      suffix: "+",
      description: "Areas served",
      icon: FiStar,
    },
  ];

  const successStories = [
    {
      id: 1,
      name: "Rashida Khatun",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      story:
        "From library member to IT professional, now earning $500/month freelancing",
      department: "Library → IT Park",
      impact: "Supporting her family of 5",
      color: "#10B981",
      bgGradient: "from-emerald-50 to-green-50",
    },
    {
      id: 2,
      name: "Ahmed Rahman",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      story: "Started as Super Shop trainee, now manages 3 delivery routes",
      department: "Super Shop",
      impact: "Created 15 local jobs",
      color: "#3B82F6",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      id: 3,
      name: "Fatima Begum",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=400&fit=crop&crop=face",
      story:
        "Foundation scholarship helped her become a teacher, now volunteers weekly",
      department: "Foundation → Library",
      impact: "Teaching 50+ children",
      color: "#8B5CF6",
      bgGradient: "from-purple-50 to-pink-50",
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

      // Stats Cards Animation
      const statCards = statsRef.current?.querySelectorAll(".stat-card");
      statCards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
            rotationY: 20,
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
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Counter animation
        const numberElement = card.querySelector(".stat-number") as HTMLElement;
        if (numberElement) {
          const finalValue = parseInt(
            numberElement.textContent?.replace(/[^0-9]/g, "") || "0"
          );
          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: finalValue,
            duration: 2,
            delay: index * 0.1 + 0.5,
            ease: "power2.out",
            onUpdate: function () {
              const currentValue = Math.round(counterObj.value);
              const suffix = numberElement.getAttribute("data-suffix") || "";
              numberElement.textContent = currentValue + suffix;
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // Stories Section Animation
      gsap.fromTo(
        storiesRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: storiesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for stat cards
      const statCards2 = statsRef.current?.querySelectorAll(".stat-card");
      statCards2?.forEach((card) => {
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

      // Story navigation buttons hover
      const navButtons = storiesRef.current?.querySelectorAll(".nav-button");
      navButtons?.forEach((button) => {
        const buttonElement = button as HTMLElement;
        buttonElement.addEventListener("mouseenter", () => {
          gsap.to(buttonElement, {
            scale: 1.1,
            rotation: 360,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        buttonElement.addEventListener("mouseleave", () => {
          gsap.to(buttonElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const nextStory = () => {
    const currentSlide = storiesRef.current?.querySelector(
      ".story-slide.active"
    );
    if (currentSlide) {
      gsap.to(currentSlide, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentStory((prev) => (prev + 1) % successStories.length);
          gsap.fromTo(
            currentSlide,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setCurrentStory((prev) => (prev + 1) % successStories.length);
    }
  };

  const prevStory = () => {
    const currentSlide = storiesRef.current?.querySelector(
      ".story-slide.active"
    );
    if (currentSlide) {
      gsap.to(currentSlide, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setCurrentStory(
            (prev) => (prev - 1 + successStories.length) % successStories.length
          );
          gsap.fromTo(
            currentSlide,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    } else {
      setCurrentStory(
        (prev) => (prev - 1 + successStories.length) % successStories.length
      );
    }
  };

  return (
    <section
      ref={containerRef}
      id="impact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <FiTrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Our Impact & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories, measurable results, and lasting change in communities
            across Bangladesh.
          </p>
        </div>

        {/* Enhanced Statistics Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
        >
          {stats.map((stat, ) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 text-center transition-all duration-300 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className="stat-number text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
                    data-suffix={stat.suffix}
                  >
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Success Stories */}
        <div
          ref={storiesRef}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Success Stories
                </h3>
                <p className="text-gray-600">
                  Inspiring journeys of transformation
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={prevStory}
                  className="nav-button w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 group"
                >
                  <FiChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-white" />
                </button>
                <button
                  onClick={nextStory}
                  className="nav-button w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 group"
                >
                  <FiChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentStory * 100}%)` }}
              >
                {successStories.map((story, index) => (
                  <div
                    key={story.id}
                    className={`story-slide w-full flex-shrink-0 ${
                      index === currentStory ? "active" : ""
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-br ${story.bgGradient} rounded-2xl p-8`}
                    >
                      <div className="grid md:grid-cols-5 gap-8 items-center">
                        <div className="md:col-span-2">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <Image
                              src={story.image}
                              alt={story.name}
                              width={400}
                              height={400}
                              className="relative w-full h-80 object-cover rounded-2xl shadow-xl"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <div
                            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
                            style={{ color: story.color }}
                          >
                            <div
                              className="w-2 h-2 rounded-full mr-2"
                              style={{ backgroundColor: story.color }}
                            ></div>
                            {story.department}
                          </div>
                          <h4 className="text-3xl font-bold text-gray-900 mb-4">
                            {story.name}
                          </h4>
                          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            {story.story}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: story.color }}
                              ></div>
                              <p className="font-semibold text-gray-800">
                                {story.impact}
                              </p>
                            </div>
                            <button className="group inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                              <span className="text-gray-700 font-medium">
                                Read Full Story
                              </span>
                              <FiExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Story Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {successStories.map((story, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`relative w-12 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {index === currentStory && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <span className="text-white font-semibold text-lg">
              Join Our Impact Story
            </span>
            <FiExternalLink className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
