import React from "react";
import {
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Download,
  FileText,
} from "lucide-react";

const FooterFoundation = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    foundation: {
      title: "Foundation",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Our Mission", href: "#mission" },
        { name: "Leadership Team", href: "#team" },
        { name: "Annual Reports", href: "#reports" },
        { name: "Financial Transparency", href: "#finances" },
      ],
    },
    programs: {
      title: "Programs",
      links: [
        { name: "Education Aid", href: "#education" },
        { name: "Farmer Support", href: "#farming" },
        { name: "Emergency Relief", href: "#emergency" },
        { name: "Healthcare", href: "#healthcare" },
        { name: "Seasonal Programs", href: "#seasonal" },
      ],
    },
    support: {
      title: "Get Involved",
      links: [
        { name: "Make a Donation", href: "#donate" },
        { name: "Volunteer With Us", href: "#volunteer" },
        { name: "Corporate Partnerships", href: "#corporate" },
        { name: "Fundraising Events", href: "#events" },
        { name: "Sponsor a Child", href: "#sponsor" },
      ],
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Impact Stories", href: "#stories" },
        { name: "Photo Gallery", href: "#gallery" },
        { name: "Press & Media", href: "#press" },
        { name: "Blog & Updates", href: "#blog" },
        { name: "Contact Us", href: "#contact" },
      ],
    },
  };

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Foundation Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">BASAR Foundation</h3>
                <p className="text-gray-300 text-sm">Building Better Futures</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering underserved communities through sustainable programs in
              education, healthcare, poverty alleviation, and emergency relief
              since 2018.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Hope Street, Compassion City, CC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <span className="text-gray-300">info@basarfoundation.org</span>
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
              <h4 className="text-lg font-bold mb-4 text-amber-300">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    </a>
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
              <h4 className="text-2xl font-bold mb-2">Stay Updated</h4>
              <p className="text-gray-300">
                Subscribe to receive impact stories, program updates, and ways
                to help directly in your inbox.
              </p>
            </div>
            <div>
              <div className="flex max-w-md ml-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:border-emerald-500 focus:outline-none text-white"
                />
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-6 py-3 rounded-r-xl hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Downloads */}
        <div className="mt-12">
          <h4 className="text-lg font-bold mb-6 text-center">
            Quick Downloads
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group"
            >
              <Download className="w-5 h-5 text-amber-400" />
              <span>Annual Report 2024</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group"
            >
              <FileText className="w-5 h-5 text-emerald-400" />
              <span>Impact Report Q4</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </a>
            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 group"
            >
              <Heart className="w-5 h-5 text-pink-400" />
              <span>Volunteer Guide</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} BASAR Foundation. All rights reserved. | Tax ID:
              12-3456789
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterFoundation;
