"use client";

import { useRef } from "react";
import {
  Users,
  TrendingUp,
  Heart,
  Award,
  Sparkles,
  Star,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

export default function CommunityImpact() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      number: "127",
      label: "Youth Employed",
      description: "Local young people earning through our platform",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      number: "৳2.4M",
      label: "Income Generated",
      description: "Total earnings by local youth this year",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50",
    },
    {
      icon: Heart,
      number: "5,200",
      label: "Families Served",
      description: "Community members using our service",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50",
    },
    {
      icon: Award,
      number: "98%",
      label: "Satisfaction Rate",
      description: "Customer satisfaction with our service",
      color: "from-amber-400 to-orange-400",
      bgColor: "bg-amber-50",
    },
  ];

  const features = [
    "Product Photography & Content Creation",
    "Order Packing & Quality Control",
    "Fast Local Delivery Service",
    "Customer Support & Social Media",
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Floating background elements
      gsap.to(".community-bg-element", {
        y: "random(-25, 25)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(8, 12)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      // Header animation
      gsap.fromTo(
        ".community-header",
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
            trigger: ".community-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats cards with advanced stagger
      gsap.fromTo(
        ".stat-card",
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
            amount: 0.8,
            from: "start",
          },
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bottom section animation
      gsap.fromTo(
        ".impact-section",
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".impact-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Features list animation
      gsap.fromTo(
        ".feature-item",
        {
          opacity: 0,
          x: -50,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-list",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupCommunityHovers();

      // Continuous sparkle animation
      gsap.to(".sparkle-element", {
        y: "random(-8, 8)",
        rotation: "random(0, 360)",
        duration: "random(2, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });

      // Number counter animation
      animateNumbers();
    },
    { scope: containerRef }
  );

  const setupCommunityHovers = () => {
    gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card) => {
      const icon = card.querySelector(".stat-icon");
      const number = card.querySelector(".stat-number");
      const glow = card.querySelector(".stat-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -12,
          scale: 1.05,
          boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)",
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
        )
        .to(
          number,
          {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.3"
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Feature items hover
    gsap.utils.toArray<HTMLElement>(".feature-item").forEach((item) => {
      const dot = item.querySelector(".feature-dot");

      const hoverTl = gsap.timeline({ paused: true });
      hoverTl
        .to(item, {
          x: 10,
          duration: 0.3,
          ease: "power2.out",
        })
        .to(
          dot,
          {
            scale: 1.5,
            backgroundColor: "#f59e0b",
            duration: 0.3,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  const animateNumbers = () => {
    gsap.utils.toArray<HTMLElement>(".stat-number").forEach((numberEl) => {
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
    <section
      ref={containerRef}
      className="relative py-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="community-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-white/10 to-emerald-300/20 rounded-full blur-2xl"></div>
        <div className="community-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-cyan-300/20 to-blue-300/20 rounded-full blur-2xl"></div>
        <div className="community-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-teal-300/20 to-green-300/20 rounded-full blur-2xl"></div>

        <Sparkles className="sparkle-element absolute top-32 right-1/4 w-6 h-6 text-white/30" />
        <Star className="sparkle-element absolute bottom-1/3 left-1/4 w-5 h-5 text-white/25" />
        <Sparkles className="sparkle-element absolute top-2/3 right-1/3 w-4 h-4 text-white/35" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="community-header text-center text-white mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <Heart className="w-4 h-4 mr-2 text-pink-300" />
            Community Impact
            <Users className="w-4 h-4 ml-2 text-blue-300" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Our Community
            </span>{" "}
            <span className="relative">
              Impact
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-50"></div>
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
            Every purchase you make supports local youth employment and
            community development.
            <span className="text-cyan-200 font-bold">
              {" "}
              Together, we&apos;re building a stronger, more prosperous
              community.
            </span>
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card relative group">
              {/* Card Glow Effect */}
              <div className="stat-glow absolute -inset-1 bg-gradient-to-r from-white/20 to-cyan-300/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

              {/* Main Card */}
              <div className="relative bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
                {/* Icon Container */}
                <div
                  className={`stat-icon w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>

                {/* Number */}
                <div className="stat-number text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-lg sm:text-xl font-bold text-white/90 mb-3">
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {stat.description}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Impact Section */}
        <div className="impact-section bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-orange-400 to-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Award className="w-4 h-4 mr-2" />
                Empowering Youth
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                Building Futures Through
                <span className="text-cyan-200"> Meaningful Work</span>
              </h3>

              <p className="text-white/90 mb-8 text-lg leading-relaxed">
                Our mission goes beyond grocery delivery. We provide meaningful
                employment, skills training, and career development
                opportunities for young people in our community.
                <span className="text-cyan-200 font-semibold">
                  {" "}
                  Every order creates jobs and builds futures.
                </span>
              </p>

              {/* Features List */}
              <div className="features-list space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-item flex items-center space-x-4 text-white/90 cursor-pointer"
                  >
                    <div className="feature-dot w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex-shrink-0 transition-all duration-300"></div>
                    <span className="text-lg font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3">
                <span>Learn More About Our Mission</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Image Side */}
            <div className="relative">
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Community Impact - Young people working together"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent"></div>

                {/* Floating Stats on Image */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 font-medium">
                        Monthly Growth
                      </div>
                      <div className="text-xl font-black text-gray-900">
                        +23%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 font-medium">
                        Active Youth
                      </div>
                      <div className="text-xl font-black text-gray-900">
                        127
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Success Stories from Our Community
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rashida Begum",
                role: "Delivery Coordinator",
                story:
                  "Started as a part-time delivery person, now manages a team of 15 youth.",
                earnings: "৳25,000/month",
                image: "👩‍💼",
              },
              {
                name: "Karim Ahmed",
                role: "Quality Controller",
                story:
                  "Learned product photography and now runs our social media content.",
                earnings: "৳18,000/month",
                image: "👨‍💻",
              },
              {
                name: "Fatima Khan",
                role: "Customer Support Lead",
                story:
                  "Developed customer service skills and now trains new team members.",
                earnings: "৳22,000/month",
                image: "👩‍🎓",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white"
              >
                <div className="text-4xl mb-4">{story.image}</div>
                <h4 className="text-xl font-bold mb-2">{story.name}</h4>
                <div className="text-cyan-200 font-semibold mb-3">
                  {story.role}
                </div>
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  {story.story}
                </p>
                <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold inline-block">
                  Earning {story.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-white/10 to-cyan-300/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-12">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Join Our Mission
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Every order you place helps create jobs and build a stronger
              community.
              <span className="text-cyan-200 font-bold">
                {" "}
                Be part of the change!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5" />
                <span>Start Shopping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center space-x-3">
                <Users className="w-5 h-5" />
                <span>Join Our Team</span>
              </button>
            </div>
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
  );
}
