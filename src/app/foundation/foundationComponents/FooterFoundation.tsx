"use client";

import React from "react";
import {
  Heart,
  MessageCircle,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  FileText,
} from "lucide-react";
import Link from "next/link";

const FooterFoundation = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    foundation: {
      title: "ফাউন্ডেশন",
      links: [
        { name: "আমাদের সম্পর্কে", href: "#about" },
        { name: "আমাদের মিশন", href: "#about" },
        { name: "পরিচালনা পর্ষদ", href: "#about" },
        { name: "বার্ষিক প্রতিবেদন", href: "#impact" },
        { name: "আর্থিক স্বচ্ছতা", href: "#impact" },
      ],
    },
    programs: {
      title: "কর্মসূচিসমূহ",
      links: [
        { name: "শিক্ষা সহায়তা", href: "#programs" },
        { name: "কৃষি ও কৃষক উন্নয়ন", href: "#programs" },
        { name: "জরুরি দুর্যোগ ত্রাণ", href: "#programs" },
        { name: "স্বাস্থ্যসেবা কর্মসূচি", href: "#programs" },
        { name: "মৌসুমি উপহার ও সহায়তা", href: "#programs" },
      ],
    },
    support: {
      title: "যুক্ত হোন",
      links: [
        { name: "অনুদান প্রদান", href: "#contact" },
        { name: "স্বেচ্ছাসেবক হোন", href: "#contact" },
        { name: "প্রাতিষ্ঠানিক পার্টনারশিপ", href: "#contact" },
        { name: "তহবিল সংগ্রহ ইভেন্ট", href: "#contact" },
        { name: "শিশুর পড়াশোনার দায়িত্ব নিন", href: "#contact" },
      ],
    },
    resources: {
      title: "রিসোর্স ও তথ্য",
      links: [
        { name: "সাফল্যের গল্প", href: "#about" },
        { name: "ছবি গ্যালারি", href: "#about" },
        { name: "প্রেস ও মিডিয়া", href: "#contact" },
        { name: "ব্লগ ও আপডেট", href: "#contact" },
        { name: "যোগাযোগ", href: "#contact" },
      ],
    },
  };

  const socialLinks = [
    { icon: Heart, href: "#", color: "hover:text-blue-600" },
    { icon: MessageCircle, href: "#", color: "hover:text-sky-400" },
    { icon: Heart, href: "#", color: "hover:text-pink-600" },
    { icon: Heart, href: "#", color: "hover:text-blue-700" },
    { icon: PlayCircle, href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Foundation Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-full shadow-sm">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">বাছার ফাউন্ডেশন</h3>
                <p className="text-amber-300 text-xs font-mono">Learn. Earn. Empower.</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              শিক্ষা, স্বাস্থ্যসেবা, দারিদ্র্য বিমোচন ও দুর্যোগকালীন জরুরি ত্রাণের মাধ্যমে সুবিধাবঞ্চিত মানুষের পাশে দাঁড়াতে 2018 সাল থেকে নিবেদিত।
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  বাছার ফাউন্ডেশন ভবন, মাদারীপুর, বাংলাদেশ
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+880 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@basarfoundation.org</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const SocialIcon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label="Social Link"
                    className={`bg-gray-800 p-3 rounded-full ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <SocialIcon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="text-base font-bold mb-4 text-amber-300">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200 text-emerald-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-2">যুক্ত থাকুন ও আপডেট পান</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                আমাদের উন্নয়ন কার্যক্রম, সাফল্যের গল্প এবং সমাজসেবার নানা উদ্যোগের আপডেট সরাসরি আপনার ইমেইলে পেতে সাবস্ক্রাইব করুন।
              </p>
            </div>
            <div>
              <form onSubmit={(e) => { e.preventDefault(); alert("সাবস্ক্রাইব করার জন্য ধন্যবাদ!"); }} className="flex max-w-md ml-auto">
                <input
                  type="email"
                  required
                  placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:border-emerald-500 focus:outline-none text-white text-sm"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 py-3 rounded-r-xl hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">সাবস্ক্রাইব</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Quick Downloads */}
        <div className="mt-12">
          <h4 className="text-lg font-bold mb-6 text-center">
            জরুরি প্রকাশনাসমূহ
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => alert("বার্ষিক প্রতিবেদন ডাউনলোড শীঘ্রই উন্মুক্ত হবে।")}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group text-sm"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>বার্ষিক প্রতিবেদন 2024</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </button>
            <button
              onClick={() => alert("ইমপ্যাক্ট রিপোর্ট ডাউনলোড শীঘ্রই উন্মুক্ত হবে।")}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group text-sm"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>ইমপ্যাক্ট রিপোর্ট Q4</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </button>
            <button
              onClick={() => alert("ভলান্টিয়ার গাইডবুক ডাউনলোড শীঘ্রই উন্মুক্ত হবে।")}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group text-sm"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span>ভলান্টিয়ার গাইডবুক</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-xs mb-4 md:mb-0">
              © {currentYear} বাছার ফাউন্ডেশন (BASAR Foundation)। সর্বস্বত্ব সংরক্ষিত।
            </div>
            <div className="flex space-x-6 text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">
                গোপনীয়তা নীতি
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                ব্যবহারের শর্তাবলী
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                কুকি পলিসি
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                অ্যাক্সেসিবিলিটি
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFoundation;
