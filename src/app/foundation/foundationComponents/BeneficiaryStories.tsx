"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    name: "আমিনা হাসান",
    age: 12,
    location: "পল্লী অঞ্চল, বাংলাদেশ",
    program: "শিক্ষা সহায়তা",
    story:
      "বাছার ফাউন্ডেশনের উপহার হিসেবে বইখাতা ও সোলার স্টাডি ল্যাম্প পাওয়ার পর আমার পড়াশোনার গতি ফিরে এসেছে। এখন সন্ধ্যায়ও নিশ্চিন্তে পড়তে পারি। বড় হয়ে আমি শিক্ষিকা হতে চাই এবং গ্রামের অন্য শিশুদের পড়াতে চাই।",
    image:
      "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "শ্রেণিভিত্তিক দক্ষতায় পূর্ণ উন্নতি",
    videoThumbnail: true,
  },
  {
    name: "মোহাম্মদ আলী",
    age: 45,
    location: "কৃষি অঞ্চল, রাজবাড়ী",
    program: "কৃষি সহায়তা",
    story:
      "বাছার ফাউন্ডেশনের উন্নত জাতের বীজ এবং আধুনিক প্রশিক্ষণ আমার ফসলের ফলন দ্বিগুণ করেছে। এখন পরিবারের ব্যয় মিটিয়ে সন্তানদের ভালো স্কুলে পাঠাতে পারছি। এই সহযোগিতা আমাদের ভবিষ্যৎ বদলে দিয়েছে।",
    image:
      "https://images.pexels.com/photos/4960464/pexels-photo-4960464.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "ফসলের ফলন 200% বৃদ্ধি",
    videoThumbnail: false,
  },
  {
    name: "ফাতিমা খাতুন",
    age: 35,
    location: "ঢাকা, বাংলাদেশ",
    program: "জরুরি দুর্যোগ ত্রাণ",
    story:
      "ভয়াবহ বন্যায় যখন আমরা সবকিছু হারিয়ে ফেলেছিলাম, তখন বাছার ফাউন্ডেশন আমাদের জরুরি খাদ্য, বিশুদ্ধ পানি ও অস্থায়ী আশ্রয়ের ব্যবস্থা করে দিয়েছিল। তারা আমাদের নতুন করে বাঁচার আশা দেখিয়েছে।",
    image:
      "https://images.pexels.com/photos/6303945/pexels-photo-6303945.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "পরিবার নিরাপদে পুনর্বাসিত",
    videoThumbnail: true,
  },
  {
    name: "ওমর ইব্রাহিম",
    age: 28,
    location: "সিলেট, বাংলাদেশ",
    program: "স্বাস্থ্যসেবা সহায়তা",
    story:
      "আমার ছোট্ট ছেলের জরুরি চিকিৎসার জন্য প্রচুর অর্থের প্রয়োজন ছিল যা আমাদের পক্ষে বহন করা অসম্ভব ছিল। বাছার ফাউন্ডেশন অপারেশনের সমস্ত খরচ বহন করে। আজ আমার ছেলে সম্পূর্ণ সুস্থ এবং স্কুলে যাচ্ছে।",
    image:
      "https://images.pexels.com/photos/6303615/pexels-photo-6303615.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    impact: "শিশুটির সম্পূর্ণ সুস্থতা অর্জন",
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

  useScrollAnimation();
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
    <section ref={containerRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Story Display */}
          <div className="main-story bg-white dark:bg-[#141414] rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="lg:flex">
              {/* Story Image */}
              <div className="story-image lg:w-1/2 relative h-80 lg:h-auto min-h-[320px]">
                <Image
                  src={currentBeneficiary.image}
                  alt={currentBeneficiary.name}
                  fill
                  className="object-cover"
                />
                {currentBeneficiary.videoThumbnail && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <button 
                      aria-label="Play Story Video"
                      className="play-button bg-white/90 dark:bg-[#141414]/90 hover:bg-white p-3.5 rounded-full transition-all duration-200 shadow-lg transform hover:scale-105"
                    >
                      <Play className="w-6 h-6 text-emerald-600 ml-0.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Story Content */}
              <div className="story-content lg:w-1/2 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="story-header mb-5">
                    <div className="story-badge bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                      {currentBeneficiary.program}
                    </div>
                    <h3 className="story-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                      {currentBeneficiary.name}
                    </h3>
                    <p className="story-meta text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      বয়স {currentBeneficiary.age} বছর • {currentBeneficiary.location}
                    </p>
                  </div>

                  <div className="story-quote relative mb-6">
                    <Quote className="w-6 h-6 text-emerald-400/40 absolute -top-2 -left-2" />
                    <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed pl-5 italic">
                      &quot;{currentBeneficiary.story}&quot;
                    </p>
                  </div>
                </div>

                <div className="story-impact bg-slate-50 dark:bg-[#1f1f1f] rounded-xl p-4 border border-slate-200 dark:border-[#303030]">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    অর্জিত সুফল:
                  </h4>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                    {currentBeneficiary.impact}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="story-navigation flex items-center justify-between mt-6 px-2">
            <button
              onClick={prevStory}
              aria-label="Previous Story"
              className="nav-button bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] p-3 rounded-full shadow-sm transition-all duration-200 border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Story Indicators */}
            <div className="story-indicators flex space-x-2">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  aria-label={`Story ${index + 1}`}
                  className={`indicator h-2 rounded-full transition-all duration-200 ${
                    index === currentStory
                      ? "bg-emerald-600 w-6"
                      : "bg-slate-300 dark:bg-[#303030] w-2"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              aria-label="Next Story"
              className="nav-button bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1f1f1f] p-3 rounded-full shadow-sm transition-all duration-200 border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* More Stories Grid */}
          <div className="more-stories grid md:grid-cols-3 gap-6 mt-14">
            {stories
              .filter((_, index) => index !== currentStory)
              .slice(0, 3)
              .map((story, index) => (
                <div
                  key={index}
                  className="story-card bg-white dark:bg-[#141414] rounded-xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <Image
                      src={story.image}
                      alt={story.name}
                      width={56} 
                      height={56} 
                      className="rounded-full mx-auto mb-3 object-cover border border-slate-200 dark:border-[#303030]"
                    />
                    <h4 className="font-bold text-slate-900 dark:text-white text-center mb-1 text-base">
                      {story.name}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs text-center mb-3">
                      {story.location}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 text-center">
                      {story.story.substring(0, 120)}...
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentStory(stories.indexOf(story))}
                    className="text-emerald-600 dark:text-emerald-400 font-medium text-xs mt-4 text-center hover:underline transition-colors"
                  >
                    সম্পূর্ণ গল্প পড়ুন →
                  </button>
                </div>
              ))} 
          </div>

          {/* Call to Action */}
          <div className="cta-section text-center mt-12">
            <div className="bg-white dark:bg-[#141414] rounded-2xl p-8 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]">
              <h3 className="cta-title text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                একটি নতুন মানবিক সাফল্যের গল্প তৈরি করুন
              </h3>
              <p className="cta-text text-base text-slate-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
                আপনার আজকের সহযোগিতা আগামীতে কারও জীবনের সবচেয়ে বড় রূপান্তর এনে দিতে পারে।
              </p>
              <Link 
                href="#contact"
                className="cta-button inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl text-base font-medium shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                আজই সহযোগিতার হাত বাড়ান
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeneficiaryStories;