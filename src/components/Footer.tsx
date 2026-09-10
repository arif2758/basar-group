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
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const quickLinks = [
    { href: "/about", label: "আমাদের সম্পর্কে" },
    { href: "/granthagar", label: "গ্রন্থাগার" },
    { href: "/foundation", label: "Foundation" },
    { href: "/super-shop", label: "Super Shop" },
    { href: "/it-park", label: "IT Park" },
    { href: "/foundation", label: "দান করুন" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  const services = [
    { href: "/granthagar", label: "বই ডেলিভারি" },
    { href: "/it-park#skills", label: "IT প্রশিক্ষণ" },
    { href: "/foundation", label: "কমিউনিটি সহায়তা" },
    { href: "/foundation#programs", label: "Scholarship" },
    { href: "/it-park#jobs", label: "চাকরির সুযোগ" },
    { href: "/it-park", label: "ব্যবসায়িক সহায়তা" },
  ];

  const contact = {
    address: "বাছার বাড়ি, গ্রাম: নাগেরকান্দা, জেলা: ফরিদপুর, বাংলাদেশ",
    phone: "+880 1XX XXX XXXX",
    email: "info@basargroup.org",
  };

  return (
    <footer className="bg-white dark:bg-[#1f1f1f] text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-[#303030] relative overflow-hidden transition-colors">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-transparent"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl -translate-x-36 -translate-y-36"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500 rounded-full blur-3xl translate-x-36 translate-y-36"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-1 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-xs">
                  <span className="text-white font-bold text-lg select-none">B</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                    BASAR Group
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Learn. Earn. Empower.</p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                বাছার পরিবার ও কমিউনিটির উন্নয়নে প্রতিশ্রুতিবদ্ধ। শিক্ষা, দক্ষতা ও পারস্পরিক সহায়তার মাধ্যমে একটি উন্নত ভবিষ্যৎ গড়ছি।
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-400 hover:bg-[#1677ff] hover:text-white dark:hover:bg-[#1677ff] dark:hover:text-white dark:hover:border-[#1677ff] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                দ্রুত লিংক
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors duration-150 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#1677ff] transition-all duration-150 mr-0 group-hover:mr-2 rounded-full"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                আমাদের সেবা
              </h4>
              <ul className="space-y-2.5">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors duration-150 flex items-center group cursor-pointer"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#1677ff] transition-all duration-150 mr-0 group-hover:mr-2 rounded-full"></span>
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                যোগাযোগ
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <FiMapPin className="w-4 h-4 text-[#1677ff] mt-0.5 shrink-0" />
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {contact.address}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiPhone className="w-4 h-4 text-[#1677ff] shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] text-xs transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiMail className="w-4 h-4 text-[#1677ff] shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] text-xs transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-5 p-3.5 bg-slate-50 dark:bg-[#262626] border border-slate-200 dark:border-[#303030] rounded-xl">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2.5">
                  আপডেট পেতে Subscribe করুন
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="আপনার Email লিখুন"
                    className="flex-1 min-w-0 px-3 py-1.5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 rounded-l-lg text-xs focus:outline-none focus:border-[#1677ff] transition-colors"
                  />
                  <button
                    type="button"
                    aria-label="Subscribe"
                    className="bg-[#1677ff] hover:bg-[#4096ff] text-white px-3.5 py-1.5 rounded-r-lg transition-colors flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                  >
                    <FiMail className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Separator */}
        <div className="border-t border-slate-200 dark:border-[#303030]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-slate-500 dark:text-slate-400 text-xs text-center md:text-left">
                © {new Date().getFullYear()} BASAR Group. সর্বস্বত্ব সংরক্ষিত।
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <Link
                  href="/privacy"
                  className="hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors"
                >
                  গোপনীয়তা নীতি
                </Link>
                <span>•</span>
                <Link
                  href="/terms"
                  className="hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors"
                >
                  শর্তাবলী
                </Link>
                <span>•</span>
                <span className="text-slate-400 dark:text-slate-500">
                  ভালোবাসার সাথে তৈরি ❤️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AntD-style Scroll to Top FloatButton */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#303030] shadow-[0_6px_16px_0_rgba(0,0,0,0.12)] dark:shadow-[0_6px_16px_0_rgba(0,0,0,0.5)] flex items-center justify-center hover:text-[#1677ff] dark:hover:text-[#1677ff] hover:border-[#1677ff] dark:hover:border-[#1677ff] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      )}
    </footer>
  );
}
