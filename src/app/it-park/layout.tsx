import React from "react";
import Navbar from "@/components/Navbar";
import ITSubNav from "./ITcomponents/ITSubNav";
import Footer from "@/components/Footer";

export default function ITParkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-grow flex flex-col min-h-screen w-full bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-clip">
      {/* Top Main Navbar (Identical to Foundation) */}
      <Navbar />

      {/* IT Park Centered Title & Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 w-full">
        <div className="text-center mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            বাছার আইটি পার্ক
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            প্রযুক্তি শিক্ষা, ফ্রিল্যান্সিং ক্যারিয়ার ও ডিজিটাল কর্মসংস্থান • Learn. Earn. Empower.
          </p>
        </div>
      </div>

      {/* Sticky Pill-Shaped Sub Navbar */}
      <ITSubNav />

      {/* Main Content Constrained to max-w-7xl */}
      <main className="flex-grow flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {children}
      </main>

      {/* Central Unified Site Footer */}
      <Footer />
    </div>
  );
}
