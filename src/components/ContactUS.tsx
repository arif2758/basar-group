"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Hero section fade-in from top
      tl.fromTo(
        heroRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Form fields staggered slide-up animation
      const formFields = formRef.current?.querySelectorAll(".form-field");
      if (formFields) {
        tl.fromTo(
          formFields,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }

      // Company info fade-in from right
      tl.fromTo(
        infoRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8"
      );

      // Social icons animation
      const socialIcons = socialRef.current?.querySelectorAll(".social-icon");
      if (socialIcons) {
        socialIcons.forEach((icon) => {
          const iconElement = icon as HTMLElement;

          gsap.set(iconElement, { scale: 1 });

          const handleMouseEnter = () => {
            gsap.to(iconElement, {
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(iconElement, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          iconElement.addEventListener("mouseenter", handleMouseEnter);
          iconElement.addEventListener("mouseleave", handleMouseLeave);

          return () => {
            iconElement.removeEventListener("mouseenter", handleMouseEnter);
            iconElement.removeEventListener("mouseleave", handleMouseLeave);
          };
        });
      }

      // Scroll-triggered animations
      gsap.fromTo(
        ".animate-on-scroll",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".animate-on-scroll",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

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

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Message sent successfully!");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100"
    >
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Contact <span className="text-blue-400">BASAR Group</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Get in touch with our expert
              team and discover how we can help you achieve your goals.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Send us a Message
              </h2>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.fullName
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-400"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.email
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-400"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                      errors.subject
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-400"
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-400 bg-red-50"
                        : "border-slate-300 focus:border-blue-400"
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="form-field">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-slate-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Company Information & Map */}
          <div ref={infoRef} className="space-y-8">
            {/* Company Info */}
            <div className="animate-on-scroll bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-slate-200">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Address
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      House 123, Road 45
                      <br />
                      Gulshan-2, Dhaka 1212
                      <br />
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-slate-600">+880 1712-345678</p>
                    <p className="text-slate-600">+880 2-9876543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Email
                    </h3>
                    <p className="text-slate-600">info@basargroup.com</p>
                    <p className="text-slate-600">contact@basargroup.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-orange-600"
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      Working Hours
                    </h3>
                    <p className="text-slate-600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-slate-600">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="animate-on-scroll bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">
                  Find Us
                </h3>
              </div>
              <div className="h-64 lg:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125181!3d23.7808875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7d8042ceb2b%3A0x5d9b6c8c5c5c5c5c!2sGulshan%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div ref={socialRef} className="mt-16 lg:mt-24 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Follow us on social media for the latest updates and insights
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            {/* Facebook */}
            <a
              href="#"
              className="social-icon group bg-white p-4 rounded-full shadow-lg border border-slate-200"
              aria-label="Facebook"
            >
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="social-icon group bg-white p-4 rounded-full shadow-lg border border-slate-200"
              aria-label="LinkedIn"
            >
              <svg
                className="w-8 h-8 text-blue-700"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="#"
              className="social-icon group bg-white p-4 rounded-full shadow-lg border border-slate-200"
              aria-label="WhatsApp"
            >
              <svg
                className="w-8 h-8 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="#"
              className="social-icon group bg-white p-4 rounded-full shadow-lg border border-slate-200"
              aria-label="Twitter"
            >
              <svg
                className="w-8 h-8 text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="social-icon group bg-white p-4 rounded-full shadow-lg border border-slate-200"
              aria-label="Instagram"
            >
              <svg
                className="w-8 h-8 text-pink-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.036.388a3.9 3.9 0 00-1.423.923A3.9 3.9 0 00.388 5.036c-.184.484-.306 1.058-.34 2.005C.013 7.989 0 8.396 0 12.017s.013 4.028.048 4.976c.034.947.156 1.521.34 2.005a3.9 3.9 0 00.923 1.423 3.9 3.9 0 001.423.923c.484.184 1.058.306 2.005.34.948.035 1.355.048 4.976.048s4.028-.013 4.976-.048c.947-.034 1.521-.156 2.005-.34a3.9 3.9 0 001.423-.923 3.9 3.9 0 00.923-1.423c.184-.484.306-1.058.34-2.005.035-.948.048-1.355.048-4.976s-.013-4.028-.048-4.976c-.034-.947-.156-1.521-.34-2.005a3.9 3.9 0 00-.923-1.423A3.9 3.9 0 0018.982.388c-.484-.184-1.058-.306-2.005-.34C16.029.013 15.622 0 12.017 0zm0 2.158c3.556 0 3.978.013 5.38.048.297.007.546.014.773.028.2.012.38.03.548.052.137.018.263.04.378.067.094.022.18.047.258.076.067.025.127.053.18.085.046.028.087.058.123.091.032.029.06.061.084.096.022.031.041.064.057.099.014.031.026.063.036.096.009.029.016.059.021.089.005.027.008.055.01.083.002.025.003.051.003.077v.797c0 .325-.004.65-.011.974-.007.297-.017.593-.029.888-.011.27-.025.539-.041.807-.014.246-.031.491-.05.736-.017.225-.036.449-.057.672-.019.205-.04.409-.063.613-.021.187-.044.374-.068.56-.022.171-.046.341-.071.511-.023.156-.048.311-.074.466-.024.142-.05.283-.077.424-.025.129-.052.257-.08.385-.026.117-.054.233-.083.349-.027.106-.056.211-.086.316-.028.096-.058.191-.089.286-.029.087-.06.173-.092.259-.03.079-.062.157-.095.235-.031.071-.064.141-.098.211-.032.064-.066.127-.101.19-.033.057-.068.113-.104.169-.034.051-.07.101-.107.151-.035.045-.072.089-.11.133-.036.04-.074.079-.113.118-.037.035-.076.069-.116.103-.038.031-.078.061-.119.091-.039.027-.08.053-.122.079-.04.024-.082.047-.124.07-.041.021-.083.041-.126.061-.042.018-.085.035-.129.052-.043.015-.087.029-.132.043-.044.012-.089.023-.134.034-.045.009-.091.017-.137.025-.046.007-.092.013-.139.018-.046.005-.093.009-.14.012-.047.003-.094.005-.141.006-.047 0-.094-.001-.141-.003-.047-.002-.094-.005-.14-.009-.046-.004-.092-.009-.138-.015-.046-.006-.092-.013-.137-.021-.045-.008-.09-.017-.134-.027-.044-.01-.088-.021-.131-.033-.043-.012-.086-.025-.128-.039-.042-.014-.084-.029-.125-.045-.041-.016-.082-.033-.122-.051-.04-.018-.079-.037-.118-.057-.039-.02-.077-.041-.115-.063-.038-.022-.075-.045-.112-.069-.037-.024-.073-.049-.109-.075-.036-.026-.071-.053-.106-.081-.035-.028-.069-.057-.103-.087-.034-.03-.067-.061-.1-.093-.033-.032-.065-.065-.097-.099-.032-.034-.063-.069-.094-.105-.031-.036-.061-.073-.09-.111-.029-.038-.057-.077-.085-.117-.028-.04-.055-.081-.081-.123-.026-.042-.051-.085-.075-.129-.024-.044-.047-.089-.069-.135-.022-.046-.043-.093-.063-.141-.02-.048-.039-.097-.057-.147-.018-.05-.035-.101-.051-.153-.016-.052-.031-.105-.045-.159-.014-.054-.027-.109-.039-.165-.012-.056-.023-.113-.033-.171-.01-.058-.019-.117-.027-.177-.008-.06-.015-.121-.021-.183-.006-.062-.011-.125-.015-.189-.004-.064-.007-.129-.009-.195-.002-.066-.003-.133-.003-.201V8.204c0-.068.001-.135.003-.201.002-.066.005-.131.009-.195.004-.064.009-.127.015-.189.006-.062.013-.123.021-.183.008-.06.017-.119.027-.177.01-.058.021-.115.033-.171.012-.056.025-.111.039-.165.014-.054.029-.107.045-.159.016-.052.033-.103.051-.153.018-.05.037-.099.057-.147.02-.048.041-.095.063-.141.022-.046.045-.091.069-.135.024-.044.049-.087.075-.129.026-.042.053-.083.081-.123.028-.04.056-.079.085-.117.029-.038.059-.075.09-.111.031-.036.062-.071.094-.105.032-.034.064-.067.097-.099.033-.032.067-.063.1-.093.034-.03.068-.059.103-.087.035-.028.07-.055.106-.081.036-.026.072-.051.109-.075.037-.024.074-.047.112-.069.038-.022.076-.043.115-.063.039-.02.078-.039.118-.057.04-.018.081-.035.122-.051.041-.016.083-.031.125-.045.042-.014.085-.027.128-.039.043-.012.087-.023.131-.033.044-.01.089-.019.134-.027.045-.008.091-.015.137-.021.046-.006.092-.011.138-.015.046-.004.093-.007.14-.009.047-.002.094-.004.141-.005.047-.001.094-.001.141-.001h7.592c.047 0 .094 0 .141.001.047.001.094.003.141.005.046.002.093.005.14.009.046.004.092.009.138.015.046.006.092.013.137.021.045.008.09.017.134.027.044.01.088.021.131.033.043.012.086.025.128.039.042.014.084.029.125.045.041.016.081.033.122.051.04.018.079.037.118.057.039.02.077.041.115.063.038.022.075.045.112.069.037.024.073.049.109.075.036.026.071.053.106.081.035.028.069.057.103.087.034.03.067.061.1.093.033.032.065.065.097.099.032.034.063.069.094.105.031.036.061.073.09.111.029.038.057.077.085.117.028.04.055.081.081.123.026.042.051.085.075.129.024.044.047.089.069.135.022.046.043.093.063.141.02.048.039.097.057.147.018.05.035.101.051.153.016.052.031.105.045.159.014.054.027.109.039.165.012.056.023.113.033.171.01.058.019.117.027.177.008.06.015.121.021.183.006.062.011.125.015.189.004.064.007.129.009.195.002.066.003.133.003.201v7.592c0 .068-.001.135-.003.201-.002.066-.005.131-.009.195-.004.064-.009.127-.015.189-.006.062-.013.123-.021.183-.008.06-.017.119-.027.177-.01.058-.021.115-.033.171-.012.056-.025.111-.039.165-.014.054-.029.107-.045.159-.016.052-.033.103-.051.153-.018.05-.037.099-.057.147-.02.048-.041.095-.063.141-.022.046-.045.091-.069.135-.024.044-.049.087-.075.129-.026.042-.053.083-.081.123-.028.04-.056.079-.085.117-.029.038-.059.075-.09.111-.031.036-.062.071-.094.105-.032.034-.064.067-.097.099-.033.032-.067.063-.1.093-.034.03-.068.059-.103.087-.035.028-.07.055-.106.081-.036.026-.072.051-.109.075-.037.024-.074.047-.112.069-.038.022-.076.043-.115.063-.039.02-.078.039-.118.057-.04.018-.081.035-.122.051-.041.016-.083.031-.125.045-.042.014-.085.027-.128.039-.043.012-.087.023-.131.033-.044.01-.089.019-.134.027-.045.008-.091.015-.137.021-.046.006-.092.011-.138.015-.046.004-.093.007-.14.009-.047.002-.094.004-.141.005-.047.001-.094.001-.141.001H12.017zm0-3.943a6.016 6.016 0 100 12.032 6.016 6.016 0 000-12.032zm0 9.93a3.914 3.914 0 110-7.828 3.914 3.914 0 010 7.828zm7.68-10.192a1.404 1.404 0 11-2.808 0 1.404 1.404 0 012.808 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
