"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "প্রতিটি শিশুর জন্য মানসম্মত শিক্ষা নিশ্চিতকরণ",
      subtitle: "বই, খাতা ও শিক্ষা উপকরণ বিতরণের মাধ্যমে সুবিধাবঞ্চিত শিশুদের ভবিষ্যৎ বিনির্মাণ",
      image: "https://images.pexels.com/photos/8613082/pexels-photo-8613082.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "শিক্ষায় সহযোগিতা করুন",
      stats: "12,000+ শিক্ষার্থী সহায়তাপ্রাপ্ত"
    },
    {
      title: "দরিদ্র পরিবারের মাঝে রমজান খাদ্য প্যাকেজ বিতরণ",
      subtitle: "পবিত্র রমজান মাসে কোনো পরিবার যেন অনাহারে না থাকে সেই মানবিক অঙ্গীকার",
      image: "https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "খাদ্য সহায়তা দিন",
      stats: "25,000+ পরিবার উপকৃত"
    },
    {
      title: "শীতার্ত মানুষের মাঝে উষ্ণতার উপহার বিতরণ",
      subtitle: "কঠোর শীতের হাত থেকে অসহায় শিশু ও বয়োবৃদ্ধদের সুরক্ষায় শীতবস্ত্র ও কম্বল বিতরণ",
      image: "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      cta: "শীতবস্ত্র দান করুন",
      stats: "8,500+ শীতার্তদের উষ্ণতা বিতরণ"
    },
    {
      title: "প্রত্যন্ত অঞ্চলের জন্য বিনামূল্যে স্বাস্থ্যসেবা কর্মসূচি",
      subtitle: "সুবিধাবঞ্চিত জনপদে ফ্রি মেডিকেল ক্যাম্প ও জরুরি চিকিৎসাসেবা নিশ্চিতকরণ",
      image: "https://images.pexels.com/photos/6646914/pexels-photo-6646914.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "স্বাস্থ্যসেবায় যুক্ত হোন",
      stats: "15,000+ রোগীর স্বাস্থ্যসেবা"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'transform translate-x-0' : 
            index < currentSlide ? 'transform -translate-x-full' : 'transform translate-x-full'
          }`}
        >
          <div 
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${slide.image})`
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-md animate-pulse">
                  <span>{slide.stats}</span>
                  <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full font-mono">Learn. Earn. Empower.</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed font-light">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="#contact"
                    className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:from-amber-500 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="#about"
                    className="border-2 border-white text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                  >
                    আরও জানুন
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/50 hover:bg-white/75 w-3'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;