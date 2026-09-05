"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeSwitcher({ className = "", showLabel = false }: ThemeSwitcherProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Toggle theme"
        className={`relative inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-200 dark:border-[#303030] bg-transparent text-slate-400 opacity-60 cursor-default ${className}`}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "লাইট মোডে পরিবর্তন করুন (Switch to Light Mode)" : "ডার্ক মোডে পরিবর্তন করুন (Switch to Dark Mode)"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative inline-flex items-center gap-2 h-9 px-2.5 rounded-md border border-slate-200 dark:border-[#303030] bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200 cursor-pointer select-none shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 text-slate-600 group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          {isDark ? "লাইট মোড" : "ডার্ক মোড"}
        </span>
      )}
    </button>
  );
}
