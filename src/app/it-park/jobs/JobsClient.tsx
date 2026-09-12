"use client";

import React, { useState, useMemo } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Send,
  Search,
  CheckCircle2,
  ChevronDown,
  X,
  Sparkles,
  ArrowRight,
  Upload,
  Globe,
  FileText
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export interface JobData {
  _id: string;
  title: string;
  companyName: string;
  category: "software_dev" | "ui_ux_design" | "digital_marketing" | "content_writing" | "sqa_testing" | "tech_support";
  jobType: "full_time" | "part_time" | "internship" | "remote" | "contract";
  location: string;
  salaryRange: string;
  experienceLevel: string;
  deadline: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicantCount: number;
  isFeatured?: boolean;
}

const DEFAULT_JOBS: JobData[] = [
  {
    _id: "j1",
    title: "Junior Frontend Developer (React / Next.js)",
    companyName: "BASAR Tech Solutions",
    category: "software_dev",
    jobType: "full_time",
    location: "ফরিদপুর / হাইব্রিড",
    salaryRange: "৳ ২৫,০০০ - ৳ ৩৫,০০০",
    experienceLevel: "১-২ বছর / ফ্রেশার",
    deadline: "২০২৬-১০-৩০",
    description: "আমাদের ই-কমার্স ও লাইব্রেরি প্ল্যাটফর্মের আধুনিক ওয়েব ইউজার ইন্টারফেস তৈরিতে দক্ষ ডেভেলপার আবশ্যক।",
    responsibilities: [
      "React.js, Next.js ও TypeScript দিয়ে রেসপন্সিভ ওয়েব পেজ তৈরি",
      "RESTful API ও ক্লাউড ডেটাবেস ইন্টিগ্রেশন",
      "ক্রস-ব্রাউজার অপটিমাইজেশন ও পারফরম্যান্স টিউনিং",
    ],
    requirements: [
      "HTML5, Tailwind CSS ও আধুনিক JavaScript/TypeScript-এ ভালো দক্ষতা",
      "Git ও GitHub-এর বাস্তব অভিজ্ঞতা",
      "সমস্যা সমাধানে আগ্রহ ও টিমওয়ার্ক মানসিকতা",
    ],
    applicantCount: 14,
    isFeatured: true,
  },
  {
    _id: "j2",
    title: "UI/UX & Product Design Intern",
    companyName: "BASAR IT Hub",
    category: "ui_ux_design",
    jobType: "internship",
    location: "রিমোট (অনলাইন)",
    salaryRange: "৳ ১২,০০০ - ৳ ১৮,০০০ (স্টাইপেন্ড)",
    experienceLevel: "ফ্রেশার / স্টুডেন্ট",
    deadline: "২০২৬-১০-২৫",
    description: "Figma ও ডিজাইন সিস্টেমে দক্ষ শিক্ষার্থী বা নতুনদের জন্য ৩ মাসের পেইড ইন্টার্নশিপ ও স্থায়ী চাকরির সুযোগ।",
    responsibilities: [
      "মোবাইল ও ওয়েব অ্যাপের জন্য মকআপ ও প্রোটোটাইপ ডিজাইন",
      "ইউজার রিসার্চ ও ইউজেবিলিটি ফিডব্যাক বিশ্লেষণ",
    ],
    requirements: [
      "Figma টুলে কাজ করার মৌলিক ধারণা",
      "ডিজাইন পোর্টফোলিও বা বিহান্স লিঙ্ক থাকা আবশ্যক",
    ],
    applicantCount: 26,
    isFeatured: true,
  },
  {
    _id: "j3",
    title: "Digital Marketing & SEO Executive",
    companyName: "BASAR Super Shop & Wings",
    category: "digital_marketing",
    jobType: "full_time",
    location: "ফরিদপুর সদর",
    salaryRange: "৳ ২০,০০০ - ৳ ৩০,০০০",
    experienceLevel: "১+ বছর",
    deadline: "২০২৬-১০-২৮",
    description: "সোশ্যাল মিডিয়া ক্যাম্পেইন পরিচালনা, সার্চ ইঞ্জিন অপটিমাইজেশন এবং কাস্টমার এনগেজমেন্ট বৃদ্ধি।",
    responsibilities: [
      "ফেসবুক ও গুগল অ্যাড ক্যাম্পেইন পরিচালনা ও আরওআই ট্র্যাকিং",
      "অন-পেজ ও অফ-পেজ এসইও স্ট্র্যাটেজি বাস্তবায়ন",
    ],
    requirements: [
      "মেটা অ্যাডস ম্যানেজার ও গুগল অ্যানালিটিক্স ব্যবহার জানতে হবে",
      "বাংলা ও ইংরেজিতে স্পষ্ট কনটেন্ট রাইটিং দক্ষতা",
    ],
    applicantCount: 9,
    isFeatured: false,
  },
];

