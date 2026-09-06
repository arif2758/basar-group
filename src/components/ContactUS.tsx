"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa6";

const ContactUS: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useScrollAnimation();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "পূর্ণ নাম আবশ্যক";
    if (!formData.email.trim()) newErrors.email = "Email আবশ্যক";
    else if (!validateEmail(formData.email))
      newErrors.email = "অনুগ্রহ করে একটি সঠিক Email লিখুন";
    if (!formData.subject.trim()) newErrors.subject = "বিষয় আবশ্যক";
    if (!formData.message.trim()) newErrors.message = "বার্তা আবশ্যক";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("বার্তাটি সফলভাবে পাঠানো হয়েছে!");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3.5 py-1 text-xs font-semibold mb-5">
              যোগাযোগ করুন
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">BASAR Group</span>-এর সাথে যোগাযোগ
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              আমরা আপনার মতামত ও প্রশ্নের অপেক্ষায় আছি। আমাদের কমিউনিটি উদ্যোগ সম্পর্কে জানতে, ভলান্টিয়ার হিসেবে যুক্ত হতে বা যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-50 dark:from-[#070b14] to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.4)] p-8 lg:p-10 border border-slate-200 dark:border-[#303030] transition-all duration-300">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                আমাদের একটি বার্তা পাঠান
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                নিচের ফর্মটি পূরণ করুন, আমাদের টিম দ্রুত আপনার সাথে যোগাযোগ করবে।
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="form-field">
                  <label
                    htmlFor="fullName"
                    className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 ${
                      errors.fullName
                        ? "border-red-400 dark:border-red-500/60 bg-red-50/50 dark:bg-red-950/20"
                        : "border-slate-200 dark:border-[#303030] focus:border-blue-500 dark:focus:border-blue-500"
                    }`}
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Email ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 ${
                      errors.email
                        ? "border-red-400 dark:border-red-500/60 bg-red-50/50 dark:bg-red-950/20"
                        : "border-slate-200 dark:border-[#303030] focus:border-blue-500 dark:focus:border-blue-500"
                    }`}
                    placeholder="আপনার Email ঠিকানা লিখুন"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    বিষয় <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 ${
                      errors.subject
                        ? "border-red-400 dark:border-red-500/60 bg-red-50/50 dark:bg-red-950/20"
                        : "border-slate-200 dark:border-[#303030] focus:border-blue-500 dark:focus:border-blue-500"
                    }`}
                    placeholder="কী বিষয়ে জানতে চান?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                  >
                    বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:bg-white dark:focus:bg-[#141414] focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-400 dark:border-red-500/60 bg-red-50/50 dark:bg-red-950/20"
                        : "border-slate-200 dark:border-[#303030] focus:border-blue-500 dark:focus:border-blue-500"
                    }`}
                    placeholder="আপনার বার্তা বা জিজ্ঞাসা এখানে লিখুন..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1.5 font-medium">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="form-field pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold py-3.5 px-6 rounded-xl shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-500/20 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        পাঠানো হচ্ছে...
                      </span>
                    ) : (
                      "বার্তা পাঠান"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Company Information & Map */}
          <div ref={infoRef} className="space-y-8">
            {/* Company Info */}
            <div className="animate-on-scroll bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] p-8 lg:p-10 border border-slate-200 dark:border-[#303030]">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
                যোগাযোগের ঠিকানা
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-8">
                আমাদের প্রধান কার্যালয়ে আসুন অথবা অফিশিয়াল চ্যানেলে যোগাযোগ করুন।
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                      ঠিকানা (Address)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      House 123, Road 45
                      <br />
                      Gulshan-2, Dhaka 1212
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                      ফোন (Phone)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">+880 1712-345678</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">+880 2-9876543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">info@basargroup.com</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">contact@basargroup.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                      কর্মঘণ্টা (Working Hours)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      সোমবার - শুক্রবার: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      শনিবার: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">রবিবার: বন্ধ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="animate-on-scroll bg-white dark:bg-[#141414] rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] overflow-hidden border border-slate-200 dark:border-[#303030]">
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  আমাদের অবস্থান (Location)
                </h3>
              </div>
              <div className="h-64 lg:h-80 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125181!3d23.7808875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d8042ceb2b%3A0x5d9b6c8c5c5c5c5c!2sGulshan%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full dark:invert-[0.88] dark:hue-rotate-180 dark:contrast-[0.85]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="mt-16 lg:mt-24 animate-on-scroll">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
              সোশ্যাল মিডিয়ায় যুক্ত থাকুন
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              সর্বশেষ আপডেট, কার্যক্রম ও তথ্যের জন্য আমাদের সামাজিক যোগাযোগ মাধ্যমে অনুসরণ করুন
            </p>
          </div>

          <div className="flex justify-center space-x-4 sm:space-x-6 flex-wrap gap-y-3">
            {/* Facebook */}
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon group bg-white dark:bg-[#141414] p-3.5 sm:p-4 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] text-blue-600 dark:text-blue-400 hover:border-blue-500/50 transition-all"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon group bg-white dark:bg-[#141414] p-3.5 sm:p-4 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] text-blue-700 dark:text-blue-400 hover:border-blue-500/50 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="social-icon group bg-white dark:bg-[#141414] p-3.5 sm:p-4 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 transition-all"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            {/* Twitter */}
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon group bg-white dark:bg-[#141414] p-3.5 sm:p-4 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] text-sky-500 dark:text-sky-400 hover:border-sky-500/50 transition-all"
              aria-label="Twitter"
            >
              <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>

            {/* Instagram */}
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="social-icon group bg-white dark:bg-[#141414] p-3.5 sm:p-4 rounded-2xl shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-slate-200 dark:border-[#303030] text-pink-600 dark:text-pink-400 hover:border-pink-500/50 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
