// src/components/blueprint/DocsCallout.tsx
"use client";

import React from "react";
import { Info, Lightbulb, AlertTriangle, ShieldAlert } from "lucide-react";

interface DocsCalloutProps {
  type?: "note" | "tip" | "important" | "warning";
  title?: string;
  children: React.ReactNode;
}

export default function DocsCallout({
  type = "note",
  title,
  children,
}: DocsCalloutProps) {
  const styles = {
    note: {
      bg: "bg-blue-50/70 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-900/50",
      text: "text-blue-900 dark:text-blue-200",
      titleColor: "text-blue-900 dark:text-blue-100",
      icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
      defaultTitle: "নোট",
    },
    tip: {
      bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-900/50",
      text: "text-emerald-900 dark:text-emerald-200",
      titleColor: "text-emerald-900 dark:text-emerald-100",
      icon: <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      defaultTitle: "টিপস",
    },
    important: {
      bg: "bg-purple-50/70 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-900/50",
      text: "text-purple-900 dark:text-purple-200",
      titleColor: "text-purple-900 dark:text-purple-100",
      icon: <AlertTriangle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />,
      defaultTitle: "গুরুত্বপূর্ণ",
    },
    warning: {
      bg: "bg-amber-50/70 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-900/50",
      text: "text-amber-900 dark:text-amber-200",
      titleColor: "text-amber-900 dark:text-amber-100",
      icon: <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      defaultTitle: "সতর্কতা",
    },
  }[type];

  return (
    <div
      className={`my-4 p-4 rounded-xl border ${styles.bg} ${styles.border} transition-colors`}
    >
      <div className="flex items-start gap-2.5">
        {styles.icon}
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${styles.titleColor}`}>
            {title || styles.defaultTitle}
          </div>
          <div className={`text-xs sm:text-sm leading-relaxed ${styles.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

