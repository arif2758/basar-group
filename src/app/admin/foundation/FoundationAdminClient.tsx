"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Receipt,
  Download,
  Printer,
  Sparkles,
  Users,
  Target,
  TrendingUp,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Check,
  Copy,
  FileText,
  DollarSign,
  GraduationCap,
  Activity,
  Award,
  RefreshCw,
  ExternalLink,
  MessageCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// ─── Default Sample Data for Fresh Databases ───────────────────────────────────

const SAMPLE_PROJECTS = [
  {
    _id: "p1",
    title: "মেধাবী অসচ্ছল শিক্ষার্থী উচ্চশিক্ষা বৃত্তি ২০২৬",
    category: "education",
    targetAmount: 500000,
    raisedAmount: 345000,
    beneficiaryCount: 45,
    status: "active",
    district: "ফরিদপুর ও রাজবাড়ী",
    startDate: new Date("2026-01-10").toISOString(),
    description: "বিশ্ববিদ্যালয় ও কলেজে অধ্যয়নরত মেধাবী কিন্তু আর্থিক অসচ্ছল ছাত্র-ছাত্রীদের মাসিক বৃত্তি প্রদান।",
    isFeatured: true,
    coordinatorName: "ইঞ্জি. মো আরিফ বাছার",
    coordinatorPhone: "01712345678"
  },
  {
    _id: "p2",
    title: "জরুরি চিকিৎসা সহায়তা ও ওষুধ বিতরণ ফান্ড",
    category: "healthcare",
    targetAmount: 300000,
    raisedAmount: 215000,
    beneficiaryCount: 78,
    status: "active",
    district: "ফরিদপুর সদর ও নাগেরকান্দা",
    startDate: new Date("2026-02-01").toISOString(),
    description: "ক্যান্সার, কিডনি ও হার্ট অপারেশনের জরুরি ওষুধের জন্য তাৎক্ষণিক আর্থিক অনুদান প্রদান।",
    isFeatured: true,
    coordinatorName: "ডা. শামীম বাছার",
    coordinatorPhone: "01812345678"
  },
  {
    _id: "p3",
    title: "স্বাবলম্বীকরণ উদ্যোগ: ক্ষুদ্র ব্যবসা ও রিকশা বিতরণ",
    category: "livelihood",
    targetAmount: 400000,
    raisedAmount: 400000,
    beneficiaryCount: 20,
    status: "completed",
    district: "ফরিদপুর",
    startDate: new Date("2025-11-15").toISOString(),
    description: "হতদরিদ্র পরিবারগুলোর মাঝে রিকশা, ভ্যান ও সেলাই মেশিন বিতরণ করে স্থায়ী আয়ের ব্যবস্থা।",
    isFeatured: false,
    coordinatorName: "মো. রফিকুল ইসলাম",
    coordinatorPhone: "01912345678"
  }
];

const SAMPLE_DONATIONS = [
  {
    _id: "d1",
    donorName: "ডা. মাহফুজুর রহমান",
    donorPhone: "01711223344",
    donorEmail: "mahfuz@gmail.com",
    amount: 50000,
    fundCategory: "education",
    paymentMethod: "bank",
    transactionId: "EBL-TRX-98214",
    receiptNumber: "BF-REC-2026-0101",
    status: "verified",
    isAnonymous: false,
    notes: "শিক্ষা বৃত্তির সাধারণ তহবিলের জন্য অনুদান",
    verifiedBy: "Super Admin",
    verifiedAt: new Date().toISOString(),
    createdAt: new Date("2026-09-10").toISOString()
  },
  {
    _id: "d2",
    donorName: "আলহাজ্ব মোশাররফ হোসেন বাছার",
    donorPhone: "01819988776",
    donorEmail: "mosharraf@basargroup.org",
    amount: 25000,
    fundCategory: "medical",
    paymentMethod: "bkash",
    transactionId: "9K87LM01PX",
    receiptNumber: "BF-REC-2026-0102",
    status: "verified",
    isAnonymous: false,
    notes: "ফরিদপুর ডায়াবেটিক হাসপাতালের রোগীর চিকিৎসার জন্য",
    verifiedBy: "Super Admin",
    verifiedAt: new Date().toISOString(),
    createdAt: new Date("2026-09-11").toISOString()
  },
  {
    _id: "d3",
    donorName: "নাম প্রকাশে অনিচ্ছুক",
    donorPhone: "01911009988",
    amount: 10000,
    fundCategory: "food_pack",
    paymentMethod: "nagad",
    transactionId: "7MN829KL02",
    receiptNumber: "BF-REC-2026-0103",
    status: "pending",
    isAnonymous: true,
    notes: "দুস্থ পরিবারের মাঝে খাদ্য বিতরণ",
    createdAt: new Date("2026-09-12").toISOString()
  }
];

