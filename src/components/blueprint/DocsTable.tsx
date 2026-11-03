// src/components/blueprint/DocsTable.tsx
"use client";

import React from "react";

interface DocsTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export default function DocsTable({ headers, rows }: DocsTableProps) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b101b] shadow-xs">
      <table className="w-full text-left text-xs sm:text-sm border-collapse">
        <thead className="bg-slate-100/80 dark:bg-[#121929] border-b border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="py-2.5 px-3.5 sm:px-4 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`py-2.5 px-3.5 sm:px-4 text-slate-700 dark:text-slate-300 ${
                    cIdx === 0 ? "font-semibold text-slate-900 dark:text-white" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

