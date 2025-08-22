"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    name: "Amina Hassan",
    age: 12,
    location: "Rural Bangladesh",
    program: "Education Aid",
    story:
      "Thanks to BASAR Foundation, I received school supplies and a solar study light. Now I can study even after sunset. My dream is to become a teacher and help other children in my village learn to read and write.",
    image:
      "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "Now reading at grade level",
    videoThumbnail: true,
  },
  {
    name: "Mohammed Ali",
    age: 45,
    location: "Punjab, Pakistan",
    program: "Farmer Support",
    story:
      "The improved seeds and farming training from BASAR Foundation doubled my crop yield. I can now provide better for my family and even send my children to school. This support changed our entire future.",
    image:
      "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "200% increase in crop yield",
    videoThumbnail: false,
  },
  {
    name: "Fatima Khatun",
    age: 35,
    location: "Dhaka, Bangladesh",
    program: "Emergency Aid",
    story:
      "During the devastating floods, BASAR Foundation provided us with clean water, food, and temporary shelter. When we lost everything, they gave us hope and helped us rebuild our lives from scratch.",
    image:
      "https://images.pexels.com/photos/6303945/pexels-photo-6303945.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "Family safely relocated",
    videoThumbnail: true,
  },
  {
    name: "Omar Ibrahim",
    age: 28,
    location: "Sylhet, Bangladesh",
    program: "Healthcare Support",
    story:
      "My son needed urgent medical care that we could not afford. BASAR Foundation covered his surgery costs and provided ongoing treatment. Today, he is healthy and playing with other children.",
    image:
      "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "Child fully recovered",
    videoThumbnail: false,
  },
];

function BeneficiaryStories() {
  const [currentStory, setCurrentStory] = useState(0);
  const containerRef = useRef(null);

  const currentBeneficiary = stories[currentStory];

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

useGSAP(() => {
  // Main story animation
  gsap.from(".main-story", {
    scrollTrigger: {
      trigger: ".main-story",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Navigation animation
  gsap.from(".story-navigation", {
    scrollTrigger: {
      trigger: ".story-navigation",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  });

  // Story cards - individual targeting
  gsap.utils.toArray<HTMLElement>(".story-card").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.15,
      ease: "power2.out",
    });
  });

  // CTA animation
  gsap.from(".cta-section", {
    scrollTrigger: {
      trigger: ".cta-section",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

  // Story change animation
  if (currentStory >= 0) {
    gsap.fromTo(".story-content", 
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(".story-image", 
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }

}, { scope: containerRef, dependencies: [currentStory] });

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-br from-emerald-50 to-sky-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Story Display */}
          <div className="main-story bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:flex">
              {/* Story Image */}
              <div className="story-image lg:w-1/2 relative h-96 lg:h-auto">
                <Image
                  src={currentBeneficiary.image}
                  alt={currentBeneficiary.name}
                  fill
                  className="object-cover"
                />
                {currentBeneficiary.videoThumbnail && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button className="play-button bg-white/90 hover:bg-white p-4 rounded-full transition-all duration-300 transform hover:scale-110">
                      <Play className="w-8 h-8 text-emerald-600 ml-1" />
                    </button>
                  </div>
                )}
              </div>

              {/* Story Content */}
              <div className="story-content lg:w-1/2 p-8 lg:p-12">
                <div className="story-header mb-6">
                  <div className="story-badge bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">
                    {currentBeneficiary.program}
                  </div>
                  <h3 className="story-title text-3xl font-bold text-gray-800 mb-2">
                    {currentBeneficiary.name}
                  </h3>
                  <p className="story-meta text-gray-600">
                    Age {currentBeneficiary.age} • {currentBeneficiary.location}
                  </p>
                </div>

                <div className="story-quote relative mb-6">
                  <Quote className="w-8 h-8 text-emerald-300 absolute -top-2 -left-2" />
                  <p className="text-lg text-gray-700 leading-relaxed pl-6 italic">
                    {currentBeneficiary.story}
                  </p>
                </div>

                <div className="story-impact bg-gradient-to-r from-emerald-50 to-sky-50 rounded-2xl p-6 border border-emerald-100">
                  <h4 className="font-bold text-gray-800 mb-2">
                    Impact Achieved:
                  </h4>
                  <p className="text-emerald-700 font-semibold">
                    {currentBeneficiary.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="story-navigation flex items-center justify-between mt-8">
            <button
              onClick={prevStory}
              className="nav-button bg-white hover:bg-emerald-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border border-emerald-100"
            >
              <ChevronLeft className="w-6 h-6 text-emerald-600" />
            </button>

            {/* Story Indicators */}
            <div className="story-indicators flex space-x-3">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  className={`indicator w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStory
                      ? "bg-emerald-600 w-8"
                      : "bg-emerald-200 hover:bg-emerald-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="nav-button bg-white hover:bg-emerald-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 border border-emerald-100"
            >
              <ChevronRight className="w-6 h-6 text-emerald-600" />
            </button>
          </div>

          {/* More Stories Grid */}
          <div className="more-stories grid md:grid-cols-3 gap-6 mt-16">
            {stories
              .filter((_, index) => index !== currentStory)
              .slice(0, 3)
              .map((story, index) => (
                <div
                  key={index}
                  className="story-card bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={64} 
                    height={64} 
                    className="rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-bold text-gray-800 text-center mb-2">
                    {story.name}
                  </h4>
                  <p className="text-gray-600 text-sm text-center mb-3">
                    {story.location}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {story.story.substring(0, 120)}...
                  </p>
                  <button
                    onClick={() => setCurrentStory(stories.indexOf(story))}
                    className="text-emerald-600 font-semibold text-sm mt-3 hover:text-emerald-700 transition-colors"
                  >
                    Read Full Story →
                  </button>
                </div>
              ))} 
          </div>

          {/* Call to Action */}
          <div className="cta-section text-center mt-12">
            <div className="teal-slate-gradient rounded-3xl p-8 text-white">
              <h3 className="cta-title text-3xl font-bold mb-4">
                Create Your Own Success Story
              </h3>
              <p className="cta-text text-lg mb-6 text-white/90">
                Your donation today could be the turning point in someone&apos;s
                life tomorrow
              </p>
              <button className="cta-button bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Make a Difference Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeneficiaryStories;