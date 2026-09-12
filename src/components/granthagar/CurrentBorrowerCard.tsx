// src/components/granthagar/CurrentBorrowerCard.tsx
"use client";

import React, { useState } from "react";
import { UserCheck, MapPin, Calendar, Phone, Bell, Check } from "lucide-react";
import { ICurrentBorrower } from "@/data/granthagar/types";
import { toast } from "sonner";

interface CurrentBorrowerCardProps {
  borrower: ICurrentBorrower;
  bookTitle: string;
}

export default function CurrentBorrowerCard({
  borrower,
  bookTitle,
}: CurrentBorrowerCardProps) {
  const [queued, setQueued] = useState(false);

  const handleQueue = () => {
    setQueued(true);
    toast.success(
      `"${bookTitle}" এর পরবর্তী পাঠক তালিকায় আপনার নাম যুক্ত করা হয়েছে!`,
      {
        description: "বইটি লাইব্রেরিতে ফেরত আসামাত্র আপনাকে জানানো হবে।",
      }
    );
  };

  return (
    <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <UserCheck className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              বইটি বর্তমানে লাইব্রেরির বাইরে আছে
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              বাছার পরিবারের একজন পাঠক বর্তমানে বইটি পড়ছেন
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
          Currently Borrowed
        </span>
      </div>

      {/* Reader details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 rounded-xl bg-white dark:bg-[#181818] p-3.5 border border-amber-200/70 dark:border-[#303030] text-xs">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <span className="font-semibold text-slate-500 dark:text-slate-400">
            বর্তমান পাঠক:
          </span>
          <span className="font-bold text-[#1677ff] dark:text-[#4096ff]">
            {borrower.name}
          </span>
        </div>

        {borrower.addressZone && (
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <MapPin className="size-3.5 text-slate-400 shrink-0" />
            <span>{borrower.addressZone}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
          <Calendar className="size-3.5 text-amber-500 shrink-0" />
          <span>
            ফেরত দেওয়ার সম্ভাব্য তারিখ:{" "}
            <strong className="text-slate-900 dark:text-white font-semibold">
              {new Date(borrower.returnExpectedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </strong>
          </span>
        </div>

        {borrower.phone && (
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
            <Phone className="size-3.5 text-emerald-500 shrink-0" />
            <a
              href={`tel:${borrower.phone}`}
              className="hover:underline text-emerald-600 dark:text-emerald-400 font-medium"
            >
              পাঠকের সাথে যোগাযোগ: {borrower.phone}
            </a>
          </div>
        )}
      </div>

      {/* Action / Queue Button */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          বইটি আপনার এলাকার পাঠকের কাছে থাকলে আপনি সরাসরিও যোগাযোগ করতে পারেন।
        </p>

        <button
          onClick={handleQueue}
          disabled={queued}
          className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold bg-[#1677ff] hover:bg-[#4096ff] text-white transition-all active:scale-95 disabled:bg-emerald-600 cursor-pointer shadow-xs"
        >
          {queued ? (
            <>
              <Check className="size-3.5" />
              <span>তালিকায় যুক্ত হয়েছে (Queued)</span>
            </>
          ) : (
            <>
              <Bell className="size-3.5" />
              <span>পরবর্তী পাঠক হিসেবে বুকিং দিন (Notify Me)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
