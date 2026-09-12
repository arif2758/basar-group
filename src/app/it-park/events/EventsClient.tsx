"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Printer,
  X,
  Laptop
} from "lucide-react";
import { toast } from "sonner";

export interface EventData {
  _id: string;
  title: string;
  eventType: "hackathon" | "seminar" | "workshop" | "bootcamp_demo" | "networking";
  eventDate: string;
  timeSchedule: string;
  venue: string;
  ticketPrice: number;
  totalSeats: number;
  registeredCount: number;
  speakerName: string;
  speakerRole: string;
  description: string;
  status: "upcoming" | "live" | "completed";
}

const DEFAULT_EVENTS: EventData[] = [
  {
    _id: "e1",
    title: "বাছার হ্যাকাথন ২০২৬: AI & Web Innovation Challenge",
    eventType: "hackathon",
    eventDate: "২০২৬-১১-১০",
    timeSchedule: "সকাল ৯:০০ - রাত ৯:০০ (১২ ঘণ্টা নন-স্টপ)",
    venue: "বাছার আইটি পার্ক অডিটোরিয়াম ও ল্যাব",
    ticketPrice: 0,
    totalSeats: 120,
    registeredCount: 88,
    speakerName: "ইঞ্জি. মো আরিফ বাছার ও বিশেষজ্ঞ বিচারক প্যানেল",
    speakerRole: "Chief Tech Judge & Mentor",
    description: "বাস্তব সামাজিক ও ব্যবসায়িক সমস্যার সমাধানে ওয়েব ও এআই প্রজেক্ট ডেভেলপমেন্ট প্রতিযোগিতা। রয়েছে নগদ ১ লক্ষ টাকার পুরস্কার ও ইন্টার্নশিপ অফার!",
    status: "upcoming",
  },
  {
    _id: "e2",
    title: "ফ্রিল্যান্সিং ক্যারিয়ার ও ইন্টারন্যাশনাল ক্লায়েন্ট হ্যান্ডলিং সেমিনার",
    eventType: "seminar",
    eventDate: "২০২৬-১০-২৪",
    timeSchedule: "বিকাল ৩:০০ - ৫:৩০",
    venue: "অনলাইন (Zoom) ও আইটি পার্ক সেমিনার হল",
    ticketPrice: 0,
    totalSeats: 200,
    registeredCount: 165,
    speakerName: "সাদিয়া আফরিন ও তানভীর আহমেদ",
    speakerRole: "Top-Rated Freelancers & Growth Mentors",
    description: "Upwork ও Fiverr-এ কীভাবে সঠিক প্রস্তাব পাঠাবেন, দীর্ঘমেয়াদী আন্তর্জাতিক ক্লায়েন্ট তৈরি করবেন এবং আন্তর্জাতিক পেমেন্ট গ্রহণ করবেন তার পূর্ণাঙ্গ নির্দেশিকা।",
    status: "upcoming",
  },
  {
    _id: "e3",
    title: "হ্যান্ডস-অন ওয়ার্কশপ: Next.js 15 ও Tailwind CSS দিয়ে প্রো-লেভেল ওয়েবসাইট তৈরি",
    eventType: "workshop",
    eventDate: "২০২৬-১০-১৫",
    timeSchedule: "বিকাল ৪:০০ - সন্ধ্যা ৭:০০",
    venue: "আইটি পার্ক কম্পিউটার ল্যাব-১",
    ticketPrice: 500,
    totalSeats: 40,
    registeredCount: 34,
    speakerName: "সফটওয়্যার টিম লিড",
    speakerRole: "Senior Frontend Engineer",
    description: "৩ ঘণ্টার লাইভ কোডিং সেশন যেখানে শূন্য থেকে একটি পূর্ণাঙ্গ আধুনিক পোর্টফোলিও ও ই-কমার্স ল্যান্ডিং পেজ তৈরি করে ক্লাউডে লাইভ করা হবে।",
    status: "upcoming",
  },
];