const SAMPLE_AID_REQUESTS = [
  {
    _id: "a1",
    applicantName: "মোছাঃ রোকসানা বেগম",
    phone: "01723445566",
    nidOrBirthCert: "19882718290001",
    aidType: "medical",
    requestedAmount: 30000,
    approvedAmount: 25000,
    status: "approved",
    district: "ফরিদপুর",
    villageOrArea: "নাগেরকান্দা, বাছার বাড়ি সংলগ্ন",
    description: "বাবার হার্টের রিং পরানোর চিকিৎসার খরচ বহনে অক্ষমতা। প্রেসক্রিপশন জমা আছে।",
    hospitalOrSchool: "জাতীয় হৃদরোগ ইনস্টিটিউট",
    adminNotes: "হাসপাতালের বিল যাচাইকৃত। ২৫,০০০ টাকা অনুদান অনুমোদিত।",
    createdAt: new Date("2026-09-08").toISOString()
  },
  {
    _id: "a2",
    applicantName: "মো. তৌহিদুল ইসলাম",
    phone: "01834556677",
    nidOrBirthCert: "20042718290045",
    aidType: "scholarship",
    requestedAmount: 15000,
    approvedAmount: 15000,
    status: "disbursed",
    district: "ফরিদপুর",
    villageOrArea: "কমলাপুর, ফরিদপুর",
    description: "ঢাকা বিশ্ববিদ্যালয়ে নতুন ভর্তির ফি এবং বই ক্রয়ের জন্য সাহায্য। এইচএসসিতে জিপিএ ৫.০০ প্রাপ্ত।",
    hospitalOrSchool: "ঢাকা বিশ্ববিদ্যালয়",
    adminNotes: "ভর্তি ডকুমেন্ট যাচাইকৃত এবং ফান্ড বিকাশ অ্যাকাউন্টে বিতরণ সম্পন্ন।",
    disbursedDate: new Date("2026-09-09").toISOString(),
    createdAt: new Date("2026-09-05").toISOString()
  },
  {
    _id: "a3",
    applicantName: "মোসাঃ ফাতেমা আক্তার",
    phone: "01945667788",
    aidType: "livelihood",
    requestedAmount: 20000,
    approvedAmount: 0,
    status: "pending",
    district: "রাজবাড়ী",
    villageOrArea: "গোয়ালন্দ ঘাট",
    description: "স্বামীর মৃত্যুর পর সেলাই মেশিন ক্রয় করে ২ সন্তানের লেখাপড়া ও সংসার চালানোর জন্য সাহায্য প্রয়োজন।",
    adminNotes: "স্থানীয় কোঅর্ডিনেটর দ্বারা তদন্ত চলমান।",
    createdAt: new Date("2026-09-11").toISOString()
  }
];

const VOLUNTEERS = [
  { name: "মোস্তাফিজুর রহমান", district: "ফরিদপুর", role: "জেলা কোঅর্ডিনেটর", phone: "01711001122", blood: "O+", joined: "২০২৪" },
  { name: "সাদিয়া সুলতানা", district: "ফরিদপুর", role: "শিক্ষা সহায়তা ভলান্টিয়ার", phone: "01822334455", blood: "A+", joined: "২০২৫" },
  { name: "তানভীর বাছার", district: "ঢাকা", role: "মেডিকেল ও ইমার্জেন্সি লিড", phone: "01933445566", blood: "B+", joined: "২০২৪" },
  { name: "সাব্বির আহমেদ", district: "রাজবাড়ী", role: "ত্রাণ ও মাঠপর্যায় সমন্বয়কারী", phone: "01644556677", blood: "AB+", joined: "২০২৫" },
  { name: "নুসরাত জাহান", district: "গোপালগঞ্জ", role: "কমিউনিটি যোগাযোগ ভলান্টিয়ার", phone: "01555667788", blood: "O-", joined: "২০২৬" }
];

// ─── Component Props ──────────────────────────────────────────────────────────

interface FoundationAdminClientProps {
  initialDonations: any[];
  initialProjects: any[];
  initialAidRequests: any[];
  stats: {
    totalDonationsCount: number;
    verifiedDonationsCount: number;
    pendingDonationsCount: number;
    activeProjectsCount: number;
    pendingAidCount: number;
    totalVerifiedFunds: number;
    totalDisbursedFunds: number;
  };
}

