"use client";

import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { FloatButton } from "antd";

interface FooterProps {
  language: "bn" | "en";
}

export default function Footer({ language }: FooterProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { href: "/library", label: language === "bn" ? "গ্রন্থাগার" : "Library" },
    {
      href: "/foundation",
      label: language === "bn" ? "ফাউন্ডেশন" : "Foundation",
    },
    { href: "/shop", label: language === "bn" ? "সুপার শপ" : "Super Shop" },
    { href: "/it-park", label: language === "bn" ? "আইটি পার্ক" : "IT Park" },
    { href: "#donate", label: language === "bn" ? "দান করুন" : "Donate" },
    { href: "#contact", label: language === "bn" ? "যোগাযোগ" : "Contact" },
  ];

  const services = [
    { label: language === "bn" ? "বই ডেলিভারি" : "Book Delivery" },
    { label: language === "bn" ? "আইটি প্রশিক্ষণ" : "IT Training" },
    { label: language === "bn" ? "কমিউনিটি সহায়তা" : "Community Support" },
    { label: language === "bn" ? "স্কলারশিপ" : "Scholarships" },
    { label: language === "bn" ? "চাকরির সুযোগ" : "Job Opportunities" },
    { label: language === "bn" ? "ব্যবসায়িক সহায়তা" : "Business Support" },
  ];

  const contact = {
    address:
      language === "bn"
        ? "বাছার বাড়ি, গ্রাম: নাগেরকান্দা, জেলা: ফরিদপুর, বাংলাদেশ"
        : "Basar Bari, Village: Nagerkanda, District: Faridpur, Bangladesh",
    phone: "+880 1XX XXX XXXX",
    email: "info@basargroup.org",
  };

  return (
    <footer className="bg-neutral-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-accent rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-soft rounded-full translate-x-12 translate-y-12"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-xl">
                    BASAR Group
                  </h3>
                  <p className="text-gray-400 text-sm">Learn. Earn. Empower.</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {language === "bn"
                  ? "বাছার পরিবার ও কমিউনিটির উন্নয়নে প্রতিশ্রুতিবদ্ধ। শিক্ষা, দক্ষতা ও পারস্পরিক সহায়তার মাধ্যমে একটি উন্নত ভবিষ্যৎ গড়ছি।"
                  : "Committed to the development of Basar family and community. Building a better future through education, skills and mutual support."}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: FiFacebook, href: "#", label: "Facebook" },
                  { icon: FiTwitter, href: "#", label: "Twitter" },
                  { icon: FiInstagram, href: "#", label: "Instagram" },
                  { icon: FiYoutube, href: "#", label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 hover:scale-110 transform"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-6 text-white">
                {language === "bn" ? "দ্রুত লিংক" : "Quick Links"}
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-primary-accent transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary-accent transition-all duration-200 mr-0 group-hover:mr-3"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-6 text-white">
                {language === "bn" ? "আমাদের সেবা" : "Our Services"}
              </h4>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-gray-300 flex items-center group cursor-pointer hover:text-primary-accent ">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-soft transition-all duration-200 mr-0 group-hover:mr-3 bg-primary-accent "></span>
                      {service.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-poppins font-semibold text-lg mb-6 text-white">
                {language === "bn" ? "যোগাযোগ" : "Contact Us"}
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FiMapPin className="w-5 h-5 text-primary-accent mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {contact.address}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-primary-accent flex-shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-primary-accent flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-300 hover:text-accent transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg  ">
                <p className="text-sm text-gray-300 mb-3">
                  {language === "bn"
                    ? "আপডেট পেতে সাবস্ক্রাইব করুন"
                    : "Subscribe for updates"}
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder={
                      language === "bn" ? "আপনার ইমেইল" : "Your email"
                    }
                    className="flex-1 px-3 py-2 bg-gray-700 rounded-l-md text-sm focus:outline-none focus:border-accent"
                  />
                  <button className="bg-primary-accent hover:bg-accent-600 px-4 py-2 rounded-r-md transition-colors">
                    <FiMail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 BASAR Group.{" "}
              {language === "bn"
                ? "সকল অধিকার সংরক্ষিত।"
                : "All rights reserved."}
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-accent transition-colors"
              >
                {language === "bn" ? "শর্তাবলী" : "Terms of Service"}
              </Link>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400">
                {language === "bn" ? "প্রেমের সাথে তৈরি ❤️" : "Made with ❤️"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && <FloatButton.BackTop />}
    </footer>
  );
}
