// src/components/blueprint/DocsSteps.tsx
"use client";

import React from "react";

interface StepItem {
  num: string;
  title: string;
  desc: string;
  badge?: string;
}

interface DocsStepsProps {
  steps: StepItem[];
}

export default function DocsSteps({ steps }: DocsStepsProps) {
  return (
    <div className="my-5 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-6">
      {steps.map((st, i) => (
        <div key={i} className="relative group">
          {/* Number Circle Badge */}
          <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold text-xs flex items-center justify-center ring-4 ring-white dark:ring-[#070b14]">
            {st.num}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {st.title}
              </h4>
              {st.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {st.badge}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {st.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

