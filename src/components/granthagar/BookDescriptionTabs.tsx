// src/components/granthagar/BookDescriptionTabs.tsx
"use client";

import React, { useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtractedPanel {
  id: string;
  title: string;
  subDescription: string[];
}

interface BookDescriptionTabsProps {
  description: any[];
  tags?: string[];
  bookTitle?: string;
}

// Faithful extractor for any description structure in tanju-mart (description1, description2, description3, ... description7)
function extractPanels(description: any[]): ExtractedPanel[] {
  if (!Array.isArray(description)) return [];
  const panels: ExtractedPanel[] = [];

  description.forEach((desc, idx) => {
    if (typeof desc === "string") {
      panels.push({
        id: `panel-str-${idx}`,
        title: `বিবরণ ${idx + 1}`,
        subDescription: [desc],
      });
      return;
    }

    if (desc && typeof desc === "object") {
      // Check if direct title and subDescription exist
      if (desc.title && Array.isArray(desc.subDescription)) {
        panels.push({
          id: desc.id || `panel-direct-${idx}`,
          title: desc.title,
          subDescription: desc.subDescription,
        });
        return;
      }

      // Check all keys in the object (description1, description2, description3, etc.)
      Object.keys(desc).forEach((key) => {
        const val = desc[key];
        if (Array.isArray(val)) {
          val.forEach((item: any, itemIdx: number) => {
            if (typeof item === "string") {
              panels.push({
                id: `${key}-${idx}-${itemIdx}`,
                title: key,
                subDescription: [item],
              });
            } else if (item && typeof item === "object") {
              panels.push({
                id: item.id || `${key}-${idx}-${itemIdx}`,
                title: item.title || `বিবরণ`,
                subDescription: Array.isArray(item.subDescription)
                  ? item.subDescription
                  : [],
              });
            }
          });
        }
      });
    }
  });

  return panels;
}

export default function BookDescriptionTabs({
  description,
  tags = [],
  bookTitle = "বই",
}: BookDescriptionTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  // Extract all accordion panels faithfully
  const panels = extractPanels(description);

  // Keep track of which accordion panels are open
  // Default open the first panel (index 0) matching AntD Collapse defaultActiveKey={["0"]}
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({
    "0": true,
  });

  const togglePanel = (key: string) => {
    setOpenPanels((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full">
      {/* 1. AntD Styled Clean Tabs Header */}
      <div className="flex border-b border-[#f0f0f0] dark:border-neutral-800">
        <button
          onClick={() => setActiveTab("desc")}
          className={cn(
            "relative pb-3.5 px-2 mr-6 text-sm sm:text-base transition-colors cursor-pointer select-none",
            activeTab === "desc"
              ? "text-[#1677ff] font-medium"
              : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          )}
        >
          ডেস্ক্রিপশন
          {activeTab === "desc" && (
            <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#1677ff] rounded-t-sm" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={cn(
            "relative pb-3.5 px-2 text-sm sm:text-base transition-colors cursor-pointer select-none",
            activeTab === "reviews"
              ? "text-[#1677ff] font-medium"
              : "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          )}
        >
          রেভিউ
          {activeTab === "reviews" && (
            <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#1677ff] rounded-t-sm" />
          )}
        </button>
      </div>

      {/* 2. Tab Content Area */}
      <div className="pt-4">
        {activeTab === "desc" ? (
          <div className="space-y-2.5">
            {panels.length > 0 ? (
              panels.map((panel, index) => {
                const key = index.toString();
                const isOpen = openPanels[key] ?? false;

                return (
                  <div
                    key={panel.id + index}
                    className="overflow-hidden rounded-lg bg-[#fafafa] dark:bg-[#1f1f1f] border border-neutral-100/90 dark:border-neutral-800/60 transition-all duration-200"
                  >
                    {/* AntD Panel Header */}
                    <button
                      onClick={() => togglePanel(key)}
                      className="flex w-full items-center px-4 py-3 text-left cursor-pointer transition-colors select-none hover:bg-neutral-100/60 dark:hover:bg-[#252525]"
                    >
                      {/* AntD CaretRightOutlined SVG */}
                      <svg
                        viewBox="0 0 1024 1024"
                        className={cn(
                          "w-2.5 h-2.5 text-neutral-800 dark:text-neutral-200 transition-transform duration-200 shrink-0 mr-2.5",
                          isOpen && "rotate-90"
                        )}
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M715.8 493.5L335.7 148.3c-12.7-11.5-31.7-2.5-31.7 14.8v697.8c0 17.3 19 26.3 31.7 14.8l380.1-345.2c8.2-7.4 8.2-19.6 0-27z" />
                      </svg>

                      {/* Header Title */}
                      <span className="text-sm sm:text-base font-normal text-neutral-800 dark:text-neutral-100">
                        {panel.title}
                      </span>
                    </button>

                    {/* AntD Panel Body */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1">
                        <ul className="space-y-4">
                          {panel.subDescription.map((sub, sIdx) => {
                            const paragraphs = sub
                              .split(/\n\n+/)
                              .map((p) => p.trim())
                              .filter(Boolean);

                            return (
                              <li
                                key={sIdx}
                                className="flex items-start text-left"
                              >
                                <FaHandPointRight
                                  className="mr-2.5 text-[#2563EB] shrink-0 w-4 h-4 mt-1"
                                  aria-hidden="true"
                                />
                                <div className="flex-1 space-y-3 text-[14px] text-[#333] dark:text-neutral-200 leading-relaxed break-words font-normal">
                                  {paragraphs.length > 1 ? (
                                    paragraphs.map((para, pIdx) => (
                                      <p key={pIdx} className="leading-relaxed text-justify sm:text-left">
                                        {para}
                                      </p>
                                    ))
                                  ) : (
                                    <span className="leading-relaxed">
                                      {sub}
                                    </span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center text-sm text-neutral-500 bg-[#fafafa] dark:bg-[#1f1f1f] rounded-lg">
                এই বইয়ের কোনো বিস্তারিত বিবরণ পাওয়া যায়নি।
              </div>
            )}

            {/* Tags (subtle, minimal) */}
            {tags.length > 0 && (
              <div className="pt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-neutral-400 dark:text-neutral-500 mr-1">
                  ট্যাগস:
                </span>
                {tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 text-xs rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Reviews Tab */
          <div className="p-8 text-center bg-[#fafafa] dark:bg-[#1f1f1f] rounded-lg border border-neutral-100 dark:border-neutral-800/60">
            <div className="flex justify-center gap-1 text-[#faad14] mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-4 fill-current" />
              ))}
            </div>
            <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              পাঠক রিভিউ
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
              এখনও কোনো রিভিউ যুক্ত করা হয়নি। আপনি বইটি পড়ে থাকলে আপনার মূল্যবান অভিজ্ঞতা শেয়ার করুন।
            </p>
            <button
              onClick={() => {
                alert("রিভিউ দেওয়ার অপশন শীঘ্রই চালু হচ্ছে। ধন্যবাদ!");
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#1677ff] bg-blue-50 dark:bg-blue-950/40 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              <MessageSquare className="size-3.5" />
              রিভিউ লিখুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
