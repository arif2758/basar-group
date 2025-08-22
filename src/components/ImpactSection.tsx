import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";

import statsData from "../data/stats.json";
import StatsCounter from "./StatsCounter";
import Image from "next/image";

const ImpactSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const { stats } = statsData;

  const successStories = [
    {
      id: 1,
      name: "Rashida Khatun",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      story:
        "From library member to IT professional, now earning $500/month freelancing",
      department: "Library → IT Park",
      impact: "Supporting her family of 5",
    },
    {
      id: 2,
      name: "Ahmed Rahman",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      story: "Started as Super Shop trainee, now manages 3 delivery routes",
      department: "Super Shop",
      impact: "Created 15 local jobs",
    },
    {
      id: 3,
      name: "Fatima Begum",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face",
      story:
        "Foundation scholarship helped her become a teacher, now volunteers weekly",
      department: "Foundation → Library",
      impact: "Teaching 50+ children",
    },
  ];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % successStories.length);
  };

  const prevStory = () => {
    setCurrentStory(
      (prev) => (prev - 1 + successStories.length) % successStories.length
    );
  };

  return (
    <section
      id="impact"
      className="section-padding marble-gradient"
    >
      <div className="max-w-7xl mx-auto container-padding">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            Our Impact & Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories, measurable results, and lasting change in communities
            across Bangladesh.
          </p>
        </div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatsCounter
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                className="text-primary-green"
              />
              <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Success Stories Carousel */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-poppins font-semibold text-gray-900">
              Success Stories
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={prevStory}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-green hover:text-white transition-colors duration-300 focus-ring"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextStory}
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-green hover:text-white transition-colors duration-300 focus-ring"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentStory * 100}%)` }}
            >
              {successStories.map((story) => (
                <div key={story.id} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="relative">
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={500}
                        height={320}
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-2xl font-poppins font-semibold text-gray-900 mb-2">
                        {story.name}
                      </h4>
                      <p className="text-primary-green font-medium mb-4">
                        {story.department}
                      </p>
                      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                        {story.story}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-accent font-semibold">
                          {story.impact}
                        </p>
                        <button className="btn-outline text-sm inline-flex items-center space-x-2">
                          <span>Read Full Story</span>
                          <FiExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {successStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentStory ? "bg-primary-green" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