export default function JobsClient({ initialJobs }: { initialJobs?: JobData[] }) {
  const [jobs, setJobs] = useState<JobData[]>(
    initialJobs && initialJobs.length > 0 ? initialJobs : DEFAULT_JOBS
  );

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedJobType, setSelectedJobType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Application Modal
  const [applyJob, setApplyJob] = useState<JobData | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchCat = selectedCategory === "all" || j.category === selectedCategory;
      const matchType = selectedJobType === "all" || j.jobType === selectedJobType;
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchType && matchSearch;
    });
  }, [jobs, selectedCategory, selectedJobType, searchQuery]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob || !applicantName || !applicantPhone || !applicantEmail) {
      toast.error("অনুগ্রহ করে আপনার নাম, ফোন ও ইমেইল ঠিকানা পূরণ করুন!");
      return;
    }

    const payload = {
      jobId: applyJob._id,
      jobTitle: applyJob.title,
      applicantName,
      phone: applicantPhone,
      email: applicantEmail,
      portfolioUrl,
      githubUrl,
      coverLetter,
      status: "applied",
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch("/api/admin/it-park/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // optimistic
    }

    setApplyJob(null);
    setApplicantName("");
    setApplicantPhone("");
    setApplicantEmail("");
    setPortfolioUrl("");
    setGithubUrl("");
    setCoverLetter("");
    toast.success("আপনার চাকরির আবেদন সফলভাবে গ্রহণ করা হয়েছে!");
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter Controls */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-[#1677ff]" />
              আইটি জব বোর্ড ও ক্যারিয়ার পোর্টাল
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              বাছার গ্রুপ ও সহযোগী প্রযুক্তি প্রতিষ্ঠানে ফুল-টাইম, পার্ট-টাইম ও রিমোট চাকরির সুযোগ
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="পদের নাম, প্রতিষ্ঠান বা লোকেশন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-[#262626]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { key: "all", label: "সকল জব" },
              { key: "software_dev", label: "Software Dev" },
              { key: "ui_ux_design", label: "UI/UX Design" },
              { key: "digital_marketing", label: "Digital Marketing" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-[#1677ff] text-white shadow-sm"
                    : "bg-slate-100 dark:bg-[#141414] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200/60 dark:border-[#2a2a2a]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
          >
            <option value="all">সকল ধরন (All Types)</option>
            <option value="full_time">Full-time</option>
            <option value="remote">Remote (রিমোট)</option>
            <option value="internship">Internship (ইন্টার্নশিপ)</option>
            <option value="contract">Contractual</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((j) => (
          <div
            key={j._id}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm space-y-4 hover:border-[#1677ff]/60 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#1677ff] dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                    {j.jobType === "full_time" ? "Full Time" : j.jobType === "remote" ? "Remote" : "Internship"}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {j.companyName}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {j.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" /> {j.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> {j.salaryRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> অভিজ্ঞতা: {j.experienceLevel}
                  </span>
                  <span>ডেডলাইন: {j.deadline}</span>
                </div>
              </div>

              <button
                onClick={() => setApplyJob(j)}
                className="px-6 py-2.5 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shrink-0 shadow-sm transition-all cursor-pointer"
              >
                আবেদন করুন <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
              {j.description}
            </p>

            {/* Responsibilities & Requirements Quick Bullet Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="space-y-1 bg-slate-50 dark:bg-[#141414] p-3 rounded-xl border border-slate-100 dark:border-[#262626]">
                <strong className="text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                  মূল দায়িত্বসমূহ:
                </strong>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                  {j.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 bg-slate-50 dark:bg-[#141414] p-3 rounded-xl border border-slate-100 dark:border-[#262626]">
                <strong className="text-slate-800 dark:text-slate-200 block text-[11px] uppercase tracking-wider">
                  প্রয়োজনীয় যোগ্যতা:
                </strong>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400 list-disc pl-4">
                  {j.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── MODAL: JOB APPLICATION ─────────────────────────────────────────── */}
      {applyJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleApplySubmit}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  চাকরির অনলাইন আবেদন
                </h3>
                <p className="text-xs text-[#1677ff] font-semibold">{applyJob.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setApplyJob(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">আপনার পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মো. কামরুল হাসান"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">ইমেইল ঠিকানা *</label>
                <input
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">পোর্টফোলিও / সিভি লিংক</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">GitHub / LinkedIn</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">কভার লেটার / সংক্ষিপ্ত পরিচয়</label>
                <textarea
                  rows={3}
                  placeholder="আপনার পূর্ব অভিজ্ঞতা, বিশেষ দক্ষতা ও কেন এই পদের জন্য আপনি উপযুক্ত..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setApplyJob(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> আবেদন জমা দিন
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
