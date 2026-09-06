"use client";

import { useRef } from "react";
import {
  Heart,
  Users,
  Truck,
  Award,
  Target,
  Eye,
  Sparkles,
  Star,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: Heart,
      title: "কমিউনিটি সবার আগে",
      description:
        "আমাদের প্রতিটি উদ্যোগের কেন্দ্রবিন্দু স্থানীয় সমাজের ক্ষমতায়ন এবং প্রতিবেশী মানুষের সহায়তা।",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50 dark:bg-pink-950/30",
    },
    {
      icon: Users,
      title: "তরুণদের ক্ষমতায়ন",
      description:
        "আমরা তরুণদের সুপ্ত প্রতিভায় বিশ্বাস করি এবং সম্মানজনক কর্মসংস্থান ও দক্ষতা বৃদ্ধির সুযোগ তৈরি করি।",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Truck,
      title: "নির্ভরযোগ্য সেবা",
      description:
        "দ্রুত, তরতাজা এবং বিশ্বস্ত ডেলিভারি সেবা, যা যেকোনো প্রতিকূল আবহাওয়াতেও আপনার কাছে পৌঁছে যায়।",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: Award,
      title: "কোয়ালিটির নিশ্চয়তা",
      description:
        "সরাসরি খামার থেকে বাছাইকৃত সেরা মান ও শতভাগ ভেজালমুক্ত বিশুদ্ধ পণ্য সরবরাহ নিশ্চিত করি।",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  const team = [
    {
      name: "রাশিদ আহমেদ",
      role: "প্রতিষ্ঠাতা ও সমাজকর্মী",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "স্থানীয় উদ্যোক্তা ও সামাজিক উন্নয়নে নিবেদিতপ্রাণ নেতৃত্ব",
      expertise: "কমিউনিটি ডেভেলপমেন্ট",
    },
    {
      name: "ফাতিমা খান",
      role: "অপারেশনস ম্যানেজার",
      image:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "সুপার শপের নিরবচ্ছিন্ন পরিচালনা ও সর্বোচ্চ মান নিয়ন্ত্রণ নিশ্চিতকরণ",
      expertise: "অপারেশনাল এক্সিলেন্স",
    },
    {
      name: "মোহাম্মদ হাসান",
      role: "ইয়ুথ প্রোগ্রাম কোঅর্ডিনেটর",
      image:
        "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "আমাদের তরুণ ডেলিভারি ও সাপোর্ট টিমকে পেশাগত প্রশিক্ষণ প্রদান",
      expertise: "ইয়ুথ ট্রেনিং",
    },
    {
      name: "আমিনা রহমান",
      role: "কাস্টমার এক্সপেরিয়েন্স লিড",
      image:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "প্রতিটি গ্রাহকের আনন্দদায়ক ও নির্ভরযোগ্য কেনাকাটার অভিজ্ঞতা নিশ্চিত করা",
      expertise: "কাস্টমার সাকসেস",
    },
  ];

  const impactStats = [
    { number: "৳2.4M", label: "তরুণদের মোট বেতন ও উপবৃত্তি", icon: "💰" },
    { number: "127", label: "স্থানীয় তরুণদের কর্মসংস্থান", icon: "👥" },
    { number: "5,200", label: "প্রতি মাসে সেবাগ্রাহক পরিবার", icon: "🏠" },
    { number: "98%", label: "গ্রাহক সন্তুষ্টির হার", icon: "⭐" },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Floating background elements
      gsap.to(".about-bg-element", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(8, 15)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Hero section animation
      gsap.fromTo(
        ".hero-content",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".hero-image",
        {
          opacity: 0,
          x: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Mission/Vision cards animation
      gsap.fromTo(
        ".mission-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Values cards animation
      gsap.fromTo(
        ".value-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8,
          rotationY: -15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 0.6,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Story section animation
      gsap.fromTo(
        ".story-image",
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".story-content",
        {
          opacity: 0,
          x: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team cards animation
      gsap.fromTo(
        ".team-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Impact stats animation
      gsap.fromTo(
        ".impact-stat",
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".impact-stats",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupAboutHovers();

      // Continuous sparkle animation
      gsap.to(".sparkle-about", {
        y: "random(-10, 10)",
        rotation: "random(0, 360)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      // Number counter animation
      animateCounters();
    },
    { scope: containerRef }
  );

  const setupAboutHovers = () => {
    // Value cards hover
    gsap.utils.toArray<HTMLElement>(".value-card").forEach((card) => {
      const icon = card.querySelector(".value-icon");
      const glow = card.querySelector(".value-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -15,
          scale: 1.03,
          boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)",
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          glow,
          {
            opacity: 1,
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          icon,
          {
            scale: 1.2,
            rotation: 10,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Team cards hover
    gsap.utils.toArray<HTMLElement>(".team-card").forEach((card) => {
      const image = card.querySelector(".team-image");
      const content = card.querySelector(".team-content");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -10,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          image,
          {
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          content,
          {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.4"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Mission cards hover
    gsap.utils.toArray<HTMLElement>(".mission-card").forEach((card) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(card, {
        y: -8,
        scale: 1.02,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  const animateCounters = () => {
    gsap.utils.toArray<HTMLElement>(".counter-number").forEach((numberEl) => {
      const finalNumber = numberEl.textContent || "0";
      const isPercentage = finalNumber.includes("%");
      const isCurrency = finalNumber.includes("৳");

      let numericValue = 0;
      if (isPercentage) {
        numericValue = parseInt(finalNumber.replace("%", ""));
      } else if (isCurrency) {
        numericValue = parseFloat(
          finalNumber.replace("৳", "").replace("M", "")
        );
      } else {
        numericValue = parseInt(finalNumber.replace(",", ""));
      }

      const counter = { value: 0 };

      gsap.to(counter, {
        value: numericValue,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          let displayValue = "";
          if (isPercentage) {
            displayValue = Math.round(counter.value) + "%";
          } else if (isCurrency) {
            displayValue = "৳" + counter.value.toFixed(1) + "M";
          } else {
            displayValue = Math.round(counter.value).toLocaleString();
          }
          numberEl.textContent = displayValue;
        },
        scrollTrigger: {
          trigger: numberEl,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gray-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="about-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-2xl"></div>
        <div className="about-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="about-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-2xl"></div>

        <Sparkles className="sparkle-about absolute top-32 right-1/4 w-6 h-6 text-emerald-300/30" />
        <Star className="sparkle-about absolute bottom-1/3 left-1/4 w-5 h-5 text-blue-300/25" />
        <Sparkles className="sparkle-about absolute top-2/3 right-1/3 w-4 h-4 text-purple-300/35" />
      </div>

      <main className="relative z-10">
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 py-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="hero-content">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                  <Heart className="w-4 h-4 mr-2 text-pink-300" />
                  আমাদের পরিচিতি
                  <Users className="w-4 h-4 ml-2 text-blue-300" />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    আমাদের গল্প ও
                  </span>{" "}
                  <span className="relative">
                    মূল লক্ষ্য
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-50"></div>
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
                  BASAR Super Shop শুধুমাত্র একটি সাধারণ সুপার শপ নয়। এটি একটি
                  <span className="text-cyan-200 font-bold">
                    {" "}
                    সামাজিক ক্ষমতায়ন আন্দোলন
                  </span>{" "}
                  যা প্রতিবেশী মানুষকে একত্রিত করে, স্থানীয় তরুণদের কাজের সুযোগ তৈরি করে এবং ঘরে ঘরে সেরা মানের ফ্রেশ গ্রোসারি পৌঁছে দেয়।
                </p>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black mb-2">127</div>
                    <div className="text-white/80 font-medium">
                      তরুণদের কর্মসংস্থান
                    </div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="text-4xl font-black mb-2">5,200</div>
                    <div className="text-white/80 font-medium">
                      সেবাগ্রাহক পরিবার
                    </div>
                  </div>
                </div>

                <Link
                  href="#impact"
                  className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3 cursor-pointer"
                >
                  <span>আমাদের প্রভাব জানুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              <div className="hero-image text-center">
                <div className="relative">
                  <Image
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Community Impact"
                    width={600}
                    height={400}
                    className="rounded-3xl shadow-2xl mx-auto"
                    priority
                  />

                  {/* Floating elements on image */}
                  <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          কমিউনিটি প্রবৃদ্ধি
                        </div>
                        <div className="text-xl font-black text-gray-900 dark:text-white">
                          +150%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          সন্তুষ্ট গ্রাহক
                        </div>
                        <div className="text-xl font-black text-gray-900 dark:text-white">
                          98%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Mission & Vision */}
        <section className="mission-section py-20 bg-white dark:bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  মিশন ও ভিশন
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                আমাদের প্রতিটি পদক্ষেপে পথ দেখায় যে মূলনীতিসমূহ
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="mission-card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-8 sm:p-12 rounded-3xl border border-emerald-100 dark:border-emerald-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                      আমাদের মিশন
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    প্রযুক্তিবান্ধব ডিজিটাল প্ল্যাটফর্মের মাধ্যমে নিত্যপ্রয়োজনীয় পণ্যের সহজলভ্যতা নিশ্চিত করা এবং একই সাথে স্থানীয় তরুণদের জন্য সম্মানজনক কর্মসংস্থান ও দক্ষতা বৃদ্ধির পরিবেশ সৃষ্টি করা। প্রতিটি অর্ডারের মাধ্যমে সমাজের মানুষের জীবনযাত্রার মান উন্নয়ন করাই আমাদের মিশন।
                  </p>
                </div>
              </div>

              <div className="mission-card bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-8 sm:p-12 rounded-3xl border border-orange-100 dark:border-orange-900/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                      আমাদের ভিশন
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    বাংলাদেশের শীর্ষস্থানীয় কমিউনিটি-বান্ধব সুপার শপ প্ল্যাটফর্মে পরিণত হওয়া, যেখানে প্রযুক্তি মানুষের সেবায় নিয়োজিত থাকবে এবং সামাজিক উন্নয়ন ও বাণিজ্যের মধ্যে এক অনন্য সেতু বন্ধন তৈরি করবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Values Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-emerald-200 dark:border-emerald-800">
                <Award className="w-4 h-4 mr-2" />
                আমাদের মূল্যবোধ
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                আমাদের চালিকাশক্তি ও অনুপ্রেরণা
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                এই নীতিগুলো আমাদের দল পরিচালনা থেকে শুরু করে প্রতিটি গ্রাহক সেবার মান নিশ্চিত করে
              </p>
            </div>

            <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="value-card relative group">
                  {/* Card Glow Effect */}
                  <div className="value-glow absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                  {/* Main Card */}
                  <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-800 h-full">
                    <div
                      className={`value-icon w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {value.description}
                    </p>

                    {/* Decorative element */}
                    <div className="absolute top-4 right-4 opacity-10">
                      <Sparkles className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Story Section */}
        <section className="story-section py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="story-image">
                <div className="relative">
                  <Image
                    src="https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Local Grocery Store"
                    width={600}
                    height={400}
                    className="rounded-3xl shadow-2xl"
                  />

                  {/* Decorative elements */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"></div>
                </div>
              </div>

              <div className="story-content">
                <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-orange-200 dark:border-orange-800">
                  <Star className="w-4 h-4 mr-2" />
                  আমাদের যাত্রা
                </div>

                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
                  যেভাবে গড়ে উঠল এই
                  <span className="text-emerald-600 dark:text-emerald-400"> সুপার শপ</span>
                </h2>

                <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    2018 সালে একটি ছোট্ট পাড়ার গ্রোসারি উদ্যোগ হিসেবে BASAR Super Shop যাত্রা শুরু করেছিল। করোনা মহামারীর প্রতিকূল সময়ে আমরা গভীরভাবে অনুভব করি ঘরে ঘরে নিরাপদ ও ফ্রেশ গ্রোসারি পণ্য পৌঁছে দেওয়া কতটা অপরিহার্য।
                  </p>
                  <p>
                    পাশাপাশি আমরা উপলব্ধি করি আমাদের সমাজে বহু উদ্যমী তরুণ রয়েছে যাদের সম্মানজনক কাজের সুযোগ প্রয়োজন। তখন আমরা এমন একটি বিজনেস মডেল তৈরি করি যা ক্রেতাদের ঘরে বিশুদ্ধ বাজার পৌঁছে দেবে এবং তরুণদের আত্মনির্ভরশীল করবে।
                  </p>
                  <p>
                    আজ আমরা অত্যন্ত গর্বের সাথে 127 জনের বেশি তরুণের জন্য নিশ্চিত কর্মসংস্থান সৃষ্টি করেছি এবং 5,200 এর বেশি পরিবারের আস্থা অর্জন করেছি। প্রতিটি অর্ডারের মাধ্যমে একটি নতুন স্বপ্নের বিকাশ ঘটছে।
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    এটি নিছক ব্যবসা নয় – বাণিজ্যের মাধ্যমে মানবসেবা ও সমাজকল্যাণ। একসাথে আমরা গড়ছি একটি সমৃদ্ধ ও স্বনির্ভর ভবিষ্যৎ।
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    "কমিউনিটি ডেভেলপমেন্ট",
                    "তরুণদের কর্মসংস্থান",
                    "ডিজিটাল উদ্ভাবন",
                    "স্থানীয় প্রভাব",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Team Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-800">
                <Users className="w-4 h-4 mr-2" />
                আমাদের পরিচালনা পর্ষদ
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                অভিজ্ঞ ও নিবেদিতপ্রাণ নেতৃত্ব
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                সমাজের কল্যাণে কাজ করার দৃঢ় অঙ্গীকার নিয়ে আমাদের পাশে আছেন অভিজ্ঞ নেতৃত্ব
              </p>
            </div>

            <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="team-card relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 group"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={256}
                      className="team-image w-full h-64 object-cover transition-all duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                    {/* Expertise Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-slate-700">
                      {member.expertise}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="team-content p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-3 text-sm">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                    <Star className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Community Impact */}
        <section id="impact" className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <TrendingUp className="w-4 h-4 mr-2 text-cyan-300" />
                সামাজিক প্রভাব
                <Heart className="w-4 h-4 ml-2 text-pink-300" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  আমাদের কমিউনিটি
                </span>{" "}
                প্রভাব
              </h2>

              <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                আপনার প্রতিটি কেনাকাটা একটি শক্তিশালী ও স্বাবলম্বী সমাজ বিনির্মাণে অবদান রাখে।
                <span className="text-cyan-200 font-bold">
                  {" "}
                  একসাথে কীভাবে আমরা ইতিবাচক পরিবর্তন আনছি তা দেখুন।
                </span>
              </p>
            </div>

            {/* Impact Stats */}
            <div className="impact-stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {impactStats.map((stat, index) => (
                <div key={index} className="impact-stat relative">
                  <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <div className="counter-number text-4xl sm:text-5xl font-black text-white mb-3">
                      {stat.number}
                    </div>
                    <div className="text-white/80 font-medium leading-tight text-sm">
                      {stat.label}
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Mission CTA */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12 text-center">
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
                আমাদের এই মহতী উদ্যোগে শামিল হোন
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                BASAR Super Shop থেকে কেনাকাটা করা মানে শুধু বাজার করা নয় –
                <span className="text-cyan-200 font-bold">
                  {" "}
                  আপনি বিনিয়োগ করছেন আপনার সমাজের তরুণদের ভবিষ্যৎ ও সমৃদ্ধির পেছনে।
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  { icon: "🎯", text: "কর্মসংস্থান সৃষ্টি" },
                  { icon: "📚", text: "দক্ষতা উন্নয়ন" },
                  { icon: "🏪", text: "স্থানীয় খামারিদের সহায়তা" },
                  { icon: "🌱", text: "কমিউনিটি গঠন" },
                ].map((item, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 font-medium border border-white/30 text-sm"
                  >
                    {item.icon} {item.text}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/super-shop/shop"
                  className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <span>কেনাকাটা শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  href="/super-shop/contact"
                  className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <Users className="w-5 h-5" />
                  <span>যোগাযোগ করুন</span>
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80">
              {[
                "🌱 টেকসই সামাজিক প্রবৃদ্ধি",
                "🤝 কমিউনিটি সবার আগে",
                "💪 তরুণদের ক্ষমতায়ন",
                "📈 প্রমাণিত সমাজকল্যাণমূলক প্রভাব",
              ].map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
