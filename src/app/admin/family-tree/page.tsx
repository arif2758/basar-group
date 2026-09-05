"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Edit3,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Database,
  Download,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  GitBranch,
  Phone,
  Briefcase,
  MapPin,
  Heart,
  Save,
  X,
  PlusCircle,
} from "lucide-react";
import { FlatFamilyMember } from "@/data/familyData";
import {
  getGenerationLabel,
  getGenerationColor,
  generateNextChildKey,
  parseMemberKeyInfo,
} from "@/utils/familyUtils";

interface MemberRequestItem {
  id: string;
  title: string;
  gender: "male" | "female";
  parentKey: string;
  parentName?: string;
  suggestedKey?: string;
  birthYear?: string;
  deathYear?: string;
  isAlive?: boolean;
  phone?: string;
  address?: string;
  profession?: string;
  spouse?: string;
  bio?: string;
  submitterName?: string;
  submitterPhone?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

export default function AdminFamilyTreePage() {
  const [activeTab, setActiveTab] = useState<"requests" | "members" | "add" | "db">("requests");

  // Data states
  const [members, setMembers] = useState<FlatFamilyMember[]>([]);
  const [requests, setRequests] = useState<MemberRequestItem[]>([]);
  const [dataSource, setDataSource] = useState<"mongodb" | "fallback">("mongodb");
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Search and filters for members tab
  const [memberSearch, setMemberSearch] = useState("");
  const [generationFilter, setGenerationFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Requests filter
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  // Modals state
  const [editingMember, setEditingMember] = useState<FlatFamilyMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<FlatFamilyMember | null>(null);
  const [addChildParent, setAddChildParent] = useState<FlatFamilyMember | null>(null);
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");

  // Direct add form state
  const [directForm, setDirectForm] = useState({
    title: "",
    gender: "male" as "male" | "female",
    parentKey: "1-1-1-1-1",
    birthYear: "",
    deathYear: "",
    isAlive: true,
    phone: "",
    address: "",
    profession: "",
    spouse: "",
    bio: "",
  });

  // Fetch full data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [treeRes, reqRes] = await Promise.all([
        fetch("/api/family-tree?t=" + Date.now()).then((r) => r.json()),
        fetch("/api/admin/family-tree/requests?t=" + Date.now()).then((r) => r.json()),
      ]);

