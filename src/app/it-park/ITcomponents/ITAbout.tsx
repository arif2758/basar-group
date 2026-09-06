"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaClock, FaGlobe, FaShieldAlt } from "react-icons/fa";


import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";


gsap.registerPlugin(useGSAP, ScrollTrigger);

function ITAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.set(headerRef.current, { y: 40, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Left content animation
    gsap.set(leftContentRef.current, { x: -50, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: leftContentRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(leftContentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Right content animation
    gsap.set(rightContentRef.current, { x: 50, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: rightContentRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(rightContentRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        });
      },
      once: true
    });

    // Features animation
    const features = featuresRef.current.filter(Boolean);
    gsap.set(features, { y: 20, opacity: 0 });
    
    ScrollTrigger.create({
      trigger: features[0],
      start: "top 80%",
      onEnter: () => {
        gsap.to(features, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.3
        });
      },
      once: true
    });
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            বাছার IT Park সম্পর্কে
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            আইটি শিক্ষা ও আধুনিক কমিউনিটি স্পেসের এক অনন্য সমন্বয়, যা তরুণদের প্রযুক্তিতে দক্ষ করে তোলে এবং উপার্জনের নতুন দিগন্ত উন্মোচন করে।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={leftContentRef}>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              আমাদের লক্ষ্য ও দর্শন
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              বাছার IT Park কেবল একটি সাধারণ প্রশিক্ষণ কেন্দ্র নয়—প্রকৃতি ও আধুনিক প্রযুক্তির সংমিশ্রণে গড়ে ওঠা এক প্রাণবন্ত ক্যাম্পাস। যেখানে ব্যবহারিক প্রযুক্তি শিক্ষার পাশাপাশি ব্যক্তিসত্তার পূর্ণ বিকাশ ঘটে এবং তরুণরা আত্মনির্ভরশীল ক্যারিয়ার গড়ে তোলে।
            </p>
            <div className="space-y-4">
              {[
                { icon: FaShieldAlt, text: "24/7 সিসিটিভি (CCTV) এবং সার্বক্ষণিক নিরাপদ ক্যাম্পাস" },
                { icon: FaClock, text: "শিক্ষার্থীদের সুবিধাজনক ফ্লেক্সিবল লার্নিং সময়সূচি" },
                { icon: FaGlobe, text: "Solar-Powered পরিবেশবান্ধব ল্যাব ও ইভনিং স্টাডিজ" }
              ].map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => { featuresRef.current[index] = el; }}
                  className="flex items-center space-x-3"
                >
                  <feature.icon className="text-emerald-600 text-xl" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightContentRef} className="relative">
            <Image
              src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg"
              alt="বাছার IT Park"
              width={800}
              height={500}
              className="rounded-2xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
            />
            <div className="absolute inset-0 bg-emerald-600/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ITAbout;