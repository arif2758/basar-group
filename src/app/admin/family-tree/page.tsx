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
  TreePine,
  FileSpreadsheet,
  GraduationCap,
  School,
  Mail,
  Calendar,
  Droplet,
  Eye,
} from "lucide-react";
import { FlatFamilyMember } from "@/data/familyData";
import {
  getGenerationLabel,
  getGenerationColor,
  generateNextChildKey,
  parseMemberKeyInfo,
} from "@/utils/familyUtils";
import {
  GENERAL_CLASSES,
  MADRASAH_CLASSES,
  HIGHER_CLASSES,
  EducationType,
  BLOOD_GROUPS,
} from "@/types/enums";
import { Table, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import AdminMemberMobileCard from "@/components/admin/family-tree/AdminMemberMobileCard";
import AddMemberModal from "@/components/family-tree/AddMemberModal";

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
  educationType?: string;
  institution?: string;
  academicClass?: string;
  section?: string;
  rollNumber?: string;
  bloodGroup?: string;
  nidOrBirthCert?: string;
  submitterName?: string;
  submitterPhone?: string;
  submitterEmail?: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  createdAt: string;
}

export default function AdminFamilyTreePage() {
  const [activeTab, setActiveTab] = useState<"requests" | "members" | "add">("requests");

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
  const [aliveFilter, setAliveFilter] = useState<"all" | "alive" | "deceased">("all");
  const [educationFilter, setEducationFilter] = useState<string>("all");
  const [mobilePage, setMobilePage] = useState(1);
  const mobilePageSize = 10;

  // Reset mobile page on filter change
  useEffect(() => {
    setMobilePage(1);
  }, [memberSearch, generationFilter, genderFilter, aliveFilter, educationFilter]);

  // Requests filter
  const [requestFilter, setRequestFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  // Modals state
  const [editingMember, setEditingMember] = useState<FlatFamilyMember | null>(null);
  const [deletingMember, setDeletingMember] = useState<FlatFamilyMember | null>(null);
  const [addChildParent, setAddChildParent] = useState<FlatFamilyMember | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [rejectingRequestId, setRejectingRequestId] = useState<string | null>(null);
  const [rejectionReasonInput, setRejectionReasonInput] = useState("");
  const [viewingRequest, setViewingRequest] = useState<MemberRequestItem | null>(null);

  // Direct add form state
  const [directForm, setDirectForm] = useState({
    title: "",
    gender: "male" as "male" | "female",
    bloodGroup: "",
    nidOrBirthCert: "",
    parentKey: "1-1-1-1-1",
    birthYear: "",
    deathYear: "",
    isAlive: true,
    phone: "",
    address: "",
    profession: "",
    spouse: "",
    bio: "",
    educationType: "general" as "general" | "madrasah" | "higher" | "other",
    institution: "",
    academicClass: "",
    section: "",
    rollNumber: "",
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
  // 2. Member CRUD Actions (Edit & Delete)
  // ─────────────────────────────────────────────

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    if (!editingMember.bloodGroup || !editingMember.bloodGroup.trim()) {
      showToast("error", "দয়া করে রক্তের গ্রুপ নির্বাচন করুন (আবশ্যিক)।");
      return;
    }

    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: editingMember.key,
          updateData: {
            title: editingMember.title.trim(),
            gender: editingMember.gender,
            isAlive: editingMember.isAlive,
            birthYear: editingMember.birthYear || "",
            deathYear: editingMember.deathYear || "",
            profession: editingMember.profession || "",
            phone: editingMember.phone || "",
            spouse: editingMember.spouse || "",
            address: editingMember.address || "",
            bio: editingMember.bio || "",
            educationType: editingMember.educationType || "",
            institution: editingMember.institution || "",
            academicClass: editingMember.academicClass || "",
            section: editingMember.section || "",
            rollNumber: editingMember.rollNumber || "",
            bloodGroup: editingMember.bloodGroup.trim(),
            nidOrBirthCert: (editingMember.nidOrBirthCert || "").trim(),
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "সদস্যের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!");
        setEditingMember(null);
        fetchData();
      } else {
        showToast("error", data.error || "হালনাগাদ করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      showToast("error", "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingMember) return;
    try {
      const res = await fetch(`/api/admin/family-tree/member?key=${deletingMember.key}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `সদস্য "${deletingMember.title}" ও তার বংশধরদের সফলভাবে মুছে ফেলা হয়েছে।`);
        setDeletingMember(null);
        fetchData();
      } else {
        showToast("error", data.error || "মুছতে ব্যর্থ হয়েছে।");
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
    if (!directForm.bloodGroup || !directForm.bloodGroup.trim()) {
      showToast("error", "দয়া করে রক্তের গ্রুপ নির্বাচন করুন (আবশ্যিক)।");
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
            educationType: directForm.educationType,
            institution: directForm.institution.trim(),
            academicClass: directForm.academicClass,
            section: directForm.section.trim(),
            rollNumber: directForm.rollNumber.trim(),
            bloodGroup: directForm.bloodGroup.trim(),
            nidOrBirthCert: directForm.nidOrBirthCert.trim(),
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `সদস্য "${data.member.title}" (আইডি: ${data.member.key}) সফলভাবে যুক্ত হয়েছে!`);
        setDirectForm({
          title: "",
          gender: "male",
          bloodGroup: "",
          nidOrBirthCert: "",
          parentKey: directForm.parentKey,
          birthYear: "",
          deathYear: "",
          isAlive: true,
          phone: "",
          address: "",
          profession: "",
          spouse: "",
          bio: "",
          educationType: "general",
          institution: "",
          academicClass: "",
          section: "",
          rollNumber: "",
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

  const handleModalAddMember = async (
    parentKey: string,
    memberData: any,
    submitterInfo?: { name: string; phone: string }
  ) => {
    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentKey,
          memberData: {
            title: memberData.title,
            gender: memberData.gender,
            isAlive: memberData.isAlive,
            birthYear: memberData.birthYear || "",
            deathYear: memberData.deathYear || "",
            profession: memberData.profession || "",
            phone: memberData.phone || "",
            spouse: memberData.spouse || "",
            address: memberData.address || "",
            bio: memberData.bio || "",
            educationType: memberData.educationType || "",
            institution: memberData.institution || "",
            academicClass: memberData.academicClass || "",
            section: memberData.section || "",
            rollNumber: memberData.rollNumber || "",
            bloodGroup: memberData.bloodGroup || "",
            nidOrBirthCert: memberData.nidOrBirthCert || "",
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "নতুন সদস্য সফলভাবে ট্রিতে যুক্ত হয়েছে!");
        setIsAddModalOpen(false);
        fetchData();
      } else {
        showToast("error", data.error || "সংরক্ষণ ব্যর্থ হয়েছে");
      }
    } catch (err) {
      showToast("error", "সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    }
  };

  // Download Family Members CSV / Excel
  const handleDownloadCSV = () => {
    const headers = [
      "জেন আইডি",
      "সদস্যের নাম",
      "পিতা/অভিভাবকের আইডি",
      "প্রজন্ম",
      "জেন্ডার",
      "রক্তের গ্রুপ",
      "NID / জন্ম সনদ",
      "অবস্থা",
      "মোবাইল নম্বর",
      "স্বামী/স্ত্রী",
      "পেশা",
      "শিক্ষা ধারা",
      "প্রতিষ্ঠান",
      "শ্রেণি",
      "শাখা",
      "রোল",
      "ঠিকানা",
      "বায়ো",
    ];
    const rows = members.map((m) => [
      `"${m.key}"`,
      `"${m.title.replace(/"/g, '""')}"`,
      `"${m.parentKey || ""}"`,
      `"${m.generation}ম প্রজন্ম"`,
      `"${m.gender === "female" ? "মহিলা" : "পুরুষ"}"`,
      `"${(m.bloodGroup || "").replace(/"/g, '""')}"`,
      `"${(m.nidOrBirthCert || "").replace(/"/g, '""')}"`,
      `"${m.isAlive ? "জীবিত" : "মরহুম"}"`,
      `"${(m.phone || "").replace(/"/g, '""')}"`,
      `"${(m.spouse || "").replace(/"/g, '""')}"`,
      `"${(m.profession || "").replace(/"/g, '""')}"`,
      `"${(m.educationType || "").replace(/"/g, '""')}"`,
      `"${(m.institution || "").replace(/"/g, '""')}"`,
      `"${(m.academicClass || "").replace(/"/g, '""')}"`,
      `"${(m.section || "").replace(/"/g, '""')}"`,
      `"${(m.rollNumber || "").replace(/"/g, '""')}"`,
      `"${(m.address || "").replace(/"/g, '""')}"`,
      `"${(m.bio || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `basar_family_members_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("success", "ফ্যামিলি মেম্বারদের CSV ফাইলে এক্সপোর্ট সম্পন্ন হয়েছে!");
  };

  // Computed metrics
  const pendingRequestsCount = useMemo(
    () => requests.filter((r) => r.status === "pending").length,
    [requests]
  );
  const maleCount = useMemo(() => members.filter((m) => m.gender === "male").length, [members]);
  const femaleCount = useMemo(() => members.filter((m) => m.gender === "female").length, [members]);
  const aliveCount = useMemo(() => members.filter((m) => m.isAlive).length, [members]);
  const maxGen = useMemo(
    () => (members.length > 0 ? Math.max(...members.map((m) => m.generation)) + 1 : 1),
    [members]
  );

  // Filtered family members
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const q = memberSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.key.toLowerCase().includes(q) ||
        (m.phone && m.phone.includes(q)) ||
        (m.bloodGroup && m.bloodGroup.toLowerCase().includes(q)) ||
        (m.nidOrBirthCert && m.nidOrBirthCert.includes(q)) ||
        (m.profession && m.profession.toLowerCase().includes(q)) ||
        (m.institution && m.institution.toLowerCase().includes(q)) ||
        (m.academicClass && m.academicClass.toLowerCase().includes(q)) ||
        (m.address && m.address.toLowerCase().includes(q));

      const matchesGen =
        generationFilter === "all" || m.generation.toString() === generationFilter;

      const matchesGender = genderFilter === "all" || m.gender === genderFilter;

      const matchesAlive =
        aliveFilter === "all" ||
        (aliveFilter === "alive" && m.isAlive) ||
        (aliveFilter === "deceased" && !m.isAlive);

      const matchesEdu =
        educationFilter === "all" ||
        (m.educationType && m.educationType.toLowerCase() === educationFilter.toLowerCase());

      return matchesSearch && matchesGen && matchesGender && matchesAlive && matchesEdu;
    });
  }, [members, memberSearch, generationFilter, genderFilter, aliveFilter, educationFilter]);

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

  // Paginated members for mobile card view
  const paginatedMobileMembers = useMemo(() => {
    const start = (mobilePage - 1) * mobilePageSize;
    return filteredMembers.slice(start, start + mobilePageSize);
  }, [filteredMembers, mobilePage, mobilePageSize]);

  // Ant Design Table Columns for Desktop View
  const memberColumns: ColumnsType<FlatFamilyMember> = useMemo(
    () => [
      {
        title: "জেন আইডি",
        dataIndex: "key",
        key: "key",
        width: 100,
        sorter: (a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }),
        render: (key: string) => (
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg inline-block shadow-2xs">
            {key}
          </span>
        ),
      },
      {
        title: "সদস্যের নাম",
        dataIndex: "title",
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title, "bn"),
        render: (title: string, record) => (
          <Link
            href={`/admin/family-tree/${record.key}`}
            className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-block"
            title="সম্পূর্ণ প্রোফাইল দেখুন"
          >
            {title}
          </Link>
        ),
      },
      {
        title: "রক্তের গ্রুপ",
        dataIndex: "bloodGroup",
        key: "bloodGroup",
        width: 110,
        align: "center",
        sorter: (a, b) => (a.bloodGroup || "").localeCompare(b.bloodGroup || ""),
        render: (bg: string) =>
          bg ? (
            <span className="inline-flex items-center gap-1 font-bold font-mono text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200/70 dark:border-rose-800/40 px-2 py-0.5 rounded-md">
              <Droplet className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
              <span>{bg}</span>
            </span>
          ) : (
            <span className="text-slate-400 font-mono text-xs">—</span>
          ),
      },
      {
        title: "অধ্যায়নরত শ্রেণি",
        key: "academicClass",
        sorter: (a, b) => (a.academicClass || "").localeCompare(b.academicClass || ""),
        render: (_, record) =>
          record.academicClass ? (
            <div className="text-xs space-y-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {record.academicClass}
                {record.section ? ` (${record.section})` : ""}
              </span>
              {record.institution && (
                <p
                  className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[170px]"
                  title={record.institution}
                >
                  {record.institution}
                </p>
              )}
            </div>
          ) : (
            <span className="text-slate-400 text-xs">—</span>
          ),
      },
      {
        title: "মোবাইল নম্বর",
        dataIndex: "phone",
        key: "phone",
        width: 140,
        render: (phone: string) =>
          phone ? (
            <a
              href={`tel:${phone}`}
              className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>{phone}</span>
            </a>
          ) : (
            <span className="text-slate-400 font-mono text-xs">—</span>
          ),
      },
      {
        title: "NID / জন্ম সনদ",
        dataIndex: "nidOrBirthCert",
        key: "nidOrBirthCert",
        width: 150,
        render: (val: string) =>
          val ? (
            <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
              {val}
            </span>
          ) : (
            <span className="text-slate-400 font-mono text-xs">—</span>
          ),
      },
      {
        title: "স্বামী / স্ত্রী ও ঠিকানা",
        key: "spouse_address",
        render: (_, record) => (
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-0.5 max-w-[170px]">
            {record.spouse && (
              <p className="flex items-center gap-1 truncate text-slate-700 dark:text-slate-300">
                <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                <span className="truncate">{record.spouse}</span>
              </p>
            )}
            {record.address && (
              <p className="flex items-center gap-1 truncate text-slate-500 dark:text-slate-400">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{record.address}</span>
              </p>
            )}
            {!record.spouse && !record.address && <span className="text-slate-400">—</span>}
          </div>
        ),
      },
      {
        title: "অ্যাকশন",
        key: "action",
        align: "right",
        width: 145,
        render: (_, record) => (
          <div className="flex items-center justify-end gap-1.5">
            <Link
              href={`/admin/family-tree/${record.key}`}
              title="বিস্তারিত প্রোফাইল দেখুন"
              className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/40 transition-colors inline-flex items-center justify-center cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setDirectForm((prev) => ({
                  ...prev,
                  parentKey: record.key,
                }));
                setActiveTab("add");
              }}
              title="সন্তান যোগ করুন"
              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setEditingMember(record)}
              title="সম্পাদনা করুন"
              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            {record.key !== "1" && (
              <button
                type="button"
                onClick={() => setDeletingMember(record)}
                title="মুছে ফেলুন"
                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ),
      }    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Global Toast Alert */}
      {statusMessage && (
        <div
          className={`px-4 py-2.5 rounded-xl text-xs font-bold text-center transition-all shadow-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Page Title & Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2a2a2a] p-4 sm:p-5 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <TreePine className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              ফ্যামিলি ট্রি ম্যানেজমেন্ট
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সদস্য অনুমোদন, সংযোজন, সম্পাদনা এবং সম্পূর্ণ বংশলতিকা পরিচালনা
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              dataSource === "mongodb"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{dataSource === "mongodb" ? "MongoDB Atlas সংযুক্ত" : "লোকাল ফাইল স্টোরেজ"}</span>
          </span>

          <Link
            href="/family-tree"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1f1f1f] dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#333] transition-colors"
          >
            <span>মূল ফ্যামিলি ট্রি দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <Users className="w-4 h-4 text-emerald-500" />
              <span>মোট সদস্য</span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {isLoading ? "..." : members.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              পুরুষ: {maleCount} | মহিলা: {femaleCount} • জীবিত: {aliveCount}
            </p>
          </div>

          <div
            onClick={() => setActiveTab("requests")}
            className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 shadow-sm cursor-pointer hover:border-amber-500/50 transition-colors flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>মুলতুবি আবেদন</span>
            </div>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2 mt-1">
              {isLoading ? "..." : pendingRequestsCount}
              {pendingRequestsCount > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              )}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">অনুমোদনের অপেক্ষায়</p>
          </div>

          <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <GitBranch className="w-4 h-4 text-blue-500" />
              <span>সর্বোচ্চ প্রজন্ম</span>
            </div>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
              {isLoading ? "..." : `${maxGen}টি`}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">আদি শিকড় হতে বর্তমান</p>
          </div>

          <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
              <Database className="w-4 h-4 text-purple-500" />
              <span>ডাটাবেজ স্ট্যাটাস</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white capitalize truncate mt-1">
              {dataSource === "mongodb" ? "MongoDB Atlas" : "Local JSON"}
            </p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">🟢 সক্রিয় ও সিঙ্কড</p>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex flex-nowrap items-center md:justify-center gap-2 pb-3 mb-6 overflow-x-auto no-scrollbar w-full scroll-smooth">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex flex-shrink-0 items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "requests"
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#ffffff14]"
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
            className={`flex flex-shrink-0 items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "members"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#ffffff14]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>সকল সদস্য ও সম্পাদনা ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("add")}
            className={`flex flex-shrink-0 items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "add"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-white dark:bg-[#141414] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#ffffff14]"
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>সরাসরি নতুন সদস্য যোগ</span>
          </button>

        </div>

        {/* ─────────────────────────────────────────────
            TAB 1: REQUESTS MODERATION
            ───────────────────────────────────────────── */}
        {activeTab === "requests" && (
          <div className="space-y-4">
            {/* Filter Sub-nav */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-center w-full">
              <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500 w-full sm:w-auto">ফিল্টার:</span>
                {(["pending", "approved", "rejected", "all"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setRequestFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                      requestFilter === st
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "bg-slate-200/70 dark:bg-[#141414] border border-slate-300/30 dark:border-[#262626] text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-[#1a1a1a]"
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
                className="flex items-center justify-center gap-1 text-xs text-emerald-600 hover:underline font-bold bg-white dark:bg-[#141414] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#262626]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>রিফ্রেশ</span>
              </button>
            </div>

            {/* Requests Cards List */}
            {filteredRequests.length === 0 ? (
              <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-2xl p-10 text-center">
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
                      className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-2xl p-5 shadow-sm space-y-3"
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

                      {/* Proposed Member Header (Clickable for details) */}
                      <div
                        onClick={() => setViewingRequest(req)}
                        className="flex items-center gap-3 cursor-pointer group"
                        title="আবেদনের বিস্তারিত দেখুন"
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base transition-transform group-hover:scale-105 shrink-0 ${
                            req.gender === "female"
                              ? "bg-gradient-to-br from-rose-500 to-pink-600"
                              : "bg-gradient-to-br from-blue-500 to-indigo-600"
                          }`}
                        >
                          {req.title.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                              {req.title}
                            </h4>
                            {req.bloodGroup && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60">
                                <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
                                {req.bloodGroup}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <span>পিতা/অভিভাবক:</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              {parent ? parent.title : req.parentName || req.parentKey}
                            </span>
                            <span className="font-mono text-[10px]">({req.parentKey})</span>
                          </p>
                          {(req.academicClass || req.phone || req.nidOrBirthCert) && (
                            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {req.academicClass && (
                                <span className="bg-slate-100 dark:bg-[#222] px-1.5 py-0.5 rounded font-medium text-[11px]">
                                  শ্রেণি: {req.academicClass}
                                </span>
                              )}
                              {req.phone && (
                                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                                  {req.phone}
                                </span>
                              )}
                              {req.nidOrBirthCert && (
                                <span className="font-mono text-slate-500 text-[11px]">
                                  NID: {req.nidOrBirthCert}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Submitter details badge */}
                      {(req.submitterName || req.submitterPhone || req.submitterEmail) && (
                        <div className="bg-slate-50 dark:bg-[#141b2d] rounded-xl p-2.5 text-xs text-slate-600 dark:text-slate-300 space-y-1 border border-slate-200/50 dark:border-[#303030]">
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] uppercase font-bold text-slate-400">তথ্য প্রদানকারী:</p>
                            {req.submitterEmail && (
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40">
                                একাউন্ট সিঙ্ক সক্রিয়
                              </span>
                            )}
                          </div>
                          <p className="font-semibold">
                            {req.submitterName || "নাম উল্লেখ নেই"}
                            {req.submitterPhone && ` (${req.submitterPhone})`}
                          </p>
                          {req.submitterEmail && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              ইমেইল: {req.submitterEmail}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Action Buttons Toolbar */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#303030]">
                        <button
                          type="button"
                          onClick={() => setViewingRequest(req)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1f1f1f] dark:hover:bg-[#282828] text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200/60 dark:border-[#303030]"
                        >
                          <Eye className="w-3.5 h-3.5 text-indigo-500" />
                          <span>বিস্তারিত দেখুন</span>
                        </button>

                        {req.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleApproveRequest(req.id)}
                              className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setRejectingRequestId(req.id)}
                              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                              title="আবেদন বাতিল করুন"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>বাতিল</span>
                            </button>
                          </>
                        )}
                      </div>
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
            <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  placeholder="সদস্যের নাম, আইডি (যেমন: 1-1-1), বা মোবাইল দিয়ে খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl admin-toolbar-input !bg-slate-50 dark:!bg-[#1c1c1c] border !border-slate-200 dark:!border-[#303030] text-xs sm:text-sm !text-slate-900 dark:!text-slate-100 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Generation Filter */}
              <select
                value={generationFilter}
                onChange={(e) => setGenerationFilter(e.target.value)}
                className="px-3 py-2 rounded-xl admin-toolbar-select !bg-slate-50 dark:!bg-[#1c1c1c] border !border-slate-200 dark:!border-[#303030] text-xs font-semibold !text-slate-700 dark:!text-slate-200 outline-none transition-colors"
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
                className="px-3 py-2 rounded-xl admin-toolbar-select !bg-slate-50 dark:!bg-[#1c1c1c] border !border-slate-200 dark:!border-[#303030] text-xs font-semibold !text-slate-700 dark:!text-slate-200 outline-none transition-colors"
              >
                <option value="all">উভয় জেন্ডার</option>
                <option value="male">পুরুষ ♂</option>
                <option value="female">মহিলা ♀</option>
              </select>

              {/* Alive/Deceased Filter */}
              <select
                value={aliveFilter}
                onChange={(e) => setAliveFilter(e.target.value as any)}
                className="px-3 py-2 rounded-xl admin-toolbar-select !bg-slate-50 dark:!bg-[#1c1c1c] border !border-slate-200 dark:!border-[#303030] text-xs font-semibold !text-slate-700 dark:!text-slate-200 outline-none transition-colors"
              >
                <option value="all">সকল অবস্থা</option>
                <option value="alive">শুধুমাত্র জীবিত</option>
                <option value="deceased">মরহুম সদস্য</option>
              </select>

              {/* Education Filter */}
              <select
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
                className="px-3 py-2 rounded-xl admin-toolbar-select !bg-slate-50 dark:!bg-[#1c1c1c] border !border-slate-200 dark:!border-[#303030] text-xs font-semibold !text-slate-700 dark:!text-slate-200 outline-none transition-colors"
              >
                <option value="all">সকল শিক্ষা ধারা</option>
                <option value="general">সাধারণ শিক্ষা</option>
                <option value="madrasah">মাদ্রাসা শিক্ষা</option>
                <option value="higher">উচ্চশিক্ষা</option>
                <option value="other">অন্যান্য</option>
              </select>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  title="CSV এক্সেল ফরম্যাটে ডাউনলোড করুন"
                  className="px-3 py-2 rounded-xl admin-toolbar-btn !bg-slate-100 hover:!bg-slate-200 dark:!bg-[#1c1c1c] dark:hover:!bg-[#252525] !text-slate-700 dark:!text-slate-200 border !border-slate-200 dark:border-[#303030] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">CSV এক্সপোর্ট</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("add")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ সদস্য যোগ</span>
                </button>
              </div>
            </div>

            {/* DESKTOP VIEW: Ant Design Table with Pagination & Sorting */}
            <div className="hidden lg:block bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2a2a2a] rounded-2xl shadow-xs overflow-hidden p-2">
              <Table<FlatFamilyMember>
                dataSource={filteredMembers}
                rowKey="key"
                columns={memberColumns}
                pagination={{
                  pageSize: 15,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "15", "25", "50", "100"],
                  showTotal: (total, range) => `${range[0]}-${range[1]} / মোট ${total} জন`,
                }}
                scroll={{ x: 800 }}
                size="middle"
                className="admin-family-tree-table"
              />
            </div>

            {/* MOBILE VIEW: Fluid Ant Design Responsive Cards */}
            <div className="block lg:hidden space-y-3">
              {paginatedMobileMembers.length > 0 ? (
                <>
                  <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
                    <span>মোট সদস্য: {filteredMembers.length} জন</span>
                    <span>
                      পৃষ্ঠা {mobilePage} / {Math.ceil(filteredMembers.length / mobilePageSize) || 1}
                    </span>
                  </div>

                  {paginatedMobileMembers.map((member) => {
                    const parent = member.parentKey
                      ? members.find((m) => m.key === member.parentKey)
                      : null;
                    return (
                      <AdminMemberMobileCard
                        key={member.key}
                        member={member}
                        parent={parent}
                        onAddChild={(m) => {
                          setDirectForm((prev) => ({ ...prev, parentKey: m.key }));
                          setActiveTab("add");
                        }}
                        onEdit={(m) => setEditingMember(m)}
                        onDelete={(m) => setDeletingMember(m)}
                      />
                    );
                  })}

                  {/* Mobile Pagination */}
                  {filteredMembers.length > mobilePageSize && (
                    <div className="flex justify-center pt-3 pb-4">
                      <Pagination
                        current={mobilePage}
                        pageSize={mobilePageSize}
                        total={filteredMembers.length}
                        onChange={(p) => {
                          setMobilePage(p);
                          window.scrollTo({ top: 300, behavior: "smooth" });
                        }}
                        simple
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#2a2a2a] rounded-2xl p-8 text-center">
                  <Users className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    কোনো সদস্য পাওয়া যায়নি
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    অনুসন্ধান বা ফিল্টারের শর্ত পরিবর্তন করে দেখুন।
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────
            TAB 3: DIRECT ADD MEMBER FORM
            ───────────────────────────────────────────── */}
        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#303030] mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    সরাসরি ফ্যামিলি ট্রিতে নতুন সদস্য যোগ
                  </h3>
                  <p className="text-xs text-slate-500">
                    অ্যাডমিন হিসেবে সরাসরি সদস্য যুক্ত করুন। এটি সাথে সাথে ডাটাবেজে সেভ হবে।
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>পপআপ মোডালে যোগ করুন</span>
              </button>
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
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                >
                  {members.map((m) => (
                    <option key={m.key} value={m.key} className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                          : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
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
                          : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="alive" className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">জীবিত</option>
                    <option value="deceased" className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">মরহুম / প্রয়াত</option>
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-40 transition-colors"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Blood Group (Mandatory) & NID/Birth Certificate (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    রক্তের গ্রুপ * <span className="text-rose-500 font-semibold">(আবশ্যিক)</span>
                  </label>
                  <select
                    required
                    value={directForm.bloodGroup}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, bloodGroup: e.target.value }))
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-semibold"
                  >
                    <option value="" className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">
                      -- রক্তের গ্রুপ নির্বাচন করুন --
                    </option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg} className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    NID / জন্ম সনদ নম্বর <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="text"
                    value={directForm.nidOrBirthCert}
                    onChange={(e) =>
                      setDirectForm((prev) => ({ ...prev, nidOrBirthCert: e.target.value }))
                    }
                    placeholder="যেমন: 19901234567890123"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-mono"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Academic Information (একাডেমিক তথ্য) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#2a2a2a] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      একাডেমিক তথ্য (ঐচ্ছিক)
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full font-medium">
                    শিক্ষা ও শ্রেণী
                  </span>
                </div>

                {/* Education Stream Toggle */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শিক্ষা মাধ্যম
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirectForm((prev) => ({ ...prev, educationType: "general", academicClass: "" }))}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        directForm.educationType === "general"
                          ? "bg-blue-600 text-white shadow-sm font-bold"
                          : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                      }`}
                    >
                      <span>🏫 সাধারণ (স্কুল/কলেজ)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirectForm((prev) => ({ ...prev, educationType: "madrasah", academicClass: "" }))}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        directForm.educationType === "madrasah"
                          ? "bg-emerald-600 text-white shadow-sm font-bold"
                          : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                      }`}
                    >
                      <span>🕌 মাদ্রাসা শিক্ষা</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirectForm((prev) => ({ ...prev, educationType: "higher", academicClass: "" }))}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        directForm.educationType === "higher"
                          ? "bg-purple-600 text-white shadow-sm font-bold"
                          : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                      }`}
                    >
                      <span>🎓 উচ্চশিক্ষা / অন্যান্য</span>
                    </button>
                  </div>
                </div>

                {/* Institution Name & Class Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      প্রতিষ্ঠানের নাম
                    </label>
                    <input
                      type="text"
                      value={directForm.institution}
                      onChange={(e) =>
                        setDirectForm((prev) => ({ ...prev, institution: e.target.value }))
                      }
                      placeholder={
                        directForm.educationType === "madrasah"
                          ? "যেমন: দারুল উলুম মাদ্রাসা, কাসেমিয়া..."
                          : "যেমন: গভঃ বয়েজ স্কুল, ঢাকা কলেজ..."
                      }
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      শ্রেণী {directForm.educationType === "general" ? "(প্লে থেকে দ্বাদশ)" : directForm.educationType === "madrasah" ? "(মাদ্রাসা স্তর)" : "(উচ্চশিক্ষা স্তর)"}
                    </label>
                    <select
                      value={directForm.academicClass}
                      onChange={(e) =>
                        setDirectForm((prev) => ({ ...prev, academicClass: e.target.value }))
                      }
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="" className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">-- শ্রেণী নির্বাচন করুন --</option>
                      {(directForm.educationType === "madrasah"
                        ? MADRASAH_CLASSES
                        : directForm.educationType === "higher"
                        ? HIGHER_CLASSES
                        : GENERAL_CLASSES
                      ).map((cls) => (
                        <option key={cls} value={cls} className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Section & Roll Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      শাখা / বিভাগ
                    </label>
                    <input
                      type="text"
                      value={directForm.section}
                      onChange={(e) =>
                        setDirectForm((prev) => ({ ...prev, section: e.target.value }))
                      }
                      placeholder="যেমন: ক, খ, বিজ্ঞান, মানবিক, হিফজ..."
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      রোল নম্বর
                    </label>
                    <input
                      type="text"
                      value={directForm.rollNumber}
                      onChange={(e) =>
                        setDirectForm((prev) => ({ ...prev, rollNumber: e.target.value }))
                      }
                      placeholder="যেমন: ০১, ১৫, ১০২..."
                      className="w-full p-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
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
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>সরাসরি ফ্যামিলি ট্রিতে সংরক্ষণ করুন</span>
              </button>
            </form>
          </div>
        )}


      {/* ─────────────────────────────────────────────
          MODAL 1: EDIT MEMBER MODAL
          ───────────────────────────────────────────── */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#303030] mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  সদস্যের তথ্য সম্পাদনা (Edit)
                </h3>
                <p className="text-xs text-slate-400 font-mono">আইডি: {editingMember.key}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  সদস্যের নাম *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.title}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, title: e.target.value })
                  }
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    জেন্ডার
                  </label>
                  <select
                    value={editingMember.gender}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, gender: e.target.value as any })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="male">পুরুষ ♂</option>
                    <option value="female">মহিলা ♀</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    অবস্থা
                  </label>
                  <select
                    value={editingMember.isAlive ? "alive" : "deceased"}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        isAlive: e.target.value === "alive",
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="alive">জীবিত</option>
                    <option value="deceased">মরহুম</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    জন্ম সাল
                  </label>
                  <input
                    type="text"
                    value={editingMember.birthYear || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, birthYear: e.target.value })
                    }
                    placeholder="যেমন: ১৯৭৫"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    মৃত্যু সাল (যদি থাকে)
                  </label>
                  <input
                    type="text"
                    value={editingMember.deathYear || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, deathYear: e.target.value })
                    }
                    placeholder="যেমন: ২০২০"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>
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
                    placeholder="যেমন: শিক্ষক, ব্যবসায়ী"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                    placeholder="01XXXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Blood Group (Mandatory) & NID/Birth Certificate (Optional) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    রক্তের গ্রুপ * <span className="text-rose-500 font-semibold">(আবশ্যিক)</span>
                  </label>
                  <select
                    required
                    value={editingMember.bloodGroup || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, bloodGroup: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-semibold"
                  >
                    <option value="">-- রক্তের গ্রুপ নির্বাচন করুন --</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    NID / জন্ম সনদ <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="text"
                    value={editingMember.nidOrBirthCert || ""}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, nidOrBirthCert: e.target.value })
                    }
                    placeholder="NID বা জন্ম সনদ নম্বর..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors font-mono"
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
                    placeholder="স্বামী / স্ত্রীর নাম..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
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
                    placeholder="বর্তমান ঠিকানা..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Academic Info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#2a2a2a] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>একাডেমিক তথ্য (ঐচ্ছিক)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMember({ ...editingMember, educationType: "general" as any })
                      }
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                        editingMember.educationType === "general" || !editingMember.educationType
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      সাধারণ
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMember({ ...editingMember, educationType: "madrasah" as any })
                      }
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                        editingMember.educationType === "madrasah"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      মাদ্রাসা
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingMember({ ...editingMember, educationType: "higher" as any })
                      }
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${
                        editingMember.educationType === "higher"
                          ? "bg-purple-600 text-white"
                          : "bg-slate-200 dark:bg-[#2a2a2a] text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      উচ্চশিক্ষা
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      প্রতিষ্ঠানের নাম
                    </label>
                    <input
                      type="text"
                      value={editingMember.institution || ""}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, institution: e.target.value })
                      }
                      placeholder="প্রতিষ্ঠানের নাম..."
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      শ্রেণী
                    </label>
                    <select
                      value={editingMember.academicClass || ""}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, academicClass: e.target.value })
                      }
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="">-- শ্রেণী নির্বাচন করুন --</option>
                      {(editingMember.educationType === "madrasah"
                        ? MADRASAH_CLASSES
                        : editingMember.educationType === "higher"
                        ? HIGHER_CLASSES
                        : GENERAL_CLASSES
                      ).map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                       শাখা / বিভাগ
                    </label>
                    <input
                      type="text"
                      value={editingMember.section || ""}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, section: e.target.value })
                      }
                      placeholder=" শাখা..."
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      রোল নম্বর
                    </label>
                    <input
                      type="text"
                      value={editingMember.rollNumber || ""}
                      onChange={(e) =>
                        setEditingMember({ ...editingMember, rollNumber: e.target.value })
                      }
                      placeholder="রোল..."
                      className="w-full p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
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
                  placeholder="সদস্য সম্পর্কিত বিবরণ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#303030]">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1f1f1f] dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
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
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 w-full max-w-sm shadow-2xl text-center">
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
                type="button"
                onClick={() => setDeletingMember(null)}
                className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                না, রাখুন
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
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
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              বাতিলের কারণ উল্লেখ করুন
            </h3>
            <textarea
              rows={3}
              value={rejectionReasonInput}
              onChange={(e) => setRejectionReasonInput(e.target.value)}
              placeholder="যেমন: পিতা ও বংশের তথ্য সঠিক পাওয়া যায়নি..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-xs text-slate-900 dark:text-white outline-none mb-3"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectingRequestId(null)}
                className="py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-[#1f1f1f] text-xs font-bold"
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

      {/* ─────────────────────────────────────────────
          MODAL 4: VIEW APPLICATION DETAILS MODAL
          ───────────────────────────────────────────── */}
      {viewingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-3xl p-6 w-full max-w-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#262626]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0 ${
                    viewingRequest.gender === "female"
                      ? "bg-gradient-to-br from-rose-500 to-pink-600"
                      : "bg-gradient-to-br from-blue-500 to-indigo-600"
                  }`}
                >
                  {viewingRequest.title.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {viewingRequest.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        viewingRequest.status === "pending"
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : viewingRequest.status === "approved"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {viewingRequest.status === "pending"
                        ? "অপেক্ষমাণ আবেদন"
                        : viewingRequest.status === "approved"
                        ? "অনুমোদিত আবেদন"
                        : "বাতিলকৃত আবেদন"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    আবেদনের তারিখ: {new Date(viewingRequest.createdAt).toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingRequest(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rejection reason if rejected */}
            {viewingRequest.status === "rejected" && viewingRequest.rejectionReason && (
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                <span className="font-bold block mb-0.5">বাতিল করার কারণ:</span>
                <p>{viewingRequest.rejectionReason}</p>
              </div>
            )}

            {/* Details Content */}
            <div className="space-y-4 text-xs">
              {/* Proposed Member Information */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>প্রস্তাবিত নতুন সদস্যের তথ্য</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-slate-200/60 dark:border-[#262626]">
                  <div>
                    <span className="text-[11px] text-slate-400 block">পূর্ণ নাম:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{viewingRequest.title}</p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">লিঙ্গ:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {viewingRequest.gender === "female" ? "কন্যা / মহিলা ♀" : "পুত্র / পুরুষ ♂"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">রক্তের গ্রুপ:</span>
                    {viewingRequest.bloodGroup ? (
                      <span className="font-mono font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5 fill-rose-500" />
                        {viewingRequest.bloodGroup}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-mono">—</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">NID / জন্ম সনদ নম্বর:</span>
                    <p className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {viewingRequest.nidOrBirthCert || "—"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">পিতা / অভিভাবক:</span>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {(() => {
                        const p = members.find((m) => m.key === viewingRequest.parentKey);
                        return p ? `${p.title} (${p.key})` : `${viewingRequest.parentName || ""} (${viewingRequest.parentKey})`;
                      })()}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">জীবনকাল ও অবস্থা:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {viewingRequest.birthYear || "অজানা"} - {viewingRequest.isAlive !== false ? "বর্তমান (জীবিত)" : viewingRequest.deathYear || "মরহুম"}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">মোবাইল নম্বর:</span>
                    {viewingRequest.phone ? (
                      <a href={`tel:${viewingRequest.phone}`} className="font-mono font-semibold text-emerald-600 hover:underline">
                        {viewingRequest.phone}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-mono">—</span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] text-slate-400 block">স্বামী / স্ত্রী:</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{viewingRequest.spouse || "—"}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-[11px] text-slate-400 block">বর্তমান ঠিকানা:</span>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{viewingRequest.address || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Education details */}
              {(viewingRequest.academicClass || viewingRequest.institution || viewingRequest.section || viewingRequest.rollNumber) && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    <span>শিক্ষা ও শিক্ষাপ্রতিষ্ঠান</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-slate-200/60 dark:border-[#262626]">
                    <div>
                      <span className="text-[11px] text-slate-400 block">অধ্যায়নরত শ্রেণি:</span>
                      <p className="font-bold text-blue-600 dark:text-blue-400">{viewingRequest.academicClass || "—"}</p>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block">শাখা ও রোল:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {viewingRequest.section ? `শাখা: ${viewingRequest.section}` : ""}
                        {viewingRequest.section && viewingRequest.rollNumber ? ", " : ""}
                        {viewingRequest.rollNumber ? `রোল: ${viewingRequest.rollNumber}` : ""}
                        {!viewingRequest.section && !viewingRequest.rollNumber ? "—" : ""}
                      </p>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-[11px] text-slate-400 block">শিক্ষাপ্রতিষ্ঠানের নাম:</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{viewingRequest.institution || "—"}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bio notes if present */}
              {viewingRequest.bio && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">সংক্ষিপ্ত পরিচিতি বা নোট</h4>
                  <p className="p-3 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl border border-slate-200/60 dark:border-[#262626] text-slate-700 dark:text-slate-300">
                    {viewingRequest.bio}
                  </p>
                </div>
              )}

              {/* Submitter details */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>তথ্য প্রদানকারীর বিবরণ (Submitter Info)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-4 border border-slate-200/60 dark:border-[#262626]">
                  <div>
                    <span className="text-[11px] text-slate-400 block">নাম:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{viewingRequest.submitterName || "নাম উল্লেখ নেই"}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">মোবাইল:</span>
                    {viewingRequest.submitterPhone ? (
                      <a href={`tel:${viewingRequest.submitterPhone}`} className="font-mono font-bold text-emerald-600 hover:underline">
                        {viewingRequest.submitterPhone}
                      </a>
                    ) : (
                      <span className="text-slate-400 font-mono">—</span>
                    )}
                  </div>
                  {viewingRequest.submitterEmail && (
                    <div className="sm:col-span-2">
                      <span className="text-[11px] text-slate-400 block">ইমেইল:</span>
                      <p className="font-mono text-slate-700 dark:text-slate-300">{viewingRequest.submitterEmail}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer action buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-[#262626]">
              <button
                type="button"
                onClick={() => setViewingRequest(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#202020] dark:hover:bg-[#282828] text-slate-700 dark:text-slate-200 font-bold cursor-pointer text-xs transition-colors"
              >
                বন্ধ করুন
              </button>

              <div className="flex items-center gap-2">
                {viewingRequest.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        const id = viewingRequest.id;
                        setViewingRequest(null);
                        setRejectingRequestId(id);
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 text-rose-600 font-bold cursor-pointer text-xs flex items-center gap-1 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>বাতিল করুন</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const id = viewingRequest.id;
                        setViewingRequest(null);
                        handleApproveRequest(id);
                      }}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer text-xs flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>অনুমোদন করুন (Approve)</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          REUSABLE MODAL: ADD MEMBER MODAL (From /family-tree)
          ───────────────────────────────────────────── */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        treeData={members as any}
        onAddMember={handleModalAddMember}
      />
    </div>
  );
}