      if (treeRes.success) {
        setMembers(treeRes.members || []);
        setDataSource(treeRes.source || "fallback");
      }
      if (reqRes.success) {
        setRequests(reqRes.requests || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
      setStatusMessage({ type: "error", text: "ডাটা লোড করতে সমস্যা হয়েছে।" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Show auto-dismissing toast
  const showToast = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  // ─────────────────────────────────────────────
  // 1. Request Actions (Approve / Reject)
  // ─────────────────────────────────────────────

  const handleApproveRequest = async (requestId: string) => {
    try {
      const res = await fetch("/api/admin/family-tree/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", requestId }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", data.message || "আবেদনটি সফলভাবে অনুমোদিত হয়েছে!");
        fetchData();
      } else {
        showToast("error", data.error || "অনুমোদন ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  const handleRejectRequest = async () => {
    if (!rejectingRequestId) return;
    try {
      const res = await fetch("/api/admin/family-tree/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          requestId: rejectingRequestId,
          reason: rejectionReasonInput.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "আবেদনটি বাতিল হিসেবে চিহ্নিত করা হয়েছে।");
        setRejectingRequestId(null);
        setRejectionReasonInput("");
        fetchData();
      } else {
        showToast("error", data.error || "বাতিল করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  // ─────────────────────────────────────────────
  // 2. Member CRUD Actions
  // ─────────────────────────────────────────────

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: editingMember.key,
          updateData: {
            title: editingMember.title,
            gender: editingMember.gender,
            birthYear: editingMember.birthYear,
            deathYear: editingMember.deathYear,
            isAlive: editingMember.isAlive,
            phone: editingMember.phone,
            address: editingMember.address,
            profession: editingMember.profession,
            spouse: editingMember.spouse,
            bio: editingMember.bio,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "সদস্যের তথ্য সফলভাবে হালনাগাদ হয়েছে!");
        setEditingMember(null);
        fetchData();
      } else {
        showToast("error", data.error || "হালনাগাদ ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারে সংযোগ ব্যর্থ হয়েছে।");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;
    try {
      const res = await fetch(`/api/admin/family-tree/member?key=${encodeURIComponent(deletingMember.key)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", data.message || "সদস্য মুছে ফেলা হয়েছে।");
        setDeletingMember(null);
        fetchData();
      } else {
        showToast("error", data.error || "মুছে ফেলতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারে সংযোগ ব্যর্থ হয়েছে।");
    }
  };

  const handleDirectAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directForm.title.trim()) {
      showToast("error", "দয়া করে সদস্যের নাম লিখুন।");
      return;
    }

    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentKey: directForm.parentKey,
          memberData: {
            title: directForm.title.trim(),
            gender: directForm.gender,
            birthYear: directForm.birthYear,
            deathYear: directForm.deathYear,
            isAlive: directForm.isAlive,
            phone: directForm.phone,
            address: directForm.address,
            profession: directForm.profession,
            spouse: directForm.spouse,
            bio: directForm.bio,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `সদস্য "${data.member.title}" (আইডি: ${data.member.key}) সফলভাবে যুক্ত হয়েছে!`);
        setDirectForm({
          title: "",
          gender: "male",
          parentKey: directForm.parentKey,
          birthYear: "",
          deathYear: "",
          isAlive: true,
          phone: "",
          address: "",
          profession: "",
          spouse: "",
          bio: "",
        });
        setActiveTab("members");
        fetchData();
      } else {
        showToast("error", data.error || "যুক্ত করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারে সংযোগ ব্যর্থ হয়েছে।");
    }
  };

  // Database seed
  const handleSeedDefault = async () => {
    if (!confirm("আপনি কি নিশ্চিত যে পরিবারবৃক্ষের প্রাথমিক ডাটা রিসেট বা সিড করতে চান?")) return;
    try {
      const res = await fetch("/api/admin/family-tree/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        showToast("success", data.message || "ডাটা সফলভাবে সিড হয়েছে!");
        fetchData();
      } else {
        showToast("error", data.error || "সিড করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভার সংযোগ ত্রুটি।");
    }
  };

  // Download backup
  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(members, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `basar_family_tree_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("success", "ব্যাকআপ JSON ডাউনলোড সম্পন্ন হয়েছে!");
  };

  // Computed metrics
  const pendingRequestsCount = useMemo(
    () => requests.filter((r) => r.status === "pending").length,
    [requests]
  );
  const maleCount = useMemo(() => members.filter((m) => m.gender === "male").length, [members]);
  const femaleCount = useMemo(() => members.filter((m) => m.gender === "female").length, [members]);
  const maxGen = useMemo(
    () => (members.length > 0 ? Math.max(...members.map((m) => m.generation)) + 1 : 1),
    [members]
  );

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchesSearch =
        !memberSearch ||
        m.title.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.key.toLowerCase().includes(memberSearch.toLowerCase()) ||
        (m.phone && m.phone.includes(memberSearch)) ||
        (m.profession && m.profession.toLowerCase().includes(memberSearch.toLowerCase()));

      const matchesGen =
        generationFilter === "all" || m.generation.toString() === generationFilter;
      const matchesGender = genderFilter === "all" || m.gender === genderFilter;

      return matchesSearch && matchesGen && matchesGender;
    });
  }, [members, memberSearch, generationFilter, genderFilter]);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      if (requestFilter === "all") return true;
      return r.status === requestFilter;
    });
  }, [requests, requestFilter]);

  // Projected next key for direct add form
  const projectedKey = useMemo(() => {
    const parent = members.find((m) => m.key === directForm.parentKey);
    if (!parent) return "";
    const siblingKeys = members.filter((m) => m.parentKey === parent.key);
    let maxOrder = 0;
    for (const sib of siblingKeys) {
      const parts = sib.key.split("-");
      const order = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(order) && order > maxOrder) maxOrder = order;
    }
    return `${parent.key}-${maxOrder + 1}`;
  }, [directForm.parentKey, members]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080d1a] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Top Banner & Header */}
      <header className="bg-white dark:bg-[#0e1628] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                    বাছার পরিবারবৃক্ষ অ্যাডমিন প্যানেল
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    সদস্য অনুমোদন, সংযোজন, সম্পাদনা এবং সম্পূর্ণ বংশলতিকা পরিচালনা
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Status & Back Link */}
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  dataSource === "mongodb"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>
                  {dataSource === "mongodb" ? "MongoDB Atlas সংযুক্ত" : "লোকাল ফাইল স্টোরেজ"}
                </span>
              </span>

              <Link
                href="/family-tree"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition-colors"
              >
                <span>মূল পরিবারবৃক্ষ দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Toast Alert */}
        {statusMessage && (
          <div
            className={`px-4 py-2 text-xs font-bold text-center transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {statusMessage.text}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <span>মোট সদস্য</span>
              <Users className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {isLoading ? "..." : members.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              পুরুষ: {maleCount} | মহিলা: {femaleCount}
            </p>
          </div>

          <div
            onClick={() => setActiveTab("requests")}
            className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm cursor-pointer hover:border-amber-500/50 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <span>মুলতুবি আবেদন</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 flex items-center gap-2">
              {isLoading ? "..." : pendingRequestsCount}
              {pendingRequestsCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">অনুমোদনের অপেক্ষায়</p>
          </div>

          <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <span>সর্বোচ্চ প্রজন্ম</span>
              <GitBranch className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {isLoading ? "..." : `${maxGen}টি`}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">আদি শিকড় হতে বর্তমান</p>
          </div>

          <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <span>ডাটাবেজ স্ট্যাটাস</span>
              <Database className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white capitalize truncate">
              {dataSource === "mongodb" ? "MongoDB Atlas" : "Local JSON"}
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">🟢 সক্রিয় ও সিঙ্কড</p>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "requests"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-white dark:bg-[#0e1628] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>অপেক্ষমাণ আবেদন</span>
            {pendingRequestsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-white/30 text-white text-[10px] font-black">
                {pendingRequestsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "members"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white dark:bg-[#0e1628] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>সকল সদস্য ও সম্পাদনা ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "add"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-[#0e1628] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>সরাসরি নতুন সদস্য যোগ</span>
          </button>

          <button
            onClick={() => setActiveTab("db")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "db"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                : "bg-white dark:bg-[#0e1628] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>ব্যাকআপ ও সিঙ্কিং</span>
          </button>
        </div>

        {/* ─────────────────────────────────────────────
            TAB 1: REQUESTS MODERATION
            ───────────────────────────────────────────── */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {/* Filter Sub-nav */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">ফিল্টার:</span>
                {(["pending", "approved", "rejected", "all"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setRequestFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                      requestFilter === st
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300"
                    }`}
                  >
                    {st === "pending"
                      ? "মুলতুবি (Pending)"
                      : st === "approved"
                      ? "অনুমোদিত (Approved)"
                      : st === "rejected"
                      ? "বাতিলকৃত (Rejected)"
                      : "সব আবেদন"}
                  </button>
                ))}
              </div>

              <button
                onClick={fetchData}
                className="flex items-center gap-1 text-xs text-emerald-600 hover:underline font-bold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>রিফ্রেশ</span>
              </button>
            </div>

            {/* Requests Cards List */}
            {filteredRequests.length === 0 ? (
              <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-800 rounded-2xl p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  কোনো আবেদন অপেক্ষমাণ নেই
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  পাবলিক সাইট বা ইউজারদের থেকে নতুন তথ্য এলে এখানে তালিকাভুক্ত হবে।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRequests.map((req) => {
                  const parent = members.find((m) => m.key === req.parentKey);
                  return (
                    <div
                      key={req.id}
                      className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3"
                    >
                      {/* Top status & date */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            req.status === "pending"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : req.status === "approved"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {req.status === "pending"
                            ? "অপেক্ষমাণ"
                            : req.status === "approved"
                            ? "অনুমোদিত"
                            : "বাতিল"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(req.createdAt).toLocaleDateString("bn-BD")}
                        </span>
                      </div>

                      {/* Proposed Member Header */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base ${
                            req.gender === "female"
                              ? "bg-gradient-to-br from-rose-500 to-pink-600"
                              : "bg-gradient-to-br from-blue-500 to-indigo-600"
                          }`}
                        >
                          {req.title.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
                            {req.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <span>পিতা/অভিভাবক:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {parent ? parent.title : req.parentName || req.parentKey}
                            </span>
                            <span className="font-mono text-[10px]">({req.parentKey})</span>
                          </p>
                        </div>
                      </div>

                      {/* Submitter details badge */}
                      {(req.submitterName || req.submitterPhone) && (
                        <div className="bg-slate-50 dark:bg-[#141b2d] rounded-xl p-2.5 text-xs text-slate-600 dark:text-slate-300 space-y-0.5 border border-slate-200/50 dark:border-slate-800">
                          <p className="text-[10px] uppercase font-bold text-slate-400">তথ্য প্রদানকারী:</p>
                          <p className="font-semibold">
                            {req.submitterName || "নাম উল্লেখ নেই"}
                            {req.submitterPhone && ` (${req.submitterPhone})`}
                          </p>
                        </div>
                      )}

                      {/* Bio / Profession if present */}
                      {(req.profession || req.phone || req.address || req.bio) && (
                        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                          {req.profession && (
                            <p className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                              <span>{req.profession}</span>
                            </p>
                          )}
                          {req.phone && (
                            <p className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <a href={`tel:${req.phone}`} className="text-emerald-600 font-medium">
                                {req.phone}
                              </a>
                            </p>
                          )}
                          {req.address && (
                            <p className="flex items-center gap-1 truncate">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{req.address}</span>
                            </p>
                          )}
                          {req.bio && (
                            <p className="italic text-slate-500 bg-slate-50 dark:bg-[#131a2b] p-2 rounded-lg text-[11px]">
                              &ldquo;{req.bio}&rdquo;
                            </p>
                          )}
                        </div>
                      )}

                      {/* Action buttons (Only for pending) */}
                      {req.status === "pending" && (
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => handleApproveRequest(req.id)}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>অনুমোদন করুন (Approve)</span>
                          </button>
                          <button
                            onClick={() => setRejectingRequestId(req.id)}
                            className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>বাতিল</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────
            TAB 2: MEMBERS MANAGEMENT & CRUD
            ───────────────────────────────────────────── */}
        {activeTab === "members" && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="সদস্যের নাম, আইডি (যেমন: 1-1-1), বা মোবাইল দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                />
              </div>

              {/* Generation Filter */}
              <select
                value={generationFilter}
                onChange={(e) => setGenerationFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="all">সকল প্রজন্ম</option>
                {Array.from({ length: maxGen }).map((_, idx) => (
                  <option key={idx} value={idx.toString()}>
                    {getGenerationLabel(idx)}
                  </option>
                ))}
              </select>

              {/* Gender Filter */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
              >
                <option value="all">উভয় জেন্ডার</option>
                <option value="male">পুরুষ ♂</option>
                <option value="female">মহিলা ♀</option>
              </select>

              <button
                onClick={() => setActiveTab("add")}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ সদস্য যোগ</span>
              </button>
            </div>

            {/* Members Data Table */}
            <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-[#111728] border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">অর্থবোধক আইডি</th>
                      <th className="px-4 py-3">সদস্যের নাম</th>
                      <th className="px-4 py-3">প্রজন্ম</th>
                      <th className="px-4 py-3">পিতা/অভিভাবক</th>
                      <th className="px-4 py-3">পেশা ও মোবাইল</th>
                      <th className="px-4 py-3">অবস্থা</th>
                      <th className="px-4 py-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                    {filteredMembers.map((member) => {
                      const genColor = getGenerationColor(member.generation);
                      const parent = member.parentKey
                        ? members.find((m) => m.key === member.parentKey)
                        : null;

                      return (
                        <tr
                          key={member.key}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                              {member.key}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                  member.gender === "female" ? "bg-rose-500" : "bg-blue-500"
                                }`}
                              />
                              <span className="truncate max-w-[180px]">{member.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                              style={{
                                backgroundColor: `${genColor}15`,
                                color: genColor,
                                border: `1px solid ${genColor}30`,
                              }}
                            >
                              {getGenerationLabel(member.generation)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {parent ? (
                              <span className="text-slate-600 dark:text-slate-300">
                                {parent.title} <span className="text-[10px] text-slate-400">({parent.key})</span>
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">মূল শিকড়</span>
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {member.profession || "—"}
                              </p>
                              {member.phone && (
                                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                  {member.phone}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                member.isAlive !== false
                                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                  : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                              }`}
                            >
                              {member.isAlive !== false ? "জীবিত" : "মরহুম"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Add Child */}
                              <button
                                onClick={() => {
                                  setDirectForm((prev) => ({
                                    ...prev,
                                    parentKey: member.key,
                                  }));
                                  setActiveTab("add");
                                }}
                                title="সন্তান যোগ করুন"
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20 text-emerald-600 transition-colors"
                              >
                                <PlusCircle className="w-3.5 h-3.5" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => setEditingMember(member)}
                                title="সম্পাদনা করুন"
                                className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 text-blue-600 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete (Cannot delete root '1') */}
                              {member.key !== "1" && (
                                <button
                                  onClick={() => setDeletingMember(member)}
                                  title="মুছে ফেলুন"
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-3 bg-slate-50 dark:bg-[#111728] border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
                <span>মোট দেখানো হচ্ছে: {filteredMembers.length} জন</span>
                <span className="text-[11px] text-slate-400">
                  সর্বশেষ সিঙ্ক: {new Date().toLocaleTimeString("bn-BD")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            TAB 3: DIRECT ADD MEMBER FORM
            ───────────────────────────────────────────── */}
        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  সরাসরি পরিবারবৃক্ষে নতুন সদস্য যোগ
                </h3>
                <p className="text-xs text-slate-500">
                  অ্যাডমিন হিসেবে সরাসরি সদস্য যুক্ত করুন। এটি সাথে সাথে ডাটাবেজে সেভ হবে।
                </p>
              </div>
            </div>

            <form onSubmit={handleDirectAddSubmit} className="space-y-4">
              {/* Parent Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  পিতা / অভিভাবক নির্বাচন করুন *
                </label>
                <select
                  value={directForm.parentKey}
                  onChange={(e) =>
                    setDirectForm((prev) => ({ ...prev, parentKey: e.target.value }))
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                >
                  {members.map((m) => (
                    <option key={m.key} value={m.key}>
                      [{m.key}] {m.title} ({getGenerationLabel(m.generation)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Semantic ID Projection Indicator */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">নির্ধারিত অর্থবোধক আইডি:</span>{" "}
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {projectedKey}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">
                  {parseMemberKeyInfo(projectedKey).generation}ম প্রজন্ম
                </span>
              </div>

              {/* Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    সদস্যের পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={directForm.title}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="যেমন: ফারহান বাছার"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    জেন্ডার
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirectForm((prev) => ({ ...prev, gender: "male" }))}
                      className={`p-2 rounded-xl text-xs font-bold transition-all ${
                        directForm.gender === "male"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      পুরুষ ♂
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirectForm((prev) => ({ ...prev, gender: "female" }))}
                      className={`p-2 rounded-xl text-xs font-bold transition-all ${
                        directForm.gender === "female"
                          ? "bg-rose-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      মহিলা ♀
                    </button>
                  </div>
                </div>
              </div>

              {/* Living Status & Years */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বর্তমান অবস্থা
                  </label>
                  <select
                    value={directForm.isAlive ? "alive" : "deceased"}
                    onChange={(e) =>
                      setDirectForm((prev) => ({
                        ...prev,
                        isAlive: e.target.value === "alive",
                      }))
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  >
                    <option value="alive">জীবিত</option>
                    <option value="deceased">মরহুম / প্রয়াত</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    জন্ম সাল (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    value={directForm.birthYear}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, birthYear: e.target.value }))
                    }
                    placeholder="যেমন: ১৯৯৫"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মৃত্যু সাল (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    disabled={directForm.isAlive}
                    value={directForm.deathYear}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, deathYear: e.target.value }))
                    }
                    placeholder="যেমন: ২০২০"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Profession & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পেশা / কর্মক্ষেত্র
                  </label>
                  <input
                    type="text"
                    value={directForm.profession}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, profession: e.target.value }))
                    }
                    placeholder="যেমন: শিক্ষক, প্রকৌশলী, ব্যবসায়ী"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    value={directForm.phone}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="যেমন: 017xxxxxxxx"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Spouse & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    স্বামী / স্ত্রীর নাম
                  </label>
                  <input
                    type="text"
                    value={directForm.spouse}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, spouse: e.target.value }))
                    }
                    placeholder="যেমন: মোসাম্মৎ রহিমা খাতুন"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    বর্তমান বা স্থায়ী ঠিকানা
                  </label>
                  <input
                    type="text"
                    value={directForm.address}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder="গ্রাম, ডাকঘর, জেলা"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সংক্ষিপ্ত জীবনবৃত্তান্ত বা স্মৃতিচারণ
                </label>
                <textarea
                  rows={3}
                  value={directForm.bio}
                  onChange={(e) =>
                    setDirectForm((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="সদস্যের উল্লেখযোগ্য অর্জন বা পরিচয়..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>সরাসরি পরিবারবৃক্ষে সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            TAB 4: DATABASE, BACKUP & SEED
            ───────────────────────────────────────────── */}
        {activeTab === "db" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    ডাটাবেজ সংযোগ ও স্থিতি
                  </h3>
                  <p className="text-xs text-slate-500">
                    মঙ্গোডিবি ক্লাউড ও লোকাল ব্যাকআপ সংক্রান্ত তথ্য
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">সংযোগের উৎস:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {dataSource}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">মোট সংরক্ষিত সদস্য:</span>
                  <span className="font-bold">{members.length} জন</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">মোট আবেদন রেকর্ড:</span>
                  <span className="font-bold">{requests.length}টি</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500">পরিবারবৃক্ষ সংস্করণ:</span>
                  <span className="font-mono font-bold">2.4.0 (Semantic ID Engine)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDownloadBackup}
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  <span>সম্পূর্ণ পরিবারবৃক্ষ JSON ডাউনলোড করুন</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0e1628] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    ডাটাবেজ রিসেট ও সিড
                  </h3>
                  <p className="text-xs text-slate-500">
                    ডিফল্ট ১৯৫+ ঐতিহ্যবাহী সদস্য ডাটাবেজে পুনরায় ইনসার্ট করুন
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                যদি ডাটাবেজের কোনো তথ্য ক্ষতিগ্রস্ত হয় বা আপনি মূল বংশলতিকার সকল ডিফল্ট ডাটা আবার ফিরিয়ে আনতে চান, তবে নিচের বোতামে ক্লিক করুন।
              </p>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
                ⚠️ সতর্কতা: এটি বিদ্যমান সকল সদস্যকে প্রতিস্থাপন করে মূল ১৯৫+ সদস্য দিয়ে পুনরায় সিড করবে।
              </div>

              <button
                onClick={handleSeedDefault}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>প্রাথমিক ১৯৫+ সদস্য ডাটা সিড / রিসেট করুন</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ─────────────────────────────────────────────
          MODAL 1: EDIT MEMBER MODAL
          ───────────────────────────────────────────── */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  সদস্যের তথ্য সম্পাদনা (Edit)
                </h3>
                <p className="text-xs text-slate-400 font-mono">আইডি: {editingMember.key}</p>
              </div>
              <button
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সদস্যের নাম
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.title}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, title: e.target.value })
                  }
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    পেশা
                  </label>
                  <input
                    type="text"
                    value={editingMember.profession || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, profession: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    value={editingMember.phone || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, phone: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    স্বামী / স্ত্রীর নাম
                  </label>
                  <input
                    type="text"
                    value={editingMember.spouse || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, spouse: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ঠিকানা
                  </label>
                  <input
                    type="text"
                    value={editingMember.address || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, address: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সংক্ষিপ্ত পরিচিতি বা বায়ো
                </label>
                <textarea
                  rows={3}
                  value={editingMember.bio || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, bio: e.target.value })
                  }
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          MODAL 2: DELETE CONFIRMATION MODAL
          ───────────────────────────────────────────── */}
      {deletingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              সদস্য মুছে ফেলতে চান?
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              আপনি কি নিশ্চিত যে &ldquo;{deletingMember.title}&rdquo; (আইডি: {deletingMember.key}) এবং তার সংশ্লিষ্ট সকল বংশধরদের রেকর্ড মুছে ফেলতে চান?
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeletingMember(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                না, রাখুন
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          MODAL 3: REJECT REASON MODAL
          ───────────────────────────────────────────── */}
      {rejectingRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0e1628] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              বাতিলের কারণ উল্লেখ করুন
            </h3>
            <textarea
              rows={3}
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
              placeholder="যেমন: পিতা ও বংশের তথ্য সঠিক পাওয়া যায়নি..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#131b2e] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none mb-3"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectingRequestId(null)}
                className="py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold"
              >
                বন্ধ
              </button>
              <button
                onClick={handleRejectRequest}
                className="py-1.5 px-3 rounded-lg bg-rose-600 text-white text-xs font-bold"
              >
                বাতিল নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
