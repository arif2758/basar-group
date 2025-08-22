"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { cn } from "@/utils/utils";

interface HeaderProps {
  language: "bn" | "en";
  onLanguageChange: (lang: "bn" | "en") => void;
}

export default function Header({ language, onLanguageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: language === "bn" ? "হোম" : "Home" },
    { href: "/granthagar", label: language === "bn" ? "গ্রন্থাগার" : "Library" },
    {
      href: "/foundation",
      label: language === "bn" ? "ফাউন্ডেশন" : "Foundation",
    },
    { href: "/super-shop", label: language === "bn" ? "সুপার শপ" : "Super Shop" },
    { href: "/it-park", label: language === "bn" ? "আইটি পার্ক" : "IT Park" },
    { href: "#contact", label: language === "bn" ? "যোগাযোগ" : "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 marble-gradient  shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-xl">BASAR Group</h3>
              <p className="text-gray-600 text-sm">Learn. Earn. Empower.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Language toggle and Donate button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => onLanguageChange(language === "bn" ? "en" : "bn")}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              aria-label="Toggle language"
            >
              <FiGlobe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === "bn" ? "EN" : "বাং"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <nav className="py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-3 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() =>
                  onLanguageChange(language === "bn" ? "en" : "bn")
                }
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-primary transition-colors"
              >
                <FiGlobe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === "bn" ? "English" : "বাংলা"}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
