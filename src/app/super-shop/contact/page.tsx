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
import Link from "next/link";
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
      title: "কল করুন",
      details: "+88 01700-000000",
      description: "সোম - রবি: 8:00 AM - 10:00 PM",
      color: "from-emerald-400 to-teal-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+88 01700-000000",
      description: "24/7 দ্রুত কাস্টমার সাপোর্ট",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Mail,
      title: "ইমেইল করুন",
      details: "support@basarshop.com",
      description: "2 ঘণ্টার মধ্যে রেসপন্স",
      color: "from-blue-400 to-cyan-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: MapPin,
      title: "সুপার শপে আসুন",
      details: "123 মেইন রোড, ঢাকা",
      description: "সপ্তাহের 7 দিনই খোলা",
      color: "from-orange-400 to-amber-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  const faqItems = [
    {
      question: "ডেলিভারি সময়সূচি কী?",
      answer:
        "আমরা প্রতিদিন সকাল 8:00 AM থেকে রাত 10:00 PM পর্যন্ত হোম ডেলিভারি প্রদান করি। সন্ধ্যা 6:00 PM এর আগে অর্ডার করলে একই দিনে দ্রুত ডেলিভারি নিশ্চিত করা হয়।",
      icon: Clock,
    },
    {
      question: "পণ্য রিটার্ন বা এক্সচেঞ্জ করব কীভাবে?",
      answer:
        "ডেলিভারি পাওয়ার 24 ঘণ্টার মধ্যে যেকোনো সমস্যায় সম্পূর্ণ ঝামেলাবিহীন রিটার্ন ও রিফান্ড সুবিধা রয়েছে। কেবল আমাদের কল বা WhatsApp করুন, আমাদের ডেলিভারি টিম পিকআপের ব্যবস্থা করবে।",
      icon: CheckCircle,
    },
    {
      question: "নিয়মিত গ্রাহকদের জন্য কি ক্রেডিটের সুবিধা আছে?",
      answer:
        "হ্যাঁ, আমাদের নিয়মিত ও বিশ্বস্ত গ্রাহকদের জন্য মাসিক সহজ ক্রেডিট সুবিধা রয়েছে। বিস্তারিত জানতে আমাদের সাথে সরাসরি যোগাযোগ করুন।",
      icon: Star,
    },
    {
      question: "তরুণরা কীভাবে এই কর্মসংস্থান প্রোগ্রামে যুক্ত হতে পারে?",
      answer:
        "আমরা স্থানীয় উদ্যমী তরুণদের জন্য ডেলিভারি, প্যাকেজিং ও কাস্টমার সার্ভিসের চাকরি প্রদান করি। বিস্তারিত জানতে সরাসরি শপে আসুন বা আমাদের হটলাইনে যোগাযোগ করুন।",
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

    alert("আপনার বার্তা সফলভাবে গৃহীত হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
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
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="contact-bg-element absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-full blur-2xl"></div>
        <div className="contact-bg-element absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-2xl"></div>
        <div className="contact-bg-element absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-2xl"></div>

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
                যোগাযোগ করুন
                <MessageCircle className="w-4 h-4 ml-2 text-green-300" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                  আমরা আপনার সেবায়
                </span>{" "}
                <span className="relative">
                  সর্বদা প্রস্তুত
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-50"></div>
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                অর্ডার সংক্রান্ত যেকোনো জিজ্ঞাসা, আমাদের টিমে যোগদান অথবা পরামর্শের জন্য আমাদের সাথে নির্দ্বিধায় যোগাযোগ করুন।
                <span className="text-cyan-200 font-bold">
                  {" "}
                  আমাদের আন্তরিক টিম আপনাকে সর্বোচ্চ সহায়তা প্রদান করতে প্রস্তুত।
                </span>
              </p>

              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl">
                <HeartHandshake className="w-6 h-6 mr-3 text-pink-300" />
                <span className="text-lg font-semibold">
                  কমিউনিটি-বান্ধব সার্বক্ষণিক কাস্টমার সাপোর্ট
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
                <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 text-center border border-gray-100 dark:border-slate-800 h-full">
                  <div
                    className={`method-icon w-20 h-20 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <method.icon className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {method.title}
                  </h3>

                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2 text-lg">
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
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-emerald-200 dark:border-emerald-800">
                    <Send className="w-4 h-4 mr-2" />
                    বার্তা পাঠান
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                    কথা বলুন আমাদের সাথে
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শ আমাদের জানান। আমরা দ্রুততম সময়ে উত্তর দেব।
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        পুরো নাম *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-4 border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-900"
                        placeholder="আপনার পুরো নাম"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        ফোন নম্বর *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="form-input w-full px-4 py-4 border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-900"
                        placeholder="+88 01xxx-xxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      ইমেইল অ্যাড্রেস
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input w-full px-4 py-4 border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-900"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      বিষয় নির্বাচন করুন *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-input w-full px-4 py-4 border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-900"
                    >
                      <option value="">একটি বিষয় নির্বাচন করুন</option>
                      <option value="order-inquiry">অর্ডার সংক্রান্ত জিজ্ঞাসা</option>
                      <option value="delivery-issue">ডেলিভারি সমস্যা</option>
                      <option value="product-quality">পণ্যের মান নিয়ন্ত্রণ</option>
                      <option value="refund-return">রিফান্ড বা রিটার্ন</option>
                      <option value="employment">
                        চাকরি বা ক্যারিয়ারের সুযোগ
                      </option>
                      <option value="partnership">বাণিজ্যিক পার্টনারশিপ</option>
                      <option value="feedback">মতামত ও পরামর্শ</option>
                      <option value="other">অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      আপনার বার্তা *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="form-input w-full px-4 py-4 border-2 border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all duration-300 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-900"
                      placeholder="আমরা আপনাকে কীভাবে সহায়তা করতে পারি?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg border border-emerald-500/20 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>বার্তা পাঠান</span>
                    <Zap className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Enhanced FAQ & Additional Info */}
            <div className="space-y-8">
              {/* Operating Hours */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-slate-800">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    কার্যক্রমের সময়সূচি
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "সোমবার - রবিবার",
                      value: "8:00 AM - 10:00 PM",
                      icon: "🏪",
                    },
                    {
                      label: "কাস্টমার সাপোর্ট",
                      value: "24/7 (WhatsApp)",
                      icon: "💬",
                    },
                    {
                      label: "হোম ডেলিভারি",
                      value: "8:00 AM - 10:00 PM",
                      icon: "🚚",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white text-sm">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced FAQ */}
              <div className="faq-section bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-slate-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
                </h3>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div
                      key={index}
                      className="faq-item bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-gray-100 dark:border-slate-800"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 rounded-xl flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
                            {item.question}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border-2 border-red-200 dark:border-red-900/50 rounded-3xl p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-300">
                    জরুরি সহায়তা
                  </h3>
                </div>

                <p className="text-red-700 dark:text-red-400 mb-4 leading-relaxed text-sm">
                  অফিস সময়ের বাইরে জরুরি ডেলিভারি সহায়তা বা জিজ্ঞাসার জন্য WhatsApp-এ মেসেজ দিন:
                </p>

                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-4 border border-red-200 dark:border-red-900/50">
                  <div className="flex items-center space-x-3 text-red-800 dark:text-red-300 font-bold">
                    <MessageCircle className="w-5 h-5" />
                    <span>+88 01700-000000 (WhatsApp)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Location Map */}
          <div className="map-section mt-20 bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 sm:p-12 border border-gray-100 dark:border-slate-800">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/50 dark:to-amber-950/50 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-orange-200 dark:border-orange-800">
                <MapPin className="w-4 h-4 mr-2" />
                সুপার শপে আসুন
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
                সরাসরি আমাদের শপে স্বাগতম
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm">
                আমাদের স্টোরে এসে সতেজ পণ্য পরখ করুন এবং হাসিখুশি তরুণ দলের সাথে সরাসরি পরিচিত হোন
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-800/80 h-80 rounded-3xl flex items-center justify-center overflow-hidden border border-gray-200 dark:border-slate-700">
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-emerald-500" />
                    <p className="text-lg font-semibold">
                      ইন্টারেক্টিভ গুগল ম্যাপ দ্রুত যুক্ত হচ্ছে
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      আপনার সুবিধার জন্য লোকেশন ফিচার প্রস্তুত হচ্ছে
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-200/50 rounded-full"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-blue-200/50 rounded-full"></div>
                  <div className="absolute top-1/3 right-8 w-6 h-6 bg-purple-200/50 rounded-full"></div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  BASAR Super Shop
                </h4>

                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      title: "ঠিকানা",
                      detail: "123 মেইন রোড, ঢাকা 1000, বাংলাদেশ",
                      color: "from-emerald-500 to-teal-500",
                    },
                    {
                      icon: Phone,
                      title: "হটলাইন",
                      detail: "+88 01700-000000",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: Clock,
                      title: "শপ খোলা",
                      detail: "প্রতিদিন: 8:00 AM - 10:00 PM",
                      color: "from-purple-500 to-pink-500",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-100 dark:border-slate-800"
                    >
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60">
                  <p className="text-emerald-800 dark:text-emerald-300 mb-4 leading-relaxed text-sm">
                    তাজা খাদ্যপণ্য, বন্ধুত্বপূর্ণ সেবা ও আমাদের তরুণ ডেলিভারি দলের সাথে পরিচিত হতে আজই চলে আসুন!
                  </p>

                  <Link
                    href="/super-shop/shop"
                    className="group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 inline-flex items-center space-x-3 cursor-pointer text-sm"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>কেনাকাটা করুন</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Community Connection Section */}
          <div className="mt-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-sm font-semibold mb-6">
                <HeartHandshake className="w-4 h-4 mr-2 text-pink-300" />
                কমিউনিটি কানেকশন
                <Users className="w-4 h-4 ml-2 text-blue-300" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-black mb-6">
                কেবল গ্রাহক সেবা নয়, আন্তরিক আত্মীয়তা
              </h3>

              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                আমাদের সাথে যোগাযোগ করা মানে একটি যত্নশীল পরিবারের সাথে যুক্ত হওয়া।
                <span className="text-cyan-200 font-bold">
                  {" "}
                  প্রতিটি মিথস্ক্রিয়া আমাদের সেবাকে আরও উন্নত ও গ্রাহকবান্ধব করতে সহায়তা করে।
                </span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: "🤝",
                    title: "আন্তরিক আলাপ",
                    desc: "সরাসরি মানুষের আন্তরিক সেবা",
                  },
                  {
                    icon: "⚡",
                    title: "দ্রুত সমাধান",
                    desc: "সময়োপযোগী ও কার্যকর পদক্ষেপ",
                  },
                  {
                    icon: "💝",
                    title: "সামাজিক দায়িত্ব",
                    desc: "স্থানীয় উন্নয়নে পারস্পরিক অঙ্গীকার",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-bold mb-2 text-lg">{item.title}</h4>
                    <p className="text-white/80 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/super-shop/shop"
                  className="group bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>কেনাকাটা শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  href="/super-shop/about"
                  className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:-translate-y-1 inline-flex items-center justify-center space-x-3 cursor-pointer"
                >
                  <Users className="w-5 h-5" />
                  <span>আমাদের সম্পর্কে জানুন</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-500 dark:text-gray-400">
            {[
              "🔒 নিরাপদ যোগাযোগ ব্যবস্থা",
              "⚡ দ্রুততম রেসপন্স টাইম",
              "🤝 সামাজিক ক্ষমতায়ন",
              "💯 শতভাগ সন্তুষ্টির নিশ্চয়তা",
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
  );
}
