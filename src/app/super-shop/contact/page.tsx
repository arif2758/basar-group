"use client";

import { useState } from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HeartHandshake,
} from "lucide-react";
import { CartProvider } from "../contexts/CartContext";

import FooterShop from "../shopComponents/FooterShop";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+88 01700-000000",
      description: "Mon-Sun: 8:00 AM - 10:00 PM",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+88 01700-000000",
      description: "24/7 Quick Support",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@basarshop.com",
      description: "Response within 2 hours",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MapPin,
      title: "Visit Store",
      details: "123 Main Street, Dhaka",
      description: "Open 7 days a week",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const faqItems = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver from 8:00 AM to 10:00 PM, 7 days a week. Same-day delivery is available for orders placed before 6:00 PM.",
    },
    {
      question: "How do I return or exchange items?",
      answer:
        "We offer hassle-free returns within 24 hours of delivery. Simply contact us and our team will arrange pickup and refund.",
    },
    {
      question: "Do you offer credit options?",
      answer:
        "Yes, we provide monthly credit options for regular customers with a good payment history. Contact us to learn more.",
    },
    {
      question: "How can youth join your employment program?",
      answer:
        "We regularly hire local youth for delivery, packing, and customer service roles. Visit our store or call us for current opportunities.",
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-16 text-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                We&asop;re here to help! Whether you have questions about
                orders, want to join our team, or need support, our
                community-focused team is ready to assist you.
              </p>
              <div className="flex items-center justify-center space-x-2 text-emerald-100">
                <HeartHandshake className="w-6 h-6" />
                <span className="text-lg">
                  Community-First Customer Support
                </span>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 text-center"
                >
                  <div
                    className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-800 font-medium mb-1">
                    {method.details}
                  </p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+88 01xxx-xxxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>

              {/* FAQ & Additional Info */}
              <div className="space-y-8">
                {/* Operating Hours */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      Operating Hours
                    </h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between">
                      <span>Monday - Sunday</span>
                      <span className="font-medium">8:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Support</span>
                      <span className="font-medium">24/7 via WhatsApp</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Hours</span>
                      <span className="font-medium">8:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
                      >
                        <h4 className="font-medium text-gray-800 mb-2">
                          {item.question}
                        </h4>
                        <p className="text-gray-600 text-sm">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Emergency Support
                  </h3>
                  <p className="text-red-700 text-sm mb-3">
                    For urgent delivery issues or emergency support outside
                    business hours:
                  </p>
                  <div className="flex items-center space-x-2 text-red-800 font-medium">
                    <Phone className="w-4 h-4" />
                    <span>+88 01700-000000 (WhatsApp)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="mt-16 bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Visit Our Store
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    BASAR Super Shop
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm">
                          123 Main Street, Dhaka 1000, Bangladesh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm">+88 01700-000000</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">Store Hours</p>
                        <p className="text-sm">Daily: 8:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Visit us for fresh products, friendly service, and to meet
                      our amazing youth team!
                    </p>
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterShop />
      </div>
    </CartProvider>
  );
}
