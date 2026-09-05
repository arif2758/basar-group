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
import { CartProvider } from "../contexts/CartContext";
import Image from "next/image";

import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description:
        "Everything we do is centered around strengthening our local community and creating opportunities for our neighbors.",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
    },
    {
      icon: Users,
      title: "Youth Empowerment",
      description:
        "We believe in the potential of young people and provide them with meaningful employment and skill development opportunities.",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
    },
    {
      icon: Truck,
      title: "Reliable Service",
      description:
        "Fast, fresh, and dependable delivery service that our community can count on, rain or shine.",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50",
    },
    {
      icon: Award,
      title: "Quality Promise",
      description:
        "We source the freshest local products and maintain the highest quality standards in everything we do.",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-amber-50",
    },
  ];

  const team = [
    {
      name: "Rashid Ahmed",
      role: "Founder & Community Leader",
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Local entrepreneur passionate about community development",
      expertise: "Community Development",
    },
    {
      name: "Fatima Khan",
      role: "Operations Manager",
      image:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Ensuring smooth operations and quality control",
      expertise: "Operations Excellence",
    },
    {
      name: "Mohammad Hassan",
      role: "Youth Program Coordinator",
      image:
        "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Training and mentoring our young team members",
      expertise: "Youth Training",
    },
    {
      name: "Amina Rahman",
      role: "Customer Experience Lead",
      image:
        "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1",
      description: "Ensuring every customer has an exceptional experience",
      expertise: "Customer Success",
    },
  ];

  const impactStats = [
    { number: "৳2.4M", label: "Total Income Generated for Youth", icon: "💰" },
    { number: "127", label: "Young People Employed", icon: "👥" },
    { number: "5,200", label: "Families Served Monthly", icon: "🏠" },
    { number: "98%", label: "Customer Satisfaction Rate", icon: "⭐" },
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
          rotationY: -20,
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
        ".story-content",
        {
          opacity: 0,
          x: -80,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".story-image",
        {
          opacity: 0,
          x: 80,
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team cards animation
      gsap.fromTo(
        ".team-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
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
          scale: 0,
          rotationY: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
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
    <CartProvider>
      <div
        ref={containerRef}
        className="min-h-screen bg-gray-50 relative overflow-hidden"
      >
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="about-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
          <div className="about-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
          <div className="about-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>

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
                    Our Story
                    <Users className="w-4 h-4 ml-2 text-blue-300" />
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                      Our Story &
                    </span>{" "}
                    <span className="relative">
                      Mission
                      <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-50"></div>
                    </span>
                  </h1>

                  <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed font-medium">
                    BASAR Super Shop is more than a grocery store. We&apos;re a
                    <span className="text-cyan-200 font-bold">
                      {" "}
                      community-powered movement
                    </span>{" "}
                    that connects neighbors, empowers youth, and delivers fresh
                    quality products to your doorstep.
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="text-4xl font-black mb-2">127</div>
                      <div className="text-white/80 font-medium">
                        Youth Employed
                      </div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                      <div className="text-4xl font-black mb-2">5,200</div>
                      <div className="text-white/80 font-medium">
                        Families Served
                      </div>
                    </div>
                  </div>

                  <button className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3">
                    <span>Learn Our Impact</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
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
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 font-medium">
                            Community Growth
                          </div>
                          <div className="text-xl font-black text-gray-900">
                            +150%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 font-medium">
                            Happy Customers
                          </div>
                          <div className="text-xl font-black text-gray-900">
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
          <section className="mission-section py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Mission & Vision
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our guiding principles that drive everything we do
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <div className="mission-card bg-gradient-to-br from-emerald-50 to-teal-50 p-8 sm:p-12 rounded-3xl border border-emerald-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900">
                        Our Mission
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To revolutionize local grocery shopping by creating a
                      digital platform that serves our community&apos;s daily
                      needs while providing meaningful employment and skill
                      development opportunities for local youth. We&apos;re
                      building a sustainable ecosystem where every purchase
                      contributes to community prosperity.
                    </p>
                  </div>
                </div>

                <div className="mission-card bg-gradient-to-br from-orange-50 to-amber-50 p-8 sm:p-12 rounded-3xl border border-orange-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-black text-gray-900">
                        Our Vision
                      </h3>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To become the leading community-powered grocery platform
                      in Bangladesh, setting the standard for how local
                      businesses can thrive in the digital age while maintaining
                      strong community roots. We envision a future where
                      technology serves humanity, not the other way around.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Values Section */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-emerald-200">
                  <Award className="w-4 h-4 mr-2" />
                  Our Core Values
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                  What Drives Us Forward
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  These principles guide everything we do, from how we treat our
                  team members to how we serve our customers
                </p>
              </div>

              <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="value-card relative group">
                    {/* Card Glow Effect */}
                    <div className="value-glow absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                    {/* Main Card */}
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
                      <div
                        className={`value-icon w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                      >
                        <value.icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {value.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed">
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
          <section className="story-section py-20 bg-white">
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
                  <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-orange-200">
                    <Star className="w-4 h-4 mr-2" />
                    Our Journey
                  </div>

                  <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
                    How It All
                    <span className="text-emerald-600"> Started</span>
                  </h2>

                  <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                    <p className="text-xl font-medium text-gray-800">
                      BASAR Super Shop began as a small neighborhood grocery
                      store in 2018. During the pandemic, we realized our
                      community needed a reliable way to get fresh groceries
                      safely delivered to their homes.
                    </p>
                    <p>
                      But we saw an even bigger opportunity. Our neighborhood
                      had many talented young people who needed employment and
                      skills training. We decided to build a business model that
                      would serve both needs.
                    </p>
                    <p>
                      Today, we&apos;re proud to have created over 127 jobs for
                      local youth while serving more than 5,200 families. Every
                      order placed helps a young person earn money, learn
                      skills, and build their future.
                    </p>
                    <p className="text-emerald-700 font-semibold">
                      This isn&apos;t just business – it&apos;s community
                      development through commerce. Together, we&apos;re
                      building something bigger than a grocery store.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    {[
                      "Community Development",
                      "Youth Employment",
                      "Digital Innovation",
                      "Local Impact",
                    ].map((tag, index) => (
                      <span
                        key={index}
                        className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200"
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
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 border border-blue-200">
                  <Users className="w-4 h-4 mr-2" />
                  Our Leadership
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                  Meet Our Leadership Team
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Passionate community leaders working together to create
                  opportunities and serve our neighbors
                </p>
              </div>

              <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <div
                    key={index}
                    className="team-card relative bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group"
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
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-gray-700">
                        {member.expertise}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="team-content p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-emerald-600 font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
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
          <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                  <TrendingUp className="w-4 h-4 mr-2 text-cyan-300" />
                  Community Impact
                  <Heart className="w-4 h-4 ml-2 text-pink-300" />
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    Our Community
                  </span>{" "}
                  Impact
                </h2>

                <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Every purchase you make contributes to a stronger, more
                  prosperous community.
                  <span className="text-cyan-200 font-bold">
                    {" "}
                    Here&apos;s how we&apos;re making a difference together.
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
                      <div className="text-white/80 font-medium leading-tight">
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
                  Join Our Mission
                </h3>
                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                  When you choose BASAR Super Shop, you&apos;re not just buying
                  groceries –
                  <span className="text-cyan-200 font-bold">
                    {" "}
                    you&apos;re investing in your community&apos;s future.
                  </span>
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { icon: "🎯", text: "Create Jobs" },
                    { icon: "📚", text: "Skill Development" },
                    { icon: "🏪", text: "Support Local" },
                    { icon: "🌱", text: "Build Community" },
                  ].map((item, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white/90 font-medium border border-white/30"
                    >
                      {item.icon} {item.text}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                    <span>Start Shopping</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Join Our Team</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60">
                {[
                  "🌱 Sustainable Growth",
                  "🤝 Community First",
                  "💪 Youth Empowerment",
                  "📈 Proven Impact",
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
    </CartProvider>
  );
}
