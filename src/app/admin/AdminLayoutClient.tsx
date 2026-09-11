"use client";

import React from "react";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Admin Navbar (No fixed sidebar, with mobile drawer) */}
      <AdminNavbar />

      {/* Main Admin Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7">
        {children}
      </main>

      {/* Admin Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-[#2a2a2a] py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} বাছার গ্রুপ (BASAR Group) | সেন্ট্রাল অ্যাডমিন কন্ট্রোল
      </footer>
    </div>
  );
}
