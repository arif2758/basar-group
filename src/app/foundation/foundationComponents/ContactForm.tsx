"use client";

import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Heart,
  Clock,
} from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/utils/mockGsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
    volunteer: false,
  });
  const containerRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("আপনার বার্তার জন্য ধন্যবাদ! আমরা খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
      volunteer: false,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "প্রধান কার্যালয়",
      info: "বাছার ফাউন্ডেশন ভবন\nমাদারীপুর সদর, ঢাকা বিভাগ, বাংলাদেশ",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      icon: Phone,
      title: "হটলাইন ও ফোন নম্বর",
      info: "প্রধান: +880 123 456 789\nজরুরি সেবা: +880 198 765 432\nWhatsApp: +880 171 234 5678",
      color: "from-sky-500 to-sky-700",
    },
    {
      icon: Mail,
      title: "ইমেইল যোগাযোগ",
      info: "সাধারণ তথ্য: info@basarfoundation.org\nঅনুদান সহায়তা: donate@basarfoundation.org\nস্বেচ্ছাসেবক: volunteer@basarfoundation.org",
      color: "from-amber-500 to-amber-700",
    },
    {
      icon: Clock,
      title: "অফিসের সময়সূচি",
      info: "রবিবার - বৃহস্পতিবার: 9:00 AM - 6:00 PM\nশুক্রবার: 10:00 AM - 4:00 PM\nজরুরি সেবা: 24/7 খোলা",
      color: "from-purple-500 to-purple-700",
    },
  ];

  const subjects = [
    { value: "general", label: "সাধারণ জিজ্ঞাসা" },
    { value: "donation", label: "অনুদান সম্পর্কিত তথ্য" },
    { value: "volunteer", label: "স্বেচ্ছাসেবী হওয়ার সুযোগ" },
    { value: "partnership", label: "প্রাতিষ্ঠানিক পার্টনারশিপ" },
    { value: "media", label: "মিডিয়া ও প্রেস" },
    { value: "emergency", label: "জরুরি সহায়তা ও ত্রাণ" },
  ];

  useScrollAnimation();
  useGSAP(() => {
    // Header animation
    gsap.from(".contact-header", {
      scrollTrigger: {
        trigger: ".contact-header",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Contact info sidebar
    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Contact info items stagger
    gsap.from(".contact-info-item", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "sine.out",
    });

    // Contact form
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Form fields stagger
    gsap.from(".form-field", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "sine.out",
    });

    // FAQ section
    gsap.from(".faq-section", {
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // FAQ items stagger
    gsap.from(".faq-item", {
      scrollTrigger: {
        trigger: ".faq-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "sine.out",
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="py-20 bg-white dark:bg-[#070b14] transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="contact-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            আমাদের সাথে যোগাযোগ করুন
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            আমাদের কর্মসূচি সম্পর্কে কোনো প্রশ্ন থাকলে, স্বেচ্ছাসেবী হতে চাইলে অথবা জরুরি সহায়তার প্রয়োজনে সরাসরি যোগাযোগ করুন।
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="contact-info bg-slate-50 dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <div className="text-center mb-8">
                <div className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-800/40">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                  যোগাযোগের মাধ্যমসমূহ
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  আমাদের ডেডিকেটেড টিমের সাথে যুক্ত হওয়ার সহজ উপায়
                </p>
              </div>

              <div className="space-y-5">
                {contactInfo.map((info, index) => {
                  const InfoIcon = info.icon;
                  return (
                    <div key={index} className="contact-info-item flex items-start space-x-3.5">
                      <div
                        className={`bg-gradient-to-r ${info.color} w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-xs`}
                      >
                        <InfoIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed whitespace-pre-line">
                          {info.info}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-2.5">
                <a 
                  href="tel:+880198765432"
                  className="w-full inline-block text-center bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.99]"
                >
                  জরুরি হটলাইন
                </a>
                <button 
                  onClick={() => alert("ব্রোশিউর ডাউনলোড শীঘ্রই চালু হবে।")}
                  className="w-full bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-300 py-2.5 rounded-xl font-medium text-sm transition-all"
                >
                  ব্রোশিউর ডাউনলোড করুন
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="contact-form bg-slate-50 dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-6 sm:p-8 border border-slate-200 dark:border-[#303030]">
              <div className="flex items-center mb-8">
                <div className="bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 p-3.5 rounded-xl mr-4 border border-sky-100 dark:border-sky-800/40">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    আমাদের বার্তা পাঠান
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    আমরা 24 ঘণ্টার মধ্যে আপনার বার্তার উত্তর দেব
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      আপনার পূর্ণ নাম *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                        placeholder="আপনার পূর্ণ নাম লিখুন"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      ইমেইল ঠিকানা *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                        placeholder="আপনার ইমেইল লিখুন"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      ফোন নম্বর
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                        placeholder="আপনার ফোন নম্বর লিখুন"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      বিষয় *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value} className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                    বার্তা বা মন্তব্য *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
                    placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                  ></textarea>
                </div>

                <div className="form-field flex items-center">
                  <input
                    type="checkbox"
                    name="volunteer"
                    id="volunteer-checkbox"
                    checked={formData.volunteer}
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 dark:bg-[#1f1f1f] dark:border-[#303030]"
                  />
                  <label htmlFor="volunteer-checkbox" className="ml-2.5 text-slate-700 dark:text-slate-300 text-sm cursor-pointer">
                    আমি স্বেচ্ছাসেবক হিসেবে কাজ করতে আগ্রহী
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-base font-medium shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>বার্তা পাঠান</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400">
              বাছার ফাউন্ডেশন ও আমাদের সমাজসেবামূলক কার্যক্রম সম্পর্কে সাধারণ কিছু প্রশ্নের উত্তর
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                question: "আমি কীভাবে আমার অনুদানের সামাজিক প্রভাব ট্র্যাক করতে পারব?",
                answer:
                  "প্রতিটি অনুদানকারীকে আমরা নিয়মিত প্রভাব প্রতিবেদন পাঠাই, যেখানে অনুদানের সঠিক ব্যবহার, সেবাগ্রহীতাদের ছবি ও বাস্তব সাফল্যের গল্প তুলে ধরা হয়।",
              },
              {
                question: "অনুদানে কি অফিসিয়াল রসিদ প্রদান করা হয়?",
                answer:
                  "হ্যাঁ, বাছার ফাউন্ডেশন একটি সরকার নিবন্ধিত অলাভজনক সমাজকল্যাণমূলক সংস্থা। প্রতিটি অনুদানের জন্য তাৎক্ষণিক অফিসিয়াল মানি রিসিট প্রদান করা হয়।",
              },
              {
                question: "আমি কি দূর থেকে রিমোটলি স্বেচ্ছাসেবী হিসেবে কাজ করতে পারি?",
                answer:
                  "অবশ্যই! আমাদের সোশ্যাল মিডিয়া প্রচারণা, কনটেন্ট তৈরি, ডিজিটাল টিউটরিং এবং প্রশাসনিক সহায়তার মতো বিভিন্ন অনলাইন ভলান্টিয়ার সুযোগ রয়েছে।",
              },
              {
                question: "আপনারা কীভাবে আর্থিক স্বচ্ছতা বজায় রাখেন?",
                answer:
                  "আমরা নিয়মিত বার্ষিক অডিট রিপোর্ট প্রকাশ করি, প্রতিটি কর্মসূচির হিসাব উন্মুক্ত রাখি এবং যে কোনো শুভাকাঙ্ক্ষী ও ডোনারদের কার্যক্রম পরিদর্শনের সুযোগ উন্মুক্ত রাখি।",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-slate-50 dark:bg-[#141414] rounded-xl p-6 border border-slate-200 dark:border-[#303030] shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
              >
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-base">
                  {faq.question}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;