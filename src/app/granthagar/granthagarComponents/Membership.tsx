"use client";
import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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

  useScrollAnimation();
  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Membership Plans Animation
      gsap.fromTo(
        plansRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: plansRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Benefits Animation
      gsap.fromTo(
        benefitsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const rules = [
    {
      icon: BookOpen,
      title: "One Book at a Time",
      description:
        "Members can borrow one book at a time. You must return your current book before requesting another.",
    },
    {
      icon: Users,
      title: "Student Priority",
      description:
        "Students receive priority access to books, especially for academic and educational materials.",
    },
    {
      icon: Truck,
      title: "30-Minute Delivery",
      description:
        "Free delivery within 30 minutes for members in Dhaka city. We bring books directly to your doorstep.",
    },
    {
      icon: Clock,
      title: "Return Policy",
      description:
        "Books should be returned within 14 days. Extensions available upon request if no one else is waiting.",
    },
    {
      icon: Shield,
      title: "Book Care",
      description:
        "Handle books with care. Damaged or lost books may require replacement or repair fees.",
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
    <div ref={containerRef} className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
            Join BASAR গ্রন্থাগার
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
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
              className={`plan-card relative bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-200 ${
                plan.popular ? "ring-2 ring-emerald-500/80" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-8 text-center border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-[#1a1a1a]/50">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{plan.price}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{plan.period}</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">{plan.description}</p>
              </div>

              <div className="p-8">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 text-white py-3 px-6 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]"
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
          className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-amber-400 fill-current" />
            <span>Membership Benefits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-[#1a1a1a] border border-slate-100 dark:border-[#262626] text-xs sm:text-sm text-slate-700 dark:text-slate-300"
              >
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules and Policies */}
        <div
          ref={rulesRef}
          className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Simple Rules for a Great Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="rule-card bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-5 border border-slate-200 dark:border-[#262626] shadow-sm"
              >
                <div className="w-10 h-10 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center mb-3">
                  <rule.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">
                  {rule.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div
          ref={noticeRef}
          className="bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-12 text-slate-800 dark:text-slate-200"
        >
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-amber-700 dark:text-amber-400 mb-2">
                Important Notice
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <p>• Your membership deposit is 100% refundable when you cancel your membership.</p>
                <p>• Student ID verification required for student membership rates.</p>
                <p>• Delivery service available in Dhaka city from 9 AM to 9 PM, 7 days a week.</p>
                <p>• Books must be returned in good condition to maintain membership benefits.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div ref={faqRef} className="bg-white dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="faq-item border-b border-slate-100 dark:border-[#262626] pb-4 last:border-b-0"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  {item.question}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="bg-slate-900 dark:bg-[#141414] border border-slate-800 dark:border-[#303030] rounded-2xl shadow-sm p-8 sm:p-12 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-slate-300 dark:text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Join hundreds of students and readers who&apos;ve already
            transformed their lives through our community library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-7 py-3 rounded-xl font-medium text-sm transition-colors shadow-sm active:scale-[0.99]">
              Join as Student (৳100)
            </button>
            <button className="border border-slate-600 dark:border-[#303030] bg-transparent hover:bg-slate-800 text-slate-300 px-7 py-3 rounded-xl font-medium text-sm transition-colors">
              General Membership (৳200)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
