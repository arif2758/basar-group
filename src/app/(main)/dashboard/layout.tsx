import React from "react";
import DashboardSubNavbar from "./DashboardSubNavbar";

export const metadata = {
  title: "ইউজার ড্যাশবোর্ড | BASAR Group",
  description: "আপনার বাছার গ্রুপ অ্যাকাউন্ট ও চার ডিপার্টমেন্ট পরিচালনা",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-slate-100 min-h-[calc(100vh-140px)] transition-colors duration-200 overflow-x-clip">
      {/* Dashboard Section Centered Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2 w-full">
        <div className="text-center mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            আমার ড্যাশবোর্ড
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
            আপনার কেন্দ্রীয় অ্যাকাউন্ট ও সকল ডিপার্টমেন্টের সমন্বিত নিয়ন্ত্রণ
          </p>
        </div>
      </div>

      {/* Sticky Department Sub Navbar */}
      <DashboardSubNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 w-full">
        {/* Page Content */}
        <div className="mt-4 sm:mt-5 w-full space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

