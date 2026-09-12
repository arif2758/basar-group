"use client";

import React, { useState } from "react";
import {
  Radio,
  Hospital,
  MapPin,
  Clock,
  Phone,
  Droplet,
  AlertTriangle,
  User,
  CheckCircle2,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  bags: number;
  hospital: string;
  district: string;
  reason: string;
  urgency: "urgent" | "critical" | "regular";
  timeNeeded: string;
  contactPhone: string;
  postedAgo: string;
}

const mockRequests: BloodRequest[] = [
  {
    id: "REQ-901",
    patientName: "নাসরিন সুলতানা (সিজারিয়ান)",
    bloodGroup: "O-",
    bags: 2,
    hospital: "মাদারীপুর সদর হাসপাতাল",
    district: "মাদারীপুর",
    reason: "জরুরি সিজারিয়ান অপারেশন",
    urgency: "critical",
    timeNeeded: "আজ সন্ধ্যা ৬টার মধ্যে",
    contactPhone: "01711223344",
    postedAgo: "২৫ মিনিট আগে",
  },
  {
    id: "REQ-902",
    patientName: "আবির হোসেন (থ্যালাসেমিয়া)",
    bloodGroup: "B+",
    bags: 1,
    hospital: "ফরিদপুর মেডিকেল কলেজ হাসপাতাল",
    district: "ফরিদপুর",
    reason: "মাসিক রক্তের নিয়মিত সঞ্চালন",
    urgency: "regular",
    timeNeeded: "আগামীকাল সকাল ১০টা",
    contactPhone: "01822334455",
    postedAgo: "১ ঘণ্টা আগে",
  },
  {
    id: "REQ-903",
    patientName: "মো. সিরাজুল ইসলাম (দুর্ঘটনা)",
    bloodGroup: "A+",
    bags: 3,
    hospital: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    district: "ঢাকা",
    reason: "সড়ক দুর্ঘটনাজনিত রক্তক্ষরণ",
    urgency: "critical",
    timeNeeded: "অতি জরুরি (ASAP)",
    contactPhone: "01933445566",
    postedAgo: "৪৫ মিনিট আগে",
  },
  {
    id: "REQ-904",
    patientName: "মাহমুদা আক্তার (কিডনি ডায়ালাইসিস)",
    bloodGroup: "AB+",
    bags: 1,
    hospital: "রাজশাহী মেডিকেল কলেজ",
    district: "রাজশাহী",
    reason: "হিমোগ্লোবিন কমে যাওয়া",
    urgency: "urgent",
    timeNeeded: "আজ রাত ৮টা",
    contactPhone: "01744556677",
    postedAgo: "২ ঘণ্টা আগে",
  },
];

export default function LiveBloodRequestsFeed() {
  const [selectedGroup, setSelectedGroup] = useState<string>("সব");

  const filteredRequests = mockRequests.filter(
    (req) => selectedGroup === "সব" || req.bloodGroup === selectedGroup
  );

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-[#141414] transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1f1f1f] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-[#303030] shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="relative flex size-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-3 bg-rose-600"></span>
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                লাইভ রক্তের আবেদনের তালিকা
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              সারাদেশের বিভিন্ন হাসপাতালে ভর্তি রোগীদের জরুরি রক্তের রিয়েল-টাইম তালিকা
            </p>
          </div>

          <Link
            href="/blood-donation/emergency"
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-xs flex items-center justify-center gap-1.5 shrink-0"
          >
            <AlertTriangle className="size-3.5" />
            <span>নতুন আবেদন পোস্ট করুন</span>
          </Link>
        </div>

        {/* Group Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {["সব", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border shrink-0 transition-all cursor-pointer ${
                selectedGroup === bg
                  ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                  : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-[#303030] hover:border-rose-400"
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        {/* Requests Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-[#1f1f1f] rounded-2xl border border-slate-200 dark:border-[#303030] p-5 shadow-xs flex flex-col justify-between hover:border-rose-500/50 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="size-11 rounded-xl bg-rose-50 dark:bg-[#2c1618] border border-rose-200/80 dark:border-[#5b2123] text-rose-600 dark:text-[#ff7875] flex items-center justify-center font-black text-base shadow-xs">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {req.patientName}
                      </h3>
                      <span className="text-[11px] text-slate-400">{req.reason}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      req.urgency === "critical"
                        ? "bg-rose-50 dark:bg-[#2c1618] text-rose-600 dark:text-[#ff7875] border-rose-200 dark:border-[#5b2123] animate-pulse"
                        : "bg-amber-50 dark:bg-[#2b2111] text-amber-600 dark:text-[#d89614] border-amber-200 dark:border-[#594214]"
                    }`}
                  >
                    {req.urgency === "critical" ? "🔴 অতি জরুরি" : "🟠 প্রয়োজন"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-[#141414] p-3 rounded-xl border border-slate-100 dark:border-[#262626]">
                  <div>
                    <span className="text-[10px] text-slate-400 block">হাসপাতাল:</span>
                    <strong className="text-slate-800 dark:text-slate-200 text-xs block truncate">{req.hospital}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">পরিমাণ:</span>
                    <strong className="text-rose-600 dark:text-[#ff7875] text-xs block">{req.bags} ব্যাগ</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">কখন লাগবে:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs block truncate">{req.timeNeeded}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">পোস্ট করা হয়েছে:</span>
                    <span className="text-[11px] text-slate-500 block">{req.postedAgo}</span>
                  </div>
                </div>
              </div>

              {/* Call Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center gap-2">
                <a
                  href={`tel:${req.contactPhone}`}
                  className="flex-1 h-9 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
                >
                  <Phone className="size-3.5" />
                  <span>রোগীর স্বজনকে সরাসরি কল দিন</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
