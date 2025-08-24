"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  CheckCircle,
  Clock,
  Truck,
  BookOpen,
  Users,
  Shield,
  Star,
  AlertCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Membership: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const rulesRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 50,
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

      // Membership Plans Animation
      gsap.fromTo(
        plansRef.current?.children || [],
        {
          opacity: 0,
          y: 80,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: plansRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Benefits Animation
      gsap.fromTo(
        benefitsRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotationY: 10,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Rules Cards Animation
      gsap.fromTo(
        rulesRef.current?.querySelectorAll(".rule-card") || [],
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
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: rulesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Notice Animation
      gsap.fromTo(
        noticeRef.current,
        {
          opacity: 0,
          x: -100,
          rotationZ: -2,
        },
        {
          opacity: 1,
          x: 0,
          rotationZ: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: noticeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // FAQ Animation
      gsap.fromTo(
        faqRef.current?.querySelectorAll(".faq-item") || [],
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA Animation
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Hover animations for interactive elements
      const planCards = plansRef.current?.querySelectorAll(".plan-card");
      planCards?.forEach((card) => {
        const button = card.querySelector(".plan-button");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
          });
        });
      });

      // Rule cards hover effect
      const ruleCards = rulesRef.current?.querySelectorAll(".rule-card");
      ruleCards?.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // CTA buttons hover effect
      const ctaButtons = ctaRef.current?.querySelectorAll(".cta-button");
      ctaButtons?.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.08,
            y: -3,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    },
    { scope: containerRef }
  );

  const rules = [
    {
      icon: BookOpen,
      title: "One Book at a Time",
      description:
        "Members can borrow one book at a time. You must return your current book before requesting another.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Student Priority",
      description:
        "Students receive priority access to books, especially for academic and educational materials.",
      color: "green",
    },
    {
      icon: Truck,
      title: "30-Minute Delivery",
      description:
        "Free delivery within 30 minutes for members in Dhaka city. We bring books directly to your doorstep.",
      color: "orange",
    },
    {
      icon: Clock,
      title: "Return Policy",
      description:
        "Books should be returned within 14 days. Extensions available upon request if no one else is waiting.",
      color: "purple",
    },
    {
      icon: Shield,
      title: "Book Care",
      description:
        "Handle books with care. Damaged or lost books may require replacement or repair fees.",
      color: "red",
    },
  ];

  const benefits = [
    "Access to 500+ carefully curated books",
    "Free 30-minute delivery service in Dhaka",
    "Priority access to new arrivals",
    "Reading tracker and achievement system",
    "Participation in monthly quiz contests",
    "Community discussion forums",
    "Personalized book recommendations",
    "No late fees for students",
  ];

  const membershipPlans = [
    {
      name: "Student Membership",
      price: "৳100",
      period: "Refundable Deposit",
      description: "Perfect for students with valid student ID",
      features: [
        "One book at a time",
        "30-minute free delivery",
        "14-day borrowing period",
        "Student priority access",
        "Reading tracker access",
        "Monthly quiz participation",
      ],
      color: "from-blue-500 to-blue-600",
      popular: true,
    },
    {
      name: "General Membership",
      price: "৳200",
      period: "Refundable Deposit",
      description: "For working professionals and general readers",
      features: [
        "One book at a time",
        "30-minute free delivery",
        "14-day borrowing period",
        "Access to all books",
        "Reading tracker access",
        "Monthly quiz participation",
      ],
      color: "from-green-500 to-green-600",
      popular: false,
    },
  ];

  const faq = [
    {
      question: "Is the membership fee refundable?",
      answer:
        "Yes! The membership deposit is 100% refundable when you cancel your membership. We only keep the deposit to ensure books are returned safely.",
    },
    {
      question: "How does the 30-minute delivery work?",
      answer:
        "Once you request a book, our team will deliver it to your location within 30 minutes during business hours (9 AM - 9 PM). We cover most areas of Dhaka city.",
    },
    {
      question: "What if I lose or damage a book?",
      answer:
        "We understand accidents happen. For minor damage, there's no charge. For significant damage or lost books, we may ask you to replace the book or pay a reasonable replacement fee.",
    },
    {
      question: "Can I extend my borrowing period?",
      answer:
        "Yes, you can extend for another 7 days if no one else is waiting for the book. Just send us a message through the app or call us.",
    },
    {
      question: "Do you have digital/e-books?",
      answer:
        "Currently, we focus on physical books to reduce screen time and encourage focused reading. However, we're exploring digital options for rare or high-demand books.",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Join BASAR গ্রন্থাগার
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Become part of our reading community and transform your learning
            journey. Simple rules, great books, and amazing community support.
          </p>
        </div>

        {/* Membership Plans */}
        <div
          ref={plansRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {membershipPlans.map((plan, index) => (
            <div
              key={index}
              className={`plan-card relative bg-white rounded-2xl shadow-xl overflow-hidden ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div
                className={`bg-gradient-to-r ${plan.color} p-8 text-white text-center`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">{plan.price}</div>
                <div className="text-sm opacity-90">{plan.period}</div>
                <p className="text-sm mt-3 opacity-90">{plan.description}</p>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`plan-button w-full mt-8 bg-gradient-to-r ${plan.color} text-white py-3 px-6 rounded-lg font-semibold`}
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div
          ref={benefitsRef}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Membership Benefits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and Policies */}
        <div
          ref={rulesRef}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Simple Rules for a Great Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="rule-card bg-gray-50 rounded-xl p-6 shadow-md"
              >
                <div
                  className={`w-12 h-12 bg-${rule.color}-100 rounded-full flex items-center justify-center mb-4`}
                >
                  <rule.icon className={`w-6 h-6 text-${rule.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {rule.title}
                </h3>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div
          ref={noticeRef}
          className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-16"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Important Notice
              </h3>
              <div className="text-orange-800 space-y-2">
                <p>
                  • Your membership deposit is 100% refundable when you cancel
                  your membership.
                </p>
                <p>
                  • Student ID verification required for student membership
                  rates.
                </p>
                <p>
                  • Delivery service available in Dhaka city from 9 AM to 9 PM,
                  7 days a week.
                </p>
                <p>
                  • Books must be returned in good condition to maintain
                  membership benefits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faq.map((item, index) => (
              <div
                key={index}
                className="faq-item border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="bg-gradient-to-br from-blue-600 via-purple-600 to-orange-600 rounded-2xl shadow-xl p-8 mt-16 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join hundreds of students and readers who&apos;ve already
            transformed their lives through our community library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cta-button bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg">
              Join as Student (৳100)
            </button>
            <button className="cta-button border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg">
              General Membership (৳200)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
