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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6">
        {/* Horizontal Department Sub Navbar */}
        <DashboardSubNavbar />

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}

