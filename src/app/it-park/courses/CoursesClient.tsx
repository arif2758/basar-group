"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  Layers,
  Award,
  DollarSign,
  ChevronDown,
  Printer,
  X,
  Phone,
  Mail,
  MapPin,
  Laptop
} from "lucide-react";
import { toast } from "sonner";

export interface CourseData {
  _id: string;
  title: string;
  slug: string;
  category: "web_dev" | "graphics_ui" | "digital_marketing" | "python_ai" | "freelancing" | "cyber_security";
  level: "beginner" | "intermediate" | "advanced";
  durationWeeks: number;
  totalClasses: number;
  courseFee: number;
  discountFee?: number;
  instructorName: string;
  instructorTitle: string;
  maxSeats: number;
  enrolledCount: number;
  batchNumber: string;
  startDate: string;
  classSchedule: string;
  description: string;
  topics: string[];
  isFeatured?: boolean;
}

const DEFAULT_COURSES: CourseData[] = [
  {
    _id: "c1",
    title: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (Next.js, React ও Node.js)",
    slug: "full-stack-web-development",
    category: "web_dev",
    level: "intermediate",
    durationWeeks: 16,
    totalClasses: 32,
    courseFee: 12000,
    discountFee: 8500,
    instructorName: "ইঞ্জি. মো আরিফ বাছার",
    instructorTitle: "Senior Full-Stack Architect",
    maxSeats: 30,
    enrolledCount: 22,
    batchNumber: "Batch-08",
    startDate: "২০২৬-১০-১৫",
    classSchedule: "শনি ও সোম, রাত ৮:০০ - ১০:০০",
    description: "আধুনিক ওয়েব অ্যাপ তৈরি, API ডিজাইন, ক্লাউড ডিপ্লয়মেন্ট ও ফ্রিল্যান্সিং মার্কেটপ্লেসে কাজ পাওয়ার পূর্ণাঙ্গ বুটক্যাম্প।",
    topics: ["HTML5 & Tailwind CSS", "JavaScript ES6+ & TypeScript", "React.js & Next.js 15 App Router", "Node.js & MongoDB Database", "REST API & Authentication", "Marketplace & Client Project Handling"],
    isFeatured: true,
  },
  {
    _id: "c2",
    title: "প্রফেশনাল UI/UX ডিজাইন ও Figma মাস্টারি",
    slug: "professional-ui-ux-design-figma",
    category: "graphics_ui",
    level: "beginner",
    durationWeeks: 12,
    totalClasses: 24,
    courseFee: 10000,
    discountFee: 6500,
    instructorName: "তানভীর আহমেদ",
    instructorTitle: "Lead Product Designer",
    maxSeats: 25,
    enrolledCount: 18,
    batchNumber: "Batch-05",
    startDate: "২০২৬-১০-২০",
    classSchedule: "রবি ও বুধ, রাত ৮:০০ - ১০:০০",
    description: "ইউজার রিসার্চ, ওয়্যারফ্রেম, আধুনিক মোবাইল ও ওয়েব ইন্টারফেস ডিজাইন এবং ইন্টারঅ্যাক্টিভ প্রোটোটাইপিং।",
    topics: ["UI/UX Design Fundamentals", "Figma Advanced Tools & Auto-Layout", "Design Systems & Component Architecture", "Wireframing & Prototyping", "Design Case Study & Portfolio"],
    isFeatured: true,
  },
  {
    _id: "c3",
    title: "Python, AI & Data Science বুটক্যাম্প",
    slug: "python-ai-data-science",
    category: "python_ai",
    level: "intermediate",
    durationWeeks: 14,
    totalClasses: 28,
    courseFee: 14000,
    discountFee: 9500,
    instructorName: "মো. নাজমুল হাসান",
    instructorTitle: "AI & ML Engineer",
    maxSeats: 25,
    enrolledCount: 15,
    batchNumber: "Batch-03",
    startDate: "২০২৬-১১-০১",
    classSchedule: "মঙ্গল ও বৃহস্পতি, রাত ৮:০০ - ১০:০০",
    description: "পাইথন প্রোগ্রামিং, ডাটা অ্যানালাইসিস, মেশিন লার্নিং মডেলিং ও জেনারেটিভ এআই অ্যাপ্লিকেশন তৈরি।",
    topics: ["Python Fundamentals & OOP", "Pandas, NumPy & Data Visualization", "Machine Learning Algorithms", "Generative AI & Prompt Engineering", "Real-world AI Projects"],
    isFeatured: false,
  },
  {
    _id: "c4",
    title: "ডিজিটাল মার্কেটিং ও আন্তর্জাতিক ফ্রিল্যান্সিং ক্যারিয়ার",
    slug: "digital-marketing-freelancing",
    category: "digital_marketing",
    level: "beginner",
    durationWeeks: 10,
    totalClasses: 20,
    courseFee: 8000,
    discountFee: 5000,
    instructorName: "সাদিয়া আফরিন",
    instructorTitle: "Digital Growth Specialist",
    maxSeats: 35,
    enrolledCount: 28,
    batchNumber: "Batch-09",
    startDate: "২০২৬-১০-১৮",
    classSchedule: "শুক্র ও শনি, বিকাল ৪:০০ - ৬:০০",
    description: "সোশ্যাল মিডিয়া মার্কেটিং, SEO, Google Ads, কনটেন্ট স্ট্র্যাটেজি এবং Upwork ও Fiverr-এ ফ্রিল্যান্সিং।",
    topics: ["Search Engine Optimization (SEO)", "Facebook & Instagram Ads", "Google Ads & Analytics", "Content Strategy & Copywriting", "Fiverr & Upwork Profile Setup"],
    isFeatured: false,
  },
];

