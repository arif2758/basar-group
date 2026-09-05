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
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "general",
      message: "",
      volunteer: false,
    });
    alert("Thank you for your message! We will get back to you soon.");
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
      title: "Our Address",
      info: "123 Hope Street\nCompassion City, CC 12345\nUnited States",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      info: "Main: +1 (555) 123-4567\nEmergency: +1 (555) 987-6543\nWhatsApp: +1 (555) 456-7890",
      color: "from-sky-500 to-sky-700",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      info: "General: info@basarfoundation.org\nDonations: donate@basarfoundation.org\nVolunteer: volunteer@basarfoundation.org",
      color: "from-amber-500 to-amber-700",
    },
    {
      icon: Clock,
      title: "Office Hours",
      info: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed (Emergency only)",
      color: "from-purple-500 to-purple-700",
    },
  ];

  const subjects = [
    { value: "general", label: "General Inquiry" },
    { value: "donation", label: "Donation Information" },
    { value: "volunteer", label: "Volunteer Opportunities" },
    { value: "partnership", label: "Corporate Partnership" },
    { value: "media", label: "Media & Press" },
    { value: "emergency", label: "Emergency Assistance" },
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
    <section ref={containerRef} id="contact" className="py-20 bg-white dark:bg-[#070b14] border-t border-slate-200 dark:border-[#303030] transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="contact-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Have questions about our programs, want to volunteer, or need
            assistance? We&apos;re here to help and would love to hear from you.
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
                  Let&apos;s Connect
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Multiple ways to reach our dedicated team
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
                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm active:scale-[0.99]">
                  Emergency Hotline
                </button>
                <button className="w-full bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] hover:bg-slate-50 dark:hover:bg-[#252525] text-slate-700 dark:text-slate-300 py-2.5 rounded-xl font-medium text-sm transition-all">
                  Download Brochure
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
                    Send us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      Full Name *
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
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      Email Address *
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
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm mb-1.5">
                      Subject *
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
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#303030] rounded-xl focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
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
                  <label htmlFor="volunteer-checkbox" className="ml-2.5 text-slate-700 dark:text-slate-300 text-sm">
                    I&apos;m interested in volunteering opportunities
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-base font-medium shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Quick answers to common questions about our foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                question: "How can I track my donation's impact?",
                answer:
                  "Every donor receives quarterly impact reports showing exactly how their contributions are being used, with photos and stories from beneficiaries.",
              },
              {
                question: "Are donations tax-deductible?",
                answer:
                  "Yes, BASAR Foundation is a registered 501(c)(3) nonprofit organization. All donations are tax-deductible and you'll receive a receipt for your records.",
              },
              {
                question: "Can I volunteer remotely?",
                answer:
                  "Absolutely! We have various remote volunteer opportunities including social media management, content creation, virtual tutoring, and administrative support.",
              },
              {
                question: "How do you ensure transparency?",
                answer:
                  "We publish detailed financial reports annually, provide regular program updates, and maintain an open-door policy for donors to visit our operations.",
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