// src/app/blueprint/layout.tsx
import React from "react";
import Navbar from "@/components/Navbar";

export default function BlueprintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#070b14] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-clip selection:bg-emerald-500 selection:text-white">
      <Navbar />
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>
    </div>
  );
}

