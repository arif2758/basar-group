"use client";

import React, { useState } from "react";
import {
  Building2,
  Wifi,
  Zap,
  Coffee,
  ShieldCheck,
  Printer,
  Users,
  Clock,
  CheckCircle2,
  Calendar,
  Phone,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

export default function CoWorkingPage() {
  const [deskType, setDeskType] = useState<"flexi" | "dedicated" | "private_room">("flexi");
  const [duration, setDuration] = useState<"day" | "week" | "month">("month");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [booked, setBooked] = useState(false);

  // Pricing Matrix
  const PRICES = {
    flexi: { day: 300, week: 1500, month: 4500 },
    dedicated: { day: 500, week: 2500, month: 7500 },
    private_room: { day: 1500, week: 8000, month: 24000 },
  };

  const currentPrice = PRICES[deskType][duration];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast.error("অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর দিন!");
      return;
    }
    setBooked(true);
    toast.success("কো-ওয়ার্কিং স্পেস বুকিং সফল হয়েছে! আমাদের ম্যানেজার শীঘ্রই যোগাযোগ করবেন।");
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <Building2 className="w-4 h-4" />
          স্মার্ট কো-ওয়ার্কিং ও ফ্রিল্যান্সার হাব
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          বাছার আইটি পার্ক কো-ওয়ার্কিং স্পেস
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          হাই-স্পিড অপটিক্যাল ফাইবার ইন্টারনেট, নিরবচ্ছিন্ন বিদ্যুৎ ব্যাকআপ ও নিরিবিলি প্রফেশনাল কাজের পরিবেশ
        </p>
      </div>

      {/* 6 Amenities Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: Wifi, title: "100 Mbps Dedicated", desc: "অপটিক্যাল ফাইবার" },
          { icon: Zap, title: "24/7 Power", desc: "জেনারেটর ও আইপিএস" },
          { icon: Coffee, title: "ফ্রি চা ও কফি", desc: "রিফ্রেশমেন্ট কর্নার" },
          { icon: Users, title: "কনফারেন্স রুম", desc: "প্রজেক্টর ও ডিসপ্লে" },
          { icon: Printer, title: "প্রিন্টিং সুবিধা", desc: "স্ক্যান ও ফটোকপি" },
          { icon: ShieldCheck, title: "CCTV ও সিকিউরিটি", desc: "নিরাপদ পরিবেশ" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 text-center space-y-2 shadow-xs"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#1677ff] flex items-center justify-center mx-auto">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-[10px] text-slate-500">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Desk Calculator & Booking Hub */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Interactive Package Selector */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              আপনার প্রয়োজন অনুযায়ী প্যাকেজ পছন্দ করুন
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              সিঙ্গেল ফ্রিল্যান্সার বা টিম — সকলের জন্য সাশ্রয়ী সমাধান
            </p>
          </div>

          {/* Desk Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { key: "flexi", title: "ফ্লেক্সি হট-ডেস্ক", desc: "যেকোনো ওপেন সিট ব্যবহার" },
              { key: "dedicated", title: "ডেডিকেটেড ডেস্ক", desc: "স্থায়ী নির্ধারিত ডেস্ক ও লকার" },
              { key: "private_room", title: "টিম প্রাইভেট রুম", desc: "৪-৬ জনের প্রাইভেট ক্যাবিন" },
            ].map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDeskType(d.key as any)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                  deskType === d.key
                    ? "border-[#1677ff] bg-blue-50/70 dark:bg-blue-950/40 shadow-sm"
                    : "border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]"
                }`}
              >
                <p className="font-bold text-sm text-slate-900 dark:text-white">{d.title}</p>
                <p className="text-[11px] text-slate-500">{d.desc}</p>
              </button>
            ))}
          </div>

          {/* Duration Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              সময়কাল নির্বাচন করুন:
            </label>
            <div className="flex items-center gap-2">
              {[
                { key: "day", label: "দৈনিক (Day Pass)" },
                { key: "week", label: "সাপ্তাহিক (Weekly)" },
                { key: "month", label: "মাসিক (Monthly - Best Value)" },
              ].map((dur) => (
                <button
                  key={dur.key}
                  type="button"
                  onClick={() => setDuration(dur.key as any)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    duration === dur.key
                      ? "bg-[#1677ff] text-white shadow-sm"
                      : "bg-slate-100 dark:bg-[#141414] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-[#303030]"
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block">সর্বমোট চার্জ:</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                ৳ {currentPrice.toLocaleString()}
              </span>
            </div>
            <div className="text-right text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> বিদ্যুৎ ও ওয়াইফাই বিল অন্তর্ভুক্ত
            </div>
          </div>
        </div>

        {/* Right 5 cols: Booking Form */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#141414] p-6 rounded-2xl border border-slate-200 dark:border-[#303030] space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            সিট বুকিং ও ভিজিট ফর্ম
          </h3>

          {booked ? (
            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">বুকিং রিকোয়েস্ট সফল!</h4>
              <p className="text-xs text-slate-500">
                আমাদের কো-ওয়ার্কিং টিম লিড আপনার সাথে ফোনে কথা বলে সিট নিশ্চিত করবেন।
              </p>
              <button
                onClick={() => setBooked(false)}
                className="mt-3 text-xs font-semibold text-[#1677ff] underline"
              >
                নতুন বুকিং করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">কাজের ধরন / পেশা</label>
                <input
                  type="text"
                  placeholder="যেমন: ফ্রিল্যান্সার / সফটওয়্যার ইঞ্জিনিয়ার"
                  className="w-full p-2.5 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer mt-2"
              >
                সিট রিজার্ভ করুন (৳ {currentPrice.toLocaleString()})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
