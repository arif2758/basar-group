"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Heart,
  PlusCircle,
  Edit3,
  GitBranch,
  GraduationCap,
  Droplet,
  CreditCard,
  Calendar,
  Share2,
  Check,
  Printer,
  Copy,
  Users,
  ChevronRight,
  School,
  BookOpen,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  UserPlus,
  TreePine,
  Trash2,
} from "lucide-react";
import { FlatFamilyMember, FamilyMember } from "@/data/familyData";
import {
  getGenerationLabel,
  getGenerationColor,
  parseMemberKeyInfo,
} from "@/utils/familyUtils";
import {
  BLOOD_GROUPS,
  BloodGroup,
  GENERAL_CLASSES,
  MADRASAH_CLASSES,
  HIGHER_CLASSES,
  EducationType,
} from "@/types/enums";
import { Modal, Radio } from "antd";

export default function MemberProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawKey = params?.key as string;
  const memberKey = rawKey ? decodeURIComponent(rawKey) : "";

  const [members, setMembers] = useState<FlatFamilyMember[]>([]);
  const [tree, setTree] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState<Partial<FlatFamilyMember>>({});
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [isUpdating, setIsUpdating] = useState(false);

  // Add Child Modal State
  const [isAddChildModalOpen, setIsAddChildModalOpen] = useState(false);
  const [childForm, setChildForm] = useState({
    title: "",
    gender: "male" as "male" | "female",
    bloodGroup: "A+" as BloodGroup,
    nidOrBirthCert: "",
    birthYear: "",
    isAlive: true,
    phone: "",
    address: "",
    spouse: "",
    bio: "",
    educationType: "general" as "general" | "madrasah" | "higher" | "other",
    institution: "",
    academicClass: "",
    section: "",
    rollNumber: "",
  });
  const [childErrors, setChildErrors] = useState<Record<string, string>>({});
  const [isAddingChild, setIsAddingChild] = useState(false);

  // Delete modal confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Toast / Banner Message
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 4500);
  };

  // Fetch Tree Data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/family-tree?t=" + Date.now());
      const data = await res.json();
      if (data.success) {
        setMembers(data.members || []);
        setTree(data.tree || []);
      }
    } catch (err) {
      console.error("Failed to load member profile:", err);
      showToast("error", "সদস্যের ডাটা লোড করতে সমস্যা হয়েছে।");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Current Member
  const member = useMemo(() => {
    return members.find((m) => m.key === memberKey) || null;
  }, [members, memberKey]);

  // Parent Member
  const parent = useMemo(() => {
    if (!member?.parentKey) return null;
    return members.find((m) => m.key === member.parentKey) || null;
  }, [member, members]);

  // Direct Children
  const children = useMemo(() => {
    if (!member) return [];
    return members.filter((m) => m.parentKey === member.key);
  }, [member, members]);

  // Siblings (Same parent, excluding self)
  const siblings = useMemo(() => {
    if (!member?.parentKey) return [];
    return members.filter(
      (m) => m.parentKey === member.parentKey && m.key !== member.key
    );
  }, [member, members]);

  // Ancestry Trail (Root -> Parent -> Current)
  const ancestryTrail = useMemo(() => {
    if (!member) return [];
    const trail: FlatFamilyMember[] = [];
    let curr: FlatFamilyMember | undefined = member;

    while (curr) {
      trail.unshift(curr);
      if (!curr.parentKey) break;
      curr = members.find((m) => m.key === curr!.parentKey);
    }
    return trail;
  }, [member, members]);

  // Copy URL
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      showToast("success", "প্রোফাইল লিংক ক্লিপবোর্ডে কপি হয়েছে!");
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Copy Field
  const handleCopyField = (val: string, fieldName: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(val);
      setCopiedField(fieldName);
      showToast("success", `${fieldName} কপি হয়েছে!`);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  // Print Profile
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Open Edit Modal
  const handleOpenEdit = () => {
    if (!member) return;
    setEditForm({
      title: member.title,
      gender: member.gender,
      bloodGroup: member.bloodGroup || "A+",
      nidOrBirthCert: member.nidOrBirthCert || "",
      birthYear: member.birthYear || "",
      deathYear: member.deathYear || "",
      isAlive: member.isAlive !== false,
      phone: member.phone || "",
      address: member.address || "",
      spouse: member.spouse || "",
      bio: member.bio || "",
      educationType: (member.educationType as any) || "general",
      institution: member.institution || "",
      academicClass: member.academicClass || "",
      section: member.section || "",
      rollNumber: member.rollNumber || "",
    });
    setEditErrors({});
    setIsEditModalOpen(true);
  };

  // Submit Edit
  const handleSaveEdit = async () => {
    if (!member) return;
    const errors: Record<string, string> = {};
    if (!editForm.title?.trim()) errors.title = "সদস্যের নাম আবশ্যক।";
    if (!editForm.bloodGroup?.trim()) errors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন।";

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: member.key,
          updateData: editForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", "সদস্যের তথ্য সফলভাবে হালনাগাদ করা হয়েছে!");
        setIsEditModalOpen(false);
        fetchData();
      } else {
        showToast("error", data.error || "হালনাগাদ করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "সার্ভার এরর: তথ্য আপডেট করা সম্ভব হয়নি।");
    } finally {
      setIsUpdating(false);
    }
  };

  // Open Add Child Modal
  const handleOpenAddChild = () => {
    if (!member) return;
    setChildForm({
      title: "",
      gender: "male",
      bloodGroup: "A+",
      nidOrBirthCert: "",
      birthYear: "",
      isAlive: true,
      phone: "",
      address: member.address || "",
      spouse: "",
      bio: "",
      educationType: "general",
      institution: "",
      academicClass: "",
      section: "",
      rollNumber: "",
    });
    setChildErrors({});
    setIsAddChildModalOpen(true);
  };

  // Submit Add Child
  const handleSaveAddChild = async () => {
    if (!member) return;
    const errors: Record<string, string> = {};
    if (!childForm.title.trim()) errors.title = "সন্তানের নাম আবশ্যক।";
    if (!childForm.bloodGroup.trim()) errors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন।";

    if (Object.keys(errors).length > 0) {
      setChildErrors(errors);
      return;
    }

    setIsAddingChild(true);
    try {
      const res = await fetch("/api/admin/family-tree/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentKey: member.key,
          memberData: childForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("success", `${childForm.title} সফলভাবে সন্তান হিসেবে যুক্ত হয়েছে!`);
        setIsAddChildModalOpen(false);
        fetchData();
      } else {
        showToast("error", data.error || "সন্তান যুক্ত করতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "সার্ভার এরর: সন্তান যোগ করা সম্ভব হয়নি।");
    } finally {
      setIsAddingChild(false);
    }
  };

  // Delete Member
  const handleDeleteMember = async () => {
    if (!member || member.key === "1") return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/family-tree/member?key=${encodeURIComponent(member.key)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setIsDeleteModalOpen(false);
        router.push("/admin/family-tree");
      } else {
        showToast("error", data.error || "মুছে ফেলতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "সার্ভার এরর: সদস্য মুছে ফেলা যায়নি।");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          সদস্য প্রোফাইল লোড হচ্ছে...
        </p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2a2a2a] rounded-3xl p-10 text-center max-w-lg mx-auto mt-12 space-y-4 shadow-sm">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          সদস্য খুঁজে পাওয়া যায়নি
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          আইডি <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{memberKey}</span> এর কোনো সদস্য পরিবারবৃক্ষে পাওয়া যায়নি অথবা হয়তো মুছে ফেলা হয়েছে।
        </p>
        <Link
          href="/admin/family-tree"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল সদস্য তালিকায় ফিরুন</span>
        </Link>
      </div>
    );
  }

  const genColor = getGenerationColor(member.generation);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 print:p-0 print:m-0 print:max-w-none">
      {/* Toast Alert */}
      {toastMsg && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all flex items-center gap-2 ${
            toastMsg.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {toastMsg.type === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* ── Breadcrumb & Navigation Bar (Hidden in Print) ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link
            href="/admin"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ড্যাশবোর্ড
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href="/admin/family-tree"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            বংশলতিকা ও সদস্য পরিচালনা
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900 dark:text-white">
            {member.title}
          </span>
        </div>

        <Link
          href="/admin/family-tree"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1f1f1f] dark:hover:bg-[#2a2a2a] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সকল সদস্য তালিকায় ফিরুন</span>
        </Link>
      </div>

      {/* ── HERO PROFILE HEADER CARD ── */}
      <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: genColor }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Member Identity & Avatar */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Initial Avatar */}
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl text-white shadow-md shrink-0 ${
                member.gender === "female"
                  ? "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20"
              }`}
            >
              {member.title.charAt(0)}
            </div>

            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {member.title}
                </h1>

                {/* Blood Group Badge */}
                {member.bloodGroup ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 shadow-2xs">
                    <Droplet className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    {member.bloodGroup}
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-[#202020]">
                    রক্তের গ্রুপ নেই
                  </span>
                )}
              </div>

              {/* Informative Pills */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {/* Gen ID */}
                <span className="inline-flex items-center font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/50 px-2.5 py-0.5 rounded-md">
                  জেন আইডি: {member.key}
                </span>

                {/* Generation Label */}
                <span
                  className="font-bold px-2.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${genColor}15`,
                    color: genColor,
                    border: `1px solid ${genColor}35`,
                  }}
                >
                  {getGenerationLabel(member.generation)}
                </span>

                {/* Living status */}
                <span
                  className={`font-semibold px-2 py-0.5 rounded-md text-[11px] ${
                    member.isAlive !== false
                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/70 dark:border-emerald-800/40"
                      : "bg-slate-100 dark:bg-[#202020] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#333]"
                  }`}
                >
                  {member.isAlive !== false ? "জীবিত" : "মরহুম / প্রয়াত"}
                </span>

                {/* Academic Class Chip */}
                {member.academicClass && (
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1f1f1f] px-2 py-0.5 rounded-md border border-slate-200/70 dark:border-[#333]">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    {member.academicClass}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Toolbar (Hidden in Print) */}
          <div className="flex items-center gap-2 flex-wrap shrink-0 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              title="প্রোফাইল বিবরণী প্রিন্ট করুন"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#202020] dark:hover:bg-[#2a2a2a] text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>প্রিন্ট</span>
            </button>

            <button
              type="button"
              onClick={handleCopyLink}
              title="প্রোফাইল লিংক কপি করুন"
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#202020] dark:hover:bg-[#2a2a2a] text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">কপি হয়েছে!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>লিংক কপি</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleOpenEdit}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/15 dark:hover:bg-blue-500/25 text-blue-600 dark:text-blue-400 border border-blue-200/70 dark:border-blue-800/40 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              <span>সম্পাদনা</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddChild}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ সন্তান যোগ</span>
            </button>

            {member.key !== "1" && (
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                title="সদস্য মুছে ফেলুন"
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/15 dark:hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 border border-rose-200/70 dark:border-rose-800/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PRINT HEADER ONLY (Visible when printed) ── */}
      <div className="hidden print:block text-center border-b-2 border-slate-900 pb-4 mb-6">
        <h2 className="text-2xl font-black">বসার গ্রুপ পরিবারবৃক্ষ (Basar Group Family Tree)</h2>
        <p className="text-xs text-slate-600">সদস্য পরিচিতি ও বংশলতিকা বিবরণী</p>
        <p className="text-[10px] text-slate-400 mt-1">তারিখ: {new Date().toLocaleDateString("bn-BD")}</p>
      </div>

      {/* ── DOSSIER DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Main Dossier Cards (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: ব্যক্তিগত ও নাগরিক পরিচিতি */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-[#262626]">
              <User className="w-4 h-4 text-emerald-500" />
              <span>ব্যক্তিগত ও পরিচয় সংক্রান্ত তথ্য</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Full Name */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  সদস্যের পূর্ণ নাম:
                </span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {member.title}
                </p>
              </div>

              {/* Gen ID */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  বংশলতিকা জেন আইডি:
                </span>
                <p className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                  {member.key}
                </p>
              </div>

              {/* Blood Group */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  রক্তের গ্রুপ (Blood Group):
                </span>
                {member.bloodGroup ? (
                  <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                    <Droplet className="w-4 h-4 fill-rose-500 text-rose-500" />
                    {member.bloodGroup}
                  </span>
                ) : (
                  <span className="text-slate-400 font-mono text-sm">—</span>
                )}
              </div>

              {/* NID / Birth Cert */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                    NID / জন্ম নিবন্ধন সনদ:
                  </span>
                  {member.nidOrBirthCert ? (
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {member.nidOrBirthCert}
                    </span>
                  ) : (
                    <span className="text-slate-400 font-mono text-sm">—</span>
                  )}
                </div>
                {member.nidOrBirthCert && (
                  <button
                    type="button"
                    onClick={() => handleCopyField(member.nidOrBirthCert!, "NID নম্বর")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="NID কপি করুন"
                  >
                    {copiedField === "NID নম্বর" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Gender */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  লিঙ্গ:
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.gender === "female" ? "মহিলা ♀" : "পুরুষ ♂"}
                </p>
              </div>

              {/* Life Span (Birth & Death Year) */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  জীবনকাল (জন্ম - মৃত্যু):
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.birthYear || "অজানা"} -{" "}
                  {member.isAlive !== false ? "বর্তমান (জীবিত)" : member.deathYear || "অজানা (প্রয়াত)"}
                </p>
              </div>

              {/* Spouse */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626] sm:col-span-2">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  জীবনসঙ্গী (স্বামী / স্ত্রী):
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.spouse || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: শিক্ষা ও প্রাতিষ্ঠানিক তথ্য */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-[#262626]">
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span>শিক্ষা ও প্রাতিষ্ঠানিক তথ্য</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Academic Class */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  বর্তমান অধ্যায়নরত শ্রেণি:
                </span>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {member.academicClass || "—"}
                </p>
              </div>

              {/* Section & Roll */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  শাখা ও রোল নম্বর:
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.section ? `শাখা: ${member.section}` : "শাখা নেই"}
                  {member.rollNumber ? `, রোল: ${member.rollNumber}` : ""}
                </p>
              </div>

              {/* Education Type */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  শিক্ষার ধরন:
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.educationType === "madrasah"
                    ? "মাদ্রাসা শিক্ষা"
                    : member.educationType === "higher"
                    ? "উচ্চশিক্ষা"
                    : member.educationType === "other"
                    ? "অন্যান্য"
                    : "সাধারণ শিক্ষা"}
                </p>
              </div>

              {/* Institution */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  শিক্ষাপ্রতিষ্ঠানের নাম:
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {member.institution || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: যোগাযোগ ও বাসস্থান */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-[#262626]">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>যোগাযোগ ও বর্তমান বাসস্থান</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Phone */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                    মোবাইল নম্বর:
                  </span>
                  {member.phone ? (
                    <a
                      href={`tel:${member.phone}`}
                      className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      {member.phone}
                    </a>
                  ) : (
                    <span className="text-slate-400 font-mono text-sm">—</span>
                  )}
                </div>
                {member.phone && (
                  <button
                    type="button"
                    onClick={() => handleCopyField(member.phone!, "মোবাইল নম্বর")}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                    title="ফোন নম্বর কপি করুন"
                  >
                    {copiedField === "মোবাইল নম্বর" ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Address */}
              <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626]">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  বর্তমান ঠিকানা / বাসস্থান:
                </span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {member.address || "—"}
                </p>
              </div>

              {/* Bio / Notes */}
              {member.bio && (
                <div className="bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl p-3.5 border border-slate-100 dark:border-[#262626] sm:col-span-2">
                  <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                    সংক্ষিপ্ত পরিচিতি / নোট:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Family Connections & Lineage (1/3 width) */}
        <div className="space-y-6">
          {/* Card 4: পিতা / অভিভাবক */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-500" />
              <span>পিতা / অভিভাবক</span>
            </h3>

            {parent ? (
              <Link
                href={`/admin/family-tree/${parent.key}`}
                className="group block bg-slate-50 hover:bg-emerald-50/60 dark:bg-[#1a1a1a] dark:hover:bg-[#1f293d] border border-slate-200/70 dark:border-[#2e2e2e] hover:border-emerald-300 dark:hover:border-emerald-700 rounded-2xl p-4 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 text-sm">
                      {parent.title}
                    </h4>
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                      আইডি: {parent.key}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </div>
                {parent.bloodGroup && (
                  <div className="mt-2 text-[11px] font-bold text-rose-600 dark:text-rose-400 font-mono inline-flex items-center gap-1">
                    <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>গ্রুপ: {parent.bloodGroup}</span>
                  </div>
                )}
              </Link>
            ) : (
              <div className="bg-slate-50 dark:bg-[#1a1a1a] border border-slate-200/70 dark:border-[#2e2e2e] rounded-2xl p-4 text-center">
                <TreePine className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  মূল আদি পুরুষ (Root Ancestor)
                </p>
                <p className="text-[10px] text-slate-400">
                  পরিবারের ভিত্তি ও প্রথম প্রজন্ম।
                </p>
              </div>
            )}
          </div>

          {/* Card 5: বংশধারা ক্রম ট্রেইল (Ancestral Trail) */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <TreePine className="w-4 h-4 text-emerald-500" />
              <span>বংশধারা ক্রম (Ancestry Trail)</span>
            </h3>

            <div className="space-y-2">
              {ancestryTrail.map((anc, idx) => {
                const isCurrent = anc.key === member.key;
                return (
                  <div key={anc.key} className="flex items-center gap-2 text-xs">
                    <div className="w-5 flex justify-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isCurrent
                            ? "bg-emerald-500 ring-4 ring-emerald-500/20"
                            : "bg-slate-300 dark:bg-slate-600"
                        }`}
                      />
                    </div>
                    <Link
                      href={`/admin/family-tree/${anc.key}`}
                      className={`flex-1 px-3 py-1.5 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "bg-slate-50 dark:bg-[#1a1a1a] border-slate-200/60 dark:border-[#2a2a2a] text-slate-700 dark:text-slate-300 hover:border-slate-300"
                      }`}
                    >
                      <span className="truncate">{anc.title}</span>
                      <span className="font-mono text-[10px] opacity-75">
                        {anc.key}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 6: সন্তানসন্ততি (Direct Children) */}
          <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" />
                <span>সন্তানসন্ততি ({children.length} জন)</span>
              </h3>
              <button
                type="button"
                onClick={handleOpenAddChild}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline print:hidden cursor-pointer"
              >
                + সন্তান যোগ
              </button>
            </div>

            {children.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {children.map((child) => (
                  <Link
                    key={child.key}
                    href={`/admin/family-tree/${child.key}`}
                    className="group block bg-slate-50 hover:bg-emerald-50/50 dark:bg-[#1a1a1a] dark:hover:bg-[#1f293d] border border-slate-200/70 dark:border-[#2a2a2a] hover:border-emerald-300 dark:hover:border-emerald-700 rounded-xl p-2.5 transition-all text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                          {child.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                            {child.key}
                          </span>
                          {child.bloodGroup && (
                            <span className="font-mono text-[10px] text-rose-600 dark:text-rose-400 font-bold inline-flex items-center gap-0.5">
                              <Droplet className="w-2.5 h-2.5 fill-rose-500" />
                              {child.bloodGroup}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl border border-dashed border-slate-200 dark:border-[#303030]">
                <p className="text-xs text-slate-400">কোনো সন্তান রেকর্ড করা নেই।</p>
                <button
                  type="button"
                  onClick={handleOpenAddChild}
                  className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline print:hidden cursor-pointer"
                >
                  + প্রথম সন্তান যোগ করুন
                </button>
              </div>
            )}
          </div>

          {/* Card 7: সহোদর ভাই-বোন (Siblings) */}
          {siblings.length > 0 && (
            <div className="bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span>সহোদর ভাই-বোন ({siblings.length} জন)</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {siblings.map((sib) => (
                  <Link
                    key={sib.key}
                    href={`/admin/family-tree/${sib.key}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#1a1a1a] dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#2a2a2a] text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 transition-all"
                  >
                    <span>{sib.title}</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      ({sib.key})
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── EDIT MEMBER MODAL ── */}
      <Modal
        title={
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-[#262626]">
            <Edit3 className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-base text-slate-900 dark:text-white">
              সদস্যের তথ্য সম্পাদনা করুন
            </span>
          </div>
        }
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
        width={700}
        destroyOnHidden
        className="admin-edit-member-modal"
      >
        <div className="pt-3 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                সদস্যের পূর্ণ নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={editForm.title || ""}
                onChange={(e) => {
                  setEditForm((prev) => ({ ...prev, title: e.target.value }));
                  setEditErrors((prev) => ({ ...prev, title: "" }));
                }}
                className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border ${
                  editErrors.title ? "border-rose-500" : "border-slate-200 dark:border-[#303030]"
                } text-slate-900 dark:text-white outline-none focus:border-blue-500`}
                placeholder="যেমন: হাজী মোঃ আব্দুর রহিম"
              />
              {editErrors.title && (
                <p className="text-rose-500 text-[11px] mt-1">{editErrors.title}</p>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-rose-500" />
                <span>রক্তের গ্রুপ</span> <span className="text-rose-500">*</span>
              </label>
              <select
                value={editForm.bloodGroup || ""}
                onChange={(e) => {
                  setEditForm((prev) => ({ ...prev, bloodGroup: e.target.value as BloodGroup }));
                  setEditErrors((prev) => ({ ...prev, bloodGroup: "" }));
                }}
                className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border ${
                  editErrors.bloodGroup ? "border-rose-500" : "border-slate-200 dark:border-[#303030]"
                } text-slate-900 dark:text-white outline-none font-bold text-xs`}
              >
                <option value="">নির্বাচন করুন</option>
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              {editErrors.bloodGroup && (
                <p className="text-rose-500 text-[11px] mt-1">{editErrors.bloodGroup}</p>
              )}
            </div>

            {/* NID / Birth Cert */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-indigo-500" />
                <span>NID / জন্ম সনদ নম্বর (ঐচ্ছিক)</span>
              </label>
              <input
                type="text"
                value={editForm.nidOrBirthCert || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, nidOrBirthCert: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none font-mono"
                placeholder="যেমন: 19901234567890"
              />
            </div>

            {/* Academic Class */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-blue-500" />
                <span>অধ্যায়নরত শ্রেণি</span>
              </label>
              <input
                type="text"
                value={editForm.academicClass || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, academicClass: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="যেমন: ১০ম শ্রেণি / অনার্স ২য় বর্ষ"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                শিক্ষাপ্রতিষ্ঠান
              </label>
              <input
                type="text"
                value={editForm.institution || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, institution: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="স্কুল / কলেজ / বিশ্ববিদ্যালয়ের নাম"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-500" />
                <span>মোবাইল নম্বর</span>
              </label>
              <input
                type="text"
                value={editForm.phone || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none font-mono"
                placeholder="০১৭xxxxxxxx"
              />
            </div>

            {/* Spouse */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" />
                <span>স্ত্রী / স্বামীর নাম</span>
              </label>
              <input
                type="text"
                value={editForm.spouse || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, spouse: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="জীবনসঙ্গীর নাম"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>বর্তমান ঠিকানা</span>
              </label>
              <input
                type="text"
                value={editForm.address || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা"
              />
            </div>

            {/* Life Status */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                অবস্থা
              </label>
              <Radio.Group
                value={editForm.isAlive ? "alive" : "deceased"}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    isAlive: e.target.value === "alive",
                  }))
                }
              >
                <Radio value="alive">জীবিত</Radio>
                <Radio value="deceased">মরহুম / প্রয়াত</Radio>
              </Radio.Group>
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                সংক্ষিপ্ত পরিচিতি / বায়ো
              </label>
              <textarea
                rows={2}
                value={editForm.bio || ""}
                onChange={(e) => setEditForm((prev) => ({ ...prev, bio: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="সদস্য সম্পর্কে অতিরিক্ত কোনো তথ্য..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#252525] dark:hover:bg-[#303030] text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              disabled={isUpdating}
              onClick={handleSaveEdit}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              {isUpdating ? "সংরক্ষণ হচ্ছে..." : "তথ্য সংরক্ষণ করুন"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── ADD CHILD MODAL ── */}
      <Modal
        title={
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-[#262626]">
            <PlusCircle className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-base text-slate-900 dark:text-white">
              {member.title} এর নতুন সন্তান যোগ করুন
            </span>
          </div>
        }
        open={isAddChildModalOpen}
        onCancel={() => setIsAddChildModalOpen(false)}
        footer={null}
        width={700}
        destroyOnHidden
        className="admin-add-child-modal"
      >
        <div className="pt-3 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Child Name */}
            <div className="sm:col-span-2">
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                সন্তানের পূর্ণ নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={childForm.title}
                onChange={(e) => {
                  setChildForm((prev) => ({ ...prev, title: e.target.value }));
                  setChildErrors((prev) => ({ ...prev, title: "" }));
                }}
                className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border ${
                  childErrors.title ? "border-rose-500" : "border-slate-200 dark:border-[#303030]"
                } text-slate-900 dark:text-white outline-none focus:border-emerald-500`}
                placeholder="যেমন: মোঃ সাকিবুর রহমান"
              />
              {childErrors.title && (
                <p className="text-rose-500 text-[11px] mt-1">{childErrors.title}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                লিঙ্গ <span className="text-rose-500">*</span>
              </label>
              <Radio.Group
                value={childForm.gender}
                onChange={(e) => setChildForm((prev) => ({ ...prev, gender: e.target.value }))}
              >
                <Radio value="male">পুত্র (পুরুষ ♂)</Radio>
                <Radio value="female">কন্যা (মহিলা ♀)</Radio>
              </Radio.Group>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-rose-500" />
                <span>রক্তের গ্রুপ</span> <span className="text-rose-500">*</span>
              </label>
              <select
                value={childForm.bloodGroup}
                onChange={(e) => {
                  setChildForm((prev) => ({ ...prev, bloodGroup: e.target.value as BloodGroup }));
                  setChildErrors((prev) => ({ ...prev, bloodGroup: "" }));
                }}
                className={`w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border ${
                  childErrors.bloodGroup ? "border-rose-500" : "border-slate-200 dark:border-[#303030]"
                } text-slate-900 dark:text-white outline-none font-bold text-xs`}
              >
                {BLOOD_GROUPS.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
              {childErrors.bloodGroup && (
                <p className="text-rose-500 text-[11px] mt-1">{childErrors.bloodGroup}</p>
              )}
            </div>

            {/* Academic Class */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-blue-500" />
                <span>অধ্যায়নরত শ্রেণি</span>
              </label>
              <input
                type="text"
                value={childForm.academicClass}
                onChange={(e) => setChildForm((prev) => ({ ...prev, academicClass: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="যেমন: ৫ম শ্রেণি / দাখিল ৮ম শ্রেণি"
              />
            </div>

            {/* Institution */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                শিক্ষাপ্রতিষ্ঠান
              </label>
              <input
                type="text"
                value={childForm.institution}
                onChange={(e) => setChildForm((prev) => ({ ...prev, institution: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none"
                placeholder="স্কুল / মাদ্রাসার নাম"
              />
            </div>

            {/* NID / Birth Cert */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-indigo-500" />
                <span>NID / জন্ম নিবন্ধন নম্বর</span>
              </label>
              <input
                type="text"
                value={childForm.nidOrBirthCert}
                onChange={(e) => setChildForm((prev) => ({ ...prev, nidOrBirthCert: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none font-mono"
                placeholder="জন্ম নিবন্ধন সনদ নম্বর"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-500" />
                <span>মোবাইল নম্বর</span>
              </label>
              <input
                type="text"
                value={childForm.phone}
                onChange={(e) => setChildForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1c1c1c] border border-slate-200 dark:border-[#303030] text-slate-900 dark:text-white outline-none font-mono"
                placeholder="০১৭xxxxxxxx"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#262626]">
            <button
              type="button"
              onClick={() => setIsAddChildModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#252525] dark:hover:bg-[#303030] text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              disabled={isAddingChild}
              onClick={handleSaveAddChild}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              {isAddingChild ? "যোগ হচ্ছে..." : "+ সন্তান যোগ করুন"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── DELETE MODAL ── */}
      <Modal
        title="সদস্য মুছে ফেলার নিশ্চিতকরণ"
        open={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        footer={null}
        width={420}
      >
        <div className="space-y-4 py-2 text-xs">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            আপনি কি নিশ্চিতভাবে <span className="font-bold text-rose-600">{member.title}</span> (আইডি: {member.key}) কে পরিবারবৃক্ষ থেকে মুছে ফেলতে চান? এর অধীনস্থ সকল বংশধরও মুছে যাবে।
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#252525] text-slate-700 dark:text-slate-200 font-bold cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteMember}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-all shadow-sm cursor-pointer"
            >
              {isDeleting ? "মুছে ফেলা হচ্ছে..." : "মুছে ফেলুন"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
