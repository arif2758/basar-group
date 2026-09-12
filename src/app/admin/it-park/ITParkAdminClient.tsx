"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Laptop,
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  Users,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  Sparkles,
  FileText,
  UserCheck,
  Send,
  X
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// ─── Default Sample Data for Fresh Databases ───────────────────────────────────

const SAMPLE_COURSES = [
  {
    _id: "c1",
    title: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট (Next.js, React ও Node.js)",
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
    status: "upcoming",
    isFeatured: true,
  },
  {
    _id: "c2",
    title: "প্রফেশনাল UI/UX ডিজাইন ও Figma মাস্টারি",
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
    status: "upcoming",
    isFeatured: true,
  },
];

const SAMPLE_ENROLLMENTS = [
  {
    _id: "e1",
    studentName: "মো. নাঈমুর রহমান",
    phone: "01711223344",
    email: "naimur@gmail.com",
    courseTitle: "ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট",
    batchNumber: "Batch-08",
    paidAmount: 8500,
    paymentMethod: "bkash",
    transactionId: "9K87LM01PX",
    admissionRoll: "ITP-2026-8912",
    status: "confirmed",
    district: "ফরিদপুর",
    createdAt: new Date("2026-09-10").toISOString(),
  },
  {
    _id: "e2",
    studentName: "মোসাঃ ফারজানা আক্তার",
    phone: "01822334455",
    email: "farzana@gmail.com",
    courseTitle: "প্রফেশনাল UI/UX ডিজাইন ও Figma",
    batchNumber: "Batch-05",
    paidAmount: 6500,
    paymentMethod: "nagad",
    transactionId: "7MN829KL02",
    admissionRoll: "ITP-2026-3421",
    status: "pending",
    district: "রাজবাড়ী",
    createdAt: new Date("2026-09-12").toISOString(),
  },
];

const SAMPLE_JOBS = [
  {
    _id: "j1",
    title: "Junior Frontend Developer (React / Next.js)",
    companyName: "BASAR Tech Solutions",
    category: "software_dev",
    jobType: "full_time",
    location: "ফরিদপুর / হাইব্রিড",
    salaryRange: "৳ ২৫,০০০ - ৳ ৩৫,০০০",
    deadline: "২০২৬-১০-৩০",
    applicantCount: 14,
    status: "active",
  },
  {
    _id: "j2",
    title: "UI/UX & Product Design Intern",
    companyName: "BASAR IT Hub",
    category: "ui_ux_design",
    jobType: "internship",
    location: "রিমোট",
    salaryRange: "৳ ১২,০০০ - ৳ ১৮,০০০",
    deadline: "২০২৬-১০-২৫",
    applicantCount: 26,
    status: "active",
  },
];

const SAMPLE_APPLICATIONS = [
  {
    _id: "a1",
    jobTitle: "Junior Frontend Developer (React / Next.js)",
    applicantName: "মো. ফাহিম হাসান",
    phone: "01911223344",
    email: "fahim.dev@gmail.com",
    portfolioUrl: "https://fahim-dev.vercel.app",
    githubUrl: "https://github.com/fahim-dev",
    status: "shortlisted",
    adminFeedback: "পোর্টফোলিও চমৎকার। টেকনিক্যাল ইন্টারভিউয়ের জন্য ডাকা হয়েছে।",
    createdAt: new Date("2026-09-08").toISOString(),
  },
  {
    _id: "a2",
    jobTitle: "UI/UX & Product Design Intern",
    applicantName: "নুসরাত জাহান",
    phone: "01622334455",
    email: "nusrat.ui@gmail.com",
    portfolioUrl: "https://behance.net/nusrat_ui",
    status: "applied",
    createdAt: new Date("2026-09-11").toISOString(),
  },
];

const SAMPLE_EVENTS = [
  {
    _id: "ev1",
    title: "বাছার হ্যাকাথন ২০২৬: AI & Web Innovation Challenge",
    eventType: "hackathon",
    eventDate: "২০২৬-১১-১০",
    venue: "বাছার আইটি পার্ক অডিটোরিয়াম",
    totalSeats: 120,
    registeredCount: 88,
    status: "upcoming",
  },
  {
    _id: "ev2",
    title: "ফ্রিল্যান্সিং ক্যারিয়ার ও ইন্টারন্যাশনাল ক্লায়েন্ট হ্যান্ডলিং",
    eventType: "seminar",
    eventDate: "২০২৬-১০-২৪",
    venue: "অনলাইন (Zoom)",
    totalSeats: 200,
    registeredCount: 165,
    status: "upcoming",
  },
];

