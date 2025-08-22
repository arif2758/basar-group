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
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <section ref={containerRef} id="contact" className="py-20 marble-gradient to-white">
      <div className="container mx-auto px-4">
        <div className="contact-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our programs, want to volunteer, or need
            assistance? We&apos;re here to help and would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="contact-info bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-600">
                  Multiple ways to reach our dedicated team
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const InfoIcon = info.icon;
                  return (
                    <div key={index} className="contact-info-item flex items-start space-x-4">
                      <div
                        className={`bg-gradient-to-r ${info.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <InfoIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-1">
                          {info.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                          {info.info}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <button className="w-full teal-slate-gradient text-white py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105">
                  Emergency Hotline
                </button>
                <button className="w-full border-2 border-emerald-500 text-emerald-600 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="contact-form bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-sky-400 to-sky-600 p-4 rounded-2xl mr-4">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    Send us a Message
                  </h3>
                  <p className="text-gray-600">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    >
                      {subjects.map((subject) => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <div className="form-field flex items-center">
                  <input
                    type="checkbox"
                    name="volunteer"
                    checked={formData.volunteer}
                    onChange={handleChange}
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                  />
                  <label className="ml-3 text-gray-700">
                    I&apos;m interested in volunteering opportunities
                  </label>
                </div>

              <button
  type="submit"
  className="w-full teal-slate-gradient text-white py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
>
  <Send className="w-5 h-5" />
  <span>Send Message</span>
</button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section mt-20">
                  <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our foundation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                className="faq-item bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="font-bold text-gray-800 mb-3 text-lg">
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;