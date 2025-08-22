"use client";

import React, { useRef } from "react";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Rashida Begum",
      role: "University Student",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "BASAR গ্রন্থাগার has completely transformed my reading habits. I used to waste hours scrolling social media, but now I'm reading amazing books that actually help me grow. The 30-minute delivery is incredible!",
    },
    {
      id: 2,
      name: "Mohammad Karim",
      role: "High School Student",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "This library helped me discover books I never knew existed. The donor system is amazing - seeing who donated each book makes me feel connected to the community. It's like having a friend recommend books!",
    },
    {
      id: 3,
      name: "Fatima Rahman",
      role: "College Student",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      text: "The reading tracker and achievements keep me motivated. I love competing in the monthly quiz and seeing my progress. This library turned reading from a chore into an exciting adventure!",
    },
  ];

  useGSAP(() => {
    // Set initial states
    gsap.set(".testimonials-header", { y: 50, opacity: 0 });
    gsap.set(".testimonial-card", { y: 80, opacity: 0, scale: 0.9 });
    gsap.set(".quote-icon", { scale: 0, opacity: 0 });
    gsap.set(".rating-star", { scale: 0, opacity: 0 });
    gsap.set(".testimonial-text", { y: 20, opacity: 0 });
    gsap.set(".author-photo", { scale: 0, opacity: 0 });
    gsap.set(".author-info", { x: -20, opacity: 0 });
    gsap.set(".stats-section", { y: 60, opacity: 0, scale: 0.95 });
    gsap.set(".stat-item", { y: 30, opacity: 0 });

    // Create master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate in sequence
    tl.to(".testimonials-header", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(".testimonial-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.4)"
    }, "-=0.4")
    .to(".quote-icon", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.6")
    .to(".rating-star", {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "back.out(1.7)"
    }, "-=0.5")
    .to(".testimonial-text", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4")
    .to(".author-photo", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "back.out(1.7)"
    }, "-=0.4")
    .to(".author-info", {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3")
    .to(".stats-section", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.4)"
    }, "-=0.2")
    .to(".stat-item", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.4)"
    }, "-=0.4");

    // Floating animation for testimonial cards
    gsap.to(".testimonial-card", {
      y: -5,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 2
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="testimonials-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from students who transformed their learning journey
            with our community library.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="quote-icon w-8 h-8 text-blue-200" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="rating-star w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="testimonial-text text-gray-700 mb-6 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="author-photo w-12 h-12 rounded-full border-2 border-blue-200"
                />

                <div className="author-info">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="stats-section teal-slate-gradient rounded-2xl p-8 mt-16 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Join 200+ Students Who&apos;ve Transformed Their Reading Habits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="stat-item">
              <div className="text-3xl font-bold text-yellow-400 mb-2">85%</div>
              <div className="text-blue-100">Reduced Social Media Time</div>
            </div>
            <div className="stat-item">
              <div className="text-3xl font-bold text-yellow-400 mb-2">3.2</div>
              <div className="text-blue-100">Books Read Per Month</div>
            </div>
            <div className="stat-item">
              <div className="text-3xl font-bold text-yellow-400 mb-2">92%</div>
              <div className="text-blue-100">Improved Academic Performance</div>
            </div>
            <div className="stat-item">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                4.9/5
              </div>
              <div className="text-blue-100">Community Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;