interface ITParkAdminClientProps {
  initialCourses: any[];
  initialEnrollments: any[];
  initialJobs: any[];
  initialApplications: any[];
  initialEvents: any[];
  stats: {
    totalCoursesCount: number;
    totalEnrollmentsCount: number;
    totalJobsCount: number;
    totalApplicationsCount: number;
    totalEventsCount: number;
    totalCourseRevenue: number;
  };
}

export default function ITParkAdminClient({
  initialCourses,
  initialEnrollments,
  initialJobs,
  initialApplications,
  initialEvents,
  stats,
}: ITParkAdminClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "enrollments" | "jobs" | "applications" | "events">("overview");

  const [courses, setCourses] = useState<any[]>(
    initialCourses.length > 0 ? initialCourses : SAMPLE_COURSES
  );
  const [enrollments, setEnrollments] = useState<any[]>(
    initialEnrollments.length > 0 ? initialEnrollments : SAMPLE_ENROLLMENTS
  );
  const [jobs, setJobs] = useState<any[]>(
    initialJobs.length > 0 ? initialJobs : SAMPLE_JOBS
  );
  const [applications, setApplications] = useState<any[]>(
    initialApplications.length > 0 ? initialApplications : SAMPLE_APPLICATIONS
  );
  const [events, setEvents] = useState<any[]>(
    initialEvents.length > 0 ? initialEvents : SAMPLE_EVENTS
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add Course Modal State
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCategory, setCourseCategory] = useState("web_dev");
  const [courseLevel, setCourseLevel] = useState("beginner");
  const [courseFee, setCourseFee] = useState(10000);
  const [discountFee, setDiscountFee] = useState(7500);
  const [instructor, setInstructor] = useState("ইঞ্জি. মো আরিফ বাছার");
  const [batchNo, setBatchNo] = useState("Batch-01");
  const [courseDesc, setCourseDesc] = useState("");

  // Add Job Modal State
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("BASAR Tech Solutions");
  const [jobType, setJobType] = useState("full_time");
  const [jobLocation, setJobLocation] = useState("ফরিদপুর / রিমোট");
  const [jobSalary, setJobSalary] = useState("৳ ২৫,০০০ - ৳ ৩৫,০০০");
  const [jobDeadline, setJobDeadline] = useState("২০২৬-১০-৩০");
  const [jobDesc, setJobDesc] = useState("");

  // Quick Action: Confirm Enrollment
  const handleConfirmEnrollment = async (id: string) => {
    try {
      await fetch("/api/admin/it-park/enrollments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "confirmed" }),
      });
    } catch {
      // optimistic
    }
    setEnrollments((prev) =>
      prev.map((e) => (e._id === id ? { ...e, status: "confirmed" } : e))
    );
    toast.success("কোর্স ভর্তি নিশ্চিত (Confirmed) করা হয়েছে!");
  };

  // Quick Action: Update Application Status
  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/it-park/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
    } catch {
      // optimistic
    }
    setApplications((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
    toast.success(`আবেদনের স্ট্যাটাস ${status} এ পরিবর্তন করা হয়েছে!`);
  };

  // Create Course
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: courseTitle,
      category: courseCategory,
      level: courseLevel,
      courseFee: Number(courseFee),
      discountFee: Number(discountFee),
      instructorName: instructor,
      instructorTitle: "Lead Instructor",
      batchNumber: batchNo,
      description: courseDesc,
      durationWeeks: 12,
      totalClasses: 24,
      maxSeats: 30,
      enrolledCount: 0,
      status: "upcoming",
      topics: ["Fundamental Theory", "Hands-on Practical", "Live Capstone Project"],
    };

    try {
      const res = await fetch("/api/admin/it-park/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.course) {
        setCourses([data.course, ...courses]);
      } else {
        setCourses([{ _id: `c_${Date.now()}`, ...payload }, ...courses]);
      }
    } catch {
      setCourses([{ _id: `c_${Date.now()}`, ...payload }, ...courses]);
    }

    setShowAddCourseModal(false);
    setCourseTitle("");
    setCourseDesc("");
    toast.success("নতুন আইটি কোর্স সফলভাবে তৈরি হয়েছে!");
  };

  // Create Job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: jobTitle,
      companyName: jobCompany,
      jobType,
      location: jobLocation,
      salaryRange: jobSalary,
      deadline: new Date(jobDeadline),
      description: jobDesc,
      responsibilities: ["সফটওয়্যার ও অ্যাপ্লিকেশন ডেভেলপমেন্ট", "টিমের সাথে প্রজেক্ট সমন্বয়"],
      requirements: ["সংশ্লিষ্ট বিষয়ে ১+ বছরের অভিজ্ঞতা", "ভালো কমিউনিকেশন স্কিল"],
      applicantCount: 0,
      status: "active",
    };

    try {
      const res = await fetch("/api/admin/it-park/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.job) {
        setJobs([data.job, ...jobs]);
      } else {
        setJobs([{ _id: `j_${Date.now()}`, ...payload }, ...jobs]);
      }
    } catch {
      setJobs([{ _id: `j_${Date.now()}`, ...payload }, ...jobs]);
    }

    setShowAddJobModal(false);
    setJobTitle("");
    setJobDesc("");
    toast.success("নতুন চাকরির সার্কুলার সফলভাবে পোস্ট করা হয়েছে!");
  };

  const totalRevenue = useMemo(() => {
    return enrollments
      .filter((e) => e.status === "confirmed")
      .reduce((sum, e) => sum + (e.paidAmount || 0), 0);
  }, [enrollments]);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              <Laptop className="w-3.5 h-3.5" />
              বাছার আইটি পার্ক অ্যাডমিন কন্ট্রোল
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              প্রযুক্তি শিক্ষা ও ক্যারিয়ার কন্ট্রোল প্যানেল
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              কোর্স এনরোলমেন্ট, স্টুডেন্ট ডাটাবেস, জব বোর্ড সার্কুলার ও সেমিনার পরিচালনা
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#1677ff] hover:bg-[#4096ff] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              নতুন কোর্স
            </button>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#262626] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-emerald-500" />
              জব পোস্ট
            </button>
            <Link
              href="/it-park"
              target="_blank"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="পাবলিক আইটি পার্ক পেজ দেখুন"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5 Tab Navigation Pill Bar (NO-SCROLLBAR + Dashboard Style) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth mt-6 pt-5 border-t border-slate-100 dark:border-[#262626]">
          {[
            { key: "overview", label: "সার্বিক ড্যাশবোর্ড", icon: TrendingUp },
            { key: "courses", label: `কোর্সসমূহ (${courses.length})`, icon: GraduationCap },
            { key: "enrollments", label: `ভর্তি রেকর্ড (${enrollments.length})`, icon: UserCheck, badge: enrollments.filter(e => e.status === "pending").length },
            { key: "jobs", label: `জব বোর্ড (${jobs.length})`, icon: Briefcase },
            { key: "applications", label: `সিভি আবেদন (${applications.length})`, icon: FileText, badge: applications.filter(a => a.status === "applied").length },
            { key: "events", label: `ইভেন্ট ও টিকিট (${events.length})`, icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1677ff] text-white shadow-sm"
                    : "bg-slate-100 dark:bg-[#141414] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/70 dark:hover:bg-[#262626]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 ? (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-black rounded-full">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1: OVERVIEW ─────────────────────────────────────────────────── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Top 4 Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট কোর্স ভর্তি রাজস্ব</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ৳ {totalRevenue.toLocaleString("en-BD")}
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> কনফার্মড শিক্ষার্থী ফি
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট শিক্ষার্থী এনরোলমেন্ট</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-[#1677ff] flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {enrollments.length} জন
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                সকল লাইভ ও আসন্ন ব্যাচ মিলে
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">চাকরির আবেদন ও সিভি</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                {applications.length} টি
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {jobs.length} টি সক্রিয় সার্কুলারে
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">ইভেন্ট টিকিট বুকিং</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0)} টি
              </div>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                হ্যাকাথন ও সেমিনার রেজিস্টার্ড
              </p>
            </div>
          </div>

          {/* Quick Dual Tables: Recent Enrollments & Recent Job Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Enrollments */}
            <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                  সাম্প্রতিক কোর্স ভর্তি রেকর্ড
                </h3>
                <button
                  onClick={() => setActiveTab("enrollments")}
                  className="text-xs text-[#1677ff] hover:underline"
                >
                  সব দেখুন
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                {enrollments.slice(0, 4).map((e) => (
                  <div key={e._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{e.studentName}</p>
                      <p className="text-slate-500 text-[11px]">
                        {e.courseTitle} • {e.admissionRoll}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        ৳ {e.paidAmount?.toLocaleString()}
                      </p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        e.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {e.status === "confirmed" ? "ভর্তি নিশ্চিত" : "অপেক্ষমাণ"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Job Applications */}
            <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  সর্বশেষ চাকরির সিভি আবেদন
                </h3>
                <button
                  onClick={() => setActiveTab("applications")}
                  className="text-xs text-[#1677ff] hover:underline"
                >
                  সব দেখুন
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                {applications.slice(0, 4).map((a) => (
                  <div key={a._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{a.applicantName}</p>
                      <p className="text-slate-500 text-[11px] truncate max-w-[200px]">
                        {a.jobTitle} • {a.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        a.status === "shortlisted"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : a.status === "hired"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {a.status === "shortlisted" ? "শর্টলিস্টেড" : a.status === "hired" ? "নিযুক্ত" : "আবেদিত"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: COURSES ──────────────────────────────────────────────────── */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              আইটি পার্কের সকল কোর্স তালিকা
            </h3>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-4 py-2 bg-[#1677ff] hover:bg-[#4096ff] text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> নতুন কোর্স যুক্ত করুন
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((c) => (
              <div
                key={c._id}
                className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#1677ff]">
                      {c.batchNumber}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      ৳ {(c.discountFee || c.courseFee).toLocaleString()}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex justify-between items-center text-xs text-slate-500">
                  <span>ইন্সট্রাক্টর: {c.instructorName}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ভর্তি: {c.enrolledCount || 0} জন
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: ENROLLMENTS ──────────────────────────────────────────────── */}
      {activeTab === "enrollments" && (
        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-[#262626] flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              শিক্ষার্থী কোর্স ভর্তি রেকর্ড তালিকা
            </h3>
            <span className="text-xs text-slate-400">মোট: {enrollments.length} জন</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]">
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">রোল ও তারিখ</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">শিক্ষার্থীর নাম</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">কোর্স ও ব্যাচ</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">পেমেন্ট ও TrxID</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">ফি (টাকা)</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">স্ট্যাটাস</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262626]">
                {enrollments.map((e) => (
                  <tr key={e._id} className="hover:bg-slate-50/50 dark:hover:bg-[#141414]/50">
                    <td className="p-3.5">
                      <p className="font-mono font-bold text-[#1677ff]">{e.admissionRoll}</p>
                      <p className="text-slate-500 text-[11px]">{e.district}</p>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{e.studentName}</p>
                      <p className="text-slate-500 text-[11px]">{e.phone}</p>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
                      {e.courseTitle} ({e.batchNumber})
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold uppercase text-slate-700 dark:text-slate-300">{e.paymentMethod}</span>
                      <p className="text-slate-500 font-mono text-[11px]">{e.transactionId || "N/A"}</p>
                    </td>
                    <td className="p-3.5 font-black text-emerald-600 dark:text-emerald-400">
                      ৳ {e.paidAmount?.toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        e.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}>
                        {e.status === "confirmed" ? "নিশ্চিত" : "পেন্ডিং"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      {e.status === "pending" && (
                        <button
                          onClick={() => handleConfirmEnrollment(e._id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                        >
                          কনফার্ম
                        </button>
                      )}
                      <a
                        href={`tel:${e.phone}`}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300 rounded-lg text-xs"
                      >
                        কল
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 4: JOBS ─────────────────────────────────────────────────────── */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              আইটি জব সার্কুলার তালিকা
            </h3>
            <button
              onClick={() => setShowAddJobModal(true)}
              className="px-4 py-2 bg-[#1677ff] hover:bg-[#4096ff] text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> নতুন চাকরি পোস্ট করুন
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((j) => (
              <div
                key={j._id}
                className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-[#1677ff] uppercase">{j.jobType}</span>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white">{j.title}</h4>
                    <p className="text-xs text-slate-500">{j.companyName} • {j.location}</p>
                  </div>
                  <span className="font-bold text-xs text-emerald-600">{j.salaryRange}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex justify-between items-center text-xs text-slate-500">
                  <span>আবেদনকারী: {j.applicantCount || 0} জন</span>
                  <span>ডেডলাইন: {j.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 5: APPLICATIONS (CVs) ───────────────────────────────────────── */}
      {activeTab === "applications" && (
        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 dark:border-[#262626] flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              চাকরি প্রার্থীদের সিভি ও আবেদন তালিকা
            </h3>
            <span className="text-xs text-slate-400">মোট: {applications.length} টি</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]">
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">প্রার্থীর নাম</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">পদের নাম</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">যোগাযোগ</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">সিভি / পোর্টফোলিও</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">স্ট্যাটাস</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300 text-right">সিদ্ধান্ত</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262626]">
                {applications.map((a) => (
                  <tr key={a._id} className="hover:bg-slate-50/50 dark:hover:bg-[#141414]/50">
                    <td className="p-3.5 font-bold text-slate-900 dark:text-white">{a.applicantName}</td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">{a.jobTitle}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      <p>{a.phone}</p>
                      <p className="text-[11px] text-slate-400">{a.email}</p>
                    </td>
                    <td className="p-3.5">
                      {a.portfolioUrl ? (
                        <a
                          href={a.portfolioUrl}
                          target="_blank"
                          className="text-[#1677ff] underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> লিংক দেখুন
                        </a>
                      ) : (
                        <span className="text-slate-400">লিংক নেই</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        a.status === "shortlisted"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : a.status === "hired"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {a.status === "shortlisted" ? "শর্টলিস্টেড" : a.status === "hired" ? "নিযুক্ত" : "আবেদিত"}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleUpdateAppStatus(a._id, "shortlisted")}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                      >
                        শর্টলিস্ট
                      </button>
                      <button
                        onClick={() => handleUpdateAppStatus(a._id, "rejected")}
                        className="px-2.5 py-1 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 rounded-lg text-xs"
                      >
                        রিজেক্ট
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB 6: EVENTS ───────────────────────────────────────────────────── */}
      {activeTab === "events" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              টেক সেমিনার ও হ্যাকাথন ইভেন্ট
            </h3>
            <span className="text-xs text-slate-400">মোট: {events.length} টি</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((ev) => (
              <div
                key={ev._id}
                className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-[#1677ff] uppercase">{ev.eventType}</span>
                  <span className="font-bold text-xs text-slate-500">{ev.eventDate}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">{ev.title}</h4>
                <p className="text-xs text-slate-500">ভেন্যু: {ev.venue}</p>
                <div className="pt-2 border-t border-slate-100 dark:border-[#262626] flex justify-between items-center text-xs text-slate-500">
                  <span>রেজিস্টার্ড: {ev.registeredCount} / {ev.totalSeats}</span>
                  <span className="text-emerald-600 font-bold">সক্রিয়</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── MODAL 1: ADD COURSE ─────────────────────────────────────────────── */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCourse}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1677ff]" /> নতুন কোর্স যুক্ত করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">কোর্সের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ক্যাটাগরি</label>
                  <select
                    value={courseCategory}
                    onChange={(e) => setCourseCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="web_dev">Web Development</option>
                    <option value="graphics_ui">UI/UX & Graphics</option>
                    <option value="python_ai">Python & AI</option>
                    <option value="digital_marketing">Digital Marketing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">কোর্স ফি (৳)</label>
                  <input
                    type="number"
                    value={courseFee}
                    onChange={(e) => setCourseFee(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ডিসকাউন্ট ফি (৳)</label>
                  <input
                    type="number"
                    value={discountFee}
                    onChange={(e) => setDiscountFee(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">প্রধান প্রশিক্ষক</label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ব্যাচ নম্বর</label>
                  <input
                    type="text"
                    value={batchNo}
                    onChange={(e) => setBatchNo(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">কোর্সের বিবরণ</label>
                <textarea
                  rows={2}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white"
              >
                কোর্স প্রকাশ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL 2: ADD JOB ────────────────────────────────────────────────── */}
      {showAddJobModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateJob}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-500" /> নতুন চাকরির সার্কুলার পোস্ট
              </h3>
              <button
                type="button"
                onClick={() => setShowAddJobModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">পদের নাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: Frontend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">প্রতিষ্ঠান</label>
                  <input
                    type="text"
                    value={jobCompany}
                    onChange={(e) => setJobCompany(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">চাকরির ধরন</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="full_time">Full Time</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contractual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">বেতন সীমা</label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">আবেদনের শেষ তারিখ</label>
                  <input
                    type="text"
                    value={jobDeadline}
                    onChange={(e) => setJobDeadline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">কাজের সংক্ষিপ্ত বিবরণ</label>
                <textarea
                  rows={2}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setShowAddJobModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white"
              >
                সার্কুলার প্রকাশ করুন
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