export default function EventsClient({ initialEvents }: { initialEvents?: EventData[] }) {
  const [events, setEvents] = useState<EventData[]>(
    initialEvents && initialEvents.length > 0 ? initialEvents : DEFAULT_EVENTS
  );

  const [registerEvent, setRegisterEvent] = useState<EventData | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("ফরিদপুর");

  // Digital Ticket Pass
  const [ticketPass, setTicketPass] = useState<any | null>(null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEvent || !name || !phone) {
      toast.error("অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর দিন!");
      return;
    }

    const payload = {
      eventTitle: registerEvent.title,
      eventDate: registerEvent.eventDate,
      venue: registerEvent.venue,
      timeSchedule: registerEvent.timeSchedule,
      name,
      phone,
      email,
      ticketCode: `EVT-PASS-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredAt: new Date().toISOString(),
    };

    setTicketPass(payload);
    setRegisterEvent(null);
    setName("");
    setPhone("");
    setEmail("");
    toast.success("ইভেন্ট রেজিস্ট্রেশন সফল হয়েছে! আপনার ডিজিটাল টিকিট সংরক্ষিত হয়েছে।");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#1677ff]" />
          সেমিনার, হ্যাকাথন ও টেক ইভেন্টসমূহ
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          প্রযুক্তি বিশেষজ্ঞদের সাথে সরাসরি নেটওয়ার্কিং, দক্ষতা বৃদ্ধি ও প্রতিযোগিতায় অংশগ্রহণের সুযোগ
        </p>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e) => {
          const seatRemaining = e.totalSeats - e.registeredCount;
          return (
            <div
              key={e._id}
              className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between hover:border-[#1677ff]/60 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1677ff] border border-blue-200 dark:border-blue-900/40 uppercase">
                    {e.eventType}
                  </span>
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    আসন বাকি: {seatRemaining} টি
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {e.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {e.description}
                </p>

                <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-[#141414] rounded-xl border border-slate-100 dark:border-[#262626] text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-[#1677ff]" />
                    <span>তারিখ: {e.eventDate} ({e.timeSchedule})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span className="truncate">{e.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>স্পিকার: {e.speakerName}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">রেজিস্ট্রেশন ফি</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {e.ticketPrice === 0 ? "সম্পূর্ণ ফ্রি" : `৳ ${e.ticketPrice.toLocaleString()}`}
                  </span>
                </div>

                <button
                  onClick={() => setRegisterEvent(e)}
                  className="px-5 py-2 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" /> ফ্রি টিকিট সংগ্রহ
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── MODAL: EVENT REGISTRATION ───────────────────────────────────────── */}
      {registerEvent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleRegisterSubmit}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in fade-in-50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  ইভেন্ট টিকিট বুকিং
                </h3>
                <p className="text-xs text-[#1677ff] font-semibold">{registerEvent.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setRegisterEvent(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">আপনার পুরো নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: মো. জাহিদ হাসান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
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
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">ইমেইল ঠিকানা</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setRegisterEvent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-sm"
              >
                টিকিট কনফার্ম করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL: DIGITAL EVENT PASS ───────────────────────────────────────── */}
      {ticketPass && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl animate-in fade-in-50">
            <div className="text-center space-y-1 pb-4 border-b border-slate-100 dark:border-[#262626]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
                B
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white pt-1">
                বাছার আইটি পার্ক • ডিজিটাল ইভেন্ট পাস
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> আপনার আসন সফলভাবে সংরক্ষিত হয়েছে!
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 dark:bg-[#141414] p-4 rounded-xl border border-slate-200 dark:border-[#303030] text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">পাস কোড:</span>
                <span className="font-mono font-bold text-[#1677ff]">{ticketPass.ticketCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">অংশগ্রহণকারী:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ticketPass.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ইভেন্টের নাম:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{ticketPass.eventTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">তারিখ ও সময়:</span>
                <span className="font-medium">{ticketPass.eventDate} ({ticketPass.timeSchedule})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ভেন্যু:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{ticketPass.venue}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> পাস প্রিন্ট / PDF
              </button>
              <button
                onClick={() => setTicketPass(null)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
              >
                সম্পন্ন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
