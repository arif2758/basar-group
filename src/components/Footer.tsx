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
    { href: "/blood-donation", label: "রক্তদান নেটওয়ার্ক" },
    { href: "/foundation", label: "দান করুন" },
    { href: "/contact", label: "যোগাযোগ" },
  ];

  const services = [
    { href: "/blood-donation/find-donor", label: "জরুরি রক্তদাতা সন্ধান" },
    { href: "/blood-donation/emergency", label: "জরুরি রক্তের অনুরোধ (SOS)" },
    { href: "/granthagar", label: "বই ডেলিভারি" },
    { href: "/it-park#skills", label: "IT প্রশিক্ষণ" },
    { href: "/foundation", label: "কমিউনিটি সহায়তা" },
    { href: "/foundation#programs", label: "Scholarship" },
    { href: "/it-park#jobs", label: "চাকরির সুযোগ" },
  ];

  const contact = {
    address: "বাছার বাড়ি, গ্রাম: নাগেরকান্দা, জেলা: ফরিদপুর, বাংলাদেশ",
    phone: "+880 1XX XXX XXXX",
    email: "info@basargroup.org",
  };

  return (
    <footer className="bg-white dark:bg-[#141414] text-slate-800 dark:text-slate-200 border-t border-slate-200 dark:border-[#303030] relative transition-colors">
      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Row 1 on mobile / Col 1 on desktop: Brand */}
            <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center shadow-xs">
                  <span className="text-white font-bold text-lg select-none">B</span>
                </div>
                <div className="flex flex-col justify-center text-left">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                    BASAR Group
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Learn. Earn. Empower.</p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm lg:max-w-none">
                বাছার পরিবার ও কমিউনিটির উন্নয়নে প্রতিশ্রুতিবদ্ধ। শিক্ষা, দক্ষতা ও পারস্পরিক সহায়তার মাধ্যমে একটি উন্নত ভবিষ্যৎ গড়ছি।
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
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
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-400 hover:bg-[#1677ff] hover:text-white dark:hover:bg-[#1677ff] dark:hover:text-white dark:hover:border-[#1677ff] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Row 2 on mobile: 2 Columns for Quick Links & Services!
                On desktop (lg:): col-span-2 with 2 columns, exactly matching the 4-column layout! */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6 sm:gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white text-left">
                  দ্রুত লিংক
                </h4>
                <ul className="space-y-2.5 text-left">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors duration-150 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white text-left">
                  আমাদের সেবা
                </h4>
                <ul className="space-y-2.5 text-left">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        href={service.href}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] transition-colors duration-150 inline-block cursor-pointer"
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 3 on mobile / Col 4 on desktop: Contact */}
            <div className="space-y-4 text-left">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-900 dark:text-white text-left">
                যোগাযোগ
              </h4>
              <div className="space-y-2.5 flex flex-col items-start text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 text-left">
                  <FiMapPin className="w-4 h-4 text-[#1677ff] mt-0.5 shrink-0" />
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs text-left">
                    {contact.address}
                  </p>
                </div>
                <div className="flex items-center gap-2.5 text-left">
                  <FiPhone className="w-4 h-4 text-[#1677ff] shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-slate-600 dark:text-slate-400 hover:text-[#1677ff] dark:hover:text-[#1677ff] text-xs transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-left">
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
              <div className="mt-4 p-3.5 bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-xl w-full max-w-sm">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2.5 text-left">
                  আপডেট পেতে Subscribe করুন
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="আপনার Email লিখুন"
                    className="flex-1 min-w-0 px-3 py-1.5 bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 placeholder:text-slate-400 rounded-l-lg text-xs focus:outline-none focus:border-[#1677ff] transition-colors"
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
              <div className="text-slate-500 dark:text-slate-400 text-xs">
                © {new Date().getFullYear()} BASAR Group. সর্বস্বত্ব সংরক্ষিত।
              </div>

              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
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
