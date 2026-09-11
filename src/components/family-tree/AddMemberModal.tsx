"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  UserPlus,
  TreePine,
  Search,
  Check,
  AlertCircle,
  Sparkles,
  User,
  Heart,
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { FamilyMember } from "@/data/familyData";
import {
  getAllSelectableParents,
  generateNextChildKey,
  getGenerationLabel,
  findMemberByKey,
} from "@/utils/familyUtils";
import {
  GENERAL_CLASSES,
  MADRASAH_CLASSES,
  HIGHER_CLASSES,
  BLOOD_GROUPS,
} from "@/types/enums";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  treeData: FamilyMember[];
  initialParentKey?: string;
  onAddMember: (
    parentKey: string,
    memberData: Omit<FamilyMember, "key" | "generation"> & { suggestedKey?: string },
    submitterInfo?: { name: string; phone: string }
  ) => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  treeData,
  initialParentKey,
  onAddMember,
}: AddMemberModalProps) {
  const [parentKey, setParentKey] = useState<string>("");
  const [parentSearch, setParentSearch] = useState<string>("");
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);
  const [childOrder, setChildOrder] = useState<string>("");

  // Member form fields
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isAlive, setIsAlive] = useState<boolean>(true);
  const [birthYear, setBirthYear] = useState("");
  const [deathYear, setDeathYear] = useState("");
  const [profession, setProfession] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [spouse, setSpouse] = useState("");
  const [bio, setBio] = useState("");
  const [educationType, setEducationType] = useState<"general" | "madrasah" | "higher" | "other">("general");
  const [institution, setInstitution] = useState("");
  const [academicClass, setAcademicClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [nidOrBirthCert, setNidOrBirthCert] = useState("");

  // Submitter info (who submitted the info)
  const [submitterName, setSubmitterName] = useState("");
  const [submitterPhone, setSubmitterPhone] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset or set initial parent on open
  useEffect(() => {
    if (isOpen) {
      const defaultKey = initialParentKey || "1-1-1-1-1"; // Default to Malek Basar or initial
      setParentKey(defaultKey);
      const parentMember = findMemberByKey(treeData, defaultKey);
      if (parentMember) {
        setParentSearch(`${parentMember.title} (জেন আইডি: ${parentMember.key})`);
      }
      setErrors({});
    }
  }, [isOpen, initialParentKey, treeData]);

  // All selectable parents
  const allParents = useMemo(
    () => getAllSelectableParents(treeData),
    [treeData]
  );

  // Filtered parents based on search input
  const filteredParents = useMemo(() => {
    if (!parentSearch.trim()) return allParents.slice(0, 15);
    const q = parentSearch.toLowerCase();
    return allParents
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.key.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [allParents, parentSearch]);

  // Selected parent member
  const selectedParent = useMemo(
    () => findMemberByKey(treeData, parentKey),
    [treeData, parentKey]
  );

  // Auto-calculated proposed semantic ID
  const proposedKey = useMemo(() => {
    if (!selectedParent || !childOrder) return "";
    return `${selectedParent.key}-${childOrder}`;
  }, [selectedParent, childOrder]);

  const proposedGen = useMemo(() => {
    if (!selectedParent) return 1;
    return selectedParent.generation + 1;
  }, [selectedParent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!parentKey) {
      newErrors.parent = "অনুগ্রহ করে পিতা/অভিভাবক নির্বাচন করুন";
    }
    if (!childOrder) {
      newErrors.childOrder = "অনুগ্রহ করে কত তম সন্তান তা নির্বাচন করুন";
    }
    if (!title.trim()) {
      newErrors.title = "সদস্যের পূর্ণ নাম দেওয়া আবশ্যক";
    }
    if (!bloodGroup.trim()) {
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করা আবশ্যিক";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddMember(
      parentKey,
      {
        suggestedKey: proposedKey,
        title: title.trim(),
        gender,
        isAlive,
        birthYear: birthYear.trim() || undefined,
        deathYear: !isAlive ? deathYear.trim() || undefined : undefined,
        profession: profession.trim() || undefined,
        phone: phone.trim() || undefined,
        address: address.trim() || undefined,
        spouse: spouse.trim() || undefined,
        bio: bio.trim() || undefined,
        educationType: educationType || undefined,
        institution: institution.trim() || undefined,
        academicClass: academicClass.trim() || undefined,
        section: section.trim() || undefined,
        rollNumber: rollNumber.trim() || undefined,
        bloodGroup: bloodGroup.trim() || undefined,
        nidOrBirthCert: nidOrBirthCert.trim() || undefined,
      },
      submitterName.trim()
        ? {
            name: submitterName.trim(),
            phone: submitterPhone.trim(),
          }
        : undefined
    );

    // Reset Form
    setChildOrder("");
    setTitle("");
    setBirthYear("");
    setDeathYear("");
    setProfession("");
    setPhone("");
    setAddress("");
    setSpouse("");
    setBio("");
    setEducationType("general");
    setInstitution("");
    setAcademicClass("");
    setSection("");
    setRollNumber("");
    setBloodGroup("");
    setNidOrBirthCert("");
    setSubmitterName("");
    setSubmitterPhone("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#303030] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Mobile Pull Bar */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-3 mb-1 flex-shrink-0" />

        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-[#303030]/80 flex-shrink-0 bg-slate-50/70 dark:bg-[#141414]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <UserPlus className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                পরিবারে নতুন সদস্য যুক্ত করুন
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                বংশলতিকায় নতুন সন্তান বা সদস্যের তথ্য অন্তর্ভুক্তি ফর্ম
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#ffffff14] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto px-5 sm:px-6 py-5 space-y-5 flex-1">
          {/* Section 1: Parent Selection & Auto Semantic ID */}
          <div className="p-4 rounded-2xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 space-y-3">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              ১. পিতা বা মাতা নির্বাচন করুন <span className="text-rose-500">*</span>
            </label>

            {/* Parent Searchable Combobox */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={parentSearch}
                  onChange={(e) => {
                    setParentSearch(e.target.value);
                    setIsParentDropdownOpen(true);
                  }}
                  onFocus={() => setIsParentDropdownOpen(true)}
                  placeholder="পিতার নাম বা আইডি দিয়ে খুঁজুন..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.parent
                      ? "border-rose-500"
                      : "border-slate-200 dark:border-[#424242]"
                  }`}
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              {errors.parent && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.parent}
                </p>
              )}

              {/* Dropdown Options */}
              {isParentDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#424242] rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto p-1.5 animate-fade-in">
                  {filteredParents.length === 0 ? (
                    <p className="p-3 text-center text-xs text-slate-400">
                      কোনো অভিভাবক পাওয়া যায়নি
                    </p>
                  ) : (
                    filteredParents.map((p) => {
                      const isSelected = p.key === parentKey;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => {
                            setParentKey(p.key);
                            setParentSearch(`${p.title} (জেন আইডি: ${p.key})`);
                            setIsParentDropdownOpen(false);
                            setErrors((prev) => ({ ...prev, parent: "" }));
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white font-bold"
                              : "hover:bg-slate-100 dark:hover:bg-[#ffffff14] text-slate-800 dark:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                p.gender === "female"
                                  ? "bg-rose-500"
                                  : "bg-blue-500"
                              }`}
                            />
                            <span className="truncate font-semibold">{p.title}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="font-mono text-[10px] opacity-75">
                              {p.key}
                            </span>
                            <span className="text-[10px] opacity-75">
                              {getGenerationLabel(p.generation)}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Child Order Dropdown */}
            <div className="mt-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                কত তম সন্তান <span className="text-rose-500">*</span>
              </label>
              <select
                value={childOrder}
                onChange={(e) => {
                  setChildOrder(e.target.value);
                  setErrors((prev) => ({ ...prev, childOrder: "" }));
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#1f1f1f] border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.childOrder
                    ? "border-rose-500"
                    : "border-slate-200 dark:border-[#424242]"
                }`}
              >
                <option value="">-- নির্বাচন করুন --</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} তম সন্তান
                  </option>
                ))}
              </select>
              {errors.childOrder && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.childOrder}
                </p>
              )}
            </div>

            {/* Generated Semantic ID Preview Badge */}
            {selectedParent && proposedKey && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-600 dark:text-slate-300">
                  স্বয়ংক্রিয়ভাবে নির্ধারিত জেন আইডি:
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-600/15 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-500/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>জেন আইডি: {proposedKey}</span>
                  <span className="text-[10px] font-sans font-normal opacity-75">
                    ({getGenerationLabel(proposedGen)})
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Section 2: Personal Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ২. সদস্যের মৌলিক তথ্য
            </h3>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সদস্যের পুরো নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
                placeholder="যেমন: তানভীর বাছার, সেলিনা আক্তার..."
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title
                    ? "border-rose-500"
                    : "border-slate-200 dark:border-[#424242]"
                }`}
              />
              {errors.title && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Gender & Living Status Toggle Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Gender Radio Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  লিঙ্গ
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      gender === "male"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>পুরুষ ♂</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      gender === "female"
                        ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                        : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>মহিলা ♀</span>
                  </button>
                </div>
              </div>

              {/* Living Status Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জীবনাবস্থা
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAlive(true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      isAlive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>জীবিত</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAlive(false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      !isAlive
                        ? "bg-slate-700 text-white shadow-md shadow-slate-700/20"
                        : "bg-slate-100 dark:bg-[#1f1f1f] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>পরলোকগত</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Birth & Death Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জন্ম সাল
                </label>
                <input
                  type="text"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="যেমন: ১৯৯৫"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  মৃত্যু সাল {!isAlive && "(যদি প্রযোজ্য)"}
                </label>
                <input
                  type="text"
                  disabled={isAlive}
                  value={deathYear}
                  onChange={(e) => setDeathYear(e.target.value)}
                  placeholder={isAlive ? "জীবিত" : "যেমন: ২০২২"}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40"
                />
              </div>
            </div>

            {/* Profession & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  পেশা
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="যেমন: সফটওয়্যার ইঞ্জিনিয়ার, ব্যবসায়ী..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="যেমন: ০১৭১২-৩৪৫৬৭৮"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Blood Group (Mandatory) & NID / Birth Certificate (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  রক্তের গ্রুপ * <span className="text-rose-500 font-semibold">(আবশ্যিক)</span>
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => {
                    setBloodGroup(e.target.value);
                    if (errors.bloodGroup) setErrors((prev) => ({ ...prev, bloodGroup: "" }));
                  }}
                  className={`w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 font-semibold ${
                    errors.bloodGroup
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-slate-200 dark:border-[#424242] focus:ring-blue-500"
                  }`}
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
                {errors.bloodGroup && (
                  <p className="text-[11px] text-rose-500 mt-1 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {errors.bloodGroup}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  NID / জন্ম সনদ নম্বর <span className="text-slate-400 font-normal">(ঐচ্ছিক)</span>
                </label>
                <input
                  type="text"
                  value={nidOrBirthCert}
                  onChange={(e) => setNidOrBirthCert(e.target.value)}
                  placeholder="যেমন: 19901234567890123"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Address & Spouse */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  বর্তমান ঠিকানা
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="যেমন: ঢাকা, বাংলাদেশ"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  জীবনসঙ্গী (স্বামী / স্ত্রী)
                </label>
                <input
                  type="text"
                  value={spouse}
                  onChange={(e) => setSpouse(e.target.value)}
                  placeholder="স্বামী বা স্ত্রীর নাম"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Academic Information (একাডেমিক তথ্য) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#2a2a2a] space-y-3">
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
                    onClick={() => {
                      setEducationType("general");
                      setAcademicClass("");
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      educationType === "general"
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>🏫 সাধারণ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEducationType("madrasah");
                      setAcademicClass("");
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      educationType === "madrasah"
                        ? "bg-emerald-600 text-white shadow-sm font-bold"
                        : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>🕌 মাদ্রাসা</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEducationType("higher");
                      setAcademicClass("");
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      educationType === "higher"
                        ? "bg-purple-600 text-white shadow-sm font-bold"
                        : "bg-white dark:bg-[#1f1f1f] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#424242]"
                    }`}
                  >
                    <span>🎓 উচ্চশিক্ষা</span>
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
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder={
                      educationType === "madrasah"
                        ? "যেমন: দারুল উলুম মাদ্রাসা, কাসেমিয়া..."
                        : "যেমন: গভঃ বয়েজ স্কুল, ঢাকা কলেজ..."
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    শ্রেণী {educationType === "general" ? "(প্লে থেকে দ্বাদশ)" : educationType === "madrasah" ? "(মাদ্রাসা স্তর)" : "(উচ্চশিক্ষা স্তর)"}
                  </label>
                  <select
                    value={academicClass}
                    onChange={(e) => setAcademicClass(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <option value="" className="bg-white dark:bg-[#1f1f1f] text-slate-900 dark:text-white">-- শ্রেণী নির্বাচন করুন --</option>
                    {(educationType === "madrasah"
                      ? MADRASAH_CLASSES
                      : educationType === "higher"
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
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="যেমন: ক, খ, বিজ্ঞান, মানবিক, হিফজ..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    রোল নম্বর
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="যেমন: ০১, ১৫, ১০২..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Bio / Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                সংক্ষিপ্ত পরিচিতি বা বিশেষ তথ্য
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="সদস্যের অবদান বা বিশেষ কোনো তথ্য..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Section 3: Submitter Information */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#303030] space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ৩. আবেদনকারীর তথ্য (ঐচ্ছিক - ভেরিফিকেশনের জন্য)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={submitterName}
                onChange={(e) => setSubmitterName(e.target.value)}
                placeholder="আপনার নাম"
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs text-slate-900 dark:text-white placeholder-slate-400"
              />
              <input
                type="tel"
                value={submitterPhone}
                onChange={(e) => setSubmitterPhone(e.target.value)}
                placeholder="আপনার মোবাইল নম্বর"
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#424242] text-xs text-slate-900 dark:text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#303030] flex flex-col xs:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full xs:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#424242] text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#ffffff14] transition-colors"
            >
              বাতিল করুন
            </button>

            <button
              type="submit"
              className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>সদস্য যুক্ত করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
