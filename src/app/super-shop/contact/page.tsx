"use client";

import { useState, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HeartHandshake,
  Sparkles,
  Star,
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
} from "lucide-react";
import { CartProvider } from "../contexts/CartContext";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";




gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+88 01700-000000",
      description: "Mon-Sun: 8:00 AM - 10:00 PM",
      color: "from-emerald-400 to-teal-400",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+88 01700-000000",
      description: "24/7 Quick Support",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@basarshop.com",
      description: "Response within 2 hours",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Visit Store",
      details: "123 Main Street, Dhaka",
      description: "Open 7 days a week",
      color: "from-orange-400 to-amber-400",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const faqItems = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver from 8:00 AM to 10:00 PM, 7 days a week. Same-day delivery is available for orders placed before 6:00 PM.",
      icon: Clock,
    },
    {
      question: "How do I return or exchange items?",
      answer:
        "We offer hassle-free returns within 24 hours of delivery. Simply contact us and our team will arrange pickup and refund.",
      icon: CheckCircle,
    },
    {
      question: "Do you offer credit options?",
      answer:
        "Yes, we provide monthly credit options for regular customers with a good payment history. Contact us to learn more.",
      icon: Star,
    },
    {
      question: "How can youth join your employment program?",
      answer:
        "We regularly hire local youth for delivery, packing, and customer service roles. Visit our store or call us for current opportunities.",
      icon: Users,
    },
  ];

  useScrollAnimation();
  useGSAP(
    () => {
      // Floating background elements
      gsap.to(".contact-bg-element", {
        y: "random(-25, 25)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(8, 12)",
        ease: "none",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });

      // Hero section animation
      gsap.fromTo(
        ".contact-hero",
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
        }
      );

      // Contact methods animation
      gsap.fromTo(
        ".contact-method",
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
            trigger: ".contact-methods",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form",
        {
          opacity: 0,
          x: -80,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // FAQ animation
      gsap.fromTo(
        ".faq-item",
        {
          opacity: 0,
          x: 80,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".faq-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Map section animation
      gsap.fromTo(
        ".map-section",
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".map-section",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Setup hover interactions
      setupContactHovers();

      // Sparkle animation
      gsap.to(".sparkle-contact", {
        y: "random(-8, 8)",
        rotation: "random(0, 360)",
        duration: "random(3, 5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    },
    { scope: containerRef }
  );

  const setupContactHovers = () => {
    // Contact method cards hover
    gsap.utils.toArray<HTMLElement>(".contact-method").forEach((card) => {
      const icon = card.querySelector(".method-icon");
      const glow = card.querySelector(".method-glow");

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          y: -12,
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

    // Form inputs focus animation
    gsap.utils.toArray<HTMLElement>(".form-input").forEach((input) => {
      const focusTl = gsap.timeline({ paused: true });

      focusTl.to(input, {
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(16, 185, 129, 0.15)",
        duration: 0.3,
        ease: "power2.out",
      });

      input.addEventListener("focus", () => focusTl.play());
      input.addEventListener("blur", () => focusTl.reverse());
    });

    // Submit button hover
    const submitBtn = containerRef.current?.querySelector(".submit-btn");
    if (submitBtn) {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(submitBtn, {
        scale: 1.02,
        y: -3,
        boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });

      submitBtn.addEventListener("mouseenter", () => hoverTl.play());
      submitBtn.addEventListener("mouseleave", () => hoverTl.reverse());
    }

    // FAQ items hover
    gsap.utils.toArray<HTMLElement>(".faq-item").forEach((item) => {
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(item, {
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

      item.addEventListener("mouseenter", () => hoverTl.play());
      item.addEventListener("mouseleave", () => hoverTl.reverse());
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Animate form submission
    const submitBtn = e.currentTarget.querySelector(".submit-btn");
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }

    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CartProvider>
      <div
        ref={containerRef}
        className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden"
      >
        {/* Floating Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="contact-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-2xl"></div>
          <div className="contact-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
          <div className="contact-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>

          <Sparkles className="sparkle-contact absolute top-32 right-1/4 w-6 h-6 text-emerald-300/30" />
          <Star className="sparkle-contact absolute bottom-1/3 left-1/4 w-5 h-5 text-blue-300/25" />
          <Sparkles className="sparkle-contact absolute top-2/3 right-1/3 w-4 h-4 text-purple-300/35" />
        </div>

        <main className="relative z-10">
          {/* Enhanced Hero Section */}
          <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 py-20 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="contact-hero">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                  <HeartHandshake className="w-4 h-4 mr-2 text-cyan-300" />
                  Get in Touch
                  <MessageCircle className="w-4 h-4 ml-2 text-green-300" />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    We&apos;re Here to
                  </span>{" "}
                  <span className="relative">
                    Help
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-50"></div>
                  </span>
                </h1>

                <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                  Whether you have questions about orders, want to join our
                  team, or need support,
                  <span className="text-cyan-200 font-bold">
                    {" "}
                    our community-focused team is ready to assist you.
                  </span>
                </p>

                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl">
                  <HeartHandshake className="w-6 h-6 mr-3 text-pink-300" />
                  <span className="text-lg font-semibold">
                    Community-First Customer Support
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Enhanced Contact Methods */}
            <div className="contact-methods grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method relative group">
                  {/* Card Glow Effect */}
                  <div className="method-glow absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-3xl opacity-0 blur-sm transition-all duration-500"></div>

                  {/* Main Card */}
                  <div className="relative bg-white rounded-3xl shadow-lg p-8 text-center border border-gray-100 h-full">
                    <div
                      className={`method-icon w-20 h-20 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    >
                      <method.icon className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {method.title}
                    </h3>

                    <p className="text-gray-800 font-semibold mb-2 text-lg">
                      {method.details}
                    </p>

                    <p className={`text-sm ${method.textColor} font-medium`}>
                      {method.description}
                    </p>

                    {/* Decorative element */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                      <Sparkles className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Enhanced Contact Form */}
              <div className="contact-form">
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-emerald-200">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                      Let&apos;s Start a Conversation
                    </h2>
                    <p className="text-gray-600">
                      We&apos;d love to hear from you. Send us a message and we&apos;ll
                      respond as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="+88 01xxx-xxxxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="order-inquiry">Order Inquiry</option>
                        <option value="delivery-issue">Delivery Issue</option>
                        <option value="product-quality">Product Quality</option>
                        <option value="refund-return">Refund/Return</option>
                        <option value="employment">
                          Employment Opportunities
                        </option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">General Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="form-input w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="submit-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border border-emerald-500/20"
                    >
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                      <Zap className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Enhanced FAQ & Additional Info */}
              <div className="space-y-8">
                {/* Operating Hours */}
                <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Operating Hours
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "Monday - Sunday",
                        value: "8:00 AM - 10:00 PM",
                        icon: "🏪",
                      },
                      {
                        label: "Customer Support",
                        value: "24/7 via WhatsApp",
                        icon: "💬",
                      },
                      {
                        label: "Delivery Hours",
                        value: "8:00 AM - 10:00 PM",
                        icon: "🚚",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium text-gray-700">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced FAQ */}
                <div className="faq-section bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div
                        key={index}
                        className="faq-item bg-gray-50 rounded-2xl p-6 border border-gray-100"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3 text-lg">
                              {item.question}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-red-800">
                      Emergency Support
                    </h3>
                  </div>

                  <p className="text-red-700 mb-4 leading-relaxed">
                    For urgent delivery issues or emergency support outside
                    business hours:
                  </p>

                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-red-200">
                    <div className="flex items-center space-x-3 text-red-800 font-bold">
                      <MessageCircle className="w-5 h-5" />
                      <span>+88 01700-000000 (WhatsApp)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Location Map */}
            <div className="map-section mt-20 bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100">
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-orange-200">
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Our Store
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">
                  Come See Us in Person
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experience our community-focused approach firsthand and meet
                  our amazing youth team
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-80 rounded-3xl flex items-center justify-center overflow-hidden">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                      <p className="text-lg font-semibold">
                        Interactive Map Coming Soon
                      </p>
                      <p className="text-sm">
                        Enhanced location features in development
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-200/50 rounded-full"></div>
                    <div className="absolute bottom-6 right-6 w-12 h-12 bg-blue-200/50 rounded-full"></div>
                    <div className="absolute top-1/3 right-8 w-6 h-6 bg-purple-200/50 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-8">
                    BASAR Super Shop
                  </h4>

                  <div className="space-y-6">
                    {[
                      {
                        icon: MapPin,
                        title: "Address",
                        detail: "123 Main Street, Dhaka 1000, Bangladesh",
                        color: "from-emerald-500 to-teal-500",
                      },
                      {
                        icon: Phone,
                        title: "Phone",
                        detail: "+88 01700-000000",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: Clock,
                        title: "Store Hours",
                        detail: "Daily: 8:00 AM - 10:00 PM",
                        color: "from-purple-500 to-pink-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl"
                      >
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center`}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-gray-600">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                    <p className="text-emerald-800 mb-4 leading-relaxed">
                      Visit us for fresh products, friendly service, and to meet
                      our amazing youth team!
                      <span className="font-semibold">
                        {" "}
                        Experience the community difference.
                      </span>
                    </p>

                    <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center space-x-3">
                      <MapPin className="w-5 h-5" />
                      <span>Get Directions</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Connection Section */}
            <div className="mt-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                  <HeartHandshake className="w-4 h-4 mr-2 text-pink-300" />
                  Community Connection
                  <Users className="w-4 h-4 ml-2 text-blue-300" />
                </div>

                <h3 className="text-3xl sm:text-4xl font-black mb-6">
                  More Than Just Customer Service
                </h3>

                <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                  When you contact us, you&apos;re connecting with a community that
                  cares.
                  <span className="text-cyan-200 font-bold">
                    {" "}
                    Every interaction helps build stronger relationships and
                    better service.
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      icon: "🤝",
                      title: "Personal Touch",
                      desc: "Real people, real conversations",
                    },
                    {
                      icon: "⚡",
                      title: "Quick Response",
                      desc: "Fast, helpful solutions",
                    },
                    {
                      icon: "💝",
                      title: "Community Care",
                      desc: "Supporting local growth",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                    <MessageCircle className="w-5 h-5" />
                    <span>Start Conversation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>

                  <button className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Join Our Community</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500">
              {[
                "🔒 Secure Communication",
                "⚡ Fast Response Time",
                "🤝 Community Support",
                "💯 Satisfaction Guaranteed",
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
        </main>
      </div>
    </CartProvider>
  );
}
