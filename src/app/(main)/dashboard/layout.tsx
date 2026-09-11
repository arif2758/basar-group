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
    <div className="w-full bg-slate-50 dark:bg-[#141414] text-slate-900 dark:text-slate-100 min-h-[calc(100vh-140px)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-6 sm:pb-8 w-full">
        {/* Horizontal Department Sub Navbar */}
        <DashboardSubNavbar />

        {/* Page Content */}
        <div className="mt-3 w-full space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}

