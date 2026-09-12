import React from "react";
import Navbar from "@/components/Navbar";
import BloodSubNav from "./bloodComponents/BloodSubNav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাছার রক্তদান নেটওয়ার্ক | BASAR Blood Network - সেভ এ লাইফ",
  description: "সারা বাংলাদেশের ৬৪ জেলার রক্তদাতা খুঁজুন, জরুরি রক্তের আবেদন করুন ও রক্তদাতা হিসেবে নিবন্ধন করুন।",
};

export default function BloodDonationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex flex-col min-h-screen w-full bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-clip">
      <Navbar />

      {/* Centered Title & Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 w-full">
        <div className="text-center mb-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border border-rose-200/80 dark:border-[#5b2123] text-xs font-bold mb-2 tracking-wide shadow-xs">
            <span>🩸 ৫ম উইং • মানবতার পরম বন্ধন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            বাছার রক্তদান নেটওয়ার্ক
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            সারা বাংলাদেশে স্বেচ্ছায় রক্তদান ও জরুরি জীবনরক্ষাকারী সেবা প্ল্যাটফর্ম
          </p>
        </div>
      </div>

      {/* Sticky Pill-Shaped Sub Navbar */}
      <BloodSubNav />

      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>

      {/* Central Unified Site Footer */}
      <Footer />
    </div>
  );
}