export default function CoursesClient({ initialCourses }: { initialCourses?: CourseData[] }) {
  const [courses, setCourses] = useState<CourseData[]>(
    initialCourses && initialCourses.length > 0 ? initialCourses : DEFAULT_COURSES
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Admission Enrollment Modal
  const [enrollCourse, setEnrollCourse] = useState<CourseData | null>(null);
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad" | "rocket" | "bank">("bkash");
  const [transactionId, setTransactionId] = useState("");
  const [district, setDistrict] = useState("ফরিদপুর");

  // Success Admission Card Modal
  const [admissionSlip, setAdmissionSlip] = useState<any | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = selectedCategory === "all" || c.category === selectedCategory;
      const matchQuery =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [courses, selectedCategory, searchQuery]);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollCourse || !studentName || !studentPhone) {
      toast.error("অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর পূরণ করুন!");
      return;
    }

    const payload = {
      studentName,
      phone: studentPhone,
      email: studentEmail,
      courseId: enrollCourse._id,
      courseTitle: enrollCourse.title,
      batchNumber: enrollCourse.batchNumber,
      paidAmount: enrollCourse.discountFee || enrollCourse.courseFee,
      paymentMethod,
      transactionId,
      district,
      admissionRoll: `ITP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/admin/it-park/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // optimistic
    }

    setAdmissionSlip(payload);
    setEnrollCourse(null);
    setStudentName("");
    setStudentPhone("");
    setStudentEmail("");
    setTransactionId("");
    toast.success("অভিনন্দন! আপনার কোর্সে ভর্তি সফল হয়েছে।");
  };

  return (
    <div className="space-y-10">
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#1677ff]" />
              প্রযুক্তি দক্ষতা কোর্স ও বুটক্যাম্প
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              অভিজ্ঞ মেন্টরদের তত্ত্বাবধানে লাইভ প্রজেক্ট বেসড ক্লাস ও ১০০% ক্যারিয়ার গাইডেন্স
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="কোর্স বা ইন্সট্রাক্টরের নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth pt-2">
          {[
            { key: "all", label: "সকল কোর্স" },
            { key: "web_dev", label: "Web Development" },
            { key: "graphics_ui", label: "UI/UX & Graphics" },
            { key: "python_ai", label: "Python & AI" },
            { key: "digital_marketing", label: "Digital Marketing" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#1677ff] text-white shadow-sm"
                  : "bg-slate-100 dark:bg-[#141414] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/60 dark:border-[#2a2a2a]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((c) => {
          const seatRemaining = c.maxSeats - c.enrolledCount;
          return (
            <div
              key={c._id}
              className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-5 flex flex-col justify-between hover:border-[#1677ff]/60 transition-all group"
            >
              <div className="space-y-4">
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                      {c.batchNumber}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#141414] text-slate-600 dark:text-slate-400">
                      {c.level === "beginner" ? "বিগিনার ফ্রেন্ডলি" : c.level === "intermediate" ? "ইন্টারমিডিয়েট" : "অ্যাডভান্সড"}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> আসন বাকি: {seatRemaining} টি
                  </span>
                </div>

                {/* Course Title & Description */}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-[#1677ff] transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {c.description}
                </p>

                {/* Curriculum / Topics Chips */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    সিলেবাসের মূল বিষয়সমূহ:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2a2a2a] text-slate-700 dark:text-slate-300 font-medium"
                      >
                        ✓ {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-[#141414] rounded-xl border border-slate-100 dark:border-[#262626] text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#1677ff] shrink-0" />
                    <span>{c.durationWeeks} সপ্তাহ ({c.totalClasses} টি ক্লাস)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>ক্লাস শুরু: {c.startDate}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-[11.5px]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>ইন্সট্রাক্টর: <strong>{c.instructorName}</strong> ({c.instructorTitle})</span>
                  </div>
                </div>
              </div>

              {/* Price & Action Bottom Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ৳ {(c.discountFee || c.courseFee).toLocaleString()}
                    </span>
                    {c.discountFee && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳ {c.courseFee.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    পূর্ণাঙ্গ কোর্স + সার্টিফিকেট + জব প্লেসমেন্ট
                  </span>
                </div>

                <button
                  onClick={() => setEnrollCourse(c)}
                  className="px-5 py-2.5 bg-[#1677ff] hover:bg-[#4096ff] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                >
                  ভর্তি আবেদন <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── MODAL 1: ENROLLMENT FORM ────────────────────────────────────────── */}
      {enrollCourse && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleEnrollSubmit}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  কোর্স ভর্তি ফরম ({enrollCourse.batchNumber})
                </h3>
                <p className="text-xs text-[#1677ff] font-semibold">{enrollCourse.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setEnrollCourse(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900/40 flex justify-between items-center">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block text-[11px]">কোর্স ফি (ডিসকাউন্ট সহ)</span>
                  <span className="font-black text-base text-[#1677ff]">
                    ৳ {(enrollCourse.discountFee || enrollCourse.courseFee).toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <span>{enrollCourse.classSchedule}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার পুরো নাম"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">জেলা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ফরিদপুর"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">পেমেন্ট মেথড</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="bkash">bKash (01712-345678)</option>
                    <option value="nagad">Nagad (01812-345678)</option>
                    <option value="rocket">Rocket (01912-345678)</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Transaction ID (TrxID)</label>
                  <input
                    type="text"
                    placeholder="যেমন: 9K87LM01PX"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setEnrollCourse(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-sm"
              >
                ভর্তি নিশ্চিত করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL 2: DIGITAL ADMISSION SLIP ─────────────────────────────────── */}
      {admissionSlip && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl animate-in fade-in-50">
            <div className="text-center space-y-1 pb-4 border-b border-slate-100 dark:border-[#262626]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
                B
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white pt-1">
                বাছার আইটি পার্ক • ডিজিটাল ভর্তি স্লিপ
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> ভর্তি সফলভাবে নিশ্চিত হয়েছে!
              </p>
            </div>

            <div className="space-y-2.5 bg-slate-50 dark:bg-[#141414] p-4 rounded-xl border border-slate-200 dark:border-[#303030] text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">ভর্তি রোল / আইডি:</span>
                <span className="font-mono font-bold text-[#1677ff]">{admissionSlip.admissionRoll}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">শিক্ষার্থীর নাম:</span>
                <span className="font-bold text-slate-900 dark:text-white">{admissionSlip.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">মোবাইল নম্বর:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{admissionSlip.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">কোর্স:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{admissionSlip.courseTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ব্যাচ:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{admissionSlip.batchNumber}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-[#262626]">
                <span className="font-bold text-slate-700 dark:text-slate-300">পরিশোধিত ফি:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  ৳ {admissionSlip.paidAmount?.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              ক্লাসের লিংক ও গ্রুপে যুক্ত হওয়ার বিস্তারিত তথ্য আপনার মোবাইল নম্বরে এসএমএস ও ইমেইলে পাঠানো হবে।
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> স্লিপ প্রিন্ট / PDF
              </button>
              <button
                onClick={() => setAdmissionSlip(null)}
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