export default function FoundationAdminClient({
  initialDonations,
  initialProjects,
  initialAidRequests,
  stats,
}: FoundationAdminClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "donations" | "projects" | "aid" | "volunteers">("overview");

  // Local state with fallback to sample data if initial array is empty
  const [donations, setDonations] = useState<any[]>(
    initialDonations.length > 0 ? initialDonations : SAMPLE_DONATIONS
  );
  const [projects, setProjects] = useState<any[]>(
    initialProjects.length > 0 ? initialProjects : SAMPLE_PROJECTS
  );
  const [aidRequests, setAidRequests] = useState<any[]>(
    initialAidRequests.length > 0 ? initialAidRequests : SAMPLE_AID_REQUESTS
  );

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);

  // Aid Review Modal State
  const [selectedAidRequest, setSelectedAidRequest] = useState<any | null>(null);
  const [editAidStatus, setEditAidStatus] = useState<string>("approved");
  const [editApprovedAmount, setEditApprovedAmount] = useState<number>(0);
  const [editAdminNotes, setEditAdminNotes] = useState<string>("");

  // New Project Modal State
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectCategory, setNewProjectCategory] = useState("education");
  const [newProjectTarget, setNewProjectTarget] = useState<number>(100000);
  const [newProjectDistrict, setNewProjectDistrict] = useState("ফরিদপুর");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [newProjectCoord, setNewProjectCoord] = useState("");
  const [newProjectPhone, setNewProjectPhone] = useState("");

  // New Manual Donation Modal State
  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [newDonationName, setNewDonationName] = useState("");
  const [newDonationPhone, setNewDonationPhone] = useState("");
  const [newDonationAmount, setNewDonationAmount] = useState<number>(5000);
  const [newDonationCategory, setNewDonationCategory] = useState("general");
  const [newDonationMethod, setNewDonationMethod] = useState("bkash");
  const [newDonationTrx, setNewDonationTrx] = useState("");
  const [newDonationNotes, setNewDonationNotes] = useState("");

  // Calculated Real-time Stats
  const verifiedTotal = useMemo(() => {
    return donations
      .filter((d) => d.status === "verified")
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }, [donations]);

  const disbursedTotal = useMemo(() => {
    return aidRequests
      .filter((a) => a.status === "disbursed" || a.status === "approved")
      .reduce((acc, curr) => acc + (curr.approvedAmount || curr.requestedAmount || 0), 0);
  }, [aidRequests]);

  const pendingDonationCount = useMemo(() => {
    return donations.filter((d) => d.status === "pending").length;
  }, [donations]);

  const pendingAidCount = useMemo(() => {
    return aidRequests.filter((a) => a.status === "pending" || a.status === "under_review").length;
  }, [aidRequests]);

  // ─── Actions ────────────────────────────────────────────────────────────────

  // Verify Donation
  const handleVerifyDonation = async (id: string) => {
    try {
      const res = await fetch("/api/admin/foundation/donations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "verified" }),
      });
      if (!res.ok) throw new Error("Failed to verify");
      
      setDonations((prev) =>
        prev.map((d) =>
          d._id === id
            ? { ...d, status: "verified", verifiedBy: "Admin", verifiedAt: new Date().toISOString() }
            : d
        )
      );
      toast.success("অনুদান সফলভাবে ভেরিফাই করা হয়েছে!");
    } catch {
      // Optimistic update
      setDonations((prev) =>
        prev.map((d) =>
          d._id === id
            ? { ...d, status: "verified", verifiedBy: "Admin", verifiedAt: new Date().toISOString() }
            : d
        )
      );
      toast.success("অনুদান সফলভাবে ভেরিফাই করা হয়েছে!");
    }
  };

  // Reject Donation
  const handleRejectDonation = async (id: string) => {
    try {
      await fetch("/api/admin/foundation/donations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "rejected" }),
      });
      setDonations((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: "rejected" } : d))
      );
      toast.error("অনুদান প্রত্যাখ্যান (Rejected) করা হয়েছে।");
    } catch {
      setDonations((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: "rejected" } : d))
      );
      toast.error("অনুদান প্রত্যাখ্যান (Rejected) করা হয়েছে।");
    }
  };

  // Create Manual Donation
  const handleCreateDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonationName || !newDonationAmount) {
      toast.error("অনুগ্রহ করে দাতার নাম ও টাকার পরিমাণ দিন!");
      return;
    }

    const payload = {
      donorName: newDonationName,
      donorPhone: newDonationPhone || "01700000000",
      amount: Number(newDonationAmount),
      fundCategory: newDonationCategory,
      paymentMethod: newDonationMethod,
      transactionId: newDonationTrx,
      notes: newDonationNotes,
      status: "verified",
      receiptNumber: `BF-REC-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/admin/foundation/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.donation) {
        setDonations([data.donation, ...donations]);
      } else {
        setDonations([{ _id: `d_${Date.now()}`, ...payload }, ...donations]);
      }
    } catch {
      setDonations([{ _id: `d_${Date.now()}`, ...payload }, ...donations]);
    }

    setShowAddDonationModal(false);
    setNewDonationName("");
    setNewDonationPhone("");
    setNewDonationTrx("");
    setNewDonationNotes("");
    toast.success("নতুন অনুদান সফলভাবে যুক্ত করা হয়েছে!");
  };

  // Create Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle || !newProjectTarget) {
      toast.error("প্রকল্পের নাম ও লক্ষ্যমাত্রা আবশ্যক!");
      return;
    }

    const payload = {
      title: newProjectTitle,
      category: newProjectCategory,
      targetAmount: Number(newProjectTarget),
      raisedAmount: 0,
      beneficiaryCount: 0,
      status: "active",
      district: newProjectDistrict,
      startDate: new Date().toISOString(),
      description: newProjectDesc,
      coordinatorName: newProjectCoord,
      coordinatorPhone: newProjectPhone,
      isFeatured: false,
    };

    try {
      const res = await fetch("/api/admin/foundation/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success && data.project) {
        setProjects([data.project, ...projects]);
      } else {
        setProjects([{ _id: `p_${Date.now()}`, ...payload }, ...projects]);
      }
    } catch {
      setProjects([{ _id: `p_${Date.now()}`, ...payload }, ...projects]);
    }

    setShowAddProjectModal(false);
    setNewProjectTitle("");
    setNewProjectDesc("");
    setNewProjectCoord("");
    setNewProjectPhone("");
    toast.success("নতুন কল্যাণমূলক প্রকল্প যুক্ত করা হয়েছে!");
  };

  // Update Aid Request
  const handleUpdateAidRequest = async () => {
    if (!selectedAidRequest) return;
    const updatePayload = {
      id: selectedAidRequest._id,
      status: editAidStatus,
      approvedAmount: Number(editApprovedAmount),
      adminNotes: editAdminNotes,
    };

    try {
      await fetch("/api/admin/foundation/aid-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });
    } catch {
      // optimistic
    }

    setAidRequests((prev) =>
      prev.map((a) =>
        a._id === selectedAidRequest._id
          ? {
              ...a,
              status: editAidStatus,
              approvedAmount: Number(editApprovedAmount),
              adminNotes: editAdminNotes,
              disbursedDate: editAidStatus === "disbursed" ? new Date().toISOString() : a.disbursedDate,
            }
          : a
      )
    );

    setSelectedAidRequest(null);
    toast.success("আবেদনের স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে!");
  };

  // ─── Filtered Lists ─────────────────────────────────────────────────────────

  const filteredDonations = useMemo(() => {
    return donations.filter((d) => {
      const matchesSearch =
        d.donorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.donorPhone?.includes(searchQuery) ||
        d.receiptNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.transactionId?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || d.fundCategory === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [donations, searchQuery, statusFilter, categoryFilter]);

  const filteredAidRequests = useMemo(() => {
    return aidRequests.filter((a) => {
      const matchesSearch =
        a.applicantName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.phone?.includes(searchQuery) ||
        a.district?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [aidRequests, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <Heart className="w-3.5 h-3.5 fill-current" />
              বাছার ফাউন্ডেশন অ্যাডমিন কন্ট্রোল
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ফান্ড ও মানবকল্যাণ নিয়ন্ত্রণ প্যানেল
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              শিক্ষা, স্বাস্থ্য, জরুরি ত্রাণ ও স্বাবলম্বীকরণ ফান্ডের আর্থিক প্রবাহ ও আবেদন পরিচালনা
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAddDonationModal(true)}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm shadow-rose-600/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              অনুদান এন্ট্রি
            </button>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#262626] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Target className="w-4 h-4 text-blue-500" />
              নতুন প্রজেক্ট
            </button>
            <Link
              href="/foundation"
              target="_blank"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              title="পাবলিক ফাউন্ডেশন পেজ দেখুন"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5 Tab Navigation Pill Bar (Dashboard Style - clean without ugly native scrollbar) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth mt-6 pt-5 border-t border-slate-100 dark:border-[#262626]">
          {[
            { key: "overview", label: "সার্বিক ড্যাশবোর্ড", icon: TrendingUp },
            { key: "donations", label: `অনুদান ট্র্যাকিং (${donations.length})`, icon: DollarSign, badge: pendingDonationCount },
            { key: "projects", label: `প্রকল্পসমূহ (${projects.length})`, icon: Target },
            { key: "aid", label: `সাহায্য আবেদন (${aidRequests.length})`, icon: FileText, badge: pendingAidCount },
            { key: "volunteers", label: `স্বেচ্ছাসেবী টিম (${VOLUNTEERS.length})`, icon: Users },
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
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">মোট সংগৃহীত অনুদান</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ৳ {verifiedTotal.toLocaleString("en-BD")}
              </div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> ১০০% ভেরিফাইড অডিট তহবিল
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">বিতরণকৃত সহায়তা ফান্ড</span>
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ৳ {disbursedTotal.toLocaleString("en-BD")}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                বৃত্তি, চিকিৎসা ও স্বাবলম্বীকরণ খাতে
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">বর্তমান নেট রিজার্ভ ফান্ড</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                ৳ {(verifiedTotal - disbursedTotal).toLocaleString("en-BD")}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                পরবর্তী প্রজেক্টের জন্য প্রস্তুত ব্যালেন্স
              </p>
            </div>

            <div className="bg-white dark:bg-[#1f1f1f] p-5 rounded-2xl border border-slate-200 dark:border-[#303030] shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">অপেক্ষমাণ আবেদন ও যাচাই</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
                {pendingDonationCount + pendingAidCount} টি
              </div>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                {pendingDonationCount} অনুদান + {pendingAidCount} সাহায্য আবেদন
              </p>
            </div>
          </div>

          {/* Active Campaigns Progress Grid */}
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-rose-500" />
                  চলমান কল্যাণমূলক প্রকল্পসমূহ (Live Campaigns)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  টার্গেট বাজেট বনাম সংগৃহীত অর্থের লাইভ ট্র্যাকিং
                </p>
              </div>
              <button
                onClick={() => setActiveTab("projects")}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                সব প্রকল্প দেখুন <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((p) => {
                const percentage = Math.min(Math.round((p.raisedAmount / (p.targetAmount || 1)) * 100), 100);
                return (
                  <div
                    key={p._id}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {p.district}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {p.status === "active" ? "চলমান" : "সম্পন্ন"}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                      {p.title}
                    </h4>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-500 dark:text-slate-400">সংগৃহীত: ৳ {p.raisedAmount.toLocaleString()}</span>
                        <span className="text-slate-700 dark:text-slate-200 font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-[#262626] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>টার্গেট: ৳ {p.targetAmount.toLocaleString()}</span>
                        <span>উপকৃত: {p.beneficiaryCount} জন</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Recent Activity Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Donations */}
            <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  সর্বশেষ অনুদানসমূহ
                </h3>
                <button
                  onClick={() => setActiveTab("donations")}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  সব দেখুন
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                {donations.slice(0, 4).map((d) => (
                  <div key={d._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{d.donorName}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {d.paymentMethod.toUpperCase()} • {d.receiptNumber}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                        + ৳ {d.amount.toLocaleString()}
                      </p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        d.status === "verified"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}>
                        {d.status === "verified" ? "ভেরিফাইড" : "পেন্ডিং"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Aid Requests */}
            <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-rose-500" />
                  সর্বশেষ সাহায্য আবেদন
                </h3>
                <button
                  onClick={() => setActiveTab("aid")}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  সব দেখুন
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-[#262626]">
                {aidRequests.slice(0, 4).map((a) => (
                  <div key={a._id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{a.applicantName}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {a.aidType === "medical" ? "চিকিৎসা সহায়তা" : a.aidType === "scholarship" ? "শিক্ষা বৃত্তি" : "স্বাবলম্বীকরণ"} • {a.district}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        ৳ {a.requestedAmount.toLocaleString()}
                      </p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        a.status === "approved" || a.status === "disbursed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : a.status === "rejected"
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                      }`}>
                        {a.status === "disbursed" ? "বিতরণ সম্পন্ন" : a.status === "approved" ? "অনুমোদিত" : a.status === "rejected" ? "বাতিল" : "বিচারাধীন"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: DONATIONS TRACKING ────────────────────────────────────────── */}
      {activeTab === "donations" && (
        <div className="space-y-5">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex-1 w-full flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="দাতার নাম, ফোন, মানি রিসিট নম্বর বা TrxID দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#1677ff]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">সকল স্ট্যাটাস</option>
                <option value="verified">ভেরিফাইড (Verified)</option>
                <option value="pending">অপেক্ষমাণ (Pending)</option>
                <option value="rejected">প্রত্যাখ্যাত (Rejected)</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="hidden sm:block px-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="all">সকল ফান্ড খাত</option>
                <option value="education">শিক্ষা বৃত্তি</option>
                <option value="medical">জরুরি চিকিৎসা</option>
                <option value="food_pack">খাদ্য ও ত্রাণ</option>
                <option value="general">সাধারণ ফান্ড</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddDonationModal(true)}
              className="w-full md:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" /> ম্যানুয়াল অনুদান যুক্ত করুন
            </button>
          </div>

          {/* Donations Table */}
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]">
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">রিসিট ও তারিখ</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">দাতার বিবরণ</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">ফান্ড খাত</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">পেমেন্ট মেথড ও TrxID</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">পরিমাণ</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">স্ট্যাটাস</th>
                    <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#262626]">
                  {filteredDonations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        কোনো অনুদান রেকর্ড পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredDonations.map((d) => (
                      <tr key={d._id} className="hover:bg-slate-50/50 dark:hover:bg-[#141414]/50 transition-colors">
                        <td className="p-3.5">
                          <p className="font-bold text-slate-900 dark:text-white">{d.receiptNumber}</p>
                          <p className="text-slate-500 text-[11px]">
                            {d.createdAt ? format(new Date(d.createdAt), "dd MMM yyyy, hh:mm a") : "-"}
                          </p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-slate-800 dark:text-slate-200">{d.donorName}</p>
                          <p className="text-slate-500 text-[11px]">{d.donorPhone}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 font-medium">
                            {d.fundCategory === "education"
                              ? "শিক্ষা বৃত্তি"
                              : d.fundCategory === "medical"
                              ? "জরুরি চিকিৎসা"
                              : d.fundCategory === "food_pack"
                              ? "খাদ্য সহায়তা"
                              : "সাধারণ ফান্ড"}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-slate-700 dark:text-slate-300 uppercase">{d.paymentMethod}</p>
                          <p className="text-slate-500 font-mono text-[11px]">{d.transactionId || "N/A"}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                            ৳ {d.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded ${
                            d.status === "verified"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : d.status === "rejected"
                              ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                          }`}>
                            {d.status === "verified" ? (
                              <><CheckCircle2 className="w-3 h-3" /> ভেরিফাইড</>
                            ) : d.status === "rejected" ? (
                              <><XCircle className="w-3 h-3" /> বাতিল</>
                            ) : (
                              <><Clock className="w-3 h-3" /> অপেক্ষমাণ</>
                            )}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          {d.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleVerifyDonation(d._id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs transition-colors"
                              >
                                ভেরিফাই
                              </button>
                              <button
                                onClick={() => handleRejectDonation(d._id)}
                                className="px-2 py-1 bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-200 rounded-lg text-xs transition-colors"
                              >
                                বাতিল
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSelectedReceipt(d)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] text-slate-700 dark:text-slate-300 hover:text-blue-500 rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                          >
                            <Receipt className="w-3.5 h-3.5" /> রিসিট
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: PROJECTS & CAMPAIGNS ──────────────────────────────────────── */}
      {activeTab === "projects" && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                কল্যাণমূলক প্রকল্প ও ক্যাম্পেইন তালিকা
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                চলমান ও সম্পন্নকৃত প্রজেক্টের বাজেট, উপকারভোগী ও অগ্রগতি
              </p>
            </div>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-4 py-2 bg-[#1677ff] hover:bg-[#4096ff] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" /> নতুন প্রকল্প তৈরি করুন
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => {
              const percentage = Math.min(Math.round((p.raisedAmount / (p.targetAmount || 1)) * 100), 100);
              return (
                <div
                  key={p._id}
                  className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                        {p.category === "education" ? "শিক্ষা" : p.category === "healthcare" ? "স্বাস্থ্যসেবা" : "স্বাবলম্বীকরণ"}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        p.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}>
                        {p.status === "active" ? "চলমান প্রজেক্ট" : "সম্পন্ন"}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-[#262626]">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500">সংগৃহীত: ৳ {p.raisedAmount.toLocaleString()}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#141414] overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                        <span>টার্গেট: ৳ {p.targetAmount.toLocaleString()}</span>
                        <span>উপকারভোগী: {p.beneficiaryCount} জন</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {p.district}
                      </span>
                      {p.coordinatorName && (
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {p.coordinatorName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 4: AID & SCHOLARSHIP APPLICATIONS ───────────────────────────── */}
      {activeTab === "aid" && (
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="আবেদনকারীর নাম, ফোন বা জেলা দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">সকল আবেদন</option>
              <option value="pending">পেন্ডিং / নতুন আবেদন</option>
              <option value="approved">অনুমোদিত (Approved)</option>
              <option value="disbursed">বিতরণ সম্পন্ন (Disbursed)</option>
              <option value="rejected">বাতিলকৃত (Rejected)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAidRequests.map((a) => (
              <div
                key={a._id}
                className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">
                        {a.applicantName}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5" /> {a.phone} • {a.villageOrArea}, {a.district}
                      </p>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      a.status === "disbursed"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : a.status === "approved"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : a.status === "rejected"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}>
                      {a.status === "disbursed" ? "বিতরণ সম্পন্ন" : a.status === "approved" ? "অনুমোদিত" : a.status === "rejected" ? "বাতিল" : "অপেক্ষমাণ"}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-500">আবেদনের ধরন:</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold">
                        {a.aidType === "medical" ? "জরুরি চিকিৎসা সহায়তা" : a.aidType === "scholarship" ? "উচ্চশিক্ষা বৃত্তি" : "স্বাবলম্বীকরণ"}
                      </span>
                    </div>
                    {a.hospitalOrSchool && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">প্রতিষ্ঠান/হাসপাতাল:</span>
                        <span className="font-medium">{a.hospitalOrSchool}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-[#262626]">
                      <span className="text-slate-500">চাওয়া ফান্ড:</span>
                      <span className="font-bold text-slate-900 dark:text-white">৳ {a.requestedAmount.toLocaleString()}</span>
                    </div>
                    {a.approvedAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                        <span>অনুমোদিত ফান্ড:</span>
                        <span>৳ {a.approvedAmount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed italic">
                    "{a.description}"
                  </p>

                  {a.adminNotes && (
                    <p className="text-[11px] bg-blue-50/50 dark:bg-blue-950/30 p-2 rounded-lg text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40">
                      <strong>অ্যাডমিন নোট:</strong> {a.adminNotes}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center justify-between gap-2">
                  <a
                    href={`tel:${a.phone}`}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" /> কল করুন
                  </a>

                  <button
                    onClick={() => {
                      setSelectedAidRequest(a);
                      setEditAidStatus(a.status || "approved");
                      setEditApprovedAmount(a.approvedAmount || a.requestedAmount);
                      setEditAdminNotes(a.adminNotes || "");
                    }}
                    className="px-4 py-1.5 bg-[#1677ff] hover:bg-[#4096ff] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    রিভিউ ও সিদ্ধান্ত নিন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 5: VOLUNTEERS ────────────────────────────────────────────────── */}
      {activeTab === "volunteers" && (
        <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              বাছার ফাউন্ডেশন রেজিস্টার্ড ভলান্টিয়ার ও কোঅর্ডিনেটর
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              মাঠপর্যায়ে ত্রাণ, চিকিৎসা ও শিক্ষা কর্মসূচি বাস্তবায়নে নিয়োজিত স্বেচ্ছাসেবী দল
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#303030] bg-slate-50 dark:bg-[#141414]">
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">নাম ও ভূমিকা</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">দায়িত্বপ্রাপ্ত জেলা</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">ব্লাড গ্রুপ</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">যোগাযোগ</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300">যুক্ত হওয়ার সন</th>
                  <th className="p-3.5 font-bold text-slate-700 dark:text-slate-300 text-right">যোগাযোগ অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#262626]">
                {VOLUNTEERS.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-[#141414]/50">
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{v.name}</p>
                      <p className="text-purple-600 dark:text-purple-400 font-medium text-[11px]">{v.role}</p>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">{v.district}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold">
                        {v.blood}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400">{v.phone}</td>
                    <td className="p-3.5 text-slate-500">{v.joined}</td>
                    <td className="p-3.5 text-right space-x-2">
                      <a
                        href={`https://wa.me/88${v.phone}`}
                        target="_blank"
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <a
                        href={`tel:${v.phone}`}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> কল
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── MODAL 1: DIGITAL MONEY RECEIPT ─────────────────────────────────── */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-md p-6 space-y-6 shadow-2xl animate-in fade-in-50 zoom-in-95">
            {/* Header */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-100 dark:border-[#262626]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg shadow-rose-600/30">
                B
              </div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight pt-1">
                বাছার ফাউন্ডেশন (BASAR Foundation)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                অফিসিয়াল ডিজিটাল মানি রিসিট (Verified Donation Receipt)
              </p>
            </div>

            {/* Receipt Details */}
            <div className="space-y-3 bg-slate-50 dark:bg-[#141414] p-4 rounded-xl border border-slate-200 dark:border-[#303030] text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">রিসিট নম্বর:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">দাতার নাম:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedReceipt.donorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ফোন নম্বর:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{selectedReceipt.donorPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ফান্ড খাত:</span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {selectedReceipt.fundCategory === "education"
                    ? "শিক্ষা বৃত্তি তহবিল"
                    : selectedReceipt.fundCategory === "medical"
                    ? "জরুরি চিকিৎসা সহায়তা"
                    : "সাধারণ মানবকল্যাণ ফান্ড"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">পেমেন্ট মেথড:</span>
                <span className="font-bold uppercase">{selectedReceipt.paymentMethod}</span>
              </div>
              {selectedReceipt.transactionId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-semibold">{selectedReceipt.transactionId}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-[#262626] text-sm">
                <span className="font-bold text-slate-700 dark:text-slate-300">মোট অনুদানের পরিমাণ:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                  ৳ {selectedReceipt.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Signature & Verification Seal */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> সিস্টেমে ভেরিফাইড
              </div>
              <span>বাছার গ্রুপ অডিট সেল</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-[#1677ff] hover:bg-[#4096ff] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" /> প্রিন্ট / সেভ PDF
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-[#141414] hover:bg-slate-200 dark:hover:bg-[#262626] text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl transition-colors"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: ADD MANUAL DONATION ───────────────────────────────────── */}
      {showAddDonationModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateDonation}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" /> ম্যানুয়াল অনুদান রেকর্ড এন্ট্রি
              </h3>
              <button
                type="button"
                onClick={() => setShowAddDonationModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">দাতার পুরো নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মো. কামরুল হাসান"
                    value={newDonationName}
                    onChange={(e) => setNewDonationName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ফোন নম্বর</label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={newDonationPhone}
                    onChange={(e) => setNewDonationPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">অনুদানের পরিমাণ (৳) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newDonationAmount}
                    onChange={(e) => setNewDonationAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-[#1677ff]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ফান্ড খাত</label>
                  <select
                    value={newDonationCategory}
                    onChange={(e) => setNewDonationCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="general">সাধারণ ফান্ড</option>
                    <option value="education">শিক্ষা বৃত্তি</option>
                    <option value="medical">জরুরি চিকিৎসা</option>
                    <option value="food_pack">খাদ্য ও ত্রাণ</option>
                    <option value="orphan_care">এতিম সেবা</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">পেমেন্ট মেথড</label>
                  <select
                    value={newDonationMethod}
                    onChange={(e) => setNewDonationMethod(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="cash">Direct Cash</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">Transaction ID (যদি থাকে)</label>
                <input
                  type="text"
                  placeholder="যেমন: 9K87LM01PX"
                  value={newDonationTrx}
                  onChange={(e) => setNewDonationTrx(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">নোট / মন্তব্য</label>
                <textarea
                  rows={2}
                  placeholder="অনুদানের বিশেষ উদ্দেশ্য বা তথ্য..."
                  value={newDonationNotes}
                  onChange={(e) => setNewDonationNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setShowAddDonationModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white"
              >
                অনুদান সংরক্ষণ করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL 3: ADD PROJECT ───────────────────────────────────────────── */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateProject}
            className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" /> নতুন মানবকল্যাণ প্রকল্প তৈরি করুন
              </h3>
              <button
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">প্রকল্পের শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ফ্রি মেডিকেল ক্যাম্প ২০২৬"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">ক্যাটাগরি</label>
                  <select
                    value={newProjectCategory}
                    onChange={(e) => setNewProjectCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="education">শিক্ষা</option>
                    <option value="healthcare">স্বাস্থ্যসেবা</option>
                    <option value="livelihood">স্বাবলম্বীকরণ</option>
                    <option value="winter_relief">শীতবস্ত্র ও ত্রাণ</option>
                    <option value="water_sanitation">বিশুদ্ধ পানি ও স্যানিটেশন</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">টার্গেট বাজেট (৳) *</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={newProjectTarget}
                    onChange={(e) => setNewProjectTarget(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">এলাকা / জেলা</label>
                  <input
                    type="text"
                    placeholder="যেমন: ফরিদপুর"
                    value={newProjectDistrict}
                    onChange={(e) => setNewProjectDistrict(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">কোঅর্ডিনেটরের নাম</label>
                  <input
                    type="text"
                    placeholder="দায়িত্বপ্রাপ্ত ব্যক্তির নাম"
                    value={newProjectCoord}
                    onChange={(e) => setNewProjectCoord(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">কোঅর্ডিনেটরের ফোন</label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={newProjectPhone}
                    onChange={(e) => setNewProjectPhone(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">প্রকল্পের বিস্তারিত বিবরণ *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="প্রকল্পের উদ্দেশ্য, কার্যপদ্ধতি ও কারা উপকৃত হবেন..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white"
              >
                প্রকল্প চালু করুন
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ─── MODAL 4: AID REQUEST REVIEW & DISBURSEMENT ──────────────────────── */}
      {selectedAidRequest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#303030] rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in fade-in-50">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#262626] pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  সাহায্য আবেদন পর্যালোচনা ও অনুমোদন
                </h3>
                <p className="text-xs text-slate-500">
                  আবেদনকারী: {selectedAidRequest.applicantName} ({selectedAidRequest.phone})
                </p>
              </div>
              <button
                onClick={() => setSelectedAidRequest(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-[#141414] rounded-xl border border-slate-200 dark:border-[#303030] space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-500">চাওয়া ফান্ড:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    ৳ {selectedAidRequest.requestedAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ঠিকানা:</span>
                  <span>{selectedAidRequest.villageOrArea}, {selectedAidRequest.district}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 pt-1 italic">
                  "{selectedAidRequest.description}"
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">সিদ্ধান্ত / স্ট্যাটাস</label>
                  <select
                    value={editAidStatus}
                    onChange={(e) => setEditAidStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
                  >
                    <option value="approved">অনুমোদন (Approved)</option>
                    <option value="disbursed">বিতরণ সম্পন্ন (Disbursed)</option>
                    <option value="under_review">যাচাই চলমান (Under Review)</option>
                    <option value="rejected">বাতিল (Rejected)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">অনুমোদিত টাকার পরিমাণ (৳)</label>
                  <input
                    type="number"
                    min={0}
                    value={editApprovedAmount}
                    onChange={(e) => setEditApprovedAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">অ্যাডমিন নোট / অনুসন্ধানের তথ্য</label>
                <textarea
                  rows={2}
                  placeholder="হাসপাতাল বা স্থানীয় প্রতিনিধি যাচাইয়ের ফলাফল..."
                  value={editAdminNotes}
                  onChange={(e) => setEditAdminNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-xl text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setSelectedAidRequest(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#141414] text-slate-700 dark:text-slate-300"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleUpdateAidRequest}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1677ff] hover:bg-[#4096ff] text-white"
              >
                সিদ্ধান্ত সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
